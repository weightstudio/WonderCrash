const localeSelect = document.querySelector("#localeSelect");
const languageLabel = document.querySelector("#languageLabel");
const titleText = document.querySelector("#titleText");
const stageSelectPanel = document.querySelector("#stageSelectPanel");
const stageSelectTitle = document.querySelector("#stageSelectTitle");
const stageGrid = document.querySelector("#stageGrid");
const levelLine = document.querySelector(".level-line");
const levelText = document.querySelector("#levelText");
const levelFill = document.querySelector("#levelFill");
const quizStage = document.querySelector(".quiz-stage");
const animalImage = document.querySelector("#animalImage");
const promptText = document.querySelector("#promptText");
const clueText = document.querySelector("#clueText");
const choiceGrid = document.querySelector("#choiceGrid");
const feedback = document.querySelector(".feedback");
const feedbackText = document.querySelector("#feedbackText");
const resultPanel = document.querySelector("#resultPanel");
const resultTitle = document.querySelector("#resultTitle");
const resultText = document.querySelector("#resultText");
const skillReport = document.querySelector("#skillReport");
const againBtn = document.querySelector("#againBtn");
const nextStageBtn = document.querySelector("#nextStageBtn");
const stageSelectBtn = document.querySelector("#stageSelectBtn");
const homeLink = document.querySelector("#homeLink");
const homeText = document.querySelector("#homeText");
const loadingPanel = document.querySelector("#loadingPanel");
const loadingTitle = document.querySelector("#loadingTitle");
const loadingText = document.querySelector("#loadingText");
const loadingFill = document.querySelector("#loadingFill");

const GAME_ID = "animal-quiz";
const UNLOCK_KEY = "animalQuizUnlockedStage";
const PROGRESS_KEY = "animalQuizProgress";

const dictionary = {
  en: {
    title: "Animal Quiz",
    language: "Language",
    chooseStage: "Choose Stage",
    start: "Start",
    locked: "Locked",
    complete: "Complete",
    prompt: "Who is this animal?",
    choose: "Choose one",
    correct: "Correct!",
    wrong: "Try again",
    loading: "Loading",
    question: "{stage}  {current} / {total}",
    winTitle: "Stage Clear!",
    winText: "You answered {score} / {total}.",
    allClearTitle: "All Clear!",
    allClearText: "You cleared all {count} animal stages.",
    again: "Play Again",
    nextStage: "Next Stage",
    stages: "Stages",
    lobby: "Lobby",
    reportTitle: "Skill Report",
    previousBest: "Previous Best",
    todayScore: "Today's Score",
    improvement: "Improvement",
    animalKnowledge: "Animal Knowledge",
    memory: "Memory",
    reading: "Reading",
    reportGreat: "Great job! Your animal recognition was strong, and you used the clues well.",
    reportGood: "Good effort! Try again to become more familiar with animal features.",
    reportTry: "Nice practice! Look slowly at the picture and clue, then try again.",
    stageAfrica: "Stage 1: African Animals",
    stageAsia: "Stage 2: Asian Animals",
    stageOceanHome: "Stage 3: Ocean & Home Animals",
    stageForest: "Stage 4: Forest Friends",
    stageFarm: "Stage 5: Farm & Night Animals",
    stageAfricaDesc: "Meet animals from grasslands, rivers, and warm habitats.",
    stageAsiaDesc: "Guess animals from forests, mountains, and nearby nature.",
    stageOceanHomeDesc: "Find animals from the sea and animals kids see often.",
    stageForestDesc: "Practice animals from forests, bamboo groves, ponds, and trees.",
    stageFarmDesc: "Review familiar farm animals and animals that move at night.",
    lion: "Lion",
    hippo: "Hippo",
    snake: "Snake",
    rabbit: "Rabbit",
    turtle: "Turtle",
    elephant: "Elephant",
    penguin: "Penguin",
    monkey: "Monkey",
    bear: "Bear",
    cat: "Cat",
    dog: "Dog",
    fox: "Fox",
    giraffe: "Giraffe",
    zebra: "Zebra",
    panda: "Panda",
    koala: "Koala",
    frog: "Frog",
    whale: "Whale",
    owl: "Owl",
    cow: "Cow",
    clueLion: "I have a big mane.",
    clueHippo: "I love water and have a huge mouth.",
    clueSnake: "I slither on the ground.",
    clueRabbit: "I have long ears and hop.",
    clueTurtle: "I carry a shell on my back.",
    clueElephant: "I have a long trunk.",
    cluePenguin: "I am a bird that waddles.",
    clueMonkey: "I climb and swing.",
    clueBear: "I am big, furry, and strong.",
    clueCat: "I say meow and have whiskers.",
    clueDog: "I bark and wag my tail.",
    clueFox: "I have orange fur and a fluffy tail.",
    clueGiraffe: "I have a very long neck.",
    clueZebra: "I have black and white stripes.",
    cluePanda: "I am black and white and love bamboo.",
    clueKoala: "I hug trees and have round ears.",
    clueFrog: "I jump and say ribbit.",
    clueWhale: "I am a huge animal in the ocean.",
    clueOwl: "I am a bird with big eyes.",
    clueCow: "I say moo and give milk.",
  },
  "zh-Hant": {
    title: "動物小博士",
    language: "語言",
    chooseStage: "選擇關卡",
    start: "開始",
    locked: "未解鎖",
    complete: "已完成",
    prompt: "這是哪一種動物？",
    choose: "選一個答案",
    correct: "答對了！",
    wrong: "再觀察一次",
    loading: "載入中",
    question: "{stage}  {current} / {total}",
    winTitle: "關卡完成！",
    winText: "答對 {score} / {total} 題。",
    allClearTitle: "全部完成！",
    allClearText: "你完成了全部 {count} 個動物關卡。",
    again: "再玩一次",
    nextStage: "下一關",
    stages: "選關",
    lobby: "大廳",
    reportTitle: "能力小報告",
    previousBest: "之前最佳",
    todayScore: "本次分數",
    improvement: "進步",
    animalKnowledge: "動物知識",
    memory: "記憶力",
    reading: "閱讀理解",
    reportGreat: "很棒！這次動物辨識很穩定，也能從線索中找到答案。",
    reportGood: "做得不錯！再玩一次可以更熟悉動物特徵。",
    reportTry: "好努力！可以慢慢看圖片和提示，再試著找答案。",
    stageAfrica: "第 1 關：非洲動物",
    stageAsia: "第 2 關：亞洲動物",
    stageOceanHome: "第 3 關：海洋與家中動物",
    stageForest: "第 4 關：森林朋友",
    stageFarm: "第 5 關：農場與夜行動物",
    stageAfricaDesc: "認識草原、河邊和溫暖棲地的動物。",
    stageAsiaDesc: "猜猜森林、山區和自然環境中的動物。",
    stageOceanHomeDesc: "找出海洋動物，以及孩子常見的動物朋友。",
    stageForestDesc: "練習森林、竹林、池塘和樹上的動物。",
    stageFarmDesc: "複習熟悉的農場動物與夜晚活動的動物。",
    lion: "獅子",
    hippo: "河馬",
    snake: "蛇",
    rabbit: "兔子",
    turtle: "烏龜",
    elephant: "大象",
    penguin: "企鵝",
    monkey: "猴子",
    bear: "熊",
    cat: "貓",
    dog: "狗",
    fox: "狐狸",
    giraffe: "長頸鹿",
    zebra: "斑馬",
    panda: "熊貓",
    koala: "無尾熊",
    frog: "青蛙",
    whale: "鯨魚",
    owl: "貓頭鷹",
    cow: "乳牛",
    clueLion: "我有一圈很大的鬃毛。",
    clueHippo: "我喜歡水，嘴巴非常大。",
    clueSnake: "我會在地上滑行。",
    clueRabbit: "我有長耳朵，會跳來跳去。",
    clueTurtle: "我背上有硬硬的殼。",
    clueElephant: "我有長長的鼻子。",
    cluePenguin: "我是會搖搖擺擺走路的鳥。",
    clueMonkey: "我會爬樹，也會盪來盪去。",
    clueBear: "我很大、毛茸茸，而且很強壯。",
    clueCat: "我會喵喵叫，臉上有鬍鬚。",
    clueDog: "我會汪汪叫，也會搖尾巴。",
    clueFox: "我有橘色毛和蓬鬆尾巴。",
    clueGiraffe: "我的脖子非常長。",
    clueZebra: "我身上有黑白條紋。",
    cluePanda: "我黑白相間，喜歡吃竹子。",
    clueKoala: "我喜歡抱著樹，有圓圓的耳朵。",
    clueFrog: "我會跳，也會呱呱叫。",
    clueWhale: "我是住在海洋裡的巨大動物。",
    clueOwl: "我是有大眼睛的鳥。",
    clueCow: "我會哞哞叫，也會產牛奶。",
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
  { id: "bear", image: "assets/bear.svg", clue: "clueBear" },
  { id: "cat", image: "assets/cat.svg", clue: "clueCat" },
  { id: "dog", image: "assets/dog.svg", clue: "clueDog" },
  { id: "fox", image: "assets/fox.svg", clue: "clueFox" },
  { id: "giraffe", image: "assets/giraffe.svg", clue: "clueGiraffe" },
  { id: "zebra", image: "assets/zebra.svg", clue: "clueZebra" },
  { id: "panda", image: "assets/panda.svg", clue: "cluePanda" },
  { id: "koala", image: "assets/koala.svg", clue: "clueKoala" },
  { id: "frog", image: "assets/frog.svg", clue: "clueFrog" },
  { id: "whale", image: "assets/whale.svg", clue: "clueWhale" },
  { id: "owl", image: "assets/owl.svg", clue: "clueOwl" },
  { id: "cow", image: "assets/cow.svg", clue: "clueCow" },
];

const animalMap = new Map(animals.map((animal) => [animal.id, animal]));

const stages = [
  {
    name: "stageAfrica",
    description: "stageAfricaDesc",
    questions: ["lion", "hippo", "elephant", "giraffe", "zebra", "monkey", "snake", "turtle", "frog", "owl"],
  },
  {
    name: "stageAsia",
    description: "stageAsiaDesc",
    questions: ["panda", "elephant", "monkey", "snake", "turtle", "rabbit", "bear", "fox", "owl", "frog"],
  },
  {
    name: "stageOceanHome",
    description: "stageOceanHomeDesc",
    questions: ["whale", "penguin", "frog", "turtle", "cow", "cat", "dog", "rabbit", "owl", "fox"],
  },
  {
    name: "stageForest",
    description: "stageForestDesc",
    questions: ["bear", "fox", "owl", "frog", "rabbit", "panda", "koala", "monkey", "snake", "turtle"],
  },
  {
    name: "stageFarm",
    description: "stageFarmDesc",
    questions: ["cow", "dog", "cat", "rabbit", "owl", "fox", "frog", "turtle", "penguin", "whale"],
  },
];

const state = {
  stageIndex: 0,
  questionIndex: 0,
  score: 0,
  ready: false,
  answered: false,
  completed: false,
  unlockedStage: 0,
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

function loadUnlockedStage() {
  const saved = Number(localStorage.getItem(UNLOCK_KEY));
  state.unlockedStage = Number.isFinite(saved) ? Math.min(saved, stages.length - 1) : 0;
}

function saveUnlockedStage(value) {
  state.unlockedStage = Math.max(state.unlockedStage, Math.min(value, stages.length - 1));
  localStorage.setItem(UNLOCK_KEY, String(state.unlockedStage));
}

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress(stageKey, entry) {
  const progress = loadProgress();
  progress[stageKey] = entry;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function stars(value) {
  const count = Math.max(1, Math.min(5, value));
  return `${"★".repeat(count)}${"☆".repeat(5 - count)}`;
}

function scoreStars(score, total, offset = 0) {
  return Math.max(1, Math.min(5, Math.ceil((score / total) * 5) + offset));
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
  loadUnlockedStage();
  loadingPanel.classList.add("hidden");
  window.WonderAnalytics?.track("game_ready", { game_id: GAME_ID });
  showStageSelect();
}

function renderStaticText() {
  document.documentElement.lang = locale();
  localeSelect.value = locale();
  languageLabel.textContent = t("language");
  titleText.textContent = t("title");
  stageSelectTitle.textContent = t("chooseStage");
  promptText.textContent = t("prompt");
  feedbackText.textContent = t("choose");
  loadingTitle.textContent = t("loading");
  againBtn.textContent = t("again");
  nextStageBtn.textContent = t("nextStage");
  stageSelectBtn.textContent = t("stages");
  homeText.textContent = t("lobby");
}

function setQuizVisible(isVisible) {
  stageSelectPanel.classList.toggle("hidden", isVisible);
  levelLine.classList.toggle("hidden", !isVisible);
  quizStage.classList.toggle("hidden", !isVisible);
  choiceGrid.classList.toggle("hidden", !isVisible);
  feedback.classList.toggle("hidden", !isVisible);
}

function showStageSelect() {
  renderStaticText();
  state.completed = false;
  resultPanel.classList.add("hidden");
  setQuizVisible(false);
  renderStageCards();
}

function renderStageCards() {
  stageGrid.replaceChildren(
    ...stages.map((stage, index) => {
      const isUnlocked = index <= state.unlockedStage;
      const isComplete = index < state.unlockedStage;
      const button = document.createElement("button");
      button.type = "button";
      button.className = `stage-card ${isUnlocked ? "unlocked" : "locked"}`;
      button.disabled = !isUnlocked;
      button.innerHTML = `
        <span>${isComplete ? t("complete") : isUnlocked ? t("start") : t("locked")}</span>
        <strong>${t(stage.name)}</strong>
        <small>${t(stage.description)}</small>
      `;
      button.addEventListener("click", () => startStage(index));
      return button;
    }),
  );
}

function startStage(stageIndex) {
  if (!state.ready || stageIndex > state.unlockedStage) return;
  state.stageIndex = stageIndex;
  state.questionIndex = 0;
  state.score = 0;
  state.completed = false;
  resultPanel.classList.add("hidden");
  setQuizVisible(true);
  window.WonderAnalytics?.track("game_start", {
    game_id: GAME_ID,
    stage: stageIndex + 1,
    locale: locale(),
  });
  renderQuestion();
}

function currentStage() {
  return stages[state.stageIndex];
}

function currentAnimal() {
  return animalMap.get(currentStage().questions[state.questionIndex]);
}

function buildChoices(answer) {
  const others = shuffle(animals.filter((animal) => animal.id !== answer.id)).slice(0, 2);
  return shuffle([answer, ...others]);
}

function renderQuestion(options = {}) {
  const shouldTrack = options.track !== false;
  renderStaticText();
  const stage = currentStage();
  const animal = currentAnimal();
  const total = stage.questions.length;
  state.answered = false;
  levelText.textContent = t("question", {
    stage: t(stage.name),
    current: state.questionIndex + 1,
    total,
  });
  levelFill.style.width = `${(state.questionIndex / total) * 100}%`;
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
      stage: state.stageIndex + 1,
      question: state.questionIndex + 1,
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
      stage: state.stageIndex + 1,
      question: state.questionIndex + 1,
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
    stage: state.stageIndex + 1,
    question: state.questionIndex + 1,
    animal: answerId,
    locale: locale(),
  });

  setTimeout(() => {
    state.questionIndex += 1;
    if (state.questionIndex >= currentStage().questions.length) {
      finishStage();
    } else {
      renderQuestion();
    }
  }, 620);
}

function finishStage() {
  const isFinalStage = state.stageIndex >= stages.length - 1;
  state.completed = true;
  levelFill.style.width = "100%";
  saveUnlockedStage(state.stageIndex + 1);
  updateProgress();
  renderResultText();
  nextStageBtn.classList.toggle("hidden", isFinalStage);
  resultPanel.classList.remove("hidden");
  window.WonderSound?.play("win");
  window.WonderAnalytics?.track("game_complete", {
    game_id: GAME_ID,
    stage: state.stageIndex + 1,
    score: state.score,
    total_questions: currentStage().questions.length,
    locale: locale(),
  });
}

function renderResultText() {
  const isFinalStage = state.stageIndex >= stages.length - 1;
  resultTitle.textContent = isFinalStage ? t("allClearTitle") : t("winTitle");
  resultText.textContent = isFinalStage
    ? t("allClearText", { count: stages.length })
    : t("winText", { score: state.score, total: currentStage().questions.length });
  renderSkillReport();
}

function updateProgress() {
  const stageKey = String(state.stageIndex);
  const total = currentStage().questions.length;
  const progress = loadProgress();
  const previous = progress[stageKey] || {};
  const previousBest = Number(previous.bestScore) || 0;
  const bestScore = Math.max(previousBest, state.score);
  const improvementPercent = previousBest > 0 ? Math.round(((state.score - previousBest) / previousBest) * 100) : state.score > 0 ? 100 : 0;
  saveProgress(stageKey, {
    lastScore: state.score,
    bestScore,
    previousBest,
    playCount: (Number(previous.playCount) || 0) + 1,
    lastPlayedAt: new Date().toISOString(),
    improvementPercent,
    total,
  });
}

function renderSkillReport() {
  const stageKey = String(state.stageIndex);
  const total = currentStage().questions.length;
  const progress = loadProgress()[stageKey] || {};
  const previousBest = Number(progress.previousBest) || 0;
  const improvementPercent = Number(progress.improvementPercent) || 0;
  const ratio = state.score / total;
  const messageKey = ratio >= 0.85 ? "reportGreat" : ratio >= 0.6 ? "reportGood" : "reportTry";
  const improvementText = improvementPercent > 0 ? `+${improvementPercent}%` : "0%";
  skillReport.innerHTML = `
    <h2>${t("reportTitle")}</h2>
    <dl>
      <dt>${t("previousBest")}</dt><dd>${previousBest} / ${total}</dd>
      <dt>${t("todayScore")}</dt><dd>${state.score} / ${total}</dd>
      <dt>${t("improvement")}</dt><dd>${improvementText}</dd>
      <dt>${t("animalKnowledge")}</dt><dd class="stars">${stars(scoreStars(state.score, total))}</dd>
      <dt>${t("memory")}</dt><dd class="stars">${stars(scoreStars(state.score, total, -1))}</dd>
      <dt>${t("reading")}</dt><dd class="stars">${stars(scoreStars(state.score, total, -1))}</dd>
    </dl>
    <p>${t(messageKey)}</p>
  `;
}

function applyLocaleChange() {
  window.WonderI18n?.setLocale(localeSelect.value);
  if (!state.ready) {
    renderStaticText();
    return;
  }
  if (state.completed) {
    renderStaticText();
    renderResultText();
    return;
  }
  if (stageSelectPanel.classList.contains("hidden")) {
    renderQuestion({ track: false });
  } else {
    showStageSelect();
  }
}

localeSelect.addEventListener("change", applyLocaleChange);
localeSelect.addEventListener("input", applyLocaleChange);

window.addEventListener("wonder:locale-change", () => {
  if (!state.ready) {
    renderStaticText();
    return;
  }
  if (state.completed) {
    renderStaticText();
    renderResultText();
    return;
  }
  if (stageSelectPanel.classList.contains("hidden")) {
    renderQuestion({ track: false });
  } else {
    showStageSelect();
  }
});

againBtn.addEventListener("click", () => {
  window.WonderSound?.play("click");
  window.WonderAnalytics?.track("game_restart", {
    game_id: GAME_ID,
    stage: state.stageIndex + 1,
    locale: locale(),
  });
  startStage(state.stageIndex);
});

nextStageBtn.addEventListener("click", () => {
  window.WonderSound?.play("click");
  startStage(Math.min(state.stageIndex + 1, stages.length - 1));
});

stageSelectBtn.addEventListener("click", () => {
  window.WonderSound?.play("click");
  showStageSelect();
});

homeLink.addEventListener("click", (event) => {
  if (!stageSelectPanel.classList.contains("hidden")) return;
  event.preventDefault();
  window.WonderSound?.play("click");
  showStageSelect();
});

renderStaticText();
preloadGame().catch((error) => {
  console.error(error);
  loadingText.textContent = "Load failed";
});
