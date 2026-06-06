import {
  Code2,
  Monitor,
  Server,
  Database,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Icons, type IconProps } from "@/components/icons";

/* ------------------------------------------------------------------ */
/*  Skill icon map  —  iconKey (string) → renderer function            */
/* ------------------------------------------------------------------ */

type IconRenderer = (props: IconProps) => React.ReactNode;

/** Maps a skill's `iconKey` (stored in DB) to its SVG renderer. */
export const skillIconMap: Record<string, IconRenderer> = {
  typescript: Icons.typescript,
  python: Icons.python,
  javascript: Icons.javascript,
  cpp: Icons.cpp,
  react: Icons.react,
  nextjs: Icons.nextjs,
  tailwindcss: Icons.tailwindcss,
  shadcn: Icons.shadcn,
  nodejs: Icons.nodejs,
  express: Icons.express,
  graphql: Icons.graphql,
  restapi: Icons.restapi,
  postgresql: Icons.postgresql,
  mongodb: Icons.mongodb,
  redis: Icons.redis,
  prisma: Icons.prisma,
  github: Icons.github,
  firebase: Icons.firebase,
  html: Icons.html,
  css: Icons.css,
  java: Icons.java,
  tanstack: Icons.tanstack,
  redux: Icons.redux,
  docker: Icons.docker,
  linux: Icons.linux,
  git: Icons.git,
  postman: Icons.postman,
};
/*  Category icon map  —  categoryIconKey (string) → LucideIcon        */
/* ------------------------------------------------------------------ */

/** Maps a category's `categoryIconKey` to the Lucide component. */
export const categoryIconMap: Record<string, LucideIcon> = {
  Code2,
  Monitor,
  Server,
  Database,
  Wrench,
};

/* ------------------------------------------------------------------ */
/*  Social icon map  —  platform name → renderer function              */
/* ------------------------------------------------------------------ */

/** Maps a social platform name to its SVG renderer. */
export const socialIconMap: Record<string, IconRenderer> = {
  GitHub: Icons.github,
  LinkedIn: Icons.linkedin,
  X: Icons.x,
  LeetCode: Icons.leetcode,
  YouTube: Icons.youtube,
  WhatsApp: Icons.whatsapp,
  Leetcode: Icons.leetcode
};
