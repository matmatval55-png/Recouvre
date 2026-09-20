"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

type Invoice = {
  id: string;
  client_name: string;
  client_email: string | null;
  amount: number;
  due_date: string;
  status: "due" | "reminded" | "paid";
};

const STATUT_LABEL: Record<Invoice["status"], string> = {
  due: "Dû",
  reminded: "Relancé",
  paid: "Encaissé",
};

function formatEuros(n: number) {
  return n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

export default function GestionFactures() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  const supabase = createClient();

  async function loadInvoices() {
    const { data } = await supabase
      .from("invoices")
      .select("*")
      .order("due_date", { ascending: true });
    setInvoices((data as Invoice[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadInvoices();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaving(false);
      return;
    }

    await supabase.from("invoices").insert({
      user_id: user.id,
      client_name: clientName,
      client_email: clientEmail || null,
      amount: parseFloat(amount),
      due_date: dueDate,
      status: "due",
    });

    setClientName("");
    setClientEmail("");
    setAmount("");
    setDueDate("");
    setSaving(false);
    loadInvoices();
  }

  async function handleStatusChange(id: string, status: Invoice["status"]) {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status } : inv))
    );
    await supabase.from("invoices").update({ status }).eq("id", id);
  }

  const totaux = invoices.reduce(
    (acc, inv) => {
      acc[inv.status] += Number(inv.amount);
      return acc;
    },
    { due: 0, reminded: 0, paid: 0 } as Record<Invoice["status"], number>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Résumé */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-white border border-ink/10 rounded-md p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-ink/50">Dû</p>
          <p className="font-serif text-lg font-bold text-ink mt-1">
            {formatEuros(totaux.due)}
          </p>
        </div>
        <div className="bg-white border border-ink/10 rounded-md p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-ink/50">
            Relancé
          </p>
          <p className="font-serif text-lg font-bold text-rust mt-1">
            {formatEuros(totaux.reminded)}
          </p>
        </div>
        <div className="bg-white border border-ink/10 rounded-md p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-ink/50">
            Encaissé
          </p>
          <p className="font-serif text-lg font-bold text-ink/40 mt-1">
            {formatEuros(totaux.paid)}
          </p>
        </div>
      </div>

      {/* Formulaire d'ajout */}
      <form
        onSubmit={handleAdd}
        className="bg-white border border-ink/10 rounded-md p-4 mb-8 flex flex-col gap-3"
      >
        <p className="font-semibold text-ink">Ajouter une facture</p>
        <input
          type="text"
          required
          placeholder="Nom du client"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="rounded-md border border-ink/20 px-3 py-2"
        />
        <input
          type="email"
          placeholder="Email du client (optionnel)"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          className="rounded-md border border-ink/20 px-3 py-2"
        />
        <div className="flex gap-3">
          <input
            type="number"
            step="0.01"
            required
            placeholder="Montant (€)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="rounded-md border border-ink/20 px-3 py-2 flex-1"
          />
          <input
            type="date"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="rounded-md border border-ink/20 px-3 py-2 flex-1"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-ink text-paper font-semibold py-2 disabled:opacity-60"
        >
          {saving ? "Ajout…" : "Ajouter"}
        </button>
      </form>

      {/* Tableau des factures */}
      {loading ? (
        <p className="text-center text-ink/50">Chargement…</p>
      ) : invoices.length === 0 ? (
        <p className="text-center text-ink/50">
          Aucune facture pour le moment. Ajoutez-en une ci-dessus pour
          commencer.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="bg-white border border-ink/10 rounded-md p-4 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="font-semibold text-ink truncate">
                  {inv.client_name}
                </p>
                <p className="text-sm text-ink/50">
                  Échéance {new Date(inv.due_date).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-serif font-semibold text-ink">
                  {formatEuros(Number(inv.amount))}
                </p>
                <select
                  value={inv.status}
                  onChange={(e) =>
                    handleStatusChange(
                      inv.id,
                      e.target.value as Invoice["status"]
                    )
                  }
                  className="text-sm border border-ink/20 rounded-md px-2 py-1 mt-1"
                >
                  <option value="due">{STATUT_LABEL.due}</option>
                  <option value="reminded">{STATUT_LABEL.reminded}</option>
                  <option value="paid">{STATUT_LABEL.paid}</option>
                </select>
                <Link
                  href={`/compte/mise-en-demeure/${inv.id}`}
                  className="block text-xs text-ink/50 underline underline-offset-2 mt-1"
                >
                  Mise en demeure
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
