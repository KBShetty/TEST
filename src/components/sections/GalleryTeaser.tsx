import Image from "next/image";
import Link from "next/link";

// Placeholder image paths — actual files under public/images/gallery/ don't
// exist yet. next/image will 404 the request but that does not break the
// build or the page render.
const GALLERY_IMAGES = Array.from({ length: 6 }, (_, i) => ({
  src: `/images/gallery/placeholder-${i + 1}.jpg`,
  alt: `Aurea Fitness gallery photo ${i + 1}`,
}));

export function GalleryTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 flex flex-col items-center text-center">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-orange-500">
          Take a Look Inside
        </h2>
        <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Our facility, our energy
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {GALLERY_IMAGES.map((image) => (
          <div
            key={image.src}
            className="relative aspect-square overflow-hidden rounded-lg bg-muted"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
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
