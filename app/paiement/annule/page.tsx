import Link from "next/link";
import Footer from "../../components/Footer";

export default function PaiementAnnule() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-bold text-ink mb-2">
          Paiement annulé
        </h1>
        <p className="text-ink/70 max-w-sm mb-6">
          Aucun montant n'a été débité. Vous pouvez réessayer quand vous
          voulez.
        </p>
        <Link
          href="/#tarif"
          className="inline-flex items-center justify-center rounded-lg bg-ink px-6 py-3 font-semibold text-paper"
        >
          Retour à la page d'accueil
        </Link>
      </main>
      <Footer />
    </div>
  );
}
