"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const largeScreen = window.matchMedia("(min-width: 1024px)").matches;
    if (!finePointer || !largeScreen) return;
    setEnabled(true);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;
    const el = cursorRef.current;
    if (!el) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let posX = mouseX;
    let posY = mouseY;

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      setHovering(Boolean(target.closest(INTERACTIVE_SELECTOR)));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    let rafId = 0;
    const tick = () => {
      posX += (mouseX - posX) * 0.18;
      posY += (mouseY - posY) * 0.18;
      el.style.transform = `translate3d(${posX - 12}px, ${posY - 12}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    document.body.classList.add("cursor-none");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
      document.body.classList.remove("cursor-none");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className={`custom-cursor fixed top-0 left-0 z-[100] pointer-events-none transition-[width,height,background-color] duration-200 ease-out ${
        hovering ? "h-10 w-10 bg-[color:var(--forge-ember)]" : "h-6 w-6"
      }`}
      style={{ willChange: "transform" }}
    />
  );
}
