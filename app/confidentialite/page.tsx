import Footer from "../components/Footer";

export default function Confidentialite() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 px-6 py-14 max-w-2xl mx-auto text-ink">
        <h1 className="text-2xl font-bold mb-6">
          Politique de confidentialité
        </h1>

        <section className="space-y-6 text-ink/80">
          <div>
            <h2 className="font-semibold text-ink mb-1">
              1. Données collectées
            </h2>
            <p>
              Recouvre collecte les données nécessaires au fonctionnement du
              service : votre email, les informations de vos factures
              (montant, échéance, coordonnées de votre client) et les
              informations de paiement, traitées directement par Stripe.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-ink mb-1">
              2. Utilisation des données
            </h2>
            <p>
              Ces données servent uniquement à faire fonctionner le service
              (envoi des relances, génération des lettres, affichage de votre
              tableau de bord). Elles ne sont ni vendues ni partagées à des
              fins publicitaires.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-ink mb-1">
              3. Mesure d'audience
            </h2>
            <p>
              Ce site utilise une mesure d'audience anonyme (sans cookie de
              suivi individuel) pour comprendre combien de visiteurs
              consultent le site. Aucune donnée personnelle n'est collectée à
              cette fin.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-ink mb-1">
              4. Hébergement et sous-traitants
            </h2>
            <p>
              Les données sont hébergées par Supabase (base de données) et
              Vercel (hébergement du site). Les paiements sont traités par
              Stripe. Ces prestataires sont soumis à leurs propres politiques
              de confidentialité.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-ink mb-1">5. Vos droits</h2>
            <p>
              Conformément au RGPD, vous pouvez demander l'accès,
              la rectification ou la suppression de vos données en écrivant
              à [À COMPLÉTER — email de contact].
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
