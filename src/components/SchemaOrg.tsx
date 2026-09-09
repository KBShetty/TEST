import { siteConfig } from "@/content/site-config";

// JSON-LD structured data so search engines understand this as a local gym
// business (helps local-SEO / Google map-pack ranking).
export function SchemaOrg() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: siteConfig.name,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: siteConfig.hours.weekdays.split("–")[0]?.trim(),
        closes: siteConfig.hours.weekdays.split("–")[1]?.trim(),
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: siteConfig.hours.weekends.split("–")[0]?.trim(),
        closes: siteConfig.hours.weekends.split("–")[1]?.trim(),
      },
    ],
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
