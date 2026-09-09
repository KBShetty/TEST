"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { stockImages } from "@/content/stock-images";
import { Reveal } from "@/components/Reveal";
import type { Offer } from "@/types/content";

// Content offers currently ship with placeholder image paths (e.g.
// /images/offers/placeholder.jpg) that don't exist on disk — fall back to
// the curated stock photo whenever an offer doesn't point at a real,
// uploaded image.
function resolveOfferImage(image: string) {
  return image.startsWith("/images/") ? stockImages.offer : image;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function OffersList() {
  const [offers, setOffers] = useState<Offer[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/offers");
        if (!res.ok) throw new Error("Request failed");
        const data: { offers: Offer[] } = await res.json();
        if (!cancelled) {
          const sorted = [...data.offers].sort(
            (a, b) =>
              new Date(a.validTo).getTime() - new Date(b.validTo).getTime(),
          );
          setOffers(sorted);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <p className="text-center text-muted-foreground">
        We couldn&apos;t load current offers right now — please check back soon or
        message us on WhatsApp.
      </p>
    );
  }

  if (offers === null) {
    return (
      <p className="text-center text-muted-foreground">Loading offers...</p>
    );
  }

  if (offers.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No active offers right now — check back soon, or message us on
        WhatsApp to ask about upcoming promotions.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {offers.map((offer, i) => (
        <Reveal key={offer.id} delay={(i % 3) * 0.1}>
          <Card className="overflow-hidden py-0 shadow-sm transition-shadow hover:shadow-md">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={resolveOfferImage(offer.image)}
                alt={offer.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <Badge className="absolute right-3 top-3 px-3 py-1 text-sm font-semibold shadow">
                {offer.discount}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle>{offer.title}</CardTitle>
              <CardDescription>{offer.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Valid until {formatDate(offer.validTo)}
              </p>
            </CardContent>
            <CardFooter className="px-4 pb-4">
              <WhatsAppButton
                variant="inline"
                className="w-full justify-center"
                message={`Hi, I'd like to know more about the "${offer.title}" offer`}
              />
            </CardFooter>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
