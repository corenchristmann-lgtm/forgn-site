const CALENDLY_URL =
  "https://calendly.com/corenchristmann/appel-decouverte-forgn-30-min";

export default function FinalCTA() {
  return (
    <section className="relative px-6 py-24 sm:py-32 overflow-hidden">
      {/* Glow */}
      <div className="glow-violet absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="font-[var(--font-outfit)] text-3xl sm:text-4xl font-bold tracking-[-1px] mb-6">
          Prêt à récupérer vos heures perdues ?
        </h2>
        <p className="text-text-muted text-lg mb-10 leading-relaxed">
          Un appel de 30 minutes pour identifier vos tâches les plus coûteuses
          et chiffrer le gain.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-violet px-8 py-4 text-base font-medium text-white hover:bg-violet-light transition-colors"
        >
          Réserver un appel découverte &rarr;
        </a>
      </div>
    </section>
  );
}
