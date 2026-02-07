const TELEGRAM_LINK = "https://t.me/th4nhlm"; // TODO: change me

function bindTelegramLinks() {
  const ids = ["btnTelegramHero", "btnTelegramPricing", "btnTelegramMobile", "footerTelegram"];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = TELEGRAM_LINK;
  });
}

function smoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // close mobile menu if exists
      if (mobileNav) mobileNav.classList.remove("show");
    });
  });
}

const burger = document.getElementById("burger");
const mobileNav = document.getElementById("mobileNav");

function bindMobileMenu() {
  if (!burger || !mobileNav) return;

  burger.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!mobileNav.classList.contains("show")) return;
    const inside = mobileNav.contains(e.target) || burger.contains(e.target);
    if (!inside) mobileNav.classList.remove("show");
  });
}

function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

function trackPageView() {
  const ENDPOINT = "https://tocbien.starlinksatellitewifi.workers.dev/track";

  const payload = {
    type: "page_view",
    path: location.pathname + location.search + location.hash,
    ref: document.referrer || "",
    ua: navigator.userAgent || "",
    ts: new Date().toISOString(),
  };

  try {
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch (_) {}
}

bindTelegramLinks();
bindMobileMenu();
smoothAnchors();
setYear();

if (document.readyState === "complete") trackPageView();
else window.addEventListener("load", trackPageView, { once: true });
