"use client";

import { motion } from "motion/react";

interface Testimonial {
  quote: string;
  author: string;
  context: string;
  year: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "À 22h15 le serveur a eu un hoquet. Un technicien Forgn était encore en salle avec son laptop ouvert. Trois minutes plus tard, la soirée reprenait sans que personne dans le public ne s'en rende compte.",
    author: "Directrice communication",
    context: "ETI industrielle · Wallonie",
    year: "2026",
  },
  {
    quote:
      "On avait demandé deux devis à des agences belges classiques : 60k€ et 14 semaines. Forgn a livré en trois semaines pour 11k€ — et l'app fonctionnait exactement comme on l'avait dessinée ensemble.",
    author: "Responsable programme incubateur",
    context: "Incubateur universitaire · Belgique",
    year: "2025",
  },
  {
    quote:
      "Zéro bug en live, zéro ticket support post-event. C'est la première fois qu'on vit ça avec un prestataire tech. Je recommande sans hésiter, et on a déjà signé un second projet.",
    author: "Directeur événementiel",
    context: "Agence B2B · France",
    year: "2026",
  },
];

export default function Testimonials() {
  return (
    <section
      aria-label="Ce qu'en disent nos clients"
      className="relative py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 sm:mb-16"
        >
          <div className="eyebrow mb-5">Paroles · Anonymisées par accord client</div>
          <h2 className="display text-[clamp(1.9rem,5vw,3.5rem)] text-[color:var(--color-foreground)] max-w-[22ch] leading-[1.05]">
            Ce que nos clients{" "}
            <span className="display-italic text-[color:var(--color-accent)]">
              racontent
            </span>{" "}
            — quand on les écoute.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.author + t.year}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: 0.1 + i * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="relative overflow-hidden p-7 md:p-8 rounded-2xl bg-[color:var(--forge-steel)] border border-[color:var(--forge-ash)] flex flex-col"
            >
              <span
                aria-hidden
                className="font-display font-semibold italic absolute -top-8 -left-3 leading-none text-[200px] sm:text-[220px] text-[color:var(--forge-ember)]/25 select-none pointer-events-none"
              >
                &ldquo;
              </span>
              <blockquote className="relative z-[1] pt-16 text-[15px] sm:text-[15.5px] leading-[1.65] text-[color:var(--forge-bone)] flex-1">
                {t.quote}
              </blockquote>
              <figcaption className="relative z-[1] mt-6 pt-5 border-t border-[color:var(--forge-ash)]">
                <div className="text-[13.5px] font-medium text-[color:var(--forge-bone)]">
                  {t.author}
                </div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="text-[12px] text-[color:var(--forge-mist)]">
                    {t.context}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[color:var(--forge-mist)] tabular">
                    {t.year}
                  </span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
