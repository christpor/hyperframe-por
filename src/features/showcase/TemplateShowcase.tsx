"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Play,
  Pause,
  Layers,
} from "lucide-react";
import { SHOWCASE_PROMPTS, SHOWCASE_TEMPLATES } from "@/data/templateData";

export function TemplateShowcase() {
  const [activePromptIdx, setActivePromptIdx] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const prevPrompt = () => {
    setActivePromptIdx((prev) =>
      prev === 0 ? SHOWCASE_PROMPTS.length - 1 : prev - 1
    );
  };

  const nextPrompt = () => {
    setActivePromptIdx((prev) =>
      prev === SHOWCASE_PROMPTS.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Featured Prompt Carousel Card (matching screenshot 2) */}
      <div className="relative rounded-[32px] overflow-hidden bg-white/75 backdrop-blur-md border border-[#131109]/10 p-8 sm:p-16 shadow-xl mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131109]/5 text-xs font-semibold text-[#131109]/80 uppercase tracking-wider mb-8">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Agent Prompting Surface</span>
        </div>

        <div className="min-h-[140px] flex items-center justify-center">
          <h3 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#131109] max-w-3xl mx-auto leading-tight transition-all duration-300">
            &ldquo;{SHOWCASE_PROMPTS[activePromptIdx]}&rdquo;
          </h3>
        </div>

        {/* Carousel controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={prevPrompt}
            aria-label="Previous prompt"
            className="p-3 rounded-full bg-white hover:bg-black/5 border border-black/10 text-[#131109] transition-all shadow-sm active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {SHOWCASE_PROMPTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActivePromptIdx(idx)}
                aria-label={`Go to prompt ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-200 ${
                  idx === activePromptIdx
                    ? "w-8 bg-[#131109]"
                    : "w-2 bg-[#131109]/20 hover:bg-[#131109]/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextPrompt}
            aria-label="Next prompt"
            className="p-3 rounded-full bg-white hover:bg-black/5 border border-black/10 text-[#131109] transition-all shadow-sm active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Template Showcase Grid */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#131109]">
            Composition Templates
          </h2>
          <p className="mt-2 text-base text-[#131109]/60">
            Open-source deterministic templates built with HyperFrames & GSAP.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#131109]/60 bg-white/50 px-3 py-1.5 rounded-full border border-black/5 self-start sm:self-auto">
          <Layers className="w-3.5 h-3.5" />
          <span>6 production compositions</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SHOWCASE_TEMPLATES.map((tpl) => (
          <div
            key={tpl.id}
            className="rounded-[24px] overflow-hidden bg-white/60 backdrop-blur-sm border border-black/10 shadow-md hover:shadow-xl transition-all group flex flex-col"
          >
            <div className="relative aspect-video bg-black/90 overflow-hidden">
              <video
                src={tpl.videoUrl}
                muted
                loop
                playsInline
                autoPlay
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-xs font-medium border border-white/10">
                {tpl.category}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold text-[#131109]">
                  {tpl.title}
                </h4>
                <p className="mt-1 text-sm text-[#131109]/60 line-clamp-2">
                  {tpl.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-mono text-[#131109]/50">
                <span>MP4 • GSAP</span>
                <span className="text-emerald-700 font-medium">Ready</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
