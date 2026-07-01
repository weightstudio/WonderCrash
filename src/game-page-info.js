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
    "animal-guard-yard": {
      title: "Animal Guard Yard",
      age: "5+",
      difficulty: "Medium",
      time: "5-8 minutes",
      skills: ["Logic", "Focus", "Problem Solving"],
      intro:
        "Animal Guard Yard is a lane defense game where players place animal guards, earn coins, upgrade animals, and stop cartoon zombies. It combines simple strategy with clear stage goals and boss fights. The game is more complete than a tiny demo and can grow into a long-term Animal Games series.",
      how: ["Choose a stage.", "Place animal guards in lanes.", "Collect energy and stop zombies.", "Upgrade animals and unlock stronger options."],
      parent:
        "This game may help children practice planning, focus, and problem solving through friendly lane-defense play. It uses cartoon fantasy enemies and avoids realistic violence.",
      faq: [
        ["Can players upgrade animals?", "Yes. Coins and diamonds can unlock or improve animal guards."],
        ["Is it scary?", "The zombies are cartoon-style game enemies, not realistic horror."],
        ["What does it practice?", "It practices planning, attention, and simple strategy."],
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
      faq: "常見問題",
      relatedGames: "相關遊戲",
      relatedIntro: "因為這款遊戲會練習「{skill}」，也可以試試這些遊戲：",
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
        title: "奇幻守城",
        difficulty: "中等",
        time: "5-8 分鐘",
        intro: "奇幻守城是一款手機友善的防守遊戲，玩家左右移動主角，自動投擲學用品武器，保護城牆不被怪物攻破。遊戲有短關卡、武器冷卻、角色與城牆升級，以及清楚的勝利與重試節奏，適合練習反應、專注與手眼協調。它是一款有成長感的動作遊戲，但分數與進度只作為遊戲樂趣與本機紀錄，不作為能力測驗。",
        how: ["左右移動主角。", "武器冷卻完成後會自動發射。", "在城牆被破壞前擊退每一波怪物。", "使用金幣與鑽石強化長期能力。"],
        parent: "這款遊戲適合短時間動作練習，可能幫助孩子練習反應、專注與手眼協調。所有分數與進度只用於遊戲鼓勵與本機紀錄。",
        faq: [["奇幻守城可以免費玩嗎？", "可以。奇幻守城可直接在 WeightPlay 瀏覽器中遊玩。"], ["適合幾歲？", "建議 5+，因為需要簡單走位、升級與時機判斷。"], ["這會測量孩子能力嗎？", "不會。這是遊戲與練習紀錄，不是測驗或診斷。"]],
      },
      "color-lunchbox": {
        title: "顏色便當盒",
        difficulty: "簡單",
        time: "1-3 分鐘",
        intro: "顏色便當盒是一款溫和的幼兒顏色配對遊戲，孩子把食物放進相同顏色的便當盒。每關使用少量清楚物件與簡單拖曳或點選操作，讓顏色練習像玩遊戲一樣自然。關卡短、回饋明確，家長可以很快看懂孩子正在練習什麼，也能放心讓孩子反覆嘗試。",
        how: ["觀察畫面上的食物。", "找到相同顏色的便當盒。", "把食物拖曳或點到正確盒子。", "完成關卡後解鎖下一個主題。"],
        parent: "這款遊戲可能幫助孩子練習顏色辨識、專注與手眼協調。它適合短時間輕鬆遊玩，不評量孩子發展狀況。",
        faq: [["不會閱讀的小孩可以玩嗎？", "可以。前面關卡主要依靠顏色與圖片。"], ["會練習什麼？", "會練習顏色辨識、注意力與簡單配對。"], ["分數是正式評量嗎？", "不是。分數只用於遊戲樂趣與進步紀錄。"]],
      },
      "bubble-bakery": {
        title: "泡泡烘焙坊",
        difficulty: "簡單",
        time: "3-5 分鐘",
        intro: "泡泡烘焙坊是一款溫暖風格的益智遊戲，玩家點擊相同泡泡群組來完成烘焙訂單。遊戲沒有急迫時間壓力，重點是觀察哪些群組最有幫助，以及如何在有限步數內完成目標。它容易開始，但也能鼓勵孩子與家人一起思考下一步。",
        how: ["先看烘焙訂單目標。", "點擊相同顏色或種類的泡泡群組。", "小心使用每一步。", "在步數用完前完成訂單。"],
        parent: "這款遊戲可能幫助孩子練習邏輯、規劃與專注。它是遊戲式練習，不是正式學習評量。",
        faq: [["泡泡烘焙坊有時間限制嗎？", "沒有。挑戰主要來自步數規劃。"], ["會練習哪些能力？", "可能練習邏輯、問題解決與專注力。"], ["適合親子一起玩嗎？", "適合，玩法容易討論，也方便重玩。"]],
      },
      "star-memory": {
        title: "星星翻翻牌",
        difficulty: "簡單",
        time: "3-5 分鐘",
        intro: "星星翻翻牌是一款翻牌配對遊戲，玩家記住圖案位置並找出相同配對。關卡會逐步增加卡片與主題，提供平靜的記憶與注意力練習。短關卡很適合手機或平板上的快速遊玩，也適合親子一起觀察與討論。",
        how: ["翻開一張卡片。", "記住每個圖案的位置。", "找出相同圖案的配對。", "配對所有卡片即可完成關卡。"],
        parent: "這款遊戲可能幫助孩子練習記憶與專注。進步回饋只用於鼓勵與本機紀錄。",
        faq: [["星星翻翻牌適合幾歲？", "建議 5+ 或親子一起玩。"], ["需要很快反應嗎？", "不需要，重點是記住位置。"], ["可以重玩關卡嗎？", "可以，重玩能用低壓方式練習記憶。"]],
      },
      "campus-dash": {
        title: "校園閃電跑",
        difficulty: "困難",
        time: "1-3 分鐘",
        intro: "校園閃電跑是一款節奏較快的三路線跑酷遊戲，玩家左右移動閃避障礙並收集分數。它偏向高分挑戰，適合較大的孩子或喜歡快速反應的休閒玩家。每次遊玩時間短，本機最佳紀錄能讓玩家有明確的重玩目標。",
        how: ["在不同路線間移動。", "避開障礙物。", "安全時收集加分物件。", "嘗試刷新自己的本機最佳分數。"],
        parent: "這款遊戲適合較大的孩子與休閒玩家，主要練習反應、專注與手眼協調。分數只供遊戲樂趣使用。",
        faq: [["為什麼是 12+？", "因為反應速度與分數壓力比低齡遊戲更高。"], ["有排行榜嗎？", "目前 MVP 使用本機紀錄。"], ["這是教育測驗嗎？", "不是，它是反應遊戲。"]],
      },
      "snack-blocks": {
        title: "零食方塊",
        difficulty: "中等",
        time: "5-8 分鐘",
        intro: "零食方塊是一款闖關式三消益智遊戲，玩家利用固定步數達成分數與收集目標。後續關卡會加入不同任務，要求玩家更仔細規劃每一步。它適合喜歡思考配對、累積分數與挑戰關卡的玩家。",
        how: ["交換相鄰零食。", "排出三個以上相同零食。", "使用所有步數達成關卡目標。", "重玩關卡挑戰更高分。"],
        parent: "這款遊戲可能幫助練習規劃、專注與問題解決。它比幼兒遊戲更有挑戰性，但不作為正式能力測量。",
        faq: [["為什麼要把步數玩完？", "最終分數會被記錄，玩完整步數比較公平。"], ["會練習什麼？", "會練習規劃、圖案辨識與專注。"], ["會和其他孩子比較嗎？", "不會，回饋以本機紀錄與鼓勵為主。"]],
      },
      "fruit-merge": {
        title: "合成水果塔",
        difficulty: "中等",
        time: "3-5 分鐘",
        intro: "合成水果塔是一款物理合成益智遊戲，相同水果碰在一起會合成更大的水果。玩家要選擇水果落點，觀察水果堆如何移動，並盡量保留空間。玩法直覺、節奏輕鬆，適合家庭一起挑戰分數。",
        how: ["移動盒子上方的水果。", "選擇好位置後放下。", "讓相同水果合成下一階水果。", "避免水果超過危險線。"],
        parent: "這款遊戲可能幫助孩子練習空間判斷、規劃與手眼協調。它是休閒遊戲，不測量智力。",
        faq: [["目標是什麼？", "合成更大的水果並在盒子滿之前取得高分。"], ["有時間限制嗎？", "沒有，玩家可以思考後再放下水果。"], ["大人也能玩嗎？", "可以，這是一款親子友善的重玩型遊戲。"]],
      },
      "garden-tiles": {
        title: "花園方塊配對",
        difficulty: "輕鬆",
        time: "3-5 分鐘",
        intro: "花園方塊配對是一款安靜的配對遊戲，使用大尺寸方塊且沒有時間壓力。它適合想要放鬆遊玩的家庭、長輩或休閒玩家。遊戲重點是清楚的視覺配對與舒服的操作介面。",
        how: ["尋找相同的花園方塊。", "點選方塊進行配對。", "照自己的速度清除關卡。", "進入下一個輕鬆謎題。"],
        parent: "這款遊戲支援放鬆的專注與記憶練習，避免時間壓力，也不比較玩家表現。",
        faq: [["有時間限制嗎？", "沒有，設計目標是輕鬆遊玩。"], ["適合誰？", "適合家庭、長輩與休閒玩家。"], ["會排名嗎？", "不會，重點是本機進度與舒適體驗。"]],
      },
      "animal-rescue": {
        title: "動物回家路",
        difficulty: "簡單",
        time: "3-5 分鐘",
        intro: "動物回家路是一款溫和的路線選擇遊戲，玩家幫助動物找到安全回家的路。每個關卡都要觀察路線與情境，做出簡單判斷。它是 WeightPlay 動物主題的重要作品之一，適合親子與頻道宣傳。",
        how: ["觀察動物與路線選項。", "選擇安全的道路。", "幫動物回到家。", "用仔細選擇獲得星星。"],
        parent: "這款遊戲可能幫助孩子練習簡單邏輯、動物熟悉度與問題解決，適合短時間親子遊玩。",
        faq: [["適合幾歲？", "支援 3+、5+ 與親子一起玩。"], ["需要閱讀嗎？", "遊戲盡量以圖片與選擇為主。"], ["會練習什麼？", "會練習簡單路線規劃與動物知識。"]],
      },
      "animal-guard-yard": {
        title: "動物守衛庭院",
        difficulty: "中等",
        time: "5-8 分鐘",
        intro: "動物守衛庭院是一款路線防守遊戲，玩家放置動物守衛、賺取金幣、升級動物，並阻止卡通殭屍前進。遊戲結合簡單策略、清楚關卡目標與 Boss 戰，未來可以成長為 WeightPlay 的長期動物系列。",
        how: ["選擇關卡。", "把動物守衛放在路線格子上。", "收集能量並阻止殭屍。", "升級或解鎖更強動物。"],
        parent: "這款遊戲可能幫助孩子練習規劃、專注與簡單策略。敵人是卡通幻想風格，避免寫實暴力。",
        faq: [["可以升級動物嗎？", "可以，金幣與鑽石可用於解鎖或強化動物守衛。"], ["會很可怕嗎？", "不會，殭屍是卡通遊戲敵人，不是寫實恐怖。"], ["會練習什麼？", "會練習規劃、注意力與簡單策略。"]],
      },
      "animal-quiz": {
        title: "動物小博士",
        difficulty: "簡單",
        time: "3-5 分鐘",
        intro: "動物小博士是一款親子友善的動物問答遊戲，玩家透過主題關卡回答短問題並認識動物知識。遊戲結合圖片與簡單選項，適合喜歡動物的孩子與家長一起遊玩。",
        how: ["選擇動物主題關卡。", "需要時由家長協助閱讀。", "選出最合適的答案。", "完成題目即可通過關卡。"],
        parent: "這款遊戲可能幫助孩子練習動物知識與記憶。較小的孩子可以由家長協助閱讀。",
        faq: [["小朋友適合玩嗎？", "適合，若還不熟閱讀可由家長陪同。"], ["會練習什麼？", "會練習動物知識、記憶與簡單閱讀。"], ["答錯會被懲罰嗎？", "不會，回饋應保持鼓勵。"]],
      },
      "zoo-helper-day": {
        title: "動物園幫手日",
        difficulty: "簡單",
        time: "1-3 分鐘",
        intro: "動物園幫手日是一款溫和的動物照顧遊戲，孩子幫動物完成餵食、喝水、清潔與玩耍任務。每個關卡都使用圖片式操作，讓年幼玩家不用大量閱讀也能理解目標。",
        how: ["觀察動物需要什麼。", "選擇合適的幫手道具。", "把道具交給動物。", "完成每個友善照顧任務。"],
        parent: "這款遊戲可能幫助孩子認識簡單動物照顧概念、專注與手眼協調，適合短時間友善遊玩。",
        faq: [["3 歲可以玩嗎？", "設計方向是圖片式幼兒玩法，但家長陪伴會更好。"], ["會教什麼？", "介紹食物、水、清潔等簡單照顧行為。"], ["會收集孩子資料嗎？", "不需要個人資料即可遊玩。"]],
      },
      "shape-train": {
        title: "形狀小火車",
        difficulty: "簡單",
        time: "1-3 分鐘",
        intro: "形狀小火車是一款幼兒配對遊戲，孩子把彩色形狀乘客送到正確車廂。操作簡單、目標清楚，關卡長度也適合早期學習者短時間練習。",
        how: ["觀察形狀乘客。", "找到相符的火車車廂。", "點選或拖曳到正確位置。", "完成火車即可過關。"],
        parent: "這款遊戲可能幫助幼兒練習形狀配對、顏色與手眼協調。它是遊戲式練習，不是測驗。",
        faq: [["需要閱讀嗎？", "不需要，主要玩法使用形狀與顏色。"], ["適合幾歲？", "建議 3+。"], ["會練習什麼？", "會練習配對、顏色辨識與協調。"]],
      },
      "tiny-weather-rescue": {
        title: "動物幫手任務",
        difficulty: "簡單",
        time: "3-5 分鐘",
        intro: "動物幫手任務是一款簡單的照顧益智遊戲，玩家根據動物遇到的狀況選擇合適道具。未來可以擴充成天氣、飢餓、泥巴、黑暗等不同任務包，讓每關有更多變化。",
        how: ["觀察動物遇到的問題。", "選擇或拖曳有幫助的道具。", "如果不正確就換另一個試試。", "讓動物開心即可完成關卡。"],
        parent: "這款遊戲可能幫助孩子練習問題解決與動物照顧思考。錯誤選擇會以溫和方式回饋，避免羞辱感。",
        faq: [["小小天氣救援去哪了？", "它改成動物幫手任務，讓關卡不只侷限天氣。"], ["會練習什麼？", "會練習問題解決、動物知識與專注。"], ["會有壓力嗎？", "不會，錯了可以再試。"]],
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
