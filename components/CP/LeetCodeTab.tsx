"use client";

import { Trophy, CheckCircle2 } from "lucide-react";
import { StatCard } from "./StatCard";
import type { StatCardData } from "./types";
import type { LeetCodeStats } from "@/lib/leetcode";
import { socials } from "@/lib/socials";

const DIFFICULTY_ACCENTS = {
  easy: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 dark:border-emerald-400/25 dark:bg-emerald-400/8 dark:text-emerald-300",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-500 dark:border-amber-400/25 dark:bg-amber-400/8 dark:text-amber-300",
  hard: "border-red-500/30 bg-red-500/10 text-red-400 dark:border-red-400/25 dark:bg-red-400/8 dark:text-red-300",
} as const;

const COLOR = "#F59E0B";

function buildStats(d: {
  contestRating: number;
  badge: string | null;
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  contests: number;
}): StatCardData[] {
  return [
    {
      id: "Contest Rating",
      icon: Trophy,
      value: d.contestRating,
      label: "LeetCode Contest Rating",
      subLabel: d.badge ?? undefined,
      badgeImage: d.badge ? "/knight.png" : undefined,
      secondaryValue: d.contests,
      secondaryLabel: "contests attended",
      color: COLOR,
      gradientFrom: COLOR,
      gradientTo: "#EF4444",
      prominent: true,
      profileUrl: socials.LeetCode,
    },
    {
      id: "Problems Solved",
      icon: CheckCircle2,
      value: d.totalSolved,
      label: "Total problems accepted",
      color: "#34D399",
      gradientFrom: "#34D399",
      gradientTo: "#6EE7B7",
      prominent: true,
      breakdown: [
        { label: "Easy", count: d.easy, accent: DIFFICULTY_ACCENTS.easy, barColor: "#34D399" },
        { label: "Medium", count: d.medium, accent: DIFFICULTY_ACCENTS.medium, barColor: "#F59E0B" },
        { label: "Hard", count: d.hard, accent: DIFFICULTY_ACCENTS.hard, barColor: "#EF4444" },
      ],
    },
  ];
}

const FALLBACK = buildStats({
  contestRating: 0,
  badge: null,
  totalSolved: 0,
  easy: 0,
  medium: 0,
  hard: 0,
  contests: 0,
});

interface LeetCodeTabProps {
  data: LeetCodeStats | null;
  isLoading: boolean;
}

export function LeetCodeTab({ data, isLoading }: LeetCodeTabProps) {
  const stats =
    data && !isLoading
      ? buildStats({
          contestRating: data.contestRating,
          badge: data.contestBadge,
          totalSolved: data.totalSolved,
          easy: data.easySolved,
          medium: data.mediumSolved,
          hard: data.hardSolved,
          contests: data.contestsAttended,
        })
      : FALLBACK;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {stats.map((s, i) => (
        <StatCard key={s.id} stat={s} index={i} />
      ))}
    </div>
  );
}
