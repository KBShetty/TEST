import type { Metadata } from "next";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/content/site-config";
import { stockImages } from "@/content/stock-images";
import { Reveal } from "@/components/Reveal";
import { TrainersSection } from "@/components/sections/TrainersSection";

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.name}`,
  description:
    "Learn about Aurea Fitness's mission, our certified trainers, and the community-first philosophy behind every program we run.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      {/* Mission / story */}
      <section className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Our Story
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            {siteConfig.name} was founded on a simple idea: fitness should feel
            like something you build together, not something you push through
            alone. What started as a handful of trainers and a shared belief in
            real, sustainable progress has grown into a full community of
            members who show up for each other every single day.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Our mission is to make expert coaching, modern equipment, and a
            genuinely supportive environment accessible to anyone ready to
            commit to their health — whether that&apos;s your very first workout or
            your thousandth.
          </p>
        </Reveal>
        <Reveal
          delay={0.1}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg"
        >
          <Image
            src={stockImages.about}
            alt={`Inside ${siteConfig.name}`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 40vw, 90vw"
            priority
          />
        </Reveal>
      </section>

      <Separator className="my-16 sm:my-20" />

      {/* Trainers — sourced from Sanity (/studio), falls back to trainers.json */}
      <TrainersSection />

      <Separator className="my-16 sm:my-20" />

      {/* Philosophy / community */}
      <Reveal as="section" className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          More Than a Gym
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          We believe fitness sticks when it&apos;s built on community, not
          willpower alone. That&apos;s why every program at {siteConfig.name} is
          designed around accountability, encouragement, and celebrating
          progress — big or small.
        </p>
        <p className="mt-4 text-lg text-muted-foreground">
          Whether you&apos;re chasing a personal record, training for an event, or
          simply trying to feel stronger in everyday life, you&apos;ll find people
          here who are training right alongside you.
        </p>
      </Reveal>
    </div>
  );
}
