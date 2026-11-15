
// =====================================
// UTSAV DHAKAL — PORTFOLIO JAVASCRIPT
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const yearElement = document.getElementById("year");

  // -----------------------------------
  // THEME TOGGLE
  // -----------------------------------

  function applyTheme(theme) {
    const isLight = theme === "light";

    body.classList.toggle("light-theme", isLight);

    if (themeToggle) {
      themeToggle.textContent = isLight ? "☾" : "☀";

      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
      );
    }
  }

  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("portfolio-theme");
  } catch (error) {
    // Continue with the default theme if storage is unavailable.
  }

  const initialTheme =
    savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : "dark";

  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const newTheme = body.classList.contains("light-theme")
        ? "dark"
        : "light";

      applyTheme(newTheme);

      try {
        localStorage.setItem("portfolio-theme", newTheme);
      } catch (error) {
        // The theme still works during this visit.
      }
    });
  }

  // -----------------------------------
  // MOBILE MENU
  // -----------------------------------

  function setMenuOpen(isOpen) {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.toggle("is-open", isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.contains("is-open");
      setMenuOpen(!isOpen);
    });

    // Close menu after clicking a navigation link.
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setMenuOpen(false);
      });
    });

    // Close menu when Escape is pressed.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        const wasOpen = navLinks.classList.contains("is-open");
        setMenuOpen(false);

        if (wasOpen) {
          menuToggle.focus();
        }
      }
    });

    // Close menu when clicking outside the navigation.
    document.addEventListener("click", (event) => {
      if (
        navLinks.classList.contains("is-open") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    });

    // Reset the menu when switching to desktop width.
    const desktopQuery = window.matchMedia("(min-width: 761px)");

    function handleDesktopChange(event) {
      if (event.matches) {
        setMenuOpen(false);
      }
    }

    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener(
        "change",
        handleDesktopChange
      );
    } else if (desktopQuery.addListener) {
      desktopQuery.addListener(handleDesktopChange);
    }
  }

  // -----------------------------------
  // FOOTER YEAR
  // -----------------------------------

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
