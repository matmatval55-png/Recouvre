import Footer from "../components/Footer";

export default function MentionsLegales() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 px-6 py-14 max-w-2xl mx-auto text-ink">
        <h1 className="text-2xl font-bold mb-6">Mentions légales</h1>

        <section className="space-y-4 text-ink/80">
          <p>
            <strong>Éditeur du site :</strong> [À COMPLÉTER — raison sociale,
            ex. « Jean Dupont, Micro-entrepreneur »]
          </p>
          <p>
            <strong>SIRET :</strong> [À COMPLÉTER une fois votre inscription
            micro-entrepreneur validée]
          </p>
          <p>
            <strong>Adresse :</strong> [À COMPLÉTER — adresse de
            l'entreprise]
          </p>
          <p>
            <strong>Email de contact :</strong> [À COMPLÉTER]
          </p>
          <p>
            <strong>Hébergeur :</strong> Vercel Inc., 340 S Lemon Ave #4133,
            Walnut, CA 91789, États-Unis.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
