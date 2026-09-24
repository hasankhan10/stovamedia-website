"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SplitHeadline, SectionLabel, RevealOnScroll, SpotlightCard, MagneticElement } from "@/components/ui";
import CTASection from "@/components/sections/CTASection";
import { 
  Zap, 
  ShieldCheck, 
  Bot, 
  Store, 
  ShoppingCart, 
  Code2, 
  CheckCircle2, 
  ArrowUpRight, 
  MessageSquare, 
  Sparkles, 
  Layers, 
  Clock, 
  HelpCircle, 
  ChevronDown,
  Calculator,
  Flame,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  badgeColor?: string;
  marketPrice?: string;
  price: string;
  billingType: string;
  timeline: string;
  deliverables: string[];
  ctaText: string;
  popular?: boolean;
  spotlight: string;
  accent: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: "local-business",
    name: "Local Business Growth",
    tagline: "Dominate your local market with verified digital presence.",
    badge: "Special Intake Offer",
    badgeColor: "bg-emerald-950/60 border-emerald-500/40 text-emerald-300",
    marketPrice: "₹25,000",
    price: "₹15,999",
    billingType: "One-time Investment",
    timeline: "5-7 Business Days",
    deliverables: [
      "High-Converting Landing Page",
      "Google Business Profile Setup & Local SEO",
      "24/7 AI Assistant Chatbot Integration",
      "100% Mobile Responsive Architecture",
      "Direct WhatsApp Lead Dispatch",
      "SSL Certificate & Fast Cloud CDN",
      "1 Month Free Priority Support"
    ],
    ctaText: "Claim ₹15,999 Offer",
    spotlight: "rgba(16, 185, 129, 0.2)",
    accent: "text-emerald-400"
  },
  {
    id: "ai-ecom",
    name: "Turnkey AI E-Commerce",
    tagline: "Next-gen intelligent digital storefront that sells 24/7.",
    badge: "Highest ROI · 3.4x Conversion",
    badgeColor: "bg-indigo-950/70 border-indigo-500/50 text-cyan-300",
    marketPrice: "₹55,000",
    price: "Upto ₹39,999",
    billingType: "Fixed Scope Package",
    timeline: "2-3 Weeks",
    popular: true,
    deliverables: [
      "Custom Full-Stack Next.js E-commerce",
      "24/7 AI Sales & Recommendation Assistant",
      "AI-Powered Semantic Vector Search",
      "Automated Product Schema & AI SEO Engine",
      "Razorpay, Stripe & UPI Instant Checkout",
      "Real-time Inventory & Customer Analytics",
      "3 Months Free Dedicated Support & Tuning"
    ],
    ctaText: "Explore E-Commerce Setup",
    spotlight: "rgba(6, 182, 212, 0.25)",
    accent: "text-cyan-400"
  },
  {
    id: "ai-agent-studio",
    name: "Autonomous AI Agent Swarm",
    tagline: "Custom AI automation pipelines engineered for production.",
    badge: "Enterprise Automation",
    badgeColor: "bg-indigo-950/60 border-indigo-500/40 text-indigo-300",
    price: "Custom Fixed Quote",
    billingType: "Based on Architecture Scope",
    timeline: "2-4 Weeks",
    deliverables: [
      "Bespoke Multi-Agent Task Orchestrator",
      "RAG Vector Database (1536-dim embeddings)",
      "Multi-lingual NLP (Bengali, Hindi, English)",
      "CRM & Internal Tool API Connectors",
      "Automated Lead Qualification Pipeline",
      "Real-time Telemetry & Fallback Guardrails",
      "Complete Source Code & Architecture Handover"
    ],
    ctaText: "Book AI Feasibility Call",
    spotlight: "rgba(99, 102, 241, 0.22)",
    accent: "text-indigo-400"
  },
  {
    id: "custom-software",
    name: "Enterprise Custom Software",
    tagline: "Mission-critical web apps & healthcare/fintech SaaS.",
    badge: "Zero Tech Debt SLA",
    badgeColor: "bg-sky-950/60 border-sky-500/40 text-sky-300",
    price: "Bespoke Scoping",
    billingType: "Milestone-based Deliverables",
    timeline: "4-8 Weeks",
    deliverables: [
      "End-to-End System Design & DB Schema",
      "Healthcare, OPD & Silent Queue SaaS Engines",
      "Next.js 16 + Supabase/PostgreSQL Stack",
      "Weekly Live Staging Deployments",
      "Automated E2E Testing & SOC-2 Compliance",
      "Sub-Second Edge Caching Architecture",
      "100% IP Ownership & 30-Day Launch SLA"
    ],
    ctaText: "Request Architecture Review",
    spotlight: "rgba(56, 189, 248, 0.22)",
    accent: "text-sky-400"
  }
];

const faqs = [
  {
    q: "Do you bill hourly or provide fixed-price quotes?",
    a: "We operate exclusively on fixed-scope, outcome-driven quotes. Once we finalize the technical architecture and deliverables during discovery, your price is locked. There are zero surprise hourly invoices or hidden fees."
  },
  {
    q: "What are the standard payment terms?",
    a: "We work on a milestone-based protocol: typically 50% initial commitment upon kickoff, and the remaining 50% only after final deployment, automated testing, and client sign-off. You hold full leverage until you are 100% satisfied."
  },
  {
    q: "Do we own the full source code and intellectual property?",
    a: "Yes, 100%. Upon project completion, full copyright, source code, database access, and intellectual property are transferred directly to your organization with zero vendor lock-in."
  },
  {
    q: "What happens after the software launches?",
    a: "Every project includes a complimentary post-launch warranty period (up to 3 months depending on the tier) with 24/7 telemetry monitoring and bug fixing. We also offer affordable ongoing engineering retainers for continuous feature expansion."
  },
  {
    q: "How fast can you start on our project?",
    a: "Because we maintain a strict intake limit of 3-5 concurrent clients to ensure exceptional code quality, we can typically commence architecture discovery within 48 to 72 hours of contract execution."
  }
];

export default function PricingClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive Scope Calculator State
  const [calcService, setCalcService] = useState<string>("ecommerce");
  const [calcScale, setCalcScale] = useState<string>("production");
  const [addons, setAddons] = useState<string[]>(["whatsapp", "seo"]);

  const toggleAddon = (id: string) => {
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Estimated Calculation
  const estimatedEstimate = useMemo(() => {
    let base = 25000;
    let timeline = "2-3 Weeks";

    if (calcService === "local") {
      base = 15999;
      timeline = "5-7 Days";
    } else if (calcService === "ecommerce") {
      base = 34999;
      timeline = "2-3 Weeks";
    } else if (calcService === "ai-agent") {
      base = 29999;
      timeline = "2-4 Weeks";
    } else if (calcService === "custom-saas") {
      base = 65000;
      timeline = "4-6 Weeks";
    }

    if (calcScale === "mvp") base *= 0.85;
    if (calcScale === "enterprise") base *= 1.4;

    const addonCost = addons.length * 4000;
    const finalTotal = Math.round(base + addonCost);

    return {
      priceStr: `₹${finalTotal.toLocaleString("en-IN")}`,
      timeline,
    };
  }, [calcService, calcScale, addons]);

  const calcMessage = encodeURIComponent(
    `Hi Stova Media, I used your Scope Calculator on the website (Service: ${calcService}, Scale: ${calcScale}, Addons: ${addons.join(", ")}) - Estimated Investment: ${estimatedEstimate.priceStr}. I'd like to book a feasibility call.`
  );

  return (
    <main className="pt-28 md:pt-36 min-h-screen bg-[#05070D] text-[#F8FAFC]">
      
      {/* 1️⃣ HERO SECTION */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 mb-20 md:mb-28 flex flex-col items-center text-center relative overflow-hidden">
        {/* Ambient Lighting */}
        <div 
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] md:w-[900px] h-[450px] rounded-full blur-[140px] opacity-25 z-0"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(6, 182, 212, 0.2) 60%, transparent 70%)"
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-indigo-500/40 bg-[#0B0F19]/90 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="text-xs uppercase font-ui tracking-wider font-semibold text-cyan-300">
              Transparent Investment Architecture · Zero Hidden Billing
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.02] tracking-tight text-[#F8FAFC]">
            Value. Not Just{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              A Cost.
            </span>
          </h1>

          <p className="mt-8 text-slate-300 font-ui text-base sm:text-xl max-w-2xl leading-relaxed font-light">
            We don&apos;t bill per hour or inflate generic scope. Every software project we architect is priced for tangible business impact with locked quotes and zero technical debt.
          </p>
        </div>
      </section>

      {/* 2️⃣ PRICING TIERS BENTO GRID */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1400px] mx-auto mb-24 md:mb-36">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel className="justify-center">Fixed Scope Packages</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#F8FAFC] mt-3">
            Engineered For Immediate ROI
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pricingTiers.map((tier) => {
            const waText = encodeURIComponent(`Hi Stova Media, I am interested in the ${tier.name} package (${tier.price}). Let's discuss scope.`);

            return (
              <RevealOnScroll key={tier.id}>
                <SpotlightCard
                  spotlightColor={tier.spotlight}
                  className={cn(
                    "p-7 sm:p-9 md:p-11 border-slate-800 bg-[#0B0F19]/90 backdrop-blur-xl rounded-xs relative flex flex-col justify-between h-full shadow-2xl transition-all duration-500 hover:border-indigo-500/50 group",
                    tier.popular ? "border-cyan-500/50 shadow-[0_0_35px_rgba(6,182,212,0.15)]" : ""
                  )}
                >
                  <div>
                    {/* Top Tier Tag */}
                    <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
                      <span className={cn("px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-xs border shadow-sm", tier.badgeColor || "bg-indigo-950/60 border-indigo-500/40 text-indigo-300")}>
                        {tier.badge}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-ui font-medium">
                        <Clock size={13} className="text-cyan-400" />
                        <span>{tier.timeline}</span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-2 group-hover:text-cyan-400 transition-colors">
                      {tier.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-ui font-light leading-relaxed mb-8">
                      {tier.tagline}
                    </p>

                    {/* Price Block */}
                    <div className="p-6 bg-[#05070D] border border-slate-800 rounded-xs mb-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono block">
                          Investment
                        </span>
                        <div className="flex items-baseline gap-3 mt-1">
                          <span className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F8FAFC]">
                            {tier.price}
                          </span>
                          {tier.marketPrice && (
                            <span className="text-sm sm:text-base text-slate-500 line-through font-mono">
                              {tier.marketPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 font-ui self-start sm:self-auto">
                        {tier.billingType}
                      </span>
                    </div>

                    {/* Deliverables Checklist */}
                    <div className="space-y-3 mb-10">
                      <span className="text-xs uppercase tracking-widest font-bold text-slate-400 font-ui block mb-4">
                        What&apos;s Included In This Architecture:
                      </span>
                      {tier.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-ui">
                          <CheckCircle2 size={16} className={cn("flex-shrink-0 mt-0.5", tier.accent)} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/contact"
                      className="flex-1 py-4 bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.35)] min-h-[48px]"
                    >
                      <span>{tier.ctaText}</span>
                      <ArrowUpRight size={15} />
                    </Link>

                    <a
                      href={`https://wa.me/919432053261?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-4 border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 min-h-[48px]"
                    >
                      <MessageSquare size={15} />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  {/* Bottom Laser Line */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                </SpotlightCard>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      {/* 3️⃣ INTERACTIVE PROJECT COST & SCOPE CALCULATOR */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1250px] mx-auto mb-24 md:mb-36">
        <SpotlightCard
          spotlightColor="rgba(99, 102, 241, 0.22)"
          className="p-7 sm:p-10 md:p-14 border-slate-800 bg-[#0B0F19]/90 backdrop-blur-xl rounded-xs shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/70 border border-indigo-500/40 text-cyan-300 text-xs uppercase font-mono font-bold rounded-xs mb-2">
                <Calculator size={13} /> Interactive Scope Estimator
              </div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#F8FAFC]">
                Estimate Your Custom Project
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-ui max-w-sm font-light">
              Select your requirements below to calculate an instant architectural estimate and estimated sprint duration.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left: Interactive Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-7">
              {/* Step 1: Project Type */}
              <div>
                <label className="text-xs uppercase tracking-wider font-bold text-cyan-400 font-ui block mb-3">
                  1. Select Core System Architecture:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 font-ui text-xs font-semibold">
                  {[
                    { id: "local", label: "Local Business & GMB" },
                    { id: "ecommerce", label: "AI E-Commerce Platform" },
                    { id: "ai-agent", label: "Autonomous AI Agent Swarm" },
                    { id: "custom-saas", label: "Healthcare / SaaS System" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setCalcService(s.id)}
                      className={cn(
                        "p-3.5 border rounded-xs text-left transition-all cursor-pointer",
                        calcService === s.id
                          ? "bg-indigo-600/30 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                          : "bg-[#05070D] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: System Scale */}
              <div>
                <label className="text-xs uppercase tracking-wider font-bold text-cyan-400 font-ui block mb-3">
                  2. Project Stage &amp; Scale:
                </label>
                <div className="grid grid-cols-3 gap-2.5 font-ui text-xs font-semibold">
                  {[
                    { id: "mvp", label: "MVP Launch" },
                    { id: "production", label: "Production Scale" },
                    { id: "enterprise", label: "Enterprise Custom" },
                  ].map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => setCalcScale(sc.id)}
                      className={cn(
                        "p-3 border rounded-xs text-center transition-all cursor-pointer",
                        calcScale === sc.id
                          ? "bg-indigo-600/30 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                          : "bg-[#05070D] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      )}
                    >
                      {sc.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Add-on Capabilities */}
              <div>
                <label className="text-xs uppercase tracking-wider font-bold text-cyan-400 font-ui block mb-3">
                  3. Production Modules &amp; Integrations:
                </label>
                <div className="grid grid-cols-2 gap-2.5 font-ui text-xs">
                  {[
                    { id: "whatsapp", label: "WhatsApp CRM & Lead Bots" },
                    { id: "seo", label: "AI SEO & Schema Optimization" },
                    { id: "payment", label: "Payment Gateway Integration" },
                    { id: "staging", label: "Weekly Staging & Dedicated SLA" },
                  ].map((ad) => {
                    const isChecked = addons.includes(ad.id);
                    return (
                      <button
                        key={ad.id}
                        onClick={() => toggleAddon(ad.id)}
                        className={cn(
                          "p-3 border rounded-xs text-left transition-all flex items-center gap-2 cursor-pointer",
                          isChecked
                            ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300"
                            : "bg-[#05070D] border-slate-800 text-slate-400 hover:border-slate-700"
                        )}
                      >
                        <CheckCircle2 size={15} className={isChecked ? "text-emerald-400" : "text-slate-600"} />
                        <span>{ad.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Real-time Estimate Card (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-[#05070D] border border-slate-800 rounded-xs">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono block">
                  Calculated Estimate
                </span>
                
                <div>
                  <span className="font-display text-4xl sm:text-5xl font-bold text-cyan-400 block">
                    {estimatedEstimate.priceStr}
                  </span>
                  <p className="text-xs text-slate-400 font-ui mt-1">
                    Estimated Timeline: <strong className="text-slate-200">{estimatedEstimate.timeline}</strong>
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-2 text-xs font-ui text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>Fixed-price quote guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>100% In-house engineering from Kolkata</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>Direct founder architecture review</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col gap-3">
                <a
                  href={`https://wa.me/919432053261?text=${calcMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-[#05070D] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 font-ui shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                >
                  <MessageSquare size={16} />
                  <span>Lock Estimate via WhatsApp</span>
                </a>

                <Link
                  href="/contact"
                  className="w-full py-3.5 border border-slate-700 bg-[#0B0F19] text-slate-300 hover:text-white hover:border-cyan-400 font-bold text-xs uppercase tracking-wider text-center transition-all font-ui"
                >
                  Book Discovery Call
                </Link>
              </div>
            </div>

          </div>
        </SpotlightCard>
      </section>

      {/* 4️⃣ THE STOVA ENGINEERING STANDARD PILLARS */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1400px] mx-auto mb-24 md:mb-36">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel className="justify-center">Why Invest with Us?</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#F8FAFC] mt-3">
            The Stova Media Standard
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: "Fixed Scope Quotes",
              desc: "No surprise hourly billing. Once architecture is locked, your quote is fixed. Zero hidden extras.",
              accent: "text-cyan-400"
            },
            {
              icon: Zap,
              title: "0% Outsourced",
              desc: "Every line of code and AI prompt is crafted directly by our core team in Kolkata. Total quality control.",
              accent: "text-indigo-400"
            },
            {
              icon: Award,
              title: "100% IP Ownership",
              desc: "Complete source code, database access, and full intellectual property are transferred upon final sign-off.",
              accent: "text-emerald-400"
            },
            {
              icon: Clock,
              title: "30-Day Launch SLA",
              desc: "We don't vanish after launch. Guaranteed bug-fix warranty and continuous telemetry monitoring included.",
              accent: "text-sky-400"
            }
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <SpotlightCard
                key={i}
                spotlightColor="rgba(99, 102, 241, 0.16)"
                className="p-7 border-slate-800 bg-[#0B0F19]/80 backdrop-blur-sm rounded-xs flex flex-col justify-between hover:border-indigo-500/40 transition-colors h-full"
              >
                <div>
                  <div className="p-3 w-fit border border-slate-800 bg-[#05070D] mb-5 rounded-xs">
                    <Icon size={22} className={card.accent} />
                  </div>
                  <h4 className="font-display text-xl text-[#F8FAFC] font-bold mb-2.5">
                    {card.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 font-ui font-light leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* 5️⃣ PRICING FAQ ACCORDION */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1100px] mx-auto mb-24 md:mb-36 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel className="justify-center">Investment Clarity</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#F8FAFC] mt-3">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 font-ui font-light">
            Everything you need to know about our fixed pricing, milestone schedules, and IP ownership.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div 
                key={i}
                className={cn(
                  "border rounded-xs transition-all duration-300 overflow-hidden",
                  isOpen 
                    ? "border-indigo-500/60 bg-[#0F1524] shadow-[0_0_25px_rgba(99,102,241,0.2)]" 
                    : "border-slate-800 bg-[#0B0F19]/90 hover:border-slate-700 hover:bg-[#0D121F]"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg md:text-xl text-[#F8FAFC] cursor-pointer"
                >
                  <span className="flex items-center gap-3.5">
                    <span className="px-2 py-0.5 rounded-xs bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold shrink-0">
                      0{i + 1}
                    </span>
                    <span className="group-hover:text-cyan-300 transition-colors">{faq.q}</span>
                  </span>
                  <div className={cn(
                    "p-2 rounded-xs border transition-transform duration-300 shrink-0",
                    isOpen 
                      ? "rotate-180 border-cyan-500/50 bg-cyan-950/60 text-cyan-300" 
                      : "border-slate-800 bg-[#05070D] text-slate-400"
                  )}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-2 font-ui text-sm sm:text-base text-slate-200 leading-relaxed font-light border-t border-slate-800/80 mt-1">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6️⃣ FINAL CTA SECTION */}
      <CTASection />
    </main>
  );
}
