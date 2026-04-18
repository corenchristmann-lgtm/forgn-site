import {
  AVAILABILITY_LABEL,
  CALENDLY_URL,
  CONTACT_EMAIL,
  LINKEDIN_URL,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative border-t border-[color:var(--color-border)] bg-[color:var(--color-muted)]/50 overflow-hidden">
      {/* Huge wordmark */}
      <div className="mx-auto max-w-[1240px] pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3 mb-6" aria-label="Forgn">
              <span
                aria-hidden
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--color-foreground)] shadow-[0_2px_6px_rgba(33,20,6,0.15),inset_0_1px_0_rgba(255,250,240,0.15)]"
              >
                <span className="font-display text-[color:var(--color-background)] text-[17px] font-semibold leading-none -mt-px">
                  F
                </span>
                <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[color:var(--color-accent)] shadow-[0_0_10px_var(--color-accent-glow)]" />
              </span>
              <span className="display text-[28px] text-[color:var(--color-foreground)] leading-none">
                Forgn
              </span>
            </div>

            <p className="text-[17px] leading-relaxed text-[color:var(--color-foreground)] max-w-[42ch] mb-6">
              L&apos;agence qui forge les applications que vos événements et
              vos outils métier méritent.
            </p>

            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[color:var(--color-muted-foreground)]">
              <span className="live-dot" />
              <span>{AVAILABILITY_LABEL}</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-muted-foreground)] mb-4">
              Site
            </div>
            <ul className="flex flex-col gap-3 text-[14.5px]">
              <li><a href="#realisations" className="link-editorial">Réalisations</a></li>
              <li><a href="#methode" className="link-editorial">Méthode</a></li>
              <li><a href="#domaines" className="link-editorial">Domaines</a></li>
              <li><a href="#contact" className="link-editorial">Contact</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-muted-foreground)] mb-4">
              Contact
            </div>
            <ul className="flex flex-col gap-3 text-[14.5px]">
              <li><a href={`mailto:${CONTACT_EMAIL}`} className="link-editorial">{CONTACT_EMAIL}</a></li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial"
                >
                  Calendly
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-muted-foreground)] mb-4">
              Adresse
            </div>
            <address className="not-italic text-[14.5px] text-[color:var(--color-foreground)] leading-relaxed">
              Liège<br />
              Belgique<br />
              <span className="font-mono text-[11.5px] text-[color:var(--color-muted-foreground)] tabular">
                50°38′N · 05°34′E
              </span>
            </address>
          </div>
        </div>

        {/* Massive wordmark — edge-to-edge */}
        <div className="border-t border-[color:var(--color-border)] pt-10">
          <div
            aria-hidden
            className="display text-[clamp(4rem,22vw,20rem)] leading-[0.85] tracking-[-0.05em] text-[color:var(--color-foreground)]/8 select-none"
          >
            Forgn.
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[color:var(--color-border)]">
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-muted-foreground)]">
            © 2026 Forgn — Tous droits réservés
          </div>
          <div className="flex items-center gap-6 text-[12.5px] text-[color:var(--color-muted-foreground)]">
            <a href="/mentions-legales" className="link-quiet">Mentions légales</a>
            <a href="/confidentialite" className="link-quiet">Confidentialité</a>
            <a href="/accessibility-statement" className="link-quiet">Accessibilité</a>
            <span className="hidden sm:inline">Forgé à Liège</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
