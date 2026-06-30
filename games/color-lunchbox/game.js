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
    carrot: { nameKey: "food_carrot", color: "orange", image: "assets/food-carrot.svg" },
    orange: { nameKey: "food_orange", color: "orange", image: "assets/food-orange.svg" },
    eggplant: { nameKey: "food_eggplant", color: "purple", image: "assets/food-eggplant.svg" },
    grapes: { nameKey: "food_grapes", color: "purple", image: "assets/food-grapes.svg" },
    rice: { nameKey: "food_rice", color: "white", image: "assets/food-rice.svg" },
    yogurt: { nameKey: "food_yogurt", color: "white", image: "assets/food-yogurt.svg" },
    bread: { nameKey: "food_bread", color: "brown", image: "assets/food-bread.svg" },
    chocolate: { nameKey: "food_chocolate", color: "brown", image: "assets/food-chocolate.svg" },
    watermelon: { nameKey: "food_watermelon", color: "red", image: "assets/food-watermelon.svg" },
    corn: { nameKey: "food_corn", color: "yellow", image: "assets/food-corn.svg" },
    cucumber: { nameKey: "food_cucumber", color: "green", image: "assets/food-cucumber.svg" },
    fish: { nameKey: "food_fish", color: "gray", image: "assets/food-fish.svg" },
    peach: { nameKey: "food_peach", color: "pink", image: "assets/food-peach.svg" },
    blackSesame: { nameKey: "food_black_sesame", color: "black", image: "assets/food-black-sesame.svg" },
    soda: { nameKey: "food_soda", color: "cyan", image: "assets/food-soda.svg" },
    purplePotato: { nameKey: "food_purple_potato", color: "purple", image: "assets/food-purple-potato.svg" },
  };

  const colorDB = {
    red: { labelKey: "color_red", className: "red" },
    yellow: { labelKey: "color_yellow", className: "yellow" },
    blue: { labelKey: "color_blue", className: "blue" },
    green: { labelKey: "color_green", className: "green" },
    orange: { labelKey: "color_orange", className: "orange" },
    purple: { labelKey: "color_purple", className: "purple" },
    white: { labelKey: "color_white", className: "white" },
    brown: { labelKey: "color_brown", className: "brown" },
    gray: { labelKey: "color_gray", className: "gray" },
    pink: { labelKey: "color_pink", className: "pink" },
    black: { labelKey: "color_black", className: "black" },
    cyan: { labelKey: "color_cyan", className: "cyan" },
  };

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
      stage1Name: "Level 1: Fruit Starter",
      stage1Desc: "Classic red, yellow, blue, and green foods.",
      stage2Name: "Level 2: Breakfast Box",
      stage2Desc: "New orange, purple, white, and brown foods.",
      stage3Name: "Level 3: Garden Picnic",
      stage3Desc: "Fresh picnic foods with four new color choices.",
      stage4Name: "Level 4: Sweet Snack",
      stage4Desc: "Sort soft pink, black, white, and brown treats.",
      stage5Name: "Level 5: Market Mix",
      stage5Desc: "A busy market with eight different foods.",
      stage6Name: "Level 6: Rainbow Lunch",
      stage6Desc: "A brighter lunch with orange and purple boxes.",
      stage7Name: "Level 7: Cool Drinks",
      stage7Desc: "Blue, cyan, white, and yellow make a chilly set.",
      stage8Name: "Level 8: Veggie Day",
      stage8Desc: "Green, orange, purple, and red vegetables appear.",
      stage9Name: "Level 9: Big Buffet",
      stage9Desc: "Many foods from every theme are mixed together.",
      stage10Name: "Level 10: Color Party",
      stage10Desc: "The final party changes colors and foods quickly.",
      food_strawberry: "Strawberry",
      food_tomato: "Tomato",
      food_banana: "Banana",
      food_cheese: "Cheese",
      food_milk: "Milk",
      food_blueberry: "Blueberry",
      food_broccoli: "Broccoli",
      food_apple: "Apple",
      food_carrot: "Carrot",
      food_orange: "Orange",
      food_eggplant: "Eggplant",
      food_grapes: "Grapes",
      food_rice: "Rice",
      food_yogurt: "Yogurt",
      food_bread: "Bread",
      food_chocolate: "Chocolate",
      food_watermelon: "Watermelon",
      food_corn: "Corn",
      food_cucumber: "Cucumber",
      food_fish: "Fish",
      food_peach: "Peach",
      food_black_sesame: "Black Sesame",
      food_soda: "Soda",
      food_purple_potato: "Purple Potato",
      color_red: "Red",
      color_yellow: "Yellow",
      color_blue: "Blue",
      color_green: "Green",
      color_orange: "Orange",
      color_purple: "Purple",
      color_white: "White",
      color_brown: "Brown",
      color_gray: "Gray",
      color_pink: "Pink",
      color_black: "Black",
      color_cyan: "Cyan",
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
      wrong: "換另一個盒子看看！",
      winTitle: "關卡完成！",
      winDesc: "分數 {score}，下一個便當盒解鎖了。",
      allClearTitle: "全部完成！",
      allClearDesc: "你完成所有顏色便當盒關卡，太棒了！",
      nextStage: "下一關",
      again: "再玩一次",
      levels: "選關",
      lobby: "大廳",
      locked: "未解鎖",
      play: "開始玩",
      loading: "載入中",
      stage1Name: "第 1 關：水果入門",
      stage1Desc: "經典紅、黃、藍、綠食物。",
      stage2Name: "第 2 關：早餐便當",
      stage2Desc: "加入橘、紫、白、棕的新食物。",
      stage3Name: "第 3 關：花園野餐",
      stage3Desc: "新鮮野餐食物與新的顏色組合。",
      stage4Name: "第 4 關：甜點小盒",
      stage4Desc: "分辨粉紅、黑、白、棕的甜點。",
      stage5Name: "第 5 關：市場混合",
      stage5Desc: "市場裡有八種不同食物。",
      stage6Name: "第 6 關：彩虹午餐",
      stage6Desc: "橘色與紫色便當盒也加入挑戰。",
      stage7Name: "第 7 關：清涼飲品",
      stage7Desc: "藍、青、白、黃組成涼涼的一關。",
      stage8Name: "第 8 關：蔬菜日",
      stage8Desc: "綠、橘、紫、紅的蔬菜登場。",
      stage9Name: "第 9 關：大餐自助吧",
      stage9Desc: "不同主題的食物全部混在一起。",
      stage10Name: "第 10 關：顏色派對",
      stage10Desc: "最後派對會快速切換顏色與食物。",
      food_strawberry: "草莓",
      food_tomato: "番茄",
      food_banana: "香蕉",
      food_cheese: "起司",
      food_milk: "牛奶",
      food_blueberry: "藍莓",
      food_broccoli: "花椰菜",
      food_apple: "蘋果",
      food_carrot: "紅蘿蔔",
      food_orange: "柳橙",
      food_eggplant: "茄子",
      food_grapes: "葡萄",
      food_rice: "白飯",
      food_yogurt: "優格",
      food_bread: "麵包",
      food_chocolate: "巧克力",
      food_watermelon: "西瓜",
      food_corn: "玉米",
      food_cucumber: "小黃瓜",
      food_fish: "魚",
      food_peach: "水蜜桃",
      food_black_sesame: "黑芝麻",
      food_soda: "汽水",
      food_purple_potato: "紫薯",
      color_red: "紅色",
      color_yellow: "黃色",
      color_blue: "藍色",
      color_green: "綠色",
      color_orange: "橘色",
      color_purple: "紫色",
      color_white: "白色",
      color_brown: "棕色",
      color_gray: "灰色",
      color_pink: "粉紅色",
      color_black: "黑色",
      color_cyan: "青色",
    },
  };

  const stages = [
    { id: 1, nameKey: "stage1Name", descKey: "stage1Desc", colors: ["red", "yellow", "blue", "green"], foods: ["strawberry", "banana", "blueberry", "apple"], rounds: 8 },
    { id: 2, nameKey: "stage2Name", descKey: "stage2Desc", colors: ["orange", "purple", "white", "brown"], foods: ["carrot", "eggplant", "rice", "bread"], rounds: 8 },
    { id: 3, nameKey: "stage3Name", descKey: "stage3Desc", colors: ["red", "yellow", "green", "purple"], foods: ["tomato", "corn", "cucumber", "grapes"], rounds: 10 },
    { id: 4, nameKey: "stage4Name", descKey: "stage4Desc", colors: ["pink", "black", "white", "brown"], foods: ["peach", "blackSesame", "yogurt", "chocolate"], rounds: 10 },
    { id: 5, nameKey: "stage5Name", descKey: "stage5Desc", colors: ["orange", "blue", "green", "gray"], foods: ["orange", "blueberry", "broccoli", "fish", "carrot", "soda", "apple", "milk"], rounds: 12 },
    { id: 6, nameKey: "stage6Name", descKey: "stage6Desc", colors: ["red", "orange", "purple", "brown"], foods: ["watermelon", "tomato", "carrot", "orange", "eggplant", "purplePotato", "bread", "chocolate"], rounds: 12 },
    { id: 7, nameKey: "stage7Name", descKey: "stage7Desc", colors: ["blue", "cyan", "white", "yellow"], foods: ["blueberry", "soda", "milk", "yogurt", "banana", "cheese", "corn", "rice"], rounds: 14 },
    { id: 8, nameKey: "stage8Name", descKey: "stage8Desc", colors: ["green", "orange", "purple", "red"], foods: ["broccoli", "cucumber", "carrot", "orange", "eggplant", "purplePotato", "tomato", "strawberry"], rounds: 14 },
    { id: 9, nameKey: "stage9Name", descKey: "stage9Desc", colors: ["pink", "gray", "black", "yellow"], foods: ["peach", "fish", "blackSesame", "banana", "corn", "cheese", "soda", "yogurt"], rounds: 16 },
    { id: 10, nameKey: "stage10Name", descKey: "stage10Desc", colors: ["red", "orange", "purple", "cyan"], foods: ["strawberry", "watermelon", "orange", "carrot", "grapes", "purplePotato", "soda", "blueberry"], rounds: 16 },
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

  function getStageBoxes(stage) {
    return stage.colors.map((color) => ({ color, ...colorDB[color] }));
  }

  function setupBoxes(stage) {
    dropZone.replaceChildren(
      ...getStageBoxes(stage).map((box) => {
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

    setupBoxes(stage);
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

  homeLink.addEventListener("click", (event) => {
    if (!stageSelectPanel.classList.contains("hidden")) return;
    event.preventDefault();
    window.WonderSound?.play("click");
    showStageSelect();
  });

  translateStaticUI();
  simulateLoading();
})();
