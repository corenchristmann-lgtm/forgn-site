"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "forgn-theme";

function readStoredTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setMounted(true);
    setTheme(readStoredTheme());
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage quota or privacy-mode errors.
    }
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      aria-pressed={isDark}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)] hover:bg-[color:var(--color-subtle)] transition-colors"
      suppressHydrationWarning
    >
      <span className="sr-only">
        {isDark ? "Mode sombre activé" : "Mode clair activé"}
      </span>
      {/* Sun / Moon icons cross-fade */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
        className="relative"
        aria-hidden
      >
        {mounted && isDark ? (
          <path
            d="M15.5 12.5A6 6 0 0 1 7.5 4.5a.75.75 0 0 0-.98-.98 7.5 7.5 0 1 0 9.96 9.96.75.75 0 0 0-.98-.98Z"
            fill="currentColor"
          />
        ) : (
          <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="10" cy="10" r="3.25" fill="currentColor" stroke="none" />
            <line x1="10" y1="2" x2="10" y2="4" />
            <line x1="10" y1="16" x2="10" y2="18" />
            <line x1="2" y1="10" x2="4" y2="10" />
            <line x1="16" y1="10" x2="18" y2="10" />
            <line x1="4.3" y1="4.3" x2="5.7" y2="5.7" />
            <line x1="14.3" y1="14.3" x2="15.7" y2="15.7" />
            <line x1="4.3" y1="15.7" x2="5.7" y2="14.3" />
            <line x1="14.3" y1="5.7" x2="15.7" y2="4.3" />
          </g>
        )}
      </svg>
    </button>
  );
}
