(() => {
  const GAME_ID = "garden-tiles";
  const UNLOCK_KEY = "gardenTilesUnlocked";
  const STARS_KEY = "gardenTilesStars";
  const titleText = document.querySelector("#titleText");
  const languageLabel = document.querySelector("#languageLabel");
  const localeSelect = document.querySelector("#localeSelect");
  const levelLabel = document.querySelector("#levelLabel");
  const movesLabel = document.querySelector("#movesLabel");
  const pairsLabel = document.querySelector("#pairsLabel");
  const levelText = document.querySelector("#levelText");
  const movesText = document.querySelector("#movesText");
  const pairsText = document.querySelector("#pairsText");
  const levelSelect = document.querySelector("#levelSelect");
  const levelSelectTitle = document.querySelector("#levelSelectTitle");
  const levelMessage = document.querySelector("#levelMessage");
  const levelGrid = document.querySelector("#levelGrid");
  const boardPanel = document.querySelector("#boardPanel");
  const board = document.querySelector("#board");
  const message = document.querySelector("#message");
  const resultPanel = document.querySelector("#resultPanel");
  const resultTitle = document.querySelector("#resultTitle");
  const resultText = document.querySelector("#resultText");
  const stars = document.querySelector("#stars");
  const nextBtn = document.querySelector("#nextBtn");
  const againBtn = document.querySelector("#againBtn");
  const levelsBtn = document.querySelector("#levelsBtn");
  const lobbyLink = document.querySelector("#lobbyLink");
  const loadingPanel = document.querySelector("#loadingPanel");

  const dictionary = {
    en: {
      title: "Garden Tile Match",
      language: "Language",
      level: "Level",
      moves: "Moves",
      pairs: "Pairs",
      chooseLevel: "Choose Level",
      locked: "Level locked",
      selectFirst: "Pick a tile, then find its matching pair.",
      matched: "Nice match.",
      miss: "Try another pair.",
      clear: "Level Clear",
      result: "{moves} moves. {pairs} pairs matched.",
      next: "Next Level",
      again: "Play Again",
      levels: "Levels",
      lobby: "Lobby",
      allClear: "All levels cleared.",
    },
    "zh-Hant": {
      title: "花園配對",
      language: "語言",
      level: "關卡",
      moves: "步數",
      pairs: "配對",
      chooseLevel: "選擇關卡",
      locked: "關卡尚未解鎖",
      selectFirst: "先點一張，再找相同的一張。",
      matched: "配對成功。",
      miss: "再試另一組。",
      clear: "關卡完成",
      result: "{moves} 步，完成 {pairs} 組配對。",
      next: "下一關",
      again: "再玩一次",
      levels: "選關",
      lobby: "大廳",
      allClear: "全部關卡完成。",
    },
  };

  const icons = ["🌹", "🌻", "🌷", "🦋", "🐦", "🍓", "🍎", "🧺", "🌿", "🍄", "🪴", "☕", "🏡", "🌼", "🐝", "🥕", "🧤", "💧"];
  const levels = [
    { pairs: 6, cols: 4, starMoves: [12, 15] },
    { pairs: 8, cols: 4, starMoves: [16, 20] },
    { pairs: 10, cols: 5, starMoves: [20, 25] },
    { pairs: 12, cols: 4, starMoves: [24, 30] },
    { pairs: 14, cols: 4, starMoves: [28, 35] },
    { pairs: 15, cols: 5, starMoves: [30, 38] },
    { pairs: 16, cols: 4, starMoves: [32, 41] },
    { pairs: 18, cols: 6, starMoves: [36, 46] },
    { pairs: 20, cols: 5, starMoves: [40, 52] },
    { pairs: 24, cols: 6, starMoves: [48, 62] },
  ];

  let unlocked = readNumber(UNLOCK_KEY, 1);
  let starMap = readJson(STARS_KEY, {});
  let currentLevelIndex = 0;
  let selectedTile = null;
  let tiles = [];
  let moves = 0;
  let matchedPairs = 0;
  let busy = false;

  function locale() {
    return window.WonderI18n?.locale?.() || "en";
  }

  function t(key, params = {}) {
    const table = dictionary[locale()] || dictionary.en;
    const fallback = dictionary.en;
    let value = table[key] || fallback[key] || key;
    for (const [name, param] of Object.entries(params)) {
      value = value.replaceAll(`{${name}}`, String(param));
    }
    return value;
  }

  function readNumber(key, fallback) {
    const value = Number(localStorage.getItem(key));
    return Number.isFinite(value) && value > 0 ? value : fallback;
  }

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch {
      return fallback;
    }
  }

  function saveProgress() {
    localStorage.setItem(UNLOCK_KEY, String(unlocked));
    localStorage.setItem(STARS_KEY, JSON.stringify(starMap));
  }

  function applyText() {
    document.documentElement.lang = locale();
    titleText.textContent = t("title");
    languageLabel.textContent = t("language");
    levelLabel.textContent = t("level");
    movesLabel.textContent = t("moves");
    pairsLabel.textContent = t("pairs");
    levelSelectTitle.textContent = t("chooseLevel");
    nextBtn.textContent = t("next");
    againBtn.textContent = t("again");
    levelsBtn.textContent = t("levels");
    lobbyLink.textContent = t("lobby");
    renderLevelGrid();
    updateHud();
  }

  function renderLevelGrid() {
    levelGrid.innerHTML = "";
    levels.forEach((level, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = String(index + 1);
      button.dataset.level = String(index);
      const stars = starMap[index + 1] || 0;
      if (index + 1 > unlocked) button.classList.add("locked");
      if (stars > 0) button.classList.add("completed");
      if (index + 1 === unlocked) button.classList.add("challenge");
      button.setAttribute("aria-label", `${t("level")} ${index + 1}`);
      levelGrid.append(button);
    });
  }

  function showLevelSelect() {
    resultPanel.classList.add("hidden");
    boardPanel.classList.add("hidden");
    levelSelect.classList.remove("hidden");
    message.textContent = "";
    levelMessage.textContent = "";
    renderLevelGrid();
    updateHud();
  }

  function startLevel(index) {
    if (index + 1 > unlocked) {
      showMessage(t("locked"));
      window.WonderSound?.play?.("wrong");
      return;
    }
    currentLevelIndex = index;
    const level = levels[index];
    selectedTile = null;
    moves = 0;
    matchedPairs = 0;
    busy = false;
    tiles = makeTiles(level.pairs, index);
    board.style.setProperty("--cols", level.cols);
    levelSelect.classList.add("hidden");
    boardPanel.classList.remove("hidden");
    resultPanel.classList.add("hidden");
    renderBoard();
    showMessage(t("selectFirst"));
    updateHud();
    window.WonderAnalytics?.track?.("level_start", { game_id: GAME_ID, level: index + 1 });
  }

  function makeTiles(pairCount, levelIndex) {
    const levelIcons = icons.slice(0, Math.min(icons.length, pairCount + 3));
    const picks = [];
    for (let i = 0; i < pairCount; i += 1) {
      const icon = levelIcons[(i + levelIndex) % levelIcons.length];
      picks.push({ icon, matched: false, id: `${i}a` }, { icon, matched: false, id: `${i}b` });
    }
    return shuffle(picks).map((tile, index) => ({ ...tile, index }));
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function renderBoard() {
    board.innerHTML = "";
    for (const tile of tiles) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tile";
      button.dataset.index = String(tile.index);
      button.textContent = tile.icon;
      button.setAttribute("aria-label", tile.icon);
      if (tile.matched) button.classList.add("matched");
      if (selectedTile?.index === tile.index) button.classList.add("selected");
      board.append(button);
    }
  }

  function selectTile(index) {
    if (busy) return;
    const tile = tiles.find((item) => item.index === index);
    if (!tile || tile.matched) return;
    if (!selectedTile) {
      selectedTile = tile;
      renderBoard();
      window.WonderSound?.play?.("click");
      return;
    }
    if (selectedTile.index === tile.index) {
      selectedTile = null;
      renderBoard();
      return;
    }
    moves += 1;
    if (selectedTile.icon === tile.icon) {
      selectedTile.matched = true;
      tile.matched = true;
      matchedPairs += 1;
      selectedTile = null;
      showMessage(t("matched"));
      window.WonderSound?.play?.("success");
      renderBoard();
      if (matchedPairs === levels[currentLevelIndex].pairs) finishLevel();
    } else {
      const first = selectedTile.index;
      const second = tile.index;
      selectedTile = null;
      busy = true;
      showMessage(t("miss"));
      window.WonderSound?.play?.("wrong");
      renderBoard();
      markWrong(first, second);
      setTimeout(() => {
        busy = false;
        renderBoard();
      }, 360);
    }
    updateHud();
  }

  function markWrong(first, second) {
    for (const index of [first, second]) {
      const button = board.querySelector(`[data-index="${index}"]`);
      button?.classList.add("wrong");
    }
  }

  function finishLevel() {
    const starCount = getStarsForLevel(currentLevelIndex, moves);
    const levelNumber = currentLevelIndex + 1;
    starMap[levelNumber] = Math.max(starMap[levelNumber] || 0, starCount);
    unlocked = Math.max(unlocked, Math.min(levels.length, levelNumber + 1));
    saveProgress();
    resultTitle.textContent = t("clear");
    stars.textContent = "★".repeat(starCount) + "☆".repeat(3 - starCount);
    resultText.textContent = t("result", { moves, pairs: matchedPairs });
    nextBtn.classList.toggle("hidden", currentLevelIndex >= levels.length - 1);
    resultPanel.classList.remove("hidden");
    window.WonderAnalytics?.track?.("level_clear", { game_id: GAME_ID, level: levelNumber, moves, stars: starCount });
  }

  function getStarsForLevel(index, moveCount) {
    const [three, two] = levels[index].starMoves;
    if (moveCount <= three) return 3;
    if (moveCount <= two) return 2;
    return 1;
  }

  function updateHud() {
    levelText.textContent = `${currentLevelIndex + 1} / ${levels.length}`;
    movesText.textContent = String(moves);
    const total = levels[currentLevelIndex]?.pairs || 0;
    pairsText.textContent = `${matchedPairs} / ${total}`;
  }

  function showMessage(text) {
    message.textContent = text;
    levelMessage.textContent = text;
  }

  board.addEventListener("click", (event) => {
    const button = event.target.closest("[data-index]");
    if (!button) return;
    selectTile(Number(button.dataset.index));
  });

  levelGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-level]");
    if (!button) return;
    startLevel(Number(button.dataset.level));
  });

  nextBtn.addEventListener("click", () => startLevel(Math.min(currentLevelIndex + 1, levels.length - 1)));
  againBtn.addEventListener("click", () => startLevel(currentLevelIndex));
  levelsBtn.addEventListener("click", showLevelSelect);
  localeSelect.addEventListener("change", () => {
    window.WonderI18n?.setLocale?.(localeSelect.value);
    applyText();
  });
  window.addEventListener("wonder:locale-change", () => {
    localeSelect.value = locale();
    applyText();
  });

  localeSelect.value = locale();
  applyText();
  showLevelSelect();
  loadingPanel.classList.add("hidden");
  window.WonderAnalytics?.track?.("game_ready", { game_id: GAME_ID });
})();
