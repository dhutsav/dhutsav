"use strict";

/* MOBILE NAVIGATION */

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
    const wasOpen = menu && menu.classList.contains("open");

    closeMenu();

    if (wasOpen && hamburger) {
      hamburger.focus();
    }
  }
});

document.addEventListener("click", event => {
  const mobileNav = document.getElementById("hamburger-nav");

  if (mobileNav && !mobileNav.contains(event.target)) {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1100) {
    closeMenu();
  }
});

/* LUCIDE ICONS */

function initializeIcons() {
  if (
    window.lucide &&
    typeof window.lucide.createIcons === "function"
  ) {
    window.lucide.createIcons();
  }
}

/* LIGHT / DARK THEME */

const body = document.body;
const desktopThemeToggle = document.getElementById("theme-toggle");
const mobileThemeToggle = document.getElementById("mobile-theme-toggle");

function updateThemeButtons() {
  const isDark = body.classList.contains("dark-theme");
  const actionLabel = isDark
    ? "Switch to light theme"
    : "Switch to dark theme";

  if (desktopThemeToggle) {
    desktopThemeToggle.textContent = isDark ? "☀️" : "🌙";
    desktopThemeToggle.setAttribute("aria-label", actionLabel);
  }

  if (mobileThemeToggle) {
    mobileThemeToggle.setAttribute("aria-label", actionLabel);

    const label = mobileThemeToggle.querySelector("span");
    const icon = mobileThemeToggle.querySelector("svg, i");

    if (label) {
      label.textContent = isDark ? "Light mode" : "Dark mode";
    }

    if (icon) {
      const replacement = document.createElement("i");
      replacement.setAttribute(
        "data-lucide",
        isDark ? "sun" : "moon"
      );
      icon.replaceWith(replacement);
    }
  }

  initializeIcons();
}

function toggleTheme() {
  body.classList.toggle("dark-theme");

  const isDark = body.classList.contains("dark-theme");

  try {
    localStorage.setItem(
      "portfolio-theme",
      isDark ? "dark" : "light"
    );
  } catch {
    // Theme switching still works when storage is unavailable.
  }

  updateThemeButtons();
}

try {
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
  }
} catch {
  // Use the default light theme.
}

if (desktopThemeToggle) {
  desktopThemeToggle.addEventListener("click", toggleTheme);
}

if (mobileThemeToggle) {
  mobileThemeToggle.addEventListener("click", () => {
    toggleTheme();
    closeMenu();

    if (hamburger) {
      hamburger.focus();
    }
  });
}

/* BACK TO TOP */

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
  backToTop.addEventListener("click", () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  });
}

/* FOOTER YEAR */

const yearElement = document.getElementById("current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* FOOTER EASTER EGG */

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

/* INITIALIZE */

updateThemeButtons();
