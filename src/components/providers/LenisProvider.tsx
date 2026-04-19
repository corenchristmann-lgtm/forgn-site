"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";

function shouldDisableLenis(): boolean {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(pointer: coarse)").matches) return true;
  if (/iP(hone|ad|od)/.test(navigator.userAgent)) return true;
  return false;
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (shouldDisableLenis()) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 0,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
