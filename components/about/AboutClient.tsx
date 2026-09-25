"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel, RevealOnScroll, SpotlightCard } from "@/components/ui";
import { 
  Linkedin, 
  ShieldCheck, 
  Code2, 
  Award, 
  Zap, 
  CheckCircle2, 
  XCircle,
  ArrowUpRight, 
  Terminal, 
  Sparkles,
  Compass,
  Server,
  Database,
  MessageSquare
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "4+", label: "Years Shipping Production Tech", desc: "From clinic automation to global AI pipelines" },
  { value: "50+", label: "Clinics & Enterprises Powered", desc: "Real users generating daily operational volume" },
  { value: "100%", label: "In-House Engineering Core", desc: "Crafted directly in Kolkata, zero junior subcontracting" },
  { value: "0%", label: "Template / Bloatware Tolerance", desc: "Pure bespoke code engineered for sub-second speed" },
];

const values = [
  {
    number: "01",
    title: "Honesty & Pragmatism",
    desc: "We tell you what won't work before you waste budget. We push back on unnecessary complexity and engineer for your long-term ROI rather than inflated agency hours.",
    icon: ShieldCheck,
    spotlight: "rgba(6, 182, 212, 0.22)",
    accent: "text-cyan-400",
    borderGlow: "hover:border-cyan-500/40"
  },
  {
    number: "02",
    title: "Architectural Craft & Speed",
    desc: "Design-first, performance-led. Every database query, frontend component, and API route is structured for sub-second rendering, 95+ Lighthouse scores, and zero layout shift.",
    icon: Code2,
    spotlight: "rgba(99, 102, 241, 0.22)",
    accent: "text-indigo-400",
    borderGlow: "hover:border-indigo-500/40"
  },
  {
    number: "03",
    title: "Unit Economics First",
    desc: "Software does not exist in a vacuum. We design systems that reduce operational overhead, automate staff workload, and directly accelerate conversion and customer retention.",
    icon: Zap,
    spotlight: "rgba(16, 185, 129, 0.22)",
    accent: "text-emerald-400",
    borderGlow: "hover:border-emerald-500/40"
  },
  {
    number: "04",
    title: "Direct Founder Access",
    desc: "You never get handed off to junior account managers. Every architectural decision, code review, and deployment is led directly by our founder Mehedi Hasan.",
    icon: Award,
    spotlight: "rgba(56, 189, 248, 0.22)",
    accent: "text-sky-400",
    borderGlow: "hover:border-sky-500/40"
  },
];

const comparisonRows = [
  {
    category: "Engineering Team",
    traditional: "Junior developers or outsourced freelancers working through a non-technical project manager.",
    stova: "100% senior in-house engineers led directly by Founder & Software Architect Mehedi Hasan."
  },
  {
    category: "Codebase & Architecture",
    traditional: "Bloated off-the-shelf WordPress / Shopify themes overloaded with 35+ slow third-party plugins.",
    stova: "Handcrafted Next.js 16, TypeScript, TailwindCSS, and PostgreSQL engineered for sub-second TTFB."
  },
  {
    category: "AI Implementation",
    traditional: "Generic ChatGPT API wrapper or basic chatbot iframe that halluncinates and provides no business value.",
    stova: "Autonomous multi-agent pipelines, RAG vector memory, and automated ERP/CRM database synchronization."
  },
  {
    category: "Pricing & Contracts",
    traditional: "Vague hourly estimates leading to unpredictable scope creep and unexpected billing overages.",
    stova: "Deterministic fixed-scope pricing with clear timeline milestones and guaranteed production deliverables."
  },
  {
    category: "Post-Launch Support",
    traditional: "Ghosted after final payment or locked into extortionate retainer contracts for basic bug fixes.",
    stova: "Dedicated 30-90 days warranty, full CI/CD deployment handover, and direct founder WhatsApp/Slack channel."
  }
];

const timeline = [
  { 
    year: "2023", 
    tag: "Genesis & Clinical Ops",
    title: "Identified Healthcare Operational Bottlenecks",
    event: "Discovered severe operational friction in Indian healthcare clinics, where manual queueing, lost patient histories, and chaotic OPD desks caused high patient drop-off.",
    icon: Compass
  },
  { 
    year: "2024", 
    tag: "High-Throughput SaaS",
    title: "Architected Custom Enterprise Engines",
    event: "Delivered bespoke enterprise management systems, high-converting digital storefronts, and 3D visualization engines, establishing our zero-tech-debt standard.",
    icon: Server
  },
  { 
    year: "2025", 
    tag: "Product Scale",
    title: "Mr Compounder Silent OPD Platform Launch",
    event: "Launched Mr Compounder across 50+ clinics, reducing patient wait times by 68% and automating prescription tracking for thousands of daily patient visits.",
    icon: Database
  },
  { 
    year: "2026", 
    tag: "Studio Flagship",
    title: "Stova Media AI Lab & Global Deployment",
    event: "Expanded Stova Media into a full-service AI & Custom Software studio, engineering autonomous agents, e-commerce accelerators, and web platforms for global brands.",
    icon: Sparkles
  }
];

const techStack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "TailwindCSS",
  "FastAPI",
  "Python",
  "Supabase",
  "PostgreSQL",
  "LangChain",
  "DeepSeek",
  "Claude 3.7",
  "GSAP",
  "Docker",
  "Redis"
];

export default function AboutClient() {
  const timelineRef = useRef<HTMLElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current || !timelineLineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(timelineLineRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 300px",
          end: "bottom 70%",
          scrub: true,
        },
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="pt-28 md:pt-36 min-h-screen bg-[#05070D] text-[#F8FAFC]">
      
      {/* 1️⃣ HERO SECTION */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 mb-20 md:mb-28 flex flex-col items-center text-center relative overflow-hidden">
        {/* Cyber-Obsidian Ambient Top Glow */}
        <div 
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] md:w-[1000px] h-[450px] rounded-full blur-[140px] opacity-25 z-0"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(6, 182, 212, 0.25) 50%, transparent 75%)"
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-indigo-500/40 bg-[#0B0F19]/90 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="text-xs uppercase font-ui tracking-wider font-semibold text-cyan-300">
              Founder-Led Studio · Kolkata Engineering Hub · Global Delivery
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.04] tracking-tight text-[#F8FAFC]">
            Pragmatic Engineering.{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Zero Compromises.
            </span>
          </h1>

          <p className="mt-8 text-slate-300 font-ui text-base sm:text-xl max-w-2xl leading-relaxed font-light">
            Stova Media was built on a straightforward thesis: high-growth businesses and healthcare institutions deserve world-class software engineered by senior craftspeople, not bloated agency bureaucracy.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="p-5 border border-slate-800 bg-[#0B0F19]/80 backdrop-blur-md rounded-xs text-center shadow-lg hover:border-indigo-500/40 transition-colors"
              >
                <div className="font-display text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="font-ui text-xs font-semibold text-slate-200 mb-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 font-ui leading-tight font-light">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2️⃣ FOUNDER & ARCHITECT SPOTLIGHT (THE DOSSIER) */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1400px] mx-auto mb-24 md:mb-36">
        <SpotlightCard
          spotlightColor="rgba(99, 102, 241, 0.22)"
          className="p-8 sm:p-12 md:p-16 border-slate-800 bg-[#0B0F19]/90 backdrop-blur-xl rounded-xs shadow-2xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Founder Card (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-2 border-indigo-500/60 shadow-[0_0_40px_rgba(99,102,241,0.35)] mb-6 flex-shrink-0 group">
                <Image 
                  src="/founder.jpeg" 
                  alt="Mehedi Hasan - Founder & Software Architect" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  priority
                />
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] mb-1">
                Mehedi Hasan
              </h3>
              <p className="text-xs uppercase font-ui tracking-wider text-cyan-400 font-semibold mb-4">
                Founder &amp; Lead Software Architect
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 rounded-xs">
                  Full-Stack Architecture
                </span>
                <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 rounded-xs">
                  AI Systems Design
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a 
                  href="https://www.linkedin.com/in/mehedi-hasan110/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-[#05070D] text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 text-xs font-ui transition-all shadow-sm"
                >
                  <Linkedin size={14} className="text-cyan-400" />
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight size={12} />
                </a>

                <a 
                  href="https://wa.me/919432053261?text=Hi%20Mehedi%2C%20I%20would%20like%20to%20discuss%20a%20software%20project%20with%20Stova%20Media."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 text-xs font-ui transition-all"
                >
                  <MessageSquare size={13} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right: Architectural Conviction & Engineering Manifesto (8 cols) */}
            <div className="lg:col-span-8 space-y-6 lg:border-l lg:border-slate-800 lg:pl-12">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-indigo-400" />
                <span className="text-xs uppercase tracking-widest font-bold text-indigo-400 font-ui">
                  The Founder&apos;s Engineering Manifesto
                </span>
              </div>

              <blockquote className="font-display italic text-xl sm:text-2xl md:text-3xl text-slate-200 font-normal leading-relaxed">
                &ldquo;We don&apos;t build superficial apps. We engineer pragmatic business engines. I saw too many Indian clinics and enterprises struggling with bloated templates, slow databases, and junior handoffs. At Stova Media, I personally lead technical architecture and code review on every project.&rdquo;
              </blockquote>

              <p className="font-ui text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                When you partner with us, you are not hiring a layer of account managers who translate your ideas poorly to outsourced subcontractors. You are partnering directly with engineers who understand system scalability, PostgreSQL performance tuning, autonomous AI orchestration, and commercial conversion.
              </p>

              <div className="pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 font-ui text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                  <span>Direct founder architectural review</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                  <span>Zero junior subcontracting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                  <span>Sub-second production standard</span>
                </div>
              </div>
            </div>

          </div>
        </SpotlightCard>
      </section>

      {/* 3️⃣ CORE OPERATING VALUES (4 PILLARS) */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1400px] mx-auto mb-24 md:mb-36">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel className="justify-center">Operating Principles</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#F8FAFC] mt-3">
            How We Operate
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 font-ui font-light">
            Four non-negotiable principles that guide every pull request, database schema, and client relationship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <SpotlightCard
                key={v.number}
                spotlightColor={v.spotlight}
                className={cn(
                  "p-7 sm:p-8 border-slate-800 bg-[#0B0F19]/80 backdrop-blur-sm rounded-xs flex flex-col justify-between transition-all duration-300 h-full group",
                  v.borderGlow
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      [{v.number}]
                    </span>
                    <div className="p-2.5 border border-slate-800 bg-[#05070D] rounded-xs group-hover:border-cyan-500/30 transition-colors">
                      <Icon size={18} className={v.accent} />
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F8FAFC] mb-3 group-hover:text-cyan-300 transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-ui font-light leading-relaxed">
                    {v.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 w-full flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>STANDARD</span>
                  <span className="text-cyan-400">ENFORCED</span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* 4️⃣ TRADITIONAL AGENCY VS. STOVA MEDIA COMPARISON MATRIX */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1400px] mx-auto mb-24 md:mb-36">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel className="justify-center">The Anti-Agency Difference</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#F8FAFC] mt-3">
            Why High-Growth Teams Choose Stova
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 font-ui font-light">
            Compare traditional agency dynamics with our founder-led engineering studio model.
          </p>
        </div>

        <div className="border border-slate-800 bg-[#0B0F19]/90 backdrop-blur-xl rounded-xs overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-slate-800 bg-[#05070D]/80 p-4 sm:p-6 font-display font-bold text-sm tracking-wide">
            <div className="md:col-span-3 text-slate-400 uppercase text-xs font-mono">Dimension</div>
            <div className="md:col-span-4 text-rose-400 flex items-center gap-2 mt-2 md:mt-0">
              <XCircle size={16} className="text-rose-500" />
              <span>Traditional Agency / Outsourcer</span>
            </div>
            <div className="md:col-span-5 text-cyan-300 flex items-center gap-2 mt-2 md:mt-0">
              <CheckCircle2 size={16} className="text-cyan-400" />
              <span>Stova Media Engineering Studio</span>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-slate-800/80">
            {comparisonRows.map((row, idx) => (
              <div 
                key={idx} 
                className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 gap-4 md:gap-6 hover:bg-slate-900/40 transition-colors"
              >
                <div className="md:col-span-3 font-display font-bold text-[#F8FAFC] text-sm sm:text-base flex items-start">
                  <span className="text-indigo-400 font-mono text-xs mr-2">0{idx + 1}.</span>
                  {row.category}
                </div>
                <div className="md:col-span-4 font-ui text-xs sm:text-sm text-slate-400 leading-relaxed pl-4 md:pl-0 border-l-2 md:border-l-0 border-rose-500/30">
                  {row.traditional}
                </div>
                <div className="md:col-span-5 font-ui text-xs sm:text-sm text-slate-200 leading-relaxed font-normal pl-4 md:pl-0 border-l-2 md:border-l-0 border-cyan-500/50 bg-cyan-950/10 md:bg-transparent rounded-r-xs p-2 md:p-0">
                  {row.stova}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ STUDIO EVOLUTION TIMELINE */}
      <section ref={timelineRef} className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1100px] mx-auto mb-24 md:mb-36 relative">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <SectionLabel className="justify-center">Studio Evolution</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#F8FAFC] mt-3">
            From Clinical Ops to AI Studio
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 font-ui font-light">
            How we evolved from solving real-world clinic bottlenecks into an international software and AI engineering studio.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Center Laser Rail */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-slate-800/80 top-0">
            <div 
              ref={timelineLineRef} 
              className="w-full h-0 bg-gradient-to-b from-indigo-500 via-cyan-400 to-emerald-400 origin-top shadow-[0_0_15px_rgba(6,182,212,0.9)]" 
            />
          </div>

          <div className="space-y-12 md:space-y-20">
            {timeline.map((item, i) => {
              const Icon = item.icon;
              return (
                <RevealOnScroll key={i}>
                  <div className={cn(
                    "flex flex-col md:flex-row items-center justify-between gap-6 md:gap-14 relative w-full",
                    i % 2 === 0 ? "md:flex-row-reverse" : ""
                  )}>
                    {/* Content Card */}
                    <div className="flex-1 w-full text-left">
                      <SpotlightCard
                        spotlightColor="rgba(99, 102, 241, 0.18)"
                        className="p-6 sm:p-8 border-slate-800 bg-[#0B0F19]/90 backdrop-blur-md rounded-xs hover:border-indigo-500/40 transition-colors shadow-xl group"
                      >
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-950/70 border border-indigo-500/40 text-cyan-300 rounded-xs">
                            {item.tag}
                          </span>
                          <span className="font-display font-bold text-2xl sm:text-3xl text-indigo-400">
                            {item.year}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <Icon size={18} className="text-cyan-400" />
                          <h4 className="font-display text-lg sm:text-xl font-bold text-[#F8FAFC]">
                            {item.title}
                          </h4>
                        </div>
                        
                        <p className="text-xs sm:text-sm text-slate-300 font-ui font-light leading-relaxed">
                          {item.event}
                        </p>
                      </SpotlightCard>
                    </div>

                    {/* Central Node Indicator */}
                    <div className="hidden md:flex w-8 h-8 rounded-full bg-[#05070D] border-2 border-cyan-400 items-center justify-center z-10 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.8)]">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    </div>

                    {/* Empty Spacer */}
                    <div className="hidden md:block flex-1" />
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6️⃣ ENGINEERING ARSENAL & TECH STACK */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1400px] mx-auto mb-24 md:mb-36">
        <div className="p-8 sm:p-12 border border-slate-800 bg-[#0B0F19]/80 backdrop-blur-md rounded-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <SectionLabel>Technology Arsenal</SectionLabel>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] mt-2 mb-4">
                Production-Tested Modern Stack
              </h3>
              <p className="font-ui text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                We select technologies strictly based on throughput, low latency, developer ergonomics, and rock-solid stability in live production environments.
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-wrap gap-2.5">
              {techStack.map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-3.5 py-1.5 text-xs font-mono font-medium text-slate-200 border border-slate-800 bg-[#05070D] rounded-xs hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7️⃣ FINAL CTA SECTION */}
      <CTASection />
    </main>
  );
}

