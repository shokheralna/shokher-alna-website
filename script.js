const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const year = document.getElementById("year");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

year.textContent = new Date().getFullYear();
