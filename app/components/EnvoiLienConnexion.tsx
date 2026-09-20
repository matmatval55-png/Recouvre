"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function EnvoiLienConnexion({ email }: { email: string }) {
  const [status, setStatus] = useState<"envoi" | "envoye" | "erreur">(
    "envoi"
  );

  useEffect(() => {
    const supabase = createClient();
    supabase.auth
      .signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      .then(({ error }) => {
        setStatus(error ? "erreur" : "envoye");
      });
  }, [email]);

  if (status === "envoi") {
    return <p className="text-ink/50 text-sm mt-4">Envoi du lien en cours…</p>;
  }

  if (status === "erreur") {
    return (
      <p className="text-rust text-sm mt-4">
        L'envoi automatique a échoué. Allez sur la page de connexion et
        entrez votre email pour recevoir un lien.
      </p>
    );
  }

  return (
    <p className="text-ink/70 text-sm mt-4">
      Un lien de connexion vient d'être envoyé à <strong>{email}</strong>.
      Cliquez dessus pour accéder à votre compte.
    </p>
  );
}
