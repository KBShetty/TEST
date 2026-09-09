import { Badge } from "@/components/ui/badge";

// Qualitative trust points only — no invented numbers/stats until the client
// supplies real figures (e.g. member counts, years in business).
const TRUST_POINTS = [
  "Certified personal trainers",
  "State-of-the-art equipment",
  "A genuinely supportive community",
  "Programs for every fitness level",
];

export function TrustBar() {
  return (
    <section className="border-y bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-4 py-6 sm:justify-between sm:px-6">
        {TRUST_POINTS.map((point) => (
          <Badge
            key={point}
            variant="outline"
            className="h-auto whitespace-normal px-3 py-1.5 text-sm font-medium"
          >
            {point}
          </Badge>
        ))}
      </div>
    </section>
  );
}
