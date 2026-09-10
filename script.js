(() => {
  "use strict";

  const menuButton = document.getElementById("menuButton");
  const mobileNav = document.getElementById("mobileNav");

  function setMenu(open) {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    mobileNav.hidden = !open;
  }

  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });

    mobileNav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenu(false);
    });

    const desktopMedia = window.matchMedia("(min-width: 901px)");
    desktopMedia.addEventListener("change", (event) => {
      if (event.matches) setMenu(false);
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
