const STEPS = [
  {
    num: "01",
    title: "Appel découverte",
    desc: "30 minutes pour cartographier vos process, identifier les tâches les plus coûteuses, et chiffrer le gain.",
  },
  {
    num: "02",
    title: "Conception sur mesure",
    desc: "On construit votre système d'automatisation. Pas de template générique — chaque workflow est adapté à vos outils et votre logique métier.",
  },
  {
    num: "03",
    title: "Livraison & formation",
    desc: "Le système est déployé, testé en conditions réelles. Vous êtes formé en visio. Monitoring et alertes inclus.",
  },
  {
    num: "04",
    title: "Support & évolutions",
    desc: "Maintenance continue, ajustements selon vos retours, nouvelles automatisations quand vous êtes prêt.",
  },
];

export default function Method() {
  return (
    <section id="methode" className="px-6 py-24 sm:py-32 bg-bg-raised">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-violet-light uppercase tracking-wider">
            La méthode
          </span>
          <h2 className="font-[var(--font-outfit)] text-3xl sm:text-4xl font-bold tracking-[-1px] mt-4">
            Un process simple, des résultats immédiats
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="rounded-xl border border-[rgba(139,92,246,0.1)] bg-bg-card p-8 hover:border-[rgba(139,92,246,0.25)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="font-[var(--font-outfit)] text-3xl font-extrabold text-violet/30">
                {step.num}
              </span>
              <h3 className="font-[var(--font-outfit)] text-lg font-semibold mt-3 mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
