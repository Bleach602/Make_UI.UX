/* =========================================================
   ISMTA — FILIÈRES OUVERTES
   Frontend prototype

   IMPORTANT :
   Les données ci-dessous sont des DONNÉES DE DÉMONSTRATION.

   Plus tard :
   remplacer formations[] par les données provenant
   de l'API Spring Boot.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       DONNÉES DE DÉMONSTRATION
    ====================================================== */

    const formations = [

        {
            id: 1,
            categorie: "Gestion & Commerce",
            nom: "Comptabilité et Gestion des Entreprises",
            diplome: "BTS",
            duree: "2 ans",
            places: 40,
            fraisInscription: 50000,
            tranche1: 150000,
            tranche2: 150000,
            tranche3: 100000,
            ouverte: true,
            description:
                "Une formation orientée vers la comptabilité, la gestion financière et l'administration des entreprises.",
            debouches:
                "Cabinets comptables, entreprises, services administratifs, banques et structures de gestion."
        },

        {
            id: 2,
            categorie: "Gestion & Commerce",
            nom: "Gestion Logistique et Transport",
            diplome: "BTS",
            duree: "2 ans",
            places: 35,
            fraisInscription: 50000,
            tranche1: 150000,
            tranche2: 150000,
            tranche3: 100000,
            ouverte: true,
            description:
                "Formation consacrée à l'organisation des flux, à la logistique, au transport et à la gestion des opérations.",
            debouches:
                "Entreprises de transport, plateformes logistiques, services achats, distribution et chaînes d'approvisionnement."
        },

        {
            id: 3,
            categorie: "Gestion & Commerce",
            nom: "Banque et Finance",
            diplome: "DSEP",
            duree: "2 ans",
            places: 30,
            fraisInscription: 50000,
            tranche1: 175000,
            tranche2: 150000,
            tranche3: 125000,
            ouverte: true,
            description:
                "Formation dédiée aux mécanismes bancaires, financiers et à la gestion des opérations financières.",
            debouches:
                "Banques, établissements financiers, assurances, services financiers et entreprises."
        },

        {
            id: 4,
            categorie: "Gestion & Commerce",
            nom: "Commerce International",
            diplome: "BTS",
            duree: "2 ans",
            places: 25,
            fraisInscription: 50000,
            tranche1: 150000,
            tranche2: 150000,
            tranche3: 100000,
            ouverte: true,
            description:
                "Formation centrée sur les échanges internationaux, le commerce, la négociation et les opérations import-export.",
            debouches:
                "Entreprises commerciales, import-export, transit, distribution et organisations internationales."
        },

        {
            id: 5,
            categorie: "Communication",
            nom: "Communication des Organisations",
            diplome: "DSEP",
            duree: "2 ans",
            places: 25,
            fraisInscription: 50000,
            tranche1: 150000,
            tranche2: 150000,
            tranche3: 100000,
            ouverte: true,
            description:
                "Formation consacrée aux stratégies de communication, aux relations publiques et à la communication institutionnelle.",
            debouches:
                "Services communication, agences, entreprises, institutions et organisations."
        },

        {
            id: 6,
            categorie: "Communication",
            nom: "Journalisme",
            diplome: "BTS",
            duree: "2 ans",
            places: 20,
            fraisInscription: 50000,
            tranche1: 150000,
            tranche2: 150000,
            tranche3: 100000,
            ouverte: true,
            description:
                "Formation orientée vers les techniques journalistiques, la collecte de l'information et la production de contenus.",
            debouches:
                "Presse, médias numériques, radio, télévision et services de communication."
        },

        {
            id: 7,
            categorie: "Informatique & Réseaux",
            nom: "Maintenance des Systèmes Informatiques",
            diplome: "BTS",
            duree: "2 ans",
            places: 35,
            fraisInscription: 50000,
            tranche1: 175000,
            tranche2: 150000,
            tranche3: 125000,
            ouverte: true,
            description:
                "Formation axée sur la maintenance, l'administration et le fonctionnement des systèmes informatiques.",
            debouches:
                "Services informatiques, entreprises, administrations, maintenance et support technique."
        },

        {
            id: 8,
            categorie: "Informatique & Réseaux",
            nom: "Télécommunications",
            diplome: "DSEP",
            duree: "2 ans",
            places: 30,
            fraisInscription: 50000,
            tranche1: 175000,
            tranche2: 150000,
            tranche3: 125000,
            ouverte: true,
            description:
                "Formation dédiée aux technologies de télécommunication, aux réseaux et aux infrastructures numériques.",
            debouches:
                "Opérateurs télécoms, intégrateurs, entreprises technologiques et services réseaux."
        },

        {
            id: 9,
            categorie: "Informatique & Réseaux",
            nom: "Réseaux et Sécurité",
            diplome: "DSEP",
            duree: "2 ans",
            places: 25,
            fraisInscription: 50000,
            tranche1: 175000,
            tranche2: 150000,
            tranche3: 125000,
            ouverte: true,
            description:
                "Formation orientée vers les infrastructures réseaux, leur administration et les principes de sécurité informatique.",
            debouches:
                "Administration réseaux, sécurité informatique, support infrastructure et entreprises technologiques."
        },

        {
            id: 10,
            categorie: "Santé",
            nom: "Sciences Infirmières",
            diplome: "DSEP",
            duree: "2 ans",
            places: 40,
            fraisInscription: 50000,
            tranche1: 175000,
            tranche2: 150000,
            tranche3: 125000,
            ouverte: true,
            description:
                "Formation dans le domaine des soins infirmiers et de la prise en charge des patients.",
            debouches:
                "Établissements de santé, structures médicales, centres de soins et organisations sanitaires."
        },

        {
            id: 11,
            categorie: "Santé",
            nom: "Techniques de Laboratoire et d'Analyse Médicale",
            diplome: "DSEP",
            duree: "2 ans",
            places: 25,
            fraisInscription: 50000,
            tranche1: 175000,
            tranche2: 150000,
            tranche3: 125000,
            ouverte: true,
            description:
                "Formation consacrée aux techniques de laboratoire, aux analyses et aux procédures de diagnostic biologique.",
            debouches:
                "Laboratoires médicaux, établissements de santé, structures d'analyses et centres spécialisés."
        },

        {
            id: 12,
            categorie: "Industrie & Technique",
            nom: "Génie Électrique et Télécommunication",
            diplome: "DSEP",
            duree: "2 ans",
            places: 20,
            fraisInscription: 50000,
            tranche1: 175000,
            tranche2: 150000,
            tranche3: 125000,
            ouverte: true,
            description:
                "Formation orientée vers les systèmes électriques, les technologies de communication et les infrastructures techniques.",
            debouches:
                "Entreprises techniques, télécommunications, maintenance et installations électriques."
        }

    ];


    /* =====================================================
       DOM ELEMENTS
    ====================================================== */

    const formationsGrid =
        document.getElementById("formationsGrid");

    const searchInput =
        document.getElementById("searchInput");

    const clearSearch =
        document.getElementById("clearSearch");

    const categoryFilters =
        document.getElementById("categoryFilters");

    const resultsCounter =
        document.getElementById("resultsCounter");

    const activeFilterText =
        document.getElementById("activeFilterText");

    const sortSelect =
        document.getElementById("sortSelect");

    const emptyState =
        document.getElementById("emptyState");

    const resetFilters =
        document.getElementById("resetFilters");

    const formationModal =
        document.getElementById("formationModal");

    const modalContent =
        document.getElementById("modalContent");

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    const currentYear =
        document.getElementById("currentYear");


    /* =====================================================
       STATE
    ====================================================== */

    let activeCategory = "Toutes";

    let searchTerm = "";

    let sortMode = "default";


    /* =====================================================
       UTILITIES
    ====================================================== */

    function formatPrice(value) {

        return new Intl.NumberFormat("fr-FR").format(value) +
            " FCFA";

    }


    function normalizeText(value) {

        return String(value)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

    }


    function calculateTotal(formation) {

        return (
            formation.fraisInscription +
            formation.tranche1 +
            formation.tranche2 +
            formation.tranche3
        );

    }


    /* =====================================================
       CATEGORIES
    ====================================================== */

    function getCategories() {

        const categories = formations
            .filter(item => item.ouverte)
            .map(item => item.categorie);

        return [
            "Toutes",
            ...new Set(categories)
        ];

    }


    function renderFilters() {

        if (!categoryFilters) return;

        const categories = getCategories();

        categoryFilters.innerHTML = "";

        categories.forEach(category => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "filter-btn" +
                (category === activeCategory
                    ? " active"
                    : "");

            button.dataset.category = category;

            button.textContent = category;

            button.addEventListener("click", () => {

                activeCategory = category;

                renderFilters();

                renderFormations();

            });

            categoryFilters.appendChild(button);

        });

    }


    /* =====================================================
       FILTER + SEARCH
    ====================================================== */

    function getFilteredFormations() {

        let results = formations.filter(
            formation => formation.ouverte
        );


        /* Filtre catégorie */

        if (activeCategory !== "Toutes") {

            results = results.filter(
                formation =>
                    formation.categorie === activeCategory
            );

        }


        /* Recherche */

        if (searchTerm.trim() !== "") {

            const query =
                normalizeText(searchTerm);

            results = results.filter(formation => {

                const searchableText = normalizeText(
                    [
                        formation.nom,
                        formation.categorie,
                        formation.diplome,
                        formation.duree,
                        formation.description,
                        formation.debouches
                    ].join(" ")
                );

                return searchableText.includes(query);

            });

        }


        /* Tri */

        switch (sortMode) {

            case "name":

                results.sort((a, b) =>
                    a.nom.localeCompare(
                        b.nom,
                        "fr",
                        { sensitivity: "base" }
                    )
                );

                break;


            case "places":

                results.sort(
                    (a, b) => b.places - a.places
                );

                break;


            case "price":

                results.sort(
                    (a, b) =>
                        calculateTotal(a) -
                        calculateTotal(b)
                );

                break;


            default:
                break;
        }


        return results;

    }


    /* =====================================================
       CARD
    ====================================================== */

    function createFormationCard(formation) {

        const total =
            calculateTotal(formation);

        const article =
            document.createElement("article");

        article.className = "formation-card";

        article.innerHTML = `

            <div class="card-top">

                <span class="card-category">
                    ${formation.categorie}
                </span>

                <h3 class="card-title">
                    ${formation.nom}
                </h3>

                <div class="card-meta">

                    <span>
                        <i class="ri-award-line"></i>
                        ${formation.diplome}
                    </span>

                    <span>
                        <i class="ri-time-line"></i>
                        ${formation.duree}
                    </span>

                </div>

            </div>


            <div class="card-availability">

                <span class="availability-label">

                    <span class="availability-dot"></span>

                    Places disponibles

                </span>

                <strong class="availability-number">
                    ${formation.places} places
                </strong>

            </div>


            <div class="card-pricing">

                <div class="pricing-heading">
                    Modalités financières
                </div>

                <div class="price-row">

                    <span>
                        Frais d'inscription
                    </span>

                    <span>
                        ${formatPrice(
                            formation.fraisInscription
                        )}
                    </span>

                </div>

                <div class="price-row">

                    <span>
                        Tranche 1
                    </span>

                    <span>
                        ${formatPrice(
                            formation.tranche1
                        )}
                    </span>

                </div>

                <div class="price-row">

                    <span>
                        Tranche 2
                    </span>

                    <span>
                        ${formatPrice(
                            formation.tranche2
                        )}
                    </span>

                </div>

                <div class="price-row">

                    <span>
                        Tranche 3
                    </span>

                    <span>
                        ${formatPrice(
                            formation.tranche3
                        )}
                    </span>

                </div>

                <div class="price-row total">

                    <span>
                        Total
                    </span>

                    <span>
                        ${formatPrice(total)}
                    </span>

                </div>

            </div>


            <div class="card-actions">

                <button
                    type="button"
                    class="btn btn-outline details-btn"
                    data-id="${formation.id}"
                >
                    <i class="ri-eye-line"></i>
                    Voir détails
                </button>

                <a
                    href="../index.html#contact"
                    class="btn btn-primary"
                    data-register="${formation.id}"
                >
                    <i class="ri-arrow-right-up-line"></i>
                    S'inscrire
                </a>

            </div>
        `;


        /* Bouton détails */

        const detailsButton =
            article.querySelector(".details-btn");

        detailsButton.addEventListener(
            "click",
            () => openFormationModal(formation.id)
        );


        /* Inscription */

        const registerButton =
            article.querySelector(
                "[data-register]"
            );

        registerButton.addEventListener(
            "click",
            () => {

                /*
                 * FUTUR BACKEND
                 *
                 * Plus tard, on pourra remplacer ce lien
                 * par :
                 *
                 * /login?formation=123&session=2026
                 *
                 * L'id de la formation est déjà disponible
                 * dans data-register.
                 */

                console.log(
                    "Formation sélectionnée :",
                    formation
                );

            }
        );


        return article;

    }


    /* =====================================================
       RENDER FORMATIONS
    ====================================================== */

    function renderFormations() {

        const results =
            getFilteredFormations();


        /* Nettoyage */

        formationsGrid.innerHTML = "";


        /* Compteur */

        if (results.length === 1) {

            resultsCounter.innerHTML = `
                <strong>1</strong>
                <span>formation</span>
            `;

        } else {

            resultsCounter.innerHTML = `
                <strong>${results.length}</strong>
                <span>formations</span>
            `;

        }


        /* Texte filtre */

        if (activeCategory === "Toutes") {

            activeFilterText.textContent =
                searchTerm
                    ? `Résultats pour « ${searchTerm} »`
                    : "Toutes les formations";

        } else {

            activeFilterText.textContent =
                searchTerm
                    ? `${activeCategory} · recherche « ${searchTerm} »`
                    : activeCategory;

        }


        /* Empty state */

        if (results.length === 0) {

            formationsGrid.hidden = true;

            emptyState.hidden = false;

            return;

        }


        formationsGrid.hidden = false;

        emptyState.hidden = true;


        /* Cartes */

        const fragment =
            document.createDocumentFragment();

        results.forEach(formation => {

            fragment.appendChild(
                createFormationCard(formation)
            );

        });

        formationsGrid.appendChild(fragment);

    }


    /* =====================================================
       SEARCH EVENT
    ====================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            event => {

                searchTerm =
                    event.target.value;

                clearSearch.hidden =
                    searchTerm.length === 0;

                renderFormations();

            }
        );

    }


    /* =====================================================
       CLEAR SEARCH
    ====================================================== */

    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            () => {

                searchInput.value = "";

                searchTerm = "";

                clearSearch.hidden = true;

                searchInput.focus();

                renderFormations();

            }
        );

    }


    /* =====================================================
       SORT
    ====================================================== */

    if (sortSelect) {

        sortSelect.addEventListener(
            "change",
            event => {

                sortMode =
                    event.target.value;

                renderFormations();

            }
        );

    }


    /* =====================================================
       RESET
    ====================================================== */

    if (resetFilters) {

        resetFilters.addEventListener(
            "click",
            resetAllFilters
        );

    }


    function resetAllFilters() {

        activeCategory = "Toutes";

        searchTerm = "";

        sortMode = "default";

        if (searchInput) {
            searchInput.value = "";
        }

        if (clearSearch) {
            clearSearch.hidden = true;
        }

        if (sortSelect) {
            sortSelect.value = "default";
        }

        renderFilters();

        renderFormations();

    }


    /* =====================================================
       MODAL
    ====================================================== */

    function openFormationModal(id) {

        const formation =
            formations.find(
                item => item.id === Number(id)
            );

        if (!formation) return;

        const total =
            calculateTotal(formation);


        modalContent.innerHTML = `

            <span class="modal-category">
                ${formation.categorie}
            </span>

            <h2
                class="modal-title"
                id="modalTitle"
            >
                ${formation.nom}
            </h2>


            <div class="modal-meta">

                <span>
                    <i class="ri-award-line"></i>
                    ${formation.diplome}
                </span>

                <span>
                    <i class="ri-time-line"></i>
                    ${formation.duree}
                </span>

                <span>
                    <i class="ri-group-line"></i>
                    ${formation.places} places
                </span>

            </div>


            <div class="modal-section">

                <h3>
                    Présentation
                </h3>

                <p>
                    ${formation.description}
                </p>

            </div>


            <div class="modal-section">

                <h3>
                    Débouchés
                </h3>

                <p>
                    ${formation.debouches}
                </p>

            </div>


            <div class="modal-section">

                <h3>
                    Modalités financières
                </h3>

                <div class="modal-price-box">

                    <div class="modal-price-row">

                        <span>
                            Frais d'inscription
                        </span>

                        <strong>
                            ${formatPrice(
                                formation.fraisInscription
                            )}
                        </strong>

                    </div>

                    <div class="modal-price-row">

                        <span>
                            Tranche 1
                        </span>

                        <strong>
                            ${formatPrice(
                                formation.tranche1
                            )}
                        </strong>

                    </div>

                    <div class="modal-price-row">

                        <span>
                            Tranche 2
                        </span>

                        <strong>
                            ${formatPrice(
                                formation.tranche2
                            )}
                        </strong>

                    </div>

                    <div class="modal-price-row">

                        <span>
                            Tranche 3
                        </span>

                        <strong>
                            ${formatPrice(
                                formation.tranche3
                            )}
                        </strong>

                    </div>

                    <div class="modal-price-row total">

                        <span>
                            Total
                        </span>

                        <strong>
                            ${formatPrice(total)}
                        </strong>

                    </div>

                </div>

            </div>


            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-outline"
                    data-close-modal
                >
                    Fermer
                </button>

                <a
                    href="../index.html#contact"
                    class="btn btn-primary"
                >
                    <i class="ri-arrow-right-up-line"></i>
                    S'inscrire
                </a>

            </div>
        `;


        formationModal.classList.add("is-open");

        formationModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("modal-open");


        /* Boutons fermeture générés */

        modalContent
            .querySelectorAll("[data-close-modal]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    closeFormationModal
                );

            });

    }


    function closeFormationModal() {

        formationModal.classList.remove(
            "is-open"
        );

        formationModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    /* Fermeture */

    formationModal
        .querySelectorAll("[data-close-modal]")
        .forEach(element => {

            element.addEventListener(
                "click",
                closeFormationModal
            );

        });


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                formationModal.classList.contains(
                    "is-open"
                )
            ) {

                closeFormationModal();

            }

        }
    );


    /* =====================================================
       MENU MOBILE
    ====================================================== */

    if (menuToggle && mainNav) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    mainNav.classList.toggle(
                        "is-open"
                    );

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                const icon =
                    menuToggle.querySelector("i");

                if (icon) {

                    icon.className =
                        isOpen
                            ? "ri-close-line"
                            : "ri-menu-3-line";

                }

            }
        );


        /* Fermer après clic */

        mainNav
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        mainNav.classList.remove(
                            "is-open"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        const icon =
                            menuToggle.querySelector(
                                "i"
                            );

                        if (icon) {
                            icon.className =
                                "ri-menu-3-line";
                        }

                    }
                );

            });

    }


    /* =====================================================
       ANNÉE FOOTER
    ====================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       INITIALISATION
    ====================================================== */

    renderFilters();

    renderFormations();


    /* =====================================================
       FUTURE API SPRING BOOT
    ======================================================

       Plus tard, tu pourras remplacer :

           const formations = [...]

       par quelque chose comme :

           async function loadFormations() {

               const response = await fetch(
                   "/api/public/offres"
               );

               const data = await response.json();

               formations = data;

               renderFilters();
               renderFormations();
           }

       L'interface de filtrage n'aura pas besoin
       d'être reconstruite.

    ====================================================== */

});