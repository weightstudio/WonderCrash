const localeSelect = document.querySelector("#localeSelect");
const languageLabel = document.querySelector("#languageLabel");
const titleText = document.querySelector("#titleText");
const levelText = document.querySelector("#levelText");
const levelFill = document.querySelector("#levelFill");
const animalImage = document.querySelector("#animalImage");
const promptText = document.querySelector("#promptText");
const clueText = document.querySelector("#clueText");
const choiceGrid = document.querySelector("#choiceGrid");
const feedbackText = document.querySelector("#feedbackText");
const resultPanel = document.querySelector("#resultPanel");
const resultTitle = document.querySelector("#resultTitle");
const resultText = document.querySelector("#resultText");
const againBtn = document.querySelector("#againBtn");
const homeText = document.querySelector("#homeText");
const loadingPanel = document.querySelector("#loadingPanel");
const loadingTitle = document.querySelector("#loadingTitle");
const loadingText = document.querySelector("#loadingText");
const loadingFill = document.querySelector("#loadingFill");

const GAME_ID = "animal-quiz";

const dictionary = {
  en: {
    title: "Animal Quiz",
    language: "Language",
    prompt: "Who is this animal?",
    choose: "Choose one",
    correct: "Correct!",
    wrong: "Try again",
    loading: "Loading",
    level: "Level {current} / {total}",
    winTitle: "Great job!",
    winText: "You finished {score} / {total} levels",
    again: "Play Again",
    lobby: "Lobby",
    lion: "Lion",
    hippo: "Hippo",
    snake: "Snake",
    rabbit: "Rabbit",
    turtle: "Turtle",
    elephant: "Elephant",
    penguin: "Penguin",
    monkey: "Monkey",
    clueLion: "I have a big mane.",
    clueHippo: "I love water and have a huge mouth.",
    clueSnake: "I slither on the ground.",
    clueRabbit: "I have long ears and hop.",
    clueTurtle: "I carry a shell on my back.",
    clueElephant: "I have a long trunk.",
    cluePenguin: "I am a bird that waddles.",
    clueMonkey: "I climb and swing.",
  },
  "zh-Hant": {
    title: "動物小博士",
    language: "語言",
    prompt: "這是什麼動物？",
    choose: "選一個答案",
    correct: "答對了！",
    wrong: "再試試看",
    loading: "載入中",
    level: "第 {current} / {total} 關",
    winTitle: "太棒了！",
    winText: "你完成了 {score} / {total} 關",
    again: "再玩一次",
    lobby: "回大廳",
    lion: "獅子",
    hippo: "河馬",
    snake: "蛇",
    rabbit: "兔子",
    turtle: "烏龜",
    elephant: "大象",
    penguin: "企鵝",
    monkey: "猴子",
    clueLion: "我有大大的鬃毛。",
    clueHippo: "我喜歡水，也有大大的嘴巴。",
    clueSnake: "我會在地上爬行。",
    clueRabbit: "我有長耳朵，會跳跳跳。",
    clueTurtle: "我背上有硬硬的殼。",
    clueElephant: "我有長長的鼻子。",
    cluePenguin: "我是會搖搖走路的鳥。",
    clueMonkey: "我會爬樹和盪來盪去。",
  },
};

const animals = [
  { id: "lion", image: "assets/lion.svg", clue: "clueLion" },
  { id: "hippo", image: "assets/hippo.svg", clue: "clueHippo" },
  { id: "snake", image: "assets/snake.svg", clue: "clueSnake" },
  { id: "rabbit", image: "assets/rabbit.svg", clue: "clueRabbit" },
  { id: "turtle", image: "assets/turtle.svg", clue: "clueTurtle" },
  { id: "elephant", image: "assets/elephant.svg", clue: "clueElephant" },
  { id: "penguin", image: "assets/penguin.svg", clue: "cluePenguin" },
  { id: "monkey", image: "assets/monkey.svg", clue: "clueMonkey" },
];

const state = {
  levelIndex: 0,
  score: 0,
  ready: false,
  answered: false,
  completed: false,
};

function locale() {
  return window.WonderI18n?.locale() || "en";
}

function t(key, params = {}) {
  const table = dictionary[locale()] || dictionary.en;
  const fallback = dictionary.en;
  return Object.entries(params).reduce((text, [name, value]) => {
    return text.replaceAll(`{${name}}`, String(value));
  }, table[key] || fallback[key] || key);
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function preloadGame() {
  let loadedCount = 0;
  await Promise.all(
    animals.map((animal) =>
      preloadImage(animal.image).then(() => {
        loadedCount += 1;
        const percent = Math.round((loadedCount / animals.length) * 100);
        loadingText.textContent = `${percent}%`;
        loadingFill.style.width = `${percent}%`;
      }),
    ),
  );
  state.ready = true;
  loadingPanel.classList.add("hidden");
  window.WonderAnalytics?.track("game_ready", { game_id: GAME_ID });
  startGame();
}

function startGame() {
  if (!state.ready) return;
  state.levelIndex = 0;
  state.score = 0;
  state.completed = false;
  resultPanel.classList.add("hidden");
  window.WonderAnalytics?.track("game_start", { game_id: GAME_ID, locale: locale() });
  renderLevel();
}

function renderStaticText() {
  document.documentElement.lang = locale();
  localeSelect.value = locale();
  languageLabel.textContent = t("language");
  titleText.textContent = t("title");
  promptText.textContent = t("prompt");
  feedbackText.textContent = t("choose");
  loadingTitle.textContent = t("loading");
  againBtn.textContent = t("again");
  homeText.textContent = t("lobby");
}

function buildChoices(answer) {
  const others = shuffle(animals.filter((animal) => animal.id !== answer.id)).slice(0, 2);
  return shuffle([answer, ...others]);
}

function renderLevel(options = {}) {
  const shouldTrack = options.track !== false;
  renderStaticText();
  const animal = animals[state.levelIndex];
  const total = animals.length;
  state.answered = false;
  levelText.textContent = t("level", { current: state.levelIndex + 1, total });
  levelFill.style.width = `${(state.levelIndex / total) * 100}%`;
  animalImage.src = animal.image;
  animalImage.alt = t(animal.id);
  clueText.textContent = t(animal.clue);
  feedbackText.textContent = t("choose");

  choiceGrid.replaceChildren(
    ...buildChoices(animal).map((choice) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = t(choice.id);
      button.addEventListener("click", () => chooseAnswer(choice.id, animal.id, button));
      return button;
    }),
  );

  if (shouldTrack) {
    window.WonderAnalytics?.track("level_start", {
      game_id: GAME_ID,
      level: state.levelIndex + 1,
      animal: animal.id,
      locale: locale(),
    });
  }
}

function chooseAnswer(choiceId, answerId, button) {
  if (state.answered) return;

  if (choiceId !== answerId) {
    window.WonderSound?.play("wrong");
    feedbackText.textContent = t("wrong");
    button.classList.add("wrong");
    setTimeout(() => button.classList.remove("wrong"), 350);
    window.WonderAnalytics?.track("level_answer", {
      game_id: GAME_ID,
      result: "wrong",
      level: state.levelIndex + 1,
      answer: answerId,
      choice: choiceId,
      locale: locale(),
    });
    return;
  }

  state.answered = true;
  state.score += 1;
  window.WonderSound?.play("success");
  feedbackText.textContent = t("correct");
  button.classList.add("correct");
  window.WonderAnalytics?.track("level_complete", {
    game_id: GAME_ID,
    level: state.levelIndex + 1,
    animal: answerId,
    locale: locale(),
  });

  setTimeout(() => {
    state.levelIndex += 1;
    if (state.levelIndex >= animals.length) {
      finishGame();
    } else {
      renderLevel();
    }
  }, 620);
}

function finishGame() {
  state.completed = true;
  levelFill.style.width = "100%";
  renderResultText();
  resultPanel.classList.remove("hidden");
  window.WonderSound?.play("win");
  window.WonderAnalytics?.track("game_complete", {
    game_id: GAME_ID,
    score: state.score,
    total_levels: animals.length,
    locale: locale(),
  });
}

function renderResultText() {
  resultTitle.textContent = t("winTitle");
  resultText.textContent = t("winText", { score: state.score, total: animals.length });
}

function applyLocaleChange() {
  window.WonderI18n?.setLocale(localeSelect.value);
  if (state.completed) {
    renderStaticText();
    renderResultText();
    return;
  }
  if (state.ready) {
    renderLevel({ track: false });
  } else {
    renderStaticText();
  }
}

localeSelect.addEventListener("change", applyLocaleChange);

localeSelect.addEventListener("input", applyLocaleChange);

window.addEventListener("wonder:locale-change", () => {
  if (state.completed) {
    renderStaticText();
    renderResultText();
    return;
  }
  if (state.ready) {
    renderLevel({ track: false });
  } else {
    renderStaticText();
  }
});

againBtn.addEventListener("click", () => {
  window.WonderSound?.play("click");
  window.WonderAnalytics?.track("game_restart", { game_id: GAME_ID, locale: locale() });
  startGame();
});

renderStaticText();
preloadGame().catch((error) => {
  console.error(error);
  loadingText.textContent = "Load failed";
});
