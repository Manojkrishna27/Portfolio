"use client";

import { motion } from "motion/react";
import { ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { experiences, type Experience } from "@/lib/experience";
import { isValidExternalUrl } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Experience Card                                                    */
/* ------------------------------------------------------------------ */

function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  return (
    <BlurFade delay={0.1 + index * 0.12} inView>
      <motion.div
        whileHover={{ y: -5, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        style={{ willChange: "transform" }}
      >
        <MagicCard
          className="rounded-2xl"
          gradientSize={300}
          gradientColor={`${experience.accentColor}15`}
          gradientOpacity={0.06}
          gradientFrom={experience.accentColor}
          gradientTo={`${experience.accentColor}60`}
        >
          {/* Animated border beam for upcoming */}
          {experience.upcoming && (
            <BorderBeam
              size={120}
              duration={8}
              colorFrom={experience.accentColor}
              colorTo={`${experience.accentColor}40`}
              borderWidth={2}
            />
          )}

          <div className="relative flex flex-col sm:flex-row">
            {/* Left accent strip */}
            <div
              className="relative w-full sm:w-1.5 rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl shrink-0 min-h-[4px]"
              style={{
                background: `linear-gradient(180deg, ${experience.accentColor}, ${experience.accentColor}30)`,
              }}
            />

            {/* Main content area */}
            <div className="flex-1 p-4 sm:p-7">
              {/* Top row: duration + badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium tracking-wide"
                  style={{
                    color: experience.accentColor,
                    backgroundColor: `${experience.accentColor}10`,
                    border: `1px solid ${experience.accentColor}20`,
                  }}
                >
                  {experience.duration}
                </span>

                {experience.upcoming && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                    <Sparkles className="h-3 w-3" />
                    Upcoming
                  </span>
                )}
              </div>

              {/* Role — large and bold */}
              <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                {experience.role}
              </h3>

              {/* Company */}
              <div className="mt-1.5 flex items-center gap-1.5">
                {isValidExternalUrl(experience.companyUrl) ? (
                  <Link
                    href={experience.companyUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200"
                    style={{ color: experience.accentColor }}
                  >
                    <span className="underline decoration-transparent underline-offset-4 transition-all duration-200 group-hover/link:decoration-current">
                      {experience.company}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover/link:opacity-100" />
                  </Link>
                ) : (
                  <span
                    className="text-sm font-medium"
                    style={{ color: experience.accentColor }}
                  >
                    {experience.company}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div
                className="my-4 h-px w-full"
                style={{
                  background: `linear-gradient(90deg, ${experience.accentColor}25, transparent 80%)`,
                }}
              />

              {/* Description — impact bullets */}
              <ul className="space-y-2 sm:space-y-3">
                {experience.description.map((point, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm leading-relaxed text-neutral-400"
                  >
                    <span
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor: experience.accentColor,
                        boxShadow: `0 0 0 2px ${experience.accentColor}30`,
                      }}
                    />
                    <span className="transition-colors duration-200 group-hover:text-neutral-300">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </MagicCard>
      </motion.div>
    </BlurFade>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function ExperienceSection({
  data,
}: {
  data?: Experience[];
}) {
  const items = data ?? experiences;

  return (
    <section id="experience" className="relative w-full py-16 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-4xl px-6 sm:px-10 lg:px-16">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <BlurFade delay={0.04} inView>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              <span className="bg-linear-to-r from-white to-neutral-500 bg-clip-text text-transparent">
                Where I&apos;ve Been
              </span>
            </h2>
          </BlurFade>

          <BlurFade delay={0.12} inView>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A timeline of roles, contributions, and the impact
              I&apos;ve made along the way.
            </p>
          </BlurFade>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {items.map((exp, idx) => (
            <ExperienceCard key={idx} experience={exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
