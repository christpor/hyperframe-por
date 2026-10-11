"use client";

import React, { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { STUDIO_DATA } from "@/data/studioData";
import { formatCompactNumber } from "@/lib/formatters";

export function OpenSourceStats() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(STUDIO_DATA.skillCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    {
      value: formatCompactNumber(STUDIO_DATA.stats.stars),
      label: "GitHub stars",
    },
    {
      value: formatCompactNumber(STUDIO_DATA.stats.npmWeek),
      label: "npm downloads last week",
    },
    {
      value: formatCompactNumber(STUDIO_DATA.stats.forks),
      label: "Forks",
    },
    {
      value: STUDIO_DATA.stats.contributors.toString(),
      label: "Contributors",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#131109]/10">
      <div className="mb-10">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#131109]">
          Open source
        </h2>
        <p className="mt-2 text-base text-[#131109]/60">
          Apache-2.0 on GitHub at{" "}
          <a
            href={STUDIO_DATA.links.github}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-[#131109] transition-colors"
          >
            heygen-com/hyperframes
          </a>
          .
        </p>
      </div>

      {/* 4-Column Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-[#131109]/10">
        {stats.map((s, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#131109]">
              {s.value}
            </span>
            <span className="mt-2 text-sm text-[#131109]/60 font-medium">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Interactive Command & Links Bar */}
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/70 hover:bg-white border border-[#131109]/15 shadow-sm text-sm font-mono text-[#131109] transition-all group"
          title="Click to copy command"
        >
          <span>{STUDIO_DATA.skillCommand}</span>
          {copied ? (
            <Check className="w-4 h-4 text-emerald-600" />
          ) : (
            <Copy className="w-4 h-4 text-[#131109]/40 group-hover:text-[#131109] transition-colors" />
          )}
        </button>

        <a
          href={STUDIO_DATA.links.docs}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-white/70 hover:bg-white border border-[#131109]/15 text-sm font-medium text-[#131109] shadow-sm transition-all"
        >
          <span>Docs</span>
        </a>

        <a
          href={STUDIO_DATA.links.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#131109] text-[#f4f1ea] text-sm font-medium hover:opacity-90 transition-all shadow-sm"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>Star on GitHub</span>
        </a>
      </div>
    </section>
  );
}
