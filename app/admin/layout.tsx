import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Admin Panel | ${SITE.name}`,
  description: `Manage ${SITE.name} portfolio content`,
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">{children}</div>
  );
}
