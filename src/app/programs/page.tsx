import type { Metadata } from "next";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/content/site-config";
import { stockImages } from "@/content/stock-images";
import { Reveal } from "@/components/Reveal";
import programsData from "@/content/programs.json";
import type { Program } from "@/types/content";

const programs = programsData as Program[];

export const metadata: Metadata = {
  title: `Programs & Classes | ${siteConfig.name}`,
  description:
    "Explore personal training, group classes, functional training, and cardio & endurance programs at Aurea Fitness.",
};

export default function ProgramsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Programs & Classes
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Whatever your goal, we have a program built to get you there —
          guided every step of the way by certified trainers.
        </p>
      </Reveal>

      <div className="mt-16 space-y-16">
        {programs.map((program, index) => (
          <section
            key={program.slug}
            id={program.slug}
            className="scroll-mt-24"
          >
            <Reveal
              className={`grid items-center gap-8 md:grid-cols-2 ${
                index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-video overflow-hidden rounded-xl bg-muted shadow-sm transition-shadow hover:shadow-md">
                <Image
                  src={stockImages.programs[program.slug] ?? program.image}
                  alt={program.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {program.name}
                </h2>
                <p className="mt-2 text-base font-medium text-primary">
                  {program.shortDescription}
                </p>
                <p className="mt-4 text-muted-foreground">
                  {program.description}
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Who it&apos;s for:{" "}
                  </span>
                  {program.whoItsFor}
                </p>

                <div className="mt-6">
                  <WhatsAppButton
                    variant="inline"
                    message={`Hi, I'd like to try ${program.name}`}
                  />
                </div>
              </div>
            </Reveal>

            {index < programs.length - 1 && <Separator className="mt-16" />}
          </section>
        ))}
      </div>
    </div>
  );
}
