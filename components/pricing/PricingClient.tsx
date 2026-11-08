"use client";

import React, { useState } from "react";
import { 
  Check, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Calendar, 
  ArrowRight, 
  Layers, 
  Globe, 
  Bot, 
  Server,
  HelpCircle,
  MessageSquare
} from "lucide-react";
import { AppointmentModal, MagneticElement, SpotlightCard, SpecularButton } from "@/components/ui";
import TiltCard from "@/components/animations/TiltCard";

interface PricingTier {
  id: string;
  title: string;
  tagline: string;
  price: string;
  period: string;
  popular: boolean;
  badge: string;
  badgeColor: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  delivery: string;
  features: string[];
}

const pricingTiers: PricingTier[] = [
  {
    id: "growth-website",
    title: "Growth Website Architecture",
    tagline: "For ambitious businesses seeking high Google search dominance, sub-second TTFB, and maximum conversion rates.",
    price: "Fixed Milestone",
    period: "Single Delivery Scope",
    popular: false,
    badge: "10-14 Days Launch",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: Globe,
    delivery: "10–14 Days Delivery",
    features: [
      "100% custom Next.js 15 & React 19 architecture (zero WordPress bloat)",
      "Google Maps (GMB) #1 ranking optimization & local SEO authority",
      "Sub-50ms TTFB edge caching with 100/100 Core Web Vitals guarantee",
      "Streamlined high-converting consultation and lead capture flows",
      "Full responsive mobile-first UI with custom design token system",
      "Free SSL, Cloudflare edge DNS, and 30-day post-launch warranty",
    ],
  },
  {
    id: "ecommerce-ai",
    title: "E-Commerce & AI Automation",
    tagline: "For modern retailers and brands requiring a blazing fast storefront powered by a 24/7 intelligent sales assistant.",
    price: "Tailored Scope",
    period: "Milestone Deliverable",
    popular: true,
    badge: "Most Recommended",
    badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    icon: Bot,
    delivery: "2–3 Weeks Delivery",
    features: [
      "Custom checkout storefront engineered for 3X mobile conversion",
      "24/7 intelligent AI booking & sales assistant for Web & WhatsApp",
      "Real-time inventory management, automated invoices, and CRM sync",
      "Instant UPI, credit card, and global multi-currency payment gates",
      "Automated order confirmation and dispatch notification pipelines",
      "100% source code repository ownership with zero platform royalties",
    ],
  },
  {
    id: "custom-saas",
    title: "Enterprise SaaS & Web Apps",
    tagline: "For startups and scaling enterprises needing bespoke software, secure multi-tenant backends, and custom AI pipelines.",
    price: "Sprint-Based",
    period: "Milestone Sprints",
    popular: false,
    badge: "Bespoke Scale",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    icon: Server,
    delivery: "3–6 Weeks Sprints",
    features: [
      "End-to-end Next.js 15, TypeScript, PostgreSQL, and Supabase architecture",
      "Bank-grade Role-Based Access Control (RBAC) and encrypted auth",
      "Autonomous AI pipelines, vector database embeddings & private RAG",
      "High-throughput REST/GraphQL APIs with sub-50ms query execution",
      "Direct daily collaboration with Lead Software Architect",
      "100% intellectual property rights and full git repository transfer",
    ],
  },
];

const guarantees = [
  {
    icon: ShieldCheck,
    title: "100% IP & Code Ownership",
    description: "You own every line of code, database schema, and deployment configuration upon completion. Zero proprietary agency lock-in.",
  },
  {
    icon: Clock,
    title: "4-Hour Feasibility Response",
    description: "Submit your technical requirements and receive a comprehensive engineering review and fixed timeline proposal within 4 business hours.",
  },
  {
    icon: Zap,
    title: "Zero Hidden Fees",
    description: "Fixed milestone pricing with zero surprise hourly overages, no hidden maintenance fees, and no recurring agency markups.",
  },
];

const pricingFaqs = [
  {
    number: "01",
    question: "How does milestone-based pricing work?",
    answer: "We structure projects into clear, verifiable engineering milestones. Projects commence with a 50% upfront deposit to begin architecture, and the final 50% is only payable after you test, verify, and approve the staging build.",
  },
  {
    number: "02",
    question: "What is included in the 30-day post-launch warranty?",
    answer: "Every custom build includes 30 days of comprehensive technical support, cloud monitoring, edge performance tuning, and immediate bug fixes to ensure complete operational stability.",
  },
  {
    number: "03",
    question: "Can we expand features or integrate new AI workflows later?",
    answer: "Yes. Because our architecture is strictly modular and free from technical debt, integrating additional AI pipelines, database schemas, or payment gateways in the future is completely frictionless.",
  },
  {
    number: "04",
    question: "How are custom quotes calculated for SaaS platforms?",
    answer: "We evaluate your exact data model, user concurrency requirements, third-party integrations, and timeline targets to deliver a transparent, fixed milestone scope with guaranteed delivery dates.",
  },
];

export default function PricingClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Growth Website Architecture");

  const openBookingFor = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setModalOpen(true);
  };

  return (
    <div className="w-full bg-[#07080C] text-white relative">
      {/* 1. Pricing Header & Cards */}
      <section className="relative pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden border-b border-white/[0.08]">
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

        <div className="max-w-[1300px] mx-auto text-center relative z-10">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-violet-500/25 text-violet-300 text-xs font-medium backdrop-blur-xl mb-6 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
            <Layers size={14} className="text-violet-400" />
            <span>Transparent Investment · Fixed Scope Delivery</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.04] max-w-4xl mx-auto mb-6">
            Predictable Pricing. Guaranteed Results.
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-14 sm:mb-16">
            Zero hourly billing bloat, zero surprise invoices. Choose a fixed-scope engineering tier or request a custom milestone scope reviewed directly by our Lead Architect.
          </p>

          {/* 3 Core Pricing Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 text-left items-stretch">
            {pricingTiers.map((tier) => {
              const IconComponent = tier.icon;
              return (
                <div key={tier.id} className="h-full">
                  <TiltCard maxTilt={3} className="h-full">
                    <div
                      className={`h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative backdrop-blur-xl ${
                        tier.popular
                          ? "bg-gradient-to-b from-white/[0.07] to-white/[0.02] border-2 border-violet-500/60 shadow-[0_12px_44px_rgba(139,92,246,0.22)]"
                          : "bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] hover:border-violet-500/40 shadow-[0_8px_32px_rgba(0,0,0,0.36)]"
                      }`}
                    >
                      {/* Popular Top Badge */}
                      {tier.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[11px] font-mono uppercase tracking-wider shadow-sm">
                          Most Recommended
                        </div>
                      )}

                      <div>
                        {/* Header & Icon */}
                        <div className="flex items-center justify-between mb-5">
                          <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 text-violet-300 flex items-center justify-center">
                            <IconComponent size={20} />
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-lg text-xs font-mono border ${tier.badgeColor}`}>
                            {tier.badge}
                          </span>
                        </div>

                        {/* Title & Tagline */}
                        <h2 className="text-xl sm:text-2xl font-medium text-slate-100 mb-2 tracking-tight">
                          {tier.title}
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                          {tier.tagline}
                        </p>

                        {/* Price Display */}
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] mb-6">
                          <div className="text-2xl sm:text-3xl font-medium text-slate-100 font-display">
                            {tier.price}
                          </div>
                          <div className="text-xs font-mono text-slate-400 mt-1 flex justify-between items-center">
                            <span>{tier.period}</span>
                            <span className="text-violet-400 font-semibold">{tier.delivery}</span>
                          </div>
                        </div>

                        {/* Feature List */}
                        <ul className="space-y-3 mb-8">
                          {tier.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-normal">
                              <span className="mt-0.5 rounded-md p-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                                <Check size={11} strokeWidth={3} />
                              </span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action SpecularButton */}
                      <SpecularButton
                        onClick={() => openBookingFor(tier.title)}
                        size="sm"
                        radius={12}
                        tint={tier.popular ? "#6d28d9" : "#3b82f6"}
                        tintOpacity={tier.popular ? 0.75 : 0.4}
                        lineColor={tier.popular ? "#c4b5fd" : "#93c5fd"}
                        baseColor={tier.popular ? "#4c1d95" : "#1e1b4b"}
                        glow={tier.popular ? 1.2 : 0.9}
                        thickness={1.3}
                        intensity={1.1}
                        idleIntensity={0.5}
                        shineSize={14}
                        shineFade={32}
                        followMouse={true}
                        proximity={240}
                        className="w-full text-white font-medium text-xs sm:text-sm shadow-md cursor-pointer"
                      >
                        <span>Get {tier.title.split(" ")[0]} Proposal</span>
                        <ArrowRight size={14} />
                      </SpecularButton>
                    </div>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Trust Guarantees Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-16 border-b border-white/[0.08] relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] h-[300px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            filter: 'blur(50px)'
          }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.05] mb-3">
              Our Investment Standards
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              We eliminate financial risk and guarantee enterprise code standards across every milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guarantees.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.title} 
                  className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.36)] hover:border-violet-500/40 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 text-violet-300 flex items-center justify-center mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-medium text-lg sm:text-xl text-slate-100 mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Pricing FAQs Section (Home Page Bento Grid Style) */}
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
              <span>Payment & Scope Questions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-slate-100 leading-[1.05] mb-3">
              Frequently Asked Pricing Questions
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Essential facts on milestone deliverables, code transfer, and post-launch warranties.
            </p>
          </div>

          {/* 2x2 Bento Grid with React Bits SpotlightCard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12">
            {pricingFaqs.map((faq) => (
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
                Require a customized milestone sprint?
              </h4>
              <p className="text-xs text-slate-400">
                Speak directly with our Lead Architect in Kolkata — get a transparent scope proposal within 4 hours.
              </p>
            </div>

            <SpecularButton
              onClick={() => openBookingFor("Custom Enterprise Scope")}
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
              <span>Request custom review</span>
              <ArrowRight size={14} />
            </SpecularButton>
          </div>
        </div>
      </section>

      {/* 4. Bottom Consultation Trigger Strip */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-16 relative overflow-hidden">
        {/* Glow */}
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
              Need a Custom Milestone or Technical Review?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mb-8 leading-relaxed">
              Book a direct strategy consultation with our Lead Software Architect to review feasibility, technical architecture, and guaranteed milestone scopes.
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
                  href="https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20am%20interested%20in%20pricing%20options"
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
      <AppointmentModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        defaultService={selectedService}
      />
    </div>
  );
}
