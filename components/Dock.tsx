"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UserIcon,
  WrenchIcon,
  FolderOpenIcon,
  AwardIcon,
  BriefcaseIcon,
  MailIcon,
  ArrowUp,
  MoreHorizontal,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Icons } from "./icons";
import { socials as staticSocials } from "@/lib/socials";
import { socialIconMap } from "@/lib/iconMap";
import { isValidExternalUrl } from "@/lib/constants";


const DATA = {
  navbar: [
    { href: "#hero", icon: ArrowUp, label: "To the top" },
    { href: "#about", icon: UserIcon, label: "About" },
    { href: "#skills", icon: WrenchIcon, label: "Skills" },
    { href: "#projects", icon: FolderOpenIcon, label: "Projects" },
    { href: "#certifications", icon: AwardIcon, label: "Certifications" },
    { href: "#experience", icon: BriefcaseIcon, label: "Experience" },
    { href: "#contact", icon: MailIcon, label: "Contact" },
  ],
};

/* Mobile: show a condensed set of icons */
const MOBILE_NAV = [
  { href: "#hero", icon: ArrowUp, label: "Top" },
  { href: "#projects", icon: FolderOpenIcon, label: "Projects" },
  { href: "#experience", icon: BriefcaseIcon, label: "Experience" },
  { href: "#contact", icon: MailIcon, label: "Contact" },
];

function buildSocialEntries(socials: Record<string, string>) {
  return Object.entries(socials)
    .filter(([platform, url]) => socialIconMap[platform] && isValidExternalUrl(url))
    .map(([platform, url]) => ({
      name: platform,
      url,
      icon: socialIconMap[platform],
    }));
}

/* ------------------------------------------------------------------ */
/*  Mobile Bottom Bar                                                  */
/* ------------------------------------------------------------------ */

function smoothScrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: "smooth" });
}

function MobileBottomBar({ socials }: { socials: Record<string, string> }) {
  const [showMore, setShowMore] = useState(false);
  const socialList = buildSocialEntries(socials);

  return (
    <div className="relative">
      {/* Expanded panel with all nav + socials */}
      {showMore && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-3 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Full navigation */}
          <div className="grid grid-cols-4 gap-1 mb-2">
            {DATA.navbar.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  smoothScrollTo(item.href);
                  setShowMore(false);
                }}
                className="flex flex-col items-center gap-1 rounded-xl p-2 text-neutral-400 transition-colors hover:bg-white/8 hover:text-white"
              >
                <item.icon className="h-4 w-4" />
                <span className="text-[9px] font-medium leading-tight truncate w-full text-center">
                  {item.label.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Separator */}
          <div className="h-px w-full bg-white/10 my-2" />

          {/* Socials */}
          <div className="flex justify-center gap-2">
            {socialList.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                aria-label={social.name}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral-400 transition-colors hover:bg-white/8 hover:text-white"
              >
                <social.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main bottom bar */}
      <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl px-2 py-2 shadow-2xl">
        {MOBILE_NAV.map((item) => (
          <button
            key={item.label}
            onClick={() => smoothScrollTo(item.href)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-400 transition-colors hover:bg-white/10 hover:text-white active:scale-95"
            aria-label={item.label}
          >
            <item.icon className="h-4.5 w-4.5" />
          </button>
        ))}
        <div className="h-6 w-px bg-white/10 mx-0.5" />
        <button
          onClick={() => setShowMore(!showMore)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl transition-colors active:scale-95",
            showMore
              ? "bg-white/10 text-white"
              : "text-neutral-400 hover:bg-white/10 hover:text-white"
          )}
          aria-label="More options"
        >
          {showMore ? <X className="h-4.5 w-4.5" /> : <MoreHorizontal className="h-4.5 w-4.5" />}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Dock Export                                                   */
/* ------------------------------------------------------------------ */

export function DockDemo({ socials }: { socials?: Record<string, string> }) {
  const socialLinks = socials ?? staticSocials;
  const socialList = buildSocialEntries(socialLinks);

  const scrollTo = smoothScrollTo;

  /*
   * Render BOTH variants — CSS handles which is visible.
   * This avoids the mount/unmount cycle from useMediaQuery
   * that was causing the dock to flash on mobile.
   */
  return (
    <>
      {/* Mobile: compact bottom bar */}
      <div className="sm:hidden">
        <MobileBottomBar socials={socialLinks} />
      </div>

      {/* Desktop: full magnifying dock */}
      <div className="hidden sm:flex flex-col items-center justify-center">
        <TooltipProvider>
          <Dock direction="middle">
            {DATA.navbar.map((item) => (
              <DockIcon key={item.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => scrollTo(item.href)}
                      aria-label={item.label}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 rounded-full"
                      )}
                    >
                      <item.icon className="size-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
            <Separator orientation="vertical" className="h-full" />
            {socialList.map((social) => (
              <DockIcon key={social.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      target="_blank"
                      aria-label={social.name}
                      className={cn(
                        buttonVariants({ variant: "link", size: "icon" }),
                        "size-12 rounded-full"
                      )}
                    >
                      <social.icon className="size-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{social.name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          </Dock>
        </TooltipProvider>
      </div>
    </>
  );
}

