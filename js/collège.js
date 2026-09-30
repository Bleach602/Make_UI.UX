document.addEventListener('DOMContentLoaded', () => {

  // 1. Menu Hamburger Mobile
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const hamburgerIcon = hamburgerBtn ? hamburgerBtn.querySelector('i') : null;

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');

      if (navLinks.classList.contains('active')) {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-xmark');
      } else {
        hamburgerIcon.classList.remove('fa-xmark');
        hamburgerIcon.classList.add('fa-bars');
      }
    });

    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (hamburgerIcon) {
          hamburgerIcon.classList.remove('fa-xmark');
          hamburgerIcon.classList.add('fa-bars');
        }
      });
    });
  }

  // 2. Défilement doux
  const allLinks = document.querySelectorAll('a[href^="#"]');

  allLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // 3. Carousel Slider "Moments au CBP"
  const prevBtn = document.getElementById('prevMoments');
  const nextBtn = document.getElementById('nextMoments');
  const sliderContainer = document.querySelector('.moments-slider-container');
  const dots = document.querySelectorAll('#dotsContainer .dot');

  if (sliderContainer) {
    const getCardWidth = () => {
      const card = sliderContainer.querySelector('.moment-card');
      return card ? card.offsetWidth + 20 : 300;
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        sliderContainer.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        sliderContainer.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
      });
    }

    sliderContainer.addEventListener('scroll', () => {
      const scrollPosition = sliderContainer.scrollLeft;
      const cardWidth = getCardWidth();
      const activeIndex = Math.round(scrollPosition / cardWidth);

      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
      });
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const cardWidth = getCardWidth();
        sliderContainer.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
      });
    });
  }

  // 4. BOUTON RETOUR EN HAUT
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. FAQ ACCORDÉON AMÉLIORÉ
  const faqItems = document.querySelectorAll('.faq-item');
  const faqSearch = document.getElementById('faqSearch');
  const faqSearchClear = document.getElementById('faqSearchClear');
  const faqCatBtns = document.querySelectorAll('.faq-cat-btn');
  const faqEmpty = document.getElementById('faqEmpty');
  const faqCounterText = document.getElementById('faqCounterText');

  let activeCategory = 'all';
  let searchQuery = '';

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            const q = other.querySelector('.faq-question');
            if (q) q.setAttribute('aria-expanded', 'false');
          }
        });

        item.classList.toggle('open');
        question.setAttribute('aria-expanded', !isOpen);
      });
    }
  });

  function filterFaq() {
    let visibleCount = 0;

    faqItems.forEach(item => {
      const category = item.getAttribute('data-category');
      const keywords = (item.getAttribute('data-keywords') || '').toLowerCase();
      const questionText = item.querySelector('.faq-question-text').textContent.toLowerCase();
      const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();

      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        keywords.includes(searchQuery) ||
        questionText.includes(searchQuery) ||
        answerText.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        item.style.display = '';
        item.style.animation = 'none';
        void item.offsetWidth;
        item.style.animation = 'fadeIn 0.3s ease';
        visibleCount++;
      } else {
        item.style.display = 'none';
        item.classList.remove('open');
        const q = item.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      }
    });

    if (faqEmpty) {
      faqEmpty.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    if (faqCounterText) {
      if (visibleCount === 0) {
        faqCounterText.textContent = 'Aucune question trouvée';
      } else if (visibleCount === 1) {
        faqCounterText.textContent = '1 question disponible';
      } else {
        faqCounterText.textContent = `${visibleCount} questions disponibles`;
      }
    }
  }

  if (faqSearch) {
    faqSearch.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      if (faqSearchClear) {
        faqSearchClear.classList.toggle('visible', searchQuery.length > 0);
      }
      filterFaq();
    });
  }

  if (faqSearchClear) {
    faqSearchClear.addEventListener('click', () => {
      faqSearch.value = '';
      searchQuery = '';
      faqSearchClear.classList.remove('visible');
      faqSearch.focus();
      filterFaq();
    });
  }

  faqCatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      faqCatBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      filterFaq();
    });
  });

  // 6. ONGLETS PREPARATION INSCRIPTION
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.preparation-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const targetContent = document.getElementById('tab-' + targetTab);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // 7. SÉLECTEUR DE LANGUE FR / EN
  const langButtons = document.querySelectorAll('.lang-btn');

  const translations = {
    fr: {
      accueil: 'Accueil',
      apropos: 'À propos',
      programmes: 'Nos programmes',
      galerie: 'Galerie',
      faq: 'FAQ',
      contact: 'Contact',
      inscription: 'Inscription',
    },
    en: {
      accueil: 'Home',
      apropos: 'About',
      programmes: 'Our programs',
      galerie: 'Gallery',
      faq: 'FAQ',
      contact: 'Contact',
      inscription: 'Enrollment',
    }
  };

  const savedLang = localStorage.getItem('cbp-lang') || 'fr';
  applyLang(savedLang);

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      applyLang(lang);
      localStorage.setItem('cbp-lang', lang);
    });
  });

  function applyLang(lang) {
    langButtons.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });

    const map = translations[lang] || translations.fr;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && map[key]) {
        el.textContent = map[key];
      }
    });

    document.documentElement.setAttribute('lang', lang);
  }

  // 8. FORMULAIRE DE CONTACT → WHATSAPP
  const whatsappForm = document.getElementById('whatsappForm');
  const WHATSAPP_NUMBER = '237699123655'; // 🔴 À REMPLACER par le vrai numéro

  if (whatsappForm) {
    const nameInput = document.getElementById('cf-name');
    const phoneInput = document.getElementById('cf-phone');
    const roleSelect = document.getElementById('cf-role');
    const classSelect = document.getElementById('cf-class');
    const subjectSelect = document.getElementById('cf-subject');
    const messageInput = document.getElementById('cf-message');
    const charCount = document.getElementById('cf-char-count');
    const submitBtn = whatsappForm.querySelector('.btn-whatsapp');

    if (messageInput && charCount) {
      messageInput.addEventListener('input', () => {
        const len = messageInput.value.length;
        charCount.textContent = len;
        charCount.classList.remove('warn', 'max');
        if (len >= 580) charCount.classList.add('max');
        else if (len >= 480) charCount.classList.add('warn');
      });
    }

    [nameInput, phoneInput, roleSelect, subjectSelect, messageInput].forEach(field => {
      if (!field) return;
      const event = field.tagName === 'SELECT' ? 'change' : 'input';
      field.addEventListener(event, () => {
        field.closest('.form-group').classList.remove('has-error');
        const errorSpan = whatsappForm.querySelector(`[data-error-for="${field.id}"]`);
        if (errorSpan) errorSpan.textContent = '';
      });
    });

    function validateForm() {
      let isValid = true;
      const errors = {};

      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        errors['cf-name'] = 'Veuillez entrer votre nom complet.';
        isValid = false;
      }

      const phoneClean = phoneInput.value.replace(/[\s\-\.\(\)]/g, '');
      if (!phoneClean || phoneClean.length < 8) {
        errors['cf-phone'] = 'Veuillez entrer un numéro valide.';
        isValid = false;
      }

      if (!roleSelect.value) {
        errors['cf-role'] = 'Veuillez préciser qui vous êtes.';
        isValid = false;
      }

      if (!subjectSelect.value) {
        errors['cf-subject'] = 'Veuillez choisir un objet.';
        isValid = false;
      }

      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        errors['cf-message'] = 'Votre message doit contenir au moins 10 caractères.';
        isValid = false;
      }

      Object.keys(errors).forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
          field.closest('.form-group').classList.add('has-error');
          const errorSpan = whatsappForm.querySelector(`[data-error-for="${fieldId}"]`);
          if (errorSpan) errorSpan.textContent = errors[fieldId];
        }
      });

      if (!isValid) {
        const firstError = whatsappForm.querySelector('.form-group.has-error input, .form-group.has-error select, .form-group.has-error textarea');
        if (firstError) firstError.focus();
      }

      return isValid;
    }

    whatsappForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      submitBtn.classList.add('loading');

      const nom = nameInput.value.trim();
      const tel = phoneInput.value.trim();
      const role = roleSelect.value;
      const classe = classSelect.value || 'Non précisée';
      const objet = subjectSelect.value;
      const message = messageInput.value.trim();

      const lines = [
        '*NOUVELLE DEMANDE — Collège Bilingue PÉKÉKUÉ*',
        '',
        `👤 *Nom :* ${nom}`,
        `📞 *Téléphone :* ${tel}`,
        `🙋 *Statut :* ${role}`,
        `🎓 *Classe :* ${classe}`,
        `📌 *Objet :* ${objet}`,
        '',
        '💬 *Message :*',
        message,
        '',
        '_Envoyé depuis le site web du CBP_'
      ];

      const fullMessage = lines.join('\n');
      const encodedMessage = encodeURIComponent(fullMessage);
      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

      setTimeout(() => {
        window.open(whatsappURL, '_blank');
        submitBtn.classList.remove('loading');
        showSuccessMessage();
        whatsappForm.reset();
        if (charCount) charCount.textContent = '0';
        charCount.classList.remove('warn', 'max');
      }, 400);
    });

    function showSuccessMessage() {
      const success = document.createElement('div');
      success.className = 'form-success show';
      success.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <span>Votre message a été préparé ! WhatsApp va s'ouvrir dans un instant.</span>
      `;
      whatsappForm.insertBefore(success, whatsappForm.firstChild);
      setTimeout(() => {
        success.classList.remove('show');
        setTimeout(() => success.remove(), 400);
      }, 5000);
    }
  }

  // 9. BANDEAU D'ANNONCE
  const announcementBar = document.getElementById('announcementBar');
  const announcementClose = document.getElementById('announcementClose');

  if (announcementBar && announcementClose) {
    const isClosed = localStorage.getItem('cbp-announcement-closed') === 'true';
    if (isClosed) {
      announcementBar.classList.add('hidden');
    }

    announcementClose.addEventListener('click', () => {
      announcementBar.classList.add('hidden');
      localStorage.setItem('cbp-announcement-closed', 'true');
    });
  }

    // 10. COMPTEURS ANIMÉS (CHIFFRES CLÉS)
  const statNumbers = document.querySelectorAll('.stat-number');

  if (statNumbers.length > 0) {
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const noFormat = el.getAttribute('data-no-format') === 'true';
      const duration = 1800;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(eased * target);
        el.textContent = noFormat ? current : current.toLocaleString('fr-FR');
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = noFormat ? target : target.toLocaleString('fr-FR');
        }
      };
      requestAnimationFrame(updateCount);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statCard = entry.target;
          const number = statCard.querySelector('.stat-number');
          if (number && !number.dataset.animated) {
            number.dataset.animated = 'true';
            animateCounter(number);
          }
          observer.unobserve(statCard);
        }
      });
    }, { threshold: 0.4 });

    document.querySelectorAll('.stat-card').forEach(card => {
      statsObserver.observe(card);
    });
  }
  

  // 11. PAGE FOURNITURES — ONGLETS PAR NIVEAU
  const ftabBtns = document.querySelectorAll('.ftab-btn');
  const fournituresContents = document.querySelectorAll('.fournitures-content');

  if (ftabBtns.length > 0) {
    ftabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetLevel = btn.getAttribute('data-level');

        ftabBtns.forEach(b => b.classList.remove('active'));
        fournituresContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const targetContent = document.getElementById('level-' + targetLevel);
        if (targetContent) {
          targetContent.classList.add('active');
          setTimeout(() => {
            targetContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      });
    });
  }

  // 12. TÉLÉCHARGEMENT DE LA LISTE DES FOURNITURES (niveau actif uniquement)
  const btnDownloadFournitures = document.getElementById('btnDownloadFournitures');

  if (btnDownloadFournitures) {
    btnDownloadFournitures.addEventListener('click', () => {
      const activeTab = document.querySelector('.ftab-btn.active');

      if (activeTab) {
        const levelName = activeTab.textContent.trim();
        const originalTitle = document.title;
        document.title = `Fournitures ${levelName} — Collège Bilingue PÉKÉKUÉ`;

        window.print();

        setTimeout(() => {
          document.title = originalTitle;
        }, 500);
      } else {
        window.print();
      }
    });
  }

    // 13. TÉMOIGNAGES — SLIDER (2 cartes visibles, 1 sur mobile)
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialDots = document.querySelectorAll('#testimonialDots .tdot');
  const prevTestimonial = document.getElementById('prevTestimonial');
  const nextTestimonial = document.getElementById('nextTestimonial');
  const testimonialSlider = document.getElementById('testimonialSlider');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');

  if (testimonialTrack && testimonialSlides.length > 0) {
    let currentTestimonial = 0;
    let testimonialTimer = null;
    const AUTOPLAY_DELAY = 6000;

    // Nombre de cartes visibles selon la largeur
    function getVisibleCount() {
      return window.innerWidth <= 768 ? 1 : 2;
    }

    // Combien d'étapes de navigation on a (index max)
    function getMaxIndex() {
      const visible = getVisibleCount();
      return Math.max(0, testimonialSlides.length - visible);
    }

    function updateSliderPosition() {
      if (!testimonialSlides[0]) return;

      const slide = testimonialSlides[0];
      const slideWidth = slide.offsetWidth;
      const gap = 25; // doit correspondre au gap du CSS
      const offset = currentTestimonial * (slideWidth + gap);

      testimonialTrack.style.transform = `translateX(-${offset}px)`;
    }

    function updateDots() {
      testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentTestimonial);
      });
    }

    function showTestimonial(index) {
      const maxIndex = getMaxIndex();
      if (index > maxIndex) index = 0;
      if (index < 0) index = maxIndex;

      currentTestimonial = index;
      updateSliderPosition();
      updateDots();
    }

    function nextTestimonialSlide() {
      const maxIndex = getMaxIndex();
      const next = currentTestimonial >= maxIndex ? 0 : currentTestimonial + 1;
      showTestimonial(next);
    }

    function prevTestimonialSlide() {
      const maxIndex = getMaxIndex();
      const prev = currentTestimonial <= 0 ? maxIndex : currentTestimonial - 1;
      showTestimonial(prev);
    }

    function startAutoplay() {
      stopAutoplay();
      testimonialTimer = setInterval(nextTestimonialSlide, AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
      if (testimonialTimer) {
        clearInterval(testimonialTimer);
        testimonialTimer = null;
      }
    }

    // Cacher les dots inutiles (si on a 3 slides et 2 visibles → 2 positions : 0 et 1)
    function updateDotsVisibility() {
      const maxIndex = getMaxIndex();
      testimonialDots.forEach((dot, i) => {
        dot.style.display = i <= maxIndex ? '' : 'none';
      });
      // Si l'index actuel dépasse, revenir au début
      if (currentTestimonial > maxIndex) {
        showTestimonial(0);
      }
    }

    if (nextTestimonial) {
      nextTestimonial.addEventListener('click', () => {
        nextTestimonialSlide();
        startAutoplay();
      });
    }

    if (prevTestimonial) {
      prevTestimonial.addEventListener('click', () => {
        prevTestimonialSlide();
        startAutoplay();
      });
    }

    testimonialDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(index)) {
          showTestimonial(index);
          startAutoplay();
        }
      });
    });

    // Pause au survol
    if (testimonialSlider) {
      testimonialSlider.addEventListener('mouseenter', stopAutoplay);
      testimonialSlider.addEventListener('mouseleave', startAutoplay);

      // Swipe tactile (mobile)
      let touchStartX = 0;
      let touchEndX = 0;

      testimonialSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
      }, { passive: true });

      testimonialSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) nextTestimonialSlide();
          else prevTestimonialSlide();
        }
        startAutoplay();
      }, { passive: true });
    }

    // Navigation clavier
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevTestimonialSlide();
      if (e.key === 'ArrowRight') nextTestimonialSlide();
    });

    // Recalcul au redimensionnement
    window.addEventListener('resize', () => {
      updateDotsVisibility();
      updateSliderPosition();
    });

    // Init
    updateDotsVisibility();
    updateSliderPosition();
    startAutoplay();
  }

});