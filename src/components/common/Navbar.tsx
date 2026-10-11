"use client";

import React from "react";
import { STUDIO_DATA } from "@/data/studioData";

interface NavbarProps {
  onOpenDownload?: () => void;
}

export function Navbar({ onOpenDownload }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/20 border-b border-[#131109]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand Lockup using authentic SVG logo */}
        <a
          href="/"
          className="flex items-center gap-2 hover:opacity-85 transition-opacity"
        >
          <img
            src="/logo-dark.svg"
            alt="HeyGen HyperFrames"
            className="h-8 w-auto block"
          />
        </a>

        {/* Right Navigation */}
        <nav className="flex items-center gap-7 text-sm font-medium text-[#131109]/80 font-['Studio_TT_Norms']">
          <a
            href={STUDIO_DATA.links.community}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#131109] transition-colors"
          >
            Community
          </a>
          <a
            href={STUDIO_DATA.links.docs}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#131109] transition-colors"
          >
            Docs
          </a>
          <a
            href="https://hyperframes.dev"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-full bg-[#00f5b8] hover:bg-[#00e2a8] text-[#131109] font-semibold text-xs tracking-tight transition-all active:scale-95 shadow-sm"
          >
            Log in
          </a>
        </nav>
      </div>
    </header>
  );
}
