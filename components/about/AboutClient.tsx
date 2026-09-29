"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Calendar, 
  MessageSquare, 
  ArrowRight, 
  Code2, 
  Users, 
  Award, 
  Linkedin,
  Terminal,
  Server,
  Layers
} from "lucide-react";
import { AppointmentModal, MagneticElement } from "@/components/ui";
import TiltCard from "@/components/animations/TiltCard";
import TerminalMotionGraphic from "@/components/animations/TerminalMotionGraphic";

const stats = [
  { value: "100%", label: "In-House Code", description: "Zero outsourcing or white labeling" },
  { value: "0%", label: "Template Usage", description: "100% bespoke architecture" },
  { value: "< 50ms", label: "Server TTFB", description: "Sub-second edge CDN delivery" },
  { value: "24/7", label: "AI Autopilot", description: "Autonomous lead & workflow sync" },
];

const values = [
  {
    icon: Code2,
    title: "100% Custom Engineering",
    description: "We don't use slow WordPress themes, generic page builders, or cookie-cutter templates. Every line of code is purpose-built for speed, security, and scalability.",
    badge: "Engineering Standard",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    icon: Users,
    title: "Direct Architect Access",
    description: "No middlemen, no non-technical project managers. You work directly with the lead engineers building your software, guaranteeing razor-sharp communication.",
    badge: "Frictionless Collaboration",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    icon: ShieldCheck,
    title: "Total IP & Code Ownership",
    description: "You own 100% of the intellectual property, git repository, and cloud infrastructure from day one. Zero vendor lock-in or proprietary traps.",
    badge: "Complete Control",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  {
    icon: Zap,
    title: "Performance & Conversion First",
    description: "Every interaction, animation, and database query is engineered to maximize conversion rates and earn top-tier Google search rankings.",
    badge: "Revenue Driven",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
];

const techStack = [
  { name: "Next.js 15", category: "Full-Stack Framework" },
  { name: "TypeScript", category: "Type Safety & Security" },
  { name: "React 19", category: "Modern UI Layer" },
  { name: "PostgreSQL", category: "Relational Database" },
  { name: "Supabase", category: "Real-Time Cloud Backend" },
  { name: "Tailwind CSS", category: "Design System Tokens" },
  { name: "Framer Motion", category: "60FPS GPU Motion" },
  { name: "Python & LangChain", category: "AI Pipelines & RAG" },
];

export default function AboutClient() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full bg-white relative">
      {/* 1. Hero Header */}
      <section className="relative pt-28 sm:pt-36 pb-10 sm:pb-14 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden bg-white">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-indigo-100/70 via-cyan-100/40 to-blue-50/30 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-[1200px] mx-auto text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-semibold mb-4 sm:mb-5 shadow-xs">
            <Layers size={14} className="text-indigo-600" />
            <span>About Stova Media Studio</span>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.08] max-w-4xl mx-auto mb-4 sm:mb-5">
            Engineered by Architects.{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 bg-clip-text text-transparent">
              Built for Revenue.
            </span>
          </h1>

          {/* Clean narrative */}
          <p className="text-slate-600 text-base sm:text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6">
            Stova Media is a boutique custom software engineering studio and AI lab based in Kolkata, India. We replace agency bureaucracy with senior technical craftsmanship to deliver high-speed web apps, custom software platforms, and autonomous AI automation.
          </p>

          {/* Animated Kolkata AI Studio Terminal Motion Graphic */}
          <TerminalMotionGraphic />

          {/* Key Stat Badges */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 max-w-5xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left hover:border-indigo-300 transition-colors shadow-2xs"
              >
                <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-0.5">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-indigo-700 mb-0.5 font-ui">
                  {stat.label}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 leading-normal">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Core Engineering Standards (Manifesto) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-10 lg:px-16 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-xs">
              <Award size={13} className="text-indigo-600" />
              <span>Our Code of Engineering</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight mb-2 sm:mb-3">
              How We Build Differently
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
              We operate under four foundational principles that protect your investment and guarantee world-class software.
            </p>
          </div>

          {/* 4 Core Value Cards with 3D Tilt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <TiltCard key={item.title} maxTilt={4} className="h-full">
                  <div className="h-full bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-2xs">
                          <Icon size={19} />
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 mb-2 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Founder & Leadership Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <TiltCard maxTilt={3}>
            <div className="bg-gradient-to-b from-white to-slate-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-[0_10px_35px_rgba(15,23,42,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
              {/* Founder Image */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-indigo-200/80 shadow-xs mb-3 bg-slate-100">
                  <Image
                    src="/founder.jpeg"
                    alt="Mehedi Hasan"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900">Mehedi Hasan</h3>
                <span className="text-[11px] sm:text-xs font-semibold text-indigo-600 uppercase tracking-wider font-ui mt-0.5">
                  Founder &amp; Lead Software Architect
                </span>
                <a
                  href="https://www.linkedin.com/in/mehedi-hasan110/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 text-xs font-semibold transition-colors"
                >
                  <Linkedin size={12} className="text-indigo-600" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>

              {/* Founder Manifesto */}
              <div className="lg:col-span-8 flex flex-col justify-center">
                <div className="inline-flex items-center gap-1.5 text-indigo-600 text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-2">
                  <Terminal size={14} />
                  <span>Founder Note</span>
                </div>
                <blockquote className="text-base sm:text-lg md:text-xl font-display text-slate-800 leading-snug italic mb-4">
                  &ldquo;Software shouldn&apos;t be an unpredictable black box. When you build with Stova Media, you get clean, maintainable architecture built by people who genuinely care about your business growth.&rdquo;
                </blockquote>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Based in Kolkata, Mehedi Hasan leads the technical architecture across custom Next.js applications, healthcare SaaS systems, and autonomous AI agents for clients locally and internationally across the USA, UK, and UAE.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono text-slate-600 pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                    <span>Next.js Expert</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                    <span>Database Architect</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                    <span>AI Workflow Engineer</span>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* 4. Technology Stack */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-10 lg:px-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-[1100px] mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-xs">
            <Server size={13} className="text-indigo-600" />
            <span>Modern Stack</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight mb-6">
            The Battle-Tested Technologies We Build With
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="p-3.5 rounded-xl bg-white border border-slate-200/80 text-left hover:border-indigo-300 transition-colors shadow-2xs"
              >
                <div className="font-bold text-xs sm:text-sm text-slate-900">{tech.name}</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 font-mono mt-0.5">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom Call to Action */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-10 lg:px-16 bg-white relative overflow-hidden">
        <div className="max-w-[950px] mx-auto text-center">
          <div className="bg-gradient-to-b from-white to-slate-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-[0_15px_40px_rgba(15,23,42,0.05)] flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight mb-3">
              Have an Idea or Existing System to Upgrade?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-lg mb-6 leading-relaxed">
              Book a direct consultation with our lead architect and get an honest, actionable technical proposal within 4 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <MagneticElement strength={0.3}>
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-7 sm:px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                >
                  <Calendar size={15} />
                  <span>Book Free Consultation</span>
                  <ArrowRight size={15} />
                </button>
              </MagneticElement>

              <MagneticElement strength={0.3}>
                <a
                  href="https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20would%20like%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-7 py-3.5 rounded-full bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-700 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare size={15} />
                  <span>WhatsApp Direct</span>
                </a>
              </MagneticElement>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Modal */}
      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
