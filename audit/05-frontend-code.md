# Audit qualité frontend — Forgn Site
**Date** : 2026-04-18  
**Auditeur** : Claude Code (Sonnet 4.6) — senior frontend reviewer  
**Stack analysée** : Next.js 16.2.2 · React 19.2.4 · TypeScript 5 · Tailwind v4 · motion v12  
**Fichiers lus** : `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `app/opengraph-image.tsx`, tous les composants `src/components/*.tsx`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `package.json`

---

## Executive Summary

**Score qualité code : 6.5 / 10**

Le code est visuellement soigné et structurellement propre pour une landing statique. Les conventions TypeScript sont globalement respectées, le design system CSS est cohérent et bien architecturé. Cependant, plusieurs problèmes sérieux impactent la maintenabilité, l'accessibilité, et l'alignement avec Next.js 16 / React 19.

### Top 5 problèmes

| # | Problème | Sévérité | Fichier |
|---|----------|----------|---------|
| 1 | **Tous les composants sont `'use client'` sans nécessité** — la landing entière tourne côté client, éliminant les bénéfices RSC | P1 | `Hero`, `Nav`, `Realisations`, `Method`, `Domaines`, `FinalCTA` |
| 2 | **`opengraph-image.tsx` utilise l'identité visuelle de l'ancienne version SaaS** (violet `#8b5cf6`, texte "systèmes qui travaillent pendant que vous dormez") — incohérence de marque totale | P0 | `app/opengraph-image.tsx` |
| 3 | **`UseCases.tsx` et `Pricing.tsx` sont des composants zombies** de l'ancienne version SaaS (tokens `text-violet-light`, `bg-bg-card`, `bg-violet`) qui n'existent plus — ils ne compilent pas proprement | P0 | `src/components/UseCases.tsx`, `Pricing.tsx` |
| 4 | **`Nav.tsx` : overuse du `useEffect` pour scroll** — listener non-throttlé, `open` state sans fermeture clavier (Escape), focus trap absent sur le menu mobile | P1 | `Nav.tsx:18-23` |
| 5 | **`ScrollReveal.tsx` est un doublon** de ce que motion fait déjà dans tous les autres composants — dead code jamais utilisé dans `page.tsx` | P2 | `ScrollReveal.tsx` |

---

## 1. Conformité Next.js 16 App Router

### 1.1 Overuse massif de `'use client'`

**Sévérité : P1**

Chaque composant déclare `'use client'` en ligne 1. Or, la majorité d'entre eux n'utilise aucun hook interactif :

| Composant | Raison `'use client'` déclarée | Hooks réels utilisés |
|-----------|-------------------------------|----------------------|
| `Hero.tsx` | Oui | Aucun (motion `animate` = viewport-triggered, fonctionne en SSR) |
| `Realisations.tsx` | Oui | Aucun |
| `Method.tsx` | Oui | Aucun |
| `Domaines.tsx` | Oui | Aucun |
| `FinalCTA.tsx` | Oui | Aucun |
| `ProofBand.tsx` | Oui | Aucun |
| `Footer.tsx` | Non (`export default function Footer()` sans `'use client'`) | Aucun — seul composant correct |
| `Nav.tsx` | Justifié | `useState`, `useEffect` |
| `ScrollReveal.tsx` | Justifié | `useEffect`, `useRef` |

`motion` de `motion/react` supporte le rendu serveur. `whileInView`, `initial`, `animate` sont des props déclaratives qui ne nécessitent pas le client boundary. La librairie injecte ses observers côté client via hydratation automatique.

**Fix recommandé** : Supprimer `'use client'` de `Hero`, `Realisations`, `Method`, `Domaines`, `FinalCTA`, `ProofBand`. Garder uniquement `Nav` et `ScrollReveal`.

```tsx
// Hero.tsx — AVANT
"use client";
import { motion } from "motion/react";

// Hero.tsx — APRÈS (rien du tout — Server Component par défaut)
import { motion } from "motion/react";
```

### 1.2 `page.tsx` : pas de Metadata au niveau page

**Sévérité : P2**

`app/layout.tsx` exporte le metadata global, mais `app/page.tsx` ne surcharge pas avec un `generateMetadata` ou `export const metadata`. Pour une landing SEO-first, la page devrait avoir ses propres `openGraph.url`, `canonical`, et `alternates`.

### 1.3 `next.config.ts` vide

**Sévérité : P2**

```ts
// next.config.ts — actuellement
const nextConfig: NextConfig = {
  /* config options here */
};
```

Next.js 16 introduit `cacheComponents` (désactivé par défaut, mais stable). Pour une landing entièrement statique, activer la prérendering optimisée est un gain immédiat :

```ts
const nextConfig: NextConfig = {
  cacheComponents: true,
  // Optimisation images si assets locaux ajoutés plus tard
  images: {
    formats: ["image/avif", "image/webp"],
  },
};
```

### 1.4 `opengraph-image.tsx` — identité visuelle périmée

**Sévérité : P0 — cassé fonctionnellement pour la marque**

`app/opengraph-image.tsx:4-6` :
```tsx
export const alt = "Forgn — Des systèmes qui travaillent pendant que vous dormez";
// couleurs : #8b5cf6 (violet SaaS), #fbbf24 (amber)
// texte : "Automatisation sur mesure pour agences marketing"
```

C'est l'OG image de l'ancienne version SaaS (pivot d'avril 2026 non répercuté). Chaque partage LinkedIn/Twitter affiche une identité visuelle et un positionnement complètement différents du site actuel.

**Fix minimal** :
```tsx
export const alt = "Forgn — L'agence qui forge vos applications sur-mesure";

// Dans le JSX :
background: "#faf8f4",          // --color-background
color: "#d65d2e",               // --color-accent (ember)
// "L'agence qui forge vos applications sur-mesure"
// "Livrées en 2 à 4 semaines. Présentes le jour J."
```

---

## 2. React 19 patterns

### 2.1 Aucune utilisation des nouveautés React 19

**Sévérité : P2 (contexte landing statique — acceptable)**

Pour une landing sans data-fetching ni forms, l'absence de `use()`, `useOptimistic`, `useFormStatus` est normale. Aucune régression ici.

### 2.2 `Nav.tsx` — pattern `useEffect` pour scroll non optimal

**Sévérité : P1**

`Nav.tsx:18-23` :
```tsx
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);
```

Le listener n'est pas throttlé. Sur mobile 120Hz, `setScrolled` peut être appelé des dizaines de fois par seconde en déclenchant des re-renders. Le `{ passive: true }` est bien présent, mais un `useRef` pour le dernier état éviterait les re-renders inutiles.

**Fix** :
```tsx
useEffect(() => {
  let rafId: number;
  const onScroll = () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => setScrolled(window.scrollY > 8));
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", onScroll);
    cancelAnimationFrame(rafId);
  };
}, []);
```

### 2.3 `FAQItem` dans `FinalCTA.tsx` — fonction locale non exportée

**Sévérité : P2**

`FinalCTA.tsx:100-112` définit `FAQItem` comme fonction locale non-exportée. C'est une sous-composante du fichier, ce qui est acceptable. Mais TypeScript strict préfère un type explicite pour les props :

```tsx
// AVANT
function FAQItem({ q, a }: { q: string; a: string }) {

// APRÈS — aucun changement nécessaire, c'est déjà strict. OK.
```

---

## 3. TypeScript strict

### 3.1 Conformité globale : bonne

`tsconfig.json` a `"strict": true`. Aucun `any` détecté dans les fichiers actifs du projet.

### 3.2 Violations — exports default partout

**Sévérité : P1 (violation des préférences utilisateur globales)**

Les préférences globales stipulent **"named exports over default"**. Or, tous les composants utilisent `export default` :

```
Nav.tsx:14        export default function Nav()
Hero.tsx:8        export default function Hero()
ProofBand.tsx:12  export default function ProofBand()
...               (idem pour tous)
Footer.tsx:1      export default function Footer()
```

**Fix** : Convertir en named exports + barrel `index.ts` :

```tsx
// Hero.tsx
export function Hero() { ... }

// src/components/index.ts
export { Hero } from "./Hero";
export { Nav } from "./Nav";
// ...

// app/page.tsx
import { Nav, Hero, ProofBand, ... } from "@/components";
```

### 3.3 `Domaines.tsx:11` — type `span` trop restrictif avec string literal union

**Sévérité : P2**

```tsx
interface Domaine {
  span?: "md:col-span-2" | "md:col-span-1";
}
```

Ce type encode une classe Tailwind dans une interface de données — couplage fort design/données. Si la grille change (3 cols → 4 cols), le type se casse. Préférer :

```tsx
interface Domaine {
  wide?: boolean; // sémantique
}
// puis en JSX : wide ? "md:col-span-2" : ""
```

### 3.4 `UseCases.tsx` et `Pricing.tsx` — tokens CSS manquants

**Sévérité : P0**

Ces composants référencent des tokens CSS de l'ancienne version :
- `text-violet-light`, `bg-bg-card`, `bg-bg-raised`, `bg-violet`, `text-text-muted`, `text-text-dim`, `text-amber`
- `font-[var(--font-outfit)]` — `--font-outfit` n'existe pas dans `globals.css`

Ces composants ne sont **pas importés dans `page.tsx`** actuellement (ils n'apparaissent pas dans la landing), mais ils existent dans le repo et causeront des erreurs TypeScript/lint. Ce sont des fichiers zombies à supprimer ou migrer.

---

## 4. Tailwind v4

### 4.1 Usage correct du moteur v4

**Sévérité : OK**

`globals.css` utilise `@import "tailwindcss"` + `@theme inline { ... }` — syntaxe v4 correcte. Les tokens sont définis via CSS custom properties dans `@theme`, ce qui est le pattern recommandé pour v4.

### 4.2 Classes arbitraires omniprésentes

**Sévérité : P2**

Le codebase contient une densité très élevée de classes arbitraires dans les composants :

```tsx
// Realisations.tsx:91 — clamp en classe arbitraire
className="display text-[clamp(2.2rem,6vw,4.75rem)]"

// Realisations.tsx:123 — taille pixel hardcodée
className="font-mono text-[11px] uppercase tracking-[0.12em]"

// Nav.tsx:31 — box-shadow hardcodé en classe
className="shadow-[0_1px_3px_rgba(33,20,6,0.05),0_12px_32px_-8px_rgba(33,20,6,0.12)]"
```

La fréquence élevée de `text-[Xpx]` (au moins 30+ occurrences) indique que le système de type n'est pas exposé comme échelle Tailwind. En v4, les tokens `@theme` peuvent définir des steps typographiques :

```css
@theme inline {
  --text-xs: 10.5px;
  --text-sm: 13px;
  --text-base: 15px;
  --text-lg: 17px;
  /* ... */
}
```

Ce qui permettrait d'écrire `text-xs` au lieu de `text-[10.5px]` partout.

### 4.3 Padding horizontal incohérent

**Sévérité : P2**

`globals.css:436` définit un padding inline global sur les `section` :
```css
section {
  padding-inline: clamp(1.25rem, 4vw, 3.5rem);
}
```

Mais certains composants ajoutent un `px-1` ou `px-2` supplémentaire sur le conteneur interne (`Hero.tsx:20` : `px-1`), ou des `px-6` dans `UseCases.tsx:24`. Cela crée des inconsistances d'alignement horizontal.

---

## 5. Motion / Framer

### 5.1 Propriétés GPU-accelerated : OK

Toutes les animations utilisent exclusivement `opacity`, `transform` (y, x, scale, scaleX). Aucun `width`, `height`, `top`, `left` animé. Pas de layout thrash détecté.

### 5.2 `prefers-reduced-motion` : partiellement couvert

**Sévérité : P1**

`globals.css:519-527` couvre les animations CSS (`live-dot`, `marquee`, transitions) avec `@media (prefers-reduced-motion: reduce)`. Mais les animations `motion` JavaScript dans les composants ne sont **pas** conditionnées par ce media query.

```tsx
// Hero.tsx:46-69 — animation non conditionnée
<motion.h1
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.05, ... }}
>
```

motion v12 fournit `useReducedMotion()` pour ça :

```tsx
// Solution recommandée — un hook partagé
// src/hooks/useMotionProps.ts
"use client";
import { useReducedMotion } from "motion/react";

export function useFadeUp(delay = 0) {
  const reduce = useReducedMotion();
  return {
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] },
  };
}
```

Ou plus simplement, motion respecte automatiquement `prefers-reduced-motion` si on passe `useReducedMotion` et conditionne `initial`. La couverture CSS seule est **insuffisante** pour les animations JS.

### 5.3 `whileInView` avec `once: true` — bon pattern

La quasi-totalité des animations `whileInView` utilisent `viewport={{ once: true }}`, ce qui est correct (pas de re-déclenchement au scroll up).

### 5.4 `will-change: transform` sur `.marquee-track`

**Sévérité : P2**

`globals.css:421` : `will-change: transform` est déclaré de manière permanente sur `.marquee-track`. C'est correct pour une animation continue, mais peut créer une couche composite persistante en mémoire GPU même quand hors viewport. Acceptable ici vu la simplicité du composant.

---

## 6. Architecture composants

### 6.1 Découpage cohérent, pas de prop drilling

L'architecture est saine pour une landing page : un composant par section, tous assemblés dans `page.tsx`. Pas de prop drilling. Les données sont co-localisées (constantes en haut de chaque fichier). C'est le bon pattern pour ce contexte.

### 6.2 `CALENDLY_URL` dupliquée dans 3 fichiers

**Sévérité : P1 — DRY violation**

```
Nav.tsx:5       const CALENDLY_URL = "https://calendly.com/..."
Hero.tsx:4      const CALENDLY_URL = "https://calendly.com/..."
FinalCTA.tsx:3  const CALENDLY_URL = "https://calendly.com/..."
Footer.tsx:64   href="https://calendly.com/..." (hardcodé direct)
```

4 occurrences de la même URL. Si l'URL Calendly change (re-booking, nouveau lien), c'est une mise à jour manuelle risquée.

**Fix** :
```ts
// src/lib/constants.ts
export const CALENDLY_URL =
  "https://calendly.com/corenchristmann/appel-decouverte-forgn-30-min";
```

### 6.3 `ScrollReveal.tsx` — dead code

**Sévérité : P2**

`ScrollReveal.tsx` est un composant entier qui reproduit manuellement (via `IntersectionObserver` + classes CSS `reveal`/`visible`) ce que motion fait de manière déclarative dans tous les autres composants. Il n'est **jamais importé** dans `page.tsx` ni dans aucun autre composant actif.

La classe `.reveal` n'existe même pas dans `globals.css`. Ce fichier est un résidu de la version précédente.

**Fix** : Supprimer `src/components/ScrollReveal.tsx`.

### 6.4 Duplication des patterns de layout header de section

**Sévérité : P2**

`Realisations.tsx:82-105`, `Method.tsx:60-83`, `Domaines.tsx:67-89` utilisent un pattern quasi-identique :

```tsx
<motion.div
  initial={{ opacity: 0, y: 14 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
  className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end mb-16"
>
  <div className="md:col-span-7">
    <div className="eyebrow mb-6">{eyebrow}</div>
    <h2 className="display text-[clamp(2.2rem,6vw,4.75rem)] ...">
```

Ce pattern se répète 3 fois quasi à l'identique. Un composant `<SectionHeader>` réduirait la surface de duplication.

```tsx
// src/components/SectionHeader.tsx
interface SectionHeaderProps {
  eyebrow: string;
  heading: React.ReactNode;
  description?: string;
  colSpanHeading?: number; // défaut 7
}

export function SectionHeader({ eyebrow, heading, description, colSpanHeading = 7 }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end mb-16"
    >
      <div className={`md:col-span-${colSpanHeading}`}>
        <div className="eyebrow mb-6">{eyebrow}</div>
        <h2 className="display text-[clamp(2.2rem,6vw,4.75rem)] text-[color:var(--color-foreground)]">
          {heading}
        </h2>
      </div>
      {description && (
        <div className={`md:col-span-${12 - colSpanHeading}`}>
          <p className="text-[17px] leading-relaxed text-[color:var(--color-muted-foreground)] max-w-[42ch]">
            {description}
          </p>
        </div>
      )}
    </motion.div>
  );
}
```

---

## 7. State management

### 7.1 State local bien placé

`useState` n'est utilisé que dans `Nav.tsx` (`scrolled`, `open`) — les deux seuls états vraiment interactifs de la page. C'est correct. Aucun context ou store global n'est nécessaire pour une landing statique.

### 7.2 Mobile menu : pas de focus trap

**Sévérité : P1 (accessibilité)**

`Nav.tsx:117-148` : le menu mobile s'affiche avec `{open && (...)}` mais :
- Pas de gestion de la touche `Escape` pour fermer
- Pas de `aria-controls` reliant le bouton au menu
- Pas de focus automatique sur le premier lien à l'ouverture

```tsx
// Fix Escape key — à ajouter dans le useEffect existant
useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  };
  if (open) {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }
}, [open]);
```

---

## 8. Accessibilité technique

### 8.1 Hiérarchie des titres : correcte

- `h1` : Hero ("Les applications que vos événements méritent.") — unique, correct
- `h2` : Realisations, Method, Domaines, FinalCTA — sections principales
- `h3` : cards individuelles dans chaque section

La hiérarchie h1→h2→h3 est respectée. Pas de saut de niveau.

### 8.2 `<nav>` sans `aria-label`

**Sévérité : P1**

`Nav.tsx:28` : l'élément `<nav>` n'a pas d'`aria-label`. Si un second `<nav>` apparaît (ex: footer), les screen readers ne pourront pas les distinguer.

```tsx
// AVANT
<nav className={`flex items-center ...`}>

// APRÈS
<nav aria-label="Navigation principale" className={`flex items-center ...`}>
```

### 8.3 Liens de navigation — texte suffisant

`Nav.tsx:58-64` : les liens "Réalisations", "Méthode", "Domaines" ont un texte visible clair. OK.

`Nav.tsx:77-91` : CTA "Prendre contact" avec `target="_blank"` — manque `aria-label` indiquant l'ouverture dans un nouvel onglet pour les screen readers :

```tsx
aria-label="Prendre contact (ouvre Calendly dans un nouvel onglet)"
```

### 8.4 Flèches `→` et `↓` comme span `aria-hidden`

Bien géré : toutes les flèches décoratives ont `aria-hidden`. Pattern correct.

### 8.5 `<main>` présent dans `page.tsx`

`page.tsx:13` : `<main>` est bien présent. Le `<header>` est dans `Nav.tsx`, le `<footer>` dans `Footer.tsx`. Structure sémantique correcte.

### 8.6 `Realisations.tsx:116` — `aria-hidden` manquant sur l'overlay grain

```tsx
// AVANT — manque aria-hidden
<div className="absolute inset-0 bg-grain pointer-events-none opacity-50" />

// APRÈS
<div className="absolute inset-0 bg-grain pointer-events-none opacity-50" aria-hidden />
```

*(Note : certaines occurrences l'ont, d'autres non — incohérence.)*

### 8.7 `Domaines.tsx` — liens `<motion.a href="#contact">` sans texte accessible suffisant

**Sévérité : P1**

`Domaines.tsx:94-174` : chaque carte de domaine est un `<motion.a href="#contact">`. Le texte accessible calculé par le screen reader sera le contenu complet de la carte (titre + résumé + "Discuter de ce terrain" + "→"). C'est redondant. Il faudrait au minimum un `aria-label` précisant la destination :

```tsx
<motion.a
  href="#contact"
  aria-label={`Discuter du domaine "${d.title}" — nous contacter`}
  ...
>
```

### 8.8 Focus ring défini mais border-radius fixe

`globals.css:512-516` :
```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 4px;
}
```

Le `border-radius: 4px` est correct pour les éléments rectangulaires, mais sur les boutons pill (`border-radius: 999px`), le focus ring sera carré au lieu de suivre la forme. Préférer `border-radius: inherit` ou `border-radius: 999px` pour les éléments pill :

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  /* Laisser le border-radius suivre l'élément */
}
```

---

## 9. Performance code

### 9.1 `layout.tsx` — 3 polices Google Fonts chargées

**Sévérité : P2**

`layout.tsx:3-20` charge Fraunces (avec axes de variation), Inter, et JetBrains Mono. Fraunces est une variable font avec 3 axes (`SOFT`, `WONK`, `opsz`). Chaque police est une requête réseau distincte (même si optimisée par `next/font`).

JetBrains Mono n'est utilisée que pour les micro-labels monospacés (ex: `"50°38′N"`, timestamps). Si ces textes peuvent accepter la police système (`ui-monospace`), supprimer JetBrains Mono économise une requête réseau et ~30kb.

### 9.2 `bg-grain` — SVG inline en `background-image`

**Sévérité : P2 (acceptable)**

`globals.css:181` : le grain est un SVG inline encodé en data URI dans `background-image`. Taille : ~400 bytes. C'est un pattern acceptable et il évite une requête réseau. Aucun problème.

### 9.3 Pas de `loading.tsx` ni `error.tsx`

**Sévérité : P2**

Pour une landing full-static sans data-fetching, l'absence de `loading.tsx` et `error.tsx` est acceptable. En revanche, si `cacheComponents` est activé et qu'une erreur de streaming survient, il n'y a pas de fallback UI.

### 9.4 Pas d'image `<next/image>` utilisée

**Sévérité : P2**

Aucune image réelle dans la landing (tout est CSS/texte). Pas de problème actuellement. Si des screenshots ou photos sont ajoutés, il faudra utiliser `<Image>` de `next/image`.

### 9.5 `ProofBand.tsx` — duplication array pour le marquee

`ProofBand.tsx:14` :
```tsx
const track = [...SHIPPED, ...SHIPPED];
```

C'est le pattern standard pour les marquees infinis sans JS. Mais avec CSS seul et `translateX(-50%)`, un seul set suffiu si la largeur du conteneur est connue. Ce n'est pas un bug — le pattern est valide.

---

## 10. Configuration

### 10.1 `tsconfig.json` — target ES2017

**Sévérité : P2**

`tsconfig.json:4` : `"target": "ES2017"` est conservateur. Next.js 16 + React 19 ciblent des navigateurs modernes. ES2022 permettrait `Object.hasOwn()`, `Array.at()`, nullish coalescing assignment sans polyfills supplémentaires.

```json
"target": "ES2022"
```

### 10.2 `tsconfig.json` — options strict manquantes

**Sévérité : P1**

`"strict": true` est activé, mais les options individuelles suivantes ne sont pas explicitement déclarées (elles sont implicites dans `strict`, mais les rendre explicites force leur maintien si `strict` est un jour désactivé) :

Les préférences utilisateur mentionnent "TypeScript strict, jamais `any`". Les flags suivants renforcent cette garantie :

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

`noUncheckedIndexedAccess` est particulièrement utile — elle forcerait un `SHIPPED[0]?.event` au lieu de `SHIPPED[0].event`.

### 10.3 `eslint.config.mjs` — pas de règles custom

**Sévérité : P2**

La config ESLint est minimale : `nextVitals` + `nextTs`. Aucune règle custom pour enforcer les préférences du projet. Recommandé d'ajouter :

```js
// Dans defineConfig([...nextVitals, ...nextTs, {
rules: {
  "no-restricted-syntax": [
    "error",
    {
      "selector": "ExportDefaultDeclaration",
      "message": "Prefer named exports over default exports"
    }
  ],
  "@typescript-eslint/no-explicit-any": "error",
  "no-console": ["warn", { allow: ["warn", "error"] }],
}
```

### 10.4 `package.json` — `geist` installé mais non utilisé

**Sévérité : P2**

`package.json:12` : `"geist": "^1.7.0"` est listé en dépendance. Mais `layout.tsx` importe `Fraunces`, `Inter`, `JetBrains_Mono` depuis `next/font/google` — pas depuis `geist`. Le package Geist est un résidu de l'ancienne version SaaS (MEMORY confirme "Geist Sans (body)").

```bash
npm uninstall geist
```

---

## Bugs / Anti-patterns détectés — récapitulatif avec file:line

| Priorité | Fichier | Ligne | Problème | Fix |
|----------|---------|-------|----------|-----|
| **P0** | `opengraph-image.tsx` | 4-79 | Identité visuelle SaaS périmée (violet, "systèmes automatisés") | Réécrire avec tokens ember |
| **P0** | `UseCases.tsx`, `Pricing.tsx` | tout | Composants zombies avec tokens CSS manquants | Supprimer ou migrer |
| **P1** | `Hero.tsx` | 1 | `'use client'` inutile | Supprimer |
| **P1** | `Realisations.tsx` | 1 | `'use client'` inutile | Supprimer |
| **P1** | `Method.tsx` | 1 | `'use client'` inutile | Supprimer |
| **P1** | `Domaines.tsx` | 1 | `'use client'` inutile | Supprimer |
| **P1** | `FinalCTA.tsx` | 1 | `'use client'` inutile | Supprimer |
| **P1** | `ProofBand.tsx` | 1 | `'use client'` inutile | Supprimer |
| **P1** | Tous composants | 1 | `export default` — viole préférence named exports | Migrer vers named exports |
| **P1** | `Nav.tsx`, `Hero.tsx`, `FinalCTA.tsx` | 5, 4, 3 | `CALENDLY_URL` dupliquée 4 fois | Extraire dans `src/lib/constants.ts` |
| **P1** | Composants motion | multiple | `prefers-reduced-motion` non respecté pour animations JS | Utiliser `useReducedMotion()` |
| **P1** | `Nav.tsx` | 28 | `<nav>` sans `aria-label` | Ajouter `aria-label="Navigation principale"` |
| **P1** | `Nav.tsx` | 94-112 | Bouton mobile sans `aria-controls`, pas de fermeture Escape | Ajouter Escape handler + aria-controls |
| **P1** | `Nav.tsx` | 18-23 | Scroll listener non-throttlé | Wrapper dans `requestAnimationFrame` |
| **P1** | `Domaines.tsx` | 94 | Liens carte sans `aria-label` précis | Ajouter aria-label par domaine |
| **P2** | `ScrollReveal.tsx` | tout | Dead code, jamais importé, classe `.reveal` inexistante | Supprimer |
| **P2** | `package.json` | 12 | `geist` installé mais inutilisé | `npm uninstall geist` |
| **P2** | `next.config.ts` | tout | Config vide | Ajouter `cacheComponents: true`, `images` |
| **P2** | `tsconfig.json` | 4 | `target: ES2017` trop conservateur | Passer à `ES2022` |
| **P2** | `tsconfig.json` | — | `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` absents | Ajouter |
| **P2** | `Realisations.tsx`, `Method.tsx`, `Domaines.tsx` | multiple | Pattern SectionHeader dupliqué 3× | Extraire `<SectionHeader>` |
| **P2** | `Domaines.tsx` | 11 | Type `span` encode une classe Tailwind | Remplacer par `wide?: boolean` |
| **P2** | Multiple | multiple | Trop de classes `text-[Xpx]` arbitraires | Définir steps typographiques dans `@theme` |
| **P2** | `globals.css` | 512 | Focus ring `border-radius: 4px` ne suit pas les éléments pill | Supprimer ou mettre `inherit` |
| **P2** | `Nav.tsx` | 77 | CTA `target="_blank"` sans `aria-label` d'ouverture onglet | Ajouter mention screen reader |

---

## Priorités d'action recommandées

### P0 — À corriger avant tout partage/démo (identité cassée)
1. Réécrire `opengraph-image.tsx` avec la nouvelle identité Forgn (ember, cream)
2. Supprimer `UseCases.tsx` et `Pricing.tsx` (ou les isoler dans un dossier `_archive/`)

### P1 — Sprint qualité (1-2h)
3. Supprimer `'use client'` de 6 composants (Hero, Realisations, Method, Domaines, FinalCTA, ProofBand)
4. Créer `src/lib/constants.ts` et centraliser `CALENDLY_URL`
5. Ajouter `useReducedMotion()` dans les composants avec animations motion
6. Corriger les lacunes accessibilité : `aria-label` sur `<nav>`, Escape sur menu mobile, aria-label des cartes Domaines
7. Migrer vers named exports (ou configurer la règle ESLint pour l'enforcer)

### P2 — Hygiène technique (1h)
8. Supprimer `ScrollReveal.tsx` et `geist` du `package.json`
9. Mettre à jour `tsconfig.json` (target ES2022, `noUncheckedIndexedAccess`)
10. Remplir `next.config.ts` (`cacheComponents: true`)
11. Extraire `<SectionHeader>` pour DRY
12. Ajouter les steps typographiques dans `@theme inline` pour remplacer les `text-[Xpx]`
