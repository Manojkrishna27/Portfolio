"use client";

import { motion } from "motion/react";
import { ExternalLink, ShieldCheck, Waypoints } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BlurFade } from "@/components/ui/blur-fade";
import { certifications, type Certification } from "@/lib/certifications";
import { isValidExternalUrl } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Certification Card — horizontal wide card with tilt               */
/* ------------------------------------------------------------------ */

function CertificationCard({
  cert,
  index,
}: {
  cert: Certification;
  index: number;
}) {
  /* Alternate accent colours per card to keep things vibrant */
  const accents = [
    { from: "#06b6d4", to: "#8b5cf6" },
    { from: "#f59e0b", to: "#ef4444" },
    { from: "#10b981", to: "#3b82f6" },
    { from: "#ec4899", to: "#f97316" },
  ];
  const accent = accents[index % accents.length];

  return (
    <BlurFade delay={0.08 + index * 0.12} inView>
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        style={{ willChange: "transform" }}
        className="group relative w-full"
      >
        {/* ---- Corner diamond decorators ---- */}
        <Waypoints className="absolute -left-1.5 -top-1.5 z-10 h-3 w-3 sm:-left-2 sm:-top-2 sm:h-4 sm:w-4 fill-current"/>
        <Waypoints className="absolute -bottom-1.5 -right-1.5 z-10 h-3 w-3 sm:-bottom-2 sm:-right-2 sm:h-4 sm:w-4 fill-current" />


        {/* ---- Card body — sharp corners like project cards ---- */}
        <div className="relative flex flex-col overflow-hidden rounded-tr-md rounded-bl-md border border-white/10 bg-transparent sm:flex-row ">
          {/* ---- Lightweight static gradient background (replaces FlickeringGrid) ---- */}
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background: `radial-gradient(ellipse at 20% 30%, ${accent.from}0a 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, ${accent.to}08 0%, transparent 60%)`,
            }}
          />

          {/* Left — Certificate image */}
          <div className="relative z-1 w-full shrink-0 overflow-hidden bg-neutral-950 sm:w-56 md:w-64 lg:w-72">
            <div className="relative aspect-3/2 w-full sm:h-full sm:aspect-auto ">
              <Image
                src={cert.image}
                alt={cert.name}
                fill
                className="object-contain p-1 transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, 288px"
                loading="lazy"
              />
            </div>
          </div>

          {/* Vertical separator between image and content */}
          <div
            className="hidden sm:block w-px self-stretch"
            style={{
              background: `linear-gradient(180deg, transparent, ${accent.from}30, transparent)`,
            }}
          />

          {/* Right — Name & link */}
          <div className="relative z-1 flex flex-1 flex-col justify-center gap-2.5 p-4 sm:gap-4 sm:p-6 md:p-8">
            {/* Badge + name */}
            <div className="flex items-start gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10"
                style={{
                  background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}18)`,
                }}
              >
                <ShieldCheck
                  className="h-4.5 w-4.5"
                  style={{ color: accent.from }}
                />
              </div>
              <h3 className="text-sm font-semibold leading-snug tracking-tight text-white sm:text-base md:text-lg">
                {cert.name}
              </h3>
            </div>

            {/* Decorative separator */}
            <div
              className="h-px w-16"
              style={{
                background: `linear-gradient(90deg, ${accent.from}60, transparent)`,
              }}
            />

            {/* Optional link */}
            {cert.link && isValidExternalUrl(cert.link) && (
              <Link
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex w-fit items-center gap-1.5 rounded-sm  border px-3 py-1.5 text-xs font-medium transition-colors duration-300 sm:text-sm"
                style={{
                  color: accent.from,
                  borderColor: `${accent.from}25`,
                  backgroundColor: `${accent.from}08`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${accent.from}50`;
                  e.currentTarget.style.backgroundColor = `${accent.from}14`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${accent.from}25`;
                  e.currentTarget.style.backgroundColor = `${accent.from}08`;
                }}
              >
                View Credential
                <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover/link:translate-x-0.5" />
              </Link>
            )}
          </div>

          {/* ---- Hover glow (left-center radial) ---- */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(500px circle at 20% 50%, ${accent.from}0a, transparent 60%)`,
            }}
          />
        </div>
      </motion.div>
    </BlurFade>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function Certifications({ data }: { data?: Certification[] }) {
  const certList = data ?? certifications;
  if (certList.length === 0) return null;

  return (
    <section
      id="certifications"
      className="relative w-full py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-4xl px-6 sm:px-10 lg:px-16">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <BlurFade delay={0.04} inView>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              <span className="bg-linear-to-r from-white to-neutral-500 bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
          </BlurFade>

          <BlurFade delay={0.12} inView>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Professional certifications and credentials I&apos;ve earned
              along the way.
            </p>
          </BlurFade>
        </div>

        {/* Certification list — stacked wide cards */}
        <div className="flex flex-col gap-6">
          {certList.map((cert, idx) => (
            <CertificationCard key={cert.name} cert={cert} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
