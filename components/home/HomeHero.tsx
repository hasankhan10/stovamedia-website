"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Zap, Shield, Cpu, Activity, CheckCircle, ArrowRight } from "lucide-react";
import { AppointmentModal, MagneticElement } from "@/components/ui";
import HeroMotionCanvas from "@/components/animations/HeroMotionCanvas";
import TiltCard from "@/components/animations/TiltCard";

export default function HomeHero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden bg-white">
      {/* Background Interactive Particle Mesh */}
      <HeroMotionCanvas />

      {/* Dynamic Background Radiant Halo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[800px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-indigo-100/70 via-cyan-100/40 to-blue-50/30 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-[1300px] mx-auto relative z-10">
        {/* Top Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex justify-center mb-5 sm:mb-7"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/90 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-semibold shadow-xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            <span className="tracking-wide">Modern Software Engineering &amp; AI Studio</span>
          </div>
        </motion.div>

        {/* Monumental Headline */}
        <div className="text-center max-w-5xl mx-auto mb-5 sm:mb-7">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.08]"
          >
            We Engineer Websites, Custom Software &amp;{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 bg-clip-text text-transparent">
              AI Automations
            </span>
          </motion.h1>
        </div>

        {/* Jargon-free Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-center text-slate-600 text-base sm:text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-11"
        >
          From lightning-fast small business websites to enterprise SaaS platforms and autonomous 24/7 AI agents. 100% custom code, zero bloat, built to scale your revenue.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 mb-14 sm:mb-20"
        >
          <MagneticElement strength={0.3}>
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_8px_25px_rgba(79,70,229,0.3)] hover:shadow-[0_12px_30px_rgba(79,70,229,0.4)] transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.98] cursor-pointer"
            >
              <Sparkles size={18} />
              <span>Start a Project</span>
              <ArrowRight size={18} />
            </button>
          </MagneticElement>

          <MagneticElement strength={0.3}>
            <a
              href="#what-we-do"
              className="w-full sm:w-auto px-7 sm:px-8 py-4 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Explore What We Do</span>
              <ArrowUpRight size={17} className="text-slate-500" />
            </a>
          </MagneticElement>
        </motion.div>

        {/* 3D Interactive Tilt Live Dashboard Graphic */}
        <TiltCard maxTilt={4} className="max-w-5xl mx-auto">
          <div className="rounded-2xl sm:rounded-3xl p-0.5 sm:p-1 bg-gradient-to-b from-indigo-200 via-slate-200 to-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.07)]">
            <div className="bg-white rounded-[14px] sm:rounded-[22px] p-5 sm:p-7 md:p-9 border border-slate-100 overflow-hidden">
              {/* Window Top Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-[11px] sm:text-xs font-mono text-slate-400">stova-engine://telemetry</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>All Systems Operational</span>
                </div>
              </div>

              {/* Live Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {/* Metric 1: Web Performance */}
                <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50/80 border border-slate-200/70 relative overflow-hidden group hover:border-indigo-300 transition-colors">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">Speed Score</span>
                    <Zap size={15} className="text-amber-500" />
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">100/100</span>
                    <span className="text-xs text-emerald-600 font-semibold">Sub-50ms TTFB</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 sm:h-2 rounded-full overflow-hidden mt-2.5">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 w-[98%]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 mt-2 block font-medium">Google Core Web Vitals Optimized</span>
                </div>

                {/* Metric 2: Architecture & Uptime */}
                <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50/80 border border-slate-200/70 relative overflow-hidden group hover:border-indigo-300 transition-colors">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">Custom SaaS SLA</span>
                    <Activity size={15} className="text-indigo-600" />
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">99.99%</span>
                    <span className="text-xs text-indigo-600 font-semibold">Zero Failure</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 sm:h-2 rounded-full overflow-hidden mt-2.5">
                    <div className="h-full bg-indigo-600 w-[99.9%]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 mt-2 block font-medium">Enterprise PostgreSQL &amp; Next.js</span>
                </div>

                {/* Metric 3: Autonomous AI Agents */}
                <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50/80 border border-slate-200/70 relative overflow-hidden group hover:border-indigo-300 transition-colors">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">Autonomous AI</span>
                    <Cpu size={15} className="text-cyan-600" />
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">24/7</span>
                    <span className="text-xs text-cyan-600 font-semibold">Live Autopilot</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 sm:h-2 rounded-full overflow-hidden mt-2.5">
                    <div className="h-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-400 w-full" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 mt-2 block font-medium">Autonomous Lead &amp; Support Pipelines</span>
                </div>
              </div>

              {/* Bottom Trust Indicators */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap justify-between items-center gap-3 text-[11px] sm:text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  <span>100% In-House Code (Zero Templates)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield size={14} className="text-indigo-600 shrink-0" />
                  <span>Complete IP Ownership</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap size={14} className="text-amber-500 shrink-0" />
                  <span>Direct Lead Architect Access</span>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>

      {/* Appointment / Booking Modal */}
      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
