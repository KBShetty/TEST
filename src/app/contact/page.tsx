import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/content/site-config";
import { stockImages } from "@/content/stock-images";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.name}`,
  description:
    "Get in touch with Aurea Fitness — visit us, call, WhatsApp, or send a message.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Questions about programs, pricing, or membership? Reach out — we&apos;d
          love to hear from you.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        {/* Business details */}
        <Reveal className="flex flex-col gap-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={stockImages.contact}
              alt={`${siteConfig.name} storefront`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 40vw, 90vw"
            />
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-sm text-muted-foreground">
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.state}{" "}
                  {siteConfig.address.postalCode}
                  <br />
                  {siteConfig.address.country}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Hours</h3>
                <p className="text-sm text-muted-foreground">
                  Weekdays: {siteConfig.hours.weekdays}
                  <br />
                  Weekends: {siteConfig.hours.weekends}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-sm text-muted-foreground">
                  {siteConfig.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-sm text-muted-foreground">
                  {siteConfig.email}
                </p>
              </div>
            </div>

            <WhatsAppButton
              variant="inline"
              message={`Hi ${siteConfig.name}, I have a question!`}
            />
          </div>
        </Reveal>

        {/* Contact form */}
        <Reveal
          delay={0.1}
          className="h-fit rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/10 sm:p-8"
        >
          <h2 className="text-lg font-semibold">Send us a message</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We typically respond within one business day.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
