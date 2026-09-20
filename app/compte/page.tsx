import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Footer from "../components/Footer";
import DeconnexionButton from "../components/DeconnexionButton";
import GestionFactures from "../components/GestionFactures";
import ProfilExpediteur from "../components/ProfilExpediteur";

export default async function Compte() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 py-4 border-b border-ink/10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className="font-serif font-bold text-ink text-lg">Recouvre</span>
          <div className="flex items-center gap-4">
            <p className="text-sm text-ink/60">{user.email}</p>
            <a
              href="/api/portal"
              className="text-sm text-ink/60 underline underline-offset-2"
            >
              Gérer mon abonnement
            </a>
            <DeconnexionButton />
          </div>
        </div>
      </header>
      <main className="flex-1 px-6 py-10">
        <ProfilExpediteur />
        <GestionFactures />
      </main>
      <Footer />
    </div>
  );
}
