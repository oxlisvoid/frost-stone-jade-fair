import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const INBOX = "oxlisvoid@gmail.com";

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  mailed: boolean;
  createdAt: string;
};

async function deliverToInbox(input: { name: string; email: string; message: string }) {
  const payload = {
    name: input.name,
    email: input.email,
    message: input.message,
    _replyto: input.email,
    _subject: `OxlisVoid question from ${input.name} <${input.email}>`,
    _template: "table",
    _captcha: "false",
  };
  const res = await fetch(`https://formsubmit.co/ajax/${INBOX}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const body = (await res.json().catch(() => ({}))) as { success?: string; message?: string };
  if (!res.ok) {
    throw new Error(body.message || `Mail relay ${res.status}`);
  }
}

async function rememberInquiry(row: {
  id: string;
  name: string;
  email: string;
  message: string;
  mailed: boolean;
}) {
  try {
    const { getSql, dbSource } = await import("./db");
    if (dbSource !== "neon") return;
    const sql = await getSql();
    await sql.query(
      `insert into inquiries (id, name, email, message, mailed, created_at)
       values ($1, $2, $3, $4, $5, now())`,
      [row.id, row.name, row.email, row.message, row.mailed ? 1 : 0],
    );
  } catch {
    /* Vercel has no PGLite file — Gmail still got the message */
  }
}

export const sendInquiry = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(2).max(80),
      email: z.string().email().max(200),
      message: z.string().min(10).max(4000),
      company: z.string().max(80).optional(),
    }),
  )
  .handler(async ({ data }) => {
    if (data.company?.trim()) return { ok: true as const, mailed: true };
    const name = data.name.trim();
    const email = data.email.trim().toLowerCase();
    const message = data.message.trim();
    const id = `inq_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    await deliverToInbox({ name, email, message });
    await rememberInquiry({ id, name, email, message, mailed: true });
    return { ok: true as const, mailed: true };
  });

export const loadInquiries = createServerFn({ method: "GET" }).handler(async () => {
  const { assertOperator } = await import("./desk.server");
  await assertOperator();
  try {
    const { getSql, dbSource } = await import("./db");
    if (dbSource !== "neon") return [] as Inquiry[];
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      name: string;
      email: string;
      message: string;
      mailed: number | boolean;
      created_at: string;
    }>`select * from inquiries order by created_at desc limit 100`;
    return rows.map(
      (row): Inquiry => ({
        id: row.id,
        name: row.name,
        email: row.email,
        message: row.message,
        mailed: Boolean(row.mailed),
        createdAt: String(row.created_at),
      }),
    );
  } catch {
    return [] as Inquiry[];
  }
});
