import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: `Facilities & Equipment | ${siteConfig.name}`,
  description:
    "Take a look inside Aurea Fitness — state-of-the-art strength and cardio equipment, dedicated training zones, and a full gym tour.",
};

const GALLERY_IMAGES = Array.from({ length: 6 }, (_, i) => ({
  src: `/images/facilities/placeholder-${i + 1}.jpg`,
  alt: `${siteConfig.name} facility photo ${i + 1}`,
}));

export default function FacilitiesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Our Facilities
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Train on state-of-the-art strength and cardio equipment, in spaces
          designed for every kind of workout — from heavy lifting to
          high-energy group classes.
        </p>
      </div>

      {/* Equipment / facility image grid */}
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
        {GALLERY_IMAGES.map((image) => (
          <div
            key={image.src}
            className="relative aspect-square overflow-hidden rounded-xl bg-muted"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 50vw"
            />
          </div>
        ))}
      </div>

      {/* Gym tour video */}
      <div className="mx-auto mt-20 max-w-3xl">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          Take a Virtual Tour
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Can&apos;t visit in person just yet? Get a feel for {siteConfig.name}
          {" "}from the comfort of your couch.
        </p>

        <div className="mt-8 overflow-hidden rounded-xl bg-black">
          <video
            className="w-full"
            poster="/images/facilities/tour-poster.jpg"
            src="/video/gym-tour.mp4"
            muted
            controls
            loop
          >
            Your browser does not support embedded video.
          </video>
        </div>
      </div>
    </div>
  );
}
