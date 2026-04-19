# PROMPT — Générer la landing Forgn avec Claude Design

> Copie-colle tout ce qui suit dans Claude Design (ou v0/Lovable/bolt.new).
> Retire uniquement ce bloc d'en-tête avant d'envoyer.

---

You are tasked with building the **production landing page for Forgn** — a boutique agency that crafts custom applications for events and internal tools. Ship a complete, premium, editorial Next.js 16 + Tailwind v4 site. Read every section of this brief carefully before generating. Do not summarize. Do not ask clarifying questions. Build the full site.

---

## 1. WHAT FORGN IS

Forgn is a **specialized agency**, public-facing voice `nous / notre équipe` (never `je`, never reveal a solo operator). Forgn ships bespoke apps in **2 to 4 weeks** for a narrow ICP and guarantees that the software will work on the event day — *or a Forgn engineer is physically there to fix it*. That promise is the single most important thing on the page.

**Domain** : `forgn.dev`
**Location** : Liège, Belgium (agency ciblée FR/BE)
**Founded** : 2024
**Market** : Belgian French and French-speaking France

**Ideal Customer Profile (ICP)** — name them explicitly:
- Incubateurs et accélérateurs (type VentureLab)
- Écoles entrepreneuriales et business schools
- Agences événementielles B2B
- Directions communication et événementiel d'ETI

**Budget per project** : 8 000 € → 25 000 € (forfait fermé, pas de TJM affiché).

**Non-negotiable brand rules:**
- Never name specific clients. Use generic sector labels (« école de commerce », « incubateur universitaire », etc.).
- Never show a photo of a person, a team, a founder. The agency is anonymous.
- Never use hype SaaS/AI vocabulary ("automatisez", "IA qui bosse pendant votre sommeil", "boostez").
- Language : **French** throughout. No English-sounding marketing anglicisms.
- Tone : premium, direct, confident, editorial. Think *agency that says no*, not *agency that chases*.

---

## 2. THE SINGLE MOST IMPORTANT MESSAGE

> **« Garantie jour J. Votre application fonctionne le soir de votre événement — ou notre équipe corrige en temps réel, sur place ou en astreinte serveur dédiée. Contractuel. »**

This sentence must appear prominently in the hero as a highlighted block (dark background, white text, accent-colored dot). It is the page's defensible angle versus freelancers and SaaS platforms.

---

## 3. DESIGN SYSTEM — EXACT TOKENS

Use **Tailwind v4** with CSS custom properties via `@theme inline` in `src/app/globals.css`. Ship both light and dark themes.

### Light palette

```css
--color-background: #faf8f4;       /* warm cream paper */
--color-background-deep: #f4f0e6;
--color-foreground: #0d0c0a;       /* deep ink */
--color-ink: #141210;
--color-muted: #f2eee5;
--color-muted-foreground: #4a443c; /* AAA contrast on muted */
--color-subtle: #ece7da;
--color-border: #e4dfd5;
--color-border-strong: #d1cbbc;

--color-accent: #d65d2e;           /* ember orange */
--color-accent-soft: #f2a07a;
--color-accent-deep: #8f3612;
--color-accent-glow: color-mix(in oklab, #d65d2e 35%, transparent);

--color-live: #5c8a3f;             /* subdued green for live indicator */
```

### Dark palette (applied via `.dark` class on `<html>`)

```css
--color-background: #0f0d0a;
--color-background-deep: #070604;
--color-foreground: #f5f1ea;
--color-ink: #ffffff;
--color-muted: #1a1612;
--color-muted-foreground: #b5ad9e;
--color-subtle: #24201a;
--color-border: #2d281f;
--color-border-strong: #3d3628;
--color-accent: #e67441;           /* brighter ember for dark */
--color-accent-soft: #f2a07a;
--color-accent-deep: #b85a2e;
```

### Typography

Three fonts via `next/font/google`:

```ts
Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", axes: ["SOFT", "WONK"] })
Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", weight: ["400","500","600"] })
JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap", weight: ["400","500"] })
```

CSS classes to define:
- `.display` — Fraunces, weight 430, letter-spacing -0.03em, line-height 0.97, variation `SOFT 30, WONK 0`
- `.display-italic` — Fraunces italic, weight 380, variation `SOFT 50, WONK 1` (wobbly playful)
- `.font-mono` — JetBrains Mono
- `.eyebrow` — JetBrains Mono 11px uppercase tracking 0.1em with a small horizontal rule prefix (use `::before` with `content: ""` and 20px wide background)
- `.tabular` — `font-variant-numeric: tabular-nums`

### Radii

```
--radius-sm: 6px
--radius-md: 12px
--radius-lg: 18px
--radius-xl: 28px
--radius-2xl: 36px
--radius-pill: 999px
```

### Shadows — warm stack (not cold black)

```css
--shadow-sm: 0 1px 2px rgba(33, 20, 6, 0.04);
--shadow-md: 0 2px 4px rgba(33, 20, 6, 0.05), 0 8px 20px -6px rgba(33, 20, 6, 0.08);
--shadow-lg: 0 4px 10px -2px rgba(33, 20, 6, 0.08), 0 24px 40px -12px rgba(33, 20, 6, 0.14);
--shadow-xl: 0 10px 20px -6px rgba(33, 20, 6, 0.12), 0 40px 80px -20px rgba(33, 20, 6, 0.22);
--shadow-ember: 0 14px 44px -10px color-mix(in oklab, #d65d2e 35%, transparent), 0 4px 12px -4px color-mix(in oklab, #d65d2e 25%, transparent);
--shadow-inset: inset 0 1px 0 rgba(255, 250, 240, 0.6);
```

### Backgrounds / utility classes

- `.bg-mesh-warm` — subtle radial gradient ember glow in bottom-left corner over cream
- `.bg-grain` — soft SVG grain overlay (opacity 50%)
- `.bg-editorial-grid` — faint 1px grid lines at ~32px intervals, 0.35 opacity
- `.bg-dots` — subtle dot-matrix pattern
- `.ember-block` — accent-colored solid container (gradient accent→accent-deep + grain + inset highlight)
- `.ink-block` — ink-colored solid container for dark hero-like sections
- `.card` — cream surface with border and shadow-sm, rounded-lg
- `.card-raised` — elevated card variant, shadow-lg
- `.chip` — 28px pill container with eyebrow typography
- `.chip-ember` — ember-tinted chip variant
- `.live-dot` — 8px green dot with breathing pulse animation
- `.arrow-nudge` — arrow that translates right 2px on hover

### Easings

```
--ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out-strong: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

### Buttons

- `.btn-ember` — 48px pill, accent background, `#fff8f2` text, ember shadow + inset highlight, active scale 0.97
- `.btn-outline` — 48px pill, background color, strong border, shadow-sm, hover background muted
- `.btn-ghost` — 48px pill, no bg, hover subtle bg

---

## 4. PAGE STRUCTURE — Section by section

### 4.1 `<Nav>` (sticky fixed top, z-50, pill-shaped)

Center-aligned floating nav bar that gains glass backdrop after 8px scroll.

Structure:
- Wordmark : 28px rounded square, ink background, "F" in Fraunces 600, tiny ember dot in top-right corner. Next to it: "Forgn" in Inter medium 15.5px.
- Divider 1px.
- 3 links : `Réalisations` `#realisations`, `Méthode` `#methode`, `Domaines` `#domaines`. Active link gets `bg-subtle` + `aria-current="location"` (detected via IntersectionObserver on sections).
- Availability chip (hidden `lg:flex`) : green live-dot + "Prochains créneaux · juin 2026" in mono 10.5px.
- ThemeToggle icon (sun/moon, 36x36, rounded-full, hover bg-subtle).
- Primary CTA : `Vérifier les disponibilités` → opens Calendly in new tab. Ink background, cream text, accent-soft arrow.
- Mobile : hamburger with animated lines → tap opens glass drawer below nav with 3 links + availability + CTA. Escape closes + returns focus. `aria-controls`, `aria-expanded`, `aria-label` dynamic.

### 4.2 `<Hero>` — warm mesh, editorial grid overlay, grain

Layout (desktop lg+):
- Top row : two chips left (ember chip "En forge · édition 2026" with live-dot, + neutral chip "Agence · Liège, BE") + right: mono coordinates `50°38′N — 05°34′E` separated by a 1px hairline.
- 2-column grid below:
  - **Left col (7/12)** :
    - H1 Fraunces `clamp(3rem, 9.5vw, 9rem)`, max-w-[18ch] :
      ```
      Les applications
      que vos [événements]                   ← Fraunces italic, ember color
      méritent.                               ← underlined with animated ember bar (scaleX 0 → 1 over 0.9s)
      ```
    - Paragraph 19-20px, muted foreground 85%, max-w-[54ch] :
      > "Forgn est l'agence des **incubateurs, écoles entrepreneuriales et agences événementielles** qui refusent qu'une app tombe le soir de leur événement. Vote live, compagnon, matching, gamification, dashboard de scène — livrés en 2 à 4 semaines."
    - Garantie highlighted block : rounded-2xl, ink bg, cream text, 48px ember dot icon, padding 16-20px, 15px leading-[1.55]. Content:
      > **"Garantie jour J."** Votre application fonctionne le soir de votre événement — ou notre équipe corrige en temps réel, sur place ou en astreinte serveur dédiée. Contractuel.
    - Two CTAs : primary `.btn-ember` "Réserver 30 minutes" → Calendly, secondary `.btn-outline` "Décrire mon projet" → `/brief`. Below: quiet link "Voir d'abord les réalisations ↓".
  - **Right col (5/12)** : **HeroLiveMockup** — see section 5 below.

- Full-width signal strip (below, borderTop muted) — 4 cells in a grid:
  - 01 · Livraison — 2 à 4 semaines
  - 02 · Jour J — Présence contractuelle
  - 03 · Sur-mesure — Votre marque, votre code
  - 04 · Référent — Un interlocuteur unique

- Scroll cue : `— Faites défiler — quatre applications en production` (eyebrow style, with a 40px leading horizontal rule).

### 4.3 `<Realisations>` id=`realisations`

Section with **scroll-driven parallax** using `useScroll + useTransform`:
- Device frame and orb glow translate at different speeds (-40 → 40px, -60 → 60px)
- Text column translates 20 → -20px

Header 12-col split:
- Left eyebrow "Réalisations · Ce qui a tenu en production" + H2 Fraunces clamp(2.2rem, 6vw, 4.75rem):
  > « Quatre fois que le [jour J] s'est passé exactement comme prévu. »  ← "jour J" in italic ember

- Right: chip "Case studies sur demande · NDA respectés"

**Featured case** — huge editorial ink-block with grain overlay :
- Left text (7/12) : chip-ember tag "Vote live · Award cérémonie", year 2026, H3 Fraunces 32px+ "Une soirée pitch remportée sans un seul bug.", lede 18px background/85, summary 14.5px background/60, link "Lire le case study complet →"
- Right panel (5/12) : faux device frame (subtle backdrop-blur), live indicator ("Session live — Salle B" + running clock), 4 metrics with staggered fade-in:
  - `110/112` participants votants
  - `11 min` fenêtre de vote
  - `0` bug en production  ← ember color
  - `2` techniciens présents
- Ember glow orb absolute top-right, parallax.

**3 supporting cards** (grid-cols-3 gap-5) — each a clickable `<Link>` to `/realisations/[slug]` :
- "Companion" — `companion-journee-entrepreneuriale` — "Une journée entrepreneuriale, dans la poche." — metrics: 8 équipes / 3 ateliers / 5 sem livraison
- "Gamification" — `gamification-award` — "Un award où le public investit, pas où le jury vote." — metrics: 60+ projets / Live écran TV / 4 sem livraison
- "Matching" — `matching-alumni` — "Un programme d'alumni qui tient au-delà de trois mois." — metrics: 72 profils / 41 binômes / 76% actifs 3 mois
- Each card has a decorative SVG illustration in its top-right corner (abstract hint of the UI type : phone+checklist for companion, leaderboard bars for gamification, connected nodes for matching). Group-hover opacity transition.
- Bottom of card : "Lire le case study →" with accent-deep hover.

### 4.4 `<ProofBand>` — thin band

Infinite horizontal marquee of 6 items, duplicated for seamless loop. CSS animation 42s linear, paused on `:hover` AND `:focus-within`. Mask-gradient fade at edges. Reduced-motion: disable animation.

Items (type + metric + year in mono):
- École de commerce · Award — 110 votes en 11 min — 2026
- Incubateur universitaire · Road to Business — 8 équipes · 3 ateliers — 2026
- Prix entrepreneurial · Leaderboard live — 60+ projets · écran TV — 2025
- Programme alumni · Matching — 41 binômes · 76% actifs — 2024
- Convention B2B · Jour J — Présence contractuelle — 2026
- Agence événementielle · App compagnon — 0 bug · 0 downtime — 2026

Leading label : eyebrow "En production —".

### 4.5 `<Testimonials>`

Eyebrow "Paroles · Anonymisées par accord client".
H2 :
> « Ce que nos clients **racontent** — quand on les écoute. »

3 quote cards (grid-cols-3) each with :
- Large opening `"` in Fraunces 72px, accent 30% alpha, absolute top-left
- Quote 15.5px leading-1.6
- Border-top divider
- Author (bold 13.5px) + context (12px muted) + year (mono 10.5px tabular)

Testimonials (anonymized placeholder text — user will swap for real ones later) :
1. *"À 22h15 le serveur a eu un hoquet. Un technicien Forgn était encore en salle avec son laptop ouvert. Trois minutes plus tard, la soirée reprenait sans que personne dans le public ne s'en rende compte."* — Directrice communication · ETI industrielle · Wallonie · 2026
2. *"On avait demandé deux devis à des agences belges classiques : 60k€ et 14 semaines. Forgn a livré en trois semaines pour 11k€ — et l'app fonctionnait exactement comme on l'avait dessinée ensemble."* — Responsable programme incubateur · Belgique · 2025
3. *"Zéro bug en live, zéro ticket support post-event. C'est la première fois qu'on vit ça avec un prestataire tech. Je recommande sans hésiter, et on a déjà signé un second projet."* — Directeur événementiel · Agence B2B · France · 2026

### 4.6 `<Domaines>` id=`domaines` — **cursor-reactive bento**

Header : eyebrow "Domaines · Ce que nous forgeons" + H2 :
> « Six terrains. [Aucun gabarit.] »    ← "Aucun gabarit" italic ember

Sub: "Chaque domaine est un point de départ, jamais une livraison. Nous partons de votre besoin — pas d'un gabarit."

**6-card bento, asymmetric col-spans**:
- 01 Vote & award live — 2-3 semaines — **ember-block variant** (accent) — col-span-2
- 02 Compagnon d'événement — 3-5 semaines — card
- 03 Gamification & engagement — 3-4 semaines — card
- 04 Matching & networking — 3-4 semaines — col-span-2
- 05 Dashboard & écran de scène — 2-3 semaines — card
- 06 Inscription & gestion participants — 2-4 semaines — card

Each card is a `<motion.a>` pointing to `#contact` with :
- `aria-label="${title} — discuter de ce terrain (${scope})"`
- **3D tilt on hover** : `useMotionValue` for mouseX/Y (0→1 ratio in card), `useSpring(useTransform(...))` to rotateX [-6,6] and rotateY [-6,6] degrees, perspective 1200 on parent grid.
- **Spotlight** : radial-gradient 280px circle at `${mouseX} ${mouseY}`, color `rgba(214,93,46,0.18)` (or `rgba(255,255,255,0.22)` if ember-block variant), opacity 0→1 on group-hover.
- `transformStyle: preserve-3d` + inner content `translateZ(20px)` for depth.
- Reduced-motion : disable tilt, still allow fade.

Structure inside each card:
- Top : mono 11px tracking 0.12em — number `01` left, scope `2-3 semaines` right.
- Title Fraunces 24-28px leading-1.05.
- Description 14.5px leading-relaxed max-w-[42ch].
- Bottom : "Discuter de ce terrain" + 36px circular arrow button (border, accent hover).

### 4.7 `<PricingBridge>` — rounded-3xl bordered bg-background card inside section

Header eyebrow "Budget · Transparence" + H2 Fraunces clamp(1.8rem, 4.2vw, 3rem) max-w-[20ch] :
> « De [8 000] à [25 000 €], par projet. »  ← 8 000 et 25 000 € en italic ember

Left col (7/12) :
- Paragraph 16-17px muted :
  > "Forfaits fermes, sans TJM affiché. Paiement par phase. Sortie possible à la fin de chaque phase. **Cadrage de 30 minutes gratuit, sans engagement.**"

- 3-tier pricing grid (grid-cols-3, gap-3) :
  - **Simple** — 8 — 12 k€ — "1 objet, 2-3 semaines"
  - **Standard** — 12 — 18 k€ — "Flux complet, 3-4 semaines" ← highlighted with accent border + accent-tinted bg (6% alpha)
  - **Complexe** — 18 — 25 k€ — "Multi-rôles, 4-5 semaines"

Right col (5/12) with vertical border-l :
- Primary `.btn-ember` "Réserver 30 minutes" (justify-center, full-width)
- Info card bg-muted border :
  - Green circle with € symbol, mono eyebrow "Subvention Wallonie"
  - Body 13.5px: "Chèques-Entreprises transformation numérique — **jusqu'à 50% du projet** cofinancé pour les entreprises wallonnes éligibles."

### 4.8 `<Method>` id=`methode`

Eyebrow "Méthode · Comment nous livrons" + H2 :
> « Du brief au [jour J], en quatre temps serrés. »

Sub (right col) : "Chaque temps a sa livrable, sa durée, sa sortie de piste. Vous savez en permanence où vous en êtes — et vous pouvez sortir à la fin de chaque temps."

**4 phase rows** (grid-cols-12), connected by a faint vertical rule at left (md+):
- Number badge 56x56 rounded-2xl border bg-background, Fraunces 18px (`01`…`04`). First gets ember pulse dot overlay.
- Phase label mono uppercase.
- Title Fraunces 26-30px.
- Description 15px leading-relaxed max-w-[50ch].
- Right meta col : "Durée" + value / divider / "Livrable" + value.

Phases (exact content) :
1. **Cadrage** · 30 minutes · Livrable : Brief signé
   - "Trente minutes pour comprendre votre événement, votre public, votre scène. On écrit ensemble l'objectif exact, les métriques de succès, la date butoir."
2. **Conception** · 1 semaine · Livrable : Prototype navigable
   - "Une semaine pour poser le flux. Wireframes cliquables, vocabulaire UI choisi, scénario jour J validé avec vous. On écarte tout ce qui n'est pas essentiel."
3. **Forge** · 2 à 3 semaines · Livrable : Application livrée
   - "Deux à trois semaines d'atelier. Un référent Forgn, commits quotidiens, démos hebdomadaires. Votre marque, votre code source, votre hébergement."
4. **Jour J** · Jour J · Livrable : Présence sur place
   - "Nous sommes là. En salle, ou en astreinte serveur dédiée. Monitoring, correctifs immédiats, sang-froid contractuel. L'app ne tombe pas."

Row hover bg-muted-40 transition + rounded-2xl negative margin.

### 4.9 `<FinalCTA>` id=`contact` — full-bleed ember-block

Big rounded-3xl container with ember gradient bg, white grain overlay, two large colored orbs (one white 480px top-right, one accent-deep 380px bottom-left).

12-col split :
- Left (7/12) :
  - Chip "Prochains créneaux · juin 2026" (white/15 bg, border white/25, live-dot white animate-pulse)
  - H2 Fraunces clamp(2.2rem, 7vw, 5.5rem) leading-0.98 max-w-[14ch], white :
    > « Votre événement a une date. »
    > [On en parle ?]  ← italic white/70
  - Body white/85 max-w-[54ch] :
    > "Trente minutes pour cadrer. Après, vous saurez si nous pouvons livrer avant la date — et si nous sommes faits pour travailler ensemble."
  - CTA row : primary rounded-full white bg with accent-deep text + ember shadow "Réserver 30 minutes" → Calendly. Secondary glass "Décrire mon projet" → /brief. Tertiary quiet white link "hello@forgn.dev".

- Right (5/12) with vertical border-l white/20 :
  - 6 FAQ items (space-y-5), each a mini-list with 1.5px ember dot + question in white 14.5px medium + answer in white/75 14px leading-relaxed with left-padding:
    1. **Vous prenez quels budgets ?** — "De 8 000 à 25 000 €, forfait fermé. Cadrage gratuit, sans engagement."
    2. **Le jour J, vous êtes où ?** — "En salle ou en astreinte serveur dédiée — contractuel, pas optionnel."
    3. **Qui travaille sur mon projet ?** — "Un référent Forgn unique du brief à la livraison. Pas de turnover, pas de sous-traitance."
    4. **Vous avez des références dans mon secteur ?** — "Incubateurs, écoles entrepreneuriales, agences événementielles, ETI. Case studies détaillés sur demande."
    5. **Le cadrage est-il payant ?** — "Non. Trente minutes offertes pour qualifier votre besoin — et confirmer qu'on peut livrer avant votre date."
    6. **Et si ça ne marche pas ?** — "Sortie possible à la fin de chaque phase. Rien ne vous engage avant le brief signé."

Inject **JSON-LD `FAQPage` schema** mirroring these 6 Q&A.

### 4.10 `<Footer>`

Editorial full-width, border-top, bg muted-50.

Top row (grid-cols-12, 10 col mx-auto max-w-[1240px]):
- Brand block (col-span-6) : 36x36 logo + "Forgn" display 28px + paragraph 17px muted max-w-[42ch] « L'agence qui forge les applications que vos événements et vos outils métier méritent. » + availability live-dot row.
- Site links (col-span-2) : mono eyebrow "Site" + 4 links `#realisations`, `#methode`, `#domaines`, `#contact`.
- Contact links (col-span-2) : mono "Contact" + mailto, LinkedIn `linkedin.com/company/forgn/`, Calendly.
- Address (col-span-2) : mono "Adresse" + `<address>` not-italic : Liège / Belgique / mono coordinates 50°38′N · 05°34′E.

Below : massive wordmark "Forgn." in Fraunces clamp(4rem, 22vw, 20rem), leading-0.85, letter-spacing -0.05em, text-foreground/8 — decorative only (aria-hidden).

Bottom row : "© 2026 Forgn — Tous droits réservés" left + quiet links right ("Mentions légales" `/mentions-legales`, "Confidentialité" `/confidentialite`, "Accessibilité" `/accessibility-statement`, "Forgé à Liège").

### 4.11 `<StickyMobileCTA>` (md:hidden, fixed bottom-4, z-40)

Appears after 400px scroll, hides when `#contact` enters viewport (IntersectionObserver with rootMargin -20%). AnimatePresence slide + fade in. Ink-colored pill h-14 px-5 shadow-xl with: left cluster = ember circle + white pulse dot + "Réserver 30 minutes", right = accent-soft arrow.

---

## 5. THE WOW MOMENT — `<HeroLiveMockup>`

A **device-framed simulated live vote** that auto-animates on an 8-second loop with a 1.6s pause. Placeholder for real product screenshots later.

Structure :
- Outer wrapper max-w-[420px], motion fade-in scale 0.98→1.
- Ambient glow : absolute -inset-8 rounded-[32px] accent 14% alpha blur-3xl.
- Device frame : rounded-[28px] bg ink, padding 12px, shadow 30px/-20px/45% + inset highlight.
- Inner screen : rounded-[20px] gradient `#141210 → #1a1714 → #141210`, border white/5.
- Screen content :
  - Header : green live-dot with animate-ping + mono "Soirée pitch · Live" + running system clock right.
  - Subheadline : "Votez pour votre projet coup de cœur" + small "Résultats dévoilés sur scène à 20:55"
  - 3 candidate bars, each with:
    - Name : "Projet Atlas" / "Projet Vega" / "Projet Lumen"
    - Vote count animated 0 → `final` with `easeOutCubic` over 8s
    - Horizontal progress bar (h-1.5 rounded-full bg-white/10) filling to `(votes/TOTAL_FINAL) * 100%` with colored fill (`var(--color-accent)`, `#c78050`, `#6b665c`) and matching glow box-shadow.
    - First one gets "En tête" pill with ember dot under bar.
  - Footer metrics row : "Votants" + `{count} / 112` (count animates) + right "Fenêtre" countdown from `11:00 → 00:00` formatted `mm:ss`.
- Caption below device : mono 10px eyebrow "Aperçu — simulation vote live".

Respect `prefers-reduced-motion` : jump directly to final state, skip animation loop.

---

## 6. ADDITIONAL PAGES

### `/brief` — project brief intake

Hero : eyebrow "Brief projet · 3 minutes" + H1 Fraunces "Racontez-nous votre [événement]." (événement italic ember) + lead 17px.

4 trust items in grid : Sous 24h / Gratuit / Confidentiel / Honnête.

Form container : rounded-3xl bg-background border shadow-md. Contains:
- If `process.env.NEXT_PUBLIC_TALLY_FORM_ID` defined : `<iframe>` Tally embed (`https://tally.so/embed/${ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`, height 720)
- Else fallback : icon, "Formulaire bientôt disponible.", mailto CTA to `hello@forgn.dev?subject=Brief projet Forgn`.

Bottom : alternative CTAs (Calendly + mailto).

### `/realisations/[slug]` — 4 case study detail pages

Use `generateStaticParams` on 4 slugs. Each page pulls from a typed `CaseStudy` object stored in `src/data/case-studies.ts` (keep anonymized, no client names). Layout :

- Back link "← Toutes les réalisations"
- Header : chip tag + year + H1 (the case title) + lede + 4-item meta dl (Secteur, Durée, Budget, Échéance)
- Section "Audience" — paragraph
- Section "Défis" — 2-col bullet list with accent dots
- Section "Process" — ordered list of 4 numbered phases (large badge left, title + body right)
- Section "Stack" — chip cloud of technologies
- **Ink-block** "Résultats mesurés" with 6-metric grid (outcomes), white eyebrow, accent orb
- Section "Le jour J" — italic first-person anecdote
- If testimonial : figure card with Fraunces large opening `"`, quote, author line
- Bottom CTA card : muted bg, H2 "Un événement, une date, une idée d'app ?" + 3 actions (Calendly, /brief, mailto question)
- Related cases : 2 clickable cards to other slugs.

Inject JSON-LD `CreativeWork` with the case metadata.

### `/mentions-legales`, `/confidentialite`, `/accessibility-statement`

Wrap each in a shared `<LegalShell>` component : back-link + eyebrow + H1 + "Dernière mise à jour · 19 avril 2026" + `.prose-legal` container.

Content summaries :
- Mentions légales : Éditeur Forgn, Liège, Belgique · hébergeur Vercel Inc · propriété intellectuelle · droit belge, tribunaux Liège · contact `hello@forgn.dev`.
- Confidentialité : responsable du traitement, données (analytics anonyme, Clarity, Cal.com), finalités, base légale, sous-traitants avec transferts hors UE, droits RGPD, APD Belgique + CNIL France, absence de cookies tiers.
- Accessibility : engagement WCAG 2.2 AA + EN 301 549 + EAA (28 juin 2025), mesures en place, limitations connues, outils d'évaluation (axe, Lighthouse, Accessibility Insights, NVDA, VoiceOver), contact, voie de recours Unia + Défenseur des droits.

### `/not-found.tsx` — custom 404

Full-height, bg-mesh-warm, editorial grid, accent orb.
- Eyebrow "Erreur · 404"
- H1 Fraunces clamp(3rem, 10vw, 7rem) : « Cette page a [déforgé.] »
- Lede 17px muted max-w-[52ch] : "Le lien que vous avez suivi ne mène nulle part…"
- 2 CTAs : primary "Retour à l'accueil" + outline "Réserver 30 minutes"
- 3 nav hints (Réalisations, Méthode, Contact) as small cards.

---

## 7. MOTION PRINCIPLES

- All animations respect `prefers-reduced-motion: reduce` via a global `@media` rule (duration 0.01ms, iteration 1) + `useReducedMotion()` in motion components.
- `motion/react` (Framer Motion v12 successor) for scroll, cursor, and interactive state.
- Easings : `cubic-bezier(0.23, 1, 0.32, 1)` default (ease-out-strong).
- Scroll : `whileInView` with margin `-60px` to `-100px`, `viewport: { once: true }`.
- Parallax : `useScroll({ target, offset: ["start end", "end start"] }) + useTransform` on select decorative elements (device frames, orbs, column translate).
- Focus states are ember 2px outline with 2px offset and border-radius 4px.
- Marquee : pure CSS `@keyframes` linear infinite 42s, `animation-play-state: paused` on `:hover` AND `:focus-within`.

---

## 8. ACCESSIBILITY — WCAG 2.2 AA minimum

- `<html lang="fr">` with optional `.dark` class.
- Skip link : `<a href="#main" class="skip-link">Aller au contenu principal</a>` first child of body, visually hidden except on focus.
- Landmarks : `<header>`, `<nav aria-label="Navigation principale">`, `<main id="main">`, `<footer>`, `<address>`, `<section>`, `<article>`.
- Single `<h1>` per page.
- `aria-label` on all icon-only buttons (logo link, theme toggle, mobile menu toggle with dynamic label).
- `aria-current="location"` on active nav link.
- Focus trap is NOT required but Escape must close mobile menu and return focus to toggle.
- Color contrast AA minimum (AAA target) : muted-foreground `#4a443c` on muted bg `#f2eee5` = 7.2:1.
- Marquee pauses on focus.
- All motion components respect `prefers-reduced-motion`.
- Cursor pointer on all interactive elements (`.btn-*`, `button`, `[role="button"]`).

---

## 9. PERFORMANCE

- Core Web Vitals targets : LCP < 2.2s, CLS < 0.05, INP < 200ms (p75 mobile).
- Fonts subsetted to exact weights needed.
- Images : Next `<Image>` with AVIF/WebP formats, explicit dimensions, lazy except above-fold.
- Motion : lazy-load motion features, minimize `'use client'` boundaries.
- Bundle JS < 120 KB gzip.
- Cache headers : `_next/static` immutable 1 year; `_next/image` 1 day client / 1 year CDN.
- Security headers : HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy (camera, microphone, geolocation = denied).

---

## 10. SEO & METADATA

`layout.tsx` metadata :
- Title template : `%s · Forgn`
- Default title : "Forgn — Agence d'apps sur-mesure pour événements · Livrées jour J"
- Description : "Agence basée à Liège. Applications sur-mesure pour incubateurs, écoles entrepreneuriales et agences événementielles. Livrées en 2 à 4 semaines. Garantie jour J contractuelle."
- Keywords : agence application sur-mesure, application événement, vote live événement, app compagnon événement, gamification événement, matching networking, agence développement Liège, agence développement Belgique, incubateur application, chèques entreprises Wallonie numérique
- `alternates.canonical: "/"`, `robots: { index: true, follow: true, googleBot: max-image-preview large, max-snippet -1 }`
- OpenGraph : `type: website`, `locale: fr_BE`, `alternateLocale: [fr_FR]`, `siteName: Forgn`
- Twitter Card : summary_large_image

Dynamic OG image via `app/opengraph-image.tsx` using `next/og` `ImageResponse` : cream bg `#faf8f4`, radial ember glows, agency chip "Agence · Liège, BE", H1 « Les applications que vos événements méritent. » (italic ember on événements), dark ink block "Garantie jour J · livrée en 2 à 4 semaines", bottom metrics row 12 / 12/12 / 0.

Inject 3 JSON-LD schemas in `layout.tsx` body :
1. `Organization` : name Forgn, url forgn.dev, foundingDate 2024, areaServed BE + FR, address Liège Wallonie BE, contactPoint sales hello@forgn.dev FR, sameAs LinkedIn company.
2. `ProfessionalService` : same location, geo coords 50.6326, 5.5797, serviceType array of the 6 domaines, priceRange "€€€", knowsLanguage fr.
3. `FAQPage` inside `FinalCTA` with the 6 Q&A.

Add `app/sitemap.ts` and `app/robots.ts` using Next `MetadataRoute`.

---

## 11. TECH STACK — Exact versions

```json
{
  "dependencies": {
    "@vercel/analytics": "^2",
    "@vercel/speed-insights": "^2",
    "motion": "^12",
    "next": "16.2.2",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@next/bundle-analyzer": "^15",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "cross-env": "^10",
    "eslint": "^9",
    "eslint-config-next": "16.2.2",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

Conventions :
- TypeScript strict. No `any`.
- Prefer `const`, named exports (but `export default function` allowed for pages).
- Comments in English, visible copy in French.
- Centralize constants : `src/lib/constants.ts` exporting `CALENDLY_URL`, `BRIEF_URL="/brief"`, `CONTACT_EMAIL="hello@forgn.dev"`, `LINKEDIN_URL`, `AVAILABILITY_LABEL="Prochains créneaux · juin 2026"`, `SITE_URL="https://forgn.dev"`, `BRAND_NAME="Forgn"`.
- Env vars (optional, documented in `.env.example`) : `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_TALLY_FORM_ID`, `SENTRY_DSN`.

Include `<Analytics />` and `<SpeedInsights />` at the end of `<body>`. Conditionally inject Microsoft Clarity script if `NEXT_PUBLIC_CLARITY_ID` is defined. Inline theme-init script before first paint : reads `localStorage['forgn-theme']`, fallback to `prefers-color-scheme`, applies `.dark` class on `<html>`.

---

## 12. REFERENCE AESTHETICS

Draw inspiration from :
- **Linear.app** — editorial depth, composable layout, disciplined typography
- **Stripe.com** — technical precision, subtle motion, clean info hierarchy
- **Arc.net** — signature motion moments, playful details, wow micro-interactions
- **Vercel.com** — rigorous design system, generous whitespace
- **Rauno Freiberg's blog** — editorial typography, high taste ratio

**Not** : generic SaaS templates, neon gradients, glassmorphism overload, hero with stock photo of smiling people, carousel sliders, chatbot popup.

---

## 13. DELIVERABLE

A complete Next.js 16 App Router project with :
- All 10 home sections + Nav + StickyMobileCTA
- 4 detail pages under `/realisations/[slug]`
- `/brief`, `/mentions-legales`, `/confidentialite`, `/accessibility-statement`
- Custom `not-found.tsx`
- `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`
- Shared `constants.ts`, `case-studies.ts`
- Working light AND dark theme with toggle
- All motion respecting reduced-motion
- `npm run build` clean, `npx tsc --noEmit` clean
- Ship a `.env.example` documenting Clarity and Tally IDs

Do not output pseudo-code or partial examples. Output the complete production code, every file, ready to `npm install && npm run build && npm run start`.

---

END OF BRIEF.
