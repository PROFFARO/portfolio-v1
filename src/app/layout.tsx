import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — Cybersecurity Portfolio`,
  description: profile.objective,
  keywords: [
    "cybersecurity",
    "penetration testing",
    "ethical hacking",
    "portfolio",
    profile.name,
    profile.handle,
  ],
  authors: [{ name: profile.name, url: profile.links.github }],
  openGraph: {
    title: `${profile.name} — Cybersecurity Portfolio`,
    description: profile.objective,
    type: "website",
    url: profile.links.github,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Cybersecurity Portfolio`,
    description: profile.objective,
  },
};

export const viewport: Viewport = {
  themeColor: "#05050a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${orbitron.variable} ${grotesk.variable}`}
    >
      <body className="scanlines bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}
