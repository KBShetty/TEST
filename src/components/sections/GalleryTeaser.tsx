import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { stockImages } from "@/content/stock-images";

const GALLERY_IMAGES = stockImages.gallery.map((src, i) => ({
  src,
  alt: `Aurea Fitness gallery photo ${i + 1}`,
}));

export function GalleryTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Reveal className="mb-10 flex flex-col items-center text-center">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-orange-500">
          Take a Look Inside
        </h2>
        <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Our facility, our energy
        </p>
      </Reveal>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {GALLERY_IMAGES.map((image, i) => (
          <Reveal key={image.src} delay={i * 0.1}>
            <div className="group relative aspect-square overflow-hidden rounded-lg bg-muted shadow-sm transition-shadow hover:shadow-lg">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/facilities"
          className="text-sm font-semibold text-foreground underline underline-offset-4 hover:text-orange-500"
        >
          See Full Gallery →
        </Link>
      </div>
    </section>
  );
}
