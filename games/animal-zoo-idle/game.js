(() => {
  const GAME_ID = "animal-zoo-idle";
  const localeKey = "weightPlayLocale";
  const saveKey = "weightplay_animal_zoo_idle_save_v2";
  const oldSaveKey = "weightplay_animal_zoo_idle_save_v1";
  const secondMs = 1000;

  const text = {
    en: {
      title: "Animal Zoo Idle",
      language: "Language",
      menuTitle: "Build a lively safari park.",
      menuHint: "Visitors buy tickets while animals play. Feed animals, upgrade the meadow, and collect the ticket box.",
      start: "Open Park",
      coins: "Coins",
      tickets: "Ticket Box",
      visitors: "Visitors",
      report: "Park Report",
      reportTitle: "Zoo Care Report",
      continue: "Continue",
      loading: "Loading",
      collect: "Collect Tickets",
      feedLion: "Feed Lion",
      feedGiraffe: "Feed Giraffe",
      upgrade: "Upgrade Meadow",
      unlock: "Invite Giraffe",
      level: "Meadow Lv.{n}",
      ticketRate: "{n}/visitor",
      happiness: "Happiness",
      offline: "Welcome back! Visitors left {coins} coins in the ticket box.",
      notEnough: "Need more coins.",
      collected: "Collected {coins} coins from visitors.",
      noTickets: "Visitors are still buying tickets.",
      fed: "{name} is happy! More visitors are coming.",
      upgraded: "The meadow is prettier. Visitors pay more!",
      unlocked: "The giraffe joined the meadow!",
      reportGood: "Great care! Your animals looked happy and visitors enjoyed the park.",
      reportTry: "Good effort. Feed animals and upgrade the meadow to make the park livelier.",
      lion: "Lion",
      giraffe: "Giraffe",
      lockedGiraffe: "Invite the giraffe to make the park busier.",
    },
    "zh-Hant": {
      title: "動物小小樂園",
      language: "語言",
      menuTitle: "經營熱鬧的草原動物園。",
      menuHint: "遊客會買票進來參觀。餵獅子、照顧長頸鹿、升級草原，再收取票箱收益。",
      start: "開園",
      coins: "金幣",
      tickets: "票箱",
      visitors: "遊客",
      report: "樂園報告",
      reportTitle: "動物照顧報告",
      continue: "繼續",
      loading: "載入中",
      collect: "收票箱",
      feedLion: "餵獅子",
      feedGiraffe: "餵長頸鹿",
      upgrade: "升級草原",
      unlock: "邀請長頸鹿",
      level: "草原 Lv.{n}",
      ticketRate: "每位 {n}",
      happiness: "幸福感",
      offline: "歡迎回來！遊客在票箱留下了 {coins} 金幣。",
      notEnough: "金幣不足。",
      collected: "從遊客票箱收取 {coins} 金幣。",
      noTickets: "遊客還在買票中。",
      fed: "{name} 很開心！更多遊客被吸引來了。",
      upgraded: "草原變漂亮了，遊客願意付更多票錢！",
      unlocked: "長頸鹿加入草原了！",
      reportGood: "照顧得很好！動物很開心，遊客也玩得很愉快。",
      reportTry: "很棒的嘗試。多餵食動物、升級草原，樂園會更熱鬧。",
      lion: "獅子",
      giraffe: "長頸鹿",
      lockedGiraffe: "邀請長頸鹿，讓樂園更熱鬧。",
    },
  };

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
  let renderTick = 0;

  function t(key, data = {}) {
    const value = text[locale]?.[key] || text.en[key] || key;
    return Object.entries(data).reduce((out, [name, item]) => out.replaceAll(`{${name}}`, String(item)), value);
  }

  function loadSave() {
    const fallback = {
      coins: 120,
      ticketBox: 0,
      meadowLevel: 1,
      happiness: 72,
      visitorQueue: 0,
      playCount: 0,
      feedCount: 0,
      bestScore: 0,
      lastScore: 0,
      lastPlayedAt: Date.now(),
      animals: { lion: true, giraffe: false },
    };
    try {
      const data = JSON.parse(localStorage.getItem(saveKey) || "null");
      if (data) return normalizeSave({ ...fallback, ...data });
      const old = JSON.parse(localStorage.getItem(oldSaveKey) || "null");
      if (old?.coins) fallback.coins = Math.max(120, Math.floor(old.coins));
      return fallback;
    } catch {
      return fallback;
    }
  }

  function normalizeSave(data) {
    data.animals = { lion: true, giraffe: false, ...(data.animals || {}) };
    data.ticketBox = Math.max(0, Number(data.ticketBox || 0));
    data.happiness = clamp(Number(data.happiness || 72), 20, 100);
    data.meadowLevel = Math.max(1, Number(data.meadowLevel || 1));
    return data;
  }

  function saveGame() {
    save.lastPlayedAt = Date.now();
    localStorage.setItem(saveKey, JSON.stringify(save));
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function ticketPrice() {
    return 4 + save.meadowLevel * 2 + (save.animals.giraffe ? 2 : 0);
  }

  function visitorRate() {
    const animalBonus = save.animals.giraffe ? 1.45 : 1;
    return Math.max(1, Math.round((1 + save.meadowLevel * 0.5) * animalBonus * (save.happiness / 70)));
  }

  function upgradeCost() {
    return 160 + save.meadowLevel * 130;
  }

  function giraffeCost() {
    return 360;
  }

  function applyOffline() {
    const elapsedSeconds = Math.min(7200, Math.max(0, (Date.now() - Number(save.lastPlayedAt || Date.now())) / 1000));
    const visitors = Math.floor((elapsedSeconds / 8) * visitorRate());
    const earned = Math.floor(visitors * ticketPrice());
    if (earned > 0) {
      save.ticketBox += earned;
      save.visitorQueue += Math.min(18, Math.floor(visitors / 6));
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
    nodes.incomeText.textContent = Math.floor(save.ticketBox);
    nodes.habitatGrid.innerHTML = "";
    nodes.habitatGrid.appendChild(renderPark());
  }

  function renderPark() {
    const card = document.createElement("article");
    card.className = "zoo-stage-card";
    card.innerHTML = `
      <div class="park-hud">
        <strong>${t("level", { n: save.meadowLevel })}</strong>
        <span>${t("ticketRate", { n: ticketPrice() })}</span>
        <span>${t("visitors")}: ${visitorRate()}/10s</span>
      </div>
      <div class="savanna-stage" aria-label="Safari meadow">
        <div class="sun"></div>
        <div class="cloud cloud-a"></div>
        <div class="cloud cloud-b"></div>
        <div class="gate"><b>票</b><span></span></div>
        <div class="visitor-path"></div>
        <div class="visitor-line"></div>
        <div class="animal lion ${save.happiness > 82 ? "happy" : ""}" data-name="${t("lion")}">
          <i class="tail"></i><i class="body"></i><i class="mane"></i><i class="head"></i><i class="leg l1"></i><i class="leg l2"></i>
        </div>
        <div class="animal giraffe ${save.animals.giraffe ? "unlocked" : "locked"} ${save.happiness > 88 ? "happy" : ""}" data-name="${save.animals.giraffe ? t("giraffe") : t("lockedGiraffe")}">
          <i class="body"></i><i class="neck"></i><i class="head"></i><i class="spot s1"></i><i class="spot s2"></i><i class="leg l1"></i><i class="leg l2"></i>
        </div>
        <div class="heart-field"></div>
      </div>
      <div class="care-panel">
        <div class="happy-meter"><span>${t("happiness")}</span><b>${Math.round(save.happiness)}%</b><i style="width:${save.happiness}%"></i></div>
        <div class="zoo-actions">
          <button type="button" data-action="collect">${t("collect")}</button>
          <button type="button" data-action="feed-lion">${t("feedLion")}</button>
          <button type="button" data-action="feed-giraffe">${save.animals.giraffe ? t("feedGiraffe") : t("unlock") + " " + giraffeCost()}</button>
          <button type="button" data-action="upgrade">${t("upgrade")} ${upgradeCost()}</button>
        </div>
      </div>
    `;
    card.querySelector('[data-action="collect"]').addEventListener("click", collectTickets);
    card.querySelector('[data-action="feed-lion"]').addEventListener("click", () => feedAnimal("lion"));
    card.querySelector('[data-action="feed-giraffe"]').addEventListener("click", () => {
      if (save.animals.giraffe) feedAnimal("giraffe");
      else unlockGiraffe();
    });
    card.querySelector('[data-action="upgrade"]').addEventListener("click", upgradeMeadow);
    renderVisitors(card.querySelector(".visitor-line"));
    return card;
  }

  function renderVisitors(container) {
    const count = clamp(Math.floor(save.visitorQueue), 1, 8);
    for (let i = 0; i < count; i += 1) {
      const item = document.createElement("i");
      item.style.setProperty("--delay", `${i * -0.55}s`);
      item.style.setProperty("--shirt", ["#ffcf48", "#58c7ff", "#ff7ba8", "#79d66b"][i % 4]);
      container.appendChild(item);
    }
  }

  function collectTickets() {
    const amount = Math.floor(save.ticketBox);
    if (amount <= 0) {
      popToast(t("noTickets"));
      playSound("error");
      return;
    }
    save.coins += amount;
    save.ticketBox = 0;
    popToast(t("collected", { coins: amount }));
    playSound("coin");
    saveGame();
    render();
  }

  function feedAnimal(kind) {
    if (kind === "giraffe" && !save.animals.giraffe) return unlockGiraffe();
    save.feedCount += 1;
    save.happiness = clamp(save.happiness + (kind === "lion" ? 8 : 10), 20, 100);
    save.visitorQueue = clamp(save.visitorQueue + 3, 1, 18);
    save.ticketBox += Math.round(ticketPrice() * 2);
    popToast(t("fed", { name: kind === "lion" ? t("lion") : t("giraffe") }));
    pulseAnimal(kind);
    playSound("success");
    saveGame();
    render();
  }

  function unlockGiraffe() {
    const cost = giraffeCost();
    if (save.coins < cost) return notEnough();
    save.coins -= cost;
    save.animals.giraffe = true;
    save.happiness = clamp(save.happiness + 12, 20, 100);
    popToast(t("unlocked"));
    playSound("upgrade");
    window.WonderAnalytics?.track("animal_unlock", { game_id: GAME_ID, animal_id: "giraffe" });
    saveGame();
    render();
  }

  function upgradeMeadow() {
    const cost = upgradeCost();
    if (save.coins < cost) return notEnough();
    save.coins -= cost;
    save.meadowLevel += 1;
    save.happiness = clamp(save.happiness + 6, 20, 100);
    popToast(t("upgraded"));
    playSound("upgrade");
    saveGame();
    render();
  }

  function notEnough() {
    popToast(t("notEnough"));
    playSound("error");
  }

  function pulseAnimal(kind) {
    const node = document.querySelector(`.animal.${kind}`);
    if (!node) return;
    node.classList.add("fed");
    const stage = document.querySelector(".heart-field");
    if (stage) {
      for (let i = 0; i < 4; i += 1) {
        const heart = document.createElement("i");
        heart.textContent = "♥";
        heart.style.left = `${kind === "lion" ? 33 + i * 4 : 58 + i * 4}%`;
        heart.style.animationDelay = `${i * 90}ms`;
        stage.appendChild(heart);
        window.setTimeout(() => heart.remove(), 900);
      }
    }
    window.setTimeout(() => node.classList.remove("fed"), 520);
  }

  function showReport() {
    const score = Math.round(save.coins / 10 + save.ticketBox / 8 + save.feedCount * 18 + save.meadowLevel * 30 + (save.animals.giraffe ? 45 : 0));
    const previous = Number(save.bestScore || 0);
    save.playCount += 1;
    save.lastScore = score;
    save.bestScore = Math.max(previous, score);
    saveGame();
    nodes.reportScore.textContent = score;
    nodes.reportText.textContent = score >= previous ? t("reportGood") : t("reportTry");
    nodes.focusStars.textContent = starText(save.feedCount * 35 + save.happiness);
    nodes.logicStars.textContent = starText(save.meadowLevel * 70 + ticketPrice() * 10);
    nodes.animalStars.textContent = starText((save.animals.giraffe ? 2 : 1) * 90);
    nodes.resultPanel.classList.remove("hidden");
    window.WonderAnalytics?.track("game_complete", { game_id: GAME_ID, score, animals: save.animals.giraffe ? 2 : 1 });
  }

  function starText(score) {
    const count = clamp(Math.ceil(score / 80), 1, 5);
    return "★★★★★".slice(0, count) + "☆☆☆☆☆".slice(0, 5 - count);
  }

  function popToast(message) {
    const toast = document.createElement("div");
    toast.className = "zoo-toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    window.setTimeout(() => toast.remove(), 1300);
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

  function tickPark() {
    if (nodes.gamePanel.classList.contains("hidden")) return;
    renderTick += 1;
    const visitors = visitorRate();
    save.ticketBox += Math.max(1, Math.round(visitors * ticketPrice() / 3));
    save.visitorQueue = clamp(save.visitorQueue + visitors * 0.35, 1, 18);
    save.happiness = clamp(save.happiness - 0.35, 20, 100);
    if (renderTick % 3 === 0) saveGame();
    render();
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
  window.setInterval(tickPark, 3300);
})();
