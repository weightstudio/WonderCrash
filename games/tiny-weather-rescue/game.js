(() => {
  const GAME_ID = "tiny-weather-rescue";
  const localeKey = "weightplayLocale";
  const unlockKey = "weightplay_weather_unlocked";
  const starKey = "weightplay_weather_stars";

  const tools = {
    umbrella: { icon: "\u{2602}\u{FE0F}", className: "umbrella" },
    towel: { icon: "\u25B0", className: "towel" },
    fan: { icon: "\u{1FAAD}", className: "fan" },
    lantern: { icon: "\u{1F3EE}", className: "lantern" },
    house: { icon: "\u{1F3E0}", className: "house" },
    apple: { icon: "\u{1F34E}", className: "apple" },
    boots: { icon: "\u{1F97E}", className: "boots" },
    blanket: { icon: "\u{1F9E3}", className: "blanket" },
  };

  const problems = {
    rain: { icon: "\u{1F327}\u{FE0F}", tool: "umbrella", scene: "rain" },
    puddle: { icon: "\u{1F4A7}", tool: "towel", scene: "puddle" },
    heat: { icon: "\u{2600}\u{FE0F}", tool: "fan", scene: "heat" },
    dark: { icon: "\u{1F311}", tool: "lantern", scene: "dark" },
    thunder: { icon: "\u{26A1}", tool: "house", scene: "thunder" },
    hungry: { icon: "\u{1F924}", tool: "apple", scene: "hungry" },
    muddy: { icon: "\u{1F43E}", tool: "boots", scene: "muddy" },
    cold: { icon: "\u{2744}\u{FE0F}", tool: "blanket", scene: "cold" },
    windy: { icon: "\u{1F32C}\u{FE0F}", tool: "house", scene: "windy" },
  };

  const stages = [
    { animal: "\u{1F430}", theme: "garden", rounds: ["rain", "puddle", "hungry", "heat"], choices: ["umbrella", "towel", "apple", "fan"], target: 3 },
    { animal: "\u{1F98A}", theme: "forest", rounds: ["dark", "thunder", "rain", "cold"], choices: ["lantern", "house", "umbrella", "blanket"], target: 3 },
    { animal: "\u{1F43C}", theme: "bamboo", rounds: ["muddy", "puddle", "heat", "hungry", "rain"], choices: ["boots", "towel", "fan", "apple", "umbrella"], target: 4 },
    { animal: "\u{1F427}", theme: "ice", rounds: ["cold", "dark", "windy", "thunder", "puddle"], choices: ["blanket", "lantern", "house", "towel", "umbrella"], target: 4 },
    { animal: "\u{1F981}", theme: "savanna", rounds: ["heat", "hungry", "muddy", "thunder", "rain", "cold"], choices: ["fan", "apple", "boots", "house", "umbrella", "blanket"], target: 5 },
    { animal: "\u{1F428}", theme: "tree", rounds: ["rain", "dark", "windy", "puddle", "hungry", "cold"], choices: ["umbrella", "lantern", "house", "towel", "apple", "blanket", "fan"], target: 5 },
  ].map((stage, index) => ({ ...stage, id: index + 1 }));

  const text = {
    en: {
      gameTitle: "Animal Helper Quest",
      language: "Language",
      chooseStage: "Choose Help Mission",
      menuHint: "Help the little animal. Tap or drag the right care item to it.",
      stages: "Stages",
      loading: "Loading",
      nextStage: "Next Stage",
      retry: "Try Again",
      lobby: "Lobby",
      locked: "Stage locked",
      stage: "Stage {n}",
      progress: "{done}/{total}",
      calm: "Help {score}",
      clear: "Help Complete!",
      failed: "Needs More Care!",
      result: "{score} helpers finished. Best: {best} stars.",
      resultFailed: "Try again and help more animals.",
      hint: "Tap a care item, or drag it to the animal.",
      correct: "Happy helper!",
      wrong: "That made the animal sad.",
      goal: "Goal {target}",
      rain: "It is raining.",
      puddle: "The animal is wet.",
      heat: "It is too hot.",
      dark: "It is too dark.",
      thunder: "Thunder is nearby.",
      hungry: "The animal is hungry.",
      muddy: "The path is muddy.",
      cold: "It is too cold.",
      windy: "The wind is too strong.",
      umbrella: "Umbrella",
      towel: "Towel",
      fan: "Fan",
      lantern: "Lamp",
      house: "House",
      apple: "Apple",
      boots: "Boots",
      blanket: "Blanket",
    },
    "zh-Hant": {
      gameTitle: "\u52d5\u7269\u5e6b\u5e6b\u968a",
      language: "\u8a9e\u8a00",
      chooseStage: "\u9078\u64c7\u5e6b\u5fd9\u4efb\u52d9",
      menuHint: "\u5e6b\u5c0f\u52d5\u7269\uff0c\u9ede\u6216\u62d6\u66f3\u6b63\u78ba\u7167\u9867\u9053\u5177\u7d66\u5b83\u3002",
      stages: "\u9078\u95dc",
      loading: "\u8f09\u5165\u4e2d",
      nextStage: "\u4e0b\u4e00\u95dc",
      retry: "\u518d\u8a66\u4e00\u6b21",
      lobby: "\u5927\u5ef3",
      locked: "\u95dc\u5361\u672a\u89e3\u9396",
      stage: "\u7b2c {n} \u95dc",
      progress: "{done}/{total}",
      calm: "\u5e6b\u5fd9 {score}",
      clear: "\u5e6b\u5fd9\u5b8c\u6210\uff01",
      failed: "\u9084\u9700\u8981\u7167\u9867\uff01",
      result: "\u5b8c\u6210 {score} \u500b\u5e6b\u5fd9\u4efb\u52d9\u3002\u6700\u4f73\uff1a{best} \u661f\u3002",
      resultFailed: "\u518d\u8a66\u4e00\u6b21\uff0c\u5e6b\u52a9\u66f4\u591a\u5c0f\u52d5\u7269\u3002",
      hint: "\u9ede\u7167\u9867\u9053\u5177\uff0c\u6216\u62d6\u5230\u5c0f\u52d5\u7269\u8eab\u4e0a\u3002",
      correct: "\u5c0f\u52d5\u7269\u958b\u5fc3\u4e86\uff01",
      wrong: "\u5c0f\u52d5\u7269\u96e3\u904e\u4e86\u3002",
      goal: "\u76ee\u6a19 {target}",
      rain: "\u5916\u9762\u5728\u4e0b\u96e8\u3002",
      puddle: "\u5c0f\u52d5\u7269\u6fd5\u6fd5\u7684\u3002",
      heat: "\u592a\u967d\u592a\u71b1\u4e86\u3002",
      dark: "\u5929\u8272\u592a\u6697\u4e86\u3002",
      thunder: "\u96f7\u8072\u9760\u8fd1\u4e86\u3002",
      hungry: "\u5c0f\u52d5\u7269\u809a\u5b50\u9913\u4e86\u3002",
      muddy: "\u8def\u4e0a\u90fd\u662f\u6ce5\u5df4\u3002",
      cold: "\u5929\u6c23\u592a\u51b7\u4e86\u3002",
      windy: "\u98a8\u592a\u5927\u4e86\u3002",
      umbrella: "\u96e8\u5098",
      towel: "\u6bdb\u5dfe",
      fan: "\u98a8\u6247",
      lantern: "\u5c0f\u71c8",
      house: "\u5c0f\u5c4b",
      apple: "\u860b\u679c",
      boots: "\u96e8\u9774",
      blanket: "\u6bef\u5b50",
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
  let busy = false;
  let dragState = null;

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
        <b>${stage.animal} ${firstProblem.icon}</b>
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
    busy = false;
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
    const choices = toolChoices(stage, problemKey);
    nodes.stageText.textContent = t("stage", { n: stage.id });
    nodes.movesText.innerHTML = `<b>${t("progress", { done: roundIndex + 1, total: stage.rounds.length })}</b><i style="width:${percent}%"></i>`;
    nodes.starsText.textContent = t("calm", { score });
    nodes.board.innerHTML = `
      <div class="weather-scene ${stage.theme} ${problem.scene}">
        <div class="rescue-scene">
          <div class="weather-effects" aria-hidden="true">${weatherEffects(problemKey)}</div>
          <div class="problem-bubble">${problem.icon}</div>
          <div class="animal-zone" data-drop-zone="true">
            <div class="animal-shadow"></div>
            <div class="animal-face">${stage.animal}</div>
          </div>
          <div class="need-line">${t(problemKey)}</div>
        </div>
        <div class="tool-grid">
          ${choices.map((key) => {
            const tool = tools[key];
            return `
            <button class="tool-btn ${tool.className}" type="button" data-tool="${key}" aria-label="${t(key)}">
              <i>${tool.icon}</i>
              <span>${t(key)}</span>
            </button>
          `;
          }).join("")}
        </div>
        ${feedback ? `<div class="event-pop">${feedback}</div>` : ""}
      </div>
    `;
    nodes.board.querySelectorAll("[data-tool]").forEach((button) => installToolControl(button));
  }

  function toolChoices(stage, problemKey) {
    const choices = stage.choices || Object.keys(tools);
    const shuffled = seededShuffle(choices, stage.id * 97 + roundIndex * 31);
    const correctTool = problems[problemKey]?.tool;
    if (shuffled.length > 1 && shuffled[0] === correctTool) {
      const offset = ((stage.id + roundIndex) % (shuffled.length - 1)) + 1;
      return [...shuffled.slice(offset), ...shuffled.slice(0, offset)];
    }
    return shuffled;
  }

  function seededShuffle(items, seed) {
    const output = [...items];
    let value = seed || 1;
    for (let index = output.length - 1; index > 0; index -= 1) {
      value = (value * 1664525 + 1013904223) >>> 0;
      const swapIndex = value % (index + 1);
      [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
    }
    return output;
  }

  function weatherEffects(problemKey) {
    if (problemKey === "rain") return "<span>💧</span><span>💧</span><span>💧</span>";
    if (problemKey === "puddle") return "<span>💦</span><span>💧</span>";
    if (problemKey === "heat") return "<span>☀️</span><span>〰</span>";
    if (problemKey === "dark") return "<span>🌙</span><span>✨</span>";
    if (problemKey === "thunder") return "<span>⚡</span><span>☁️</span>";
    if (problemKey === "muddy") return "<span>🐾</span><span>🟤</span>";
    if (problemKey === "cold") return "<span>❄️</span><span>🥶</span>";
    if (problemKey === "windy") return "<span>🌬️</span><span>🍃</span>";
    return "<span>💭</span><span>🍽️</span>";
  }

  function installToolControl(button) {
    button.addEventListener("click", () => {
      if (button.dataset.skipClick === "1") return;
      chooseTool(button.dataset.tool, button);
    });
    button.addEventListener("pointerdown", (event) => {
      if (!running || busy) return;
      dragState = {
        tool: button.dataset.tool,
        startX: event.clientX,
        startY: event.clientY,
        moved: false,
        ghost: null,
        button,
      };
      button.setPointerCapture?.(event.pointerId);
    });
    button.addEventListener("pointermove", (event) => {
      if (!dragState || dragState.tool !== button.dataset.tool) return;
      const dx = event.clientX - dragState.startX;
      const dy = event.clientY - dragState.startY;
      if (Math.hypot(dx, dy) > 8) dragState.moved = true;
      if (dragState.moved && !dragState.ghost) dragState.ghost = makeGhost(dragState.button, event.clientX, event.clientY);
      moveGhost(event.clientX, event.clientY);
      nodes.board.querySelector(".animal-zone")?.classList.toggle("drag-over", isOverAnimal(event.clientX, event.clientY));
    });
    button.addEventListener("pointerup", (event) => {
      if (!dragState || dragState.tool !== button.dataset.tool) return;
      if (dragState.moved) {
        button.dataset.skipClick = "1";
        window.setTimeout(() => {
          delete button.dataset.skipClick;
        }, 0);
      }
      const shouldDrop = dragState.moved && isOverAnimal(event.clientX, event.clientY);
      cleanupDrag();
      if (shouldDrop) chooseTool(button.dataset.tool, button);
    });
    button.addEventListener("pointercancel", cleanupDrag);
  }

  function makeGhost(button, x, y) {
    const ghost = document.createElement("div");
    ghost.className = "tool-drag-ghost";
    ghost.textContent = button.querySelector("i")?.textContent || "";
    document.body.append(ghost);
    moveGhost(x, y, ghost);
    return ghost;
  }

  function moveGhost(x, y, ghost = dragState?.ghost) {
    if (!ghost) return;
    ghost.style.left = `${x}px`;
    ghost.style.top = `${y}px`;
  }

  function isOverAnimal(x, y) {
    const zone = nodes.board.querySelector(".animal-zone");
    if (!zone) return false;
    const rect = zone.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  function cleanupDrag() {
    nodes.board.querySelector(".animal-zone")?.classList.remove("drag-over");
    dragState?.ghost?.remove();
    dragState = null;
  }

  function chooseTool(tool, button) {
    if (!running || busy) return;
    busy = true;
    const stage = stages[currentStage];
    const problemKey = stage.rounds[roundIndex];
    const correct = problems[problemKey].tool === tool;
    const zone = nodes.board.querySelector(".animal-zone");
    if (correct) {
      score += 1;
      button.classList.add("correct");
      zone?.classList.add("happy");
      showFace("\u{1F604}", "happy");
      nodes.hintText.textContent = t("correct");
      playSound("success");
    } else {
      button.classList.add("wrong");
      zone?.classList.add("sad");
      showFace("\u{1F622}", "sad");
      nodes.hintText.textContent = t("wrong");
      playSound("wrong");
    }
    track("weather_tool", { stage: stage.id, problem: problemKey, tool, correct });
    window.setTimeout(() => {
      roundIndex += 1;
      busy = false;
      if (roundIndex >= stage.rounds.length) {
        finishStage();
        return;
      }
      renderRound(correct ? "+1" : "");
    }, 760);
  }

  function showFace(face, kind) {
    const pop = document.createElement("div");
    pop.className = `face-pop ${kind}`;
    pop.textContent = face;
    nodes.board.querySelector(".rescue-scene")?.append(pop);
    window.setTimeout(() => pop.remove(), 720);
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
    track("game_complete", { stage: stage.id, score, stars, cleared });
  }

  function showMenu() {
    running = false;
    busy = false;
    cleanupDrag();
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
        window.setTimeout(() => {
          nodes.loadingPanel.classList.add("hidden");
          track("game_ready");
        }, 100);
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
  nodes.retryBtn.addEventListener("click", () => {
    track("game_restart", { stage: currentStage + 1 });
    startStage(currentStage);
  });
  nodes.nextStageBtn.addEventListener("click", () => startStage(Math.min(currentStage + 1, stages.length - 1)));

  localizeStatic();
  renderStageGrid();
  installLoading();
})();
