"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel, SplitHeadline, SpotlightCard } from "@/components/ui";
import { ShieldCheck, Code2, Cpu, CheckCircle2, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const manifestoPoints = [
  {
    title: "Zero Outsourcing",
    desc: "Every line of code, design mockup, and AI prompt is crafted directly by our core in-house engineering team in Kolkata.",
    icon: ShieldCheck,
  },
  {
    title: "Engineering First",
    desc: "We prioritize clean architecture, type safety, low latency, and zero layout shift over flashy superficial gimmicks.",
    icon: Code2,
  },
  {
    title: "Production AI Specialization",
    desc: "We don't just call basic OpenAI APIs; we architect autonomous multi-agent pipelines and RAG vector workflows that solve real problems.",
    icon: Cpu,
  },
];

const stats = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Enterprise Users" },
  { value: 100, suffix: "%", label: "Client Retention" },
  { value: 0, suffix: "%", label: "Subcontracted" },
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !statsRef.current) return;

    const ctx = gsap.context(() => {
      const counters = statsRef.current?.querySelectorAll(".stat-number");
      counters?.forEach((counter) => {
        const target = parseFloat(counter.getAttribute("data-target") || "0");
        gsap.fromTo(
          counter,
          { textContent: "0" },
          {
            textContent: target,
            duration: 2,
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 90%",
            },
            ease: "power3.out",
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={containerRef} 
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-ink relative z-10 border-t border-border/80 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-16">
          <div>
            <SectionLabel>Founder-Led Studio</SectionLabel>
            <SplitHeadline tag="h2" className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.08] tracking-tight">
              Product-Minded Engineers Only.
            </SplitHeadline>
          </div>
          
          <p className="font-ui text-base md:text-lg text-muted font-light leading-relaxed max-w-xl">
            Stova Media was founded with a singular conviction: Indian businesses and international innovators deserve software engineered to the highest global standards, without agency bureaucracy or junior handoffs.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Founder Profile Card (5 cols) */}
          <div className="lg:col-span-5">
            <SpotlightCard className="h-full p-8 md:p-10 border-border/80 bg-card/40 backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-5 mb-8">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold/40 shadow-[0_0_20px_rgba(201,168,76,0.15)] flex-shrink-0">
                    <Image 
                      src="/founder.jpeg" 
                      alt="Mehedi Hasan - Founder & Software Architect" 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-cream">Mehedi Hasan</h3>
                    <p className="text-xs uppercase font-ui tracking-widest text-gold font-semibold mt-0.5">
                      Founder & Software Architect
                    </p>
                    <span className="text-[11px] font-ui text-dim">Kolkata, India</span>
                  </div>
                </div>

                <p className="font-ui text-sm md:text-base text-muted font-light leading-relaxed space-y-4">
                  &ldquo;I lead technical architecture and code review on every project. When you partner with Stova Media, you work directly with experienced software engineers who care about your unit economics as much as your codebase.&rdquo;
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-border/60 flex items-center justify-between text-xs font-ui text-dim">
                <span className="flex items-center gap-1.5 text-gold font-medium">
                  <Award size={15} /> 100% Delivery Track Record
                </span>
                <span>Direct Founder Access</span>
              </div>
            </SpotlightCard>
          </div>

          {/* Core Philosophy & Impact Stats (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Stats Sub-Grid */}
            <div 
              ref={statsRef}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {stats.map((stat, i) => (
                <SpotlightCard key={i} className="p-6 border-border/80 bg-card/30 backdrop-blur-sm text-center">
                  <div className="flex justify-center items-baseline">
                    <span 
                      className="stat-number font-display text-3xl sm:text-4xl text-cream font-medium" 
                      data-target={stat.value}
                    >
                      0
                    </span>
                    <span className="text-gold font-display text-2xl ml-0.5">{stat.suffix}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-ui text-dim font-medium mt-1 block">
                    {stat.label}
                  </span>
                </SpotlightCard>
              ))}
            </div>

            {/* Manifesto Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
              {manifestoPoints.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <SpotlightCard key={idx} className="p-6 border-border/80 bg-card/20 backdrop-blur-sm flex flex-col justify-between">
                    <div>
                      <div className="p-2.5 w-fit border border-border bg-ink mb-4 text-gold">
                        <Icon size={18} />
                      </div>
                      <h4 className="font-display text-lg text-cream mb-2">
                        {item.title}
                      </h4>
                      <p className="font-ui text-xs text-muted font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
