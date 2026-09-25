"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel, SplitHeadline, SpotlightCard } from "@/components/ui";
import { CheckCircle2, ShieldCheck, Zap, Terminal, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    phase: "Week 01",
    title: "Discovery & Technical Blueprint",
    desc: "We analyze your business mechanics, technical constraints, and data flows to map out an unassailable system architecture before writing a single line of code.",
    icon: Terminal,
    spotlight: "rgba(99, 102, 241, 0.2)",
    deliverables: [
      "System Architecture & DB Schema",
      "API & LLM Pipeline Specification",
      "Fixed Budget & Timeline Contract"
    ]
  },
  {
    number: "02",
    phase: "Week 02",
    title: "High-Fidelity Interface & Token System",
    desc: "We design high-converting, accessible user interfaces built on reusable design tokens, ensuring cohesive branding, rapid rendering, and zero layout shift.",
    icon: Zap,
    spotlight: "rgba(6, 182, 212, 0.2)",
    deliverables: [
      "Interactive Component Library",
      "Mobile-First Responsive Layouts",
      "Design Token System (Tailwind/CSS)"
    ]
  },
  {
    number: "03",
    phase: "Weeks 03-05",
    title: "Full-Stack Build & Sprint Demos",
    desc: "Rapid iterative development cycles. You receive live staging deployments with recorded weekly walkthroughs so you see tangible progress every 7 days.",
    icon: ShieldCheck,
    spotlight: "rgba(16, 185, 129, 0.2)",
    deliverables: [
      "Weekly Live Staging Deployments",
      "Rigorous Automated Unit & E2E Testing",
      "Bi-directional Client Feedback Loops"
    ]
  },
  {
    number: "04",
    phase: "Launch & Post",
    title: "Zero-Downtime Launch & Scale SLAs",
    desc: "We execute frictionless production deployments with automated database migrations, real-time error telemetry, and guaranteed response time SLAs.",
    icon: Rocket,
    spotlight: "rgba(56, 189, 248, 0.2)",
    deliverables: [
      "Edge Caching & Performance Audit",
      "Comprehensive Handover & API Docs",
      "30-Day Guaranteed Post-Launch SLA"
    ]
  },
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 250px",
          end: "bottom 75%",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".process-step-item").forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.4, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              end: "bottom 70%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="process" 
      ref={containerRef} 
      className="py-20 sm:py-28 md:py-36 px-5 sm:px-8 md:px-12 lg:px-20 bg-[#070A12] relative z-10 border-t border-slate-800/80"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-24 relative">
        {/* Left Column: Sticky Briefing */}
        <div className="lg:sticky lg:top-36 h-fit space-y-7">
          <div>
            <SectionLabel>How We Work</SectionLabel>
            <SplitHeadline tag="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-[1.08] tracking-tight text-[#F8FAFC]">
              Simple, Fast &amp; Transparent Process.
            </SplitHeadline>
          </div>

          <p className="text-slate-300 font-ui text-base sm:text-lg leading-relaxed max-w-md font-light">
            We follow a clear step-by-step roadmap so you always know what is being built, see weekly live demos, and launch on time with zero surprises.
          </p>

          <div className="p-6 border border-slate-800 bg-[#0B0F19]/80 backdrop-blur-md space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
              <span className="text-xs uppercase font-ui font-bold tracking-wider text-cyan-300">
                The Stova Guarantee
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-ui leading-relaxed">
              You receive 100% full ownership of all source code, weekly progress walkthroughs, and direct communication with our lead engineer.
            </p>
          </div>
        </div>

        {/* Right Column: Step-by-Step Milestones */}
        <div className="relative pl-6 md:pl-16">
          {/* Vertical Laser Progress Track */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-800/60">
            <div 
              ref={lineRef} 
              className="w-full h-0 bg-gradient-to-b from-indigo-500 via-cyan-400 to-emerald-400 origin-top shadow-[0_0_14px_rgba(6,182,212,0.8)]" 
            />
          </div>

          <div className="space-y-6 sm:space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div 
                  key={i} 
                  className="process-step-item group relative transition-all duration-500"
                >
                  <SpotlightCard 
                    spotlightColor={step.spotlight}
                    className="p-6 sm:p-8 md:p-10 border-slate-800 bg-[#0B0F19]/80 backdrop-blur-sm group-hover:border-indigo-500/50 transition-all duration-500"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-5 sm:mb-6">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-2xl sm:text-3xl text-cyan-400 font-bold">
                          {step.number}
                        </span>
                        <span className="text-[10px] sm:text-xs font-ui uppercase tracking-widest px-2.5 py-1 bg-[#05070D] border border-slate-800 text-slate-400 font-semibold">
                          {step.phase}
                        </span>
                      </div>

                      <div className="p-2.5 border border-slate-800 bg-[#05070D] group-hover:border-cyan-500/40 group-hover:bg-cyan-950/30 transition-colors duration-300">
                        <Icon size={20} className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
                      </div>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display text-[#F8FAFC] mb-3.5 group-hover:text-cyan-400 transition-colors duration-300 font-bold">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 font-ui font-light leading-relaxed mb-6">
                      {step.desc}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="pt-4 border-t border-slate-800/80 space-y-2">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 font-ui">
                        Milestone Deliverables:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {step.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 text-xs sm:text-sm font-ui text-slate-400 group-hover:text-slate-200 transition-colors duration-300">
                            <CheckCircle2 size={14} className="text-cyan-400 flex-shrink-0" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
