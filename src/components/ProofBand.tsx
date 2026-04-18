"use client";

interface ShippedItem {
  type: string;
  metric: string;
  year: string;
}

const SHIPPED: ShippedItem[] = [
  { type: "École de commerce · Award", metric: "110 votes en 11 min", year: "2026" },
  { type: "Incubateur universitaire · Road to Business", metric: "8 équipes · 3 ateliers", year: "2026" },
  { type: "Prix entrepreneurial · Leaderboard live", metric: "60+ projets · écran TV", year: "2025" },
  { type: "Programme alumni · Matching", metric: "41 binômes · 76% actifs", year: "2024" },
  { type: "Convention B2B · Jour J", metric: "Présence contractuelle", year: "2026" },
  { type: "Agence événementielle · App compagnon", metric: "0 bug · 0 downtime", year: "2026" },
];

export default function ProofBand() {
  // Duplicate for seamless loop
  const track = [...SHIPPED, ...SHIPPED];

  return (
    <section
      aria-label="Événements livrés"
      className="relative border-y border-[color:var(--color-border)] bg-[color:var(--color-muted)]/60 py-6 overflow-hidden"
    >
      <div className="mx-auto max-w-[1240px] flex items-center gap-8">
        <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--color-muted-foreground)] pl-2">
          En production —
        </span>

        <div className="marquee flex-1">
          <div className="marquee-track">
            {track.map((item, i) => (
              <div
                key={`${item.type}-${i}`}
                className="flex items-center gap-4 shrink-0"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
                <span className="font-display text-[15px] text-[color:var(--color-foreground)] tracking-tight">
                  {item.type}
                </span>
                <span className="text-[13.5px] text-[color:var(--color-muted-foreground)]">
                  {item.metric}
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[color:var(--color-muted-foreground)] tabular">
                  {item.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
