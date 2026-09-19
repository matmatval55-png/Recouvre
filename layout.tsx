import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
