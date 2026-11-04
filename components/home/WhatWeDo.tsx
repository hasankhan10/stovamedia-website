"use client";

import React, { useState } from "react";
import { Globe, Server, Bot, ArrowRight, Check } from "lucide-react";
import { AppointmentModal, MagneticElement } from "@/components/ui";
import TiltCard from "@/components/animations/TiltCard";

const pillars = [
  {
    id: "websites",
    title: "Small business and local growth websites",
    tagline: "Sub-second load times engineered to rank higher on Google search and eliminate bounce rate drop-off.",
    badge: "Sub-second speed",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: Globe,
    features: [
      "Custom Next.js architecture with zero WordPress bloat",
      "Google Maps and localized search authority engineering",
      "Mobile-first checkout and streamlined consultation flows",
      "100/100 Google Core Web Vitals guarantee",
    ],
  },
  {
    id: "software",
    title: "Custom web applications and enterprise software",
    tagline: "Tailored full-stack platforms, operational dashboards, and SaaS products built with zero technical debt.",
    badge: "Enterprise scale",
    badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    icon: Server,
    features: [
      "Bespoke SaaS platforms, patient portals, and internal CRM tools",
      "Enterprise PostgreSQL, edge caching, and REST/GraphQL APIs",
      "Bank-grade authentication and AES-256 data protection",
      "100% source code Git repository ownership with zero lock-in",
    ],
  },
  {
    id: "ai-workflows",
    title: "Autonomous AI and automation workflows",
    tagline: "Custom AI agents that qualify incoming leads, answer customer questions, and automate operations 24/7.",
    badge: "24/7 autopilot",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    icon: Bot,
    features: [
      "24/7 intelligent AI booking assistants for web and WhatsApp",
      "Automated lead capture, qualification, and instant CRM sync",
      "Custom RAG systems trained on private business knowledge bases",
      "Autonomous scheduling and automated multi-step notification pipelines",
    ],
  },
];

export default function WhatWeDo() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section id="what-we-do" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#07080C] text-white relative overflow-hidden border-b border-white/[0.08]">
      {/* Premium Background Blur Color Effect (Luminous Ambient Indigo & Violet Orbs) */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-violet-600/15 via-indigo-600/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-bl from-blue-600/15 via-violet-600/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-violet-300 text-xs font-medium mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <span>Core engineering disciplines</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.05] mb-4">
            Architected for Speed, Conversion, and Scale
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            We eliminate agency bloat and deliver precision software across three core disciplines. Direct technical access with zero middlemen.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div key={pillar.id} className="h-full">
                <TiltCard maxTilt={4} className="h-full">
                  <div className="group h-full bg-gradient-to-b from-white/[0.04] to-white/[0.01] rounded-2xl p-6 sm:p-8 border border-white/[0.08] hover:border-violet-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.36)] hover:shadow-[0_12px_44px_rgba(139,92,246,0.15)]">
                    <div>
                      {/* Top Pill & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-violet-300">
                          <IconComponent size={20} />
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-lg text-xs font-mono border ${pillar.badgeColor}`}>
                          {pillar.badge}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-xl sm:text-2xl font-medium text-slate-100 mb-3 tracking-tight group-hover:text-violet-200 transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                        {pillar.tagline}
                      </p>

                      {/* Feature Checkpoints */}
                      <ul className="space-y-2.5 mb-8">
                        {pillar.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-2.5 text-xs text-slate-300 leading-normal">
                            <span className="mt-0.5 rounded-md p-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                              <Check size={11} strokeWidth={3} />
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card CTA Trigger */}
                    <MagneticElement strength={0.2} className="w-full">
                      <button
                        onClick={() => setSelectedService(pillar.title)}
                        className="w-full py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 text-slate-200 hover:text-white border border-white/10 hover:border-violet-500/50 font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-400"
                      >
                        <span>Inquire about this architecture</span>
                        <ArrowRight size={14} />
                      </button>
                    </MagneticElement>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        defaultService={selectedService || undefined}
      />
    </section>
  );
}
