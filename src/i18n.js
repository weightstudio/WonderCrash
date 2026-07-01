(function () {
  const config = window.WONDER_SITE?.localization || {};
  const localeKey = "weightPlayLocale";
  const fallbackLocale = config.fallbackLocale || "en";
  const supportedLocales = config.phaseOneLocales || ["en", "zh-Hant"];

  const dictionaries = {
    en: {
      "site.kicker": "Kids & Family Games",
      "site.featured": "Featured",
      "filter.all_ages": "All Ages",
      "filter.family": "Family",
      "filter.all_topics": "All Topics",
      "filter.all_skills": "All Skills",
      "library.all_games": "All Games",
      "library.favorites": "Favorites",
      "section.hero_rank": "Top 3",
      "section.hero_games": "Popular Games",
      "stats.playable": "Playable",
      "stats.total_games": "Total Games",
      "stats.hero_games": "Hero Games",
      "stats.animal_games": "Animal Games",
      "stats.age_groups": "Age Groups",
      "stats.plays_7d_short": "7-Day Plays",
      "stats.plays_7d": "{count} plays in {days}d",
      "stats.collecting": "Collecting play stats",
      "wallet.diamonds": "Diamonds",
      "daily.kicker": "WeightPlay Daily",
      "daily.title": "7-Day Login Gifts",
      "daily.desc": "Streak day {count}. Today is Day {day}: {diamonds} diamonds.",
      "daily.day": "Day {day}",
      "daily.done": "Done",
      "daily.next": "Next",
      "daily.claim": "Claim",
      "daily.claimed": "Claimed Today",
      "daily.toast": "Claimed {diamonds} diamonds. Streak day {count}!",
      "daily.toast_claimed": "Today's gift has already been claimed.",
      "status.all_games": "All games",
      "status.favorite_games": "{count} favorite games",
      "status.favorite_games_one": "1 favorite game",
      "status.no_favorites": "No favorite games yet.",
      "status.no_games": "No games match this filter yet.",
      "status.games_found_one": "1 game found",
      "status.games_found_many": "{count} games found",
      "action.play": "Play",
      "action.coming_soon": "Coming Soon",
      "action.add_favorite": "Add to favorites",
      "action.remove_favorite": "Remove from favorites",
      "action.add_favorite_title": "Add {title} to favorites",
      "action.remove_favorite_title": "Remove {title} from favorites",
      "toast.favorite_added": "Added {title} to favorites",
      "toast.favorite_removed": "Removed {title} from favorites",
      "toast.coming_soon": "{title} is coming soon",
      "language.label": "Language",
      "topic.featured": "Featured",
      "topic.animal": "Animal Games",
      "topic.puzzle": "Puzzle",
      "topic.arcade": "Arcade",
      "topic.education": "Education",
      "category.Featured": "Featured",
      "category.Animal Games": "Animal Games",
      "category.Puzzle": "Puzzle",
      "category.Arcade": "Arcade",
      "category.Education": "Education",
      "category.Family": "Family",
      "skill.Reaction": "Reaction",
      "skill.Focus": "Focus",
      "skill.Hand-Eye Coordination": "Hand-Eye Coordination",
      "skill.Color Recognition": "Color Recognition",
      "skill.Logic": "Logic",
      "skill.Problem Solving": "Problem Solving",
      "skill.Memory": "Memory",
      "skill.Animal Knowledge": "Animal Knowledge",
      "skill.Math": "Math",
      "skill.Reading": "Reading",
      "footer.about": "About",
      "footer.privacy": "Privacy",
      "footer.contact": "Contact",
      "footer.terms": "Terms",
      "footer.copyright": "Copyright 2026 WeightStudio. All rights reserved.",
    },
    "zh-Hant": {
      "site.kicker": "兒童與親子遊戲",
      "site.featured": "主打推薦",
      "filter.all_ages": "全部年齡",
      "filter.family": "親子",
      "filter.all_topics": "全部主題",
      "filter.all_skills": "全部能力",
      "library.all_games": "全部遊戲",
      "library.favorites": "我的最愛",
      "section.hero_rank": "前三名",
      "section.hero_games": "熱門遊戲",
      "stats.playable": "可遊玩",
      "stats.total_games": "總遊戲數",
      "stats.hero_games": "主打遊戲",
      "stats.animal_games": "動物遊戲",
      "stats.age_groups": "年齡分類",
      "stats.plays_7d_short": "7 日遊玩",
      "stats.plays_7d": "{days} 天內 {count} 次遊玩",
      "stats.collecting": "統計資料收集中",
      "wallet.diamonds": "鑽石",
      "daily.kicker": "WeightPlay 每日",
      "daily.title": "七日登入禮物",
      "daily.desc": "連續第 {count} 天。今天是第 {day} 天：可領 {diamonds} 顆鑽石。",
      "daily.day": "第 {day} 天",
      "daily.done": "已領",
      "daily.next": "下一天",
      "daily.claim": "領取",
      "daily.claimed": "今日已領",
      "daily.toast": "已領取 {diamonds} 顆鑽石，連續第 {count} 天！",
      "daily.toast_claimed": "今天的禮物已經領取過了。",
      "status.all_games": "全部遊戲",
      "status.favorite_games": "{count} 個最愛遊戲",
      "status.favorite_games_one": "1 個最愛遊戲",
      "status.no_favorites": "還沒有加入我的最愛。",
      "status.no_games": "目前沒有符合篩選的遊戲。",
      "status.games_found_one": "找到 1 款遊戲",
      "status.games_found_many": "找到 {count} 款遊戲",
      "action.play": "開始玩",
      "action.coming_soon": "即將推出",
      "action.add_favorite": "加入最愛",
      "action.remove_favorite": "移除最愛",
      "action.add_favorite_title": "將 {title} 加入最愛",
      "action.remove_favorite_title": "將 {title} 從最愛移除",
      "toast.favorite_added": "已加入最愛：{title}",
      "toast.favorite_removed": "已移除最愛：{title}",
      "toast.coming_soon": "{title} 即將推出",
      "language.label": "語言",
      "topic.featured": "主打",
      "topic.animal": "動物遊戲",
      "topic.puzzle": "益智",
      "topic.arcade": "街機",
      "topic.education": "教育",
      "category.Featured": "主打",
      "category.Animal Games": "動物遊戲",
      "category.Puzzle": "益智",
      "category.Arcade": "街機",
      "category.Education": "教育",
      "category.Family": "親子",
      "skill.Reaction": "反應",
      "skill.Focus": "專注",
      "skill.Hand-Eye Coordination": "手眼協調",
      "skill.Color Recognition": "顏色辨識",
      "skill.Logic": "邏輯",
      "skill.Problem Solving": "問題解決",
      "skill.Memory": "記憶",
      "skill.Animal Knowledge": "動物知識",
      "skill.Math": "數學",
      "skill.Reading": "閱讀",
      "footer.about": "關於我們",
      "footer.privacy": "隱私權",
      "footer.contact": "聯絡我們",
      "footer.terms": "使用條款",
      "footer.copyright": "Copyright 2026 WeightStudio. All rights reserved.",
    },
  };

  function getSavedLocale() {
    try {
      const saved = localStorage.getItem(localeKey);
      if (saved && supportedLocales.includes(saved)) return saved;
    } catch {
      // Locale storage is optional.
    }
    return config.defaultLocale || fallbackLocale;
  }

  let currentLocale = getSavedLocale();

  function interpolate(value, params) {
    return Object.entries(params || {}).reduce((text, [key, replacement]) => {
      return text.replaceAll(`{${key}}`, String(replacement));
    }, value);
  }

  function t(key, params) {
    const dictionary = dictionaries[currentLocale] || dictionaries[fallbackLocale] || {};
    const fallback = dictionaries[fallbackLocale] || {};
    return interpolate(dictionary[key] || fallback[key] || key, params);
  }

  function getLocalized(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return value;
    return value[currentLocale] || value[fallbackLocale] || Object.values(value)[0] || "";
  }

  function setLocale(locale) {
    if (!supportedLocales.includes(locale)) return;
    if (locale === currentLocale) return;
    currentLocale = locale;
    document.documentElement.lang = locale;
    try {
      localStorage.setItem(localeKey, locale);
    } catch {
      // Locale storage is optional.
    }
    window.dispatchEvent(new CustomEvent("wonder:locale-change", { detail: { locale } }));
    window.WonderAnalytics?.track("locale_change", { locale });
  }

  function locale() {
    return currentLocale;
  }

  document.documentElement.lang = currentLocale;

  window.WonderI18n = {
    t,
    getLocalized,
    locale,
    setLocale,
    supportedLocales,
    fallbackLocale,
  };
})();
