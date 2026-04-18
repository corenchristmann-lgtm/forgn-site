import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

const SITE_URL = "https://forgn.dev";
const SITE_NAME = "Forgn";
const TITLE =
  "Forgn — Agence d'apps sur-mesure pour événements · Livrées jour J";
const DESCRIPTION =
  "Agence basée à Liège. Applications sur-mesure pour incubateurs, écoles entrepreneuriales et agences événementielles. Livrées en 2 à 4 semaines. Garantie jour J contractuelle.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Forgn",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "agence application sur-mesure",
    "application événement",
    "vote live événement",
    "app compagnon événement",
    "gamification événement",
    "matching networking",
    "dashboard écran scène",
    "agence développement Liège",
    "agence développement Belgique",
    "incubateur application",
    "école entrepreneuriale app",
    "chèques entreprises Wallonie numérique",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_BE",
    alternateLocale: ["fr_FR"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  foundingDate: "2024",
  areaServed: [
    { "@type": "Country", name: "Belgique" },
    { "@type": "Country", name: "France" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Liège",
    addressRegion: "Wallonie",
    addressCountry: "BE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@forgn.dev",
    availableLanguage: ["fr"],
  },
  sameAs: ["https://www.linkedin.com/company/forgn/"],
};

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}#business`,
  name: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  priceRange: "€€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Liège",
    addressRegion: "Wallonie",
    postalCode: "4000",
    addressCountry: "BE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.6326,
    longitude: 5.5797,
  },
  areaServed: ["BE", "FR"],
  serviceType: [
    "Développement d'applications sur-mesure",
    "Application de vote live pour événements",
    "Application compagnon d'événement",
    "Gamification et engagement événementiel",
    "Application de matching et networking",
    "Dashboard et écran de scène",
    "Application d'inscription et gestion participants",
  ],
  knowsLanguage: ["fr"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('forgn-theme');if(s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
        <a href="#main" className="skip-link">
          Aller au contenu principal
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
        />
        {children}
      </body>
    </html>
  );
}
