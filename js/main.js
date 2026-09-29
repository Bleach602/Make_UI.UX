/* =========================================================
   GROUPE PÉKÉKUE — JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;
  const header = document.getElementById("header");
  const progress = document.getElementById("progress");
  const loader = document.getElementById("loader");
  const burger = document.getElementById("burger");
  const mobile = document.getElementById("mobile");

  /* =============== LOADER =============== */
  window.addEventListener("load", () => {
    setTimeout(() => loader?.classList.add("done"), 700);
  });

  /* =============== HEADER + PROGRESS =============== */
  function updateScrollUI() {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 35);
    if (progress) {
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      const p = dh > 0 ? (y / dh) * 100 : 0;
      progress.style.width = p + "%";
    }
  }
  updateScrollUI();
  window.addEventListener("scroll", updateScrollUI, { passive: true });

  /* =============== MOBILE MENU =============== */
  function closeMobileMenu() {
    if (!burger || !mobile) return;
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    mobile.hidden = true;
  }
  if (burger && mobile) {
    burger.addEventListener("click", () => {
      const isOpen = !burger.classList.contains("open");
      burger.classList.toggle("open", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
      mobile.hidden = !isOpen;
    });
  }

  /* =============== SMOOTH SCROLL =============== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      const hh = header ? header.offsetHeight : 0;
      const position = target.getBoundingClientRect().top + window.scrollY - hh - 10;
      window.scrollTo({ top: position, behavior: "smooth" });
      closeMobileMenu();
    });
  });

  /* =============== REVEAL =============== */
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    revealElements.forEach(el => obs.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("visible"));
  }

  /* =============== COUNTERS =============== */
  document.querySelectorAll("[data-count]").forEach(counter => {
    const target = Number(counter.dataset.count);
    let animated = false;

    function animate() {
      if (animated) return;
      animated = true;
      const start = performance.now();
      function update(now) {
        const p = Math.min((now - start) / 1400, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        counter.textContent = String(Math.floor(target * eased)).padStart(2, "0");
        if (p < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }

    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { animate(); obs.disconnect(); }
        });
      }, { threshold: 0.5 });
      obs.observe(counter);
    } else animate();
  });

  /* =============== PORTAIL =============== */
  const journeyData = {
    eleve: {
      icon: "ri-school-line",
      title: "Collège Bilingue Pékékue",
      text: "Un environnement structuré pour accompagner les jeunes dans les étapes fondatrices de leur parcours."
    },
    etudiant: {
      icon: "ri-graduation-cap-line",
      title: "ISMTA",
      text: "Un univers d'enseignement supérieur orienté vers les compétences, le management et les technologies appliquées."
    },
    pro: {
      icon: "ri-briefcase-4-line",
      title: "IFP-P",
      text: "Une orientation vers les compétences pratiques, la professionnalisation et les perspectives d'insertion."
    },
    teacher: {
      icon: "ri-presentation-line",
      title: "ENIEG Pékékue",
      text: "Un parcours dédié à la formation des futurs acteurs de l'éducation dans un cadre privé laïque bilingue."
    }
  };

  const journeyCards = document.querySelectorAll(".journey-card");
  const journeyIcon = document.querySelector("#journeyResult > strong i");
  const journeyTitle = document.getElementById("journeyTitle");
  const journeyText = document.getElementById("journeyText");

  journeyCards.forEach(card => {
    card.addEventListener("click", () => {
      journeyCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      const data = journeyData[card.dataset.key];
      if (!data) return;
      if (journeyIcon) journeyIcon.className = `ri ${data.icon}`;
      if (journeyTitle) journeyTitle.textContent = data.title;
      if (journeyText) journeyText.textContent = data.text;
    });
  });

  /* =============== MODALES =============== */
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add("open");
    body.classList.add("modal-open");
  }
  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("open");
    body.classList.remove("modal-open");
  }
  document.querySelectorAll("[data-modal]").forEach(btn => {
    btn.addEventListener("click", () => openModal(document.getElementById(btn.dataset.modal)));
  });
  document.querySelectorAll("[data-close]").forEach(btn => {
    btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.open").forEach(m => closeModal(m));
      closeMobileMenu();
    }
  });

  /* =============== NAV SUIVIE =============== */
  const navLinks = document.querySelectorAll("[data-nav]");
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window && navLinks.length && sections.length) {
    const obs = new IntersectionObserver(entries => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const id = visible[0].target.id;
      navLinks.forEach(l => l.classList.toggle("is-active", l.getAttribute("data-nav") === id));
    }, { threshold: [0.15, 0.35, 0.6], rootMargin: "-25% 0px -55% 0px" });
    sections.forEach(s => obs.observe(s));
  }

  /* =============== ADMIN SLIDER =============== */
  const adminTrack = document.getElementById("adminTrack");
  const adminPrev = document.getElementById("adminPrev");
  const adminNext = document.getElementById("adminNext");
  const adminDots = document.getElementById("adminDots");

  if (adminTrack) {
    const cards = adminTrack.querySelectorAll(".admin-card");
    const step = 320; // card + gap

    if (adminDots) {
      cards.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.setAttribute("aria-label", `Responsable ${i + 1}`);
        if (i === 0) dot.classList.add("is-active");
        dot.addEventListener("click", () => {
          adminTrack.scrollTo({ left: i * step, behavior: "smooth" });
        });
        adminDots.appendChild(dot);
      });
    }

    function updateAdminUI() {
      const sl = adminTrack.scrollLeft;
      const max = adminTrack.scrollWidth - adminTrack.clientWidth;
      if (adminPrev) adminPrev.disabled = sl <= 4;
      if (adminNext) adminNext.disabled = sl >= max - 4;
      if (adminDots) {
        const idx = Math.round(sl / step);
        adminDots.querySelectorAll("button").forEach((d, i) => {
          d.classList.toggle("is-active", i === idx);
        });
      }
    }

    if (adminPrev) adminPrev.addEventListener("click", () => adminTrack.scrollBy({ left: -step, behavior: "smooth" }));
    if (adminNext) adminNext.addEventListener("click", () => adminTrack.scrollBy({ left: step, behavior: "smooth" }));
    adminTrack.addEventListener("scroll", updateAdminUI, { passive: true });
    updateAdminUI();
  }

  /* =============== ANNÉE =============== */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  console.log("%cGROUPE PÉKÉKUE", "font-size:18px;font-weight:bold;color:#0F3D2E;");
});