import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DockSection from "@/components/sections/DockSection";
import { PortfolioShell } from "@/components/PortfolioShell";
import DesktopHint from "@/components/DesktopHint";
import { ASSETS, SITE, SITE_JSON_LD } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Manojkrishna M",
    "Full Stack Developer",
    "AI & Data Science",
    "React",
    "Flask",
    "AWS",
    "Docker",
    "Cloud Computing",
    "Portfolio",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: ASSETS.profileImage, type: "image/png" }],
    apple: [{ url: ASSETS.profileImage, type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: `${SITE.name} Portfolio`,
    images: [
      {
        url: ASSETS.ogImage,
        width: 512,
        height: 512,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [ASSETS.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSON_LD) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`} suppressHydrationWarning
      >
        <PortfolioShell />

        <div
          className="fixed inset-x-0 bottom-6 z-50 flex justify-center pointer-events-none"
          style={{ willChange: "transform" }}
        >
          <div className="pointer-events-auto">
            <DockSection />
          </div>
        </div>

        <DesktopHint />

        <div className="overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
