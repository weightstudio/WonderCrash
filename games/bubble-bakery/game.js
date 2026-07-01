(() => {
  const GAME_ID = "bubble-bakery";
  const localeKey = "weightplayLocale";
  const unlockKey = "weightplay_bubble_bakery_unlocked";
  const starKey = "weightplay_bubble_bakery_stars";

  const text = {
    en: {
      gameTitle: "Bubble Bakery",
      language: "Language",
      chooseStage: "Choose Stage",
      menuHint: "Tap matching bubbles to fill bakery orders.",
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
      almost: "Almost baked!",
      failed: "Try this order again.",
      resultWin: "You filled every order with {moves} moves left.",
      resultLose: "Collect the needed bubbles before moves run out.",
      smallGroup: "Tap 2 or more matching bubbles.",
      collect: "Collect {n}",
    },
    "zh-Hant": {
      gameTitle: "泡泡烘焙坊",
      language: "語言",
      chooseStage: "選擇關卡",
      menuHint: "點擊相同泡泡，完成烘焙訂單。",
      stages: "關卡",
      loading: "載入中",
      nextStage: "下一關",
      retry: "再試一次",
      lobby: "大廳",
      locked: "關卡未解鎖",
      moves: "步數",
      score: "分數",
      stage: "第 {n} 關",
      orderDone: "訂單完成！",
      almost: "快完成了！",
      failed: "再挑戰這份訂單。",
      resultWin: "你完成所有訂單，還剩 {moves} 步。",
      resultLose: "步數用完前，收集需要的泡泡。",
      smallGroup: "請點 2 個以上相同泡泡。",
      collect: "收集 {n}",
    },
  };

  const colors = [
    { id: "berry", icon: "🍓", css: "linear-gradient(145deg,#ff78a9,#e94172)" },
    { id: "sky", icon: "🫐", css: "linear-gradient(145deg,#7bd7ff,#278bd5)" },
    { id: "lemon", icon: "🍋", css: "linear-gradient(145deg,#fff176,#f4b400)" },
    { id: "mint", icon: "🍵", css: "linear-gradient(145deg,#9df278,#35b85b)" },
    { id: "grape", icon: "🍇", css: "linear-gradient(145deg,#d4a5ff,#8c52d9)" },
  ];

  const stages = [
    { moves: 16, palette: ["berry", "sky", "lemon"], orders: { berry: 8, sky: 8 }, note: "berry" },
    { moves: 17, palette: ["berry", "sky", "lemon", "mint"], orders: { lemon: 10, mint: 8 }, note: "lemon" },
    { moves: 18, palette: ["berry", "sky", "lemon", "mint"], orders: { sky: 12, berry: 8, mint: 8 }, note: "mix" },
    { moves: 19, palette: ["berry", "sky", "lemon", "mint", "grape"], orders: { grape: 10, lemon: 10 }, note: "grape" },
    { moves: 20, palette: ["berry", "sky", "lemon", "mint", "grape"], orders: { berry: 12, mint: 10, sky: 10 }, note: "rush" },
    { moves: 22, palette: ["berry", "sky", "lemon", "mint", "grape"], orders: { grape: 12, lemon: 12, berry: 10 }, note: "party" },
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

  function t(key, data) {
    let value = text[locale]?.[key] || text.en[key] || key;
    return Object.entries(data || {}).reduce((out, [name, item]) => out.replaceAll(`{${name}}`, item), value);
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
        <span>${"★".repeat(got)}${"☆".repeat(3 - got)}</span>
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
    return Array.from({ length: rows }, () => Array.from({ length: cols }, () => palette[Math.floor(Math.random() * palette.length)]));
  }

  function renderAll(drop = false) {
    renderOrders();
    renderBoard(drop);
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

  function renderBoard(drop = false) {
    nodes.board.innerHTML = "";
    board.forEach((row, r) => {
      row.forEach((id, c) => {
        const data = colorData(id);
        const button = document.createElement("button");
        button.type = "button";
        button.className = `bubble ${drop ? "drop" : ""}`;
        button.style.setProperty("--bubble", data.css);
        button.dataset.row = r;
        button.dataset.col = c;
        button.setAttribute("aria-label", id);
        button.addEventListener("click", () => popGroup(r, c));
        nodes.board.appendChild(button);
      });
    });
  }

  function groupFrom(startR, startC) {
    const id = board[startR]?.[startC];
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
      group.forEach(([gr, gc]) => { board[gr][gc] = null; });
      collapseBoard(stages[currentStage].palette);
      renderAll(true);
      busy = false;
      if (isComplete()) return finish(true);
      if (moves <= 0) return finish(false);
    }, 260);
  }

  function markPopping(group) {
    group.forEach(([r, c]) => {
      const node = nodes.board.querySelector(`[data-row="${r}"][data-col="${c}"]`);
      node?.classList.add("pop");
    });
  }

  function collapseBoard(palette) {
    for (let c = 0; c < cols; c++) {
      const column = [];
      for (let r = rows - 1; r >= 0; r--) if (board[r][c]) column.push(board[r][c]);
      while (column.length < rows) column.push(palette[Math.floor(Math.random() * palette.length)]);
      for (let r = rows - 1; r >= 0; r--) board[r][c] = column[rows - 1 - r];
    }
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
    nodes.starText.textContent = won ? `${"★".repeat(earned)}${"☆".repeat(3 - earned)}` : "☆☆☆";
    nodes.nextStageBtn.classList.toggle("hidden", !won || currentStage >= stages.length - 1);
    playSound(won ? "success" : "error");
    track("game_complete", { level: stageNo, success: won, score, moves_left: moves });
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
    const assets = ["../../assets/bubble-bakery-cover.svg"];
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
  });
  nodes.backToStagesBtn.addEventListener("click", showMenu);
  nodes.resultStagesBtn.addEventListener("click", showMenu);
  nodes.retryBtn.addEventListener("click", () => startStage(currentStage));
  nodes.nextStageBtn.addEventListener("click", () => startStage(Math.min(currentStage + 1, stages.length - 1)));

  localizeStatic();
  renderStageGrid();
  initLoading();
})();
