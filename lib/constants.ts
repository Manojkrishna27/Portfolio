/** Central site config — single source of truth for portfolio branding. */
export const SITE = {
  name: "Manojkrishna",
  role: "Software Engineer | AI & Data Science Student",
  subtitle:
    "Building AI-powered software, scalable backend systems, secure cloud applications, and production-ready solutions that solve real-world business problems.",
  title: "Manojkrishna | Software Engineer",
  description:
    "Software Engineer portfolio showcasing AI systems, full-stack development, cloud infrastructure, cybersecurity, scalable backend services, and production-ready software projects.",
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
  linkedin: "https://www.linkedin.com/in/manoj-krishna-m/",
  leetcode: "https://leetcode.com/u/l67O6s3DHV/",
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
  jobTitle: "Software Engineer",
  description: SITE.description,
} as const;
