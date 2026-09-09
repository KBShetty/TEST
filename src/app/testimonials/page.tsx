import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/content/site-config";
import testimonialsData from "@/content/testimonials-fallback.json";
import type { Testimonial } from "@/types/content";

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
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Member Reviews
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Real feedback from members training at {siteConfig.name}.
        </p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={`${testimonial.name}-${index}`}>
            <CardContent className="flex flex-col gap-3">
              <StarRating rating={testimonial.rating} />
              <p className="text-sm text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-auto flex items-center gap-2 pt-2">
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
        ))}
      </div>
    </div>
  );
}
