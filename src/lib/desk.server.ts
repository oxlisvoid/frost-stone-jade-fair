import { createHmac, timingSafeEqual } from "node:crypto";
import { getCookie, getRequest, setCookie } from "@tanstack/react-start/server";

const COOKIE = "oxlis_desk";
/** Server-only. Never imported from a client module. Override with OPERATOR_PASSWORD. */
const DEFAULT_PIN = "OxVoid#7149";

function secret() {
  return (
    process.env.BETTER_AUTH_SECRET?.trim() ||
    process.env.STRIPE_SECRET_KEY?.trim() ||
    "oxlis-desk-preview"
  );
}

function expectedPin() {
  return process.env.OPERATOR_PASSWORD?.trim() || DEFAULT_PIN;
}

function tokenFor(pin: string) {
  return createHmac("sha256", secret()).update(`desk:${pin}`).digest("hex");
}

function pinsMatch(given: string, expected: string) {
  const size = Math.max(given.length, expected.length, 1);
  const left = Buffer.alloc(size);
  const right = Buffer.alloc(size);
  Buffer.from(given).copy(left);
  Buffer.from(expected).copy(right);
  return timingSafeEqual(left, right) && given.length === expected.length;
}

function cookieSecure() {
  try {
    const req = getRequest();
    const proto = req?.headers.get("x-forwarded-proto") ?? "";
    if (proto.includes("https")) return true;
    return (req?.url ?? "").startsWith("https://");
  } catch {
    return false;
  }
}

export function hasDeskCookie() {
  try {
    const raw = getCookie(COOKIE);
    return Boolean(raw && pinsMatch(raw, tokenFor(expectedPin())));
  } catch {
    return false;
  }
}

export async function isOperator() {
  return hasDeskCookie();
}

export async function assertOperator() {
  if (!(await isOperator())) {
    throw new Error("Operator only.");
  }
}

export function loginDesk(password: string) {
  if (!pinsMatch(password, expectedPin())) {
    throw new Error("Wrong operator password.");
  }
  setCookie(COOKIE, tokenFor(expectedPin()), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: cookieSecure(),
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function logoutDesk() {
  setCookie(COOKIE, "", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: cookieSecure(),
    maxAge: 0,
  });
}
