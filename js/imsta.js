/* =========================================================
   ISMTA — JavaScript
   Groupe Pékékue
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =====================================================
     DONNÉES DES FORMATIONS
  ===================================================== */
  const programs = [
    /* COMMERCE */
    { id: "marketing", school: "commerce", schoolName: "École de Commerce et Gestion",
      title: "Marketing-Commerce-Vente", duration: "BTS · 2 ans", type: "BTS",
      description: "Un parcours orienté vers le commerce, la relation client, le marketing et les activités de vente.",
      subjects: ["Marketing", "Commerce", "Techniques de vente", "Relation client", "Gestion commerciale"],
      outlets: ["Commerce", "Vente", "Services commerciaux", "Relation client"] },

    { id: "comptabilite", school: "commerce", schoolName: "École de Commerce et Gestion",
      title: "Comptabilité et Gestion des Entreprises", duration: "BTS · 2 ans", type: "BTS",
      description: "Un parcours centré sur la comptabilité, la gestion et le fonctionnement financier de l'entreprise.",
      subjects: ["Comptabilité", "Gestion", "Finance", "Analyse", "Organisation de l'entreprise"],
      outlets: ["Comptabilité", "Gestion", "Services financiers", "Administration"] },

    { id: "logistique", school: "commerce", schoolName: "École de Commerce et Gestion",
      title: "Gestion Logistique et Transport", duration: "BTS · 2 ans", type: "BTS",
      description: "Une formation autour de la gestion des flux, du transport et de la chaîne logistique.",
      subjects: ["Logistique", "Transport", "Gestion des stocks", "Organisation des flux", "Gestion"],
      outlets: ["Logistique", "Transport", "Approvisionnement", "Gestion des stocks"] },

    { id: "banque", school: "commerce", schoolName: "École de Commerce et Gestion",
      title: "Banque et Finance", duration: "BTS · 2 ans", type: "BTS",
      description: "Un parcours orienté vers les activités bancaires, financières et la relation avec les clients.",
      subjects: ["Banque", "Finance", "Gestion", "Relation client", "Environnement financier"],
      outlets: ["Banque", "Finance", "Services financiers", "Relation clientèle"] },

    { id: "grh", school: "commerce", schoolName: "École de Commerce et Gestion",
      title: "Gestion des Ressources Humaines", duration: "BTS · 2 ans", type: "BTS",
      description: "Un parcours consacré à l'organisation des ressources humaines et à la gestion des collaborateurs.",
      subjects: ["Ressources humaines", "Administration", "Organisation", "Gestion", "Communication professionnelle"],
      outlets: ["Ressources humaines", "Administration du personnel", "Gestion", "Services administratifs"] },

    /* INGÉNIERIE */
    { id: "gsi", school: "engineering", schoolName: "École d'Ingénierie",
      title: "Gestion des Systèmes d'Informations", duration: "BTS · 2 ans", type: "BTS",
      description: "Un parcours consacré aux systèmes d'information, aux outils numériques et à leur gestion dans l'organisation.",
      subjects: ["Systèmes d'information", "Informatique", "Gestion des données", "Outils numériques", "Organisation"],
      outlets: ["Systèmes d'information", "Informatique", "Support informatique", "Services numériques"] },

    { id: "genie-civil", school: "engineering", schoolName: "École d'Ingénierie",
      title: "Génie Civil", duration: "BTS · 2 ans", type: "BTS",
      description: "Un parcours technique consacré aux domaines du bâtiment, des travaux et du génie civil.",
      subjects: ["Génie civil", "Techniques du bâtiment", "Dessin technique", "Matériaux", "Organisation des travaux"],
      outlets: ["Bâtiment", "Travaux", "Bureaux techniques", "Suivi de chantier"] },

    /* SANTÉ */
    { id: "infirmieres", school: "health", schoolName: "École Santé",
      title: "Sciences infirmières", duration: "BTS · 3 ans", type: "BTS",
      description: "Un parcours consacré à la formation dans le domaine des soins infirmiers.",
      subjects: ["Sciences infirmières", "Soins", "Anatomie", "Hygiène", "Pratique professionnelle"],
      outlets: ["Soins infirmiers", "Structures de santé", "Services de soins"] },

    { id: "analyse-medicale", school: "health", schoolName: "École Santé",
      title: "Techniques d'Analyse Médicale", duration: "BTS · 3 ans", type: "BTS",
      description: "Un parcours orienté vers les techniques d'analyse et l'environnement des laboratoires médicaux.",
      subjects: ["Analyses médicales", "Biologie", "Techniques de laboratoire", "Hygiène", "Pratique professionnelle"],
      outlets: ["Laboratoires", "Analyse médicale", "Structures de santé", "Services biomédicaux"] },

    { id: "sages-femmes", school: "health", schoolName: "École Santé",
      title: "Sages-femmes", duration: "LIPRO · 4 ans", type: "LIPRO",
      description: "Un parcours consacré à la formation dans le domaine de la santé maternelle et de l'accompagnement.",
      subjects: ["Santé maternelle", "Suivi de grossesse", "Soins", "Santé reproductive", "Pratique professionnelle"],
      outlets: ["Maternités", "Structures de santé", "Services de santé maternelle"] }
  ];

  /* =====================================================
     DOM
  ===================================================== */
  const body = document.body;
  const loader = document.getElementById("ismtaLoader");
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const progress = document.getElementById("progress");
  const programGrid = document.getElementById("programGrid");
  const modal = document.getElementById("programModal");
  const modalClose = document.getElementById("modalClose");

  function lockBody() { body.style.overflow = "hidden"; }
  function unlockBody() { body.style.overflow = ""; }

  /* =====================================================
     ANNÉE
  ===================================================== */
  const currentYear = document.getElementById("currentYear");
  if (currentYear) currentYear.textContent = new Date().getFullYear();

  /* =====================================================
     LOADER
  ===================================================== */
  let loaderHidden = false;
  function finishLoader() {
    if (loaderHidden || !loader) return;
    loaderHidden = true;
    loader.classList.add("done");
    loader.setAttribute("aria-hidden", "true");
    setTimeout(() => { if (loader.parentNode) loader.parentNode.removeChild(loader); }, 900);
  }

  if (document.readyState === "complete") {
    setTimeout(finishLoader, 650);
  } else {
    window.addEventListener("load", () => setTimeout(finishLoader, 650), { once: true });
  }
  /* Filet de sécurité : le loader disparaît TOUJOURS après 2.5s max */
  setTimeout(finishLoader, 2500);

  /* =====================================================
     HEADER + PROGRESS
  ===================================================== */
  function updateScrollUI() {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 24);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (y / h) * 100 : 0;
      progress.style.width = pct + "%";
    }
  }
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  /* =====================================================
     MENU MOBILE
  ===================================================== */
  function closeMobileMenu() {
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
    mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMobileMenu));
  }

  /* =====================================================
     SCROLL DOUX
  ===================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* =====================================================
     NAVIGATION ACTIVE (scroll-spy sur .nav-link)
  ===================================================== */
  const navLinks = document.querySelectorAll(".main-nav .nav-link[href^='#']");
  const sections = document.querySelectorAll("main section[id]");

  function updateActiveNavigation() {
    if (!navLinks.length || !sections.length) return;
    const trigger = window.innerHeight * 0.30;
    let current = sections[0].id;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= trigger) current = section.id;
    });
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
      current = sections[sections.length - 1].id;
    }
    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === "#" + current);
    });
  }
  window.addEventListener("scroll", updateActiveNavigation, { passive: true });
  window.addEventListener("resize", updateActiveNavigation);
  window.addEventListener("load", updateActiveNavigation);
  updateActiveNavigation();

  /* =====================================================
     REVEAL
  ===================================================== */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("visible"));
  }

  /* =====================================================
     RENDER PROGRAMMES
  ===================================================== */
  function renderPrograms(filter = "all") {
    if (!programGrid) return;
    const filtered = filter === "all"
      ? programs
      : programs.filter(p => p.school === filter);

    programGrid.innerHTML = filtered.map(program => `
      <article class="program-card">
        <div class="program-school">
          <span>${program.schoolName}</span>
          <span class="program-duration">${program.duration}</span>
        </div>
        <h3>${program.title}</h3>
        <p>${program.description}</p>
        <div class="program-footer">
          <span class="program-type">${program.type}</span>
          <button class="program-view" type="button" data-program-id="${program.id}">
            Voir le parcours <i class="ri-arrow-right-line"></i>
          </button>
        </div>
      </article>
    `).join("");

    programGrid.querySelectorAll("[data-program-id]").forEach(button => {
      button.addEventListener("click", () => {
        const program = programs.find(p => p.id === button.dataset.programId);
        if (program) openProgramModal(program);
      });
    });
  }
  renderPrograms();

  /* =====================================================
     FILTRES
  ===================================================== */
  const filterButtons = document.querySelectorAll(".filter-button");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      renderPrograms(button.dataset.filter);
    });
  });

  /* =====================================================
     MODAL
  ===================================================== */
  function openProgramModal(program) {
    if (!modal) return;
    const elSchool = document.getElementById("modalSchool");
    const elDuration = document.getElementById("modalDuration");
    const elTitle = document.getElementById("modalTitle");
    const elDesc = document.getElementById("modalDescription");
    const elSubjects = document.getElementById("modalSubjects");
    const elOutlets = document.getElementById("modalOutlets");

    if (elSchool) elSchool.textContent = program.schoolName;
    if (elDuration) elDuration.textContent = program.duration;
    if (elTitle) elTitle.textContent = program.title;
    if (elDesc) elDesc.textContent = program.description;
    if (elSubjects) elSubjects.innerHTML = program.subjects.map(item => `<li>${item}</li>`).join("");
    if (elOutlets) elOutlets.innerHTML = program.outlets.map(item => `<li>${item}</li>`).join("");

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    lockBody();
    setTimeout(() => { if (modalClose) modalClose.focus(); }, 50);
  }
  function closeProgramModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    unlockBody();
  }
  if (modalClose) modalClose.addEventListener("click", closeProgramModal);
  if (modal) {
    modal.addEventListener("click", event => {
      if (event.target === modal) closeProgramModal();
    });
  }

  /* =====================================================
     ÉCOLES → FILTRE
  ===================================================== */
  document.querySelectorAll("[data-school]").forEach(button => {
    button.addEventListener("click", () => {
      const school = button.dataset.school;
      const filter = document.querySelector(`.filter-button[data-filter="${school}"]`);
      if (!filter) return;
      filter.click();
      const grid = document.getElementById("programGrid");
      if (grid) {
        const headerHeight = header ? header.offsetHeight : 0;
        const top = grid.getBoundingClientRect().top + window.scrollY - headerHeight - 35;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  /* =====================================================
     ESCAPE
  ===================================================== */
  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    closeProgramModal();
    closeMobileMenu();
  });

  /* =====================================================
     FAQ
  ===================================================== */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach(other => { if (other !== item) other.open = false; });
    });
  });

  /* =====================================================
     QUIZ ORIENTATION
  ===================================================== */
  const quizQuestions = [
    { question: "Quel environnement vous attire le plus ?",
      options: [
        { label: "Entreprise, commerce et gestion", scores: { commerce: 3 } },
        { label: "Technologie et systèmes", scores: { engineering: 3 } },
        { label: "Construction et technique", scores: { engineering: 3 } },
        { label: "Santé et accompagnement", scores: { health: 3 } }
      ] },
    { question: "Quelle activité vous ressemble le plus ?",
      options: [
        { label: "Organiser et gérer", scores: { commerce: 2 } },
        { label: "Analyser et utiliser le numérique", scores: { engineering: 2 } },
        { label: "Concevoir et réaliser", scores: { engineering: 2 } },
        { label: "Soigner et accompagner", scores: { health: 2 } }
      ] },
    { question: "Dans quel univers vous imaginez-vous ?",
      options: [
        { label: "Entreprise ou banque", scores: { commerce: 2 } },
        { label: "Informatique", scores: { engineering: 2 } },
        { label: "Bâtiment et travaux", scores: { engineering: 2 } },
        { label: "Hôpital ou laboratoire", scores: { health: 2 } }
      ] },
    { question: "Qu'est-ce qui compte le plus pour vous ?",
      options: [
        { label: "Comprendre l'entreprise", scores: { commerce: 2 } },
        { label: "Maîtriser les outils techniques", scores: { engineering: 2 } },
        { label: "Développer des compétences pratiques", scores: { engineering: 1, commerce: 1 } },
        { label: "Être utile dans le domaine de la santé", scores: { health: 2 } }
      ] }
  ];

  const quizContent = document.getElementById("quizContent");
  const quizStep = document.getElementById("quizStep");
  const quizProgress = document.getElementById("quizProgress");
  let currentQuestion = 0;
  let quizScores = { commerce: 0, engineering: 0, health: 0 };

  function renderQuiz() {
    if (!quizContent) return;
    const question = quizQuestions[currentQuestion];
    if (quizStep) quizStep.textContent = `Question ${currentQuestion + 1} / ${quizQuestions.length}`;
    if (quizProgress) quizProgress.style.width = `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;

    quizContent.innerHTML = `
      <div class="quiz-question">
        <h3>${question.question}</h3>
        <div class="quiz-options">
          ${question.options.map((option, index) => `
            <button class="quiz-option" type="button" data-option="${index}">
              <span>${option.label}</span>
              <i class="ri-arrow-right-line"></i>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    quizContent.querySelectorAll(".quiz-option").forEach(button => {
      button.addEventListener("click", () => {
        const option = question.options[Number(button.dataset.option)];
        Object.entries(option.scores).forEach(([key, value]) => { quizScores[key] += value; });
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) renderQuiz();
        else showQuizResult();
      });
    });
  }

  function showQuizResult() {
    if (quizStep) quizStep.textContent = "Orientation";
    if (quizProgress) quizProgress.style.width = "100%";

    const ranking = Object.entries(quizScores).sort((a, b) => b[1] - a[1]);
    const highest = ranking[0][1];
    const winners = ranking.filter(item => item[1] === highest).map(item => item[0]);

    const resultData = {
      commerce: { title: "Commerce & Gestion",
        description: "Vos réponses correspondent aux parcours de l'École de Commerce et Gestion.",
        programs: programs.filter(p => p.school === "commerce") },
      engineering: { title: "Ingénierie",
        description: "Vos réponses correspondent aux parcours de l'École d'Ingénierie.",
        programs: programs.filter(p => p.school === "engineering") },
      health: { title: "Santé",
        description: "Vos réponses correspondent aux parcours de l'École Santé.",
        programs: programs.filter(p => p.school === "health") }
    };
    const results = winners.map(key => resultData[key]);

    quizContent.innerHTML = `
      <div class="quiz-result">
        <span class="quiz-result-label">PISTE(S) D'ORIENTATION</span>
        <h3>${results.map(r => r.title).join(" · ")}</h3>
        <p>${results.map(r => r.description).join(" ")}</p>
        <div class="quiz-result-links">
          ${results.flatMap(r => r.programs).map(program => `
            <button type="button" data-result-program="${program.id}">
              ${program.title}
            </button>
          `).join("")}
        </div>
        <button class="quiz-restart" id="quizRestart" type="button">Refaire le test</button>
      </div>
    `;

    quizContent.querySelectorAll("[data-result-program]").forEach(button => {
      button.addEventListener("click", () => {
        const program = programs.find(p => p.id === button.dataset.resultProgram);
        if (program) openProgramModal(program);
      });
    });

    const restart = document.getElementById("quizRestart");
    if (restart) {
      restart.addEventListener("click", () => {
        currentQuestion = 0;
        quizScores = { commerce: 0, engineering: 0, health: 0 };
        renderQuiz();
      });
    }
  }
  renderQuiz();

  /* =====================================================
     FORMULAIRE
  ===================================================== */
  const contactForm = document.getElementById("ismtaContactForm");
  const formSuccess = document.getElementById("formSuccess");

  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
      const submitButton = contactForm.querySelector(".form-submit");
      if (!submitButton) return;

      const original = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = `Envoi en cours… <i class="ri-loader-4-line"></i>`;

      setTimeout(() => {
        submitButton.style.display = "none";
        if (formSuccess) formSuccess.hidden = false;
        contactForm.reset();
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.innerHTML = original;
          submitButton.style.display = "";
          if (formSuccess) formSuccess.hidden = true;
        }, 5000);
      }, 900);
    });
  }

  /* =====================================================
     PAGE HIDE
  ===================================================== */
  window.addEventListener("pagehide", () => unlockBody());

  /* =====================================================
     CONSOLE
  ===================================================== */
  console.log("%cISMTA · Groupe Pékékue", "font-size:16px;font-weight:700;color:#f1b51a;");
});