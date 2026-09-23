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
      // Laser progress line scrub
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

      // Staggered step highlight on scroll
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
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-ink relative z-10 border-t border-border/80"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 relative">
        
        {/* Left Column: Sticky Briefing */}
        <div className="lg:sticky lg:top-36 h-fit space-y-8">
          <div>
            <SectionLabel>Engineering Protocol</SectionLabel>
            <SplitHeadline tag="h2" className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.08] tracking-tight">
              Predictable. Transparent. Battle-Tested.
            </SplitHeadline>
          </div>

          <p className="text-muted font-ui text-base leading-relaxed max-w-md font-light">
            We operate on a zero-friction engineering protocol designed to eliminate scope creep, keep you informed weekly, and deliver production-grade software on schedule.
          </p>

          <div className="p-6 border border-border/80 bg-card/40 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-gold" />
              <span className="text-xs uppercase font-ui font-semibold tracking-wider text-cream">
                The Stova Guarantee
              </span>
            </div>
            <p className="text-xs text-dim font-ui leading-relaxed">
              Every project comes with 100% IP ownership, complete source code handover, and a dedicated Slack channel with direct founder engineering access.
            </p>
          </div>
        </div>

        {/* Right Column: Step-by-Step Milestones */}
        <div className="relative pl-8 md:pl-16">
          {/* Vertical Progress Track */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border/60">
            <div 
              ref={lineRef} 
              className="w-full h-0 bg-gradient-to-b from-gold via-gold-light to-gold origin-top shadow-[0_0_12px_rgba(201,168,76,0.6)]" 
            />
          </div>

          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div 
                  key={i} 
                  className="process-step-item group relative transition-all duration-500"
                >
                  <SpotlightCard className="p-8 md:p-10 border-border/80 bg-card/30 backdrop-blur-sm group-hover:border-gold/40 transition-all duration-500">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-2xl text-gold font-medium">
                          {step.number}
                        </span>
                        <span className="text-[10px] font-ui uppercase tracking-widest px-2.5 py-1 bg-ink border border-border text-dim">
                          {step.phase}
                        </span>
                      </div>

                      <div className="p-2.5 border border-border bg-ink group-hover:border-gold/30 transition-colors duration-300">
                        <Icon size={18} className="text-muted group-hover:text-gold transition-colors duration-300" />
                      </div>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-2xl md:text-3xl font-display text-cream mb-4 group-hover:text-gold transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted font-ui font-light leading-relaxed mb-6">
                      {step.desc}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="pt-4 border-t border-border/50 space-y-2">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-dim font-ui">
                        Milestone Deliverables:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {step.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 text-xs font-ui text-dim group-hover:text-cream/90 transition-colors duration-300">
                            <CheckCircle2 size={13} className="text-gold flex-shrink-0" />
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
