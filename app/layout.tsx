import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recouvre — Relancez vos factures impayées automatiquement",
  description:
    "Recouvre relance vos clients qui n'ont pas payé, jusqu'à la mise en demeure. Zéro gêne, zéro oubli.",
  openGraph: {
    title: "Recouvre — Relancez vos factures impayées automatiquement",
    description:
      "Recouvre relance vos clients qui n'ont pas payé, jusqu'à la mise en demeure. Zéro gêne, zéro oubli.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="ledger-bar" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
