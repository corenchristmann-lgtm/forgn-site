import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-var",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://forgn.dev"),
  title: "Forgn — Automatisation sur mesure pour agences marketing",
  description:
    "Forgn conçoit des systèmes d'automatisation sur mesure pour les agences marketing. Vos tâches répétitives deviennent des machines fiables — en 48h.",
  openGraph: {
    title: "Forgn — Automatisation sur mesure pour agences marketing",
    description:
      "Des systèmes qui travaillent pendant que vous dormez. Automatisations sur mesure en 48h.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
