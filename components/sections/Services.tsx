"use client";

import React from "react";
import Link from "next/link";
import { 
  SectionLabel, 
  SplitHeadline, 
  RevealOnScroll,
  SpotlightCard
} from "@/components/ui";
import { 
  Code2, 
  Bot, 
  ArrowUpRight,
  Store,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Globe,
  Smartphone,
  Sparkles,
  Layers,
  CheckCircle2
} from "lucide-react";
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

interface ServicesProps {
  initialServices?: ServiceItem[];
}

export default function Services({ initialServices }: ServicesProps) {
  const serviceList = initialServices && initialServices.length > 0 ? initialServices : defaultServices;

  return (
    <section id="services" className="py-20 sm:py-28 md:py-36 px-5 sm:px-8 md:px-12 lg:px-20 bg-transparent relative z-10">
      {/* Background highlight */}
      <div 
        className="pointer-events-none absolute top-1/2 right-10 w-[550px] h-[550px] rounded-full blur-[150px] opacity-15 z-0"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)"
        }}
      />

      {/* SECTION HEADER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end mb-16 sm:mb-20 max-w-[1400px] mx-auto">
        <div>
          <SectionLabel>Core Capabilities</SectionLabel>
          <SplitHeadline tag="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-[1.08] tracking-tight text-[#F8FAFC]">
            High-Impact Engineering. Built To Dominate.
          </SplitHeadline>
        </div>
        
        <div className="flex flex-col lg:items-start space-y-4">
          <p className="font-ui text-base sm:text-lg text-slate-300 max-w-[540px] leading-relaxed font-light">
            We bypass generic templates to architect custom, production-hardened software systems and autonomous AI solutions engineered for extreme performance and scale.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
            <span className="font-ui text-xs tracking-wider uppercase text-cyan-400 font-semibold flex items-center gap-1.5">
              <Sparkles size={14} /> 100% Bespoke Code
            </span>
            <span className="font-ui text-xs tracking-wider uppercase text-indigo-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck size={14} /> Zero Tech Debt SLA
            </span>
          </div>
        </div>
      </div>

      {/* SERVICES BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1400px] mx-auto">
        {serviceList.map((service, i) => {
          const IconComp = ICON_MAP[service.icon] || Code2;
          const spotlightColor = SPOTLIGHT_COLORS[i % SPOTLIGHT_COLORS.length];

          return (
            <RevealOnScroll key={service.id || i} delay={i * 0.1}>
              <Link href={`/services#${service.id}`} className="group block h-full">
                <SpotlightCard 
                  spotlightColor={spotlightColor}
                  className="h-full p-7 sm:p-9 md:p-11 flex flex-col justify-between border-slate-800 bg-[#0B0F19]/80 backdrop-blur-sm group-hover:border-indigo-500/50 transition-all duration-500 relative overflow-hidden shadow-xl"
                >
                  {/* Top: Index + Icon Badge */}
                  <div>
                    <div className="flex justify-between items-start mb-6 sm:mb-8">
                      <div className="flex items-center gap-2.5">
                        <span className="font-display text-sm tracking-widest text-cyan-400 font-bold">
                          [{service.number}]
                        </span>
                        {service.highlights && service.highlights[0] && (
                          <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold font-ui bg-indigo-950/70 text-indigo-300 border border-indigo-500/30">
                            {service.highlights[0].label}
                          </span>
                        )}
                      </div>

                      <div className="p-3 border border-slate-800 bg-[#05070D] group-hover:border-cyan-500/40 group-hover:bg-cyan-950/30 transition-all duration-300">
                        <IconComp 
                          size={26} 
                          strokeWidth={1.5} 
                          className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" 
                        />
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="font-display text-2xl sm:text-3xl text-[#F8FAFC] mb-3.5 group-hover:text-cyan-400 transition-colors duration-300 flex items-center justify-between font-bold">
                      <span>{service.title}</span>
                      <ArrowUpRight 
                        size={20} 
                        className="text-slate-500 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-cyan-400 transition-all duration-300" 
                      />
                    </h3>

                    <p className="font-ui text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-6">
                      {service.tagline || service.desc}
                    </p>

                    {/* Key Deliverables Bullet Pills */}
                    {service.deliverables && service.deliverables.length > 0 && (
                      <div className="space-y-2 mb-6 pt-4 border-t border-slate-800/80">
                        {service.deliverables.slice(0, 3).map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2.5 text-xs sm:text-sm font-ui text-slate-400 group-hover:text-slate-200 transition-colors duration-300">
                            <CheckCircle2 size={14} className="text-cyan-400 flex-shrink-0" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Tech Stack Chips */}
                  {service.tech && service.tech.length > 0 && (
                    <div className="pt-5 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                      {service.tech.slice(0, 4).map((techName, tIdx) => (
                        <span 
                          key={tIdx}
                          className="text-[10px] font-ui uppercase tracking-wider px-2.5 py-1 bg-[#05070D] border border-slate-800 text-slate-400 group-hover:border-indigo-500/40 group-hover:text-slate-200 transition-colors duration-300"
                        >
                          {techName}
                        </span>
                      ))}
                      {service.tech.length > 4 && (
                        <span className="text-[10px] font-ui text-slate-500">
                          +{service.tech.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Laser line on hover */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                </SpotlightCard>
              </Link>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
