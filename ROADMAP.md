# FORGN.DEV — FEUILLE DE ROUTE COMPLÈTE

**Version** : 1.0 — 2026-04-18
**Statut** : Sprints 1-5 livrés en production (commit `b25b42c`)
**Propriétaire** : Corentin Christmann
**Branche de travail** : `master`

---

## 0. CONTEXTE & FONDATIONS

### 0.1 Positionnement

Forgn est une **agence** (solo opéré, façade anonyme) qui livre des applications sur-mesure pour événements et outils métier. **Pilier fondateur : fiabilité** — angle défensif unique « garantie du jour J ».

### 0.2 Contraintes irrévocables

- Pas de solo visible → voix « nous / Forgn », jamais « je »
- Clients jamais nommés publiquement (catégories génériques uniquement)
- Marché cible : Belgique francophone + France, ICP incubateurs + écoles entrepreneuriales + agences événementielles + ETI
- Budget projet : 8-25 000 € par mission

### 0.3 Objectifs SMART (12 mois)

- Conversion Calendly qualifiée ≥ 15% (baseline estimée 8-10%)
- No-fit bookings < 20% (actuellement ~40-50%)
- Core Web Vitals Good sur mobile 3G (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- Lighthouse a11y ≥ 95, SEO ≥ 95, Best Practices ≥ 95
- Indexation Google de toutes les pages (sitemap + 5+ URLs visibles)
- 12-15 projets signés / an

---

## 1. ÉTAT ACTUEL — Ce qui est livré

| Sprint | Thème | Statut |
|---|---|---|
| 1 | Stabilisation & alignement (ICP, garantie jour J, OG image, anonymisation, constants centralisées, scarcity vérifiable) | ✅ |
| 2 | Refonte narrative & conversion (réordonnancement, PricingBridge, FAQ 6 items, CTA wording) | ✅ |
| 3 | SEO base & perf fonts (Fraunces optimisé, JSON-LD Organization + ProfessionalService + FAQPage, sitemap, robots) | ✅ |
| 4 | Accessibilité WCAG AA (contraste AAA, skip-link, focus trap Nav mobile, aria-labels, cursor-pointer) | ✅ |
| 5 | Wow factor (HeroLiveMockup, parallax Realisations, cursor-reactive Domaines, Testimonials, StickyMobileCTA, Nav active, dark mode) | ✅ |

---

## 2. PILIERS D'AMÉLIORATION RESTANTS

Classés par impact business ÷ effort.

1. **Observabilité** — sans mesure, pas d'optimisation (Clarity, Vercel Analytics, Sentry)
2. **Conformité légale** — 3 pages obligatoires (RGPD, EAA)
3. **Infrastructure conversion** — form alternatif, workflow n8n
4. **Contenu réel** — vrais témoignages, screenshots, vidéo démo
5. **Pages détail** — /realisations/[slug] pour SEO long-tail
6. **Performance finale** — motion→CSS, `'use client'` cleanup
7. **Wow visual plus** — intégration Rive OU Spline pour signature 3D
8. **Blog & SEO push** — 3-5 articles initiaux, backlinks
9. **Migration Calendly → Cal.com** — anonymisation URL

---

## 3. PHASES DE LIVRAISON

Chaque phase inclut : objectif · intégrations · tâches · livrables · durée · DoD.

### PHASE A — OBSERVABILITÉ & ANALYTICS

**Objectif** : voir ce qui se passe sur le site avant d'optimiser.
**Durée** : 2-3h
**Priorité** : P0

**Intégrations** :
- **Microsoft Clarity** — heatmaps + session recordings, 100% gratuit illimité, RGPD-friendly (pas de cookie)
- **Vercel Analytics** — Web Vitals + page views, gratuit sur Hobby, cookieless
- **Sentry** — error tracking JS, 5k events/mois free

**Tâches** :
- [ ] Créer compte Microsoft Clarity → récupérer Project ID
- [ ] Créer compte Sentry → récupérer DSN
- [ ] `npm install @vercel/analytics @vercel/speed-insights @sentry/nextjs`
- [ ] Intégrer `<Analytics />` + `<SpeedInsights />` dans `layout.tsx`
- [ ] Injecter script Clarity (env var `NEXT_PUBLIC_CLARITY_ID`)
- [ ] Setup Sentry Next.js (`sentry.client.config.ts`, `sentry.server.config.ts`, `next.config.ts` withSentryConfig)
- [ ] Events custom : `calendly_click`, `contact_email_click`, `scroll_milestone_50/75/100`

**Livrables** :
- Dashboards opérationnels
- 1 semaine de données avant Phase D

**DoD** : heatmap visible sur Clarity, Web Vitals reportés sur Vercel, 1 test error captée par Sentry.

---

### PHASE B — CONFORMITÉ LÉGALE

**Objectif** : couvrir obligations Belgique/France/EU avant premier visiteur qualifié.
**Durée** : 3-4h
**Priorité** : P0

**Intégrations** : aucune externe (pages statiques)

**Tâches** :
- [ ] Créer `/app/mentions-legales/page.tsx` (Éditeur, hébergeur Vercel, BCE, TVA, contact)
- [ ] Créer `/app/confidentialite/page.tsx` (RGPD — données collectées via Calendly, Clarity, Vercel, droits, cookies — ou absence)
- [ ] Créer `/app/accessibility-statement/page.tsx` (EAA juin 2025 — conformité WCAG 2.2 AA, contact accessibilité)
- [ ] Mettre à jour Footer : href réels sur "Mentions légales", "Confidentialité" + lien vers accessibility
- [ ] Ajouter entrées sitemap pour ces 3 pages
- [ ] Metadata spécifiques (noindex optionnel sur mentions légales)

**Livrables** : 3 pages conformes, liens Footer fonctionnels, sitemap étendu.

**DoD** : toutes les pages retournent 200, contiennent les mentions légales minimales, linkées depuis Footer.

---

### PHASE C — PERFORMANCE FINALE

**Objectif** : passer Lighthouse perf ≥ 90, bundle < 120 KB gzip.
**Durée** : 4-6h
**Priorité** : P1

**Intégrations** :
- **@next/bundle-analyzer** — visualiser le bundle
- **BundlePhobia** / **Import Cost** — tracking continu

**Tâches** :
- [ ] `npm uninstall geist` (dépendance fantôme non utilisée)
- [ ] Tester retrait `'use client'` sur : `Realisations`, `Method`, `ProofBand`, `PricingBridge`, `Testimonials` (composants sans hooks custom)
- [ ] Remplacer `motion.*` par CSS `@keyframes` + `IntersectionObserver` dans `Realisations/supporting`, `Method/STEPS`, `Domaines` (garder motion pour Hero, HeroLiveMockup, cursor-reactive)
- [ ] Ajouter `@next/bundle-analyzer` + script `npm run analyze`
- [ ] Lighthouse CI via GitHub Actions (workflow `.github/workflows/lighthouse.yml`)
- [ ] `next.config.ts` : cache headers pour `/_next/static/*`, compression, `images.formats: ['image/avif','image/webp']`

**Livrables** : bundle -50 KB gzip, LCP < 2.2s estimé, CI Lighthouse green.

**DoD** : `npm run build` succeeds + Lighthouse perf ≥ 90 en prod.

---

### PHASE D — INFRASTRUCTURE CONVERSION

**Objectif** : offrir alternatives au Calendly pour capter plus large + automatiser le suivi.
**Durée** : 3-5h
**Priorité** : P1

**Intégrations** :
- **Tally.so** — form "Brief projet" (gratuit illimité)
- **Cal.com** — migration depuis Calendly pour anonymiser URL (`cal.com/forgn` vs `calendly.com/corenchristmann`)
- **n8n** (déjà installé chez Corentin) — webhook Calendly/Cal.com → Airtable/Notion + email confirmation aux couleurs Forgn
- **Resend** — email transactionnel (3000/mois free) pour notifications

**Tâches** :
- [ ] Créer compte Cal.com, configurer event type "Appel découverte 30 min" + intégration Google Calendar + questions qualification
- [ ] Mettre à jour `CALENDLY_URL` → `CAL_URL` dans `src/lib/constants.ts`
- [ ] Créer compte Tally.so, construire form "Décrire mon projet" (6-8 questions : organisation, type projet, date événement, budget range, contraintes, contact)
- [ ] Créer `/app/brief/page.tsx` avec Tally embed
- [ ] Ajouter CTA secondaire dans Hero + FinalCTA : "Décrire mon projet en 2 minutes"
- [ ] Webhook Cal.com → n8n → notification email custom + insertion Airtable/Notion CRM
- [ ] Créer `StickyMobileCTA` variant avec 2 actions (Calendly + Form)

**Livrables** : double porte d'entrée (rendez-vous + brief écrit), URL Cal anonymisée, notifications bookings.

**DoD** : test booking → email custom reçu + ligne dans CRM.

---

### PHASE E — CONTENU & ASSETS RÉELS

**Objectif** : remplacer placeholders par vrai contenu qui fait la différence.
**Durée** : 6-10h (si matériel dispo) à plusieurs jours (si à tourner)
**Priorité** : P1

**Intégrations** :
- **Testimonial.to** — collecter témoignages vidéo (2 espaces + 10 vidéos free)
- **Loom** ou **Tella.tv** — enregistrer démo screen-recording app (25 vidéos / 5 min free)
- **Senja** — wall-of-love widget (20 témoignages free)
- **Mockuuups Studio** — 3 mockups device photoréalistes/mois free
- **Shots.so** — mockups propres instantanés (free)
- **Unsplash / Pexels** — photos ambiance événements si nécessaire

**Tâches** :
- [ ] Collecter 3-5 vrais témoignages clients (texte minimum, vidéo idéal) via Testimonial.to
- [ ] Remplacer `TESTIMONIALS` fictifs dans `Testimonials.tsx` par vrais
- [ ] Enregistrer 1 démo Loom 45s de l'app vote-live en action → embed dans Realisations featured
- [ ] Créer 3 mockups Shots.so pour les 3 supporting cards (Companion, Gamification, Matching)
- [ ] Remplacer HeroLiveMockup simulation par screen-recording embed OU garder simulation si préférable
- [ ] Demander accord clients pour mentionner secteur + métriques (reste anonymisé)

**Livrables** : testimonials réels, 1 vidéo démo embed, 3 mockups visuels de cases.

**DoD** : visiteur voit au moins 1 vrai visuel d'app en action.

---

### PHASE F — PAGES DÉTAIL & BLOG (SEO long-tail)

**Objectif** : capturer le trafic organique via pages profondes.
**Durée** : 8-12h
**Priorité** : P1

**Intégrations** :
- **MDX** natif Next.js (pas de CMS nécessaire)
- **Sanity.io** (alternatif si CMS souhaité — 3 users free)
- **Cloudinary** — CDN images (25 GB free)

**Tâches** :
- [ ] Créer dynamic route `/app/realisations/[slug]/page.tsx`
- [ ] 4 case studies détaillés (`vote-live`, `companion-jour`, `gamification-award`, `matching-alumni`) en MDX
- [ ] Structure case study : Contexte → Défis → Solution → Screenshots → Résultats chiffrés → Témoignage → CTA
- [ ] Metadata spécifiques par case study (Schema.org SoftwareApplication)
- [ ] Créer dynamic route `/app/notes/[slug]/page.tsx` (blog)
- [ ] Écrire 3 articles initiaux :
  - "Organiser un vote live en direct : 5 pièges à éviter"
  - "Budget d'une app événement : freelance vs agence vs SaaS"
  - "Gamification d'événement : quand ça marche vraiment"
- [ ] Update sitemap.ts pour inclure toutes les pages dynamiques
- [ ] RSS feed `/feed.xml`
- [ ] Ajouter `<NotesList />` dans Footer ou nouvelle section

**Livrables** : 4 pages case study + 3 articles + RSS.

**DoD** : Google Search Console voit toutes les pages dans sitemap.

---

### PHASE G — SEO PUSH & BACKLINKS

**Objectif** : accélérer indexation + autorité domaine.
**Durée** : 2-4h initial + continu
**Priorité** : P2

**Intégrations** :
- **Google Search Console** (gratuit)
- **Bing Webmaster Tools** (gratuit)
- **Ahrefs Webmaster Tools** (gratuit pour site vérifié — audit backlinks)
- **Google Business Profile** (gratuit — local SEO Liège)
- **Ubersuggest** / **AnswerThePublic** (free tiers — keyword research)

**Tâches** :
- [ ] Vérifier forgn.dev dans GSC + soumettre sitemap
- [ ] Vérifier dans Bing Webmaster
- [ ] Créer Google Business Profile "Forgn — Agence apps événements"
- [ ] Créer `llms.txt` à la racine (résumé brand pour crawlers IA)
- [ ] Outreach 10 backlinks : annuaires belges numériques, communautés VentureLab, partenaires Wallonie

**Livrables** : site indexé, 5+ backlinks.

**DoD** : 5 queries en impressions mesurables dans GSC après 30 jours.

---

### PHASE H — WOW VISUEL PREMIUM

**Objectif** : 1 élément signature mémorable type Stripe/Linear/Arc.
**Durée** : 4-8h
**Priorité** : P2

**Intégrations** :
- **Rive** — state-machine animations vectorielles 20-50 KB (beat Lottie)
- **Spline** — scène 3D drag-drop, export React (1 projet public free)
- **React Three Fiber** — Three.js React (FOSS si envie sur-mesure)

**Tâches** :
- [ ] Décider : Rive (léger, 2D animée) OU Spline (3D, plus lourd mais plus wow)
- [ ] Créer UN asset signature (proposition : une enclume + étincelles qui frappent au rythme, ou un forge glow réactif au curseur)
- [ ] Intégrer dans Hero background OU section dédiée "Notre forge"
- [ ] Lazy-load : import dynamic, loading state soigné
- [ ] Respecter `prefers-reduced-motion`

**Livrables** : 1 élément 3D/animé signature qui distingue Forgn.

**DoD** : élément charge < 100 KB, n'impacte pas LCP, fonctionne en reduced-motion.

---

### PHASE I — QA MULTI-DEVICE & TESTS

**Objectif** : zéro bug visiteur sur tous devices/browsers.
**Durée** : 4-6h
**Priorité** : P1

**Intégrations** :
- **BrowserStack** (free trial)
- **Lambdatest** (free tier)
- **Playwright** (FOSS) — E2E happy path
- **axe DevTools** — scan a11y
- **Accessibility Insights** (Microsoft free)

**Tâches** :
- [ ] Test manuel matrice : Chrome/Safari/Firefox desktop + iOS Safari + Android Chrome + iPad
- [ ] Résolutions : 360, 414, 768, 1024, 1280, 1440, 1920
- [ ] Playwright happy path : visite → scroll → click Calendly → lands on Cal.com
- [ ] axe DevTools scan chaque section
- [ ] Test lecteur d'écran NVDA (Windows) et VoiceOver (macOS/iOS)
- [ ] Test `prefers-reduced-motion: reduce`
- [ ] Test mode dark (toggle + prefers-color-scheme)
- [ ] Test clavier-only full page

**Livrables** : rapport QA avec captures bugs + corrections.

**DoD** : 0 bug bloquant cross-device, a11y score ≥ 95.

---

### PHASE J — MONITORING CONTINU & ITÉRATION

**Objectif** : routine d'amélioration data-driven.
**Durée** : continu (1-2h/semaine après setup)
**Priorité** : P1 continu

**Intégrations** :
- **BetterStack** — uptime monitoring (free tier, 10 monitors)
- **Statuspage** (optionnel) — page de statut publique
- **GitHub Dependabot** — security updates auto
- **Renovate** — dependency updates auto

**Tâches** :
- [ ] Setup BetterStack monitoring forgn.dev + /sitemap.xml
- [ ] GitHub Actions weekly Lighthouse CI
- [ ] Dependabot config `.github/dependabot.yml`
- [ ] Renovate config `renovate.json`
- [ ] Review analytics hebdomadaire : bounce rate, top drop sections, CTA conversions
- [ ] A/B test hero headline (3 variantes sur 30 jours)

**Livrables** : dashboard ops, routine weekly review.

**DoD** : processus documenté, alertes configurées.

---

## 4. STACK INTÉGRATIONS — Tableau complet

| Catégorie | Outil choisi | Free limit | Statut |
|---|---|---|---|
| Analytics visiteurs | Vercel Analytics | 2500 events/mo | À activer |
| Analytics comportement | Microsoft Clarity | Illimité | À créer |
| Error tracking | Sentry | 5k events/mo | À créer |
| Uptime | BetterStack | 10 monitors | À créer |
| Email transactionnel | Resend | 3000/mo | À créer |
| Form builder | Tally.so | Illimité | À créer |
| Rendez-vous | Cal.com | Free tier | À migrer depuis Calendly |
| CMS | MDX natif + GitHub | Gratuit | Déjà possible |
| Heatmaps | Clarity (sessions + heatmaps) | Illimité | Inclus analytics |
| 3D/Anims | Rive ou Spline | 1 scène publique | À choisir Phase H |
| Mockups | Shots.so / Mockuuups | 3/mois free | À utiliser |
| Testimonials | Testimonial.to | 10 vidéos free | À créer |
| SEO indexation | GSC + Bing Webmaster | Gratuit | À vérifier |
| Backlinks audit | Ahrefs Webmaster Tools | Gratuit | À créer |
| CI/CD | GitHub Actions | 2000 min/mo | Déjà Vercel |
| Deps updates | Dependabot | Gratuit | À activer |
| Lighthouse CI | lighthouse-ci action | Gratuit | À setup |
| Automation | n8n (self-host existant) | Gratuit | À câbler |
| Dep scan | Snyk | Free tier | Optionnel |
| Biome | Biome linter alternative | FOSS | Optionnel |

---

## 5. ORDRE D'EXÉCUTION RECOMMANDÉ

```
Semaine 1 — Ship-blockers
└─ Phase A (Observabilité, 3h)       ← SETUP FONDATION DATA
└─ Phase B (Légal, 4h)               ← CONFORMITÉ OBLIGATOIRE

Semaine 2 — Infrastructure & conversion
└─ Phase D (Conversion infra, 5h)    ← Cal.com migration + Tally form
└─ Phase C (Perf cleanup, 6h)        ← motion→CSS + bundle -50KB

Semaine 3 — Crédibilité
└─ Phase E (Assets réels, 10h)       ← Testimonials + démo vidéo
└─ Phase G (SEO push, 3h)            ← GSC + Bing + backlinks

Semaine 4 — Profondeur
└─ Phase F (Pages détail + blog, 12h)← SEO long-tail
└─ Phase I (QA multi-device, 6h)     ← Zéro bug

Semaine 5+ — Premium & continu
└─ Phase H (Wow visuel 3D, 8h)       ← Signature Rive/Spline
└─ Phase J (Monitoring continu)      ← Routine établie
```

---

## 6. SUCCESS CRITERIA FINAUX

### Technique
- Lighthouse perf ≥ 90, a11y ≥ 95, SEO ≥ 95, best practices ≥ 95
- Bundle JS < 120 KB gzip
- LCP < 2.2s, CLS < 0.05, INP < 200ms (p75 mobile)
- 0 violation WCAG 2.2 AA
- 0 erreur Sentry en prod sur 7 jours glissants

### Business
- Conversion Calendly/Cal qualifiée ≥ 15%
- No-fit bookings < 20%
- 5+ queries avec impressions/mois dans GSC après 60 jours
- 3+ backlinks DR 30+ après 90 jours
- Temps moyen sur page > 1min30

### Légal
- 3 pages obligatoires en ligne (mentions, confidentialité, accessibility)
- Pas de cookie non-essentiel sans consent
- Conformité EAA validée

---

## 7. APPENDIX — Checklist exhaustive avant déclaration "production-ready"

### Content
- [ ] Tous les "TODO" / lorem ipsum retirés
- [ ] Tous les liens externes valides (404 check)
- [ ] Tous les emails/téléphones fonctionnels
- [ ] CTAs dupliqués harmonisés

### Code
- [ ] `npm run build` sans warnings
- [ ] `npx tsc --noEmit` clean
- [ ] `npm run lint` clean
- [ ] Pas de `console.log` / `debugger` en prod
- [ ] Aucun `any` TypeScript
- [ ] Named exports partout (préférence Corentin)

### SEO
- [ ] Tous les `<h1>` uniques par page
- [ ] Alt text sur toutes les images
- [ ] Canonical sur toutes les pages
- [ ] Open Graph + Twitter Card par page
- [ ] Sitemap inclut toutes les pages
- [ ] robots.txt permet l'indexation
- [ ] JSON-LD validé via Rich Results Test

### A11y
- [ ] Contraste AAA sur texte critique
- [ ] Focus visible sur tous les interactifs
- [ ] aria-labels sur tout élément sans texte
- [ ] Skip link présent
- [ ] Ordre tabulation logique
- [ ] `prefers-reduced-motion` respecté

### Performance
- [ ] Lighthouse prod ≥ 90 perf
- [ ] Images optimisées (AVIF/WebP)
- [ ] Fonts subsettées
- [ ] No render-blocking
- [ ] Third-party scripts lazy

### Security
- [ ] HTTPS partout
- [ ] CSP header
- [ ] HSTS header
- [ ] Pas de secret commité
- [ ] Vercel env vars auditées

### Légal
- [ ] Mentions légales présentes
- [ ] RGPD compliance
- [ ] Accessibility statement
- [ ] Cookie policy (ou absence de cookies documentée)

### Analytics
- [ ] Tracking fonctionnel
- [ ] Events de conversion configurés
- [ ] Goals définis

---

**Prochaine action** : exécuter Phase A (Observabilité) immédiatement.
