(() => {
  const GAME_ID = "fruit-merge";
  const BEST_KEY = "fruitMergeBestScore";
  const canvas = document.querySelector("#gameCanvas");
  const ctx = canvas.getContext("2d");
  const localeSelect = document.querySelector("#localeSelect");
  const titleText = document.querySelector("#titleText");
  const languageLabel = document.querySelector("#languageLabel");
  const scoreLabel = document.querySelector("#scoreLabel");
  const bestLabel = document.querySelector("#bestLabel");
  const nextLabel = document.querySelector("#nextLabel");
  const scoreText = document.querySelector("#scoreText");
  const bestText = document.querySelector("#bestText");
  const nextFruitText = document.querySelector("#nextFruitText");
  const dropBtn = document.querySelector("#dropBtn");
  const restartBtn = document.querySelector("#restartBtn");
  const startBtn = document.querySelector("#startBtn");
  const menuPanel = document.querySelector("#menuPanel");
  const menuTitle = document.querySelector("#menuTitle");
  const menuDesc = document.querySelector("#menuDesc");
  const resultPanel = document.querySelector("#resultPanel");
  const resultTitle = document.querySelector("#resultTitle");
  const resultText = document.querySelector("#resultText");
  const playAgainBtn = document.querySelector("#playAgainBtn");
  const lobbyLink = document.querySelector("#lobbyLink");
  const loadingPanel = document.querySelector("#loadingPanel");
  const toast = document.querySelector("#toast");

  const W = canvas.width;
  const H = canvas.height;
  const wallLeft = 44;
  const wallRight = W - 44;
  const floorY = H - 42;
  const dangerY = 164;
  const dropY = 122;
  const gravity = 2450;
  const airFriction = 0.997;
  const groundFriction = 0.86;
  const angularFriction = 0.992;

  const dictionary = {
    en: {
      title: "Fruit Merge Tower",
      language: "Language",
      score: "Score",
      best: "Best",
      next: "Next",
      drop: "Drop",
      restart: "Restart",
      menuTitle: "Merge to Watermelon",
      menuDesc: "Drop fruits carefully. Matching fruits merge into the next fruit. Keep the tower below the red line.",
      start: "Start",
      gameOver: "Game Over",
      result: "Score {score}  Best {best}",
      playAgain: "Play Again",
      lobby: "Lobby",
      newBest: "New Best!",
      fruit0: "Blueberry",
      fruit1: "Cherry",
      fruit2: "Strawberry",
      fruit3: "Grape",
      fruit4: "Orange",
      fruit5: "Apple",
      fruit6: "Pear",
      fruit7: "Peach",
      fruit8: "Pineapple",
      fruit9: "Melon",
      fruit10: "Watermelon",
    },
    "zh-Hant": {
      title: "水果合成塔",
      language: "語言",
      score: "分數",
      best: "最佳",
      next: "下一顆",
      drop: "丟下",
      restart: "重來",
      menuTitle: "合成到西瓜",
      menuDesc: "小心丟水果，一樣的水果碰在一起會合成下一級。不要讓水果堆超過紅線。",
      start: "開始",
      gameOver: "遊戲結束",
      result: "分數 {score}  最佳 {best}",
      playAgain: "再玩一次",
      lobby: "大廳",
      newBest: "新紀錄！",
      fruit0: "藍莓",
      fruit1: "櫻桃",
      fruit2: "草莓",
      fruit3: "葡萄",
      fruit4: "橘子",
      fruit5: "蘋果",
      fruit6: "梨子",
      fruit7: "桃子",
      fruit8: "鳳梨",
      fruit9: "哈密瓜",
      fruit10: "西瓜",
    },
  };

  const fruits = [
    { radius: 28, color: "#4854d9", accent: "#91a3ff", score: 2 },
    { radius: 34, color: "#d93652", accent: "#ff94a7", score: 4 },
    { radius: 42, color: "#ff4d63", accent: "#ffd35d", score: 8 },
    { radius: 52, color: "#7a4ce0", accent: "#c5a5ff", score: 14 },
    { radius: 64, color: "#ff9438", accent: "#ffd28a", score: 22 },
    { radius: 76, color: "#e83f4b", accent: "#ffac8a", score: 34 },
    { radius: 90, color: "#a8d957", accent: "#f4ff9e", score: 52 },
    { radius: 106, color: "#ffb182", accent: "#ffe0c8", score: 78 },
    { radius: 122, color: "#f5b43b", accent: "#75c95b", score: 118 },
    { radius: 142, color: "#8fd94f", accent: "#fff28a", score: 176 },
    { radius: 166, color: "#2fbd65", accent: "#1d8b45", score: 300 },
  ];

  let fruitId = 1;
  let fruitsOnBoard = [];
  let currentLevel = 0;
  let nextLevel = 0;
  let mergeBursts = [];
  let aimX = W / 2;
  let score = 0;
  let bestScore = Number(localStorage.getItem(BEST_KEY) || 0);
  let running = false;
  let gameOver = false;
  let canDropAt = 0;
  let lastTime = performance.now();
  let toastTimer = null;

  function locale() {
    return window.WonderI18n?.locale?.() || "en";
  }

  function t(key, params = {}) {
    const table = dictionary[locale()] || dictionary.en;
    const fallback = dictionary.en;
    let value = table[key] || fallback[key] || key;
    for (const [name, param] of Object.entries(params)) {
      value = value.replaceAll(`{${name}}`, String(param));
    }
    return value;
  }

  function applyText() {
    document.documentElement.lang = locale();
    titleText.textContent = t("title");
    languageLabel.textContent = t("language");
    scoreLabel.textContent = t("score");
    bestLabel.textContent = t("best");
    nextLabel.textContent = t("next");
    dropBtn.textContent = t("drop");
    restartBtn.textContent = t("restart");
    menuTitle.textContent = t("menuTitle");
    menuDesc.textContent = t("menuDesc");
    startBtn.textContent = t("start");
    playAgainBtn.textContent = t("playAgain");
    lobbyLink.textContent = t("lobby");
    updateHud();
  }

  function setLocale(value) {
    window.WonderI18n?.setLocale?.(value);
    applyText();
  }

  function randomNextLevel() {
    const poolMax = score > 900 ? 4 : score > 320 ? 3 : 2;
    return Math.floor(Math.random() * (poolMax + 1));
  }

  function resetGame(showMenu = false) {
    fruitsOnBoard = [];
    currentLevel = randomNextLevel();
    nextLevel = randomNextLevel();
    mergeBursts = [];
    aimX = W / 2;
    score = 0;
    fruitId = 1;
    running = !showMenu;
    gameOver = false;
    canDropAt = performance.now() + 300;
    resultPanel.classList.add("hidden");
    menuPanel.classList.toggle("hidden", !showMenu);
    updateHud();
  }

  function updateHud() {
    scoreText.textContent = score;
    bestText.textContent = bestScore;
    nextFruitText.innerHTML = fruitSvg(nextLevel);
    nextFruitText.setAttribute("aria-label", t(`fruit${nextLevel}`));
    nextFruitText.title = t(`fruit${nextLevel}`);
  }

  function dropFruit() {
    if (!running || gameOver || performance.now() < canDropAt) return;
    const spec = fruits[currentLevel];
    const x = clamp(aimX, wallLeft + spec.radius, wallRight - spec.radius);
    fruitsOnBoard.push({
      id: fruitId++,
      level: currentLevel,
      x,
      y: dropY,
      vx: 0,
      vy: 0,
      radius: spec.radius,
      angle: random(-0.18, 0.18),
      angularVelocity: random(-1.2, 1.2),
      merging: false,
      bornAt: performance.now(),
    });
    currentLevel = nextLevel;
    nextLevel = randomNextLevel();
    canDropAt = performance.now() + 520;
    window.WonderSound?.play?.("click");
    updateHud();
  }

  function step(dt) {
    for (const fruit of fruitsOnBoard) {
      fruit.vy += gravity * dt;
      fruit.vx *= airFriction;
      fruit.vy *= airFriction;
      fruit.angularVelocity *= angularFriction;
      fruit.angle += fruit.angularVelocity * dt;
      fruit.x += fruit.vx * dt;
      fruit.y += fruit.vy * dt;

      if (fruit.x - fruit.radius < wallLeft) {
        fruit.x = wallLeft + fruit.radius;
        fruit.vx = Math.abs(fruit.vx) * 0.42;
        fruit.angularVelocity += fruit.vy * 0.004;
      }
      if (fruit.x + fruit.radius > wallRight) {
        fruit.x = wallRight - fruit.radius;
        fruit.vx = -Math.abs(fruit.vx) * 0.42;
        fruit.angularVelocity -= fruit.vy * 0.004;
      }
      if (fruit.y + fruit.radius > floorY) {
        fruit.y = floorY - fruit.radius;
        fruit.vy = -Math.abs(fruit.vy) * 0.18;
        fruit.vx *= groundFriction;
        fruit.angularVelocity += fruit.vx * 0.009;
        if (Math.abs(fruit.vy) < 28) fruit.vy = 0;
      }
    }

    resolveMerges();
    for (let iteration = 0; iteration < 4; iteration += 1) {
      resolveCollisions();
    }
    resolveMerges();
    updateMergeBursts(dt);
    checkGameOver(dt);
  }

  function resolveCollisions() {
    for (let i = 0; i < fruitsOnBoard.length; i += 1) {
      for (let j = i + 1; j < fruitsOnBoard.length; j += 1) {
        const a = fruitsOnBoard[i];
        const b = fruitsOnBoard[j];
        if (a.merging || b.merging) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.001;
        const minDist = a.radius + b.radius;
        if (dist >= minDist) continue;

        const nx = dx / dist;
        const ny = dy / dist;
        const overlap = minDist - dist;
        a.x -= nx * overlap * 0.5;
        a.y -= ny * overlap * 0.5;
        b.x += nx * overlap * 0.5;
        b.y += ny * overlap * 0.5;

        const rvx = b.vx - a.vx;
        const rvy = b.vy - a.vy;
        const velocityAlongNormal = rvx * nx + rvy * ny;
        if (velocityAlongNormal > 0) continue;
        const impulse = -(1.12 * velocityAlongNormal) / 2;
        const ix = impulse * nx;
        const iy = impulse * ny;
        a.vx -= ix;
        a.vy -= iy;
        b.vx += ix;
        b.vy += iy;
        a.angularVelocity -= iy * 0.004 + ix * 0.002;
        b.angularVelocity += iy * 0.004 + ix * 0.002;
      }
    }
  }

  function resolveMerges() {
    const removeIds = new Set();
    const additions = [];
    for (let i = 0; i < fruitsOnBoard.length; i += 1) {
      for (let j = i + 1; j < fruitsOnBoard.length; j += 1) {
        const a = fruitsOnBoard[i];
        const b = fruitsOnBoard[j];
        if (removeIds.has(a.id) || removeIds.has(b.id) || a.level !== b.level || a.level >= fruits.length - 1) continue;
        if (!shouldMerge(a, b)) continue;
        const next = fruits[a.level + 1];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 1;
        const nx = dx / dist;
        const ny = dy / dist;
        const relativeVx = b.vx - a.vx;
        const relativeVy = b.vy - a.vy;
        const impact = Math.min(420, Math.max(90, Math.abs(relativeVx * nx + relativeVy * ny) + Math.hypot(relativeVx, relativeVy) * 0.28));
        const mergedVx = (a.vx + b.vx) * 0.48 + nx * impact * 0.22;
        const mergedVy = Math.min((a.vy + b.vy) * 0.42 + ny * impact * 0.12, 260);
        const merged = {
          id: fruitId++,
          level: a.level + 1,
          x: clamp((a.x + b.x) / 2, wallLeft + next.radius, wallRight - next.radius),
          y: Math.min((a.y + b.y) / 2, floorY - next.radius),
          vx: mergedVx,
          vy: mergedVy,
          radius: next.radius,
          angle: (a.angle + b.angle) / 2,
          angularVelocity: (a.angularVelocity + b.angularVelocity) * 0.45 + (relativeVx * ny - relativeVy * nx) * 0.012,
          pop: 0.24,
          bornAt: performance.now(),
        };
        removeIds.add(a.id);
        removeIds.add(b.id);
        additions.push(merged);
        spawnMergeBurst(merged.x, merged.y, next.color, impact);
        score += next.score;
        if (merged.level === fruits.length - 1) showToast(t("fruit10"));
        window.WonderSound?.play?.("success");
        break;
      }
    }
    if (!removeIds.size) return;
    fruitsOnBoard = fruitsOnBoard.filter((fruit) => !removeIds.has(fruit.id)).concat(additions);
    updateHud();
  }

  function shouldMerge(a, b) {
    if (a.level !== b.level || a.level >= fruits.length - 1) return false;
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    const mergeDistance = a.radius + b.radius + Math.max(12, Math.min(a.radius, b.radius) * 0.45);
    return dist <= mergeDistance;
  }

  function spawnMergeBurst(x, y, color, impact) {
    mergeBursts.push({ x, y, color, life: 0.34, maxLife: 0.34, impact });
  }

  function updateMergeBursts(dt) {
    for (const fruit of fruitsOnBoard) {
      if (fruit.pop > 0) fruit.pop = Math.max(0, fruit.pop - dt);
    }
    mergeBursts = mergeBursts
      .map((burst) => ({ ...burst, life: burst.life - dt }))
      .filter((burst) => burst.life > 0);
  }

  function checkGameOver(dt) {
    let dangerTime = 0;
    for (const fruit of fruitsOnBoard) {
      const old = fruit.dangerTime || 0;
      const settled = Math.abs(fruit.vx) + Math.abs(fruit.vy) < 42 && performance.now() - fruit.bornAt > 1000;
      fruit.dangerTime = fruit.y - fruit.radius < dangerY && settled ? old + dt : 0;
      dangerTime = Math.max(dangerTime, fruit.dangerTime);
    }
    if (dangerTime > 2.1) endGame();
  }

  function endGame() {
    if (gameOver) return;
    running = false;
    gameOver = true;
    const newBest = score > bestScore;
    if (newBest) {
      bestScore = score;
      localStorage.setItem(BEST_KEY, String(bestScore));
      showToast(t("newBest"));
    }
    resultTitle.textContent = t("gameOver");
    resultText.textContent = t("result", { score, best: bestScore });
    resultPanel.classList.remove("hidden");
    window.WonderAnalytics?.track?.("score_game_over", { game_id: GAME_ID, score, best_score: bestScore });
    updateHud();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    drawBoard();
    for (const fruit of fruitsOnBoard) drawFruit(fruit);
    drawMergeBursts();
    if (running && !gameOver) drawDropPreview();
  }

  function drawBoard() {
    const gradient = ctx.createLinearGradient(0, 0, 0, H);
    gradient.addColorStop(0, "#eaf7ff");
    gradient.addColorStop(1, "#fff8dc");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "#29364d";
    roundRect(ctx, wallLeft - 18, 82, 18, floorY - 70, 8);
    ctx.fill();
    roundRect(ctx, wallRight, 82, 18, floorY - 70, 8);
    ctx.fill();
    roundRect(ctx, wallLeft - 18, floorY, wallRight - wallLeft + 36, 26, 8);
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 77, 99, 0.78)";
    ctx.lineWidth = 6;
    ctx.setLineDash([20, 16]);
    ctx.beginPath();
    ctx.moveTo(wallLeft, dangerY);
    ctx.lineTo(wallRight, dangerY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "rgba(41, 54, 77, 0.72)";
    ctx.font = "900 24px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(t("next"), W / 2, 42);
  }

  function drawDropPreview() {
    const spec = fruits[currentLevel];
    const x = clamp(aimX, wallLeft + spec.radius, wallRight - spec.radius);
    ctx.strokeStyle = "rgba(41, 54, 77, 0.24)";
    ctx.lineWidth = 4;
    ctx.setLineDash([12, 12]);
    ctx.beginPath();
    ctx.moveTo(x, dropY - 42);
    ctx.lineTo(x, floorY);
    ctx.stroke();
    ctx.setLineDash([]);
    drawFruit({ level: currentLevel, x, y: dropY, radius: spec.radius, angle: 0, preview: true });
  }

  function drawFruit(fruit) {
    const spec = fruits[fruit.level];
    ctx.save();
    ctx.globalAlpha = fruit.preview ? 0.72 : 1;
    ctx.translate(fruit.x, fruit.y);
    const popScale = fruit.pop ? 1 + Math.sin((fruit.pop / 0.24) * Math.PI) * 0.12 : 1;
    ctx.scale(popScale, popScale);
    ctx.rotate(fruit.angle || 0);

    ctx.beginPath();
    ctx.arc(0, 0, fruit.radius, 0, Math.PI * 2);
    ctx.fillStyle = spec.color;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(-fruit.radius * 0.28, -fruit.radius * 0.32, fruit.radius * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = spec.accent;
    ctx.globalAlpha *= 0.62;
    ctx.fill();
    ctx.globalAlpha = fruit.preview ? 0.72 : 1;

    if (fruit.level >= 8) {
      ctx.strokeStyle = fruit.level === 10 ? "#174f32" : "#b97a2c";
      ctx.lineWidth = Math.max(4, fruit.radius * 0.08);
      for (let x = -fruit.radius * 0.45; x <= fruit.radius * 0.45; x += fruit.radius * 0.28) {
        ctx.beginPath();
        ctx.moveTo(x, -fruit.radius * 0.72);
        ctx.lineTo(x * 0.5, fruit.radius * 0.72);
        ctx.stroke();
      }
    }

    ctx.fillStyle = "rgba(27, 38, 54, 0.72)";
    ctx.beginPath();
    ctx.arc(-fruit.radius * 0.23, -fruit.radius * 0.05, Math.max(2.6, fruit.radius * 0.055), 0, Math.PI * 2);
    ctx.arc(fruit.radius * 0.23, -fruit.radius * 0.05, Math.max(2.6, fruit.radius * 0.055), 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(27, 38, 54, 0.68)";
    ctx.lineWidth = Math.max(2, fruit.radius * 0.045);
    ctx.beginPath();
    ctx.arc(0, fruit.radius * 0.08, fruit.radius * 0.18, 0.12 * Math.PI, 0.88 * Math.PI);
    ctx.stroke();

    if (fruit.level === 2) {
      ctx.fillStyle = "#fff7b0";
      for (let i = 0; i < 6; i += 1) {
        const angle = (i / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(Math.cos(angle) * fruit.radius * 0.45, Math.sin(angle) * fruit.radius * 0.45, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (fruit.level >= 1 && fruit.level !== 3) {
      ctx.strokeStyle = "#28764a";
      ctx.lineWidth = Math.max(3, fruit.radius * 0.06);
      ctx.beginPath();
      ctx.moveTo(0, -fruit.radius * 0.72);
      ctx.quadraticCurveTo(fruit.radius * 0.14, -fruit.radius * 0.98, fruit.radius * 0.34, -fruit.radius * 0.88);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawMergeBursts() {
    for (const burst of mergeBursts) {
      const progress = 1 - burst.life / burst.maxLife;
      const radius = 28 + progress * (70 + burst.impact * 0.05);
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - progress);
      ctx.strokeStyle = burst.color;
      ctx.lineWidth = 8 * (1 - progress) + 2;
      ctx.beginPath();
      ctx.arc(burst.x, burst.y, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha *= 0.65;
      ctx.fillStyle = burst.color;
      for (let i = 0; i < 8; i += 1) {
        const angle = (i / 8) * Math.PI * 2;
        const px = burst.x + Math.cos(angle) * radius * 0.9;
        const py = burst.y + Math.sin(angle) * radius * 0.9;
        ctx.beginPath();
        ctx.arc(px, py, 5 * (1 - progress) + 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function fruitSvg(level) {
    const spec = fruits[level];
    const stripes = level >= 8
      ? `<g stroke="${level === 10 ? "#174f32" : "#b97a2c"}" stroke-width="7" stroke-linecap="round" opacity="0.78">
          <path d="M40 24 L48 104" />
          <path d="M64 18 L68 110" />
          <path d="M88 24 L82 104" />
        </g>`
      : "";
    const seeds = level === 2
      ? `<g fill="#fff7b0"><circle cx="44" cy="48" r="3"/><circle cx="76" cy="48" r="3"/><circle cx="54" cy="76" r="3"/><circle cx="88" cy="74" r="3"/></g>`
      : "";
    const stem = level >= 1 && level !== 3
      ? `<path d="M64 28 C72 8 86 8 96 16" fill="none" stroke="#28764a" stroke-width="7" stroke-linecap="round"/>`
      : "";
    return `
      <svg viewBox="0 0 128 128" role="img" aria-hidden="true">
        <circle cx="64" cy="70" r="46" fill="${spec.color}" />
        <circle cx="50" cy="50" r="14" fill="${spec.accent}" opacity="0.62" />
        ${stripes}
        ${seeds}
        <circle cx="53" cy="67" r="4" fill="rgba(27, 38, 54, 0.72)" />
        <circle cx="75" cy="67" r="4" fill="rgba(27, 38, 54, 0.72)" />
        <path d="M55 80 Q64 88 73 80" fill="none" stroke="rgba(27, 38, 54, 0.68)" stroke-width="4" stroke-linecap="round" />
        ${stem}
      </svg>
    `;
  }

  function roundRect(context, x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
  }

  function canvasX(event) {
    const rect = canvas.getBoundingClientRect();
    return ((event.clientX - rect.left) / rect.width) * W;
  }

  function showToast(text) {
    toast.textContent = text;
    toast.classList.remove("hidden");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.add("hidden"), 900);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function loop(now) {
    const dt = Math.min(0.033, (now - lastTime) / 1000);
    lastTime = now;
    if (running && !gameOver) step(dt);
    draw();
    requestAnimationFrame(loop);
  }

  canvas.addEventListener("pointermove", (event) => {
    aimX = canvasX(event);
  });

  canvas.addEventListener("pointerdown", (event) => {
    aimX = canvasX(event);
    canvas.setPointerCapture?.(event.pointerId);
  });

  canvas.addEventListener("pointerup", (event) => {
    aimX = canvasX(event);
    dropFruit();
    canvas.releasePointerCapture?.(event.pointerId);
  });

  dropBtn.addEventListener("click", dropFruit);
  restartBtn.addEventListener("click", () => resetGame(false));
  startBtn.addEventListener("click", () => {
    window.WonderSound?.play?.("start");
    resetGame(false);
  });
  playAgainBtn.addEventListener("click", () => resetGame(false));

  localeSelect.value = locale();
  localeSelect.addEventListener("change", () => setLocale(localeSelect.value));
  window.addEventListener("wonder:locale-change", () => {
    localeSelect.value = locale();
    applyText();
  });

  applyText();
  resetGame(true);
  loadingPanel.classList.add("hidden");
  window.WonderAnalytics?.track?.("game_ready", { game_id: GAME_ID });
  requestAnimationFrame((now) => {
    lastTime = now;
    loop(now);
  });
})();
