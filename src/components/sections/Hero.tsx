"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/content/site-config";
import { stockImages } from "@/content/stock-images";

// TODO(3D): replace this gradient with a ThreeUI-derived WebGL hero scene as
// a client-only, IntersectionObserver-gated island (see plan).
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden bg-slate-950">
      <Image
        src={stockImages.hero}
        alt="Aurea Fitness gym floor bathed in dramatic light"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Decorative color wash accent, kept subtle now that the real photo carries the visual */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 animate-[aurea-mesh_18s_ease-in-out_infinite] bg-[radial-gradient(at_20%_20%,rgba(249,115,22,0.25)_0px,transparent_50%),radial-gradient(at_80%_0%,rgba(59,130,246,0.18)_0px,transparent_50%),radial-gradient(at_50%_90%,rgba(249,115,22,0.15)_0px,transparent_50%),radial-gradient(at_90%_80%,rgba(16,185,129,0.15)_0px,transparent_50%)] bg-slate-950 bg-[length:200%_200%] motion-reduce:animate-none"
      />
      <style>{`
        @keyframes aurea-mesh {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Dark overlay for text legibility over the photo */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24 sm:px-6">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-orange-400 backdrop-blur-sm"
        >
          Welcome to {siteConfig.name}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          {siteConfig.tagline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="max-w-xl text-lg text-slate-200 sm:text-xl"
        >
          No matter where you&apos;re starting from, the strongest version of
          you is built one honest workout at a time. Certified coaching,
          real community, and a plan that actually fits your life &mdash;
          that&apos;s what waits for you here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Button
            render={<Link href="/pricing" />}
            size="lg"
            className="h-12 px-8 text-base"
          >
            Join Now
          </Button>
          <WhatsAppButton
            variant="inline"
            message="Hi Aurea Fitness, I'd like to know more about joining!"
            className="h-12 px-6 text-base"
          />
        </motion.div>
      </div>
    </section>
  );
}
