(function () {
  const muteKey = "wonderSoundMuted";
  let audioContext = null;
  let unlocked = false;
  let muted = false;

  try {
    muted = localStorage.getItem(muteKey) === "1";
  } catch {
    muted = false;
  }

  const sounds = {
    click: [
      [520, 0.05, 0.035],
      [680, 0.07, 0.025],
    ],
    success: [
      [520, 0.08, 0.04],
      [720, 0.1, 0.045],
      [920, 0.13, 0.05],
    ],
    wrong: [
      [260, 0.08, 0.05],
      [180, 0.1, 0.045],
    ],
    win: [
      [520, 0.09, 0.04],
      [680, 0.11, 0.045],
      [860, 0.13, 0.05],
      [1080, 0.18, 0.055],
    ],
  };

  function ensureContext() {
    if (!audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      audioContext = new AudioContextClass();
    }
    return audioContext;
  }

  function unlock() {
    const context = ensureContext();
    if (!context) return;

    if (context.state === "suspended") {
      context.resume();
    }

    unlocked = true;
    updateToggle();
  }

  function play(name) {
    if (muted) return;
    const context = ensureContext();
    const notes = sounds[name];
    if (!context || !notes) return;

    if (context.state === "suspended") {
      context.resume();
    }

    const start = context.currentTime;
    notes.forEach(([frequency, offset, gainValue]) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, start + offset);
      gain.gain.exponentialRampToValueAtTime(gainValue, start + offset + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + offset + 0.16);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(start + offset);
      oscillator.stop(start + offset + 0.18);
    });
  }

  function setMuted(value) {
    muted = value;
    try {
      localStorage.setItem(muteKey, muted ? "1" : "0");
    } catch {
      // Sound preferences are optional.
    }
    updateToggle();
    window.WonderAnalytics?.track("sound_toggle", { muted });
  }

  function updateToggle() {
    const toggle = document.querySelector("[data-sound-toggle]");
    if (!toggle) return;

    toggle.textContent = muted ? "🔇" : "🔊";
    toggle.setAttribute("aria-label", muted ? "開啟音效" : "關閉音效");
    toggle.classList.toggle("muted", muted);
    toggle.classList.toggle("locked", !unlocked);
  }

  function installToggle() {
    if (document.querySelector("[data-sound-toggle]")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "sound-toggle";
    button.dataset.soundToggle = "true";
    button.addEventListener("click", () => {
      unlock();
      setMuted(!muted);
      if (!muted) play("click");
    });
    document.body.append(button);
    updateToggle();
  }

  window.addEventListener("pointerdown", unlock, { once: true });
  window.addEventListener("keydown", unlock, { once: true });

  window.WonderSound = {
    play,
    unlock,
    isMuted: () => muted,
    setMuted,
  };

  if (document.body.dataset.soundToggle !== "off") {
    installToggle();
  }
})();
