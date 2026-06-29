const filterButtons = document.querySelectorAll("[data-age-filter]");
const gameCards = document.querySelectorAll("[data-age]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.ageFilter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    gameCards.forEach((card) => {
      const ages = card.dataset.age.split(" ");
      card.classList.toggle("hidden", filter !== "all" && !ages.includes(filter));
    });
  });
});
