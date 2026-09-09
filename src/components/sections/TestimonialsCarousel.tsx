"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import testimonials from "@/content/testimonials-fallback.json";
import type { Testimonial } from "@/types/content";

// NOTE: this reads the static fallback file for now. Once `GOOGLE_PLACE_ID`
// is set in site-config, this should prefer live Google Reviews — that's a
// separate backend task (fetching + caching reviews server-side).
const ITEMS = testimonials as Testimonial[];

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (ITEMS.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % ITEMS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  if (ITEMS.length === 0) return null;

  const current = ITEMS[index];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 flex flex-col items-center text-center">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-orange-500">
          What Our Members Say
        </h2>
        <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Real stories from the floor
        </p>
      </div>

      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-xl border bg-card px-6 py-10 text-center">
        <div className="flex gap-1 text-orange-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="size-4"
              fill={i < current.rating ? "currentColor" : "none"}
            />
          ))}
        </div>
        <p className="text-lg italic leading-relaxed">“{current.quote}”</p>
        <p className="text-sm font-semibold text-muted-foreground">
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
                  i === index ? "bg-orange-500" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
