"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { Icons } from "@/components/icons";
import { socials as staticSocials } from "@/lib/socials";
import { isValidExternalUrl, SITE } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Social link config                                                 */
/* ------------------------------------------------------------------ */

const socialDisplay: {
  key: string;
  icon: (props: { className?: string }) => React.ReactNode;
  label: string;
}[] = [
  { key: "GitHub", icon: Icons.github, label: "GitHub" },
  { key: "LinkedIn", icon: Icons.linkedin, label: "LinkedIn" },
  { key: "LeetCode", icon: Icons.leetcode, label: "LeetCode" },
];

/* ------------------------------------------------------------------ */
/*  Contact Component                                                  */
/* ------------------------------------------------------------------ */

export default function Contact({
  socials,
}: {
  socials?: Record<string, string>;
}) {
  const socialLinks: Record<string, string> = socials ?? staticSocials;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="relative w-full py-16 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <BlurFade delay={0.04} inView>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              <span className="bg-linear-to-r from-white to-neutral-500 bg-clip-text text-transparent">
                Let&apos;s Build Something Great
              </span>
            </h2>
          </BlurFade>

          <BlurFade delay={0.12} inView>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Have a project in mind, want to collaborate, or just say
              hi? I&apos;d love to hear from you.
            </p>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---- Contact Form ---- */}
          <BlurFade delay={0.2} inView>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-sm font-medium text-neutral-300"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-200 focus:border-purple-400/40 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(168,85,247,0.1)]"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-sm font-medium text-neutral-300"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-200 focus:border-purple-400/40 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(168,85,247,0.1)]"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-sm font-medium text-neutral-300"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project or idea…"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-200 focus:border-purple-400/40 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(168,85,247,0.1)]"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-neutral-200 disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto"
              >
                {status === "sending" && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {status === "sent" && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                )}
                {status === "idle" && <Send className="h-4 w-4" />}
                {status === "error" && <Send className="h-4 w-4" />}

                {status === "idle" && "Send Message"}
                {status === "sending" && "Sending…"}
                {status === "sent" && "Sent!"}
                {status === "error" && "Try Again"}
              </motion.button>
            </form>
          </BlurFade>

          {/* ---- Right column: info + socials ---- */}
          <BlurFade delay={0.3} inView>
            <div className="flex h-full flex-col justify-center space-y-8">
              {/* Quick info */}
              <div className="space-y-4 rounded-2xl border border-white/8 bg-white/3 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white">
                  Get in touch
                </h3>
                <p className="text-sm leading-relaxed text-neutral-400">
                  Open to internships, placements, and collaboration on full stack,
                  cloud, and cybersecurity projects. Reach out via email or the form.
                </p>
                <div className="space-y-2 pt-2 text-sm text-neutral-400">
                  <p>
                    <span className="text-neutral-300">Email:</span>{" "}
                    <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-white">
                      {SITE.email}
                    </a>
                  </p>
                  <p>
                    <span className="text-neutral-300">Phone:</span>{" "}
                    <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                      {SITE.phone}
                    </a>
                  </p>
                </div>
              </div>

              {/* Social links */}
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Find me on
                </p>
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
                        className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:scale-105"
                      >
                        <s.icon className="h-5 w-5 text-neutral-400 transition-colors duration-200 group-hover:text-white" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
