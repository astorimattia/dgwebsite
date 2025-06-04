document.addEventListener("DOMContentLoaded", () => {
  // Fade‑in heroes one after another
  document.querySelectorAll(".fade").forEach((el, i) => {
    setTimeout(() => el.classList.add("in"), 150 * i);
  });

  // Click handler to route into albums
  document.querySelectorAll(".hero").forEach((hero) => {
    hero.addEventListener("click", () => {
      const slug = hero.dataset.album;
      window.location.href = `albums/${slug}.html`;
    });
  });
}); 