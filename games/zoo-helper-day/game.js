(() => {
  const GAME_ID = "zoo-helper-day";
  const localeKey = "weightplayLocale";
  const unlockKey = "weightplay_zoo_helper_unlocked";
  const starKey = "weightplay_zoo_helper_stars";

  const text = {
    en: {
      gameTitle: "Zoo Helper Day",
      language: "Language",
      chooseStage: "Choose Stage",
      menuHint: "Help animals finish gentle care tasks.",
      stages: "Stages",
      loading: "Loading",
      nextStage: "Next Stage",
      retry: "Try Again",
      lobby: "Lobby",
      locked: "Stage locked",
      great: "Great job!",
      perfect: "Perfect helper!",
      good: "Good helper!",
      keep: "Keep helping!",
      result: "You helped {animal} finish {count} tasks.",
      stage: "Stage {n}",
      task: "{animal} needs {item}.",
      correct: "Nice help!",
      wrong: "Try another item.",
      items: {
        fruit: "Fruit",
        water: "Water",
        brush: "Brush",
        toy: "Toy",
        leaf: "Leaves",
        shower: "Shower",
        fish: "Fish",
        ball: "Ball",
      },
      animals: {
        lion: "Lion",
        panda: "Panda",
        elephant: "Elephant",
        penguin: "Penguin",
        giraffe: "Giraffe",
        monkey: "Monkey",
        koala: "Koala",
        zebra: "Zebra",
      },
    },
    "zh-Hant": {
      gameTitle: "動物園小幫手",
      language: "語言",
      chooseStage: "選擇關卡",
      menuHint: "幫動物完成餵食、喝水、清潔和玩具任務。",
      stages: "選關",
      loading: "載入中",
      nextStage: "下一關",
      retry: "再玩一次",
      lobby: "大廳",
      locked: "關卡未解鎖",
      great: "完成照顧！",
      perfect: "完美小幫手！",
      good: "很棒的小幫手！",
      keep: "繼續照顧動物！",
      result: "你幫 {animal} 完成 {count} 個任務。",
      stage: "第 {n} 關",
      task: "{animal} 需要 {item}。",
      correct: "照顧成功！",
      wrong: "換一個試試看。",
      items: {
        fruit: "水果",
        water: "水",
        brush: "刷子",
        toy: "玩具",
        leaf: "葉子",
        shower: "沖澡",
        fish: "魚",
        ball: "球",
      },
      animals: {
        lion: "獅子",
        panda: "熊貓",
        elephant: "大象",
        penguin: "企鵝",
        giraffe: "長頸鹿",
        monkey: "猴子",
        koala: "無尾熊",
        zebra: "斑馬",
      },
    },
  };

  const itemIcons = {
    fruit: "\u{1F34C}",
    water: "\u{1F4A7}",
    brush: "\u{1FAA5}",
    toy: "\u{1F9F8}",
    leaf: "\u{1F33F}",
    shower: "\u{1F6BF}",
    fish: "\u{1F41F}",
    ball: "\u{1F3C0}",
  };

  const stages = [
    { animal: "lion", icon: "\u{1F981}", tasks: ["fruit", "water", "brush", "toy"], pool: ["fruit", "water", "brush", "toy", "leaf"] },
    { animal: "panda", icon: "\u{1F43C}", tasks: ["leaf", "water", "brush", "ball"], pool: ["leaf", "water", "brush", "ball", "fish"] },
    { animal: "elephant", icon: "\u{1F418}", tasks: ["shower", "fruit", "water", "toy", "brush"], pool: ["shower", "fruit", "water", "toy", "brush"] },
    { animal: "penguin", icon: "\u{1F427}", tasks: ["fish", "water", "ball", "brush", "fish"], pool: ["fish", "water", "ball", "brush", "fruit"] },
    { animal: "giraffe", icon: "\u{1F992}", tasks: ["leaf", "water", "fruit", "brush", "toy"], pool: ["leaf", "water", "fruit", "brush", "toy"] },
    { animal: "monkey", icon: "\u{1F412}", tasks: ["fruit", "ball", "water", "toy", "brush", "fruit"], pool: ["fruit", "ball", "water", "toy", "brush"] },
    { animal: "koala", icon: "\u{1F428}", tasks: ["leaf", "water", "brush", "toy", "fruit"], pool: ["leaf", "water", "brush", "toy", "fruit", "ball"] },
    { animal: "zebra", icon: "\u{1F993}", tasks: ["brush", "water", "ball", "shower", "fruit", "leaf"], pool: ["brush", "water", "ball", "shower", "fruit", "leaf"] },
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
    animalCard: $("animalCard"),
    animalEmoji: $("animalEmoji"),
    animalName: $("animalName"),
    requestText: $("requestText"),
    itemGrid: $("itemGrid"),
    feedbackText: $("feedbackText"),
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

  let locale = localStorage.getItem(localeKey) || "en";
  let unlocked = clamp(Number(localStorage.getItem(unlockKey)) || 1, 1, stages.length);
  let stars = readStars();
  let currentStage = 0;
  let currentTask = 0;
  let mistakes = 0;
  let acceptingInput = false;

  function t(key, data) {
    const parts = key.split(".");
    let value = text[locale] || text.en;
    for (const part of parts) value = value?.[part];
    if (typeof value !== "string") value = key;
    return Object.entries(data || {}).reduce((out, [name, item]) => out.replaceAll(`{${name}}`, item), value);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function readStars() {
    try {
      return JSON.parse(localStorage.getItem(starKey) || "{}");
    } catch {
      return {};
    }
  }

  function saveStars() {
    localStorage.setItem(starKey, JSON.stringify(stars));
  }

  function playSound(name) {
    window.WonderSound?.play?.(name);
  }

  function track(event, payload = {}) {
    window.WonderAnalytics?.track(event, { game_id: GAME_ID, ...payload });
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
        <b class="stage-icon">${stage.icon}</b>
        <strong>${t("stage", { n: stageNo })} - ${t(`animals.${stage.animal}`)}</strong>
        <span>${"★".repeat(stars[stageNo] || 0)}${"☆".repeat(3 - (stars[stageNo] || 0))}</span>
      `;
      button.addEventListener("click", () => {
        if (stageNo > unlocked) {
          showFloatingText(t("locked"));
          playSound("click");
          return;
        }
        startStage(index);
      });
      nodes.stageGrid.appendChild(button);
    });
  }

  function showMenu() {
    nodes.menuPanel.classList.remove("hidden");
    nodes.playPanel.classList.add("hidden");
    nodes.resultPanel.classList.add("hidden");
    renderStageGrid();
  }

  function startStage(index) {
    currentStage = index;
    currentTask = 0;
    mistakes = 0;
    acceptingInput = true;
    nodes.menuPanel.classList.add("hidden");
    nodes.playPanel.classList.remove("hidden");
    nodes.resultPanel.classList.add("hidden");
    track("game_start", { level: index + 1 });
    playSound("start");
    renderTask();
  }

  function renderTask() {
    const stage = stages[currentStage];
    const wanted = stage.tasks[currentTask];
    nodes.stageText.textContent = t("stage", { n: currentStage + 1 });
    nodes.progressFill.style.width = `${(currentTask / stage.tasks.length) * 100}%`;
    nodes.animalEmoji.textContent = stage.icon;
    nodes.animalName.textContent = t(`animals.${stage.animal}`);
    nodes.requestText.textContent = t("task", { animal: t(`animals.${stage.animal}`), item: t(`items.${wanted}`) });
    nodes.feedbackText.textContent = "";
    renderItems(stage, wanted);
  }

  function renderItems(stage, wanted) {
    const choices = [wanted, ...stage.pool.filter((item) => item !== wanted)].slice(0, 4);
    choices.sort(() => Math.random() - 0.5);
    nodes.itemGrid.innerHTML = "";
    choices.forEach((item) => {
      const button = document.createElement("button");
      button.className = "item-card";
      button.type = "button";
      button.draggable = true;
      button.dataset.item = item;
      button.innerHTML = `<b>${itemIcons[item]}</b><span>${t(`items.${item}`)}</span>`;
      button.addEventListener("click", () => chooseItem(item, button));
      button.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", item);
      });
      nodes.itemGrid.appendChild(button);
    });
  }

  function chooseItem(item, button) {
    if (!acceptingInput) return;
    const stage = stages[currentStage];
    const wanted = stage.tasks[currentTask];
    if (item !== wanted) {
      mistakes += 1;
      nodes.feedbackText.textContent = t("wrong");
      nodes.animalCard.classList.remove("wrong");
      button?.classList.remove("wrong");
      void nodes.animalCard.offsetWidth;
      nodes.animalCard.classList.add("wrong");
      button?.classList.add("wrong");
      playSound("wrong");
      track("game_answer", { level: currentStage + 1, correct: false, task: wanted, item });
      return;
    }

    acceptingInput = false;
    button?.classList.add("correct");
    nodes.animalCard.classList.remove("happy");
    void nodes.animalCard.offsetWidth;
    nodes.animalCard.classList.add("happy");
    nodes.feedbackText.textContent = t("correct");
    playSound("success");
    track("game_answer", { level: currentStage + 1, correct: true, task: wanted, item });
    setTimeout(() => {
      currentTask += 1;
      if (currentTask >= stage.tasks.length) {
        finishStage();
      } else {
        acceptingInput = true;
        renderTask();
      }
    }, 520);
  }

  function finishStage() {
    const stageNo = currentStage + 1;
    const stage = stages[currentStage];
    const earned = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
    stars[stageNo] = Math.max(stars[stageNo] || 0, earned);
    saveStars();
    if (stageNo === unlocked && unlocked < stages.length) {
      unlocked += 1;
      localStorage.setItem(unlockKey, String(unlocked));
    }
    nodes.progressFill.style.width = "100%";
    nodes.resultTitle.textContent = earned === 3 ? t("perfect") : earned === 2 ? t("good") : t("keep");
    nodes.starText.textContent = "★".repeat(earned) + "☆".repeat(3 - earned);
    nodes.resultText.textContent = t("result", { animal: t(`animals.${stage.animal}`), count: stage.tasks.length });
    nodes.nextStageBtn.classList.toggle("hidden", currentStage >= stages.length - 1);
    nodes.resultPanel.classList.remove("hidden");
    playSound("win");
    track("game_complete", { level: stageNo, stars: earned, mistakes });
  }

  function showFloatingText(message) {
    const toast = document.createElement("div");
    toast.className = "floating-toast";
    toast.textContent = message;
    Object.assign(toast.style, {
      position: "fixed",
      left: "50%",
      top: "52%",
      zIndex: "40",
      transform: "translate(-50%, -50%)",
      padding: "12px 18px",
      borderRadius: "999px",
      background: "rgba(24, 49, 38, 0.9)",
      color: "#fff",
      fontWeight: "900",
      animation: "toastUp 1.15s ease forwards",
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1200);
  }

  function initDragDrop() {
    nodes.animalCard.addEventListener("dragover", (event) => event.preventDefault());
    nodes.animalCard.addEventListener("drop", (event) => {
      event.preventDefault();
      const item = event.dataTransfer.getData("text/plain");
      const button = nodes.itemGrid.querySelector(`[data-item="${item}"]`);
      chooseItem(item, button);
    });
  }

  function initLoading() {
    let progress = 0;
    const timer = setInterval(() => {
      progress = Math.min(100, progress + 20);
      nodes.loadingText.textContent = `${progress}%`;
      nodes.loadingFill.style.width = `${progress}%`;
      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          nodes.loadingPanel.classList.add("hidden");
          track("game_ready");
        }, 180);
      }
    }, 110);
  }

  function bindEvents() {
    nodes.localeSelect.addEventListener("change", () => {
      locale = nodes.localeSelect.value;
      localStorage.setItem(localeKey, locale);
      localizeStatic();
      renderStageGrid();
      if (!nodes.playPanel.classList.contains("hidden")) renderTask();
    });
    nodes.backToStagesBtn.addEventListener("click", showMenu);
    nodes.resultStagesBtn.addEventListener("click", showMenu);
    nodes.retryBtn.addEventListener("click", () => {
      track("game_restart", { level: currentStage + 1, mistakes });
      startStage(currentStage);
    });
    nodes.nextStageBtn.addEventListener("click", () => startStage(Math.min(currentStage + 1, stages.length - 1)));
  }

  const style = document.createElement("style");
  style.textContent = "@keyframes toastUp{to{transform:translate(-50%,-120%);opacity:0}}";
  document.head.appendChild(style);

  localizeStatic();
  bindEvents();
  initDragDrop();
  renderStageGrid();
  initLoading();
})();
