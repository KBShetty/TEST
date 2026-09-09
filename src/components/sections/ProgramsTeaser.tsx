import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import programs from "@/content/programs.json";
import type { Program } from "@/types/content";

export function ProgramsTeaser() {
  const items = programs as Program[];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 flex flex-col items-center text-center">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-orange-500">
          Programs
        </h2>
        <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Find the training style that fits you
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((program) => (
          <Card key={program.slug} className="h-full">
            <CardHeader>
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
        ))}
      </div>
    </section>
  );
}
