import React from "react";
import { STUDIO_DATA } from "@/data/studioData";

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-8 border-t border-[#131109]/10 bg-white/20 backdrop-blur-sm text-xs text-[#131109]/60">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span>© {new Date().getFullYear()} HeyGen, Inc. HyperFrames Studio.</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href={STUDIO_DATA.links.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#131109] transition-colors"
          >
            GitHub
          </a>
          <a
            href={STUDIO_DATA.links.npm}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#131109] transition-colors"
          >
            npm
          </a>
          <a
            href={STUDIO_DATA.links.docs}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#131109] transition-colors"
          >
            Documentation
          </a>
        </div>
      </div>
    </footer>
  );
}
