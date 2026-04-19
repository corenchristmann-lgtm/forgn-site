"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
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
          className="relative overflow-hidden rounded-3xl border border-[color:var(--forge-ash)] bg-[color:var(--forge-steel)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,250,240,0.03)]"
        >
          {/* Metallic sheen */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[60%] pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,107,53,0.08) 0%, rgba(255,107,53,0.02) 40%, transparent 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-dots opacity-25 pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[color:var(--forge-ember)] opacity-[0.1] blur-3xl pointer-events-none"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-10 lg:p-14">
            <div className="lg:col-span-7">
              <div className="eyebrow mb-5">Budget · Transparence</div>
              <h2 className="display text-[clamp(1.8rem,4.2vw,3rem)] text-[color:var(--forge-bone)] leading-[1.05] max-w-[20ch]">
                De <span className="metal-italic">8 000</span> à{" "}
                <span className="metal-italic">25 000 €</span>, par projet.
              </h2>
              <p className="mt-5 text-[16px] sm:text-[17px] leading-relaxed text-[color:var(--forge-mist)] max-w-[52ch]">
                Forfaits fermes, sans TJM affiché. Paiement par phase. Sortie
                possible à la fin de chaque phase.{" "}
                <span className="text-[color:var(--forge-bone)] font-medium">
                  Cadrage de 30 minutes gratuit, sans engagement.
                </span>
              </p>

              {/* Price tiers — lingots de métal */}
              <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 [perspective:800px]">
                <PriceTier
                  range="8 — 12 k€"
                  label="Projet simple"
                  detail="1 objet · 2-3 semaines"
                  tilt={-4}
                />
                <PriceTier
                  range="12 — 18 k€"
                  label="Projet standard"
                  detail="Flux complet · 3-4 semaines"
                  highlight
                  tilt={0}
                />
                <PriceTier
                  range="18 — 25 k€"
                  label="Projet complexe"
                  detail="Multi-rôles · 4-5 semaines"
                  tilt={4}
                />
              </dl>
            </div>

            <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-[color:var(--forge-ash)]">
              <div className="flex flex-col gap-5">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ember group justify-center"
                >
                  Réserver 30 minutes
                  <span aria-hidden className="arrow-nudge">
                    →
                  </span>
                </a>

                <div className="rounded-2xl bg-[color:var(--forge-void)] border border-[color:var(--forge-ash)] p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      aria-hidden
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--forge-ember)] text-[color:var(--forge-void)] text-[11px] font-semibold shadow-[0_0_10px_var(--forge-ember)]"
                    >
                      €
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--forge-mist)]">
                      Subvention Wallonie
                    </span>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-[color:var(--forge-bone)]">
                    Chèques-Entreprises transformation numérique —{" "}
                    <span className="font-medium">
                      jusqu&apos;à 50% du projet
                    </span>{" "}
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
  tilt = 0,
}: {
  range: string;
  label: string;
  detail: string;
  highlight?: boolean;
  tilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 40%"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 1], [tilt, 0]);
  const translateY = useTransform(scrollYProgress, [0, 1], [12, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateY, y: translateY, transformStyle: "preserve-3d" }}
      className={`relative flex flex-col gap-1.5 p-4 rounded-xl border transition-colors will-change-transform ${
        highlight
          ? "border-[color:var(--forge-ember)]/50 bg-[color:var(--forge-ember)]/[0.08] shadow-[0_0_24px_-8px_var(--forge-ember)]"
          : "border-[color:var(--forge-ash)] bg-[color:var(--forge-void)]"
      }`}
    >
      {/* Metallic sheen on top edge */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[30%] rounded-t-xl pointer-events-none"
        style={{
          background: highlight
            ? "linear-gradient(180deg, rgba(255,107,53,0.25) 0%, transparent 100%)"
            : "linear-gradient(180deg, rgba(245,241,234,0.05) 0%, transparent 100%)",
        }}
      />
      <dt className="relative font-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--forge-mist)]">
        {label}
      </dt>
      <dd className="relative font-display text-[20px] tabular text-[color:var(--forge-bone)] leading-none">
        {range}
      </dd>
      <dd className="relative text-[12.5px] text-[color:var(--forge-mist)] leading-tight">
        {detail}
      </dd>
    </motion.div>
  );
}
