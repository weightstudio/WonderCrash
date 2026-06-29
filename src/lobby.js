const lobby = window.WONDER_LOBBY;
const filterButtons = document.querySelectorAll("[data-age-filter]");
const topicButtons = document.querySelectorAll("[data-topic-filter]");
const gameGrid = document.querySelector("#gameGrid");
const heroGames = document.querySelector("#heroGames");
const lobbyStats = document.querySelector("#lobbyStats");
const featuredGame = document.querySelector("#featuredGame");
const lobbyToast = document.querySelector("#lobbyToast");
const platformTitle = document.querySelector("#platformTitle");
const platformSubtitle = document.querySelector("#platformSubtitle");
let activeFilter = "all";
let activeTopic = "all";
let toastTimer = null;

function createGameCard(game) {
  const isPlayable = game.status === "playable";
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
        game_title: game.title,
        age_label: game.ageLabel,
        categories: (game.categories || []).join(","),
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

  const meta = game.meta.map((item) => `<span>${item}</span>`).join("");
  const categoryBadges = (game.categories || []).map((item) => `<span>${item}</span>`).join("");
  const art =
    game.art.kind === "image"
      ? `<div class="game-card-art"><img src="${game.art.background}" alt="" /><img class="game-card-hero" src="${game.art.hero}" alt="" /></div>`
      : `<div class="game-card-art ${game.art.className}"><span>${game.ageLabel}</span></div>`;

  card.innerHTML = `
    ${art}
    <div class="game-card-body">
      <div class="game-card-topline">
        <span class="age-pill">${game.ageLabel}</span>
        <span>${game.statusText}</span>
      </div>
      <h2>${game.title}</h2>
      <p>${game.description}</p>
      <div class="game-card-categories">${categoryBadges}</div>
      <div class="game-card-meta">${meta}</div>
      <div class="game-card-actions">
        <span>${isPlayable ? "開始玩" : "即將推出"}</span>
        <span>${game.type}</span>
      </div>
    </div>
  `;

  return card;
}

function renderLobby() {
  platformTitle.textContent = lobby.platform.name;
  platformSubtitle.textContent = lobby.platform.subtitle;

  const playableCount = lobby.games.filter((game) => game.status === "playable").length;
  const heroCount = lobby.heroGameIds.length;
  const ageGroups = new Set(lobby.games.flatMap((game) => game.ages));
  const animalCount = lobby.games.filter((game) => (game.categories || []).includes("Animal Games")).length;
  lobbyStats.innerHTML = `
    <div><strong>${playableCount}</strong><span>可玩遊戲</span></div>
    <div><strong>${heroCount}</strong><span>Hero Games</span></div>
    <div><strong>${animalCount}</strong><span>Animal Games</span></div>
    <div><strong>${ageGroups.size}</strong><span>年齡分類</span></div>
  `;

  const featured = lobby.games.find((game) => game.id === lobby.featuredGameId);
  if (featured) {
    featuredGame.href = featured.href;
    featuredGame.querySelector("img").src = featured.art.hero || "assets/hero.png";
    featuredGame.querySelector("strong").textContent = featured.title;
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
        <strong>${game.title}</strong>
        <small>${game.type} · ${game.ageLabel}</small>
      `;
      return card;
    });

  heroGames.replaceChildren(...cards);
}

function applyFilter() {
  document.querySelectorAll("[data-age]").forEach((card) => {
    const ages = card.dataset.age.split(" ");
    const topics = card.dataset.topic ? card.dataset.topic.split("|") : [];
    const matchesAge = activeFilter === "all" || ages.includes(activeFilter);
    const matchesTopic = activeTopic === "all" || topics.includes(activeTopic);
    card.classList.toggle("hidden", !matchesAge || !matchesTopic);
  });
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
    game_title: game.title,
    age_label: game.ageLabel,
    categories: (game.categories || []).join(","),
  });
  showToast(`${game.title} 還在準備中`);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.ageFilter;

    window.WonderSound?.play("click");
    window.WonderAnalytics?.track("age_filter", { age_filter: activeFilter });
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    applyFilter();
  });
});

topicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeTopic = button.dataset.topicFilter;

    window.WonderSound?.play("click");
    window.WonderAnalytics?.track("topic_filter", { topic_filter: activeTopic });
    topicButtons.forEach((item) => item.classList.toggle("active", item === button));
    applyFilter();
  });
});

renderLobby();
window.WonderAnalytics?.track("lobby_ready", {
  playable_games: lobby.games.filter((game) => game.status === "playable").length,
  total_games: lobby.games.length,
  platform: lobby.platform.name,
});
