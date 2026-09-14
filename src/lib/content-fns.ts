import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { DEFAULT_CONTENT, mergeContent, type SiteContent } from "./content";

const clipSchema = z.object({
  src: z.string().max(800),
  poster: z.string().max(800),
  label: z.string().max(80),
});

const shotSchema = z.object({
  src: z.string().max(800),
  alt: z.string().max(120),
});

const exampleSchema = z.object({
  kind: z.enum(["image", "video"]),
  src: z.string().max(800),
  poster: z.string().max(800).optional(),
  alt: z.string().max(160),
  caption: z.string().max(200),
});

const contentSchema = z.object({
  discordUrl: z.string().max(400),
  email: z.string().max(200),
  tagline: z.string().max(240),
  headline: z.string().max(240),
  sells: z.string().max(600),
  priceCents: z.number().int().min(100).max(10_000_000),
  comparePriceCents: z.number().int().min(100).max(10_000_000),
  heroClips: z.array(clipSchema).max(4),
  portraits: z.array(shotSchema).max(5),
  examples: z.array(exampleSchema).max(3),
});

function parsePayload(value: unknown): SiteContent {
  if (typeof value === "string") {
    try {
      return mergeContent(JSON.parse(value));
    } catch {
      return DEFAULT_CONTENT;
    }
  }
  return mergeContent(value);
}

export const loadSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const sql = await getSql();
    const rows = await sql<{ payload: unknown }>`select payload from site_content where id = 1`;
    return parsePayload(rows[0]?.payload);
  } catch {
    return DEFAULT_CONTENT;
  }
});

export const saveSiteContent = createServerFn({ method: "POST" })
  .validator(contentSchema)
  .handler(async ({ data }) => {
    const { assertOperator } = await import("./desk.server");
    await assertOperator();
    const payload = mergeContent(data);
    if (payload.discordUrl && !/^https:\/\/(discord\.gg|discord\.com)\//i.test(payload.discordUrl)) {
      throw new Error("Discord link must start with https://discord.gg/ or https://discord.com/");
    }
    const sql = await getSql();
    const encoded = JSON.stringify(payload);
    await sql.query(
      `insert into site_content (id, payload, updated_at)
       values (1, $1::jsonb, now())
       on conflict (id) do update set payload = excluded.payload, updated_at = now()`,
      [encoded],
    );
    return payload;
  });

export const deskStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { isOperator, hasDeskCookie } = await import("./desk.server");
  return { operator: await isOperator(), desk: hasDeskCookie() };
});

export const deskLogin = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string().min(1).max(200) }))
  .handler(async ({ data }) => {
    const { loginDesk } = await import("./desk.server");
    loginDesk(data.password);
    return { ok: true as const };
  });

export const deskLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { logoutDesk } = await import("./desk.server");
  logoutDesk();
  return { ok: true as const };
});
