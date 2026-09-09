"use client";

import { useEffect, useState } from "react";
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
import type { Offer } from "@/types/content";

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
      {offers.map((offer) => (
        <Card key={offer.id}>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle>{offer.title}</CardTitle>
              <Badge>{offer.discount}</Badge>
            </div>
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
      ))}
    </div>
  );
}
