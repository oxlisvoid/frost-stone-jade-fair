import type Stripe from "stripe";
import { getStripe } from "./stripe-sdk.server";
import { runtimeEnv } from "./runtime-env.server";

export type PaidOrder = {
  id: string;
  sessionId: string;
  email: string;
  paymentStatus: string;
  amountTotal: number;
  currency: string;
  products: string;
  createdAt: string;
};

export async function handleStripeWebhook(rawBody: string, signature: string | null) {
  const stripe = await getStripe();
  const secret = runtimeEnv("STRIPE_WEBHOOK_SECRET");
  let event: Stripe.Event;

  if (secret && signature) {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } else {
    event = JSON.parse(rawBody) as Stripe.Event;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await savePaidOrder(session);
  }

  return { received: true, type: event.type };
}

async function savePaidOrder(session: Stripe.Checkout.Session) {
  const email =
    session.customer_details?.email ||
    session.customer_email ||
    session.metadata?.deliver_to ||
    "";
  try {
    const { getSql } = await import("./db");
    const sql = await getSql();
    await sql.query(
      `insert into orders (id, session_id, email, payment_status, amount_total, currency, products, created_at)
       values ($1, $2, $3, $4, $5, $6, $7, now())
       on conflict (session_id) do update set
         email = excluded.email,
         payment_status = excluded.payment_status,
         amount_total = excluded.amount_total`,
      [
        session.id,
        session.id,
        email,
        session.payment_status ?? "",
        session.amount_total ?? 0,
        session.currency ?? "usd",
        session.metadata?.products ?? "",
      ],
    );
  } catch {
    /* table may not exist yet */
  }
}

export async function loadPaidOrders(): Promise<PaidOrder[]> {
  const { assertOperator } = await import("./desk.server");
  await assertOperator();
  try {
    const { getSql } = await import("./db");
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      session_id: string;
      email: string;
      payment_status: string;
      amount_total: number;
      currency: string;
      products: string;
      created_at: string;
    }>`select * from orders order by created_at desc limit 50`;
    return rows.map((row) => ({
      id: row.id,
      sessionId: row.session_id,
      email: row.email,
      paymentStatus: row.payment_status,
      amountTotal: Number(row.amount_total) || 0,
      currency: row.currency,
      products: row.products,
      createdAt: String(row.created_at),
    }));
  } catch {
    return [];
  }
}
