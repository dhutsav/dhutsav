
/* =========================
   MOBILE NAVIGATION
========================= */

const menu = document.querySelector(".menu-links");
const hamburger = document.querySelector(".hamburger-icon");

function closeMenu() {
  if (!menu || !hamburger) return;

  menu.classList.remove("open");
  hamburger.classList.remove("open");

  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute("aria-label", "Open navigation menu");
}

function toggleMenu() {
  if (!menu || !hamburger) return;

  const isOpen = menu.classList.toggle("open");

  hamburger.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
  hamburger.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
}

if (hamburger) {
  hamburger.addEventListener("click", toggleMenu);
}

document.querySelectorAll(".menu-links a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

document.addEventListener("click", event => {
  const mobileNav = document.getElementById("hamburger-nav");

  if (mobileNav && !mobileNav.contains(event.target)) {
    closeMenu();
  }
});


/* =========================
   LUCIDE ICON INITIALIZATION
========================= */

function initializeIcons() {
  if (
    window.lucide &&
    typeof window.lucide.createIcons === "function"
  ) {
    window.lucide.createIcons();
  } else {
    console.warn(
      "Lucide icons could not be loaded. Check the external script URL."
    );
  }
}


/* =========================
   LIGHT / DARK THEME
========================= */

const body = document.body;
const desktopThemeToggle = document.getElementById("theme-toggle");
const mobileThemeToggle = document.getElementById("mobile-theme-toggle");

function updateThemeButtons() {
  const isDark = body.classList.contains("dark-theme");

  if (desktopThemeToggle) {
    desktopThemeToggle.textContent = isDark ? "☀️" : "🌙";
    desktopThemeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
  }

  if (mobileThemeToggle) {
    const label = mobileThemeToggle.querySelector("span");

    if (label) {
      label.textContent = isDark ? "Light mode" : "Dark mode";
    }

    const icon = mobileThemeToggle.querySelector("svg, i");

    if (icon) {
      icon.outerHTML = `<i data-lucide="${isDark ? "sun" : "moon"}"></i>`;
    }

    initializeIcons();
  }
}

function toggleTheme() {
  body.classList.toggle("dark-theme");

  const isDark = body.classList.contains("dark-theme");

  try {
    localStorage.setItem(
      "portfolio-theme",
      isDark ? "dark" : "light"
    );
  } catch (error) {
    // Theme still works if local storage is unavailable.
  }

  updateThemeButtons();
}

// Restore previously selected theme.
try {
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
  }
} catch (error) {
  // Keep the default light theme.
}

if (desktopThemeToggle) {
  desktopThemeToggle.addEventListener("click", toggleTheme);
}

if (mobileThemeToggle) {
  mobileThemeToggle.addEventListener("click", () => {
    toggleTheme();
    closeMenu();
  });
}


/* =========================
   BACK TO TOP
========================= */

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ? "auto" : "smooth"
    });
  });
}


/* =========================
   FOOTER YEAR
========================= */

const yearElement = document.getElementById("current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================
   FOOTER EASTER EGG
========================= */

const egg = document.querySelector(".easter-egg");

if (egg) {
  let clicked = false;

  egg.addEventListener("click", () => {
    clicked = !clicked;

    egg.textContent = clicked
      ? "Still curious? So am I 👀"
      : "Built with ❤️ & curiosity";
  });
}


/* =========================
   INITIALIZE
========================= */

initializeIcons();
updateThemeButtons();
