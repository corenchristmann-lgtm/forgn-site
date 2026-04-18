"use client";

import { motion } from "motion/react";
import { CALENDLY_URL } from "@/lib/constants";

export default function PricingBridge() {
  return (
    <section
      aria-label="Budget et prochaine étape"
      className="relative py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] shadow-[var(--shadow-sm)]"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-dots opacity-40 pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[color:var(--color-accent)] opacity-[0.08] blur-3xl pointer-events-none"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-10 lg:p-14">
            {/* Left — price ladder */}
            <div className="lg:col-span-7">
              <div className="eyebrow mb-5">Budget · Transparence</div>
              <h2 className="display text-[clamp(1.8rem,4.2vw,3rem)] text-[color:var(--color-foreground)] leading-[1.05] max-w-[20ch]">
                De{" "}
                <span className="display-italic text-[color:var(--color-accent)]">
                  8 000
                </span>{" "}
                à{" "}
                <span className="display-italic text-[color:var(--color-accent)]">
                  25 000 €
                </span>
                , par projet.
              </h2>
              <p className="mt-5 text-[16px] sm:text-[17px] leading-relaxed text-[color:var(--color-muted-foreground)] max-w-[52ch]">
                Forfaits fermes, sans TJM affiché. Paiement par phase.
                Sortie possible à la fin de chaque phase.{" "}
                <span className="text-[color:var(--color-foreground)] font-medium">
                  Cadrage de 30 minutes gratuit, sans engagement.
                </span>
              </p>

              {/* Price tiers */}
              <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <PriceTier
                  range="8 — 12 k€"
                  label="Projet simple"
                  detail="1 objet, 2-3 semaines"
                />
                <PriceTier
                  range="12 — 18 k€"
                  label="Projet standard"
                  detail="Flux complet, 3-4 semaines"
                  highlight
                />
                <PriceTier
                  range="18 — 25 k€"
                  label="Projet complexe"
                  detail="Multi-rôles, 4-5 semaines"
                />
              </dl>
            </div>

            {/* Right — CTA + Wallonie signal */}
            <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-[color:var(--color-border)]">
              <div className="flex flex-col gap-5">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ember group justify-center"
                >
                  Réserver 30 minutes
                  <span aria-hidden className="arrow-nudge">→</span>
                </a>

                <div className="rounded-2xl bg-[color:var(--color-muted)]/60 border border-[color:var(--color-border)] p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      aria-hidden
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--color-live)] text-[color:var(--color-background)] text-[11px] font-semibold"
                    >
                      €
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--color-muted-foreground)]">
                      Subvention Wallonie
                    </span>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-[color:var(--color-foreground)]">
                    Chèques-Entreprises transformation numérique —{" "}
                    <span className="font-medium">jusqu&apos;à 50% du projet</span>{" "}
                    cofinancé pour les entreprises wallonnes éligibles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PriceTier({
  range,
  label,
  detail,
  highlight = false,
}: {
  range: string;
  label: string;
  detail: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-1.5 p-4 rounded-xl border transition-colors ${
        highlight
          ? "border-[color:var(--color-accent)]/40 bg-[color:var(--color-accent)]/[0.06]"
          : "border-[color:var(--color-border)] bg-[color:var(--color-muted)]/40"
      }`}
    >
      <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--color-muted-foreground)]">
        {label}
      </dt>
      <dd className="font-display text-[20px] tabular text-[color:var(--color-foreground)] leading-none">
        {range}
      </dd>
      <dd className="text-[12.5px] text-[color:var(--color-muted-foreground)] leading-tight">
        {detail}
      </dd>
    </div>
  );
}
