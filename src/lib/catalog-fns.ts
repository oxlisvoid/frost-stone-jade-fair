import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SEED_PRODUCTS, slugify, type CatalogProduct, type SitePost } from "./catalog";

type ProductRow = {
  id: string;
  name: string;
  description: string;
  unit_amount_cents: number;
  stripe_price_id: string;
  addon: number | boolean;
  active: number | boolean;
  sort_order: number;
};

type PostRow = {
  id: string;
  title: string;
  body: string;
  url: string;
  kind: string;
  published: number | boolean;
};

function asProduct(row: ProductRow): CatalogProduct {
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

function asPost(row: PostRow): SitePost {
  const kind = row.kind === "discord" || row.kind === "group" || row.kind === "news" ? row.kind : "link";
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    url: row.url,
    kind,
    published: Boolean(row.published),
  };
}

async function readSqlProducts(): Promise<CatalogProduct[]> {
  try {
    const { getSql, dbSource } = await import("./db");
    if (dbSource !== "neon") return [];
    const sql = await getSql();
    const rows = await sql<ProductRow>`select * from catalog_products order by sort_order asc, name asc`;
    return rows.map(asProduct);
  } catch {
    return [];
  }
}

async function readProducts(): Promise<CatalogProduct[]> {
  try {
    const { listStripeCatalog } = await import("./stripe-catalog.server");
    const fromStripe = await listStripeCatalog(true);
    if (fromStripe.length) return fromStripe;
  } catch {
    /* Stripe key missing or API error */
  }
  const fromSql = await readSqlProducts();
  if (fromSql.length) return fromSql;
  return SEED_PRODUCTS;
}

export const loadCatalog = createServerFn({ method: "GET" }).handler(async () => {
  const products = await readProducts();
  return products.filter(
    (p) => p.active && p.id !== "all-access" && !/all access/i.test(p.name) && p.unitAmountCents !== 5990,
  );
});

export const loadAllCatalog = createServerFn({ method: "GET" }).handler(async () => {
  const { assertOperator } = await import("./desk.server");
  await assertOperator();
  return readProducts();
});

const productSchema = z.object({
  id: z.string().max(40).optional(),
  name: z.string().min(2).max(80),
  description: z.string().max(400),
  unitAmountCents: z.number().int().min(100).max(10_000_000),
  stripePriceId: z.string().max(80),
  addon: z.boolean(),
  active: z.boolean(),
});

export const saveCatalogProduct = createServerFn({ method: "POST" })
  .validator(productSchema)
  .handler(async ({ data }) => {
    const { assertOperator } = await import("./desk.server");
    await assertOperator();
    const id = (data.id?.trim() || slugify(data.name)).slice(0, 40);
    const priceId = data.stripePriceId.trim();
    if (priceId && !priceId.startsWith("price_")) {
      throw new Error("Stripe Price ID must start with price_");
    }
    const { upsertStripeProduct } = await import("./stripe-catalog.server");
    const saved = await upsertStripeProduct({ ...data, id, stripePriceId: priceId });
    try {
      const { getSql, dbSource } = await import("./db");
      if (dbSource === "neon") {
        const sql = await getSql();
        await sql.query(
          `insert into catalog_products
            (id, name, description, unit_amount_cents, stripe_price_id, addon, active, sort_order, updated_at)
           values ($1, $2, $3, $4, $5, $6, $7, 10, now())
           on conflict (id) do update set
             name = excluded.name,
             description = excluded.description,
             unit_amount_cents = excluded.unit_amount_cents,
             stripe_price_id = excluded.stripe_price_id,
             addon = excluded.addon,
             active = excluded.active,
             updated_at = now()`,
          [
            saved.id,
            saved.name,
            saved.description,
            saved.unitAmountCents,
            saved.stripePriceId,
            saved.addon ? 1 : 0,
            saved.active ? 1 : 0,
          ],
        );
      }
    } catch {
      /* Stripe is the source of truth on Vercel */
    }
    return { ok: true as const, id: saved.id, stripePriceId: saved.stripePriceId };
  });

export const deleteCatalogProduct = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().min(1).max(80) }))
  .handler(async ({ data }) => {
    const { assertOperator } = await import("./desk.server");
    await assertOperator();
    if (data.id === "all-access") throw new Error("All Access cannot be removed.");
    try {
      const { archiveStripeProduct } = await import("./stripe-catalog.server");
      await archiveStripeProduct(data.id);
    } catch {
      /* continue */
    }
    try {
      const { getSql, dbSource } = await import("./db");
      if (dbSource === "neon") {
        const sql = await getSql();
        await sql.query(`delete from catalog_products where id = $1`, [data.id]);
      }
    } catch {
      /* Stripe archive is enough */
    }
    return { ok: true as const };
  });

export const loadPublicPosts = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { getSql, dbSource } = await import("./db");
    if (dbSource !== "neon") return [] as SitePost[];
    const sql = await getSql();
    const rows = await sql<PostRow>`
      select * from site_posts where published = 1 order by created_at desc
    `;
    return rows.map(asPost);
  } catch {
    return [] as SitePost[];
  }
});

export const loadAllPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { assertOperator } = await import("./desk.server");
  await assertOperator();
  try {
    const { getSql, dbSource } = await import("./db");
    if (dbSource !== "neon") return [] as SitePost[];
    const sql = await getSql();
    const rows = await sql<PostRow>`select * from site_posts order by created_at desc`;
    return rows.map(asPost);
  } catch {
    return [] as SitePost[];
  }
});

const postSchema = z.object({
  id: z.string().max(40).optional(),
  title: z.string().min(2).max(80),
  body: z.string().max(400),
  url: z.string().max(400),
  kind: z.enum(["discord", "group", "news", "link"]),
  published: z.boolean(),
});

export const saveSitePost = createServerFn({ method: "POST" })
  .validator(postSchema)
  .handler(async ({ data }) => {
    const { assertOperator } = await import("./desk.server");
    await assertOperator();
    const url = data.url.trim();
    if (url && !/^https:\/\//i.test(url)) throw new Error("Link must start with https://");
    if (data.kind === "discord" && url && !/^https:\/\/(discord\.gg|discord\.com)\//i.test(url)) {
      throw new Error("Discord link must start with https://discord.gg/ or https://discord.com/");
    }
    const { getSql, dbSource } = await import("./db");
    if (dbSource !== "neon") {
      throw new Error("Posts need a database. Set DATABASE_URL (Neon) on Vercel, or add the Discord link in Site content.");
    }
    const id = data.id?.trim() || slugify(data.title);
    const sql = await getSql();
    await sql.query(
      `insert into site_posts (id, title, body, url, kind, published, created_at)
       values ($1, $2, $3, $4, $5, $6, now())
       on conflict (id) do update set
         title = excluded.title,
         body = excluded.body,
         url = excluded.url,
         kind = excluded.kind,
         published = excluded.published`,
      [id, data.title.trim(), data.body.trim(), url, data.kind, data.published ? 1 : 0],
    );
    return { ok: true as const, id };
  });

export const deleteSitePost = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().min(1).max(40) }))
  .handler(async ({ data }) => {
    const { assertOperator } = await import("./desk.server");
    await assertOperator();
    const { getSql, dbSource } = await import("./db");
    if (dbSource !== "neon") return { ok: true as const };
    const sql = await getSql();
    await sql.query(`delete from site_posts where id = $1`, [data.id]);
    return { ok: true as const };
  });
