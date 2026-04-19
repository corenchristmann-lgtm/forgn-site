export default function HeroStageFallback() {
  const sparkPositions = [
    { x: 45, y: 310, r: 1.6 },
    { x: 78, y: 265, r: 1.2 },
    { x: 112, y: 198, r: 1.8 },
    { x: 140, y: 340, r: 1.1 },
    { x: 168, y: 92, r: 1.4 },
    { x: 200, y: 260, r: 1.0 },
    { x: 235, y: 190, r: 1.7 },
    { x: 262, y: 118, r: 1.3 },
    { x: 290, y: 330, r: 1.5 },
    { x: 322, y: 230, r: 1.2 },
    { x: 348, y: 150, r: 1.6 },
    { x: 70, y: 140, r: 1.3 },
    { x: 175, y: 355, r: 1.4 },
    { x: 215, y: 50, r: 1.1 },
    { x: 310, y: 60, r: 1.5 },
  ];

  return (
    <div className="relative w-full aspect-square max-w-[520px] mx-auto lg:mx-0">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 65%, rgba(255,107,53,0.22) 0%, rgba(255,107,53,0.05) 35%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />
      <svg
        viewBox="0 0 400 400"
        className="relative w-full h-full"
        role="img"
        aria-label="Simulation d'un écran de scène affichant un vote live"
      >
        <defs>
          <linearGradient id="bar-atlas" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#cc4b1c" />
            <stop offset="100%" stopColor="#ff6b35" />
          </linearGradient>
          <linearGradient id="bar-vega" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#8b5524" />
            <stop offset="100%" stopColor="#cd7f32" />
          </linearGradient>
          <linearGradient id="bar-lumen" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#a8861e" />
            <stop offset="100%" stopColor="#f4c430" />
          </linearGradient>
          <filter id="bar-glow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Halo */}
        <ellipse
          cx="200"
          cy="210"
          rx="170"
          ry="130"
          fill="#ff6b35"
          opacity="0.18"
        />

        {/* Tilted stage screen */}
        <g transform="translate(200 205) rotate(-5)">
          <rect
            x="-135"
            y="-95"
            width="270"
            height="190"
            rx="10"
            fill="#141210"
            stroke="#2a2a2e"
            strokeWidth="1"
          />
          {/* Screen header lines */}
          <circle cx="-115" cy="-72" r="3" fill="#6fa64d" />
          <rect
            x="-104"
            y="-75"
            width="70"
            height="4"
            rx="1.5"
            fill="#9a9a9e"
            opacity="0.6"
          />
          <rect
            x="90"
            y="-76"
            width="30"
            height="3"
            rx="1"
            fill="#9a9a9e"
            opacity="0.4"
          />

          {/* Vote bars */}
          <g filter="url(#bar-glow)">
            <rect
              x="-92"
              y="-30"
              width="42"
              height="105"
              rx="2"
              fill="url(#bar-atlas)"
            />
            <rect
              x="-22"
              y="0"
              width="42"
              height="75"
              rx="2"
              fill="url(#bar-vega)"
            />
            <rect
              x="48"
              y="18"
              width="42"
              height="57"
              rx="2"
              fill="url(#bar-lumen)"
            />
          </g>

          {/* Labels under bars */}
          <rect
            x="-92"
            y="82"
            width="42"
            height="3"
            rx="1"
            fill="#9a9a9e"
            opacity="0.5"
          />
          <rect
            x="-22"
            y="82"
            width="42"
            height="3"
            rx="1"
            fill="#9a9a9e"
            opacity="0.5"
          />
          <rect
            x="48"
            y="82"
            width="42"
            height="3"
            rx="1"
            fill="#9a9a9e"
            opacity="0.5"
          />
        </g>

        {/* Static sparks */}
        {sparkPositions.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#f4c430"
            opacity={0.55}
          />
        ))}
      </svg>
      <p className="absolute bottom-3 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--forge-mist)] pointer-events-none">
        Aperçu — simulation vote live
      </p>
    </div>
  );
}
