const lobby = window.WONDER_LOBBY;
const filterButtons = document.querySelectorAll("[data-age-filter]");
const topicButtons = document.querySelectorAll("[data-topic-filter]");
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
const i18n = window.WonderI18n;
let activeFilter = "all";
let activeTopic = "all";
let toastTimer = null;

function text(value) {
  return i18n.getLocalized(value);
}

function categoryText(category) {
  return i18n.t(`category.${category}`);
}

function createGameCard(game) {
  const isPlayable = game.status === "playable";
  const title = text(game.title);
  const type = text(game.type);
  const ageLabel = text(game.ageLabel);
  const card = document.createElement(isPlayable ? "a" : "article");
  card.className = `game-card ${isPlayable ? "playable" : "coming-soon"}`;
  card.dataset.age = game.ages.join(" ");
  card.dataset.topic = (game.categories || []).join("|");

  if (isPlayable) {
    card.href = game.href;
    card.addEventListener("click", () => {
      window.WonderSound?.play("click");
      window.WonderAnalytics?.track("game_open", {
        game_id: game.id,
        game_title: title,
        age_label: ageLabel,
        categories: (game.categories || []).join(","),
        locale: i18n.locale(),
      });
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
  const art =
    game.art.kind === "image"
      ? `<div class="game-card-art"><img class="game-card-bg-blur" src="${game.art.background}" alt="" /><img class="game-card-fg" src="${game.art.background}" alt="" /><img class="game-card-hero" src="${game.art.hero}" alt="" /></div>`
      : `<div class="game-card-art ${game.art.className}"><span>${ageLabel}</span></div>`;

  card.innerHTML = `
    ${art}
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
        <span>#${index + 1}</span>
        <strong>${title}</strong>
        <small>${type} · ${ageLabel}</small>
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
    const isVisible = matchesAge && matchesTopic;
    card.classList.toggle("hidden", !isVisible);
    if (isVisible) visibleCount += 1;
  });

  const isFiltered = activeFilter !== "all" || activeTopic !== "all";
  heroGamesSection.classList.toggle("hidden", isFiltered);
  filterStatus.classList.toggle("empty", visibleCount === 0);
  filterStatus.textContent =
    visibleCount === 0
      ? i18n.t("status.no_games")
      : isFiltered
        ? i18n.t(visibleCount > 1 ? "status.games_found_many" : "status.games_found_one", { count: visibleCount })
        : i18n.t("status.all_games");
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
