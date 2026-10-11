"use client";

import React, { useEffect } from "react";
import { X, Download, ExternalLink, Laptop, ShieldCheck } from "lucide-react";
import { DOWNLOAD_OPTIONS, DownloadOption } from "@/data/downloadData";

interface DownloadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadDrawer({ isOpen, onClose }: DownloadDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all"
      data-lenis-prevent
      overscroll-contain="true"
    >
      <div
        className="relative w-full max-w-lg rounded-[28px] bg-[#fffaf2] border border-[#131109]/15 shadow-2xl p-6 sm:p-8 overscroll-contain"
        data-lenis-prevent
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#131109]/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-[#131109] text-[#f4f1ea]">
              <Laptop className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#131109]">
                Download HyperFrames Studio
              </h3>
              <p className="text-xs text-[#131109]/60">
                Choose your operating system and architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#131109]/60 hover:text-[#131109] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="divide-y divide-[#131109]/5 my-4 max-h-[60vh] overflow-y-auto">
          {DOWNLOAD_OPTIONS.map((item: DownloadOption) => (
            <div
              key={item.id}
              className="py-3.5 flex items-center justify-between hover:bg-black/[0.02] px-2 rounded-xl transition-colors"
            >
              <div>
                <div className="text-sm font-semibold text-[#131109]">
                  {item.platform}
                  {item.architecture && !item.isEnterprise && (
                    <span className="ml-2 font-normal text-xs text-[#131109]/60">
                      ({item.architecture})
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#131109]/50 font-mono">
                  {item.format}
                </div>
              </div>

              <div>
                {item.isComingSoon ? (
                  <span className="text-xs font-medium text-[#131109]/40 px-3 py-1.5 rounded-full bg-black/5">
                    {item.actionText}
                  </span>
                ) : item.isEnterprise ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#131109] px-3.5 py-1.5 rounded-full border border-black/15 hover:bg-black/5 transition-all"
                  >
                    <span>{item.actionText}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <a
                    href={item.url}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#131109] underline underline-offset-4 hover:opacity-80 transition-opacity"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{item.actionText}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Security / Verification Footer */}
        <div className="pt-4 border-t border-[#131109]/10 flex items-center justify-between text-xs text-[#131109]/60">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>SHA-256 Verified binaries</span>
          </div>
          <span>Apache-2.0 Open Source</span>
        </div>
      </div>
    </div>
  );
}
