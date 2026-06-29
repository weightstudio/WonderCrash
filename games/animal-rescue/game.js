const localeSelect = document.querySelector("#localeSelect");
const languageLabel = document.querySelector("#languageLabel");
const titleText = document.querySelector("#titleText");
const hud = document.querySelector("#hud");
const stageLabel = document.querySelector("#stageLabel");
const moveLabel = document.querySelector("#moveLabel");
const fruitLabel = document.querySelector("#fruitLabel");
const stageText = document.querySelector("#stageText");
const moveText = document.querySelector("#moveText");
const fruitText = document.querySelector("#fruitText");
const stageSelect = document.querySelector("#stageSelect");
const stageSelectTitle = document.querySelector("#stageSelectTitle");
const stageGrid = document.querySelector("#stageGrid");
const playArea = document.querySelector("#playArea");
const animalAvatar = document.querySelector("#animalAvatar");
const animalName = document.querySelector("#animalName");
const hintText = document.querySelector("#hintText");
const board = document.querySelector("#board");
const undoBtn = document.querySelector("#undoBtn");
const resetBtn = document.querySelector("#resetBtn");
const resultPanel = document.querySelector("#resultPanel");
const resultTitle = document.querySelector("#resultTitle");
const resultText = document.querySelector("#resultText");
const starLine = document.querySelector("#starLine");
const nextBtn = document.querySelector("#nextBtn");
const retryBtn = document.querySelector("#retryBtn");
const trailsBtn = document.querySelector("#trailsBtn");
const lobbyLink = document.querySelector("#lobbyLink");
const loadingPanel = document.querySelector("#loadingPanel");
const loadingTitle = document.querySelector("#loadingTitle");
const loadingText = document.querySelector("#loadingText");
const loadingFill = document.querySelector("#loadingFill");

const GAME_ID = "animal-rescue";
const UNLOCK_KEY = "animalRescueUnlocked";
const BEST_KEY = "animalRescueStars";
const SIZE = 5;

const dictionary = {
  en: {
    title: "Animal Rescue Trail",
    language: "Language",
    stage: "Trail",
    moves: "Moves",
    fruit: "Fruit",
    chooseTrail: "Choose Trail",
    start: "Start",
    locked: "Locked",
    complete: "Complete",
    hint: "Tap the next tile to help the animal go home.",
    loading: "Loading",
    undo: "Undo",
    reset: "Reset",
    trailClear: "Trail Clear!",
    allClear: "All Animals Home!",
    result: "{animal} reached home with {fruit} fruit in {moves} moves.",
    next: "Next Trail",
    retry: "Play Again",
    trails: "Trails",
    lobby: "Lobby",
    lockedToast: "This trail is not unlocked yet.",
    wrongTile: "Choose a nearby tile.",
    lion: "Lion Cub",
    panda: "Panda",
    elephant: "Elephant",
    turtle: "Turtle",
    rabbit: "Rabbit",
    penguin: "Penguin",
    fox: "Fox",
    monkey: "Monkey",
    koala: "Koala",
    giraffe: "Giraffe",
    dolphin: "Dolphin",
    cow: "Cow",
    forest: "Forest Trail",
    bamboo: "Bamboo Garden",
    river: "River Bend",
    meadow: "Sunny Meadow",
    ice: "Icy Path",
    farm: "Farm Road",
  },
  "zh-Hant": {
    title: "動物回家路",
    language: "語言",
    stage: "路線",
    moves: "步數",
    fruit: "水果",
    chooseTrail: "選擇路線",
    start: "開始",
    locked: "未解鎖",
    complete: "已完成",
    hint: "點旁邊的格子，帶動物回到家。",
    loading: "載入中",
    undo: "上一步",
    reset: "重來",
    trailClear: "回家成功！",
    allClear: "動物全部回家！",
    result: "{animal} 回家了，拿到 {fruit} 個水果，共走 {moves} 步。",
    next: "下一關",
    retry: "再玩一次",
    trails: "路線",
    lobby: "回大廳",
    lockedToast: "這條路線還沒解鎖。",
    wrongTile: "請點旁邊的格子。",
    lion: "小獅子",
    panda: "熊貓",
    elephant: "小象",
    turtle: "烏龜",
    rabbit: "兔子",
    penguin: "企鵝",
    fox: "狐狸",
    monkey: "猴子",
    koala: "無尾熊",
    giraffe: "長頸鹿",
    dolphin: "海豚",
    cow: "乳牛",
    forest: "森林小路",
    bamboo: "竹林花園",
    river: "河岸彎道",
    meadow: "陽光草地",
    ice: "冰雪小徑",
    farm: "農場道路",
  },
};

const animalIcons = {
  lion: "🦁",
  panda: "🐼",
  elephant: "🐘",
  turtle: "🐢",
  rabbit: "🐰",
  penguin: "🐧",
  fox: "🦊",
  monkey: "🐵",
  koala: "🐨",
  giraffe: "🦒",
  dolphin: "🐬",
  cow: "🐮",
};

const fruitIcons = ["🍓", "🍇", "🍎", "🍌", "🥕"];

const levels = [
  { animal: "lion", biome: "forest", start: [0, 4], home: [4, 0], blocks: [[1, 3], [2, 3], [3, 1]], fruits: [[0, 2], [3, 2]], par: 8 },
  { animal: "panda", biome: "bamboo", start: [4, 4], home: [0, 0], blocks: [[1, 1], [2, 1], [3, 3]], fruits: [[4, 2], [1, 4]], par: 8 },
  { animal: "elephant", biome: "river", start: [0, 0], home: [4, 4], blocks: [[2, 0], [2, 1], [2, 3]], fruits: [[1, 2], [3, 2]], par: 8, water: [[2, 2]] },
  { animal: "turtle", biome: "meadow", start: [2, 4], home: [2, 0], blocks: [[1, 2], [2, 2], [3, 2]], fruits: [[0, 1], [4, 1]], par: 8 },
  { animal: "rabbit", biome: "meadow", start: [0, 2], home: [4, 2], blocks: [[1, 1], [1, 3], [3, 1], [3, 3]], fruits: [[2, 0], [2, 4]], par: 8 },
  { animal: "penguin", biome: "ice", start: [4, 0], home: [0, 4], blocks: [[1, 0], [1, 1], [3, 3]], fruits: [[4, 3], [2, 2]], par: 9, water: [[2, 1]] },
  { animal: "fox", biome: "forest", start: [0, 1], home: [4, 3], blocks: [[1, 2], [2, 2], [3, 0], [3, 1]], fruits: [[0, 4], [4, 1]], par: 9 },
  { animal: "monkey", biome: "bamboo", start: [2, 0], home: [2, 4], blocks: [[0, 2], [1, 2], [3, 2], [4, 2]], fruits: [[0, 0], [4, 4]], par: 10 },
  { animal: "koala", biome: "forest", start: [4, 2], home: [0, 2], blocks: [[2, 1], [2, 2], [2, 3]], fruits: [[1, 0], [3, 4]], par: 9 },
  { animal: "giraffe", biome: "meadow", start: [0, 4], home: [4, 0], blocks: [[0, 2], [2, 2], [4, 2], [3, 1]], fruits: [[1, 1], [4, 4]], par: 10 },
  { animal: "dolphin", biome: "river", start: [0, 0], home: [4, 4], blocks: [[1, 0], [1, 3], [3, 1], [3, 4]], fruits: [[0, 3], [2, 2]], par: 10, water: [[2, 1], [2, 3]] },
  { animal: "cow", biome: "farm", start: [4, 4], home: [0, 0], blocks: [[1, 2], [2, 1], [2, 3], [3, 2]], fruits: [[4, 0], [0, 4]], par: 10 },
].map((level, index) => ({ ...level, id: index + 1 }));

let unlocked = loadNumber(UNLOCK_KEY, 1);
let bestStars = loadBestStars();
let activeIndex = 0;
let state = makeState(levels[0]);

function locale() {
  return window.WonderI18n?.locale() || "en";
}

function t(key, params = {}) {
  const table = dictionary[locale()] || dictionary.en;
  return Object.entries(params).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, String(value)), table[key] || dictionary.en[key] || key);
}

function makeState(level) {
  return {
    level,
    position: [...level.start],
    path: [[...level.start]],
    fruits: new Set(level.fruits.map(keyOf)),
    collected: 0,
    moves: 0,
    complete: false,
  };
}

function keyOf(pos) {
  return `${pos[0]},${pos[1]}`;
}

function loadNumber(key, fallback) {
  try {
    return Math.max(fallback, Number(localStorage.getItem(key)) || fallback);
  } catch {
    return fallback;
  }
}

function loadBestStars() {
  try {
    return JSON.parse(localStorage.getItem(BEST_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveProgress() {
  localStorage.setItem(UNLOCK_KEY, String(unlocked));
  localStorage.setItem(BEST_KEY, JSON.stringify(bestStars));
}

function renderStaticText() {
  document.documentElement.lang = locale();
  localeSelect.value = locale();
  languageLabel.textContent = t("language");
  titleText.textContent = t("title");
  stageLabel.textContent = t("stage");
  moveLabel.textContent = t("moves");
  fruitLabel.textContent = t("fruit");
  stageSelectTitle.textContent = t("chooseTrail");
  hintText.textContent = t("hint");
  undoBtn.textContent = t("undo");
  resetBtn.textContent = t("reset");
  nextBtn.textContent = t("next");
  retryBtn.textContent = t("retry");
  trailsBtn.textContent = t("trails");
  lobbyLink.textContent = t("lobby");
  loadingTitle.textContent = t("loading");
  renderStageSelect();
  renderBoard();
  updateHud();
}

function preload() {
  let percent = 0;
  const timer = setInterval(() => {
    percent += 20;
    loadingText.textContent = `${Math.min(100, percent)}%`;
    loadingFill.style.width = `${Math.min(100, percent)}%`;
    if (percent >= 100) {
      clearInterval(timer);
      loadingPanel.classList.add("hidden");
      window.WonderAnalytics?.track("game_ready", { game_id: GAME_ID });
    }
  }, 70);
}

function renderStageSelect() {
  stageGrid.innerHTML = levels
    .map((level) => {
      const locked = level.id > unlocked;
      const stars = bestStars[level.id] || 0;
      return `
        <button class="stage-card ${locked ? "locked" : ""}" type="button" data-stage="${level.id}">
          <span class="mini-animal">${animalIcons[level.animal]}</span>
          <span>
            <strong>${level.id}. ${t(level.animal)}</strong>
            <span>${t(level.biome)} · ${locked ? t("locked") : stars ? t("complete") : t("start")}</span>
          </span>
          <span class="stage-stars">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</span>
        </button>
      `;
    })
    .join("");
}

function startLevel(index) {
  const level = levels[index];
  if (!level || level.id > unlocked) {
    showLocked();
    return;
  }
  activeIndex = index;
  state = makeState(level);
  stageSelect.classList.add("hidden");
  resultPanel.classList.add("hidden");
  playArea.classList.remove("hidden");
  hud.classList.remove("hidden");
  animalAvatar.textContent = animalIcons[level.animal];
  animalName.textContent = t(level.animal);
  renderBoard();
  updateHud();
  window.WonderSound?.play("start");
  window.WonderAnalytics?.track("game_start", { game_id: GAME_ID, stage: level.id, locale: locale() });
}

function showStageSelect() {
  playArea.classList.add("hidden");
  hud.classList.add("hidden");
  resultPanel.classList.add("hidden");
  stageSelect.classList.remove("hidden");
  renderStageSelect();
}

function showLocked() {
  window.WonderSound?.play("wrong");
  const original = stageSelectTitle.textContent;
  stageSelectTitle.textContent = t("lockedToast");
  setTimeout(() => {
    stageSelectTitle.textContent = original;
  }, 1200);
}

function renderBoard() {
  if (!board) return;
  const level = state.level;
  const blockSet = new Set(level.blocks.map(keyOf));
  const waterSet = new Set((level.water || []).map(keyOf));
  const pathSet = new Set(state.path.map(keyOf));
  const current = keyOf(state.position);
  board.innerHTML = "";
  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      const pos = [col, row];
      const key = keyOf(pos);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `tile ${tileClass(key, blockSet, waterSet, pathSet, current)}`;
      button.dataset.x = String(col);
      button.dataset.y = String(row);
      button.textContent = tileIcon(pos, key, blockSet, waterSet);
      button.setAttribute("aria-label", button.textContent || "tile");
      board.append(button);
    }
  }
}

function tileClass(key, blockSet, waterSet, pathSet, current) {
  const classes = [];
  classes.push(waterSet.has(key) ? "water" : blockSet.has(key) ? "rock blocked" : "path");
  if (key === current) classes.push("current");
  if (pathSet.has(key) && key !== current) classes.push("visited");
  if (isNeighbor(key)) classes.push("next");
  return classes.join(" ");
}

function tileIcon(pos, key, blockSet, waterSet) {
  const level = state.level;
  if (key === keyOf(state.position)) return animalIcons[level.animal];
  if (key === keyOf(level.home)) return "🏡";
  if (state.fruits.has(key)) return fruitIcons[(level.id + pos[0] + pos[1]) % fruitIcons.length];
  if (blockSet.has(key)) return "🪨";
  if (waterSet.has(key)) return "💧";
  return "";
}

function isNeighbor(key) {
  if (state.complete) return false;
  const [x, y] = key.split(",").map(Number);
  const dx = Math.abs(x - state.position[0]);
  const dy = Math.abs(y - state.position[1]);
  return dx + dy === 1;
}

function moveTo(pos) {
  if (state.complete) return;
  const level = state.level;
  const key = keyOf(pos);
  const blocks = new Set(level.blocks.map(keyOf));
  const dx = Math.abs(pos[0] - state.position[0]);
  const dy = Math.abs(pos[1] - state.position[1]);
  if (dx + dy !== 1 || blocks.has(key)) {
    window.WonderSound?.play("wrong");
    hintText.textContent = t("wrongTile");
    setTimeout(() => {
      hintText.textContent = t("hint");
    }, 900);
    return;
  }
  state.position = pos;
  state.path.push([...pos]);
  state.moves += 1;
  if (state.fruits.delete(key)) {
    state.collected += 1;
    window.WonderSound?.play("coin");
  } else {
    window.WonderSound?.play("click");
  }
  if (key === keyOf(level.home)) finishLevel();
  renderBoard();
  updateHud();
}

function undoMove() {
  if (state.complete || state.path.length <= 1) return;
  state.path.pop();
  state.position = [...state.path[state.path.length - 1]];
  state.moves = Math.max(0, state.moves - 1);
  state.fruits = new Set(state.level.fruits.map(keyOf));
  state.collected = 0;
  for (const pos of state.path) {
    const key = keyOf(pos);
    if (state.fruits.delete(key)) state.collected += 1;
  }
  window.WonderSound?.play("click");
  renderBoard();
  updateHud();
}

function resetLevel() {
  startLevel(activeIndex);
}

function finishLevel() {
  state.complete = true;
  const level = state.level;
  const stars = calculateStars();
  bestStars[level.id] = Math.max(bestStars[level.id] || 0, stars);
  unlocked = Math.max(unlocked, Math.min(levels.length, level.id + 1));
  saveProgress();
  resultTitle.textContent = level.id === levels.length ? t("allClear") : t("trailClear");
  resultText.textContent = t("result", { animal: t(level.animal), fruit: state.collected, moves: state.moves });
  starLine.textContent = "★".repeat(stars) + "☆".repeat(3 - stars);
  nextBtn.classList.toggle("hidden", level.id >= levels.length);
  resultPanel.classList.remove("hidden");
  window.WonderSound?.play("win");
  window.WonderAnalytics?.track("game_complete", {
    game_id: GAME_ID,
    stage: level.id,
    stars,
    moves: state.moves,
    fruit: state.collected,
    locale: locale(),
  });
}

function calculateStars() {
  const fruitCount = state.level.fruits.length;
  if (state.moves <= state.level.par && state.collected >= fruitCount) return 3;
  if (state.collected >= Math.max(1, fruitCount - 1)) return 2;
  return 1;
}

function updateHud() {
  const level = state.level;
  stageText.textContent = `${level.id} / ${levels.length}`;
  moveText.textContent = String(state.moves);
  fruitText.textContent = `${state.collected} / ${level.fruits.length}`;
}

localeSelect.addEventListener("change", () => {
  window.WonderI18n?.setLocale(localeSelect.value);
  renderStaticText();
});
localeSelect.addEventListener("input", () => {
  window.WonderI18n?.setLocale(localeSelect.value);
  renderStaticText();
});
window.addEventListener("wonder:locale-change", renderStaticText);
stageGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-stage]");
  if (!card) return;
  startLevel(Number(card.dataset.stage) - 1);
});
board.addEventListener("click", (event) => {
  const tile = event.target.closest(".tile");
  if (!tile) return;
  moveTo([Number(tile.dataset.x), Number(tile.dataset.y)]);
});
undoBtn.addEventListener("click", undoMove);
resetBtn.addEventListener("click", resetLevel);
nextBtn.addEventListener("click", () => startLevel(Math.min(levels.length - 1, activeIndex + 1)));
retryBtn.addEventListener("click", () => startLevel(activeIndex));
trailsBtn.addEventListener("click", showStageSelect);

renderStaticText();
showStageSelect();
preload();
