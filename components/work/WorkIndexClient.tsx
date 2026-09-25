"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard, SpotlightCard } from "@/components/ui";
import CTASection from "@/components/sections/CTASection";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/work";

export default function WorkIndexClient({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Extract unique categories from projects dynamically
  const uniqueCategories = ["All", ...Array.from(new Set(projects.map((p) => p.category || "Web Apps")))];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="pt-28 md:pt-36 pb-24 min-h-screen bg-[#05070D] text-[#F8FAFC]">
      
      {/* 1️⃣ HERO SECTION */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 mb-16 md:mb-24 flex flex-col items-center text-center relative overflow-hidden">
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
              Verified Production Deployments · 100% In-House Engineering
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.02] tracking-tight text-[#F8FAFC]">
            Our Work &amp;{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Case Studies.
            </span>
          </h1>

          <p className="mt-8 text-slate-300 font-ui text-base sm:text-xl max-w-2xl leading-relaxed font-light">
            Explore our real-world custom software, healthcare SaaS platforms, smart AI tools, and high-speed online stores.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mt-10">
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 sm:px-5 py-2 rounded-full text-xs font-ui uppercase tracking-wider font-semibold border transition-all cursor-pointer",
                  activeCategory === cat 
                    ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white border-transparent shadow-[0_0_15px_rgba(99,102,241,0.4)]" 
                    : "bg-[#0B0F19]/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                )}
              >
                {cat} {cat === "All" && `(${projects.length})`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2️⃣ PORTFOLIO GRID */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1400px] mx-auto mb-24 md:mb-36">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.slug || idx}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <ProjectCard 
                  {...project} 
                  index={String(idx + 1).padStart(2, "0")}
                  className="w-full h-full min-h-[420px] md:min-h-[500px]" 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-24 text-center border border-dashed border-slate-800 bg-[#0B0F19]/40 rounded-xs">
            <p className="text-slate-400 font-ui text-base">No active deployments found in this category.</p>
          </div>
        )}
      </section>

      {/* 3️⃣ IMPACT & ENGINEERING STANDARD METRICS */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1400px] mx-auto mb-24 md:mb-36">
        <SpotlightCard
          spotlightColor="rgba(6, 182, 212, 0.2)"
          className="p-8 sm:p-12 md:p-16 border-slate-800 bg-[#0B0F19]/90 backdrop-blur-xl rounded-xs shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
            {[
              { value: "100%", label: "In-House Engineering", sub: "0% Outsourced" },
              { value: "99.99%", label: "System Uptime SLA", sub: "Mission Critical" },
              { value: "3.4x", label: "Average Conversion Lift", sub: "AI Architecture" },
              { value: "0", label: "Technical Debt", sub: "Strict Type Safety" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-ui uppercase tracking-wider font-bold text-[#F8FAFC] mt-2">
                  {stat.label}
                </span>
                <span className="text-[11px] text-slate-400 font-ui mt-0.5">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </section>

      {/* 4️⃣ FINAL CTA SECTION */}
      <CTASection />
    </main>
  );
}
