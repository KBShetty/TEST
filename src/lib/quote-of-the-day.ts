import { sanityClient } from "@/sanity/client";
import { ACTIVE_QUOTES_QUERY, type SanityQuote } from "@/sanity/queries";
import { quotesFallback } from "@/content/quotes-fallback";

const TIMEZONE = "Asia/Kolkata";
const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

type QuoteLike = {
  text: string;
  author?: string | null;
  dayOfWeek?: string[] | null;
  month?: string[] | null;
};

/** Today's date, resolved in the gym's local timezone rather than server UTC. */
function todayInGymTimezone() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const dateKey = `${get("year")}-${get("month")}-${get("day")}`; // YYYY-MM-DD
  const monthKey = String(Number(get("month"))); // "1".."12", no leading zero — matches quote.month values
  const weekdayShort = get("weekday").toLowerCase().slice(0, 3); // "mon", "tue", ...
  const dayKey = DAY_KEYS.includes(weekdayShort as (typeof DAY_KEYS)[number])
    ? weekdayShort
    : "mon"; // defensive fallback, should never trigger

  return { dateKey, monthKey, dayKey };
}

/** Deterministic (not Math.random) string hash — same input always maps to the same index. */
function hashToIndex(input: string, modulo: number) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return modulo > 0 ? hash % modulo : 0;
}

function isEligibleToday(
  quote: QuoteLike,
  dayKey: string,
  monthKey: string,
) {
  const dayOk = !quote.dayOfWeek?.length || quote.dayOfWeek.includes(dayKey);
  const monthOk = !quote.month?.length || quote.month.includes(monthKey);
  return dayOk && monthOk;
}

function pickForToday(pool: QuoteLike[], dateKey: string, dayKey: string, monthKey: string) {
  if (pool.length === 0) return null;
  const eligible = pool.filter((q) => isEligibleToday(q, dayKey, monthKey));
  const candidates = eligible.length > 0 ? eligible : pool; // untagged pool as fallback
  const index = hashToIndex(dateKey, candidates.length);
  return candidates[index];
}

export type QuoteOfTheDay = { text: string; author: string };

/**
 * Today's motivational quote — same result all day (hashed off the date,
 * not random), a different one tomorrow. Prefers Sanity's admin-managed
 * pool (so the client can add/retire quotes with no code), tag-filtered by
 * today's day-of-week/month when tags are present, and falls back through:
 * Sanity tag-filtered pool -> Sanity full pool -> static quotesFallback,
 * with the same date-hash applied at every layer so even the offline
 * fallback still rotates day to day.
 */
export async function getQuoteOfTheDay(): Promise<QuoteOfTheDay> {
  const { dateKey, dayKey, monthKey } = todayInGymTimezone();

  if (sanityClient) {
    try {
      const quotes = await sanityClient.fetch<SanityQuote[]>(
        ACTIVE_QUOTES_QUERY,
        {},
        { next: { revalidate: 60, tags: ["quotes"] } },
      );
      const picked = pickForToday(quotes ?? [], dateKey, dayKey, monthKey);
      if (picked) {
        return { text: picked.text, author: picked.author || "Aurea Fitness" };
      }
    } catch {
      // Sanity unreachable/misconfigured — fall through to the static pool below.
    }
  }

  const picked = pickForToday(quotesFallback, dateKey, dayKey, monthKey);
  return { text: picked?.text ?? "Train strong, live stronger.", author: "Aurea Fitness" };
}
