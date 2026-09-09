// Central place for everything that will change once the client sends real
// brand assets/business details. Nothing else in the codebase should
// hardcode these values — import from here instead.
//
// NOTE: every value below is a PLACEHOLDER until Aurea Fitness sends their
// real logo, colors, and business details (see /client-intake-checklist.md).

export const siteConfig = {
  name: "Aurea Fitness",
  tagline: "Train Strong, Live Stronger",
  taglineOptions: [
    "Train Strong, Live Stronger",
    "Your Strongest Self Starts Here",
    "Stronger Every Day, Together",
  ],
  description:
    "Aurea Fitness is a modern gym offering certified personal training, group classes, functional training, and cardio/endurance programs in a supportive community.",

  // Placeholder contact details — replace once the client confirms.
  phone: "+91 00000 00000",
  whatsappNumber: "910000000000", // E.164, no + or spaces, used for wa.me links
  email: "hello@aureafitness.example",
  address: {
    line1: "123 Fitness Street",
    city: "Your City",
    state: "State",
    postalCode: "000000",
    country: "India",
  },
  hours: {
    weekdays: "6:00 AM – 10:00 PM",
    weekends: "7:00 AM – 8:00 PM",
  },

  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },

  // Google Business Profile Place ID — required for live Google Reviews.
  // Leave empty to fall back to content/testimonials-fallback.json.
  googlePlaceId: "",

  // Placeholder brand palette (swap for the client's real colors in
  // src/app/globals.css CSS variables once supplied).
  brand: {
    primary: "#0f172a", // slate-900 — placeholder "energetic dark" primary
    accent: "#f97316", // orange-500 — placeholder motivational accent
  },
} as const;

export const whatsappLink = (message: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
