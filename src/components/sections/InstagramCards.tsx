import { Instagram } from "lucide-react";
import SocialCards, { type CardItem } from "@/components/ui/card-fan-carousel";
import { siteConfig } from "@/content/site-config";

// Placeholder photo slots. Deliberately NOT using stock/Unsplash photos here
// — labeling stand-in stock photography as "our Instagram" would be
// misleading. Drop your real Instagram photo exports into
// public/images/social/instagram-1.jpg … -6.jpg and swap PLACEHOLDER below
// for that path; until then this renders an obvious "photo coming soon"
// tile instead of a broken-image icon.
const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
      <rect width='400' height='400' fill='#141414'/>
      <rect x='0.5' y='0.5' width='399' height='399' fill='none' stroke='#d4af37' stroke-opacity='0.25'/>
      <text x='200' y='210' font-family='sans-serif' font-size='16' fill='#d4af37' fill-opacity='0.6' text-anchor='middle'>Photo coming soon</text>
    </svg>`,
  );

const CARDS: CardItem[] = Array.from({ length: 6 }, (_, i) => ({
  imgUrl: PLACEHOLDER,
  alt: `Aurea Fitness Instagram post ${i + 1} — photo coming soon`,
  linkUrl: siteConfig.social.instagram || undefined,
}));

export function InstagramCards() {
  if (!siteConfig.social.instagram) return null;

  return (
    <section className="bg-[#0a0a0a] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1">
          <Instagram className="size-4 text-[#d4af37]" />
          <span className="text-sm text-white/60 tracking-wide">
            @aureafitnessofficial
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Follow Along
        </h2>
        <p className="mt-2 text-white/50">
          The latest from the gym floor — follow us on Instagram.
        </p>
      </div>

      <SocialCards cards={CARDS} />

      <div className="mt-2 text-center">
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#d4af37] hover:underline"
        >
          <Instagram className="size-4" /> View on Instagram
        </a>
      </div>
    </section>
  );
}
