interface GlyphProps {
  className?: string;
}

const baseProps = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function GlyphVote({ className }: GlyphProps) {
  return (
    <svg {...baseProps} className={className}>
      <rect x="4" y="18" width="5" height="10" />
      <rect x="13.5" y="12" width="5" height="16" />
      <rect x="23" y="7" width="5" height="21" />
      <path d="M3 4 L6.5 7 L12 2" stroke="var(--forge-ember)" />
    </svg>
  );
}

export function GlyphCompanion({ className }: GlyphProps) {
  return (
    <svg {...baseProps} className={className}>
      <path d="M16 4 L28 9 L28 26 L16 28 L4 23 L4 8 Z" />
      <path d="M16 4 L16 28" />
      <path d="M4 8 L16 13 L28 9" />
      <circle cx="10" cy="16" r="1.5" fill="var(--forge-ember)" stroke="none" />
    </svg>
  );
}

export function GlyphGamification({ className }: GlyphProps) {
  return (
    <svg {...baseProps} className={className}>
      <path d="M10 5 L22 5 L22 13 C22 17 19 19.5 16 19.5 C13 19.5 10 17 10 13 Z" />
      <path d="M10 8 L6.5 8 C4.5 8 4.5 13 7 14" />
      <path d="M22 8 L25.5 8 C27.5 8 27.5 13 25 14" />
      <path d="M13 19.5 L13 23 L19 23 L19 19.5" />
      <rect x="10" y="26" width="12" height="2" />
      <circle cx="16" cy="11" r="1.3" fill="var(--forge-ember)" stroke="none" />
    </svg>
  );
}

export function GlyphMatching({ className }: GlyphProps) {
  return (
    <svg {...baseProps} className={className}>
      <circle cx="6" cy="8" r="3" />
      <circle cx="26" cy="24" r="3" />
      <circle cx="14" cy="18" r="2" fill="var(--forge-ember)" stroke="none" />
      <path
        d="M8.5 10 Q11 18 14 18 Q17 18 23 22"
        strokeDasharray="2 3"
        stroke="var(--forge-ember)"
      />
    </svg>
  );
}

export function GlyphDashboard({ className }: GlyphProps) {
  return (
    <svg {...baseProps} className={className}>
      <rect x="3" y="5" width="26" height="20" rx="2" />
      <path d="M7 19 L11 15 L15 20 L19 10 L25 14" strokeLinecap="round" />
      <circle cx="19" cy="10" r="1.6" fill="var(--forge-ember)" stroke="none" />
      <line x1="6" y1="27" x2="26" y2="27" />
    </svg>
  );
}

export function GlyphInscription({ className }: GlyphProps) {
  return (
    <svg {...baseProps} className={className}>
      <path d="M3 11 L3 4 L10 4" />
      <path d="M22 4 L29 4 L29 11" />
      <path d="M3 21 L3 28 L10 28" />
      <path d="M22 28 L29 28 L29 21" />
      <rect x="11" y="11" width="4" height="4" fill="currentColor" stroke="none" />
      <rect x="17" y="11" width="4" height="4" fill="currentColor" stroke="none" />
      <rect x="11" y="17" width="4" height="4" fill="currentColor" stroke="none" />
      <rect x="17" y="17" width="4" height="4" fill="var(--forge-ember)" stroke="none" />
    </svg>
  );
}

export const GLYPH_MAP = {
  "01": GlyphVote,
  "02": GlyphCompanion,
  "03": GlyphGamification,
  "04": GlyphMatching,
  "05": GlyphDashboard,
  "06": GlyphInscription,
} as const;

export type DomaineNum = keyof typeof GLYPH_MAP;
