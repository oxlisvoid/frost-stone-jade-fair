import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";

const settingsSchema = z.object({
  stripeLink: z.string().max(500),
  contactEmail: z.string().max(200),
  notes: z.string().max(4000),
});

export const loadOperator = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{
      stripe_link: string;
      contact_email: string;
      notes: string;
    }>`
      select stripe_link, contact_email, notes
      from operator_settings
      where user_id = ${context.userId}
      limit 1
    `;
    const leads = await sql<{
      id: number;
      name: string;
      email: string;
      created_at: string;
    }>`
      select id, name, email, created_at
      from operator_leads
      where user_id = ${context.userId}
      order by id desc
      limit 50
    `;
    const row = rows[0];
    return {
      stripeLink: row?.stripe_link ?? "",
      contactEmail: row?.contact_email ?? "",
      notes: row?.notes ?? "",
      leads,
    };
  });

export const saveOperator = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(settingsSchema)
  .handler(async ({ data, context }) => {
    const stripeLink = data.stripeLink.trim();
    if (
      stripeLink &&
      !stripeLink.startsWith("https://buy.stripe.com/") &&
      !stripeLink.startsWith("https://checkout.stripe.com/") &&
      !stripeLink.startsWith("price_")
    ) {
      throw new Error("Use a Stripe Payment Link, Checkout URL, or price_ id");
    }
    const sql = await getSql();
    await sql`
      insert into operator_settings (user_id, stripe_link, contact_email, notes, updated_at)
      values (
        ${context.userId},
        ${stripeLink},
        ${data.contactEmail.trim()},
        ${data.notes},
        now()
      )
      on conflict (user_id) do update set
        stripe_link = excluded.stripe_link,
        contact_email = excluded.contact_email,
        notes = excluded.notes,
        updated_at = now()
    `;
    return { ok: true as const };
  });

export const saveLead = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      name: z.string().min(1).max(120),
      email: z.string().email().max(200),
    }),
  )
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await sql`
      insert into operator_leads (user_id, name, email)
      values (${context.userId}, ${data.name.trim()}, ${data.email.trim().toLowerCase()})
    `;
    return { ok: true as const };
  });
