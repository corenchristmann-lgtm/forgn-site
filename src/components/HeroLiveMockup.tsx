"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

interface Candidate {
  name: string;
  color: string;
  final: number;
}

const CANDIDATES: Candidate[] = [
  { name: "Projet Atlas", color: "var(--color-accent)", final: 48 },
  { name: "Projet Vega", color: "#c78050", final: 37 },
  { name: "Projet Lumen", color: "#6b665c", final: 25 },
];

const TOTAL_FINAL = CANDIDATES.reduce((acc, c) => acc + c.final, 0);
const TOTAL_CAPACITY = 112;
const LOOP_DURATION_MS = 8000;
const RESET_PAUSE_MS = 1600;

export default function HeroLiveMockup() {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [now, setNow] = useState("20:42:18");

  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(1);
      return;
    }

    let rafId: number;
    let start: number | null = null;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const cyclePosition = elapsed % (LOOP_DURATION_MS + RESET_PAUSE_MS);
      const p =
        cyclePosition < LOOP_DURATION_MS
          ? easeOutCubic(cyclePosition / LOOP_DURATION_MS)
          : 1;
      setProgress(p);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setNow(
        `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
      );
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  const totalVotes = Math.round(TOTAL_FINAL * progress);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="relative w-full max-w-[420px] mx-auto lg:mx-0"
      aria-hidden
    >
      {/* Ambient accent glow */}
      <div
        className="absolute -inset-8 rounded-[32px] bg-[color:var(--color-accent)] opacity-[0.14] blur-3xl pointer-events-none"
      />

      {/* Device frame */}
      <div className="relative rounded-[28px] bg-[color:var(--color-ink)] p-3 shadow-[0_30px_80px_-20px_rgba(33,20,6,0.45),0_8px_20px_-4px_rgba(33,20,6,0.2),inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="relative rounded-[20px] bg-[color:var(--color-ink)] overflow-hidden border border-white/5">
          {/* Screen content */}
          <div className="relative bg-gradient-to-br from-[#141210] via-[#1a1714] to-[#141210] px-6 pt-6 pb-7">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-live)]">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-live)] opacity-60 animate-ping" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                  Soirée pitch · Live
                </span>
              </div>
              <span className="font-mono text-[10px] text-white/50 tabular">
                {now}
              </span>
            </div>

            {/* Headline */}
            <div className="mb-6">
              <div className="text-white text-[13px] font-medium mb-1">
                Votez pour votre projet coup de cœur
              </div>
              <div className="text-white/50 text-[11px]">
                Résultats dévoilés sur scène à 20:55
              </div>
            </div>

            {/* Candidate bars */}
            <div className="space-y-3.5">
              {CANDIDATES.map((c, i) => {
                const votes = Math.round(c.final * progress);
                const widthPct = (votes / TOTAL_FINAL) * 100;
                return (
                  <div key={c.name}>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-white text-[12.5px] font-medium">
                        {c.name}
                      </span>
                      <span
                        className="font-mono text-[12px] tabular"
                        style={{ color: c.color }}
                      >
                        {votes}
                      </span>
                    </div>
                    <div className="relative h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          background: c.color,
                          width: `${widthPct}%`,
                          boxShadow: `0 0 12px ${c.color}`,
                          transition: "width 240ms cubic-bezier(0.23,1,0.32,1)",
                        }}
                        initial={false}
                      />
                    </div>
                    {i === 0 && (
                      <span className="mt-1 inline-flex items-center gap-1 text-[9.5px] text-[color:var(--color-accent-soft)] font-mono uppercase tracking-[0.1em]">
                        <span className="h-1 w-1 rounded-full bg-[color:var(--color-accent)]" />
                        En tête
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer — total votes + capacity */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-baseline justify-between">
              <div>
                <div className="text-white/50 text-[10px] uppercase tracking-[0.1em] font-mono">
                  Votants
                </div>
                <div className="text-white font-display text-[22px] tabular leading-none mt-1">
                  {totalVotes}
                  <span className="text-white/40 text-[14px]"> / {TOTAL_CAPACITY}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/50 text-[10px] uppercase tracking-[0.1em] font-mono">
                  Fenêtre
                </div>
                <div className="text-[color:var(--color-accent-soft)] font-display text-[22px] tabular leading-none mt-1">
                  {formatTimeLeft(progress)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating caption */}
      <div className="mt-4 flex items-center gap-2 justify-center lg:justify-start">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-muted-foreground)]">
          Aperçu — simulation vote live
        </span>
      </div>
    </motion.div>
  );
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function formatTimeLeft(progress: number): string {
  const secondsLeft = Math.max(0, Math.round((1 - progress) * 11 * 60));
  const m = Math.floor(secondsLeft / 60);
  const s = secondsLeft % 60;
  return `${pad(m)}:${pad(s)}`;
}
