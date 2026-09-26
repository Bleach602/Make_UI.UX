/* =========================================================
   GROUPE PÉKÉKUE — JavaScript minimal
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;
  const header = document.getElementById("header");
  const progress = document.getElementById("progress");
  const burger = document.getElementById("burger");
  const mobile = document.getElementById("mobile");

  /* =============== HEADER + PROGRESS =============== */
  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 20);
    if (progress) {
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = dh > 0 ? (y / dh) * 100 + "%" : "0%";
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* =============== MOBILE MENU =============== */
  function closeMobile() {
    if (!burger || !mobile) return;
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    mobile.hidden = true;
  }
  if (burger && mobile) {
    burger.addEventListener("click", () => {
      const open = !burger.classList.contains("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      mobile.hidden = !open;
    });
  }

  /* =============== SMOOTH SCROLL =============== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const hh = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - hh - 8;
      window.scrollTo({ top, behavior: "smooth" });
      closeMobile();
    });
  });

  /* =============== REVEAL =============== */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(el => obs.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("visible"));
  }

  /* =============== PORTAIL D'ORIENTATION =============== */
  const orientations = {
    eleve: {
      title: "Collège Bilingue Pékékue",
      text: "Un cadre structuré pour consolider les savoirs, développer l'autonomie et préparer les prochaines étapes avec sérénité.",
      link: "#etablissements"
    },
    etudiant: {
      title: "ISMTA",
      text: "Institut Supérieur de Management et de Technologies Appliquées. Parcours professionnalisants en management, gestion, commerce et technologies.",
      link: "#etablissements"
    },
    pro: {
      title: "IFP-P",
      text: "Institut de Formation Professionnelle Pékékue. Formations pratiques orientées vers l'emploi, l'entrepreneuriat et l'insertion.",
      link: "#etablissements"
    },
    teacher: {
      title: "ENIEG Privée Laïque Bilingue Pékékue",
      text: "Formation exigeante des futurs enseignants des écoles maternelles et primaires, avec ouverture francophone et anglophone.",
      link: "#etablissements"
    }
  };

  const cards = document.querySelectorAll(".orientation-card");
  const oTitle = document.getElementById("orientationTitle");
  const oText = document.getElementById("orientationText");
  const oLink = document.getElementById("orientationLink");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      const data = orientations[card.dataset.target];
      if (!data) return;
      if (oTitle) oTitle.textContent = data.title;
      if (oText) oText.textContent = data.text;
      if (oLink) oLink.href = data.link;
    });
  });

  /* =============== ADMIN SLIDER =============== */
  const track = document.getElementById("adminTrack");
  const prev = document.getElementById("adminPrev");
  const next = document.getElementById("adminNext");
  const dotsWrap = document.getElementById("adminDots");

  if (track && dotsWrap) {
    const cards = track.querySelectorAll(".admin-card");
    const step = 320; // card width + gap

    cards.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", `Responsable ${i + 1}`);
      if (i === 0) dot.classList.add("is-active");
      dot.addEventListener("click", () => {
        track.scrollTo({ left: i * step, behavior: "smooth" });
      });
      dotsWrap.appendChild(dot);
    });

    function updateAdminUI() {
      const sl = track.scrollLeft;
      const max = track.scrollWidth - track.clientWidth;
      if (prev) prev.disabled = sl <= 4;
      if (next) next.disabled = sl >= max - 4;
      const idx = Math.round(sl / step);
      dotsWrap.querySelectorAll("button").forEach((d, i) => {
        d.classList.toggle("is-active", i === idx);
      });
    }

    if (prev) prev.addEventListener("click", () => track.scrollBy({ left: -step, behavior: "smooth" }));
    if (next) next.addEventListener("click", () => track.scrollBy({ left: step, behavior: "smooth" }));
    track.addEventListener("scroll", updateAdminUI, { passive: true });
    updateAdminUI();
  }

  /* =============== MODALES =============== */
  function openModal(m) {
    if (!m) return;
    m.classList.add("open");
    body.classList.add("modal-open");
  }
  function closeModal(m) {
    if (!m) return;
    m.classList.remove("open");
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
      document.querySelectorAll(".modal.open").forEach(closeModal);
      closeMobile();
    }
  });

  /* =============== ANNÉE =============== */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

});