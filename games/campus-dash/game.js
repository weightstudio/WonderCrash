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
    sky.addColorStop(0, "#0f172a");
    sky.addColorStop(0.34, "#1e3a5f");
    sky.addColorStop(0.62, "#26324a");
    sky.addColorStop(1, "#111827");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    const glow = ctx.createRadialGradient(W * 0.52, 178, 20, W * 0.52, 178, 340);
    glow.addColorStop(0, "rgba(250, 204, 21, 0.45)");
    glow.addColorStop(0.45, "rgba(34, 211, 238, 0.12)");
    glow.addColorStop(1, "rgba(15, 23, 42, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    drawCampusBlock(36, 142, 150, 180, "#1d4ed8", "#60a5fa");
    drawCampusBlock(506, 126, 172, 205, "#7c2d12", "#fb923c");
    drawCampusBlock(206, 188, 90, 114, "#334155", "#94a3b8");
    drawCampusBlock(418, 184, 86, 126, "#164e63", "#67e8f9");

    ctx.strokeStyle = "rgba(125, 211, 252, 0.3)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 16; i += 1) {
      const y = 60 + i * 34 + ((60 - state.timeLeft) * 10) % 34;
      ctx.beginPath();
      ctx.moveTo(i % 2 ? 0 : W, y);
      ctx.lineTo(i % 2 ? 145 : W - 145, y + 58);
      ctx.stroke();
    }

    const horizon = ctx.createLinearGradient(0, 270, 0, 390);
    horizon.addColorStop(0, "rgba(15, 23, 42, 0)");
    horizon.addColorStop(1, "rgba(15, 23, 42, 0.86)");
    ctx.fillStyle = horizon;
    ctx.fillRect(0, 260, W, 150);
  }

  function drawLanes() {
    const road = ctx.createLinearGradient(0, 280, 0, H);
    road.addColorStop(0, "#26324a");
    road.addColorStop(0.55, "#1f2937");
    road.addColorStop(1, "#111827");
    ctx.fillStyle = road;
    ctx.beginPath();
    ctx.moveTo(W * 0.14, H);
    ctx.lineTo(W * 0.38, 270);
    ctx.lineTo(W * 0.62, 270);
    ctx.lineTo(W * 0.86, H);
    ctx.fill();

    const edge = ctx.createLinearGradient(0, 300, 0, H);
    edge.addColorStop(0, "rgba(34, 211, 238, 0.35)");
    edge.addColorStop(1, "rgba(250, 204, 21, 0.8)");
    ctx.strokeStyle = edge;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(W * 0.14, H);
    ctx.lineTo(W * 0.38, 270);
    ctx.moveTo(W * 0.86, H);
    ctx.lineTo(W * 0.62, 270);
    ctx.stroke();

    ctx.strokeStyle = "rgba(248, 250, 252, 0.72)";
    ctx.lineWidth = 8;
    ctx.setLineDash([32, 38]);
    ctx.lineDashOffset = -((60 - state.timeLeft) * state.speed * 0.12);
    for (const pair of [
      [W * 0.42, W * 0.31],
      [W * 0.58, W * 0.69],
    ]) {
      ctx.beginPath();
      ctx.moveTo(pair[0], 282);
      ctx.lineTo(pair[1], H);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.lineDashOffset = 0;

    ctx.strokeStyle = "rgba(34, 211, 238, 0.16)";
    ctx.lineWidth = 2;
    for (let y = 330; y < H; y += 78) {
      const width = (y - 260) * 0.52;
      ctx.beginPath();
      ctx.moveTo(W / 2 - width, y);
      ctx.lineTo(W / 2 + width, y);
      ctx.stroke();
    }
  }

  function drawHero() {
    ctx.save();
    ctx.translate(state.x, state.y);
    ctx.shadowBlur = 24;
    ctx.shadowColor = "rgba(34, 211, 238, 0.55)";

    const lean = (state.targetLane - 1) * 0.08;
    ctx.rotate(lean);
    ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
    ctx.beginPath();
    ctx.ellipse(0, 122, 66, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    const body = ctx.createLinearGradient(-45, -30, 52, 86);
    body.addColorStop(0, "#22d3ee");
    body.addColorStop(0.58, "#2563eb");
    body.addColorStop(1, "#111827");
    ctx.fillStyle = body;
    roundRect(-42, -20, 84, 92, 22);
    ctx.fill();

    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(-20, -8);
    ctx.lineTo(22, 58);
    ctx.stroke();

    ctx.fillStyle = "#f2c29b";
    ctx.beginPath();
    ctx.arc(0, -64, 38, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(-8, -78, 36, Math.PI, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#111827";
    ctx.beginPath();
    ctx.arc(-13, -64, 5, 0, Math.PI * 2);
    ctx.arc(16, -64, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-34, 22);
    ctx.lineTo(-78, 54);
    ctx.moveTo(34, 24);
    ctx.lineTo(78, 2);
    ctx.stroke();

    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.moveTo(-23, 64);
    ctx.lineTo(-54, 126);
    ctx.moveTo(25, 64);
    ctx.lineTo(58, 112);
    ctx.stroke();

    ctx.strokeStyle = "#fb923c";
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(-72, 132);
    ctx.lineTo(-28, 132);
    ctx.moveTo(44, 118);
    ctx.lineTo(84, 118);
    ctx.stroke();

    ctx.strokeStyle = "rgba(34, 211, 238, 0.42)";
    ctx.lineWidth = 5;
    for (let i = 0; i < 4; i += 1) {
      ctx.beginPath();
      ctx.moveTo(-74 - i * 22, 20 + i * 20);
      ctx.lineTo(-138 - i * 18, 34 + i * 18);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawObstacle(item) {
    ctx.save();
    ctx.translate(item.x, item.y);
    const scale = Math.max(0.72, Math.min(1.35, 0.72 + item.y / H * 0.52));
    ctx.scale(scale, scale);
    ctx.shadowBlur = 18;
    ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
    if (item.kind === "cone") {
      const barrier = ctx.createLinearGradient(-58, -34, 58, 44);
      barrier.addColorStop(0, "#f8fafc");
      barrier.addColorStop(0.42, "#f97316");
      barrier.addColorStop(0.7, "#f8fafc");
      barrier.addColorStop(1, "#ef4444");
      ctx.fillStyle = barrier;
      roundRect(-62, -30, 124, 60, 10);
      ctx.fill();
      ctx.fillStyle = "#111827";
      roundRect(-56, 30, 24, 26, 5);
      ctx.fill();
      roundRect(32, 30, 24, 26, 5);
      ctx.fill();
    } else {
      const bag = ctx.createLinearGradient(-46, -54, 52, 54);
      bag.addColorStop(0, "#a855f7");
      bag.addColorStop(0.52, "#7c3aed");
      bag.addColorStop(1, "#111827");
      ctx.fillStyle = bag;
      roundRect(-48, -38, 96, 82, 18);
      ctx.fill();
      ctx.strokeStyle = "#facc15";
      ctx.lineWidth = 6;
      ctx.strokeRect(-25, -58, 50, 28);
      ctx.fillStyle = "rgba(248, 250, 252, 0.2)";
      roundRect(-28, 4, 56, 26, 8);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  function drawCoin(item) {
    ctx.save();
    ctx.translate(item.x, item.y);
    const pulse = 1 + Math.sin(performance.now() / 120 + item.y * 0.03) * 0.08;
    ctx.scale(pulse, pulse);
    ctx.shadowBlur = 24;
    ctx.shadowColor = "rgba(250, 204, 21, 0.9)";
    const token = ctx.createRadialGradient(-8, -10, 8, 0, 0, item.size * 0.7);
    token.addColorStop(0, "#fff7ad");
    token.addColorStop(0.45, "#facc15");
    token.addColorStop(1, "#f97316");
    ctx.fillStyle = token;
    ctx.beginPath();
    for (let i = 0; i < 6; i += 1) {
      const angle = -Math.PI / 2 + i * (Math.PI / 3);
      const r = i % 2 ? item.size * 0.38 : item.size * 0.56;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(248, 250, 252, 0.86)";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
  }

  function drawSpark(spark) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, spark.life / 0.75);
    ctx.shadowBlur = 16;
    ctx.shadowColor = spark.color;
    ctx.fillStyle = spark.color;
    ctx.font = "900 38px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(spark.text, spark.x, spark.y);
    ctx.restore();
  }

  function drawCampusBlock(x, y, w, h, base, light) {
    const facade = ctx.createLinearGradient(x, y, x + w, y + h);
    facade.addColorStop(0, base);
    facade.addColorStop(1, "#0f172a");
    ctx.fillStyle = facade;
    roundRect(x, y, w, h, 10);
    ctx.fill();

      ctx.fillStyle = "rgba(248, 250, 252, 0.12)";
      for (let row = y + 18; row < y + h - 14; row += 28) {
        for (let col = x + 14; col < x + w - 14; col += 30) {
          ctx.fillStyle = ((row + col) / 2) % 3 < 1.5 ? light : "rgba(148, 163, 184, 0.24)";
          roundRect(col, row, 16, 12, 3);
          ctx.fill();
        }
    }

    ctx.strokeStyle = "rgba(248, 250, 252, 0.22)";
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 3, y + 3, w - 6, h - 6);
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
