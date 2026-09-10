import { Quote } from "lucide-react";
import { getQuoteOfTheDay } from "@/lib/quote-of-the-day";

// Server component — resolved once per request/revalidation window, no
// client JS needed for "today's" quote to be correct.
export async function QuoteOfTheDay() {
  const quote = await getQuoteOfTheDay();

  return (
    <section className="bg-[#0a0a0a] py-14 sm:py-16">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 text-center">
        <Quote aria-hidden className="size-8 text-[#d4af37]/40" fill="currentColor" />
        <p className="text-xl font-medium italic leading-relaxed text-white sm:text-2xl">
          &ldquo;{quote.text}&rdquo;
        </p>
        <p className="text-sm font-semibold tracking-wide text-[#d4af37] uppercase">
          — {quote.author}
        </p>
      </div>
    </section>
  );
}
