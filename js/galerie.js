/* =========================================================
   GALERIE CAMPUS — Groupe Pékékue
   Filtres + Lightbox + Navigation clavier + Responsive
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =====================================================
     DOM
  ===================================================== */
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const galerieGrid = document.getElementById("galerieGrid");
  const galerieVide = document.getElementById("galerieVide");
  const resetFiltre = document.getElementById("resetFiltre");
  const filtreBtns = document.querySelectorAll(".filtre-btn");
  const galerieItems = document.querySelectorAll(".galerie-item");
  const currentYear = document.getElementById("currentYear");

  /* =====================================================
     ANNÉE
  ===================================================== */
  if (currentYear) currentYear.textContent = new Date().getFullYear();

  /* =====================================================
     HEADER SCROLL
  ===================================================== */
  function updateHeader() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* =====================================================
     MENU MOBILE
  ===================================================== */
  function closeMenu() {
    if (!mainNav || !menuToggle) return;
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="ri-menu-3-line"></i>';
  }
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.innerHTML = open
        ? '<i class="ri-close-line"></i>'
        : '<i class="ri-menu-3-line"></i>';
    });
    mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
  }

  /* =====================================================
     FILTRES
  ===================================================== */
  function appliquerFiltre(cat) {
    let visibleCount = 0;
    galerieItems.forEach(item => {
      const match = cat === "all" || item.dataset.cat === cat;
      item.classList.toggle("is-hidden", !match);
      if (match) visibleCount++;
    });
    if (galerieVide) galerieVide.hidden = visibleCount > 0;
  }

  filtreBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filtreBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      appliquerFiltre(btn.dataset.filtre);
    });
  });

  if (resetFiltre) {
    resetFiltre.addEventListener("click", () => {
      filtreBtns.forEach(b => b.classList.remove("active"));
      const allBtn = document.querySelector('.filtre-btn[data-filtre="all"]');
      if (allBtn) allBtn.classList.add("active");
      appliquerFiltre("all");
    });
  }

  /* =====================================================
     SCROLL-SPY (campus navigation)
  ===================================================== */
  const sectionsMap = {
    hero: document.getElementById("hero"),
    defile: document.querySelector('[data-cat="defile"]'),
    soutenances: document.querySelector('[data-cat="soutenances"]'),
    sorties: document.querySelector('[data-cat="sorties"]'),
    vie: document.querySelector('[data-cat="vie"]')
  };
  const campusLinks = document.querySelectorAll(".campus-navigation a, .main-nav .nav-link");

  function updateActiveNav() {
    const scrollY = window.scrollY + 200;
    let current = "hero";
    Object.entries(sectionsMap).forEach(([id, el]) => {
      if (el && el.offsetTop <= scrollY) current = id;
    });
    campusLinks.forEach(link => {
      const href = link.getAttribute("href") || "";
      link.classList.toggle("active", href === "#" + current);
      link.classList.toggle("current", href === "#" + current);
    });
  }
  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  /* =====================================================
     LIGHTBOX
  ===================================================== */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCat = document.getElementById("lightboxCat");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDesc = document.getElementById("lightboxDesc");
  const lightboxIndex = document.getElementById("lightboxIndex");
  const lightboxTotal = document.getElementById("lightboxTotal");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  let photos = [];
  let currentIndex = 0;

  /* Récupère toutes les photos visibles (ou toutes) */
  function buildPhotosList() {
    photos = [];
    document.querySelectorAll(".galerie-item").forEach(item => {
      if (item.classList.contains("is-hidden")) return;
      const img = item.querySelector("img");
      const title = item.querySelector("h3")?.textContent || "";
      const desc = item.querySelector(".galerie-caption p")?.textContent || "";
      const cat = item.querySelector(".galerie-badge")?.textContent.trim() || "";
      if (img) photos.push({ src: img.src, alt: img.alt, title, desc, cat });
    });
    if (lightboxTotal) lightboxTotal.textContent = photos.length;
  }

  function openLightbox(index) {
    if (!photos.length) return;
    currentIndex = (index + photos.length) % photos.length;
    const photo = photos[currentIndex];
    if (lightboxImg) {
      lightboxImg.src = photo.src;
      lightboxImg.alt = photo.alt;
    }
    if (lightboxCat) lightboxCat.textContent = photo.cat;
    if (lightboxTitle) lightboxTitle.textContent = photo.title;
    if (lightboxDesc) lightboxDesc.textContent = photo.desc;
    if (lightboxIndex) lightboxIndex.textContent = currentIndex + 1;
    if (lightbox) {
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function nextPhoto() { openLightbox(currentIndex + 1); }
  function prevPhoto() { openLightbox(currentIndex - 1); }

  /* Attache les clics sur chaque item */
  function attacherLightbox() {
    document.querySelectorAll(".galerie-item").forEach((item, idx) => {
      item.addEventListener("click", (e) => {
        if (e.target.closest(".galerie-zoom") || !e.target.closest("a")) {
          buildPhotosList();
          const realIndex = photos.findIndex(p => p.src === item.querySelector("img")?.src);
          openLightbox(realIndex >= 0 ? realIndex : 0);
        }
      });
    });
  }
  attacherLightbox();

  /* Contrôles lightbox */
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener("click", prevPhoto);
  if (lightboxNext) lightboxNext.addEventListener("click", nextPhoto);

  if (lightbox) {
    lightbox.addEventListener("click", e => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  /* Clavier */
  document.addEventListener("keydown", e => {
    if (!lightbox || !lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextPhoto();
    if (e.key === "ArrowLeft") prevPhoto();
  });

  /* Swipe mobile */
  let touchStartX = 0;
  let touchEndX = 0;
  if (lightbox) {
    lightbox.addEventListener("touchstart", e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    lightbox.addEventListener("touchend", e => {
      touchEndX = e.changedTouches[0].screenX;
      const delta = touchEndX - touchStartX;
      if (Math.abs(delta) > 50) {
        if (delta < 0) nextPhoto();
        else prevPhoto();
      }
    }, { passive: true });
  }

  /* Reconstruire la liste quand on filtre */
  filtreBtns.forEach(btn => {
    btn.addEventListener("click", () => setTimeout(buildPhotosList, 50));
  });
  if (resetFiltre) resetFiltre.addEventListener("click", () => setTimeout(buildPhotosList, 50));
  buildPhotosList();

  /* =====================================================
     SMOOTH SCROLL avec offset header
  ===================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const stickyHeight = document.getElementById("filtresSticky")?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - stickyHeight - 20;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* =====================================================
     LAZY LOAD (natif)
  ===================================================== */
  if ("loading" in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.loading = "lazy";
    });
  }

  /* =====================================================
     CONSOLE
  ===================================================== */
  console.log(
    "%cGALERIE · Groupe Pékékue",
    "font-size:14px;font-weight:700;color:#f1b51a;"
  );
});