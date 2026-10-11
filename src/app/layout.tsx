import type { Metadata } from "next";
import "./globals.css";
import { IridescentCanvas } from "@/components/ui/IridescentCanvas";
import { SmoothScroll } from "@/components/common/SmoothScroll";

export const metadata: Metadata = {
  title: "HyperFrames Studio — HyperFrames",
  description:
    "The video editor built for agents. Built by the team who open sourced HyperFrames.",
  keywords: [
    "HTML video framework",
    "AI video generation",
    "HTML to MP4",
    "GSAP animation",
    "open-source video",
    "deterministic rendering",
    "Claude Code",
    "AI agents",
    "HyperFrames",
  ],
  authors: [{ name: "HeyGen", url: "https://heygen.com" }],
  creator: "HeyGen",
  icons: {
    icon: [
      { url: "/favicon-dark.svg", type: "image/svg+xml" },
      {
        url: "/favicon-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
    ],
    shortcut: "/favicon-dark.svg",
    apple: "/favicon-dark.svg",
  },
  openGraph: {
    title: "HyperFrames Studio",
    description:
      "The video editor built for agents. Built by the team who open sourced HyperFrames.",
    url: "https://hyperframe-por.vercel.app",
    siteName: "HyperFrames",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://hyperframes.dev/og-studio-redesign-2026-10.png",
        width: 2400,
        height: 1260,
        alt: "HyperFrames Studio: The video editor built for agents.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HyperFrames Studio",
    description:
      "The video editor built for agents. Built by the team who open sourced HyperFrames.",
    images: ["https://hyperframes.dev/og-studio-redesign-2026-10.png"],
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
        <link rel="icon" href="/favicon-dark.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon-dark.svg" />
      </head>
      <body className="min-h-screen relative antialiased selection:bg-[#131109] selection:text-white">
        <SmoothScroll>
          <IridescentCanvas />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
