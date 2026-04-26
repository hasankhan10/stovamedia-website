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
  ShoppingCart
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    number: "01",
    name: "Custom Software",
    icon: Code2,
    desc: "Full-stack web apps, mobile platforms, healthcare SaaS, and white-label products — architected from scratch for your business.",
  },
  {
    number: "02",
    name: "AI Agent",
    icon: Bot,
    desc: "Intelligent automation, conversational AI, and data pipelines that work 24/7 — built for production, not demos.",
  },
  {
    number: "03",
    name: "Local Business Growth",
    icon: Store,
    desc: "Google Business Profile optimization paired with a high-converting premium landing page — designed to dominate your local market.",
  },
  {
    number: "04",
    name: "Premium Ecommerce",
    icon: ShoppingCart,
    desc: "Fully custom-coded digital storefronts with secure payments and brand-aligned design systems — making you visible to everyone.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-36 px-6 md:px-10 lg:px-20 bg-transparent">
      {/* HEADER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-24">
        <div>
          <SectionLabel>Our Expertise</SectionLabel>
          <SplitHeadline tag="h2" className="text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Four things. Done right.
          </SplitHeadline>
        </div>
        
        <p className="font-ui text-base md:text-lg text-muted max-w-[500px] leading-relaxed">
          We don&apos;t spread thin across dozens of services. We master four core 
          capabilities and deliver them at an exceptional level.
        </p>
      </div>

      {/* SERVICES GRID — 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-border border border-border">
        {services.map((service, i) => (
          <RevealOnScroll key={i} delay={i * 0.15}>
            <Link href="/services" className="block">
              <div className="group relative bg-ink p-12 md:p-16 h-full flex flex-col transition-all duration-700 hover:bg-card min-h-[400px]">
                {/* Gold Glow hover effect */}
                <div className="absolute inset-x-0 top-0 h-[120px] bg-gradient-to-b from-gold/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                
                {/* Header: Number + Icon */}
                <div className="relative z-10 flex justify-between items-start mb-16">
                  <span className="font-display text-sm text-gold tracking-widest">{service.number}</span>
                  <service.icon 
                    size={52} 
                    strokeWidth={1} 
                    className="text-muted/30 transition-all duration-700 group-hover:text-gold group-hover:scale-110" 
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 mt-auto">
                  <h3 className="font-display text-3xl md:text-4xl mb-6 group-hover:text-gold transition-colors duration-500">
                    {service.name}
                  </h3>
                  <p className="font-ui text-sm md:text-base text-dim leading-relaxed mb-10 group-hover:text-muted transition-colors duration-500 max-w-md">
                    {service.desc}
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
        ))}
      </div>
    </section>
  );
}
