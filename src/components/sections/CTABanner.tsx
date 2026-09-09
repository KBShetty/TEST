import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";

export function CTABanner() {
  return (
    <section className="bg-slate-950 py-20 text-white sm:py-28">
      <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Ready to start? Your strongest chapter begins today.
        </h2>
        <p className="max-w-xl leading-relaxed text-slate-300">
          Stop waiting for the &ldquo;right time&rdquo; &mdash; it&apos;s
          whenever you decide to show up. Join Aurea Fitness and
          let&apos;s get to work.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            render={<Link href="/pricing" />}
            size="lg"
            className="h-12 px-8 text-base"
          >
            Join Now
          </Button>
          <WhatsAppButton
            variant="inline"
            message="Hi Aurea Fitness, I'm ready to join!"
            className="h-12 px-6 text-base"
          />
        </div>
      </Reveal>
    </section>
  );
}
