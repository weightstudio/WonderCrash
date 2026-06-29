(function () {
  const canvas = document.querySelector("#gameCanvas");
  const ctx = canvas.getContext("2d");
  const localeSelect = document.querySelector("#localeSelect");
  const languageLabel = document.querySelector("#languageLabel");
  const titleText = document.querySelector("#titleText");
  const hud = document.querySelector("#hud");
  const scoreLabel = document.querySelector("#scoreLabel");
  const timeLabel = document.querySelector("#timeLabel");
  const comboLabel = document.querySelector("#comboLabel");
  const scoreText = document.querySelector("#scoreText");
  const timeText = document.querySelector("#timeText");
  const comboText = document.querySelector("#comboText");
  const startPanel = document.querySelector("#startPanel");
  const startTitle = document.querySelector("#startTitle");
  const startText = document.querySelector("#startText");
  const startBtn = document.querySelector("#startBtn");
  const resultPanel = document.querySelector("#resultPanel");
  const resultTitle = document.querySelector("#resultTitle");
  const resultText = document.querySelector("#resultText");
  const leaderboard = document.querySelector("#leaderboard");
  const againBtn = document.querySelector("#againBtn");
  const lobbyLink = document.querySelector("#lobbyLink");
  const loadingPanel = document.querySelector("#loadingPanel");
  const loadingTitle = document.querySelector("#loadingTitle");
  const loadingText = document.querySelector("#loadingText");
  const loadingFill = document.querySelector("#loadingFill");

  const GAME_ID = "campus-dash";
  const LEADERBOARD_KEY = "campusDashLeaderboard";
  const W = canvas.width;
  const H = canvas.height;
  const lanes = [W * 0.26, W * 0.5, W * 0.74];

  const dictionary = {
    en: {
      title: "Campus Dash",
      language: "Language",
      score: "Score",
      time: "Time",
      combo: "Combo",
      startTitle: "Swipe. Dodge. Score.",
      startText: "Move left and right, collect stars, and survive 60 seconds.",
      start: "Start",
      resultTitle: "Run Complete!",
      resultText: "Score {score}  Best {best}",
      again: "Run Again",
      lobby: "Lobby",
      loading: "Loading",
      leaderboard: "Local Top 5",
      emptyRank: "No runs yet",
    },
    "zh-Hant": {
      title: "校園閃電跑",
      language: "語言",
      score: "分數",
      time: "時間",
      combo: "連擊",
      startTitle: "滑動、閃避、拿高分！",
      startText: "左右移動收集星星，閃開障礙，撐過 60 秒。",
      start: "開始",
      resultTitle: "跑完了！",
      resultText: "分數 {score}  最高 {best}",
      again: "再跑一次",
      lobby: "回大廳",
      loading: "載入中",
      leaderboard: "本機前五名",
      emptyRank: "還沒有紀錄",
    },
  };

  let state = makeState();
  let lastTime = 0;
  let pointerStartX = null;

  function locale() {
    return window.WonderI18n?.locale() || "en";
  }

  function t(key, params = {}) {
    const table = dictionary[locale()] || dictionary.en;
    return Object.entries(params).reduce((text, [name, value]) => {
      return text.replaceAll(`{${name}}`, String(value));
    }, table[key] || dictionary.en[key] || key);
  }

  function makeState() {
    return {
      running: false,
      finished: false,
      lane: 1,
      targetLane: 1,
      x: lanes[1],
      y: H - 155,
      timeLeft: 60,
      score: 0,
      combo: 1,
      speed: 390,
      spawnTimer: 0.4,
      coinTimer: 0.9,
      obstacles: [],
      coins: [],
      sparks: [],
    };
  }

  function renderStaticText() {
    document.documentElement.lang = locale();
    localeSelect.value = locale();
    languageLabel.textContent = t("language");
    titleText.textContent = t("title");
    scoreLabel.textContent = t("score");
    timeLabel.textContent = t("time");
    comboLabel.textContent = t("combo");
    startTitle.textContent = t("startTitle");
    startText.textContent = t("startText");
    startBtn.textContent = t("start");
    resultTitle.textContent = t("resultTitle");
    againBtn.textContent = t("again");
    lobbyLink.textContent = t("lobby");
    loadingTitle.textContent = t("loading");
  }

  function preloadGame() {
    let percent = 0;
    const timer = setInterval(() => {
      percent += 25;
      loadingText.textContent = `${Math.min(100, percent)}%`;
      loadingFill.style.width = `${Math.min(100, percent)}%`;
      if (percent >= 100) {
        clearInterval(timer);
        loadingPanel.classList.add("hidden");
        draw();
        window.WonderAnalytics?.track("game_ready", { game_id: GAME_ID });
      }
    }, 80);
  }

  function startRun() {
    state = makeState();
    state.running = true;
    startPanel.classList.add("hidden");
    resultPanel.classList.add("hidden");
    hud.classList.remove("hidden");
    lastTime = performance.now();
    window.WonderSound?.play("click");
    window.WonderAnalytics?.track("game_start", { game_id: GAME_ID, locale: locale() });
    requestAnimationFrame(loop);
  }

  function loop(now) {
    const dt = Math.min(0.033, (now - lastTime) / 1000 || 0);
    lastTime = now;
    update(dt);
    draw();
    if (state.running) requestAnimationFrame(loop);
  }

  function update(dt) {
    state.timeLeft = Math.max(0, state.timeLeft - dt);
    state.speed += dt * 6;
    state.x += (lanes[state.targetLane] - state.x) * Math.min(1, dt * 12);
    state.spawnTimer -= dt;
    state.coinTimer -= dt;

    if (state.spawnTimer <= 0) {
      spawnObstacle();
      state.spawnTimer = Math.max(0.38, 1.05 - (60 - state.timeLeft) * 0.009);
    }
    if (state.coinTimer <= 0) {
      spawnCoin();
      state.coinTimer = 0.9 + Math.random() * 0.45;
    }

    for (const item of [...state.obstacles, ...state.coins]) item.y += state.speed * dt;
    state.obstacles = state.obstacles.filter((item) => item.y < H + 90);
    state.coins = state.coins.filter((item) => item.y < H + 90 && !item.used);
    state.sparks = state.sparks.filter((spark) => {
      spark.life -= dt;
      spark.y -= dt * 90;
      return spark.life > 0;
    });

    checkCollisions();
    updateHud();
    if (state.timeLeft <= 0) finishRun();
  }

  function spawnObstacle() {
    const lane = Math.floor(Math.random() * 3);
    const kind = Math.random() > 0.5 ? "bag" : "cone";
    state.obstacles.push({ lane, x: lanes[lane], y: -80, size: kind === "bag" ? 72 : 82, kind });
  }

  function spawnCoin() {
    const lane = Math.floor(Math.random() * 3);
    state.coins.push({ lane, x: lanes[lane], y: -65, size: 42, used: false });
  }

  function checkCollisions() {
    const heroBox = { x: state.x - 40, y: state.y - 54, w: 80, h: 108 };
    for (const obstacle of state.obstacles) {
      if (overlaps(heroBox, { x: obstacle.x - 38, y: obstacle.y - 38, w: 76, h: 76 })) {
        obstacle.y = H + 100;
        state.score = Math.max(0, state.score - 80);
        state.combo = 1;
        addSpark(state.x, state.y - 60, "-80", "#ef4444");
        window.WonderSound?.play("wrong");
      }
    }
    for (const coin of state.coins) {
      if (!coin.used && overlaps(heroBox, { x: coin.x - 26, y: coin.y - 26, w: 52, h: 52 })) {
        coin.used = true;
        state.score += 50 * state.combo;
        state.combo = Math.min(9, state.combo + 1);
        addSpark(coin.x, coin.y, `+${50 * (state.combo - 1)}`, "#fbbf24");
        window.WonderSound?.play("success");
      }
    }
  }

  function overlaps(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function addSpark(x, y, text, color) {
    state.sparks.push({ x, y, text, color, life: 0.75 });
  }

  function moveLane(delta) {
    if (!state.running) return;
    state.targetLane = Math.max(0, Math.min(2, state.targetLane + delta));
    window.WonderSound?.play("click");
  }

  function finishRun() {
    state.running = false;
    state.finished = true;
    hud.classList.add("hidden");
    saveScore(state.score);
    const best = getScores()[0] || state.score;
    resultTitle.textContent = t("resultTitle");
    resultText.textContent = t("resultText", { score: state.score, best });
    renderLeaderboard();
    resultPanel.classList.remove("hidden");
    window.WonderSound?.play("win");
    window.WonderAnalytics?.track("game_complete", {
      game_id: GAME_ID,
      score: state.score,
      locale: locale(),
    });
  }

  function getScores() {
    try {
      return JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveScore(score) {
    const scores = [...getScores(), score].sort((a, b) => b - a).slice(0, 5);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(scores));
  }

  function renderLeaderboard() {
    const scores = getScores();
    const rows = scores.length
      ? scores.map((score, index) => `<div><span>#${index + 1}</span><strong>${score}</strong></div>`).join("")
      : `<div><span>${t("emptyRank")}</span><strong>0</strong></div>`;
    leaderboard.innerHTML = `<div><span>${t("leaderboard")}</span><strong></strong></div>${rows}`;
  }

  function updateHud() {
    scoreText.textContent = String(state.score);
    timeText.textContent = String(Math.ceil(state.timeLeft));
    comboText.textContent = `x${state.combo}`;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    drawBackground();
    drawLanes();
    for (const coin of state.coins) if (!coin.used) drawCoin(coin);
    for (const obstacle of state.obstacles) drawObstacle(obstacle);
    drawHero();
    for (const spark of state.sparks) drawSpark(spark);
  }

  function drawBackground() {
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#75d8ff");
    sky.addColorStop(0.58, "#ffe68b");
    sky.addColorStop(1, "#50b86a");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#ffffff88";
    for (const cloud of [
      [120, 110, 72],
      [565, 88, 88],
      [680, 180, 58],
    ]) {
      ctx.beginPath();
      ctx.arc(cloud[0], cloud[1], cloud[2], 0, Math.PI * 2);
      ctx.arc(cloud[0] + cloud[2] * 0.8, cloud[1] + 8, cloud[2] * 0.7, 0, Math.PI * 2);
      ctx.arc(cloud[0] - cloud[2] * 0.7, cloud[1] + 16, cloud[2] * 0.55, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(54, 214, 150, 105);
    ctx.fillRect(515, 200, 150, 120);
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.moveTo(45, 214);
    ctx.lineTo(130, 146);
    ctx.lineTo(214, 214);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(502, 200);
    ctx.lineTo(590, 132);
    ctx.lineTo(678, 200);
    ctx.fill();
  }

  function drawLanes() {
    ctx.fillStyle = "#334155";
    ctx.beginPath();
    ctx.moveTo(W * 0.23, H);
    ctx.lineTo(W * 0.39, 250);
    ctx.lineTo(W * 0.61, 250);
    ctx.lineTo(W * 0.77, H);
    ctx.fill();
    ctx.strokeStyle = "#fff7c7";
    ctx.lineWidth = 10;
    ctx.setLineDash([38, 42]);
    for (const x of [W * 0.42, W * 0.58]) {
      ctx.beginPath();
      ctx.moveTo(x, 270);
      ctx.lineTo(x + (x < W / 2 ? -80 : 80), H);
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  function drawHero() {
    ctx.save();
    ctx.translate(state.x, state.y);
    ctx.fillStyle = "#2563eb";
    roundRect(-38, -18, 76, 86, 22);
    ctx.fill();
    ctx.fillStyle = "#ffd6b0";
    ctx.beginPath();
    ctx.arc(0, -62, 42, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#273449";
    ctx.beginPath();
    ctx.arc(-10, -78, 38, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(-14, -62, 5, 0, Math.PI * 2);
    ctx.arc(16, -62, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, -47, 14, 0, Math.PI);
    ctx.stroke();
    ctx.strokeStyle = "#1d4ed8";
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.moveTo(-20, 60);
    ctx.lineTo(-36, 112);
    ctx.moveTo(20, 60);
    ctx.lineTo(40, 112);
    ctx.stroke();
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.moveTo(-52, 118);
    ctx.lineTo(-10, 118);
    ctx.moveTo(24, 118);
    ctx.lineTo(62, 118);
    ctx.stroke();
    ctx.restore();
  }

  function drawObstacle(item) {
    ctx.save();
    ctx.translate(item.x, item.y);
    if (item.kind === "cone") {
      ctx.fillStyle = "#f97316";
      ctx.beginPath();
      ctx.moveTo(0, -42);
      ctx.lineTo(42, 42);
      ctx.lineTo(-42, 42);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.fillRect(-26, 5, 52, 12);
    } else {
      ctx.fillStyle = "#a855f7";
      roundRect(-42, -34, 84, 68, 16);
      ctx.fill();
      ctx.strokeStyle = "#6b21a8";
      ctx.lineWidth = 8;
      ctx.strokeRect(-24, -48, 48, 20);
    }
    ctx.restore();
  }

  function drawCoin(item) {
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.arc(0, 0, item.size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff7c7";
    ctx.font = "bold 26px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("★", 0, 2);
    ctx.restore();
  }

  function drawSpark(spark) {
    ctx.globalAlpha = Math.max(0, spark.life / 0.75);
    ctx.fillStyle = spark.color;
    ctx.font = "bold 34px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(spark.text, spark.x, spark.y);
    ctx.globalAlpha = 1;
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
  }

  localeSelect.addEventListener("change", () => {
    window.WonderI18n?.setLocale(localeSelect.value);
    renderStaticText();
    if (state.finished) {
      resultText.textContent = t("resultText", { score: state.score, best: getScores()[0] || state.score });
      renderLeaderboard();
    }
  });
  localeSelect.addEventListener("input", () => {
    window.WonderI18n?.setLocale(localeSelect.value);
    renderStaticText();
  });
  window.addEventListener("wonder:locale-change", renderStaticText);
  startBtn.addEventListener("click", startRun);
  againBtn.addEventListener("click", startRun);
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") moveLane(-1);
    if (event.key === "ArrowRight") moveLane(1);
  });
  canvas.addEventListener("pointerdown", (event) => {
    pointerStartX = event.clientX;
  });
  canvas.addEventListener("pointerup", (event) => {
    if (pointerStartX == null) return;
    const dx = event.clientX - pointerStartX;
    if (Math.abs(dx) > 24) moveLane(dx > 0 ? 1 : -1);
    else moveLane(event.clientX < window.innerWidth / 2 ? -1 : 1);
    pointerStartX = null;
  });

  renderStaticText();
  updateHud();
  preloadGame();
})();
