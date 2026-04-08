const METRICS = [
  { value: "48h", label: "Délai de livraison" },
  { value: "10-20h/mois", label: "Temps récupéré" },
  { value: "15×", label: "ROI moyen" },
];

export default function ProofBand() {
  return (
    <section className="border-y border-[rgba(139,92,246,0.1)] bg-bg-raised">
      <div className="mx-auto max-w-4xl px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-[rgba(139,92,246,0.1)]">
        {METRICS.map((m) => (
          <div key={m.label} className="text-center">
            <div className="font-[var(--font-outfit)] text-3xl sm:text-4xl font-bold text-amber mb-2">
              {m.value}
            </div>
            <div className="text-sm text-text-muted">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
