"use client";

import { motion } from "motion/react";

interface Domaine {
  num: string;
  title: string;
  summary: string;
  scope: string;
  accent?: boolean;
  span?: "md:col-span-2" | "md:col-span-1";
}

const domaines: Domaine[] = [
  {
    num: "01",
    title: "Vote & award live",
    summary:
      "Dévoilement sur scène, synchronisation temps réel, cérémonie qui garde sa tension.",
    scope: "2–3 semaines",
    accent: true,
    span: "md:col-span-2",
  },
  {
    num: "02",
    title: "Compagnon d'événement",
    summary:
      "Parcours personnalisé, checklist live, galerie partagée par groupe. La journée dans la poche.",
    scope: "3–5 semaines",
  },
  {
    num: "03",
    title: "Gamification & engagement",
    summary:
      "Investissement virtuel, ligue fantasy, leaderboard sur écran TV. Le public joue, ne regarde plus.",
    scope: "3–4 semaines",
  },
  {
    num: "04",
    title: "Matching & networking",
    summary:
      "Mentorat, parrainage, speed-networking. Algorithme pondéré, suivi post-rencontre.",
    scope: "3–4 semaines",
    span: "md:col-span-2",
  },
  {
    num: "05",
    title: "Dashboard & écran de scène",
    summary:
      "Leaderboard, reveal animé, flux modéré. Conçu pour huit mètres — pas pour un onglet.",
    scope: "2–3 semaines",
  },
  {
    num: "06",
    title: "Inscription & gestion participants",
    summary:
      "Parcours multi-profils, QR codes, relances conditionnelles, export vers votre CRM.",
    scope: "2–4 semaines",
  },
];

export default function Domaines() {
  return (
    <section id="domaines" className="relative py-28 sm:py-36 bg-[color:var(--color-background-deep)]/40">
      <div className="mx-auto max-w-[1240px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end mb-14"
        >
          <div className="md:col-span-7">
            <div className="eyebrow mb-6">Domaines · Ce que nous forgeons</div>
            <h2 className="display text-[clamp(2.2rem,6vw,4.75rem)] text-[color:var(--color-foreground)] max-w-[14ch]">
              Six terrains.{" "}
              <span className="display-italic text-[color:var(--color-accent)]">
                Aucun gabarit.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-[17px] leading-relaxed text-[color:var(--color-muted-foreground)] max-w-[42ch]">
              Chaque domaine est un point de départ, jamais une livraison. Nous
              partons de votre besoin — pas d&apos;un gabarit.
            </p>
          </div>
        </motion.div>

        {/* Bento grid — 3 cols, asymmetric spans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {domaines.map((d, i) => (
            <motion.a
              key={d.num}
              href="#contact"
              aria-label={`${d.title} — discuter de ce terrain (${d.scope})`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.23, 1, 0.32, 1],
              }}
              className={`group relative overflow-hidden ${d.span ?? ""} ${
                d.accent ? "ember-block p-8 md:p-10" : "card p-7 md:p-8"
              } min-h-[260px] flex flex-col`}
            >
              {/* Accent decorations */}
              {d.accent && (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-grain opacity-40 pointer-events-none"
                  />
                  <div
                    aria-hidden
                    className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-white/15 blur-3xl pointer-events-none"
                  />
                </>
              )}

              <div
                className={`relative flex items-center justify-between mb-8 ${
                  d.accent ? "text-white/80" : "text-[color:var(--color-muted-foreground)]"
                }`}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] tabular">
                  {d.num}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
                  {d.scope}
                </span>
              </div>

              <div className="relative flex-1 flex flex-col">
                <h3
                  className={`display text-[24px] md:text-[28px] leading-[1.05] mb-3 ${
                    d.accent ? "text-white" : "text-[color:var(--color-foreground)]"
                  }`}
                >
                  {d.title}
                </h3>
                <p
                  className={`text-[14.5px] leading-relaxed max-w-[42ch] ${
                    d.accent
                      ? "text-white/85"
                      : "text-[color:var(--color-muted-foreground)]"
                  }`}
                >
                  {d.summary}
                </p>

                <div className="mt-auto pt-8 flex items-center justify-between">
                  <span
                    className={`text-[13.5px] font-medium ${
                      d.accent ? "text-white" : "text-[color:var(--color-foreground)]"
                    }`}
                  >
                    Discuter de ce terrain
                  </span>
                  <span
                    aria-hidden
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 ${
                      d.accent
                        ? "border-white/30 text-white bg-white/10 group-hover:bg-white group-hover:text-[color:var(--color-accent-deep)]"
                        : "border-[color:var(--color-border-strong)] text-[color:var(--color-muted-foreground)] group-hover:bg-[color:var(--color-foreground)] group-hover:text-[color:var(--color-background)] group-hover:border-[color:var(--color-foreground)]"
                    }`}
                  >
                    <span className="arrow-nudge">→</span>
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
