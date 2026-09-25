"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button, MagneticElement, SpotlightCard } from "@/components/ui";
import { 
  ArrowUpRight, 
  Bot, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Terminal as TerminalIcon 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Enterprise Deployments" },
  { value: 100, suffix: "%", label: "In-House Engineering" },
  { value: 99, suffix: ".9%", label: "System Uptime SLA" },
];

const capabilityPills = [
  { icon: Bot, label: "Autonomous AI Agents" },
  { icon: Cpu, label: "Enterprise Web Architecture" },
  { icon: ShieldCheck, label: "Healthcare & FinTech SaaS" },
  { icon: Zap, label: "Sub-Second Latency Systems" },
];

const terminalModes = [
  {
    id: "agents",
    label: "Autonomous AI Agent",
    logs: [
      { text: "Initializing Autonomous Agent Swarm (v2.6)...", type: "system" },
      { text: "Connecting RAG Vector Index: 1,536-dim embeddings loaded [sub-12ms]", type: "cyan" },
      { text: "Semantic Intent Extractor: Bengali + English multi-lingual model ready", type: "info" },
      { text: "Agent Execution: Lead qualification & conversion closed autonomously", type: "success" },
      { text: "Telemetry: 0% hallucination rate across 45,000 active sessions", type: "highlight" },
    ],
    metric: { p99: "12ms", throughput: "1,400 req/s", status: "Optimal" }
  },
  {
    id: "microservices",
    label: "Next.js 16 Web Architecture",
    logs: [
      { text: "Compiling Turbopack Server Component Tree...", type: "system" },
      { text: "Edge Cache Distribution: Vercel / Cloudflare Global Network [100% HIT]", type: "cyan" },
      { text: "Database Pipeline: Supabase PostgreSQL Real-time subscriptions active", type: "info" },
      { text: "Core Web Vitals: LCP 0.38s | CLS 0.000 | FID 11ms (Score: 100/100)", type: "success" },
      { text: "Security Layer: Strict CSP + SOC-2 Type II Compliant Architecture", type: "highlight" },
    ],
    metric: { p99: "18ms", throughput: "4,200 req/s", status: "100/100" }
  },
  {
    id: "saas",
    label: "Healthcare SaaS Engine",
    logs: [
      { text: "Booting Silent OPD Queue Manager (Mr Compounder Core)...", type: "system" },
      { text: "SMS & WhatsApp Live Dispatch Engine: Gateway Verified [Active]", type: "cyan" },
      { text: "Zero-Latency Real-Time Doctor Chamber Sync: Connected", type: "info" },
      { text: "Prescription Encryption & HIPAA-Ready Vault: Enabled", type: "success" },
      { text: "System SLA: 99.99% Guaranteed Continuous Uptime", type: "highlight" },
    ],
    metric: { p99: "9ms", throughput: "99.99% SLA", status: "Secure" }
  }
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const [activeModeIdx, setActiveModeIdx] = useState(0);
  const [runningLine, setRunningLine] = useState(0);

  // Cycle running logs
  useEffect(() => {
    const interval = setInterval(() => {
      setRunningLine((prev) => (prev + 1) % 5);
    }, 2400);
    return () => clearInterval(interval);
  }, [activeModeIdx]);

  useEffect(() => {
    if (!containerRef.current || !heroContentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(".hero-eyebrow", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.1 })
        .fromTo(".hero-title-node", { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.5")
        .fromTo(".hero-sub-node", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .fromTo(".hero-cta-node", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, "-=0.5")
        .fromTo(terminalRef.current, { x: 40, opacity: 0, scale: 0.95 }, { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }, "-=0.6");

      gsap.to(heroContentRef.current, {
        yPercent: 12,
        scale: 0.97,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll(".stat-number");
        counters.forEach((counter) => {
          const target = parseFloat(counter.getAttribute("data-target") || "0");
          gsap.fromTo(
            counter,
            { textContent: "0" },
            {
              textContent: target,
              duration: 2.2,
              snap: { textContent: 1 },
              scrollTrigger: { trigger: counter, start: "top 92%" },
              ease: "power2.out",
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentMode = terminalModes[activeModeIdx];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[96svh] flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-20 pt-[115px] md:pt-[135px] pb-16 overflow-hidden border-b border-slate-800/80"
    >
      {/* Ambient Lighting */}
      <div 
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] md:w-[900px] h-[650px] md:h-[900px] rounded-full blur-[140px] opacity-25 z-0"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)"
        }}
      />

      {/* Main Grid */}
      <div 
        ref={heroContentRef}
        className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10 my-auto"
      >
        {/* Left Column: Master Pitch (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Availability Pill */}
          <div className="hero-eyebrow inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-indigo-500/40 bg-[#0B0F19]/90 backdrop-blur-md mb-6 shadow-[0_0_25px_rgba(99,102,241,0.2)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
            </span>
            <span className="font-ui text-xs sm:text-sm font-semibold tracking-wider uppercase text-cyan-300">
              Accepting Q2/Q3 Projects <span className="text-indigo-400">·</span> Kolkata &amp; Global
            </span>
          </div>

          {/* Master Headline */}
          <h1 className="hero-title-node text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-bold leading-[1.08] tracking-tight text-[#F8FAFC] mb-6">
            We Build Custom Software &amp; AI Tools For{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent underline decoration-cyan-400/40 decoration-wavy decoration-1 underline-offset-8">
              Growing
            </span>{" "}
            Businesses.
          </h1>

          {/* Subtext in easy, clear English */}
          <p className="hero-sub-node text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-8 max-w-2xl">
            Stova Media is a custom software agency &amp; AI studio in Kolkata. We build fast websites, mobile apps, and 24/7 smart AI chatbots that help you win more customers and grow your revenue.
          </p>

          {/* CTAs */}
          <div className="hero-cta-node flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
            <MagneticElement className="w-full sm:w-auto">
              <Button 
                variant="primary" 
                href="/contact" 
                className="w-full sm:w-auto px-9 py-5 text-sm sm:text-base font-bold tracking-wider flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.55)] transition-all duration-300 cursor-pointer min-h-[52px]"
              >
                <span>Start Your Project</span>
                <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </MagneticElement>

            <MagneticElement className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                href="/work" 
                className="w-full sm:w-auto px-8 py-5 text-sm sm:text-base uppercase tracking-wider font-bold font-ui border border-slate-700 bg-[#0B0F19]/80 text-slate-200 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300 flex items-center justify-center gap-2 min-h-[52px]"
              >
                <span>Explore Selected Works</span>
              </Button>
            </MagneticElement>
          </div>

          {/* Capability Pills */}
          <div className="flex flex-wrap gap-2.5">
            {capabilityPills.map((pill, idx) => {
              const Icon = pill.icon;
              return (
                <div 
                  key={idx}
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-800 bg-[#0A0E1A]/80 backdrop-blur-sm text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors duration-300 text-xs font-ui"
                >
                  <Icon size={13} className="text-cyan-400" />
                  <span>{pill.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: LIVE ARCHITECTURE TERMINAL PREVIEW (5 cols) */}
        <div className="lg:col-span-5 w-full" ref={terminalRef}>
          <SpotlightCard 
            spotlightColor="rgba(6, 182, 212, 0.2)"
            className="p-5 sm:p-7 border-slate-800 bg-[#0A0E1A]/95 shadow-2xl relative overflow-hidden"
          >
            {/* Terminal Window Header Bar */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-slate-400 ml-2 font-semibold flex items-center gap-1.5">
                  <TerminalIcon size={13} className="text-cyan-400" />
                  stova-kernel@v2.6
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Live Engine</span>
              </div>
            </div>

            {/* Interactive Mode Tabs */}
            <div className="flex items-center gap-1 bg-[#05070D] p-1 border border-slate-800 mb-4 overflow-x-auto">
              {terminalModes.map((mode, idx) => (
                <button
                  key={mode.id}
                  onClick={() => {
                    setActiveModeIdx(idx);
                    setRunningLine(0);
                  }}
                  className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    activeModeIdx === idx
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Live Terminal Output Console */}
            <div className="bg-[#05070D] border border-slate-800 p-4 rounded-xs min-h-[190px] font-mono text-xs space-y-2.5 overflow-hidden">
              {currentMode.logs.map((log, lIdx) => (
                <div 
                  key={lIdx}
                  className={`flex items-start gap-2 transition-all duration-300 ${
                    lIdx <= runningLine ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-1"
                  }`}
                >
                  <span className="text-indigo-400 font-bold select-none">&gt;</span>
                  <span 
                    className={
                      log.type === "cyan" 
                        ? "text-cyan-300 font-medium"
                        : log.type === "success"
                        ? "text-emerald-400 font-medium"
                        : log.type === "highlight"
                        ? "text-amber-300 font-medium"
                        : "text-slate-300"
                    }
                  >
                    {log.text}
                  </span>
                </div>
              ))}

              <div className="flex items-center gap-1.5 pt-1 text-cyan-400">
                <span className="inline-block w-2 h-3.5 bg-cyan-400 animate-pulse" />
                <span className="text-[10px] text-slate-500">streaming telemetry live...</span>
              </div>
            </div>

            {/* Performance HUD Footer */}
            <div className="mt-4 pt-3.5 border-t border-slate-800 grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2 bg-[#05070D] border border-slate-800">
                <span className="text-[9px] uppercase tracking-wider text-slate-500 block">P99 Latency</span>
                <span className="text-xs text-cyan-400 font-bold">{currentMode.metric.p99}</span>
              </div>
              <div className="p-2 bg-[#05070D] border border-slate-800">
                <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Throughput</span>
                <span className="text-xs text-emerald-400 font-bold">{currentMode.metric.throughput}</span>
              </div>
              <div className="p-2 bg-[#05070D] border border-slate-800">
                <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Health</span>
                <span className="text-xs text-indigo-300 font-bold">{currentMode.metric.status}</span>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>

      {/* Stats Strip Bar */}
      <div 
        ref={statsRef}
        className="relative z-10 max-w-[1400px] mx-auto w-full pt-8 md:pt-10 border-t border-slate-800/80 mt-12 md:mt-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start group">
              <div className="flex items-baseline">
                <span 
                  className="stat-number font-display text-3xl sm:text-4xl lg:text-5xl text-[#F8FAFC] tracking-tight group-hover:text-cyan-400 transition-colors duration-500 font-bold" 
                  data-target={stat.value}
                >
                  0
                </span>
                <span className="text-indigo-400 font-display text-2xl sm:text-3xl ml-1 font-bold">{stat.suffix}</span>
              </div>
              <span className="text-slate-400 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium mt-1 font-ui">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
