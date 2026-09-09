import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "aurea-admin-session";

function sign(value: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export async function createAdminSession() {
  const secret = process.env.ADMIN_SESSION_SECRET ?? "dev-only-insecure-secret";
  const payload = `admin:${Date.now()}`;
  const signature = sign(payload, secret);
  const store = await cookies();
  store.set(COOKIE_NAME, `${payload}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET ?? "dev-only-insecure-secret";
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return false;

  const [payload, signature] = raw.split(".");
  if (!payload || !signature) return false;

  return sign(payload, secret) === signature;
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_OFFERS_PASSWORD ?? "change-me";
  return password === expected;
}
