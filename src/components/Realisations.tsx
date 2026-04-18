"use client";

import { motion } from "motion/react";
import { CONTACT_EMAIL } from "@/lib/constants";

interface Metric {
  value: string;
  label: string;
}

interface CaseStudy {
  tag: string;
  year: string;
  title: string;
  summary: string;
  metrics: Metric[];
}

interface FeaturedCase extends CaseStudy {
  lede: string;
}

const featured: FeaturedCase = {
  tag: "Vote live · Award cérémonie",
  year: "2026",
  title: "Une soirée pitch remportée sans un seul bug.",
  lede:
    "Vote synchronisé sur 112 smartphones, résultats annoncés en direct sur scène à la minute près.",
  summary:
    "Pas d'abstraction, pas de framework de concours. Un flux unique, fait pour ce soir-là : identification par QR code en amont, fenêtre de vote orchestrée depuis le pupitre, résultats révélés en cascade sur l'écran principal. Serveur dédié le jour J, deux techniciens Forgn en salle.",
  metrics: [
    { value: "110/112", label: "participants votants" },
    { value: "11 min", label: "fenêtre de vote" },
    { value: "0", label: "bug en production" },
    { value: "2", label: "techniciens présents" },
  ],
};

const supporting: CaseStudy[] = [
  {
    tag: "Companion",
    year: "2026",
    title: "Une journée entrepreneuriale, dans la poche.",
    summary:
      "App compagnon pour huit équipes : parcours personnalisé, galerie partagée par groupe, checklist live.",
    metrics: [
      { value: "8", label: "équipes" },
      { value: "3", label: "ateliers" },
      { value: "5 sem", label: "livraison" },
    ],
  },
  {
    tag: "Gamification",
    year: "2025",
    title: "Un award où le public investit, pas où le jury vote.",
    summary:
      "Portefeuille virtuel, investissements dans les projets, leaderboard live projeté sur écran TV.",
    metrics: [
      { value: "60+", label: "projets" },
      { value: "Live", label: "écran TV" },
      { value: "4 sem", label: "livraison" },
    ],
  },
  {
    tag: "Matching",
    year: "2024",
    title: "Un programme d'alumni qui tient au-delà de trois mois.",
    summary:
      "Matching pondéré multi-dimensions, plan de salle généré, suivi post-rencontre à six mois.",
    metrics: [
      { value: "72", label: "profils" },
      { value: "41", label: "binômes" },
      { value: "76%", label: "actifs 3 mois" },
    ],
  },
];

export default function Realisations() {
  return (
    <section id="realisations" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-[1240px]">
        {/* Header — split */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end mb-16"
        >
          <div className="md:col-span-8">
            <div className="eyebrow mb-6">Réalisations · Ce qui a tenu en production</div>
            <h2 className="display text-[clamp(2.2rem,6vw,4.75rem)] text-[color:var(--color-foreground)] max-w-[18ch]">
              Quatre fois que le{" "}
              <span className="display-italic text-[color:var(--color-accent)]">
                jour J
              </span>{" "}
              s&apos;est passé exactement comme prévu.
            </h2>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <div className="inline-flex items-center gap-2.5 chip text-[11.5px]">
              <span className="live-dot" />
              Case studies sur demande · NDA respectés
            </div>
          </div>
        </motion.div>

        {/* Featured — wide editorial card with ink block */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="group relative ink-block p-8 sm:p-12 lg:p-16 mb-6"
        >
          {/* Grain */}
          <div className="absolute inset-0 bg-grain pointer-events-none opacity-50" aria-hidden />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left — text */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-8">
                <span className="chip chip-ember">{featured.tag}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-background)]/50 tabular">
                  {featured.year}
                </span>
              </div>

              <h3 className="display text-[clamp(1.75rem,3.2vw,2.8rem)] text-[color:var(--color-background)] max-w-[20ch]">
                {featured.title}
              </h3>

              <p className="mt-6 text-[18px] leading-relaxed text-[color:var(--color-background)]/85 max-w-[52ch]">
                {featured.lede}
              </p>

              <p className="mt-5 text-[14.5px] leading-relaxed text-[color:var(--color-background)]/60 max-w-[58ch]">
                {featured.summary}
              </p>

              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Case%20study%20d%C3%A9taill%C3%A9%20%E2%80%94%20Vote%20live`}
                className="mt-10 inline-flex items-center gap-2 text-[14px] text-[color:var(--color-accent-soft)] font-medium hover:text-white transition-colors"
              >
                <span>Case study détaillé sur demande</span>
                <span aria-hidden className="arrow-nudge">→</span>
              </a>
            </div>

            {/* Right — metrics panel, mock screen illusion */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Faux device frame */}
                <div className="relative rounded-2xl bg-[color:var(--color-background)]/5 border border-[color:var(--color-background)]/10 p-6 backdrop-blur">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[color:var(--color-live)]" />
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[color:var(--color-background)]/70">
                        Session live — Salle B
                      </span>
                    </div>
                    <span className="font-mono text-[10.5px] text-[color:var(--color-background)]/50 tabular">
                      20:42:18
                    </span>
                  </div>

                  <div className="space-y-3">
                    {featured.metrics.map((m, i) => (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2 + i * 0.08,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                        className="flex items-baseline justify-between border-b border-[color:var(--color-background)]/10 pb-2.5 last:border-0"
                      >
                        <span className="text-[13px] text-[color:var(--color-background)]/70">
                          {m.label}
                        </span>
                        <span className="font-display text-[24px] tabular text-[color:var(--color-background)]">
                          {m.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Accent glow orb */}
                <div
                  aria-hidden
                  className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[color:var(--color-accent)] opacity-40 blur-3xl pointer-events-none"
                />
              </div>
            </div>
          </div>
        </motion.article>

        {/* Supporting — 3 columns editorial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {supporting.map((c, i) => (
            <motion.article
              key={c.tag}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.06,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="group card p-7 flex flex-col min-h-[300px] hover:border-[color:var(--color-foreground)]/40"
            >
              <div className="flex items-center justify-between mb-7">
                <span className="chip">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
                  {c.tag}
                </span>
                <span className="font-mono text-[11px] text-[color:var(--color-muted-foreground)] tabular">
                  {c.year}
                </span>
              </div>

              <h3 className="display text-[22px] text-[color:var(--color-foreground)] mb-3 leading-[1.1]">
                {c.title}
              </h3>
              <p className="text-[14.5px] leading-relaxed text-[color:var(--color-muted-foreground)]">
                {c.summary}
              </p>

              <div className="mt-auto pt-6 flex items-baseline gap-5 border-t border-[color:var(--color-border)]">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-display text-[22px] tabular text-[color:var(--color-foreground)]">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-[color:var(--color-muted-foreground)] mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
