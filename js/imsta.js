/* =========================================================
   ISMTA — JAVASCRIPT PRINCIPAL
   Groupe Pékékue
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       1. CONFIGURATION
    ====================================================== */

    const CONFIG = {

        /* -------------------------------------------------
           Informations institutionnelles
        ------------------------------------------------- */

        institution: "ISMTA",

        group: "Groupe Pékékue",

        phone: "+237 699 875 882",


        /* -------------------------------------------------
           Dates d'inscription
           
           IMPORTANT :
           Remplacer ces dates lorsque l'administration
           aura communiqué les dates officielles.
        ------------------------------------------------- */

        admission: {
            opening: null,
            closing: null
        }

    };


    /* =====================================================
       2. SELECTEURS
    ====================================================== */

    const body = document.body;

    const header = document.getElementById("header");

    const mobileToggle =
        document.getElementById("mobileToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const formationModal =
        document.getElementById("formationModal");

    const orientationModal =
        document.getElementById("orientationModal");

    const currentYear =
        document.getElementById("currentYear");


    /* =====================================================
       3. ANNÉE
    ====================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       4. HEADER SCROLL
    ====================================================== */

    const handleHeaderScroll = () => {

        if (!header) return;

        if (window.scrollY > 20) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };

    handleHeaderScroll();

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );


    /* =====================================================
       5. MOBILE MENU
    ====================================================== */

    if (mobileToggle && mobileMenu) {

        mobileToggle.addEventListener(
            "click",
            () => {

                const opened =
                    mobileMenu.classList.toggle("open");

                mobileToggle.setAttribute(
                    "aria-expanded",
                    opened ? "true" : "false"
                );

                const icon =
                    mobileToggle.querySelector("i");

                if (icon) {

                    icon.className =
                        opened
                            ? "ri-close-line"
                            : "ri-menu-4-line";

                }

            }
        );


        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileMenu.classList.remove("open");

                        mobileToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        const icon =
                            mobileToggle.querySelector("i");

                        if (icon) {

                            icon.className =
                                "ri-menu-4-line";

                        }

                    }
                );

            });

    }


    /* =====================================================
       6. SMOOTH SCROLL
    ====================================================== */

    const smoothLinks =
        document.querySelectorAll(
            'a[href^="#"], [data-scroll]'
        );

    smoothLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                let selector =
                    link.getAttribute("href");

                if (
                    !selector ||
                    selector === "#"
                ) {

                    selector =
                        link.dataset.scroll;

                }

                if (
                    !selector ||
                    !selector.startsWith("#")
                ) {
                    return;
                }

                const target =
                    document.querySelector(selector);

                if (!target) return;

                event.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetTop =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    15;

                window.scrollTo({
                    top: targetTop,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =====================================================
       7. REVEAL ANIMATIONS
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add("visible");

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: .12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach(
            element => observer.observe(element)
        );

    } else {

        revealElements.forEach(
            element =>
                element.classList.add("visible")
        );

    }


    /* =====================================================
       8. NAVIGATION ACTIVE
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );

    if (
        "IntersectionObserver" in window &&
        sections.length &&
        navLinks.length
    ) {

        const navObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting)
                            return;

                        const id =
                            entry.target.id;

                        navLinks.forEach(link => {

                            const href =
                                link.getAttribute("href");

                            link.classList.toggle(
                                "active",
                                href === `#${id}`
                            );

                        });

                    });

                },
                {
                    threshold: .35,
                    rootMargin: "-80px 0px -45% 0px"
                }
            );

        sections.forEach(
            section =>
                navObserver.observe(section)
        );

    }


    /* =====================================================
       9. FILTRES DES FORMATIONS
    ====================================================== */

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );

    const formationCards =
        document.querySelectorAll(
            ".formation-card"
        );

    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const filter =
                    button.dataset.filter;

                filterButtons.forEach(
                    item =>
                        item.classList.remove("active")
                );

                button.classList.add("active");

                formationCards.forEach(card => {

                    const category =
                        card.dataset.category;

                    const show =
                        filter === "all" ||
                        category === filter;

                    card.classList.toggle(
                        "hidden",
                        !show
                    );

                });

            }
        );

    });


    /* =====================================================
       10. DONNÉES DES FORMATIONS
       
       Les listes de matières sont volontairement présentées
       comme des APERÇUS et doivent être validées avec les
       maquettes pédagogiques officielles.
    ====================================================== */

    const programs = {

        cge: {

            title:
                "Comptabilité & Gestion des Entreprises",

            level:
                "BTS",

            intro:
                "Un parcours orienté vers la compréhension de la comptabilité, de la gestion et du fonctionnement administratif d'une organisation.",

            objective:
                "Développer des bases solides en gestion, comptabilité, analyse et organisation afin de comprendre les opérations d'une entreprise.",

            admission:
                "Étude de dossier",

            entry:
                "Baccalauréat / niveau requis",

            evaluation:
                "CC + session normale + rattrapage",

            subjects: [
                "Comptabilité",
                "Gestion",
                "Économie",
                "Droit",
                "Mathématiques appliquées",
                "Informatique",
                "Communication professionnelle"
            ],

            careers: [
                "Assistant comptable",
                "Assistant de gestion",
                "Agent administratif",
                "Assistant financier",
                "Gestionnaire"
            ]

        },


        ig: {

            title:
                "Informatique de Gestion",

            level:
                "BTS",

            intro:
                "Un parcours à la croisée de l'informatique et de la gestion des systèmes d'information.",

            objective:
                "Comprendre les outils numériques utilisés dans les organisations et participer à la gestion des systèmes d'information.",

            admission:
                "Étude de dossier",

            entry:
                "Baccalauréat / niveau requis",

            evaluation:
                "CC + session normale + rattrapage",

            subjects: [
                "Algorithmique",
                "Bases de données",
                "Programmation",
                "Systèmes d'information",
                "Gestion",
                "Réseaux",
                "Mathématiques appliquées"
            ],

            careers: [
                "Assistant informatique",
                "Technicien SI",
                "Assistant développeur",
                "Support informatique",
                "Assistant systèmes"
            ]

        },


        banque: {

            title:
                "Banque & Finance",

            level:
                "BTS",

            intro:
                "Une orientation vers les activités bancaires, financières et commerciales.",

            objective:
                "Comprendre les opérations bancaires, les mécanismes financiers et la relation avec les clients.",

            admission:
                "Étude de dossier",

            entry:
                "Baccalauréat / niveau requis",

            evaluation:
                "CC + session normale + rattrapage",

            subjects: [
                "Économie",
                "Finance",
                "Comptabilité",
                "Techniques bancaires",
                "Droit",
                "Mathématiques financières",
                "Communication commerciale"
            ],

            careers: [
                "Assistant bancaire",
                "Conseiller clientèle",
                "Assistant financier",
                "Agent commercial",
                "Assistant administratif"
            ]

        },


        logistique: {

            title:
                "Gestion Logistique & Transport",

            level:
                "BTS",

            intro:
                "Une formation orientée vers la gestion des flux, du transport et des opérations logistiques.",

            objective:
                "Acquérir les bases permettant de comprendre, organiser et suivre les opérations logistiques et de transport.",

            admission:
                "Étude de dossier",

            entry:
                "Baccalauréat / niveau requis",

            evaluation:
                "CC + session normale + rattrapage",

            subjects: [
                "Logistique",
                "Transport",
                "Gestion des stocks",
                "Approvisionnement",
                "Commerce",
                "Gestion",
                "Communication professionnelle"
            ],

            careers: [
                "Assistant logistique",
                "Agent d'exploitation",
                "Gestionnaire de stocks",
                "Assistant transport",
                "Approvisionneur"
            ]

        },


        commerce: {

            title:
                "Commerce International",

            level:
                "BTS",

            intro:
                "Un parcours tourné vers le commerce, la vente, la relation client et les échanges internationaux.",

            objective:
                "Développer des compétences commerciales, relationnelles et organisationnelles dans un environnement de commerce.",

            admission:
                "Étude de dossier",

            entry:
                "Baccalauréat / niveau requis",

            evaluation:
                "CC + session normale + rattrapage",

            subjects: [
                "Marketing",
                "Techniques de vente",
                "Commerce",
                "Économie",
                "Droit commercial",
                "Communication",
                "Environnement international"
            ],

            careers: [
                "Commercial",
                "Assistant commercial",
                "Chargé de clientèle",
                "Assistant marketing",
                "Agent de vente"
            ]

        },


        communication: {

            title:
                "Information & Communication",

            level:
                "BTS",

            intro:
                "Une formation autour de la communication des organisations, de l'information et des médias.",

            objective:
                "Développer des compétences en communication, production de contenus, information et relation avec les publics.",

            admission:
                "Étude de dossier",

            entry:
                "Baccalauréat / niveau requis",

            evaluation:
                "CC + session normale + rattrapage",

            subjects: [
                "Communication",
                "Relations publiques",
                "Techniques rédactionnelles",
                "Médias",
                "Communication digitale",
                "Marketing",
                "Culture générale"
            ],

            careers: [
                "Assistant communication",
                "Chargé de communication",
                "Assistant événementiel",
                "Assistant relations publiques",
                "Rédacteur"
            ]

        },


        informatique: {

            title:
                "Informatique & Génie Informatique",

            level:
                "DSEP",

            intro:
                "Un parcours technologique centré sur l'informatique, les systèmes et les environnements numériques.",

            objective:
                "Développer des compétences techniques dans les systèmes informatiques et leur exploitation.",

            admission:
                "Étude de dossier",

            entry:
                "Selon conditions de la formation",

            evaluation:
                "CC + session normale + rattrapage",

            subjects: [
                "Systèmes",
                "Algorithmique",
                "Programmation",
                "Bases de données",
                "Architecture informatique",
                "Réseaux",
                "Maintenance"
            ],

            careers: [
                "Technicien informatique",
                "Technicien systèmes",
                "Support informatique",
                "Assistant réseau",
                "Technicien maintenance"
            ]

        },


        reseaux: {

            title:
                "Réseaux & Télécommunications",

            level:
                "DSEP",

            intro:
                "Une orientation vers les réseaux, les télécommunications et les infrastructures connectées.",

            objective:
                "Comprendre les architectures réseau, les équipements, les systèmes de communication et les environnements connectés.",

            admission:
                "Étude de dossier",

            entry:
                "Selon conditions de la formation",

            evaluation:
                "CC + session normale + rattrapage",

            subjects: [
                "Réseaux",
                "Télécommunications",
                "Administration systèmes",
                "Architecture réseau",
                "Sécurité",
                "Protocoles",
                "Maintenance"
            ],

            careers: [
                "Technicien réseau",
                "Technicien télécom",
                "Administrateur réseau junior",
                "Support infrastructure",
                "Technicien systèmes"
            ]

        },


        gl: {

            title:
                "Licence Professionnelle — Génie Logiciel",

            level:
                "LICENCE PRO",

            intro:
                "Un parcours professionnel destiné à approfondir les compétences liées au développement logiciel et aux applications.",

            objective:
                "Approfondir la conception, le développement et la maintenance de solutions logicielles.",

            admission:
                "Étude de dossier",

            entry:
                "BTS / HND ou diplôme équivalent selon conditions",

            evaluation:
                "CC + session normale + modalités institutionnelles",

            subjects: [
                "Génie logiciel",
                "Programmation",
                "Bases de données",
                "Conception logicielle",
                "Développement web",
                "Systèmes",
                "Projet"
            ],

            careers: [
                "Développeur",
                "Analyste programmeur",
                "Développeur web",
                "Assistant chef de projet",
                "Concepteur logiciel"
            ]

        },


        "licence-reseaux": {

            title:
                "Licence Professionnelle — Réseaux & Systèmes",

            level:
                "LICENCE PRO",

            intro:
                "Un parcours professionnel approfondi autour des systèmes, réseaux et infrastructures informatiques.",

            objective:
                "Renforcer les compétences dans la conception, l'administration et la maintenance des infrastructures réseau et systèmes.",

            admission:
                "Étude de dossier",

            entry:
                "BTS / HND ou diplôme équivalent selon conditions",

            evaluation:
                "CC + session normale + modalités institutionnelles",

            subjects: [
                "Administration réseau",
                "Systèmes",
                "Sécurité",
                "Infrastructure",
                "Virtualisation",
                "Télécommunications",
                "Projet réseau"
            ],

            careers: [
                "Administrateur réseau",
                "Administrateur systèmes",
                "Technicien infrastructure",
                "Technicien sécurité",
                "Support réseau"
            ]

        }

    };


    /* =====================================================
       11. UTILITAIRES MODAL
    ====================================================== */

    function openModal(modal) {

        if (!modal) return;

        modal.classList.add("open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        body.classList.add("modal-open");

    }


    function closeModal(modal) {

        if (!modal) return;

        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        body.classList.remove("modal-open");

    }


    document
        .querySelectorAll("[data-close-modal]")
        .forEach(element => {

            element.addEventListener(
                "click",
                () => {

                    closeModal(formationModal);
                    closeModal(orientationModal);

                }
            );

        });


    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape")
                return;

            closeModal(formationModal);
            closeModal(orientationModal);

        }
    );


    /* =====================================================
       12. MODAL FORMATION
    ====================================================== */

    const detailButtons =
        document.querySelectorAll(
            ".formation-detail-btn"
        );

    detailButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const key =
                    button.dataset.program;

                const program =
                    programs[key];

                if (!program) return;


                const level =
                    document.getElementById(
                        "modalProgramLevel"
                    );

                const title =
                    document.getElementById(
                        "modalProgramTitle"
                    );

                const intro =
                    document.getElementById(
                        "modalProgramIntro"
                    );

                const objective =
                    document.getElementById(
                        "modalObjective"
                    );

                const admission =
                    document.getElementById(
                        "modalAdmission"
                    );

                const entry =
                    document.getElementById(
                        "modalEntry"
                    );

                const evaluation =
                    document.getElementById(
                        "modalEvaluation"
                    );

                const subjects =
                    document.getElementById(
                        "modalSubjects"
                    );

                const careers =
                    document.getElementById(
                        "modalCareers"
                    );


                level.textContent =
                    program.level;

                title.textContent =
                    program.title;

                intro.textContent =
                    program.intro;

                objective.textContent =
                    program.objective;

                admission.textContent =
                    program.admission;

                entry.textContent =
                    program.entry;

                evaluation.textContent =
                    program.evaluation;


                subjects.innerHTML =
                    program.subjects
                        .map(
                            subject =>
                                `<span>${subject}</span>`
                        )
                        .join("");


                careers.innerHTML =
                    program.careers
                        .map(
                            career =>
                                `<span>${career}</span>`
                        )
                        .join("");


                openModal(
                    formationModal
                );

            }
        );

    });


    /* =====================================================
       13. ORIENTATION QUIZ
    ====================================================== */

    const quiz = {

        current: 0,

        total: 4,

        answers: [],

        questions: [

            {
                title:
                    "Quel univers vous attire le plus ?",

                options: [
                    {
                        value: "gestion",
                        text:
                            "J'aime organiser, analyser et comprendre les chiffres."
                    },
                    {
                        value: "tech",
                        text:
                            "J'aime les ordinateurs, les technologies et résoudre des problèmes."
                    },
                    {
                        value: "commerce",
                        text:
                            "J'aime négocier, vendre, échanger et travailler avec les clients."
                    },
                    {
                        value: "communication",
                        text:
                            "J'aime communiquer, créer des contenus et convaincre."
                    }
                ]
            },


            {
                title:
                    "Quel type de problème aimez-vous résoudre ?",

                options: [
                    {
                        value: "gestion",
                        text:
                            "Comprendre pourquoi les chiffres ne correspondent pas."
                    },
                    {
                        value: "tech",
                        text:
                            "Trouver pourquoi un système ou un ordinateur ne fonctionne pas."
                    },
                    {
                        value: "commerce",
                        text:
                            "Trouver comment convaincre un client ou développer une vente."
                    },
                    {
                        value: "communication",
                        text:
                            "Trouver le bon message pour atteindre un public."
                    }
                ]
            },


            {
                title:
                    "Quel environnement vous ressemble le plus ?",

                options: [
                    {
                        value: "gestion",
                        text:
                            "Une entreprise, un service administratif ou financier."
                    },
                    {
                        value: "tech",
                        text:
                            "Un environnement informatique ou technologique."
                    },
                    {
                        value: "commerce",
                        text:
                            "Une entreprise commerciale, une banque ou la logistique."
                    },
                    {
                        value: "communication",
                        text:
                            "Une organisation, une agence ou un environnement médiatique."
                    }
                ]
            },


            {
                title:
                    "Qu'aimeriez-vous surtout développer ?",

                options: [
                    {
                        value: "gestion",
                        text:
                            "Mon sens de l'analyse et de l'organisation."
                    },
                    {
                        value: "tech",
                        text:
                            "Mes compétences techniques et numériques."
                    },
                    {
                        value: "commerce",
                        text:
                            "Mes compétences commerciales et relationnelles."
                    },
                    {
                        value: "communication",
                        text:
                            "Ma créativité et ma capacité à communiquer."
                    }
                ]
            }

        ]

    };


    const startOrientation =
        document.getElementById(
            "startOrientation"
        );

    const orientationQuestion =
        document.getElementById(
            "orientationQuestion"
        );

    const quizOptions =
        document.getElementById(
            "quizOptions"
        );

    const quizProgressBar =
        document.getElementById(
            "quizProgressBar"
        );

    const quizStep =
        document.getElementById(
            "quizStep"
        );

    const quizResult =
        document.getElementById(
            "quizResult"
        );

    const resultTitle =
        document.getElementById(
            "resultTitle"
        );

    const resultText =
        document.getElementById(
            "resultText"
        );

    const resultPrograms =
        document.getElementById(
            "resultPrograms"
        );

    const restartQuiz =
        document.getElementById(
            "restartQuiz"
        );


    function renderQuizQuestion() {

        const question =
            quiz.questions[quiz.current];

        if (!question) return;


        orientationQuestion.textContent =
            question.title;


        quizStep.textContent =
            `Question ${quiz.current + 1} / ${quiz.total}`;


        const progress =
            ((quiz.current + 1) / quiz.total) * 100;

        quizProgressBar.style.width =
            `${progress}%`;


        quizOptions.innerHTML =
            question.options
                .map(
                    option => `
                        <button
                            type="button"
                            data-value="${option.value}">

                            <span>
                                <i class="ri-compass-discover-line"></i>
                            </span>

                            ${option.text}

                        </button>
                    `
                )
                .join("");


        quizOptions
            .querySelectorAll("button")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        quiz.answers.push(
                            button.dataset.value
                        );

                        quiz.current++;


                        if (
                            quiz.current >=
                            quiz.total
                        ) {

                            showQuizResult();

                        } else {

                            renderQuizQuestion();

                        }

                    }
                );

            });

    }


    function showQuizResult() {

        const counts = {

            gestion: 0,
            tech: 0,
            commerce: 0,
            communication: 0

        };


        quiz.answers.forEach(answer => {

            if (counts[answer] !== undefined) {

                counts[answer]++;

            }

        });


        const winner =
            Object.keys(counts)
                .sort(
                    (a, b) =>
                        counts[b] -
                        counts[a]
                )[0];


        const resultData = {

            gestion: {

                title:
                    "Gestion, finance & organisation",

                text:
                    "Vos réponses montrent un intérêt pour l'analyse, l'organisation et le fonctionnement des entreprises.",

                programs: [
                    "Comptabilité & Gestion",
                    "Banque & Finance",
                    "Informatique de Gestion",
                    "Gestion Logistique"
                ]

            },


            tech: {

                title:
                    "Technologies & informatique",

                text:
                    "Vous semblez attiré par les environnements techniques, numériques et la résolution de problèmes.",

                programs: [
                    "Informatique",
                    "Réseaux & Télécommunications",
                    "Génie Logiciel",
                    "Réseaux & Systèmes"
                ]

            },


            commerce: {

                title:
                    "Commerce & développement",

                text:
                    "Vous semblez apprécier les échanges, la négociation, la relation client et l'environnement commercial.",

                programs: [
                    "Commerce International",
                    "Banque & Finance",
                    "Gestion Logistique",
                    "Comptabilité & Gestion"
                ]

            },


            communication: {

                title:
                    "Communication & information",

                text:
                    "Vous semblez attiré par la communication, les contenus, les médias et la relation avec les publics.",

                programs: [
                    "Information & Communication",
                    "Communication d'entreprise",
                    "Journalisme"
                ]

            }

        };


        const result =
            resultData[winner];


        resultTitle.textContent =
            result.title;

        resultText.textContent =
            result.text;


        resultPrograms.innerHTML =
            result.programs
                .map(
                    program =>
                        `<span>${program}</span>`
                )
                .join("");


        quizOptions.hidden = true;

        quizResult.hidden = false;

        quizStep.textContent =
            "Résultat";


        quizProgressBar.style.width =
            "100%";

    }


    if (startOrientation) {

        startOrientation.addEventListener(
            "click",
            () => {

                quiz.current = 0;
                quiz.answers = [];

                quizOptions.hidden = false;

                quizResult.hidden = true;

                renderQuizQuestion();

                openModal(
                    orientationModal
                );

            }
        );

    }


    if (restartQuiz) {

        restartQuiz.addEventListener(
            "click",
            () => {

                quiz.current = 0;
                quiz.answers = [];

                quizOptions.hidden = false;

                quizResult.hidden = true;

                renderQuizQuestion();

            }
        );

    }


    /* =====================================================
       14. FAQ
    ====================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );

    faqItems.forEach(item => {

        item.addEventListener(
            "toggle",
            () => {

                if (!item.open)
                    return;

                faqItems.forEach(other => {

                    if (other !== item) {

                        other.open = false;

                    }

                });

            }
        );

    });


    /* =====================================================
       15. FORMULAIRE CONTACT
    ====================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );

    const formSuccess =
        document.getElementById(
            "formSuccess"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                if (
                    !contactForm.checkValidity()
                ) {

                    contactForm.reportValidity();

                    return;

                }


                const submit =
                    contactForm.querySelector(
                        ".form-submit"
                    );


                const original =
                    submit.innerHTML;


                submit.disabled = true;

                submit.innerHTML = `
                    Envoi en cours...
                    <i class="ri-loader-4-line"></i>
                `;


                setTimeout(
                    () => {

                        submit.disabled = false;

                        submit.innerHTML =
                            original;

                        contactForm.reset();

                        if (formSuccess) {

                            formSuccess.hidden =
                                false;

                        }

                    },
                    1000
                );

            }
        );

    }


    /* =====================================================
       16. SCROLL HERO ARROW
    ====================================================== */

    document
        .querySelectorAll("[data-scroll]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const selector =
                        button.dataset.scroll;

                    const target =
                        document.querySelector(
                            selector
                        );

                    if (!target)
                        return;

                    const offset =
                        header
                            ? header.offsetHeight
                            : 0;

                    window.scrollTo({

                        top:
                            target.offsetTop -
                            offset -
                            20,

                        behavior:
                            "smooth"

                    });

                }
            );

        });


    /* =====================================================
       17. CAREER INTERACTION
    ====================================================== */

    const careerItems =
        document.querySelectorAll(
            ".career-item"
        );

    careerItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                careerItems.forEach(
                    other =>
                        other.classList
                            .remove("active")
                );

                item.classList.add("active");

            }
        );

    });


    /* =====================================================
       18. DATE CONFIGURATION
       
       Préparation pour le backend.
    ====================================================== */

    function updateAdmissionDateInfo() {

        if (
            !CONFIG.admission.opening ||
            !CONFIG.admission.closing
        ) {

            return;

        }

        const opening =
            new Date(
                CONFIG.admission.opening
            );

        const closing =
            new Date(
                CONFIG.admission.closing
            );

        const now =
            new Date();


        if (
            now < opening
        ) {

            console.info(
                "Les admissions ouvriront le :",
                opening.toLocaleDateString("fr-FR")
            );

        }


        if (
            now >= opening &&
            now <= closing
        ) {

            console.info(
                "Admissions actuellement ouvertes."
            );

        }


        if (
            now > closing
        ) {

            console.info(
                "La période d'admission est terminée."
            );

        }

    }

    updateAdmissionDateInfo();


    /* =====================================================
       19. IMAGE ERROR FALLBACK
    ====================================================== */

    document
        .querySelectorAll("img")
        .forEach(img => {

            img.addEventListener(
                "error",
                () => {

                    img.style.background =
                        "#eeeeee";

                    img.style.objectFit =
                        "cover";

                }
            );

        });


    /* =====================================================
       20. CONSOLE
    ====================================================== */

    console.log(
        "%cISMTA — Groupe Pékékue",
        "font-size:18px;font-weight:800;color:#990000;"
    );

    console.log(
        "Interface chargée."
    );

});