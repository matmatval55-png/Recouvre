import Link from "next/link";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-sm uppercase tracking-widest text-rust font-semibold mb-4">
          404
        </p>
        <h1 className="text-2xl font-bold text-ink mb-2">
          Cette page n'existe pas
        </h1>
        <p className="text-ink/70 mb-6 max-w-sm">
          Le lien que vous avez suivi est peut-être incorrect, ou la page a
          été déplacée.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-ink px-6 py-3 font-semibold text-paper"
        >
          Retour à l'accueil
        </Link>
      </main>
      <Footer />
    </div>
  );
}
