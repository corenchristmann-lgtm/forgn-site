# Forgn — Site web

Site one-pager de conversion pour Forgn, agence d'automatisation pour agences marketing.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- TypeScript
- Fonts : Outfit (titres) + DM Sans (corps)

## Dev local

```bash
npm install
npm run dev
```

Sur Windows, ajouter si besoin :

```bash
set NODE_OPTIONS=--max-old-space-size=4096
```

## Deploy sur Vercel

1. Push le repo sur GitHub
2. Connecte le repo dans Vercel
3. Deploy automatique — aucune config nécessaire

## Structure

```
src/
  app/
    layout.tsx      # Fonts, metadata SEO
    page.tsx        # Assemblage des sections
    globals.css     # Tokens Tailwind v4, styles globaux
    icon.svg        # Favicon (F violet)
  components/
    Nav.tsx         # Navigation fixed + mobile
    Hero.tsx        # Hero avec gradient + CTA
    ProofBand.tsx   # Bande de métriques
    Problem.tsx     # 3 cards douleurs
    Method.tsx      # 4 étapes
    UseCases.tsx    # 3 cas d'usage
    Pricing.tsx     # 3 offres
    FinalCTA.tsx    # CTA final avec glow
    Footer.tsx      # Footer
    ScrollReveal.tsx # Animation fade-in au scroll
```
