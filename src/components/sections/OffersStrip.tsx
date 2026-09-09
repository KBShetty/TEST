"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/Reveal";
import type { Offer } from "@/types/content";

export function OffersStrip() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let cancelled = false;

    fetch("/api/offers")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load offers");
        return res.json();
      })
      .then((data: { offers: Offer[] }) => {
        if (!cancelled) {
          setOffers(data.offers ?? []);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Don't let a failed fetch break the page — just skip the section quietly.
  if (status === "error" || status === "loading") return null;

  if (offers.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <p className="text-muted-foreground">
          No active offers right now — check back soon!
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Reveal className="mb-10 flex flex-col items-center text-center">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-orange-500">
          Limited-Time Offers
        </h2>
        <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Great deals, no better time to start
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offers.slice(0, 3).map((offer, i) => (
          <Reveal key={offer.id} delay={i * 0.1}>
            <Card className="h-full shadow-sm transition-shadow hover:shadow-md">
              <CardHeader>
                <Badge className="w-fit">{offer.discount}</Badge>
                <CardTitle className="mt-2">{offer.title}</CardTitle>
                <CardDescription>{offer.description}</CardDescription>
              </CardHeader>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/offers"
          className="text-sm font-semibold text-foreground underline underline-offset-4 hover:text-orange-500"
        >
          View All Offers →
        </Link>
      </div>
    </section>
  );
}
