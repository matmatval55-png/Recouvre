import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Signature invalide" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;

    if (email) {
      const supabaseAdmin = createAdminClient();

      const { error } = await supabaseAdmin.from("subscriptions").upsert(
        {
          email,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          status: "active",
        },
        { onConflict: "stripe_customer_id" }
      );

      if (error) {
        console.error("Erreur Supabase (subscriptions) :", error.message);
      }
    }
  }

  if (
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    const subscription = event.data.object as Stripe.Subscription;
    const supabaseAdmin = createAdminClient();

    const nouveauStatut =
      subscription.status === "active" ? "active" : "canceled";

    await supabaseAdmin
      .from("subscriptions")
      .update({ status: nouveauStatut })
      .eq("stripe_customer_id", subscription.customer as string);
  }

  return NextResponse.json({ received: true });
}
