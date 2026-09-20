"use client";

import Link from "next/link";
import Footer from "./components/Footer";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-sm uppercase tracking-widest text-rust font-semibold mb-4">
          Erreur
        </p>
        <h1 className="text-2xl font-bold text-ink mb-2">
          Une erreur est survenue
        </h1>
        <p className="text-ink/70 mb-6 max-w-sm">
          Quelque chose s'est mal passé de notre côté. Vous pouvez réessayer,
          ou revenir à l'accueil.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-lg bg-ink px-6 py-3 font-semibold text-paper"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-ink/20 px-6 py-3 font-semibold text-ink"
          >
            Accueil
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
