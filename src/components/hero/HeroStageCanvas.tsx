"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import HeroStageFallback from "./HeroStageFallback";
import HeroStageScene from "./HeroStageScene";

export default function HeroStageCanvas() {
  const prefersReducedMotion = useReducedMotion();
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (typeof window === "undefined") return;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const smallScreen = window.matchMedia("(max-width: 767px)").matches;
    if (coarsePointer || smallScreen) return;
    setCanRender3D(true);
  }, [prefersReducedMotion]);

  if (!canRender3D) return <HeroStageFallback />;

  return (
    <div className="relative w-full aspect-square max-w-[520px] mx-auto lg:mx-0">
      <div
        aria-hidden
        className="absolute inset-0 rounded-[32px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 65%, rgba(255,107,53,0.18) 0%, transparent 60%)",
        }}
      />
      <Canvas
        orthographic
        camera={{ zoom: 78, position: [0, 0, 10], near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <HeroStageScene />
        </Suspense>
      </Canvas>
      <p className="absolute bottom-3 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--forge-mist)] pointer-events-none">
        Aperçu — simulation vote live · WebGL
      </p>
    </div>
  );
}
