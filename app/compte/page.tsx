import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Footer from "../components/Footer";

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
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-sm uppercase tracking-widest text-rust font-semibold mb-4">
          Connecté
        </p>
        <h1 className="text-2xl font-bold text-ink mb-2">
          Bienvenue, {user.email}
        </h1>
        <p className="text-ink/70">
          L'application arrive à l'étape suivante.
        </p>
      </main>
      <Footer />
    </div>
  );
}
