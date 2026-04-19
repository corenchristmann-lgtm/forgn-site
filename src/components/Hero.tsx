"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { BRIEF_URL, CALENDLY_URL } from "@/lib/constants";
import HeroTypography from "./hero/HeroTypography";
import HeroStageFallback from "./hero/HeroStageFallback";

const HeroStageCanvas = dynamic(() => import("./hero/HeroStageCanvas"), {
  ssr: false,
  loading: () => <HeroStageFallback />,
});

export default function Hero() {
  return (
    <section className="relative isolate pt-32 sm:pt-36 pb-20 overflow-hidden">
      {/* Warm ember radial + editorial grid background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 85% 90%, rgba(255,107,53,0.14) 0%, transparent 58%), radial-gradient(ellipse 60% 45% at 15% 15%, rgba(205,127,50,0.08) 0%, transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[70vh] bg-editorial-grid opacity-[0.22] pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6">
        {/* Top row — chips + coordinates */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-wrap items-center justify-between gap-4 mb-10 sm:mb-14"
        >
          <div className="flex items-center gap-3">
            <span className="chip chip-ember">
              <span className="live-dot" />
              En forge · édition 2026
            </span>
            <span className="hidden sm:inline-flex chip">
              Agence · Liège, BE
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--forge-mist)]">
            <span>50°38′N</span>
            <span className="h-px w-6 bg-[color:var(--forge-ash)]" />
            <span>05°34′E</span>
          </div>
        </motion.div>

        {/* Main 60/40 split — text + stage canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <HeroTypography />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="mt-8 text-[19px] sm:text-[20px] leading-[1.55] text-[color:var(--forge-bone)]/80 max-w-[54ch]"
            >
              Forgn est l&apos;agence des{" "}
              <span className="text-[color:var(--forge-bone)] font-medium">
                incubateurs, écoles entrepreneuriales et agences événementielles
              </span>{" "}
              qui refusent qu&apos;une app tombe le soir de leur événement.
              Vote live, compagnon, matching, gamification, dashboard de scène
              — livrés en 2 à 4 semaines.
            </motion.p>

            {/* Garantie block — embossed ember */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.55,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="mt-7 flex items-start gap-3 p-4 sm:p-5 rounded-2xl border border-[color:var(--forge-ember)]/35 bg-[linear-gradient(135deg,rgba(255,107,53,0.1)_0%,rgba(255,107,53,0.02)_100%)] shadow-[0_0_32px_-12px_rgba(255,107,53,0.5),inset_0_1px_0_rgba(255,250,240,0.04)]"
            >
              <span
                aria-hidden
                className="relative mt-0.5 inline-flex shrink-0 h-6 w-6 items-center justify-center rounded-full bg-[color:var(--forge-ember)] text-[color:var(--forge-void)] text-[13px] font-semibold shadow-[0_0_20px_var(--forge-ember)]"
              >
                ●
              </span>
              <p className="text-[14.5px] sm:text-[15px] leading-[1.55] text-[color:var(--forge-bone)]">
                <span className="font-semibold">Garantie jour J.</span>{" "}
                Votre application fonctionne le soir de votre événement — ou
                notre équipe corrige en temps réel, sur place ou en astreinte
                serveur dédiée. Contractuel.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.7,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ember group"
              >
                Réserver 30 minutes
                <span aria-hidden className="arrow-nudge">
                  →
                </span>
              </a>
              <a href={BRIEF_URL} className="btn-outline group">
                Décrire mon projet
                <span aria-hidden className="arrow-nudge opacity-60">
                  →
                </span>
              </a>
            </motion.div>

            <a
              href="#realisations"
              className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] text-[color:var(--forge-mist)] hover:text-[color:var(--forge-bone)] transition-colors"
            >
              <span>Voir d&apos;abord les réalisations</span>
              <span aria-hidden className="arrow-nudge opacity-60">
                ↓
              </span>
            </a>
          </div>

          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <HeroStageCanvas />
          </div>
        </div>

        {/* Signal items — full-width differentiation strip */}
        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.95,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="mt-14 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 pt-10 border-t border-[color:var(--forge-ash)]"
        >
          <SignalItem index="01" label="Livraison" value="2 à 4 semaines" />
          <SignalItem
            index="02"
            label="Jour J"
            value="Présence contractuelle"
          />
          <SignalItem
            index="03"
            label="Sur-mesure"
            value="Votre marque, votre code"
          />
          <SignalItem
            index="04"
            label="Référent"
            value="Un interlocuteur unique"
          />
        </motion.ul>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-20 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--forge-mist)]"
        >
          <span className="h-px w-10 bg-[color:var(--forge-ash)]" />
          <span>Faites défiler — quatre applications en production</span>
        </motion.div>
      </div>
    </section>
  );
}

function SignalItem({
  index,
  label,
  value,
}: {
  index: string;
  label: string;
  value: string;
}) {
  return (
    <li className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10.5px] text-[color:var(--forge-mist)] tabular">
          {index}
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[color:var(--forge-mist)]">
          {label}
        </span>
      </div>
      <span className="text-[15px] font-medium text-[color:var(--forge-bone)] leading-tight">
        {value}
      </span>
    </li>
  );
}
