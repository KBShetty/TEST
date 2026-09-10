import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { TESTIMONIALS_QUERY, type SanityTestimonial } from "@/sanity/queries";
import type { Testimonial } from "@/types/content";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

async function getTestimonials(): Promise<Testimonial[] | undefined> {
  if (!sanityClient) return undefined;
  try {
    const items = await sanityClient.fetch<SanityTestimonial[]>(
      TESTIMONIALS_QUERY,
      {},
      { next: { revalidate: 60, tags: ["testimonials"] } },
    );
    if (!items || items.length === 0) return undefined;
    return items.map((t) => ({
      name: t.name,
      rating: t.rating,
      quote: t.quote,
      isSample: t.isSample ?? undefined,
      photo: urlFor(t.photo)?.width(200).height(200).fit("crop").url() ?? undefined,
    }));
  } catch {
    return undefined; // Sanity unreachable/misconfigured — carousel falls back to its static file.
  }
}

// Thin server-component wrapper: fetches from Sanity (so the client can add
// testimonials with no code from /studio) and passes them down; the
// carousel itself stays a client component (it needs the rotation timer)
// and falls back to testimonials-fallback.json when nothing is passed.
export async function TestimonialsSection() {
  const testimonials = await getTestimonials();
  return <TestimonialsCarousel testimonials={testimonials} />;
}
