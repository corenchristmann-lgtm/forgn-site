"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { GLYPH_MAP, type DomaineNum } from "./domaines/DomainGlyphs";

interface Domaine {
  num: DomaineNum;
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

function DomainCard({ domaine, index }: { domaine: Domaine; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const Glyph = GLYPH_MAP[domaine.num];

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), {
    stiffness: 180,
    damping: 22,
  });

  const spotlightX = useTransform(mouseX, (v) => `${v * 100}%`);
  const spotlightY = useTransform(mouseY, (v) => `${v * 100}%`);

  const spotlightColor = domaine.accent
    ? "rgba(255,241,234,0.22)"
    : "rgba(255,107,53,0.22)";

  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${spotlightX} ${spotlightY}, ${spotlightColor}, transparent 62%)`;

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.a
      ref={cardRef}
      href="#contact"
      aria-label={`${domaine.title} — discuter de ce terrain (${domaine.scope})`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.23, 1, 0.32, 1],
      }}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden ${domaine.span ?? ""} ${
        domaine.accent ? "ember-block p-8 md:p-10" : "card p-7 md:p-8"
      } min-h-[300px] flex flex-col will-change-transform`}
    >
      {/* Cursor-reactive heat spotlight */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: spotlight }}
      />

      {/* Big background number — "01" etc. — goes ember on hover */}
      <span
        aria-hidden
        className={`absolute -top-4 right-6 font-display font-semibold leading-none pointer-events-none select-none text-[96px] sm:text-[108px] tracking-[-0.05em] transition-colors duration-500 ${
          domaine.accent
            ? "text-[rgba(255,250,240,0.14)] group-hover:text-[rgba(255,250,240,0.28)]"
            : "text-[color:var(--forge-ash)] group-hover:text-[color:var(--forge-ember)]/40"
        }`}
        style={{ transform: "translateZ(10px)" }}
      >
        {domaine.num}
      </span>

      {/* Accent card grain + corner glow */}
      {domaine.accent && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-grain opacity-35 pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[color:var(--forge-gold)]/18 blur-3xl pointer-events-none"
          />
        </>
      )}

      <div
        className={`relative flex items-center justify-between mb-10 ${
          domaine.accent ? "text-white/75" : "text-[color:var(--forge-mist)]"
        }`}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] tabular">
          {domaine.num}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
          {domaine.scope}
        </span>
      </div>

      <div
        className="relative flex-1 flex flex-col"
        style={{ transform: "translateZ(20px)" }}
      >
        <h3
          className={`display text-[24px] md:text-[28px] leading-[1.05] mb-3 ${
            domaine.accent ? "text-white" : "text-[color:var(--forge-bone)]"
          }`}
        >
          {domaine.title}
        </h3>
        <p
          className={`text-[14.5px] leading-relaxed max-w-[42ch] ${
            domaine.accent ? "text-white/85" : "text-[color:var(--forge-mist)]"
          }`}
        >
          {domaine.summary}
        </p>

        <div className="mt-auto pt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className={`inline-flex items-center justify-center h-10 w-10 rounded-xl border transition-all duration-300 ${
                domaine.accent
                  ? "border-white/30 text-white group-hover:text-[color:var(--forge-gold)]"
                  : "border-[color:var(--forge-ash)] text-[color:var(--forge-mist)] group-hover:border-[color:var(--forge-ember)] group-hover:text-[color:var(--forge-ember)]"
              }`}
            >
              <Glyph className="h-[18px] w-[18px]" />
            </span>
            <span
              className={`text-[13px] font-medium ${
                domaine.accent ? "text-white" : "text-[color:var(--forge-bone)]"
              }`}
            >
              Discuter de ce terrain
            </span>
          </div>
          <span
            aria-hidden
            className={`inline-flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 ${
              domaine.accent
                ? "border-white/30 text-white bg-white/10 group-hover:bg-white group-hover:text-[color:var(--forge-ember)]"
                : "border-[color:var(--forge-ash)] text-[color:var(--forge-mist)] group-hover:bg-[color:var(--forge-ember)] group-hover:text-[color:var(--forge-void)] group-hover:border-[color:var(--forge-ember)]"
            }`}
          >
            <span className="arrow-nudge">→</span>
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Domaines() {
  return (
    <section
      id="domaines"
      className="relative py-28 sm:py-36 bg-[color:var(--forge-void)]"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-dots opacity-30 pointer-events-none"
      />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end mb-14"
        >
          <div className="md:col-span-7">
            <div className="eyebrow mb-6">Domaines · Ce que nous forgeons</div>
            <h2 className="display text-[clamp(2.2rem,6vw,4.75rem)] text-[color:var(--forge-bone)] max-w-[14ch]">
              Six terrains.{" "}
              <span className="metal-italic">Aucun gabarit.</span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-[17px] leading-relaxed text-[color:var(--forge-mist)] max-w-[42ch]">
              Chaque domaine est un point de départ, jamais une livraison. Nous
              partons de votre besoin — pas d&apos;un gabarit.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 [perspective:1200px]">
          {domaines.map((d, i) => (
            <DomainCard key={d.num} domaine={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
