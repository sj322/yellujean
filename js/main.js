(function () {
  "use strict";

  const header = document.getElementById("header");
  const menuBtn = document.getElementById("menuBtn");
  const menuClose = document.getElementById("menuClose");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");
  const rankingTabs = document.querySelectorAll(".ranking-tabs__btn");

  /* Sticky header shadow */
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  function openMenu() {
    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    overlay.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    overlay.classList.remove("visible");
    document.body.style.overflow = "";
  }

  menuBtn?.addEventListener("click", openMenu);
  menuClose?.addEventListener("click", closeMenu);
  overlay?.addEventListener("click", closeMenu);

  /* Ranking tabs (visual toggle) */
  rankingTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      rankingTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  /* MD recommendation carousel */
  document.querySelectorAll("[data-md-carousel]").forEach((carousel) => {
    const track = carousel.querySelector(".md-carousel__track");
    const prev = carousel.querySelector("[data-md-carousel-prev]");
    const next = carousel.querySelector("[data-md-carousel-next]");
    if (!track || !prev || !next) return;

    function scrollByCard(direction) {
      const card = track.querySelector(".product-card");
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      const distance = card ? card.getBoundingClientRect().width + gap : track.clientWidth;
      track.scrollBy({ left: direction * distance, behavior: "smooth" });
    }

    prev.addEventListener("click", () => scrollByCard(-1));
    next.addEventListener("click", () => scrollByCard(1));
  });

  /* Wishlist toggle */
  document.querySelectorAll(".product-card__wish").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle("active");
      const svg = btn.querySelector("svg");
      if (btn.classList.contains("active")) {
        svg.setAttribute("fill", "currentColor");
        btn.style.color = "var(--color-accent)";
      } else {
        svg.setAttribute("fill", "none");
        btn.style.color = "";
      }
    });
  });

  /* Fade-in on scroll */
  const observerTargets = document.querySelectorAll(
    ".section-header, .product-card, .ranking-item, .magazine-card, .about-teaser__content"
  );

  observerTargets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  observerTargets.forEach((el) => observer.observe(el));
})();
