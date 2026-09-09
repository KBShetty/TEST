import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";
import programs from "@/content/programs.json";
import { stockImages } from "@/content/stock-images";
import type { Program } from "@/types/content";

export function ProgramsTeaser() {
  const items = programs as Program[];

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Reveal className="mb-10 flex flex-col items-center text-center">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-orange-500">
          Programs
        </h2>
        <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Find the training style that fits you
        </p>
      </Reveal>

      <Reveal
        delay={0.1}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((program) => {
          const image = stockImages.programs[program.slug];

          return (
            <Card
              key={program.slug}
              className="h-full overflow-hidden py-0 shadow-sm transition-shadow hover:shadow-md"
            >
              {image && (
                <div className="relative aspect-video w-full">
                  <Image
                    src={image}
                    alt={program.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader className="pt-6">
                <CardTitle>{program.name}</CardTitle>
                <CardDescription>{program.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/programs#${program.slug}`}
                  className="text-sm font-semibold text-foreground underline underline-offset-4 hover:text-orange-500"
                >
                  Learn More →
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </Reveal>
    </section>
  );
}
