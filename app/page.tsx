import { Suspense } from "react";

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";

import {
  HeroSkeleton,
  AboutSkeleton,
  SkillsSkeleton,
  ProjectsSkeleton,
  CertificationsSkeleton,
} from "@/components/skeletons";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="w-full pb-24">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<AboutSkeleton />}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={<SkillsSkeleton />}>
        <SkillsSection />
      </Suspense>

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsSection />
      </Suspense>

      <Suspense fallback={<CertificationsSkeleton />}>
        <CertificationsSection />
      </Suspense>

      <ExperienceSection />

      <ContactSection />
    </main>
  );
}

