const foods = [
  { name: "草莓", color: "red", image: "assets/food-strawberry.svg" },
  { name: "番茄", color: "red", image: "assets/food-tomato.svg" },
  { name: "香蕉", color: "yellow", image: "assets/food-banana.svg" },
  { name: "起司", color: "yellow", image: "assets/food-cheese.svg" },
  { name: "藍莓", color: "blue", image: "assets/food-blueberry.svg" },
  { name: "牛奶", color: "blue", image: "assets/food-milk.svg" },
  { name: "青花菜", color: "green", image: "assets/food-broccoli.svg" },
  { name: "蘋果", color: "green", image: "assets/food-apple.svg" },
];

const boxes = [
  { color: "red", label: "紅色", className: "red" },
  { color: "yellow", label: "黃色", className: "yellow" },
  { color: "blue", label: "藍色", className: "blue" },
  { color: "green", label: "綠色", className: "green" },
];

const dropZone = document.querySelector("#dropZone");
const foodCard = document.querySelector("#foodCard");
const foodImage = document.querySelector("#foodImage");
const foodName = document.querySelector("#foodName");
const scoreText = document.querySelector("#scoreText");
const roundText = document.querySelector("#roundText");
const progressFill = document.querySelector("#progressFill");
const feedbackText = document.querySelector("#feedbackText");
const resultPanel = document.querySelector("#resultPanel");
const resultText = document.querySelector("#resultText");
const againBtn = document.querySelector("#againBtn");

const state = {
  deck: [],
  index: 0,
  score: 0,
  attempts: 0,
  dragging: false,
  startX: 0,
  startY: 0,
  offsetX: 0,
  offsetY: 0,
};

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function setupBoxes() {
  dropZone.replaceChildren(
    ...boxes.map((box) => {
      const element = document.createElement("button");
      element.className = `lunchbox ${box.className}`;
      element.type = "button";
      element.dataset.color = box.color;
      element.innerHTML = `<span></span><strong>${box.label}</strong>`;
      element.addEventListener("click", () => submitColor(box.color, element));
      return element;
    }),
  );
}

function startGame() {
  state.deck = shuffle(foods);
  state.index = 0;
  state.score = 0;
  state.attempts = 0;
  resultPanel.classList.add("hidden");
  scoreText.textContent = "0";
  feedbackText.textContent = "準備好了嗎？";
  window.WonderAnalytics?.track("game_start", { game_id: "color-lunchbox" });
  loadFood();
}

function loadFood() {
  const food = state.deck[state.index];
  foodImage.src = food.image;
  foodImage.alt = food.name;
  foodName.textContent = food.name;
  roundText.textContent = `${state.index + 1} / ${state.deck.length}`;
  progressFill.style.width = `${(state.index / state.deck.length) * 100}%`;
  foodCard.style.transform = "";
  foodCard.classList.remove("pop", "shake");
}

function submitColor(color, target) {
  const food = state.deck[state.index];
  state.attempts += 1;

  if (color !== food.color) {
    feedbackText.textContent = "再找找看";
    window.WonderSound?.play("wrong");
    window.WonderAnalytics?.track("game_answer", {
      game_id: "color-lunchbox",
      result: "wrong",
      food: food.name,
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

  state.score += Math.max(5, 12 - Math.min(state.attempts - state.index - 1, 5));
  scoreText.textContent = state.score;
  feedbackText.textContent = "放對了！";
  window.WonderSound?.play("success");
  window.WonderAnalytics?.track("game_answer", {
    game_id: "color-lunchbox",
    result: "correct",
    food: food.name,
    selected_color: color,
    round: state.index + 1,
  });
  target?.classList.add("hit");
  foodCard.classList.remove("pop");
  foodCard.offsetWidth;
  foodCard.classList.add("pop");

  setTimeout(() => {
    target?.classList.remove("hit");
    state.index += 1;
    if (state.index >= state.deck.length) {
      finishGame();
    } else {
      loadFood();
    }
  }, 520);
}

function finishGame() {
  progressFill.style.width = "100%";
  resultText.textContent = `你拿到 ${state.score} 分`;
  window.WonderSound?.play("win");
  window.WonderAnalytics?.track("game_complete", {
    game_id: "color-lunchbox",
    score: state.score,
    total_rounds: state.deck.length,
    attempts: state.attempts,
  });
  resultPanel.classList.remove("hidden");
}

function getPoint(event) {
  const point = event.touches?.[0] || event;
  return { x: point.clientX, y: point.clientY };
}

function setDragPosition(x, y) {
  foodCard.style.transform = `translate(${x - state.startX}px, ${y - state.startY}px)`;
}

function startDrag(event) {
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
  setDragPosition(point.x, point.y);
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
againBtn.addEventListener("click", () => {
  window.WonderSound?.play("click");
  window.WonderAnalytics?.track("game_restart", { game_id: "color-lunchbox" });
  startGame();
});

setupBoxes();
startGame();
