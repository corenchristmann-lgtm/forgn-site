import type { Metadata } from "next";
import Link from "next/link";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Décrire mon projet",
  description:
    "Décrivez votre projet d'application événementielle en quelques minutes. Nous vous répondons sous 24h avec une estimation honnête.",
  alternates: { canonical: "/brief" },
  openGraph: {
    title: "Décrire mon projet · Forgn",
    description:
      "Quelques minutes pour cadrer votre besoin. Réponse sous 24h avec estimation honnête.",
  },
};

const TALLY_FORM_ID = process.env.NEXT_PUBLIC_TALLY_FORM_ID;

export default function BriefPage() {
  return (
    <main
      id="main"
      className="relative pt-28 sm:pt-36 pb-24 min-h-screen bg-mesh-warm"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[40vh] bg-editorial-grid opacity-[0.35] pointer-events-none"
      />

      <div className="relative mx-auto max-w-[820px] px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)] transition-colors mb-8"
        >
          <span aria-hidden>←</span>
          <span>Retour à l&apos;accueil</span>
        </Link>

        <header className="mb-10 sm:mb-14">
          <div className="eyebrow mb-5">Brief projet · 3 minutes</div>
          <h1 className="display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.02] max-w-[18ch]">
            Racontez-nous votre{" "}
            <span className="display-italic text-[color:var(--color-accent)]">
              événement
            </span>
            .
          </h1>
          <p className="mt-6 text-[17px] leading-[1.6] text-[color:var(--color-muted-foreground)] max-w-[56ch]">
            Quelques questions pour qualifier votre besoin, votre date, votre
            budget et vos contraintes. Nous revenons vers vous sous 24 heures
            ouvrées avec une estimation honnête — si c&apos;est un projet pour
            nous, nous vous proposons un appel de cadrage.
          </p>
        </header>

        {/* Trust row */}
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 pb-10 border-b border-[color:var(--color-border)]">
          <TrustItem label="Sous 24h" value="Réponse garantie" />
          <TrustItem label="Gratuit" value="Sans engagement" />
          <TrustItem label="Confidentiel" value="Brief non diffusé" />
          <TrustItem label="Honnête" value="On refuse si ce n'est pas pour nous" />
        </ul>

        {/* Form embed */}
        <section
          aria-label="Formulaire de brief projet"
          className="relative rounded-3xl bg-[color:var(--color-background)] border border-[color:var(--color-border)] shadow-[var(--shadow-md)] overflow-hidden"
        >
          {TALLY_FORM_ID ? (
            <iframe
              src={`https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
              loading="lazy"
              width="100%"
              height="720"
              frameBorder={0}
              marginHeight={0}
              marginWidth={0}
              title="Formulaire de brief projet Forgn"
              className="block w-full"
            />
          ) : (
            <FormPlaceholder />
          )}
        </section>

        {/* Alternatives */}
        <div className="mt-14 pt-10 border-t border-[color:var(--color-border)]">
          <p className="text-[14.5px] text-[color:var(--color-muted-foreground)] mb-5">
            Vous préférez parler de vive voix ou écrire directement ?
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ember group"
            >
              Réserver 30 minutes
              <span aria-hidden className="arrow-nudge">→</span>
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="btn-outline group"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

function TrustItem({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex flex-col gap-1">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--color-muted-foreground)]">
        {label}
      </span>
      <span className="text-[14px] font-medium text-[color:var(--color-foreground)] leading-tight">
        {value}
      </span>
    </li>
  );
}

function FormPlaceholder() {
  return (
    <div className="p-10 sm:p-14 text-center">
      <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[color:var(--color-muted)] mb-6">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="text-[color:var(--color-accent)]"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="15" x2="15" y2="15" />
          <line x1="9" y1="11" x2="15" y2="11" />
        </svg>
      </div>
      <h2 className="display text-[24px] text-[color:var(--color-foreground)] mb-3">
        Formulaire bientôt disponible.
      </h2>
      <p className="text-[15px] text-[color:var(--color-muted-foreground)] max-w-[48ch] mx-auto mb-8">
        En attendant, écrivez-nous directement. Décrivez votre événement, la
        date cible, le type d&apos;app imaginé et votre enveloppe budgétaire.
      </p>
      <a
        href={`mailto:${CONTACT_EMAIL}?subject=Brief%20projet%20Forgn`}
        className="btn-ember group inline-flex"
      >
        Écrire à {CONTACT_EMAIL}
        <span aria-hidden className="arrow-nudge">→</span>
      </a>
    </div>
  );
}
