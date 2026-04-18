"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  AVAILABILITY_LABEL,
  BRIEF_URL,
  CALENDLY_URL,
  CONTACT_EMAIL,
} from "@/lib/constants";

interface FAQEntry {
  q: string;
  a: string;
}

const FAQ_ENTRIES: FAQEntry[] = [
  {
    q: "Vous prenez quels budgets ?",
    a: "De 8 000 à 25 000 €, forfait fermé. Cadrage gratuit, sans engagement.",
  },
  {
    q: "Le jour J, vous êtes où ?",
    a: "En salle ou en astreinte serveur dédiée — contractuel, pas optionnel.",
  },
  {
    q: "Qui travaille sur mon projet ?",
    a: "Un référent Forgn unique du brief à la livraison. Pas de turnover, pas de sous-traitance.",
  },
  {
    q: "Vous avez des références dans mon secteur ?",
    a: "Incubateurs, écoles entrepreneuriales, agences événementielles, ETI. Case studies détaillés sur demande.",
  },
  {
    q: "Le cadrage est-il payant ?",
    a: "Non. Trente minutes offertes pour qualifier votre besoin — et confirmer qu'on peut livrer avant votre date.",
  },
  {
    q: "Et si ça ne marche pas ?",
    a: "Sortie possible à la fin de chaque phase. Rien ne vous engage avant le brief signé.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ENTRIES.map((entry) => ({
    "@type": "Question",
    name: entry.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: entry.a,
    },
  })),
};

export default function FinalCTA() {
  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <div className="mx-auto max-w-[1240px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="relative ember-block p-10 sm:p-16 lg:p-20 overflow-hidden"
        >
          {/* Grain overlay */}
          <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" aria-hidden />

          {/* Orb */}
          <div
            aria-hidden
            className="absolute -top-40 -right-20 h-[480px] w-[480px] rounded-full bg-white/20 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -bottom-40 -left-20 h-[380px] w-[380px] rounded-full bg-[color:var(--color-accent-deep)] opacity-50 blur-3xl pointer-events-none"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-8">
                <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-white/15 border border-white/25 backdrop-blur font-mono text-[11px] uppercase tracking-[0.1em] text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  {AVAILABILITY_LABEL}
                </span>
              </div>

              <h2 className="display text-[clamp(2.2rem,7vw,5.5rem)] text-white max-w-[14ch] leading-[0.98]">
                Votre événement a une date.
                <br />
                <span className="display-italic text-white/70">On en parle ?</span>
              </h2>

              <p className="mt-8 text-[18px] leading-relaxed text-white/85 max-w-[54ch]">
                Trente minutes pour cadrer. Après, vous saurez si nous pouvons
                livrer avant la date — et si nous sommes faits pour travailler
                ensemble.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 h-12 pl-5 pr-4 rounded-full bg-white text-[color:var(--color-accent-deep)] font-medium text-[14.5px] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.6)] hover:shadow-[0_14px_40px_-8px_rgba(0,0,0,0.4)] active:scale-[0.97]"
                  style={{
                    transition:
                      "transform 160ms cubic-bezier(0.23,1,0.32,1), box-shadow 220ms cubic-bezier(0.23,1,0.32,1)",
                  }}
                >
                  Réserver 30 minutes
                  <span aria-hidden className="arrow-nudge">→</span>
                </a>
                <Link
                  href={BRIEF_URL}
                  className="inline-flex items-center gap-2 h-12 px-5 rounded-full text-white border border-white/30 bg-white/10 backdrop-blur font-medium text-[14.5px] hover:bg-white/20 transition-colors"
                >
                  Décrire mon projet
                  <span aria-hidden>→</span>
                </Link>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 h-12 px-5 rounded-full text-white/90 font-medium text-[14.5px] hover:text-white transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            {/* Right — answers */}
            <div className="lg:col-span-5">
              <ul className="space-y-5 lg:pl-10 lg:border-l lg:border-white/20">
                {FAQ_ENTRIES.map((entry) => (
                  <FAQItem key={entry.q} q={entry.q} a={entry.a} />
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <li>
      <div className="flex items-start gap-3 mb-1.5">
        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white shrink-0" />
        <span className="text-[14.5px] font-medium text-white leading-snug">
          {q}
        </span>
      </div>
      <p className="pl-[18px] text-[14px] text-white/75 leading-relaxed">{a}</p>
    </li>
  );
}
