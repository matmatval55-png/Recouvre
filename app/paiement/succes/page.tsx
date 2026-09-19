import { stripe } from "@/lib/stripe";
import Link from "next/link";
import Footer from "../../components/Footer";

export default async function PaiementSucces({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;

  let paid = false;
  let email: string | null = null;

  if (sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      paid = session.payment_status === "paid";
      email = session.customer_details?.email ?? null;
    } catch {
      paid = false;
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {paid ? (
          <>
            <p className="text-sm uppercase tracking-widest text-rust font-semibold mb-4">
              Paiement confirmé
            </p>
            <h1 className="text-2xl font-bold text-ink mb-2">Merci !</h1>
            <p className="text-ink/70 max-w-sm">
              Votre abonnement Recouvre est actif
              {email ? ` pour ${email}` : ""}. L'accès à votre compte arrive
              à l'étape suivante du build.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-ink mb-2">
              Vérification en cours
            </h1>
            <p className="text-ink/70 max-w-sm">
              Nous n'avons pas pu confirmer votre paiement. Si l'argent a été
              débité, contactez-nous — sinon,{" "}
              <Link href="/#tarif" className="underline">
                réessayez ici
              </Link>
              .
            </p>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
