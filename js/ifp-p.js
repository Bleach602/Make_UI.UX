/* =========================================================
   IFP-P — JavaScript complet
   Progress · Nav · Reveal · Form · Smooth scroll
========================================================= */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* =========================================================
     1. PROGRESS BAR + HEADER SCROLLED
  ========================================================= */
  const progressBar = $('#progress');
  const siteHeader = $('#siteHeader');

  function updateOnScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = percent + '%';
    if (siteHeader) siteHeader.classList.toggle('scrolled', scrollTop > 30);
  }

  window.addEventListener('scroll', updateOnScroll, { passive: true });
  updateOnScroll();

  /* =========================================================
     2. MENU MOBILE
  ========================================================= */
  const menuToggle = $('#menuToggle');
  const mainNav = $('#mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.innerHTML = isOpen
        ? '<i class="ri-close-line"></i>'
        : '<i class="ri-menu-3-line"></i>';
    });

    $$('.nav-link, .nav-cta', mainNav).forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '<i class="ri-menu-3-line"></i>';
      });
    });

    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '<i class="ri-menu-3-line"></i>';
      }
    });
  }

  /* =========================================================
     3. NAV LINK ACTIF AU SCROLL
  ========================================================= */
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');

  function setActiveNav() {
    const scrollPos = window.scrollY + 140;
    let current = '';
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop) current = sec.id;
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
    });
  }
  window.addEventListener('scroll', setActiveNav, { passive: true });

  /* =========================================================
     4. REVEAL AU SCROLL
  ========================================================= */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  function observeReveals() {
    $$('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
  }
  observeReveals();

  /* =========================================================
     5. SMOOTH SCROLL POUR LES LIENS INTERNES
  ========================================================= */
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 100;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* =========================================================
     6. FORMULAIRE CONTACT
  ========================================================= */
  const form = $('#ifpContactForm');
  const formSuccess = $('#formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Envoi en cours... <i class="ri-loader-4-line"></i>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Envoyer ma demande <i class="ri-arrow-right-line"></i>';
        if (formSuccess) {
          formSuccess.hidden = false;
          setTimeout(() => { formSuccess.hidden = true; }, 6000);
        }
        form.reset();
      }, 900);
    });
  }

  /* =========================================================
     7. ANNÉE COURANTE
  ========================================================= */
  const yearEl = $('#currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();