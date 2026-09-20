import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Footer from "../components/Footer";
import DeconnexionButton from "../components/DeconnexionButton";
import GestionFactures from "../components/GestionFactures";

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
      <main className="flex-1 px-6 py-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between mb-8">
          <p className="text-sm text-ink/60">{user.email}</p>
          <DeconnexionButton />
        </div>
        <GestionFactures />
      </main>
      <Footer />
    </div>
  );
}
