const CASES = [
  {
    tag: "Content",
    title: "Un article → 3 formats en 30 secondes",
    desc: "Votre article de blog est automatiquement décliné en post LinkedIn, thread Twitter et email newsletter par l'IA. Vous relisez, vous publiez.",
    result: "12h/mois récupérées",
  },
  {
    tag: "Reporting",
    title: "Rapports clients générés le lundi matin",
    desc: "Les données Google Analytics, réseaux sociaux et Ads sont compilées automatiquement chaque semaine dans un Google Slides prêt à envoyer.",
    result: "2 jours/mois récupérés",
  },
  {
    tag: "Leads",
    title: "Leads dans le CRM en 30 secondes",
    desc: "Les formulaires de vos clients alimentent le CRM automatiquement. Chaque lead est enrichi, scoré et notifié au commercial — sans copier-coller.",
    result: "5h/semaine récupérées",
  },
];

export default function UseCases() {
  return (
    <section id="usecases" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-violet-light uppercase tracking-wider">
            Cas d&apos;usage
          </span>
          <h2 className="font-[var(--font-outfit)] text-3xl sm:text-4xl font-bold tracking-[-1px] mt-4">
            Ce que Forgn automatise pour vous
          </h2>
          <p className="text-text-muted mt-4">
            Des systèmes concrets pour des problèmes concrets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASES.map((c) => (
            <div
              key={c.tag}
              className="group relative rounded-xl border border-[rgba(139,92,246,0.1)] bg-bg-card overflow-hidden hover:border-[rgba(139,92,246,0.25)] hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Top bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="p-8">
                <span className="inline-block rounded-md bg-violet/10 px-3 py-1 text-xs font-medium text-violet-light mb-4">
                  {c.tag}
                </span>
                <h3 className="font-[var(--font-outfit)] text-lg font-semibold mb-3">
                  {c.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed mb-6">
                  {c.desc}
                </p>
                <p className="text-sm font-medium text-amber">
                  &#x26A1; {c.result}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
