import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Déclaration d'accessibilité",
  description:
    "Déclaration d'accessibilité de forgn.dev — conformité WCAG 2.2 AA, European Accessibility Act, mécanisme de retour utilisateur.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/accessibility-statement" },
};

export default function AccessibilityPage() {
  return (
    <LegalShell
      eyebrow="Accessibilité numérique"
      title="Déclaration d'accessibilité."
      lastUpdated="18 avril 2026"
    >
      <section>
        <h2>Engagement</h2>
        <p>
          Forgn s&apos;engage à rendre son site internet{" "}
          <a href="https://forgn.dev">forgn.dev</a> accessible à toutes les
          personnes, indépendamment de leurs capacités, de leur équipement ou
          de leur environnement.
        </p>
        <p>
          La présente déclaration s&apos;applique au site forgn.dev et a été
          établie le <strong>18 avril 2026</strong>.
        </p>
      </section>

      <section>
        <h2>Cadre de référence</h2>
        <p>
          Le site vise la conformité au niveau <strong>AA des Web Content
          Accessibility Guidelines 2.2</strong> (WCAG 2.2) du W3C, tel que
          transposé par le standard européen{" "}
          <abbr title="European Norm">EN</abbr> 301 549 et par l&apos;European
          Accessibility Act (Directive UE 2019/882), d&apos;application à
          partir du 28 juin 2025 pour les nouveaux services numériques
          commerciaux.
        </p>
      </section>

      <section>
        <h2>État de conformité</h2>
        <p>
          Le site est <strong>partiellement conforme</strong> au référentiel
          WCAG 2.2 niveau AA. Cette auto-évaluation a été conduite en interne
          le 18 avril 2026 à l&apos;aide d&apos;outils automatisés
          (axe DevTools, Lighthouse, Accessibility Insights) et de tests
          manuels.
        </p>
      </section>

      <section>
        <h2>Mesures d&apos;accessibilité mises en place</h2>
        <ul>
          <li>
            Structure sémantique HTML5 : <code>&lt;main&gt;</code>,{" "}
            <code>&lt;nav&gt;</code>, <code>&lt;header&gt;</code>,{" "}
            <code>&lt;footer&gt;</code>, <code>&lt;section&gt;</code>,{" "}
            <code>&lt;article&gt;</code>, <code>&lt;address&gt;</code>.
          </li>
          <li>
            Lien d&apos;évitement (<em>skip link</em>) permettant d&apos;aller
            directement au contenu principal.
          </li>
          <li>
            Hiérarchie de titres respectée (un seul <code>h1</code> par page,
            ordre <code>h1 → h2 → h3</code>).
          </li>
          <li>
            Contrastes de texte conformes au niveau AA, et souvent AAA, sur
            fond clair comme sur fond sombre.
          </li>
          <li>
            Prise en charge complète de la navigation clavier, avec indicateur
            de focus visible.
          </li>
          <li>
            Attributs <code>aria-label</code>, <code>aria-controls</code> et{" "}
            <code>aria-expanded</code> sur les composants interactifs non
            textuels.
          </li>
          <li>
            Respect de la préférence <code>prefers-reduced-motion</code> pour
            les personnes sensibles aux animations.
          </li>
          <li>
            Mode sombre disponible et respectant la préférence système.
          </li>
          <li>
            Alternatives textuelles sur toutes les illustrations décoratives
            (<code>aria-hidden</code>) ou explicites (<code>aria-label</code>).
          </li>
        </ul>
      </section>

      <section>
        <h2>Non-conformités et limitations connues</h2>
        <p>
          Les contenus suivants ne sont pas, à ce jour, pleinement
          conformes :
        </p>
        <ul>
          <li>
            Certaines animations au défilement ne proposent pas encore
            d&apos;équivalent totalement statique au-delà de{" "}
            <code>prefers-reduced-motion</code>.
          </li>
          <li>
            Certaines étiquettes typographiques de faible taille (environ
            10,5 — 11&nbsp;px sur les menus mono-espace) sont en cours
            d&apos;augmentation vers un minimum de 12&nbsp;px.
          </li>
        </ul>
        <p>
          Nous planifions la correction de ces points dans les prochaines
          itérations du site.
        </p>
      </section>

      <section>
        <h2>Technologies utilisées pour évaluer l&apos;accessibilité</h2>
        <ul>
          <li>axe DevTools (Deque)</li>
          <li>Lighthouse (Google Chrome)</li>
          <li>Accessibility Insights for Web (Microsoft)</li>
          <li>
            Tests manuels au clavier et avec lecteurs d&apos;écran (NVDA,
            VoiceOver)
          </li>
        </ul>
      </section>

      <section>
        <h2>Mécanisme de retour</h2>
        <p>
          Si vous rencontrez un défaut d&apos;accessibilité vous empêchant
          d&apos;accéder à un contenu ou à une fonctionnalité du site,
          contactez-nous :
        </p>
        <ul>
          <li>
            Par email :{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </li>
        </ul>
        <p>
          Nous accusons réception dans un délai d&apos;un jour ouvré et
          cherchons une solution adaptée, au besoin en vous fournissant
          l&apos;information sous un format alternatif.
        </p>
      </section>

      <section>
        <h2>Voie de recours</h2>
        <p>
          Si la réponse apportée ne vous satisfait pas, vous pouvez saisir
          l&apos;<a
            href="https://www.unia.be"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unia
          </a>{" "}
          (Centre interfédéral pour l&apos;égalité des chances) en Belgique,
          ou le <a
            href="https://www.defenseurdesdroits.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            Défenseur des droits
          </a>{" "}
          en France.
        </p>
      </section>
    </LegalShell>
  );
}
