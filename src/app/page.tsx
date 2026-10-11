"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/common/Navbar";
import { StudioHero } from "@/features/hero/StudioHero";
import { TemplateShowcase } from "@/features/showcase/TemplateShowcase";
import { OpenSourceStats } from "@/features/oss/OpenSourceStats";
import { DownloadDrawer } from "@/features/download/DownloadDrawer";
import { Footer } from "@/components/common/Footer";

export default function Home() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col justify-between relative z-10">
      <div>
        <Navbar onOpenDownload={() => setIsDownloadOpen(true)} />
        <StudioHero onOpenDownload={() => setIsDownloadOpen(true)} />
        <TemplateShowcase />
        <OpenSourceStats />
      </div>

      <Footer />

      <DownloadDrawer
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </main>
  );
}
