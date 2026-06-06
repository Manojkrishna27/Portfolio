"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FolderOpen,
  Award,
  Share2,
  Wrench,
  User,
  Home,
  LogOut,
  Briefcase,
} from "lucide-react";
import { SITE } from "@/lib/constants";

const navItems = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/dashboard/hero", label: "Hero", icon: Home },
  { href: "/admin/dashboard/about", label: "About", icon: User },
  { href: "/admin/dashboard/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/dashboard/certifications", label: "Certifications", icon: Award },
  { href: "/admin/dashboard/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/dashboard/skills", label: "Skills", icon: Wrench },
  { href: "/admin/dashboard/socials", label: "Socials", icon: Share2 },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => setAuthenticated(true))
      .catch(() => {
        setAuthenticated(false);
        router.push("/admin");
      });
  }, [router]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  if (authenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-full w-60 flex-col border-r border-white/10 bg-neutral-950/80 backdrop-blur-sm">
        <div className="border-b border-white/10 px-5 py-4">
          <h2 className="text-lg font-bold">{SITE.name}</h2>
          <p className="text-xs text-neutral-500">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-60 flex-1 p-6 lg:p-8">{children}</main>
    </div>
  );
}
