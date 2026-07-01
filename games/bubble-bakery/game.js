(() => {
  const GAME_ID = "bubble-bakery";
  const localeKey = "weightplayLocale";
  const unlockKey = "weightplay_bubble_bakery_unlocked";
  const starKey = "weightplay_bubble_bakery_stars";

  const text = {
    en: {
      gameTitle: "Animal Bubble Bakery",
      language: "Language",
      chooseStage: "Choose Stage",
      menuHint: "Tap 2 or more connected matching bubbles to fill bakery orders.",
      stages: "Stages",
      loading: "Loading",
      nextStage: "Next Stage",
      retry: "Try Again",
      lobby: "Lobby",
      locked: "Stage locked",
      moves: "Moves",
      score: "Score",
      stage: "Stage {n}",
      orderDone: "Order complete!",
      failed: "Try this order again.",
      resultWin: "You filled every order with {moves} moves left.",
      resultLose: "Collect the needed bubbles before moves run out.",
      smallGroup: "Tap 2 or more connected matching bubbles.",
      collect: "Collect {n}",
    },
    "zh-Hant": {
      gameTitle: "動物泡泡烘焙坊",
      language: "語言",
      chooseStage: "選擇關卡",
      menuHint: "點擊 2 個以上相連的相同泡泡，完成烘焙訂單。",
      stages: "關卡",
      loading: "載入中",
      nextStage: "下一關",
      retry: "再玩一次",
      lobby: "大廳",
      locked: "關卡尚未解鎖",
      moves: "步數",
      score: "分數",
      stage: "第 {n} 關",
      orderDone: "訂單完成！",
      failed: "再試一次這份訂單。",
      resultWin: "你完成所有訂單，還剩 {moves} 步。",
      resultLose: "步數用完前，要收集訂單需要的泡泡。",
      smallGroup: "請點擊 2 個以上相連的相同泡泡。",
      collect: "收集 {n}",
    },
  };

  const colors = [
    { id: "berry", icon: "🐰", css: "linear-gradient(145deg,#ff78a9,#e94172)" },
    { id: "sky", icon: "🐳", css: "linear-gradient(145deg,#7bd7ff,#278bd5)" },
    { id: "lemon", icon: "🐥", css: "linear-gradient(145deg,#fff176,#f4b400)" },
    { id: "mint", icon: "🐸", css: "linear-gradient(145deg,#9df278,#35b85b)" },
    { id: "grape", icon: "🦊", css: "linear-gradient(145deg,#d4a5ff,#8c52d9)" },
  ];

  const stages = [
    { moves: 16, palette: ["berry", "sky", "lemon"], orders: { berry: 8, sky: 8 } },
    { moves: 17, palette: ["berry", "sky", "lemon", "mint"], orders: { lemon: 10, mint: 8 } },
    { moves: 18, palette: ["berry", "sky", "lemon", "mint"], orders: { sky: 12, berry: 8, mint: 8 } },
    { moves: 19, palette: ["berry", "sky", "lemon", "mint", "grape"], orders: { grape: 10, lemon: 10 } },
    { moves: 20, palette: ["berry", "sky", "lemon", "mint", "grape"], orders: { berry: 12, mint: 10, sky: 10 } },
    { moves: 22, palette: ["berry", "sky", "lemon", "mint", "grape"], orders: { grape: 12, lemon: 12, berry: 10 } },
  ];

  const rows = 7;
  const cols = 7;
  const $ = (id) => document.getElementById(id);
  const nodes = {
    localeSelect: $("localeSelect"),
    menuPanel: $("menuPanel"),
    stageGrid: $("stageGrid"),
    playPanel: $("playPanel"),
    backToStagesBtn: $("backToStagesBtn"),
    movesText: $("movesText"),
    scoreText: $("scoreText"),
    orderBar: $("orderBar"),
    board: $("board"),
    hintText: $("hintText"),
    resultPanel: $("resultPanel"),
    resultTitle: $("resultTitle"),
    starText: $("starText"),
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
  let stars = readStars();
  let currentStage = 0;
  let board = [];
  let orders = {};
  let moves = 0;
  let score = 0;
  let busy = false;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function readStars() {
    try {
      return JSON.parse(localStorage.getItem(starKey) || "{}");
    } catch {
      return {};
    }
  }

  function saveStars() {
    localStorage.setItem(starKey, JSON.stringify(stars));
  }

  function t(key, data = {}) {
    const value = text[locale]?.[key] || text.en[key] || key;
    return Object.entries(data).reduce((out, [name, item]) => out.replaceAll(`{${name}}`, String(item)), value);
  }

  function colorData(id) {
    return colors.find((item) => item.id === id) || colors[0];
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
  }

  function renderStageGrid() {
    nodes.stageGrid.innerHTML = "";
    stages.forEach((stage, index) => {
      const stageNo = index + 1;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "stage-card";
      if (stageNo > unlocked) button.classList.add("locked");
      const orderIcons = Object.keys(stage.orders).map((id) => colorData(id).icon).join(" ");
      const got = stars[stageNo] || 0;
      button.innerHTML = `
        <b>${orderIcons}</b>
        <strong>${t("stage", { n: stageNo })}</strong>
        <span>${starIcons(got, 3)}</span>
      `;
      button.addEventListener("click", () => {
        if (stageNo > unlocked) {
          showFloat(t("locked"));
          playSound("click");
          return;
        }
        startStage(index);
      });
      nodes.stageGrid.appendChild(button);
    });
  }

  function showMenu() {
    nodes.menuPanel.classList.remove("hidden");
    nodes.playPanel.classList.add("hidden");
    nodes.resultPanel.classList.add("hidden");
    busy = false;
    renderStageGrid();
  }

  function startStage(index) {
    currentStage = index;
    const stage = stages[index];
    orders = { ...stage.orders };
    moves = stage.moves;
    score = 0;
    board = makeBoard(stage.palette);
    nodes.menuPanel.classList.add("hidden");
    nodes.playPanel.classList.remove("hidden");
    nodes.resultPanel.classList.add("hidden");
    nodes.hintText.textContent = t("smallGroup");
    renderAll();
    playSound("start");
    track("game_start", { level: index + 1 });
  }

  function makeBoard(palette) {
    const next = Array.from({ length: rows }, () => Array.from({ length: cols }, () => randomFrom(palette)));
    if (!hasPlayableGroup(next)) {
      next[0][0] = palette[0];
      next[0][1] = palette[0];
    }
    return next;
  }

  function randomFrom(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function hasPlayableGroup(nextBoard) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const id = nextBoard[r][c];
        if (nextBoard[r + 1]?.[c] === id || nextBoard[r]?.[c + 1] === id) return true;
      }
    }
    return false;
  }

  function renderAll(dropMap = new Map()) {
    renderOrders();
    renderBoard(dropMap);
    updateHud();
  }

  function renderOrders() {
    nodes.orderBar.innerHTML = "";
    Object.entries(orders).forEach(([id, need]) => {
      const data = colorData(id);
      const chip = document.createElement("div");
      chip.className = "order-chip";
      chip.innerHTML = `<i class="order-dot" style="background:${data.css}"></i><b>${data.icon}</b><span>${t("collect", { n: Math.max(0, need) })}</span>`;
      nodes.orderBar.appendChild(chip);
    });
  }

  function renderBoard(dropMap = new Map()) {
    nodes.board.innerHTML = "";
    board.forEach((row, r) => {
      row.forEach((id, c) => {
        const data = colorData(id);
        const key = `${r},${c}`;
        const button = document.createElement("button");
        button.type = "button";
        button.className = `bubble ${dropMap.has(key) ? "drop" : ""}`;
        button.style.setProperty("--bubble", data.css);
        if (dropMap.has(key)) button.style.setProperty("--drop-y", String(dropMap.get(key)));
        button.dataset.row = String(r);
        button.dataset.col = String(c);
        button.setAttribute("aria-label", id);
        button.innerHTML = `<span>${data.icon}</span>`;
        button.addEventListener("click", () => popGroup(r, c));
        nodes.board.appendChild(button);
      });
    });
  }

  function groupFrom(startR, startC) {
    const id = board[startR]?.[startC];
    if (!id) return { id, group: [] };
    const seen = new Set();
    const stack = [[startR, startC]];
    const group = [];
    while (stack.length) {
      const [r, c] = stack.pop();
      const key = `${r},${c}`;
      if (seen.has(key) || board[r]?.[c] !== id) continue;
      seen.add(key);
      group.push([r, c]);
      [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]].forEach(([nr, nc]) => {
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) stack.push([nr, nc]);
      });
    }
    return { id, group };
  }

  function popGroup(r, c) {
    if (busy || moves <= 0) return;
    const { id, group } = groupFrom(r, c);
    if (group.length < 2) {
      nodes.hintText.textContent = t("smallGroup");
      playSound("error");
      return;
    }
    busy = true;
    moves -= 1;
    score += group.length * group.length * 5;
    if (orders[id] > 0) orders[id] = Math.max(0, orders[id] - group.length);
    markPopping(group);
    showFloat(`+${group.length}`, window.innerWidth / 2, window.innerHeight * 0.5);
    playSound("pop");

    window.setTimeout(() => {
      group.forEach(([gr, gc]) => {
        board[gr][gc] = null;
      });
      const dropMap = collapseBoard(stages[currentStage].palette);
      renderAll(dropMap);
      window.setTimeout(() => {
        busy = false;
        if (isComplete()) return finish(true);
        if (moves <= 0) return finish(false);
      }, 520);
    }, 340);
  }

  function markPopping(group) {
    group.forEach(([r, c]) => {
      const node = nodes.board.querySelector(`[data-row="${r}"][data-col="${c}"]`);
      node?.classList.add("pop");
    });
  }

  function collapseBoard(palette) {
    const next = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null));
    const dropMap = new Map();
    for (let c = 0; c < cols; c++) {
      const kept = [];
      for (let r = rows - 1; r >= 0; r--) {
        if (board[r][c]) kept.push({ id: board[r][c], from: r });
      }
      let target = rows - 1;
      kept.forEach((item) => {
        next[target][c] = item.id;
        if (item.from !== target) dropMap.set(`${target},${c}`, Math.max(1, target - item.from));
        target -= 1;
      });
      while (target >= 0) {
        next[target][c] = randomFrom(palette);
        dropMap.set(`${target},${c}`, Math.max(2, target + 2));
        target -= 1;
      }
    }
    board = next;
    return dropMap;
  }

  function isComplete() {
    return Object.values(orders).every((need) => need <= 0);
  }

  function updateHud() {
    nodes.movesText.textContent = moves;
    nodes.scoreText.textContent = score;
  }

  function finish(won) {
    busy = true;
    const stageNo = currentStage + 1;
    let earned = 0;
    if (won) {
      earned = moves >= 7 ? 3 : moves >= 3 ? 2 : 1;
      stars[stageNo] = Math.max(stars[stageNo] || 0, earned);
      saveStars();
      if (stageNo === unlocked && unlocked < stages.length) {
        unlocked += 1;
        localStorage.setItem(unlockKey, String(unlocked));
      }
    }
    nodes.resultPanel.classList.remove("hidden");
    nodes.resultTitle.textContent = won ? t("orderDone") : t("failed");
    nodes.resultText.textContent = won ? t("resultWin", { moves }) : t("resultLose");
    nodes.starText.textContent = won ? starIcons(earned, 3) : "☆☆☆";
    nodes.nextStageBtn.classList.toggle("hidden", !won || currentStage >= stages.length - 1);
    playSound(won ? "success" : "error");
    track("game_complete", { level: stageNo, success: won, score, moves_left: moves });
  }

  function starIcons(count, total) {
    return `${"★".repeat(count)}${"☆".repeat(total - count)}`;
  }

  function showFloat(message, x = window.innerWidth / 2, y = window.innerHeight / 2) {
    const bubble = document.createElement("div");
    bubble.className = "board-float";
    bubble.textContent = message;
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
    document.body.appendChild(bubble);
    window.setTimeout(() => bubble.remove(), 850);
  }

  function initLoading() {
    const assets = ["../../assets/bubble-bakery-cover.png"];
    let loaded = 0;
    const update = () => {
      const pct = Math.min(100, Math.round((loaded / assets.length) * 100));
      nodes.loadingText.textContent = `${pct}%`;
      nodes.loadingFill.style.width = `${pct}%`;
      if (pct >= 100) {
        nodes.loadingPanel.classList.add("hidden");
        track("game_ready");
      }
    };
    assets.forEach((src) => {
      const image = new Image();
      image.onload = image.onerror = () => {
        loaded += 1;
        update();
      };
      image.src = src;
    });
    update();
  }

  nodes.localeSelect.addEventListener("change", () => {
    locale = nodes.localeSelect.value;
    localStorage.setItem(localeKey, locale);
    localizeStatic();
    renderStageGrid();
    if (!nodes.playPanel.classList.contains("hidden")) renderAll();
    window.dispatchEvent(new CustomEvent("wonder:locale-change", { detail: { locale } }));
  });
  nodes.backToStagesBtn.addEventListener("click", showMenu);
  nodes.resultStagesBtn.addEventListener("click", showMenu);
  nodes.retryBtn.addEventListener("click", () => startStage(currentStage));
  nodes.nextStageBtn.addEventListener("click", () => startStage(Math.min(currentStage + 1, stages.length - 1)));

  localizeStatic();
  renderStageGrid();
  initLoading();
})();
