(() => {
  const common = {
    en: {
      close: "Start Playing",
      closeAria: "Close tutorial",
      aria: "How to play",
      lobbyAria: "Back to lobby",
    },
    "zh-Hant": {
      close: "開始遊玩",
      closeAria: "關閉教學",
      aria: "玩法說明",
      lobbyAria: "回到大廳",
    },
  };

  const tutorials = {
    "wonder-crash": {
      title: { en: "Protect the wall.", "zh-Hant": "守住城牆。" },
      steps: [
        { icon: "1", en: ["Move", "Tap or drag anywhere to move the hero left and right."], "zh-Hant": ["移動", "點擊或拖曳畫面，讓角色左右移動。"] },
        { icon: "2", en: ["Auto Weapons", "Equipped weapons fire when cooldown is ready."], "zh-Hant": ["自動武器", "裝備的武器冷卻完成後會自動攻擊。"] },
        { icon: "3", en: ["Win", "Stop enemies before the wall breaks."], "zh-Hant": ["勝利", "在城牆被破壞前擋住敵人。"] },
      ],
    },
    "animal-rescue": {
      title: { en: "Guide animals home.", "zh-Hant": "帶動物回家。" },
      steps: [
        { icon: "1", en: ["Choose Nearby", "Tap a nearby tile to move one step."], "zh-Hant": ["選附近", "點選旁邊的格子移動一步。"] },
        { icon: "2", en: ["Collect", "Pick up fruit on the way for more stars."], "zh-Hant": ["收集", "路上收集水果可以拿到更多星星。"] },
        { icon: "3", en: ["Goal", "Reach the home tile to clear the trail."], "zh-Hant": ["目標", "抵達家的格子就能過關。"] },
      ],
    },
    "tiny-weather-rescue": {
      title: { en: "Help the animal.", "zh-Hant": "幫助動物。" },
      steps: [
        { icon: "1", en: ["Look", "See what the animal needs."], "zh-Hant": ["觀察", "看動物現在需要什麼幫忙。"] },
        { icon: "2", en: ["Help", "Tap or drag the matching care item."], "zh-Hant": ["幫忙", "點選或拖曳正確的照顧道具。"] },
        { icon: "3", en: ["Clear", "A happy face means you helped correctly."], "zh-Hant": ["完成", "看到笑臉就代表幫對了。"] },
      ],
    },
    "snack-blocks": {
      title: { en: "Match snacks.", "zh-Hant": "消除動物零食。" },
      steps: [
        { icon: "1", en: ["Swap", "Tap or drag a snack to swap with a neighbor."], "zh-Hant": ["交換", "點選或拖曳零食，和旁邊交換。"] },
        { icon: "2", en: ["Match", "Line up 3 or more of the same snack to clear them."], "zh-Hant": ["消除", "三個以上相同零食連成一排就會消除。"] },
        { icon: "3", en: ["Goal", "Use your moves, then the stage checks your goal."], "zh-Hant": ["目標", "用完步數後，關卡會檢查是否達成目標。"] },
      ],
    },
    "fruit-merge": {
      title: { en: "Merge bigger animals.", "zh-Hant": "合成更大的動物。" },
      steps: [
        { icon: "1", en: ["Aim", "Move your finger or mouse to choose where the animal drops."], "zh-Hant": ["瞄準", "移動手指或滑鼠，選擇落下位置。"] },
        { icon: "2", en: ["Drop", "Release or tap Drop to let it fall."], "zh-Hant": ["落下", "放開或按下落下，讓牠掉進場內。"] },
        { icon: "3", en: ["Merge", "Two matching animals merge into the next one. Do not pass the line."], "zh-Hant": ["合成", "兩個相同動物會合成下一階，不要超過警戒線。"] },
      ],
    },
    "garden-tiles": {
      title: { en: "Relax and match.", "zh-Hant": "輕鬆配對。" },
      steps: [
        { icon: "1", en: ["Look", "All tiles are open. Find two matching pictures."], "zh-Hant": ["觀察", "所有圖案都打開，慢慢找相同的兩張。"] },
        { icon: "2", en: ["Match", "Tap two matching tiles to remove them."], "zh-Hant": ["配對", "點兩張相同圖案就能消除。"] },
        { icon: "3", en: ["Clear", "Clear every pair to finish. There is no timer."], "zh-Hant": ["完成", "配對全部圖案即可過關，沒有倒數壓力。"] },
      ],
    },
    "campus-dash": {
      title: { en: "Dodge in three lanes.", "zh-Hant": "三線閃避。" },
      steps: [
        { icon: "1", en: ["Move", "Swipe or tap left and right lanes to move."], "zh-Hant": ["移動", "左右滑動或點擊跑道來移動。"] },
        { icon: "2", en: ["Avoid", "Dodge obstacles and stay on the open lane."], "zh-Hant": ["閃避", "避開障礙物，保持在安全跑道。"] },
        { icon: "3", en: ["Score", "Survive longer to beat your best score."], "zh-Hant": ["分數", "撐得越久，越有機會刷新最佳紀錄。"] },
      ],
    },
    "animal-quiz": {
      title: { en: "Answer animal questions.", "zh-Hant": "回答動物問題。" },
      steps: [
        { icon: "1", en: ["Question", "Look at the animal picture and question."], "zh-Hant": ["題目", "看動物圖片和題目。"] },
        { icon: "2", en: ["Answer", "Tap the answer you think is right."], "zh-Hant": ["作答", "點選你覺得正確的答案。"] },
        { icon: "3", en: ["Stage", "Finish 10 questions to clear a stage."], "zh-Hant": ["關卡", "完成 10 題即可過關。"] },
      ],
    },
    "color-lunchbox": {
      title: { en: "Sort food by color.", "zh-Hant": "依照顏色分類。" },
      steps: [
        { icon: "1", en: ["Look", "Check each food color."], "zh-Hant": ["觀察", "看清楚每個食物的顏色。"] },
        { icon: "2", en: ["Drag", "Drag food into the matching lunchbox."], "zh-Hant": ["拖曳", "把食物拖到相同顏色的便當盒。"] },
        { icon: "3", en: ["Clear", "Sort everything correctly to finish."], "zh-Hant": ["完成", "全部分類正確就能過關。"] },
      ],
    },
    "star-memory": {
      title: { en: "Find matching cards.", "zh-Hant": "找出相同卡片。" },
      steps: [
        { icon: "1", en: ["Flip", "Tap a card to reveal it."], "zh-Hant": ["翻牌", "點卡片把圖案翻開。"] },
        { icon: "2", en: ["Match", "Find two cards with the same picture."], "zh-Hant": ["配對", "找出兩張相同圖片。"] },
        { icon: "3", en: ["Clear", "Match all pairs with fewer moves for more stars."], "zh-Hant": ["完成", "用更少步數完成，可以拿更多星星。"] },
      ],
    },
    "shape-train": {
      title: { en: "Load the shape train.", "zh-Hant": "裝上形狀列車。" },
      steps: [
        { icon: "1", en: ["Look", "Check the shape the train needs."], "zh-Hant": ["觀察", "看列車需要哪一種形狀。"] },
        { icon: "2", en: ["Choose", "Tap or drag the matching shape."], "zh-Hant": ["選擇", "點選或拖曳相同形狀。"] },
        { icon: "3", en: ["Help", "Finish all shape friends to clear."], "zh-Hant": ["完成", "幫所有形狀朋友上車即可過關。"] },
      ],
    },
    "bubble-bakery": {
      title: { en: "Fill bakery orders.", "zh-Hant": "完成泡泡訂單。" },
      steps: [
        { icon: "1", en: ["Find Groups", "Tap 2 or more matching connected bubbles."], "zh-Hant": ["找群組", "點擊 2 顆以上相連的相同泡泡。"] },
        { icon: "2", en: ["Collect", "Clear the colors shown in the order bar."], "zh-Hant": ["收集", "消除訂單列需要的泡泡顏色。"] },
        { icon: "3", en: ["Plan", "Use your moves carefully before they run out."], "zh-Hant": ["規劃", "步數有限，先想好再消除。"] },
      ],
    },
    "animal-zoo-idle": {
      title: { en: "Open your safari park.", "zh-Hant": "開放你的草原樂園。" },
      steps: [
        { icon: "1", en: ["Visitors", "Visitors walk in and leave ticket money in the box."], "zh-Hant": ["遊客", "遊客會走進樂園，並把票錢放進票箱。"] },
        { icon: "2", en: ["Feed", "Feed the lion or giraffe to raise happiness and attract more visitors."], "zh-Hant": ["餵食", "餵獅子或長頸鹿，提高幸福感並吸引更多遊客。"] },
        { icon: "3", en: ["Upgrade", "Use coins to upgrade the meadow and invite the giraffe."], "zh-Hant": ["升級", "用金幣升級草原，並邀請長頸鹿加入。"] },
      ],
    },
    "zoo-helper-day": {
      title: { en: "Help zoo animals.", "zh-Hant": "幫助動物園動物。" },
      steps: [
        { icon: "1", en: ["Need", "Look at what the animal needs."], "zh-Hant": ["需求", "觀察動物需要什麼。"] },
        { icon: "2", en: ["Help", "Choose the matching care item."], "zh-Hant": ["幫忙", "選擇正確的照顧道具。"] },
        { icon: "3", en: ["Clear", "Help enough animals to finish the stage."], "zh-Hant": ["完成", "幫助足夠的動物即可過關。"] },
      ],
    },
    "animal-guard-yard": {
      title: { en: "Guard the yard.", "zh-Hant": "守護庭院。" },
      steps: [
        { icon: "1", en: ["Collect Sun", "Tap sun drops to gain energy for animal guards."], "zh-Hant": ["收陽光", "點擊陽光，取得放置動物守衛的能量。"] },
        { icon: "2", en: ["Place Guards", "Choose an animal, then tap a grass tile to place it."], "zh-Hant": ["放守衛", "選擇動物，再點草地格子放置。"] },
        { icon: "3", en: ["Stop Enemies", "Animals attack enemies in their lanes. Do not let enemies enter the yard."], "zh-Hant": ["阻止敵人", "動物會攻擊路線上的敵人，不要讓敵人進入庭院。"] },
      ],
    },
    "animal-hidden-safari": {
      title: { en: "Find hidden animals.", "zh-Hant": "找出躲藏的動物。" },
      steps: [
        { icon: "1", en: ["Look", "Check the target list below the scene."], "zh-Hant": ["觀察", "先看場景下方的目標清單。"] },
        { icon: "2", en: ["Find", "Tap animals or safari clues when you spot them."], "zh-Hant": ["尋找", "看到動物或草原線索就點擊。"] },
        { icon: "?", en: ["Hint", "Use a hint if one target is hard to see."], "zh-Hant": ["提示", "找不到時可以使用提示。"] },
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
