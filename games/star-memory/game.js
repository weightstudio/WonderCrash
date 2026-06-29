(function () {
  // DOM Elements
  const localeSelect = document.querySelector("#localeSelect");
  const languageLabel = document.querySelector("#languageLabel");
  const titleText = document.querySelector("#titleText");
  const stageSelectPanel = document.querySelector("#stageSelectPanel");
  const stageSelectTitle = document.querySelector("#stageSelectTitle");
  const stageGrid = document.querySelector("#stageGrid");
  
  const gameHud = document.querySelector("#gameHud");
  const levelIndicator = document.querySelector("#levelIndicator");
  const levelFill = document.querySelector("#levelFill");
  const scoreText = document.querySelector("#scoreText");
  const movesText = document.querySelector("#movesText");
  
  const gameBoardPanel = document.querySelector("#gameBoardPanel");
  const cardGrid = document.querySelector("#cardGrid");
  
  const gameFeedback = document.querySelector("#gameFeedback");
  const feedbackText = document.querySelector("#feedbackText");
  const comboContainer = document.querySelector("#comboContainer");
  const comboText = document.querySelector("#comboText");
  
  const resultPanel = document.querySelector("#resultPanel");
  const resultTitle = document.querySelector("#resultTitle");
  const resultText = document.querySelector("#resultText");
  const starContainer = document.querySelector("#starContainer");
  
  const nextLevelBtn = document.querySelector("#nextLevelBtn");
  const againBtn = document.querySelector("#againBtn");
  const stageSelectBtn = document.querySelector("#stageSelectBtn");
  
  const loadingPanel = document.querySelector("#loadingPanel");
  const loadingText = document.querySelector("#loadingText");
  const loadingFill = document.querySelector("#loadingFill");

  // Game Constants
  const GAME_ID = "star-memory";
  const UNLOCK_KEY = "starMemoryUnlockedLevel";
  const STARS_KEY_PREFIX = "starMemoryLevelStars_";
  const SCORE_KEY_PREFIX = "starMemoryLevelScore_";

  // Vector SVGs library
  const svgLibrary = {
    sun: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="22" fill="#f59e0b" /><path d="M50 5v14M50 81v14M5 50h14M81 50h14M18 18l10 10M72 72l10 10M18 82l10-10M72 28l10-10" stroke="#f59e0b" stroke-width="6" stroke-linecap="round" /></svg>`,
    
    moon: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M40 20a30 30 0 1 0 40 40 34 34 0 1 1-40-40z" fill="#fef08a" stroke="#eab308" stroke-width="4" stroke-linejoin="round" /></svg>`,
    
    star: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,10 62,38 92,38 68,56 77,84 50,67 23,84 32,56 8,38 38,38" fill="#fbbf24" stroke="#d97706" stroke-width="4" stroke-linejoin="round" /></svg>`,
    
    rocket: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 15c8 15 10 30 10 45H40c0-15 2-30 10-45z" fill="#ef4444" /><path d="M40 60h20l4 15H36z" fill="#94a3b8" /><path d="M35 50l-10 15h10zM65 50l10 15h-10z" fill="#dc2626" /><circle cx="50" cy="40" r="6" fill="#38bdf8" stroke="#0284c7" stroke-width="2" /><path d="M45 75l5 15 5-15z" fill="#f97316" /></svg>`,
    
    ufo: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="50" rx="35" ry="12" fill="#64748b" /><circle cx="50" cy="38" r="16" fill="#38bdf8" opacity="0.8" /><ellipse cx="50" cy="50" rx="25" ry="8" fill="#10b981" /><circle cx="35" cy="50" r="3" fill="#fff" /><circle cx="50" cy="52" r="3" fill="#fff" /><circle cx="65" cy="50" r="3" fill="#fff" /></svg>`,
    
    planet: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="20" fill="#8b5cf6" /><path d="M15 55c15-10 45-15 70 0" fill="none" stroke="#a78bfa" stroke-width="6" transform="rotate(-15 50 50)" /></svg>`,
    
    donut: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="30" fill="#f59e0b" /><circle cx="50" cy="50" r="28" fill="#f472b6" /><circle cx="50" cy="50" r="10" fill="#0f172a" /><circle cx="35" cy="35" r="2" fill="#fff" /><circle cx="65" cy="40" r="2" fill="#fbbf24" /><circle cx="45" cy="65" r="2" fill="#10b981" /><circle cx="58" cy="62" r="2" fill="#38bdf8" /></svg>`,
    
    heart: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 84C25 60 15 45 15 32c0-10 8-18 18-18 8 0 14 5 17 11 3-6 9-11 17-11 10 0 18 8 18 18 0 13-10 28-35 52z" fill="#ec4899" stroke="#be185d" stroke-width="4" stroke-linejoin="round" /></svg>`,
    
    panda: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="32" fill="#fff" stroke="#1e293b" stroke-width="2" /><circle cx="28" cy="28" r="10" fill="#1e293b" /><circle cx="72" cy="28" r="10" fill="#1e293b" /><ellipse cx="36" cy="48" rx="8" ry="10" fill="#1e293b" /><ellipse cx="64" cy="48" rx="8" ry="10" fill="#1e293b" /><circle cx="38" cy="46" r="3" fill="#fff" /><circle cx="62" cy="46" r="3" fill="#fff" /><ellipse cx="50" cy="58" rx="6" ry="4" fill="#1e293b" /><path d="M46 64q4 3 8 0" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round" /></svg>`,
    
    bear: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="78" cy="28" r="12" fill="#8b5a36" /><circle cx="22" cy="28" r="12" fill="#8b5a36" /><circle cx="50" cy="54" r="32" fill="#9b6840" /><circle cx="78" cy="28" r="6" fill="#d19a61" /><circle cx="22" cy="28" r="6" fill="#d19a61" /><ellipse cx="50" cy="62" rx="17" ry="12" fill="#d19a61" /><circle cx="38" cy="48" r="3" fill="#20140f" /><circle cx="62" cy="48" r="3" fill="#20140f" /><path d="M50 56l-5 5h10z" fill="#20140f" /><path d="M44 67q6 4 12 0" fill="none" stroke="#20140f" stroke-width="2" stroke-linecap="round" /></svg>`,
    
    lion: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="36" fill="#f97316" /><circle cx="50" cy="50" r="26" fill="#fbbf24" /><circle cx="38" cy="24" r="8" fill="#fbbf24" /><circle cx="62" cy="24" r="8" fill="#fbbf24" /><ellipse cx="40" cy="46" rx="4" ry="5" fill="#1e293b" /><ellipse cx="60" cy="46" rx="4" ry="5" fill="#1e293b" /><polygon points="50,52 46,56 54,56" fill="#1e293b" /><path d="M46 62q4 2 8 0" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round" /></svg>`,
    
    cat: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="52" r="30" fill="#cbd5e1" /><polygon points="25,30 35,5 45,28" fill="#cbd5e1" /><polygon points="75,30 65,5 55,28" fill="#cbd5e1" /><ellipse cx="40" cy="48" rx="4" ry="5" fill="#1e293b" /><ellipse cx="60" cy="48" rx="4" ry="5" fill="#1e293b" /><polygon points="50,55 46,58 54,58" fill="#ef4444" /><path d="M46 63q4 2 8 0" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round" /><path d="M20 54h15M20 58h15M80 54h-15M80 58h-15" stroke="#1e293b" stroke-width="2" /></svg>`,
    
    cardBack: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,15 58,38 83,38 63,53 71,76 50,61 29,76 37,53 17,38 42,38" fill="none" stroke="#3b82f6" stroke-width="6" stroke-linejoin="round" /><circle cx="50" cy="50" r="8" fill="#3b82f6" /></svg>`
  };

  // Local Translations Dictionary
  const dictionary = {
    en: {
      title: "Star Memory",
      language: "Language",
      chooseLevel: "Choose Level",
      level: "Level {current} / {total}",
      score: "Score",
      moves: "Moves",
      movesLimit: "{current} / {limit}",
      movesInfinite: "{current} / ∞",
      locked: "Locked",
      play: "Play",
      victory: "Level Clear!",
      defeat: "Moves Out!",
      allClear: "All Levels Clear!",
      victoryDesc: "You cleared the level in {moves} moves!",
      defeatDesc: "Try again to unlock the next level.",
      allClearDesc: "Fantastic! You cleared all 6 levels!",
      nextLevel: "Next Level",
      again: "Play Again",
      levels: "Levels",
      lobby: "Lobby",
      tipTap: "Tap cards to find matching pairs!",
      tipMatch: "Match found!",
      tipMismatch: "Not a match. Try again!",
      tipCombo: "Combo x{count}!",
      loading: "Loading",
      stage1Name: "Level 1: Space Easy",
      stage2Name: "Level 2: Cosmic Trio",
      stage3Name: "Level 3: Deep Space",
      stage4Name: "Level 4: Animal Friends",
      stage5Name: "Level 5: Sweet Snacks",
      stage6Name: "Level 6: Galaxy Masters",
      stage1Desc: "Warm up with 2 pairs and unlimited moves.",
      stage2Desc: "Match 3 pairs with 8 moves limit.",
      stage3Desc: "Match 6 pairs under 16 moves.",
      stage4Desc: "Find 8 cute animals in 22 moves.",
      stage5Desc: "Match 10 delicious treats in 28 moves.",
      stage6Desc: "Combine space and animals in 35 moves.",
      highScore: "High Score: {score}"
    },
    "zh-Hant": {
      title: "星星翻翻牌",
      language: "語言",
      chooseLevel: "選擇關卡",
      level: "第 {current} / {total} 關",
      score: "分數",
      moves: "步數",
      movesLimit: "{current} / {limit}",
      movesInfinite: "{current} / 無限制",
      locked: "未解鎖",
      play: "開始玩",
      victory: "通關成功！",
      defeat: "步數用盡！",
      allClear: "全關卡完美通關！",
      victoryDesc: "你用了 {moves} 步完成關卡！",
      defeatDesc: "再試一次以解鎖下一關。",
      allClearDesc: "太厲害了！你完成了全部 6 個關卡！",
      nextLevel: "下一關",
      again: "再玩一次",
      levels: "關卡列表",
      lobby: "回大廳",
      tipTap: "點擊卡牌翻開，尋找配對！",
      tipMatch: "配對成功！",
      tipMismatch: "配對失敗，再試試看！",
      tipCombo: "連續配對成功 x{count}！",
      loading: "載入中",
      stage1Name: "第一關：太空新手區",
      stage2Name: "第二關：宇宙三人組",
      stage3Name: "第三關：深空星系",
      stage4Name: "第四關：可愛動物園",
      stage5Name: "第五關：美味甜點盒",
      stage6Name: "第六關：星系大師挑戰",
      stage1Desc: "用 2 對卡牌與無限步數來暖暖身吧。",
      stage2Desc: "在 8 步內配對 3 對卡牌。",
      stage3Desc: "在 16 步內配對 6 對卡牌。",
      stage4Desc: "在 22 步內找出 8 隻可愛小動物。",
      stage5Desc: "在 28 步內配對 10 種美味小甜點。",
      stage6Desc: "混合太空與動物，35 步內極限挑戰。",
      highScore: "最高分: {score}"
    }
  };

  // Levels Configurations
  const stages = [
    {
      id: 1,
      nameKey: "stage1Name",
      descKey: "stage1Desc",
      grid: { r: 2, c: 2 },
      limit: Infinity,
      symbols: ["sun", "moon"],
      stars: [2, 3, Infinity]
    },
    {
      id: 2,
      nameKey: "stage2Name",
      descKey: "stage2Desc",
      grid: { r: 2, c: 3 },
      limit: 8,
      symbols: ["sun", "moon", "star"],
      stars: [4, 5, 8]
    },
    {
      id: 3,
      nameKey: "stage3Name",
      descKey: "stage3Desc",
      grid: { r: 3, c: 4 },
      limit: 16,
      symbols: ["sun", "moon", "star", "rocket", "ufo", "planet"],
      stars: [8, 10, 16]
    },
    {
      id: 4,
      nameKey: "stage4Name",
      descKey: "stage4Desc",
      grid: { r: 4, c: 4 },
      limit: 22,
      symbols: ["panda", "bear", "lion", "cat", "sun", "moon", "star", "rocket"],
      stars: [11, 13, 22]
    },
    {
      id: 5,
      nameKey: "stage5Name",
      descKey: "stage5Desc",
      grid: { r: 4, c: 5 },
      limit: 28,
      symbols: ["donut", "heart", "panda", "bear", "lion", "cat", "sun", "moon", "star", "rocket"],
      stars: [14, 17, 28]
    },
    {
      id: 6,
      nameKey: "stage6Name",
      descKey: "stage6Desc",
      grid: { r: 4, c: 6 },
      limit: 35,
      symbols: ["donut", "heart", "panda", "bear", "lion", "cat", "sun", "moon", "star", "rocket", "ufo", "planet"],
      stars: [18, 22, 35]
    }
  ];

  // Game State
  const state = {
    stageIndex: 0,
    score: 0,
    moves: 0,
    combo: 0,
    unlockedLevel: 1,
    selectedCards: [],
    matchedPairsCount: 0,
    isLocked: false,
    ready: false
  };

  // Helper Functions
  function locale() {
    return window.WonderI18n?.locale() || "en";
  }

  function t(key, params = {}) {
    const table = dictionary[locale()] || dictionary.en;
    const fallback = dictionary.en;
    let text = table[key] || fallback[key] || key;
    return Object.entries(params).reduce((str, [name, val]) => {
      return str.replaceAll(`{${name}}`, String(val));
    }, text);
  }

  function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  // Load and save localStorage stats
  function loadProgress() {
    try {
      const saved = Number(localStorage.getItem(UNLOCK_KEY));
      state.unlockedLevel = Number.isFinite(saved) && saved >= 1 ? Math.min(saved, stages.length) : 1;
    } catch {
      state.unlockedLevel = 1;
    }
  }

  function saveProgress(unlockedLevel) {
    state.unlockedLevel = Math.max(state.unlockedLevel, unlockedLevel);
    try {
      localStorage.setItem(UNLOCK_KEY, String(state.unlockedLevel));
    } catch {
      // LocalStorage is optional.
    }
  }

  function getLevelHighScore(levelId) {
    try {
      return Number(localStorage.getItem(SCORE_KEY_PREFIX + levelId)) || 0;
    } catch {
      return 0;
    }
  }

  function saveLevelHighScore(levelId, score) {
    const currentHigh = getLevelHighScore(levelId);
    if (score > currentHigh) {
      try {
        localStorage.setItem(SCORE_KEY_PREFIX + levelId, String(score));
      } catch {}
    }
  }

  function getLevelStars(levelId) {
    try {
      return Number(localStorage.getItem(STARS_KEY_PREFIX + levelId)) || 0;
    } catch {
      return 0;
    }
  }

  function saveLevelStars(levelId, stars) {
    const currentStars = getLevelStars(levelId);
    if (stars > currentStars) {
      try {
        localStorage.setItem(STARS_KEY_PREFIX + levelId, String(stars));
      } catch {}
    }
  }

  // UI Translating
  function translateStaticUI() {
    document.documentElement.lang = locale();
    localeSelect.value = locale();
    languageLabel.textContent = t("language");
    titleText.textContent = t("title");
    stageSelectTitle.textContent = t("chooseLevel");
    
    // HUD Labels
    document.querySelector("#scoreLabel").textContent = t("score");
    document.querySelector("#movesLabel").textContent = t("moves");
    
    // Button labels
    nextLevelBtn.textContent = t("nextLevel");
    againBtn.textContent = t("again");
    stageSelectBtn.textContent = t("levels");
    document.querySelector("#lobbyLink").textContent = t("lobby");
    document.querySelector("#homeLink").setAttribute("aria-label", t("lobby"));
    
    // HUD Level text
    if (!stageSelectPanel.classList.contains("hidden")) {
      renderStageGrid();
    } else {
      updateHUD();
    }
  }

  // Loading Simulation
  function simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        state.ready = true;
        loadProgress();
        loadingPanel.classList.add("hidden");
        window.WonderAnalytics?.track("game_ready", { game_id: GAME_ID });
        showStageSelect();
      }
      loadingText.textContent = `${progress}%`;
      loadingFill.style.width = `${progress}%`;
    }, 40);
  }

  // Stage Selection Screen
  function showStageSelect() {
    resultPanel.classList.add("hidden");
    gameHud.classList.add("hidden");
    gameBoardPanel.classList.add("hidden");
    gameFeedback.classList.add("hidden");
    stageSelectPanel.classList.remove("hidden");
    
    renderStageGrid();
  }

  function renderStageGrid() {
    stageGrid.replaceChildren(
      ...stages.map((stage, idx) => {
        const isUnlocked = stage.id <= state.unlockedLevel;
        const button = document.createElement("button");
        button.type = "button";
        button.className = `stage-card ${isUnlocked ? "unlocked" : "locked"}`;
        button.disabled = !isUnlocked;
        
        let starsStr = "";
        if (isUnlocked) {
          const starsEarned = getLevelStars(stage.id);
          starsStr = "⭐".repeat(starsEarned);
        }
        
        const highScoreVal = getLevelHighScore(stage.id);
        const scoreStr = highScoreVal > 0 ? `<br><small>${t("highScore", { score: highScoreVal })}</small>` : "";

        button.innerHTML = `
          <span>${isUnlocked ? t("play") : t("locked")}</span>
          <strong>${t(stage.nameKey)}</strong>
          <small>${t(stage.descKey)}</small>
          ${scoreStr}
          ${starsStr ? `<div class="stars-badge">${starsStr}</div>` : ""}
        `;
        
        if (isUnlocked) {
          button.addEventListener("click", () => startStage(idx));
        }
        return button;
      })
    );
  }

  // Start Gameplay Stage
  function startStage(stageIdx) {
    const stage = stages[stageIdx];
    state.stageIndex = stageIdx;
    state.score = 0;
    state.moves = 0;
    state.combo = 0;
    state.matchedPairsCount = 0;
    state.selectedCards = [];
    state.isLocked = false;

    // Analytics event
    window.WonderAnalytics?.track("game_start", {
      game_id: GAME_ID,
      stage: stage.id,
      locale: locale()
    });

    stageSelectPanel.classList.add("hidden");
    gameHud.classList.remove("hidden");
    gameBoardPanel.classList.remove("hidden");
    gameFeedback.classList.remove("hidden");
    
    feedbackText.textContent = t("tipTap");
    comboContainer.classList.add("hidden");
    
    updateHUD();
    generateGameBoard(stage);
  }

  function updateHUD() {
    const stage = stages[state.stageIndex];
    levelIndicator.textContent = t("level", { current: stage.id, total: stages.length });
    levelFill.style.width = `${(state.matchedPairsCount / stage.symbols.length) * 100}%`;
    scoreText.textContent = state.score;
    
    if (stage.limit === Infinity) {
      movesText.textContent = t("movesInfinite", { current: state.moves });
    } else {
      movesText.textContent = t("movesLimit", { current: state.moves, limit: stage.limit });
    }
  }

  // Generate Card Board
  function generateGameBoard(stage) {
    // Collect paired symbols
    const pairs = [...stage.symbols, ...stage.symbols];
    const shuffledPairs = shuffle(pairs);
    
    // Setup grid columns CSS variables
    cardGrid.style.setProperty("--grid-cols", stage.grid.c);
    cardGrid.style.gridTemplateColumns = `repeat(${stage.grid.c}, 1fr)`;
    
    cardGrid.replaceChildren(
      ...shuffledPairs.map((symbolId, cardIdx) => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.symbol = symbolId;
        card.dataset.index = cardIdx;
        
        card.innerHTML = `
          <div class="card-inner">
            <div class="card-back">${svgLibrary.cardBack}</div>
            <div class="card-front">${svgLibrary[symbolId]}</div>
          </div>
        `;
        
        card.addEventListener("click", () => handleCardClick(card));
        return card;
      })
    );
  }

  // Card Click Handling
  function handleCardClick(card) {
    if (state.isLocked) return;
    if (card.classList.contains("flipped") || card.classList.contains("matched")) return;
    
    // Flip the card
    card.classList.add("flipped");
    window.WonderSound?.play("click");
    state.selectedCards.push(card);
    
    if (state.selectedCards.length === 2) {
      verifyMatch();
    }
  }

  // Card Match Verification
  function verifyMatch() {
    state.isLocked = true;
    state.moves += 1;
    
    const [card1, card2] = state.selectedCards;
    const symbol1 = card1.dataset.symbol;
    const symbol2 = card2.dataset.symbol;
    
    const stage = stages[state.stageIndex];
    
    if (symbol1 === symbol2) {
      // It's a match!
      state.matchedPairsCount += 1;
      state.combo += 1;
      
      // Calculate scores
      const matchScore = 100 + (state.combo - 1) * 50;
      state.score += matchScore;
      
      card1.classList.add("matched");
      card2.classList.add("matched");
      
      // Feedback
      feedbackText.textContent = t("tipMatch");
      if (state.combo > 1) {
        comboText.textContent = `x${state.combo}`;
        comboContainer.classList.remove("hidden");
        // Simple scale animations
        comboContainer.style.animation = "none";
        setTimeout(() => comboContainer.style.animation = "", 10);
      }
      
      window.WonderSound?.play("success");
      
      // Analytics: match pair
      window.WonderAnalytics?.track("level_complete", {
        game_id: GAME_ID,
        stage: stage.id,
        pair_symbol: symbol1,
        combo: state.combo,
        locale: locale()
      });
      
      state.selectedCards = [];
      state.isLocked = false;
      updateHUD();
      
      // Check for win
      if (state.matchedPairsCount === stage.symbols.length) {
        setTimeout(finishGame, 600);
      }
    } else {
      // Mismatch
      state.combo = 0;
      comboContainer.classList.add("hidden");
      feedbackText.textContent = t("tipMismatch");
      
      window.WonderSound?.play("wrong");
      
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        state.selectedCards = [];
        state.isLocked = false;
      }, 800);
      
      updateHUD();
      
      // Check for lose (out of moves)
      if (state.moves >= stage.limit) {
        setTimeout(gameOver, 900);
      }
    }
  }

  // Game Victory Handling
  function finishGame() {
    const stage = stages[state.stageIndex];
    
    // Save progress to unlock next level
    saveProgress(stage.id + 1);
    
    // Calculate star ratings
    let starsEarned = 1;
    if (state.moves <= stage.stars[0]) {
      starsEarned = 3;
    } else if (state.moves <= stage.stars[1]) {
      starsEarned = 2;
    }
    
    // Add remaining moves score bonus
    const movesBonus = stage.limit !== Infinity ? Math.max(0, stage.limit - state.moves) * 50 : 0;
    state.score += movesBonus;
    
    // Save High Scores
    saveLevelHighScore(stage.id, state.score);
    saveLevelStars(stage.id, starsEarned);
    
    // Victory UI
    resultTitle.textContent = stage.id === stages.length ? t("allClear") : t("victory");
    resultText.textContent = stage.id === stages.length ? t("allClearDesc") : t("victoryDesc", { moves: state.moves });
    
    // Stars indicator
    document.querySelectorAll("#starContainer .star").forEach((star) => {
      const idx = Number(star.dataset.index);
      star.classList.toggle("active", idx <= starsEarned);
    });
    
    // Toggle next level button
    nextLevelBtn.classList.toggle("hidden", stage.id === stages.length);
    resultPanel.classList.remove("hidden");
    
    window.WonderSound?.play("win");
    
    // Analytics Level Complete
    window.WonderAnalytics?.track("game_complete", {
      game_id: GAME_ID,
      stage: stage.id,
      score: state.score,
      moves: state.moves,
      stars: starsEarned,
      locale: locale()
    });
  }

  // Game Over Handling
  function gameOver() {
    resultTitle.textContent = t("defeat");
    resultText.textContent = t("defeatDesc");
    
    // Stars indicator (none)
    document.querySelectorAll("#starContainer .star").forEach((star) => {
      star.classList.remove("active");
    });
    
    nextLevelBtn.classList.add("hidden");
    resultPanel.classList.remove("hidden");
    
    window.WonderSound?.play("wrong");
  }

  // Event Listeners
  localeSelect.addEventListener("change", () => {
    window.WonderSound?.play("click");
    window.WonderI18n?.setLocale(localeSelect.value);
  });

  localeSelect.addEventListener("input", () => {
    window.WonderSound?.play("click");
    window.WonderI18n?.setLocale(localeSelect.value);
  });

  window.addEventListener("wonder:locale-change", translateStaticUI);

  againBtn.addEventListener("click", () => {
    window.WonderSound?.play("click");
    window.WonderAnalytics?.track("game_restart", {
      game_id: GAME_ID,
      stage: stages[state.stageIndex].id,
      locale: locale()
    });
    startStage(state.stageIndex);
  });

  nextLevelBtn.addEventListener("click", () => {
    window.WonderSound?.play("click");
    startStage(Math.min(state.stageIndex + 1, stages.length - 1));
  });

  stageSelectBtn.addEventListener("click", () => {
    window.WonderSound?.play("click");
    showStageSelect();
  });

  // Initialization
  translateStaticUI();
  simulateLoading();

})();
