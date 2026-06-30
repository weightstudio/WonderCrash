(function () {
  const size = 7;
  const types = ["🍓", "🍪", "🍬", "🍇", "🧀", "🥨"];
  const duration = 60;
  const scoreKey = "snackBlocksTopScores";
  const localeKey = "weightplayLocale";

  const text = {
    en: {
      brand: "WeightPlay",
      title: "Snack Blocks",
      language: "Language",
      score: "Score",
      time: "Time",
      combo: "Combo",
      menuTitle: "Swap snacks. Clear lines.",
      menuText: "Make matches of 3 or more before time runs out.",
      start: "Start",
      hint: "Tap or drag a snack to swap with its neighbor.",
      loading: "Loading",
      timeUp: "Time Up!",
      result: "Score: {score}. Best: {best}.",
      again: "Play Again",
      menu: "Menu",
      lobby: "Lobby",
      empty: "No scores yet",
      rank: "Rank {rank}",
    },
    "zh-Hant": {
      brand: "WeightPlay",
      title: "零食方塊",
      language: "語言",
      score: "分數",
      time: "時間",
      combo: "連擊",
      menuTitle: "交換零食，連線消除。",
      menuText: "時間內湊出 3 個以上相同零食，挑戰最高分。",
      start: "開始",
      hint: "點一下或拖曳零食，和旁邊的格子交換。",
      loading: "載入中",
      timeUp: "時間到！",
      result: "分數：{score}。最佳：{best}。",
      again: "再玩一次",
      menu: "主選單",
      lobby: "大廳",
      empty: "尚無紀錄",
      rank: "第 {rank} 名",
    },
  };

  const nodes = {
    homeLink: document.getElementById("homeLink"),
    titleText: document.getElementById("titleText"),
    brandText: document.getElementById("brandText"),
    languageLabel: document.getElementById("languageLabel"),
    localeSelect: document.getElementById("localeSelect"),
    hud: document.getElementById("hud"),
    scoreLabel: document.getElementById("scoreLabel"),
    timeLabel: document.getElementById("timeLabel"),
    comboLabel: document.getElementById("comboLabel"),
    scoreText: document.getElementById("scoreText"),
    timeText: document.getElementById("timeText"),
    comboText: document.getElementById("comboText"),
    menuPanel: document.getElementById("menuPanel"),
    menuTitle: document.getElementById("menuTitle"),
    menuText: document.getElementById("menuText"),
    startBtn: document.getElementById("startBtn"),
    leaderboard: document.getElementById("leaderboard"),
    playPanel: document.getElementById("playPanel"),
    board: document.getElementById("board"),
    hintText: document.getElementById("hintText"),
    resultPanel: document.getElementById("resultPanel"),
    resultTitle: document.getElementById("resultTitle"),
    resultText: document.getElementById("resultText"),
    resultLeaderboard: document.getElementById("resultLeaderboard"),
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
    time: duration,
    combo: 1,
    running: false,
    busy: false,
    timerId: null,
    dragStart: null,
    suppressClick: false,
  };

  function t(key, data = {}) {
    let value = (text[state.locale] && text[state.locale][key]) || text.en[key] || key;
    Object.keys(data).forEach((name) => {
      value = value.replace(`{${name}}`, data[name]);
    });
    return value;
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
    nodes.scoreLabel.textContent = t("score");
    nodes.timeLabel.textContent = t("time");
    nodes.comboLabel.textContent = t("combo");
    nodes.menuTitle.textContent = t("menuTitle");
    nodes.menuText.textContent = t("menuText");
    nodes.startBtn.textContent = t("start");
    nodes.hintText.textContent = t("hint");
    nodes.loadingTitle.textContent = t("loading");
    nodes.resultTitle.textContent = t("timeUp");
    nodes.againBtn.textContent = t("again");
    nodes.menuBtn.textContent = t("menu");
    nodes.lobbyLink.textContent = t("lobby");
    renderLeaderboard(nodes.leaderboard);
    if (!nodes.resultPanel.classList.contains("hidden")) {
      renderResultText();
      renderLeaderboard(nodes.resultLeaderboard);
    }
  }

  function randomType() {
    return Math.floor(Math.random() * types.length);
  }

  function getCell(row, col) {
    return state.board[row * size + col];
  }

  function setCell(row, col, value) {
    state.board[row * size + col] = value;
  }

  function buildCleanBoard() {
    state.board = [];
    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        let value = randomType();
        let guard = 0;
        while (
          guard < 20 &&
          ((col >= 2 && getCell(row, col - 1) === value && getCell(row, col - 2) === value) ||
            (row >= 2 && getCell(row - 1, col) === value && getCell(row - 2, col) === value))
        ) {
          value = randomType();
          guard += 1;
        }
        state.board.push(value);
      }
    }
  }

  function renderBoard() {
    nodes.board.innerHTML = "";
    state.board.forEach((type, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `tile tile-${type}`;
      button.textContent = types[type];
      button.dataset.index = String(index);
      button.setAttribute("aria-label", types[type]);
      if (state.selected === index) button.classList.add("selected");
      button.addEventListener("pointerdown", onPointerDown);
      button.addEventListener("pointerup", onPointerUp);
      button.addEventListener("click", onTileClick);
      nodes.board.append(button);
    });
  }

  function updateHud() {
    nodes.scoreText.textContent = String(state.score);
    nodes.timeText.textContent = String(state.time);
    nodes.comboText.textContent = `x${state.combo}`;
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
        const same = col < size && getCell(row, col) === getCell(row, runStart);
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
        const same = row < size && getCell(row, col) === getCell(runStart, col);
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
  }

  function collapse(matches) {
    matches.forEach((index) => {
      state.board[index] = null;
    });

    for (let col = 0; col < size; col += 1) {
      const column = [];
      for (let row = size - 1; row >= 0; row -= 1) {
        const value = getCell(row, col);
        if (value !== null) column.push(value);
      }
      while (column.length < size) column.push(randomType());
      for (let row = size - 1; row >= 0; row -= 1) {
        setCell(row, col, column[size - 1 - row]);
      }
    }
  }

  function resolveBoard() {
    const matches = findMatches();
    if (!matches.length) {
      state.combo = 1;
      updateHud();
      state.busy = false;
      renderBoard();
      return;
    }

    state.score += matches.length * 10 * state.combo;
    state.combo += 1;
    updateHud();
    markMatches(matches);
    window.WonderSound?.play(matches.length >= 5 ? "success" : "coin");

    window.setTimeout(() => {
      collapse(matches);
      renderBoard();
      window.setTimeout(resolveBoard, 120);
    }, 170);
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
      }, 150);
      return;
    }

    window.WonderSound?.play("click");
    window.setTimeout(resolveBoard, 110);
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

  function loadScores() {
    try {
      const parsed = JSON.parse(localStorage.getItem(scoreKey));
      return Array.isArray(parsed) ? parsed.filter(Number.isFinite).slice(0, 5) : [];
    } catch {
      return [];
    }
  }

  function saveScore(score) {
    const scores = [...loadScores(), score].sort((a, b) => b - a).slice(0, 5);
    try {
      localStorage.setItem(scoreKey, JSON.stringify(scores));
    } catch {
      // Leaderboard persistence is optional.
    }
    return scores;
  }

  function renderLeaderboard(container, scores = loadScores()) {
    container.innerHTML = "";
    if (!scores.length) {
      const row = document.createElement("div");
      row.className = "leaderboard-row";
      row.innerHTML = `<span>${t("empty")}</span><strong>0</strong>`;
      container.append(row);
      return;
    }
    scores.forEach((score, index) => {
      const row = document.createElement("div");
      row.className = "leaderboard-row";
      row.innerHTML = `<span>${t("rank", { rank: index + 1 })}</span><strong>${score}</strong>`;
      container.append(row);
    });
  }

  function renderResultText() {
    const best = Math.max(state.score, ...loadScores(), 0);
    nodes.resultText.textContent = t("result", { score: state.score, best });
  }

  function showMenu() {
    state.running = false;
    state.busy = false;
    window.clearInterval(state.timerId);
    nodes.hud.classList.add("hidden");
    nodes.playPanel.classList.add("hidden");
    nodes.resultPanel.classList.add("hidden");
    nodes.menuPanel.classList.remove("hidden");
    renderLeaderboard(nodes.leaderboard);
    window.WonderAnalytics?.track("game_menu", { game_id: "snack-blocks" });
  }

  function startGame() {
    window.WonderSound?.unlock();
    window.WonderSound?.play("start");
    state.score = 0;
    state.time = duration;
    state.combo = 1;
    state.selected = null;
    state.running = true;
    state.busy = false;
    buildCleanBoard();
    updateHud();
    renderBoard();
    nodes.menuPanel.classList.add("hidden");
    nodes.resultPanel.classList.add("hidden");
    nodes.hud.classList.remove("hidden");
    nodes.playPanel.classList.remove("hidden");
    window.clearInterval(state.timerId);
    state.timerId = window.setInterval(() => {
      state.time -= 1;
      updateHud();
      if (state.time <= 0) finishGame();
    }, 1000);
    window.WonderAnalytics?.track("game_start", { game_id: "snack-blocks" });
  }

  function finishGame() {
    if (!state.running) return;
    state.running = false;
    state.busy = true;
    window.clearInterval(state.timerId);
    const scores = saveScore(state.score);
    renderResultText();
    renderLeaderboard(nodes.resultLeaderboard, scores);
    nodes.hud.classList.add("hidden");
    nodes.playPanel.classList.add("hidden");
    nodes.resultPanel.classList.remove("hidden");
    window.WonderSound?.play("win");
    window.WonderAnalytics?.track("game_complete", {
      game_id: "snack-blocks",
      score: state.score,
    });
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

  nodes.startBtn.addEventListener("click", startGame);
  nodes.againBtn.addEventListener("click", startGame);
  nodes.menuBtn.addEventListener("click", showMenu);
  nodes.localeSelect.addEventListener("change", (event) => setLocale(event.target.value));
  nodes.homeLink.addEventListener("click", (event) => {
    if (state.running || !nodes.resultPanel.classList.contains("hidden")) {
      event.preventDefault();
      showMenu();
    }
  });

  try {
    setLocale(localStorage.getItem(localeKey) || window.WeightPlayI18n?.getLocale?.() || "en");
  } catch {
    setLocale("en");
  }
  installLoading();
})();
