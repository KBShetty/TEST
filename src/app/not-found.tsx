"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Same floating-shape treatment as HeroGeometric (src/components/ui/shape-landing-hero.tsx),
// inlined here so this page can layer its own gym-equipment background photo
// underneath the shapes instead of the plain dark ground that component uses.
function GoldShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  y = 15,
  gradient = "from-[#d4af37]/[0.16]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  y?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 2.4, delay, ease: [0.23, 0.86, 0.39, 0.96], opacity: { duration: 1.2 } }}
      className={`absolute ${className ?? ""}`}
    >
      <motion.div
        animate={{ y: [0, y, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r to-transparent ${gradient} backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]`}
        />
      </motion.div>
    </motion.div>
  );
}

// NOTE: public/images/404-gym-background.jpg does not exist yet — drop your
// real gym-equipment photo in at that path and it appears automatically.
// Using a plain CSS background (not next/image) deliberately here: a missing
// file just renders nothing, with no broken-image icon and no image-optimizer
// error, so the page is safe to ship before the photo arrives.
const BACKGROUND_IMAGE = "/images/404-gym-background.jpg";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Gym equipment background photo — replace the file above with your own */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
      />
      <div className="absolute inset-0 bg-[#0a0a0a]/70" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/[0.06] via-transparent to-[#d4af37]/[0.04] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <GoldShape delay={0.3} width={600} height={140} rotate={12} className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />
        <GoldShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-[#d4af37]/[0.12]" className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" />
        <GoldShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-white/[0.10]" className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" />
        <GoldShape delay={0.6} width={200} height={60} rotate={20} gradient="from-[#d4af37]/[0.20]" className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1"
        >
          <Dumbbell className="size-4 text-[#d4af37]" />
          <span className="text-sm text-white/60 tracking-wide">Aurea Fitness</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-white/90 to-[#d4af37] sm:text-8xl"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-4 text-lg text-white/60 sm:text-xl"
        >
          Looks like this rep didn&apos;t land. The page you&apos;re looking
          for doesn&apos;t exist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            render={<Link href="/" />}
            size="lg"
            className="bg-[#d4af37] text-black hover:bg-[#d4af37]/90"
          >
            Back to home
          </Button>
          <WhatsAppButton
            variant="inline"
            message="Hi Aurea Fitness, I got lost on your site — can you help?"
          />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/80" />
    </div>
  );
}
