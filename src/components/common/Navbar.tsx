"use client";

import React from "react";
import { STUDIO_DATA } from "@/data/studioData";
import { Download } from "lucide-react";

interface NavbarProps {
  onOpenDownload?: () => void;
}

export function Navbar({ onOpenDownload }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/30 border-b border-[#131109]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
          >
            {/* Authentic HeyGen Brand Mark SVG */}
            <div className="flex items-center gap-2 font-bold text-sm tracking-tight text-[#131109]">
              <span className="text-xs uppercase tracking-wider font-extrabold text-[#131109]/80">
                HeyGen
              </span>
              <span className="text-emerald-500 font-extrabold">/</span>
              <span className="font-bold text-base">HyperFrames</span>
            </div>
          </a>
        </div>

        {/* Right Nav Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium text-[#131109]/80">
          <a
            href={STUDIO_DATA.links.community}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#131109] transition-colors hidden sm:inline-block"
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
          <button
            onClick={onOpenDownload}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/10 hover:bg-black/5 text-[#131109] text-xs font-semibold transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
          <a
            href="https://hyperframes.dev"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-full bg-[#00f5b8] text-[#131109] font-semibold text-xs hover:brightness-105 active:scale-95 transition-all shadow-sm"
          >
            Log in
          </a>
        </nav>
      </div>
    </header>
  );
}
