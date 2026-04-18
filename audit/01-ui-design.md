# Audit visuel — Forgn Landing Page
**Date :** 18 avril 2026  
**Auditeur :** UI Designer (Claude Code)  
**Scope :** `src/app/globals.css`, `layout.tsx`, `page.tsx`, tous les composants `src/components/`

---

## Résumé exécutif

### Scores /10 par axe

| Axe | Score | Commentaire rapide |
|-----|-------|--------------------|
| Hiérarchie visuelle | 7/10 | Bonne structure globale, mais la garantie jour J est noyée dans les SignalItems |
| Relief & profondeur | 8/10 | Le système de tokens ombres est solide ; quelques opportunités manquées |
| Design system cohérence | 5/10 | Fracture brutale : Problem/UseCases/Pricing sont une autre application |
| Typographie | 7.5/10 | Fraunces bien utilisé, mais line-height `0.97` sur `.display` trop serré en mobile |
| Couleur & contraste | 7/10 | Palette ember cohérente ; `--color-accent-soft` (#f2a07a sur blanc) échoue WCAG AA |
| Espacement & rythme | 6.5/10 | Section padding cohérent globalement, mais `px-1` dans Hero est anormalement étroit |
| Détails d'exécution | 6/10 | `.btn-ember` sans `cursor-pointer`, focus-states ok, `reveal` CSS absente |
| Consistance entre composants | 3/10 | Problem, UseCases, Pricing : tokens violet SaaS-AI encore actifs — décalage total |

### Top 3 forces

1. **Design system de tokens bien architecturé** — globals.css est exemplaire : ombres chaudes multicouches, easings nommés, palette ember cohérente du Hero au FinalCTA. On voit Linear-level de soin.
2. **Typographie éditoriale distinctive** — Le duo Fraunces display + Inter body crée une identité forte et lisible. L'usage de `display-italic` pour l'accent ember sur chaque H2 est systématique et efficace.
3. **Réalisations.tsx — meilleure section du site** — Le featured ink-block avec son faux device-frame, les métriques animées, les 3 supporting cards en grid sont à la hauteur de la barre Stripe/Linear.

### Top 5 faiblesses (fatales ou dégradantes)

1. **Fracture de design system critique** — Problem.tsx, UseCases.tsx, Pricing.tsx utilisent des tokens `bg-bg-card`, `text-violet-light`, `bg-violet`, `font-[var(--font-outfit)]` qui n'existent pas dans le design system actuel. Ces sections sont des résidus de l'ancienne version SaaS-AI. Elles cassent l'identité complète de la page.
2. **ScrollReveal.tsx inutilisé et sa classe `.reveal` absente** — Le composant ajoute `reveal` et `visible` mais ces classes ne sont définis nulle part dans globals.css. Il n'est également jamais importé dans page.tsx. Dead code qui pollue.
3. **La garantie Jour J — USP #1 — est enfouie** — C'est le différentiateur fondateur de Forgn. Il apparaît comme `SignalItem` #02 parmi quatre items équivalents dans le Hero. Il mérite un traitement visuel distinct et dominant.
4. **`cursor-pointer` absent sur tous les éléments interactifs** — Les `.btn-primary`, `.btn-ember`, `.btn-outline`, `.btn-ghost`, les cards Domaines (`motion.a`), les items Method au hover — aucun n'a `cursor-pointer` défini. Sur desktop c'est une régression d'UX visible.
5. **Pricing/Problem/UseCases non référencées dans page.tsx** — Ces composants ne sont pas importés ni rendus. Elles sont dans le dossier mais mortes. Cela crée confusion sur l'état réel du site en production.

---

## Analyse détaillée par composant

---

### 1. Nav — `src/components/Nav.tsx`

**Qualité générale : 8/10 — Solide**

#### Problèmes

**P1 — CTA nav sans `cursor-pointer`**
`Nav.tsx:81` — Le lien CTA "Prendre contact" a `transition-opacity` mais pas `cursor-pointer`. Sur desktop, le curseur reste par défaut sur ce bouton si le navigateur ne le traite pas comme lien cliquable immédiatement.

Fix : ajouter `cursor-pointer` dans la className du lien CTA. Idem pour le bouton mobile toggle `Nav.tsx:96`.

**P1 — Mobile menu sans animation d'entrée/sortie**
`Nav.tsx:117` — Le menu mobile apparaît et disparaît instantanément (`{open && (...)}`) sans transition. Sur iOS Safari le saut est brutal.

Fix :
```tsx
// Remplacer le conditional render par AnimatePresence + motion.div
import { AnimatePresence, motion } from "motion/react";
// <AnimatePresence> autour du menu, initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
```

**P2 — Wordmark "F" utilise `font-display` mais Fraunces à 13px est illisible**
`Nav.tsx:38` — Le "F" dans le logo badge fait 13px en Fraunces. Fraunces est une police serif optiquement sized pour les grands corps. À 13px elle perd sa personnalité et son sérif est grossier. Un lettermark minimaliste à ce format devrait être en Inter bold ou SVG dédié.

**P2 — Disponibilité "2 slots · été 26" répétée 3× sur la page**
Nav (desktop + mobile) + Footer. Sur une landing compacte, cette redondance dilue l'urgence au lieu de la renforcer.

---

### 2. Hero — `src/components/Hero.tsx`

**Qualité générale : 7.5/10 — Bon potentiel, plusieurs points critiques**

#### Problèmes

**P0 — La garantie Jour J n'a pas de hiérarchie visuelle distincte**
`Hero.tsx:156-161` — "Présence contractuelle" est un `SignalItem` parmi 4, avec exactement le même traitement visuel que "2 à 4 semaines" ou "Votre marque, votre code". Or c'est l'USP fondateur de Forgn — le différentiateur que zéro concurrent ne propose. Il devrait visuellement dominer ce quadrant.

Fix proposé : Remplacer le `grid grid-cols-2 gap-x-6 gap-y-5` plat par une liste asymétrique où l'item "Jour J" reçoit un traitement `chip-ember` ou un fond `ember-block` miniature (comme dans Domaines.tsx pour le domaine #01).

**P1 — `px-1` sur le conteneur principal est anormalement étroit**
`Hero.tsx:20` — `<div className="relative mx-auto max-w-[1240px] px-1">` — px-1 = 4px de padding horizontal. Toutes les autres sections utilisent le `padding-inline: clamp(1.25rem, 4vw, 3.5rem)` défini en globals.css sur `section`. Mais Hero a `overflow-hidden` sur la `<section>`, et le `div` container ne reprend pas le padding global. Sur mobile, le texte touche les bords.

Fix : Changer `px-1` en `px-[clamp(1.25rem,4vw,3.5rem)]` pour s'aligner avec le rythme global.

**P1 — Floating callout `card-raised` utilise `box-shadow: var(--shadow-lg)` mais pas de backdrop**
`Hero.tsx:76` — Le callout flottant (12 apps / 12/12 / 0 bugs) est positionné absolument sur la headline. Il a `card-raised` (shadow-lg) mais aucun backdrop sur le fond mesh-warm. Sur les breakpoints intermédiaires lg, la headline peut passer derrière.

**P1 — La sous-description mélange deux niveaux d'emphase**
`Hero.tsx:124-130` — Le texte principal est à `opacity-85`, puis "Livrées en 2 à 4 semaines. Présentes le jour J." passe en `font-medium` full opacity. C'est bien intentionné mais la phrase englobante a `max-w-[52ch]` et l'emphase finale mérite d'être sur sa propre ligne avec un traitement visuel plus fort (pas juste font-medium, peut-être color accent).

**P2 — Scroll cue `mt-20` disparaît visuellement dans le bruit du mesh**
`Hero.tsx:177-184` — Le "Faites défiler" avec le trait horizontal est à peine visible sur le fond mesh-warm chaud. La ligne `h-px w-10 bg-[color:var(--color-border-strong)]` (#d1cbbc sur #faf8f4) a un contraste de ~1.5:1.

Fix : Utiliser `bg-[color:var(--color-muted-foreground)]` (#6b665c) pour le trait.

**P2 — line-height `.display` est `0.97` — problématique sur mobile pour multiline**
`globals.css:110` — Line-height 0.97 est correct pour les headline très grandes (>6rem). Mais le H1 du Hero utilise `clamp(3rem,9.5vw,9rem)`. À 3rem (mobile), un line-height de 0.97 fait se chevaucher les ascendantes/descendantes de Fraunces. Le chevauchement est intentionnel en éditorial print mais douloureux en digital sur petits écrans.

Fix : `line-height: clamp(0.97, 0.97 + 0.03 * ((1rem - 3rem) / (9rem - 3rem)), 1.05)` ou simplement une media query `@media (max-width: 640px) { .display { line-height: 1.0; } }`.

---

### 3. ProofBand — `src/components/ProofBand.tsx`

**Qualité générale : 7/10 — Fonctionnel, sous-exploité**

#### Problèmes

**P1 — Le marquee n'a pas de padding horizontal sur mobile**
`ProofBand.tsx:21` — `<div className="mx-auto max-w-[1240px] flex items-center gap-8">` — Sur mobile, le `max-w-[1240px]` n'applique aucun padding. La section hérite du `padding-inline` global via `section {}` dans globals.css, mais le label "En production —" peut se couper.

**P1 — Le label "En production —" est `text-[10.5px]`**
`ProofBand.tsx:22` — 10.5px est sous le minimum WCAG de 16px pour le corps de texte. Certes c'est un label décoratif, mais il n'est pas `aria-hidden`. S'il est lisible, il doit être lisible. Passer à 11px minimum avec `font-mono`.

**P2 — Les event titles `font-display text-[20px]` dans le marquee sont trop grands**
`ProofBand.tsx:35` — 20px pour un marquee de ticker est disproportionné par rapport au label 10.5px à côté. Le contraste de taille (20px vs 10.5px soit ratio 1.9×) crée une dissonance rythmique dans la bande. Passer les titres événements à 14px medium et les métriques à 13px muted.

**P2 — Vitesse du marquee : 42s pour 12 éléments × 2 = 24 items est trop lent**
`globals.css:419` — 42s pour traverser l'écran. Sur grand écran (1440px+), ça donne ~34px/s, le ticker semble figé. Pour une proof band qui doit communiquer de l'activité, 28-32s serait plus dynamique.

---

### 4. Realisations — `src/components/Realisations.tsx`

**Qualité générale : 9/10 — Meilleure section du site**

#### Problèmes

**P1 — "Lire le post-mortem" est un lien mort**
`Realisations.tsx:139-142` — Ce CTA textuel avec flèche animée ne pointe vers aucun `href`. Il n'est ni un `<a>` avec href, ni un `<button>`. C'est un `<div>` avec texte. L'arrow-nudge ne fonctionne que si le parent est `.group`, ce qui est bien le cas (`motion.article` a `className="group ..."`), mais l'élément n'est pas cliquable ni accessible.

Fix : Soit pointer vers une vraie URL, soit envelopper dans `<a href="#contact">` pour rediriger vers la prise de contact.

**P1 — Le device-frame `rounded-2xl bg-[color:var(--color-background)]/5` est presque invisible**
`Realisations.tsx:149` — Sur un `ink-block` (#141210), un fond `background/5` = rgba(250,248,244,0.05) est à peine discernable. Le cadre "faux device" perd son effet de profondeur. Monter à `/12` minimum.

**P2 — `opacity-40 blur-3xl` sur l'orb accent est trop faible dans l'ink-block**
`Realisations.tsx:190` — L'orbe accent (ember) à 40% d'opacité avec blur-3xl sur fond ink est imperceptible. Monter à `opacity-60` ou réduire le blur à `blur-2xl` pour que l'orbe soit visible.

**P2 — Les supporting cards n'ont pas de transition hover sur la border**
`Realisations.tsx:211` — `.card:hover` dans globals.css élève la carte mais la classe override `hover:border-[color:var(--color-foreground)]/40` sur ces cards n'est pas dans la règle `.card:hover` — elle est en inline Tailwind. Ce n'est pas un bug fonctionnel mais une incohérence : `.card` hover donne `border-color: var(--color-border-strong)` (globals.css:224) mais la classe Tailwind inline le surcharge. Conflit de spécificité qui peut se comporter différemment selon le build.

---

### 5. Method — `src/components/Method.tsx`

**Qualité générale : 7.5/10 — Editorial rows bien exécutés**

#### Problèmes

**P1 — La ligne verticale de progression est positionnée à `left-[72px]`**
`Method.tsx:89-91` — La ligne verticale passe à 72px du bord gauche pour aligner avec le centre du badge 56px (h-14 w-14). Mais le badge est dans `md:col-span-2` d'un grid 12 colonnes sur `max-w-[1240px]`. Le calcul ne sera pas aligné sur tous les breakpoints md. Sur un viewport de 900px, la ligne et le badge peuvent être décalés.

Fix : Utiliser une approche CSS Grid avec `::before` pseudo-element sur le badge lui-même plutôt qu'un positionnement absolu fixe.

**P1 — L'étape 04 "Jour J" n'a aucun traitement visuel distinctif**
`Method.tsx:44-50` — C'est l'étape la plus importante (la garantie contractuelle). Elle reçoit le même rendu visuel que les 3 autres. L'étape 01 a un point ember (`i === 0`, Method.tsx:113-118). L'étape 04 devrait avoir un traitement au moins aussi fort — voire ember-block partiel ou fond muted différencié.

**P2 — Hover `bg-[color:var(--color-muted)]/40` sur les rows ne fonctionne pas avec `transition-colors`**
`Method.tsx:105` — La classe Tailwind `transition-colors` gère `background-color`. Mais la valeur `/40` est une opacité. Tailwind v4 gère correctement `bg-[color:var(...)]/40` mais s'assurer que le compilateur génère le bon output. À vérifier en dev.

**P2 — `duration: string` dans l'interface mais "Jour J" n'est pas une durée**
`Method.tsx:8` — Le champ `duration` de l'interface est `string` et reçoit "Jour J" comme valeur. C'est une date, pas une durée. Le label affiché est "Durée : Jour J" ce qui est sémantiquement faux. Utiliser `"Prévu"` ou changer le label affiché pour la step 04.

---

### 6. Domaines — `src/components/Domaines.tsx`

**Qualité générale : 7/10 — Bon concept bento, exécution asymétrique incorrecte**

#### Problèmes

**P0 — Le span `md:col-span-2` sur les domaines 01 et 04 casse la grille 3 colonnes**
`Domaines.tsx:22,44` — La grille est `grid-cols-3`. Domaine 01 a `md:col-span-2` (2 colonnes), domaine 04 aussi. Le total des colonnes par rangée :
- Rangée 1 : Domaine 01 (col-span-2) + Domaine 02 (col-span-1) = 3 ✓
- Rangée 2 : Domaine 03 (col-span-1) + Domaine 04 (col-span-2) = 3 ✓
- Rangée 3 : Domaine 05 (col-span-1) + Domaine 06 (col-span-1) = 2 — il manque une colonne.

La rangée 3 laisse un vide d'une colonne entière. Visuellement, domaines 05 et 06 sont alignés à gauche avec un espace vide à droite. Ce n'est manifestement pas l'intention.

Fix : Soit ajouter `md:col-start-2` sur domaine 06 pour centrer la paire, soit donner `md:col-span-2` à domaine 05 ou 06 pour compléter la rangée, soit passer à 2 colonnes pour la dernière rangée.

**P1 — Les cards `card` n'ont pas `cursor-pointer`**
`Domaines.tsx:94` — Les `motion.a` ont un `href="#contact"` donc le curseur devrait naturellement être pointer. Mais la class `.card` (globals.css:211) ne définit pas `cursor: pointer`. Sur Firefox/Safari il peut y avoir des edge cases avec motion.a et le cursor.

**P1 — `min-h-[260px]` sur les cards crée un contenu "flottant" sur les cards courtes**
`Domaines.tsx:107` — Les textes courts de certains domaines (ex: "Gamification") avec leur contenu s'affichent bien via `flex flex-col` mais sur les cards longues vs courtes la hauteur min fixe peut causer du vide non équilibré dans la rangée.

**P2 — Les Domaines non-accent n'ont aucun hover state sur le fond**
`Domaines.tsx:105-107` — Le `.card:hover` dans globals.css donne `translateY(-2px)` et `shadow-md`, mais aucune variation de fond. Les cards ember ont leur glow orb. Les cards neutres manquent de réponse au hover. Ajouter `group-hover:bg-[color:var(--color-muted)]/50` sur le fond interne.

---

### 7. FinalCTA — `src/components/FinalCTA.tsx`

**Qualité générale : 8.5/10 — Section forte, détails à affiner**

#### Problèmes

**P1 — Budget affiché "À partir de 8 000 €" dans la FAQ**
`FinalCTA.tsx:81` — Cette information est correcte mais contradictoire avec la mémoire projet (ICP budget 3-25k€). Si le minimum réel est 3k€, "À partir de 8 000 €" écarte des prospects qualifiés. Si c'est délibéré pour qualifier les leads, c'est un choix éditorial à confirmer — pas une décision UI. À noter.

**P1 — Le CTA white "Réserver 30 minutes" a `active:scale-[0.97]` via classe Tailwind mais la transition est en `style={{}}`**
`FinalCTA.tsx:58-62` — Le scale est déclenché par `:active` CSS mais la transition est définie via `style={{ transition: "transform 160ms..." }}`. En React/SSR le style inline et la classe Tailwind peuvent créer une duplication de la propriété `transition`. Déplacer la transition vers une classe CSS unifiée.

**P2 — `text-white/70` sur "On en parle ?" sur ember gradient**
`FinalCTA.tsx:44` — Le texte à 70% d'opacité sur le gradient ember (#d65d2e → #8f3612) a un contraste calculé de ~3.1:1 contre blanc. En WCAG AA large text (>18pt/24px), le minimum est 3:1 — il passe juste. À 5.5rem (88px) c'est large text. Acceptable mais limite.

**P2 — Les trois `FAQItem` n'ont pas de séparateur visuel entre eux**
`FinalCTA.tsx:77-93` — `space-y-5` donne de l'air mais les items se fondent visuellement. Ajouter `border-b border-white/15 pb-5` sur chaque `<li>` sauf le dernier renforcerait la structure de lecture.

---

### 8. Footer — `src/components/Footer.tsx`

**Qualité générale : 7/10 — Détails d'exécution manquants**

#### Problèmes

**P1 — LinkedIn href est `https://linkedin.com` générique**
`Footer.tsx:54` — Ce n'est pas le vrai profil LinkedIn de Forgn. Un visiteur cliquera sur LinkedIn et atterrira sur la homepage LinkedIn, pas sur le profil. Corriger avec l'URL exacte du profil.

**P1 — "Mentions légales" et "Confidentialité" pointent vers `#`**
`Footer.tsx:105-106` — Ces liens sont vides. Pour un site B2B avec ICP ETI et budgets 8k-25k€, l'absence de mentions légales est rédhibitoire pour les acheteurs corporate/compliance. P1 pour crédibilité.

**P2 — Le wordmark géant `text-[clamp(4rem,22vw,20rem)]` a `opacity-8` (Tailwind v4 custom)**
`Footer.tsx:93` — `text-[color:var(--color-foreground)]/8` — L'opacité 8% sur le foreground (#0d0c0a) sur un fond muted (#f2eee5) donne un contraste d'environ 1.2:1. Le wordmark est virtuellement invisible sauf sur certains moniteurs calibrés. C'est intentionnel pour un traitement "watermark", mais vérifier que l'effet est lisible sur les écrans grand public (sRGB non-calibrés). Monter à `/12` pour un watermark visible sans être envahissant.

**P2 — `display` class sur le wordmark Footer mais `font-display` est Fraunces**
`Footer.tsx:18,93` — Le wordmark "Forgn" en ligne 18 utilise `.display` (Fraunces) mais le "Forgn." géant en ligne 93 aussi. Cohérent en soi, mais le point final `.` en Fraunces à cette taille mérite un `letter-spacing: -0.06em` pour éviter que le point "flotte" visuellement loin du n.

---

### 9. Problem / UseCases / Pricing — `src/components/Problem.tsx`, `UseCases.tsx`, `Pricing.tsx`

**Qualité générale : 1/10 — Dead code, design system totalement incohérent**

Ces trois composants sont des résidus directs de l'ancienne version SaaS-AI (skillpacks-ai). Ils ne sont PAS importés dans `page.tsx` et n'apparaissent donc pas sur le site. Cependant leur présence dans le dossier `src/components/` est un risque.

#### Problèmes critiques (à titre documentaire)

**P0 — Tokens inexistants dans le design system actuel**
- `Problem.tsx:22` : `text-violet-light` — token inexistant
- `Problem.tsx:24` : `font-[var(--font-outfit)]` — font Outfit non chargée dans layout.tsx
- `Pricing.tsx:61` : `bg-bg-raised`, `bg-bg-card` — tokens inexistants
- `Pricing.tsx:82` : `border-violet/40`, `bg-[rgba(124,58,237,0.06)]` — violet hardcodé hors système
- `UseCases.tsx:57` : `text-amber` — token inexistant

**P0 — Contenu obsolète : parle d'automatisation IA, pas d'événements sur-mesure**
- `Problem.tsx:3-13` : "Contenu décliné à la main", "Rapports clients interminables", "Leads qui refroidissent" — ce sont des problèmes d'agences marketing, pas d'organisateurs d'événements
- `Pricing.tsx:14-57` : Plans "Content Machine 800€", "Report Pilot 1500€" — ancienne grille tarifaire SaaS incompatible avec le pivot agence

**Action requise :** Supprimer ces trois fichiers ou les déplacer dans `_archive/`.

---

### 10. ScrollReveal — `src/components/ScrollReveal.tsx`

**Qualité générale : N/A — Dead code**

`ScrollReveal.tsx:33` — Ajoute la classe `.reveal` mais celle-ci n'existe nulle part dans globals.css. Le composant n'est pas importé dans page.tsx ni dans aucun composant actif. Le fallback `.reveal` sans style CSS signifie que tout le contenu enveloppé serait visible par défaut (pas d'animation, pas de masquage). Double problème : inutile et non fonctionnel.

**Action requise :** Supprimer le fichier.

---

## Recommandations priorisées

### P0 — Bloquant (à corriger avant tout lancement)

| # | Problème | Fichier:ligne | Effort |
|---|----------|---------------|--------|
| P0-1 | Grille Domaines bento : rangée 3 incomplète (2/3 colonnes) | `Domaines.tsx:92` | 15 min |
| P0-2 | Problem/UseCases/Pricing : dead code avec tokens obsolètes SaaS-AI — supprimer | `src/components/` | 5 min |
| P0-3 | Garantie Jour J sans traitement visuel distinctif dans le Hero — USP clé invisible | `Hero.tsx:156-161` | 45 min |
| P0-4 | ScrollReveal.tsx : `.reveal` absent des CSS, composant dead — supprimer | `ScrollReveal.tsx` | 5 min |

### P1 — Important (impact fort sur conversion / crédibilité)

| # | Problème | Fichier:ligne | Effort |
|---|----------|---------------|--------|
| P1-1 | `cursor-pointer` absent sur btn-ember, btn-primary, btn-outline, btn-ghost | `globals.css:269-363` | 10 min |
| P1-2 | `px-1` container Hero : padding quasi-nul, texte touche les bords sur mobile | `Hero.tsx:20` | 5 min |
| P1-3 | LinkedIn Footer pointe vers `linkedin.com` générique | `Footer.tsx:54` | 2 min |
| P1-4 | Mentions légales / Confidentialité pointent vers `#` | `Footer.tsx:105-106` | dépend contenu |
| P1-5 | Lien "Lire le post-mortem" est un `<div>` non cliquable | `Realisations.tsx:139-142` | 10 min |
| P1-6 | Mobile menu sans animation d'entrée | `Nav.tsx:117` | 20 min |
| P1-7 | Method step 04 "Jour J" sans traitement visuel distinctif | `Method.tsx:94-165` | 30 min |
| P1-8 | Label "Durée : Jour J" sémantiquement faux (Jour J n'est pas une durée) | `Method.tsx:144-150` | 5 min |

### P2 — Polish (quality of finish, détails qui font la différence)

| # | Problème | Fichier:ligne | Effort |
|---|----------|---------------|--------|
| P2-1 | `.display` line-height 0.97 trop serré sur mobile clamp(3rem) | `globals.css:110-111` | 10 min |
| P2-2 | Orbe accent `opacity-40` imperceptible sur ink-block | `Realisations.tsx:190` | 5 min |
| P2-3 | Device frame `bg/5` quasi-invisible sur ink-block | `Realisations.tsx:149` | 5 min |
| P2-4 | ProofBand font-display 20px titles trop grands vs 10.5px labels | `ProofBand.tsx:35` | 10 min |
| P2-5 | Marquee trop lent (42s) pour 24 items | `globals.css:419` | 2 min |
| P2-6 | Scroll cue trait horizontal contraste ~1.5:1 | `Hero.tsx:183` | 3 min |
| P2-7 | Wordmark Footer opacity-8 invisible sur écrans non-calibrés | `Footer.tsx:93` | 3 min |
| P2-8 | Line "La ligne verticale à left-[72px]" désalignée sur md breakpoints | `Method.tsx:89-91` | 20 min |
| P2-9 | FinalCTA FAQItem sans séparateurs visuels | `FinalCTA.tsx:78-93` | 10 min |
| P2-10 | `.btn-ember` hover color-mix sans fallback — vérifier support Safari <16.4 | `globals.css:317` | 15 min |

---

## Quick Wins — changements < 30 min qui transforment l'apparence

### QW-1 — `cursor-pointer` sur tous les boutons (10 min)
Dans `globals.css`, ajouter `cursor: pointer;` aux classes `.btn-primary`, `.btn-ember`, `.btn-outline`, `.btn-ghost`. Impact immédiat sur le sentiment de qualité sur desktop.

```css
/* globals.css:269 — ajouter dans .btn-primary */
cursor: pointer;

/* Idem dans .btn-ember:296, .btn-outline:340, .btn-ghost:323 */
```

### QW-2 — Fix `px-1` → padding correct dans Hero (5 min)
`Hero.tsx:20` : `px-1` → `px-[clamp(1.25rem,4vw,3.5rem)]`

### QW-3 — Réduire marquee à 30s et titres events à 14px (10 min)
`globals.css:419` : `42s` → `30s`
`ProofBand.tsx:35` : `text-[20px]` → `text-[14px]` et `font-display` → `font-medium`

### QW-4 — Trait scroll cue plus contrasté (3 min)
`Hero.tsx:183` : `bg-[color:var(--color-border-strong)]` → `bg-[color:var(--color-muted-foreground)]`

### QW-5 — Wordmark Footer opacity légèrement plus visible (2 min)
`Footer.tsx:93` : `/8` → `/12`

### QW-6 — Label Method step 04 : corriger "Durée" → "Échéance" (5 min)
`Method.tsx:144` : changer le label hardcodé `Durée` en condition `i === 3 ? "Échéance" : "Durée"` — ou mieux, ajouter un champ `durationLabel?: string` à l'interface Step.

### QW-7 — Fix grille Domaines rangée 3 (15 min)
`Domaines.tsx:92` — Changer le grid `grid-cols-3` en logique qui place domaines 05 et 06 correctement. Solution rapide : ajouter `md:col-start-2` à domaine 05 pour centrer la paire finale, ou donner `md:col-span-2` à l'un des deux derniers.

### QW-8 — Supprimer les 4 fichiers morts (5 min)
Supprimer `Problem.tsx`, `UseCases.tsx`, `Pricing.tsx`, `ScrollReveal.tsx` du dossier `src/components/`. Aucun n'est importé en production.

### QW-9 — LinkedIn URL réelle (2 min)
`Footer.tsx:54` : remplacer `https://linkedin.com` par l'URL exacte du profil LinkedIn.

### QW-10 — Device frame plus visible dans Realisations (5 min)
`Realisations.tsx:149` : `bg-[color:var(--color-background)]/5` → `/12`
`Realisations.tsx:190` : `opacity-40` → `opacity-65`

---

## Note sur le design system

Le fichier `globals.css` est de qualité production. Le token system (palette ember, shadows multicouches, easings nommés, typography scale variable) est à la hauteur des références Linear/Vercel pour la rigueur d'architecture. Le problème n'est pas le système — c'est que trois composants (Problem, UseCases, Pricing) ont échappé à la refonte et tournent avec un ancien système incompatible.

Une fois ces composants supprimés et les P0/P1 résolus, la landing a la matière pour être une référence dans sa catégorie : agences événementielles premium avec une identité éditoriale forte et distinctive.
