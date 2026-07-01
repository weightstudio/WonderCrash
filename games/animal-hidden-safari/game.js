(() => {
  const GAME_ID = "animal-hidden-safari";
  const localeKey = "weightplayLocale";
  const unlockKey = "weightplay_hidden_safari_unlocked";
  const starKey = "weightplay_hidden_safari_stars";
  const progressKey = "weightplay_progress_animal-hidden-safari";

  const text = {
    en: {
      gameTitle: "Animal Hidden Safari",
      language: "Language",
      chooseStage: "Choose Habitat",
      menuHint: "Find every hidden animal and safari clue.",
      stages: "Habitats",
      loading: "Loading",
      hint: "Hint",
      findList: "Find These",
      nextStage: "Next Habitat",
      retry: "Try Again",
      lobby: "Lobby",
      locked: "Habitat locked",
      stage: "Habitat {n}",
      great: "Great find!",
      perfect: "Sharp safari eyes!",
      good: "Nice searching!",
      keep: "Good effort!",
      result: "You found {found}/{total} targets in {time}.",
      skillReport: "Skill Report",
      skillMessage: "Focus {focus} / Animal Knowledge {animal} / Problem Solving {solve}. Great progress through careful looking.",
      best: "Best {time}",
      noHints: "No hints left",
      found: "Found!",
      tryAgain: "Look closely",
      targets: {
        lion: "Lion",
        elephant: "Elephant",
        giraffe: "Giraffe",
        zebra: "Zebra",
        monkey: "Monkey",
        hippo: "Hippo",
        rhino: "Rhino",
        bird: "Bird",
        paw: "Paw Print",
        banana: "Banana",
        feather: "Feather",
        leaf: "Leaf",
        shell: "Shell",
        frog: "Frog",
        butterfly: "Butterfly",
        acacia: "Acacia",
      },
      habitat: {
        sunny: "Sunny Grassland",
        river: "River Crossing",
        sunset: "Sunset Trees",
        pond: "Pond Watch",
        jungle: "Jungle Edge",
        lookout: "Lookout Hill",
      },
    },
    "zh-Hant": {
      gameTitle: "動物探險找找看",
      language: "語言",
      chooseStage: "選擇棲地",
      menuHint: "找出藏在畫面裡的動物與探險線索。",
      stages: "棲地",
      loading: "載入中",
      hint: "提示",
      findList: "尋找目標",
      nextStage: "下一個棲地",
      retry: "再試一次",
      lobby: "大廳",
      locked: "棲地尚未解鎖",
      stage: "棲地 {n}",
      great: "找得真棒！",
      perfect: "超厲害的探險眼力！",
      good: "觀察得很好！",
      keep: "努力得很棒！",
      result: "你在 {time} 找到 {found}/{total} 個目標。",
      skillReport: "能力小報告",
      skillMessage: "專注力 {focus} / 動物知識 {animal} / 問題解決 {solve}。仔細觀察就是很棒的進步。",
      best: "最佳 {time}",
      noHints: "沒有提示了",
      found: "找到了！",
      tryAgain: "再仔細看看",
      targets: {
        lion: "獅子",
        elephant: "大象",
        giraffe: "長頸鹿",
        zebra: "斑馬",
        monkey: "猴子",
        hippo: "河馬",
        rhino: "犀牛",
        bird: "小鳥",
        paw: "腳印",
        banana: "香蕉",
        feather: "羽毛",
        leaf: "葉子",
        shell: "貝殼",
        frog: "青蛙",
        butterfly: "蝴蝶",
        acacia: "金合歡樹",
      },
      habitat: {
        sunny: "陽光草原",
        river: "河岸小路",
        sunset: "夕陽樹林",
        pond: "池塘觀察",
        jungle: "叢林邊界",
        lookout: "瞭望山丘",
      },
    },
  };

  const icons = {
    lion: "\u{1F981}",
    elephant: "\u{1F418}",
    giraffe: "\u{1F992}",
    zebra: "\u{1F993}",
    monkey: "\u{1F412}",
    hippo: "\u{1F99B}",
    rhino: "\u{1F98F}",
    bird: "\u{1F426}",
    paw: "\u{1F43E}",
    banana: "\u{1F34C}",
    feather: "\u{1FAB6}",
    leaf: "\u{1F33F}",
    shell: "\u{1F41A}",
    frog: "\u{1F438}",
    butterfly: "\u{1F98B}",
    acacia: "\u{1F333}",
  };

  const stages = [
    {
      habitat: "sunny",
      targets: [
        ["lion", 50, 62, 66],
        ["elephant", 18, 72, 58],
        ["giraffe", 82, 58, 62],
        ["zebra", 69, 78, 54],
        ["monkey", 28, 47, 46],
        ["bird", 40, 26, 38],
        ["paw", 58, 84, 34],
        ["banana", 32, 76, 34],
      ],
    },
    {
      habitat: "river",
      theme: "river",
      targets: [
        ["hippo", 24, 72, 64],
        ["elephant", 75, 67, 60],
        ["frog", 42, 82, 36],
        ["bird", 63, 34, 38],
        ["shell", 18, 84, 34],
        ["leaf", 86, 78, 34],
        ["zebra", 52, 56, 48],
        ["paw", 36, 62, 32],
      ],
    },
    {
      habitat: "sunset",
      theme: "sunset",
      targets: [
        ["giraffe", 18, 54, 62],
        ["monkey", 78, 42, 46],
        ["lion", 64, 73, 58],
        ["butterfly", 48, 30, 34],
        ["feather", 28, 82, 32],
        ["acacia", 86, 66, 54],
        ["bird", 38, 42, 36],
        ["banana", 72, 82, 34],
      ],
    },
    {
      habitat: "pond",
      theme: "pond",
      targets: [
        ["frog", 18, 74, 42],
        ["hippo", 50, 72, 70],
        ["rhino", 78, 66, 58],
        ["bird", 84, 32, 38],
        ["shell", 36, 84, 34],
        ["leaf", 56, 54, 34],
        ["butterfly", 24, 36, 34],
        ["paw", 68, 84, 32],
      ],
    },
    {
      habitat: "jungle",
      theme: "jungle",
      targets: [
        ["monkey", 22, 42, 50],
        ["bird", 54, 28, 38],
        ["butterfly", 76, 34, 34],
        ["rhino", 70, 74, 60],
        ["lion", 42, 70, 58],
        ["banana", 34, 86, 34],
        ["feather", 88, 60, 32],
        ["leaf", 16, 78, 34],
      ],
    },
    {
      habitat: "lookout",
      theme: "lookout",
      targets: [
        ["lion", 21, 68, 58],
        ["elephant", 46, 72, 62],
        ["giraffe", 78, 54, 62],
        ["zebra", 65, 82, 52],
        ["rhino", 34, 84, 54],
        ["bird", 54, 30, 38],
        ["paw", 84, 82, 32],
        ["acacia", 16, 48, 48],
      ],
    },
  ];

  const $ = (id) => document.getElementById(id);
  const nodes = {
    localeSelect: $("localeSelect"),
    menuPanel: $("menuPanel"),
    stageGrid: $("stageGrid"),
    playPanel: $("playPanel"),
    backToStagesBtn: $("backToStagesBtn"),
    stageText: $("stageText"),
    progressFill: $("progressFill"),
    hintBtn: $("hintBtn"),
    hintCount: $("hintCount"),
    scene: $("scene"),
    targetsLayer: $("targetsLayer"),
    floatLayer: $("floatLayer"),
    targetList: $("targetList"),
    timerText: $("timerText"),
    resultPanel: $("resultPanel"),
    resultTitle: $("resultTitle"),
    starText: $("starText"),
    resultText: $("resultText"),
    skillText: $("skillText"),
    nextStageBtn: $("nextStageBtn"),
    retryBtn: $("retryBtn"),
    resultStagesBtn: $("resultStagesBtn"),
    loadingPanel: $("loadingPanel"),
    loadingText: $("loadingText"),
    loadingFill: $("loadingFill"),
  };

  let locale = localStorage.getItem(localeKey) || "en";
  let unlocked = clamp(Number(localStorage.getItem(unlockKey)) || 1, 1, stages.length);
  let stars = readJson(starKey, {});
  let currentStage = 0;
  let found = new Set();
  let hintsLeft = 2;
  let mistakes = 0;
  let startTime = 0;
  let timerId = 0;
  let acceptingInput = false;

  function t(key, data = {}) {
    const parts = key.split(".");
    let value = text[locale] || text.en;
    for (const part of parts) value = value?.[part];
    if (typeof value !== "string") value = key;
    return Object.entries(data).reduce((out, [name, item]) => out.replaceAll(`{${name}}`, item), value);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function playSound(name) {
    window.WonderSound?.play?.(name);
  }

  function track(event, payload = {}) {
    window.WonderAnalytics?.track?.(event, { game_id: GAME_ID, ...payload });
  }

  function localizeStatic() {
    document.documentElement.lang = locale === "zh-Hant" ? "zh-Hant" : "en";
    document.querySelectorAll("[data-ui]").forEach((node) => {
      node.textContent = t(node.dataset.ui);
    });
    nodes.localeSelect.value = locale;
  }

  function renderStageGrid() {
    nodes.stageGrid.innerHTML = "";
    stages.forEach((stage, index) => {
      const stageNo = index + 1;
      const button = document.createElement("button");
      button.className = "stage-card";
      button.type = "button";
      if (stageNo > unlocked) button.classList.add("locked");
      button.innerHTML = `
        <b>${icons[stage.targets[0][0]]}</b>
        <strong>${t("stage", { n: stageNo })} - ${t(`habitat.${stage.habitat}`)}</strong>
        <span>${starsFor(stageNo)} ${bestLine(stageNo)}</span>
      `;
      button.addEventListener("click", () => {
        if (stageNo > unlocked) {
          showFloatingText(t("locked"), 50, 50);
          playSound("click");
          return;
        }
        startStage(index);
      });
      nodes.stageGrid.appendChild(button);
    });
  }

  function starsFor(stageNo) {
    const count = stars[stageNo]?.stars || 0;
    return `${"*".repeat(count)}${"-".repeat(3 - count)}`;
  }

  function bestLine(stageNo) {
    const best = stars[stageNo]?.bestTime;
    return best ? ` / ${t("best", { time: formatTime(best) })}` : "";
  }

  function showMenu() {
    stopTimer();
    acceptingInput = false;
    nodes.menuPanel.classList.remove("hidden");
    nodes.playPanel.classList.add("hidden");
    nodes.resultPanel.classList.add("hidden");
    renderStageGrid();
  }

  function startStage(index) {
    currentStage = index;
    found = new Set();
    hintsLeft = 2;
    mistakes = 0;
    startTime = Date.now();
    acceptingInput = true;
    nodes.menuPanel.classList.add("hidden");
    nodes.playPanel.classList.remove("hidden");
    nodes.resultPanel.classList.add("hidden");
    nodes.scene.dataset.theme = stages[index].theme || "sunny";
    renderScene();
    renderTargetList();
    updateHud();
    startTimer();
    track("game_start", { level: index + 1 });
    playSound("start");
  }

  function renderScene() {
    nodes.targetsLayer.innerHTML = "";
    stages[currentStage].targets.forEach(([id, x, y, size], index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "target";
      button.dataset.index = String(index);
      button.dataset.id = id;
      button.style.left = `${x}%`;
      button.style.top = `${y}%`;
      button.style.setProperty("--size", `${size}px`);
      button.setAttribute("aria-label", t(`targets.${id}`));
      button.textContent = icons[id];
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        chooseTarget(index, button);
      });
      nodes.targetsLayer.appendChild(button);
    });
    nodes.scene.onclick = (event) => {
      if (!acceptingInput || event.target !== nodes.scene) return;
      mistakes += 1;
      const rect = nodes.scene.getBoundingClientRect();
      showFloatingText(t("tryAgain"), ((event.clientX - rect.left) / rect.width) * 100, ((event.clientY - rect.top) / rect.height) * 100);
      playSound("error");
    };
  }

  function renderTargetList() {
    nodes.targetList.innerHTML = "";
    stages[currentStage].targets.forEach(([id], index) => {
      const chip = document.createElement("div");
      chip.className = `target-chip ${found.has(index) ? "done" : ""}`;
      chip.innerHTML = `<b>${icons[id]}</b><span>${t(`targets.${id}`)}</span>`;
      nodes.targetList.appendChild(chip);
    });
  }

  function chooseTarget(index, button) {
    if (!acceptingInput || found.has(index)) return;
    found.add(index);
    button.classList.remove("hint");
    button.classList.add("found");
    showFloatingText(t("found"), Number.parseFloat(button.style.left), Number.parseFloat(button.style.top));
    playSound("coin");
    renderTargetList();
    updateHud();
    if (found.size >= stages[currentStage].targets.length) finishStage();
  }

  function useHint() {
    if (!acceptingInput) return;
    if (hintsLeft <= 0) {
      showFloatingText(t("noHints"), 50, 18);
      playSound("error");
      return;
    }
    const next = stages[currentStage].targets.findIndex((_, index) => !found.has(index));
    if (next < 0) return;
    hintsLeft -= 1;
    nodes.hintCount.textContent = hintsLeft;
    nodes.hintBtn.disabled = hintsLeft <= 0;
    document.querySelectorAll(".target.hint").forEach((item) => item.classList.remove("hint"));
    document.querySelector(`.target[data-index="${next}"]`)?.classList.add("hint");
    track("hint_used", { level: currentStage + 1 });
    playSound("select");
  }

  function updateHud() {
    const stage = stages[currentStage];
    nodes.stageText.textContent = `${t("stage", { n: currentStage + 1 })} - ${t(`habitat.${stage.habitat}`)}`;
    nodes.progressFill.style.width = `${(found.size / stage.targets.length) * 100}%`;
    nodes.hintCount.textContent = hintsLeft;
    nodes.hintBtn.disabled = hintsLeft <= 0;
  }

  function startTimer() {
    stopTimer();
    updateTimer();
    timerId = window.setInterval(updateTimer, 500);
  }

  function stopTimer() {
    if (timerId) window.clearInterval(timerId);
    timerId = 0;
  }

  function updateTimer() {
    nodes.timerText.textContent = formatTime(elapsedSeconds());
  }

  function elapsedSeconds() {
    return Math.max(0, Math.floor((Date.now() - startTime) / 1000));
  }

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  }

  function finishStage() {
    acceptingInput = false;
    stopTimer();
    const seconds = elapsedSeconds();
    const total = stages[currentStage].targets.length;
    const starCount = mistakes === 0 && hintsLeft === 2 ? 3 : mistakes <= 2 && hintsLeft >= 1 ? 2 : 1;
    const stageNo = currentStage + 1;
    const previous = stars[stageNo] || {};
    stars[stageNo] = {
      stars: Math.max(previous.stars || 0, starCount),
      bestTime: previous.bestTime ? Math.min(previous.bestTime, seconds) : seconds,
    };
    writeJson(starKey, stars);
    if (unlocked < stages.length && stageNo >= unlocked) {
      unlocked += 1;
      localStorage.setItem(unlockKey, String(unlocked));
    }
    saveProgress(starCount, seconds);
    nodes.resultTitle.textContent = starCount >= 3 ? t("perfect") : starCount >= 2 ? t("good") : t("great");
    nodes.starText.textContent = `${"*".repeat(starCount)}${"-".repeat(3 - starCount)}`;
    nodes.resultText.textContent = t("result", { found: total, total, time: formatTime(seconds) });
    nodes.skillText.textContent = t("skillMessage", {
      focus: starsText(starCount),
      animal: starsText(3),
      solve: starsText(hintsLeft >= 1 ? 3 : 2),
    });
    nodes.nextStageBtn.classList.toggle("hidden", currentStage >= stages.length - 1);
    nodes.resultPanel.classList.remove("hidden");
    track("game_complete", { level: stageNo, score: starCount * 100 - mistakes * 5, time_seconds: seconds });
    playSound("success");
  }

  function starsText(count) {
    return `${"*".repeat(count)}${"-".repeat(5 - count)}`;
  }

  function saveProgress(starCount, seconds) {
    const old = readJson(progressKey, { bestScore: 0, playCount: 0 });
    const score = Math.max(0, starCount * 100 - mistakes * 5 + Math.max(0, 120 - seconds));
    const bestScore = Math.max(old.bestScore || 0, score);
    const previousBest = old.bestScore || 0;
    const improvementPercent = previousBest ? Math.round(((score - previousBest) / previousBest) * 100) : 0;
    writeJson(progressKey, {
      lastScore: score,
      bestScore,
      playCount: (old.playCount || 0) + 1,
      lastPlayedAt: new Date().toISOString(),
      improvementPercent,
      skillScores: {
        Focus: starCount,
        "Animal Knowledge": 3,
        "Problem Solving": hintsLeft >= 1 ? 3 : 2,
      },
    });
  }

  function showFloatingText(message, x, y) {
    const node = document.createElement("div");
    node.className = "float-text";
    node.textContent = message;
    node.style.left = `${x}%`;
    node.style.top = `${y}%`;
    nodes.floatLayer.appendChild(node);
    window.setTimeout(() => node.remove(), 950);
  }

  function fakeLoad() {
    let progress = 0;
    const id = window.setInterval(() => {
      progress = Math.min(100, progress + 18 + Math.random() * 18);
      nodes.loadingText.textContent = `${Math.round(progress)}%`;
      nodes.loadingFill.style.width = `${progress}%`;
      if (progress >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => nodes.loadingPanel.classList.add("hidden"), 180);
      }
    }, 90);
  }

  function bind() {
    nodes.localeSelect.addEventListener("change", () => {
      locale = nodes.localeSelect.value;
      localStorage.setItem(localeKey, locale);
      localizeStatic();
      renderStageGrid();
      if (!nodes.playPanel.classList.contains("hidden")) {
        renderTargetList();
        updateHud();
      }
      window.dispatchEvent(new CustomEvent("wonder:locale-change", { detail: { locale } }));
    });
    nodes.backToStagesBtn.addEventListener("click", showMenu);
    nodes.resultStagesBtn.addEventListener("click", showMenu);
    nodes.retryBtn.addEventListener("click", () => startStage(currentStage));
    nodes.nextStageBtn.addEventListener("click", () => startStage(Math.min(stages.length - 1, currentStage + 1)));
    nodes.hintBtn.addEventListener("click", useHint);
  }

  function init() {
    localizeStatic();
    bind();
    showMenu();
    fakeLoad();
  }

  init();
})();
