"use client";

import React from "react";
import { 
  SectionLabel, 
  SplitHeadline, 
  RevealOnScroll 
} from "@/components/ui";
import { 
  Activity, 
  Monitor, 
  Smartphone, 
  Layers, 
  ArrowRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    number: "01",
    name: "Healthcare SaaS",
    icon: Activity,
    desc: "Clinic management, queue systems — built for Indian realities.",
  },
  {
    number: "02",
    name: "Web Applications",
    icon: Monitor,
    desc: "Full-stack platforms. From MVP to production — we see it through.",
  },
  {
    number: "03",
    name: "Mobile & Cross-Platform",
    icon: Smartphone,
    desc: "React Native for low-bandwidth — built for Bharat.",
  },
  {
    number: "04",
    name: "White-label Products",
    icon: Layers,
    desc: "Ready-to-deploy, fully branded. Done faster.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-36 px-6 md:px-10 lg:px-20 bg-ink">
      {/* HEADER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-24">
        <div>
          <SectionLabel>Our Expertise</SectionLabel>
          <SplitHeadline tag="h2" className="text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Software with craft & intention.
          </SplitHeadline>
          <div className="mt-2 text-4xl md:text-5xl lg:text-6xl font-display italic text-gold">
            craft
          </div>
        </div>
        
        <p className="font-ui text-base md:text-lg text-muted max-w-[500px] leading-relaxed">
          We don&apos;t do generic. Each product is architected for scale, performance, 
          and the specific constraints of the Indian ecosystem.
        </p>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border border border-border">
        {services.map((service, i) => (
          <RevealOnScroll key={i} delay={i * 0.1}>
            <div className="group relative bg-ink p-10 md:p-12 h-full flex flex-col transition-all duration-700 hover:bg-card">
              {/* Gold Glow hover effect */}
              <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-gold/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              
              {/* Header: Number + Icon */}
              <div className="relative z-10 flex justify-between items-start mb-12">
                <span className="font-display text-sm text-gold tracking-widest">{service.number}</span>
                <service.icon 
                  size={44} 
                  strokeWidth={1} 
                  className="text-muted/40 transition-all duration-700 group-hover:text-gold group-hover:scale-110" 
                />
              </div>

              {/* Content */}
              <div className="relative z-10 mt-auto">
                <h3 className="font-display text-2xl mb-4 group-hover:text-gold transition-colors duration-500">
                  {service.name}
                </h3>
                <p className="font-ui text-xs md:text-sm text-dim leading-relaxed mb-8 group-hover:text-muted transition-colors duration-500">
                  {service.desc}
                </p>

                {/* Arrow Accent */}
                <div className="flex items-center gap-2 text-gold opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                  <span className="text-[10px] items-center uppercase tracking-[0.2em] font-bold">Discover</span>
                  <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
                </div>
              </div>

              {/* Bottom line accent */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gold origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" />
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
