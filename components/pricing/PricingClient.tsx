"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Calendar, 
  MessageSquare, 
  ArrowRight, 
  Layers,
  HelpCircle,
  ChevronDown,
  Server,
  Globe,
  Bot
} from "lucide-react";
import { AppointmentModal, MagneticElement } from "@/components/ui";
import TiltCard from "@/components/animations/TiltCard";
import { 
  GrowthWebsiteMotionGraphic, 
  EcommerceAIMotionGraphic, 
  CustomSaaSMotionGraphic 
} from "@/components/animations/PricingTierGraphics";

const pricingTiers = [
  {
    id: "growth-website",
    title: "Growth Website Package",
    tagline: "For small businesses, doctors, and local brands wanting high Google Maps rankings and sub-second speed.",
    price: "Fixed-Scope Quote",
    period: "Milestone Deliverable",
    popular: false,
    badge: "Fast Launch",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    icon: Globe,
    accent: "from-slate-800 to-slate-900",
    delivery: "10–14 Days Delivery",
    graphic: <GrowthWebsiteMotionGraphic />,
    features: [
      "100% Custom Next.js 15 & React code (zero slow WordPress templates)",
      "Google Maps (GMB) #1 ranking optimization & Local SEO setup",
      "Sub-50ms TTFB & 100/100 Core Web Vitals speed guarantee",
      "Direct 1-Click WhatsApp click-to-chat integration",
      "Mobile-first responsive design tailored to your branding",
      "Free SSL setup & 30-day post-launch warranty",
    ],
  },
  {
    id: "ecommerce-ai",
    title: "E-Commerce & AI Agent",
    tagline: "For brands and online sellers needing a high-converting storefront with a 24/7 automated sales AI bot.",
    price: "Custom Storefront",
    period: "Milestone Deliverable",
    popular: true,
    badge: "Most Popular",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    icon: Bot,
    accent: "from-indigo-600 to-cyan-600",
    delivery: "2–3 Weeks Delivery",
    graphic: <EcommerceAIMotionGraphic />,
    features: [
      "Custom-coded fast checkout store with secure UPI/Card/COD payments",
      "24/7 Intelligent AI WhatsApp & Website Chatbot (answers queries & takes orders)",
      "Admin inventory, customer order management & automated invoice generation",
      "Sub-second load times designed for high mobile conversion rates",
      "Automated WhatsApp order confirmation & tracking notifications",
      "100% source code ownership & 30-day dedicated warranty",
    ],
  },
  {
    id: "custom-saas",
    title: "Custom SaaS & Enterprise",
    tagline: "For startups, clinics, and businesses building custom full-stack software, portals, or internal tools.",
    price: "Bespoke Architecture",
    period: "Sprint Milestone",
    popular: false,
    badge: "Bespoke Scale",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    icon: Server,
    accent: "from-cyan-600 to-indigo-700",
    delivery: "3–6 Weeks Sprints",
    graphic: <CustomSaaSMotionGraphic />,
    features: [
      "End-to-end custom Next.js 15, TypeScript & PostgreSQL architecture",
      "Bank-grade Role-Based Access Control (RBAC) & encrypted auth",
      "Autonomous AI pipelines, private RAG knowledge base & CRM sync",
      "Scalable REST/GraphQL APIs with sub-50ms query optimization",
      "Direct daily collaboration with Lead Software Architect",
      "100% intellectual property & complete git repository transfer",
    ],
  },
];

const guarantees = [
  {
    icon: ShieldCheck,
    title: "100% IP & Code Ownership",
    description: "You own every single line of code, database schema, and git repository upon project completion.",
  },
  {
    icon: Clock,
    title: "4-Hour Feasibility Response",
    description: "Submit your requirements and get a detailed engineering review and fixed timeline within 4 hours.",
  },
  {
    icon: Zap,
    title: "Zero Hidden Fees",
    description: "Fixed milestone pricing with zero surprise hourly overages or recurring agency maintenance lock-ins.",
  },
];

const pricingFaqs = [
  {
    question: "How does your milestone-based payment work?",
    answer: "We break projects into clear, verifiable milestones. Typically, projects start with a 50% upfront deposit to begin development, and the remaining 50% is only payable after you test and approve the finished staging build.",
  },
  {
    question: "What is included in the 30-day post-launch warranty?",
    answer: "Every custom build includes 30 days of complimentary technical support, server monitoring, bug fixes, and performance tuning to ensure your software runs with 100% stability.",
  },
  {
    question: "Can I upgrade features or add custom AI workflows later?",
    answer: "Yes! Because our architecture is 100% modular and clean, adding new AI agent pipelines, custom database models, or checkout integrations in the future is seamless without rebuilding.",
  },
  {
    question: "How do you calculate custom quotes for SaaS and internal tools?",
    answer: "We evaluate your exact user workflows, database complexity, third-party integrations, and target launch date. We then provide a fixed milestone proposal with guaranteed delivery dates.",
  },
];

export default function PricingClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Growth Website Package");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const openBookingFor = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setModalOpen(true);
  };

  return (
    <div className="w-full bg-white relative">
      {/* 1. Pricing Header & Cards */}
      <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden bg-white">
        {/* Soft Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[800px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-indigo-100/70 via-cyan-100/40 to-blue-50/30 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-[1300px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-semibold mb-4 sm:mb-5 shadow-xs">
            <Layers size={14} className="text-indigo-600" />
            <span>Transparent Investment · Fixed Scope Delivery</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.08] max-w-4xl mx-auto mb-4 sm:mb-5">
            Predictable Pricing.{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 bg-clip-text text-transparent">
              Guaranteed Results.
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-14">
            No endless hourly billing, no surprise invoices. Choose a fixed-scope engineering package or request a tailored milestone quote.
          </p>

          {/* 3 Core Pricing Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 text-left items-stretch">
            {pricingTiers.map((tier) => {
              const IconComponent = tier.icon;
              return (
                <div key={tier.id} className="h-full">
                  <TiltCard maxTilt={4} className="h-full">
                    <div
                      className={`h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                        tier.popular
                          ? "bg-white border-2 border-indigo-500 shadow-[0_15px_40px_rgba(79,70,229,0.12)]"
                          : "bg-white border border-slate-200/90 shadow-2xs hover:border-indigo-300 hover:shadow-xs"
                      }`}
                    >
                      {/* Popular Top Badge */}
                      {tier.popular && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                          Most Recommended
                        </div>
                      )}

                      <div>
                        {/* Header & Icon */}
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${tier.accent} text-white flex items-center justify-center shadow-xs`}>
                            <IconComponent size={20} />
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${tier.badgeColor}`}>
                            {tier.badge}
                          </span>
                        </div>

                        {/* Title & Tagline */}
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mb-2 tracking-tight">
                          {tier.title}
                        </h3>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                          {tier.tagline}
                        </p>

                        {/* Price Display */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-4">
                          <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
                            {tier.price}
                          </div>
                          <div className="text-[11px] font-mono text-slate-500 mt-0.5 flex justify-between items-center">
                            <span>{tier.period}</span>
                            <span className="text-indigo-700 font-bold">{tier.delivery}</span>
                          </div>
                        </div>

                        {/* Animated Motion Graphic Widget */}
                        <div className="mb-5">
                          {tier.graphic}
                        </div>

                        {/* Feature List */}
                        <ul className="space-y-3 mb-8">
                          {tier.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-normal">
                              <span className="mt-0.5 rounded-full p-0.5 bg-emerald-100 text-emerald-700 shrink-0">
                                <Check size={12} strokeWidth={3} />
                              </span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Button */}
                      <MagneticElement strength={0.25} className="w-full">
                        <button
                          onClick={() => openBookingFor(tier.title)}
                          className={`w-full py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                            tier.popular
                              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/25"
                              : "bg-slate-50 hover:bg-indigo-600 text-slate-800 hover:text-white border border-slate-200"
                          }`}
                        >
                          <span>Get {tier.title.split(" ")[0]} Quote</span>
                          <ArrowRight size={15} />
                        </button>
                      </MagneticElement>
                    </div>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Trust Guarantees Section */}
      <section className="py-14 sm:py-18 px-4 sm:px-6 md:px-10 lg:px-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight mb-2">
              Our Investment Standards
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              We eliminate financial risk and guarantee enterprise code quality on every engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guarantees.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-4 shadow-2xs">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Pricing FAQs Section */}
      <section className="py-14 sm:py-18 px-4 sm:px-6 md:px-10 lg:px-16 bg-white border-t border-slate-200/80">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-xs">
              <HelpCircle size={14} className="text-indigo-600" />
              <span>Payment &amp; Scope Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight mb-2">
              Frequently Asked Pricing Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {pricingFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/90 overflow-hidden bg-slate-50/50 shadow-2xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex justify-between items-center gap-3 cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-base text-slate-900 font-display">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-indigo-600" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Bottom Consultation Trigger Strip */}
      <section className="py-14 sm:py-18 px-4 sm:px-6 md:px-10 lg:px-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-[950px] mx-auto text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-[0_15px_40px_rgba(15,23,42,0.05)] flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight mb-3">
              Need a Custom Milestone or Technical Review?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-lg mb-6 leading-relaxed">
              Book a direct consultation with our lead software architect to discuss feasibility, project scope, and fixed milestone pricing.
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
                  href="https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20am%20interested%20in%20pricing%20options"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-7 py-3.5 rounded-full bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-700 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare size={15} />
                  <span>Chat on WhatsApp</span>
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
