"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { useLeetCodeStats } from "@/hooks/useLeetCodeStats";
import { useCodeforcesStats } from "@/hooks/useCodeforcesStats";
import { LeetCodeTab } from "./LeetCodeTab";
import { CodeforcesTab } from "./CodeforcesTab";

const LEETCODE_USERNAME = "LEETCODE_USERNAME_HERE";
const CF_HANDLE = "CODEFORCES_HANDLE_HERE";

const TABS = [
  { id: "leetcode", label: "LeetCode" },
  { id: "codeforces", label: "Codeforces" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function CompetitiveProgramming() {
  const [active, setActive] = useState<TabId>("leetcode");

  // Fetch once at section level — persists across tab switches
  const leetcode = useLeetCodeStats(LEETCODE_USERNAME);
  const codeforces = useCodeforcesStats(CF_HANDLE);

  return (
    <section id="competitive" className="relative w-full py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <BlurFade delay={0.04} inView>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              <span className="bg-linear-to-r from-white to-neutral-500 bg-clip-text text-transparent">
                I can solve problems too!
              </span>
            </h2>
          </BlurFade>

          <BlurFade delay={0.12} inView>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Ratings, problems solved, and contest participation across platforms.
            </p>
          </BlurFade>
        </div>

        {/* Animated tab switcher */}
        <BlurFade delay={0.2} inView>
          <div className="relative mx-auto mb-10 flex w-fit gap-1 rounded-xl border border-white/8 bg-white/3 p-1 backdrop-blur-md overflow-hidden">
            <BorderBeam size={80}  colorFrom="cyan" colorTo="blue" />
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className="relative rounded-lg px-5 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                {active === tab.id && (
                  <motion.span
                    layoutId="cp-tab-indicator"
                    className="absolute inset-0 rounded-lg border border-white/15 bg-white/8"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active === tab.id
                      ? "text-white"
                      : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* Tab content with crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {active === "leetcode" ? (
                <LeetCodeTab data={leetcode.data} isLoading={leetcode.isLoading} />
              ) : (
                <CodeforcesTab data={codeforces.data} isLoading={codeforces.isLoading} />
              )}
            </motion.div>
          </AnimatePresence>
        </BlurFade>
      </div>
    </section>
  );
}
