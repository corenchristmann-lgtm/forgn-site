"use client";

import { useState, useEffect } from "react";

const CALENDLY_URL =
  "https://calendly.com/corenchristmann/appel-decouverte-forgn-30-min";

const NAV_LINKS = [
  { label: "Problème", href: "#probleme" },
  { label: "Méthode", href: "#methode" },
  { label: "Cas d'usage", href: "#usecases" },
  { label: "Tarifs", href: "#tarifs" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08070b]/80 backdrop-blur-xl border-b border-[rgba(139,92,246,0.1)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="font-[var(--font-outfit)] text-[22px] font-bold tracking-tight">
          <span className="text-violet-light">F</span>
          <span className="text-text-main">orgn</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-text-main transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-violet px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-light transition-colors"
          >
            Réserver un appel
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className={`block h-0.5 w-6 bg-text-main transition-transform ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-text-main transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-text-main transition-transform ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0f0e14]/95 backdrop-blur-xl border-t border-[rgba(139,92,246,0.1)] px-6 pb-6 pt-4">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-text-muted hover:text-text-main transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-violet px-5 py-3 text-sm font-medium text-white text-center hover:bg-violet-light transition-colors"
            >
              Réserver un appel
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
