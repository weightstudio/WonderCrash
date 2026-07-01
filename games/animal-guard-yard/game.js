(() => {
  const GAME_ID = "animal-guard-yard";
  const localeKey = "weightplayLocale";
  const unlockKey = "weightplay_animal_guard_unlocked";
  const bestKey = "weightplay_animal_guard_best";
  const profileKey = "weightplay_animal_guard_profile";

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
      stage: "Stage {n}",
      wave: "Stage {n} - Zombies {left}",
      select: "Choose an animal, then tap a grass tile.",
      noEnergy: "Need more sun.",
      noCoins: "Need more coins.",
      noDiamonds: "Need more diamonds.",
      occupied: "This tile already has a guard.",
      started: "Defend the yard!",
      kennelTitle: "Animal Training",
      kennelHint: "Upgrade guards with coins. Unlock rare animals with diamonds.",
      level: "Lv {n}",
      upgrade: "Upgrade",
      unlock: "Unlock",
      owned: "Owned",
      reward: "Reward +{coins} coins",
      unitCat: "Cat",
      unitDog: "Dog",
      unitOwl: "Owl",
      unitFox: "Fox",
      fast: "Fast zombies",
      shield: "Shield zombies",
      swarm: "Swarm night",
      boss: "Boss at the gate",
      basic: "First defense",
    },
    "zh-Hant": {
      gameTitle: "動物守衛庭院",
      language: "語系",
      chooseStage: "選擇關卡",
      menuHint: "放置動物守衛，擋住殭屍進攻。",
      stages: "關卡",
      loading: "載入中",
      nextStage: "下一關",
      retry: "再試一次",
      lobby: "大廳",
      locked: "關卡未解鎖",
      victory: "庭院守住了！",
      defeat: "殭屍闖進庭院了！",
      resultWin: "你通過第 {n} 關，家園還剩 {hp} 顆心。",
      resultLose: "試著早點放守衛，看到太陽就收集。",
      stage: "第 {n} 關",
      wave: "第 {n} 關 - 剩餘殭屍 {left}",
      select: "先選動物，再點草地格子放置。",
      noEnergy: "太陽不足。",
      noCoins: "金幣不足。",
      noDiamonds: "鑽石不足。",
      occupied: "這格已經有守衛。",
      started: "守住庭院！",
      kennelTitle: "動物訓練",
      kennelHint: "用金幣升級守衛，用鑽石解鎖稀有動物。",
      level: "Lv {n}",
      upgrade: "升級",
      unlock: "解鎖",
      owned: "已擁有",
      reward: "獎勵 +{coins} 金幣",
      unitCat: "貓咪",
      unitDog: "小狗",
      unitOwl: "貓頭鷹",
      unitFox: "狐狸",
      fast: "快速殭屍",
      shield: "盾牌殭屍",
      swarm: "殭屍群夜襲",
      boss: "大王殭屍來襲",
      basic: "初次防守",
    },
  };

  const units = [
    { id: "cat", nameKey: "unitCat", cost: 50, hp: 80, damage: 18, cooldown: 820, range: 6, unlockCost: 0 },
    { id: "dog", nameKey: "unitDog", cost: 80, hp: 120, damage: 30, cooldown: 1180, range: 5, unlockCost: 0 },
    { id: "owl", nameKey: "unitOwl", cost: 110, hp: 70, damage: 24, cooldown: 640, range: 6, unlockCost: 0 },
    { id: "fox", nameKey: "unitFox", cost: 140, hp: 92, damage: 42, cooldown: 980, range: 6, unlockCost: 18 },
  ];

  const stages = [
    { titleKey: "basic", energy: 120, hp: 3, rows: 3, cols: 6, total: 8, interval: 2400, zombies: [{ type: "normal", hp: 88, speed: 13, damage: 14 }] },
    { titleKey: "fast", energy: 130, hp: 3, rows: 3, cols: 6, total: 12, interval: 2050, zombies: [{ type: "normal", hp: 100, speed: 14, damage: 16 }, { type: "fast", hp: 74, speed: 22, damage: 12 }] },
    { titleKey: "shield", energy: 150, hp: 4, rows: 3, cols: 6, total: 15, interval: 1900, zombies: [{ type: "normal", hp: 115, speed: 15, damage: 18 }, { type: "fast", hp: 88, speed: 22, damage: 14 }, { type: "shield", hp: 180, speed: 10, damage: 24 }] },
    { titleKey: "swarm", energy: 165, hp: 4, rows: 3, cols: 6, total: 18, interval: 1650, zombies: [{ type: "normal", hp: 125, speed: 16, damage: 18 }, { type: "fast", hp: 96, speed: 25, damage: 15 }, { type: "shield", hp: 200, speed: 11, damage: 25 }] },
    { titleKey: "boss", energy: 185, hp: 5, rows: 3, cols: 6, total: 20, interval: 1550, zombies: [{ type: "normal", hp: 135, speed: 16, damage: 19 }, { type: "fast", hp: 104, speed: 25, damage: 16 }, { type: "shield", hp: 220, speed: 11, damage: 26 }], boss: { type: "boss", hp: 520, speed: 7, damage: 38 } },
  ];

  const $ = (id) => document.getElementById(id);
  const nodes = {
    localeSelect: $("localeSelect"),
    coinText: $("coinText"),
    diamondText: $("diamondText"),
    kennelGrid: $("kennelGrid"),
    menuPanel: $("menuPanel"),
    stageGrid: $("stageGrid"),
    playPanel: $("playPanel"),
    backToStagesBtn: $("backToStagesBtn"),
    energyText: $("energyText"),
    baseText: $("baseText"),
    waveText: $("waveText"),
    unitBar: $("unitBar"),
    yardBoard: $("yardBoard"),
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
      damage: Math.round(unit.damage * (1 + (level - 1) * 0.16)),
      cooldown: Math.max(460, Math.round(unit.cooldown * (1 - (level - 1) * 0.025))),
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
        <i class="tail"></i>
        <i class="body"></i>
        <i class="head"></i>
        <i class="ear left"></i>
        <i class="ear right"></i>
        <i class="leg one"></i>
        <i class="leg two"></i>
        <i class="eye"></i>
        <i class="snout"></i>
      </span>
    `;
  }

  function zombieSprite(type) {
    return `
      <span class="zombie-sprite ${type}" aria-hidden="true">
        <i class="body"></i>
        <i class="head"></i>
        <i class="arm front"></i>
        <i class="arm back"></i>
        <i class="leg one"></i>
        <i class="leg two"></i>
        <i class="eye"></i>
      </span>
    `;
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
      card.innerHTML = `
        <div class="kennel-animal">${animalSprite(unit.id)}</div>
        <div>
          <strong>${t(unit.nameKey)} <small>${t("level", { n: trained.level })}</small></strong>
          <span>⚔ ${trained.damage} · ♥ ${trained.hp} · ☀ ${trained.cost}</span>
        </div>
        <button type="button" data-kennel-unit="${unit.id}" ${canBuy ? "" : "disabled"}>
          ${owned ? "●" : "◆"} ${cost} ${owned ? t("upgrade") : t("unlock")}
        </button>
      `;
      nodes.kennelGrid.appendChild(card);
    });
  }

  function showMenu() {
    running = false;
    cancelAnimationFrame(raf);
    nodes.menuPanel.classList.remove("hidden");
    nodes.playPanel.classList.add("hidden");
    nodes.resultPanel.classList.add("hidden");
    renderStageGrid();
    renderKennel();
    renderWallet();
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
    boardRect = nodes.yardBoard.getBoundingClientRect();
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
    units.forEach((unit) => {
      const owned = isOwned(unit.id);
      const trained = trainedUnit(unit);
      const button = document.createElement("button");
      button.className = "unit-card";
      button.type = "button";
      if (unit.id === selectedUnit) button.classList.add("selected");
      if (!owned || energy < trained.cost) button.classList.add("disabled");
      button.innerHTML = `
        <span class="mini-animal">${animalSprite(unit.id)}</span>
        <span>${t(unit.nameKey)} <em>${t("level", { n: trained.level })}</em><small>☀ ${trained.cost} / ⚔ ${trained.damage}</small></span>
      `;
      button.addEventListener("click", () => {
        if (!owned) {
          showFloatingText(t("noDiamonds"));
          playSound("error");
          return;
        }
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
    };
    guard.el.className = "actor";
    guard.el.innerHTML = `${animalSprite(unit.id)}<span class="hp"><i></i></span>`;
    nodes.yardBoard.appendChild(guard.el);
    cell.unit = guard;
    entities.push(guard);
    updateEntityElement(guard);
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
      el: document.createElement("div"),
    };
    zombie.el.className = `zombie ${data.type}`;
    zombie.el.innerHTML = `${zombieSprite(data.type)}<span class="hp"><i></i></span>`;
    nodes.yardBoard.appendChild(zombie.el);
    entities.push(zombie);
  }

  function spawnSun() {
    const stage = stages[currentStage];
    const drop = document.createElement("button");
    drop.className = "energy-drop";
    drop.type = "button";
    drop.textContent = "☀";
    drop.style.left = `${12 + Math.random() * 72}%`;
    drop.style.top = `${10 + Math.random() * 58}%`;
    drop.addEventListener("click", () => {
      energy += 35;
      drop.remove();
      updateHud();
      renderUnits();
      playSound("coin");
    }, { once: true });
    nodes.yardBoard.appendChild(drop);
    window.setTimeout(() => drop.remove(), Math.max(2600, 4600 - currentStage * 450));
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
      const target = entities
        .filter((item) => item.kind === "zombie" && item.row === guard.row && item.x > guard.col / stages[currentStage].cols)
        .sort((a, b) => a.x - b.x)[0];
      if (target && guard.cooldown <= 0) {
        shoot(guard, target);
        guard.cooldown = guard.data.cooldown;
      }
      updateEntityElement(guard);
    });
  }

  function shoot(guard, target) {
    const projectile = {
      row: guard.row,
      x: (guard.col + 0.72) / stages[currentStage].cols,
      y: (guard.row + 0.5) / stages[currentStage].rows,
      speed: 0.00115,
      damage: guard.data.damage,
      target,
      el: document.createElement("div"),
    };
    projectile.el.className = "projectile";
    nodes.yardBoard.appendChild(projectile.el);
    projectiles.push(projectile);
    playSound("shoot");
  }

  function updateProjectiles(dt) {
    projectiles.forEach((shot) => {
      shot.x += shot.speed * dt;
      const hit = entities.find((item) => item.kind === "zombie" && item.row === shot.row && Math.abs(item.x - shot.x) < 0.045);
      if (hit) {
        hit.hp -= shot.damage;
        if (hit.hp <= 0 && !hit.rewarded) {
          hit.rewarded = true;
          const coinGain = hit.type === "boss" ? 30 : hit.type === "shield" ? 8 : hit.type === "fast" ? 5 : 6;
          coinsEarned += coinGain;
          showBoardText(`+${coinGain}`, hit.x, (hit.row + 0.36) / stages[currentStage].rows);
        }
        shot.dead = true;
        playSound("hit");
      }
      if (shot.x > 1.08) shot.dead = true;
      shot.el.style.transform = `translate(${shot.x * boardRect.width}px, ${shot.y * boardRect.height}px) translate(-50%, -50%)`;
    });
    projectiles = projectiles.filter((shot) => {
      if (shot.dead) shot.el.remove();
      return !shot.dead;
    });
  }

  function updateZombies(dt) {
    const cols = stages[currentStage].cols;
    entities.filter((item) => item.kind === "zombie").forEach((zombie) => {
      const blocking = entities.find((item) => item.kind === "guard" && item.row === zombie.row && Math.abs((item.col + 0.5) / cols - zombie.x) < 0.065);
      if (blocking) {
        zombie.biteCooldown -= dt;
        if (zombie.biteCooldown <= 0) {
          blocking.hp -= zombie.damage;
          zombie.biteCooldown = 760;
          playSound("hit");
        }
      } else {
        zombie.x -= zombie.speed * dt;
      }
      if (zombie.x < -0.04) {
        zombie.dead = true;
        baseHp -= 1;
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
      const x = ((entity.col + 0.5) / stage.cols) * boardRect.width;
      const y = ((entity.row + 0.5) / stage.rows) * boardRect.height;
      entity.el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    } else {
      const y = ((entity.row + 0.5) / stage.rows) * boardRect.height;
      entity.el.style.transform = `translate(${entity.x * boardRect.width}px, ${y}px) translate(-50%, -50%)`;
    }
    entity.el.querySelector(".hp i").style.width = `${clamp((entity.hp / entity.maxHp) * 100, 0, 100)}%`;
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
    track(won ? "game_complete" : "game_over", { level: currentStage + 1, hp: baseHp });
    if (won) {
      const clearBonus = 18 + currentStage * 10 + Math.max(0, baseHp) * 4;
      coinsEarned += clearBonus;
      unlocked = Math.max(unlocked, Math.min(stages.length, currentStage + 2));
      localStorage.setItem(unlockKey, String(unlocked));
      const best = Math.max(Number(localStorage.getItem(bestKey)) || 0, currentStage + 1);
      localStorage.setItem(bestKey, String(best));
      nodes.resultTitle.textContent = t("victory");
      nodes.resultText.textContent = `${t("resultWin", { n: currentStage + 1, hp: Math.max(0, baseHp) })} ${t("reward", { coins: coinsEarned })}`;
      playSound("win");
    } else {
      nodes.resultTitle.textContent = t("defeat");
      nodes.resultText.textContent = `${t("resultLose")} ${t("reward", { coins: coinsEarned })}`;
      playSound("lose");
    }
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
    renderUnits();
  }

  function initLoading() {
    let pct = 0;
    const timer = window.setInterval(() => {
      pct = Math.min(100, pct + 25);
      nodes.loadingText.textContent = `${pct}%`;
      nodes.loadingFill.style.width = `${pct}%`;
      if (pct >= 100) {
        window.clearInterval(timer);
        nodes.loadingPanel.classList.add("hidden");
        track("game_ready");
      }
    }, 80);
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
  nodes.backToStagesBtn.addEventListener("click", showMenu);
  nodes.resultStagesBtn.addEventListener("click", showMenu);
  nodes.retryBtn.addEventListener("click", () => startStage(currentStage));
  nodes.nextStageBtn.addEventListener("click", () => startStage(Math.min(currentStage + 1, stages.length - 1)));
  window.addEventListener("resize", () => {
    boardRect = nodes.yardBoard.getBoundingClientRect();
    entities.forEach(updateEntityElement);
  });

  localizeStatic();
  renderStageGrid();
  renderKennel();
  renderWallet();
  initLoading();
})();
