(() => {
  const common = {
    en: {
      close: "Start Playing",
      closeAria: "Close tutorial",
      aria: "How to play",
      lobbyAria: "Back to lobby",
    },
    "zh-Hant": {
      close: "開始玩",
      closeAria: "關閉教學",
      aria: "玩法提示",
      lobbyAria: "回到大廳",
    },
  };

  const tutorials = {
    "wonder-crash": {
      title: { en: "Protect the wall.", "zh-Hant": "保護城牆" },
      steps: [
        { icon: "↔", en: ["Move", "Tap or drag anywhere to move the hero left and right."], "zh-Hant": ["移動", "點擊或拖曳畫面，讓角色左右移動。"] },
        { icon: "⌛", en: ["Auto Weapons", "Equipped weapons fire when their cooldown is ready."], "zh-Hant": ["自動攻擊", "裝備的武器冷卻完成後會自動發射。"] },
        { icon: "▰", en: ["Win", "Stop monsters before the wall breaks."], "zh-Hant": ["過關", "在城牆被打破前擊退怪物。"] },
      ],
    },
    "animal-rescue": {
      title: { en: "Guide animals home.", "zh-Hant": "帶動物回家" },
      steps: [
        { icon: "1", en: ["Choose Nearby", "Tap a nearby tile to move one step."], "zh-Hant": ["選旁邊", "點相鄰格子，讓動物走一步。"] },
        { icon: "●", en: ["Collect", "Pick up fruit on the way for more stars."], "zh-Hant": ["收集", "路上拿水果，可以得到更多星星。"] },
        { icon: "⌂", en: ["Goal", "Reach the home tile to clear the trail."], "zh-Hant": ["目標", "走到家的格子就能完成關卡。"] },
      ],
    },
    "tiny-weather-rescue": {
      title: { en: "Help the animal.", "zh-Hant": "幫小動物" },
      steps: [
        { icon: "☔", en: ["Look", "See what the animal needs."], "zh-Hant": ["觀察", "先看小動物需要什麼。"] },
        { icon: "☂", en: ["Help", "Tap a care item, or drag it to the animal."], "zh-Hant": ["幫忙", "點照顧道具，或拖到小動物身上。"] },
        { icon: "😄", en: ["Clear", "Happy faces mean you helped correctly."], "zh-Hant": ["過關", "出現笑臉就是幫對了。"] },
      ],
    },
    "snack-blocks": {
      title: { en: "Match snacks.", "zh-Hant": "配對零食" },
      steps: [
        { icon: "↕", en: ["Swap", "Tap or drag a snack to swap with a neighbor."], "zh-Hant": ["交換", "點一下或拖曳零食，和旁邊交換。"] },
        { icon: "3", en: ["Match", "Line up 3 or more of the same snack to clear them."], "zh-Hant": ["消除", "排出 3 個以上相同零食就會消除。"] },
        { icon: "✓", en: ["Goal", "Use all moves, then the stage checks your goal."], "zh-Hant": ["目標", "用完步數後，系統會判斷是否過關。"] },
      ],
    },
    "fruit-merge": {
      title: { en: "Merge bigger fruits.", "zh-Hant": "合成更大的水果" },
      steps: [
        { icon: "1", en: ["Aim", "Move your finger or mouse to choose where the fruit drops."], "zh-Hant": ["瞄準", "移動手指或滑鼠，選擇水果落下的位置。"] },
        { icon: "2", en: ["Drop", "Release or tap Drop to let the fruit fall."], "zh-Hant": ["丟下", "放開手指，或按丟下讓水果掉下去。"] },
        { icon: "3", en: ["Merge", "Two matching fruits merge into the next fruit. Do not pass the red line."], "zh-Hant": ["合成", "兩顆相同水果會合成下一級，別讓水果超過紅線。"] },
      ],
    },
    "garden-tiles": {
      title: { en: "Relax and match.", "zh-Hant": "放鬆配對" },
      steps: [
        { icon: "1", en: ["Look", "All tiles are open. Take your time and find two matching pictures."], "zh-Hant": ["觀察", "所有圖塊都會打開，慢慢找兩張一樣的圖。"] },
        { icon: "2", en: ["Match", "Tap two matching garden tiles to remove them."], "zh-Hant": ["配對", "點兩張相同的花園圖塊，就能把它們消除。"] },
        { icon: "3", en: ["Clear", "Clear every pair to finish the level. There is no timer."], "zh-Hant": ["完成", "消完全部配對就過關，沒有倒數壓力。"] },
      ],
    },
    "campus-dash": {
      title: { en: "Dodge in three lanes.", "zh-Hant": "三條路閃避" },
      steps: [
        { icon: "↔", en: ["Move", "Swipe or tap left and right lanes to move."], "zh-Hant": ["移動", "滑動或點左右路線來換位置。"] },
        { icon: "!", en: ["Avoid", "Dodge obstacles and stay on the open lane."], "zh-Hant": ["閃避", "避開障礙物，站在安全路線。"] },
        { icon: "★", en: ["Score", "Survive longer to beat your best score."], "zh-Hant": ["分數", "撐越久分數越高，挑戰最佳紀錄。"] },
      ],
    },
    "animal-quiz": {
      title: { en: "Answer animal questions.", "zh-Hant": "回答動物問題" },
      steps: [
        { icon: "?", en: ["Question", "Look at the animal picture and question."], "zh-Hant": ["題目", "看動物圖片和問題。"] },
        { icon: "✓", en: ["Answer", "Tap the answer you think is right."], "zh-Hant": ["作答", "點選你覺得正確的答案。"] },
        { icon: "10", en: ["Stage", "Finish 10 questions to clear a stage."], "zh-Hant": ["關卡", "完成 10 題就能完成一關。"] },
      ],
    },
    "color-lunchbox": {
      title: { en: "Sort food by color.", "zh-Hant": "依顏色分類食物" },
      steps: [
        { icon: "●", en: ["Look", "Check each food color."], "zh-Hant": ["觀察", "看清楚每個食物的顏色。"] },
        { icon: "↘", en: ["Drag", "Drag food into the matching lunchbox."], "zh-Hant": ["拖曳", "把食物拖到相同顏色的便當盒。"] },
        { icon: "✓", en: ["Clear", "Sort everything correctly to finish."], "zh-Hant": ["完成", "全部放對就能過關。"] },
      ],
    },
    "star-memory": {
      title: { en: "Find matching cards.", "zh-Hant": "找出相同卡片" },
      steps: [
        { icon: "▣", en: ["Flip", "Tap a card to reveal it."], "zh-Hant": ["翻牌", "點卡片把它翻開。"] },
        { icon: "=", en: ["Match", "Find two cards with the same picture."], "zh-Hant": ["配對", "找出兩張一樣的圖案。"] },
        { icon: "★", en: ["Clear", "Match all pairs with fewer moves for more stars."], "zh-Hant": ["過關", "用越少步數配完，星星越多。"] },
      ],
    },
    "shape-train": {
      title: { en: "Load the shape train.", "zh-Hant": "幫形狀上火車" },
      steps: [
        { icon: "△", en: ["Look", "Check the shape the train needs."], "zh-Hant": ["觀察", "看火車需要哪個形狀。"] },
        { icon: "↘", en: ["Choose", "Tap or drag the matching shape."], "zh-Hant": ["選擇", "點選或拖曳相同形狀。"] },
        { icon: "✓", en: ["Help", "Finish all shape friends to clear."], "zh-Hant": ["完成", "幫所有形狀朋友上車就過關。"] },
      ],
    },
    "zoo-helper-day": {
      title: { en: "Help zoo animals.", "zh-Hant": "照顧動物園動物" },
      steps: [
        { icon: "!", en: ["Need", "Look at what the animal needs."], "zh-Hant": ["需求", "看動物現在需要什麼。"] },
        { icon: "↘", en: ["Help", "Choose the matching care item."], "zh-Hant": ["照顧", "選擇對應的照顧道具。"] },
        { icon: "★", en: ["Clear", "Help enough animals to finish the stage."], "zh-Hant": ["過關", "完成足夠任務就能過關。"] },
      ],
    },
    "animal-guard-yard": {
      title: { en: "Guard the yard.", "zh-Hant": "守住動物庭院" },
      steps: [
        { icon: "☀", en: ["Collect Sun", "Tap sun drops to gain energy for animal guards."], "zh-Hant": ["收集太陽", "點擊掉落的太陽，取得放置動物的能量。"] },
        { icon: "🐱", en: ["Place Guards", "Choose an animal, then tap a grass tile to place it."], "zh-Hant": ["放置守衛", "先選動物，再點草地格子放置守衛。"] },
        { icon: "🧟", en: ["Stop Zombies", "Animals attack zombies in the same lane. Do not let zombies reach the yard."], "zh-Hant": ["擋住殭屍", "動物會攻擊同一路線的殭屍，別讓殭屍闖進庭院。"] },
      ],
    },
  };

  function gameIdFromPath() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    const index = parts.indexOf("games");
    return index >= 0 ? parts[index + 1] : "";
  }

  function locale() {
    const value = window.WonderI18n?.locale?.() || localStorage.getItem("weightplayLocale") || "en";
    return value === "zh-Hant" ? "zh-Hant" : "en";
  }

  function textFor(item) {
    return item[locale()] || item.en;
  }

  function seenKey(gameId) {
    return `weightplay_tutorial_seen_${gameId}_v1`;
  }

  function markSeen(gameId) {
    localStorage.setItem(seenKey(gameId), "1");
  }

  function hasSeen(gameId) {
    return localStorage.getItem(seenKey(gameId)) === "1";
  }

  function showTutorial(gameId, fromButton = false) {
    const tutorial = tutorials[gameId];
    if (!tutorial || document.querySelector(".wp-tutorial-backdrop")) return;
    const lang = locale();
    const backdrop = document.createElement("div");
    backdrop.className = "wp-tutorial-backdrop";
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");
    backdrop.innerHTML = `
      <section class="wp-tutorial-card">
        <div class="wp-tutorial-head">
          <strong>${tutorial.title[lang] || tutorial.title.en}</strong>
          <button class="wp-tutorial-close" type="button" aria-label="${common[lang].closeAria}">×</button>
        </div>
        <div class="wp-tutorial-steps">
          ${tutorial.steps.map((step) => {
            const [title, body] = textFor(step);
            return `
              <div class="wp-tutorial-step">
                <div class="wp-tutorial-icon">${step.icon}</div>
                <div class="wp-tutorial-copy">
                  <b>${title}</b>
                  <span>${body}</span>
                </div>
              </div>
            `;
          }).join("")}
        </div>
        <button class="wp-tutorial-action" type="button">${common[lang].close}</button>
      </section>
    `;
    const close = () => {
      markSeen(gameId);
      backdrop.remove();
      window.WonderAnalytics?.track?.("tutorial_close", { game_id: gameId, from_button: fromButton });
    };
    backdrop.querySelector(".wp-tutorial-close").addEventListener("click", close);
    backdrop.querySelector(".wp-tutorial-action").addEventListener("click", close);
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) close();
    });
    document.body.append(backdrop);
    window.WonderAnalytics?.track?.("tutorial_show", { game_id: gameId, from_button: fromButton });
  }

  function loadingIsDone(startTime) {
    const panel = document.getElementById("loadingPanel");
    if (!panel) return true;
    const style = window.getComputedStyle(panel);
    return panel.classList.contains("hidden") || style.display === "none" || Date.now() - startTime > 4200;
  }

  function scheduleFirstShow(gameId) {
    const startTime = Date.now();
    const id = window.setInterval(() => {
      if (!loadingIsDone(startTime)) return;
      window.clearInterval(id);
      showTutorial(gameId);
    }, 250);
  }

  function applyCommonLabels() {
    const lang = locale();
    document.querySelectorAll(".home-link").forEach((link) => {
      link.setAttribute("aria-label", common[lang].lobbyAria);
    });
    document.querySelector(".wp-tutorial-button")?.setAttribute("aria-label", common[lang].aria);
  }

  function install() {
    const gameId = gameIdFromPath();
    if (!tutorials[gameId]) return;
    applyCommonLabels();
    const button = document.createElement("button");
    button.type = "button";
    button.className = "wp-tutorial-button";
    button.textContent = "?";
    button.addEventListener("click", () => showTutorial(gameId, true));
    document.body.append(button);
    applyCommonLabels();
    window.addEventListener("wonder:locale-change", applyCommonLabels);
    if (!hasSeen(gameId)) scheduleFirstShow(gameId);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
})();
