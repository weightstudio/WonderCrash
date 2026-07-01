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
      aria: "玩法說明",
      lobbyAria: "回到大廳",
    },
  };

  const tutorials = {
    "wonder-crash": {
      title: { en: "Protect the wall.", "zh-Hant": "守住城牆" },
      steps: [
        { icon: "1", en: ["Move", "Tap or drag anywhere to move the hero left and right."], "zh-Hant": ["移動", "點擊或拖曳畫面，讓角色左右移動。"] },
        { icon: "2", en: ["Auto Weapons", "Equipped weapons fire when their cooldown is ready."], "zh-Hant": ["自動攻擊", "裝備的武器冷卻完成後會自動發射。"] },
        { icon: "3", en: ["Win", "Stop monsters before the wall breaks."], "zh-Hant": ["勝利", "在城牆被破壞前擋住怪物。"] },
      ],
    },
    "animal-rescue": {
      title: { en: "Guide animals home.", "zh-Hant": "帶動物回家" },
      steps: [
        { icon: "1", en: ["Choose Nearby", "Tap a nearby tile to move one step."], "zh-Hant": ["選附近格子", "點附近的格子讓動物移動一步。"] },
        { icon: "2", en: ["Collect", "Pick up fruit on the way for more stars."], "zh-Hant": ["收集", "路上拿到水果可以得到更多星星。"] },
        { icon: "3", en: ["Goal", "Reach the home tile to clear the trail."], "zh-Hant": ["目標", "走到家的格子就能完成關卡。"] },
      ],
    },
    "tiny-weather-rescue": {
      title: { en: "Help the animal.", "zh-Hant": "幫助動物" },
      steps: [
        { icon: "1", en: ["Look", "See what the animal needs."], "zh-Hant": ["觀察", "先看動物現在需要什麼。"] },
        { icon: "2", en: ["Help", "Tap a care item, or drag it to the animal."], "zh-Hant": ["幫忙", "點道具，或把道具拖到動物身上。"] },
        { icon: "3", en: ["Clear", "Happy faces mean you helped correctly."], "zh-Hant": ["完成", "出現笑臉就代表幫對了。"] },
      ],
    },
    "snack-blocks": {
      title: { en: "Match snacks.", "zh-Hant": "消除零食" },
      steps: [
        { icon: "1", en: ["Swap", "Tap or drag a snack to swap with a neighbor."], "zh-Hant": ["交換", "點擊或拖曳零食，和旁邊的零食交換。"] },
        { icon: "2", en: ["Match", "Line up 3 or more of the same snack to clear them."], "zh-Hant": ["配對", "讓 3 個以上相同零食連成一線即可消除。"] },
        { icon: "3", en: ["Goal", "Use all moves, then the stage checks your goal."], "zh-Hant": ["目標", "把步數用完後，關卡會檢查是否達成目標。"] },
      ],
    },
    "fruit-merge": {
      title: { en: "Merge bigger fruits.", "zh-Hant": "合成更大的水果" },
      steps: [
        { icon: "1", en: ["Aim", "Move your finger or mouse to choose where the fruit drops."], "zh-Hant": ["瞄準", "移動手指或滑鼠，選擇水果掉落位置。"] },
        { icon: "2", en: ["Drop", "Release or tap Drop to let the fruit fall."], "zh-Hant": ["投下", "放開或按下投放，讓水果掉下去。"] },
        { icon: "3", en: ["Merge", "Two matching fruits merge into the next fruit. Do not pass the red line."], "zh-Hant": ["合成", "兩顆相同水果會合成下一種水果，不要超過紅線。"] },
      ],
    },
    "garden-tiles": {
      title: { en: "Relax and match.", "zh-Hant": "放鬆配對" },
      steps: [
        { icon: "1", en: ["Look", "All tiles are open. Take your time and find two matching pictures."], "zh-Hant": ["觀察", "所有方塊都看得到，慢慢找出相同圖案。"] },
        { icon: "2", en: ["Match", "Tap two matching garden tiles to remove them."], "zh-Hant": ["配對", "點兩個相同的花園方塊即可移除。"] },
        { icon: "3", en: ["Clear", "Clear every pair to finish the level. There is no timer."], "zh-Hant": ["完成", "配對所有方塊就能過關，沒有倒數壓力。"] },
      ],
    },
    "campus-dash": {
      title: { en: "Dodge in three lanes.", "zh-Hant": "三路閃避" },
      steps: [
        { icon: "1", en: ["Move", "Swipe or tap left and right lanes to move."], "zh-Hant": ["移動", "左右滑動或點擊跑道來移動。"] },
        { icon: "2", en: ["Avoid", "Dodge obstacles and stay on the open lane."], "zh-Hant": ["閃避", "避開障礙物，保持在安全路線。"] },
        { icon: "3", en: ["Score", "Survive longer to beat your best score."], "zh-Hant": ["分數", "撐得越久越能挑戰自己的最佳分數。"] },
      ],
    },
    "animal-quiz": {
      title: { en: "Answer animal questions.", "zh-Hant": "回答動物問題" },
      steps: [
        { icon: "1", en: ["Question", "Look at the animal picture and question."], "zh-Hant": ["題目", "看動物圖片和問題。"] },
        { icon: "2", en: ["Answer", "Tap the answer you think is right."], "zh-Hant": ["回答", "點選你覺得正確的答案。"] },
        { icon: "3", en: ["Stage", "Finish 10 questions to clear a stage."], "zh-Hant": ["關卡", "完成 10 題就能通過一個關卡。"] },
      ],
    },
    "color-lunchbox": {
      title: { en: "Sort food by color.", "zh-Hant": "依顏色分類食物" },
      steps: [
        { icon: "1", en: ["Look", "Check each food color."], "zh-Hant": ["觀察", "先看每個食物的顏色。"] },
        { icon: "2", en: ["Drag", "Drag food into the matching lunchbox."], "zh-Hant": ["拖曳", "把食物拖到相同顏色的便當盒。"] },
        { icon: "3", en: ["Clear", "Sort everything correctly to finish."], "zh-Hant": ["完成", "全部分類正確就能過關。"] },
      ],
    },
    "star-memory": {
      title: { en: "Find matching cards.", "zh-Hant": "找到相同卡片" },
      steps: [
        { icon: "1", en: ["Flip", "Tap a card to reveal it."], "zh-Hant": ["翻牌", "點一張卡片把它翻開。"] },
        { icon: "2", en: ["Match", "Find two cards with the same picture."], "zh-Hant": ["配對", "找出兩張相同圖片的卡片。"] },
        { icon: "3", en: ["Clear", "Match all pairs with fewer moves for more stars."], "zh-Hant": ["完成", "用越少步數完成，星星越多。"] },
      ],
    },
    "shape-train": {
      title: { en: "Load the shape train.", "zh-Hant": "裝載形狀小火車" },
      steps: [
        { icon: "1", en: ["Look", "Check the shape the train needs."], "zh-Hant": ["觀察", "看小火車需要哪一種形狀。"] },
        { icon: "2", en: ["Choose", "Tap or drag the matching shape."], "zh-Hant": ["選擇", "點擊或拖曳相同形狀。"] },
        { icon: "3", en: ["Help", "Finish all shape friends to clear."], "zh-Hant": ["完成", "把所有形狀朋友送上車就能過關。"] },
      ],
    },
    "bubble-bakery": {
      title: { en: "Fill bakery orders.", "zh-Hant": "完成烘焙訂單" },
      steps: [
        { icon: "1", en: ["Find Groups", "Tap 2 or more matching bubbles that touch."], "zh-Hant": ["找群組", "點擊 2 個以上連在一起的相同泡泡。"] },
        { icon: "2", en: ["Collect", "Clear the colors shown in the order bar."], "zh-Hant": ["收集", "清掉訂單列需要的顏色。"] },
        { icon: "3", en: ["Plan", "Use your moves carefully before they run out."], "zh-Hant": ["規劃", "步數有限，點擊前先想一下。"] },
      ],
    },
    "animal-zoo-idle": {
      title: { en: "Grow your zoo.", "zh-Hant": "經營動物樂園" },
      steps: [
        { icon: "1", en: ["Collect", "Tap Collect to gather coins from each habitat."], "zh-Hant": ["收取", "點擊收取，取得每個棲地產生的金幣。"] },
        { icon: "2", en: ["Care", "Tap Care to make animals happy and earn extra coins."], "zh-Hant": ["照顧", "點擊照顧，讓動物開心並獲得額外金幣。"] },
        { icon: "3", en: ["Upgrade", "Upgrade habitats and unlock more animal friends."], "zh-Hant": ["升級", "升級棲地，慢慢解鎖更多動物朋友。"] },
      ],
    },
    "zoo-helper-day": {
      title: { en: "Help zoo animals.", "zh-Hant": "幫助動物園動物" },
      steps: [
        { icon: "1", en: ["Need", "Look at what the animal needs."], "zh-Hant": ["需求", "看動物現在需要什麼。"] },
        { icon: "2", en: ["Help", "Choose the matching care item."], "zh-Hant": ["幫忙", "選擇正確的照顧道具。"] },
        { icon: "3", en: ["Clear", "Help enough animals to finish the stage."], "zh-Hant": ["完成", "幫助足夠的動物就能過關。"] },
      ],
    },
    "animal-guard-yard": {
      title: { en: "Guard the yard.", "zh-Hant": "守衛庭院" },
      steps: [
        { icon: "1", en: ["Collect Sun", "Tap sun drops to gain energy for animal guards."], "zh-Hant": ["收集陽光", "點擊陽光取得放置動物守衛的能量。"] },
        { icon: "2", en: ["Place Guards", "Choose an animal, then tap a grass tile to place it."], "zh-Hant": ["放置守衛", "選擇動物，再點草地格子放置。"] },
        { icon: "3", en: ["Stop Enemies", "Animals attack enemies in their lanes. Do not let enemies reach the yard."], "zh-Hant": ["阻止敵人", "動物會攻擊路線上的敵人，不要讓敵人進入庭院。"] },
      ],
    },
    "animal-hidden-safari": {
      title: { en: "Find hidden animals.", "zh-Hant": "找出藏起來的動物" },
      steps: [
        { icon: "1", en: ["Look", "Check the target list below the scene."], "zh-Hant": ["觀察", "先看下方清單，知道這一關要找什麼。"] },
        { icon: "2", en: ["Find", "Tap animals or safari clues when you spot them."], "zh-Hant": ["尋找", "看到動物或探險線索時，直接點一下。"] },
        { icon: "?", en: ["Hint", "Use a hint if one target is hard to see."], "zh-Hant": ["提示", "真的找不到時，可以使用提示幫忙。"] },
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
    const labels = common[lang] || common.en;
    const backdrop = document.createElement("div");
    backdrop.className = "wp-tutorial-backdrop";
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");
    backdrop.innerHTML = `
      <section class="wp-tutorial-card">
        <div class="wp-tutorial-head">
          <strong>${tutorial.title[lang] || tutorial.title.en}</strong>
          <button class="wp-tutorial-close" type="button" aria-label="${labels.closeAria}">×</button>
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
        <button class="wp-tutorial-action" type="button">${labels.close}</button>
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
    const labels = common[lang] || common.en;
    document.querySelectorAll(".home-link").forEach((link) => {
      link.setAttribute("aria-label", labels.lobbyAria);
    });
    document.querySelector(".wp-tutorial-button")?.setAttribute("aria-label", labels.aria);
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
