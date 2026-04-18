import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Informations légales relatives à l'éditeur du site forgn.dev, à l'hébergeur et aux conditions d'utilisation.",
  robots: { index: true, follow: false },
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <LegalShell
      eyebrow="Informations légales"
      title="Mentions légales."
      lastUpdated="18 avril 2026"
    >
      <section>
        <h2>Éditeur</h2>
        <p>
          <strong>Forgn</strong> — agence spécialisée dans la conception et la
          livraison d&apos;applications sur-mesure pour événements et outils
          métier.
        </p>
        <ul>
          <li>Forme juridique : <em>[à compléter]</em></li>
          <li>Numéro BCE : <em>[à compléter]</em></li>
          <li>Numéro de TVA : <em>[à compléter]</em></li>
          <li>Siège : Liège, Belgique</li>
          <li>
            Contact :{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Directeur de la publication</h2>
        <p>
          La direction de la publication est assurée par la structure éditrice
          du site, joignable à <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave
          #4133, Walnut, CA 91789, États-Unis —{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            vercel.com
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble du site — son identité visuelle, sa charte
          typographique, ses textes, ses composants d&apos;interface, son code
          source original et sa structure éditoriale — est la propriété
          exclusive de Forgn, sauf mention contraire explicite.
        </p>
        <p>
          Toute reproduction, représentation, modification ou adaptation
          partielle ou totale, par quelque procédé que ce soit, sans
          l&apos;autorisation écrite préalable de Forgn est strictement
          interdite et susceptible de constituer une contrefaçon.
        </p>
      </section>

      <section>
        <h2>Contenu externe</h2>
        <p>
          Les polices de caractères utilisées (Fraunces, Inter, JetBrains Mono)
          sont servies via Google Fonts. Les icônes vectorielles proviennent de
          dessins originaux réalisés pour Forgn. Les éventuelles illustrations
          SVG décoratives sont produites en interne.
        </p>
      </section>

      <section>
        <h2>Litiges &amp; droit applicable</h2>
        <p>
          Le présent site et son contenu sont régis par le droit belge. Tout
          litige relatif à l&apos;utilisation du site relève de la compétence
          exclusive des tribunaux du ressort de Liège, sous réserve des
          dispositions légales impératives contraires.
        </p>
      </section>

      <section>
        <h2>Signalement</h2>
        <p>
          Pour toute question relative à ces mentions légales ou pour signaler
          un contenu qui vous semblerait inapproprié, contactez{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>
    </LegalShell>
  );
}
