"use client";

import { motion } from "motion/react";
import { BRIEF_URL, CALENDLY_URL } from "@/lib/constants";
import HeroLiveMockup from "./HeroLiveMockup";

export default function Hero() {
  return (
    <section className="relative isolate pt-32 sm:pt-36 pb-20 overflow-hidden bg-mesh-warm">
      {/* Grain overlay */}
      <div className="absolute inset-0 bg-grain pointer-events-none" aria-hidden />

      {/* Faint editorial grid */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[70vh] bg-editorial-grid opacity-[0.35] pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        {/* Top row — live status + location */}
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
          <div className="hidden md:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-muted-foreground)]">
            <span>50°38′N</span>
            <span className="h-px w-6 bg-[color:var(--color-border-strong)]" />
            <span>05°34′E</span>
          </div>
        </motion.div>

        {/* Headline — editorial, asymmetric */}
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="display text-[clamp(3rem,9.5vw,9rem)] max-w-[18ch]"
          >
            Les applications
            <br />
            que vos{" "}
            <span className="display-italic text-[color:var(--color-accent)]">
              événements
            </span>
            <br />
            <span className="relative inline-block">
              méritent.
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.8, ease: [0.77, 0, 0.175, 1] }}
                className="absolute -bottom-2 left-0 h-[6px] w-full bg-[color:var(--color-accent)] origin-left rounded-full"
              />
            </span>
          </motion.h1>

        </div>

        {/* ICP + Value proposition + live mockup row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
        >
          <div className="lg:col-span-7">
            <p className="text-[19px] sm:text-[20px] leading-[1.55] text-[color:var(--color-foreground)]/85 max-w-[54ch]">
              Forgn est l&apos;agence des{" "}
              <span className="text-[color:var(--color-foreground)] font-medium">
                incubateurs, écoles entrepreneuriales et agences événementielles
              </span>{" "}
              qui refusent qu&apos;une app tombe le soir de leur événement.
              Vote live, compagnon, matching, gamification, dashboard de scène
              — livrés en 2 à 4 semaines.
            </p>

            {/* Jour J guarantee — highlighted line */}
            <div className="mt-7 flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-[color:var(--color-foreground)] text-[color:var(--color-background)] shadow-[0_10px_30px_-10px_rgba(33,20,6,0.35)]">
              <span
                aria-hidden
                className="mt-0.5 inline-flex shrink-0 h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-accent)] text-[color:var(--color-background)] text-[13px] font-semibold"
              >
                ●
              </span>
              <p className="text-[14.5px] sm:text-[15px] leading-[1.55]">
                <span className="font-semibold">Garantie jour J.</span>{" "}
                Votre application fonctionne le soir de votre événement —
                ou notre équipe corrige en temps réel, sur place ou en astreinte serveur dédiée. Contractuel.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ember group"
              >
                Réserver 30 minutes
                <span aria-hidden className="arrow-nudge">→</span>
              </a>
              <a href={BRIEF_URL} className="btn-outline group">
                Décrire mon projet
                <span aria-hidden className="arrow-nudge opacity-60">→</span>
              </a>
            </div>
            <a
              href="#realisations"
              className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)] transition-colors"
            >
              <span>Voir d&apos;abord les réalisations</span>
              <span aria-hidden className="arrow-nudge opacity-60">↓</span>
            </a>
          </div>

          <div className="lg:col-span-5">
            <HeroLiveMockup />
          </div>
        </motion.div>

        {/* Signal items — full-width differentiation strip */}
        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mt-14 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 pt-10 border-t border-[color:var(--color-border)]"
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
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-20 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--color-muted-foreground)]"
        >
          <span className="h-px w-10 bg-[color:var(--color-border-strong)]" />
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
        <span className="font-mono text-[10.5px] text-[color:var(--color-muted-foreground)] tabular">
          {index}
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[color:var(--color-muted-foreground)]">
          {label}
        </span>
      </div>
      <span className="text-[15px] font-medium text-[color:var(--color-foreground)] leading-tight">
        {value}
      </span>
    </li>
  );
}

