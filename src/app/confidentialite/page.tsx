import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de forgn.dev — données collectées, finalités, sous-traitants, durée de conservation, droits RGPD.",
  robots: { index: true, follow: false },
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <LegalShell
      eyebrow="Protection des données · RGPD"
      title="Politique de confidentialité."
      lastUpdated="18 avril 2026"
    >
      <section>
        <h2>En bref</h2>
        <p>
          Nous collectons le moins de données possible. Le site ne dépose aucun
          cookie publicitaire ni traqueur tiers invasif. Les seuls outils
          tiers utilisés servent à mesurer la qualité de service et à traiter
          vos demandes de contact.
        </p>
      </section>

      <section>
        <h2>Responsable du traitement</h2>
        <p>
          Forgn, éditeur du site{" "}
          <a href="https://forgn.dev">forgn.dev</a>, agit en qualité de
          responsable du traitement au sens du Règlement Général sur la
          Protection des Données (RGPD, UE 2016/679).
        </p>
        <p>
          Contact pour toute demande relative à vos données :{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>

      <section>
        <h2>Données que nous traitons</h2>
        <h3>Lorsque vous naviguez sur forgn.dev</h3>
        <ul>
          <li>
            <strong>Mesure d&apos;audience anonyme</strong> — via Vercel
            Analytics et Vercel Speed Insights, sans cookie. Pages vues, durée
            de session agrégée, performances techniques (Core Web Vitals).
          </li>
          <li>
            <strong>Analyse comportementale anonyme</strong> — via Microsoft
            Clarity (enregistrements de sessions et heatmaps). Clarity ne
            collecte pas de données permettant de vous identifier
            personnellement lorsque configuré avec le masquage par défaut.
          </li>
        </ul>

        <h3>Lorsque vous prenez contact</h3>
        <ul>
          <li>
            <strong>Via Cal.com / Calendly</strong> (prise de rendez-vous) :
            vos nom, email, créneaux choisis et réponses aux questions de
            qualification.
          </li>
          <li>
            <strong>Via email direct</strong> : toute information que vous
            communiquez spontanément.
          </li>
          <li>
            <strong>Via un formulaire de brief</strong> (Tally.so) : les
            informations projet que vous renseignez librement.
          </li>
        </ul>

        <h3>Lorsque vous préférez le thème sombre</h3>
        <p>
          Un <em>localStorage</em> technique (<code>forgn-theme</code>)
          enregistre votre préférence d&apos;affichage clair ou sombre
          localement dans votre navigateur. Il n&apos;est ni lu ni transmis à
          Forgn ni à un tiers.
        </p>
      </section>

      <section>
        <h2>Finalités &amp; base légale</h2>
        <table>
          <thead>
            <tr>
              <th>Finalité</th>
              <th>Base légale</th>
              <th>Durée</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mesure d&apos;audience et amélioration du site</td>
              <td>Intérêt légitime</td>
              <td>25 mois (Clarity) / 13 mois (Vercel)</td>
            </tr>
            <tr>
              <td>Traitement de vos demandes de contact</td>
              <td>Mesures précontractuelles</td>
              <td>3 ans après dernier contact</td>
            </tr>
            <tr>
              <td>Respect d&apos;obligations comptables et légales</td>
              <td>Obligation légale</td>
              <td>10 ans (pièces comptables)</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Sous-traitants</h2>
        <p>Nous nous appuyons sur les sous-traitants suivants :</p>
        <ul>
          <li>
            <strong>Vercel Inc.</strong> — hébergement du site, mesure
            d&apos;audience technique.
          </li>
          <li>
            <strong>Microsoft Corporation (Clarity)</strong> — analyse
            comportementale anonyme.
          </li>
          <li>
            <strong>Cal.com / Calendly LLC</strong> — prise de rendez-vous en
            ligne.
          </li>
          <li>
            <strong>Google LLC (Google Fonts)</strong> — service de polices
            vectorielles.
          </li>
          <li>
            <strong>Tally Technologies</strong> — le cas échéant, formulaires
            de contact.
          </li>
          <li>
            <strong>Resend / similaire</strong> — le cas échéant, envoi
            d&apos;emails transactionnels.
          </li>
        </ul>
        <p>
          Certains de ces sous-traitants sont établis en dehors de
          l&apos;Union européenne. Les transferts sont encadrés par les
          Clauses Contractuelles Types adoptées par la Commission européenne
          et/ou les adéquations UE-US applicables.
        </p>
      </section>

      <section>
        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
          rectification, d&apos;effacement, de limitation, d&apos;opposition
          et de portabilité de vos données. Vous pouvez également retirer à
          tout moment un consentement donné.
        </p>
        <p>
          Pour exercer ces droits, adressez un email à{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Nous vous
          répondrons dans un délai d&apos;un mois.
        </p>
        <p>
          En cas de désaccord, vous avez le droit d&apos;introduire une
          réclamation auprès de l&apos;Autorité de protection des données
          (Belgique) — <a
            href="https://www.autoriteprotectiondonnees.be"
            target="_blank"
            rel="noopener noreferrer"
          >
            autoriteprotectiondonnees.be
          </a>{" "}
          — ou auprès de la CNIL (France) —{" "}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            cnil.fr
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          Le site forgn.dev ne dépose aucun cookie publicitaire ni de suivi.
          Les seules données stockées localement concernent votre préférence
          de thème d&apos;affichage (<code>localStorage</code>), qui reste
          exclusivement dans votre navigateur.
        </p>
      </section>

      <section>
        <h2>Évolution de la présente politique</h2>
        <p>
          Cette politique peut évoluer pour refléter des changements
          techniques ou réglementaires. La date de dernière mise à jour est
          indiquée en tête de page. Toute modification substantielle sera
          portée à votre connaissance par un bandeau visible sur le site.
        </p>
      </section>
    </LegalShell>
  );
}
