export interface CaseStudyOutcome {
  value: string;
  label: string;
}

export interface CaseStudyPhase {
  title: string;
  body: string;
}

export interface CaseStudy {
  slug: string;
  tag: string;
  year: string;
  title: string;
  lede: string;
  sector: string;
  audience: string;
  deadline: string;
  duration: string;
  budget: string;
  challenges: string[];
  phases: CaseStudyPhase[];
  stack: string[];
  outcomes: CaseStudyOutcome[];
  testimonialQuote?: string;
  testimonialAuthor?: string;
  dayOfWitness: string;
  metaDescription: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "vote-live-soiree-pitch",
    tag: "Vote live · Award cérémonie",
    year: "2026",
    title: "Une soirée pitch remportée sans un seul bug.",
    lede: "Vote synchronisé sur 112 smartphones, résultats annoncés en direct sur scène à la minute près.",
    sector: "École de commerce · Wallonie",
    audience: "112 participants — étudiants, jury, sponsors, presse",
    deadline: "J-17 à la première prise de contact · démonstration scène J",
    duration: "3 semaines de production",
    budget: "11 500 € forfait fermé",
    challenges: [
      "Synchroniser 112 appareils hétérogènes sans file d'attente visible",
      "Fenêtre de vote limitée à 11 minutes — aucune marge pour un reload",
      "Résultats projetés sur écran principal en temps réel, pas d'intermédiaire",
      "Cérémonie filmée en direct — toute anomalie visible publiquement",
    ],
    phases: [
      {
        title: "Cadrage · 30 minutes",
        body: "Un seul rendez-vous pour arrêter les règles : pondération du vote public vs jury technique, formats d'export des résultats, moment exact du dévoilement, plan B si réseau vacille en salle.",
      },
      {
        title: "Conception · 4 jours",
        body: "Flux unique fait pour ce soir-là : identification par QR code en amont, fenêtre de vote orchestrée depuis le pupitre, résultats révélés en cascade sur l'écran principal. Aucun framework générique, aucun template réutilisé.",
      },
      {
        title: "Forge · 15 jours",
        body: "Serveur dédié réservé chez un hébergeur de la zone. Client natif mobile-first testé sur 4G dégradée. Dry-run complet en conditions réelles à J-5, puis un second à J-1 dans la salle définitive.",
      },
      {
        title: "Jour J · présence sur place",
        body: "Deux techniciens Forgn en salle, postés sur les deux extrémités. Astreinte serveur dédiée en parallèle. Coordination directe avec le régisseur scène pour le séquençage visuel du reveal.",
      },
    ],
    stack: [
      "Next.js App Router",
      "Supabase Realtime (votes live)",
      "Tailwind CSS",
      "Motion",
      "Serveur dédié hébergé Wallonie",
    ],
    outcomes: [
      { value: "110 / 112", label: "participants votants" },
      { value: "11 min", label: "fenêtre de vote" },
      { value: "0", label: "bug en production" },
      { value: "2", label: "techniciens sur place" },
      { value: "120 ms", label: "latence vote → écran" },
      { value: "100 %", label: "uptime jour J" },
    ],
    testimonialQuote: "À 22h15 le serveur a eu un hoquet. Un technicien Forgn était encore en salle avec son laptop ouvert. Trois minutes plus tard, la soirée reprenait sans que personne dans le public ne s'en rende compte.",
    testimonialAuthor: "Directrice communication · École de commerce, Wallonie",
    dayOfWitness: "Cérémonie filmée, 8 projecteurs, 112 smartphones connectés au WiFi salle. Zéro décrochage.",
    metaDescription: "Case study Forgn — application de vote live synchronisé sur 112 smartphones, résultats annoncés en direct. 3 semaines de production, zéro bug en scène.",
  },
  {
    slug: "companion-journee-entrepreneuriale",
    tag: "Companion · Parcours de groupe",
    year: "2026",
    title: "Une journée entrepreneuriale, dans la poche.",
    lede: "App compagnon pour huit équipes : parcours personnalisé, galerie partagée par groupe, checklist live.",
    sector: "Incubateur universitaire · Belgique",
    audience: "80 participants répartis en 8 équipes, 12 mentors, 4 organisateurs",
    deadline: "J-28 à la première prise de contact",
    duration: "5 semaines de production",
    budget: "14 000 € forfait fermé",
    challenges: [
      "Chaque équipe suivait un parcours différent à travers 3 ateliers — pas de timing unique",
      "Les équipes devaient pouvoir documenter leurs moments sans friction (pas de login à répéter)",
      "Les organisateurs voulaient voir l'avancement des 8 équipes en temps réel",
      "Pas de réception réseau garantie dans tous les bâtiments — mode dégradé obligatoire",
    ],
    phases: [
      {
        title: "Cadrage · 45 minutes",
        body: "Matrice des 8 parcours × 3 ateliers sur un tableau partagé. Règles de progression, conditions de bascule, points de synchronisation groupe.",
      },
      {
        title: "Conception · 1 semaine",
        body: "Prototype Figma navigable validé par les organisateurs et deux mentors. Test de lisibilité en extérieur lumière directe. Écriture des micro-copies pour les 3 ateliers.",
      },
      {
        title: "Forge · 3 semaines",
        body: "PWA installable sans passage par l'App Store. Cache local offline pour photos et checklist. Synchronisation dès le retour en ligne. Dashboard organisateur développé en parallèle.",
      },
      {
        title: "Jour J · astreinte dédiée",
        body: "Un référent Forgn en astreinte serveur. Deux micro-ajustements appliqués à midi sur retour organisateur (ajout d'un atelier surprise, reformulation d'un texte).",
      },
    ],
    stack: [
      "Next.js PWA",
      "Service Worker offline-first",
      "Supabase (Postgres + Storage photos)",
      "Tailwind CSS",
      "Dashboard temps réel Supabase Realtime",
    ],
    outcomes: [
      { value: "8", label: "équipes accompagnées" },
      { value: "3", label: "ateliers différenciés" },
      { value: "240+", label: "photos synchronisées" },
      { value: "5 sem", label: "livraison complète" },
      { value: "0", label: "perte de donnée mode offline" },
      { value: "100 %", label: "équipes au rendez-vous final" },
    ],
    testimonialQuote: "On avait demandé deux devis à des agences belges classiques : 60k€ et 14 semaines. Forgn a livré en trois semaines pour 11k€ — et l'app fonctionnait exactement comme on l'avait dessinée ensemble.",
    testimonialAuthor: "Responsable programme · Incubateur universitaire, Belgique",
    dayOfWitness: "Galerie finale projetée en clôture avec les 240 photos. Émotion collective — application jamais ressentie comme un outil séparé.",
    metaDescription: "Case study Forgn — app compagnon PWA pour journée entrepreneuriale. 8 équipes, 3 ateliers différenciés, mode offline, 5 semaines de production.",
  },
  {
    slug: "gamification-award",
    tag: "Gamification · Leaderboard live",
    year: "2025",
    title: "Un award où le public investit, pas où le jury vote.",
    lede: "Portefeuille virtuel, investissements dans les projets, leaderboard live projeté sur écran TV.",
    sector: "Prix entrepreneurial · Belgique",
    audience: "60+ projets exposés, 400 visiteurs investisseurs, 6 catégories",
    deadline: "J-42 à la première prise de contact",
    duration: "4 semaines de production",
    budget: "16 500 € forfait fermé",
    challenges: [
      "Casser le format classique du vote jury pour créer une vraie dynamique d'engagement",
      "Gérer 60+ projets sur un leaderboard live sans surcharge visuelle",
      "Éviter la triche tout en restant simple (pas d'auth lourde pour le public)",
      "Créer une tension narrative sur 3 heures sans relance manuelle",
    ],
    phases: [
      {
        title: "Cadrage · 1 heure",
        body: "Mécaniques de jeu arrêtées : portefeuille de départ, règles d'investissement, courbe de valeur, moment du verrouillage. Anti-triche par token limité par device.",
      },
      {
        title: "Conception · 1 semaine",
        body: "Design du leaderboard écran TV pensé pour lecture à 8 mètres. Animations de reveal travaillées pour maintenir la tension jusqu'à la clôture.",
      },
      {
        title: "Forge · 2 semaines et demie",
        body: "Backend temps réel, système d'investissement optimiste avec rollback, dashboard admin pour intervention en cas de bug. Tests de charge à 600 connexions simultanées.",
      },
      {
        title: "Jour J · présence régie",
        body: "Un référent Forgn en régie aux côtés du régisseur technique. Gestion du timing de clôture synchronisé avec la remise des prix en direct.",
      },
    ],
    stack: [
      "Next.js App Router",
      "Supabase Realtime + Edge Functions",
      "Framer Motion pour animations leaderboard",
      "Tailwind CSS",
      "Mode plein écran TV dédié",
    ],
    outcomes: [
      { value: "60+", label: "projets exposés" },
      { value: "400", label: "investisseurs uniques" },
      { value: "Live", label: "écran TV temps réel" },
      { value: "4 sem", label: "livraison" },
      { value: "6", label: "catégories gamifiées" },
      { value: "0", label: "incident technique" },
    ],
    dayOfWitness: "Courbe d'engagement inversée — la dernière heure a généré 60 % des investissements. Tension maintenue jusqu'au reveal final.",
    metaDescription: "Case study Forgn — gamification d'award entrepreneurial. Portefeuille virtuel, 60+ projets, leaderboard live écran TV. 4 semaines de production.",
  },
  {
    slug: "matching-alumni",
    tag: "Matching · Networking",
    year: "2024",
    title: "Un programme d'alumni qui tient au-delà de trois mois.",
    lede: "Matching pondéré multi-dimensions, plan de salle généré, suivi post-rencontre à six mois.",
    sector: "Programme alumni · École supérieure, Belgique",
    audience: "72 alumni sur 3 promotions, 4 secteurs d'activité, 9 expertises",
    deadline: "J-35 à la première prise de contact",
    duration: "4 semaines de production",
    budget: "12 000 € forfait fermé",
    challenges: [
      "Algorithme de matching respectant 5 dimensions (secteur, expertise, ancienneté, géographie, objectif)",
      "Génération automatique du plan de salle avec 36 tables de 2 personnes",
      "Mécanisme de feedback post-rencontre non-intrusif",
      "Analytics de rétention pour mesurer l'impact à 3 et 6 mois",
    ],
    phases: [
      {
        title: "Cadrage · 1 heure",
        body: "Définition des 5 dimensions et de leurs poids. Règles d'exclusion (éviter les binômes qui se connaissent déjà trop). Format du questionnaire d'inscription.",
      },
      {
        title: "Conception · 1 semaine",
        body: "Questionnaire UX en 8 questions, interface organisateur pour override manuel, design du plan de salle généré. Validation par deux alumni représentatifs.",
      },
      {
        title: "Forge · 2 semaines",
        body: "Moteur de matching en SQL optimisé, génération PDF du plan de salle, relances email programmées. Tests avec 2 datasets factices pour valider la qualité des binômes.",
      },
      {
        title: "Jour J · astreinte téléphonique",
        body: "Astreinte téléphonique côté organisateur (pas de présence en salle nécessaire pour ce format). Remise des badges avec numéros de table imprimés la veille.",
      },
    ],
    stack: [
      "Next.js App Router",
      "Supabase Postgres + SQL matching engine",
      "Resend pour emails programmés",
      "react-pdf pour export plan de salle",
      "Tailwind CSS",
    ],
    outcomes: [
      { value: "72", label: "profils inscrits" },
      { value: "41", label: "binômes générés" },
      { value: "76 %", label: "alumni encore actifs 3 mois plus tard" },
      { value: "68 %", label: "contacts maintenus à 6 mois" },
      { value: "4 sem", label: "livraison" },
      { value: "0", label: "conflit de plan de salle" },
    ],
    testimonialQuote: "Zéro bug en live, zéro ticket support post-event. C'est la première fois qu'on vit ça avec un prestataire tech. Je recommande sans hésiter, et on a déjà signé un second projet.",
    testimonialAuthor: "Directeur alumni · École supérieure, Belgique",
    dayOfWitness: "Organisé en mode tables tournantes de 15 minutes. 41 binômes sans collision, 0 absent au pointage, ambiance de retrouvailles sincère.",
    metaDescription: "Case study Forgn — app de matching alumni à 5 dimensions. 72 profils, 41 binômes, plan de salle généré. 4 semaines de production.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function listCaseStudySlugs(): string[] {
  return CASE_STUDIES.map((c) => c.slug);
}
