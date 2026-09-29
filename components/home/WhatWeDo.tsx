"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Server, Bot, ArrowRight, Check, Layers } from "lucide-react";
import { AppointmentModal, MagneticElement } from "@/components/ui";
import TiltCard from "@/components/animations/TiltCard";
import SpeedDialGraphic from "@/components/animations/SpeedDialGraphic";
import NodeNetworkGraphic from "@/components/animations/NodeNetworkGraphic";
import AICoreGraphic from "@/components/animations/AICoreGraphic";

const pillars = [
  {
    id: "websites",
    title: "Small Business & Local Growth Websites",
    tagline: "Sub-second load times engineered to rank #1 on Google and turn visitors into paying customers.",
    badge: "High Performance",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: Globe,
    accent: "from-emerald-500 to-teal-600",
    features: [
      "Custom Next.js & React architecture (zero slow WordPress templates)",
      "Google Maps & Local SEO dominance setup included",
      "Mobile-first checkout & instant WhatsApp click-to-chat triggers",
      "100/100 Google Core Web Vitals benchmark guarantee",
    ],
    graphic: <SpeedDialGraphic />,
  },
  {
    id: "software",
    title: "Custom Web Apps & Enterprise Software",
    tagline: "Tailored full-stack platforms, internal operational tools, and SaaS products built with zero technical debt.",
    badge: "Enterprise Scale",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    icon: Server,
    accent: "from-indigo-600 to-cyan-600",
    features: [
      "Bespoke SaaS platforms, patient portals & business management systems",
      "Enterprise PostgreSQL, Supabase & REST/GraphQL API integration",
      "Bank-grade role-based authentication (RBAC) & data encryption",
      "100% source code ownership with zero vendor lock-in",
    ],
    graphic: <NodeNetworkGraphic />,
  },
  {
    id: "ai-workflows",
    title: "Autonomous AI & Automation Workflows",
    tagline: "Custom AI agents that qualify leads, handle customer inquiries, and automate repetitive backend operations 24/7.",
    badge: "24/7 Autopilot",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    icon: Bot,
    accent: "from-cyan-500 to-indigo-600",
    features: [
      "24/7 Intelligent AI chatbots for WhatsApp, Website & Instagram",
      "Automated lead capture, CRM syncing & instant email follow-ups",
      "Custom RAG systems trained strictly on your private business data",
      "Autonomous scheduling & multi-step workflow automation",
    ],
    graphic: <AICoreGraphic />,
  },
];

export default function WhatWeDo() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section id="what-we-do" className="py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-12 lg:px-20 bg-slate-50 relative overflow-hidden">
      {/* Background Soft Ambient Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-indigo-100/40 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs"
          >
            <Layers size={14} className="text-indigo-600" />
            <span>Our Core Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-slate-900 tracking-tight leading-tight mb-6"
          >
            What We Do
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed"
          >
            We eliminate agency bloat and deliver precision engineering across three core disciplines. No middlemen, no outdated templates.
          </motion.p>
        </div>

        {/* 3 Pillars Grid with 3D Tilt & Motion Graphics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="h-full"
              >
                <TiltCard maxTilt={6} className="h-full">
                  <div className="group h-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(79,70,229,0.08)] hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between">
                    {/* Top Content */}
                    <div>
                      {/* Top Pill & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`p-3.5 rounded-2xl bg-gradient-to-tr ${pillar.accent} text-white shadow-md`}>
                          <IconComponent size={24} />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${pillar.badgeColor}`}>
                          {pillar.badge}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                        {pillar.tagline}
                      </p>

                      {/* Dynamic SVG Motion Graphic Widget */}
                      <div className="mb-6">
                        {pillar.graphic}
                      </div>

                      {/* Feature Checkpoints */}
                      <ul className="space-y-3 mb-8">
                        {pillar.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 leading-normal">
                            <span className="mt-0.5 rounded-full p-0.5 bg-emerald-100 text-emerald-700 shrink-0">
                              <Check size={12} strokeWidth={3} />
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card CTA Trigger */}
                    <MagneticElement strength={0.25} className="w-full">
                      <button
                        onClick={() => setSelectedService(pillar.title)}
                        className="w-full py-3.5 px-4 rounded-xl bg-slate-50 hover:bg-indigo-600 text-slate-700 hover:text-white font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-2xs"
                      >
                        <span>Inquire for {pillar.id === "websites" ? "Websites" : pillar.id === "software" ? "Software" : "AI"}</span>
                        <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </MagneticElement>
                  </div>
                </TiltCard>
              </motion.div>
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
