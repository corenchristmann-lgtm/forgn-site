"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface Step {
  num: string;
  phase: string;
  title: string;
  desc: string;
  duration: string;
  deliverable: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    phase: "Cadrage",
    title: "Le brief qui engage.",
    desc:
      "Trente minutes pour comprendre votre événement, votre public, votre scène. On écrit ensemble l'objectif exact, les métriques de succès, la date butoir.",
    duration: "30 min",
    deliverable: "Brief signé",
  },
  {
    num: "02",
    phase: "Conception",
    title: "La maquette qui se défend.",
    desc:
      "Une semaine pour poser le flux. Wireframes cliquables, vocabulaire UI choisi, scénario jour J validé avec vous. On écarte tout ce qui n'est pas essentiel.",
    duration: "1 semaine",
    deliverable: "Prototype navigable",
  },
  {
    num: "03",
    phase: "Forge",
    title: "Le code qui tient.",
    desc:
      "Deux à trois semaines d'atelier. Un référent Forgn, commits quotidiens, démos hebdomadaires. Votre marque, votre code source, votre hébergement.",
    duration: "2 à 3 semaines",
    deliverable: "Application livrée",
  },
  {
    num: "04",
    phase: "Jour J",
    title: "La présence qui change tout.",
    desc:
      "Nous sommes là. En salle, ou en astreinte serveur dédiée. Monitoring, correctifs immédiats, sang-froid contractuel. L'app ne tombe pas.",
    duration: "Jour J",
    deliverable: "Présence sur place",
  },
];

export default function Method() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 45%"],
  });
  const fusionScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="methode"
      className="relative py-28 sm:py-36 overflow-hidden bg-[color:var(--forge-void)]"
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
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end mb-16"
        >
          <div className="md:col-span-7">
            <div className="eyebrow mb-6">Méthode · Comment nous livrons</div>
            <h2 className="display text-[clamp(2.2rem,6vw,4.75rem)] text-[color:var(--forge-bone)] max-w-[18ch]">
              Du brief au{" "}
              <span className="metal-italic">jour J</span>, en quatre temps
              serrés.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-[17px] leading-relaxed text-[color:var(--forge-mist)] max-w-[42ch]">
              Chaque temps a sa livrable, sa durée, sa sortie de piste. Vous
              savez en permanence où vous en êtes — et vous pouvez sortir à la
              fin de chaque temps.
            </p>
          </div>
        </motion.div>

        {/* Steps with forge-fusion progress bar */}
        <div ref={containerRef} className="relative">
          {/* Rail (backdrop) */}
          <div
            aria-hidden
            className="hidden md:block absolute left-[35px] top-6 bottom-6 w-[3px] rounded-full bg-[color:var(--forge-ash)]"
          />
          {/* Fusion fill (scroll-driven, chaud haut -> poli bas) */}
          <motion.div
            aria-hidden
            style={{
              scaleY: fusionScaleY,
              transformOrigin: "top",
              background:
                "linear-gradient(to bottom, var(--forge-ember) 0%, var(--forge-gold) 28%, var(--forge-copper) 55%, color-mix(in oklab, var(--forge-bone) 70%, var(--forge-copper)) 100%)",
              boxShadow:
                "0 0 14px color-mix(in oklab, var(--forge-ember) 60%, transparent)",
            }}
            className="hidden md:block absolute left-[35px] top-6 bottom-6 w-[3px] rounded-full"
          />

          <div className="space-y-0">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="group relative grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10 py-10 md:py-14 border-b border-[color:var(--forge-ash)] last:border-0 first:pt-0"
              >
                {/* Number badge — positioned OVER the fusion bar */}
                <div className="md:col-span-2 flex items-start md:items-center gap-4 relative">
                  <div className="relative flex items-center justify-center h-[72px] w-[72px] shrink-0 rounded-2xl bg-[color:var(--forge-steel)] border border-[color:var(--forge-ash)] shadow-[inset_0_1px_0_rgba(255,250,240,0.04)] z-10">
                    <span className="font-display text-[22px] tabular text-[color:var(--forge-bone)]">
                      {step.num}
                    </span>
                    {i === 0 && (
                      <span
                        aria-hidden
                        className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[color:var(--forge-ember)] shadow-[0_0_14px_var(--forge-ember)]"
                      />
                    )}
                    {i === STEPS.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[color:var(--forge-bone)] shadow-[0_0_10px_var(--forge-bone)]"
                      />
                    )}
                  </div>
                  <div className="md:hidden font-mono text-[11px] uppercase tracking-[0.1em] text-[color:var(--forge-mist)]">
                    {step.phase}
                  </div>
                </div>

                <div className="hidden md:block md:col-span-2 pt-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--forge-mist)]">
                    {step.phase}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <h3 className="display text-[26px] md:text-[32px] text-[color:var(--forge-bone)] leading-[1.05] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[color:var(--forge-mist)] max-w-[50ch]">
                    {step.desc}
                  </p>
                </div>

                <div className="md:col-span-3 flex md:flex-col md:items-end gap-4 md:gap-3 md:pt-4">
                  <div className="flex md:flex-col md:items-end gap-1">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--forge-mist)]">
                      Durée
                    </span>
                    <span className="font-display text-[18px] text-[color:var(--forge-bone)] tabular">
                      {step.duration}
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className="hidden md:block h-px w-10 bg-[color:var(--forge-ash)] my-1"
                  />
                  <div className="flex md:flex-col md:items-end gap-1">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--forge-mist)]">
                      Livrable
                    </span>
                    <span className="text-[14px] text-[color:var(--forge-bone)] md:text-right">
                      {step.deliverable}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
