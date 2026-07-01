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
const walletBar = document.querySelector("#walletBar");
const dailyRewardTrack = [5, 6, 8, 10, 12, 15, 25];
let activeFilter = "all";
let activeTopic = "all";
let activeLibrary = "all";
let toastTimer = null;
let favoriteGameIds = readFavorites();
let gameStats = { source: "pending", windowDays: 7, totals: { plays7d: 0, playsTotal: 0, users7d: 0 }, games: {} };

function text(value) {
  return i18n.getLocalized(value);
}

function primaryArt(game) {
  const hero = game.art?.hero || "";
  if (hero && !hero.includes("width='1'")) return hero;
  return game.art?.background || "assets/hero.png";
}

function categoryText(category) {
  return i18n.t(`category.${category}`);
}

function skillText(skill) {
  return i18n.t(`skill.${skill}`);
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

function statFor(game) {
  return gameStats.games?.[game.id] || { plays7d: 0, playsTotal: 0, users7d: 0, rank7d: null };
}

function hasRealStats() {
  return gameStats.source === "ga4" && Number(gameStats.totals?.plays7d || 0) > 0;
}

function hasStatsFeed() {
  return gameStats.source === "ga4";
}

function formatCount(value) {
  return new Intl.NumberFormat(i18n.locale(), { notation: "compact", maximumFractionDigits: 1 }).format(Number(value) || 0);
}

function playCountText(game) {
  const stats = statFor(game);
  if (!hasStatsFeed()) return i18n.t("stats.collecting");
  return i18n.t("stats.plays_7d", { count: formatCount(stats.plays7d || 0), days: gameStats.windowDays || 7 });
}

function popularGames(limit = 3) {
  const playableGames = lobby.games.filter((game) => game.status === "playable");
  if (!hasRealStats()) {
    return lobby.heroGameIds.map((id) => playableGames.find((game) => game.id === id)).filter(Boolean).slice(0, limit);
  }
  return [...playableGames]
    .sort((a, b) => {
      const aStats = statFor(a);
      const bStats = statFor(b);
      return (bStats.plays7d || 0) - (aStats.plays7d || 0) || (bStats.playsTotal || 0) - (aStats.playsTotal || 0);
    })
    .slice(0, limit);
}

async function loadGameStats() {
  try {
    const response = await fetch("src/game-stats.json?v=20260630-stats1", { cache: "no-store" });
    if (!response.ok) return;
    const stats = await response.json();
    if (!stats || typeof stats !== "object") return;
    gameStats = {
      source: stats.source || "pending",
      windowDays: Number(stats.windowDays) || 7,
      totals: stats.totals || { plays7d: 0, playsTotal: 0, users7d: 0 },
      games: stats.games || {},
    };
    renderLobby();
  } catch {
    // Stats are optional and must never block the lobby.
  }
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
  card.dataset.skill = (game.skills || []).join("|");
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
  const skillBadges = (game.skills || []).slice(0, 3).map((item) => `<span>${skillText(item)}</span>`).join("");
  const showHero = game.art.hero && !game.art.hideHero && !game.art.hero.includes("width='1'");
  const art =
    game.art.kind === "image"
      ? `<div class="game-card-art image-art"><img class="game-card-bg-blur" src="${game.art.background}" alt="" /><img class="game-card-fg" src="${game.art.background}" alt="" />${showHero ? `<img class="game-card-hero" src="${game.art.hero}" alt="" />` : ""}</div>`
      : `<div class="game-card-art ${game.art.className}"><span>${ageLabel}</span></div>`;
  const favoriteAction = i18n.t(favorite ? "action.remove_favorite" : "action.add_favorite");
  const favoriteLabel = i18n.t(favorite ? "action.remove_favorite_title" : "action.add_favorite_title", { title });

  card.innerHTML = `
    ${art}
    <button class="favorite-toggle ${favorite ? "active" : ""}" type="button" aria-label="${favoriteLabel}" title="${favoriteAction}">
      <svg class="favorite-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 20.4 10.7 19.2C5.8 14.8 3 12.2 3 8.9 3 6.2 5.1 4.1 7.8 4.1 9.3 4.1 10.8 4.8 11.8 5.9 12.8 4.8 14.3 4.1 15.8 4.1 18.5 4.1 20.6 6.2 20.6 8.9 20.6 12.2 17.8 14.8 12.9 19.2L12 20.4Z" />
      </svg>
    </button>
    <div class="game-card-body">
      <div class="game-card-topline">
        <span class="age-pill">${ageLabel}</span>
        <span>${text(game.statusText)}</span>
      </div>
      <h2>${title}</h2>
      <p>${text(game.description)}</p>
      <div class="game-card-categories">${categoryBadges}</div>
      ${skillBadges ? `<div class="game-card-skills" aria-label="Skills trained">${skillBadges}</div>` : ""}
      <div class="game-card-meta">${meta}</div>
      <div class="game-card-plays">${playCountText(game)}</div>
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
  renderWallet();

  const playableCount = lobby.games.filter((game) => game.status === "playable").length;
  const topPlayCount = Number(gameStats.totals?.plays7d || 0);
  const ageGroups = new Set(lobby.games.flatMap((game) => game.ages));
  const animalCount = lobby.games.filter((game) => (game.categories || []).includes("Animal Games")).length;
  lobbyStats.innerHTML = `
    <div><strong>${playableCount}</strong><span>${i18n.t("stats.playable")}</span></div>
    <div><strong>${hasStatsFeed() ? formatCount(topPlayCount) : "..."}</strong><span>${i18n.t("stats.plays_7d_short")}</span></div>
    <div><strong>${animalCount}</strong><span>${i18n.t("stats.animal_games")}</span></div>
    <div><strong>${ageGroups.size}</strong><span>${i18n.t("stats.age_groups")}</span></div>
  `;

  renderDailyReward();

  const featured = lobby.games.find((game) => game.id === lobby.featuredGameId);
  if (featured) {
    featuredGame.href = featured.href;
    featuredGame.querySelector("img").src = primaryArt(featured);
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
  const dayIndex = (Math.max(1, streak) - 1) % dailyRewardTrack.length;
  const reward = dailyRewardTrack[dayIndex];
  return { ...saved, today, claimedToday, streak, dayIndex, reward };
}

function renderDailyReward() {
  if (!dailyReward) return;
  const reward = getDailyRewardState();
  const claimLabel = reward.claimedToday ? i18n.t("daily.claimed") : i18n.t("daily.claim");
  const rewardCards = dailyRewardTrack
    .map((coins, index) => {
      const isCurrent = index === reward.dayIndex;
      const isPast = reward.claimedToday ? index <= reward.dayIndex : index < reward.dayIndex;
      const canClaim = isCurrent && !reward.claimedToday;
      const className = ["daily-day", isCurrent ? "current" : "", isPast ? "claimed" : "", canClaim ? "claimable" : ""].filter(Boolean).join(" ");
      const dayLabel = i18n.t("daily.day", { day: index + 1 });
      const statusLabel = isCurrent ? claimLabel : i18n.t(isPast ? "daily.done" : "daily.next");
      const ariaLabel = `${dayLabel}, +${coins} ${i18n.t("wallet.diamonds")}, ${statusLabel}`;
      return `
        <button class="${className}" type="button" aria-label="${ariaLabel}" ${canClaim ? 'data-daily-claim="true"' : "disabled"}>
          <span>${dayLabel}</span>
          <b>+${coins}</b>
          <small>${statusLabel}</small>
        </button>
      `;
    })
    .join("");
  dailyReward.innerHTML = `
    <div class="daily-reward-copy">
      <span>${i18n.t("daily.kicker")}</span>
      <strong>${i18n.t("daily.title")}</strong>
      <small>${i18n.t("daily.desc", { count: reward.streak, day: reward.dayIndex + 1, diamonds: reward.reward })}</small>
    </div>
    <div class="daily-track">${rewardCards}</div>
  `;
  dailyReward.querySelector("[data-daily-claim]")?.addEventListener("click", claimDailyReward);
}

function claimDailyReward() {
  const reward = getDailyRewardState();
  if (reward.claimedToday) {
    showToast(i18n.t("daily.toast_claimed"));
    return;
  }
  window.WeightPlayWallet?.addDiamonds(reward.reward);
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
    reward_type: "diamonds",
    reward_amount: reward.reward,
    streak: reward.streak,
    locale: i18n.locale(),
  });
  renderWallet();
  renderDailyReward();
  showToast(i18n.t("daily.toast", { diamonds: reward.reward, count: reward.streak }));
}

function renderWallet() {
  if (!walletBar) return;
  const wallet = window.WeightPlayWallet?.read?.() || { diamonds: 0 };
  walletBar.innerHTML = `
    <span>${i18n.t("wallet.diamonds")}</span>
    <strong><i aria-hidden="true">&#9670;</i>${wallet.diamonds}</strong>
  `;
}

function renderHeroGames() {
  const cards = popularGames(3)
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
          <em>${playCountText(game)}</em>
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
loadGameStats();
window.WonderAnalytics?.track("lobby_ready", {
  playable_games: lobby.games.filter((game) => game.status === "playable").length,
  total_games: lobby.games.length,
  platform: lobby.platform.name,
  locale: i18n.locale(),
});
