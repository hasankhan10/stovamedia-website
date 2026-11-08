"use client";

import React, { useState, useRef } from "react";
import { ArrowRight, ArrowUpRight, Zap, Activity, Cpu, ShieldCheck } from "lucide-react";
import { AppointmentModal, MagneticElement, Crosshair, TechText, SpecularButton } from "@/components/ui";

export default function HomeHero() {
  const [modalOpen, setModalOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section ref={heroRef} className="relative pt-28 sm:pt-36 md:pt-44 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 bg-[#07080C] text-white border-b border-white/[0.08] overflow-hidden flex flex-col items-center justify-center">
      {/* 🎯 Precision Interactive Crosshair from React Bits */}
      <Crosshair
        containerRef={heroRef}
        color="#a78bfa"
        targetEffect="lock"
        thickness={1}
        opacity={0.6}
        smoothing={0.25}
        showCoordinates
        clickPulse
      />

      {/* 🌌 Celestial Radiant Dome / Arch Glow Effect */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[1200px] h-[480px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(139, 92, 246, 0.35) 0%, rgba(79, 70, 229, 0.2) 45%, transparent 75%)',
          filter: 'blur(50px)'
        }}
      />
      
      {/* 🔮 Premium Centered Bottom Ambient Glow Blur Effect (Clearly Visible) */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[850px] h-[300px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(139, 92, 246, 0.45) 0%, rgba(99, 102, 241, 0.25) 45%, transparent 75%)',
          filter: 'blur(60px)'
        }}
      />

      {/* Subtle Precision Grid with Soft Radial Mask */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" 
      />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
        {/* Eyebrow Label: Glassmorphic Glowing Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-violet-500/25 text-violet-300 text-xs font-medium backdrop-blur-xl shadow-[0_0_20px_rgba(139,92,246,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Autonomous software engineering studio in Kolkata</span>
          </div>
        </div>

        {/* Monumental Headline: Positioned Exactly in the Middle with React Bits TechText */}
        <div className="w-full max-w-6xl xl:max-w-7xl mx-auto text-center flex flex-col items-center justify-center mb-6 sm:mb-8">
          <h1 className="sr-only">Software and Autonomous AI Engineered to Scale</h1>

          <div className="w-full flex flex-col items-center justify-center -space-y-4 sm:-space-y-8 md:-space-y-12 lg:-space-y-16 select-none">
            <div className="w-full h-24 sm:h-36 md:h-48 lg:h-56 xl:h-64 max-w-5xl mx-auto transform scale-y-[1.28] sm:scale-y-[1.38] md:scale-y-[1.48] origin-center">
              <TechText
                text="SOFTWARE & AI"
                fontSize={200}
                fontWeight={800}
                color="#f8fafc"
                accentColor="#a78bfa"
                align="center"
                reach={260}
                softness={0.7}
                dashLength={4}
                dashGap={2}
                strokeWidth={1.5}
                lineStyle="dashed"
                reveal="letter"
                specks={18}
                selection={true}
                labels={true}
                draggable={true}
                bounce={0.4}
                clickKick={true}
                className="w-full h-full"
              />
            </div>

            <div className="w-full h-24 sm:h-36 md:h-48 lg:h-56 xl:h-64 max-w-6xl mx-auto transform scale-y-[1.28] sm:scale-y-[1.38] md:scale-y-[1.48] origin-center">
              <TechText
                text="ENGINEERED TO SCALE"
                fontSize={200}
                fontWeight={800}
                color="#f8fafc"
                accentColor="#a78bfa"
                align="center"
                reach={260}
                softness={0.7}
                dashLength={4}
                dashGap={2}
                strokeWidth={1.5}
                lineStyle="dashed"
                reveal="letter"
                specks={18}
                selection={true}
                labels={true}
                draggable={true}
                bounce={0.4}
                clickKick={true}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Lede sentence */}
        <p className="text-center text-slate-400 text-base sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed mb-9">
          Sub-second web platforms, enterprise SaaS, and 24/7 autonomous agents built in Kolkata.
        </p>

        {/* Action Pair: Specular Button & Secondary Link */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 sm:mb-20 w-full sm:w-auto">
          <SpecularButton
            onClick={() => setModalOpen(true)}
            size="md"
            radius={12}
            tint="#6d28d9"
            tintOpacity={0.7}
            lineColor="#c4b5fd"
            baseColor="#4c1d95"
            glow={1.2}
            thickness={1.5}
            intensity={1.2}
            idleIntensity={0.5}
            shineSize={14}
            shineFade={32}
            followMouse={true}
            proximity={320}
            className="w-full sm:w-auto text-white font-medium text-sm shadow-[0_0_28px_rgba(139,92,246,0.35)]"
          >
            <span>Book strategy consultation</span>
            <ArrowRight size={16} />
          </SpecularButton>

          <MagneticElement strength={0.2}>
            <a
              href="#work"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 font-medium text-sm transition-colors duration-150 flex items-center justify-center gap-2 backdrop-blur-md focus-visible:outline-2 focus-visible:outline-white/40"
            >
              <span>Explore live client systems</span>
              <ArrowUpRight size={15} className="text-slate-400" />
            </a>
          </MagneticElement>
        </div>

        {/* Console Telemetry Panel */}
        <div className="w-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] max-w-4xl mx-auto hover:border-violet-500/30 transition-colors duration-300">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400" />
              <span className="font-mono text-xs text-slate-400">system/telemetry · active production node</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>all clusters nominal</span>
            </div>
          </div>

          {/* 4 Instrument Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-white/[0.08]">
            <div className="p-4 sm:p-5 flex flex-col justify-between text-left">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Core Web Vitals</span>
                <Zap size={14} className="text-violet-400" />
              </div>
              <div className="font-mono text-2xl sm:text-3xl text-slate-100 font-normal tracking-tight">
                99<span className="text-xs text-slate-400 ml-1">/100</span>
              </div>
              <span className="text-[11px] text-emerald-400 mt-2 font-mono">Passed field test</span>
            </div>

            <div className="p-4 sm:p-5 flex flex-col justify-between text-left">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Edge TTFB</span>
                <Activity size={14} className="text-indigo-400" />
              </div>
              <div className="font-mono text-2xl sm:text-3xl text-slate-100 font-normal tracking-tight">
                &lt;42<span className="text-xs text-slate-400 ml-1">ms</span>
              </div>
              <span className="text-[11px] text-slate-400 mt-2 font-mono">Global edge cache</span>
            </div>

            <div className="p-4 sm:p-5 flex flex-col justify-between text-left">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>SLA Uptime</span>
                <ShieldCheck size={14} className="text-violet-400" />
              </div>
              <div className="font-mono text-2xl sm:text-3xl text-slate-100 font-normal tracking-tight">
                99.99<span className="text-xs text-slate-400 ml-1">%</span>
              </div>
              <span className="text-[11px] text-emerald-400 mt-2 font-mono">Enterprise postgres</span>
            </div>

            <div className="p-4 sm:p-5 flex flex-col justify-between text-left">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>AI Autopilot</span>
                <Cpu size={14} className="text-cyan-400" />
              </div>
              <div className="font-mono text-2xl sm:text-3xl text-slate-100 font-normal tracking-tight">
                24<span className="text-xs text-slate-400 ml-0.5">/7</span>
              </div>
              <span className="text-[11px] text-slate-400 mt-2 font-mono">Autonomous qualify</span>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment / Consultation Modal */}
      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
