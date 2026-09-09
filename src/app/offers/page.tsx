import type { Metadata } from "next";
import { OffersList } from "@/components/offers/OffersList";
import { siteConfig } from "@/content/site-config";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: `Current Offers | ${siteConfig.name}`,
  description:
    "See all currently active membership and trial offers at Aurea Fitness.",
};

export default function OffersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Current Offers
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Limited-time deals to help you get started or level up your
          membership.
        </p>
      </Reveal>

      <div className="mt-16">
        <OffersList />
      </div>
    </div>
  );
}
