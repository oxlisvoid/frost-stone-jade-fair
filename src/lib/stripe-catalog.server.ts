import type Stripe from "stripe";
import type { CatalogProduct } from "./catalog";
import { getStripe } from "./stripe-sdk.server";

function asCatalog(product: Stripe.Product, price?: Stripe.Price | null): CatalogProduct {
  const unit =
    price && typeof price.unit_amount === "number" && price.unit_amount > 0 ? price.unit_amount : 5990;
  const priceId = price?.id ?? (typeof product.default_price === "string" ? product.default_price : "");
  return {
    id: product.metadata?.oxlis_id || product.id,
    name: product.name,
    description: product.description ?? "",
    unitAmountCents: unit,
    stripePriceId: priceId,
    addon: product.metadata?.addon === "1",
    active: product.active,
    sortOrder: Number(product.metadata?.sort || 10),
  };
}

async function priceFor(stripe: Stripe, product: Stripe.Product): Promise<Stripe.Price | null> {
  const raw = product.default_price;
  if (raw && typeof raw === "object" && "id" in raw) return raw as Stripe.Price;
  if (typeof raw === "string" && raw.startsWith("price_")) {
    return stripe.prices.retrieve(raw);
  }
  const listed = await stripe.prices.list({ product: product.id, active: true, limit: 1 });
  return listed.data[0] ?? null;
}

export async function listStripeCatalog(includeInactive = false): Promise<CatalogProduct[]> {
  const stripe = await getStripe();
  const active = await stripe.products.list({
    limit: 100,
    active: true,
    expand: ["data.default_price"],
  });
  const rows = [...active.data];
  if (includeInactive) {
    const hidden = await stripe.products.list({
      limit: 100,
      active: false,
      expand: ["data.default_price"],
    });
    rows.push(...hidden.data);
  }
  const mapped: CatalogProduct[] = [];
  for (const product of rows) {
    mapped.push(asCatalog(product, await priceFor(stripe, product)));
  }
  return mapped.sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}

export async function getStripeProduct(id: string): Promise<CatalogProduct | undefined> {
  const stripe = await getStripe();
  if (id.startsWith("prod_")) {
    const product = await stripe.products.retrieve(id, { expand: ["default_price"] });
    return asCatalog(product, await priceFor(stripe, product));
  }
  const all = await listStripeCatalog(true);
  return all.find((item) => item.id === id || item.stripePriceId === id);
}

async function findByOxlisId(stripe: Stripe, id: string) {
  if (id.startsWith("prod_")) {
    try {
      return await stripe.products.retrieve(id);
    } catch {
      return null;
    }
  }
  const listed = await stripe.products.list({ limit: 100 });
  return listed.data.find((item) => item.metadata?.oxlis_id === id) ?? null;
}

export async function upsertStripeProduct(input: {
  id?: string;
  name: string;
  description: string;
  unitAmountCents: number;
  stripePriceId: string;
  addon: boolean;
  active: boolean;
}): Promise<CatalogProduct> {
  const stripe = await getStripe();
  const oxlisId = (input.id?.trim() || input.name).slice(0, 40);
  const metadata = {
    oxlis_id: oxlisId,
    addon: input.addon ? "1" : "0",
  };
  const pasted = input.stripePriceId.trim();

  if (pasted.startsWith("price_")) {
    const price = await stripe.prices.retrieve(pasted, { expand: ["product"] });
    const productRef = price.product;
    const productId = typeof productRef === "string" ? productRef : productRef.id;
    const updated = await stripe.products.update(productId, {
      name: input.name,
      description: input.description || undefined,
      active: input.active,
      metadata,
      default_price: pasted,
    });
    return asCatalog(updated, price);
  }

  const existing = await findByOxlisId(stripe, oxlisId);
  if (!existing) {
    const created = await stripe.products.create({
      name: input.name,
      description: input.description || undefined,
      active: input.active,
      metadata,
      default_price_data: { currency: "usd", unit_amount: input.unitAmountCents },
    });
    return asCatalog(created, await priceFor(stripe, created));
  }

  let defaultPrice: string | undefined;
  const current = await priceFor(stripe, existing);
  if (current && current.unit_amount !== input.unitAmountCents) {
    const price = await stripe.prices.create({
      product: existing.id,
      currency: "usd",
      unit_amount: input.unitAmountCents,
    });
    defaultPrice = price.id;
  }

  const updated = await stripe.products.update(existing.id, {
    name: input.name,
    description: input.description || undefined,
    active: input.active,
    metadata,
    ...(defaultPrice ? { default_price: defaultPrice } : {}),
  });
  return asCatalog(updated, await priceFor(stripe, updated));
}

export async function archiveStripeProduct(id: string) {
  const stripe = await getStripe();
  const existing = await findByOxlisId(stripe, id);
  if (!existing) return;
  await stripe.products.update(existing.id, { active: false });
}
