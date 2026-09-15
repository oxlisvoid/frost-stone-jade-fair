import Stripe from "stripe";
import { mergeContent } from "./content";
import { SEED_PRODUCTS, type CatalogProduct } from "./catalog";

type EnvBag = { __oxlisStripeSecret?: string };

function envBag(): EnvBag {
  return globalThis as EnvBag;
}

async function readNodeEnv(name: string) {
  const { env } = await import("node:process");
  const value = env[name];
  return typeof value === "string" ? value.trim() : "";
}

function looksLikeStripeSecret(key: string) {
  return /^(sk_test_|sk_live_|rk_test_|rk_live_)[a-zA-Z0-9]{8,}$/.test(key);
}

export async function resolveStripeSecret() {
  const fromEnv =
    (await readNodeEnv("STRIPE_SECRET_KEY")) ||
    (await readNodeEnv("STRIPE_API_KEY")) ||
    (await readNodeEnv("STRIPE_SECRET"));
  if (fromEnv) return fromEnv;

  const cached = envBag().__oxlisStripeSecret?.trim();
  if (cached) return cached;

  try {
    const { getSql } = await import("./db");
    const sql = await getSql();
    const rows = await sql<{ stripe_secret_key: string }>`
      select stripe_secret_key from site_secrets where id = 1
    `;
    const stored = rows[0]?.stripe_secret_key?.trim() ?? "";
    if (stored) {
      envBag().__oxlisStripeSecret = stored;
      return stored;
    }
  } catch {
    /* table may not exist yet */
  }
  return "";
}

export function maskStripeSecret(key: string) {
  if (!key) return "";
  if (key.length < 12) return "saved";
  return `${key.slice(0, 8)}…${key.slice(-4)}`;
}

export async function persistStripeSecret(raw: string) {
  const key = raw.trim();
  if (!looksLikeStripeSecret(key)) {
    throw new Error("Use a Stripe secret key that starts with sk_test_ or sk_live_.");
  }
  envBag().__oxlisStripeSecret = key;
  try {
    const { getSql } = await import("./db");
    const sql = await getSql();
    await sql.query(
      `insert into site_secrets (id, stripe_secret_key, updated_at)
       values (1, $1, now())
       on conflict (id) do update set stripe_secret_key = excluded.stripe_secret_key, updated_at = now()`,
      [key],
    );
  } catch {
    /* in-memory key still works for this server process */
  }
  return { configured: true, hint: maskStripeSecret(key), source: "panel" as const };
}

async function requireSecret() {
  const key = await resolveStripeSecret();
  if (!key) {
    throw new Error(
      "Stripe secret key is not set. Paste sk_test_… in the operator desk, or add STRIPE_SECRET_KEY on Vercel and redeploy.",
    );
  }
  return key;
}

export async function getStripe() {
  return new Stripe(await requireSecret());
}

export async function publicSiteUrl() {
  const raw =
    (await readNodeEnv("DOMAIN")) ||
    (await readNodeEnv("BETTER_AUTH_URL")) ||
    (await readNodeEnv("VERCEL_PROJECT_PRODUCTION_URL")) ||
    (await readNodeEnv("VERCEL_URL"));
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw.replace(/\/$/, "");
  return `https://${raw.replace(/\/$/, "")}`;
}

async function lookupProduct(id: string): Promise<CatalogProduct | undefined> {
  try {
    const { getSql } = await import("./db");
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      name: string;
      description: string;
      unit_amount_cents: number;
      stripe_price_id: string;
      addon: number | boolean;
      active: number | boolean;
      sort_order: number;
    }>`select * from catalog_products where id = ${id} limit 1`;
    const row = rows[0];
    if (row) {
      return {
        id: row.id,
        name: row.name,
        description: row.description,
        unitAmountCents: Number(row.unit_amount_cents) || 0,
        stripePriceId: row.stripe_price_id ?? "",
        addon: Boolean(row.addon),
        active: Boolean(row.active),
        sortOrder: Number(row.sort_order) || 0,
      };
    }
  } catch {
    /* fall through */
  }
  return SEED_PRODUCTS.find((p) => p.id === id);
}

export type CheckoutItemInput = {
  productId: string;
  quantity: number;
  priceId?: string;
};

async function liveAmount(productId: string, fallback: number) {
  if (productId !== "all-access") return fallback;
  try {
    const { getSql } = await import("./db");
    const sql = await getSql();
    const rows = await sql<{ payload: unknown }>`select payload from site_content where id = 1`;
    const cents = mergeContent(rows[0]?.payload).priceCents;
    return cents > 0 ? cents : fallback;
  } catch {
    return fallback;
  }
}

async function lineItemFor(
  item: CheckoutItemInput,
): Promise<Stripe.Checkout.SessionCreateParams.LineItem> {
  const qty = Math.min(20, Math.max(1, Math.floor(item.quantity) || 1));
  const product = await lookupProduct(item.productId);
  if (!product || !product.active) throw new Error("Unknown product");

  const fromItem = item.priceId?.trim() ?? "";
  const mapped = fromItem || product.stripePriceId.trim();
  if (mapped) {
    if (!mapped.startsWith("price_")) {
      throw new Error("Unknown Stripe price. Use a Price ID from the Stripe Dashboard.");
    }
    return { price: mapped, quantity: qty };
  }

  const unit_amount = await liveAmount(product.id, product.unitAmountCents);
  return {
    quantity: qty,
    price_data: {
      currency: "usd",
      unit_amount,
      product_data: {
        name: product.name,
        description: product.description,
      },
    },
  };
}

export async function createStripeCheckout(input: {
  items: CheckoutItemInput[];
  email?: string;
  name?: string;
  origin?: string;
}) {
  if (!input.items.length) throw new Error("Select at least one product");
  const email = input.email?.trim().toLowerCase() ?? "";
  if (!email || !email.includes("@")) {
    throw new Error("Enter the email where you want the toolkit sent.");
  }

  const line_items = await Promise.all(input.items.map(lineItemFor));

  const origin = (input.origin?.replace(/\/$/, "") || (await publicSiteUrl())).replace(/\/$/, "");
  if (!origin) {
    throw new Error("DOMAIN is not set. Add your site URL as DOMAIN on Vercel.");
  }

  const stripe = await getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    customer_email: email,
    metadata: {
      name: input.name ?? "",
      products: input.items.map((i) => i.productId).join(","),
      deliver_to: email,
    },
    custom_text: {
      submit: {
        message: "The real toolkit is emailed to this address within 24 hours of payment.",
      },
    },
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/canceled`,
  });

  if (!session.id || !session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  return { id: session.id, url: session.url };
}

export async function retrieveCheckoutSession(sessionId: string) {
  if (!sessionId.startsWith("cs_")) throw new Error("Invalid session");
  const stripe = await getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items.data.price.product"],
  });
  return {
    id: session.id,
    status: session.status,
    paymentStatus: session.payment_status,
    amountTotal: session.amount_total,
    currency: session.currency,
    customerEmail: session.customer_details?.email ?? session.customer_email,
    paid: session.payment_status === "paid",
  };
}
