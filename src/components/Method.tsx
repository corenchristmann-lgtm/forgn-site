"use client";

import { motion } from "motion/react";

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
  return (
    <section id="methode" className="relative py-28 sm:py-36 overflow-hidden">
      {/* Soft dot backdrop */}
      <div className="absolute inset-0 bg-dots opacity-60 pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-[1240px]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end mb-16"
        >
          <div className="md:col-span-7">
            <div className="eyebrow mb-6">Méthode · Comment nous livrons</div>
            <h2 className="display text-[clamp(2.2rem,6vw,4.75rem)] text-[color:var(--color-foreground)] max-w-[18ch]">
              Du brief au{" "}
              <span className="display-italic text-[color:var(--color-accent)]">
                jour J
              </span>
              , en quatre temps serrés.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-[17px] leading-relaxed text-[color:var(--color-muted-foreground)] max-w-[42ch]">
              Chaque temps a sa livrable, sa durée, sa sortie de piste.
              Vous savez en permanence où vous en êtes — et vous pouvez sortir à la fin de chaque temps.
            </p>
          </div>
        </motion.div>

        {/* Steps — editorial rows with connector line */}
        <div className="relative">
          {/* Vertical progress line on desktop */}
          <div
            aria-hidden
            className="hidden md:block absolute left-[72px] top-4 bottom-4 w-px bg-[color:var(--color-border)]"
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
                className="group relative grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10 py-10 md:py-12 border-b border-[color:var(--color-border)] last:border-0 first:pt-0 hover:bg-[color:var(--color-muted)]/40 transition-colors duration-300 px-2 -mx-2 rounded-2xl"
              >
                {/* Number badge */}
                <div className="md:col-span-2 flex items-start md:items-center gap-4">
                  <div className="relative flex items-center justify-center h-14 w-14 rounded-2xl bg-[color:var(--color-background)] border border-[color:var(--color-border)] shadow-[var(--shadow-sm)]">
                    <span className="font-display text-[18px] tabular text-[color:var(--color-foreground)]">
                      {step.num}
                    </span>
                    {i === 0 && (
                      <span
                        aria-hidden
                        className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[color:var(--color-accent)] shadow-[0_0_12px_var(--color-accent-glow)]"
                      />
                    )}
                  </div>
                  <div className="md:hidden font-mono text-[11px] uppercase tracking-[0.1em] text-[color:var(--color-muted-foreground)]">
                    {step.phase}
                  </div>
                </div>

                {/* Phase label */}
                <div className="hidden md:block md:col-span-2 pt-3.5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-muted-foreground)]">
                    {step.phase}
                  </span>
                </div>

                {/* Title + desc */}
                <div className="md:col-span-5">
                  <h3 className="display text-[26px] md:text-[30px] text-[color:var(--color-foreground)] leading-[1.05] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[color:var(--color-muted-foreground)] max-w-[50ch]">
                    {step.desc}
                  </p>
                </div>

                {/* Right meta — duration + deliverable */}
                <div className="md:col-span-3 flex md:flex-col md:items-end gap-4 md:gap-3 md:pt-3">
                  <div className="flex md:flex-col md:items-end gap-1">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--color-muted-foreground)]">
                      Durée
                    </span>
                    <span className="font-display text-[18px] text-[color:var(--color-foreground)] tabular">
                      {step.duration}
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className="hidden md:block h-px w-10 bg-[color:var(--color-border-strong)] my-1"
                  />
                  <div className="flex md:flex-col md:items-end gap-1">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--color-muted-foreground)]">
                      Livrable
                    </span>
                    <span className="text-[14px] text-[color:var(--color-foreground)] md:text-right">
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
