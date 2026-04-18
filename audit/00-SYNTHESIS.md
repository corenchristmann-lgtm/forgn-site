# Audit Forgn — Synthèse Exécutive & Plan d'Action
**Date :** 18 avril 2026
**Auditeurs :** 8 agents experts (UI, UX, Content, Product/Conversion, Frontend, SEO, Performance, Accessibilité)
**Scope :** Landing `forgn-site/` (Next.js 16 + React 19 + Tailwind v4 + motion v12)
**Rapports détaillés :** `01-ui-design.md`, `03-content-copy.md`, `04-conversion-funnel.md`, `05-frontend-code.md`, `07-performance.md`, `08-accessibility.md` (+ UX & SEO en session)

---

## 1. Verdict global

| Dimension | Score | Commentaire |
|---|---|---|
| UI / Design visuel | 7.5/10 | Architecture CSS premium (Linear-tier), mais USP enfouie + bug bento + détails polish manquants |
| UX / Clarté | 6.2/10 | Stack visuel solide, mais **ICP jamais nommé**, narrative poétique qui parle aux devs pas aux acheteurs B2B |
| Copy / Conversion | 7.4/10 | Method exemplaire, Case Study en or, mais hero vague + CTA génériques + scarcity non crédible |
| Funnel / Conversion | 5.5/10 | 40-50% des leads actuels sont no-fit, pas de pré-qualification, zéro analytics |
| Code frontend | 6.5/10 | CSS system excellent, mais 6 `'use client'` injustifiés, OG image ancienne brand, composants zombies |
| SEO | 6.5/10 | HTML sémantique solide, mais **zéro JSON-LD, pas de sitemap, pas de robots.txt, H1 sans keyword** |
| Performance | 5.5/10 | LCP estimé 2.8–3.5s (hors "Good"), motion chargé partout, Fraunces sans weight |
| Accessibilité | 7.2/10 | Base WCAG correcte, mais 6 violations A + 12 AA (contrastes, skip links, focus trap) |

**Score global pondéré : 6.5/10** — Fondations techniques et visuelles solides. Les problèmes sont stratégiques (positionnement), structurels (funnel) et exécutionnels (polish).

---

## 2. Les 10 problèmes qui coûtent le plus de conversion

Classés par impact business × urgence, pas par domaine.

### #1 — L'ICP n'est nommé nulle part (P0 — UX)
**Fichier :** `Hero.tsx:124-129`
**Problème :** Un responsable d'incubateur / directeur comms d'ETI ne se reconnaît jamais explicitement dans le site. "Pour vos événements" est générique. Le site parle à "quelqu'un qui a des événements" — un festival ? un restaurant ? une conférence tech ?
**Impact :** Bounce rate élevé des bons prospects qui ne s'auto-identifient pas.
**Fix :** Hero sous-titre →
> "Forgn conçoit et livre des applications sur-mesure pour les incubateurs, écoles entrepreneuriales et agences événementielles. Livrées en 2 à 4 semaines. Présentes le soir J."

### #2 — La "garantie jour J" est enterrée (P0 — UX + Copy)
**Fichier :** `Hero.tsx` (SignalItem #02 noyé), `Method.tsx:41-48` (meilleure phrase du site enterrée)
**Problème :** L'USP défensif unique de Forgn — *"garantie contractuelle que l'app fonctionne le soir J + présence physique"* — n'est jamais formulée comme une promesse centrale. Elle est émiettée en 4 endroits sans emphase.
**Fix :** Ajouter une ligne-garantie visible dans le Hero, sous les SignalItems :
> "**Garantie jour J :** votre application fonctionne le soir de votre événement — ou nous sommes là pour corriger en temps réel. Contractuel."

### #3 — Composants zombies de l'ancienne version SaaS (P0 — Frontend + Design System)
**Fichiers :** `Problem.tsx`, `UseCases.tsx`, `Pricing.tsx`, `ScrollReveal.tsx`
**Problème :** 4 composants de l'ancienne identité SaaS-AI existent dans `src/components/` avec des tokens CSS morts (`--font-outfit`, `bg-bg-card`, `text-violet-light`). Non importés mais présents — bombes à confusion si réactivés par erreur.
**Fix :** Supprimer les 4 fichiers. Retirer `geist` de `package.json` (dépendance fantôme).

### #4 — OG image avec l'ancienne brand SaaS (P0 — Frontend + SEO)
**Fichier :** `src/app/opengraph-image.tsx` (intégralité)
**Problème :** Chaque partage LinkedIn affiche *"Forgn — Des systèmes qui travaillent pendant que vous dormez"* en violet `#8b5cf6` sur fond noir `#08070b` — zéro rapport avec la landing actuelle (cream/ember/Fraunces). Casse la crédibilité à chaque share social.
**Fix :** Réécrire `opengraph-image.tsx` avec la nouvelle identité visuelle et le nouveau message (garantie jour J + 110/112 votants).

### #5 — Zéro JSON-LD / Sitemap / Robots.txt (P0 — SEO)
**Problème :** Aucune structured data (Organization, LocalBusiness, FAQ, Service). Pas de `sitemap.xml` ni `robots.txt`. Google ne peut pas identifier Forgn comme agence locale (Liège) alors que le local SEO est un avantage concurrentiel majeur.
**Fix :**
1. Créer `app/sitemap.ts` + `app/robots.ts`
2. Injecter JSON-LD `Organization` + `LocalBusiness` dans `layout.tsx`
3. Injecter `FAQPage` schema dans `FinalCTA.tsx` (contenu existe déjà)

### #6 — "Lire le post-mortem" est un lien cassé (P0 — UX + Trust)
**Fichier :** `Realisations.tsx:140-143`
**Problème :** Le visiteur le plus engagé — celui qui veut aller au-delà des métriques — clique et rien ne se passe. Moment critique de conversion cassé. Rupture de confiance.
**Fix :** Soit pointer vers vraie page `/realisations/road-to-business-2026`, soit remplacer par `"Case study sur demande"` avec `mailto:`.

### #7 — Aucun CTA intermédiaire + `'use client'` partout (P0 — Funnel + Frontend)
**Problèmes combinés :**
- Funnel : entre Hero et FinalCTA (~2000px scroll), aucun CTA engageant. Un visiteur convaincu à mi-lecture n'a nulle part où aller.
- Code : 6 composants déclarent `'use client'` sans utiliser de hook. `motion/react` fonctionne en Server Component.
**Fix :**
- Ajouter un CTA "Réserver 30 minutes" après `Method.tsx` (fin de l'éducation → action)
- Retirer `'use client'` de Hero, Realisations, Method, Domaines, FinalCTA, ProofBand
- Centraliser `CALENDLY_URL` dans `src/lib/constants.ts` (actuellement dupliquée 4×)

### #8 — Performance : Fraunces + motion × 5 + tout client (P0 — Perf)
**Fichiers :** `layout.tsx:5-10` (Fraunces sans weight), `Realisations.tsx:3`, `Method.tsx:3`, `Domaines.tsx:3`, `FinalCTA.tsx:3`
**Problème :** LCP estimé 2.8–3.5s. Fraunces charge la variable font complète (~180-220 KB) + motion chargé dans 5 composants dont 4 below-fold (bundle +50-60 KB gzip initial).
**Fix :**
- `Fraunces({ weight: ["300", "400", "500"], ... })` → gain ~120 KB
- Remplacer motion par `ScrollReveal` + CSS `@keyframes` dans Realisations/Method/Domaines/FinalCTA. Garder motion uniquement dans Hero.
- Cible : LCP < 2.2s, JS < 120 KB gzip

### #9 — Pas de pré-qualification ICP → 40-50% no-fit leads (P0 — Funnel)
**Problème :** Tout visiteur est traité comme prospect qualifié. Agences comms, SaaS founders, freelancers reçoivent tous le même message. Résultat : 40-50% des bookings Calendly sont hors cible (mauvais budget, mauvais use case).
**Fix :** Dans le Hero ou juste après, ajouter une ligne de qualification explicite :
> "Pour : incubateurs, écoles entrepreneuriales, agences événementielles, directions comms d'ETI. Budget projets : 8 à 25 000 €."

### #10 — Copy "conventions cassées" = mauvais registre (P1 — Copy)
**Fichier :** `Realisations.tsx:91` → "Quatre applications. Quatre conventions cassées."
**Problème :** L'ICP valorise la fiabilité, pas la disruption. "Conventions cassées" active le mauvais registre émotionnel pour un directeur comms d'ETI.
**Fix :** → "Quatre fois que le jour J s'est passé exactement comme prévu."

---

## 3. Quick wins — Moins de 2h cumulées

| Action | Fichier:Ligne | Effort | Impact |
|---|---|---|---|
| Supprimer chip `"2 restants"` statique (perçu dark pattern B2B) | `Nav.tsx:71`, `FinalCTA.tsx:37` | 5 min | Trust |
| Fix lien LinkedIn (pointe vers `linkedin.com` générique) | `Footer.tsx:55` | 2 min | Trust |
| `cursor-pointer` absent sur tous les boutons | `globals.css` | 10 min | Polish |
| `px-1` causant 4px padding mobile sur hero | `Hero.tsx:20` | 5 min | Mobile |
| Marquee 42s → 30s, titres events 20px → 14px | `globals.css` / `ProofBand.tsx` | 12 min | Lisibilité |
| Contraste scroll cue (1.5:1 → use `--color-muted-foreground`) | Hero | 3 min | A11y |
| Meta title 67 chars → 58 chars, supprimer redondance forge | `layout.tsx:24-36` | 10 min | SEO mobile |
| Supprimer `"par l'IA"` (minimise l'output, redondance) | `UseCases.tsx` (à supprimer de toute façon) | 2 min | Copy |
| Aligner délais Hero "2-4 sem" vs Domaines "3-5 sem" | `Domaines.tsx`, `Hero.tsx:128` | 5 min | Cohérence |
| Augmenter texte 11px → 12px min (WCAG AA) | `globals.css` | 10 min | A11y |

**Total : ~1h20** pour un gain visible immédiat.

---

## 4. Recommandations structurelles — Plan en 4 sprints

### Sprint 1 — Stabilisation & Alignement stratégique (Semaine 1 — 8-12h)

**Objectif :** Aligner toute la page sur le pivot (garantie jour J + ICP explicite) + nettoyer les résidus de l'ancienne version.

- [ ] **Supprimer composants zombies** : `Problem.tsx`, `UseCases.tsx`, `Pricing.tsx`, `ScrollReveal.tsx` (si dead code)
- [ ] **Réécrire `opengraph-image.tsx`** avec nouvelle identité + "Garantie jour J · 12/12 livrés"
- [ ] **Réécrire Hero** : nommer ICP, ajouter ligne-garantie, rendre floating card responsive (mobile)
- [ ] **Ajouter section "Qui est derrière Forgn"** : prénom + photo + 2-3 lignes ("J'ai construit ces 4 apps en 18 mois. À chaque fois, j'étais là le soir J.")
- [ ] **Centraliser constants** : `src/lib/constants.ts` avec `CALENDLY_URL`, `CONTACT_EMAIL`, `CASE_STUDY_METRICS`
- [ ] **Fix lien post-mortem cassé** (Realisations.tsx:141)
- [ ] **Fix LinkedIn Footer** (vrai profil)

### Sprint 2 — Refonte narrative & conversion (Semaine 2 — 10-14h)

**Objectif :** Transformer la page d'un catalogue éditorial en funnel B2B efficace.

- [ ] **Réordonner sections** : Hero → Realisations → ProofBand → Domaines → Method → FinalCTA
  (actuellement Method avant Domaines = process avant offre, contre-intuitif)
- [ ] **Réécrire Realisations** : headline "4 fois que le jour J s'est passé comme prévu", nommer les clients (VentureLab, HELMo) si NDA permet
- [ ] **Ajouter CTA intermédiaire** après Method : "Réserver 30 min pour cadrer votre projet"
- [ ] **Ajouter fourchette prix** dans Method ou Domaines : "8-25 000 €. Cadrage gratuit, sans engagement."
- [ ] **Élargir FAQ** FinalCTA : ajouter "Qui êtes-vous ?", "Avez-vous une référence dans mon secteur ?", "Le brief est-il payant ?"
- [ ] **Revoir CTA wording** : "Prendre contact" → "Vérifier les disponibilités" + créer lib:`CTAPrimary`/`CTASecondary` components

### Sprint 3 — SEO / Performance / Code quality (Semaine 3 — 8-10h)

**Objectif :** Faire passer la page en "Good" sur Core Web Vitals et rendre le site indexable correctement.

- [ ] **Retirer `'use client'`** de Hero, Realisations, Method, Domaines, FinalCTA, ProofBand (Server Components)
- [ ] **Fix Fraunces** : `weight: ["300", "400", "500"]`, supprimer axes custom inutiles
- [ ] **Remplacer motion par CSS** dans Realisations/Method/Domaines/FinalCTA (garder motion uniquement dans Hero)
- [ ] **Ajouter `app/sitemap.ts`** et `app/robots.ts`
- [ ] **Injecter JSON-LD** `Organization` + `LocalBusiness` dans `layout.tsx` (voir snippet `06-seo.md`)
- [ ] **Injecter `FAQPage` schema** dans `FinalCTA.tsx`
- [ ] **Métadonnées complètes** : canonical, og:image, twitter:card, keywords (français FR/BE)
- [ ] **Setup Google Search Console + GA4** (ou Plausible/Vercel Analytics)
- [ ] **Convertir components vers `export` nommés** (préférences globales utilisateur)

### Sprint 4 — Accessibilité & Polish (Semaine 4 — 6-8h)

**Objectif :** Conformité WCAG 2.2 AA + détails de polish premium.

- [ ] **Fix contrastes** : `#d65d2e` accent sur muted bg (4.2:1 → fail AA) → utiliser `accent-deep` `#8f3612`
- [ ] **Fix contraste** : `muted-foreground #6b665c` sur `muted #f2eee5` → darker `#4a443c`
- [ ] **Skip links** : ajouter `<a href="#main" class="skip-link">Aller au contenu</a>`
- [ ] **Focus trap** dans menu mobile (`Nav.tsx`)
- [ ] **Marquee pause au focus clavier** (pas seulement `:hover`)
- [ ] **`aria-label`** sur logos (Footer, Nav), cards Domaines, icônes seules
- [ ] **Convertir "Lire post-mortem"** de `<div>` en `<a>` (élément non cliquable au clavier)
- [ ] **Exposer échelle typo** dans `@theme inline` (retirer les 30+ `text-[Xpx]` arbitraires)
- [ ] **Extraire `SectionHeader`** (dupliqué 3× dans Realisations/Method/Domaines)

---

## 5. Ce qui est déjà excellent (à NE PAS casser)

Ces éléments ont été salués par plusieurs agents — préserver impérativement lors des refactos.

1. **Architecture CSS dans `globals.css`** : tokens HSL, shadows multicouches warm, easings nommés, typography scale avec axes `SOFT`/`WONK` sur Fraunces = niveau Linear/Vercel
2. **Section Realisations** avec featured card (110/112, 11 min, 0 bug, 2 techniciens présents) = pièce la plus forte du site
3. **Section Method** : 4 phases claires, livrables concrets, "sortie possible à chaque étape" = exemplaire B2B
4. **Sémantique HTML** (main, section, article, nav, footer, address) = 9/10 pour SEO technique
5. **Ton premium sans hype SaaS/AI** (en général) = différenciateur clair vs concurrents
6. **Prefers-reduced-motion** déjà géré dans `globals.css`

---

## 6. Métriques de succès post-refonte

Objectifs mesurables à viser après les 4 sprints :

| Métrique | Baseline (estimée) | Cible 30j | Mesure |
|---|---|---|---|
| Conversion Calendly | ~8-10% qualifiée | 15%+ qualifiée | GA4 event tracking |
| No-fit leads sur Calendly | 40-50% | < 20% | Review manuelle Corentin |
| LCP mobile | 2.8-3.5s | < 2.2s | PageSpeed Insights |
| JS bundle gzip | ~180 KB | < 120 KB | Next build analyzer |
| Score Lighthouse perf | ~65-75 | > 90 | Lighthouse CI |
| Score Lighthouse a11y | ~72 | > 95 | Lighthouse CI |
| Indexation Google | 0 pages (pas de sitemap) | 1+ page indexée avec rich result | GSC |

---

## 7. Décisions stratégiques à prendre avant Sprint 1

Avant de toucher au code, 3 décisions à clarifier avec Corentin :

1. **Identité personnelle** : OK pour ajouter prénom + photo + histoire solo ? Ou préférer rester "agence anonyme" ?
   *Recommandation agents : assumer le solo = force, pas faiblesse*

2. **Case studies détaillés** : accord client (VentureLab, HELMo) pour nommer + créer pages `/realisations/[slug]` ? Ou rester en featured inline ?
   *Recommandation : nommer au minimum "Incubateur VentureLab" et "HELMo Business School" — trust signal majeur*

3. **Scarcity tokens** : garder `"2 slots · été 26"` (avec risque perçu comme dark pattern B2B senior) ou remplacer par du temporel vérifiable `"Prochain projet démarrable : juin 2026"` ?
   *Recommandation : remplacer par temporel vérifiable*

---

## 8. Index des rapports détaillés

| # | Domaine | Fichier | Score | Lignes |
|---|---|---|---|---|
| 01 | UI / Design visuel | `01-ui-design.md` | 7.5/10 | ~500 |
| 02 | UX / Clarté | *(en session, agent aff959f2b800e0421)* | 6.2/10 | — |
| 03 | Content / Copy | `03-content-copy.md` | 7.4/10 | ~500 |
| 04 | Funnel / Conversion | `04-conversion-funnel.md` | 5.5/10 | ~900 |
| 05 | Frontend code | `05-frontend-code.md` | 6.5/10 | ~550 |
| 06 | SEO | *(en session, agent a326e7ef4c993532a)* | 6.5/10 | — |
| 07 | Performance | `07-performance.md` | 5.5/10 | ~400 |
| 08 | Accessibilité | `08-accessibility.md` | 7.2/10 | ~200 |

---

**Prochaine étape suggérée :** valider le plan des 4 sprints, clarifier les 3 décisions stratégiques (§7), puis ouvrir Sprint 1.
