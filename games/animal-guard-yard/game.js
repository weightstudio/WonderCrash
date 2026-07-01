(() => {
  const GAME_ID = "animal-guard-yard";
  const localeKey = "weightplayLocale";
  const unlockKey = "weightplay_animal_guard_unlocked";
  const bestKey = "weightplay_animal_guard_best";
  const profileKey = "weightplay_animal_guard_profile";
  const progressKey = "weightplay_animal_guard_progress";

  const text = {
    en: {
      gameTitle: "Animal Guard Yard",
      language: "Language",
      chooseStage: "Choose Stage",
      menuHint: "Place animal guards and stop the zombies.",
      stages: "Stages",
      loading: "Loading",
      nextStage: "Next Stage",
      retry: "Try Again",
      lobby: "Lobby",
      locked: "Stage locked",
      victory: "Yard protected!",
      defeat: "Zombies reached the yard!",
      resultWin: "You cleared Stage {n} with {hp} home hearts left.",
      resultLose: "Try placing guards earlier and collect every sun.",
      resultScore: "Score {score}",
      previousBest: "Previous Best {score}",
      newBest: "New best!",
      improvement: "Improvement {value}%",
      skillReport: "Skill Report",
      planning: "Planning",
      focusSkill: "Focus",
      problemSolving: "Problem Solving",
      progressNew: "Great progress! Your yard defense reached a new best.",
      progressSteady: "Good effort. Try placing guards earlier to improve your next run.",
      progressNote: "Scores are for fun and local progress tracking only.",
      stage: "Stage {n}",
      wave: "Stage {n} - Zombies {left}",
      select: "Choose an animal, then tap a grass tile.",
      noEnergy: "Need more sun.",
      noCoins: "Need more coins.",
      noDiamonds: "Need more diamonds.",
      occupied: "This tile already has a guard.",
      started: "Defend the yard!",
      danger: "\u26a0\ufe0f Zombies are close!",
      kennelTitle: "Animal Training",
      kennelHint: "Upgrade guards with coins. Unlock rare animals with diamonds.",
      shopTitle: "Rare Animal Shop",
      shopHint: "Spend shared WeightPlay diamonds on special animal guards.",
      tabStages: "Stages",
      tabAnimals: "Animals",
      tabShop: "Shop",
      level: "Lv {n}",
      upgrade: "Upgrade",
      unlock: "Unlock",
      owned: "Owned",
      coinToken: "coins",
      diamondToken: "diamonds",
      sunToken: "sun",
      reward: "Reward +{coins} coins",
      unitCat: "Cat",
      unitDog: "Dog",
      unitOwl: "Owl",
      unitFox: "Fox",
      roleRanged: "Ranged",
      roleTankMelee: "Tank Melee",
      roleFastRanged: "Fast Ranged",
      roleCrossLane: "Cross-lane",
      fast: "Fast zombies",
      shield: "Shield zombies",
      swarm: "Swarm night",
      boss: "Boss at the gate",
      basic: "First defense",
      crossfire: "Cross-lane ambush",
      tankTrial: "Shield stampede",
      grandBoss: "Grand boss garden",
    },
    "zh-Hant": {
      gameTitle: "\u52d5\u7269\u5b88\u885b\u5ead\u9662",
      language: "\u8a9e\u8a00",
      chooseStage: "\u9078\u64c7\u95dc\u5361",
      menuHint: "\u653e\u7f6e\u52d5\u7269\u5b88\u885b\uff0c\u64cb\u4f4f\u6bad\u5c4d\u9032\u653b\u3002",
      stages: "\u95dc\u5361",
      loading: "\u8f09\u5165\u4e2d",
      nextStage: "\u4e0b\u4e00\u95dc",
      retry: "\u518d\u8a66\u4e00\u6b21",
      lobby: "\u5927\u5ef3",
      locked: "\u95dc\u5361\u5c1a\u672a\u89e3\u9396",
      victory: "\u5ead\u9662\u5b88\u4f4f\u4e86\uff01",
      defeat: "\u6bad\u5c4d\u95d6\u9032\u5ead\u9662\u4e86\uff01",
      resultWin: "\u4f60\u901a\u904e\u7b2c {n} \u95dc\uff0c\u5269\u4e0b {hp} \u9846\u5bb6\u5712\u611b\u5fc3\u3002",
      resultLose: "\u8a66\u8457\u65e9\u9ede\u653e\u7f6e\u5b88\u885b\uff0c\u4e26\u6536\u96c6\u6bcf\u4e00\u9846\u967d\u5149\u3002",
      resultScore: "\u5206\u6578 {score}",
      previousBest: "\u904e\u53bb\u6700\u4f73 {score}",
      newBest: "\u65b0\u7684\u6700\u4f73\u7d00\u9304\uff01",
      improvement: "\u9032\u6b65 {value}%",
      skillReport: "\u80fd\u529b\u5c0f\u5831\u544a",
      planning: "\u898f\u5283",
      focusSkill: "\u5c08\u6ce8\u529b",
      problemSolving: "\u554f\u984c\u89e3\u6c7a",
      progressNew: "\u5f88\u68d2\u7684\u9032\u6b65\uff01\u9019\u6b21\u7684\u5ead\u9662\u9632\u885b\u9054\u5230\u65b0\u7684\u6700\u4f73\u7d00\u9304\u3002",
      progressSteady: "\u52aa\u529b\u5f97\u5f88\u597d\u3002\u4e0b\u6b21\u53ef\u4ee5\u66f4\u65e9\u653e\u7f6e\u5b88\u885b\uff0c\u8b93\u9632\u7dda\u66f4\u7a69\u3002",
      progressNote: "\u5206\u6578\u53ea\u7528\u65bc\u904a\u6232\u6a02\u8da3\u8207\u672c\u6a5f\u9032\u6b65\u7d00\u9304\u3002",
      stage: "\u7b2c {n} \u95dc",
      wave: "\u7b2c {n} \u95dc - \u6bad\u5c4d {left}",
      select: "\u9078\u64c7\u4e00\u96bb\u52d5\u7269\uff0c\u518d\u9ede\u8349\u5730\u683c\u5b50\u653e\u7f6e\u3002",
      noEnergy: "\u967d\u5149\u4e0d\u8db3\u3002",
      noCoins: "\u91d1\u5e63\u4e0d\u8db3\u3002",
      noDiamonds: "\u947d\u77f3\u4e0d\u8db3\u3002",
      occupied: "\u9019\u500b\u683c\u5b50\u5df2\u7d93\u6709\u5b88\u885b\u4e86\u3002",
      started: "\u5b88\u4f4f\u5ead\u9662\uff01",
      danger: "\u26a0\ufe0f \u6bad\u5c4d\u9760\u8fd1\u5bb6\u5712\uff01",
      kennelTitle: "\u52d5\u7269\u8a13\u7df4",
      kennelHint: "\u7528\u91d1\u5e63\u5347\u7d1a\u5b88\u885b\uff0c\u7528\u947d\u77f3\u89e3\u9396\u7a00\u6709\u52d5\u7269\u3002",
      shopTitle: "\u7a00\u6709\u52d5\u7269\u5546\u5e97",
      shopHint: "\u4f7f\u7528 WeightPlay \u5171\u7528\u947d\u77f3\u8cfc\u8cb7\u7279\u6b8a\u52d5\u7269\u5b88\u885b\u3002",
      tabStages: "\u95dc\u5361",
      tabAnimals: "\u52d5\u7269",
      tabShop: "\u5546\u5e97",
      level: "Lv {n}",
      upgrade: "\u5347\u7d1a",
      unlock: "\u89e3\u9396",
      owned: "\u5df2\u64c1\u6709",
      coinToken: "\u91d1\u5e63",
      diamondToken: "\u947d\u77f3",
      sunToken: "\u967d\u5149",
      reward: "\u734e\u52f5 +{coins} \u91d1\u5e63",
      unitCat: "\u8c93\u9a0e\u58eb",
      unitDog: "\u72d7\u6230\u58eb",
      unitOwl: "\u8c93\u982d\u9df9\u6cd5\u5e2b",
      unitFox: "\u72d0\u72f8\u904a\u4fe0",
      roleRanged: "\u9060\u7a0b",
      roleTankMelee: "\u5766\u514b\u8fd1\u6230",
      roleFastRanged: "\u5feb\u901f\u9060\u7a0b",
      roleCrossLane: "\u8de8\u7dda\u5c04\u64ca",
      fast: "\u5feb\u901f\u6bad\u5c4d",
      shield: "\u76fe\u724c\u6bad\u5c4d",
      swarm: "\u591c\u665a\u7fa4\u8972",
      boss: "Boss \u58d3\u5883",
      basic: "\u7b2c\u4e00\u9053\u9632\u7dda",
      crossfire: "\u8de8\u7dda\u5947\u8972",
      tankTrial: "\u76fe\u724c\u8a66\u7df4",
      grandBoss: "\u6700\u7d42\u5ead\u9662",
    },
  };

  const units = [
    { id: "cat", nameKey: "unitCat", roleKey: "roleRanged", attackStyle: "ranged", cost: 45, hp: 92, damage: 18, cooldown: 930, range: 9, unlockCost: 0 },
    { id: "dog", nameKey: "unitDog", roleKey: "roleTankMelee", attackStyle: "melee", cost: 70, hp: 235, damage: 30, cooldown: 1120, range: 1.35, unlockCost: 0 },
    { id: "owl", nameKey: "unitOwl", roleKey: "roleFastRanged", attackStyle: "ranged", cost: 95, hp: 78, damage: 15, cooldown: 660, range: 9, unlockCost: 0 },
    { id: "fox", nameKey: "unitFox", roleKey: "roleCrossLane", attackStyle: "cross", cost: 135, hp: 112, damage: 26, cooldown: 1040, range: 9, targetRows: 1, unlockCost: 5 },
  ];

  const spriteAssets = {
    cat: "../../assets/animal-guard-cat.png",
    dog: "../../assets/animal-guard-dog.png",
    owl: "../../assets/animal-guard-owl.png",
    fox: "../../assets/animal-guard-fox.png",
    normal: "../../assets/animal-guard-zombie-normal.png",
    fast: "../../assets/animal-guard-zombie-fast.png",
    shield: "../../assets/animal-guard-zombie-shield.png",
    boss: "../../assets/animal-guard-zombie-boss.png",
  };

  const stages = [
    { titleKey: "basic", theme: "sunny", energy: 155, hp: 4, rows: 5, cols: 9, total: 9, interval: 2850, zombies: [{ type: "normal", hp: 82, speed: 8.2, damage: 12 }] },
    { titleKey: "fast", theme: "sunset", energy: 170, hp: 4, rows: 5, cols: 9, total: 12, interval: 2600, zombies: [{ type: "normal", hp: 95, speed: 9.2, damage: 13 }, { type: "fast", hp: 70, speed: 14.4, damage: 10 }] },
    { titleKey: "shield", theme: "rain", energy: 185, hp: 4, rows: 5, cols: 9, total: 15, interval: 2380, zombies: [{ type: "normal", hp: 108, speed: 9.6, damage: 15 }, { type: "fast", hp: 82, speed: 14.8, damage: 12 }, { type: "shield", hp: 170, speed: 7.2, damage: 20 }] },
    { titleKey: "swarm", theme: "swamp", energy: 205, hp: 5, rows: 5, cols: 9, total: 18, interval: 2180, zombies: [{ type: "normal", hp: 118, speed: 10.4, damage: 15 }, { type: "fast", hp: 90, speed: 16.2, damage: 13 }, { type: "shield", hp: 190, speed: 7.8, damage: 21 }] },
    { titleKey: "boss", theme: "boss", energy: 230, hp: 5, rows: 5, cols: 9, total: 21, interval: 2080, zombies: [{ type: "normal", hp: 128, speed: 10.6, damage: 16 }, { type: "fast", hp: 98, speed: 16.8, damage: 14 }, { type: "shield", hp: 210, speed: 8, damage: 22 }], boss: { type: "boss", hp: 650, speed: 4.8, damage: 34 } },
    { titleKey: "crossfire", theme: "sunset", energy: 245, hp: 5, rows: 5, cols: 9, total: 24, interval: 1960, zombies: [{ type: "normal", hp: 142, speed: 11, damage: 17 }, { type: "fast", hp: 108, speed: 17.4, damage: 15 }, { type: "shield", hp: 228, speed: 8.3, damage: 23 }] },
    { titleKey: "tankTrial", theme: "rain", energy: 260, hp: 6, rows: 5, cols: 9, total: 26, interval: 1880, zombies: [{ type: "normal", hp: 154, speed: 11.4, damage: 18 }, { type: "shield", hp: 270, speed: 8.3, damage: 26 }, { type: "shield", hp: 300, speed: 7.3, damage: 29 }] },
    { titleKey: "grandBoss", theme: "boss", energy: 285, hp: 6, rows: 5, cols: 9, total: 28, interval: 1800, zombies: [{ type: "normal", hp: 168, speed: 11.8, damage: 19 }, { type: "fast", hp: 122, speed: 18.2, damage: 16 }, { type: "shield", hp: 300, speed: 8.6, damage: 30 }], boss: { type: "boss", hp: 1020, speed: 5.1, damage: 42 } },
  ];

  const $ = (id) => document.getElementById(id);
  const nodes = {
    localeSelect: $("localeSelect"),
    coinText: $("coinText"),
    diamondText: $("diamondText"),
    kennelGrid: $("kennelGrid"),
    shopGrid: $("shopGrid"),
    menuTabs: $("menuTabs"),
    menuPanel: $("menuPanel"),
    stageGrid: $("stageGrid"),
    playPanel: $("playPanel"),
    backToStagesBtn: $("backToStagesBtn"),
    energyText: $("energyText"),
    baseText: $("baseText"),
    waveText: $("waveText"),
    unitBar: $("unitBar"),
    yardBoard: $("yardBoard"),
    dangerAlert: $("dangerAlert"),
    hintText: $("hintText"),
    resultPanel: $("resultPanel"),
    resultTitle: $("resultTitle"),
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
  let profile = loadProfile();
  let currentStage = 0;
  let selectedUnit = units[0].id;
  let activeMenuTab = "stages";
  let running = false;
  let energy = 0;
  let baseHp = 3;
  let spawned = 0;
  let nextSpawnAt = 0;
  let nextSunAt = 0;
  let lastTick = 0;
  let entities = [];
  let projectiles = [];
  let cells = [];
  let raf = 0;
  let boardRect = { width: 1, height: 1 };
  let coinsEarned = 0;
  let lastDangerAt = 0;

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

  function loadProfile() {
    const defaults = {
      coins: 0,
      owned: { cat: true, dog: true, owl: true, fox: false },
      levels: { cat: 1, dog: 1, owl: 1, fox: 1 },
    };
    try {
      const saved = JSON.parse(localStorage.getItem(profileKey) || "{}");
      return {
        coins: Math.max(0, Number(saved.coins) || 0),
        owned: { ...defaults.owned, ...(saved.owned || {}) },
        levels: { ...defaults.levels, ...(saved.levels || {}) },
      };
    } catch {
      return defaults;
    }
  }

  function saveProfile() {
    localStorage.setItem(profileKey, JSON.stringify(profile));
  }

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(progressKey) || "{}");
    } catch {
      return {};
    }
  }

  function saveProgress(score, skillScores) {
    const previous = loadProgress();
    const previousBest = Number(previous.bestScore) || 0;
    const bestScore = Math.max(previousBest, score);
    const improvementPercent = previousBest > 0 ? Math.round(((score - previousBest) / previousBest) * 100) : (score > 0 ? 100 : 0);
    const record = {
      lastScore: score,
      bestScore,
      playCount: (Number(previous.playCount) || 0) + 1,
      lastPlayedAt: new Date().toISOString(),
      improvementPercent,
      skillScores,
      stage: currentStage + 1,
    };
    try {
      localStorage.setItem(progressKey, JSON.stringify(record));
    } catch {
      // Local progress is optional.
    }
    return { ...record, previousBest, improved: score > previousBest };
  }

  function starRating(value) {
    const filled = clamp(Math.round(value), 1, 5);
    return "\u2605".repeat(filled) + "\u2606".repeat(5 - filled);
  }

  function buildSkillScores(won, score) {
    const hpRatio = clamp(Math.max(0, baseHp) / 10, 0, 1);
    const clearRatio = won ? 1 : clamp(spawned / Math.max(1, stages[currentStage].total), 0, 1);
    const economyRatio = clamp(coinsEarned / Math.max(20, 28 + currentStage * 8), 0, 1);
    return {
      planning: 1 + Math.round((won ? 2.2 : 0.8) + hpRatio * 1.4 + economyRatio * 0.4),
      focus: 1 + Math.round(clearRatio * 3 + hpRatio),
      problemSolving: 1 + Math.round(clamp(score / Math.max(45, (currentStage + 1) * 35), 0, 1) * 4),
    };
  }

  function renderResultReport(message, progress) {
    const rows = [
      [t("planning"), progress.skillScores.planning],
      [t("focusSkill"), progress.skillScores.focus],
      [t("problemSolving"), progress.skillScores.problemSolving],
    ];
    nodes.resultText.replaceChildren();

    const summary = document.createElement("p");
    summary.className = "result-summary";
    summary.textContent = message;
    nodes.resultText.appendChild(summary);

    const stats = document.createElement("div");
    stats.className = "result-stats";
    [
      t("resultScore", { score: progress.lastScore }),
      progress.previousBest > 0 ? t("previousBest", { score: progress.previousBest }) : t("newBest"),
      progress.improved ? t("newBest") : t("improvement", { value: progress.improvementPercent }),
    ].forEach((textValue) => {
      const item = document.createElement("span");
      item.textContent = textValue;
      stats.appendChild(item);
    });
    nodes.resultText.appendChild(stats);

    const report = document.createElement("section");
    report.className = "skill-report";
    const title = document.createElement("strong");
    title.textContent = t("skillReport");
    report.appendChild(title);
    rows.forEach(([label, stars]) => {
      const row = document.createElement("div");
      row.className = "skill-row";
      const name = document.createElement("span");
      name.textContent = label;
      const value = document.createElement("b");
      value.textContent = starRating(stars);
      row.append(name, value);
      report.appendChild(row);
    });
    nodes.resultText.appendChild(report);

    const encouragement = document.createElement("p");
    encouragement.className = "progress-message";
    encouragement.textContent = progress.improved ? t("progressNew") : t("progressSteady");
    nodes.resultText.appendChild(encouragement);

    const note = document.createElement("small");
    note.textContent = t("progressNote");
    nodes.resultText.appendChild(note);
  }

  function readDiamonds() {
    return window.WeightPlayWallet?.read?.().diamonds || 0;
  }

  function unitLevel(unitId) {
    return Math.max(1, Number(profile.levels[unitId]) || 1);
  }

  function isOwned(unitId) {
    return !!profile.owned[unitId];
  }

  function trainedUnit(unit) {
    const level = unitLevel(unit.id);
    return {
      ...unit,
      level,
      hp: Math.round(unit.hp * (1 + (level - 1) * 0.18)),
      damage: Math.round(unit.damage * (1 + (level - 1) * 0.11)),
      cooldown: Math.max(520, Math.round(unit.cooldown * (1 - (level - 1) * 0.018))),
    };
  }

  function upgradeCost(unitId) {
    return Math.round(70 * Math.pow(1.42, unitLevel(unitId) - 1));
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
    renderWallet();
  }

  function showFloatingText(message) {
    const bubble = document.createElement("div");
    bubble.className = "floating";
    bubble.textContent = message;
    document.body.appendChild(bubble);
    window.setTimeout(() => bubble.remove(), 1200);
  }

  function showBoardText(message, x, y) {
    const bubble = document.createElement("div");
    bubble.className = "board-pop";
    bubble.textContent = message;
    bubble.style.left = `${x * 100}%`;
    bubble.style.top = `${y * 100}%`;
    nodes.yardBoard.appendChild(bubble);
    window.setTimeout(() => bubble.remove(), 900);
  }

  function renderStageGrid() {
    nodes.stageGrid.innerHTML = "";
    stages.forEach((stage, index) => {
      const stageNo = index + 1;
      const button = document.createElement("button");
      button.className = "stage-card";
      button.type = "button";
      if (stageNo > unlocked) button.classList.add("locked");
      const iconUnit = units[Math.min(index, units.length - 1)]?.id || "cat";
      button.innerHTML = `
        <b class="stage-animal">${animalSprite(iconUnit)}</b>
        <strong>${t("stage", { n: stageNo })}</strong>
        <span>${t(stage.titleKey)}</span>
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

  function renderWallet() {
    if (nodes.coinText) nodes.coinText.textContent = profile.coins;
    if (nodes.diamondText) nodes.diamondText.textContent = readDiamonds();
  }

  function animalSprite(unitId) {
    return `
      <span class="animal-sprite ${unitId}" aria-hidden="true">
        <img src="${spriteAssets[unitId] || spriteAssets.cat}" alt="" draggable="false" />
      </span>
    `;
  }

  function zombieSprite(type) {
    return `
      <span class="zombie-sprite ${type}" aria-hidden="true">
        <img src="${spriteAssets[type] || spriteAssets.normal}" alt="" draggable="false" />
      </span>
    `;
  }

  function costToken(token, amount) {
    if (token === "coin") {
      return `<span class="cost-token"><img class="cost-icon" src="../../assets/coin.png" alt="" draggable="false" /><span>${amount}</span></span>`;
    }
    return `<span class="cost-token diamond-token" aria-label="${t("diamondToken")} ${amount}"><i></i><span>${amount}</span></span>`;
  }

  function renderKennel() {
    if (!nodes.kennelGrid) return;
    nodes.kennelGrid.innerHTML = "";
    units.forEach((unit) => {
      const trained = trainedUnit(unit);
      const owned = isOwned(unit.id);
      const card = document.createElement("div");
      card.className = `kennel-card ${owned ? "" : "locked"}`;
      const cost = owned ? upgradeCost(unit.id) : unit.unlockCost;
      const canBuy = owned ? profile.coins >= cost : readDiamonds() >= cost;
      const tokenType = owned ? "coin" : "diamond";
      const actionLabel = owned ? t("upgrade") : t("unlock");
      card.innerHTML = `
        <div class="kennel-animal">${animalSprite(unit.id)}</div>
        <div>
          <strong>${t(unit.nameKey)} <small>${t("level", { n: trained.level })}</small></strong>
          <span>${t(trained.roleKey)} / ATK ${trained.damage} / HP ${trained.hp} / ${t("sunToken").toUpperCase()} ${trained.cost}</span>
        </div>
        <button type="button" data-kennel-unit="${unit.id}" ${canBuy ? "" : "disabled"}>
          <span>${actionLabel}</span>
          <b>${costToken(tokenType, cost)}</b>
        </button>
      `;
      nodes.kennelGrid.appendChild(card);
    });
  }

  function renderShop() {
    if (!nodes.shopGrid) return;
    nodes.shopGrid.innerHTML = "";
    units.filter((unit) => unit.unlockCost > 0).forEach((unit) => {
      const owned = isOwned(unit.id);
      const trained = trainedUnit(unit);
      const card = document.createElement("div");
      card.className = `shop-card ${owned ? "owned" : ""}`;
      card.innerHTML = `
        <div class="shop-hero">${animalSprite(unit.id)}</div>
        <div>
          <strong>${t(unit.nameKey)}</strong>
          <span>${t(trained.roleKey)} / ATK ${trained.damage} / HP ${trained.hp} / ${t("sunToken").toUpperCase()} ${trained.cost}</span>
        </div>
        <button type="button" data-kennel-unit="${unit.id}" ${owned || readDiamonds() < unit.unlockCost ? "disabled" : ""}>
          ${owned ? t("owned") : `<span>${t("unlock")}</span><b>${costToken("diamond", unit.unlockCost)}</b>`}
        </button>
      `;
      nodes.shopGrid.appendChild(card);
    });
  }

  function showMenuTab(tab) {
    activeMenuTab = tab;
    document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
      panel.classList.toggle("hidden", panel.dataset.tabPanel !== activeMenuTab);
    });
    nodes.menuTabs?.querySelectorAll("button[data-menu-tab]").forEach((button) => {
      button.classList.toggle("active", button.dataset.menuTab === activeMenuTab);
    });
    renderWallet();
    renderStageGrid();
    renderKennel();
    renderShop();
  }

  function showMenu() {
    running = false;
    cancelAnimationFrame(raf);
    nodes.menuPanel.classList.remove("hidden");
    nodes.playPanel.classList.add("hidden");
    nodes.resultPanel.classList.add("hidden");
    showMenuTab(activeMenuTab);
  }

  function startStage(index) {
    currentStage = index;
    const stage = stages[currentStage];
    running = true;
    energy = stage.energy;
    baseHp = stage.hp;
    spawned = 0;
    nextSpawnAt = 900;
    nextSunAt = 1400;
    lastTick = performance.now();
    entities = [];
    projectiles = [];
    cells = [];
    coinsEarned = 0;
    lastDangerAt = 0;
    selectedUnit = units.find((unit) => isOwned(unit.id))?.id || units[0].id;
    nodes.menuPanel.classList.add("hidden");
    nodes.playPanel.classList.remove("hidden");
    nodes.resultPanel.classList.add("hidden");
    nodes.hintText.textContent = t("select");
    buildBoard(stage);
    renderUnits();
    updateHud();
    track("game_start", { level: index + 1 });
    playSound("start");
    raf = requestAnimationFrame(tick);
  }

  function buildBoard(stage) {
    nodes.yardBoard.innerHTML = "";
    nodes.yardBoard.dataset.theme = stage.theme || "sunny";
    nodes.yardBoard.classList.remove("is-danger");
    nodes.yardBoard.style.setProperty("--grid-cols", stage.cols);
    nodes.yardBoard.style.setProperty("--grid-rows", stage.rows);
    boardRect = nodes.yardBoard.getBoundingClientRect();
    nodes.dangerAlert = document.createElement("div");
    nodes.dangerAlert.id = "dangerAlert";
    nodes.dangerAlert.className = "danger-alert hidden";
    nodes.dangerAlert.setAttribute("aria-live", "polite");
    nodes.dangerAlert.textContent = t("danger");
    nodes.yardBoard.appendChild(nodes.dangerAlert);
    for (let row = 0; row < stage.rows; row += 1) {
      for (let col = 0; col < stage.cols; col += 1) {
        const cell = document.createElement("button");
        cell.className = "cell";
        cell.type = "button";
        cell.style.left = `${(col / stage.cols) * 100}%`;
        cell.style.top = `${(row / stage.rows) * 100}%`;
        cell.style.width = `${100 / stage.cols}%`;
        cell.style.height = `${100 / stage.rows}%`;
        cell.addEventListener("click", () => placeUnit(row, col));
        nodes.yardBoard.appendChild(cell);
        cells.push({ row, col, button: cell, unit: null });
      }
    }
  }

  function renderUnits() {
    nodes.unitBar.innerHTML = "";
    units.filter((unit) => isOwned(unit.id)).forEach((unit) => {
      const trained = trainedUnit(unit);
      const button = document.createElement("button");
      button.className = "unit-card";
      button.type = "button";
      if (unit.id === selectedUnit) button.classList.add("selected");
      if (energy < trained.cost) button.classList.add("disabled");
      button.innerHTML = `
        <span class="mini-animal">${animalSprite(unit.id)}</span>
        <span>${t(unit.nameKey)} <em>${t("level", { n: trained.level })}</em><small>${t(trained.roleKey)} / ${t("sunToken").toUpperCase()} ${trained.cost} / ATK ${trained.damage}</small></span>
      `;
      button.addEventListener("click", () => {
        selectedUnit = unit.id;
        playSound("click");
        renderUnits();
      });
      nodes.unitBar.appendChild(button);
    });
  }

  function placeUnit(row, col) {
    if (!running) return;
    const cell = cells.find((item) => item.row === row && item.col === col);
    const baseUnit = units.find((item) => item.id === selectedUnit);
    if (!cell || !baseUnit) return;
    const unit = trainedUnit(baseUnit);
    if (!isOwned(unit.id)) {
      showFloatingText(t("noDiamonds"));
      playSound("error");
      return;
    }
    if (cell.unit) {
      showFloatingText(t("occupied"));
      playSound("error");
      return;
    }
    if (energy < unit.cost) {
      showFloatingText(t("noEnergy"));
      playSound("error");
      return;
    }
    energy -= unit.cost;
    const guard = {
      kind: "guard",
      id: unit.id,
      row,
      col,
      hp: unit.hp,
      maxHp: unit.hp,
      cooldown: 0,
      data: unit,
      el: document.createElement("div"),
      hpEl: document.createElement("span"),
      facing: "left",
    };
    guard.el.className = "actor";
    guard.el.innerHTML = animalSprite(unit.id);
    guard.hpEl.className = "hp-bar guard-hp";
    guard.hpEl.innerHTML = "<i></i>";
    nodes.yardBoard.appendChild(guard.el);
    nodes.yardBoard.appendChild(guard.hpEl);
    cell.unit = guard;
    entities.push(guard);
    updateEntityElement(guard);
    pulseClass(guard.el, "is-placed", 420);
    spawnImpact(cellCenterX(col), laneProjectileY(row), "place");
    updateHud();
    renderUnits();
    playSound("select");
  }

  function spawnZombie() {
    const stage = stages[currentStage];
    if (spawned >= stage.total) return;
    spawned += 1;
    const data = stage.boss && spawned === stage.total ? stage.boss : stage.zombies[Math.floor(Math.random() * stage.zombies.length)];
    const row = Math.floor(Math.random() * stage.rows);
    const zombie = {
      kind: "zombie",
      type: data.type,
      row,
      x: 1.04,
      hp: data.hp,
      maxHp: data.hp,
      speed: data.speed / 100000,
      damage: data.damage,
      biteCooldown: 0,
      warned: false,
      el: document.createElement("div"),
      hpEl: document.createElement("span"),
    };
    zombie.el.className = `zombie ${data.type}`;
    zombie.el.innerHTML = zombieSprite(data.type);
    zombie.hpEl.className = "hp-bar zombie-hp";
    zombie.hpEl.innerHTML = "<i></i>";
    nodes.yardBoard.appendChild(zombie.el);
    nodes.yardBoard.appendChild(zombie.hpEl);
    updateEntityElement(zombie);
    zombie.el.classList.add("is-entering");
    window.setTimeout(() => zombie.el.classList.remove("is-entering"), 520);
    entities.push(zombie);
  }

  function spawnSun() {
    const stage = stages[currentStage];
    const drop = document.createElement("button");
    drop.className = "energy-drop";
    drop.type = "button";
    drop.textContent = "\u2600";
    drop.style.left = `${12 + Math.random() * 72}%`;
    drop.style.top = `${10 + Math.random() * 58}%`;
    const sunLife = Math.max(2600, 4600 - currentStage * 450);
    drop.style.setProperty("--sun-life", `${sunLife}ms`);
    drop.addEventListener("click", () => {
      energy += 35;
      drop.remove();
      updateHud();
      renderUnits();
      playSound("coin");
    }, { once: true });
    nodes.yardBoard.appendChild(drop);
    window.setTimeout(() => drop.remove(), sunLife);
    if (stage.total - spawned < 3) energy += 5;
  }

  function tick(now) {
    if (!running) return;
    const dt = Math.min(48, now - lastTick);
    lastTick = now;
    nextSpawnAt -= dt;
    nextSunAt -= dt;
    if (nextSpawnAt <= 0) {
      spawnZombie();
      nextSpawnAt = stages[currentStage].interval * (0.82 + Math.random() * 0.36);
    }
    if (nextSunAt <= 0) {
      spawnSun();
      nextSunAt = 2500 + Math.random() * 1500;
    }
    updateGuards(dt);
    updateProjectiles(dt);
    updateZombies(dt);
    cleanupDead();
    updateHud();
    if (baseHp <= 0) return finish(false);
    const zombiesLeft = entities.some((item) => item.kind === "zombie") || spawned < stages[currentStage].total;
    if (!zombiesLeft) return finish(true);
    raf = requestAnimationFrame(tick);
  }

  function updateGuards(dt) {
    entities.filter((item) => item.kind === "guard").forEach((guard) => {
      guard.cooldown -= dt;
      const target = findTargetForGuard(guard);
      if (target) faceTarget(guard, target);
      if (target && guard.cooldown <= 0) {
        if (guard.data.attackStyle === "melee") {
          meleeAttack(guard, target);
        } else {
          shoot(guard, target);
        }
        guard.cooldown = guard.data.cooldown;
      }
      updateEntityElement(guard);
    });
  }

  function findTargetForGuard(guard) {
    const stage = stages[currentStage];
    const guardX = cellCenterX(guard.col, stage);
    const range = guard.data.range / stage.cols;
    const rangeStart = Math.max(-0.08, guardX - range);
    const rangeEnd = Math.min(1.08, guardX + range);
    const rowReach = guard.data.attackStyle === "cross" ? guard.data.targetRows || 1 : 0;
    return entities
      .filter((item) => (
        item.kind === "zombie"
        && Math.abs(item.row - guard.row) <= rowReach
        && item.x >= rangeStart
        && item.x <= rangeEnd
      ))
      .sort((a, b) => (
        Math.abs(a.row - guard.row) - Math.abs(b.row - guard.row)
        || Math.abs(a.x - guardX) - Math.abs(b.x - guardX)
      ))[0];
  }

  function faceTarget(guard, target) {
    const stage = stages[currentStage];
    const guardX = cellCenterX(guard.col, stage);
    guard.facing = target.x >= guardX ? "right" : "left";
    guard.el.classList.toggle("facing-right", guard.facing === "right");
  }

  function applyDamage(target, damage, impactType, impactY) {
    target.hp -= damage;
    pulseClass(target.el, "is-hit");
    spawnImpact(target.x, impactY, impactType);
    showBoardText(`-${damage}`, target.x, Math.max(0.06, impactY - 0.08));
    if (target.hp <= 0 && !target.rewarded) {
      target.rewarded = true;
      const coinGain = target.type === "boss" ? 30 : target.type === "shield" ? 8 : target.type === "fast" ? 5 : 6;
      coinsEarned += coinGain;
      showBoardText(`+${coinGain}`, target.x, impactY + 0.02);
    }
    playSound("hit");
  }

  function meleeAttack(guard, target) {
    faceTarget(guard, target);
    pulseClass(guard.el, "is-shooting");
    const y = laneProjectileY(target.row);
    applyDamage(target, guard.data.damage, guard.id, y);
  }

  function shoot(guard, target) {
    faceTarget(guard, target);
    pulseClass(guard.el, "is-shooting");
    const stage = stages[currentStage];
    const guardX = cellCenterX(guard.col, stage);
    const direction = target.x >= guardX ? 1 : -1;
    const laneY = laneProjectileY(target.row, stage);
    const projectile = {
      row: target.row,
      x: clamp(guardX + direction * 0.25 / stage.cols, -0.04, 1.04),
      y: laneY,
      vx: 0.00095 * direction,
      direction,
      damage: guard.data.damage,
      unitId: guard.id,
      target,
      el: document.createElement("div"),
    };
    projectile.el.className = `projectile ${guard.id} ${direction < 0 ? "left" : "right"}`;
    nodes.yardBoard.appendChild(projectile.el);
    projectiles.push(projectile);
    playSound("shoot");
  }

  function updateProjectiles(dt) {
    projectiles.forEach((shot) => {
      const previousX = shot.x;
      shot.x += shot.vx * dt;
      const minX = Math.min(previousX, shot.x) - 0.012;
      const maxX = Math.max(previousX, shot.x) + 0.035;
      const hit = entities.find((item) => (
        item.kind === "zombie"
        && item.row === shot.row
        && item.x >= minX
        && item.x <= maxX
      ));
      if (hit) {
        applyDamage(hit, shot.damage, shot.unitId, shot.y);
        shot.dead = true;
      }
      if (shot.x > 1.08 || shot.x < -0.08) shot.dead = true;
      const flip = shot.direction < 0 ? " scaleX(-1)" : "";
      shot.el.style.transform = `translate(${shot.x * boardRect.width}px, ${shot.y * boardRect.height}px) translate(-50%, -50%)${flip}`;
    });
    projectiles = projectiles.filter((shot) => {
      if (shot.dead) shot.el.remove();
      return !shot.dead;
    });
  }

  function updateZombies(dt) {
    entities.filter((item) => item.kind === "zombie").forEach((zombie) => {
      const blocking = entities.find((item) => item.kind === "guard" && item.row === zombie.row && Math.abs(cellCenterX(item.col) - zombie.x) < 0.065);
      if (blocking) {
        zombie.biteCooldown -= dt;
        if (zombie.biteCooldown <= 0) {
          blocking.hp -= zombie.damage;
          zombie.biteCooldown = 940;
          pulseClass(zombie.el, "is-biting");
          pulseClass(blocking.el, "is-hit");
          spawnImpact(cellCenterX(blocking.col), laneProjectileY(blocking.row), "bite");
          playSound("hit");
        }
      } else {
        zombie.x -= zombie.speed * dt;
      }
      zombie.el.classList.toggle("near-home", zombie.x < 0.24);
      if (!zombie.warned && zombie.x < 0.26) {
        zombie.warned = true;
        showDanger(zombie.row);
      }
      if (zombie.x < -0.04) {
        zombie.dead = true;
        baseHp -= 1;
        pulseDanger();
        playSound("error");
      }
      updateEntityElement(zombie);
    });
  }

  function cleanupDead() {
    entities.forEach((entity) => {
      if (entity.hp <= 0) entity.dead = true;
      if (entity.dead) {
        entity.el.remove();
        entity.hpEl?.remove();
        if (entity.kind === "guard") {
          const cell = cells.find((item) => item.unit === entity);
          if (cell) cell.unit = null;
        }
      }
    });
    entities = entities.filter((entity) => !entity.dead);
  }

  function updateEntityElement(entity) {
    const stage = stages[currentStage];
    if (entity.kind === "guard") {
      const x = cellCenterX(entity.col, stage) * boardRect.width;
      const y = laneCenterY(entity.row, stage) * boardRect.height;
      entity.el.style.setProperty("--actor-x", `${x}px`);
      entity.el.style.setProperty("--actor-y", `${y}px`);
      entity.el.style.transform = "translate(var(--actor-x), var(--actor-y)) translate(-50%, -50%)";
      updateHpBar(entity, x, y + (boardRect.height / stage.rows) * 0.35);
    } else {
      const y = laneCenterY(entity.row, stage) * boardRect.height;
      entity.el.style.setProperty("--actor-x", `${entity.x * boardRect.width}px`);
      entity.el.style.setProperty("--actor-y", `${y}px`);
      entity.el.style.transform = "translate(var(--actor-x), var(--actor-y)) translate(-50%, -50%)";
      updateHpBar(entity, entity.x * boardRect.width, y + (boardRect.height / stage.rows) * 0.36);
    }
  }

  function updateHpBar(entity, x, y) {
    if (!entity.hpEl) return;
    entity.hpEl.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    entity.hpEl.querySelector("i").style.width = `${clamp((entity.hp / entity.maxHp) * 100, 0, 100)}%`;
  }

  function cellCenterX(col, stage = stages[currentStage]) {
    return (col + 0.5) / stage.cols;
  }

  function laneCenterY(row, stage = stages[currentStage]) {
    return (row + 0.44) / stage.rows;
  }

  function laneProjectileY(row, stage = stages[currentStage]) {
    return (row + 0.44) / stage.rows;
  }

  function pulseClass(element, className, duration = 260) {
    if (!element) return;
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
    window.setTimeout(() => element.classList.remove(className), duration);
  }

  function spawnImpact(x, y, type) {
    const spark = document.createElement("div");
    spark.className = `impact ${type || "hit"}`;
    spark.style.left = `${x * 100}%`;
    spark.style.top = `${y * 100}%`;
    nodes.yardBoard.appendChild(spark);
    window.setTimeout(() => spark.remove(), 420);
  }

  function showDanger(row) {
    const now = performance.now();
    pulseDanger();
    if (now - lastDangerAt > 1100) {
      lastDangerAt = now;
      showBoardText(t("danger"), 0.22, Math.max(0.08, laneProjectileY(row) - 0.08));
      playSound("error");
    }
  }

  function pulseDanger() {
    nodes.yardBoard.classList.add("is-danger");
    if (nodes.dangerAlert) {
      nodes.dangerAlert.textContent = t("danger");
      nodes.dangerAlert.classList.remove("hidden");
    }
    window.setTimeout(() => {
      nodes.yardBoard.classList.remove("is-danger");
      nodes.dangerAlert?.classList.add("hidden");
    }, 900);
  }

  function updateHud() {
    const left = Math.max(0, stages[currentStage].total - spawned + entities.filter((item) => item.kind === "zombie").length);
    nodes.energyText.textContent = Math.floor(energy);
    nodes.baseText.textContent = Math.max(0, baseHp);
    nodes.waveText.textContent = t("wave", { n: currentStage + 1, left });
    renderWallet();
  }

  function finish(won) {
    running = false;
    cancelAnimationFrame(raf);
    let resultMessage = "";
    let finalScore = 0;
    if (won) {
      const clearBonus = 18 + currentStage * 10 + Math.max(0, baseHp) * 4;
      coinsEarned += clearBonus;
      unlocked = Math.max(unlocked, Math.min(stages.length, currentStage + 2));
      localStorage.setItem(unlockKey, String(unlocked));
      const best = Math.max(Number(localStorage.getItem(bestKey)) || 0, currentStage + 1);
      localStorage.setItem(bestKey, String(best));
      nodes.resultTitle.textContent = t("victory");
      resultMessage = `${t("resultWin", { n: currentStage + 1, hp: Math.max(0, baseHp) })} ${t("reward", { coins: coinsEarned })}`;
      playSound("win");
    } else {
      nodes.resultTitle.textContent = t("defeat");
      resultMessage = `${t("resultLose")} ${t("reward", { coins: coinsEarned })}`;
      playSound("lose");
    }
    finalScore = (currentStage + 1) * 60 + Math.max(0, baseHp) * 8 + coinsEarned + (won ? 80 : 0);
    const skillScores = buildSkillScores(won, finalScore);
    const progress = saveProgress(finalScore, skillScores);
    renderResultReport(resultMessage, progress);
    track(won ? "game_complete" : "game_over", {
      level: currentStage + 1,
      hp: baseHp,
      score: finalScore,
      best_score: progress.bestScore,
      improvement_percent: progress.improvementPercent,
    });
    if (coinsEarned > 0) {
      profile.coins += coinsEarned;
      saveProfile();
    }
    nodes.nextStageBtn.classList.toggle("hidden", !won || currentStage >= stages.length - 1);
    nodes.resultPanel.classList.remove("hidden");
    renderWallet();
    renderKennel();
  }

  function handleKennelAction(unitId) {
    const unit = units.find((item) => item.id === unitId);
    if (!unit) return;
    if (!isOwned(unitId)) {
      if (!window.WeightPlayWallet?.spendDiamonds?.(unit.unlockCost)) {
        showFloatingText(t("noDiamonds"));
        playSound("error");
        return;
      }
      profile.owned[unitId] = true;
      saveProfile();
      showFloatingText(`${t(unit.nameKey)} ${t("owned")}`);
      playSound("win");
    } else {
      const cost = upgradeCost(unitId);
      if (profile.coins < cost) {
        showFloatingText(t("noCoins"));
        playSound("error");
        return;
      }
      profile.coins -= cost;
      profile.levels[unitId] = unitLevel(unitId) + 1;
      saveProfile();
      showFloatingText(`${t(unit.nameKey)} ${t("level", { n: unitLevel(unitId) })}`);
      playSound("coin");
    }
    renderWallet();
    renderKennel();
    renderShop();
    renderUnits();
  }

  function initLoading() {
    const assets = [
      "../../assets/animal-guard-yard-poster.png",
      ...Object.values(spriteAssets),
      "../../assets/menu-battle.png",
      "../../assets/menu-character.png",
      "../../assets/upgrade-coin.png",
    ];
    let loaded = 0;
    const update = () => {
      const pct = Math.min(100, Math.round((loaded / assets.length) * 100));
      nodes.loadingText.textContent = `${pct}%`;
      nodes.loadingFill.style.width = `${pct}%`;
      if (pct >= 100) {
        nodes.loadingPanel.classList.add("hidden");
        track("game_ready");
      }
    };
    assets.forEach((src) => {
      const image = new Image();
      image.onload = image.onerror = () => {
        loaded += 1;
        update();
      };
      image.src = src;
    });
    update();
  }

  nodes.localeSelect.addEventListener("change", () => {
    locale = nodes.localeSelect.value;
    localStorage.setItem(localeKey, locale);
    localizeStatic();
    renderStageGrid();
    renderKennel();
    renderUnits();
    updateHud();
  });
  nodes.kennelGrid?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-kennel-unit]");
    if (!button) return;
    handleKennelAction(button.dataset.kennelUnit);
  });
  nodes.shopGrid?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-kennel-unit]");
    if (!button) return;
    handleKennelAction(button.dataset.kennelUnit);
  });
  nodes.menuTabs?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-menu-tab]");
    if (!button) return;
    showMenuTab(button.dataset.menuTab);
    playSound("click");
  });
  nodes.backToStagesBtn.addEventListener("click", showMenu);
  nodes.resultStagesBtn.addEventListener("click", showMenu);
  nodes.retryBtn.addEventListener("click", () => startStage(currentStage));
  nodes.nextStageBtn.addEventListener("click", () => startStage(Math.min(currentStage + 1, stages.length - 1)));
  window.addEventListener("resize", () => {
    boardRect = nodes.yardBoard.getBoundingClientRect();
    entities.forEach(updateEntityElement);
  });

  localizeStatic();
  showMenuTab(activeMenuTab);
  initLoading();
})();
