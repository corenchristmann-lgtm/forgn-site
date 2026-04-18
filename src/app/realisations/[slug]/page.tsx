import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CASE_STUDIES,
  getCaseStudy,
  listCaseStudySlugs,
  type CaseStudy,
} from "@/data/case-studies";
import {
  BRIEF_URL,
  CALENDLY_URL,
  CONTACT_EMAIL,
  SITE_URL,
} from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return listCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};
  return {
    title: caseStudy.title,
    description: caseStudy.metaDescription,
    alternates: { canonical: `/realisations/${caseStudy.slug}` },
    openGraph: {
      title: `${caseStudy.title} · Forgn`,
      description: caseStudy.metaDescription,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caseStudy.title,
    description: caseStudy.metaDescription,
    author: {
      "@type": "Organization",
      name: "Forgn",
      url: SITE_URL,
    },
    dateCreated: caseStudy.year,
    about: caseStudy.sector,
    url: `${SITE_URL}/realisations/${caseStudy.slug}`,
  };

  const related = CASE_STUDIES.filter((c) => c.slug !== caseStudy.slug).slice(
    0,
    2
  );

  return (
    <main
      id="main"
      className="relative pt-28 sm:pt-36 pb-24 min-h-screen bg-mesh-warm"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[45vh] bg-editorial-grid opacity-[0.35] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-[color:var(--color-accent)] opacity-[0.1] blur-3xl pointer-events-none"
      />

      <article className="relative mx-auto max-w-[920px] px-4 sm:px-6">
        {/* Back link */}
        <Link
          href="/#realisations"
          className="inline-flex items-center gap-2 text-[13px] text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)] transition-colors mb-10"
        >
          <span aria-hidden>←</span>
          <span>Toutes les réalisations</span>
        </Link>

        {/* Hero */}
        <header className="mb-14 sm:mb-20">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="chip chip-ember">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent-deep)]" />
              {caseStudy.tag}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-muted-foreground)] tabular">
              {caseStudy.year}
            </span>
          </div>
          <h1 className="display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] max-w-[22ch] text-[color:var(--color-foreground)]">
            {caseStudy.title}
          </h1>
          <p className="mt-7 text-[19px] sm:text-[20px] leading-[1.55] text-[color:var(--color-foreground)]/85 max-w-[58ch]">
            {caseStudy.lede}
          </p>

          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[color:var(--color-border)]">
            <MetaItem label="Secteur" value={caseStudy.sector} />
            <MetaItem label="Durée" value={caseStudy.duration} />
            <MetaItem label="Budget" value={caseStudy.budget} />
            <MetaItem label="Échéance" value={caseStudy.deadline} />
          </dl>
        </header>

        {/* Audience */}
        <Section eyebrow="Audience" title="À qui s'adressait l'application.">
          <p>{caseStudy.audience}</p>
        </Section>

        {/* Challenges */}
        <Section
          eyebrow="Défis"
          title="Ce qu'il fallait résoudre."
        >
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {caseStudy.challenges.map((c) => (
              <li
                key={c}
                className="relative pl-6 text-[15.5px] leading-[1.6] text-[color:var(--color-foreground)]"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-[0.65em] h-[7px] w-[7px] rounded-full bg-[color:var(--color-accent)]"
                />
                {c}
              </li>
            ))}
          </ul>
        </Section>

        {/* Phases */}
        <Section
          eyebrow="Process"
          title="Comment nous avons avancé."
        >
          <ol className="space-y-8 mt-4">
            {caseStudy.phases.map((p, i) => (
              <li
                key={p.title}
                className="relative pl-14 sm:pl-16 pb-8 border-b border-[color:var(--color-border)] last:border-0"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 inline-flex items-center justify-center h-11 w-11 rounded-2xl bg-[color:var(--color-background)] border border-[color:var(--color-border)] shadow-[var(--shadow-sm)] font-display text-[15px] tabular text-[color:var(--color-foreground)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[22px] sm:text-[24px] leading-[1.1] text-[color:var(--color-foreground)] mb-2">
                  {p.title}
                </h3>
                <p className="text-[15.5px] leading-[1.65] text-[color:var(--color-muted-foreground)] max-w-[62ch]">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Stack */}
        <Section eyebrow="Stack" title="Technologies mobilisées.">
          <ul className="flex flex-wrap gap-2 mt-3">
            {caseStudy.stack.map((tech) => (
              <li
                key={tech}
                className="inline-flex items-center gap-2 px-3 h-8 rounded-full bg-[color:var(--color-muted)] border border-[color:var(--color-border)] text-[13px] text-[color:var(--color-foreground)]"
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]"
                />
                {tech}
              </li>
            ))}
          </ul>
        </Section>

        {/* Outcomes — hero metrics */}
        <section className="my-20 sm:my-24 p-8 sm:p-12 rounded-3xl ink-block relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-grain opacity-50 pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[color:var(--color-accent)] opacity-40 blur-3xl pointer-events-none"
          />
          <div className="relative">
            <div className="eyebrow eyebrow-light mb-5 text-white/60">
              Résultats mesurés
            </div>
            <h2 className="display text-[clamp(1.8rem,4vw,2.8rem)] text-white leading-[1.05] max-w-[22ch] mb-10">
              Ce qui a été livré — en chiffres.
            </h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10">
              {caseStudy.outcomes.map((o) => (
                <div key={o.label}>
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/60 mb-2">
                    {o.label}
                  </dt>
                  <dd className="font-display text-[36px] sm:text-[42px] tabular text-white leading-none">
                    {o.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Day of witness */}
        <Section
          eyebrow="Le jour J"
          title="Ce qui s'est passé pour de vrai."
        >
          <p className="text-[16.5px] leading-[1.65] text-[color:var(--color-foreground)] italic">
            « {caseStudy.dayOfWitness} »
          </p>
        </Section>

        {/* Testimonial */}
        {caseStudy.testimonialQuote ? (
          <figure className="my-16 p-8 sm:p-10 rounded-3xl bg-[color:var(--color-background)] border border-[color:var(--color-border)] shadow-[var(--shadow-sm)]">
            <span
              aria-hidden
              className="font-display text-[72px] leading-none text-[color:var(--color-accent)]/40 block mb-2"
            >
              &ldquo;
            </span>
            <blockquote className="text-[17px] sm:text-[18px] leading-[1.65] text-[color:var(--color-foreground)]">
              {caseStudy.testimonialQuote}
            </blockquote>
            <figcaption className="mt-6 pt-5 border-t border-[color:var(--color-border)] text-[13.5px] text-[color:var(--color-muted-foreground)]">
              {caseStudy.testimonialAuthor}
            </figcaption>
          </figure>
        ) : null}

        {/* CTA */}
        <section className="my-16 sm:my-20">
          <div className="p-8 sm:p-10 rounded-3xl bg-[color:var(--color-muted)]/60 border border-[color:var(--color-border)]">
            <h2 className="display text-[clamp(1.6rem,3.5vw,2.4rem)] leading-[1.05] text-[color:var(--color-foreground)] max-w-[22ch] mb-4">
              Un événement, une date, une idée d&apos;app ?
            </h2>
            <p className="text-[15.5px] text-[color:var(--color-muted-foreground)] max-w-[56ch] mb-6">
              30 minutes suffisent pour cadrer — nous vous disons si nous
              pouvons livrer avant votre date, et si nous sommes faits pour
              travailler ensemble.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ember group"
              >
                Réserver 30 minutes
                <span aria-hidden className="arrow-nudge">→</span>
              </a>
              <Link href={BRIEF_URL} className="btn-outline group">
                Décrire mon projet
                <span aria-hidden className="arrow-nudge opacity-60">→</span>
              </Link>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Question%20sur%20le%20case%20study%20${encodeURIComponent(caseStudy.tag)}`}
                className="link-quiet text-[14.5px] flex items-center"
              >
                Question sur ce case study ?
              </a>
            </div>
          </div>
        </section>

        {/* Related cases */}
        {related.length > 0 ? (
          <section className="mt-20 pt-10 border-t border-[color:var(--color-border)]">
            <div className="eyebrow mb-6">
              Continuer · Autres réalisations
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((r) => (
                <RelatedCard key={r.slug} caseStudy={r} />
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="my-14 sm:my-16">
      <div className="eyebrow mb-5">{eyebrow}</div>
      <h2 className="display text-[clamp(1.7rem,3.8vw,2.6rem)] leading-[1.05] text-[color:var(--color-foreground)] max-w-[22ch] mb-6">
        {title}
      </h2>
      <div className="prose-case text-[color:var(--color-foreground)]">
        {children}
      </div>
    </section>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[color:var(--color-muted-foreground)]">
        {label}
      </dt>
      <dd className="text-[14px] font-medium text-[color:var(--color-foreground)] leading-snug">
        {value}
      </dd>
    </div>
  );
}

function RelatedCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link
      href={`/realisations/${caseStudy.slug}`}
      className="group block p-6 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] hover:border-[color:var(--color-foreground)]/40 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="chip">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
          {caseStudy.tag}
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[color:var(--color-muted-foreground)] tabular">
          {caseStudy.year}
        </span>
      </div>
      <h3 className="display text-[19px] leading-[1.15] text-[color:var(--color-foreground)] mb-2 group-hover:text-[color:var(--color-accent-deep)] transition-colors">
        {caseStudy.title}
      </h3>
      <p className="text-[13.5px] text-[color:var(--color-muted-foreground)]">
        Lire le case study
        <span aria-hidden className="ml-1 arrow-nudge">→</span>
      </p>
    </Link>
  );
}
