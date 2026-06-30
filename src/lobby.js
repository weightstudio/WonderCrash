const lobby = window.WONDER_LOBBY;
const filterButtons = document.querySelectorAll("[data-age-filter]");
const topicButtons = document.querySelectorAll("[data-topic-filter]");
const libraryButtons = document.querySelectorAll("[data-library-tab]");
const gameGrid = document.querySelector("#gameGrid");
const heroGames = document.querySelector("#heroGames");
const heroGamesSection = document.querySelector("#heroGamesSection");
const lobbyStats = document.querySelector("#lobbyStats");
const featuredGame = document.querySelector("#featuredGame");
const lobbyToast = document.querySelector("#lobbyToast");
const platformTitle = document.querySelector("#platformTitle");
const platformSubtitle = document.querySelector("#platformSubtitle");
const filterStatus = document.querySelector("#filterStatus");
const lobbyKicker = document.querySelector("#lobbyKicker");
const featuredLabel = document.querySelector("#featuredLabel");
const languageLabel = document.querySelector("#languageLabel");
const localeSelect = document.querySelector("#localeSelect");
const heroRankLabel = document.querySelector("#heroRankLabel");
const heroGamesTitle = document.querySelector("#heroGamesTitle");
const dailyReward = document.querySelector("#dailyReward");
const i18n = window.WonderI18n;
const favoritesKey = "weightplayFavoriteGames";
const dailyRewardKey = "weightplayDailyReward";
const wonderProfileKey = "wonderCrashProfile";
let activeFilter = "all";
let activeTopic = "all";
let activeLibrary = "all";
let toastTimer = null;
let favoriteGameIds = readFavorites();

function text(value) {
  return i18n.getLocalized(value);
}

function categoryText(category) {
  return i18n.t(`category.${category}`);
}

function readFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(favoritesKey) || "[]");
    return Array.isArray(saved) ? saved.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(favoritesKey, JSON.stringify(favoriteGameIds));
  } catch {
    // Favorite storage is optional.
  }
}

function isFavorite(gameId) {
  return favoriteGameIds.includes(gameId);
}

function openGame(game, title, ageLabel) {
  window.WonderSound?.play("click");
  window.WonderAnalytics?.track("game_open", {
    game_id: game.id,
    game_title: title,
    age_label: ageLabel,
    categories: (game.categories || []).join(","),
    locale: i18n.locale(),
    from_library: activeLibrary,
  });
  window.location.href = game.href;
}

function toggleFavorite(game, title) {
  const wasFavorite = isFavorite(game.id);
  favoriteGameIds = wasFavorite ? favoriteGameIds.filter((id) => id !== game.id) : [...favoriteGameIds, game.id];
  saveFavorites();
  window.WonderSound?.play("click");
  window.WonderAnalytics?.track(wasFavorite ? "favorite_remove" : "favorite_add", {
    game_id: game.id,
    game_title: title,
    locale: i18n.locale(),
  });
  showToast(i18n.t(wasFavorite ? "toast.favorite_removed" : "toast.favorite_added", { title }));
  renderLobby();
}

function createGameCard(game) {
  const isPlayable = game.status === "playable";
  const title = text(game.title);
  const type = text(game.type);
  const ageLabel = text(game.ageLabel);
  const card = document.createElement("article");
  const favorite = isFavorite(game.id);
  card.className = `game-card ${isPlayable ? "playable" : "coming-soon"}`;
  card.dataset.age = game.ages.join(" ");
  card.dataset.topic = (game.categories || []).join("|");
  card.dataset.gameId = game.id;
  card.dataset.favorite = favorite ? "true" : "false";

  if (isPlayable) {
    card.tabIndex = 0;
    card.setAttribute("role", "link");
    card.addEventListener("click", () => {
      openGame(game, title, ageLabel);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openGame(game, title, ageLabel);
      }
    });
  } else {
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.addEventListener("click", () => showPlannedGame(game));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showPlannedGame(game);
      }
    });
  }

  const meta = text(game.meta).map((item) => `<span>${item}</span>`).join("");
  const categoryBadges = (game.categories || []).map((item) => `<span>${categoryText(item)}</span>`).join("");
  const showHero = game.art.hero && !game.art.hideHero && !game.art.hero.includes("width='1'");
  const art =
    game.art.kind === "image"
      ? `<div class="game-card-art image-art"><img class="game-card-bg-blur" src="${game.art.background}" alt="" /><img class="game-card-fg" src="${game.art.background}" alt="" />${showHero ? `<img class="game-card-hero" src="${game.art.hero}" alt="" />` : ""}</div>`
      : `<div class="game-card-art ${game.art.className}"><span>${ageLabel}</span></div>`;

  card.innerHTML = `
    ${art}
    <button class="favorite-toggle ${favorite ? "active" : ""}" type="button" aria-label="${i18n.t(favorite ? "action.remove_favorite" : "action.add_favorite")}" title="${i18n.t(favorite ? "action.remove_favorite" : "action.add_favorite")}">${favorite ? "♥" : "♡"}</button>
    <div class="game-card-body">
      <div class="game-card-topline">
        <span class="age-pill">${ageLabel}</span>
        <span>${text(game.statusText)}</span>
      </div>
      <h2>${title}</h2>
      <p>${text(game.description)}</p>
      <div class="game-card-categories">${categoryBadges}</div>
      <div class="game-card-meta">${meta}</div>
      <div class="game-card-actions">
        <span>${isPlayable ? i18n.t("action.play") : i18n.t("action.coming_soon")}</span>
        <span>${type}</span>
      </div>
    </div>
  `;

  card.querySelector(".favorite-toggle").addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(game, title);
  });

  return card;
}

function renderLobby() {
  applyStaticTranslations();
  platformTitle.textContent = lobby.platform.name;
  platformSubtitle.textContent = text(lobby.platform.subtitle);

  const playableCount = lobby.games.filter((game) => game.status === "playable").length;
  const heroCount = lobby.heroGameIds.length;
  const ageGroups = new Set(lobby.games.flatMap((game) => game.ages));
  const animalCount = lobby.games.filter((game) => (game.categories || []).includes("Animal Games")).length;
  lobbyStats.innerHTML = `
    <div><strong>${playableCount}</strong><span>${i18n.t("stats.playable")}</span></div>
    <div><strong>${heroCount}</strong><span>${i18n.t("stats.hero_games")}</span></div>
    <div><strong>${animalCount}</strong><span>${i18n.t("stats.animal_games")}</span></div>
    <div><strong>${ageGroups.size}</strong><span>${i18n.t("stats.age_groups")}</span></div>
  `;

  renderDailyReward();

  const featured = lobby.games.find((game) => game.id === lobby.featuredGameId);
  if (featured) {
    featuredGame.href = featured.href;
    featuredGame.querySelector("img").src = featured.art.hero || "assets/hero.png";
    featuredGame.querySelector("strong").textContent = text(featured.title);
  }

  renderHeroGames();
  gameGrid.replaceChildren(...lobby.games.map(createGameCard));
  applyFilter();
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dayNumber(dateKey) {
  if (!dateKey) return 0;
  const [year, month, day] = dateKey.split("-").map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / 86400000);
}

function readDailyReward() {
  try {
    const saved = JSON.parse(localStorage.getItem(dailyRewardKey) || "{}");
    return {
      lastClaimDate: typeof saved.lastClaimDate === "string" ? saved.lastClaimDate : "",
      streak: Math.max(0, Number(saved.streak) || 0),
      totalClaims: Math.max(0, Number(saved.totalClaims) || 0),
    };
  } catch {
    return { lastClaimDate: "", streak: 0, totalClaims: 0 };
  }
}

function getDailyRewardState() {
  const saved = readDailyReward();
  const today = getLocalDateKey();
  const yesterdayNumber = dayNumber(today) - 1;
  const lastNumber = dayNumber(saved.lastClaimDate);
  const claimedToday = saved.lastClaimDate === today;
  const streak = claimedToday ? saved.streak : lastNumber === yesterdayNumber ? saved.streak + 1 : 1;
  const reward = 30 + Math.min(6, Math.max(0, streak - 1)) * 10;
  return { ...saved, today, claimedToday, streak, reward };
}

function renderDailyReward() {
  if (!dailyReward) return;
  const reward = getDailyRewardState();
  dailyReward.innerHTML = `
    <div class="daily-reward-copy">
      <span>${i18n.t("daily.kicker")}</span>
      <strong>${i18n.t("daily.title")}</strong>
      <small>${i18n.t("daily.desc", { count: reward.streak, coins: reward.reward })}</small>
    </div>
    <button type="button" ${reward.claimedToday ? "disabled" : ""}>
      <span>${reward.claimedToday ? i18n.t("daily.claimed") : i18n.t("daily.claim")}</span>
      <b>+${reward.reward}</b>
    </button>
  `;
  dailyReward.querySelector("button")?.addEventListener("click", claimDailyReward);
}

function claimDailyReward() {
  const reward = getDailyRewardState();
  if (reward.claimedToday) {
    showToast(i18n.t("daily.toast_claimed"));
    return;
  }
  grantWonderCrashCoins(reward.reward);
  localStorage.setItem(
    dailyRewardKey,
    JSON.stringify({
      lastClaimDate: reward.today,
      streak: reward.streak,
      totalClaims: reward.totalClaims + 1,
    }),
  );
  window.WonderSound?.play("success");
  window.WonderAnalytics?.track("daily_reward_claim", {
    reward_type: "wonder_crash_coins",
    reward_amount: reward.reward,
    streak: reward.streak,
    locale: i18n.locale(),
  });
  renderDailyReward();
  showToast(i18n.t("daily.toast", { coins: reward.reward, count: reward.streak }));
}

function grantWonderCrashCoins(amount) {
  try {
    const profile = JSON.parse(localStorage.getItem(wonderProfileKey) || "{}");
    profile.coins = Math.max(0, Number(profile.coins) || 0) + amount;
    localStorage.setItem(wonderProfileKey, JSON.stringify(profile));
  } catch {
    localStorage.setItem(wonderProfileKey, JSON.stringify({ coins: amount }));
  }
}

function renderHeroGames() {
  const cards = lobby.heroGameIds
    .map((id) => lobby.games.find((game) => game.id === id))
    .filter(Boolean)
    .map((game, index) => {
      const isPlayable = game.status === "playable";
      const title = text(game.title);
      const type = text(game.type);
      const ageLabel = text(game.ageLabel);
      const card = document.createElement(isPlayable ? "a" : "button");
      card.className = `hero-game-card ${isPlayable ? "playable" : "planned"}`;
      card.type = isPlayable ? undefined : "button";
      if (isPlayable) {
        card.href = game.href;
      } else {
        card.addEventListener("click", () => showPlannedGame(game));
      }
      card.innerHTML = `
        <div class="hero-game-art">
          <img src="${game.art?.background || game.art?.hero || "assets/hero.png"}" alt="" />
          <span>#${index + 1}</span>
        </div>
        <div class="hero-game-copy">
          <strong>${title}</strong>
          <small>${type} · ${ageLabel}</small>
        </div>
      `;
      return card;
    });

  heroGames.replaceChildren(...cards);
}

function applyFilter() {
  let visibleCount = 0;
  document.querySelectorAll("[data-age]").forEach((card) => {
    const ages = card.dataset.age.split(" ");
    const topics = card.dataset.topic ? card.dataset.topic.split("|") : [];
    const matchesAge = activeFilter === "all" || ages.includes(activeFilter);
    const matchesTopic = activeTopic === "all" || topics.includes(activeTopic);
    const matchesLibrary = activeLibrary === "all" || card.dataset.favorite === "true";
    const isVisible = matchesAge && matchesTopic && matchesLibrary;
    card.classList.toggle("hidden", !isVisible);
    if (isVisible) visibleCount += 1;
  });

  const isFiltered = activeFilter !== "all" || activeTopic !== "all" || activeLibrary !== "all";
  heroGamesSection.classList.toggle("hidden", isFiltered);
  filterStatus.classList.toggle("empty", visibleCount === 0);

  if (visibleCount === 0) {
    filterStatus.textContent = activeLibrary === "favorites" ? i18n.t("status.no_favorites") : i18n.t("status.no_games");
  } else if (activeLibrary === "favorites" && activeFilter === "all" && activeTopic === "all") {
    filterStatus.textContent = i18n.t(visibleCount > 1 ? "status.favorite_games" : "status.favorite_games_one", {
      count: visibleCount,
    });
  } else if (isFiltered) {
    filterStatus.textContent = i18n.t(visibleCount > 1 ? "status.games_found_many" : "status.games_found_one", {
      count: visibleCount,
    });
  } else {
    filterStatus.textContent = i18n.t("status.all_games");
  }
}

function applyStaticTranslations() {
  lobbyKicker.textContent = i18n.t("site.kicker");
  featuredLabel.textContent = i18n.t("site.featured");
  languageLabel.textContent = i18n.t("language.label");
  heroRankLabel.textContent = i18n.t("section.hero_rank");
  heroGamesTitle.textContent = i18n.t("section.hero_games");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = i18n.t(element.dataset.i18n);
  });
  localeSelect.value = i18n.locale();
}

function showToast(message) {
  clearTimeout(toastTimer);
  lobbyToast.textContent = message;
  lobbyToast.classList.remove("hidden");
  toastTimer = setTimeout(() => lobbyToast.classList.add("hidden"), 1500);
}

function showPlannedGame(game) {
  window.WonderSound?.play("wrong");
  window.WonderAnalytics?.track("planned_game_click", {
    game_id: game.id,
    game_title: text(game.title),
    age_label: text(game.ageLabel),
    categories: (game.categories || []).join(","),
    locale: i18n.locale(),
  });
  showToast(i18n.t("toast.coming_soon", { title: text(game.title) }));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.ageFilter;

    window.WonderSound?.play("click");
    window.WonderAnalytics?.track("age_filter", { age_filter: activeFilter, locale: i18n.locale() });
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    applyFilter();
  });
});

topicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeTopic = button.dataset.topicFilter;

    window.WonderSound?.play("click");
    window.WonderAnalytics?.track("topic_filter", { topic_filter: activeTopic, locale: i18n.locale() });
    topicButtons.forEach((item) => item.classList.toggle("active", item === button));
    applyFilter();
  });
});

libraryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeLibrary = button.dataset.libraryTab;

    window.WonderSound?.play("click");
    window.WonderAnalytics?.track("library_tab", { library_tab: activeLibrary, locale: i18n.locale() });
    libraryButtons.forEach((item) => item.classList.toggle("active", item === button));
    applyFilter();
  });
});

localeSelect.addEventListener("change", () => {
  window.WonderSound?.play("click");
  i18n.setLocale(localeSelect.value);
});

localeSelect.addEventListener("input", () => {
  window.WonderSound?.play("click");
  i18n.setLocale(localeSelect.value);
});

window.addEventListener("wonder:locale-change", renderLobby);

renderLobby();
window.WonderAnalytics?.track("lobby_ready", {
  playable_games: lobby.games.filter((game) => game.status === "playable").length,
  total_games: lobby.games.length,
  platform: lobby.platform.name,
  locale: i18n.locale(),
});
