import Footer from "./components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 py-4 flex items-center justify-between max-w-4xl mx-auto w-full border-b border-ink/10">
        <span className="font-serif font-bold text-ink text-lg">Recouvre</span>
        <Link
          href="/login"
          className="text-sm font-semibold text-ink border border-ink/20 rounded-md px-4 py-2"
        >
          Se connecter
        </Link>
      </header>
      <main className="flex-1">
        {/* Hero */}
        <section className="px-6 pt-14 pb-10 max-w-lg mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-rust font-semibold mb-4">
            Recouvre
          </p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-ink leading-tight text-balance">
            Vos clients ne paient pas ?
            <br />
            On les relance à votre place, jusqu'à la mise en demeure.
          </h1>
          <p className="mt-5 text-base text-ink/70">
            En France, une facture impayée depuis plus de 90 jours a moins de
            50&nbsp;% de chances d'être récupérée. Chaque jour d'attente réduit
            vos chances.
          </p>
          <a
            href="#tarif"
            className="mt-8 inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-ink px-8 py-4 text-base font-semibold text-paper"
          >
            Essayer Recouvre — 29&nbsp;€/mois
          </a>
        </section>

        {/* Bénéfices */}
        <section className="px-6 py-10 bg-white border-y border-ink/10">
          <div className="max-w-lg mx-auto space-y-8">
            <div>
              <h2 className="font-serif font-bold text-ink text-lg">
                Relances automatiques à J+7, J+15, J+30
              </h2>
              <p className="text-ink/70 mt-1">
                Vous n'avez plus à écrire, ni à vous en souvenir. Recouvre
                envoie les relances à votre place, au bon moment.
              </p>
            </div>
            <div>
              <h2 className="font-serif font-bold text-ink text-lg">
                Lettre de mise en demeure prête à envoyer
              </h2>
              <p className="text-ink/70 mt-1">
                Si la relance ne suffit pas, la lettre officielle est déjà
                rédigée. Vous n'avez plus qu'à l'envoyer.
              </p>
            </div>
            <div>
              <h2 className="font-serif font-bold text-ink text-lg">
                Une vue claire de votre trésorerie
              </h2>
              <p className="text-ink/70 mt-1">
                Dû, relancé, encaissé : un seul tableau, en euros, pour savoir
                où vous en êtes.
              </p>
            </div>
          </div>
        </section>

        {/* Tarif / CTA final */}
        <section id="tarif" className="px-6 py-14 max-w-lg mx-auto text-center">
          <h2 className="font-serif text-2xl font-bold text-ink">29&nbsp;€/mois</h2>
          <p className="text-ink/70 mt-2">Factures illimitées. Sans engagement.</p>
          <a
            href="/api/checkout"
            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-rust px-8 py-4 text-base font-semibold text-white"
          >
            Essayer Recouvre
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
