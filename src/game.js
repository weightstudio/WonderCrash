const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const battleHud = document.querySelector("#battleHud");
const coinText = document.querySelector("#coinText");
const menuCoinLine = document.querySelector("#menuCoinLine");
const menuCoinText = document.querySelector("#menuCoinText");
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
let highestUnlocked = loadHighestUnlocked();
let profile = loadProfile();
let activeMenuTab = "battle";
let draggedWeaponId = null;
let draggedEquipSlot = null;
let draggedBackpackIndex = null;

const drag = {
  active: false,
  pointerId: null,
};

let state = makeState(0);
let lastTime = performance.now();
let loaded = false;

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
    fireTimer: getBaseWeaponCooldown(),
    fireCooldown: getBaseWeaponCooldown(),
    weaponCooldownMultiplier: 1,
    projectileDamage: getBaseWeaponDamage(),
    projectileCount: 1,
    projectileSizeMultiplier: 1,
    coinMultiplier: 1,
    hero: {
      x: W / 2,
      y: heroY,
      width: 138,
      height: 138,
    },
    enemies: [],
    projectiles: [],
    hits: [],
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
  const entries = Object.entries(imageSources);
  const loadedImages = await Promise.all(entries.map(([, src]) => loadImage(src)));
  entries.forEach(([key], index) => {
    images[key] = loadedImages[index];
  });
  enemyImages = await Promise.all(enemyFiles.map(loadImage));
  loaded = true;
  showMainMenu("battle");
  requestAnimationFrame(loop);
}

function restart() {
  startLevel(state.levelIndex);
}

function startLevel(levelIndex) {
  if (levelIndex + 1 > highestUnlocked) return;
  state = makeState(levelIndex);
  state.running = true;
  settingsBtn.classList.remove("hidden");
  battleHud.classList.remove("hidden");
  menuCoinLine.classList.add("hidden");
  menuTabs.classList.add("hidden");
  overlay.classList.add("hidden");
  updateHud();
}

window.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !state.running) restart();
});

startBtn.addEventListener("click", () => {
  if (state.won && state.levelIndex + 1 < LEVELS.length) {
    startLevel(state.levelIndex + 1);
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
  const button = event.target.closest("button[data-profile-upgrade]");
  if (!button) return;
  buyProfileUpgrade(button.dataset.profileUpgrade);
});
profilePanel.addEventListener("click", (event) => {
  const item = event.target.closest("[data-backpack-weapon]");
  if (!item) return;
  equipBackpackItemInFirstSlot(Number(item.dataset.backpackIndex));
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
settingsBtn.addEventListener("click", showPauseMenu);
resumeBtn.addEventListener("click", resumeBattle);
leaveBtn.addEventListener("click", leaveBattle);
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

  state.fireTimer -= dt;
  if (state.fireTimer <= 0) {
    shoot();
    state.fireCooldown = getBaseWeaponCooldown() * state.weaponCooldownMultiplier;
    state.fireTimer = state.fireCooldown;
  }

  updateWaves(dt);

  for (const projectile of state.projectiles) {
    projectile.y -= projectile.speed * dt;
    projectile.rotation += projectile.spin * dt;
  }

  for (const enemy of state.enemies) {
    updateEnemyAbility(enemy, dt);
    enemy.y += enemy.speed * enemy.dashBoost * dt;
    enemy.wobble += dt * enemy.wobbleSpeed;
  }

  resolveHits();
  damageWall();

  state.projectiles = state.projectiles.filter((projectile) => projectile.y > -100);
  state.enemies = state.enemies.filter((enemy) => enemy.hp > 0 && enemy.y < H + 140);
  state.hits = state.hits.filter((hit) => {
    hit.life -= dt;
    return hit.life > 0;
  });

  if (state.wallHp <= 0) loseLevel();

  updateHud();
}

function shoot() {
  const spread = 42;
  const weapons = getEquippedWeapons();
  const projectileCount = weapons.length + state.projectileCount - 1;
  for (let i = 0; i < projectileCount; i += 1) {
    const entry = weapons[i % weapons.length] || { weapon: getWeapon("eraser"), level: 1 };
    const weapon = entry.weapon;
    const offset = (i - (projectileCount - 1) / 2) * spread;
    state.projectiles.push({
      x: state.hero.x + offset,
      y: state.hero.y - 72,
      size: weapon.size * state.projectileSizeMultiplier * (1 + (entry.level - 1) * 0.12),
      speed: weapon.speed + getProjectileSpeedBonus(),
      damage: Math.ceil(state.projectileDamage * weapon.damageScale * entry.level),
      rotation: 0,
      spin: 9,
      image: images[weapon.projectile] || images.eraser,
    });
  }
}

function updateWaves(dt) {
  if (state.waveIndex >= state.level.waves.length) {
    if (state.enemies.length === 0) winLevel();
    return;
  }

  const wave = state.level.waves[state.waveIndex];
  if (state.waveSpawnRemaining > 0) {
    state.spawnTimer -= dt;
    if (state.spawnTimer <= 0) {
      spawnEnemy(wave);
      state.waveSpawnRemaining -= 1;
      state.spawnTimer = wave.spawnInterval;
    }
    return;
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
  if (state.waveIndex > 0 && state.waveIndex % getFocusHealInterval() === 0) {
    state.wallHp = Math.min(state.maxWallHp, state.wallHp + 15 + profile.heroFocusLevel * 3);
  }
  state.waveSpawnRemaining = state.level.waves[state.waveIndex].count;
  state.spawnTimer = 0.65;
  state.waveBreakTimer = 1.1;
}

function spawnEnemy(wave) {
  const typeIndex = Math.floor(random(0, Math.min(wave.maxEnemyType + 1, ENEMY_TYPES.length)));
  const type = ENEMY_TYPES[typeIndex];
  const image = enemyImages[type.imageIndex];
  const size = random(wave.sizeMin, wave.sizeMax) * type.sizeScale;
  const hp = Math.max(1, Math.ceil(wave.hp * type.hpScale));
  state.enemies.push({
    type,
    image,
    x: random(size / 2 + 20, W - size / 2 - 20),
    y: -size,
    baseX: 0,
    size,
    hp,
    maxHp: hp,
    speed: random(wave.speedMin, wave.speedMax) * type.speedScale,
    damage: Math.max(1, Math.ceil(wave.damage * type.damageScale)),
    coinReward: Math.max(1, Math.ceil(wave.coinReward * type.coinScale)),
    armorUsed: false,
    dashTimer: random(0.8, 1.8),
    dashBoost: 1,
    wobble: random(0, Math.PI * 2),
    wobbleSpeed: random(2, 4) * (type.ability === "zigzag" ? 1.8 : 1),
  });
  state.enemies[state.enemies.length - 1].baseX = state.enemies[state.enemies.length - 1].x;
}

function updateEnemyAbility(enemy, dt) {
  enemy.dashBoost = 1;

  if (enemy.type.ability === "zigzag") {
    enemy.x = clamp(enemy.baseX + Math.sin(enemy.wobble) * 42, enemy.size / 2 + 14, W - enemy.size / 2 - 14);
  }

  if (enemy.type.ability === "dash") {
    enemy.dashTimer -= dt;
    if (enemy.dashTimer <= 0) {
      enemy.dashBoost = 2.6;
      enemy.dashTimer = random(1.2, 2.2);
      state.hits.push({ x: enemy.x, y: enemy.y, radius: 20, life: 0.14 });
    }
  }
}

function loseLevel() {
  overlay.classList.remove("equipment-screen");
  bankRunCoins();
  state.running = false;
  state.gameOver = true;
  settingsBtn.classList.add("hidden");
  battleHud.classList.add("hidden");
  menuCoinLine.classList.add("hidden");
  overlay.querySelector("h1").textContent = "\u57ce\u7246\u7206\u4e86";
  overlayText.textContent = `\u95dc\u5361 ${state.level.id}  \u672c\u5834\u91d1\u5e63 ${state.coins}`;
  startBtn.textContent = "\u518d\u73a9\u4e00\u6b21";
  startBtn.classList.remove("hidden");
  levelGrid.classList.add("hidden");
  upgradeGrid.classList.add("hidden");
  profilePanel.classList.add("hidden");
  pausePanel.classList.add("hidden");
  menuContent.classList.add("hidden");
  menuTabs.classList.add("hidden");
  overlay.classList.remove("hidden");
  updateHud();
}

function winLevel() {
  overlay.classList.remove("equipment-screen");
  bankRunCoins();
  state.running = false;
  state.won = true;
  settingsBtn.classList.add("hidden");
  battleHud.classList.add("hidden");
  menuCoinLine.classList.remove("hidden");
  state.score += state.wallHp;
  highestUnlocked = Math.max(highestUnlocked, Math.min(LEVELS.length + 1, state.levelIndex + 2));
  saveHighestUnlocked();
  overlay.querySelector("h1").textContent = "\u904e\u95dc";
  overlayText.textContent = `\u95dc\u5361 ${state.level.id}  \u5b8c\u6210\uff01  \u672c\u5834\u91d1\u5e63 ${state.coins}`;
  startBtn.textContent = state.levelIndex + 1 >= LEVELS.length ? "\u9078\u64c7\u95dc\u5361" : "\u4e0b\u4e00\u95dc";
  startBtn.classList.toggle("hidden", state.levelIndex + 1 >= LEVELS.length);
  menuContent.classList.remove("hidden");
  menuTabs.classList.remove("hidden");
  activeMenuTab = "battle";
  renderMenuTabs();
  levelGrid.classList.remove("hidden");
  upgradeGrid.classList.add("hidden");
  profilePanel.classList.add("hidden");
  pausePanel.classList.add("hidden");
  renderLevelGrid();
  overlay.classList.remove("hidden");
  updateHud();
}

function resolveHits() {
  for (const projectile of state.projectiles) {
    if (projectile.used) continue;
    for (const enemy of state.enemies) {
      if (enemy.hp <= 0) continue;
      const dx = projectile.x - enemy.x;
      const dy = projectile.y - enemy.y;
      const reach = projectile.size * 0.38 + enemy.size * 0.38;
      if (dx * dx + dy * dy <= reach * reach) {
        projectile.used = true;
        const damage = getDamageToEnemy(enemy, projectile.damage);
        enemy.hp -= damage;
        state.hits.push({ x: enemy.x, y: enemy.y, radius: 18, life: 0.18 });
        if (enemy.hp <= 0) {
          state.score += 10;
          state.coins += Math.ceil(enemy.coinReward * state.coinMultiplier * (1 + getHeroCoinBonus()));
        }
        break;
      }
    }
  }
  state.projectiles = state.projectiles.filter((projectile) => !projectile.used);
}

function getDamageToEnemy(enemy, damage) {
  if (enemy.type.ability === "armor" && !enemy.armorUsed) {
    enemy.armorUsed = true;
    return Math.max(1, Math.ceil(damage * 0.45));
  }
  return damage;
}

function damageWall() {
  for (const enemy of state.enemies) {
    if (enemy.y + enemy.size * 0.38 >= wallY && !enemy.hitWall) {
      enemy.hitWall = true;
      enemy.hp = 0;
      state.wallHp = Math.max(0, state.wallHp - Math.ceil(enemy.damage * (1 - getWallDamageReduction())));
      state.hits.push({ x: enemy.x, y: wallY, radius: enemy.type.ability === "breaker" ? 54 : 36, life: 0.28 });
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
  drawHero();
  drawHits();
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

    const hpWidth = enemy.size * 0.72;
    drawHpBar(x - hpWidth / 2, enemy.y + enemy.size * 0.48, hpWidth, 10, enemy.hp / enemy.maxHp, 3);
    if (enemy.type.ability === "armor" && !enemy.armorUsed) {
      ctx.strokeStyle = "rgba(160, 220, 255, 0.9)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(x, enemy.y, enemy.size * 0.43, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

function drawProjectiles() {
  for (const projectile of state.projectiles) {
    ctx.save();
    ctx.translate(projectile.x, projectile.y);
    ctx.rotate(projectile.rotation);
    ctx.drawImage(
      projectile.image || images.eraser,
      -projectile.size / 2,
      -projectile.size / 2,
      projectile.size,
      projectile.size,
    );
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
  const entry = getEquippedWeapons()[index];
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
    const iconSize = size * 0.66;
    const iconX = x + (size - iconSize) / 2;
    const iconY = y + (size - iconSize) / 2;
    ctx.drawImage(images[weapon.projectile] || images.eraser, iconX, iconY, iconSize, iconSize);
    if (entry.level > 1) {
      ctx.fillStyle = "#ffcb3f";
      ctx.font = "900 18px 'Microsoft JhengHei', system-ui, sans-serif";
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";
      ctx.fillText(`x${entry.level}`, x + size - 8, y + size - 7);
    }
    if (index === 0) {
      drawCooldownShade(x, y, size);
      drawCooldownText(x + size / 2, y + size - 14);
    }
  }

  ctx.restore();
}

function drawCooldownShade(x, y, size) {
  const progress = 1 - clamp(state.fireTimer / state.fireCooldown, 0, 1);
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

function drawCooldownText(x, y) {
  if (state.fireTimer <= 0.05) return;
  ctx.save();
  ctx.font = "900 24px 'Microsoft JhengHei', system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 7;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.72)";
  ctx.fillStyle = "#fff";
  const text = state.fireTimer.toFixed(1);
  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
  ctx.restore();
}

function updateHud() {
  coinText.textContent = state.coins;
  menuCoinText.textContent = profile.coins;
  levelText.textContent = state.level.id;
  waveText.textContent = `${Math.min(state.waveIndex + 1, state.level.waves.length)}/${state.level.waves.length}`;
}

function showMainMenu(tab = activeMenuTab) {
  activeMenuTab = tab;
  state.running = false;
  settingsBtn.classList.add("hidden");
  battleHud.classList.add("hidden");
  menuCoinLine.classList.remove("hidden");
  overlay.querySelector("h1").textContent = "Wonder Crash";
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
  const titles = {
    character: "\u89d2\u8272\u72c0\u614b",
    equipment: "\u88dd\u5099\u5f37\u5316",
    battle: "\u9078\u64c7\u95dc\u5361",
    wall: "\u57ce\u7246\u5f37\u5316",
    settings: "\u8a2d\u5b9a",
  };
  return titles[tab] || titles.battle;
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
    button.textContent = level.id <= highestUnlocked ? String(level.id) : "\u9396";
    button.disabled = level.id > highestUnlocked;
    button.className = "";
    if (level.id < highestUnlocked) button.classList.add("completed");
    if (level.id === highestUnlocked && level.id <= LEVELS.length) button.classList.add("challenge");
    levelGrid.append(button);
  }
}

function showUpgradeChoices() {
  overlay.classList.remove("equipment-screen");
  state.running = false;
  settingsBtn.classList.add("hidden");
  battleHud.classList.add("hidden");
  menuCoinLine.classList.add("hidden");
  state.awaitingUpgrade = true;
  overlay.querySelector("h1").textContent = "\u9078\u64c7\u5f37\u5316";
  overlayText.textContent = `Wave ${state.waveIndex + 1} \u5b8c\u6210`;
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
    button.innerHTML = `<img src="${upgrade.icon}" alt="" /><span class="upgrade-copy"><strong>${upgrade.name}</strong><span>${upgrade.desc}</span></span>`;
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
  settingsBtn.classList.remove("hidden");
  battleHud.classList.remove("hidden");
  menuCoinLine.classList.add("hidden");
  updateHud();
}

function showPauseMenu() {
  if (!state.running) return;
  overlay.classList.remove("equipment-screen");
  state.running = false;
  settingsBtn.classList.add("hidden");
  battleHud.classList.add("hidden");
  menuCoinLine.classList.add("hidden");
  overlay.querySelector("h1").textContent = "\u8a2d\u5b9a";
  overlayText.textContent = "\u8981\u7e7c\u7e8c\u6216\u96e2\u958b\u6218\u9b25\uff1f";
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
          <div><strong>\u5c0f\u52c7\u8005 Lv ${getHeroTotalLevel()}</strong><span>\u5f37\u5316\u89d2\u8272\u80fd\u529b\uff0c\u8b93\u6bcf\u4e00\u5834\u66f4\u7a69\u3001\u66f4\u6709\u6536\u7a6b\u3002</span></div>
        </div>
        ${renderUpgradeRow("heroCoin", "assets/coin.png", "\u96f6\u7528\u9322\u904b", `\u91d1\u5e63\u7372\u5f97 +${Math.round(getHeroCoinBonus() * 100)}%`)}
        ${renderUpgradeRow("heroSpeed", "assets/upgrade-cooldown.png", "\u5feb\u901f\u624b\u611f", `\u6b66\u5668\u98db\u884c\u901f\u5ea6 ${getProjectileSpeed()}`)}
        ${renderUpgradeRow("heroFocus", "assets/upgrade-character.png", "\u51b7\u975c\u5224\u65b7", `\u6bcf ${getFocusHealInterval()} \u6ce2\u984d\u5916\u4fee\u5fa9\u57ce\u7246`)}
      </div>
    `;
    return;
  }

  if (tab === "equipment") {
    profilePanel.innerHTML = `
      <div class="equipment-panel">
        <div class="section-title">\u651c\u5e36\u6b66\u5668 8</div>
        <div class="equipment-slots">${renderEquipmentSlots()}</div>
        <div class="section-title">\u80cc\u5305</div>
        <div class="backpack-grid" data-backpack-drop="true">${renderBackpackItems()}</div>
      </div>
    `;
    return;
  }

  if (tab === "wall") {
    profilePanel.innerHTML = `
      ${renderUpgradeRow("wall", "assets/upgrade-wall.png", `\u57ce\u7246 Lv ${profile.wallLevel}`, `\u6700\u5927\u8840\u91cf ${getMaxWallHp()} / \u6e1b\u50b7 ${Math.round(getWallDamageReduction() * 100)}%`)}
    `;
    return;
  }

  profilePanel.innerHTML = `
    <div class="profile-row">
      <img class="profile-row-icon" src="assets/menu-settings.png" alt="" />
      <div><strong>\u9032\u5ea6</strong><span>\u5df2\u89e3\u9396\u5230\u7b2c ${Math.min(highestUnlocked, LEVELS.length)} \u95dc</span></div>
    </div>
    <div class="profile-row full"><div><strong>Wonder Crash</strong><span>Demo build</span></div></div>
  `;
}

function renderUpgradeRow(type, icon, title, desc) {
  const cost = getProfileUpgradeCost(type);
  return `
    <div class="profile-row">
      <img class="profile-row-icon" src="${icon}" alt="" />
      <div><strong>${title}</strong><span>${desc}</span></div>
      <button type="button" data-profile-upgrade="${type}" ${profile.coins < cost ? "disabled" : ""}><img class="cost-coin" src="assets/coin.png" alt="" /><span>${cost}</span></button>
    </div>
  `;
}

function renderEquipmentSlots() {
  return profile.equippedWeapons
    .map((slot, index) => {
      const weapon = getWeapon(slot?.id);
      const level = Math.max(1, Number(slot?.level) || 1);
      const content = weapon ? `<img src="${weapon.icon}" alt="" />${level > 1 ? `<span class="equip-level">x${level}</span>` : ""}` : "";
      return `<button type="button" draggable="${weapon ? "true" : "false"}" class="equip-slot ${weapon ? getWeaponTierClass(level) : "empty"}" data-equip-slot="${index}">${content}</button>`;
    })
    .join("");
}

function renderBackpackItems() {
  const items = profile.backpackItems
    .map((item, index) => {
      const weapon = getWeapon(item?.id);
      const level = Math.max(1, Number(item?.level) || 1);
      if (!weapon) return "";
      return `<button type="button" class="backpack-item ${getWeaponTierClass(level)}" draggable="true" data-backpack-index="${index}" data-backpack-weapon="${weapon.id}"><img src="${weapon.icon}" alt="" />${level > 1 ? `<span class="equip-level">x${level}</span>` : ""}</button>`;
    })
    .filter(Boolean);
  while (items.length < 20) {
    items.push(`<div class="backpack-empty" aria-hidden="true"></div>`);
  }
  return items.join("");
}

function buyProfileUpgrade(type) {
  const cost = getProfileUpgradeCost(type);
  if (profile.coins < cost) return;
  profile.coins -= cost;
  if (type === "heroCoin") profile.heroCoinLevel += 1;
  if (type === "heroSpeed") profile.heroSpeedLevel += 1;
  if (type === "heroFocus") profile.heroFocusLevel += 1;
  if (type === "weapon") profile.weaponLevel += 1;
  if (type === "wall") profile.wallLevel += 1;
  saveProfile();
  renderProfilePanel(activeMenuTab);
  updateHud();
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
    state.fireCooldown = getBaseWeaponCooldown() * state.weaponCooldownMultiplier;
    state.fireTimer = Math.min(state.fireTimer, state.fireCooldown);
  }
  if (effect.projectileCount) {
    state.projectileCount = Math.min(effect.maxProjectileCount, state.projectileCount + effect.projectileCount);
  }
  if (effect.projectileSizeMultiplier) {
    state.projectileSizeMultiplier = Math.min(
      effect.maxProjectileSizeMultiplier,
      state.projectileSizeMultiplier + effect.projectileSizeMultiplier,
    );
  }
  if (effect.wallHp) state.wallHp = Math.min(state.maxWallHp, state.wallHp + effect.wallHp);
  if (effect.coinMultiplier) state.coinMultiplier += effect.coinMultiplier;
}

function bankRunCoins() {
  if (state.coinsBanked) return;
  profile.coins += state.coins;
  state.coinsBanked = true;
  saveProfile();
}

function getMaxWallHp() {
  return 100 + (profile.wallLevel - 1) * 18;
}

function getBaseWeaponDamage() {
  return profile.weaponLevel;
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
  return (profile.heroSpeedLevel - 1) * 34;
}

function getHeroCoinBonus() {
  return (profile.heroCoinLevel - 1) * 0.06;
}

function getHeroTotalLevel() {
  return profile.heroCoinLevel + profile.heroSpeedLevel + profile.heroFocusLevel - 2;
}

function getFocusHealInterval() {
  return Math.max(2, 5 - Math.floor((profile.heroFocusLevel - 1) / 2));
}

function getWallDamageReduction() {
  return Math.min(0.35, (profile.wallLevel - 1) * 0.025);
}

function getWeaponUpgradeCost() {
  return 35 + profile.weaponLevel * 25;
}

function getWallUpgradeCost() {
  return 30 + profile.wallLevel * 24;
}

function getProfileUpgradeCost(type) {
  if (type === "heroCoin") return 25 + profile.heroCoinLevel * 18;
  if (type === "heroSpeed") return 25 + profile.heroSpeedLevel * 18;
  if (type === "heroFocus") return 30 + profile.heroFocusLevel * 20;
  if (type === "weapon") return getWeaponUpgradeCost();
  if (type === "wall") return getWallUpgradeCost();
  return 999999;
}

function getWeapon(id) {
  return WEAPONS.find((weapon) => weapon.id === id) || null;
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
    return {
      coins: Math.max(0, Number(saved.coins) || 0),
      heroCoinLevel: Math.max(1, Number(saved.heroCoinLevel) || oldHeroLevel),
      heroSpeedLevel: Math.max(1, Number(saved.heroSpeedLevel) || 1),
      heroFocusLevel: Math.max(1, Number(saved.heroFocusLevel) || 1),
      weaponLevel: Math.max(1, Number(saved.weaponLevel) || 1),
      wallLevel: Math.max(1, Number(saved.wallLevel) || 1),
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

function createDefaultProfile() {
  return {
    coins: 0,
    heroCoinLevel: 1,
    heroSpeedLevel: 1,
    heroFocusLevel: 1,
    weaponLevel: 1,
    wallLevel: 1,
    weaponBag: { eraser: 8 },
    backpackItems: Array.from({ length: 7 }, () => ({ id: "eraser", level: 1 })),
    equippedWeapons: [{ id: "eraser", level: 1 }, null, null, null, null, null, null, null],
  };
}

function normalizeWeaponBag(bag) {
  return { eraser: Math.max(8, Number(bag?.eraser) || 8) };
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
  const hero = state.hero;
  const withinHeroX = Math.abs(point.x - hero.x) <= hero.width * 0.72;
  const withinHeroY = Math.abs(point.y - hero.y) <= hero.height * 0.9;
  if (!withinHeroX || !withinHeroY) return;

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

preload().catch((error) => {
  overlay.querySelector("h1").textContent = "\u7d20\u6750\u8b80\u53d6\u5931\u6557";
  overlay.querySelector("p").textContent = error.message;
});
