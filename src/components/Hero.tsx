const CALENDLY_URL =
  "https://calendly.com/corenchristmann/appel-decouverte-forgn-30-min";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Glow */}
      <div className="glow-violet absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-block rounded-full border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.08)] px-4 py-1.5 text-sm text-violet-glow mb-8">
          L&apos;automaticien des agences marketing
        </div>

        {/* H1 */}
        <h1 className="font-[var(--font-outfit)] text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-[-2px] mb-6">
          Des systèmes qui travaillent
          <br />
          <span className="text-gradient-hero">pendant que vous dormez</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Forgn conçoit des automatisations sur mesure pour les agences
          marketing. Vos tâches répétitives deviennent des machines fiables
          — en 48h.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-violet px-8 py-3.5 text-base font-medium text-white hover:bg-violet-light transition-colors"
          >
            Réserver un appel découverte &rarr;
          </a>
          <a
            href="#methode"
            className="rounded-lg border border-[rgba(139,92,246,0.25)] px-8 py-3.5 text-base font-medium text-text-main hover:border-[rgba(139,92,246,0.5)] transition-colors"
          >
            Comment ça marche &darr;
          </a>
        </div>
      </div>
    </section>
  );
}
