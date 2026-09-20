"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function EnvoiLienConnexion({ email }: { email: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<
    "envoi" | "attente_code" | "verification" | "erreur"
  >("envoi");
  const [code, setCode] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.signInWithOtp({ email }).then(({ error }) => {
      setStatus(error ? "erreur" : "attente_code");
    });
  }, [email]);

  async function handleVerifier(e: React.FormEvent) {
    e.preventDefault();
    setStatus("verification");
    const supabase = createClient();

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });

    if (error) {
      setStatus("attente_code");
    } else {
      router.push("/compte");
      router.refresh();
    }
  }

  if (status === "envoi") {
    return <p className="text-ink/50 text-sm mt-4">Envoi du code en cours…</p>;
  }

  if (status === "erreur") {
    return (
      <p className="text-rust text-sm mt-4">
        L'envoi automatique a échoué. Allez sur la page de connexion pour
        recevoir un code.
      </p>
    );
  }

  return (
    <form onSubmit={handleVerifier} className="mt-6 flex flex-col gap-3 items-center">
      <p className="text-ink/70 text-sm text-center">
        Entrez le code à 6 chiffres envoyé à <strong>{email}</strong> pour
        accéder à votre compte.
      </p>
      <input
        type="text"
        inputMode="numeric"
        required
        placeholder="123456"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full max-w-[200px] rounded-lg border border-ink/20 px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-ink"
      />
      <button
        type="submit"
        disabled={status === "verification" as any}
        className="rounded-lg bg-ink text-paper font-semibold px-6 py-3 disabled:opacity-60"
      >
        Accéder à mon compte
      </button>
    </form>
  );
}
