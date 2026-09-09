import type { Metadata } from "next";
import { Check } from "lucide-react";
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
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: `Membership & Pricing | ${siteConfig.name}`,
  description:
    "Compare Aurea Fitness membership tiers — Basic, Standard, and Premium — and find the plan that fits your goals.",
};

// NOTE: prices below are placeholder INR figures for layout purposes only —
// replace with the client's real membership pricing once confirmed.
const TIERS = [
  {
    name: "Basic",
    price: "₹1,499",
    period: "/month",
    description: "Everything you need to get started.",
    features: [
      "Full gym floor access",
      "Standard operating hours",
      "Locker room access",
      "1 free trainer consultation",
    ],
    featured: false,
  },
  {
    name: "Standard",
    price: "₹2,499",
    period: "/month",
    description: "Our most popular plan for consistent progress.",
    features: [
      "Everything in Basic",
      "Unlimited group classes",
      "Monthly progress check-in",
      "Guest passes (2/month)",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: "₹3,999",
    period: "/month",
    description: "Full access plus dedicated personal training.",
    features: [
      "Everything in Standard",
      "4 personal training sessions/month",
      "Custom nutrition guidance",
      "Priority class booking",
    ],
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Membership & Pricing
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Simple, transparent plans built around how often — and how deeply —
          you want to train with us.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {TIERS.map((tier) => (
          <Card
            key={tier.name}
            className={
              tier.featured
                ? "relative border-2 ring-2 ring-primary"
                : "relative"
            }
          >
            {tier.featured && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold text-foreground">
                  {tier.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  {tier.period}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="px-4 pb-4">
              <WhatsAppButton
                variant="inline"
                className="w-full justify-center"
                message={`Hi, I'd like to join the ${tier.name} plan at ${siteConfig.name}`}
              />
            </CardFooter>
          </Card>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-muted-foreground">
        Pricing may vary based on offers and location. Message us on WhatsApp
        for the latest rates and any ongoing promotions.
      </p>
    </div>
  );
}
