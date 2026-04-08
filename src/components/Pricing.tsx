const CALENDLY_URL =
  "https://calendly.com/corenchristmann/appel-decouverte-forgn-30-min";

interface Plan {
  name: string;
  tagline: string;
  price: string;
  maintenance: string;
  features: string[];
  featured?: boolean;
  badge?: string;
}

const PLANS: Plan[] = [
  {
    name: "Content Machine",
    tagline: "Un article de blog → 3 formats IA automatiquement",
    price: "800€",
    maintenance: "Maintenance optionnelle : 80€/mois",
    features: [
      "Webhook WordPress/Ghost/CMS",
      "3 formats IA (LinkedIn, Twitter, Newsletter)",
      "Google Sheets planning",
      "Error handling + alertes",
      "Formation visio 30 min",
    ],
  },
  {
    name: "Report Pilot",
    tagline: "Rapport client compilé et envoyé automatiquement",
    price: "1 500€",
    maintenance: "Maintenance incluse : 120€/mois",
    featured: true,
    badge: "Populaire",
    features: [
      "Sources : Analytics + Réseaux sociaux + Ads",
      "Google Slides auto-généré",
      "Envoi hebdo ou mensuel",
      "Error handling avancé + monitoring",
      "Formation visio 30 min",
      "1 itération d'ajustement incluse",
    ],
  },
  {
    name: "Lead Router",
    tagline: "Leads du site client → CRM enrichi en 30 sec",
    price: "600€",
    maintenance: "Maintenance optionnelle : 60€/mois",
    features: [
      "Multi-sources (formulaires, ads, réseaux)",
      "Dedup + enrichissement",
      "CRM sync (HubSpot, Pipedrive, Notion)",
      "Notification Slack/email",
      "Error handling + retry",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="tarifs" className="px-6 py-24 sm:py-32 bg-bg-raised">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-violet-light uppercase tracking-wider">
            Tarifs
          </span>
          <h2 className="font-[var(--font-outfit)] text-3xl sm:text-4xl font-bold tracking-[-1px] mt-4">
            Un investissement, pas un coût
          </h2>
          <p className="text-text-muted mt-4">
            Chaque système se rembourse en moins d&apos;un mois.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-8 flex flex-col transition-all duration-300 hover:-translate-y-0.5 ${
                plan.featured
                  ? "border-violet/40 bg-[rgba(124,58,237,0.06)]"
                  : "border-[rgba(139,92,246,0.1)] bg-bg-card hover:border-[rgba(139,92,246,0.25)]"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet px-4 py-1 text-xs font-medium text-white">
                  {plan.badge}
                </span>
              )}

              <h3 className="font-[var(--font-outfit)] text-xl font-bold">
                {plan.name}
              </h3>
              <p className="text-sm text-text-muted mt-2 mb-6">
                {plan.tagline}
              </p>

              <div className="mb-1">
                <span className="font-[var(--font-outfit)] text-3xl font-extrabold">
                  {plan.price}
                </span>
                <span className="text-text-dim text-sm ml-2">one-shot</span>
              </div>
              <p className="text-xs text-text-dim mb-8">{plan.maintenance}</p>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-text-muted"
                  >
                    <span className="text-violet-light mt-0.5 shrink-0">
                      &#x2713;
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                  plan.featured
                    ? "bg-violet text-white hover:bg-violet-light"
                    : "border border-[rgba(139,92,246,0.25)] text-text-main hover:border-[rgba(139,92,246,0.5)]"
                }`}
              >
                Réserver un appel
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
