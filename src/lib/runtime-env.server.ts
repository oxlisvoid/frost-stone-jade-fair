import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Read process.env at runtime. Vite/Nitro must not see a static
 * `process.env.STRIPE_SECRET_KEY` identifier or they bake `undefined` in at
 * build time (Vercel secrets are often runtime-only).
 */
function processEnv(): Record<string, string | undefined> {
  const g = globalThis as {
    process?: { env?: Record<string, string | undefined>; cwd?: () => string };
    __oxlisEnv?: Record<string, string | undefined>;
  };
  return { ...readLocalStripeFile(g.process), ...(g.__oxlisEnv ?? {}), ...(g.process?.env ?? {}) };
}

function readLocalStripeFile(proc?: { cwd?: () => string }) {
  try {
    const file = join(proc?.cwd?.() || ".", ".stripe-runtime.json");
    if (!existsSync(file)) return {};
    const parsed = JSON.parse(readFileSync(file, "utf8")) as Record<string, string>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function runtimeEnv(name: string) {
  const raw = processEnv()[name];
  if (typeof raw !== "string") return "";
  return raw.trim().replace(/^['"]|['"]$/g, "");
}

export function snapshotRuntimeEnv() {
  const g = globalThis as {
    __oxlisEnv?: Record<string, string | undefined>;
    process?: { env?: Record<string, string | undefined> };
  };
  g.__oxlisEnv = { ...(g.process?.env ?? {}) };
}

function looksLikeSecret(value: string) {
  return /^(sk_test_|sk_live_|rk_test_|rk_live_)[a-zA-Z0-9]{8,}$/.test(value);
}

const SECRET_NAMES = [
  "REAL_STRIPE_SECRET_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_API_KEY",
  "STRIPE_SECRET",
] as const;

export function readStripeSecretFromEnv() {
  for (const name of SECRET_NAMES) {
    const value = runtimeEnv(name);
    if (looksLikeSecret(value)) return value;
  }
  for (const [key, raw] of Object.entries(processEnv())) {
    if (!raw || !/stripe/i.test(key) || /publishable|pk_/i.test(key)) continue;
    const value = raw.trim().replace(/^['"]|['"]$/g, "");
    if (looksLikeSecret(value)) return value;
  }
  return "";
}

const PRICE_NAMES = [
  "REAL_STRIPE_PRICE_ID",
  "STRIPE_PRICE_ALL_ACCESS",
  "STRIPE_PRICE_ID",
  "PRICE_ID",
] as const;

export function readStripePriceFromEnv() {
  for (const name of PRICE_NAMES) {
    const value = runtimeEnv(name);
    if (value.startsWith("price_")) return value;
  }
  return "";
}

export function stripeEnvFlags() {
  const secret = readStripeSecretFromEnv();
  return {
    STRIPE_SECRET_KEY: Boolean(runtimeEnv("STRIPE_SECRET_KEY")),
    REAL_STRIPE_SECRET_KEY: Boolean(runtimeEnv("REAL_STRIPE_SECRET_KEY")),
    STRIPE_API_KEY: Boolean(runtimeEnv("STRIPE_API_KEY")),
    STRIPE_SECRET: Boolean(runtimeEnv("STRIPE_SECRET")),
    hasSecret: Boolean(secret),
    DATABASE_URL: Boolean(runtimeEnv("DATABASE_URL")),
    DOMAIN: Boolean(runtimeEnv("DOMAIN") || runtimeEnv("VERCEL_URL")),
  };
}
