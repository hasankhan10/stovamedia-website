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
  const [calcService, setCalcService] = useState<string>("ecommerce");
  const [calcScale, setCalcScale] = useState<string>("production");
  const [addons, setAddons] = useState<string[]>(["whatsapp", "seo"]);

  const toggleAddon = (id: string) => {
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const estimatedEstimate = useMemo(() => {
    let base = 25000;
    let timeline = "2-3 Weeks";

    if (calcService === "landing") base = 15999;
    if (calcService === "ecommerce") base = 39999;
    if (calcService === "ai-agent") { base = 45000; timeline = "2-4 Weeks"; }
    if (calcService === "saas") { base = 85000; timeline = "4-6 Weeks"; }

    if (calcScale === "enterprise") base *= 1.6;

    if (addons.includes("whatsapp")) base += 5000;
    if (addons.includes("seo")) base += 6000;
    if (addons.includes("rag")) base += 12000;
    if (addons.includes("multi-clinic")) base += 15000;

    return {
      priceFormatted: `₹${Math.round(base).toLocaleString("en-IN")}`,
      timeline
    };
  }, [calcService, calcScale, addons]);

  return (
    <main className="pt-28 md:pt-36 min-h-screen bg-[#05070D] text-[#F8FAFC]">
      {/* 1. HERO SECTION */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 mb-16 md:mb-24 flex flex-col items-center text-center relative overflow-hidden">
        <div 
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] md:w-[900px] h-[450px] rounded-full blur-[140px] opacity-25 z-0"
          style={{ background: "radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(6, 182, 212, 0.2) 60%, transparent 70%)" }}
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
            Clear, Honest &amp;{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Transparent Pricing.
            </span>
          </h1>

          <p className="mt-8 text-slate-300 font-ui text-base sm:text-xl max-w-2xl leading-relaxed font-light">
            No confusing hourly rates, no hidden fees, and zero surprise invoices. We provide fixed-scope quotes designed to deliver real business returns.
          </p>
        </div>
      </section>

      {/* 2. PRICING TIERS BENTO GRID */}
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
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        {tier.badge && (
                          <span className={cn("text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-full border inline-block mb-3 font-semibold", tier.badgeColor)}>
                            {tier.badge}
                          </span>
                        )}
                        <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F8FAFC]">
                          {tier.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 font-ui font-light mt-1 max-w-sm">
                          {tier.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="mb-8 pb-6 border-b border-slate-800/80">
                      {tier.marketPrice && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-slate-500 line-through">Market: {tier.marketPrice}</span>
                          <span className="text-[10px] font-mono uppercase bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.5 rounded-xs">
                            Studio Discount Active
                          </span>
                        </div>
                      )}
                      <div className="flex items-baseline gap-2">
                        <span className={cn("text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight", tier.accent)}>
                          {tier.price}
                        </span>
                        <span className="text-xs font-ui text-slate-400 font-light">/ {tier.billingType}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs font-mono text-slate-400">
                        <Clock size={13} className="text-cyan-400" />
                        <span>Estimated Delivery: <strong className="text-slate-200">{tier.timeline}</strong></span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      <span className="text-[11px] uppercase font-mono tracking-wider font-bold text-slate-400 block">
                        Included Architecture Deliverables:
                      </span>
                      {tier.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm font-ui text-slate-300">
                          <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={`https://wa.me/919432053261?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-1/2 py-3.5 px-4 rounded-xs bg-[#05070D] border border-slate-700 hover:border-emerald-500/60 text-slate-200 hover:text-emerald-300 font-ui font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare size={14} />
                      <span>WhatsApp Scope</span>
                    </a>

                    <Link
                      href={`/contact?tier=${tier.id}`}
                      className={cn(
                        "w-full sm:w-1/2 py-3.5 px-4 rounded-xs text-white font-ui font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg",
                        tier.popular 
                          ? "bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:brightness-110 shadow-cyan-500/20" 
                          : "bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-400"
                      )}
                    >
                      <span>{tier.ctaText}</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </SpotlightCard>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE SCOPE & ROI ESTIMATOR */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1200px] mx-auto mb-24 md:mb-36">
        <SpotlightCard
          spotlightColor="rgba(99, 102, 241, 0.2)"
          className="p-8 sm:p-12 md:p-16 border-slate-800 bg-[#0B0F19]/90 backdrop-blur-xl rounded-xs shadow-2xl relative"
        >
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 text-xs font-mono uppercase mb-3">
              <Calculator size={13} />
              <span>Interactive Architecture Calculator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#F8FAFC]">
              Estimate Your Production Scope
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-ui font-light mt-2">
              Select your system requirements to preview typical engineering budgets and timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="text-xs uppercase font-mono tracking-wider font-bold text-slate-300 block mb-2.5">
                  1. Core Software System
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "landing", label: "Local Growth Engine", desc: "Landing + GMB" },
                    { id: "ecommerce", label: "Turnkey E-Commerce", desc: "Full Storefront" },
                    { id: "ai-agent", label: "Autonomous AI Agent", desc: "RAG & Workflows" },
                    { id: "saas", label: "Custom SaaS Platform", desc: "OPD & Clinical" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCalcService(s.id)}
                      className={cn(
                        "p-3 rounded-xs border text-left transition-all cursor-pointer",
                        calcService === s.id
                          ? "bg-indigo-950/70 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                          : "bg-[#05070D] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      )}
                    >
                      <div className="font-display font-bold text-xs sm:text-sm">{s.label}</div>
                      <div className="text-[10px] text-slate-500 font-ui font-light">{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-mono tracking-wider font-bold text-slate-300 block mb-2.5">
                  2. Architectural Scale
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "production", label: "Production Standard", desc: "Up to 50k monthly users" },
                    { id: "enterprise", label: "High-Concurrency", desc: "500k+ users & 99.99% SLA" },
                  ].map((sc) => (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => setCalcScale(sc.id)}
                      className={cn(
                        "p-3 rounded-xs border text-left transition-all cursor-pointer",
                        calcScale === sc.id
                          ? "bg-indigo-950/70 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                          : "bg-[#05070D] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      )}
                    >
                      <div className="font-display font-bold text-xs sm:text-sm">{sc.label}</div>
                      <div className="text-[10px] text-slate-500 font-ui font-light">{sc.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-mono tracking-wider font-bold text-slate-300 block mb-2.5">
                  3. Production Addons
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "whatsapp", label: "WhatsApp Live Dispatch (+₹5k)" },
                    { id: "seo", label: "AI SEO Schema & GMB (+₹6k)" },
                    { id: "rag", label: "Custom RAG Vector Memory (+₹12k)" },
                    { id: "multi-clinic", label: "Multi-Clinic Sync Engine (+₹15k)" },
                  ].map((addon) => {
                    const active = addons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={cn(
                          "p-2.5 rounded-xs border text-xs font-ui transition-all text-left flex items-center justify-between cursor-pointer",
                          active
                            ? "bg-cyan-950/40 border-cyan-400/80 text-cyan-300"
                            : "bg-[#05070D] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                        )}
                      >
                        <span className="truncate">{addon.label}</span>
                        {active && <CheckCircle2 size={13} className="text-cyan-400 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#05070D] border border-slate-800 rounded-xs flex flex-col justify-between h-full space-y-6 text-center">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 block mb-1">
                  Estimated Investment
                </span>
                <div className="font-display text-4xl sm:text-5xl font-bold text-cyan-400 tracking-tight">
                  {estimatedEstimate.priceFormatted}
                </div>
                <p className="text-xs font-mono text-slate-400 mt-2">
                  Timeline: <strong className="text-slate-200">{estimatedEstimate.timeline}</strong>
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-400 font-ui font-light border-y border-slate-800/80 py-4">
                <div className="flex justify-between">
                  <span>Code Ownership:</span>
                  <span className="text-slate-200 font-medium">100% Perpetual IP</span>
                </div>
                <div className="flex justify-between">
                  <span>Engineering Team:</span>
                  <span className="text-slate-200 font-medium">Senior In-House</span>
                </div>
                <div className="flex justify-between">
                  <span>Scope Guarantee:</span>
                  <span className="text-slate-200 font-medium">Zero Hourly Overages</span>
                </div>
              </div>

              <a
                href={`https://wa.me/919432053261?text=${encodeURIComponent(`Hi Stova Media, I used your pricing calculator. My estimated scope is ${calcService} (${estimatedEstimate.priceFormatted}). Let's discuss starting this build.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xs bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white font-ui font-semibold text-xs tracking-wider uppercase transition-all shadow-lg hover:brightness-110 flex items-center justify-center gap-2"
              >
                <span>Lock In Scope on WhatsApp</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </SpotlightCard>
      </section>

      {/* 4. PRICING FAQ ACCORDION */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1100px] mx-auto mb-24 md:mb-36">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel className="justify-center">Pricing Clarity</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#F8FAFC] mt-3">
            Deterministic Investment Terms
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <SpotlightCard
                key={idx}
                spotlightColor="rgba(6, 182, 212, 0.15)"
                className={cn(
                  "p-6 sm:p-7 border-slate-800 bg-[#0B0F19]/90 backdrop-blur-md rounded-xs transition-all duration-300 shadow-lg",
                  isOpen ? "border-cyan-500/40 bg-[#0E1424]" : "hover:border-slate-700"
                )}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                >
                  <span className={cn(
                    "font-display text-lg sm:text-xl font-bold transition-colors",
                    isOpen ? "text-cyan-300" : "text-[#F8FAFC]"
                  )}>
                    {faq.q}
                  </span>
                  <div className={cn(
                    "w-8 h-8 rounded-full border border-slate-800 bg-[#05070D] flex items-center justify-center shrink-0 text-slate-400 transition-transform duration-300",
                    isOpen && "rotate-180 border-cyan-500/40 text-cyan-400"
                  )}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-slate-300 font-ui text-sm sm:text-base leading-relaxed font-light border-t border-slate-800/80 mt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <CTASection />
    </main>
  );
}
