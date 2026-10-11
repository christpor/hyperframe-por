import type { Metadata } from "next";
import "./globals.css";
import { IridescentCanvas } from "@/components/ui/IridescentCanvas";
import { SmoothScroll } from "@/components/common/SmoothScroll";

export const metadata: Metadata = {
  title: "HyperFrames Studio — The Video Editor Built for Agents",
  description:
    "The video editor built for agents. Built by the team who open sourced HyperFrames.",
  icons: {
    icon: "/favicon-dark.svg",
  },
  openGraph: {
    title: "HyperFrames Studio",
    description: "The video editor built for agents.",
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
      <body className="min-h-screen relative antialiased selection:bg-[#131109] selection:text-white">
        <SmoothScroll>
          <IridescentCanvas />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
