const searchInput = document.getElementById("searchInput");
const postCards = Array.from(document.querySelectorAll(".post-card"));

if (searchInput && postCards.length) {
  searchInput.addEventListener("input", (event) => {
    const term = event.target.value.trim().toLowerCase();

    postCards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      const visible = text.includes(term);
      card.style.display = visible ? "block" : "none";
    });
  });
}
