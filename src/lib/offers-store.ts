import { promises as fs } from "fs";
import path from "path";
import type { Offer } from "@/types/content";

// NOTE: Vercel's serverless filesystem is read-only at runtime outside
// /tmp, so writes made via the admin page will NOT persist in production
// as-is. This file-based store works for local dev; before launch, swap
// the two functions below for Vercel KV (or another small hosted store)
// without changing any calling code — that's the whole reason this is
// isolated behind readOffers/writeOffers rather than inlined in the API
// route.
const OFFERS_FILE = path.join(process.cwd(), "src/content/offers.json");

export async function readOffers(): Promise<Offer[]> {
  const raw = await fs.readFile(OFFERS_FILE, "utf-8");
  return JSON.parse(raw) as Offer[];
}

export async function writeOffers(offers: Offer[]): Promise<void> {
  await fs.writeFile(OFFERS_FILE, JSON.stringify(offers, null, 2) + "\n", "utf-8");
}

export function isOfferActive(offer: Offer, now = new Date()): boolean {
  if (!offer.active) return false;
  const from = new Date(offer.validFrom);
  const to = new Date(offer.validTo);
  return now >= from && now <= to;
}
