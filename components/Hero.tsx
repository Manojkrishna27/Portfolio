"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import Link from "next/link";
import { LineShadowText } from "./ui/line-shadow-text";
import { SplineErrorBoundary } from "./SplineErrorBoundary";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ASSETS, SITE } from "@/lib/constants";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden />,
});

interface HeroData {
  greeting: string;
  name: string;
  tagline: string;
  splineUrl: string;
}

export default function Hero({ data }: { data?: HeroData }) {
  const greeting = data?.greeting || "Hey, I'm";
  const name = data?.name || SITE.name;
  const tagline = data?.tagline || SITE.role;
  const splineUrl = data?.splineUrl || "https://prod.spline.design/AeryvEqWxr2qjINc/scene.splinecode";
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-16">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between">
          {/* Text content — centered on mobile, left-aligned on desktop */}
          <div className="max-w-xl space-y-6 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-mono text-sm tracking-widest text-muted-foreground uppercase"
            >
              {greeting}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <LineShadowText
                className="text-5xl leading-none font-bold italic sm:text-6xl md:text-7xl lg:text-8xl"
                shadowColor="white"
              >
                {name}
              </LineShadowText>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              {tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start"
            >
              <button
                onClick={() => {
                  const el = document.getElementById("projects");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex h-10 items-center rounded-lg bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-neutral-200 cursor-pointer"
              >
                View Work
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("contact");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex h-10 items-center rounded-lg border border-white/10 px-5 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 cursor-pointer"
              >
                Get in Touch
              </button>
              <Link
                href={ASSETS.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 px-5 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5"
              >
                <Download className="h-4 w-4" />
                Resume
              </Link>
            </motion.div>
          </div>

          {/* Spline — desktop only */}
          {isDesktop && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative flex items-center justify-center h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96"
            >
              <div className="h-full w-full scale-125 pointer-events-none">
                <SplineErrorBoundary>
                  <Spline scene={splineUrl} />
                </SplineErrorBoundary>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
