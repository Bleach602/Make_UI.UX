/* =========================================================
   GROUPE PÉKÉKUE — JavaScript avec traduction FR/EN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;
  const header = document.getElementById("header");
  const progress = document.getElementById("progress");
  const loader = document.getElementById("loader");
  const burger = document.getElementById("burger");
  const mobile = document.getElementById("mobile");

  /* =========================================================
     TRADUCTIONS
     ========================================================= */
  const translations = {
    fr: {
      /* META */
      "meta.title": "Groupe Pékékue — Éduquer · Former · Transformer",

      /* NAV */
      "nav.group": "Le Groupe",
      "nav.paths": "Parcours",
      "nav.institutes": "Établissements",
      "nav.campus": "Campus",
      "nav.faq": "FAQ",
      "nav.contact": "Contact",
      "nav.login": "Se connecter",
      "nav.apply": "S'inscrire",

      /* HERO */
      "hero.tag": "CAMPUS SCOLAIRE & UNIVERSITAIRE",
      "hero.title1": "L'excellence qui",
      "hero.title2": "ouvre des horizons.",
      "hero.desc": "Du secondaire à l'enseignement supérieur, de la formation professionnelle à la formation des enseignants : un même élan pour apprendre, progresser et bâtir l'avenir.",
      "hero.cta1": "Trouver mon parcours",
      "hero.cta2": "Explorer le campus",
      "hero.stat1": "établissements",
      "hero.stat2": "implantations",
      "hero.stat3": "Bilingue",
      "hero.motto": "ÉDUQUER · FORMER · TRANSFORMER",

      /* GROUP */
      "group.tag": "LE GROUPE",
      "group.title1": "Une vision.",
      "group.title2": "Quatre chemins.",
      "group.desc": "Le Groupe Pékékue rassemble quatre établissements complémentaires autour d'une conviction : chaque étape du parcours éducatif mérite exigence, clarté et ambition.",
      "group.link": "Découvrir nos établissements",
      "group.caption": "Une communauté en mouvement",
      "group.aside": "Établissements réunis sous une même ambition éducative, à Foumban et à Yaoundé.",

      /* PORTAL */
      "portal.tag": "AVANT DE VOUS INSCRIRE",
      "portal.title1": "Une question vous trotte en tête ?",
      "portal.title2": "Nous avons la réponse.",
      "portal.desc": "Identifiez la situation qui vous ressemble. Nous vous orientons vers le bon établissement en quelques secondes.",

      /* JOURNEY */
      "journey.cta": "Voir le parcours",
      "journey1.title": "Je suis élève",
      "journey1.question": "« Où serai-je le mieux encadré pour réussir ? »",
      "journey2.title": "Je suis étudiant",
      "journey2.question": "« Quel diplôme m'ouvrira vraiment des portes ? »",
      "journey3.title": "Je veux me former",
      "journey3.question": "« Comment apprendre un métier qui nourrit ? »",
      "journey4.title": "Je veux enseigner",
      "journey4.question": "« Comment transmettre ce que je sais ? »",

      /* JOURNEY RESULT */
      "journeyResult.tag": "PARCOURS RECOMMANDÉ",
      "journeyResult.title1": "Collège Bilingue Pékékue",
      "journeyResult.text1": "Un cadre structuré pour accompagner les jeunes dans les étapes fondatrices de leur parcours.",
      "journeyResult.title2": "ISMTA",
      "journeyResult.text2": "Un univers d'enseignement supérieur orienté vers les compétences, le management et les technologies appliquées.",
      "journeyResult.title3": "IFP-P",
      "journeyResult.text3": "Une orientation vers les compétences pratiques, la professionnalisation et les perspectives d'insertion.",
      "journeyResult.title4": "ENIEG Pékékue",
      "journeyResult.text4": "Un parcours dédié à la formation des futurs acteurs de l'éducation dans un cadre privé laïque bilingue.",
      "journeyResult.cta": "Découvrir",

      /* INSTITUTIONS */
      "inst.tag": "NOS ÉTABLISSEMENTS",
      "inst.title1": "Quatre univers.",
      "inst.title2": "Un même cap.",
      "inst.desc": "Chaque établissement possède son identité, ses publics et ses parcours. Ensemble, ils composent un écosystème éducatif cohérent du secondaire au supérieur.",

      "inst1.cat": "01 · ENSEIGNEMENT SECONDAIRE",
      "inst1.name1": "Collège",
      "inst1.name2": "Pékékue",
      "inst1.hook": "Et si votre enfant trouvait ici le cadre qui révélera tout son potentiel ?",
      "inst1.desc": "Savoirs solides, autonomie, ouverture bilingue et préparation sereine aux prochaines étapes.",
      "inst1.cta": "Découvrir l'établissement",

      "inst2.cat": "02 · ENSEIGNEMENT SUPÉRIEUR",
      "inst2.name1": "ISMTA",
      "inst2.name2": "Management & technologies",
      "inst2.hook": "Et si votre diplôme devenait votre meilleur atout sur le marché de l'emploi ?",
      "inst2.desc": "Parcours professionnalisants en management, gestion, commerce, banque-finance et technologies.",
      "inst2.cta": "Découvrir l'ISMTA",

      "inst3.cat": "03 · FORMATION PROFESSIONNELLE",
      "inst3.name1": "IFP-P",
      "inst3.name2": "Compétences & insertion",
      "inst3.hook": "Et si un vrai savoir-faire changeait votre avenir dès les prochains mois ?",
      "inst3.desc": "Formations pratiques orientées vers l'emploi, l'entrepreneuriat et l'insertion professionnelle.",
      "inst3.cta": "Découvrir l'IFP-P",

      "inst4.cat": "04 · FORMATION DES ENSEIGNANTS",
      "inst4.name1": "ENIEG",
      "inst4.name2": "Privée laïque bilingue",
      "inst4.hook": "Et si vous deveniez celle ou celui qui transmet le savoir de demain ?",
      "inst4.desc": "Formation exigeante des futurs enseignants, avec ouverture francophone et anglophone.",
      "inst4.cta": "Découvrir l'ENIEG",

      /* ADN */
      "adn.tag": "NOTRE ADN",
      "adn.title1": "Quatre principes",
      "adn.title2": "qui nous engagent.",
      "adn.desc": "Une pédagogie d'excellence se construit sur des valeurs claires, appliquées chaque jour dans chaque établissement.",
      "value1.title": "Excellence",
      "value1.desc": "Faire progresser chaque apprenant avec rigueur et constance.",
      "value2.title": "Ouverture",
      "value2.desc": "Préparer les apprenants à évoluer dans un monde en transformation.",
      "value3.title": "Accompagnement",
      "value3.desc": "Placer l'humain et le parcours de l'apprenant au centre.",
      "value4.title": "Avenir",
      "value4.desc": "Construire des compétences utiles pour les défis de demain.",

      /* FOUNDER */
      "founder.role": "FONDATEUR & PROMOTEUR",
      "founder.tag": "MOT DU FONDATEUR",
      "founder.quote1": "« Construire aujourd'hui",
      "founder.quote2": "l'élite de demain. »",
      "founder.desc": "Notre ambition : offrir à chaque apprenant les moyens de comprendre son environnement, de développer ses compétences et de participer pleinement à la construction de son avenir.",
      "founder.signature": "Fondateur & promoteur",
      "founder.cta": "Lire le message complet",

      /* ADMIN */
      "admin.tag": "CORPS ADMINISTRATIF",
      "admin.title1": "Les femmes et les hommes",
      "admin.title2": "au service du projet.",
      "admin.desc": "Une équipe dirigeante engagée au service de la vision académique et institutionnelle du Groupe.",
      "admin1.role": "Fondateur & Promoteur",
      "admin1.bio": "Vision stratégique et orientation institutionnelle du Groupe.",
      "admin2.title": "Direction Générale",
      "admin2.role": "Coordination générale",
      "admin2.bio": "Pilotage opérationnel des quatre établissements.",
      "admin3.title": "Direction Académique",
      "admin3.role": "Pédagogie & programmes",
      "admin3.bio": "Suivi pédagogique et coordination des parcours.",
      "admin4.title": "Admissions & Accueil",
      "admin4.role": "Accueil & inscriptions",
      "admin4.bio": "Accueil des familles et accompagnement des candidats.",

      /* CREDS */
      "creds.tag": "AGRÉMENTS & TUTELLES",
      "creds.title1": "Un cadre institutionnel",
      "creds.title2": "officiellement reconnu.",
      "creds.desc": "Toutes nos formations sont autorisées et agréées par les ministères camerounais compétents. Chaque établissement dispose d'un arrêté officiel de création.",
      "cred1.title": "Ministère des Enseignements Secondaires",
      "cred1.text": "Tutelle officielle du Collège Bilingue Pékékue. Arrêté de création n° 213/21 du 09 mai 2021.",
      "cred2.title": "Ministère de l'Enseignement Supérieur",
      "cred2.text": "Tutelle officielle de l'ISMTA et de l'ENIEG. Autorisés par arrêté n° 13/0076/MINESUP.",
      "cred3.label": "TUTELLE ACADÉMIQUE",
      "cred3.title": "Universités partenaires",
      "cred3.text": "Partenariats académiques avec l'Université de Dschang et l'Université de Yaoundé II.",
      "cred3.badge": "Convention signée",
      "cred4.title": "Ministère de la Formation Professionnelle",
      "cred4.text": "Tutelle officielle de l'IFP-P. Établissements légalement enregistrés avec autorisations en règle.",
      "cred4.badge": "Documents disponibles",
      "cred.badge": "Agrément actif",
      "creds.foot": "Les arrêtés et agréments sont consultables sur demande auprès de l'administration. Nous encourageons toute famille à les vérifier avant inscription.",

      /* EXP */
      "exp.tag": "EXPÉRIENCES",
      "exp.title1": "Ils racontent",
      "exp.title2": "leur parcours.",
      "exp.desc": "Témoignages vidéo, photos et récits d'élèves, d'étudiants, de parents et d'anciens apprenants — découvrez la vie du campus à travers leurs voix.",
      "exp.link": "Voir plus",
      "exp.cta": "Voir toutes les expériences",
      "exp1.badge": "TÉMOIGNAGE VIDÉO",
      "exp1.cat": "ISMTA · ÉTUDIANTE",
      "exp1.title": "« Une expérience qui se raconte mieux qu'elle ne se résume. »",
      "exp1.desc": "Découvrez le parcours d'une étudiante de l'ISMTA et sa vision de la formation supérieure.",
      "exp2.badge": "PHOTO · ÉLÈVE",
      "exp2.cat": "COLLÈGE · ÉLÈVE",
      "exp2.title": "Mon parcours au Collège Pékékue",
      "exp2.desc": "Comment ce cadre m'a permis de progresser et de trouver confiance.",
      "exp3.cat": "FAMILLE · PARENT",
      "exp3.title": "Le regard d'un parent",
      "exp3.desc": "« J'ai vu mon fils s'épanouir. Le bilinguisme n'est pas un slogan ici, c'est une réalité quotidienne. »",
      "exp4.badge": "PHOTO · DIPLÔMÉE",
      "exp4.cat": "ENIEG · DIPLÔMÉE",
      "exp4.title": "Devenir enseignante aujourd'hui",
      "exp4.desc": "Une vocation préparée avec exigence et passion.",

      /* CAMPUS */
      "campus.tag": "LA VIE SUR NOS CAMPUS",
      "campus.title1": "Voir. Entendre.",
      "campus.title2": "Vivre Pékékue.",
      "campus.desc": "Une immersion visuelle pour découvrir les campus, les salles, les laboratoires et l'ambiance réelle de chaque implantation.",
      "campus1.caption": "Le campus comme lieu de vie",
      "campus2.caption": "Apprendre ensemble",
      "campus3.caption": "Collaborer & progresser",
      "campus.gallery.tag": "GALERIE COMPLÈTE",
      "campus.gallery.title": "Voir tous nos campus en images",

      /* FAQ */
      "faq.tag": "QUESTIONS FRÉQUENTES",
      "faq.title1": "Avant de vous inscrire,",
      "faq.title2": "voici l'essentiel.",
      "faq.desc": "Une réponse claire au bon moment peut faire toute la différence. Cette FAQ est pensée comme une porte d'entrée vers l'information utile.",
      "faq.cta": "Une autre question ?",
      "faq1.q": "Comment choisir mon établissement ?",
      "faq1.a": "Commencez par le portail interactif « Avant de vous inscrire » et sélectionnez votre situation.",
      "faq2.q": "Quels sont les établissements du Groupe ?",
      "faq2.a": "Le Groupe réunit quatre univers : Collège Bilingue Pékékue, ISMTA, IFP-P et ENIEG Pékékue.",
      "faq3.q": "Où sont implantés les établissements ?",
      "faq3.a": "Le Groupe est présent à Foumban (Région de l'Ouest) et à Yaoundé (Région du Centre).",
      "faq4.q": "Comment obtenir les informations d'admission ?",
      "faq4.a": "Via WhatsApp, téléphone ou email. Notre équipe vous répond sous 24 heures ouvrées.",
      "faq5.q": "Puis-je demander une orientation avant de candidater ?",
      "faq5.a": "Oui. L'expérience est conçue pour orienter avant l'inscription.",
      "faq6.q": "Quels sont les concours et dates d'admission ?",
      "faq6.a": "Pour le Collège Bilingue Pékékue : concours d'entrée en 6ᵉ, 5ᵉ et 4ᵉ les 16 mai, 08 juin, 24 août et 01 septembre 2026.",

      /* LOC */
      "loc.tag": "NOS IMPLANTATIONS",
      "loc.title1": "Deux territoires.",
      "loc.title2": "Un même élan.",
      "loc.desc": "Retrouvez nos campus à Foumban et à Yaoundé. Cliquez sur un emplacement pour ouvrir l'itinéraire Google Maps.",
      "loc1.region": "Noun · Région de l'Ouest",
      "loc2.region": "Mfoundi · Région du Centre",
      "loc.link": "Ouvrir dans Google Maps",

      /* NEXT */
      "next.tag": "VOTRE PROCHAINE ÉTAPE",
      "next.title1": "Et si votre histoire",
      "next.title2": "commençait ici ?",
      "next.desc": "Découvrez les établissements, les formations, les conditions d'admission et les prochaines échéances.",
      "next.cta1": "Commencer mon parcours",
      "next.cta2": "Nous contacter",

      /* FOOTER */
      "footer.about": "Un écosystème éducatif camerounais engagé pour la formation, l'excellence et la préparation des talents de demain.",
      "footer.inst.title": "Établissements",
      "footer.discover.title": "Découvrir",
      "footer.discover.about": "Présentation",
      "footer.discover.dna": "Notre ADN",
      "footer.discover.creds": "Agréments officiels",
      "footer.discover.exp": "Expériences vidéo",
      "footer.or.title": "Orientation",
      "footer.or.paths": "Trouver mon parcours",
      "footer.or.faq": "Questions fréquentes",
      "footer.or.loc": "Nos implantations",
      "footer.contact.title": "Nous joindre",
      "footer.rights": "Tous droits réservés.",
      "footer.legal": "Mentions légales",
      "footer.privacy": "Politique de confidentialité",
      "footer.sig": "Cameroun · Éducation · Formation · Avenir",

      /* MODALES */
      "modal.contact.tag": "NOUS CONTACTER",
      "modal.contact.title1": "Parlons de votre",
      "modal.contact.title2": "projet.",
      "modal.contact.desc": "Choisissez le canal qui vous convient. Notre équipe vous répond sous 24 h ouvrées.",
      "modal.contact.wa": "Écrire à l'administration",
      "modal.contact.tel": "Admissions ENIEG",
      "modal.contact.email": "Email",
      "modal.founder.tag": "MESSAGE DU FONDATEUR",
      "modal.founder.title1": "Construire par",
      "modal.founder.title2": "l'éducation.",
      "modal.founder.quote": "« Notre engagement est de contribuer à la formation d'une jeunesse capable de comprendre son environnement, de développer ses compétences et de participer pleinement à la construction de son avenir. »",
      "modal.founder.signature": "Fondateur & promoteur"
    },

    en: {
      /* META */
      "meta.title": "Pékékue Group — Educate · Train · Transform",

      /* NAV */
      "nav.group": "The Group",
      "nav.paths": "Paths",
      "nav.institutes": "Institutions",
      "nav.campus": "Campus",
      "nav.faq": "FAQ",
      "nav.contact": "Contact",
      "nav.login": "Sign in",
      "nav.apply": "Apply",

      /* HERO */
      "hero.tag": "SCHOOL & UNIVERSITY CAMPUS",
      "hero.title1": "Excellence that",
      "hero.title2": "opens horizons.",
      "hero.desc": "From secondary school to higher education, from vocational training to teacher training: one same momentum to learn, grow and build the future.",
      "hero.cta1": "Find my path",
      "hero.cta2": "Explore the campus",
      "hero.stat1": "institutions",
      "hero.stat2": "locations",
      "hero.stat3": "Bilingual",
      "hero.motto": "EDUCATE · TRAIN · TRANSFORM",

      /* GROUP */
      "group.tag": "THE GROUP",
      "group.title1": "One vision.",
      "group.title2": "Four paths.",
      "group.desc": "The Pékékue Group brings together four complementary institutions around one conviction: every stage of the educational journey deserves rigor, clarity and ambition.",
      "group.link": "Discover our institutions",
      "group.caption": "A community in motion",
      "group.aside": "Institutions united under a single educational ambition, in Foumban and Yaoundé.",

      /* PORTAL */
      "portal.tag": "BEFORE YOU ENROLL",
      "portal.title1": "A question on your mind?",
      "portal.title2": "We have the answer.",
      "portal.desc": "Identify the situation that matches you. We guide you to the right institution in seconds.",

      /* JOURNEY */
      "journey.cta": "See the path",
      "journey1.title": "I am a pupil",
      "journey1.question": "\u201CWhere will I be best supported to succeed?\u201D",
      "journey2.title": "I am a student",
      "journey2.question": "\u201CWhich degree will truly open doors for me?\u201D",
      "journey3.title": "I want to train",
      "journey3.question": "\u201CHow to learn a trade that sustains me?\u201D",
      "journey4.title": "I want to teach",
      "journey4.question": "\u201CHow to pass on what I know?\u201D",

      /* JOURNEY RESULT */
      "journeyResult.tag": "RECOMMENDED PATH",
      "journeyResult.title1": "Bilingual College Pékékue",
      "journeyResult.text1": "A structured environment to support young people through the foundational stages of their journey.",
      "journeyResult.title2": "ISMTA",
      "journeyResult.text2": "A higher education universe oriented towards skills, management and applied technologies.",
      "journeyResult.title3": "IFP-P",
      "journeyResult.text3": "An orientation towards practical skills, professionalization and employment prospects.",
      "journeyResult.title4": "ENIEG Pékékue",
      "journeyResult.text4": "A program dedicated to training future education professionals in a private bilingual secular setting.",
      "journeyResult.cta": "Discover",

      /* INSTITUTIONS */
      "inst.tag": "OUR INSTITUTIONS",
      "inst.title1": "Four universes.",
      "inst.title2": "One same course.",
      "inst.desc": "Each institution has its own identity, audiences and paths. Together, they form a coherent educational ecosystem from secondary to higher education.",

      "inst1.cat": "01 · SECONDARY EDUCATION",
      "inst1.name1": "Bilingual College",
      "inst1.name2": "Pékékue",
      "inst1.hook": "What if your child found here the environment that reveals all their potential?",
      "inst1.desc": "Solid knowledge, autonomy, bilingual openness and serene preparation for the next steps.",
      "inst1.cta": "Discover the institution",

      "inst2.cat": "02 · HIGHER EDUCATION",
      "inst2.name1": "ISMTA",
      "inst2.name2": "Management & technologies",
      "inst2.hook": "What if your degree became your best asset on the job market?",
      "inst2.desc": "Professional programs in management, business, commerce, banking-finance and technologies.",
      "inst2.cta": "Discover ISMTA",

      "inst3.cat": "03 · VOCATIONAL TRAINING",
      "inst3.name1": "IFP-P",
      "inst3.name2": "Skills & integration",
      "inst3.hook": "What if a real skill changed your future in the coming months?",
      "inst3.desc": "Practical training oriented towards employment, entrepreneurship and professional integration.",
      "inst3.cta": "Discover IFP-P",

      "inst4.cat": "04 · TEACHER TRAINING",
      "inst4.name1": "ENIEG",
      "inst4.name2": "Private bilingual secular",
      "inst4.hook": "What if you became the one who passes on tomorrow's knowledge?",
      "inst4.desc": "Rigorous training of future teachers, with French and English openness.",
      "inst4.cta": "Discover ENIEG",

      /* ADN */
      "adn.tag": "OUR DNA",
      "adn.title1": "Four principles",
      "adn.title2": "that commit us.",
      "adn.desc": "A pedagogy of excellence is built on clear values, applied every day in each institution.",
      "value1.title": "Excellence",
      "value1.desc": "Help every learner progress with rigor and consistency.",
      "value2.title": "Openness",
      "value2.desc": "Prepare learners to evolve in a changing world.",
      "value3.title": "Support",
      "value3.desc": "Place the human being and the learner's journey at the center.",
      "value4.title": "Future",
      "value4.desc": "Build useful skills for tomorrow's challenges.",

      /* FOUNDER */
      "founder.role": "FOUNDER & PROMOTER",
      "founder.tag": "FOUNDER'S WORD",
      "founder.quote1": "\u201CBuilding today",
      "founder.quote2": "tomorrow's elite.\u201D",
      "founder.desc": "Our ambition: to give every learner the means to understand their environment, develop their skills and fully participate in building their future.",
      "founder.signature": "Founder & promoter",
      "founder.cta": "Read the full message",

      /* ADMIN */
      "admin.tag": "ADMINISTRATIVE BODY",
      "admin.title1": "The women and men",
      "admin.title2": "serving the project.",
      "admin.desc": "A leadership team committed to serving the Group's academic and institutional vision.",
      "admin1.role": "Founder & Promoter",
      "admin1.bio": "Strategic vision and institutional orientation of the Group.",
      "admin2.title": "General Management",
      "admin2.role": "General coordination",
      "admin2.bio": "Operational management of the four institutions.",
      "admin3.title": "Academic Management",
      "admin3.role": "Pedagogy & programs",
      "admin3.bio": "Academic monitoring and coordination of programs.",
      "admin4.title": "Admissions & Reception",
      "admin4.role": "Reception & enrollment",
      "admin4.bio": "Welcoming families and supporting candidates.",

      /* CREDS */
      "creds.tag": "ACCREDITATIONS & SUPERVISION",
      "creds.title1": "An institutional framework",
      "creds.title2": "officially recognized.",
      "creds.desc": "All our programs are authorized and accredited by the competent Cameroonian ministries. Each institution holds an official creation decree.",
      "cred1.title": "Ministry of Secondary Education",
      "cred1.text": "Official supervision of Bilingual College Pékékue. Creation decree No. 213/21 of May 9, 2021.",
      "cred2.title": "Ministry of Higher Education",
      "cred2.text": "Official supervision of ISMTA and ENIEG. Authorized by decree No. 13/0076/MINESUP.",
      "cred3.label": "ACADEMIC SUPERVISION",
      "cred3.title": "Partner universities",
      "cred3.text": "Academic partnerships with the University of Dschang and the University of Yaoundé II.",
      "cred3.badge": "Agreement signed",
      "cred4.title": "Ministry of Vocational Training",
      "cred4.text": "Official supervision of IFP-P. Legally registered institutions with valid authorizations.",
      "cred4.badge": "Documents available",
      "cred.badge": "Active accreditation",
      "creds.foot": "Decrees and accreditations are available upon request from the administration. We encourage every family to verify them before enrollment.",

      /* EXP */
      "exp.tag": "EXPERIENCES",
      "exp.title1": "They share",
      "exp.title2": "their journey.",
      "exp.desc": "Video testimonials, photos and stories from pupils, students, parents and alumni — discover campus life through their voices.",
      "exp.link": "Read more",
      "exp.cta": "See all experiences",
      "exp1.badge": "VIDEO TESTIMONIAL",
      "exp1.cat": "ISMTA · STUDENT",
      "exp1.title": "\u201CAn experience better told than summarized.\u201D",
      "exp1.desc": "Discover the journey of an ISMTA student and her vision of higher education.",
      "exp2.badge": "PHOTO · PUPIL",
      "exp2.cat": "COLLEGE · PUPIL",
      "exp2.title": "My journey at Bilingual College Pékékue",
      "exp2.desc": "How this environment helped me progress and find confidence.",
      "exp3.cat": "FAMILY · PARENT",
      "exp3.title": "A parent's view",
      "exp3.desc": "\u201CI saw my son flourish. Bilingualism is not a slogan here, it is a daily reality.\u201D",
      "exp4.badge": "PHOTO · GRADUATE",
      "exp4.cat": "ENIEG · GRADUATE",
      "exp4.title": "Becoming a teacher today",
      "exp4.desc": "A calling prepared with rigor and passion.",

      /* CAMPUS */
      "campus.tag": "LIFE ON OUR CAMPUSES",
      "campus.title1": "See. Hear.",
      "campus.title2": "Live Pékékue.",
      "campus.desc": "A visual immersion to discover the campuses, classrooms, laboratories and real atmosphere of each location.",
      "campus1.caption": "The campus as a living space",
      "campus2.caption": "Learning together",
      "campus3.caption": "Collaborate & progress",
      "campus.gallery.tag": "FULL GALLERY",
      "campus.gallery.title": "See all our campuses in pictures",

      /* FAQ */
      "faq.tag": "FREQUENTLY ASKED QUESTIONS",
      "faq.title1": "Before you enroll,",
      "faq.title2": "here is the essential.",
      "faq.desc": "A clear answer at the right time can make all the difference. This FAQ is designed as a gateway to useful information.",
      "faq.cta": "Another question?",
      "faq1.q": "How do I choose my institution?",
      "faq1.a": "Start with the interactive portal \u201CBefore you enroll\u201D and select your situation.",
      "faq2.q": "What are the Group's institutions?",
      "faq2.a": "The Group brings together four universes: Bilingual College Pékékue, ISMTA, IFP-P and ENIEG Pékékue.",
      "faq3.q": "Where are the institutions located?",
      "faq3.a": "The Group is present in Foumban (West Region) and Yaoundé (Centre Region).",
      "faq4.q": "How can I get admission information?",
      "faq4.a": "Via WhatsApp, phone or email. Our team responds within 24 business hours.",
      "faq5.q": "Can I request guidance before applying?",
      "faq5.a": "Yes. The experience is designed to guide you before enrollment.",
      "faq6.q": "What are the entrance exams and admission dates?",
      "faq6.a": "For Bilingual College Pékékue: entrance exams for 6th, 5th and 4th grades on May 16, June 8, August 24 and September 1, 2026.",

      /* LOC */
      "loc.tag": "OUR LOCATIONS",
      "loc.title1": "Two territories.",
      "loc.title2": "One same momentum.",
      "loc.desc": "Find our campuses in Foumban and Yaoundé. Click on a location to open the Google Maps itinerary.",
      "loc1.region": "Noun · West Region",
      "loc2.region": "Mfoundi · Centre Region",
      "loc.link": "Open in Google Maps",

      /* NEXT */
      "next.tag": "YOUR NEXT STEP",
      "next.title1": "What if your story",
      "next.title2": "started here?",
      "next.desc": "Discover the institutions, programs, admission conditions and upcoming deadlines.",
      "next.cta1": "Start my path",
      "next.cta2": "Contact us",

      /* FOOTER */
      "footer.about": "A Cameroonian educational ecosystem committed to training, excellence and preparing tomorrow's talents.",
      "footer.inst.title": "Institutions",
      "footer.discover.title": "Discover",
      "footer.discover.about": "About",
      "footer.discover.dna": "Our DNA",
      "footer.discover.creds": "Official accreditations",
      "footer.discover.exp": "Video experiences",
      "footer.or.title": "Guidance",
      "footer.or.paths": "Find my path",
      "footer.or.faq": "Frequently asked questions",
      "footer.or.loc": "Our locations",
      "footer.contact.title": "Contact us",
      "footer.rights": "All rights reserved.",
      "footer.legal": "Legal notice",
      "footer.privacy": "Privacy policy",
      "footer.sig": "Cameroon · Education · Training · Future",

      /* MODALES */
      "modal.contact.tag": "CONTACT US",
      "modal.contact.title1": "Let's talk about your",
      "modal.contact.title2": "project.",
      "modal.contact.desc": "Choose the channel that suits you. Our team responds within 24 business hours.",
      "modal.contact.wa": "Write to the administration",
      "modal.contact.tel": "ENIEG Admissions",
      "modal.contact.email": "Email",
      "modal.founder.tag": "FOUNDER'S MESSAGE",
      "modal.founder.title1": "Building through",
      "modal.founder.title2": "education.",
      "modal.founder.quote": "\u201COur commitment is to contribute to the training of young people capable of understanding their environment, developing their skills and fully participating in building their future.\u201D",
      "modal.founder.signature": "Founder & promoter"
    }
  };

  /* =========================================================
     FONCTION DE TRADUCTION
     ========================================================= */
  function setLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const value = dict[key];
      if (!value) return;

      /* Sauvegarde des icônes <i> présentes dans l'élément */
      const icons = el.querySelectorAll("i");
      if (icons.length > 0) {
        /* On remplace uniquement le premier nœud texte */
        let replaced = false;
        el.childNodes.forEach(node => {
          if (!replaced && node.nodeType === 3 && node.textContent.trim() !== "") {
            node.textContent = value + " ";
            replaced = true;
          }
        });
        if (!replaced) el.insertAdjacentText("afterbegin", value + " ");
      } else {
        el.textContent = value;
      }
    });

    /* Mettre à jour la langue de la page */
    document.documentElement.lang = lang;

    /* Mettre à jour les boutons */
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });

    /* Sauvegarder */
    try { localStorage.setItem("pekekue_lang", lang); } catch (e) {}
  }

  /* Écoute des clics */
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  /* Restauration */
  let savedLang = "fr";
  try { savedLang = localStorage.getItem("pekekue_lang") || "fr"; } catch (e) {}
  if (savedLang !== "fr") setLanguage(savedLang);

  /* =========================================================
     LOADER
     ========================================================= */
  window.addEventListener("load", () => {
    setTimeout(() => loader?.classList.add("done"), 700);
  });

  /* =========================================================
     HEADER + PROGRESS
     ========================================================= */
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

  /* =========================================================
     MOBILE MENU
     ========================================================= */
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

  /* =========================================================
     SMOOTH SCROLL
     ========================================================= */
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

  /* =========================================================
     REVEAL
     ========================================================= */
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

  /* =========================================================
     COUNTERS
     ========================================================= */
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

  /* =========================================================
     PORTAIL — Résultats
     ========================================================= */
  const journeyData = {
    eleve: {
      icon: "ri-school-line",
      titleKey: "journeyResult.title1",
      textKey: "journeyResult.text1"
    },
    etudiant: {
      icon: "ri-graduation-cap-line",
      titleKey: "journeyResult.title2",
      textKey: "journeyResult.text2"
    },
    pro: {
      icon: "ri-briefcase-4-line",
      titleKey: "journeyResult.title3",
      textKey: "journeyResult.text3"
    },
    teacher: {
      icon: "ri-presentation-line",
      titleKey: "journeyResult.title4",
      textKey: "journeyResult.text4"
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

      const currentLang = document.documentElement.lang || "fr";
      const dict = translations[currentLang];

      if (journeyIcon) journeyIcon.className = `ri ${data.icon}`;
      if (journeyTitle) {
        journeyTitle.textContent = dict[data.titleKey];
        journeyTitle.setAttribute("data-i18n", data.titleKey);
      }
      if (journeyText) {
        journeyText.textContent = dict[data.textKey];
        journeyText.setAttribute("data-i18n", data.textKey);
      }
    });
  });

  /* =========================================================
     MODALES
     ========================================================= */
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

  /* =========================================================
     NAV SUIVIE
     ========================================================= */
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

  /* =========================================================
     ADMIN SLIDER
     ========================================================= */
  const adminTrack = document.getElementById("adminTrack");
  const adminPrev = document.getElementById("adminPrev");
  const adminNext = document.getElementById("adminNext");
  const adminDots = document.getElementById("adminDots");

  if (adminTrack) {
    const cards = adminTrack.querySelectorAll(".admin-card");

    function getStep() {
      const card = adminTrack.querySelector(".admin-card");
      if (!card) return 320;
      const style = window.getComputedStyle(adminTrack);
      const gap = parseInt(style.gap) || 20;
      return card.offsetWidth + gap;
    }

    if (adminDots) {
      cards.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.setAttribute("aria-label", `Responsable ${i + 1}`);
        if (i === 0) dot.classList.add("is-active");
        dot.addEventListener("click", () => {
          adminTrack.scrollTo({ left: i * getStep(), behavior: "smooth" });
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
        const idx = Math.round(sl / getStep());
        adminDots.querySelectorAll("button").forEach((d, i) => {
          d.classList.toggle("is-active", i === idx);
        });
      }
    }

    if (adminPrev) adminPrev.addEventListener("click", () => adminTrack.scrollBy({ left: -getStep(), behavior: "smooth" }));
    if (adminNext) adminNext.addEventListener("click", () => adminTrack.scrollBy({ left: getStep(), behavior: "smooth" }));
    adminTrack.addEventListener("scroll", updateAdminUI, { passive: true });
    window.addEventListener("resize", updateAdminUI);
    updateAdminUI();
  }

  /* =========================================================
     ANNÉE
     ========================================================= */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  console.log("%cGROUPE PÉKÉKUE", "font-size:18px;font-weight:bold;color:#0F3D2E;");
});