"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CALENDLY_URL } from "@/lib/constants";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const finalCtaInView = useRef(false);

  useEffect(() => {
    const heroThreshold = 400;

    const onScroll = () => {
      if (finalCtaInView.current) {
        setVisible(false);
        return;
      }
      setVisible(window.scrollY > heroThreshold);
    };

    const contactSection = document.getElementById("contact");
    let observer: IntersectionObserver | undefined;
    if (contactSection) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            finalCtaInView.current = entry.isIntersecting;
            if (entry.isIntersecting) setVisible(false);
            else onScroll();
          }
        },
        { rootMargin: "0px 0px -20% 0px" }
      );
      observer.observe(contactSection);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="md:hidden fixed bottom-4 left-4 right-4 z-40"
          role="complementary"
          aria-label="Accès rapide à la prise de contact"
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 h-14 px-5 rounded-full bg-[color:var(--color-foreground)] text-[color:var(--color-background)] shadow-[0_14px_40px_-10px_rgba(33,20,6,0.4),inset_0_1px_0_rgba(255,250,240,0.1)]"
          >
            <span className="flex items-center gap-2.5">
              <span className="relative inline-flex items-center justify-center h-6 w-6 rounded-full bg-[color:var(--color-accent)]">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              </span>
              <span className="text-[14.5px] font-medium">
                Réserver 30 minutes
              </span>
            </span>
            <span
              aria-hidden
              className="text-[color:var(--color-accent-soft)] text-[18px]"
            >
              →
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
