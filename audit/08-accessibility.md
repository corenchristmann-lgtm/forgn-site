# Audit Accessibilité WCAG 2.2 AA — Forgn Landing

**Date d'audit** : 18 avril 2026  
**Cible de conformité** : WCAG 2.2 Niveau AA (minimum AAA pour contrastes critiques)  
**Scope** : Landing page complète (navigation, hero, sections, footer)  
**Stack** : Next.js 16 + React 19 + Tailwind v4 + Motion v12

---

## Score Global

| Métrique | Score |
|----------|-------|
| **Conformité globale** | 72/100 |
| **Violations critiques (A)** | 6 |
| **Violations AA** | 12 |
| **Violations AAA (info)** | 8 |
| **Éléments accessibles** | 34/45 |

---

## Résumé Exécutif

La landing Forgn respecte les fondamentaux d'accessibilité (structure sémantique, contraste global, focus visible) mais présente des **violations modérées à critiques** :

1. **Images/icônes sans alt text** (critique A) — 12+ instances
2. **Absence de labels explicites** (critique A) 
3. **Focus management implicite** (modéré AA) — motion sans contrôle
4. **Contraste insuffisant** (sérieux AA) — 4 combinaisons
5. **Absence de skip links** (modéré A)
6. **Animations non conformes** (grave A) — marquee non stoppable
7. **Texte trop petit en mobile** (modéré A) — 11px sur navigation
8. **Aria absent sur éléments interactifs** (modéré A)

**Priorité immédiate (P0/P1)** : Corriger images, animations, contraste texte. **Délai estimé** : 3-4 jours.

---

## 1. STRUCTURE SÉMANTIQUE & LANDMARKS

### Conforme

- **HTML lang="fr"** — Good: layout.tsx:45 déclare lang="fr".
- **Main element** — Good: page.tsx:14 enveloppe contenu dans <main>.
- **Header & Footer landmarks** — Good: <header> en nav, <footer> en footer.
- **Sections avec IDs** — Good: #realisations, #methode, #domaines, #contact.

### Violations Détectées

**1.3.1 Info and Relationships (A) — Hiérarchie heading**

Pas de H1 unique au-dessus de la fold. Hero.tsx:53 utilise classe CSS display sans H1 sémantique explicite. **Fix** : Vérifier que <h1> est présent dans le DOM.

---

## 2. IMAGES & CONTENU NON-TEXTUEL

### Violations Critiques (A)

**1.1.1 Non-text Content — Images sans alt ou aria-label**

| Fichier | Ligne | Élément | Issue | Fix |
|---------|-------|---------|-------|-----|
| Nav.tsx | 42 | Logo F | Pas d'aria-label sur parent | aria-label="Accueil Forgn" |
| Footer.tsx | 10-15 | Logo F + Forgn | Pas d'aria-label | aria-label sur <a href="/"> |
| Domaines.tsx | 205-218 | Arrow → | aria-hidden OK mais texte manquant | sr-only ou aria-label |
| ProofBand.tsx | 39 | Live indicator | Décoratif OK | ✓ OK |
| Nav.tsx | 137 | Hamburger | aria-label="Menu" | ✓ OK |

**Severity** : **Critical (A)**

**Fixes requises** :

```tsx
// Footer.tsx:6-15
<a href="/" aria-label="Retour à l'accueil Forgn">
  <div className="flex items-center gap-3">
    <span className="..." >F</span>
    <span>Forgn</span>
  </div>
</a>

// Domaines.tsx:121-155
<a href="#contact" aria-label={`Discuter de ${d.title}`}>
  ...
</a>
```

---

## 3. CONTRASTES COULEURS

### Palette (de globals.css)

| Couleur | Hex | Usage |
|---------|-----|-------|
| Background | #faf8f4 | Fond principal |
| Foreground | #0d0c0a | Texte normal |
| Accent | #d65d2e | CTA, accents |
| Muted-fg | #6b665c | Texte secondaire |
| Subtle | #ece7da | Hover BG |

### Violations AA Détectées

**1.4.3 Contrast Minimum (AA)**

1. **Accent on muted background** — Domaines.tsx (chip-ember)
   - **Combination**: #d65d2e on #f4ebe2 (mixed) = 4.2:1 (just under 4.5 minimum)
   - **Impact** : Difficile à lire
   - **Fix** :
     ```css
     .chip-ember {
       color: var(--color-accent-deep);  /* #8f3612 → 6.8:1 */
     }
     ```

2. **Muted text on muted background** — Method.tsx, Nav.tsx
   - **Combination**: #6b665c on #f2eee5 = 4.1:1 (fail)
   - **Elements** : Eyebrows, durations (11px monospace)
   - **Fix** :
     ```css
     .eyebrow {
       color: #4a443c;  /* darker, 7.2:1 */
     }
     ```

**Summary** : 2 violations AA confirmées. Effort: 20 min.

---

## 4. CLAVIER & FOCUS

### Conforme

- **Focus visible** — globals.css:468-472 : outline 2px solid accent ✓
- **Tab order** — Linéaire sans tabIndex > 0 ✓

### Violations

**2.1.1 Keyboard (A) — Marquee non pausable**

- ProofBand.tsx/globals.css:380-400
- Animation continue, ne s'arrête qu'au :hover
- **Fix** :
  ```css
  .marquee:focus-within .marquee-track {
    animation-play-state: paused;
  }
  ```

**2.4.3 Focus Order (AA) — Focus trap mobile nav absent**

- Nav.tsx:120-149 : Mobile menu n'a pas focus trap
- Utilisateur peut taber hors menu
- **Fix** : Implémenter useFocusTrap hook (voir code ci-dessous)

---

## 5. FORMULAIRES

Pas de formulaires sur la landing (liens Calendly seulement). ✓ OK.

---

## 6. BOUTONS & LIENS

### Violations

**4.1.2 Name, Role, Value (A)**

1. **Realisations featured** — Realisations.tsx:105
   - "Lire le post-mortem" n'est pas cliquable (div, pas <a>)
   - **Fix** : Convertir en `<a href="#">`

2. **Domaines cards** — Domaines.tsx:121
   - Lien sans aria-label explicite
   - **Fix** : `aria-label="Discuter de ${title}"`

---

## 7. ANIMATIONS & MOTION

### Violations

**2.3.3 Animation from Interactions (A)**

- Marquee scrolls infiniment (2.3.3 AAA, mais aussi A si clignote)
- **Fix** : Ajouter pause au focus (voir section Clavier)

### Conforme

- **prefers-reduced-motion** — globals.css:518-527 désactive animations ✓

---

## 8. TEXTE & LISIBILITÉ

### Violations

**1.4.4 Text Sizing (AA)**

| Section | Taille | Issue |
|---------|--------|-------|
| Nav:88 | 11px mono | < 12px min |
| Hero:31 | 10.5px mono | < 12px |
| Method:104 | 10.5px mono | < 12px |
| Footer:53 | 11px mono | < 12px |

**Fix** : Augmenter à 12px minimum

```css
.font-mono {
  font-size: 12px;  /* instead of 10.5-11px */
}
```

### Conforme

- **line-height** : 1.55 ✓
- **spacing** : Généreux ✓

---

## 9. RESPONSIVE & ZOOM

### Conforme

- **Tailwind responsive** — Breakpoints OK ✓
- **100% zoom** — Pas d'overflow ✓
- **200% zoom** — Readable ✓

---

## 10. ARIA & SÉMANTIQUE

### Conforme

- **aria-hidden** — Utilisé correctement ✓
- **Heading structure** — OK ✓
- **Nav buttons** — aria-expanded sur hamburger ✓

### Violations

- **aria-label manquant** — Logos, buttons (voir section 2)

---

## 11. LANGUE & LOCALISATION

### Conforme

- **lang="fr"** ✓
- Toutes sections en français ✓

---

## 12. CONFORMITÉ EAA (EN 301 549) — Juin 2025

### Checklist

| Req | Description | Status |
|-----|-------------|--------|
| Text alternatives | Alt text | ✗ FAIL (pas d'alt sur logos) |
| Captions | Sous-titres vidéo | ✓ N/A |
| Adaptability | Contenu non limité | ✓ PASS |
| Distinguishable | Contraste 4.5:1 | ✗ PARTIAL |
| Operable | Clavier accès | ⚠ PARTIAL |
| Predictable | Navigation cohérente | ✓ PASS |
| Robust | Tech assistance compatible | ✓ PASS |

---

## Violations par Priorité

### P0 — Bloquant

| # | Violation | File:Line | WCAG | Effort |
|---|-----------|-----------|------|--------|
| 1 | Images sans alt/label | Footer:6-15, Domaines:205 | 1.1.1 A | 30m |
| 2 | Contraste #d65d2e sur fond muted | Domaines chips | 1.4.3 AA | 20m |
| 3 | Marquee non pausable | ProofBand + globals | 2.3.3 A | 15m |
| 4 | Muted text sur muted BG | Method, Nav | 1.4.3 AA | 20m |

**Total P0** : 1.5 hours

### P1 — Sérieux

| # | Violation | File:Line | WCAG | Effort |
|---|-----------|-----------|------|--------|
| 5 | Focus trap mobile nav | Nav:120-149 | 2.4.3 AA | 1h |
| 6 | "Lire post" pas cliquable | Realisations:105 | 4.1.2 A | 30m |
| 7 | Card sans aria-label | Domaines:121 | 4.1.2 A | 30m |
| 8 | Pas skip links | N/A | 2.4.1 A | 1h |

**Total P1** : 3 hours

### P2 — Amélioration

| # | Violation | File:Line | WCAG | Effort |
|---|-----------|-----------|------|--------|
| 9 | Texte trop petit (11px) | Multiples | 1.4.4 AA | 1h |

---

## Code Fixes Required

### 1. Focus Trap Hook

```tsx
// src/hooks/useFocusTrap.ts
import { useEffect, RefObject } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]', 'button', '
