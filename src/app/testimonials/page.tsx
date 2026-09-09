import type { Metadata } from "next";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/content/site-config";
import testimonialsData from "@/content/testimonials-fallback.json";
import type { Testimonial } from "@/types/content";
import { Reveal } from "@/components/Reveal";

// NOTE: this page reads the static fallback file. Once GOOGLE_PLACE_ID is
// configured (see site-config.ts), a future backend task should fetch live
// Google Reviews and prefer those here, falling back to this file only when
// the Places API is unavailable or unconfigured.
const testimonials = testimonialsData as Testimonial[];

export const metadata: Metadata = {
  title: `Testimonials & Reviews | ${siteConfig.name}`,
  description:
    "Read what members are saying about training at Aurea Fitness.",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < rating
              ? "fill-primary text-primary"
              : "fill-none text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Member Reviews
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Real feedback from members training at {siteConfig.name}.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={`${testimonial.name}-${index}`} delay={(index % 3) * 0.1}>
            <Card className="h-full shadow-sm ring-1 ring-foreground/10 transition-shadow hover:shadow-md">
              <CardContent className="flex h-full flex-col gap-3">
                <Quote className="size-8 shrink-0 fill-primary/15 text-primary/30" />
                <StarRating rating={testimonial.rating} />
                <p className="text-base leading-relaxed text-foreground/90">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-auto flex items-center gap-2 pt-4">
                  <span className="text-sm font-semibold">
                    {testimonial.name}
                  </span>
                  {testimonial.isSample && (
                    <Badge variant="secondary" className="text-[10px]">
                      Sample
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
