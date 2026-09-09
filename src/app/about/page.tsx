import type { Metadata } from "next";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/content/site-config";
import trainersData from "@/content/trainers.json";
import type { Trainer } from "@/types/content";
import { stockImages } from "@/content/stock-images";
import { Reveal } from "@/components/Reveal";

const trainers = trainersData as Trainer[];

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

      {/* Trainers */}
      <section>
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Certified Trainers
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Every trainer at {siteConfig.name} is certified, experienced, and
            genuinely invested in helping you hit your goals.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer, i) => (
            <Reveal
              key={trainer.name}
              delay={(i % 3) * 0.1}
              className="flex flex-col items-center rounded-xl bg-card p-6 text-center shadow-sm ring-1 ring-foreground/10 transition-shadow hover:shadow-md"
            >
              <div className="relative size-32 overflow-hidden rounded-full bg-muted ring-2 ring-primary/20">
                <Image
                  src={stockImages.trainers[i % stockImages.trainers.length]}
                  alt={trainer.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{trainer.name}</h3>
              <p className="text-sm font-medium text-primary">
                {trainer.specialty}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {trainer.yearsExperience}+ years experience
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {trainer.certifications.join(", ")}
              </p>
              <p className="mt-4 text-sm italic text-muted-foreground">
                &ldquo;{trainer.quote}&rdquo;
              </p>
            </Reveal>
          ))}
        </div>
      </section>

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
