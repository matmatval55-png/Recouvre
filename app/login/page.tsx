"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setStatus(error ? "error" : "sent");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-ink text-center mb-2">
            Connexion
          </h1>
          <p className="text-ink/70 text-center mb-8">
            Recevez un lien de connexion par email, sans mot de passe.
          </p>

          {status === "sent" ? (
            <p className="text-center text-ink bg-white border border-ink/10 rounded-lg p-4">
              Email envoyé à <strong>{email}</strong>. Cliquez sur le lien
              qu'il contient pour vous connecter.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                required
                placeholder="vous@exemple.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-ink/20 px-4 py-3 text-ink bg-white focus:outline-none focus:ring-2 focus:ring-ink"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-lg bg-ink px-6 py-3 font-semibold text-paper disabled:opacity-60"
              >
                {status === "sending"
                  ? "Envoi en cours…"
                  : "Recevoir le lien de connexion"}
              </button>
              {status === "error" && (
                <p className="text-rust text-sm text-center">
                  Une erreur est survenue. Réessayez.
                </p>
              )}
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
