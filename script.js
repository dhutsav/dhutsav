
/* =========================
   MOBILE NAVIGATION
========================= */

const menu = document.querySelector(".menu-links");
const hamburger = document.querySelector(".hamburger-icon");

function closeMenu() {
  menu.classList.remove("open");
  hamburger.classList.remove("open");

  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute(
    "aria-label",
    "Open navigation menu"
  );
}

function toggleMenu() {
  const isOpen = menu.classList.toggle("open");

  hamburger.classList.toggle("open", isOpen);

  hamburger.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  hamburger.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
}

// Close menu when a navigation link is selected
document.querySelectorAll(".menu-links a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

// Close menu when Escape is pressed
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// Close menu when clicking outside
document.addEventListener("click", event => {
  const mobileNav = document.getElementById("hamburger-nav");

  if (!mobileNav.contains(event.target)) {
    closeMenu();
  }
});


/* =========================
   LIGHT / DARK THEME
========================= */

const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

function updateThemeButton() {
  const darkMode = body.classList.contains("dark-theme");

  toggleBtn.textContent = darkMode ? "☀️" : "🌙";

  toggleBtn.setAttribute(
    "aria-label",
    darkMode
      ? "Switch to light theme"
      : "Switch to dark theme"
  );
}

// Restore saved theme
try {
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
  }
} catch (error) {
  // Continue with the default theme if storage is unavailable
}

updateThemeButton();

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-theme");

  const darkMode = body.classList.contains("dark-theme");

  try {
    localStorage.setItem(
      "portfolio-theme",
      darkMode ? "dark" : "light"
    );
  } catch (error) {
    // Theme still works without local storage
  }

  updateThemeButton();
});


/* =========================
   BACK TO TOP
========================= */

const backToTop = document.querySelector(".back-to-top");

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/* =========================
   FOOTER YEAR
========================= */

const yearElement = document.getElementById("current-year");

yearElement.textContent = new Date().getFullYear();


/* =========================
   FOOTER EASTER EGG
========================= */

const egg = document.querySelector(".easter-egg");

let clicked = false;

egg.addEventListener("click", () => {
  clicked = !clicked;

  egg.textContent = clicked
    ? "Still curious? So am I 👀"
    : "Built with ❤️ & curiosity";
});


/* =========================
   LUCIDE ICONS
========================= */

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}
