import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/content/site-config";
import { stockImages } from "@/content/stock-images";

export function AboutTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
          <Image
            src={stockImages.about}
            alt={`Inside ${siteConfig.name}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={0.1} className="mx-auto max-w-xl text-center lg:text-left">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            Our Mission
          </h2>
          <p className="mt-3 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            We believe fitness should feel like progress, not punishment.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {siteConfig.name} was built for real people with real schedules —
            not just athletes. Our coaches meet you where you are, our
            community keeps you showing up, and every program is designed to
            make consistency the easiest part of your day.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block text-sm font-semibold text-foreground underline underline-offset-4 hover:text-orange-500"
          >
            Learn more about us →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
