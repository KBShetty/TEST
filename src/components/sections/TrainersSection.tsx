import Image from "next/image";
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { TRAINERS_QUERY, type SanityTrainer } from "@/sanity/queries";
import trainersData from "@/content/trainers.json";
import type { Trainer } from "@/types/content";
import { stockImages } from "@/content/stock-images";
import { Reveal } from "@/components/Reveal";

async function getTrainers(): Promise<{ trainer: Trainer; photoUrl: string | null }[]> {
  if (sanityClient) {
    try {
      const sanityTrainers = await sanityClient.fetch<SanityTrainer[]>(
        TRAINERS_QUERY,
        {},
        { next: { revalidate: 60, tags: ["trainers"] } },
      );
      if (sanityTrainers && sanityTrainers.length > 0) {
        return sanityTrainers.map((t) => ({
          trainer: {
            name: t.name,
            specialty: t.specialty,
            certifications: t.certifications,
            yearsExperience: t.yearsExperience,
            photo: "", // unused once photoUrl is present — kept for the Trainer type shape
            quote: t.quote ?? "",
          },
          photoUrl: urlFor(t.photo)?.width(256).height(256).fit("crop").url() ?? null,
        }));
      }
    } catch {
      // Sanity unreachable/misconfigured — fall through to the static fallback below.
    }
  }

  const fallback = trainersData as Trainer[];
  return fallback.map((trainer, i) => ({
    trainer,
    photoUrl: stockImages.trainers[i % stockImages.trainers.length],
  }));
}

// Server component — fetches from Sanity (so the client can add/rename/
// remove trainers with no code from /studio) and falls back to the static
// trainers.json + stock photos if Sanity is empty or unreachable.
export async function TrainersSection() {
  const trainers = await getTrainers();

  return (
    <section>
      <Reveal className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Certified Trainers</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Every trainer here is certified, experienced, and genuinely invested
          in helping you hit your goals.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {trainers.map(({ trainer, photoUrl }, i) => (
          <Reveal
            key={trainer.name}
            delay={(i % 3) * 0.1}
            className="flex flex-col items-center rounded-xl bg-card p-6 text-center shadow-sm ring-1 ring-foreground/10 transition-shadow hover:shadow-md"
          >
            <div className="relative size-32 overflow-hidden rounded-full bg-muted ring-2 ring-primary/20">
              {photoUrl && (
                <Image
                  src={photoUrl}
                  alt={trainer.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              )}
            </div>
            <h3 className="mt-4 text-lg font-semibold">{trainer.name}</h3>
            <p className="text-sm font-medium text-primary">{trainer.specialty}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {trainer.yearsExperience}+ years experience
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {trainer.certifications.join(", ")}
            </p>
            {trainer.quote && (
              <p className="mt-4 text-sm italic text-muted-foreground">
                &ldquo;{trainer.quote}&rdquo;
              </p>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
