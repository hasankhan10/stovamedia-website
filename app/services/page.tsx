"use client";

import React from "react";
import { SplitHeadline, SectionLabel, Tag, RevealOnScroll } from "@/components/ui";
import CTASection from "@/components/sections/CTASection";
import { cn } from "@/lib/utils";

const serviceCategories = [
  { id: "saas", name: "Healthcare SaaS" },
  { id: "web", name: "Web Applications" },
  { id: "mobile", name: "Mobile & Apps" },
  { id: "white", name: "White-label" },
];

const serviceDetails = [
  {
    id: "saas",
    number: "01",
    title: "Healthcare SaaS",
    desc: "We specialize in building silent, high-performance OPD and queue management systems optimized for Indian clinical environments.",
    deliverables: ["Queue management", "WhatsApp integration", "Patient analytics", "2G performance optimization"],
    tech: ["Next.js", "Prisma", "PostgreSQL", "Twilio"],
    featured: "Mr Compounder",
  },
  {
    id: "web",
    number: "02",
    title: "Web Applications",
    desc: "From complex enterprise dashboards to high-fidelity 3D visualization platforms, we build web apps that are as beautiful as they are functional.",
    deliverables: ["Enterprise Dashboards", "3D Visualization (Three.js)", "Real-time sync", "Multi-tier access"],
    tech: ["React Three Fiber", "Zustand", "Tailwind v4", "Node.js"],
    featured: "HairViz",
  },
  {
    id: "mobile",
    number: "03",
    title: "Mobile & Cross-Platform",
    desc: "Built for Bharat. We develop lightweight, high-performance mobile applications using React Native that perform reliably even on slower networks.",
    deliverables: ["React Native development", "Offline-first sync", "Secure logging", "Corporate compliance"],
    tech: ["React Native", "Firebase", "Android SDK", "Kotlin"],
    featured: "Call Recorder",
  },
  {
    id: "white",
    number: "04",
    title: "White-label Products",
    desc: "Scaling your clinic or agency? We build fully brandable, ready-to-deploy platforms that give you a custom product in half the time.",
    deliverables: ["Multi-tenant architecture", "Dynamic branding", "SaaS infrastructure", "License management"],
    tech: ["Supabase", "Vercel", "Stripe", "Next.js"],
    featured: "AI Hair Sim",
  },
];

export default function ServicesPage() {
  return (
    <main className="pt-32 min-h-screen bg-ink">
      <div className="px-6 md:px-10 lg:px-20 mb-32">
        <SectionLabel>Our Specialization</SectionLabel>
        <SplitHeadline tag="h1" className="text-5xl md:text-7xl lg:text-8xl leading-none">
          Software that matters, built with craft.
        </SplitHeadline>
      </div>

      <div className="px-6 md:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-20">
        
        {/* Left: Sticky Nav */}
        <aside className="hidden lg:block">
          <div className="sticky top-32 flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-dim mb-4">Capabilities</span>
            {serviceCategories.map((cat) => (
              <a 
                key={cat.id} 
                href={`#${cat.id}`}
                className="group flex items-center gap-4 text-sm font-ui text-muted hover:text-gold transition-all duration-500"
              >
                <span className="w-0 h-[1.5px] bg-gold group-hover:w-8 transition-all duration-500" />
                {cat.name}
              </a>
            ))}
          </div>
        </aside>

        {/* Right: Detailed Content */}
        <div className="flex flex-col gap-40 pb-40">
          {serviceDetails.map((service) => (
            <RevealOnScroll key={service.id}>
              <div id={service.id} className="relative group">
                {/* Background Large Number */}
                <span className="absolute -top-24 -left-10 font-display text-[160px] md:text-[220px] text-gold opacity-[0.06] select-none pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-700">
                  {service.number}
                </span>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16">
                  {/* Service Core */}
                  <div>
                    <h2 className="font-display text-4xl md:text-5xl mb-8 text-cream transition-colors duration-500 group-hover:text-gold">
                      {service.title}
                    </h2>
                    <p className="font-ui text-lg text-muted leading-relaxed mb-10">
                      {service.desc}
                    </p>
                    <div className="flex flex-col gap-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-dim">Key Deliverables</span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.deliverables.map((d) => (
                          <li key={d} className="text-sm text-cream/80 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-gold" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tech Card */}
                  <div className="flex flex-col gap-6">
                    <div className="p-8 border border-border bg-card/40 rounded-sm">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-dim block mb-6">Tech Stack</span>
                      <div className="flex flex-wrap gap-2">
                        {service.tech.map((t) => (
                          <Tag key={t} className="bg-gold-glow border-gold/20 text-gold">{t}</Tag>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-8 border border-border bg-card/40 rounded-sm flex justify-between items-center group/proj hover:border-gold/30 transition-all duration-500">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest font-bold text-dim block mb-2">Featured Project</span>
                        <span className="font-display text-xl text-cream group-hover/proj:text-gold transition-colors">{service.featured}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted group-hover/proj:border-gold group-hover/proj:text-gold transition-all duration-500">
                        ↗
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

      </div>

      {/* Pricing Philosophy */}
      <section className="py-24 bg-ink-2 border-y border-border px-6 md:px-20 text-center">
        <RevealOnScroll>
          <SectionLabel className="justify-center">Pricing Philosophy</SectionLabel>
          <p className="text-2xl md:text-4xl font-display italic text-cream max-w-3xl mx-auto leading-relaxed mt-10">
            We don&apos;t charge per hour. We charge for <span className="text-gold">outcomes</span>. 
            Fixed quotes for defined scopes. Zero hidden costs.
          </p>
        </RevealOnScroll>
      </section>

      <CTASection />
    </main>
  );
}
