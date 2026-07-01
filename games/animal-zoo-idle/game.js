(() => {
  const GAME_ID = "animal-zoo-idle";
  const localeKey = "weightPlayLocale";
  const saveKey = "weightplay_animal_zoo_idle_save_v1";
  const minuteMs = 60000;

  const text = {
    en: {
      title: "Animal Zoo Idle",
      language: "Language",
      menuTitle: "Grow a tiny animal park.",
      menuHint: "Collect coins, care for animals, and upgrade habitats.",
      start: "Start Zoo",
      coins: "Coins",
      income: "Income",
      report: "Care Report",
      reportTitle: "Zoo Care Report",
      continue: "Continue",
      loading: "Loading",
      level: "Level {n}",
      collect: "Collect",
      upgrade: "Upgrade {cost}",
      unlock: "Unlock {cost}",
      care: "Care",
      owned: "Owned",
      locked: "Locked",
      offline: "Welcome back! Your animals earned {coins} coins while you were away.",
      notEnough: "Need more coins.",
      cared: "{name} feels happy!",
      upgraded: "{name} habitat upgraded!",
      unlocked: "{name} joined your zoo!",
      reportGood: "Great care! Your zoo is growing with steady focus and planning.",
      reportTry: "Good effort. Care for more animals and upgrade habitats to grow faster.",
    },
    "zh-Hant": {
      title: "動物小小樂園",
      language: "語言",
      menuTitle: "經營你的動物小樂園。",
      menuHint: "收金幣、照顧動物、升級棲地。",
      start: "開始經營",
      coins: "金幣",
      income: "收益",
      report: "照顧報告",
      reportTitle: "樂園照顧報告",
      continue: "繼續",
      loading: "載入中",
      level: "等級 {n}",
      collect: "收取",
      upgrade: "升級 {cost}",
      unlock: "解鎖 {cost}",
      care: "照顧",
      owned: "已擁有",
      locked: "未解鎖",
      offline: "歡迎回來！離開時動物幫你賺了 {coins} 金幣。",
      notEnough: "金幣還不夠。",
      cared: "{name} 很開心！",
      upgraded: "{name} 棲地升級了！",
      unlocked: "{name} 加入樂園！",
      reportGood: "照顧得很好！你的樂園正在穩定成長。",
      reportTry: "很棒的努力。多照顧動物並升級棲地，樂園會成長更快。",
    },
  };

  const habitats = [
    {
      id: "safari",
      names: { en: "Safari Meadow", "zh-Hant": "草原棲地" },
      icon: "🦁",
      color: "#ffd36d",
      animals: [
        { id: "lion", names: { en: "Lion", "zh-Hant": "獅子" }, icon: "🦁", cost: 0, income: 8 },
        { id: "giraffe", names: { en: "Giraffe", "zh-Hant": "長頸鹿" }, icon: "🦒", cost: 90, income: 14 },
      ],
    },
    {
      id: "farm",
      names: { en: "Happy Farm", "zh-Hant": "快樂農場" },
      icon: "🐮",
      color: "#98df72",
      animals: [
        { id: "cow", names: { en: "Cow", "zh-Hant": "乳牛" }, icon: "🐮", cost: 140, income: 18 },
        { id: "chicken", names: { en: "Chicken", "zh-Hant": "小雞" }, icon: "🐥", cost: 220, income: 25 },
      ],
    },
    {
      id: "forest",
      names: { en: "Forest Corner", "zh-Hant": "森林角落" },
      icon: "🦊",
      color: "#75d7c5",
      animals: [
        { id: "fox", names: { en: "Fox", "zh-Hant": "狐狸" }, icon: "🦊", cost: 320, income: 36 },
        { id: "owl", names: { en: "Owl", "zh-Hant": "貓頭鷹" }, icon: "🦉", cost: 480, income: 52 },
      ],
    },
  ];

  const $ = (id) => document.getElementById(id);
  const nodes = {
    localeSelect: $("localeSelect"),
    menuPanel: $("menuPanel"),
    gamePanel: $("gamePanel"),
    startBtn: $("startBtn"),
    coinText: $("coinText"),
    incomeText: $("incomeText"),
    reportBtn: $("reportBtn"),
    offlineNotice: $("offlineNotice"),
    habitatGrid: $("habitatGrid"),
    resultPanel: $("resultPanel"),
    reportScore: $("reportScore"),
    reportText: $("reportText"),
    focusStars: $("focusStars"),
    logicStars: $("logicStars"),
    animalStars: $("animalStars"),
    closeReportBtn: $("closeReportBtn"),
    loadingPanel: $("loadingPanel"),
    loadingText: $("loadingText"),
    loadingFill: $("loadingFill"),
  };

  let locale = localStorage.getItem(localeKey) || "en";
  let save = loadSave();
  let ticker = 0;

  function t(key, data = {}) {
    const value = text[locale]?.[key] || text.en[key] || key;
    return Object.entries(data).reduce((out, [name, item]) => out.replaceAll(`{${name}}`, String(item)), value);
  }

  function label(item) {
    return item.names[locale] || item.names.en;
  }

  function loadSave() {
    const fallback = {
      coins: 70,
      careCount: 0,
      playCount: 0,
      bestScore: 0,
      lastScore: 0,
      lastPlayedAt: Date.now(),
      habitats: {
        safari: { level: 1, animals: ["lion"], ready: 0 },
        farm: { level: 1, animals: [], ready: 0 },
        forest: { level: 1, animals: [], ready: 0 },
      },
    };
    try {
      return { ...fallback, ...JSON.parse(localStorage.getItem(saveKey) || "{}") };
    } catch {
      return fallback;
    }
  }

  function saveGame() {
    save.lastPlayedAt = Date.now();
    localStorage.setItem(saveKey, JSON.stringify(save));
  }

  function incomePerMinute() {
    return habitats.reduce((sum, habitat) => {
      const state = save.habitats[habitat.id] || { level: 1, animals: [] };
      const animalIncome = habitat.animals
        .filter((animal) => state.animals.includes(animal.id))
        .reduce((total, animal) => total + animal.income, 0);
      return sum + Math.round(animalIncome * (1 + (state.level - 1) * 0.35));
    }, 0);
  }

  function applyOffline() {
    const elapsed = Math.max(0, Date.now() - Number(save.lastPlayedAt || Date.now()));
    const capped = Math.min(elapsed, 2 * 60 * minuteMs);
    const earned = Math.floor((capped / minuteMs) * incomePerMinute());
    if (earned > 0) {
      save.coins += earned;
      nodes.offlineNotice.textContent = t("offline", { coins: earned });
      nodes.offlineNotice.classList.remove("hidden");
      window.setTimeout(() => nodes.offlineNotice.classList.add("hidden"), 3600);
    }
    saveGame();
  }

  function localizeStatic() {
    document.documentElement.lang = locale === "zh-Hant" ? "zh-Hant" : "en";
    document.querySelectorAll("[data-ui]").forEach((node) => {
      node.textContent = t(node.dataset.ui);
    });
    nodes.localeSelect.value = locale;
  }

  function render() {
    nodes.coinText.textContent = Math.floor(save.coins);
    nodes.incomeText.textContent = `${incomePerMinute()}/m`;
    nodes.habitatGrid.innerHTML = "";
    habitats.forEach((habitat) => nodes.habitatGrid.appendChild(renderHabitat(habitat)));
  }

  function renderHabitat(habitat) {
    const state = save.habitats[habitat.id] || { level: 1, animals: [] };
    const card = document.createElement("article");
    card.className = "habitat-card";
    card.style.setProperty("--habitat", habitat.color);
    card.innerHTML = `
      <div class="habitat-head">
        <span>${habitat.icon}</span>
        <div><strong>${label(habitat)}</strong><small>${t("level", { n: state.level })}</small></div>
      </div>
      <div class="animal-row"></div>
      <div class="habitat-actions">
        <button type="button" data-action="collect">${t("collect")}</button>
        <button type="button" data-action="care">${t("care")}</button>
        <button type="button" data-action="upgrade">${t("upgrade", { cost: upgradeCost(state.level) })}</button>
      </div>
    `;
    const row = card.querySelector(".animal-row");
    habitat.animals.forEach((animal) => row.appendChild(renderAnimal(habitat, animal, state)));
    card.querySelector('[data-action="collect"]').addEventListener("click", () => collectHabitat(habitat));
    card.querySelector('[data-action="care"]').addEventListener("click", () => careHabitat(habitat));
    card.querySelector('[data-action="upgrade"]').addEventListener("click", () => upgradeHabitat(habitat));
    return card;
  }

  function renderAnimal(habitat, animal, state) {
    const owned = state.animals.includes(animal.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `animal-chip ${owned ? "owned" : "locked"}`;
    button.innerHTML = `<b>${animal.icon}</b><span>${label(animal)}</span><small>${owned ? t("owned") : t("unlock", { cost: animal.cost })}</small>`;
    if (!owned) button.addEventListener("click", () => unlockAnimal(habitat, animal));
    return button;
  }

  function upgradeCost(level) {
    return 90 + level * 80;
  }

  function collectHabitat(habitat) {
    const state = save.habitats[habitat.id];
    const animalCount = state.animals.length;
    const amount = Math.max(8, Math.round(animalCount * state.level * 24));
    save.coins += amount;
    popToast(`+${amount}`);
    playSound("coin");
    saveGame();
    render();
  }

  function careHabitat(habitat) {
    const state = save.habitats[habitat.id];
    if (!state.animals.length) {
      popToast(t("locked"));
      playSound("error");
      return;
    }
    save.careCount += 1;
    save.coins += 18 + state.level * 4;
    popToast(t("cared", { name: label(habitat) }));
    playSound("success");
    saveGame();
    render();
  }

  function upgradeHabitat(habitat) {
    const state = save.habitats[habitat.id];
    const cost = upgradeCost(state.level);
    if (save.coins < cost) return notEnough();
    save.coins -= cost;
    state.level += 1;
    popToast(t("upgraded", { name: label(habitat) }));
    playSound("upgrade");
    saveGame();
    render();
  }

  function unlockAnimal(habitat, animal) {
    const state = save.habitats[habitat.id];
    if (save.coins < animal.cost) return notEnough();
    save.coins -= animal.cost;
    state.animals.push(animal.id);
    popToast(t("unlocked", { name: label(animal) }));
    playSound("success");
    window.WonderAnalytics?.track("animal_unlock", { game_id: GAME_ID, animal_id: animal.id });
    saveGame();
    render();
  }

  function notEnough() {
    popToast(t("notEnough"));
    playSound("error");
  }

  function showReport() {
    const score = Math.round(incomePerMinute() + save.careCount * 12 + ownedAnimalCount() * 20);
    const previous = Number(save.bestScore || 0);
    save.playCount += 1;
    save.lastScore = score;
    save.bestScore = Math.max(previous, score);
    saveGame();
    const stars = starText(score);
    nodes.reportScore.textContent = score;
    nodes.reportText.textContent = score >= previous ? t("reportGood") : t("reportTry");
    nodes.focusStars.textContent = stars;
    nodes.logicStars.textContent = starText(incomePerMinute());
    nodes.animalStars.textContent = starText(ownedAnimalCount() * 45);
    nodes.resultPanel.classList.remove("hidden");
    window.WonderAnalytics?.track("game_complete", { game_id: GAME_ID, score, animals: ownedAnimalCount() });
  }

  function ownedAnimalCount() {
    return habitats.reduce((sum, habitat) => sum + (save.habitats[habitat.id]?.animals?.length || 0), 0);
  }

  function starText(score) {
    const count = Math.max(1, Math.min(5, Math.ceil(score / 80)));
    return "★★★★★".slice(0, count) + "☆☆☆☆☆".slice(0, 5 - count);
  }

  function popToast(message) {
    const toast = document.createElement("div");
    toast.className = "zoo-toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    window.setTimeout(() => toast.remove(), 1100);
  }

  function playSound(name) {
    window.WonderSound?.play?.(name);
  }

  function startGame() {
    nodes.menuPanel.classList.add("hidden");
    nodes.gamePanel.classList.remove("hidden");
    applyOffline();
    render();
    window.WonderAnalytics?.track("game_start", { game_id: GAME_ID });
  }

  function tickIncome() {
    ticker += 1;
    if (ticker >= 10) {
      const earned = Math.max(1, Math.floor(incomePerMinute() / 6));
      save.coins += earned;
      ticker = 0;
      saveGame();
      render();
    }
  }

  function loadAssets() {
    const assets = ["../../assets/animal-zoo-idle-cover.svg", "../../assets/weightplay-lion-mascot.png"];
    let done = 0;
    const finish = () => {
      done += 1;
      const pct = Math.round((done / assets.length) * 100);
      nodes.loadingText.textContent = `${pct}%`;
      nodes.loadingFill.style.width = `${pct}%`;
      if (done >= assets.length) {
        window.setTimeout(() => nodes.loadingPanel.classList.add("hidden"), 180);
      }
    };
    assets.forEach((src) => {
      const img = new Image();
      img.onload = finish;
      img.onerror = finish;
      img.src = src;
    });
  }

  nodes.localeSelect.addEventListener("change", () => {
    locale = nodes.localeSelect.value;
    localStorage.setItem(localeKey, locale);
    localizeStatic();
    render();
  });
  nodes.startBtn.addEventListener("click", startGame);
  nodes.reportBtn.addEventListener("click", showReport);
  nodes.closeReportBtn.addEventListener("click", () => nodes.resultPanel.classList.add("hidden"));
  window.addEventListener("beforeunload", saveGame);

  localizeStatic();
  loadAssets();
  render();
  window.setInterval(tickIncome, 10000);
})();
