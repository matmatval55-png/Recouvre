import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { texteMiseEnDemeure } from "@/lib/relance-templates";
import Footer from "../../../components/Footer";
import CopierTexte from "../../../components/CopierTexte";

export default async function MiseEnDemeure({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: invoice } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!invoice) notFound();

  const lettre = texteMiseEnDemeure(invoice, user.email!);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-ink mb-2">
          Lettre de mise en demeure
        </h1>
        <p className="text-ink/70 mb-6">
          Complétez les champs entre crochets, puis envoyez cette lettre par
          courrier recommandé avec accusé de réception — c'est ce format qui
          lui donne sa valeur légale.
        </p>
        <div className="bg-white border border-ink/10 rounded-lg p-6 whitespace-pre-wrap text-ink font-mono text-sm mb-4">
          {lettre}
        </div>
        <CopierTexte texte={lettre} />
      </main>
      <Footer />
    </div>
  );
}
