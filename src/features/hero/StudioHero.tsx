"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { STUDIO_DATA } from "@/data/studioData";
import { calculateHeroScale } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StudioHeroProps {
  onOpenDownload?: () => void;
}

export function StudioHero({ onOpenDownload }: StudioHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        {
          scale: () => {
            const rect = card.getBoundingClientRect();
            return calculateHeroScale(
              rect.top + window.scrollY,
              card.offsetHeight,
              window.innerHeight
            );
          },
        },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: 0,
            end: "top 12%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!cardRef.current) return;
    if (!document.fullscreenElement) {
      cardRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative pt-12 pb-24 px-4 sm:px-8 max-w-7xl mx-auto"
    >
      {/* Top Hero Heading Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        <div className="lg:col-span-7">
          <h1 className="text-6xl sm:text-8xl tracking-[-0.035em] text-[#131109] leading-[0.95] select-none">
            <span className="font-bold block">{STUDIO_DATA.brand}</span>
            <span className="font-light block mt-1">{STUDIO_DATA.brandLight}</span>
          </h1>

          <div className="mt-8 flex items-center">
            <button
              onClick={onOpenDownload}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#131109] text-[#f4f1ea] font-medium text-sm hover:opacity-90 active:scale-95 transition-all shadow-md font-['Studio_TT_Norms']"
            >
              <Download className="w-4 h-4" />
              <span>Download for Linux</span>
            </button>
          </div>

          <p className="mt-4 text-sm text-[#131109]/60 font-['Studio_TT_Norms']">
            {STUDIO_DATA.subheadline}
          </p>
        </div>

        <div className="lg:col-span-5 lg:pt-4 flex lg:justify-end">
          <p className="text-3xl sm:text-4xl text-[#131109] font-normal leading-[1.2] max-w-sm font-['Studio_TT_Norms'] tracking-tight">
            {STUDIO_DATA.headline}
          </p>
        </div>
      </div>

      {/* Kinetic Scaled Hero Card */}
      <div className="flex justify-center items-center py-4">
        <div
          ref={cardRef}
          className="w-full rounded-[32px] overflow-hidden border border-white/70 shadow-2xl bg-white/40 backdrop-blur-md p-3 sm:p-5 transition-transform origin-center"
          style={{ transform: "scale(0.85)" }}
        >
          <div className="relative rounded-[24px] overflow-hidden bg-black aspect-video group">
            {/* Ambient colored mesh glow inside frame */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-blue-500/30 pointer-events-none z-10 mix-blend-screen"
              aria-hidden="true"
            />

            <video
              ref={videoRef}
              src={STUDIO_DATA.videoUrl}
              poster={STUDIO_DATA.posterUrl}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              onTimeUpdate={() => {
                if (videoRef.current) {
                  const p =
                    (videoRef.current.currentTime /
                      videoRef.current.duration) *
                    100;
                  setProgress(p || 0);
                }
              }}
              className="w-full h-full object-cover"
            />

            {/* Top-Right Sound indicator badge matching live site */}
            <button
              onClick={toggleMute}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white/90 border border-white/10 transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {/* Bottom Video Controls Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
                <div className="text-xs font-mono text-white/70">
                  Introducing HyperFrames Studio
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex-1 mx-6 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
