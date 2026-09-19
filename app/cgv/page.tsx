import Footer from "../components/Footer";

export default function CGV() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 px-6 py-14 max-w-2xl mx-auto text-ink">
        <h1 className="text-2xl font-bold mb-6">
          Conditions générales de vente
        </h1>

        <section className="space-y-6 text-ink/80">
          <div>
            <h2 className="font-semibold text-ink mb-1">1. Objet</h2>
            <p>
              Les présentes conditions régissent la vente de l'abonnement au
              service Recouvre, édité par [À COMPLÉTER — raison sociale],
              accessible à l'adresse recouvre.app (ou le domaine que vous
              choisirez).
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-ink mb-1">2. Le service</h2>
            <p>
              Recouvre permet la saisie de factures impayées, l'envoi de
              relances automatiques et la génération d'une lettre de mise en
              demeure.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-ink mb-1">3. Prix et paiement</h2>
            <p>
              L'abonnement est facturé 29&nbsp;€ TTC par mois, sans
              engagement de durée, prélevé automatiquement via Stripe.
              [À COMPLÉTER si vous êtes en franchise de TVA : « TVA non
              applicable, art. 293 B du CGI »]
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-ink mb-1">
              4. Résiliation
            </h2>
            <p>
              L'abonnement peut être résilié à tout moment, prenant effet à
              la fin de la période déjà payée. [À COMPLÉTER — indiquez ici
              comment le client peut résilier, ex. lien vers le portail
              client Stripe ou une adresse email]
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-ink mb-1">
              5. Droit de rétractation
            </h2>
            <p>
              Conformément à l'article L221-28 du Code de la consommation, le
              droit de rétractation ne s'applique pas aux services pleinement
              exécutés avant la fin du délai de rétractation avec l'accord du
              client.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
