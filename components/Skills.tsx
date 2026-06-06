"use client";

import { type IconProps } from "@/components/icons";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  Code2,
  Monitor,
  Server,
  Database,
  Wrench,
  BookOpen,
  Bot,
  Network,
  type LucideIcon,
} from "lucide-react";
import { skillIconMap, categoryIconMap } from "@/lib/iconMap";
import { Icons } from "@/components/icons";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type IconRenderer = (props: IconProps) => React.ReactNode;

interface Skill {
  name: string;
  icon: IconRenderer;
}

interface SkillCategory {
  title: string;
  categoryIcon: LucideIcon;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  gradientColor: string;
  span: string;
  skills: Skill[];
}

/** Shape returned by getSkillCategories() in lib/data.ts */
export interface SkillCategoryData {
  title: string;
  categoryIconKey: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  gradientColor: string;
  span: string;
  skills: { name: string; iconKey: string }[];
}

interface LearningItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers — convert DB data to component format                      */
/* ------------------------------------------------------------------ */

function resolveCategories(data: SkillCategoryData[]): SkillCategory[] {
  return data.map((d) => ({
    title: d.title,
    categoryIcon: categoryIconMap[d.categoryIconKey] ?? Wrench,
    color: d.color,
    gradientFrom: d.gradientFrom,
    gradientTo: d.gradientTo,
    gradientColor: d.gradientColor,
    span: d.span,
    skills: d.skills.map((s) => ({
      name: s.name,
      icon: skillIconMap[s.iconKey] ?? Icons.github,
    })),
  }));
}

/* ------------------------------------------------------------------ */
/*  Static fallback data                                               */
/* ------------------------------------------------------------------ */

const fallbackCategories: SkillCategory[] = [
  {
    title: "Programming",
    categoryIcon: Code2,
    color: "#F472B5",
    gradientFrom: "#F472B6",
    gradientTo: "#FBBF24",
    gradientColor: "#F472B6",
    span: "col-span-1",
    skills: [
      { name: "Python", icon: Icons.python },
      { name: "Java", icon: Icons.java },
      { name: "JavaScript", icon: Icons.javascript },
    ],
  },
  {
    title: "Frontend",
    categoryIcon: Monitor,
    color: "#60A5FA",
    gradientFrom: "#60A5FA",
    gradientTo: "#A78BFA",
    gradientColor: "#60A5FA",
    span: "col-span-1",
    skills: [
      { name: "HTML", icon: Icons.html },
      { name: "CSS", icon: Icons.css },
      { name: "JavaScript", icon: Icons.javascript },
      { name: "React.js", icon: Icons.react },
    ],
  },
  {
    title: "Backend",
    categoryIcon: Server,
    color: "#34D399",
    gradientFrom: "#34D399",
    gradientTo: "#FBBF24",
    gradientColor: "#34D399",
    span: "col-span-1",
    skills: [
      { name: "Flask", icon: Icons.python },
      { name: "REST APIs", icon: Icons.restapi },
      { name: "JWT Auth", icon: Icons.restapi },
    ],
  },
  {
    title: "Databases",
    categoryIcon: Database,
    color: "#A78BFA",
    gradientFrom: "#A78BFA",
    gradientTo: "#FB923C",
    gradientColor: "#A78BFA",
    span: "col-span-1",
    skills: [
      { name: "MySQL", icon: Icons.postgresql },
      { name: "Redis", icon: Icons.redis },
    ],
  },
  {
    title: "Cloud & DevOps",
    categoryIcon: Wrench,
    color: "#FB923C",
    gradientFrom: "#FB923C",
    gradientTo: "#F472B6",
    gradientColor: "#FB923C",
    span: "col-span-1",
    skills: [
      { name: "AWS", icon: Icons.docker },
      { name: "Docker", icon: Icons.docker },
      { name: "Nginx", icon: Icons.express },
      { name: "Linux", icon: Icons.linux },
    ],
  },
  {
    title: "Tools",
    categoryIcon: Wrench,
    color: "#10B981",
    gradientFrom: "#10B981",
    gradientTo: "#3B82F6",
    gradientColor: "#10B981",
    span: "col-span-1",
    skills: [
      { name: "Git", icon: Icons.git },
      { name: "GitHub", icon: Icons.github },
      { name: "Postman", icon: Icons.postman },
      { name: "VS Code", icon: Icons.github },
    ],
  },
];

const learningItems: LearningItem[] = [
  {
    icon: Monitor,
    title: "Web Development",
    description: "React, modern front-end patterns, and full-stack application development",
  },
  {
    icon: Bot,
    title: "AI and Data Science",
    description: "Intelligent systems, machine learning, and data-driven application development",
  },
  {
    icon: Network,
    title: "Cloud Computing",
    description: "AWS services, deployment pipelines, and scalable infrastructure",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SkillPill({ skill }: { skill: Skill }) {
  return (
    <div className="group/skill inline-flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.06]">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-neutral-300">
        {skill.icon({ className: "h-4 w-4" })}
      </span>
      <span className="text-sm font-medium text-neutral-300 whitespace-nowrap">
        {skill.name}
      </span>
    </div>
  );
}

function SkillCategoryCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  return (
    <BlurFade delay={0.08 + index * 0.1} inView className="h-full">
      <div className="h-full rounded-xl border border-white/8 bg-white/[0.02] p-4 sm:p-5">
        {/* Header with accent bar */}
        <div className="mb-4 flex items-center gap-2.5">
          <div
            className="h-5 w-1 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <h3
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: category.color }}
          >
            {category.title}
          </h3>
        </div>

        {/* Skill pills — wrapping flow */}
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <SkillPill key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </BlurFade>
  );
}

function LearningCard({
  item,
  index,
}: {
  item: LearningItem;
  index: number;
}) {
  const Icon = item.icon;
  return (
    <BlurFade delay={0.3 + index * 0.1} inView>
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-teal-400/20 bg-teal-400/8 text-teal-400">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-white">{item.title}</h4>
          <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">
            {item.description}
          </p>
        </div>
      </div>
    </BlurFade>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Skills({ data }: { data?: SkillCategoryData[] }) {
  const skillCategories = data ? resolveCategories(data) : fallbackCategories;

  return (
    <section id="skills" className="relative w-full py-16 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        {/* Section heading */}
        <div className="mb-12 sm:mb-16 text-center">
          <BlurFade delay={0.04} inView>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              <span className="bg-linear-to-r from-white to-neutral-500 bg-clip-text text-transparent">
                Skills I have
              </span>
            </h2>
          </BlurFade>

          <BlurFade delay={0.12} inView>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A snapshot of the tools, languages, and frameworks I work with
              day to day.
            </p>
          </BlurFade>
        </div>

        {/* Category cards — 3 columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, idx) => (
            <SkillCategoryCard
              key={category.title}
              category={category}
              index={idx}
            />
          ))}
        </div>

        {/* Currently Learning section */}
        <BlurFade delay={0.25} inView>
          <div className="mt-6 rounded-xl border border-white/8 bg-white/[0.02] p-4 sm:p-5">
            {/* Header */}
            <div className="mb-5 flex items-center gap-2.5">
              <BookOpen className="h-4 w-4 text-teal-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-teal-400">
                Currently Learning
              </h3>
              <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            </div>

            {/* Learning items grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {learningItems.map((item, idx) => (
                <LearningCard key={item.title} item={item} index={idx} />
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
