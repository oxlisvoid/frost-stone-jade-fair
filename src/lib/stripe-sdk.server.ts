import Stripe from "stripe";
import { PRODUCTS } from "./products";

function requireSecret() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return key;
}

export function getStripe() {
  return new Stripe(requireSecret());
}

export function publicSiteUrl() {
  const raw = process.env.DOMAIN?.trim();
  if (raw) {
    if (raw.startsWith("http://") || raw.startsWith("https://")) return raw.replace(/\/$/, "");
    return `https://${raw.replace(/\/$/, "")}`;
  }
  const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (prod) return `https://${prod.replace(/\/$/, "")}`;
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  return "";
}

function allowedPriceIds() {
  const fromCatalog = PRODUCTS.map((p) => process.env[p.envPriceKey]?.trim()).filter(
    (v): v is string => Boolean(v),
  );
  const extra = (process.env.STRIPE_PRICE_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return new Set([...fromCatalog, ...extra]);
}

export function resolvePriceId(productId: string, priceId?: string) {
  const allowed = allowedPriceIds();
  if (priceId) {
    if (!allowed.has(priceId)) {
      throw new Error("Unknown Stripe price. Add it to STRIPE_PRICE_* env vars.");
    }
    return priceId;
  }
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) throw new Error("Unknown product");
  const mapped = process.env[product.envPriceKey]?.trim();
  if (!mapped) {
    throw new Error(
      `Missing ${product.envPriceKey}. Create a Price in the Stripe Dashboard and set this env var on Vercel.`,
    );
  }
  return mapped;
}

export type CheckoutItemInput = {
  productId: string;
  quantity: number;
  priceId?: string;
};

export async function createStripeCheckout(input: {
  items: CheckoutItemInput[];
  email?: string;
  name?: string;
  origin?: string;
}) {
  if (!input.items.length) throw new Error("Select at least one product");

  const line_items = input.items.map((item) => {
    const qty = Math.min(20, Math.max(1, Math.floor(item.quantity) || 1));
    return {
      price: resolvePriceId(item.productId, item.priceId),
      quantity: qty,
    };
  });

  const origin = (input.origin?.replace(/\/$/, "") || publicSiteUrl()).replace(/\/$/, "");
  if (!origin) {
    throw new Error("DOMAIN is not set. Add your site URL as DOMAIN on Vercel.");
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    currency: "usd",
    line_items,
    customer_email: input.email || undefined,
    metadata: {
      name: input.name ?? "",
      products: input.items.map((i) => i.productId).join(","),
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
  const stripe = getStripe();
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
