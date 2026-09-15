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

const SECRET_NAMES = ["STRIPE_SECRET_KEY", "STRIPE_API_KEY", "STRIPE_SECRET"] as const;

export function readStripeSecretFromEnv() {
  for (const name of SECRET_NAMES) {
    const value = runtimeEnv(name);
    if (value.startsWith("sk_") || value.startsWith("rk_")) return value;
  }
  return "";
}

export function stripeEnvFlags() {
  return {
    STRIPE_SECRET_KEY: Boolean(runtimeEnv("STRIPE_SECRET_KEY")),
    STRIPE_API_KEY: Boolean(runtimeEnv("STRIPE_API_KEY")),
    STRIPE_SECRET: Boolean(runtimeEnv("STRIPE_SECRET")),
    DATABASE_URL: Boolean(runtimeEnv("DATABASE_URL")),
    DOMAIN: Boolean(runtimeEnv("DOMAIN") || runtimeEnv("VERCEL_URL")),
  };
}
