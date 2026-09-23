"use client";

import React, { useState } from "react";
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

interface ServicesProps {
  initialServices?: ServiceItem[];
}

export default function Services({ initialServices }: ServicesProps) {
  const serviceList = initialServices && initialServices.length > 0 ? initialServices : defaultServices;
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <section id="services" className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-transparent relative z-10">
      {/* Background radial highlight */}
      <div 
        className="pointer-events-none absolute top-1/2 right-10 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 z-0"
        style={{
          background: "radial-gradient(circle, rgba(201, 168, 76, 0.4) 0%, transparent 70%)"
        }}
      />

      {/* SECTION HEADER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-20 max-w-[1400px] mx-auto">
        <div>
          <SectionLabel>Core Capabilities</SectionLabel>
          <SplitHeadline tag="h2" className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.08] tracking-tight">
            High-Impact Engineering. Built To Dominate.
          </SplitHeadline>
        </div>
        
        <div className="flex flex-col lg:items-start space-y-4">
          <p className="font-ui text-base md:text-lg text-muted max-w-[540px] leading-relaxed font-light">
            We bypass generic templates to architect custom, production-hardened software systems and autonomous AI solutions engineered for extreme performance and scale.
          </p>
          <div className="flex items-center gap-6 pt-2">
            <span className="font-ui text-xs tracking-wider uppercase text-gold font-medium">✦ 100% Bespoke Code</span>
            <span className="font-ui text-xs tracking-wider uppercase text-dim">✦ Zero Tech Debt SLA</span>
          </div>
        </div>
      </div>

      {/* SERVICES BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1400px] mx-auto">
        {serviceList.map((service, i) => {
          const IconComp = ICON_MAP[service.icon] || Code2;

          return (
            <RevealOnScroll key={service.id || i} delay={i * 0.1}>
              <Link href={`/services#${service.id}`} className="group block h-full">
                <SpotlightCard className="h-full p-8 md:p-12 flex flex-col justify-between border-border/80 hover:border-gold/50 transition-all duration-700 bg-card/40 backdrop-blur-sm">
                  {/* Top: Index + Icon Badge */}
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-sm tracking-widest text-gold font-medium">
                          [{service.number}]
                        </span>
                        {service.highlights && service.highlights[0] && (
                          <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold font-ui bg-gold-glow text-gold border border-gold/20">
                            {service.highlights[0].label}
                          </span>
                        )}
                      </div>

                      <div className="p-3 rounded-none border border-border/80 bg-ink-2 group-hover:border-gold/40 group-hover:bg-gold/10 transition-all duration-500">
                        <IconComp 
                          size={28} 
                          strokeWidth={1.5} 
                          className="text-muted group-hover:text-gold transition-colors duration-500" 
                        />
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-cream mb-4 group-hover:text-gold transition-colors duration-500 flex items-center justify-between">
                      <span>{service.title}</span>
                      <ArrowUpRight 
                        size={20} 
                        className="text-dim opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-gold transition-all duration-500" 
                      />
                    </h3>

                    <p className="font-ui text-sm md:text-base text-muted font-light leading-relaxed mb-8">
                      {service.tagline || service.desc}
                    </p>

                    {/* Key Deliverables Bullet Pills */}
                    {service.deliverables && service.deliverables.length > 0 && (
                      <div className="space-y-2 mb-8 pt-4 border-t border-border/50">
                        {service.deliverables.slice(0, 3).map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2.5 text-xs font-ui text-dim group-hover:text-cream/80 transition-colors duration-300">
                            <CheckCircle2 size={13} className="text-gold flex-shrink-0" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom: Tech Stack Chips */}
                  {service.tech && service.tech.length > 0 && (
                    <div className="pt-6 border-t border-border/40 flex flex-wrap items-center gap-2">
                      {service.tech.slice(0, 4).map((techName, tIdx) => (
                        <span 
                          key={tIdx}
                          className="text-[10px] font-ui uppercase tracking-wider px-2 py-1 bg-ink border border-border/80 text-dim group-hover:border-gold/30 group-hover:text-muted transition-colors duration-300"
                        >
                          {techName}
                        </span>
                      ))}
                      {service.tech.length > 4 && (
                        <span className="text-[10px] font-ui text-dim/60">
                          +{service.tech.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Bottom glowing laser line on hover */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" />
                </SpotlightCard>
              </Link>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
