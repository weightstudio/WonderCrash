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
      "library.all_games": "All Games",
      "library.favorites": "Favorites",
      "section.hero_rank": "Top 3",
      "section.hero_games": "Hero Games",
      "stats.playable": "Playable",
      "stats.hero_games": "Hero Games",
      "stats.animal_games": "Animal Games",
      "stats.age_groups": "Age Groups",
      "daily.kicker": "Daily Gift",
      "daily.title": "Log in and claim today",
      "daily.desc": "Day {count} streak. Claim {coins} Wonder Crash coins.",
      "daily.claim": "Claim",
      "daily.claimed": "Claimed Today",
      "daily.toast": "Claimed {coins} coins. Streak day {count}!",
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
      "library.all_games": "全部遊戲",
      "library.favorites": "我的最愛",
      "section.hero_rank": "前三名",
      "section.hero_games": "主打遊戲",
      "stats.playable": "可遊玩",
      "stats.hero_games": "主打遊戲",
      "stats.animal_games": "動物遊戲",
      "stats.age_groups": "年齡分類",
      "daily.kicker": "每日禮物",
      "daily.title": "今天登入領獎",
      "daily.desc": "連續第 {count} 天，可領 {coins} 枚奇幻守城金幣。",
      "daily.claim": "領取",
      "daily.claimed": "今日已領",
      "daily.toast": "已領取 {coins} 枚金幣，連續第 {count} 天！",
      "daily.toast_claimed": "今天的禮物已經領過了。",
      "status.all_games": "全部遊戲",
      "status.favorite_games": "{count} 個我的最愛",
      "status.favorite_games_one": "1 個我的最愛",
      "status.no_favorites": "還沒有加入我的最愛。",
      "status.no_games": "目前沒有符合篩選的遊戲。",
      "status.games_found_one": "找到 1 款遊戲",
      "status.games_found_many": "找到 {count} 款遊戲",
      "action.play": "開始玩",
      "action.coming_soon": "即將推出",
      "action.add_favorite": "加入我的最愛",
      "action.remove_favorite": "移除我的最愛",
      "toast.favorite_added": "已加入我的最愛：{title}",
      "toast.favorite_removed": "已移除我的最愛：{title}",
      "toast.coming_soon": "{title} 即將推出",
      "language.label": "語言",
      "topic.featured": "精選",
      "topic.animal": "動物遊戲",
      "topic.puzzle": "益智",
      "topic.arcade": "街機",
      "topic.education": "教育",
      "category.Featured": "精選",
      "category.Animal Games": "動物遊戲",
      "category.Puzzle": "益智",
      "category.Arcade": "街機",
      "category.Education": "教育",
      "category.Family": "親子",
      "footer.about": "關於",
      "footer.privacy": "隱私權",
      "footer.contact": "聯絡",
      "footer.terms": "條款",
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
