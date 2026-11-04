"use client";

import React, { useState } from "react";
import { Check, X, ShieldCheck, Zap, Layers, Cpu, HeartHandshake } from "lucide-react";
import { AppointmentModal } from "@/components/ui";

interface ComparisonMatrixProps {
  onOpenConsult?: () => void;
}

const COMPARISON_ROWS = [
  {
    icon: Layers,
    dimension: "Core architecture & stack",
    stova: "Next.js 15 App Router, React 19, TypeScript & PostgreSQL with Edge Caching",
    traditional: "Bloated PHP 7 monolith, 30+ fragile plugins & Elementor page builders",
  },
  {
    icon: Zap,
    dimension: "Core Web Vitals & speed",
    stova: "98–100 Mobile & Desktop PageSpeed, <50ms TTFB via global edge nodes",
    traditional: "3.5s+ First Contentful Paint, heavy DOM thrashing & shared hosting stalls",
  },
  {
    icon: Cpu,
    dimension: "Autonomous AI & workflows",
    stova: "Native custom AI booking agents, instant qualification & CRM sync",
    traditional: "Static contact forms leading to manual email inbox chaos & lead drop-off",
  },
  {
    icon: ShieldCheck,
    dimension: "Code & IP ownership",
    stova: "100% custom Git repository handoff, full proprietary ownership, zero lock-in",
    traditional: "Trapped in proprietary builder ecosystems with recurring plugin license fees",
  },
  {
    icon: HeartHandshake,
    dimension: "Engineering access & SLA",
    stova: "Direct senior engineer communication, proactive telemetry & 99.99% uptime",
    traditional: "Offloaded to non-technical account managers with days-long email ticket queues",
  },
];

export default function ComparisonMatrix({ onOpenConsult }: ComparisonMatrixProps) {
  const [internalModalOpen, setInternalModalOpen] = useState(false);

  const handleConsult = () => {
    if (onOpenConsult) {
      onOpenConsult();
    } else {
      setInternalModalOpen(true);
    }
  };

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#090D14] text-white relative overflow-hidden border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header: Sentence case, untracked, Hallmark Rule 9 */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E08A28]" />
            <span>Engineering benchmarks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.05] mb-4">
            Why High-Growth Brands Choose Stova Media
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            We don&apos;t assemble sluggish drag-and-drop templates. We engineer bespoke, production-grade web systems designed for sub-second speed, organic authority, and maximum conversion velocity.
          </p>
        </div>

        {/* Matrix Table Container */}
        <div className="rounded-xl border border-white/[0.08] bg-[#121722]/80 backdrop-blur-sm overflow-hidden shadow-2xl">
          {/* Header Row */}
          <div className="grid grid-cols-12 bg-white/[0.02] border-b border-white/[0.08] px-4 sm:px-6 py-4 text-xs font-medium text-slate-300">
            <div className="col-span-4 sm:col-span-3 text-slate-400 font-mono">capability</div>
            <div className="col-span-4 sm:col-span-5 text-[#E08A28] flex items-center gap-2 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E08A28]" />
              stova media standard
            </div>
            <div className="col-span-4 sm:col-span-4 text-slate-400 flex items-center gap-2 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              traditional agency (wp/php)
            </div>
          </div>

          {/* Matrix Rows */}
          <div className="divide-y divide-white/[0.06]">
            {COMPARISON_ROWS.map((row, idx) => {
              const Icon = row.icon;
              return (
                <div
                  key={idx}
                  className="grid grid-cols-12 px-4 sm:px-6 py-5 items-center hover:bg-white/[0.02] transition-colors gap-2 sm:gap-4"
                >
                  {/* Dimension */}
                  <div className="col-span-12 sm:col-span-3 flex items-center gap-2.5 mb-2 sm:mb-0">
                    <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 text-[#64A8E0]">
                      <Icon size={15} />
                    </div>
                    <span className="font-medium text-xs sm:text-sm text-slate-200">{row.dimension}</span>
                  </div>

                  {/* Stova Standard */}
                  <div className="col-span-12 sm:col-span-5 flex items-start gap-2.5 pr-2">
                    <div className="w-5 h-5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {row.stova}
                    </p>
                  </div>

                  {/* Traditional WP */}
                  <div className="col-span-12 sm:col-span-4 flex items-start gap-2.5 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.04]">
                    <div className="w-5 h-5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <X size={11} strokeWidth={3} />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                      {row.traditional}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Matrix Footer Callout */}
        <div className="mt-8 p-6 rounded-xl bg-[#121722]/90 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm sm:text-base font-medium text-slate-200 mb-1">
              Ready to upgrade your infrastructure to the modern edge?
            </h3>
            <p className="text-xs text-slate-400">
              Get an architectural audit and custom feasibility blueprint within 4 hours.
            </p>
          </div>
          <button
            onClick={handleConsult}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#E08A28] hover:bg-[#C9781D] text-[#1A1208] font-medium text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-amber-400"
          >
            Book architecture review →
          </button>
        </div>
      </div>

      <AppointmentModal isOpen={internalModalOpen} onClose={() => setInternalModalOpen(false)} />
    </section>
  );
}
