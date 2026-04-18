"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { CONTACT_EMAIL } from "@/lib/constants";

interface Metric {
  value: string;
  label: string;
}

interface CaseCard {
  slug: string;
  tag: string;
  year: string;
  title: string;
  summary: string;
  metrics: Metric[];
}

interface FeaturedCase extends CaseCard {
  lede: string;
}

const featured: FeaturedCase = {
  slug: "vote-live-soiree-pitch",
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

const supporting: CaseCard[] = [
  {
    slug: "companion-journee-entrepreneuriale",
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
    slug: "gamification-award",
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
    slug: "matching-alumni",
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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const deviceY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const orbY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      id="realisations"
      ref={sectionRef}
      className="relative py-28 sm:py-36"
    >
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
            {/* Left — text (parallax) */}
            <motion.div style={{ y: textY }} className="lg:col-span-7">
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

              <Link
                href={`/realisations/${featured.slug}`}
                className="mt-10 inline-flex items-center gap-2 text-[14px] text-[color:var(--color-accent-soft)] font-medium hover:text-white transition-colors"
              >
                <span>Lire le case study complet</span>
                <span aria-hidden className="arrow-nudge">→</span>
              </Link>
            </motion.div>

            {/* Right — metrics panel, mock screen illusion (parallax) */}
            <motion.div style={{ y: deviceY }} className="lg:col-span-5">
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

                {/* Accent glow orb (parallax, scale) */}
                <motion.div
                  aria-hidden
                  style={{ y: orbY, scale: orbScale }}
                  className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[color:var(--color-accent)] opacity-40 blur-3xl pointer-events-none"
                />
              </div>
            </motion.div>
          </div>
        </motion.article>

        {/* Supporting — 3 columns editorial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {supporting.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.06,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="relative"
            >
            <Link
              href={`/realisations/${c.slug}`}
              aria-label={`${c.title} — lire le case study`}
              className="group block relative overflow-hidden card p-7 flex flex-col min-h-[320px] hover:border-[color:var(--color-foreground)]/40 transition-colors"
            >
              {/* Decorative case visual */}
              <CaseVisual tag={c.tag} />

              <div className="relative flex items-center justify-between mb-7">
                <span className="chip">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
                  {c.tag}
                </span>
                <span className="font-mono text-[11px] text-[color:var(--color-muted-foreground)] tabular">
                  {c.year}
                </span>
              </div>

              <h3 className="relative display text-[22px] text-[color:var(--color-foreground)] mb-3 leading-[1.1]">
                {c.title}
              </h3>
              <p className="relative text-[14.5px] leading-relaxed text-[color:var(--color-muted-foreground)]">
                {c.summary}
              </p>

              <div className="relative mt-auto pt-6 flex items-baseline gap-5 border-t border-[color:var(--color-border)]">
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
              <div className="relative mt-5 flex items-center gap-1.5 text-[13px] text-[color:var(--color-muted-foreground)] group-hover:text-[color:var(--color-accent-deep)] transition-colors">
                Lire le case study
                <span aria-hidden className="arrow-nudge">→</span>
              </div>
            </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseVisual({ tag }: { tag: string }) {
  const ACCENT = "var(--color-accent)";
  const BORDER = "var(--color-border-strong)";
  const FG = "var(--color-foreground)";

  return (
    <div
      aria-hidden
      className="absolute top-0 right-0 w-[65%] h-[55%] pointer-events-none overflow-hidden opacity-[0.55] group-hover:opacity-90 transition-opacity duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-bl from-[color:var(--color-muted)]/80 to-transparent" />
      <svg
        viewBox="0 0 260 180"
        className="absolute top-4 right-4 w-full max-w-[220px] h-auto"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {tag === "Companion" && <CompanionGlyph accent={ACCENT} fg={FG} border={BORDER} />}
        {tag === "Gamification" && <GamificationGlyph accent={ACCENT} fg={FG} border={BORDER} />}
        {tag === "Matching" && <MatchingGlyph accent={ACCENT} fg={FG} border={BORDER} />}
      </svg>
    </div>
  );
}

interface GlyphProps {
  accent: string;
  fg: string;
  border: string;
}

function CompanionGlyph({ accent, fg, border }: GlyphProps) {
  return (
    <g>
      {/* Phone silhouette */}
      <rect
        x="90"
        y="20"
        width="110"
        height="150"
        rx="14"
        stroke={border}
        strokeWidth="1.5"
        fill="var(--color-background)"
      />
      <rect x="108" y="32" width="74" height="6" rx="2" fill={fg} opacity="0.9" />
      <rect x="108" y="46" width="54" height="4" rx="1.5" fill={fg} opacity="0.35" />

      {/* Checkable items */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x="108"
            y={68 + i * 20}
            width="8"
            height="8"
            rx="2"
            stroke={i < 2 ? accent : border}
            fill={i < 2 ? accent : "transparent"}
            strokeWidth="1.5"
          />
          <rect
            x="124"
            y={70 + i * 20}
            width={i === 3 ? 44 : 60}
            height="4"
            rx="1.5"
            fill={fg}
            opacity={i < 2 ? 0.85 : 0.3}
          />
        </g>
      ))}
    </g>
  );
}

function GamificationGlyph({ accent, fg, border }: GlyphProps) {
  const values = [85, 62, 48, 30, 22];
  return (
    <g>
      {/* Leaderboard frame */}
      <rect
        x="30"
        y="30"
        width="200"
        height="130"
        rx="10"
        stroke={border}
        strokeWidth="1.5"
        fill="var(--color-background)"
      />
      <rect x="46" y="44" width="56" height="5" rx="1.5" fill={fg} opacity="0.85" />
      <circle cx="210" cy="47" r="4" fill={accent} />

      {/* Bars */}
      {values.map((v, i) => (
        <g key={i}>
          <text
            x="46"
            y={76 + i * 16}
            fontSize="7"
            fill={fg}
            opacity="0.6"
            fontFamily="ui-monospace, monospace"
          >
            {String(i + 1).padStart(2, "0")}
          </text>
          <rect
            x="62"
            y={70 + i * 16}
            width="130"
            height="6"
            rx="3"
            fill={border}
            opacity="0.4"
          />
          <rect
            x="62"
            y={70 + i * 16}
            width={v * 1.3}
            height="6"
            rx="3"
            fill={i === 0 ? accent : fg}
            opacity={i === 0 ? 1 : 0.55 - i * 0.08}
          />
          <text
            x="198"
            y={76 + i * 16}
            fontSize="7"
            fill={fg}
            opacity="0.7"
            fontFamily="ui-monospace, monospace"
          >
            {v}
          </text>
        </g>
      ))}
    </g>
  );
}

function MatchingGlyph({ accent, fg, border }: GlyphProps) {
  const left = [40, 80, 120];
  const right = [60, 100, 140];
  return (
    <g>
      {/* Connecting lines */}
      {left.map((ly, i) => {
        const ry = right[(i + 1) % right.length];
        return (
          <path
            key={`line-${i}`}
            d={`M 70 ${ly + 20} Q 130 ${(ly + ry) / 2 + 20} 190 ${ry + 20}`}
            stroke={i === 0 ? accent : border}
            strokeWidth={i === 0 ? 2 : 1.3}
            strokeDasharray={i === 0 ? "0" : "4 4"}
          />
        );
      })}
      {/* Left nodes */}
      {left.map((y, i) => (
        <g key={`l-${i}`}>
          <circle
            cx="70"
            cy={y + 20}
            r="9"
            fill={i === 0 ? accent : "var(--color-background)"}
            stroke={i === 0 ? accent : border}
            strokeWidth="1.5"
          />
        </g>
      ))}
      {/* Right nodes */}
      {right.map((y, i) => (
        <g key={`r-${i}`}>
          <circle
            cx="190"
            cy={y + 20}
            r="9"
            fill={i === 1 ? accent : "var(--color-background)"}
            stroke={i === 1 ? accent : border}
            strokeWidth="1.5"
          />
        </g>
      ))}
      {/* Labels */}
      <rect x="84" y="58" width="40" height="3" rx="1" fill={fg} opacity="0.35" />
      <rect x="132" y="78" width="40" height="3" rx="1" fill={fg} opacity="0.35" />
    </g>
  );
}
