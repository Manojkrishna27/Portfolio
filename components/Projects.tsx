"use client";

import { motion } from "motion/react";
import { ExternalLink, Github, PlusIcon } from "lucide-react";
import Image from "next/image";

import { BlurFade } from "@/components/ui/blur-fade";
import { Lens } from "@/components/ui/lens";
import { projects, type Project } from "@/lib/projects";
import { isValidExternalUrl } from "@/lib/constants";
import Link from "next/link";



/* ------------------------------------------------------------------ */
/*  Project Card                                                       */
/* ------------------------------------------------------------------ */

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <BlurFade delay={0.08 + index * 0.12} inView className="h-full">
      <div className="relative h-full w-full">
        {/* ---- Corner plus icons (outside card overflow) ---- */}
        <PlusIcon className="absolute -left-2 -top-2 z-10 h-4 w-4 sm:-left-3 sm:-top-3 sm:h-6 sm:w-6 text-white" />
        <PlusIcon className="absolute -right-2 -top-2 z-10 h-4 w-4 sm:-right-3 sm:-top-3 sm:h-6 sm:w-6 text-white" />
        <PlusIcon className="absolute -bottom-2 -left-2 z-10 h-4 w-4 sm:-bottom-3 sm:-left-3 sm:h-6 sm:w-6 text-white" />
        <PlusIcon className="absolute -bottom-2 -right-2 z-10 h-4 w-4 sm:-bottom-3 sm:-right-3 sm:h-6 sm:w-6 text-white" />

        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{ willChange: "transform" }}
          className="group relative flex h-full flex-col overflow-hidden rounded-none border border-white/10 bg-transparent"
        >
        {/* ---- Lightweight static gradient background (replaces FlickeringGrid) ---- */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${project.accentColor}08 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, ${project.accentColor}06 0%, transparent 50%)`,
          }}
        />

        {/* ---- Content wrapper ---- */}
        <div className="p-1">
          {/* Image / Video area with Lens */}
          <div className="relative overflow-hidden">
            <Lens zoomFactor={1.5} lensSize={140} lensColor="black">
              <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-950">
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="select-none font-mono text-xs tracking-wider text-neutral-600">
                      preview
                    </span>
                  </div>
                )}
              </div>
            </Lens>
          </div>

          {/* Separator */}
          <div
            className="h-px w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${project.accentColor}40, transparent)`,
            }}
          />

          {/* Info section */}
          <div className="flex flex-1 flex-col gap-2 p-4 sm:gap-3 sm:p-5">
            {/* Title */}
            <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
              {project.title}
            </h3>

            {/* Description */}
            <p className="line-clamp-2 text-xs leading-relaxed text-neutral-400 sm:line-clamp-3 sm:text-sm">
              {project.description}
            </p>

            {/* Tags */}
            <div className="mt-auto flex flex-wrap gap-1 pt-2 sm:gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/6 bg-white/4 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500 transition-colors duration-200 group-hover:text-neutral-400 sm:px-2 sm:text-[11px]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links — GitHub only when URL is set; Live Demo when liveUrl exists */}
            <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-white/6 pt-2 sm:mt-3 sm:gap-3 sm:pt-3">
              {isValidExternalUrl(project.githubUrl) && (
                <Link
                  href={project.githubUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/3 px-2.5 py-1 text-[11px] font-medium text-neutral-400 transition-all duration-200 hover:border-white/20 hover:bg-white/6 hover:text-white sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  <Github className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Source Code
                </Link>
              )}
              {isValidExternalUrl(project.liveUrl) && (
                <Link
                  href={project.liveUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all duration-200 hover:bg-white/6 sm:px-3 sm:py-1.5 sm:text-xs"
                  style={{ color: project.accentColor }}
                >
                  <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 " />
                  Live Demo
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* ---- Subtle gradient glow on hover ---- */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at 50% 0%, ${project.accentColor}08, transparent 60%)`,
          }}
        />
      </motion.div>
      </div>
    </BlurFade>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function Projects({ data }: { data?: Project[] }) {
  const projectList = data ?? projects;
  return (
    <section id="projects" className="relative w-full py-16 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <BlurFade delay={0.04} inView>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              <span className="bg-linear-to-r from-white to-neutral-500 bg-clip-text text-transparent">
                Things I&apos;ve Built
              </span>
            </h2>
          </BlurFade>

          <BlurFade delay={0.12} inView>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A selection of projects I&apos;ve shipped — from weekend
              experiments to full-stack applications.
            </p>
          </BlurFade>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projectList.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
          {/* Placeholder card for 'and many more coming soon' */}
          <div className="flex items-center justify-center h-full min-h-[200px] sm:min-h-[320px] w-full border border-dashed border-white/20 rounded-lg bg-white/5 text-center p-6 sm:p-8">
            <span className="text-base sm:text-lg text-neutral-400 font-semibold">and many more coming soon</span>
          </div>
        </div>
      </div>
    </section>
  );
}
