(() => {
  const GAME_ID = "tiny-weather-rescue";
  const localeKey = "weightplayLocale";
  const unlockKey = "weightplay_weather_unlocked";
  const starKey = "weightplay_weather_stars";

  const tools = {
    umbrella: { icon: "\u{2602}\u{FE0F}", className: "umbrella" },
    towel: { icon: "\u{1F9FD}", className: "towel" },
    fan: { icon: "\u{1FAAD}", className: "fan" },
    lantern: { icon: "\u{1F3EE}", className: "lantern" },
    shelter: { icon: "\u{1F3E0}", className: "shelter" },
    snack: { icon: "\u{1F34E}", className: "snack" },
  };

  const problems = {
    rain: { icon: "\u{1F327}\u{FE0F}", tool: "umbrella" },
    puddle: { icon: "\u{1F4A7}", tool: "towel" },
    heat: { icon: "\u{2600}\u{FE0F}", tool: "fan" },
    dark: { icon: "\u{1F311}", tool: "lantern" },
    thunder: { icon: "\u{26A1}", tool: "shelter" },
    hungry: { icon: "\u{1F924}", tool: "snack" },
  };

  const stages = [
    { animal: "\u{1F430}", theme: "garden", rounds: ["rain", "puddle", "hungry", "heat"], target: 3 },
    { animal: "\u{1F98A}", theme: "forest", rounds: ["dark", "rain", "thunder", "hungry", "puddle"], target: 4 },
    { animal: "\u{1F43C}", theme: "bamboo", rounds: ["heat", "hungry", "rain", "dark", "puddle"], target: 4 },
    { animal: "\u{1F427}", theme: "ice", rounds: ["dark", "puddle", "thunder", "rain", "hungry", "heat"], target: 5 },
    { animal: "\u{1F981}", theme: "savanna", rounds: ["heat", "thunder", "hungry", "rain", "dark", "puddle"], target: 5 },
    { animal: "\u{1F428}", theme: "tree", rounds: ["rain", "dark", "heat", "puddle", "thunder", "hungry"], target: 5 },
  ].map((stage, index) => ({ ...stage, id: index + 1 }));

  const text = {
    en: {
      gameTitle: "Tiny Weather Rescue",
      language: "Language",
      chooseStage: "Choose Rescue",
      menuHint: "Look at the big picture, then tap the matching rescue tool.",
      stages: "Stages",
      loading: "Loading",
      nextStage: "Next Stage",
      retry: "Try Again",
      lobby: "Lobby",
      locked: "Stage locked",
      stage: "Stage {n}",
      progress: "{done}/{total}",
      calm: "Calm {score}",
      clear: "Rescue Complete!",
      failed: "Needs More Care!",
      result: "{score} rescues finished. Best: {best} stars.",
      resultFailed: "Try again and match more picture tools.",
      hint: "Tap the matching picture.",
      correct: "Nice!",
      wrong: "Try the picture that matches.",
      goal: "Goal {target}",
      rain: "Rain",
      puddle: "Puddle",
      heat: "Sun",
      dark: "Dark",
      thunder: "Thunder",
      hungry: "Hungry",
      umbrella: "Umbrella",
      towel: "Towel",
      fan: "Fan",
      lantern: "Lantern",
      shelter: "Shelter",
      snack: "Snack",
    },
    "zh-Hant": {
      gameTitle: "\u5c0f\u5c0f\u5929\u6c23\u6551\u63f4",
      language: "\u8a9e\u8a00",
      chooseStage: "\u9078\u64c7\u6551\u63f4",
      menuHint: "\u770b\u5927\u5716\u793a\uff0c\u9ede\u76f8\u914d\u7684\u6551\u63f4\u9053\u5177\u3002",
      stages: "\u9078\u95dc",
      loading: "\u8f09\u5165\u4e2d",
      nextStage: "\u4e0b\u4e00\u95dc",
      retry: "\u518d\u8a66\u4e00\u6b21",
      lobby: "\u5927\u5ef3",
      locked: "\u95dc\u5361\u672a\u89e3\u9396",
      stage: "\u7b2c {n} \u95dc",
      progress: "{done}/{total}",
      calm: "\u5b89\u5fc3 {score}",
      clear: "\u6551\u63f4\u5b8c\u6210\uff01",
      failed: "\u9084\u9700\u8981\u7167\u9867\uff01",
      result: "\u5b8c\u6210 {score} \u500b\u6551\u63f4\u3002\u6700\u4f73\uff1a{best} \u661f\u3002",
      resultFailed: "\u518d\u8a66\u4e00\u6b21\uff0c\u627e\u51fa\u66f4\u591a\u76f8\u914d\u5716\u793a\u3002",
      hint: "\u9ede\u76f8\u914d\u7684\u5716\u793a\u3002",
      correct: "\u5f88\u597d\uff01",
      wrong: "\u627e\u8ddf\u5929\u6c23\u76f8\u914d\u7684\u5716\u793a\u3002",
      goal: "\u76ee\u6a19 {target}",
      rain: "\u4e0b\u96e8",
      puddle: "\u6c34\u5751",
      heat: "\u592a\u967d",
      dark: "\u5929\u9ed1",
      thunder: "\u96f7\u96fb",
      hungry: "\u809a\u5b50\u9913",
      umbrella: "\u96e8\u5098",
      towel: "\u6d77\u7dbf",
      fan: "\u98a8\u6247",
      lantern: "\u5c0f\u71c8",
      shelter: "\u5c0f\u5c4b",
      snack: "\u9ede\u5fc3",
    },
  };

  const $ = (id) => document.getElementById(id);
  const nodes = {
    localeSelect: $("localeSelect"),
    menuPanel: $("menuPanel"),
    stageGrid: $("stageGrid"),
    playPanel: $("playPanel"),
    backToStagesBtn: $("backToStagesBtn"),
    stageText: $("stageText"),
    movesText: $("movesText"),
    starsText: $("starsText"),
    board: $("board"),
    hintText: $("hintText"),
    resultPanel: $("resultPanel"),
    resultTitle: $("resultTitle"),
    starText: $("starText"),
    resultText: $("resultText"),
    nextStageBtn: $("nextStageBtn"),
    retryBtn: $("retryBtn"),
    resultStagesBtn: $("resultStagesBtn"),
    loadingPanel: $("loadingPanel"),
    loadingText: $("loadingText"),
    loadingFill: $("loadingFill"),
  };

  let locale = localStorage.getItem(localeKey) || window.WonderI18n?.locale?.() || "en";
  let unlocked = clamp(Number(localStorage.getItem(unlockKey)) || 1, 1, stages.length);
  let records = readRecords();
  let currentStage = 0;
  let roundIndex = 0;
  let score = 0;
  let running = false;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function readRecords() {
    try {
      return JSON.parse(localStorage.getItem(starKey) || "{}");
    } catch {
      return {};
    }
  }

  function saveRecords() {
    localStorage.setItem(starKey, JSON.stringify(records));
    localStorage.setItem(unlockKey, String(unlocked));
  }

  function t(label, data = {}) {
    const table = text[locale] || text.en;
    const value = table[label] || text.en[label] || label;
    return Object.entries(data).reduce((out, [name, item]) => out.replaceAll(`{${name}}`, String(item)), value);
  }

  function playSound(name) {
    window.WonderSound?.play?.(name);
  }

  function track(event, payload = {}) {
    window.WonderAnalytics?.track(event, { game_id: GAME_ID, ...payload });
  }

  function localizeStatic() {
    document.documentElement.lang = locale === "zh-Hant" ? "zh-Hant" : "en";
    nodes.localeSelect.value = locale;
    document.querySelectorAll("[data-ui]").forEach((node) => {
      node.textContent = t(node.dataset.ui);
    });
  }

  function renderStageGrid() {
    nodes.stageGrid.innerHTML = "";
    stages.forEach((stage, index) => {
      const stageNo = index + 1;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "stage-card";
      if (stageNo > unlocked) button.classList.add("locked");
      const best = records[stageNo] || 0;
      const firstProblem = problems[stage.rounds[0]];
      button.innerHTML = `
        <b>${stage.animal} ${firstProblem.icon} ?</b>
        <strong>${t("stage", { n: stageNo })}</strong>
        <span>${t("goal", { target: stage.target })} · ${"\u2605".repeat(best)}${"\u2606".repeat(3 - best)}</span>
      `;
      button.addEventListener("click", () => {
        if (stageNo > unlocked) {
          showFloatingText(t("locked"));
          playSound("click");
          return;
        }
        startStage(index);
      });
      nodes.stageGrid.append(button);
    });
  }

  function startStage(index) {
    currentStage = index;
    roundIndex = 0;
    score = 0;
    running = true;
    nodes.menuPanel.classList.add("hidden");
    nodes.resultPanel.classList.add("hidden");
    nodes.playPanel.classList.remove("hidden");
    nodes.hintText.textContent = t("hint");
    renderRound();
    track("game_start", { stage: currentStage + 1 });
  }

  function progressPercent(stage) {
    return Math.round((roundIndex / stage.rounds.length) * 100);
  }

  function renderRound(feedback = "") {
    const stage = stages[currentStage];
    const problemKey = stage.rounds[roundIndex];
    const problem = problems[problemKey];
    const percent = progressPercent(stage);
    nodes.stageText.textContent = t("stage", { n: stage.id });
    nodes.movesText.innerHTML = `<b>${t("progress", { done: roundIndex + 1, total: stage.rounds.length })}</b><i style="width:${percent}%"></i>`;
    nodes.starsText.textContent = t("calm", { score });
    nodes.board.innerHTML = `
      <div class="weather-scene ${stage.theme}">
        <div class="animal-badge">${stage.animal}</div>
        <div class="picture-prompt" aria-label="${t(problemKey)}">
          <div class="weather-icon">${problem.icon}</div>
          <div class="match-arrow">→</div>
          <div class="tool-shadow">?</div>
        </div>
        <div class="tool-grid">
          ${Object.entries(tools).map(([key, tool]) => `
            <button class="tool-btn ${tool.className}" type="button" data-tool="${key}" aria-label="${t(key)}">
              <i>${tool.icon}</i>
              <span>${t(key)}</span>
            </button>
          `).join("")}
        </div>
        ${feedback ? `<div class="event-pop">${feedback}</div>` : ""}
      </div>
    `;
    nodes.board.querySelectorAll("[data-tool]").forEach((button) => {
      button.addEventListener("click", () => chooseTool(button.dataset.tool, button));
    });
  }

  function chooseTool(tool, button) {
    if (!running) return;
    const stage = stages[currentStage];
    const problemKey = stage.rounds[roundIndex];
    const correct = problems[problemKey].tool === tool;
    if (correct) {
      score += 1;
      button.classList.add("correct");
      nodes.hintText.textContent = t("correct");
      playSound("success");
    } else {
      button.classList.add("wrong");
      nodes.hintText.textContent = t("wrong");
      playSound("wrong");
    }
    track("weather_tool", { stage: stage.id, problem: problemKey, tool, correct });
    window.setTimeout(() => {
      roundIndex += 1;
      if (roundIndex >= stage.rounds.length) {
        finishStage();
        return;
      }
      renderRound(correct ? "+1" : "");
    }, 360);
  }

  function starCount(stage) {
    if (score >= stage.rounds.length) return 3;
    if (score >= stage.target) return 2;
    if (score >= Math.max(1, stage.target - 1)) return 1;
    return 0;
  }

  function finishStage() {
    running = false;
    const stage = stages[currentStage];
    const stars = starCount(stage);
    const cleared = score >= stage.target;
    records[stage.id] = Math.max(records[stage.id] || 0, stars);
    if (cleared && stage.id < stages.length) unlocked = Math.max(unlocked, stage.id + 1);
    saveRecords();
    nodes.playPanel.classList.add("hidden");
    nodes.resultPanel.classList.remove("hidden");
    nodes.resultTitle.textContent = cleared ? t("clear") : t("failed");
    nodes.starText.textContent = `${"\u2605".repeat(stars)}${"\u2606".repeat(3 - stars)}`;
    nodes.resultText.textContent = cleared
      ? t("result", { score, best: records[stage.id] || stars })
      : t("resultFailed");
    nodes.nextStageBtn.classList.toggle("hidden", !cleared || stage.id >= stages.length);
    renderStageGrid();
    playSound(cleared ? "success" : "wrong");
    track("game_end", { stage: stage.id, score, stars, cleared });
  }

  function showMenu() {
    running = false;
    nodes.playPanel.classList.add("hidden");
    nodes.resultPanel.classList.add("hidden");
    nodes.menuPanel.classList.remove("hidden");
    renderStageGrid();
  }

  function showFloatingText(message) {
    const toast = document.createElement("div");
    toast.className = "floating-toast";
    toast.textContent = message;
    document.body.append(toast);
    window.setTimeout(() => toast.remove(), 1300);
  }

  function installLoading() {
    let progress = 0;
    const id = window.setInterval(() => {
      progress = Math.min(100, progress + 25);
      nodes.loadingText.textContent = `${progress}%`;
      nodes.loadingFill.style.width = `${progress}%`;
      if (progress >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => nodes.loadingPanel.classList.add("hidden"), 100);
      }
    }, 80);
  }

  nodes.localeSelect.addEventListener("change", (event) => {
    locale = event.target.value;
    localStorage.setItem(localeKey, locale);
    window.WonderI18n?.setLocale?.(locale);
    localizeStatic();
    renderStageGrid();
    if (running) renderRound();
  });
  nodes.backToStagesBtn.addEventListener("click", showMenu);
  nodes.resultStagesBtn.addEventListener("click", showMenu);
  nodes.retryBtn.addEventListener("click", () => startStage(currentStage));
  nodes.nextStageBtn.addEventListener("click", () => startStage(Math.min(currentStage + 1, stages.length - 1)));

  localizeStatic();
  renderStageGrid();
  installLoading();
})();
