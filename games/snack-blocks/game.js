(function () {
  const GAME_ID = "snack-blocks";
  const size = 7;
  const snacks = ["ST", "CK", "JM", "GR", "CH", "PR"];
  const snackIcon = {
    ST: "\u{1F353}",
    CK: "\u{1F36A}",
    JM: "\u{1F36C}",
    GR: "\u{1F347}",
    CH: "\u{1F9C0}",
    PR: "\u{1F968}",
  };
  const localeKey = "weightplayLocale";
  const unlockKey = "snackBlocksUnlocked";
  const recordKey = "snackBlocksRecords";

  const stages = [
    { id: 1, goal: "score", target: 650, moves: 18, types: 4 },
    { id: 2, goal: "score", target: 900, moves: 20, types: 4 },
    { id: 3, goal: "score", target: 1200, moves: 22, types: 5 },
    { id: 4, goal: "score", target: 1500, moves: 24, types: 5 },
    { id: 5, goal: "collect", snack: "ST", target: 10, moves: 24, types: 5 },
    { id: 6, goal: "score", target: 1900, moves: 25, types: 6 },
    { id: 7, goal: "collect", snack: "CK", target: 12, moves: 25, types: 6 },
    { id: 8, goal: "score", target: 2400, moves: 26, types: 6 },
    { id: 9, goal: "collect", snack: "JM", target: 13, moves: 26, types: 6 },
    { id: 10, goal: "score", target: 2850, moves: 27, types: 6 },
    { id: 11, goal: "collect", snack: "GR", target: 14, moves: 27, types: 6 },
    { id: 12, goal: "score", target: 3300, moves: 28, types: 6 },
    { id: 13, goal: "collect", snack: "CH", target: 15, moves: 28, types: 6 },
    { id: 14, goal: "score", target: 3800, moves: 29, types: 6 },
    { id: 15, goal: "collect", snack: "PR", target: 16, moves: 29, types: 6 },
    { id: 16, goal: "score", target: 4300, moves: 30, types: 6 },
    { id: 17, goal: "collect", snack: "ST", target: 18, moves: 30, types: 6 },
    { id: 18, goal: "score", target: 4850, moves: 31, types: 6 },
    { id: 19, goal: "collect", snack: "CK", target: 20, moves: 31, types: 6 },
    { id: 20, goal: "score", target: 5500, moves: 32, types: 6 },
  ];

  const text = {
    en: {
      brand: "WeightPlay",
      title: "Snack Blocks",
      language: "Language",
      stage: "Stage",
      moves: "Moves",
      target: "Goal",
      score: "Score",
      menuTitle: "Choose a snack stage.",
      menuText: "Use all moves, reach the goal, and chase your best score.",
      stageName: "Stage {stage}",
      locked: "Locked",
      best: "Best {score}",
      hint: "Tap or drag a snack to swap with its neighbor.",
      goalScore: "Score {target}",
      goalCollect: "Collect {icon} x{target}",
      goalProgress: "{count} / {target}",
      goalReady: "Goal reached! Use remaining moves for a higher score.",
      loading: "Loading",
      clear: "Stage Clear!",
      failed: "Try Again!",
      clearText: "Score {score}. Goal {goal}. Best {best}.",
      finalClearText: "Score {score}. Goal {goal}. All snack stages cleared!",
      failedText: "Score {score}. Goal {goal}. Try a bigger combo.",
      next: "Next Stage",
      again: "Try Again",
      menu: "Stages",
      lobby: "Lobby",
    },
    "zh-Hant": {
      brand: "WeightPlay",
      title: "零食方塊",
      language: "語言",
      stage: "關卡",
      moves: "步數",
      target: "目標",
      score: "分數",
      menuTitle: "選擇零食關卡",
      menuText: "用完步數、達成目標，挑戰自己的最佳分數。",
      stageName: "第 {stage} 關",
      locked: "未解鎖",
      best: "最佳 {score}",
      hint: "點一下或拖曳零食，和旁邊的格子交換。",
      goalScore: "分數 {target}",
      goalCollect: "收集 {icon} x{target}",
      goalProgress: "{count} / {target}",
      goalReady: "目標達成！剩下步數可以繼續衝高分。",
      loading: "載入中",
      clear: "關卡完成！",
      failed: "再試一次！",
      clearText: "分數 {score}。目標 {goal}。最佳 {best}。",
      finalClearText: "分數 {score}。目標 {goal}。全部零食關卡完成！",
      failedText: "分數 {score}。目標 {goal}。再試著做出更大的連線。",
      next: "下一關",
      again: "再試一次",
      menu: "選關",
      lobby: "大廳",
    },
  };

  const nodes = {
    homeLink: document.getElementById("homeLink"),
    titleText: document.getElementById("titleText"),
    brandText: document.getElementById("brandText"),
    languageLabel: document.getElementById("languageLabel"),
    localeSelect: document.getElementById("localeSelect"),
    hud: document.getElementById("hud"),
    stageLabel: document.getElementById("stageLabel"),
    movesLabel: document.getElementById("movesLabel"),
    targetLabel: document.getElementById("targetLabel"),
    stageText: document.getElementById("stageText"),
    movesText: document.getElementById("movesText"),
    targetText: document.getElementById("targetText"),
    scoreLabel: document.getElementById("scoreLabel"),
    scoreText: document.getElementById("scoreText"),
    menuPanel: document.getElementById("menuPanel"),
    menuTitle: document.getElementById("menuTitle"),
    menuText: document.getElementById("menuText"),
    stageGrid: document.getElementById("stageGrid"),
    playPanel: document.getElementById("playPanel"),
    board: document.getElementById("board"),
    hintText: document.getElementById("hintText"),
    resultPanel: document.getElementById("resultPanel"),
    resultTitle: document.getElementById("resultTitle"),
    resultText: document.getElementById("resultText"),
    resultStars: document.getElementById("resultStars"),
    nextBtn: document.getElementById("nextBtn"),
    againBtn: document.getElementById("againBtn"),
    menuBtn: document.getElementById("menuBtn"),
    lobbyLink: document.getElementById("lobbyLink"),
    loadingPanel: document.getElementById("loadingPanel"),
    loadingTitle: document.getElementById("loadingTitle"),
    loadingText: document.getElementById("loadingText"),
    loadingFill: document.getElementById("loadingFill"),
  };

  const state = {
    locale: "en",
    board: [],
    selected: null,
    score: 0,
    moves: 0,
    combo: 1,
    goalCount: 0,
    goalReady: false,
    running: false,
    busy: false,
    currentStageIndex: 0,
    nextTileId: 1,
    dragStart: null,
    suppressClick: false,
  };

  function t(key, data = {}) {
    let value = (text[state.locale] && text[state.locale][key]) || text.en[key] || key;
    Object.keys(data).forEach((name) => {
      value = value.replaceAll(`{${name}}`, data[name]);
    });
    return value;
  }

  function activeStage() {
    return stages[state.currentStageIndex];
  }

  function goalLabel(stage = activeStage()) {
    return stage.goal === "collect"
      ? t("goalCollect", { icon: snackIcon[stage.snack], target: stage.target })
      : t("goalScore", { target: stage.target });
  }

  function goalProgress(stage = activeStage()) {
    return stage.goal === "collect"
      ? t("goalProgress", { count: state.goalCount, target: stage.target })
      : `${state.score} / ${stage.target}`;
  }

  function goalMet(stage = activeStage()) {
    return stage.goal === "collect" ? state.goalCount >= stage.target : state.score >= stage.target;
  }

  function loadUnlocked() {
    try {
      const value = Number(localStorage.getItem(unlockKey));
      return Number.isFinite(value) && value > 0 ? Math.min(value, stages.length) : 1;
    } catch {
      return 1;
    }
  }

  function saveUnlocked(value) {
    try {
      localStorage.setItem(unlockKey, String(Math.min(value, stages.length)));
    } catch {
      // Progress persistence is optional.
    }
  }

  function loadRecords() {
    try {
      return JSON.parse(localStorage.getItem(recordKey)) || {};
    } catch {
      return {};
    }
  }

  function saveRecord(stageId, score) {
    const records = loadRecords();
    records[stageId] = Math.max(records[stageId] || 0, score);
    try {
      localStorage.setItem(recordKey, JSON.stringify(records));
    } catch {
      // Record persistence is optional.
    }
    return records;
  }

  function setLocale(locale) {
    state.locale = text[locale] ? locale : "en";
    try {
      localStorage.setItem(localeKey, state.locale);
    } catch {
      // Locale persistence is optional.
    }
    document.documentElement.lang = state.locale;
    nodes.localeSelect.value = state.locale;
    applyText();
  }

  function applyText() {
    nodes.brandText.textContent = t("brand");
    nodes.titleText.textContent = t("title");
    nodes.languageLabel.textContent = t("language");
    nodes.stageLabel.textContent = t("stage");
    nodes.movesLabel.textContent = t("moves");
    nodes.targetLabel.textContent = t("target");
    nodes.scoreLabel.textContent = t("score");
    nodes.menuTitle.textContent = t("menuTitle");
    nodes.menuText.textContent = t("menuText");
    nodes.hintText.textContent = t("hint");
    nodes.loadingTitle.textContent = t("loading");
    nodes.nextBtn.textContent = t("next");
    nodes.againBtn.textContent = t("again");
    nodes.menuBtn.textContent = t("menu");
    nodes.lobbyLink.textContent = t("lobby");
    renderStageGrid();
    updateHud();
  }

  function makeTile(type) {
    const tile = { id: state.nextTileId, type };
    state.nextTileId += 1;
    return tile;
  }

  function randomType() {
    return snacks[Math.floor(Math.random() * activeStage().types)];
  }

  function getCell(row, col) {
    return state.board[row * size + col];
  }

  function buildCleanBoard() {
    state.board = [];
    state.nextTileId = 1;
    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        let value = randomType();
        let guard = 0;
        while (
          guard < 30 &&
          ((col >= 2 && getCell(row, col - 1)?.type === value && getCell(row, col - 2)?.type === value) ||
            (row >= 2 && getCell(row - 1, col)?.type === value && getCell(row - 2, col)?.type === value))
        ) {
          value = randomType();
          guard += 1;
        }
        state.board.push(makeTile(value));
      }
    }
  }

  function renderStageGrid() {
    const unlocked = loadUnlocked();
    const records = loadRecords();
    nodes.stageGrid.innerHTML = "";
    stages.forEach((stage, index) => {
      const button = document.createElement("button");
      const isUnlocked = index < unlocked;
      button.type = "button";
      button.className = `stage-card ${isUnlocked ? "" : "locked"}`;
      button.disabled = !isUnlocked;
      button.innerHTML = `
        <strong>${stage.id}</strong>
        <span>${t("stageName", { stage: stage.id })}</span>
        <em>${isUnlocked ? `${goalLabel(stage)} · ${t("best", { score: records[stage.id] || 0 })}` : t("locked")}</em>
      `;
      button.addEventListener("click", () => startStage(index));
      nodes.stageGrid.append(button);
    });
  }

  function renderBoard(dropMap = new Map()) {
    nodes.board.innerHTML = "";
    state.board.forEach((tile, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `tile tile-${snacks.indexOf(tile.type)}`;
      button.textContent = snackIcon[tile.type];
      button.dataset.index = String(index);
      button.dataset.tileId = String(tile.id);
      button.setAttribute("aria-label", tile.type);
      if (dropMap.has(tile.id)) {
        button.classList.add("dropping");
        button.style.setProperty("--drop", `${-dropMap.get(tile.id) * 112}%`);
      }
      if (state.selected === index) button.classList.add("selected");
      button.addEventListener("pointerdown", onPointerDown);
      button.addEventListener("pointerup", onPointerUp);
      button.addEventListener("click", onTileClick);
      nodes.board.append(button);
    });
  }

  function updateHud() {
    const oldScore = nodes.scoreText.textContent;
    nodes.stageText.textContent = String(activeStage().id);
    nodes.movesText.textContent = String(state.moves);
    nodes.targetText.textContent = goalProgress();
    nodes.scoreText.textContent = String(state.score);
    if (oldScore !== nodes.scoreText.textContent) bump(nodes.scoreText);
  }

  function bump(node) {
    node.classList.remove("score-pop");
    void node.offsetWidth;
    node.classList.add("score-pop");
  }

  function isNeighbor(a, b) {
    const ar = Math.floor(a / size);
    const ac = a % size;
    const br = Math.floor(b / size);
    const bc = b % size;
    return Math.abs(ar - br) + Math.abs(ac - bc) === 1;
  }

  function swap(a, b) {
    const temp = state.board[a];
    state.board[a] = state.board[b];
    state.board[b] = temp;
  }

  function findMatches() {
    const matched = new Set();
    for (let row = 0; row < size; row += 1) {
      let runStart = 0;
      for (let col = 1; col <= size; col += 1) {
        const same = col < size && getCell(row, col)?.type === getCell(row, runStart)?.type;
        if (!same) {
          if (col - runStart >= 3) {
            for (let mark = runStart; mark < col; mark += 1) matched.add(row * size + mark);
          }
          runStart = col;
        }
      }
    }
    for (let col = 0; col < size; col += 1) {
      let runStart = 0;
      for (let row = 1; row <= size; row += 1) {
        const same = row < size && getCell(row, col)?.type === getCell(runStart, col)?.type;
        if (!same) {
          if (row - runStart >= 3) {
            for (let mark = runStart; mark < row; mark += 1) matched.add(mark * size + col);
          }
          runStart = row;
        }
      }
    }
    return [...matched];
  }

  function markMatches(indices) {
    indices.forEach((index) => {
      const tile = nodes.board.querySelector(`[data-index="${index}"]`);
      if (tile) tile.classList.add("matching");
    });
    spawnMatchEffects(indices);
  }

  function spawnMatchEffects(indices) {
    indices.forEach((index, order) => {
      const row = Math.floor(index / size);
      const col = index % size;
      const effect = document.createElement("span");
      effect.className = "match-spark";
      effect.textContent = "+";
      effect.style.left = `${((col + 0.5) / size) * 100}%`;
      effect.style.top = `${((row + 0.5) / size) * 100}%`;
      effect.style.animationDelay = `${Math.min(order * 18, 90)}ms`;
      nodes.board.append(effect);
    });
  }

  function collapse(matches) {
    const removed = new Set(matches);
    const newBoard = new Array(size * size);
    const dropMap = new Map();

    for (let col = 0; col < size; col += 1) {
      const survivors = [];
      for (let row = size - 1; row >= 0; row -= 1) {
        const index = row * size + col;
        const tile = state.board[index];
        if (!removed.has(index)) survivors.push({ tile, oldRow: row });
      }

      let targetRow = size - 1;
      survivors.forEach(({ tile, oldRow }) => {
        newBoard[targetRow * size + col] = tile;
        const distance = Math.max(0, targetRow - oldRow);
        if (distance > 0) dropMap.set(tile.id, distance);
        targetRow -= 1;
      });

      while (targetRow >= 0) {
        const tile = makeTile(randomType());
        newBoard[targetRow * size + col] = tile;
        dropMap.set(tile.id, targetRow + 1);
        targetRow -= 1;
      }
    }

    state.board = newBoard;
    return dropMap;
  }

  function resolveBoard() {
    const matches = findMatches();
    if (!matches.length) {
      state.combo = 1;
      state.busy = false;
      updateHud();
      renderBoard();
      checkEnd();
      return;
    }

    const stage = activeStage();
    state.score += matches.length * 12 * state.combo;
    if (stage.goal === "collect") {
      state.goalCount += matches.filter((index) => state.board[index]?.type === stage.snack).length;
    }
    state.combo += 1;
    updateHud();
    if (!state.goalReady && goalMet(stage)) {
      state.goalReady = true;
      nodes.hintText.textContent = t("goalReady");
    }
    markMatches(matches);
    window.WonderSound?.play(matches.length >= 5 ? "success" : "coin");

    window.setTimeout(() => {
      const dropMap = collapse(matches);
      renderBoard(dropMap);
      window.setTimeout(resolveBoard, 300);
    }, 220);
  }

  function trySwap(target) {
    if (!state.running || state.busy || state.selected === null || target === state.selected) return;
    if (!isNeighbor(state.selected, target)) {
      state.selected = target;
      renderBoard();
      return;
    }

    const first = state.selected;
    state.selected = null;
    state.busy = true;
    swap(first, target);
    renderBoard();

    if (!findMatches().length) {
      window.WonderSound?.play("wrong");
      window.setTimeout(() => {
        swap(first, target);
        state.combo = 1;
        state.busy = false;
        updateHud();
        renderBoard();
      }, 170);
      return;
    }

    state.moves -= 1;
    updateHud();
    window.WonderSound?.play("click");
    window.setTimeout(resolveBoard, 120);
  }

  function onTileClick(event) {
    if (state.suppressClick) {
      state.suppressClick = false;
      return;
    }
    if (state.dragStart) return;
    const index = Number(event.currentTarget.dataset.index);
    if (state.selected === null) {
      state.selected = index;
      renderBoard();
      return;
    }
    trySwap(index);
  }

  function onPointerDown(event) {
    const index = Number(event.currentTarget.dataset.index);
    state.dragStart = { index, x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event) {
    if (!state.dragStart) return;
    const dx = event.clientX - state.dragStart.x;
    const dy = event.clientY - state.dragStart.y;
    const distance = Math.hypot(dx, dy);
    const start = state.dragStart.index;
    state.dragStart = null;
    if (distance < 20) return;

    let target = start;
    if (Math.abs(dx) > Math.abs(dy)) {
      target = start + (dx > 0 ? 1 : -1);
    } else {
      target = start + (dy > 0 ? size : -size);
    }
    if (target < 0 || target >= size * size || !isNeighbor(start, target)) return;
    state.selected = start;
    state.suppressClick = true;
    trySwap(target);
  }

  function startStage(index) {
    if (index >= loadUnlocked()) return;
    window.WonderSound?.unlock();
    window.WonderSound?.play("start");
    state.currentStageIndex = index;
    state.score = 0;
    state.moves = activeStage().moves;
    state.combo = 1;
    state.goalCount = 0;
    state.goalReady = false;
    state.selected = null;
    state.running = true;
    state.busy = false;
    buildCleanBoard();
    updateHud();
    renderBoard();
    nodes.hintText.textContent = t("hint");
    nodes.menuPanel.classList.add("hidden");
    nodes.resultPanel.classList.add("hidden");
    nodes.hud.classList.remove("hidden");
    nodes.playPanel.classList.remove("hidden");
    window.WonderAnalytics?.track("game_start", {
      game_id: GAME_ID,
      stage: activeStage().id,
      goal: activeStage().goal,
    });
  }

  function checkEnd() {
    if (!state.running || state.busy) return;
    if (state.moves <= 0) finishStage(goalMet());
  }

  function finishStage(cleared) {
    state.running = false;
    state.busy = true;
    const stage = activeStage();
    const best = saveRecord(stage.id, state.score)[stage.id] || state.score;
    if (cleared && stage.id < stages.length) {
      saveUnlocked(Math.max(loadUnlocked(), stage.id + 1));
    }

    nodes.resultTitle.textContent = cleared ? t("clear") : t("failed");
    nodes.resultText.textContent = cleared
      ? t(stage.id === stages.length ? "finalClearText" : "clearText", { score: state.score, goal: goalLabel(stage), best })
      : t("failedText", { score: state.score, goal: goalLabel(stage) });
    nodes.resultStars.textContent = cleared ? starRating() : "";
    nodes.nextBtn.classList.toggle("hidden", !cleared || stage.id >= stages.length);
    nodes.hud.classList.add("hidden");
    nodes.playPanel.classList.add("hidden");
    nodes.resultPanel.classList.remove("hidden");
    window.WonderSound?.play(cleared ? "win" : "wrong");
    window.WonderAnalytics?.track("game_complete", {
      game_id: GAME_ID,
      stage: stage.id,
      score: state.score,
      goal: stage.goal,
      cleared,
    });
  }

  function starRating() {
    const stage = activeStage();
    if (stage.goal === "collect") {
      if (state.goalCount >= stage.target + 8) return "★★★";
      if (state.goalCount >= stage.target + 4) return "★★";
      return "★";
    }
    if (state.score >= stage.target * 1.55) return "★★★";
    if (state.score >= stage.target * 1.25) return "★★";
    return "★";
  }

  function showMenu() {
    state.running = false;
    state.busy = false;
    nodes.hud.classList.add("hidden");
    nodes.playPanel.classList.add("hidden");
    nodes.resultPanel.classList.add("hidden");
    nodes.menuPanel.classList.remove("hidden");
    renderStageGrid();
    window.WonderAnalytics?.track("game_menu", { game_id: GAME_ID });
  }

  function installLoading() {
    let progress = 0;
    const id = window.setInterval(() => {
      progress = Math.min(100, progress + 20);
      nodes.loadingText.textContent = `${progress}%`;
      nodes.loadingFill.style.width = `${progress}%`;
      if (progress >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => nodes.loadingPanel.classList.add("hidden"), 120);
      }
    }, 70);
  }

  nodes.nextBtn.addEventListener("click", () => startStage(Math.min(state.currentStageIndex + 1, stages.length - 1)));
  nodes.againBtn.addEventListener("click", () => startStage(state.currentStageIndex));
  nodes.menuBtn.addEventListener("click", showMenu);
  nodes.localeSelect.addEventListener("change", (event) => setLocale(event.target.value));
  nodes.homeLink.addEventListener("click", (event) => {
    if (state.running || !nodes.resultPanel.classList.contains("hidden")) {
      event.preventDefault();
      showMenu();
    }
  });

  try {
    setLocale(localStorage.getItem(localeKey) || window.WonderI18n?.locale?.() || "en");
  } catch {
    setLocale("en");
  }
  installLoading();
})();
