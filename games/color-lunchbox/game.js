(function () {
  const localeSelect = document.querySelector("#localeSelect");
  const languageLabel = document.querySelector("#languageLabel");
  const titleText = document.querySelector("#titleText");
  const stageSelectPanel = document.querySelector("#stageSelectPanel");
  const stageSelectTitle = document.querySelector("#stageSelectTitle");
  const stageGrid = document.querySelector("#stageGrid");
  const gameHud = document.querySelector("#gameHud");
  const levelIndicator = document.querySelector("#levelIndicator");
  const progressFill = document.querySelector("#progressFill");
  const scoreText = document.querySelector("#scoreText");
  const roundText = document.querySelector("#roundText");
  const gamePlayContent = document.querySelector("#gamePlayContent");
  const dropZone = document.querySelector("#dropZone");
  const foodCard = document.querySelector("#foodCard");
  const foodImage = document.querySelector("#foodImage");
  const foodName = document.querySelector("#foodName");
  const feedbackText = document.querySelector("#feedbackText");
  const resultPanel = document.querySelector("#resultPanel");
  const resultTitle = document.querySelector("#resultTitle");
  const resultText = document.querySelector("#resultText");
  const nextStageBtn = document.querySelector("#nextStageBtn");
  const againBtn = document.querySelector("#againBtn");
  const stageSelectBtn = document.querySelector("#stageSelectBtn");
  const lobbyLink = document.querySelector("#lobbyLink");
  const homeLink = document.querySelector("#homeLink");
  const loadingPanel = document.querySelector("#loadingPanel");
  const loadingText = document.querySelector("#loadingText");
  const loadingFill = document.querySelector("#loadingFill");

  const GAME_ID = "color-lunchbox";
  const UNLOCK_KEY = "colorLunchboxUnlockedStage";

  const foodsDB = {
    strawberry: { nameKey: "food_strawberry", color: "red", image: "assets/food-strawberry.svg" },
    tomato: { nameKey: "food_tomato", color: "red", image: "assets/food-tomato.svg" },
    banana: { nameKey: "food_banana", color: "yellow", image: "assets/food-banana.svg" },
    cheese: { nameKey: "food_cheese", color: "yellow", image: "assets/food-cheese.svg" },
    blueberry: { nameKey: "food_blueberry", color: "blue", image: "assets/food-blueberry.svg" },
    milk: { nameKey: "food_milk", color: "blue", image: "assets/food-milk.svg" },
    broccoli: { nameKey: "food_broccoli", color: "green", image: "assets/food-broccoli.svg" },
    apple: { nameKey: "food_apple", color: "green", image: "assets/food-apple.svg" },
  };

  const boxes = [
    { color: "red", labelKey: "color_red", className: "red" },
    { color: "yellow", labelKey: "color_yellow", className: "yellow" },
    { color: "blue", labelKey: "color_blue", className: "blue" },
    { color: "green", labelKey: "color_green", className: "green" },
  ];

  const dictionary = {
    en: {
      title: "Color Lunchbox",
      language: "Language",
      chooseLevel: "Choose Level",
      scoreLabel: "Score",
      roundLabel: "Progress",
      levelLabel: "Level",
      ready: "Drag the food to the matching lunchbox.",
      correct: "Yum! Correct!",
      wrong: "Try another box!",
      winTitle: "Level Complete!",
      winDesc: "Score {score}. You unlocked the next lunchbox.",
      allClearTitle: "All Clear!",
      allClearDesc: "You completed every lunchbox level. Wonderful!",
      nextStage: "Next Level",
      again: "Play Again",
      levels: "Levels",
      lobby: "Lobby",
      locked: "Locked",
      play: "Play",
      loading: "Loading",
      stage1Name: "Level 1: Fruit Box",
      stage1Desc: "Match red, yellow, blue, and green fruits.",
      stage2Name: "Level 2: Veggie & Dairy",
      stage2Desc: "Sort tomatoes, broccoli, cheese, and milk.",
      stage3Name: "Level 3: Picnic Box",
      stage3Desc: "A mixed picnic with every color.",
      stage4Name: "Level 4: Quick Lunch",
      stage4Desc: "More food cards, faster decisions.",
      stage5Name: "Level 5: Rainbow Meal",
      stage5Desc: "A longer color challenge for careful players.",
      stage6Name: "Level 6: Family Feast",
      stage6Desc: "Clear the biggest lunchbox set.",
      food_strawberry: "Strawberry",
      food_tomato: "Tomato",
      food_banana: "Banana",
      food_cheese: "Cheese",
      food_milk: "Milk",
      food_blueberry: "Blueberry",
      food_broccoli: "Broccoli",
      food_apple: "Apple",
      color_red: "Red",
      color_yellow: "Yellow",
      color_blue: "Blue",
      color_green: "Green",
    },
    "zh-Hant": {
      title: "顏色便當盒",
      language: "語言",
      chooseLevel: "選擇關卡",
      scoreLabel: "分數",
      roundLabel: "進度",
      levelLabel: "關卡",
      ready: "把食物拖到相同顏色的便當盒。",
      correct: "好吃！答對了！",
      wrong: "再試試別的盒子！",
      winTitle: "關卡完成！",
      winDesc: "分數 {score}，下一關已解鎖。",
      allClearTitle: "全部完成！",
      allClearDesc: "你完成所有顏色便當盒關卡，太棒了！",
      nextStage: "下一關",
      again: "再玩一次",
      levels: "選關",
      lobby: "回大廳",
      locked: "未解鎖",
      play: "開始",
      loading: "載入中",
      stage1Name: "第 1 關：水果盒",
      stage1Desc: "配對紅、黃、藍、綠色水果。",
      stage2Name: "第 2 關：蔬菜與乳品",
      stage2Desc: "整理番茄、花椰菜、起司和牛奶。",
      stage3Name: "第 3 關：野餐盒",
      stage3Desc: "所有顏色一起出現的混合野餐。",
      stage4Name: "第 4 關：快速午餐",
      stage4Desc: "食物更多，需要更快判斷。",
      stage5Name: "第 5 關：彩虹餐盒",
      stage5Desc: "更長的顏色挑戰，適合細心玩家。",
      stage6Name: "第 6 關：家庭大餐",
      stage6Desc: "完成最大份的便當盒挑戰。",
      food_strawberry: "草莓",
      food_tomato: "番茄",
      food_banana: "香蕉",
      food_cheese: "起司",
      food_milk: "牛奶",
      food_blueberry: "藍莓",
      food_broccoli: "花椰菜",
      food_apple: "蘋果",
      color_red: "紅色",
      color_yellow: "黃色",
      color_blue: "藍色",
      color_green: "綠色",
    },
  };

  const stages = [
    { id: 1, nameKey: "stage1Name", descKey: "stage1Desc", foods: ["strawberry", "banana", "blueberry", "apple"], rounds: 8 },
    { id: 2, nameKey: "stage2Name", descKey: "stage2Desc", foods: ["tomato", "cheese", "milk", "broccoli"], rounds: 8 },
    { id: 3, nameKey: "stage3Name", descKey: "stage3Desc", foods: ["strawberry", "tomato", "banana", "cheese", "blueberry", "milk", "broccoli", "apple"], rounds: 10 },
    { id: 4, nameKey: "stage4Name", descKey: "stage4Desc", foods: ["strawberry", "banana", "tomato", "cheese", "blueberry", "broccoli"], rounds: 12 },
    { id: 5, nameKey: "stage5Name", descKey: "stage5Desc", foods: ["strawberry", "tomato", "banana", "cheese", "blueberry", "milk", "broccoli", "apple"], rounds: 14 },
    { id: 6, nameKey: "stage6Name", descKey: "stage6Desc", foods: ["strawberry", "tomato", "banana", "cheese", "blueberry", "milk", "broccoli", "apple"], rounds: 16 },
  ];

  const state = {
    stageIndex: 0,
    deck: [],
    index: 0,
    score: 0,
    mistakes: 0,
    unlockedStage: 1,
    dragging: false,
    startX: 0,
    startY: 0,
    ready: false,
  };

  function locale() {
    return window.WonderI18n?.locale() || "en";
  }

  function t(key, params = {}) {
    const table = dictionary[locale()] || dictionary.en;
    const fallback = dictionary.en;
    const raw = table[key] || fallback[key] || key;
    return Object.entries(params).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, String(value)), raw);
  }

  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function loadUnlockedStage() {
    try {
      const saved = Number(localStorage.getItem(UNLOCK_KEY));
      state.unlockedStage = Number.isFinite(saved) && saved >= 1 ? Math.min(saved, stages.length) : 1;
    } catch {
      state.unlockedStage = 1;
    }
  }

  function saveUnlockedStage(value) {
    state.unlockedStage = Math.max(state.unlockedStage, Math.min(value, stages.length));
    try {
      localStorage.setItem(UNLOCK_KEY, String(state.unlockedStage));
    } catch {
      // Local progress is optional.
    }
  }

  function translateStaticUI() {
    document.documentElement.lang = locale();
    localeSelect.value = locale();
    languageLabel.textContent = t("language");
    titleText.textContent = t("title");
    stageSelectTitle.textContent = t("chooseLevel");
    document.querySelector("#scoreLabel").textContent = t("scoreLabel");
    document.querySelector("#roundLabel").textContent = t("roundLabel");
    document.querySelector("#loadingTitle").textContent = t("loading");
    nextStageBtn.textContent = t("nextStage");
    againBtn.textContent = t("again");
    stageSelectBtn.textContent = t("levels");
    lobbyLink.textContent = t("lobby");
    homeLink.setAttribute("aria-label", t("lobby"));
    feedbackText.textContent = state.deck.length ? feedbackText.textContent : t("ready");

    if (!stageSelectPanel.classList.contains("hidden")) renderStageCards();
    if (!gameHud.classList.contains("hidden")) updateHUD();
    if (state.deck.length > 0 && state.index < state.deck.length) loadFood();
  }

  function simulateLoading() {
    const assets = Object.values(foodsDB).map((food) => food.image);
    let loaded = 0;
    function step() {
      loaded += 1;
      const percent = Math.min(100, Math.round((loaded / Math.max(assets.length, 1)) * 100));
      loadingText.textContent = `${percent}%`;
      loadingFill.style.width = `${percent}%`;
      if (loaded >= assets.length) {
        state.ready = true;
        loadUnlockedStage();
        loadingPanel.classList.add("hidden");
        window.WonderAnalytics?.track("game_ready", { game_id: GAME_ID });
        showStageSelect();
      }
    }
    assets.forEach((src) => {
      const image = new Image();
      image.onload = step;
      image.onerror = step;
      image.src = src;
    });
  }

  function showStageSelect() {
    resultPanel.classList.add("hidden");
    gameHud.classList.add("hidden");
    gamePlayContent.classList.add("hidden");
    stageSelectPanel.classList.remove("hidden");
    renderStageCards();
  }

  function renderStageCards() {
    stageGrid.replaceChildren(
      ...stages.map((stage, index) => {
        const isUnlocked = stage.id <= state.unlockedStage;
        const button = document.createElement("button");
        button.type = "button";
        button.className = `stage-card ${isUnlocked ? "unlocked" : "locked"}`;
        button.disabled = !isUnlocked;
        button.innerHTML = `
          <span>${isUnlocked ? t("play") : t("locked")}</span>
          <strong>${t(stage.nameKey)}</strong>
          <small>${t(stage.descKey)}</small>
        `;
        if (isUnlocked) button.addEventListener("click", () => startStage(index));
        return button;
      }),
    );
  }

  function setupBoxes() {
    dropZone.replaceChildren(
      ...boxes.map((box) => {
        const element = document.createElement("button");
        element.className = `lunchbox ${box.className}`;
        element.type = "button";
        element.dataset.color = box.color;
        element.innerHTML = `<span></span><strong>${t(box.labelKey)}</strong>`;
        element.addEventListener("click", () => submitColor(box.color, element));
        return element;
      }),
    );
  }

  function startStage(stageIndex) {
    const stage = stages[stageIndex];
    state.stageIndex = stageIndex;
    state.score = 0;
    state.index = 0;
    state.mistakes = 0;

    const pool = stage.foods.map((id) => foodsDB[id]);
    const deck = [];
    while (deck.length < stage.rounds) deck.push(...shuffle(pool));
    state.deck = deck.slice(0, stage.rounds);

    stageSelectPanel.classList.add("hidden");
    resultPanel.classList.add("hidden");
    gameHud.classList.remove("hidden");
    gamePlayContent.classList.remove("hidden");
    feedbackText.textContent = t("ready");
    foodCard.style.pointerEvents = "";

    setupBoxes();
    updateHUD();
    loadFood();
    window.WonderSound?.play("click");
    window.WonderAnalytics?.track("game_start", { game_id: GAME_ID, stage: stage.id, locale: locale() });
  }

  function updateHUD() {
    const stage = stages[state.stageIndex];
    levelIndicator.textContent = `${t("levelLabel")} ${stage.id} / ${stages.length}`;
    progressFill.style.width = `${(state.index / state.deck.length) * 100}%`;
    scoreText.textContent = String(state.score);
    roundText.textContent = `${Math.min(state.index + 1, state.deck.length)} / ${state.deck.length}`;
  }

  function loadFood() {
    const food = state.deck[state.index];
    if (!food) return;
    foodImage.src = food.image;
    foodImage.alt = t(food.nameKey);
    foodName.textContent = t(food.nameKey);
    foodCard.style.transform = "";
    foodCard.classList.remove("pop", "shake");
    foodCard.style.pointerEvents = "";
  }

  function submitColor(color, target) {
    if (!state.ready || foodCard.style.pointerEvents === "none") return;
    const food = state.deck[state.index];

    if (color !== food.color) {
      state.mistakes += 1;
      feedbackText.textContent = t("wrong");
      window.WonderSound?.play("wrong");
      window.WonderAnalytics?.track("game_answer", {
        game_id: GAME_ID,
        result: "wrong",
        stage: stages[state.stageIndex].id,
        food: food.nameKey,
        selected_color: color,
        correct_color: food.color,
        round: state.index + 1,
      });
      foodCard.classList.remove("shake");
      foodCard.offsetWidth;
      foodCard.classList.add("shake");
      target?.classList.add("miss");
      setTimeout(() => target?.classList.remove("miss"), 260);
      return;
    }

    const bonus = Math.max(4, 12 - Math.min(state.mistakes, 6));
    state.score += bonus;
    feedbackText.textContent = t("correct");
    window.WonderSound?.play("success");
    window.WonderAnalytics?.track("game_answer", {
      game_id: GAME_ID,
      result: "correct",
      stage: stages[state.stageIndex].id,
      food: food.nameKey,
      selected_color: color,
      round: state.index + 1,
    });

    foodCard.style.pointerEvents = "none";
    target?.classList.add("hit");
    foodCard.classList.remove("pop");
    foodCard.offsetWidth;
    foodCard.classList.add("pop");

    setTimeout(() => {
      target?.classList.remove("hit");
      state.index += 1;
      if (state.index >= state.deck.length) finishStage();
      else {
        updateHUD();
        loadFood();
      }
    }, 520);
    updateHUD();
  }

  function finishStage() {
    progressFill.style.width = "100%";
    const stage = stages[state.stageIndex];
    saveUnlockedStage(stage.id + 1);
    const isFinalStage = stage.id >= stages.length;
    resultTitle.textContent = isFinalStage ? t("allClearTitle") : t("winTitle");
    resultText.textContent = isFinalStage ? t("allClearDesc") : t("winDesc", { score: state.score });
    nextStageBtn.classList.toggle("hidden", isFinalStage);
    foodCard.style.pointerEvents = "none";
    resultPanel.classList.remove("hidden");
    window.WonderSound?.play("win");
    window.WonderAnalytics?.track("game_complete", {
      game_id: GAME_ID,
      stage: stage.id,
      score: state.score,
      total_rounds: state.deck.length,
      mistakes: state.mistakes,
      locale: locale(),
    });
  }

  function getPoint(event) {
    const point = event.touches?.[0] || event;
    return { x: point.clientX, y: point.clientY };
  }

  function startDrag(event) {
    if (!state.ready || foodCard.style.pointerEvents === "none") return;
    const point = getPoint(event);
    state.dragging = true;
    state.startX = point.x;
    state.startY = point.y;
    foodCard.classList.add("dragging");
    event.preventDefault();
  }

  function moveDrag(event) {
    if (!state.dragging) return;
    const point = getPoint(event);
    foodCard.style.transform = `translate(${point.x - state.startX}px, ${point.y - state.startY}px)`;
    event.preventDefault();
  }

  function endDrag(event) {
    if (!state.dragging) return;
    const point = getPoint(event.changedTouches?.[0] || event);
    state.dragging = false;
    foodCard.classList.remove("dragging");
    foodCard.style.transform = "";
    foodCard.style.pointerEvents = "none";
    const target = document.elementFromPoint(point.x, point.y)?.closest(".lunchbox");
    foodCard.style.pointerEvents = "";
    if (target) submitColor(target.dataset.color, target);
  }

  foodCard.addEventListener("pointerdown", startDrag);
  window.addEventListener("pointermove", moveDrag);
  window.addEventListener("pointerup", endDrag);

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
    window.WonderAnalytics?.track("game_restart", {
      game_id: GAME_ID,
      stage: stages[state.stageIndex].id,
      locale: locale(),
    });
    startStage(state.stageIndex);
  });
  nextStageBtn.addEventListener("click", () => startStage(Math.min(state.stageIndex + 1, stages.length - 1)));
  stageSelectBtn.addEventListener("click", () => {
    window.WonderSound?.play("click");
    showStageSelect();
  });

  translateStaticUI();
  simulateLoading();
})();
