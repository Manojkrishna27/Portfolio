"use client";

import Link from "next/link";
import { Icons } from "@/components/icons";
import { socials as staticSocials } from "@/lib/socials";
import { isValidExternalUrl, SITE } from "@/lib/constants";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const socialDisplay: {
  key: string;
  icon: (props: { className?: string }) => React.ReactNode;
  label: string;
}[] = [
  { key: "GitHub", icon: Icons.github, label: "GitHub" },
  { key: "LinkedIn", icon: Icons.linkedin, label: "LinkedIn" },
  { key: "LeetCode", icon: Icons.leetcode, label: "LeetCode" },
];

export default function Footer({
  socials,
}: {
  socials?: Record<string, string>;
}) {
  const socialLinks: Record<string, string> = socials ?? staticSocials;

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative w-full border-t border-white/8 bg-white/2 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Left — Branding */}
          <div className="max-w-xs space-y-3">
            <h3 className="text-lg font-bold tracking-tight text-white">
              {SITE.name}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-500">
              {SITE.role}
            </p>
          </div>

          {/* Center — Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-neutral-500 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right — Social icons */}
          <div className="flex gap-3">
            {socialDisplay.map((s) => {
              const url = socialLinks[s.key];
              if (!isValidExternalUrl(url)) return null;
              return (
                <Link
                  key={s.key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/3 text-neutral-500 transition-all duration-200 hover:border-white/15 hover:bg-white/6 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/6 pt-6 text-center">
          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
