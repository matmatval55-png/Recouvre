"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Footer from "../components/Footer";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [etape, setEtape] = useState<"email" | "code">("email");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function handleEnvoyerCode(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setStatus("error");
    } else {
      setStatus("idle");
      setEtape("code");
    }
  }

  async function handleVerifierCode(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const supabase = createClient();

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });

    if (error) {
      setStatus("error");
    } else {
      router.push("/compte");
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-ink text-center mb-2">
            Connexion
          </h1>

          {etape === "email" ? (
            <>
              <p className="text-ink/70 text-center mb-8">
                Recevez un code de connexion par email, sans mot de passe.
              </p>
              <form
                onSubmit={handleEnvoyerCode}
                className="flex flex-col gap-3"
              >
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
                  {status === "sending" ? "Envoi…" : "Recevoir le code"}
                </button>
                {status === "error" && (
                  <p className="text-rust text-sm text-center">
                    Une erreur est survenue. Réessayez.
                  </p>
                )}
              </form>
            </>
          ) : (
            <>
              <p className="text-ink/70 text-center mb-8">
                Entrez le code à 6 chiffres envoyé à <strong>{email}</strong>.
                Il est valable 20 minutes.
              </p>
              <form
                onSubmit={handleVerifierCode}
                className="flex flex-col gap-3"
              >
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full rounded-lg border border-ink/20 px-4 py-3 text-ink bg-white text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-ink"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-lg bg-ink px-6 py-3 font-semibold text-paper disabled:opacity-60"
                >
                  {status === "sending" ? "Vérification…" : "Se connecter"}
                </button>
                {status === "error" && (
                  <p className="text-rust text-sm text-center">
                    Code incorrect ou expiré. Réessayez.
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
