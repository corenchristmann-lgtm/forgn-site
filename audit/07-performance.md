# Performance Audit — Forgn Landing

**Date :** 2026-04-18
**Stack :** Next.js 16.2.2 · React 19 · Tailwind v4 · motion v12
**ICP cible :** directeurs comms LinkedIn mobile (3G/4G)
**Méthode :** analyse statique du code source + chunks de build (Turbopack dev build existant)

---

## 1. Estimations Core Web Vitals (mobile 3G/4G)

| Métrique | Estimation actuelle | Cible Good | Ecart |
|---|---|---|---|
| **LCP** | ~2.8 – 3.5s | < 2.5s | -0.3 à -1.0s |
| **CLS** | ~0.05 – 0.08 | < 0.1 | OK mais fragile |
| **INP** | ~80 – 140ms | < 200ms | OK |
| **FCP** | ~1.8 – 2.4s | < 1.8s | limite |
| **TTI** | ~3.5 – 4.5s | — | préoccupant |

LCP probable : le `<h1>` de Hero (`"Les applications que vos événements méritent."`) en Fraunces display, car aucune image hero n'est présente. Le texte ne peut painter qu'après que la police Fraunces soit chargée. C'est le goulot principal.

---

## 2. Goulots identifiés

### P0 — Critique (bloque LCP ou TTI)

---

#### G1 — Toute la page est Client Components : zéro RSC
**Impact : LCP +0.5–1.2s, TTI +0.8–1.5s**

`src/app/page.tsx` importe 7 composants, tous marqués `"use client"` :
- `src/components/Hero.tsx:1`
- `src/components/Nav.tsx:1`
- `src/components/ProofBand.tsx:1`
- `src/components/Realisations.tsx:1`
- `src/components/Method.tsx:1`
- `src/components/Domaines.tsx:1`
- `src/components/FinalCTA.tsx:1`
- `src/components/Footer.tsx` — pas de `"use client"` mais pas de Server Component explicite

La page entière s'hydrate côté client. Le HTML initial arrive du serveur mais React doit re-hydrater tout l'arbre avant que la page soit interactive. Avec motion chargé 5 fois, le bundle JS explose.

**Fix :** seuls Nav (scroll listener), ProofBand (marquee animation CSS), ScrollReveal et les composants avec `animate={}` au mount ont réellement besoin de `"use client"`. Hero, Method, Domaines, FinalCTA, Footer peuvent être Server Components si on extrait les parties `motion` animées en sous-composants clients.

---

#### G2 — Fraunces variable font chargé avec 3 axes custom
**Impact : LCP +200–500ms sur 3G**

`src/app/layout.tsx:5-10`
```ts
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});
```

Le paramètre `axes` déclenche le téléchargement de la version variable complète de Fraunces. La police variable Fraunces avec ces 3 axes pèse ~180–220 KB (woff2 non subsettée pour latin). Le LCP `<h1>` ne peut pas painter avant que cette police soit disponible malgré `display: "swap"` — le swap cause un flash de fallback puis un repaint.

Aggravant : aucun `weight` n'est spécifié, donc next/font inclut tous les poids disponibles dans le subset.

**Fix P0 :** spécifier un `weight` précis (ex. `weight: ["400", "500"]`) ET réduire les axes à ceux réellement utilisés dans le CSS.

Dans `globals.css:103`, on utilise `font-variation-settings: "SOFT" 30, "WONK" 0` — ces deux axes suffisent. `opsz` (optical sizing) est rarement perceptible sur landing.

---

#### G3 — motion importé dans 5 composants, tous dans le bundle initial
**Impact : +45–65 KB gzip sur le bundle initial**

Imports relevés :
- `src/components/Hero.tsx:3` — motion utilisé pour 6 `animate={}` au mount (above the fold)
- `src/components/Realisations.tsx:3` — `whileInView` uniquement
- `src/components/Method.tsx:3` — `whileInView` uniquement
- `src/components/Domaines.tsx:3` — `whileInView` uniquement
- `src/components/FinalCTA.tsx:3` — `whileInView` uniquement

Le chunk motion identifié dans le build : `0m312g0ehrrnu.js` (153 KB raw, ~50–60 KB gzip).

motion v12 est correctement tree-shakable via `motion/react`, mais l'import du module entier pour 4 composants `whileInView` est surdimensionné. Les composants below-the-fold (Realisations, Method, Domaines, FinalCTA) pourraient utiliser `IntersectionObserver` + CSS transitions (comme ScrollReveal.tsx le fait déjà) ou être chargés en `next/dynamic`.

**Fix :** pour les 4 composants `whileInView` below-fold, remplacer motion par ScrollReveal.tsx (déjà présent) + CSS. Garder motion uniquement dans Hero pour les animations au mount qui justifient la librairie.

---

### P1 — Significatif (dégrade l'expérience)

---

#### G4 — Inter chargé sans weight = variable font complète
**Impact : +80–120 KB**

`src/app/layout.tsx:12-16`
```ts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
```

Aucun `weight` spécifié. next/font charge Inter Variable (toute la gamme 100–900) au lieu de subsets statiques. Pour un body text qui utilise principalement 400 et 500, ça représente ~80 KB inutiles.

**Fix :** `weight: ["400", "500"]` — réduit à ~25–35 KB.

---

#### G5 — `geist` package en dépendance, non utilisé
**Impact : +~5 KB bundle inutile**

`package.json:12` : `"geist": "^1.7.0"` installé mais aucun import dans `src/` (vérifié par grep complet). La mémoire CLAUDE.md référençait l'ancienne stack SaaS qui utilisait Geist. Le package est chargé par npm mais ne devrait pas affecter le bundle Next.js si non importé — toutefois c'est du poids à supprimer.

**Fix :** `npm uninstall geist`

---

#### G6 — Underline animation on Hero h1 bloque potentiellement le LCP paint
**Impact : LCP dégradé sur mobile faible puissance**

`src/components/Hero.tsx:61-67`
```tsx
<motion.span
  aria-hidden
  initial={{ scaleX: 0 }}
  animate={{ scaleX: 1 }}
  transition={{ duration: 0.9, delay: 0.8, ease: [0.77, 0, 0.175, 1] }}
  className="absolute -bottom-2 left-0 h-[6px] w-full bg-[color:var(--color-accent)] origin-left rounded-full"
/>
```

Cet élément est un enfant direct du `<h1>` LCP. motion anime `scaleX` via `transform`, ce qui est GPU-accelerated et ne devrait pas causer de layout thrash. Toutefois l'élément `motion.span` ajoute un wrapper JS-controlled dans l'arbre du LCP candidate — sur mobile faible, la présence de JS animation sur le LCP element peut retarder le paint du navigateur.

**Fix :** remplacer par une animation CSS pure avec `@keyframes scaleX-in` et `animation-delay: 0.8s`. Conserve l'effet, supprime la dépendance motion sur cet élément critique.

---

#### G7 — `opengraph-image.tsx` metadata stale (ancienne brand)
**Impact : cohérence brand, pas perf directe**

`src/app/opengraph-image.tsx` : texte "Des systèmes qui travaillent pendant que vous dormez" et "Automatisation sur mesure pour agences marketing" — ancienne positioning SaaS. Les métadonnées `layout.tsx:26-35` sont à jour (agence événementielle) mais l'OG image générée diverge. Impact indirect sur CTR LinkedIn → taux de conversion.

---

#### G8 — Nav scroll listener sans throttle
**Impact : INP dégradé sur scroll rapide**

`src/components/Nav.tsx:18-23`
```ts
const onScroll = () => setScrolled(window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
```

`{ passive: true }` est correct (pas de `preventDefault` possible, pas de jank scroll). Mais `setScrolled` appelle un re-render de Nav à chaque frame de scroll tant que `scrollY` fluctue autour de 8. Un `requestAnimationFrame` throttle ou une comparaison avec valeur précédente serait plus propre.

En pratique sur la landing (une seule breakpoint scroll state), l'impact INP est faible (~5–15ms). Pas critique mais noté.

---

### P2 — Optimisations de confort

---

#### G9 — CLS potentiel : fonts swap + massive footer wordmark
**Impact : CLS 0.05–0.12**

- `display: "swap"` sur Fraunces et Inter : lors du swap, le `<h1>` (Fraunces) repaint avec une police fallback très différente métriquement (Georgia vs Fraunces). Pas de `size-adjust` ni `ascent-override` défini → CLS probable sur les titres display.
- `src/components/Footer.tsx:94` : `text-[clamp(4rem,22vw,20rem)]` wordmark décoratif `aria-hidden` — rendu en Fraunces, cause un repaint potentiellement visible si font swap tardif.

**Fix :** ajouter `size-adjust`, `ascent-override`, `descent-override` à la `@font-face` fallback. next/font expose ces propriétés via l'objet retourné (`fraunces.style.fontFamily` etc.) mais ne génère pas automatiquement les overrides. Alternative : utiliser `adjustFontFallback: false` et gérer manuellement.

---

#### G10 — Marquee ProofBand : `will-change: transform` sans cleanup
**Impact : mémoire GPU gaspillée**

`src/app/globals.css:421`
```css
.marquee-track {
  will-change: transform;
}
```

`will-change: transform` est appliqué en permanence sur `.marquee-track`, ce qui force une couche GPU dédiée en continu même quand l'élément n'est pas visible (scroll away). Sur mobile avec GPU mémoire limité, ça peut impacter d'autres animations.

**Fix :** appliquer `will-change` uniquement via JS quand la section est dans le viewport, ou le supprimer (l'animation CSS `transform` crée déjà une couche composite implicitement).

---

#### G11 — `scroll-behavior: smooth` sur `html` globalement
**Impact : INP +10–30ms sur anchor clicks**

`src/app/globals.css:75`
```css
html {
  scroll-behavior: smooth;
}
```

Sur iOS Safari (notamment versions < 16), le smooth scroll CSS peut interférer avec les animations motion `whileInView` et causer des décalages de déclenchement. Sur 3G, le rendu est plus lent et le timing des IntersectionObserver peut être incorrect pendant un smooth scroll.

**Fix :** remplacer par JS scroll avec `window.scrollTo({ behavior: 'smooth' })` uniquement sur les anchor links, ou conserver mais tester sur iPhone 12 Safari.

---

#### G12 — Composants orphelins dans le bundle
**Impact : dead code potentiel**

`src/components/Problem.tsx`, `src/components/UseCases.tsx`, `src/components/Pricing.tsx` sont présents dans `src/components/` mais **non importés** dans `src/app/page.tsx` (vérifié). Ces fichiers appartiennent à l'ancienne stack SaaS. Ils ne contribuent pas au bundle Next.js si non importés — mais leur présence crée une confusion et un risque d'import accidentel futur.

**Fix :** supprimer ou déplacer dans `src/_archive/`.

---

#### G13 — next.config.ts vide : aucune optimisation activée
**Impact : headers cache manquants, compression non configurée explicitement**

`next.config.ts:3` : config entièrement vide. Opportunités manquées :
- Pas de `headers()` pour `Cache-Control: public, max-age=31536000, immutable` sur les chunks statiques (Next.js Vercel le fait automatiquement, mais auto-hébergé non)
- Pas de `compress: true` explicite (activé par défaut en prod Next.js — OK)
- Pas de `images.formats: ['image/avif', 'image/webp']` (pas d'images actuellement, mais à prévoir)
- Pas de `poweredByHeader: false` (header X-Powered-By: Next.js exposé inutilement)

---

## 3. Budget performance recommandé

| Ressource | Actuel (estimé) | Budget cible |
|---|---|---|
| JS total initial (gzip) | ~180–220 KB | < 120 KB |
| JS motion (gzip) | ~50–65 KB | < 20 KB (Hero seul) |
| CSS (gzip) | ~15 KB | < 20 KB (OK) |
| Fraunces woff2 | ~180–220 KB | < 80 KB |
| Inter woff2 | ~90–120 KB | < 40 KB |
| JetBrains Mono woff2 | ~40–60 KB | < 30 KB |
| **Total page weight** | ~550–650 KB | **< 300 KB** |
| **LCP** | ~2.8–3.5s | **< 2.5s** |
| **CLS** | ~0.05–0.08 | **< 0.05** |
| **INP** | ~80–140ms | **< 200ms (OK)** |

---

## 4. Plan d'action priorisé

### P0 — Quick wins, semaine 1 (impact LCP direct)

**QW1 — Restreindre les poids de police (1h)**
`src/app/layout.tsx`
- Fraunces : ajouter `weight: ["300", "400", "500"]` — élimine ~120 KB de police variable
- Inter : ajouter `weight: ["400", "500"]` — élimine ~80 KB
- JetBrains Mono : ajouter `weight: ["400", "500"]` — élimine ~30 KB
- Supprimer l'axe `opsz` de Fraunces (non utilisé dans le CSS) : `axes: ["SOFT", "WONK"]`

**QW2 — Passer motion whileInView en CSS/ScrollReveal (2–3h)**
Remplacer les imports motion dans `Realisations.tsx`, `Method.tsx`, `Domaines.tsx`, `FinalCTA.tsx` par `ScrollReveal.tsx` (déjà implémenté). Les animations `whileInView` de ces composants sont toutes du même pattern `opacity: 0 → 1, y: 14→0` avec des délais staggerés — parfaitement réplicable en CSS `@keyframes reveal` + `animation-delay`.

Réduction estimée : -35 à -45 KB gzip sur le bundle initial.

**QW3 — Underline Hero en CSS pure (30min)**
`src/components/Hero.tsx:61-67` : remplacer `motion.span` par un `<span>` avec classe CSS `animate-underline` définie dans globals.css avec `@keyframes`. Libère le LCP element de la dépendance JS motion.

### P1 — Structurel, semaine 2

**ST1 — Convertir les composants statiques en RSC (4–6h)**
Footer, les sections de contenu pur (Method steps, Domaines grid, Realisations cards) n'ont pas d'état client. Extraire les éléments `motion.` en sous-composants `*Animated.tsx` (`"use client"`) et garder le conteneur en RSC. Réduction du HTML hydraté et du JS d'hydratation.

Fichiers concernés :
- `src/components/Method.tsx` : wrapper RSC + `MethodStepAnimated.tsx` (client)
- `src/components/Domaines.tsx` : wrapper RSC + `DomaineCardAnimated.tsx` (client)
- `src/components/Footer.tsx` : RSC pur (aucun état)

**ST2 — next/dynamic pour les sections below-fold (2h)**
```ts
// src/app/page.tsx
import dynamic from 'next/dynamic'
const Realisations = dynamic(() => import('@/components/Realisations'))
const Method = dynamic(() => import('@/components/Method'))
const Domaines = dynamic(() => import('@/components/Domaines'))
```
Réduit le bundle initial. Les sections ne sont visibles qu'après scroll — le chargement différé n'affecte pas le LCP.

**ST3 — Font fallback CLS fix (1h)**
Ajouter dans globals.css une `@font-face` fallback avec `size-adjust`, `ascent-override`, `descent-override` calculés pour approcher Fraunces métriquement (Georgia comme base : `size-adjust: 105%`, `ascent-override: 88%`). Tester visuellement le swap avant/après.

### P2 — Finitions, semaine 3

**FN1 — Supprimer composants orphelins**
`rm src/components/Problem.tsx src/components/UseCases.tsx src/components/Pricing.tsx`
`npm uninstall geist`

**FN2 — next.config.ts : headers + image config**
```ts
const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}
```

**FN3 — will-change cleanup sur marquee**
`src/app/globals.css:421` : supprimer `will-change: transform` de `.marquee-track`. L'animation CSS `transform` crée déjà une couche composite. Tester que le marquee reste fluide.

**FN4 — Mettre à jour opengraph-image.tsx**
`src/app/opengraph-image.tsx` : aligner sur le nouveau positionnement agence événementielle + couleurs ember (`#d65d2e`, fond `#faf8f4`).

**FN5 — Nav scroll throttle**
```ts
// src/components/Nav.tsx
useEffect(() => {
  let ticking = false
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8)
        ticking = false
      })
      ticking = true
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true })
  return () => window.removeEventListener("scroll", onScroll)
}, [])
```

---

## 5. Script Lighthouse CI

Ajouter dans `package.json` :

```json
"scripts": {
  "perf:lighthouse": "npx lighthouse http://localhost:3000 --output=json --output-path=./audit/lighthouse-report.json --chrome-flags='--headless' --only-categories=performance",
  "perf:lhci": "npx lhci autorun"
}
```

Créer `.lighthouserc.json` à la racine :

```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000"],
      "startServerCommand": "npm run start",
      "numberOfRuns": 3,
      "settings": {
        "throttling": {
          "rttMs": 150,
          "throughputKbps": 1638,
          "cpuSlowdownMultiplier": 4
        },
        "formFactor": "mobile",
        "screenEmulation": {
          "mobile": true,
          "width": 390,
          "height": 844,
          "deviceScaleFactor": 3
        }
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.85 }],
        "first-contentful-paint": ["warn", { "maxNumericValue": 1800 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["warn", { "maxNumericValue": 300 }],
        "interactive": ["warn", { "maxNumericValue": 4000 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

Pour intégration GitHub Actions (`.github/workflows/perf.yml`) :

```yaml
name: Performance CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: NODE_OPTIONS="--max-old-space-size=4096" npm run build
      - run: npm run start &
      - run: npx wait-on http://localhost:3000
      - run: npx lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

Pour mesure des Core Web Vitals réels (RUM), ajouter dans `src/app/layout.tsx` après les quick wins :

```ts
// src/app/_vitals.tsx — "use client"
import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Envoyer vers Plausible, Vercel Analytics, ou console en dev
    if (process.env.NODE_ENV === 'development') {
      console.log(metric)
    }
  })
  return null
}
```

---

## 6. Résumé des priorités

| ID | Problème | Fichier:ligne | Impact estimé | Effort | Priorité |
|---|---|---|---|---|---|
| G1 | Tous composants en `"use client"` | `src/components/*.tsx:1` | LCP -0.5–1.2s, TTI -0.8s | 4–6h | P0 |
| G2 | Fraunces avec 3 axes, sans weight | `layout.tsx:5-10` | LCP -200–500ms, -120KB fonts | 30min | P0 |
| G3 | motion dans 5 composants dont 4 below-fold | `Realisations/Method/Domaines/FinalCTA.tsx:3` | -35–45KB JS | 2–3h | P0 |
| G4 | Inter sans weight = variable font complète | `layout.tsx:12-16` | -80KB fonts | 5min | P1 |
| G5 | Package geist non utilisé | `package.json:12` | cleanup | 5min | P2 |
| G6 | motion.span dans LCP element h1 | `Hero.tsx:61-67` | LCP paint | 30min | P1 |
| G7 | OG image stale (ancienne brand) | `opengraph-image.tsx` | CTR LinkedIn | 30min | P2 |
| G8 | Nav scroll sans throttle RAF | `Nav.tsx:18-23` | INP mineur | 20min | P2 |
| G9 | Font swap CLS sans size-adjust | `layout.tsx + globals.css` | CLS -0.03–0.07 | 1h | P1 |
| G10 | will-change permanent sur marquee | `globals.css:421` | mémoire GPU | 5min | P2 |
| G11 | scroll-behavior smooth global | `globals.css:75` | iOS compat | 30min | P2 |
| G12 | 3 composants orphelins en src/ | `Problem/UseCases/Pricing.tsx` | dead code | 5min | P2 |
| G13 | next.config.ts vide | `next.config.ts:3` | cache headers | 30min | P2 |

**Gain total estimé avec P0+P1 :**
- LCP : 2.8–3.5s → 1.8–2.2s (passage en zone "Good")
- JS initial : -100 à -120 KB gzip
- Fonts : -200 à -300 KB
- Page weight total : 550–650 KB → 280–320 KB
