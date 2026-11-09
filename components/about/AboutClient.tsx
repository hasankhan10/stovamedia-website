"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Code2, 
  Users, 
  Award, 
  Linkedin, 
  Terminal, 
  Server, 
  Layers, 
  HelpCircle,
  MessageSquare 
} from "lucide-react";
import { AppointmentModal, MagneticElement, SpotlightCard, SpecularButton } from "@/components/ui";
import TiltCard from "@/components/animations/TiltCard";
import TerminalMotionGraphic from "@/components/animations/TerminalMotionGraphic";

const stats = [
  { 
    value: "100%", 
    label: "Custom Code", 
    description: "No outsourced or generic templates" 
  },
  { 
    value: "99+", 
    label: "Speed Score", 
    description: "Lightning-fast page loading on Google" 
  },
  { 
    value: "24/7", 
    label: "AI Assistants", 
    description: "Instant replies to customer inquiries" 
  },
  { 
    value: "100%", 
    label: "Your Ownership", 
    description: "You own all files, code, and accounts" 
  },
];

const values = [
  {
    icon: Code2,
    title: "100% Custom Work",
    description: "We don't use slow WordPress themes, bloated page builders, or cookie-cutter templates. Everything is designed and coded specifically for your business.",
    badge: "Handcrafted Code",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    icon: Users,
    title: "Direct Communication",
    description: "No confusing middlemen or pushy account managers. You speak directly with the developers building your project for fast, clear answers.",
    badge: "Zero Middlemen",
    badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Complete Ownership",
    description: "You own 100% of your website, code, design, and domain. No monthly licensing fees and no vendor lock-in ever.",
    badge: "Full Control",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  {
    icon: Zap,
    title: "Built for Real Results",
    description: "Every page, button, and feature is designed to load quickly, rank higher on Google, and turn visitors into paying customers.",
    badge: "Results Driven",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
];

const techStack = [
  { name: "Next.js", category: "Modern Web Framework" },
  { name: "TypeScript", category: "Reliable & Bug-Free Code" },
  { name: "React", category: "Interactive User Interfaces" },
  { name: "PostgreSQL", category: "Fast & Secure Database" },
  { name: "Supabase", category: "Real-Time Cloud Backend" },
  { name: "Tailwind CSS", category: "Clean, Responsive Design" },
  { name: "Framer Motion", category: "Smooth 60FPS Animations" },
  { name: "AI & LLMs", category: "Smart AI Assistants & Chat" },
];

const aboutFaqs = [
  {
    number: "01",
    question: "Why custom code instead of WordPress or Wix?",
    answer: "Pre-made templates often load slowly, break after plugin updates, and are hard to customize. Custom code loads in less than a second, stays secure, and gives your business a unique edge.",
  },
  {
    number: "02",
    question: "Who will actually work on my project?",
    answer: "You work directly with our founder Mehedi Hasan and our experienced developers in Kolkata. No interns, no junior outsourcers, and no confusing middlemen.",
  },
  {
    number: "03",
    question: "Where are your clients located?",
    answer: "We work with business owners and startups across Kolkata and India, as well as international clients in the USA, UK, and UAE.",
  },
  {
    number: "04",
    question: "Do I own my website and code?",
    answer: "Yes, absolutely. Once completed, 100% of the website, code, images, and accounts belong entirely to you with zero monthly platform royalties.",
  },
];

export default function AboutClient() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full bg-[#07080C] text-white relative">
      {/* 1. Hero Header */}
      <section className="relative pt-28 sm:pt-36 md:pt-44 pb-14 sm:pb-20 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden border-b border-white/[0.08]">
        {/* 🌌 Celestial Radiant Dome Glow Effect */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[1200px] h-[480px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(139, 92, 246, 0.35) 0%, rgba(79, 70, 229, 0.2) 45%, transparent 75%)',
            filter: 'blur(50px)'
          }}
        />

        {/* 🔮 Bottom Ambient Glow Blur Effect */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[850px] h-[280px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(139, 92, 246, 0.4) 0%, rgba(99, 102, 241, 0.2) 45%, transparent 75%)',
            filter: 'blur(60px)'
          }}
        />

        {/* Precision Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-violet-500/25 text-violet-300 text-xs font-medium backdrop-blur-xl mb-6 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
            <Layers size={14} className="text-violet-400" />
            <span>About Stova Media</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.04] max-w-4xl mx-auto mb-6">
            Crafted with Care. Built to Help You Grow.
          </h1>

          <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-6 font-normal">
            Stova Media is a modern web design and AI studio in Kolkata. We cut out corporate red tape and work directly with you to build fast, beautiful websites, custom web apps, and smart AI tools that deliver real results.
          </p>

          {/* Animated Kolkata AI Studio Terminal Graphic */}
          <TerminalMotionGraphic />

          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 max-w-5xl mx-auto mt-10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-left hover:border-violet-500/40 backdrop-blur-xl transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              >
                <div className="text-2xl sm:text-3xl font-medium text-slate-100 mb-0.5 font-display">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-violet-300 mb-1">
                  {stat.label}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 leading-normal">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Core Engineering Standards (Manifesto) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-16 border-b border-white/[0.08] relative">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-violet-500/25 text-violet-300 text-xs font-medium backdrop-blur-xl mb-3">
              <Award size={13} className="text-violet-400" />
              <span>Our Core Principles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.05] mb-3">
              Why Businesses Choose Us
            </h2>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              We believe great digital products should be fast, easy to manage, and clearly explained. Here is how we work with you.
            </p>
          </div>

          {/* 4 Core Value Cards with 3D Tilt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <TiltCard key={item.title} maxTilt={3} className="h-full">
                  <div className="h-full bg-gradient-to-b from-white/[0.04] to-white/[0.01] rounded-2xl p-6 sm:p-7 border border-white/[0.08] hover:border-violet-500/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.36)] transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 text-violet-300 flex items-center justify-center">
                          <Icon size={19} />
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-lg text-xs font-mono border ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-medium text-slate-100 mb-2 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
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
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-16 border-b border-white/[0.08] relative">
        <div className="max-w-[1100px] mx-auto relative z-10">
          <TiltCard maxTilt={2}>
            <div className="bg-gradient-to-b from-white/[0.05] to-white/[0.02] rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-white/[0.08] backdrop-blur-xl shadow-[0_12px_44px_rgba(0,0,0,0.4)] grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
              {/* Founder Image */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-violet-500/30 shadow-[0_0_25px_rgba(139,92,246,0.2)] mb-3 bg-white/[0.04]">
                  <Image
                    src="/founder.jpeg"
                    alt="Mehedi Hasan"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-slate-100">Mehedi Hasan</h3>
                <span className="text-xs font-mono text-violet-400 mt-0.5">
                  Founder &amp; Lead Software Architect
                </span>
                <a
                  href="https://www.linkedin.com/in/mehedi-hasan110/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                >
                  <Linkedin size={13} className="text-violet-400" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>

              {/* Founder Manifesto */}
              <div className="lg:col-span-8 flex flex-col justify-center">
                <div className="inline-flex items-center gap-1.5 text-violet-400 text-xs font-mono uppercase tracking-widest mb-3">
                  <Terminal size={14} />
                  <span>A Note From Our Founder</span>
                </div>
                <blockquote className="text-lg sm:text-xl md:text-2xl text-slate-200 leading-snug italic mb-4">
                  &ldquo;Building a website or software should never feel confusing or stressful. At Stova Media, we build clean, reliable digital products and explain every step in plain English so you always feel confident.&rdquo;
                </blockquote>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-5">
                  Based in Kolkata, Mehedi Hasan leads development for modern websites, custom web applications, and smart AI chat tools for businesses locally across India and internationally in the USA, UK, and UAE.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-300 pt-4 border-t border-white/[0.08]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>Fast Modern Websites</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>Secure Cloud Databases</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>Smart AI Automation</span>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* 4. Technology Stack */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-16 border-b border-white/[0.08] relative">
        <div className="max-w-[1100px] mx-auto text-center relative z-10 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-violet-500/25 text-violet-300 text-xs font-medium backdrop-blur-xl mb-3">
            <Server size={13} className="text-violet-400" />
            <span>Our Technology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.05] mb-8 text-center max-w-3xl mx-auto">
            Modern Tools for Fast, Reliable Results
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-left hover:border-violet-500/40 backdrop-blur-xl transition-colors shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
              >
                <div className="font-medium text-sm text-slate-100">{tech.name}</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions (Home Page Bento Grid Style) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-16 border-b border-white/[0.08] relative overflow-hidden">
        {/* Ambient Radial Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[800px] h-[350px] pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139, 92, 246, 0.2) 0%, rgba(79, 70, 229, 0.1) 45%, transparent 75%)",
            filter: "blur(70px)",
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-violet-500/25 text-violet-300 text-xs font-medium mb-4 backdrop-blur-xl shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              <HelpCircle size={13} className="text-violet-400" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.05] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Clear answers about our development process, working together, and ownership.
            </p>
          </div>

          {/* 2x2 Bento Grid with React Bits SpotlightCard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12">
            {aboutFaqs.map((faq) => (
              <SpotlightCard
                key={faq.number}
                spotlightColor="rgba(139, 92, 246, 0.22)"
                className="p-6 sm:p-7 rounded-2xl border border-white/[0.08] hover:border-violet-500/40 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.36)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-medium text-violet-400">
                    {faq.number}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500/40" />
                </div>

                <h3 className="text-base sm:text-lg font-medium text-slate-100 mb-2 leading-snug tracking-tight">
                  {faq.question}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                  {faq.answer}
                </p>
              </SpotlightCard>
            ))}
          </div>

          {/* Consultation Trigger Box with SpecularButton */}
          <div className="rounded-2xl p-6 sm:p-8 border border-white/[0.08] bg-gradient-to-r from-white/[0.04] to-white/[0.01] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-5 shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
            <div className="text-left space-y-1">
              <h4 className="text-sm sm:text-base font-medium text-slate-200">
                Have a question about your project?
              </h4>
              <p className="text-xs text-slate-400">
                Speak directly with our team in Kolkata — get an honest recommendation within 24 hours.
              </p>
            </div>

            <SpecularButton
              onClick={() => setModalOpen(true)}
              size="sm"
              radius={12}
              tint="#6d28d9"
              tintOpacity={0.7}
              lineColor="#c4b5fd"
              baseColor="#4c1d95"
              glow={1.1}
              thickness={1.3}
              intensity={1.1}
              idleIntensity={0.5}
              shineSize={14}
              shineFade={32}
              followMouse={true}
              proximity={280}
              className="text-white font-medium text-xs sm:text-sm shadow-md shadow-violet-600/30 shrink-0 cursor-pointer"
            >
              <span>Book a Free Call</span>
              <ArrowRight size={14} />
            </SpecularButton>
          </div>
        </div>
      </section>

      {/* 6. Bottom Call to Action */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-16 relative overflow-hidden">
        {/* Ambient Glow */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[850px] h-[300px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(139, 92, 246, 0.35) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 75%)',
            filter: 'blur(60px)'
          }}
        />

        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <div className="bg-gradient-to-b from-white/[0.05] to-white/[0.02] rounded-2xl sm:rounded-3xl p-8 sm:p-14 border border-white/[0.08] backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.45)] flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.05] mb-4">
              Have an Idea or Existing System to Upgrade?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mb-8 leading-relaxed">
              Book a direct strategy consultation with our Lead Architect to get an actionable technical roadmap and fixed milestone proposal within 4 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <SpecularButton
                onClick={() => setModalOpen(true)}
                size="md"
                radius={12}
                tint="#6d28d9"
                tintOpacity={0.75}
                lineColor="#c4b5fd"
                baseColor="#4c1d95"
                glow={1.2}
                thickness={1.3}
                intensity={1.2}
                idleIntensity={0.5}
                shineSize={16}
                shineFade={32}
                followMouse={true}
                proximity={280}
                className="w-full sm:w-auto text-white font-medium text-xs sm:text-sm shadow-lg shadow-violet-600/30 cursor-pointer"
              >
                <Calendar size={15} />
                <span>Book Free Consultation</span>
                <ArrowRight size={15} />
              </SpecularButton>

              <MagneticElement strength={0.2}>
                <a
                  href="https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20would%20like%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 hover:text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare size={15} />
                  <span>Direct Inquiry</span>
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
