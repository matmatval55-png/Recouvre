"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProfilExpediteur() {
  const [nom, setNom] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setNom(data.user?.user_metadata?.display_name ?? "");
    });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.auth.updateUser({ data: { display_name: nom } });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <form
      onSubmit={handleSave}
      className="bg-white border border-ink/10 rounded-md p-4 mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-end"
    >
      <div className="flex-1 w-full">
        <label className="block text-sm font-semibold text-ink mb-1">
          Nom affiché à vos clients dans les relances
        </label>
        <input
          type="text"
          placeholder="Ex. Jean Dupont, ou Atelier Dupont"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full rounded-md border border-ink/20 px-3 py-2"
        />
      </div>
      <button
        type="submit"
        disabled={saving}
        className="rounded-md bg-ink text-paper font-semibold px-4 py-2 disabled:opacity-60"
      >
        {saved ? "Enregistré !" : saving ? "..." : "Enregistrer"}
      </button>
    </form>
  );
}
