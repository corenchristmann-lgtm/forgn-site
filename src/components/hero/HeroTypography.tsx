"use client";

import { motion, useReducedMotion } from "motion/react";

export default function HeroTypography() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {/* SVG filter chain — metal heat distortion for the headline */}
      <svg
        aria-hidden
        className="absolute w-0 h-0 overflow-hidden pointer-events-none"
      >
        <defs>
          <filter id="metal-heat" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.018"
              numOctaves="2"
              seed="7"
              result="noise"
            >
              {!prefersReducedMotion && (
                <animate
                  attributeName="baseFrequency"
                  dur="11s"
                  values="0.012 0.018;0.022 0.026;0.012 0.018"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        className="display text-[clamp(3rem,9vw,8rem)] leading-[0.97] tracking-[-0.03em] max-w-[18ch] text-[color:var(--forge-bone)]"
        style={{ filter: "url(#metal-heat)" }}
      >
        Les applications
        <br />
        que vos <span className="metal-italic">événements</span>
        <br />
        <span className="relative inline-block">
          méritent.
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.95,
              delay: 0.95,
              ease: [0.77, 0, 0.175, 1],
            }}
            className="absolute -bottom-2 left-0 h-[6px] w-full origin-left rounded-full bg-[color:var(--forge-ember)] shadow-[0_0_28px_var(--forge-ember)]"
          />
        </span>
      </motion.h1>
    </>
  );
}
