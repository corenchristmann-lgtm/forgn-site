import Link from "next/link";
import type { Metadata } from "next";
import { CALENDLY_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Page introuvable",
  description:
    "La page demandée est introuvable. Retrouvez Forgn — applications sur-mesure pour événements et outils métier.",
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-mesh-warm py-24 px-6"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[70vh] bg-editorial-grid opacity-[0.35] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-[color:var(--color-accent)] opacity-[0.16] blur-3xl pointer-events-none"
      />

      <div className="relative max-w-[640px] text-center">
        <div className="eyebrow mb-6 justify-center">
          Erreur · 404
        </div>

        <h1 className="display text-[clamp(3rem,10vw,7rem)] leading-[0.95] text-[color:var(--color-foreground)]">
          Cette page a{" "}
          <span className="display-italic text-[color:var(--color-accent)]">
            déforgé.
          </span>
        </h1>

        <p className="mt-7 text-[17px] sm:text-[18px] leading-[1.55] text-[color:var(--color-muted-foreground)] max-w-[52ch] mx-auto">
          Le lien que vous avez suivi ne mène nulle part. Le contenu a peut-être
          été renommé, archivé, ou n&apos;a jamais existé. Voici de quoi
          rebondir.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-ember group">
            Retour à l&apos;accueil
            <span aria-hidden className="arrow-nudge">
              →
            </span>
          </Link>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline group"
          >
            Réserver 30 minutes
            <span aria-hidden className="arrow-nudge opacity-60">
              →
            </span>
          </a>
        </div>

        <div className="mt-14 pt-10 border-t border-[color:var(--color-border)] grid grid-cols-1 sm:grid-cols-3 gap-5 text-left max-w-[520px] mx-auto">
          <NavHint label="Réalisations" href="/#realisations" />
          <NavHint label="Méthode" href="/#methode" />
          <NavHint label="Contact" href="/#contact" />
        </div>
      </div>
    </main>
  );
}

function NavHint({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between px-4 py-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-muted)]/40 hover:bg-[color:var(--color-muted)] transition-colors"
    >
      <span className="text-[14px] font-medium text-[color:var(--color-foreground)]">
        {label}
      </span>
      <span
        aria-hidden
        className="text-[color:var(--color-accent)] text-[16px]"
      >
        →
      </span>
    </Link>
  );
}
