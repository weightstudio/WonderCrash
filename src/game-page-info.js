(function () {
  const games = {
    "wonder-crash": {
      title: "Wonder Crash",
      age: "5+",
      difficulty: "Medium",
      time: "5-8 minutes",
      skills: ["Reaction", "Focus", "Hand-Eye Coordination"],
      intro:
        "Wonder Crash is a mobile-friendly defense game where players move a hero, launch school-supply weapons, and protect a wall from incoming monsters. The game uses short stages, weapon cooldowns, upgrades, and clear win or retry moments so children can practice timing and attention in a playful fantasy setting. It is designed as a fun action game first, with progress tracking and upgrades that make each session feel meaningful without creating pressure.",
      how: ["Move the hero left and right.", "Weapons fire automatically when their cooldowns finish.", "Defeat each wave before the wall is destroyed.", "Use coins and diamonds to improve long-term power."],
      parent:
        "This game is designed for short action practice sessions. It may help children practice reaction, focus, and hand-eye coordination through simple movement and timing. Scores and progress are for fun and local progress tracking only.",
      faq: [
        ["Is Wonder Crash free to play?", "Yes. Wonder Crash runs in the browser on WeightPlay."],
        ["What age is Wonder Crash for?", "It is recommended for age 5+ because it uses timing, upgrades, and simple action choices."],
        ["Does this game measure ability?", "No. It is a game for fun practice and local progress tracking, not a test or diagnosis."],
      ],
    },
    "color-lunchbox": {
      title: "Color Lunchbox",
      age: "3+",
      difficulty: "Easy",
      time: "1-3 minutes",
      skills: ["Color Recognition", "Focus", "Hand-Eye Coordination"],
      intro:
        "Color Lunchbox is a gentle preschool matching game where children place foods into lunchboxes by color. Each stage uses a small set of clear objects and a simple drag or tap interaction. The goal is to make color practice feel like play, with short rounds that parents can understand quickly and children can retry without pressure.",
      how: ["Look at the food item.", "Find the lunchbox with the matching color.", "Drag or tap the item into the correct lunchbox.", "Finish the stage to unlock the next theme."],
      parent:
        "This game may help children practice color recognition, focus, and hand-eye coordination. It is meant for short, relaxed sessions and does not evaluate a child's development.",
      faq: [
        ["Can young children play without reading?", "Yes. The first stages rely mostly on colors and pictures."],
        ["What does this game practice?", "It practices color recognition, attention, and simple matching."],
        ["Are scores formal assessments?", "No. Scores are only for fun and progress tracking."],
      ],
    },
    "bubble-bakery": {
      title: "Bubble Bakery",
      age: "5+",
      difficulty: "Easy",
      time: "3-5 minutes",
      skills: ["Logic", "Problem Solving", "Focus"],
      intro:
        "Bubble Bakery is a cozy puzzle game about tapping matching bubbles to complete bakery orders. Players look for useful groups, manage limited moves, and clear stage goals. The game is simple to start but encourages children and families to think ahead before tapping.",
      how: ["Check the bakery order goal.", "Tap groups of matching bubbles.", "Use each move carefully.", "Clear the order before moves run out."],
      parent:
        "This game may help children practice logic, planning, and focus through short puzzle goals. It is for fun practice and not a formal learning assessment.",
      faq: [
        ["Is Bubble Bakery timed?", "No. The challenge comes from move planning, not speed."],
        ["What skills does it practice?", "It can practice logic, problem solving, and focus."],
        ["Can families play together?", "Yes. It is designed to be easy to discuss and replay."],
      ],
    },
    "star-memory": {
      title: "Star Memory",
      age: "5+",
      difficulty: "Easy",
      time: "3-5 minutes",
      skills: ["Memory", "Focus", "Problem Solving"],
      intro:
        "Star Memory is a card matching game where players remember positions and find pairs. Stages gradually add more cards and different themes, making it a calm way to practice attention and recall. The short stage format makes it suitable for quick play sessions on phones or tablets.",
      how: ["Flip a card to reveal its symbol.", "Remember where each symbol appears.", "Find the matching card pair.", "Clear every pair to finish the stage."],
      parent:
        "This game may help children practice memory and focus through simple matching. Progress feedback is for encouragement and local tracking only.",
      faq: [
        ["What age is Star Memory for?", "It is recommended for age 5+ and family play."],
        ["Does it require fast reactions?", "No. It focuses on remembering positions."],
        ["Can children replay stages?", "Yes. Replaying can help practice memory in a low-pressure way."],
      ],
    },
    "campus-dash": {
      title: "Campus Dash",
      age: "12+",
      difficulty: "Hard",
      time: "1-3 minutes",
      skills: ["Reaction", "Focus", "Hand-Eye Coordination"],
      intro:
        "Campus Dash is a fast lane runner where players move left and right to dodge obstacles and collect points. It is a score-attack game for older players who enjoy quick reactions and replaying to improve. The short timer makes each attempt fast, while local records give players a reason to try again.",
      how: ["Move between lanes.", "Avoid obstacles.", "Collect score items when it is safe.", "Try to improve your local best score."],
      parent:
        "This game is designed for older children and casual players who enjoy fast reaction challenges. It can practice focus and hand-eye coordination, but scores are only for fun.",
      faq: [
        ["Why is Campus Dash 12+?", "It has faster reactions and score pressure than younger-child games."],
        ["Is there a leaderboard?", "The MVP uses local records for replay value."],
        ["Is it an educational test?", "No. It is a reaction game for entertainment and practice."],
      ],
    },
    "snack-blocks": {
      title: "Snack Blocks",
      age: "12+",
      difficulty: "Medium",
      time: "5-8 minutes",
      skills: ["Logic", "Problem Solving", "Focus"],
      intro:
        "Snack Blocks is a stage-based match puzzle game where players use every move to reach score and collection goals. Later stages add new targets and require better planning. It is built for players who enjoy thoughtful puzzle choices and local best-score improvement.",
      how: ["Swap neighboring snacks.", "Make matches of three or more.", "Use all moves to reach the stage goal.", "Replay stages to improve your score."],
      parent:
        "This game may help practice planning, focus, and problem solving. It is more challenging than preschool games and is not a formal education measurement.",
      faq: [
        ["Why should players finish all moves?", "The final score matters, so using the full move count makes records fairer."],
        ["What does Snack Blocks practice?", "It practices planning, pattern recognition, and focus."],
        ["Are scores compared with other children?", "No. Scores are local and supportive."],
      ],
    },
    "fruit-merge": {
      title: "Fruit Merge Tower",
      age: "5+",
      difficulty: "Medium",
      time: "3-5 minutes",
      skills: ["Logic", "Problem Solving", "Hand-Eye Coordination"],
      intro:
        "Fruit Merge Tower is a physics puzzle where matching fruits combine into larger fruits. Players choose where to drop each fruit, watch the pile shift, and try to keep space open. It is easy to understand and gives families a calm score challenge.",
      how: ["Move the fruit above the box.", "Drop it into a good spot.", "Merge matching fruits into the next fruit.", "Keep fruits below the danger line."],
      parent:
        "This game may help children practice planning, spatial reasoning, and hand-eye coordination. It is a casual game and does not measure intelligence.",
      faq: [
        ["What is the goal?", "Merge fruits and score as high as possible before the box fills."],
        ["Is it timed?", "No. Players can think before dropping."],
        ["Can adults enjoy it too?", "Yes. It is family-friendly and replayable."],
      ],
    },
    "garden-tiles": {
      title: "Garden Tile Match",
      age: "Family",
      difficulty: "Relaxed",
      time: "3-5 minutes",
      skills: ["Memory", "Focus", "Problem Solving"],
      intro:
        "Garden Tile Match is a calm matching game with large tiles and no timer. It is designed for relaxed daily play, including older players or families who prefer a quieter pace. The game focuses on simple visual matching and a comfortable interface.",
      how: ["Look for matching garden tiles.", "Tap tiles to select and match.", "Clear the stage at your own pace.", "Move to the next calm puzzle."],
      parent:
        "This game supports relaxed focus and memory practice. It avoids time pressure and is meant for comfort, not performance comparison.",
      faq: [
        ["Is Garden Tile Match timed?", "No. It is designed for calm play."],
        ["Who is it for?", "It is good for family and relaxed casual players."],
        ["Does it rank players?", "No. It focuses on local progress and comfort."],
      ],
    },
    "animal-rescue": {
      title: "Animal Rescue Trail",
      age: "Family",
      difficulty: "Easy",
      time: "3-5 minutes",
      skills: ["Logic", "Problem Solving", "Animal Knowledge"],
      intro:
        "Animal Rescue Trail is a gentle path puzzle where players guide animals home. Each stage asks the player to choose safe routes and think through simple choices. It is designed as a flagship animal game for family-friendly play and channel promotion.",
      how: ["Look at the animal and the route choices.", "Choose a safe path.", "Help the animal reach home.", "Earn stars by making careful choices."],
      parent:
        "This game may help children practice simple logic, animal familiarity, and problem solving. It is gentle and designed for short family sessions.",
      faq: [
        ["What age is Animal Rescue Trail for?", "It supports 3+, 5+, and family play."],
        ["Is reading required?", "The game is designed to rely heavily on pictures and choices."],
        ["What skills does it practice?", "It practices simple route planning and animal knowledge."],
      ],
    },
    "animal-hidden-safari": {
      title: "Animal Hidden Safari",
      age: "5+",
      difficulty: "Easy",
      time: "3-5 minutes",
      skills: ["Focus", "Animal Knowledge", "Problem Solving"],
      intro:
        "Animal Hidden Safari is a calm seek-and-find game where players search playful animal habitats for hidden animals, tracks, fruit, feathers, and other safari clues. Each stage gives a short target list and a bright scene to inspect. Players can use limited hints, replay for better stars, and unlock new habitats without harsh failure pressure. It is designed to help families practice careful looking, focus, and animal recognition through relaxed browser play.",
      how: ["Choose a safari habitat.", "Look at the target list below the scene.", "Tap each hidden animal or object when you find it.", "Use hints if needed and clear the scene to unlock the next habitat."],
      parent:
        "This game may help children practice focus, visual scanning, animal knowledge, and simple problem solving. It is designed for short family-friendly sessions. Stars and best times are for fun and local progress only, not a formal assessment.",
      faq: [
        ["What kind of game is Animal Hidden Safari?", "It is a hidden-object and seek-and-find animal game for browser play."],
        ["Is there a time limit?", "No. The timer is only used for local best-time progress, not harsh failure."],
        ["What age is it for?", "It is recommended for age 5+ and family play."],
        ["What skills does it practice?", "It practices focus, animal knowledge, careful observation, and problem solving."],
      ],
    },
    "animal-guard-yard": {
      title: "Animal Guard Yard",
      age: "5+",
      difficulty: "Medium",
      time: "5-8 minutes",
      skills: ["Logic", "Focus", "Problem Solving"],
      intro:
        "Animal Guard Yard is one of WeightPlay's main animal games. Players place full-body animal guards on lanes, collect sun energy, earn coins, upgrade the team, and stop cartoon zombies across 8 balanced stages. Cats provide steady ranged shots, dogs hold the front as tank melee guards, owls attack quickly with lighter damage, and the diamond fox supports nearby lanes. Recent combat polish adds clearer pacing, warning moments when zombies get close, placement effects, hit sparks, and boss battles so the yard feels active instead of static.",
      how: ["Choose a stage from the game menu.", "Place ranged, melee, and tank animal guards in the best lanes.", "Collect sun energy and react when the warning appears.", "Earn coins, upgrade animals, and unlock the cross-lane fox with diamonds."],
      parent:
        "This game may help children practice planning, focus, and problem solving through friendly lane-defense play. The pacing is designed to feel exciting without being overwhelming, and the cartoon fantasy enemies are not realistic horror. Scores and upgrades are for fun and local progress only.",
      faq: [
        ["Can players upgrade animals?", "Yes. Coins upgrade animal guards, and shared WeightPlay diamonds can unlock the cross-lane fox."],
        ["How many stages are included?", "Animal Guard Yard currently has 8 stages with mixed waves, shield enemies, warning moments, and boss battles."],
        ["Is it scary?", "The zombies are cartoon-style game enemies, not realistic horror."],
        ["What does it practice?", "It practices planning, attention, and simple strategy through ranged, melee, tank, and cross-lane choices."],
        ["Why is it a Hero Game?", "It has animal upgrades, diamonds, stage progression, and a clear series direction for future guards, enemies, and boss abilities."],
      ],
    },
    "animal-quiz": {
      title: "Animal Quiz",
      age: "Family",
      difficulty: "Easy",
      time: "3-5 minutes",
      skills: ["Animal Knowledge", "Memory", "Reading"],
      intro:
        "Animal Quiz is a family-friendly quiz game with themed animal stages. Players answer short questions and learn animal facts through pictures and simple choices. It works best as a parent-child activity, especially for children who enjoy animals.",
      how: ["Choose an animal stage.", "Read or listen with a parent if needed.", "Pick the best answer.", "Clear the questions to complete the stage."],
      parent:
        "This game may help children practice animal knowledge and memory. Younger children may benefit from parent help with reading.",
      faq: [
        ["Is Animal Quiz good for young children?", "Yes with parent support, especially for reading questions."],
        ["What does it practice?", "It practices animal knowledge, memory, and simple reading."],
        ["Are wrong answers punished?", "No. Feedback should stay encouraging."],
      ],
    },
    "zoo-helper-day": {
      title: "Zoo Helper Day",
      age: "3+",
      difficulty: "Easy",
      time: "1-3 minutes",
      skills: ["Animal Knowledge", "Focus", "Hand-Eye Coordination"],
      intro:
        "Zoo Helper Day is a gentle animal-care game where children help zoo animals with food, water, cleaning, and play tasks. Each stage uses simple picture-based actions so young players can understand what to do without heavy reading.",
      how: ["Look at what the animal needs.", "Choose the matching helper item.", "Give the item to the animal.", "Finish each gentle care task."],
      parent:
        "This game may help children practice animal care concepts, focus, and simple hand-eye coordination. It is designed for short and friendly sessions.",
      faq: [
        ["Can a 3-year-old play?", "The game is designed for picture-based preschool play, though parent help is always welcome."],
        ["What does it teach?", "It introduces simple care actions like food, water, and cleaning."],
        ["Does it collect child data?", "No personal child data is needed to play."],
      ],
    },
    "shape-train": {
      title: "Shape Train",
      age: "3+",
      difficulty: "Easy",
      time: "1-3 minutes",
      skills: ["Color Recognition", "Logic", "Hand-Eye Coordination"],
      intro:
        "Shape Train is a preschool matching game where children send colorful shape passengers to the correct train cars. The controls are simple, the goals are visual, and the stages are short enough for early learners.",
      how: ["Look at the shape passenger.", "Find the matching train car.", "Tap or drag the shape to the correct place.", "Complete the train to finish the stage."],
      parent:
        "This game may help young children practice shape matching, colors, and simple hand-eye coordination. It is for playful practice only.",
      faq: [
        ["Does Shape Train require reading?", "No. The main gameplay uses shapes and colors."],
        ["What age is it for?", "It is recommended for age 3+."],
        ["What skills does it practice?", "It practices matching, color recognition, and coordination."],
      ],
    },
    "tiny-weather-rescue": {
      title: "Animal Helper Quest",
      age: "5+",
      difficulty: "Easy",
      time: "3-5 minutes",
      skills: ["Problem Solving", "Animal Knowledge", "Focus"],
      intro:
        "Animal Helper Quest is a simple care puzzle where players choose the right item to help an animal in different situations. The game supports future mission packs about weather, hunger, mud, darkness, and other small daily-life problems.",
      how: ["Look at the animal's problem.", "Choose or drag the helpful item.", "Try another item if it is not right.", "Finish the stage when the animal is happy."],
      parent:
        "This game may help children practice problem solving and animal-care thinking. It keeps feedback gentle and avoids shame when players choose the wrong item.",
      faq: [
        ["What happened to Tiny Weather Rescue?", "It became Animal Helper Quest so the game can include more than weather problems."],
        ["What skills does it practice?", "It practices problem solving, animal knowledge, and focus."],
        ["Is it stressful?", "No. Wrong choices should use gentle feedback and let players try again."],
      ],
    },
  };

  const labels = {
    en: {
      kicker: "WeightPlay Kids Game Guide",
      titleSuffix: "Free Kids Game",
      recommendedAge: "Recommended Age",
      difficulty: "Difficulty",
      estimatedTime: "Estimated Play Time",
      skills: "Skills Trained",
      howToPlay: "How to Play",
      parentNote: "Parent Note",
      progressGuide: "Progress Guide",
      progressNote: "Scores are for fun and local progress tracking only. They are not an IQ test, medical diagnosis, psychological test, or formal school assessment.",
      beginner: "Beginner",
      good: "Good",
      excellent: "Excellent",
      faq: "FAQ",
      relatedGames: "Related Games",
      relatedIntro: "Because this game practices {skill}, try these next:",
      guideLabel: "{title} game information",
    },
    "zh-Hant": {
      kicker: "WeightPlay 兒童遊戲指南",
      titleSuffix: "免費兒童遊戲",
      recommendedAge: "建議年齡",
      difficulty: "難度",
      estimatedTime: "預估遊玩時間",
      skills: "訓練能力",
      howToPlay: "玩法說明",
      parentNote: "家長說明",
      progressGuide: "進步參考",
      progressNote: "分數只用於遊戲樂趣與本機進步紀錄，不是智力測驗、醫療診斷、心理測驗或正式學習評量。",
      beginner: "開始練習",
      good: "表現不錯",
      excellent: "非常棒",
      faq: "常見問題",
      relatedGames: "相關遊戲",
      relatedIntro: "因為這款遊戲會練習 {skill}，也可以試試：",
      guideLabel: "{title} 遊戲資訊",
    },
  };

  const skillLabels = {
    en: {},
    "zh-Hant": {
      Memory: "記憶力",
      Logic: "邏輯",
      Reaction: "反應力",
      Focus: "專注力",
      Math: "數學",
      Reading: "閱讀",
      "Color Recognition": "顏色辨識",
      "Hand-Eye Coordination": "手眼協調",
      "Problem Solving": "問題解決",
      "Animal Knowledge": "動物知識",
    },
  };

  const localizedGames = {
    "zh-Hant": {
      "wonder-crash": {
        title: "奇幻獅子守城",
        difficulty: "中等",
        time: "5-8 分鐘",
        intro: "奇幻獅子守城是 WeightPlay 的動作防衛遊戲。玩家控制獅子主角左右移動，讓橡皮擦、鉛筆等文具武器依照冷卻自動發射，阻止怪物靠近城牆。遊戲包含 30 個關卡、波次推進、武器裝備、合成升級、角色強化、城牆強化與鑽石能力，適合喜歡短時間動作挑戰與逐步變強的玩家。每場戰鬥都需要觀察敵人位置、掌握武器冷卻，並在過關後用金幣與鑽石做長期成長。",
        how: ["拖曳或點擊畫面控制獅子左右移動。", "武器冷卻結束後會自動攻擊敵人。", "守住城牆並擊敗每一波怪物。", "用金幣升級角色、武器與城牆，也可以使用鑽石強化特殊能力。"],
        parent: "這款遊戲可以讓孩子透過短時間動作挑戰練習反應力、專注力與手眼協調。遊戲有升級與關卡進度，但分數、金幣與強化只用於遊戲樂趣和本機進度紀錄，不是正式能力評量。",
        faq: [["奇幻獅子守城適合幾歲？", "建議 5+，因為需要左右移動、觀察冷卻與簡單升級選擇。"], ["可以升級武器嗎？", "可以。玩家可以升級武器，也能透過裝備與合成讓戰鬥變得更有策略。"], ["城牆被打破會怎樣？", "城牆生命歸零就會挑戰失敗，可以回去強化後再試一次。"], ["這款遊戲會評量孩子能力嗎？", "不會。它只是透過遊戲提供反應、專注與手眼協調的趣味練習。"]],
      },
      "snack-blocks": {
        title: "動物零食方塊",
        difficulty: "中等",
        time: "5-8 分鐘",
        intro: "動物零食方塊是 WeightPlay 的關卡式消除益智遊戲。玩家交換相鄰零食方塊，配對三個以上相同圖案來得分並完成收集目標。每一關都有有限步數，玩家需要思考先消哪一組、如何讓方塊掉落形成連鎖，以及如何在步數用完前完成目標。後續關卡會加入不同目標與更需要規劃的版面，讓遊戲不只是時間變長，而是逐步要求更好的觀察與決策。",
        how: ["選擇關卡後觀察本關目標。", "交換相鄰的零食方塊，讓三個以上相同方塊連成一線。", "完成收集或分數目標，同時把所有步數用完來挑戰最佳紀錄。", "重玩關卡可以嘗試更好的消除順序與分數。"],
        parent: "這款遊戲可以讓孩子與家庭玩家練習邏輯、問題解決與專注力。它比幼兒遊戲更需要規劃，但仍是輕鬆的益智遊戲。分數只用於本機進步紀錄與遊戲樂趣，不會和其他孩子比較。",
        faq: [["為什麼要把步數玩完？", "因為最後分數也很重要，使用完整步數可以讓最佳紀錄更公平。"], ["這款遊戲練習什麼能力？", "主要練習邏輯、問題解決、觀察與專注力。"], ["適合幼兒嗎？", "它比較適合 12+ 或親子一起玩，年紀較小的孩子可能需要家長協助。"], ["有排行榜嗎？", "目前以本機最佳紀錄為主，未來可以再規劃平台排行榜。"]],
      },
      "animal-hidden-safari": {
        title: "動物探險找找看",
        difficulty: "簡單",
        time: "3-5 分鐘",
        intro: "動物探險找找看是一款輕鬆的動物找找看遊戲。玩家要在熱鬧的草原、河岸、叢林等棲地場景中，找出藏起來的動物、腳印、果實、羽毛與其他探險線索。每一關都有清楚的目標清單，也可以使用有限次數的提示。遊戲沒有嚴格失敗壓力，適合親子一起慢慢觀察，練習專注、視覺搜尋與動物知識。",
        how: ["選擇一個 Safari 棲地。", "查看畫面下方的尋找目標。", "在場景中找到動物或物件後點一下。", "需要時可以使用提示，完成後解鎖下一個棲地。"],
        parent: "這款遊戲可以讓孩子透過找找看的方式練習專注力、視覺觀察、動物知識與簡單問題解決。星星和最佳時間只用於遊戲樂趣與本機進度紀錄，不是正式能力評量。",
        faq: [["這是什麼類型的遊戲？", "這是一款動物主題的 hidden object / 找找看遊戲。"], ["有時間限制嗎？", "沒有。時間只用來記錄本機最佳時間，不會造成失敗壓力。"], ["適合幾歲？", "建議 5+，也很適合親子一起玩。"], ["可以練習什麼？", "可以練習專注、觀察、動物知識與問題解決。"]],
      },
      "animal-guard-yard": {
        title: "動物守衛庭院",
        difficulty: "中等",
        time: "5-8 分鐘",
        intro: "動物守衛庭院是 WeightPlay 目前主打的動物防衛遊戲之一。玩家要在路線上放置全身動物守衛，收集陽光、賺取金幣、升級隊伍，並在 8 個平衡關卡中擋住卡通殭屍。貓負責穩定遠程攻擊，狗在前線當坦克近戰，貓頭鷹攻速快但傷害較低，鑽石解鎖的狐狸可以支援附近路線。遊戲已加入殭屍靠近警告、放置特效、命中特效與 Boss 戰，讓戰鬥更有節奏感。",
        how: ["從選單選擇關卡。", "把遠程、近戰與坦克動物放在合適路線。", "收集陽光，看到警告時趕快補強防線。", "賺取金幣升級動物，也可以用鑽石解鎖跨線狐狸。"],
        parent: "這款遊戲可以讓孩子透過友善的路線防衛玩法練習規劃、專注與問題解決。節奏設計成有刺激感但不過度壓迫，敵人是卡通幻想殭屍，不是寫實恐怖內容。分數與升級只用於遊戲樂趣和本機進度紀錄。",
        faq: [["可以升級動物嗎？", "可以。金幣可以升級動物守衛，WeightPlay 共用鑽石可以解鎖跨線狐狸。"], ["目前有幾關？", "目前有 8 個關卡，包含混合波次、盾牌敵人、靠近警告與 Boss 戰。"], ["會很恐怖嗎？", "不會。殭屍是卡通風格的遊戲敵人，不是寫實恐怖內容。"], ["可以練習什麼能力？", "可以練習規劃、專注、簡單策略，以及遠程、近戰、坦克與跨線支援的選擇。"], ["為什麼它是主打遊戲？", "它有動物升級、鑽石解鎖、關卡進度與 Boss 戰，很適合發展成 WeightPlay 的長期動物系列。"]],
      },
    },
  };
  function currentGameId() {
    const parts = location.pathname.split("/").filter(Boolean);
    const gameIndex = parts.lastIndexOf("games");
    return gameIndex >= 0 ? parts[gameIndex + 1] : "";
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function locale() {
    return window.WonderI18n?.locale?.() || document.documentElement.lang || "en";
  }

  function uiLabel(key, params = {}) {
    const table = labels[locale()] || labels.en;
    const raw = table[key] || labels.en[key] || key;
    return Object.entries(params).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, String(value)), raw);
  }

  function localizeSkill(skill) {
    const table = skillLabels[locale()] || skillLabels.en;
    return table[skill] || skill;
  }

  function localizeAge(age) {
    return locale() === "zh-Hant" && age === "Family" ? "親子" : age;
  }

  function scoreBandsFor(game) {
    const compact = game.time.includes("1-3");
    const scoreAttack = game.title.includes("Dash") || game.title.includes("Merge") || game.title.includes("Blocks");
    const baseByAge = {
      "3+": compact ? [0, 20, 21, 40, 41] : [0, 30, 31, 55, 56],
      "5+": scoreAttack ? [0, 80, 81, 150, 151] : [0, 40, 41, 70, 71],
      "7+": scoreAttack ? [0, 110, 111, 210, 211] : [0, 55, 56, 95, 96],
      "9+": scoreAttack ? [0, 140, 141, 260, 261] : [0, 70, 71, 120, 121],
      "12+": scoreAttack ? [0, 180, 181, 340, 341] : [0, 90, 91, 150, 151],
      Family: [0, 50, 51, 100, 101],
    };
    return [game.age, "5+", "7+"]
      .filter((age, index, list) => age && list.indexOf(age) === index)
      .slice(0, 3)
      .map((age) => {
        const [b0, b1, g0, g1, e0] = baseByAge[age] || baseByAge["5+"];
        return { age, beginner: `${b0}-${b1}`, good: `${g0}-${g1}`, excellent: `${e0}+` };
      });
  }

  function localizedGame(id) {
    const base = games[id];
    const override = localizedGames[locale()]?.[id] || {};
    return { ...base, ...override, skills: override.skills || base.skills };
  }

  function relatedGames(activeId, activeBaseGame) {
    return Object.entries(games)
      .filter(([id]) => id !== activeId)
      .map(([id, game]) => ({
        id,
        game,
        score: game.skills.filter((skill) => activeBaseGame.skills.includes(skill)).length + (game.age === activeBaseGame.age ? 1 : 0),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || localizedGame(a.id).title.localeCompare(localizedGame(b.id).title))
      .slice(0, 4);
  }

  function gameHref(gameId) {
    const base = location.pathname.includes("/weightplay/") ? "/weightplay/games/" : "/games/";
    return `${base}${gameId}/`;
  }

  function rerenderAfterLocaleSelect() {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(render);
    });
  }

  function render() {
    const id = currentGameId();
    const baseGame = games[id];
    const game = localizedGame(id);
    const main = document.querySelector("main");
    if (!baseGame || !game || !main) return;

    document.querySelector(".game-page-info")?.remove();
    document.querySelector("script[data-game-page-info-jsonld]")?.remove();

    document.body.classList.add("has-game-page-info");
    const related = relatedGames(id, baseGame);
    const scoreBands = scoreBandsFor(baseGame);
    const section = document.createElement("section");
    section.className = "game-page-info";
    section.setAttribute("aria-label", uiLabel("guideLabel", { title: game.title }));
    section.innerHTML = `
      <div class="game-info-hero">
        <div class="game-info-title">
          <span class="game-info-kicker">${escapeHtml(uiLabel("kicker"))}</span>
          <h2>${escapeHtml(game.title)} - ${escapeHtml(uiLabel("titleSuffix"))}</h2>
          <p>${escapeHtml(game.intro)}</p>
        </div>
        <div class="game-info-facts">
          <div class="game-info-fact"><span>${escapeHtml(uiLabel("recommendedAge"))}</span><strong>${escapeHtml(localizeAge(game.age))}</strong></div>
          <div class="game-info-fact"><span>${escapeHtml(uiLabel("difficulty"))}</span><strong>${escapeHtml(game.difficulty)}</strong></div>
          <div class="game-info-fact"><span>${escapeHtml(uiLabel("estimatedTime"))}</span><strong>${escapeHtml(game.time)}</strong></div>
          <div class="game-info-fact"><span>${escapeHtml(uiLabel("skills"))}</span><div class="game-info-skills">${game.skills.map((skill) => `<span>${escapeHtml(localizeSkill(skill))}</span>`).join("")}</div></div>
        </div>
      </div>
      <div class="game-info-sections">
        <div class="game-info-section">
          <h3>${escapeHtml(uiLabel("howToPlay"))}</h3>
          <ol>${game.how.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
        </div>
        <div class="game-info-section game-info-parent">
          <h3>${escapeHtml(uiLabel("parentNote"))}</h3>
          <p>${escapeHtml(game.parent)}</p>
        </div>
        <div class="game-info-section game-info-progress">
          <h3>${escapeHtml(uiLabel("progressGuide"))}</h3>
          <div class="game-info-bands">
            ${scoreBands
              .map(
                (band) => `
                  <div class="game-info-band">
                    <strong>${escapeHtml(localizeAge(band.age))}</strong>
                    <span>${escapeHtml(uiLabel("beginner"))}: ${escapeHtml(band.beginner)}</span>
                    <span>${escapeHtml(uiLabel("good"))}: ${escapeHtml(band.good)}</span>
                    <span>${escapeHtml(uiLabel("excellent"))}: ${escapeHtml(band.excellent)}</span>
                  </div>
                `
              )
              .join("")}
          </div>
          <p>${escapeHtml(uiLabel("progressNote"))}</p>
        </div>
        <div class="game-info-section">
          <h3>${escapeHtml(uiLabel("faq"))}</h3>
          <dl>${game.faq.map(([q, a]) => `<div><dt>${escapeHtml(q)}</dt><dd>${escapeHtml(a)}</dd></div>`).join("")}</dl>
        </div>
        <div class="game-info-section">
          <h3>${escapeHtml(uiLabel("relatedGames"))}</h3>
          <p>${escapeHtml(uiLabel("relatedIntro", { skill: localizeSkill(game.skills[0]) }))}</p>
          <div class="game-info-related">${related.map(({ id: relatedId }) => `<a href="${escapeHtml(gameHref(relatedId))}">${escapeHtml(localizedGame(relatedId).title)}</a>`).join("")}</div>
        </div>
      </div>
    `;
    main.insertAdjacentElement("afterend", section);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: game.faq.map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.gamePageInfoJsonld = "true";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render, { once: true });
  } else {
    render();
  }

  window.addEventListener("wonder:locale-change", render);
  document.addEventListener("change", (event) => {
    if (event.target?.id === "localeSelect") rerenderAfterLocaleSelect();
  });
  document.addEventListener("input", (event) => {
    if (event.target?.id === "localeSelect") rerenderAfterLocaleSelect();
  });
})();
