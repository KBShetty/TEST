import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/content/site-config";
import { stockImages } from "@/content/stock-images";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: `Facilities & Equipment | ${siteConfig.name}`,
  description:
    "Take a look inside Aurea Fitness — state-of-the-art strength and cardio equipment, dedicated training zones, and a full gym tour.",
};

const GALLERY_IMAGES = stockImages.facilities.map((src, i) => ({
  src,
  alt: `${siteConfig.name} facility photo ${i + 1}`,
}));

export default function FacilitiesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Our Facilities
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Train on state-of-the-art strength and cardio equipment, in spaces
          designed for every kind of workout — from heavy lifting to
          high-energy group classes.
        </p>
      </Reveal>

      {/* Equipment / facility image grid */}
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
        {GALLERY_IMAGES.map((image, i) => (
          <Reveal
            key={image.src}
            delay={(i % 3) * 0.1}
            className="relative aspect-square overflow-hidden rounded-xl bg-muted shadow-sm transition-shadow hover:shadow-md"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 50vw"
            />
          </Reveal>
        ))}
      </div>

      {/* Gym tour visual — replace with the real walkthrough video once the
          client sends one; there's no /video/gym-tour.mp4 file yet so a
          broken <video> element would look worse than a strong static shot. */}
      <Reveal className="mx-auto mt-20 max-w-3xl">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          Take a Virtual Tour
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Can&apos;t visit in person just yet? Get a feel for {siteConfig.name}
          {" "}from the comfort of your couch.
        </p>

        <div className="relative mt-8 aspect-video overflow-hidden rounded-xl shadow-lg">
          <Image
            src={stockImages.facilities[0]}
            alt={`${siteConfig.name} gym tour preview`}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 768px, 100vw"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-6">
            <p className="text-lg font-semibold text-white">
              Take a look inside
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
