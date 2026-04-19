import {
  AVAILABILITY_LABEL,
  CALENDLY_URL,
  CONTACT_EMAIL,
  LINKEDIN_URL,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative border-t border-[color:var(--forge-ash)] bg-[color:var(--forge-void)] overflow-hidden">
      {/* Top ember hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--forge-ember)]/40 to-transparent pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3 mb-6" aria-label="Forgn">
              <ForgeLogo />
              <span className="display text-[28px] text-[color:var(--forge-bone)] leading-none">
                Forgn
              </span>
            </div>

            <p className="font-mono text-[13px] sm:text-[13.5px] leading-[1.65] text-[color:var(--forge-bone)] max-w-[42ch] mb-6">
              L&apos;agence qui forge les applications que vos événements et
              vos outils métier méritent.
            </p>

            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--forge-mist)]">
              <span className="live-dot" />
              <span>{AVAILABILITY_LABEL}</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--forge-mist)] mb-5">
              Site
            </div>
            <ul className="flex flex-col gap-3 font-mono text-[12.5px]">
              <li>
                <a href="#realisations" className="footer-link">
                  Réalisations
                </a>
              </li>
              <li>
                <a href="#methode" className="footer-link">
                  Méthode
                </a>
              </li>
              <li>
                <a href="#domaines" className="footer-link">
                  Domaines
                </a>
              </li>
              <li>
                <a href="#contact" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--forge-mist)] mb-5">
              Contact
            </div>
            <ul className="flex flex-col gap-3 font-mono text-[12.5px]">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="footer-link">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Calendly
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--forge-mist)] mb-5">
              Adresse
            </div>
            <address className="not-italic font-mono text-[12.5px] text-[color:var(--forge-bone)] leading-[1.7]">
              Liège
              <br />
              Belgique
              <br />
              <span className="text-[11.5px] text-[color:var(--forge-mist)] tabular">
                50°38′N · 05°34′E
              </span>
            </address>
          </div>
        </div>

        {/* Massive wordmark — edge-to-edge */}
        <div className="border-t border-[color:var(--forge-ash)] pt-10">
          <div
            aria-hidden
            className="display text-[clamp(4rem,22vw,20rem)] leading-[0.85] tracking-[-0.05em] text-[color:var(--forge-bone)]/[0.06] select-none"
          >
            Forgn.
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[color:var(--forge-ash)]">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--forge-mist)]">
            © 2026 Forgn — Tous droits réservés
          </div>
          <div className="flex flex-wrap items-center gap-5 font-mono text-[11px] uppercase tracking-[0.1em] text-[color:var(--forge-mist)]">
            <a href="/mentions-legales" className="footer-link">
              Mentions légales
            </a>
            <a href="/confidentialite" className="footer-link">
              Confidentialité
            </a>
            <a href="/accessibility-statement" className="footer-link">
              Accessibilité
            </a>
            <span className="hidden sm:inline text-[color:var(--forge-mist)]/70">
              Forgé à Liège
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ForgeLogo() {
  return (
    <span
      aria-hidden
      className="forge-logo-badge relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--forge-bone)] shadow-[inset_0_1px_0_rgba(255,250,240,0.2)]"
    >
      <span className="font-display text-[color:var(--forge-void)] text-[17px] font-semibold leading-none -mt-px">
        F
      </span>
      <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[color:var(--forge-ember)] shadow-[0_0_10px_var(--forge-ember)]" />
      {/* 3 sparks that animate on hover of parent group */}
      <span aria-hidden className="forge-spark forge-spark-1" />
      <span aria-hidden className="forge-spark forge-spark-2" />
      <span aria-hidden className="forge-spark forge-spark-3" />
    </span>
  );
}
