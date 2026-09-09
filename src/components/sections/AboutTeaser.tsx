import Link from "next/link";
import { siteConfig } from "@/content/site-config";

export function AboutTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
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
      </div>
    </section>
  );
}
