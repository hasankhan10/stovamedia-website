"use client";

import React from "react";
import Link from "next/link";
import { 
  SectionLabel, 
  SplitHeadline, 
  RevealOnScroll 
} from "@/components/ui";
import { 
  Code2, 
  Bot, 
  ArrowRight,
  Store,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Globe,
  Smartphone,
  Sparkles,
  Layers
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

  return (
    <section id="services" className="py-24 md:py-36 px-6 md:px-10 lg:px-20 bg-transparent">
      {/* HEADER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-24">
        <div>
          <SectionLabel>Our Expertise</SectionLabel>
          <SplitHeadline tag="h2" className="text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Custom solutions. Built to scale.
          </SplitHeadline>
        </div>
        
        <p className="font-ui text-base md:text-lg text-muted max-w-[500px] leading-relaxed">
          We build high-fidelity custom software tailored precisely to your business requirements. From SaaS to advanced AI agents, we deliver premium engineering.
        </p>
      </div>

      {/* SERVICES GRID — 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-border border border-border">
        {serviceList.map((service, i) => {
          const IconComp = ICON_MAP[service.icon] || Code2;

          return (
            <RevealOnScroll key={service.id || i} delay={i * 0.15}>
              <Link href={`/services#${service.id}`} className="block">
                <div className="group relative bg-ink p-12 md:p-16 h-full flex flex-col transition-all duration-700 hover:bg-card min-h-[400px]">
                  {/* Gold Glow hover effect */}
                  <div className="absolute inset-x-0 top-0 h-[120px] bg-gradient-to-b from-gold/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  
                  {/* Header: Number + Icon */}
                  <div className="relative z-10 flex justify-between items-start mb-16">
                    <span className="font-display text-sm text-gold tracking-widest">{service.number}</span>
                    <IconComp 
                      size={52} 
                      strokeWidth={1} 
                      className="text-muted/30 transition-all duration-700 group-hover:text-gold group-hover:scale-110" 
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mt-auto">
                    <h3 className="font-display text-3xl md:text-4xl mb-6 group-hover:text-gold transition-colors duration-500">
                      {service.title}
                    </h3>
                    <p className="font-ui text-sm md:text-base text-dim leading-relaxed mb-10 group-hover:text-muted transition-colors duration-500 max-w-md">
                      {service.tagline || service.desc}
                    </p>

                    {/* Arrow Accent */}
                    <div className="flex items-center gap-2 text-gold opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Learn More</span>
                      <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Bottom line accent */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gold origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" />
                </div>
              </Link>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
