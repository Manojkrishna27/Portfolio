/** Central site config — single source of truth for portfolio branding. */
export const SITE = {
  name: "Manojkrishna M",
  role: "Full Stack Developer | AI & Data Science Student",
  title: "Manojkrishna M | Full Stack Developer",
  description:
    "Portfolio of Manojkrishna M — Final-year B.Tech AI & Data Science student and Full Stack Developer specializing in React, Flask, cloud computing, and scalable web applications.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://manojkrishna-portfolio.vercel.app",
  email: "manojkrishna2725@gmail.com",
  phone: "+91 6381873112",
} as const;

export const ASSETS = {
  profileImage: "/profile-avatar.png",
  resumePdf: "/resume/Manojkrishna-M-Resume.pdf",
  ogImage: "/profile-avatar.png",
} as const;

/** Update these placeholders with your live profile URLs before deployment. */
export const SOCIAL_URLS = {
  github: "https://github.com/Manojkrishna27",
  linkedin: "https://www.linkedin.com/jobs/",
  leetcode: "https://leetcode.com/",
} as const;

export const PLACEHOLDER_MARK = "URL_HERE";

export function isPlaceholder(value?: string | null): boolean {
  if (!value) return true;
  return value.includes(PLACEHOLDER_MARK);
}

export function isValidExternalUrl(value?: string | null): boolean {
  if (!value || isPlaceholder(value)) return false;
  return /^https?:\/\//i.test(value);
}

export const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  email: SITE.email,
  url: SITE.url,
  jobTitle: "Full Stack Developer",
  description: SITE.description,
} as const;
