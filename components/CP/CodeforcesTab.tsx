"use client";

import { Swords, Trophy, Hash, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import type { CodeforcesStats } from "@/lib/codeforces";
import { socials } from "@/lib/socials";

const CF_COLOR = "#60A5FA";
const CF_ACCENT = "#818CF8";

/* Codeforces rank → official colour map */
function rankColor(rank: string): string {
  const r = rank.toLowerCase();
  if (r === "newbie") return "#808080";
  if (r === "pupil") return "#008000";
  if (r === "specialist") return "#03A89E";
  if (r === "expert") return "#0000FF";
  if (r === "candidate master") return "#AA00AA";
  if (r === "master") return "#FF8C00";
  if (r === "international master") return "#FF8C00";
  if (r === "grandmaster") return "#FF0000";
  if (r === "international grandmaster") return "#FF0000";
  if (r === "legendary grandmaster") return "#FF0000";
  return CF_COLOR;
}

interface CfData {
  rating: number;
  maxRating: number;
  rank: string;
  contests: number;
}

const FALLBACK: CfData = {
  rating: 0,
  maxRating: 0,
  rank: "newbie",
  contests: 0,
};

interface CodeforcesTabProps {
  data: CodeforcesStats | null;
  isLoading: boolean;
}

export function CodeforcesTab({ data, isLoading }: CodeforcesTabProps) {
  const d: CfData =
    data && !isLoading
      ? {
          rating: data.rating,
          maxRating: data.maxRating,
          rank: data.rank,
          contests: data.contestsAttended,
        }
      : FALLBACK;

  const displayRank = d.rank.charAt(0).toUpperCase() + d.rank.slice(1);
  const rColor = rankColor(d.rank);

  return (
    <div className="mx-auto max-w-xl">
      <BlurFade delay={0.1} inView>
        <motion.div
          className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] font-mono"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Top accent gradient */}
          <div
            className="h-0.5 w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${CF_COLOR}, ${CF_ACCENT}, transparent)`,
            }}
          />

          <BorderBeam size={80} duration={6} colorFrom={CF_COLOR} colorTo={CF_ACCENT} />

          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            {/* Left — rating */}
            <div className="flex items-center gap-4">
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-xl border backdrop-blur-sm"
                style={{ borderColor: `${CF_COLOR}25`, backgroundColor: `${CF_COLOR}10` }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Swords className="h-6 w-6" style={{ color: CF_COLOR }} />
              </motion.div>

              <div>
                <NumberTicker
                  value={d.rating}
                  delay={0.2}
                  className="text-4xl font-bold tabular-nums tracking-tight lg:text-5xl"
                />
                <p className="text-sm text-muted-foreground">Codeforces Rating</p>
              </div>
            </div>

            {/* Right — rank + stats */}
            <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end sm:gap-3">
              {/* Rank badge */}
              <div
                className="flex items-center gap-2 rounded-lg border px-3 py-1.5"
                style={{ borderColor: `${rColor}30`, backgroundColor: `${rColor}12` }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: rColor }}
                />
                <span className="text-sm font-semibold" style={{ color: rColor }}>
                  {displayRank}
                </span>
              </div>

              {/* Contests + max rating chips */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1">
                  <Trophy className="h-3.5 w-3.5 text-muted-foreground" />
                  <NumberTicker
                    value={d.contests}
                    delay={0.4}
                    className="text-xs font-semibold text-neutral-300"
                  />
                  <span className="text-xs text-muted-foreground">contests</span>
                </div>

                <div className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1">
                  <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">max</span>
                  <NumberTicker
                    value={d.maxRating}
                    delay={0.5}
                    className="text-xs font-semibold text-neutral-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Profile link */}
          {"Codeforces" in socials && socials.Codeforces ? (
          <div className="flex justify-end px-6 pb-4 sm:px-8">
            <Link
              href={socials.Codeforces}
              target="_blank"
              className="group/link flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-blue-400"
            >
              View Profile
              <ExternalLink className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
            </Link>
          </div>
          ) : null}
        </motion.div>
      </BlurFade>
    </div>
  );
}
