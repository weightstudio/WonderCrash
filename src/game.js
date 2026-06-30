const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const battleHud = document.querySelector("#battleHud");
const coinText = document.querySelector("#coinText");
const menuCoinLine = document.querySelector("#menuCoinLine");
const menuCoinText = document.querySelector("#menuCoinText");
const menuDiamondText = document.querySelector("#menuDiamondText");
const levelText = document.querySelector("#levelText");
const waveText = document.querySelector("#waveText");
const overlay = document.querySelector("#overlay");
const overlayText = document.querySelector("#overlayText");
const startBtn = document.querySelector("#startBtn");
const menuTabs = document.querySelector("#menuTabs");
const menuContent = document.querySelector("#menuContent");
const levelGrid = document.querySelector("#levelGrid");
const upgradeGrid = document.querySelector("#upgradeGrid");
const profilePanel = document.querySelector("#profilePanel");
const pausePanel = document.querySelector("#pausePanel");
const settingsBtn = document.querySelector("#settingsBtn");
const resumeBtn = document.querySelector("#resumeBtn");
const leaveBtn = document.querySelector("#leaveBtn");
const weaponModal = document.querySelector("#weaponModal");
const weaponModalClose = document.querySelector("#weaponModalClose");
const weaponModalContent = document.querySelector("#weaponModalContent");

// Shared Localization Helper Functions
function locale() {
  return window.WonderI18n?.locale() || "en";
}

function t(key, params = {}) {
  const table = dictionary[locale()] || dictionary.en;
  const fallback = dictionary.en;
  let val = table[key] || fallback[key] || key;
  return Object.entries(params).reduce((str, [name, v]) => {
    return str.replaceAll(`{${name}}`, String(v));
  }, val);
}

function translateStaticUI() {
  document.documentElement.lang = locale();
  for (const element of document.querySelectorAll("[data-i18n]")) {
    element.textContent = t(element.dataset.i18n);
  }
}

// Local Localization Dictionary
const dictionary = {
  en: {
    game_title: "Wonder Crash",
    menu_title: "Main Menu",
    hud_stage: "Stage",
    hud_wave: "Wave",
    hud_coins: "Coins",
    tab_character: "Hero",
    tab_equipment: "Weapons",
    tab_battle: "Stages",
    tab_wall: "Wall",
    tab_settings: "Settings",
    menu_character: "Hero Stats",
    menu_equipment: "Weapons Upgrade",
    menu_battle: "Select Stage",
    menu_wall: "Wall Upgrade",
    menu_settings: "Settings",
    hero_title: "Little Hero Lv {lvl}",
    hero_subtitle: "Upgrade hero stats to survive longer and collect more coins.",
    heroCoin_title: "Pocket Money Luck Lv {lvl}",
    heroCoin_desc: "Coins Earned +{pct}%",
    heroAttack_title: "Hard Throw Lv {lvl}",
    heroAttack_desc: "Base Attack +{bonus}",
    heroCrit_title: "Weak Spot Sight Lv {lvl}",
    heroCrit_desc: "Crit Chance {pct}%",
    heroCritDamage_title: "Crit Force Lv {lvl}",
    heroCritDamage_desc: "Crit Damage x{mul}",
    heroSpeed_title: "Fast Tactility Lv {lvl}",
    heroSpeed_desc: "Projectile Speed +{bonus}",
    diamondPower_title: "Diamond Focus Lv {lvl}",
    diamondPower_desc: "Base Attack +{bonus}, paid with Diamonds",
    equip_weapons: "Equipped Weapons 8",
    equip_backpack: "Backpack",
    wallHp_title: "Wall HP Lv {lvl}",
    wallHp_desc: "Max HP {val}",
    wallGuard_title: "Wall Fortify Lv {lvl}",
    wallGuard_desc: "Wall Damage -{val}",
    wallRegen_title: "Auto Repair Lv {lvl}",
    wallRegen_desc: "Every {sec}s recover {val} HP",
    settings_progress: "Progress",
    settings_unlocked_stages: "Unlocked to Stage {count}",
    settings_pause_question: "Resume or Leave Battle?",
    language: "Language",
    language_desc: "Choose display language",
    back_lobby: "Back to Lobby",
    upgrade_panel_title: "Select Upgrade",
    upgrade_wave_complete: "Wave {wave} Complete",
    settlement_title: "Battle Summary",
    settlement_new_clear: "First Clearance Challenge Complete!",
    settlement_reclear: "Cleared Stage Complete!",
    settlement_unlocked: "Level {id} unlocked!",
    settlement_no_drops: "No weapon drops this time",
    btn_next: "Next Level",
    btn_confirm: "Back to Menu",
    btn_resume: "Resume",
    btn_leave: "Leave Battle",
    btn_start: "Start",
    btn_play_again: "Play Again",
    btn_stage_select: "Stage Select",
    weapon_modal_empty: "Select a weapon to view damage, cooldown and merge details.",
    weapon_upgrade_tip: "Merge matching backpack items to upgrade.",
    weapon_stats_dmg: "Damage {val}",
    weapon_stats_cd: "Cooldown {val}s",
    weapon_stats_spd: "Speed {val}",
    weapon_stats_size: "Size {val}",
    weapon_max_tier: "Already reached maximum level",
    weapon_next_tier_preview: "x{lvl} → x{next}：Damage {dmg} / Cooldown {cd}s / Size {size}",
    upgrade_preview: "{current} -> {next}",
    upgrade_none: "Not upgraded",
    defeat_title: "Wall Destroyed",
    defeat_desc: "Stage {lvl}  Coins earned: {coins}",
    victory_title: "Victory!",
    victory_challenge_success: "Challenge Complete!",
    victory_stage_clear: "Stage Clear!",
    loading_progress: "Loading {pct}%",
    load_fail: "Asset Load Fail",
    load_fail_desc: "Failed to load. Please refresh.",
    enemy_toilet: "Charging Toilet",
    enemy_tv: "Wobbling TV",
    enemy_fridge: "Heavy Fridge",
    enemy_wardrobe: "Slamming Wardrobe",
    enemy_surveillance: "Dashing CCTV",
    enemy_books: "Magic Bookstack",
    enemy_clock: "Sprinting Alarm",
    enemy_pencilbox: "Pencilcase Rammer",
    boss_spawned: "{name} Boss Spawned!",
    boss_label: "{name} Boss -{pct}%{shield}",
    boss_shield: "Shield {count}",
    weapon_eraser: "Eraser",
    weapon_pencil: "Pencil",
    weapon_ruler: "Ruler",
    upgrade_damage_name: "Sharp Eraser",
    upgrade_damage_desc: "Weapon Damage +1",
    upgrade_cooldown_name: "Fast Hands",
    upgrade_cooldown_desc: "Weapon Cooldown -15%",
    upgrade_double_name: "Double Throw",
    upgrade_double_desc: "Throws 1 extra weapon",
    upgrade_sideShot_name: "Side Shot",
    upgrade_sideShot_desc: "Throws 2 extra weapons diagonally",
    upgrade_burst_name: "Burst Throw",
    upgrade_burst_desc: "Each throw fires an extra wave",
    upgrade_size_name: "Giant Stationary",
    upgrade_size_desc: "Weapon Size +20%",
    upgrade_wallHp_name: "Wall Repair",
    upgrade_wallHp_desc: "Restore 12 Wall HP",
    upgrade_coinMultiplier_name: "Salary Bonus",
    upgrade_coinMultiplier_desc: "Gold Coins Earned +35%",
    upgrade_pierce_name: "Piercing Throw",
    upgrade_pierce_desc: "Weapons pass through 1 more enemy",
    upgrade_explode_name: "Bursting Stationary",
    upgrade_explode_desc: "Hits splash nearby enemies",
    upgrade_lifeSteal_name: "Guard Spirit",
    upgrade_lifeSteal_desc: "Defeats restore 3 Wall HP",
    crit_label: "CRIT"
  },
  "zh-Hant": {
    game_title: "奇想守城",
    menu_title: "主選單",
    hud_stage: "關卡",
    hud_wave: "波次",
    hud_coins: "金幣",
    tab_character: "角色",
    tab_equipment: "裝備",
    tab_battle: "戰鬥",
    tab_wall: "城牆",
    tab_settings: "設定",
    menu_character: "角色狀態",
    menu_equipment: "裝備強化",
    menu_battle: "選擇關卡",
    menu_wall: "城牆強化",
    menu_settings: "設定",
    hero_title: "小勇者 Lv {lvl}",
    hero_subtitle: "強化角色能力，讓每一場更穩、更有收穫。",
    heroCoin_title: "零用錢運 Lv {lvl}",
    heroCoin_desc: "金幣獲得 +{pct}%",
    heroAttack_title: "用力投擲 Lv {lvl}",
    heroAttack_desc: "基礎攻擊 +{bonus}",
    heroCrit_title: "弱點眼力 Lv {lvl}",
    heroCrit_desc: "爆擊率 {pct}%",
    heroCritDamage_title: "爆擊力道 Lv {lvl}",
    heroCritDamage_desc: "爆擊傷害 x{mul}",
    heroSpeed_title: "快速手感 Lv {lvl}",
    heroSpeed_desc: "飛行速度 +{bonus}",
    diamondPower_title: "鑽石專注 Lv {lvl}",
    diamondPower_desc: "基礎攻擊 +{bonus}，消耗鑽石升級",
    equip_weapons: "攜帶武器 8",
    equip_backpack: "背包",
    wallHp_title: "城牆血量 Lv {lvl}",
    wallHp_desc: "最大血量 {val}",
    wallGuard_title: "牆面加固 Lv {lvl}",
    wallGuard_desc: "城牆受傷 -{val}",
    wallRegen_title: "自動修補 Lv {lvl}",
    wallRegen_desc: "每 {sec} 秒回復 {val} 血量",
    settings_progress: "進度",
    settings_unlocked_stages: "已解鎖到第 {count} 關",
    settings_pause_question: "要繼續或離開戰鬥？",
    language: "語言",
    language_desc: "選擇顯示語言",
    back_lobby: "回大廳",
    upgrade_panel_title: "選擇強化",
    upgrade_wave_complete: "第 {wave} 波完成",
    settlement_title: "戰鬥結算",
    settlement_new_clear: "新關卡挑戰成功！",
    settlement_reclear: "已通關關卡完成！",
    settlement_unlocked: "解鎖第 {id} 關！",
    settlement_no_drops: "本次沒有掉落武器",
    btn_next: "下一關",
    btn_confirm: "回關卡選擇",
    btn_resume: "繼續",
    btn_leave: "離開戰鬥",
    btn_start: "開始",
    btn_play_again: "再玩一次",
    btn_stage_select: "回關卡選擇",
    weapon_modal_empty: "點選武器查看攻擊、冷卻和合成變化",
    weapon_upgrade_tip: "同階背包武器可合成升級",
    weapon_stats_dmg: "攻擊 {val}",
    weapon_stats_cd: "冷卻 {val}秒",
    weapon_stats_spd: "飛行 {val}",
    weapon_stats_size: "大小 {val}",
    weapon_max_tier: "已達目前最高合成階級",
    weapon_next_tier_preview: "x{lvl} → x{next}：攻擊 {dmg} / 冷卻 {cd}秒 / 大小 {size}",
    upgrade_preview: "{current} → {next}",
    upgrade_none: "尚未強化",
    defeat_title: "城牆爆了",
    defeat_desc: "關卡 {lvl}  本場金幣 {coins}",
    victory_title: "勝利！",
    victory_challenge_success: "挑戰成功！",
    victory_stage_clear: "通關成功！",
    loading_progress: "載入中 {pct}%",
    load_fail: "素材讀取失敗",
    load_fail_desc: "載入失敗，請重新整理",
    enemy_toilet: "衝鋒馬桶",
    enemy_tv: "搖擺電視",
    enemy_fridge: "厚重冰箱",
    enemy_wardrobe: "重擊衣櫃",
    enemy_surveillance: "突進監視器",
    enemy_books: "魔法書堆",
    enemy_clock: "急跑鬧鐘",
    enemy_pencilbox: "鉛筆盒衝車",
    boss_spawned: "{name} 王出現！",
    boss_label: "{name} 王 -{pct}%{shield}",
    boss_shield: "盾 {count}",
    weapon_eraser: "橡皮擦",
    weapon_pencil: "鉛筆",
    weapon_ruler: "尺",
    upgrade_damage_name: "銳利橡皮擦",
    upgrade_damage_desc: "武器傷害 +1",
    upgrade_cooldown_name: "快速出手",
    upgrade_cooldown_desc: "武器冷卻 -15%",
    upgrade_double_name: "雙重投擲",
    upgrade_double_desc: "每次多丟 1 個",
    upgrade_sideShot_name: "左右斜射",
    upgrade_sideShot_desc: "正面攻擊時額外往左右各丟 1 個",
    upgrade_burst_name: "連續投擲",
    upgrade_burst_desc: "每次出手追加 1 波連射",
    upgrade_size_name: "大型文具",
    upgrade_size_desc: "武器變大 20%",
    upgrade_wallHp_name: "緊急修補",
    upgrade_wallHp_desc: "回復 12 點牆血量",
    upgrade_coinMultiplier_name: "零用錢加倍",
    upgrade_coinMultiplier_desc: "金幣收益提升 35%",
    upgrade_pierce_name: "穿透投擲",
    upgrade_pierce_desc: "武器可多穿透 1 隻敵人",
    upgrade_explode_name: "爆裂文具",
    upgrade_explode_desc: "命中時對附近敵人造成濺射傷害",
    upgrade_lifeSteal_name: "守城回復",
    upgrade_lifeSteal_desc: "擊敗敵人時回復 3 點牆血量",
    crit_label: "暴"
  }
};


const W = canvas.width;
const H = canvas.height;
const wallY = 1200;
const heroY = 1432;
const DATA = window.WONDER_DATA;
const enemyFiles = DATA.assets.enemies;
const imageSources = DATA.assets.images;

const images = {};
let enemyImages = [];
const LEVELS = DATA.levels;
const UPGRADES = DATA.upgrades;
const WEAPONS = DATA.weapons;
const ENEMY_TYPES = DATA.enemyTypes;
const SAVE_KEY = "wonderCrashHighestUnlocked";
const PROFILE_KEY = "wonderCrashProfile";
const WEAPON_COOLDOWN = 1.35;
const WEAPON_DROP_RATE = 0.5;
const DIFFICULTY = {
  enemyHp: 0.82,
  enemySpeed: 0.9,
  enemyDamage: 0.78,
};
let highestUnlocked = loadHighestUnlocked();
let profile = loadProfile();
let activeMenuTab = "battle";
let draggedWeaponId = null;
let draggedEquipSlot = null;
let draggedBackpackIndex = null;
let selectedWeaponInfo = { source: "equip", index: 0 };
let suppressEquipmentClick = false;
let floatingMessageTimer = null;
const equipmentPointerDrag = {
  active: false,
  started: false,
  pointerId: null,
  source: "",
  startX: 0,
  startY: 0,
  ghost: null,
};

const drag = {
  active: false,
  pointerId: null,
};

let state = makeState(0);
let lastTime = performance.now();
let loaded = false;

setLoadingProgress(0);

function makeState(levelIndex) {
  const level = LEVELS[levelIndex];
  return {
    levelIndex,
    level,
    running: false,
    gameOver: false,
    won: false,
    awaitingUpgrade: false,
    coinsBanked: false,
    score: 0,
    coins: 0,
    maxWallHp: getMaxWallHp(),
    wallHp: getMaxWallHp(),
    time: 0,
    spawnTimer: 0.7,
    waveIndex: 0,
    waveSpawnRemaining: level.waves[0].count,
    waveBreakTimer: 0,
    bossSpawnedForWave: -1,
    bossMinionTimer: 2.2,
    weaponTimers: buildInitialWeaponTimers(),
    weaponCooldowns: Array.from({ length: 8 }, () => getBaseWeaponCooldown()),
    wallRegenTimer: getWallRegenInterval(),
    weaponCooldownMultiplier: 1,
    projectileDamage: getBaseWeaponDamage(),
    projectileCount: 1,
    sideShots: 0,
    burstCount: 1,
    projectileSizeMultiplier: 1,
    pierceCount: 0,
    splashDamage: 0,
    splashRadius: 0,
    killHeal: 0,
    coinMultiplier: 1,
    hero: {
      x: W / 2,
      y: heroY,
      width: 138,
      height: 138,
    },
    enemies: [],
    projectiles: [],
    bossProjectiles: [],
    hits: [],
    damageTexts: [],
    bossBanner: null,
  };
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function preload() {
  let loadedCount = 0;
  const entries = Object.entries(imageSources);
  const totalCount = entries.length + enemyFiles.length;
  const loadWithProgress = (src) =>
    loadImage(src).then((image) => {
      loadedCount += 1;
      setLoadingProgress(loadedCount / totalCount);
      return image;
    });

  const loadedImages = await Promise.all(entries.map(([, src]) => loadWithProgress(src)));
  entries.forEach(([key], index) => {
    images[key] = loadedImages[index];
  });
  enemyImages = await Promise.all(enemyFiles.map(loadWithProgress));
  loaded = true;
  window.WonderAnalytics?.track("game_ready", { game_id: "wonder-crash" });
  showMainMenu("battle");
  requestAnimationFrame(loop);
}

function setLoadingProgress(progress) {
  if (!overlayText) return;
  overlayText.textContent = t("loading_progress", { pct: Math.round(progress * 100) });
}

function restart() {
  startLevel(state.levelIndex);
}

function startLevel(levelIndex) {
  if (levelIndex + 1 > highestUnlocked) {
    showFloatingMessage(t("locked"));
    window.WonderSound?.play("wrong");
    return;
  }
  state = makeState(levelIndex);
  state.running = true;
  document.body.classList.add("wonder-tutorial-hidden");
  settingsBtn.classList.remove("hidden");
  battleHud.classList.remove("hidden");
  menuCoinLine.classList.add("hidden");
  menuTabs.classList.add("hidden");
  overlay.classList.add("hidden");
  updateHud();
  window.WonderSound?.play("start");
}

window.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !state.running) restart();
});

startBtn.addEventListener("click", () => {
  if (state.won && state.levelIndex + 1 < LEVELS.length) {
    startLevel(state.levelIndex + 1);
    return;
  }
  if (state.won && state.levelIndex + 1 >= LEVELS.length) {
    showMainMenu("battle");
    return;
  }
  restart();
});
levelGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-level]");
  if (!button) return;
  startLevel(Number(button.dataset.level));
});
menuTabs.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-menu-tab]");
  if (!button) return;
  showMainMenu(button.dataset.menuTab);
});
upgradeGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-upgrade]");
  if (!button) return;
  chooseUpgrade(button.dataset.upgrade);
});
profilePanel.addEventListener("click", (event) => {
  const settlementAction = event.target.closest("[data-settlement-action]");
  if (settlementAction) {
    handleSettlementAction(settlementAction.dataset.settlementAction);
    return;
  }
  const button = event.target.closest("button[data-profile-upgrade]");
  if (button) {
    buyProfileUpgrade(button.dataset.profileUpgrade);
    return;
  }
  if (activeMenuTab !== "equipment" || suppressEquipmentClick) return;
  const slot = event.target.closest("[data-equip-slot]");
  const backpackItem = event.target.closest("[data-backpack-index]");
  if (slot) {
    selectWeaponInfo("equip", Number(slot.dataset.equipSlot));
    return;
  }
  if (backpackItem) selectWeaponInfo("bag", Number(backpackItem.dataset.backpackIndex));
});
profilePanel.addEventListener("dragstart", (event) => {
  const item = event.target.closest("[data-backpack-weapon]");
  const slot = event.target.closest("[data-equip-slot]");
  if (item) {
    draggedWeaponId = item.dataset.backpackWeapon;
    draggedEquipSlot = null;
    draggedBackpackIndex = Number(item.dataset.backpackIndex);
    event.dataTransfer.setData("text/plain", `bag:${draggedBackpackIndex}`);
    return;
  }
  if (slot && getEquippedSlot(Number(slot.dataset.equipSlot))) {
    draggedWeaponId = null;
    draggedEquipSlot = Number(slot.dataset.equipSlot);
    draggedBackpackIndex = null;
    event.dataTransfer.setData("text/plain", `slot:${draggedEquipSlot}`);
  }
});
profilePanel.addEventListener("dragover", (event) => {
  const slot = event.target.closest("[data-equip-slot]");
  const backpack = event.target.closest("[data-backpack-drop]");
  if (!slot && !backpack) return;
  event.preventDefault();
  if (slot) slot.classList.add("drag-over");
});
profilePanel.addEventListener("dragleave", (event) => {
  const slot = event.target.closest("[data-equip-slot]");
  if (slot) slot.classList.remove("drag-over");
});
profilePanel.addEventListener("drop", (event) => {
  const slot = event.target.closest("[data-equip-slot]");
  const backpackItem = event.target.closest("[data-backpack-index]");
  const backpack = event.target.closest("[data-backpack-drop]");
  if (!slot && !backpack) return;
  event.preventDefault();
  if (slot) {
    slot.classList.remove("drag-over");
    handleEquipDrop(Number(slot.dataset.equipSlot), event.dataTransfer.getData("text/plain"));
    return;
  }
  if (backpackItem) {
    handleBackpackDrop(Number(backpackItem.dataset.backpackIndex), event.dataTransfer.getData("text/plain"));
    return;
  }
  if (backpack) unequipWeapon(draggedEquipSlot);
});
profilePanel.addEventListener("pointerdown", startEquipmentPointerDrag);
profilePanel.addEventListener("pointermove", moveEquipmentPointerDrag);
profilePanel.addEventListener("pointerup", finishEquipmentPointerDrag);
profilePanel.addEventListener("pointercancel", cancelEquipmentPointerDrag);
settingsBtn.addEventListener("click", showPauseMenu);
resumeBtn.addEventListener("click", resumeBattle);
leaveBtn.addEventListener("click", leaveBattle);
weaponModalClose.addEventListener("click", closeWeaponModal);
weaponModal.addEventListener("click", (event) => {
  if (event.target === weaponModal) closeWeaponModal();
});
canvas.addEventListener("pointerdown", startDrag);
canvas.addEventListener("pointermove", moveDrag);
canvas.addEventListener("pointerup", stopDrag);
canvas.addEventListener("pointercancel", stopDrag);

function loop(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.033);
  lastTime = now;

  if (loaded && state.running) update(dt);
  draw();
  requestAnimationFrame(loop);
}

function update(dt) {
  state.time += dt;

  updateWeaponCooldowns(dt);
  updateWallRegen(dt);

  updateWaves(dt);

  for (const projectile of state.projectiles) {
    projectile.x += (projectile.vx || 0) * dt;
    projectile.y -= projectile.speed * dt;
    projectile.rotation += projectile.spin * dt;
  }
  for (const projectile of state.bossProjectiles) {
    projectile.x += projectile.vx * dt;
    projectile.y += projectile.speed * dt;
    projectile.rotation += projectile.spin * dt;
  }

  for (const enemy of state.enemies) {
    updateEnemyAbility(enemy, dt);
    enemy.y += enemy.speed * enemy.dashBoost * dt;
    if (enemy.isBoss) {
      const stopY = wallY - enemy.size * 0.58;
      enemy.y = Math.min(enemy.y, stopY);
    }
    enemy.wobble += dt * enemy.wobbleSpeed;
  }

  resolveHits();
  resolveBossProjectiles();
  damageWall();

  state.projectiles = state.projectiles.filter((projectile) => projectile.y > -100);
  state.bossProjectiles = state.bossProjectiles.filter((projectile) => !projectile.used && projectile.y < wallY + 60);
  state.enemies = state.enemies.filter((enemy) => enemy.hp > 0 && enemy.y < H + 140);
  state.hits = state.hits.filter((hit) => {
    hit.life -= dt;
    return hit.life > 0;
  });
  state.damageTexts = state.damageTexts.filter((text) => {
    text.life -= dt;
    text.y -= 70 * dt;
    return text.life > 0;
  });
  if (state.bossBanner) {
    state.bossBanner.life -= dt;
    if (state.bossBanner.life <= 0) state.bossBanner = null;
  }

  if (state.wallHp <= 0) loseLevel();

  updateHud();
}

function buildInitialWeaponTimers() {
  const seen = {};
  return profile.equippedWeapons.map((slot) => {
    if (!slot?.id) return 0;
    const entry = { weapon: getWeapon(slot.id), level: Math.max(1, Number(slot.level) || 1) };
    if (!entry.weapon) return 0;
    const copyIndex = seen[slot.id] || 0;
    seen[slot.id] = copyIndex + 1;
    const equippedCopies = profile.equippedWeapons.filter((item) => item?.id === slot.id).length || 1;
    return getWeaponCooldown(entry) * (copyIndex / equippedCopies);
  });
}

function updateWeaponCooldowns(dt) {
  const slots = getEquippedWeaponSlots();
  for (let index = 0; index < slots.length; index += 1) {
    const entry = slots[index];
    if (!entry?.weapon) {
      state.weaponTimers[index] = 0;
      state.weaponCooldowns[index] = 0;
      continue;
    }

    const cooldown = getWeaponCooldown(entry) * state.weaponCooldownMultiplier;
    state.weaponCooldowns[index] = cooldown;
    state.weaponTimers[index] -= dt;
    if (state.weaponTimers[index] <= 0) {
      shootWeaponSlot(index, entry);
      state.weaponTimers[index] += cooldown;
      if (state.weaponTimers[index] <= 0) state.weaponTimers[index] = cooldown;
    }
  }
}

function updateWallRegen(dt) {
  const amount = getWallRegenAmount();
  if (amount <= 0 || state.wallHp <= 0 || state.wallHp >= state.maxWallHp) return;
  state.wallRegenTimer -= dt;
  if (state.wallRegenTimer > 0) return;
  state.wallHp = Math.min(state.maxWallHp, state.wallHp + amount);
  state.wallRegenTimer = getWallRegenInterval();
  state.hits.push({ x: W - 98, y: wallY - 22, radius: 22, life: 0.2 });
}

function shootWeaponSlot(slotIndex, entry) {
  const weapon = entry.weapon;
  const projectileCount = state.projectileCount;
  const spread = 36;
  window.WonderSound?.play("shoot");
  for (let burst = 0; burst < state.burstCount; burst += 1) {
    for (let i = 0; i < projectileCount; i += 1) {
      const offset = (i - (projectileCount - 1) / 2) * spread;
      fireProjectile(entry, offset, burst * 24, 0);
      for (let sideIndex = 0; sideIndex < state.sideShots; sideIndex += 1) {
        const sideSpeed = 210 + sideIndex * 120;
        const sideOffset = 18 + sideIndex * 14;
        fireProjectile(entry, offset - sideOffset, burst * 24, -sideSpeed);
        fireProjectile(entry, offset + sideOffset, burst * 24, sideSpeed);
      }
    }
  }
}

function fireProjectile(entry, xOffset, yOffset, vx) {
  const weapon = entry.weapon;
  const damageRoll = rollWeaponDamage(entry);
  state.projectiles.push({
    x: state.hero.x + xOffset,
    y: state.hero.y - 72 + yOffset,
    vx,
    size: getWeaponSize(entry) * state.projectileSizeMultiplier,
    speed: getWeaponSpeed(entry),
    damage: damageRoll.damage,
    crit: damageRoll.crit,
    pierceLeft: state.pierceCount,
    hitEnemies: [],
    rotation: 0,
    spin: 9,
    image: images[weapon.projectile] || images.eraser,
  });
}

function updateWaves(dt) {
  if (state.waveIndex >= state.level.waves.length) {
    if (state.enemies.length === 0) winLevel();
    return;
  }

  const wave = state.level.waves[state.waveIndex];
  if (wave.boss && state.bossSpawnedForWave !== state.waveIndex) {
    spawnBoss(wave);
    state.bossSpawnedForWave = state.waveIndex;
  }
  if (state.waveSpawnRemaining > 0) {
    state.spawnTimer -= dt;
    if (state.spawnTimer <= 0) {
      spawnEnemy(wave);
      state.waveSpawnRemaining -= 1;
      state.spawnTimer = wave.spawnInterval;
    }
    return;
  }

  if (wave.boss && hasActiveBoss()) {
    state.bossMinionTimer -= dt;
    if (state.bossMinionTimer <= 0) {
      spawnBossMinions(wave);
      state.bossMinionTimer = Math.max(1.05, wave.spawnInterval * 2.65);
    }
  }

  if (state.enemies.length === 0) {
    state.waveBreakTimer -= dt;
    if (state.waveBreakTimer <= 0) {
      if (state.waveIndex + 1 < state.level.waves.length) {
        showUpgradeChoices();
        return;
      }
      state.waveIndex += 1;
    }
  }
}

function prepareNextWave() {
  state.waveIndex += 1;
  state.waveSpawnRemaining = state.level.waves[state.waveIndex].count;
  state.spawnTimer = 0.65;
  state.waveBreakTimer = 1.1;
  state.bossMinionTimer = 2.2;
}

function hasActiveBoss() {
  return state.enemies.some((enemy) => enemy.isBoss && enemy.hp > 0);
}

function spawnEnemy(wave) {
  const typeIndex = Math.floor(random(0, Math.min(wave.maxEnemyType + 1, ENEMY_TYPES.length)));
  const type = ENEMY_TYPES[typeIndex];
  addEnemy(type, wave, false);
}

function spawnBoss(wave) {
  const type = ENEMY_TYPES[Math.min(wave.bossType ?? wave.maxEnemyType, ENEMY_TYPES.length - 1)];
  addEnemy(type, wave, true);
  state.bossMinionTimer = 1.8;
  state.bossBanner = { text: t("boss_spawned", { name: t("enemy_" + type.id) }), life: 2.6 };
  window.WonderSound?.play("boss");
}

function spawnBossMinions(wave) {
  const count = state.level.id >= 20 ? 3 : state.level.id >= 10 ? 2 : 1;
  for (let i = 0; i < count; i += 1) spawnEnemy(wave);
}

function addEnemy(type, wave, isBoss) {
  const image = enemyImages[type.imageIndex];
  const bossScale = isBoss ? getBossScale(type) : null;
  const size = (isBoss ? wave.sizeMax * bossScale.size : random(wave.sizeMin, wave.sizeMax)) * type.sizeScale;
  const hp = Math.max(1, Math.ceil(wave.hp * type.hpScale * DIFFICULTY.enemyHp * (bossScale?.hp || 1) * (isBoss ? getBossLevelScale() : 1)));
  state.enemies.push({
    type,
    image,
    isBoss,
    x: isBoss ? W / 2 : random(size / 2 + 20, W - size / 2 - 20),
    y: -size,
    baseX: 0,
    size,
    hp,
    maxHp: hp,
    bossReduction: bossScale?.reduction || 0,
    bossShieldHits: bossScale?.shieldHits || 0,
    bossAttackTimer: isBoss ? random(1.4, 2.4) : 0,
    bossAttackInterval: bossScale?.attackInterval || 2.8,
    bossBallDamage: Math.max(1, Math.ceil(wave.damage * type.damageScale * DIFFICULTY.enemyDamage * (bossScale?.ballDamage || 1.2))),
    speed: (isBoss ? wave.speedMin * 0.42 : random(wave.speedMin, wave.speedMax)) * type.speedScale * DIFFICULTY.enemySpeed * (bossScale?.speed || 1),
    damage: Math.max(1, Math.ceil(wave.damage * type.damageScale * DIFFICULTY.enemyDamage * (bossScale?.damage || 1))),
    coinReward: Math.max(1, Math.ceil(wave.coinReward * type.coinScale * (bossScale?.coin || 1))),
    armorUsed: false,
    dashTimer: random(0.8, 1.8),
    dashBoost: 1,
    wobble: random(0, Math.PI * 2),
    wobbleSpeed: random(2, 4) * (type.ability === "zigzag" ? 1.8 : 1) * (isBoss ? 0.65 : 1),
  });
  state.enemies[state.enemies.length - 1].baseX = state.enemies[state.enemies.length - 1].x;
}

function getBossScale(type) {
  const base = { size: 2.95, hp: 46, damage: 2.5, speed: 0.46, coin: 14, reduction: 0.22, attackInterval: 3.45, ballDamage: 1.15, shieldHits: 0 };
  if (type.role === "runner" || type.role === "sprinter") return { ...base, hp: 36, speed: 0.64, damage: 2.1, coin: 12, reduction: 0.16, attackInterval: 2.65, ballDamage: 0.98 };
  if (type.role === "tank") return { ...base, size: 3.15, hp: 66, speed: 0.36, damage: 2.4, coin: 16, reduction: 0.34, attackInterval: 3.85, ballDamage: 1.05, shieldHits: 6 };
  if (type.role === "breaker" || type.role === "bruiser") return { ...base, hp: 54, damage: 3.5, coin: 16, reduction: 0.26, attackInterval: 3.55, ballDamage: 1.55 };
  if (type.role === "dasher") return { ...base, hp: 42, speed: 0.58, damage: 2.5, coin: 15, reduction: 0.2, attackInterval: 2.45, ballDamage: 1.1 };
  if (type.role === "caster") return { ...base, hp: 50, speed: 0.42, damage: 2.8, coin: 15, reduction: 0.24, attackInterval: 2.9, ballDamage: 1.22 };
  return base;
}

function getBossLevelScale() {
  return 1 + Math.floor((state.level.id - 1) / 5) * 0.45;
}

function updateEnemyAbility(enemy, dt) {
  enemy.dashBoost = 1;
  if (enemy.isBoss) updateBossAbility(enemy, dt);

  if (enemy.type.ability === "zigzag") {
    const range = enemy.isBoss ? 74 : 42;
    enemy.x = clamp(enemy.baseX + Math.sin(enemy.wobble) * range, enemy.size / 2 + 14, W - enemy.size / 2 - 14);
  }

  if (enemy.type.ability === "dash") {
    enemy.dashTimer -= dt;
    if (enemy.dashTimer <= 0) {
      enemy.dashBoost = enemy.isBoss ? 3.15 : 2.6;
      enemy.dashTimer = enemy.isBoss ? random(0.75, 1.35) : random(1.2, 2.2);
      state.hits.push({ x: enemy.x, y: enemy.y, radius: 20, life: 0.14 });
    }
  }
}

function updateBossAbility(enemy, dt) {
  enemy.bossAttackTimer -= dt;
  if (enemy.bossAttackTimer > 0) return;
  throwBossBall(enemy);
  enemy.bossAttackTimer = enemy.bossAttackInterval;
}

function throwBossBall(enemy) {
  const startX = enemy.x;
  const startY = enemy.y + enemy.size * 0.22;
  const targetX = clamp(state.hero.x + random(-65, 65), 70, W - 70);
  const speed = 440 + state.level.id * 5;
  const travelTime = Math.max(0.45, (wallY - startY) / speed);
  const dx = clamp((targetX - startX) / travelTime, -520, 520);
  const size = Math.max(34, Math.min(74, enemy.size * 0.18));
  state.bossProjectiles.push({
    x: startX,
    y: startY,
    vx: dx,
    speed,
    targetX,
    size,
    damage: enemy.bossBallDamage,
    rotation: 0,
    spin: 5,
    color: getBossBallColor(enemy),
  });
  state.hits.push({ x: startX, y: startY, radius: size * 0.65, life: 0.18 });
  window.WonderSound?.play("boss");
}

function getBossBallColor(enemy) {
  if (enemy.type.role === "tank") return "#7cc6ff";
  if (enemy.type.role === "breaker" || enemy.type.role === "bruiser") return "#ff6b4a";
  if (enemy.type.role === "dasher" || enemy.type.role === "sprinter") return "#ffdf57";
  if (enemy.type.role === "caster") return "#b48cff";
  return "#ff8f4e";
}

function loseLevel() {
  overlay.classList.remove("equipment-screen");
  bankRunCoins();
  state.running = false;
  state.gameOver = true;
  settingsBtn.classList.add("hidden");
  battleHud.classList.add("hidden");
  menuCoinLine.classList.add("hidden");
  overlay.querySelector("h1").textContent = t("defeat_title");
  overlayText.textContent = t("defeat_desc", { lvl: state.level.id, coins: state.coins });
  startBtn.classList.add("hidden");
  levelGrid.classList.add("hidden");
  upgradeGrid.classList.add("hidden");
  menuContent.classList.remove("hidden");
  profilePanel.classList.remove("hidden");
  profilePanel.innerHTML = renderDefeatActions();
  pausePanel.classList.add("hidden");
  menuTabs.classList.add("hidden");
  overlay.classList.remove("hidden");
  updateHud();
  window.WonderSound?.play("wrong");
}

function winLevel() {
  overlay.classList.remove("equipment-screen");
  bankRunCoins();
  const wasChallenge = state.level.id === highestUnlocked;
  const drops = rollLevelDrops();
  state.running = false;
  state.won = true;
  settingsBtn.classList.add("hidden");
  battleHud.classList.add("hidden");
  menuCoinLine.classList.remove("hidden");
  state.score += state.wallHp;
  highestUnlocked = Math.max(highestUnlocked, Math.min(LEVELS.length + 1, state.levelIndex + 2));
  saveHighestUnlocked();
  overlay.querySelector("h1").textContent = wasChallenge ? t("victory_challenge_success") : t("victory_stage_clear");
  overlayText.textContent = buildWinText(drops, wasChallenge);
  startBtn.classList.add("hidden");
  menuContent.classList.remove("hidden");
  menuTabs.classList.add("hidden");
  activeMenuTab = "battle";
  levelGrid.classList.add("hidden");
  upgradeGrid.classList.add("hidden");
  profilePanel.classList.remove("hidden");
  pausePanel.classList.add("hidden");
  profilePanel.innerHTML = renderSettlement(drops, wasChallenge);
  overlay.classList.remove("hidden");
  updateHud();
  window.WonderSound?.play("win");
}

function rollLevelDrops() {
  const drops = [];
  if (Math.random() < WEAPON_DROP_RATE) {
    const item = { id: getLevelDropWeaponId(state.level.id), level: 1 };
    profile.backpackItems.push(item);
    drops.push(item);
    saveProfile();
    window.WonderSound?.play("coin");
  }
  return drops;
}

function getLevelDropWeaponId(levelId) {
  if (levelId >= 21) return "ruler";
  if (levelId >= 11) return "pencil";
  return "eraser";
}

function buildWinText(drops, wasChallenge) {
  const unlockText = wasChallenge && state.levelIndex + 1 < LEVELS.length ? ` ` + t("settlement_unlocked", { id: state.level.id + 1 }) : "";
  return t("victory_stage_clear") + ` ` + t("hud_stage") + ` ${state.level.id} ${unlockText}`;
}

function renderSettlement(drops, wasChallenge) {
  const dropItems = drops.map((item) => renderRewardItem(item)).join("");
  return `
    <div class="settlement-panel">
      <div class="settlement-row">
        <strong>${t("settlement_title")}</strong>
        <span>${wasChallenge ? t("settlement_new_clear") : t("settlement_reclear")}</span>
      </div>
      <div class="reward-grid">
        <div class="reward-item coin-reward"><img src="assets/coin.png" alt="" /><span>x${state.coins}</span></div>
        ${dropItems || `<div class="reward-empty">${t("settlement_no_drops")}</div>`}
      </div>
      <div class="settlement-actions">
        ${state.levelIndex + 1 < LEVELS.length ? `<button type="button" data-settlement-action="next">${t("btn_next")}</button>` : ""}
        <button type="button" data-settlement-action="home">${t("btn_confirm")}</button>
      </div>
    </div>
  `;
}

function handleSettlementAction(action) {
  if (action === "retry") {
    restart();
    return;
  }
  if (action === "next" && state.levelIndex + 1 < LEVELS.length) {
    startLevel(state.levelIndex + 1);
    return;
  }
  if (action === "home") showMainMenu("battle");
}

function renderDefeatActions() {
  return `
    <div class="settlement-panel">
      <div class="settlement-row">
        <strong>${t("defeat_title")}</strong>
        <span>${t("defeat_desc", { lvl: state.level.id, coins: state.coins })}</span>
      </div>
      <div class="settlement-actions">
        <button type="button" data-settlement-action="retry">${t("btn_play_again")}</button>
        <button type="button" data-settlement-action="home">${t("btn_stage_select")}</button>
      </div>
    </div>
  `;
}

function renderRewardItem(item) {
  const weapon = getWeapon(item.id);
  if (!weapon) return "";
  const level = Math.max(1, Number(item.level) || 1);
  return `
    <div class="reward-item ${getWeaponTierClass(level)}">
      <img src="${getWeaponIconSrc(weapon)}" alt="" onerror="this.onerror=null;this.src='assets/eraser.png'" />
      <span>${weapon.name}${level > 1 ? ` x${level}` : ""}</span>
    </div>
  `;
}

function resolveHits() {
  for (const projectile of state.projectiles) {
    if (projectile.used) continue;
    for (const enemy of state.enemies) {
      if (enemy.hp <= 0) continue;
      const dx = projectile.x - enemy.x;
      const dy = projectile.y - enemy.y;
      const reach = projectile.size * 0.38 + enemy.size * 0.38;
      if (projectile.hitEnemies.includes(enemy)) continue;
      if (dx * dx + dy * dy <= reach * reach) {
        projectile.hitEnemies.push(enemy);
        const damage = getDamageToEnemy(enemy, projectile.damage);
        damageEnemy(enemy, damage, projectile.crit, projectile.x, projectile.y);
        if (state.splashDamage > 0) splashDamage(projectile, enemy);
        if (projectile.pierceLeft > 0) {
          projectile.pierceLeft -= 1;
          projectile.damage = Math.max(1, Math.ceil(projectile.damage * 0.72));
        } else {
          projectile.used = true;
        }
        break;
      }
    }
  }
  state.projectiles = state.projectiles.filter((projectile) => !projectile.used);
}

function damageEnemy(enemy, damage, crit, hitX = enemy.x, hitY = enemy.y) {
  enemy.hp -= damage;
  state.hits.push({ x: hitX, y: hitY, radius: crit ? 26 : 18, life: 0.18 });
  state.damageTexts.push({
    x: enemy.x + random(-14, 14),
    y: enemy.y - enemy.size * 0.28,
    value: damage,
    crit,
    life: 0.62,
    maxLife: 0.62,
  });
  if (enemy.hp <= 0) {
    defeatEnemy(enemy);
    return;
  }
  window.WonderSound?.play("hit");
}

function defeatEnemy(enemy) {
  if (enemy.rewarded) return;
  enemy.rewarded = true;
  state.score += 10;
  state.coins += Math.ceil(enemy.coinReward * state.coinMultiplier * (1 + getHeroCoinBonus()));
  if (state.killHeal > 0 && state.wallHp < state.maxWallHp) {
    const heal = Math.min(state.killHeal, state.maxWallHp - state.wallHp);
    state.wallHp += heal;
    state.damageTexts.push({
      x: W - 100 + random(-18, 18),
      y: wallY - 38,
      value: `+${heal}`,
      heal: true,
      life: 0.72,
      maxLife: 0.72,
    });
  }
  state.hits.push({ x: enemy.x, y: enemy.y, radius: enemy.size * 0.34, life: 0.24 });
  window.WonderSound?.play("enemyDown");
}

function splashDamage(projectile, primaryEnemy) {
  const radius = state.splashRadius || projectile.size * 1.4;
  const splash = Math.max(1, Math.ceil(projectile.damage * state.splashDamage));
  state.hits.push({ x: primaryEnemy.x, y: primaryEnemy.y, radius, life: 0.24 });
  for (const enemy of state.enemies) {
    if (enemy === primaryEnemy || enemy.hp <= 0) continue;
    const dx = enemy.x - primaryEnemy.x;
    const dy = enemy.y - primaryEnemy.y;
    if (dx * dx + dy * dy > radius * radius) continue;
    damageEnemy(enemy, getDamageToEnemy(enemy, splash), false, enemy.x, enemy.y);
  }
}

function getDamageToEnemy(enemy, damage) {
  if (enemy.isBoss && enemy.bossShieldHits > 0) {
    enemy.bossShieldHits -= 1;
    state.hits.push({ x: enemy.x, y: enemy.y, radius: enemy.size * 0.34, life: 0.24 });
    return Math.max(1, Math.ceil(damage * 0.18));
  }
  if (enemy.isBoss) {
    damage = Math.max(1, Math.ceil(damage * (1 - (enemy.bossReduction || 0))));
  }
  if (enemy.type.ability === "armor" && !enemy.armorUsed) {
    enemy.armorUsed = true;
    return Math.max(1, Math.ceil(damage * 0.45));
  }
  return damage;
}

function resolveBossProjectiles() {
  for (const projectile of state.bossProjectiles) {
    if (projectile.used) continue;
    if (projectile.y + projectile.size * 0.45 >= wallY) {
      projectile.used = true;
      projectile.x = clamp(projectile.x, 32, W - 32);
      const damage = getGuardedWallDamage(projectile.damage);
      state.wallHp = Math.max(0, state.wallHp - damage);
      state.hits.push({ x: projectile.x, y: wallY, radius: projectile.size * 0.9, life: 0.3 });
      state.damageTexts.push({
        x: projectile.x,
        y: wallY - 44,
        value: `-${damage}`,
        crit: false,
        life: 0.7,
        maxLife: 0.7,
      });
      window.WonderSound?.play("wallHit");
    }
  }
}

function damageWall() {
  for (const enemy of state.enemies) {
    if (enemy.y + enemy.size * 0.38 >= wallY && !enemy.hitWall) {
      enemy.hitWall = true;
      enemy.hp = 0;
      state.wallHp = Math.max(0, state.wallHp - getGuardedWallDamage(enemy.damage));
      state.hits.push({ x: enemy.x, y: wallY, radius: enemy.type.ability === "breaker" ? 54 : 36, life: 0.28 });
      window.WonderSound?.play("wallHit");
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  if (loaded) {
    ctx.drawImage(images.bg, 0, 0, W, H);
  } else {
    ctx.fillStyle = "#202938";
    ctx.fillRect(0, 0, W, H);
  }

  drawPlayAreaShade();
  drawWall();
  drawWallHp();
  drawEnemies();
  drawProjectiles();
  drawBossProjectiles();
  drawHero();
  drawHits();
  drawDamageTexts();
  drawBossUi();
  drawWeaponHud();
}

function drawPlayAreaShade() {
  const gradient = ctx.createLinearGradient(0, 0, 0, H);
  gradient.addColorStop(0, "rgba(12, 19, 32, 0.12)");
  gradient.addColorStop(0.64, "rgba(12, 19, 32, 0.02)");
  gradient.addColorStop(1, "rgba(12, 19, 32, 0.34)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, W, H);
}

function drawWall() {
  const wallWidth = W * 1.02;
  const wallHeight = 250;
  ctx.save();
  ctx.globalAlpha = 0.96;
  ctx.drawImage(images.wall, (W - wallWidth) / 2, wallY - 78, wallWidth, wallHeight);
  ctx.restore();
}

function drawWallHp() {
  const width = W * 0.78;
  const height = 22;
  const x = (W - width) / 2;
  const y = wallY + 108;
  drawHpBar(x, y, width, height, state.wallHp / state.maxWallHp, 6);
}

function drawHero() {
  const hero = state.hero;
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 10;
  ctx.drawImage(images.hero, hero.x - hero.width / 2, hero.y - hero.height / 2, hero.width, hero.height);
  ctx.restore();
}

function drawEnemies() {
  for (const enemy of state.enemies) {
    const x = enemy.type.ability === "zigzag" ? enemy.x : enemy.x + Math.sin(enemy.wobble) * 6;
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.32)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 8;
    ctx.drawImage(enemy.image, x - enemy.size / 2, enemy.y - enemy.size / 2, enemy.size, enemy.size);
    ctx.restore();

    const hpWidth = enemy.isBoss ? Math.min(W * 0.76, enemy.size * 0.86) : enemy.size * 0.72;
    const hpHeight = enemy.isBoss ? 16 : 10;
    drawHpBar(x - hpWidth / 2, enemy.y + enemy.size * 0.48, hpWidth, hpHeight, enemy.hp / enemy.maxHp, 3);
    if (enemy.isBoss) {
      ctx.save();
      ctx.font = "900 28px 'Microsoft JhengHei', system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.lineWidth = 7;
      ctx.strokeStyle = "rgba(0, 0, 0, 0.76)";
      ctx.fillStyle = "#ffdf57";
      const reduction = Math.round((enemy.bossReduction || 0) * 100);
      const shieldText = enemy.bossShieldHits > 0 ? " " + t("boss_shield", { count: enemy.bossShieldHits }) : "";
      const label = t("boss_label", { name: t("enemy_" + enemy.type.id), pct: reduction, shield: shieldText });
      ctx.strokeText(label, x, enemy.y - enemy.size * 0.48);
      ctx.fillText(label, x, enemy.y - enemy.size * 0.48);
      ctx.restore();
    }
    if (enemy.type.ability === "armor" && !enemy.armorUsed) {
      ctx.strokeStyle = "rgba(160, 220, 255, 0.9)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(x, enemy.y, enemy.size * 0.43, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

function drawBossUi() {
  if (state.bossBanner) {
    ctx.save();
    ctx.globalAlpha = Math.min(1, state.bossBanner.life / 0.5);
    ctx.font = "900 44px 'Microsoft JhengHei', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 10;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.78)";
    ctx.fillStyle = "#ffdf57";
    ctx.strokeText(state.bossBanner.text, W / 2, H * 0.32);
    ctx.fillText(state.bossBanner.text, W / 2, H * 0.32);
    ctx.restore();
  }
}

function drawProjectiles() {
  for (const projectile of state.projectiles) {
    ctx.save();
    ctx.translate(projectile.x, projectile.y);
    ctx.rotate(projectile.rotation);
    drawImageContain(projectile.image || images.eraser, -projectile.size / 2, -projectile.size / 2, projectile.size, projectile.size);
    ctx.restore();
  }
}

function drawBossProjectiles() {
  for (const projectile of state.bossProjectiles) {
    ctx.save();
    ctx.translate(projectile.x, projectile.y);
    ctx.rotate(projectile.rotation);
    const radius = projectile.size / 2;
    const gradient = ctx.createRadialGradient(-radius * 0.25, -radius * 0.3, 3, 0, 0, radius);
    gradient.addColorStop(0, "#fff7b8");
    gradient.addColorStop(0.42, projectile.color);
    gradient.addColorStop(1, "rgba(70, 24, 18, 0.9)");
    ctx.fillStyle = gradient;
    ctx.shadowColor = projectile.color;
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.stroke();
    ctx.restore();
  }
}

function drawHits() {
  for (const hit of state.hits) {
    const progress = hit.life / 0.28;
    ctx.beginPath();
    ctx.arc(hit.x, hit.y, hit.radius * (1.4 - progress), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 219, 92, ${Math.max(0, progress)})`;
    ctx.fill();
  }
}

function drawDamageTexts() {
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const text of state.damageTexts) {
    const progress = clamp(text.life / text.maxLife, 0, 1);
    const scale = text.crit ? 1.18 : 1;
    ctx.globalAlpha = Math.min(1, progress * 1.4);
    ctx.font = `${text.crit ? "900" : "800"} ${Math.round((text.crit ? 34 : 28) * scale)}px 'Microsoft JhengHei', system-ui, sans-serif`;
    ctx.lineWidth = text.crit || text.heal ? 8 : 6;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.72)";
    ctx.fillStyle = text.heal ? "#7dff8a" : text.crit ? "#ffdf57" : "#fff";
    const label = text.crit ? `${t("crit_label")} ${text.value}` : String(text.value);
    ctx.strokeText(label, text.x, text.y);
    ctx.fillText(label, text.x, text.y);
  }
  ctx.restore();
}

function drawWeaponHud() {
  const slotCount = 8;
  const gap = 8;
  const margin = 24;
  const slotSize = (W - margin * 2 - gap * (slotCount - 1)) / slotCount;
  const y = H - slotSize - 28;

  ctx.save();
  ctx.fillStyle = "rgba(8, 10, 14, 0.5)";
  roundRect(margin - 12, y - 12, W - (margin - 12) * 2, slotSize + 24, 10);
  ctx.fill();

  for (let i = 0; i < slotCount; i += 1) {
    const x = margin + i * (slotSize + gap);
    drawWeaponSlot(x, y, slotSize, i);
  }

  ctx.restore();
}

function drawWeaponSlot(x, y, size, index) {
  const entry = getEquippedWeaponSlots()[index];
  const weapon = entry?.weapon;
  ctx.save();
  const colors = getWeaponTierColors(entry?.level || 0);
  ctx.fillStyle = weapon ? colors.fill : "rgba(20, 22, 29, 0.62)";
  ctx.strokeStyle = weapon ? colors.stroke : "rgba(255, 255, 255, 0.22)";
  ctx.lineWidth = 3;
  roundRect(x, y, size, size, 8);
  ctx.fill();
  ctx.stroke();

  if (weapon) {
    const iconSize = size * 0.8;
    const iconX = x + (size - iconSize) / 2;
    const iconY = y + (size - iconSize) / 2;
    drawImageContain(images[weapon.projectile] || images.eraser, iconX, iconY, iconSize, iconSize);
    if (entry.level > 1) {
      ctx.fillStyle = "#ffcb3f";
      ctx.font = "900 18px 'Microsoft JhengHei', system-ui, sans-serif";
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";
      ctx.fillText(`x${entry.level}`, x + size - 8, y + size - 7);
    }
    const cooldown = state.weaponCooldowns[index] || getWeaponCooldown(entry);
    const timer = state.weaponTimers[index] || 0;
    drawCooldownShade(x, y, size, timer, cooldown);
    drawCooldownText(x + size / 2, y + size - 14, timer);
  }

  ctx.restore();
}

function drawCooldownShade(x, y, size, timer, cooldown) {
  const progress = 1 - clamp(timer / cooldown, 0, 1);
  if (progress >= 1) return;

  const start = -Math.PI / 2;
  const end = start + Math.PI * 2 * progress;
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  const radius = size * 0.82;
  const innerX = x + 5;
  const innerY = y + 5;
  const innerSize = size - 10;

  ctx.save();
  roundRect(innerX, innerY, innerSize, innerSize, 7);
  ctx.clip();
  ctx.fillStyle = "rgba(0, 0, 0, 0.48)";

  if (progress <= 0.001) {
    ctx.fillRect(innerX, innerY, innerSize, innerSize);
    ctx.restore();
    return;
  }

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, end, start + Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawCooldownText(x, y, timer) {
  if (timer <= 0.05) return;
  ctx.save();
  ctx.font = "900 24px 'Microsoft JhengHei', system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 7;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.72)";
  ctx.fillStyle = "#fff";
  const text = timer.toFixed(1);
  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawImageContain(image, x, y, width, height) {
  if (!image?.width || !image?.height) {
    ctx.drawImage(image, x, y, width, height);
    return;
  }
  const scale = Math.min(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
}

function updateHud() {
  coinText.textContent = state.coins;
  menuCoinText.textContent = profile.coins;
  if (menuDiamondText) menuDiamondText.textContent = readWallet().diamonds;
  levelText.textContent = state.level.id;
  waveText.textContent = `${Math.min(state.waveIndex + 1, state.level.waves.length)}/${state.level.waves.length}`;
}

function showMainMenu(tab = activeMenuTab) {
  activeMenuTab = tab;
  state.running = false;
  document.body.classList.remove("wonder-tutorial-hidden");
  settingsBtn.classList.add("hidden");
  battleHud.classList.add("hidden");
  menuCoinLine.classList.remove("hidden");
  overlay.querySelector("h1").textContent = t("game_title");
  overlayText.textContent = getMenuTitle(tab);
  startBtn.classList.add("hidden");
  menuContent.classList.remove("hidden");
  menuTabs.classList.remove("hidden");
  profilePanel.classList.remove("hidden");
  levelGrid.classList.add("hidden");
  upgradeGrid.classList.add("hidden");
  pausePanel.classList.add("hidden");
  renderMenuTabs();
  renderMenuContent();
  overlay.classList.remove("hidden");
  updateHud();
}

function getMenuTitle(tab) {
  return t("menu_" + tab);
}

function renderMenuTabs() {
  for (const button of menuTabs.querySelectorAll("button[data-menu-tab]")) {
    button.classList.toggle("active", button.dataset.menuTab === activeMenuTab);
  }
}

function renderMenuContent() {
  menuContent.classList.toggle("equipment-mode", activeMenuTab === "equipment");
  overlay.classList.toggle("equipment-screen", activeMenuTab === "equipment");
  levelGrid.classList.toggle("hidden", activeMenuTab !== "battle");
  profilePanel.classList.toggle("hidden", activeMenuTab === "battle");
  if (activeMenuTab === "battle") {
    renderLevelGrid();
    return;
  }
  renderProfilePanel(activeMenuTab);
}

function renderLevelGrid() {
  levelGrid.innerHTML = "";
  for (const level of LEVELS) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.level = String(level.id - 1);
    button.textContent = String(level.id);
    button.className = "";
    if (level.id > highestUnlocked) button.classList.add("locked");
    if (level.id < highestUnlocked) button.classList.add("completed");
    if (level.id === highestUnlocked && level.id <= LEVELS.length) button.classList.add("challenge");
    levelGrid.append(button);
  }
}

function showFloatingMessage(text) {
  const existing = document.querySelector(".floating-message");
  if (existing) existing.remove();
  if (floatingMessageTimer) clearTimeout(floatingMessageTimer);

  const message = document.createElement("div");
  message.className = "floating-message";
  message.textContent = text;
  document.querySelector(".game-shell").append(message);
  floatingMessageTimer = setTimeout(() => {
    message.remove();
    floatingMessageTimer = null;
  }, 1500);
}

function showUpgradeChoices() {
  overlay.classList.remove("equipment-screen");
  state.running = false;
  document.body.classList.add("wonder-tutorial-hidden");
  settingsBtn.classList.add("hidden");
  battleHud.classList.add("hidden");
  menuCoinLine.classList.add("hidden");
  state.awaitingUpgrade = true;
  overlay.querySelector("h1").textContent = t("upgrade_panel_title");
  overlayText.textContent = t("upgrade_wave_complete", { wave: state.waveIndex + 1 });
  startBtn.classList.add("hidden");
  menuContent.classList.add("hidden");
  menuTabs.classList.add("hidden");
  profilePanel.classList.add("hidden");
  levelGrid.classList.add("hidden");
  upgradeGrid.classList.remove("hidden");
  pausePanel.classList.add("hidden");
  renderUpgradeChoices();
  overlay.classList.remove("hidden");
}

function renderUpgradeChoices() {
  upgradeGrid.innerHTML = "";
  for (const upgrade of pickUpgrades(3)) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.upgrade = upgrade.id;
    button.innerHTML = `<img src="${upgrade.icon}" alt="" /><span class="upgrade-copy"><strong>${t("upgrade_" + upgrade.id + "_name")}</strong><span>${t("upgrade_" + upgrade.id + "_desc")}</span></span>`;
    upgradeGrid.append(button);
  }
}

function chooseUpgrade(id) {
  const upgrade = UPGRADES.find((item) => item.id === id);
  if (!upgrade || !state.awaitingUpgrade) return;
  applyUpgrade(upgrade);
  state.awaitingUpgrade = false;
  prepareNextWave();
  upgradeGrid.classList.add("hidden");
  overlay.classList.add("hidden");
  state.running = true;
  document.body.classList.add("wonder-tutorial-hidden");
  settingsBtn.classList.remove("hidden");
  battleHud.classList.remove("hidden");
  menuCoinLine.classList.add("hidden");
  updateHud();
}

function showPauseMenu() {
  if (!state.running) return;
  overlay.classList.remove("equipment-screen");
  state.running = false;
  document.body.classList.add("wonder-tutorial-hidden");
  settingsBtn.classList.add("hidden");
  battleHud.classList.add("hidden");
  menuCoinLine.classList.add("hidden");
  overlay.querySelector("h1").textContent = t("menu_settings");
  overlayText.textContent = t("settings_pause_question");
  startBtn.classList.add("hidden");
  menuContent.classList.add("hidden");
  menuTabs.classList.add("hidden");
  profilePanel.classList.add("hidden");
  levelGrid.classList.add("hidden");
  upgradeGrid.classList.add("hidden");
  pausePanel.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function resumeBattle() {
  pausePanel.classList.add("hidden");
  overlay.classList.add("hidden");
  document.body.classList.add("wonder-tutorial-hidden");
  settingsBtn.classList.remove("hidden");
  battleHud.classList.remove("hidden");
  menuCoinLine.classList.add("hidden");
  state.running = true;
}

function leaveBattle() {
  bankRunCoins();
  pausePanel.classList.add("hidden");
  overlay.classList.add("hidden");
  battleHud.classList.add("hidden");
  showMainMenu("battle");
}

function renderProfilePanel(tab = activeMenuTab) {
  if (tab === "character") {
    profilePanel.innerHTML = `
      <div class="character-panel">
        <div class="character-card">
          <img src="assets/upgrade-character.png" alt="" />
          <div><strong>${t("hero_title", { lvl: getHeroTotalLevel() })}</strong><span>${t("hero_subtitle")}</span></div>
        </div>
        ${renderUpgradeRow("heroCoin", "assets/coin.png", t("heroCoin_title", { lvl: profile.heroCoinLevel }), getUpgradePreview("heroCoin"))}
        ${renderUpgradeRow("heroAttack", "assets/upgrade-damage.png", t("heroAttack_title", { lvl: profile.heroAttackLevel }), getUpgradePreview("heroAttack"))}
        ${renderUpgradeRow("heroCrit", "assets/upgrade-character.png", t("heroCrit_title", { lvl: profile.heroCritLevel }), getUpgradePreview("heroCrit"))}
        ${renderUpgradeRow("heroCritDamage", "assets/upgrade-size.png", t("heroCritDamage_title", { lvl: profile.heroCritDamageLevel }), getUpgradePreview("heroCritDamage"))}
        ${renderUpgradeRow("heroSpeed", "assets/upgrade-cooldown.png", t("heroSpeed_title", { lvl: profile.heroSpeedLevel }), getUpgradePreview("heroSpeed"))}
        ${renderUpgradeRow("diamondPower", "assets/upgrade-damage.png", t("diamondPower_title", { lvl: profile.diamondPowerLevel }), getUpgradePreview("diamondPower"), "diamond")}
      </div>
    `;
    return;
  }

  if (tab === "equipment") {
    profilePanel.innerHTML = `
        <div class="equipment-panel">
        <div class="section-title">${t("equip_weapons")}</div>
        <div class="equipment-slots">${renderEquipmentSlots()}</div>
        <div class="section-title">${t("equip_backpack")}</div>
        <div class="backpack-grid" data-backpack-drop="true">${renderBackpackItems()}</div>
      </div>
    `;
    return;
  }

  if (tab === "wall") {
    profilePanel.innerHTML = `
      ${renderUpgradeRow("wallHp", "assets/upgrade-wall.png", t("wallHp_title", { lvl: profile.wallHpLevel }), getUpgradePreview("wallHp"))}
      ${renderUpgradeRow("wallGuard", "assets/upgrade-repair.png", t("wallGuard_title", { lvl: profile.wallGuardLevel }), getUpgradePreview("wallGuard"))}
      ${renderUpgradeRow("wallRegen", "assets/upgrade-cooldown.png", t("wallRegen_title", { lvl: profile.wallRegenLevel }), getUpgradePreview("wallRegen"))}
    `;
    return;
  }

  profilePanel.innerHTML = `
    <div class="profile-row">
      <img class="profile-row-icon" src="assets/menu-settings.png" alt="" />
      <div><strong>${t("settings_progress")}</strong><span>${t("settings_unlocked_stages", { count: Math.min(highestUnlocked, LEVELS.length) })}</span></div>
    </div>
    <div class="profile-row setting-row">
      <img class="profile-row-icon" src="assets/menu-settings.png" alt="" style="filter: hue-rotate(140deg);" />
      <div><strong>${t("language")}</strong><span>${t("language_desc")}</span></div>
      <div class="setting-control">
        <select id="localeSelect" class="settings-select" aria-label="Language">
          <option value="en">English</option>
          <option value="zh-Hant">繁體中文</option>
        </select>
      </div>
    </div>
    <div class="profile-row full"><div><strong>${t("game_title")}</strong><span>WeightPlay</span></div></div>
    <div class="settings-actions">
      <button id="backToLobbyBtn" type="button">${t("back_lobby")}</button>
    </div>
  `;

  const select = profilePanel.querySelector("#localeSelect");
  if (select) {
    select.value = locale();
    select.addEventListener("change", () => {
      window.WonderSound?.play("click");
      window.WonderI18n?.setLocale(select.value);
    });
    select.addEventListener("input", () => {
      window.WonderSound?.play("click");
      window.WonderI18n?.setLocale(select.value);
    });
  }
  const backToLobbyBtn = profilePanel.querySelector("#backToLobbyBtn");
  if (backToLobbyBtn) {
    backToLobbyBtn.addEventListener("click", () => {
      window.WonderSound?.play("click");
      window.location.href = "index.html";
    });
  }
}

function renderUpgradeRow(type, icon, title, desc, currency = "coin") {
  const cost = getProfileUpgradeCost(type);
  const canBuy = currency === "diamond" ? readWallet().diamonds >= cost : profile.coins >= cost;
  const costIcon =
    currency === "diamond"
      ? `<span class="cost-diamond" aria-hidden="true">&#9670;</span>`
      : `<img class="cost-coin" src="assets/coin.png" alt="" />`;
  return `
    <div class="profile-row">
      <img class="profile-row-icon" src="${icon}" alt="" />
      <div><strong>${title}</strong><span>${desc}</span></div>
      <button type="button" data-profile-upgrade="${type}" ${canBuy ? "" : "disabled"}>${costIcon}<span>${cost}</span></button>
    </div>
  `;
}

function getUpgradePreview(type) {
  const current = getUpgradeDescription(type);
  const next = withNextUpgradeLevel(type, () => getUpgradeDescription(type));
  return t("upgrade_preview", { current, next });
}

function getUpgradeDescription(type) {
  if (type === "heroCoin") {
    const pct = Math.round(getHeroCoinBonus() * 100);
    return pct > 0 ? t("heroCoin_desc", { pct }) : t("upgrade_none");
  }
  if (type === "heroAttack") {
    const bonus = getHeroAttackBonus();
    return bonus > 0 ? t("heroAttack_desc", { bonus }) : t("upgrade_none");
  }
  if (type === "heroCrit") return t("heroCrit_desc", { pct: Math.round(getCritChance() * 100) });
  if (type === "heroCritDamage") return t("heroCritDamage_desc", { mul: getCritMultiplier().toFixed(2) });
  if (type === "heroSpeed") {
    const bonus = getProjectileSpeedBonus();
    return bonus > 0 ? t("heroSpeed_desc", { bonus }) : t("upgrade_none");
  }
  if (type === "diamondPower") {
    const bonus = getDiamondAttackBonus();
    return bonus > 0 ? t("diamondPower_desc", { bonus }) : t("upgrade_none");
  }
  if (type === "wallHp") return t("wallHp_desc", { val: getMaxWallHp() });
  if (type === "wallGuard") {
    const val = getWallDamageBlock();
    return val > 0 ? t("wallGuard_desc", { val }) : t("upgrade_none");
  }
  if (type === "wallRegen") return t("wallRegen_desc", { sec: getWallRegenInterval(), val: getWallRegenAmount() });
  return "";
}

function withNextUpgradeLevel(type, readValue) {
  const property = {
    heroCoin: "heroCoinLevel",
    heroAttack: "heroAttackLevel",
    heroCrit: "heroCritLevel",
    heroCritDamage: "heroCritDamageLevel",
    heroSpeed: "heroSpeedLevel",
    diamondPower: "diamondPowerLevel",
    wallHp: "wallHpLevel",
    wallGuard: "wallGuardLevel",
    wallRegen: "wallRegenLevel",
  }[type];
  if (!property) return readValue();
  const previous = profile[property];
  profile[property] = previous + 1;
  const value = readValue();
  profile[property] = previous;
  return value;
}

function renderEquipmentSlots() {
  return profile.equippedWeapons
    .map((slot, index) => {
      const weapon = getWeapon(slot?.id);
      const level = Math.max(1, Number(slot?.level) || 1);
      const content = weapon ? `<img src="${getWeaponIconSrc(weapon)}" alt="" onerror="this.onerror=null;this.src='assets/eraser.png'" />${level > 1 ? `<span class="equip-level">x${level}</span>` : ""}` : "";
      const selected = selectedWeaponInfo?.source === "equip" && selectedWeaponInfo.index === index ? "selected" : "";
      return `<button type="button" draggable="${weapon ? "true" : "false"}" class="equip-slot ${weapon ? getWeaponTierClass(level) : "empty"} ${selected}" data-equip-slot="${index}">${content}</button>`;
    })
    .join("");
}

function renderBackpackItems() {
  const items = profile.backpackItems
    .map((item, index) => {
      const weapon = getWeapon(item?.id);
      const level = Math.max(1, Number(item?.level) || 1);
      if (!weapon) return "";
      const selected = selectedWeaponInfo?.source === "bag" && selectedWeaponInfo.index === index ? "selected" : "";
      return `<button type="button" class="backpack-item ${getWeaponTierClass(level)} ${selected}" draggable="true" data-backpack-index="${index}" data-backpack-weapon="${weapon.id}"><img src="${getWeaponIconSrc(weapon)}" alt="" onerror="this.onerror=null;this.src='assets/eraser.png'" />${level > 1 ? `<span class="equip-level">x${level}</span>` : ""}</button>`;
    })
    .filter(Boolean);
  while (items.length < 20) {
    items.push(`<div class="backpack-empty" aria-hidden="true"></div>`);
  }
  return items.join("");
}

function renderSelectedWeaponInfo() {
  const item = getSelectedWeaponItem();
  if (!item) {
    return `
      <div class="weapon-info-panel">
        <div class="weapon-info-empty">${t("weapon_modal_empty")}</div>
      </div>
    `;
  }

  const weapon = getWeapon(item.id);
  const entry = { weapon, level: item.level };
  const next = item.level < 6 ? { weapon, level: item.level + 1 } : null;
  const nextText = next
    ? t("weapon_next_tier_preview", { lvl: item.level, next: next.level, dmg: getWeaponDamage(next), cd: getWeaponCooldown(next).toFixed(2), size: Math.round(getWeaponSize(next)) })
    : t("weapon_max_tier");

  return `
    <div class="weapon-info-panel">
      <div class="weapon-info-head">
        <img class="weapon-info-icon ${getWeaponTierClass(item.level)}" src="${getWeaponIconSrc(weapon)}" alt="" onerror="this.onerror=null;this.src='assets/eraser.png'" />
        <div><strong>${t("weapon_" + weapon.id)} ${item.level > 1 ? `x${item.level}` : ""}</strong><span>${t("weapon_upgrade_tip")}</span></div>
      </div>
      <div class="weapon-info-stats">
        <span>${t("weapon_stats_dmg", { val: getWeaponDamage(entry) })}</span>
        <span>${t("weapon_stats_cd", { val: getWeaponCooldown(entry).toFixed(2) })}</span>
        <span>${t("weapon_stats_spd", { val: Math.round(getWeaponSpeed(entry)) })}</span>
        <span>${t("weapon_stats_size", { val: Math.round(getWeaponSize(entry)) })}</span>
      </div>
      <div class="weapon-info-next">${nextText}</div>
    </div>
  `;
}

function getSelectedWeaponItem() {
  if (!selectedWeaponInfo) return null;
  if (selectedWeaponInfo.source === "equip") return getEquippedSlot(selectedWeaponInfo.index);
  if (selectedWeaponInfo.source === "bag") return getBackpackItem(selectedWeaponInfo.index);
  return null;
}

function selectWeaponInfo(source, index) {
  selectedWeaponInfo = { source, index };
  openWeaponModal();
  renderProfilePanel("equipment");
}

function openWeaponModal() {
  const item = getSelectedWeaponItem();
  if (!item) return;
  weaponModalContent.innerHTML = renderSelectedWeaponInfo();
  weaponModal.classList.remove("hidden");
}

function closeWeaponModal() {
  weaponModal.classList.add("hidden");
}

function buyProfileUpgrade(type) {
  const cost = getProfileUpgradeCost(type);
  const isDiamondUpgrade = type === "diamondPower";
  const wallet = readWallet();
  if ((isDiamondUpgrade && wallet.diamonds < cost) || (!isDiamondUpgrade && profile.coins < cost)) {
    window.WonderSound?.play("wrong");
    return;
  }
  if (isDiamondUpgrade) {
    wallet.diamonds -= cost;
    saveWallet(wallet);
  } else {
    profile.coins -= cost;
  }
  if (type === "heroCoin") profile.heroCoinLevel += 1;
  if (type === "heroAttack") profile.heroAttackLevel += 1;
  if (type === "heroCrit") profile.heroCritLevel += 1;
  if (type === "heroCritDamage") profile.heroCritDamageLevel += 1;
  if (type === "heroSpeed") profile.heroSpeedLevel += 1;
  if (type === "diamondPower") profile.diamondPowerLevel += 1;
  if (type === "weapon") profile.weaponLevel += 1;
  if (type === "wallHp") profile.wallHpLevel += 1;
  if (type === "wallGuard") profile.wallGuardLevel += 1;
  if (type === "wallRegen") profile.wallRegenLevel += 1;
  saveProfile();
  renderProfilePanel(activeMenuTab);
  updateHud();
  window.WonderSound?.play("upgrade");
}

function pickUpgrades(count) {
  const pool = [...UPGRADES];
  const picks = [];
  while (picks.length < count && pool.length > 0) {
    const index = Math.floor(random(0, pool.length));
    picks.push(pool.splice(index, 1)[0]);
  }
  return picks;
}

function applyUpgrade(upgrade) {
  const effect = upgrade.effect;
  if (effect.projectileDamage) state.projectileDamage += effect.projectileDamage;
  if (effect.cooldownMultiplier) {
    state.weaponCooldownMultiplier = Math.max(effect.minCooldownMultiplier, state.weaponCooldownMultiplier * effect.cooldownMultiplier);
    for (let index = 0; index < state.weaponTimers.length; index += 1) {
      state.weaponTimers[index] = Math.min(state.weaponTimers[index], getBaseWeaponCooldown() * state.weaponCooldownMultiplier);
    }
  }
  if (effect.projectileCount) {
    state.projectileCount += effect.projectileCount;
  }
  if (effect.sideShots) {
    state.sideShots += effect.sideShots;
  }
  if (effect.burstCount) {
    state.burstCount += effect.burstCount;
  }
  if (effect.projectileSizeMultiplier) {
    state.projectileSizeMultiplier = Math.min(
      effect.maxProjectileSizeMultiplier,
      state.projectileSizeMultiplier + effect.projectileSizeMultiplier,
    );
  }
  if (effect.wallHp) state.wallHp = Math.min(state.maxWallHp, state.wallHp + effect.wallHp);
  if (effect.coinMultiplier) state.coinMultiplier += effect.coinMultiplier;
  if (effect.pierceCount) state.pierceCount += effect.pierceCount;
  if (effect.splashDamage) {
    state.splashDamage = Math.min(0.85, state.splashDamage + effect.splashDamage);
    state.splashRadius = Math.max(state.splashRadius, effect.splashRadius || 0);
  }
  if (effect.killHeal) state.killHeal += effect.killHeal;
  window.WonderSound?.play("upgrade");
}

function bankRunCoins() {
  if (state.coinsBanked) return;
  profile.coins += state.coins;
  state.coinsBanked = true;
  saveProfile();
}

function getMaxWallHp() {
  return 100 + (profile.wallHpLevel - 1) * 20;
}

function getBaseWeaponDamage() {
  return profile.weaponLevel + getHeroAttackBonus();
}

function getBaseWeaponCooldownMultiplier() {
  return Math.max(0.72, 1 - (profile.weaponLevel - 1) * 0.035);
}

function getBaseWeaponCooldown() {
  return WEAPON_COOLDOWN * getBaseWeaponCooldownMultiplier();
}

function getProjectileSpeed() {
  return getWeapon("eraser").speed + getProjectileSpeedBonus();
}

function getProjectileSpeedBonus() {
  return (profile.heroSpeedLevel - 1) * 24;
}

function getHeroCoinBonus() {
  return Math.min(0.6, (profile.heroCoinLevel - 1) * 0.045);
}

function getHeroAttackBonus() {
  return profile.heroAttackLevel - 1 + getDiamondAttackBonus();
}

function getDiamondAttackBonus() {
  return Math.max(0, (profile.diamondPowerLevel - 1) * 2);
}

function getCritChance() {
  return Math.min(0.32, 0.04 + (profile.heroCritLevel - 1) * 0.018);
}

function getCritMultiplier() {
  return Math.min(2.35, 1.45 + (profile.heroCritDamageLevel - 1) * 0.055);
}

function getHeroTotalLevel() {
  return (
    profile.heroCoinLevel +
    profile.heroAttackLevel +
    profile.heroCritLevel +
    profile.heroCritDamageLevel +
    profile.heroSpeedLevel +
    profile.diamondPowerLevel -
    5
  );
}

function getWallRegenInterval() {
  return 5;
}

function getWallRegenAmount() {
  return 2 + (profile.wallRegenLevel - 1) * 3;
}

function getWallDamageBlock() {
  return (profile.wallGuardLevel - 1) * 2;
}

function getGuardedWallDamage(damage) {
  return Math.max(1, Math.ceil(damage) - getWallDamageBlock());
}

function getWeaponUpgradeCost() {
  return 35 + profile.weaponLevel * 25;
}

function getProfileUpgradeCost(type) {
  if (type === "heroCoin") return scaleCost(34, profile.heroCoinLevel, 1.28);
  if (type === "heroAttack") return scaleCost(42, profile.heroAttackLevel, 1.32);
  if (type === "heroCrit") return scaleCost(46, profile.heroCritLevel, 1.34);
  if (type === "heroCritDamage") return scaleCost(48, profile.heroCritDamageLevel, 1.35);
  if (type === "heroSpeed") return scaleCost(36, profile.heroSpeedLevel, 1.26);
  if (type === "diamondPower") return scaleCost(18, profile.diamondPowerLevel, 1.55);
  if (type === "weapon") return getWeaponUpgradeCost();
  if (type === "wallHp") return scaleCost(38, profile.wallHpLevel, 1.28);
  if (type === "wallGuard") return scaleCost(44, profile.wallGuardLevel, 1.33);
  if (type === "wallRegen") return scaleCost(36, profile.wallRegenLevel, 1.3);
  return 999999;
}

function scaleCost(base, level, growth) {
  return Math.round(base * growth ** (level - 1));
}

function getWeapon(id) {
  return WEAPONS.find((weapon) => weapon.id === id) || null;
}

function getWeaponIconSrc(weapon) {
  return weapon?.icon || "assets/eraser.png";
}

function getWeaponDamage(entry) {
  return Math.ceil(getBaseWeaponDamage() * entry.weapon.damageScale * entry.level);
}

function getBattleWeaponDamage(entry) {
  return Math.ceil(state.projectileDamage * entry.weapon.damageScale * entry.level);
}

function rollWeaponDamage(entry) {
  const crit = Math.random() < getCritChance();
  const baseDamage = getBattleWeaponDamage(entry);
  return {
    damage: Math.ceil(baseDamage * (crit ? getCritMultiplier() : 1)),
    crit,
  };
}

function getWeaponCooldown(entry) {
  return Math.max(0.45, entry.weapon.cooldown * getBaseWeaponCooldownMultiplier() * (1 - (entry.level - 1) * 0.035));
}

function getWeaponSpeed(entry) {
  return entry.weapon.speed + getProjectileSpeedBonus() + (entry.level - 1) * 18;
}

function getWeaponSize(entry) {
  return entry.weapon.size * (1 + (entry.level - 1) * 0.12);
}

function getEquippedWeaponSlots() {
  return profile.equippedWeapons.map((slot, index) => {
    const item = getEquippedSlot(index);
    if (!item) return null;
    const weapon = getWeapon(item.id);
    return weapon ? { weapon, level: item.level } : null;
  });
}

function getEquippedWeapons() {
  const weapons = profile.equippedWeapons
    .map((slot) => ({ weapon: getWeapon(slot?.id), level: Math.max(1, Number(slot?.level) || 1) }))
    .filter((entry) => entry.weapon);
  return weapons.length > 0 ? weapons : [{ weapon: getWeapon("eraser"), level: 1 }];
}

function equipBackpackItemInFirstSlot(backpackIndex) {
  const index = profile.equippedWeapons.findIndex((slot) => !slot?.id);
  equipBackpackItem(index >= 0 ? index : 0, backpackIndex);
}

function equipBackpackItem(equipIndex, backpackIndex) {
  const item = getBackpackItem(backpackIndex);
  if (!item) return;
  const current = profile.equippedWeapons[equipIndex];
  profile.equippedWeapons[equipIndex] = item;
  profile.backpackItems.splice(backpackIndex, 1);
  if (current?.id) profile.backpackItems.push(normalizeWeaponItem(current));
  saveProfile();
  renderProfilePanel("equipment");
}

function handleEquipDrop(targetIndex, payload) {
  const source = payload || (draggedEquipSlot != null ? `slot:${draggedEquipSlot}` : draggedWeaponId ? `bag:${draggedWeaponId}` : "");
  if (source.startsWith("bag:")) {
    equipBackpackItem(targetIndex, Number(source.slice(4)));
    draggedWeaponId = null;
    draggedEquipSlot = null;
    draggedBackpackIndex = null;
    return;
  }
  if (source.startsWith("slot:")) {
    moveEquippedWeapon(Number(source.slice(5)), targetIndex);
  }
  draggedWeaponId = null;
  draggedEquipSlot = null;
  draggedBackpackIndex = null;
}

function moveEquippedWeapon(fromIndex, toIndex) {
  if (fromIndex === toIndex || fromIndex == null) return;
  const from = getEquippedSlot(fromIndex);
  if (!from) return;
  const to = getEquippedSlot(toIndex);
  if (!to) {
    profile.equippedWeapons[toIndex] = from;
    profile.equippedWeapons[fromIndex] = null;
  } else {
    profile.equippedWeapons[toIndex] = from;
    profile.equippedWeapons[fromIndex] = to;
  }
  saveProfile();
  renderProfilePanel("equipment");
}

function unequipWeapon(index) {
  if (index == null || !getEquippedSlot(index)) return;
  profile.backpackItems.push(getEquippedSlot(index));
  profile.equippedWeapons[index] = null;
  saveProfile();
  renderProfilePanel("equipment");
  draggedWeaponId = null;
  draggedEquipSlot = null;
  draggedBackpackIndex = null;
}

function getEquippedSlot(index) {
  const slot = profile.equippedWeapons[index];
  return slot?.id ? { id: slot.id, level: Math.max(1, Number(slot.level) || 1) } : null;
}

function getUsedWeaponCopies(weaponId) {
  return profile.equippedWeapons.reduce((total, slot) => total + (slot?.id === weaponId ? getWeaponTierCost(slot.level) : 0), 0);
}

function handleBackpackDrop(targetIndex, payload) {
  const source = payload || (draggedBackpackIndex != null ? `bag:${draggedBackpackIndex}` : draggedEquipSlot != null ? `slot:${draggedEquipSlot}` : "");
  if (source.startsWith("slot:")) {
    unequipWeapon(Number(source.slice(5)));
    return;
  }
  if (!source.startsWith("bag:")) return;
  mergeOrSwapBackpackItems(Number(source.slice(4)), targetIndex);
  draggedWeaponId = null;
  draggedEquipSlot = null;
  draggedBackpackIndex = null;
}

function mergeOrSwapBackpackItems(fromIndex, toIndex) {
  if (fromIndex === toIndex || fromIndex == null) return;
  const from = getBackpackItem(fromIndex);
  const to = getBackpackItem(toIndex);
  if (!from || !to) return;
  if (from.id === to.id && from.level === to.level && to.level < 6) {
    profile.backpackItems[toIndex] = { id: to.id, level: to.level + 1 };
    profile.backpackItems.splice(fromIndex, 1);
  } else if (from.id !== to.id || from.level !== to.level) {
    profile.backpackItems[toIndex] = from;
    profile.backpackItems[fromIndex] = to;
  }
  saveProfile();
  renderProfilePanel("equipment");
}

function getBackpackItem(index) {
  return normalizeWeaponItem(profile.backpackItems[index]);
}

function startEquipmentPointerDrag(event) {
  if (activeMenuTab !== "equipment" || equipmentPointerDrag.active) return;
  const backpackItem = event.target.closest("[data-backpack-index]");
  const equipSlot = event.target.closest("[data-equip-slot]");
  if (!backpackItem && !equipSlot) return;

  if (equipSlot && !getEquippedSlot(Number(equipSlot.dataset.equipSlot))) return;

  const source = backpackItem ? `bag:${backpackItem.dataset.backpackIndex}` : `slot:${equipSlot.dataset.equipSlot}`;
  equipmentPointerDrag.active = true;
  equipmentPointerDrag.started = false;
  equipmentPointerDrag.pointerId = event.pointerId;
  equipmentPointerDrag.source = source;
  equipmentPointerDrag.startX = event.clientX;
  equipmentPointerDrag.startY = event.clientY;
  equipmentPointerDrag.ghost = null;
  profilePanel.setPointerCapture?.(event.pointerId);
}

function moveEquipmentPointerDrag(event) {
  if (!equipmentPointerDrag.active || event.pointerId !== equipmentPointerDrag.pointerId) return;
  const dx = event.clientX - equipmentPointerDrag.startX;
  const dy = event.clientY - equipmentPointerDrag.startY;

  if (!equipmentPointerDrag.started && Math.hypot(dx, dy) < 8) return;

  if (!equipmentPointerDrag.started) {
    equipmentPointerDrag.started = true;
    equipmentPointerDrag.ghost = createEquipmentDragGhost(equipmentPointerDrag.source, event.clientX, event.clientY);
  }

  event.preventDefault();
  moveEquipmentDragGhost(event.clientX, event.clientY);
  updateEquipmentDragTarget(event.clientX, event.clientY);
}

function finishEquipmentPointerDrag(event) {
  if (!equipmentPointerDrag.active || event.pointerId !== equipmentPointerDrag.pointerId) return;
  const source = equipmentPointerDrag.source;
  const didDrag = equipmentPointerDrag.started;

  cleanupEquipmentPointerDrag(event.pointerId);
  clearEquipmentDragTargets();

  suppressEquipmentClick = true;
  setTimeout(() => {
    suppressEquipmentClick = false;
  }, 0);

  if (!didDrag) {
    if (source.startsWith("slot:")) selectWeaponInfo("equip", Number(source.slice(5)));
    if (source.startsWith("bag:")) selectWeaponInfo("bag", Number(source.slice(4)));
    return;
  }

  const target = document.elementFromPoint(event.clientX, event.clientY);
  const slot = target?.closest?.("[data-equip-slot]");
  const backpackItem = target?.closest?.("[data-backpack-index]");
  const backpack = target?.closest?.("[data-backpack-drop]");

  if (slot) {
    handleEquipDrop(Number(slot.dataset.equipSlot), source);
    return;
  }
  if (backpackItem) {
    handleBackpackDrop(Number(backpackItem.dataset.backpackIndex), source);
    return;
  }
  if (backpack && source.startsWith("slot:")) {
    unequipWeapon(Number(source.slice(5)));
  }
}

function cancelEquipmentPointerDrag(event) {
  if (!equipmentPointerDrag.active || event.pointerId !== equipmentPointerDrag.pointerId) return;
  cleanupEquipmentPointerDrag(event.pointerId);
  clearEquipmentDragTargets();
}

function createEquipmentDragGhost(source, x, y) {
  const element = source.startsWith("bag:")
    ? profilePanel.querySelector(`[data-backpack-index="${source.slice(4)}"]`)
    : profilePanel.querySelector(`[data-equip-slot="${source.slice(5)}"]`);
  if (!element) return null;
  const ghost = element.cloneNode(true);
  ghost.classList.add("drag-ghost");
  document.body.append(ghost);
  moveEquipmentDragGhost(x, y);
  return ghost;
}

function moveEquipmentDragGhost(x, y) {
  if (!equipmentPointerDrag.ghost) return;
  equipmentPointerDrag.ghost.style.left = `${x}px`;
  equipmentPointerDrag.ghost.style.top = `${y}px`;
}

function updateEquipmentDragTarget(x, y) {
  clearEquipmentDragTargets();
  const target = document.elementFromPoint(x, y);
  const slot = target?.closest?.("[data-equip-slot]");
  const backpackItem = target?.closest?.("[data-backpack-index]");
  if (slot) slot.classList.add("drag-over");
  if (backpackItem) backpackItem.classList.add("drag-over");
}

function clearEquipmentDragTargets() {
  for (const item of profilePanel.querySelectorAll(".drag-over")) item.classList.remove("drag-over");
}

function cleanupEquipmentPointerDrag(pointerId) {
  if (equipmentPointerDrag.ghost) equipmentPointerDrag.ghost.remove();
  if (pointerId != null) profilePanel.releasePointerCapture?.(pointerId);
  equipmentPointerDrag.active = false;
  equipmentPointerDrag.started = false;
  equipmentPointerDrag.pointerId = null;
  equipmentPointerDrag.source = "";
  equipmentPointerDrag.ghost = null;
}

function getWeaponTierCost(level) {
  return 2 ** (Math.max(1, Math.min(6, Number(level) || 1)) - 1);
}

function getWeaponTierClass(level) {
  return `tier-${Math.max(1, Math.min(6, Number(level) || 1))}`;
}

function getWeaponTierColors(level) {
  const tier = Math.max(1, Math.min(6, Number(level) || 1));
  return {
    1: { fill: "rgba(105, 111, 124, 0.32)", stroke: "rgba(188, 195, 207, 0.92)" },
    2: { fill: "rgba(71, 171, 99, 0.34)", stroke: "rgba(102, 230, 137, 0.95)" },
    3: { fill: "rgba(59, 126, 218, 0.34)", stroke: "rgba(95, 170, 255, 0.95)" },
    4: { fill: "rgba(155, 91, 220, 0.36)", stroke: "rgba(205, 139, 255, 0.95)" },
    5: { fill: "rgba(234, 177, 45, 0.38)", stroke: "rgba(255, 222, 91, 0.98)" },
    6: { fill: "rgba(222, 62, 62, 0.38)", stroke: "rgba(255, 103, 103, 0.98)" },
  }[tier];
}

function loadHighestUnlocked() {
  const saved = Number(localStorage.getItem(SAVE_KEY) || 1);
  return clamp(Math.floor(saved), 1, LEVELS ? LEVELS.length + 1 : 11);
}

function saveHighestUnlocked() {
  localStorage.setItem(SAVE_KEY, String(highestUnlocked));
}

function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
    const oldHeroLevel = Math.max(1, Number(saved.heroLevel) || 1);
    const oldWallLevel = Math.max(1, Number(saved.wallLevel) || 1);
    return {
      coins: Math.max(0, Number(saved.coins) || 0),
      heroCoinLevel: Math.max(1, Number(saved.heroCoinLevel) || oldHeroLevel),
      heroAttackLevel: Math.max(1, Number(saved.heroAttackLevel) || 1),
      heroCritLevel: Math.max(1, Number(saved.heroCritLevel) || 1),
      heroCritDamageLevel: Math.max(1, Number(saved.heroCritDamageLevel) || 1),
      heroSpeedLevel: Math.max(1, Number(saved.heroSpeedLevel) || 1),
      diamondPowerLevel: Math.max(1, Number(saved.diamondPowerLevel) || 1),
      weaponLevel: Math.max(1, Number(saved.weaponLevel) || 1),
      wallHpLevel: Math.max(1, Number(saved.wallHpLevel) || oldWallLevel),
      wallGuardLevel: Math.max(1, Number(saved.wallGuardLevel) || 1),
      wallRegenLevel: Math.max(1, Number(saved.wallRegenLevel) || 1),
      weaponBag: normalizeWeaponBag(saved.weaponBag),
      equippedWeapons: normalizeEquippedWeapons(saved.equippedWeapons),
      backpackItems: normalizeBackpackItems(saved.backpackItems, saved.weaponBag, saved.equippedWeapons),
    };
  } catch {
    return createDefaultProfile();
  }
}

function saveProfile() {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function readWallet() {
  return window.WeightPlayWallet?.read?.() || { diamonds: 0 };
}

function saveWallet(wallet) {
  window.WeightPlayWallet?.save?.(wallet);
}

function createDefaultProfile() {
  return {
    coins: 0,
    heroCoinLevel: 1,
    heroAttackLevel: 1,
    heroCritLevel: 1,
    heroCritDamageLevel: 1,
    heroSpeedLevel: 1,
    diamondPowerLevel: 1,
    weaponLevel: 1,
    wallHpLevel: 1,
    wallGuardLevel: 1,
    wallRegenLevel: 1,
    weaponBag: { eraser: 1 },
    backpackItems: [],
    equippedWeapons: [{ id: "eraser", level: 1 }, null, null, null, null, null, null, null],
  };
}

function normalizeWeaponBag(bag) {
  return { eraser: Math.max(1, Number(bag?.eraser) || 1) };
}

function normalizeEquippedWeapons(equipped) {
  const slots = Array.isArray(equipped) ? equipped.slice(0, 8) : [{ id: "eraser", level: 1 }];
  while (slots.length < 8) slots.push("");
  return slots.map((slot) => {
    if (typeof slot === "string") return normalizeWeaponItem({ id: slot, level: 1 });
    if (slot?.id && getWeapon(slot.id)) return normalizeWeaponItem(slot);
    return null;
  });
}

function normalizeBackpackItems(items, oldBag, equipped) {
  if (Array.isArray(items)) {
    return items.map(normalizeWeaponItem).filter(Boolean);
  }
  const bag = normalizeWeaponBag(oldBag);
  const equippedItems = normalizeEquippedWeapons(equipped);
  const used = equippedItems.reduce((counts, item) => {
    if (!item) return counts;
    counts[item.id] = (counts[item.id] || 0) + getWeaponTierCost(item.level);
    return counts;
  }, {});
  const result = [];
  for (const [weaponId, count] of Object.entries(bag)) {
    const remaining = Math.max(0, count - (used[weaponId] || 0));
    for (let i = 0; i < remaining; i += 1) {
      result.push({ id: weaponId, level: 1 });
    }
  }
  return result;
}

function normalizeWeaponItem(item) {
  if (!item?.id || !getWeapon(item.id)) return null;
  return { id: item.id, level: Math.max(1, Math.min(6, Number(item.level) || 1)) };
}

function drawHpBar(x, y, width, height, percent, radius) {
  const value = clamp(percent, 0, 1);
  ctx.save();
  ctx.fillStyle = "rgba(18, 9, 11, 0.72)";
  roundRect(x, y, width, height, radius);
  ctx.fill();
  ctx.fillStyle = "#ff3030";
  roundRect(x + 3, y + 3, Math.max(0, (width - 6) * value), height - 6, Math.max(1, radius - 2));
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.72)";
  ctx.lineWidth = 2;
  roundRect(x, y, width, height, radius);
  ctx.stroke();
  ctx.restore();
}

function roundRect(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function startDrag(event) {
  if (!state.running) return;
  const point = canvasPoint(event);
  event.preventDefault();
  drag.active = true;
  drag.pointerId = event.pointerId;
  canvas.setPointerCapture(event.pointerId);
  moveHeroTo(point.x);
}

function moveDrag(event) {
  if (!drag.active || event.pointerId !== drag.pointerId) return;
  event.preventDefault();
  moveHeroTo(canvasPoint(event).x);
}

function stopDrag(event) {
  if (event.pointerId !== drag.pointerId) return;
  drag.active = false;
  drag.pointerId = null;
  if (canvas.hasPointerCapture(event.pointerId)) {
    canvas.releasePointerCapture(event.pointerId);
  }
}

function moveHeroTo(x) {
  state.hero.x = clamp(x, state.hero.width / 2 + 14, W - state.hero.width / 2 - 14);
}

function canvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * W,
    y: ((event.clientY - rect.top) / rect.height) * H,
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function random(min, max) {
  return min + Math.random() * (max - min);
}

// Hook up global locale change listener
window.addEventListener("wonder:locale-change", () => {
  translateStaticUI();
  if (!overlay.classList.contains("hidden")) {
    if (state.awaitingUpgrade) {
      overlay.querySelector("h1").textContent = t("upgrade_panel_title");
      overlayText.textContent = t("upgrade_wave_complete", { wave: state.waveIndex + 1 });
      renderUpgradeChoices();
    } else if (state.gameOver) {
      overlay.querySelector("h1").textContent = t("defeat_title");
      overlayText.textContent = t("defeat_desc", { lvl: state.level.id, coins: state.coins });
      startBtn.textContent = t("btn_play_again");
    } else if (state.won) {
      // In case we are on win screen, winLevel updates innerHTML of profilePanel
      overlay.querySelector("h1").textContent = state.level.id === highestUnlocked ? t("victory_challenge_success") : t("victory_stage_clear");
      // To prevent complex drops state replication, we can keep the text updated
      overlayText.textContent = t("victory_stage_clear") + ` ` + t("hud_stage") + ` ${state.level.id}`;
    } else {
    overlay.querySelector("h1").textContent = t("game_title");
      overlayText.textContent = getMenuTitle(activeMenuTab);
      renderMenuContent();
    }
  }
});

// Initialize translations
translateStaticUI();

preload().catch((error) => {
  overlay.querySelector("h1").textContent = t("load_fail");
  overlayText.textContent = t("load_fail_desc");
  console.error(error);
});
