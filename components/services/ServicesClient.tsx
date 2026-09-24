"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SplitHeadline, SectionLabel, Tag, RevealOnScroll, SpotlightCard, MagneticElement, Button } from "@/components/ui";
import CTASection from "@/components/sections/CTASection";
import { 
  Code2, 
  Bot, 
  Store, 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Smartphone, 
  Sparkles, 
  Layers, 
  CheckCircle2,
  Tag as TagIcon,
  ArrowUpRight,
  MessageSquare,
  Cpu,
  Terminal,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ServiceItem, defaultServices } from "@/lib/db-services";

const ICON_MAP: Record<string, any> = {
  Code2,
  Bot,
  Store,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Globe,
  Smartphone,
  Sparkles,
  Layers,
};

const SPOTLIGHT_COLORS = [
  "rgba(99, 102, 241, 0.22)", // Indigo
  "rgba(6, 182, 212, 0.22)",  // Cyan
  "rgba(16, 185, 129, 0.22)", // Emerald
  "rgba(56, 189, 248, 0.22)", // Sky
];

interface ServicesClientProps {
  initialServices?: ServiceItem[];
}

export default function ServicesClient({ initialServices }: ServicesClientProps) {
  const serviceDetails = initialServices && initialServices.length > 0 ? initialServices : defaultServices;
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredServices = activeFilter === "all"
    ? serviceDetails
    : serviceDetails.filter((s) => s.id === activeFilter);

  return (
    <main className="pt-28 md:pt-36 min-h-screen bg-[#05070D] text-[#F8FAFC]">
      
      {/* 1️⃣ HERO SECTION */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 mb-20 md:mb-28 flex flex-col items-center text-center relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div 
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] md:w-[900px] h-[450px] rounded-full blur-[140px] opacity-25 z-0"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(6, 182, 212, 0.2) 60%, transparent 70%)"
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-indigo-500/40 bg-[#0B0F19]/90 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="text-xs uppercase font-ui tracking-wider font-semibold text-cyan-300">
              Full-Stack Architecture &amp; Production AI Capabilities
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.02] tracking-tight text-[#F8FAFC]">
            Your Vision.{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Engineered To Perfection.
            </span>
          </h1>

          <p className="mt-8 text-slate-300 font-ui text-base sm:text-xl max-w-2xl leading-relaxed font-light">
            We architect and ship high-fidelity software products custom-tailored to your exact business requirements, adhering to zero tech debt standards and extreme performance.
          </p>

          {/* Quick Jump Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mt-10">
            <button
              onClick={() => setActiveFilter("all")}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-ui uppercase tracking-wider font-semibold border transition-all cursor-pointer",
                activeFilter === "all"
                  ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white border-transparent shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                  : "bg-[#0B0F19]/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
              )}
            >
              All Capabilities ({serviceDetails.length})
            </button>
            {serviceDetails.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveFilter(s.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-ui uppercase tracking-wider font-semibold border transition-all cursor-pointer",
                  activeFilter === s.id
                    ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white border-transparent shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                    : "bg-[#0B0F19]/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                )}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2️⃣ SERVICE CARDS BREAKDOWN */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1400px] mx-auto space-y-12 md:space-y-16 mb-24 md:mb-36">
        {filteredServices.map((service, idx) => {
          const IconComp = ICON_MAP[service.icon] || Code2;
          const spotlightColor = SPOTLIGHT_COLORS[idx % SPOTLIGHT_COLORS.length];
          const waText = encodeURIComponent(`Hi Stova Media, I would like to discuss a project regarding: ${service.title}`);

          return (
            <RevealOnScroll key={service.id}>
              <div id={service.id} className="scroll-mt-28">
                <SpotlightCard
                  spotlightColor={spotlightColor}
                  className="p-7 sm:p-10 md:p-14 lg:p-16 border-slate-800 bg-[#0B0F19]/85 backdrop-blur-xl rounded-xs relative overflow-hidden shadow-2xl group hover:border-indigo-500/50 transition-all duration-500"
                >
                  {/* Giant Watermark Number */}
                  <span className="absolute top-4 right-6 md:right-12 font-display font-bold text-[90px] sm:text-[140px] md:text-[180px] lg:text-[220px] text-indigo-500/5 group-hover:text-cyan-400/10 select-none pointer-events-none transition-colors duration-700 leading-none">
                    {service.number}
                  </span>

                  <div className="relative z-10">
                    {/* Service Header Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xs border border-slate-800 bg-[#05070D] flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 group-hover:bg-cyan-950/30 transition-all duration-300 shadow-sm flex-shrink-0">
                          <IconComp size={28} strokeWidth={1.5} />
                        </div>
                        <div>
                          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-cyan-400 font-mono block mb-1">
                            Service [{service.number}]
                          </span>
                          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#F8FAFC] font-bold group-hover:text-cyan-400 transition-colors duration-300">
                            {service.title}
                          </h2>
                        </div>
                      </div>

                      {/* Pricing Tag Pill if exists */}
                      {service.ourPrice && (
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 rounded-xs self-start sm:self-auto shadow-sm">
                          <TagIcon size={14} className="text-emerald-400" />
                          <span className="font-mono text-xs sm:text-sm font-bold">
                            {service.ourPrice}
                          </span>
                          {service.marketPrice && (
                            <span className="text-xs text-slate-500 line-through font-mono">
                              {service.marketPrice}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Tagline */}
                    <p className="font-display italic text-lg sm:text-xl md:text-2xl text-slate-300 font-normal mb-10 max-w-3xl leading-relaxed">
                      &ldquo;{service.tagline}&rdquo;
                    </p>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                      
                      {/* Left: Description & Deliverables (7 cols) */}
                      <div className="lg:col-span-7 space-y-8">
                        <div>
                          <span className="text-xs uppercase tracking-widest font-bold text-slate-400 font-ui block mb-3">
                            Architectural Overview
                          </span>
                          <p className="font-ui text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                            {service.desc}
                          </p>
                        </div>

                        {service.deliverables && service.deliverables.length > 0 && (
                          <div>
                            <span className="text-xs uppercase tracking-widest font-bold text-cyan-400 font-ui block mb-4">
                              What We Deliver (Production Guarantee)
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {service.deliverables.map((item, dIdx) => (
                                <div 
                                  key={dIdx} 
                                  className="p-3 bg-[#05070D] border border-slate-800 flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-ui hover:border-indigo-500/40 transition-colors"
                                >
                                  <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Triggers */}
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                          <MagneticElement>
                            <Link
                              href="/contact"
                              className="px-7 py-4 bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.35)] min-h-[48px]"
                            >
                              <span>Book Feasibility Call</span>
                              <ArrowUpRight size={16} />
                            </Link>
                          </MagneticElement>

                          <a
                            href={`https://wa.me/919432053261?text=${waText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-4 border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2 min-h-[48px]"
                          >
                            <MessageSquare size={16} />
                            <span>WhatsApp Inquire</span>
                          </a>
                        </div>
                      </div>

                      {/* Right: Tech Stack & Engineering Highlights (5 cols) */}
                      <div className="lg:col-span-5 space-y-6">
                        {/* Tech Stack Deck */}
                        {service.tech && service.tech.length > 0 && (
                          <div className="p-6 bg-[#05070D] border border-slate-800 rounded-xs">
                            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-slate-400 font-ui block mb-4 flex items-center gap-2">
                              <Cpu size={14} className="text-indigo-400" /> Core Technology Stack
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {service.tech.map((t) => (
                                <span 
                                  key={t} 
                                  className="px-3 py-1.5 text-xs font-mono font-medium bg-[#0B0F19] border border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Engineering Highlights */}
                        {service.highlights && service.highlights.length > 0 && (
                          <div className="space-y-3">
                            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-slate-400 font-ui block mb-2">
                              Engineering Standards
                            </span>
                            {service.highlights.map((h, hIdx) => (
                              <div
                                key={hIdx}
                                className="p-4 sm:p-5 bg-[#05070D] border border-slate-800 rounded-xs flex items-start gap-3.5 hover:border-cyan-500/30 transition-colors"
                              >
                                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                                <div>
                                  <span className="font-display font-bold text-base text-[#F8FAFC] block mb-1">
                                    {h.label}
                                  </span>
                                  <p className="text-xs sm:text-sm text-slate-400 font-ui font-light leading-relaxed">
                                    {h.desc}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* Bottom Laser Line on Hover */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                </SpotlightCard>
              </div>
            </RevealOnScroll>
          );
        })}
      </section>

      {/* 3️⃣ PRICING & ENGINEERING PROTOCOL BANNER */}
      <section className="py-20 sm:py-24 bg-[#070B16] border-y border-slate-800/80 px-5 sm:px-8 md:px-12 lg:px-20 text-center relative overflow-hidden">
        <div 
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[140px] opacity-20 z-0"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)"
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <SectionLabel className="justify-center">Outcome-Driven Engineering</SectionLabel>
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold leading-snug text-[#F8FAFC]">
            We don&apos;t bill per hour. We deliver <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">tangible business outcomes</span>.
          </h3>
          <p className="text-slate-300 font-ui text-base sm:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Fixed scope quotes. Zero hidden costs. 100% intellectual property ownership from day one.
          </p>

          <div className="pt-6 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs sm:text-sm font-ui text-slate-400">
            <span className="flex items-center gap-2 text-slate-200 font-medium">
              <Zap size={16} className="text-cyan-400" /> Sub-Second SLA
            </span>
            <span className="flex items-center gap-2 text-slate-200 font-medium">
              <ShieldCheck size={16} className="text-emerald-400" /> Zero Tech Debt Guarantee
            </span>
            <span className="flex items-center gap-2 text-slate-200 font-medium">
              <Clock size={16} className="text-indigo-400" /> 4-Hour Feasibility Response
            </span>
          </div>
        </div>
      </section>

      {/* 4️⃣ FINAL CALL TO ACTION */}
      <CTASection />
    </main>
  );
}
