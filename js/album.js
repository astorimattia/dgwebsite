// Simple lightbox
const lb = document.getElementById("lightbox");
const lbImg = lb.querySelector("img");

document.querySelectorAll(".gallery img").forEach((thumb) => {
  thumb.addEventListener("click", () => {
    lbImg.src = thumb.src;
    lb.classList.add("open");
  });
});

lb.addEventListener("click", () => lb.classList.remove("open")); 