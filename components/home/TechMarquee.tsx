"use client";

import React from "react";
import {
  Cpu,
  Zap,
  ShieldCheck,
  Database,
  Layers,
  Code2,
  Flame,
  Globe
} from "lucide-react";

const marqueeItems = [
  { label: "Next.js 15 App Router", icon: Layers, highlight: true },
  { label: "Autonomous AI agents", icon: Cpu, highlight: true },
  { label: "Sub-50ms edge TTFB", icon: Zap, highlight: false },
  { label: "Enterprise PostgreSQL", icon: Database, highlight: false },
  { label: "100/100 Core Web Vitals", icon: Flame, highlight: true },
  { label: "Zero WordPress bloat", icon: ShieldCheck, highlight: false },
  { label: "React 19 & TypeScript", icon: Globe, highlight: false },
  { label: "100% in-house engineering", icon: Code2, highlight: true },
  { label: "Full IP and Git ownership", icon: ShieldCheck, highlight: false },
  { label: "Realtime Edge caching", icon: Database, highlight: false }
];

export default function TechMarquee() {
  return (
    <div className="w-full py-4.5 bg-[#07080C] border-b border-white/[0.08] overflow-hidden relative select-none">
      {/* Subtle Luminous Ambient Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[60px] bg-violet-600/10 blur-[80px] pointer-events-none -z-10" />

      {/* Edge Fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-28 bg-gradient-to-r from-[#07080C] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-28 bg-gradient-to-l from-[#07080C] to-transparent z-10" />

      <div className="animate-marquee-loop items-center gap-8 sm:gap-12">
        {[...marqueeItems, ...marqueeItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2 text-xs font-normal text-slate-300 whitespace-nowrap"
            >
              <Icon
                size={14}
                className={item.highlight ? "text-violet-400 shrink-0" : "text-slate-500 shrink-0"}
              />
              <span className={item.highlight ? "text-slate-100 font-medium" : "text-slate-400"}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
