export default function Footer() {
  return (
    <footer className="border-t border-[rgba(139,92,246,0.1)] px-6 py-8">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-dim">
        <p>&copy; 2026 Forgn. Automatisation sur mesure pour agences marketing.</p>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text-muted transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
