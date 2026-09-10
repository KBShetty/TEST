"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import fallbackTestimonials from "@/content/testimonials-fallback.json";
import { Reveal } from "@/components/Reveal";
import type { Testimonial } from "@/types/content";

// NOTE: once GOOGLE_PLACE_ID is set in site-config, this should prefer live
// Google Reviews — that's a separate backend task (fetching + caching
// reviews server-side), still pending. For now, testimonials come from
// Sanity (see TestimonialsSection, its server-component parent) with the
// static fallback file below used when no `testimonials` prop is passed or
// Sanity has nothing active.
const FALLBACK_ITEMS = fallbackTestimonials as Testimonial[];

export function TestimonialsCarousel({
  testimonials,
}: {
  testimonials?: Testimonial[];
}) {
  const ITEMS = testimonials && testimonials.length > 0 ? testimonials : FALLBACK_ITEMS;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (ITEMS.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % ITEMS.length);
    }, 6000);
    return () => clearInterval(id);
  }, [ITEMS.length]);

  if (ITEMS.length === 0) return null;

  const current = ITEMS[Math.min(index, ITEMS.length - 1)];

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Reveal className="mb-10 flex flex-col items-center text-center">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[#d4af37]">
          What Our Members Say
        </h2>
        <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Real stories from the floor
        </p>
      </Reveal>

      <Reveal
        delay={0.1}
        className="relative mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-2xl border bg-card px-6 py-12 text-center shadow-sm sm:px-12"
      >
        <Quote
          aria-hidden
          className="size-10 text-[#d4af37]/20"
          fill="currentColor"
        />
        <div className="flex gap-1 text-[#d4af37]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="size-5"
              fill={i < current.rating ? "currentColor" : "none"}
            />
          ))}
        </div>
        <p className="text-xl leading-relaxed font-medium italic">
          &ldquo;{current.quote}&rdquo;
        </p>
        <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          {current.name}
        </p>

        {ITEMS.length > 1 && (
          <div className="mt-4 flex gap-2">
            {ITEMS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`size-2 rounded-full transition ${
                  i === index ? "bg-[#d4af37]" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}
