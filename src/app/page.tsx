import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ProgramsTeaser } from "@/components/sections/ProgramsTeaser";
import { OffersStrip } from "@/components/sections/OffersStrip";
import { WhyUs } from "@/components/sections/WhyUs";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { GalleryTeaser } from "@/components/sections/GalleryTeaser";
import { CTABanner } from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <TrustBar />
      <AboutTeaser />
      <ProgramsTeaser />
      <OffersStrip />
      <WhyUs />
      <TestimonialsCarousel />
      <GalleryTeaser />
      <CTABanner />
    </div>
  );
}
