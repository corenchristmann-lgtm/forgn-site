import Link from "next/link";
import type { ReactNode } from "react";

interface LegalShellProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalShell({
  eyebrow,
  title,
  lastUpdated,
  children,
}: LegalShellProps) {
  return (
    <article className="relative pt-32 sm:pt-40 pb-24 bg-mesh-warm min-h-screen">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[50vh] bg-editorial-grid opacity-[0.35] pointer-events-none"
      />

      <div className="relative mx-auto max-w-[760px] px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)] transition-colors mb-10"
        >
          <span aria-hidden>←</span>
          <span>Retour à l&apos;accueil</span>
        </Link>

        <header className="mb-12 pb-8 border-b border-[color:var(--color-border)]">
          <div className="eyebrow mb-5">{eyebrow}</div>
          <h1 className="display text-[clamp(2rem,5vw,3.5rem)] text-[color:var(--color-foreground)] leading-[1.05] max-w-[24ch]">
            {title}
          </h1>
          <p className="mt-5 font-mono text-[11.5px] uppercase tracking-[0.1em] text-[color:var(--color-muted-foreground)]">
            Dernière mise à jour · {lastUpdated}
          </p>
        </header>

        <div className="prose-legal text-[color:var(--color-foreground)]">
          {children}
        </div>
      </div>
    </article>
  );
}
