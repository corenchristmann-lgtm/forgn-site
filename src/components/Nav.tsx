"use client";

import { useEffect, useRef, useState } from "react";
import { AVAILABILITY_LABEL, CALENDLY_URL } from "@/lib/constants";
import ThemeToggle from "./ThemeToggle";

const MOBILE_MENU_ID = "mobile-menu";

const LINKS = [
  { label: "Réalisations", href: "#realisations" },
  { label: "Méthode", href: "#methode" },
  { label: "Domaines", href: "#domaines" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          )[0];
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-center px-3 pt-3 sm:pt-4">
        <nav
          aria-label="Navigation principale"
          className={`flex items-center gap-1 sm:gap-4 h-14 pl-3 pr-2 rounded-full transition-all duration-300 ${
            scrolled
              ? "glass shadow-[0_1px_3px_rgba(33,20,6,0.05),0_12px_32px_-8px_rgba(33,20,6,0.12)]"
              : "bg-[color:var(--color-background)]/40 backdrop-blur-md border border-transparent"
          }`}
        >
          {/* Wordmark */}
          <a
            href="#"
            aria-label="Forgn — retour à l'accueil"
            className="flex items-center gap-2.5 pl-1 pr-2 group"
          >
            <span
              aria-hidden
              className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[color:var(--color-foreground)] shadow-[0_1px_2px_rgba(33,20,6,0.12),inset_0_1px_0_rgba(255,250,240,0.15)]"
            >
              <span className="font-display text-[color:var(--color-background)] text-[13px] font-semibold leading-none -mt-px">
                F
              </span>
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[color:var(--color-accent)] shadow-[0_0_8px_var(--color-accent-glow)]" />
            </span>
            <span className="text-[15.5px] font-medium tracking-tight">
              Forgn
            </span>
          </a>

          {/* Divider */}
          <span aria-hidden className="hidden md:block h-5 w-px bg-[color:var(--color-border)]" />

          {/* Links */}
          <ul className="hidden md:flex items-center gap-0.5" role="list">
            {LINKS.map((l) => {
              const isActive = activeId === l.href.replace("#", "");
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`px-3.5 h-9 inline-flex items-center text-[13.5px] rounded-full transition-all duration-200 ${
                      isActive
                        ? "text-[color:var(--color-foreground)] bg-[color:var(--color-subtle)]"
                        : "text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)] hover:bg-[color:var(--color-subtle)]"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Availability status */}
          <div className="hidden lg:flex items-center gap-2 pl-3 pr-2 h-9 rounded-full bg-[color:var(--color-muted)]/60 border border-[color:var(--color-border)]">
            <span className="live-dot" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[color:var(--color-foreground)]">
              {AVAILABILITY_LABEL}
            </span>
          </div>

          {/* Theme toggle — desktop */}
          <div className="hidden md:inline-flex">
            <ThemeToggle />
          </div>

          {/* CTA */}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden md:inline-flex items-center gap-1.5 h-10 pl-4 pr-3.5 rounded-full bg-[color:var(--color-foreground)] text-[color:var(--color-background)] text-[13.5px] font-medium hover:opacity-95 transition-opacity shadow-[0_2px_6px_rgba(33,20,6,0.2),inset_0_1px_0_rgba(255,250,240,0.1)] active:scale-[0.97]"
            style={{ transition: "background 200ms, transform 140ms cubic-bezier(0.23,1,0.32,1), box-shadow 220ms" }}
          >
            Vérifier les disponibilités
            <span
              aria-hidden
              className="arrow-nudge text-[color:var(--color-accent-soft)]"
            >
              →
            </span>
          </a>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-[color:var(--color-subtle)] transition-colors"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls={MOBILE_MENU_ID}
          >
            <span className="flex flex-col gap-1.5">
              <span
                className={`block h-px w-5 bg-[color:var(--color-foreground)] transition-transform duration-200 ease-out ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-[color:var(--color-foreground)] transition-transform duration-200 ease-out ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id={MOBILE_MENU_ID}
          role="dialog"
          aria-modal="false"
          aria-label="Menu principal"
          className="md:hidden mx-3 mt-2 rounded-3xl glass p-3 shadow-[0_20px_48px_-12px_rgba(33,20,6,0.2)]"
        >
          <ul className="flex flex-col" role="list">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3.5 text-[16px] font-medium text-[color:var(--color-foreground)] hover:bg-[color:var(--color-subtle)] rounded-xl transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[color:var(--color-muted)]">
            <span className="live-dot" />
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[color:var(--color-foreground)]">
              {AVAILABILITY_LABEL}
            </span>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-1.5 h-12 rounded-full bg-[color:var(--color-foreground)] text-[color:var(--color-background)] text-[14.5px] font-medium"
          >
            Vérifier les disponibilités
            <span aria-hidden className="text-[color:var(--color-accent-soft)]">→</span>
          </a>
        </div>
      )}
    </header>
  );
}
