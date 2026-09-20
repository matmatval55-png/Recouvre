import { createAdminClient } from "@/lib/supabase/admin";
import { resend } from "@/lib/resend";
import { texteRelance, RELANCE_TYPES, RelanceType } from "@/lib/relance-templates";
import { NextResponse } from "next/server";

const SEUILS: Record<RelanceType, number> = { j7: 7, j15: 15, j30: 30 };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get("authorization");
  const secretParam = searchParams.get("secret");

  const autorise =
    authHeader === `Bearer ${process.env.CRON_SECRET}` ||
    secretParam === process.env.CRON_SECRET;

  if (!autorise) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const supabase = createAdminClient();
  let envoyees = 0;

  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .in("status", ["due", "reminded"]);

  for (const invoice of invoices ?? []) {
    const joursRetard = Math.floor(
      (Date.now() - new Date(invoice.due_date).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    for (const type of RELANCE_TYPES) {
      if (joursRetard < SEUILS[type]) continue;

      const { data: dejaEnvoyee } = await supabase
        .from("reminders")
        .select("id")
        .eq("invoice_id", invoice.id)
        .eq("type", type)
        .maybeSingle();

      if (dejaEnvoyee) continue;

      const { data: userData } = await supabase.auth.admin.getUserById(
        invoice.user_id
      );
      const expediteurEmail = userData?.user?.email;
      const expediteurNom =
        userData?.user?.user_metadata?.display_name || expediteurEmail;

      if (invoice.client_email && expediteurEmail) {
        const { sujet, corps } = texteRelance(type, invoice, expediteurNom);

        await resend.emails.send({
          from: "Recouvre <relances@recouvre.cloud>",
          to: invoice.client_email,
          replyTo: expediteurEmail,
          subject: sujet,
          text: corps,
        });

        await supabase.from("reminders").insert({
          invoice_id: invoice.id,
          type,
        });

        await supabase
          .from("invoices")
          .update({ status: "reminded" })
          .eq("id", invoice.id);

        envoyees++;
      }
    }
  }

  return NextResponse.json({ envoyees });
}
