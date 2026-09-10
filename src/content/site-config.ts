// Central place for everything that will change once the client sends real
// brand assets/business details. Nothing else in the codebase should
// hardcode these values — import from here instead.
//
// Business details below are confirmed (see /client-intake-checklist.md and
// the "latest website details" doc). Still pending from the client: the
// final logo file itself (vector/PNG, transparent bg — only an Instagram
// screenshot has been shared so far), Google Place ID, trainer/gallery
// content, and pricing.

export const siteConfig = {
  name: "Aurea Fitness",
  tagline: "Train Strong, Live Stronger",
  taglineOptions: [
    "Train Strong, Live Stronger",
    "Your Strongest Self Starts Here",
    "Stronger Every Day, Together",
  ],
  description:
    "Aurea Fitness is a modern 24/7 gym in Kandivali West, Mumbai, offering certified personal training, group classes, functional training, and cardio/endurance programs in a supportive community.",

  phone: "+91 91371 76414",
  whatsappNumber: "919137176414", // E.164, no + or spaces, used for wa.me links
  email: "hello@aureafitness.example",
  address: {
    line1: "Mathuradas Road, Bhagat Colony",
    city: "Kandivali West, Mumbai",
    state: "Maharashtra",
    postalCode: "400067",
    country: "India",
  },
  googleMapsUrl: "https://maps.app.goo.gl/g5tYhCsajdo2iNnX8?g_st=ac",

  // Genuinely 24/7 — not staffed hours vs. access hours.
  hours: {
    weekdays: "Open 24/7",
    weekends: "Open 24/7",
  },

  social: {
    instagram: "https://www.instagram.com/aureafitnessofficial",
    facebook: "",
    youtube: "",
  },

  // Google Business Profile Place ID — required for live Google Reviews.
  // Leave empty to fall back to content/testimonials-fallback.json.
  googlePlaceId: "",

  // Approximate palette read off the Instagram profile screenshot (black
  // background, gold/amber "AF" mark + wordmark) — swap for exact values
  // once the client sends the actual logo file (vector/PNG, transparent bg).
  brand: {
    primary: "#0a0a0a", // near-black base, matches the logo's dark circle
    accent: "#d4af37", // gold, matches the logo mark (replaces the old generic orange-500)
  },
} as const;

export const whatsappLink = (message: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
