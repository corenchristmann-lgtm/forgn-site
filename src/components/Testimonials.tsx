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
              className="relative p-7 md:p-8 rounded-2xl bg-[color:var(--color-background)] border border-[color:var(--color-border)] shadow-[var(--shadow-sm)] flex flex-col"
            >
              <span
                aria-hidden
                className="font-display text-[72px] leading-none text-[color:var(--color-accent)]/30 absolute top-4 left-6 select-none"
              >
                &ldquo;
              </span>
              <blockquote className="relative pt-6 text-[15px] sm:text-[15.5px] leading-[1.6] text-[color:var(--color-foreground)] flex-1">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-[color:var(--color-border)]">
                <div className="text-[13.5px] font-medium text-[color:var(--color-foreground)]">
                  {t.author}
                </div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="text-[12px] text-[color:var(--color-muted-foreground)]">
                    {t.context}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[color:var(--color-muted-foreground)] tabular">
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
