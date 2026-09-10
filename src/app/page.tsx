import { Hero } from "@/components/sections/Hero";
import { QuoteOfTheDay } from "@/components/sections/QuoteOfTheDay";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ProgramsTeaser } from "@/components/sections/ProgramsTeaser";
import { OffersStrip } from "@/components/sections/OffersStrip";
import { WhyUs } from "@/components/sections/WhyUs";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { GalleryTeaser } from "@/components/sections/GalleryTeaser";
import { InstagramCards } from "@/components/sections/InstagramCards";
import { CTABanner } from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <QuoteOfTheDay />
      <TrustBar />
      <AboutTeaser />
      <ProgramsTeaser />
      <OffersStrip />
      <WhyUs />
      <TestimonialsSection />
      <GalleryTeaser />
      <InstagramCards />
      <CTABanner />
    </div>
  );
}
