const PAINS = [
  {
    title: "Contenu décliné à la main",
    desc: "Chaque article de blog doit être réécrit pour LinkedIn, Twitter, la newsletter. 45 minutes par article, 4 fois par semaine. 12 heures par mois sur du copier-adapter.",
  },
  {
    title: "Rapports clients interminables",
    desc: "Chaque mois, vous compilez Google Analytics, les stats réseaux sociaux, les résultats Ads dans un Google Slides. 2 heures par client. Avec 8 clients, c'est 2 jours complets.",
  },
  {
    title: "Leads qui refroidissent",
    desc: "Les formulaires de vos clients génèrent des leads, mais ils arrivent dans une boîte email. Le temps que quelqu'un les copie dans le CRM, 24h ont passé. Le prospect a déjà parlé à un concurrent.",
  },
];

export default function Problem() {
  return (
    <section id="probleme" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-violet-light uppercase tracking-wider">
            Le problème
          </span>
          <h2 className="font-[var(--font-outfit)] text-3xl sm:text-4xl font-bold tracking-[-1px] mt-4 max-w-3xl mx-auto">
            Vous perdez des heures sur des tâches qu&apos;un système ferait en
            30 secondes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PAINS.map((pain) => (
            <div
              key={pain.title}
              className="rounded-xl border border-[rgba(139,92,246,0.1)] bg-bg-card p-8 hover:border-[rgba(139,92,246,0.25)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <h3 className="font-[var(--font-outfit)] text-lg font-semibold mb-4">
                {pain.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {pain.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
