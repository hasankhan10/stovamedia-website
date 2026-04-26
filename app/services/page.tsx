"use client";

import React from "react";
import { SplitHeadline, SectionLabel, Tag, RevealOnScroll } from "@/components/ui";
import CTASection from "@/components/sections/CTASection";
import { Code2, Bot, ArrowRight, CheckCircle2, Store, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const serviceCategories = [
  { id: "custom-software", name: "Custom Software" },
  { id: "ai-agent", name: "AI Agent" },
];

const serviceDetails = [
  {
    id: "custom-software",
    number: "01",
    icon: Code2,
    title: "Custom Software",
    tagline: "Built from scratch. Tailored to your business.",
    desc: "We architect and engineer full-stack software products from the ground up — no templates, no shortcuts. Whether it's a healthcare SaaS, an enterprise dashboard, a mobile app, or a white-label platform, every line of code is written with your business logic at its core.",
    deliverables: [
      "Full-stack Web Applications",
      "Healthcare & Clinic Management Systems",
      "Enterprise Dashboards & Analytics",
      "Mobile Apps (Flutter)",
      "White-label SaaS Platforms",
      "API Design & Integration",
      "Database Architecture",
      "Performance Optimization",
    ],
    tech: ["Next.js", "Flutter", "Node.js", "PostgreSQL", "Prisma", "Supabase", "Tailwind CSS", "Three.js"],
    highlights: [
      { label: "Zero Templates", desc: "100% custom-built for your requirements" },
      { label: "Production Ready", desc: "Deployed, monitored, and battle-tested" },
      { label: "Scalable Architecture", desc: "Built to grow with your business" },
    ],
  },
  {
    id: "ai-agent",
    number: "02",
    icon: Bot,
    title: "AI Agent",
    tagline: "Intelligent automation for modern businesses.",
    desc: "We design and deploy AI-powered agents that automate workflows, handle customer interactions, and make intelligent decisions on behalf of your business. From conversational bots to data-driven automation pipelines, we build AI that actually works in production.",
    deliverables: [
      "Conversational AI Chatbots",
      "Customer Support Automation",
      "Lead Qualification Agents",
      "AI-Powered Analytics",
      "Workflow Automation"
    ],
    tech: ["OpenAI", "Python", "FastAPI"],
    highlights: [
      { label: "Human-Like Interactions", desc: "Natural conversations that convert" },
      { label: "24/7 Operations", desc: "Never sleeps, never misses a lead" },
      { label: "Continuous Learning", desc: "Gets smarter with every interaction" },
    ],
  },
  {
    id: "local-business",
    number: "03",
    icon: Store,
    title: "Google Business Profile & Premium Website",
    tagline: "Dominate your local market with a high-fidelity digital presence.",
    desc: "We help local businesses establish a commanding online presence. This package includes full Google Business Profile setup and optimization alongside a premium, high-converting landing page. While the market price is ₹20,000, we exclusively offer this complete package for local business support at just ₹13,999.",
    deliverables: [
      "Premium Landing Page Website",
      "Google Business Profile Setup",
      "Local SEO Optimization",
      "Mobile-First Design",
      "Contact Form Integration"
    ],
    tech: ["Next.js", "Tailwind CSS", "Local SEO", "Google My Business"],
    highlights: [
      { 
        label: "Unbeatable Value", 
        desc: (
          <span className="flex items-end gap-3 mt-1">
            <span className="text-base text-muted/60 line-through font-ui">₹20,000</span>
            <span className="text-3xl font-display text-gold leading-none">₹13,999</span>
          </span>
        ) 
      },
      { label: "Local Focus", desc: "Exclusively tailored for local business support" },
      { label: "High Conversion", desc: "Designed specifically to turn local searchers into customers" },
    ],
  },
  {
    id: "ecommerce",
    number: "04",
    icon: ShoppingCart,
    title: "Fully Ecommerce Setup",
    tagline: "Making your premium brand visible to everyone.",
    desc: "Launch your digital storefront with a fully custom-coded e-commerce setup. We build high-performance, scalable platforms tailored entirely to your brand's unique identity. With a market value of ₹55,000, we deliver this premium e-commerce architecture to you for just upto ₹39,999.",
    deliverables: [
      "Custom E-commerce Platform",
      "Secure Payment Gateway Integration",
      "Brand-aligned Design System",
      "Full Admin Panel Management",
      "Mobile-Optimized Checkout",
      "SEO & Speed Optimization"
    ],
    tech: ["Next.js", "Stripe", "Tailwind CSS", "Supabase", "PostgreSQL"],
    highlights: [
      { 
        label: "Premium Offer", 
        desc: (
          <span className="flex items-end gap-3 mt-1">
            <span className="text-base text-muted/60 line-through font-ui">₹55,000</span>
            <span className="text-3xl font-display text-gold leading-none"> Upto ₹39,999</span>
          </span>
        ) 
      },
      { label: "Global Reach", desc: "Make your premium brand visible to everyone" },
      { label: "Custom Coded", desc: "No generic templates. Built specifically for your products." },
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="pt-32 min-h-screen bg-ink">
      {/* HERO */}
      <div className="px-6 md:px-10 lg:px-20 mb-32 flex flex-col items-center text-center">
        <SectionLabel className="justify-center">What We Build</SectionLabel>
        <SplitHeadline tag="h1" className="text-5xl md:text-7xl lg:text-8xl leading-none text-center justify-center">
          Four things. Done exceptionally.
        </SplitHeadline>
        <p className="mt-10 text-muted font-ui text-lg md:text-xl max-w-2xl leading-relaxed mx-auto">
          We don&apos;t spread thin. We focus on four core capabilities and deliver them 
          at a level most agencies can&apos;t match.
        </p>
      </div>

      {/* SERVICE CARDS */}
      <div className="px-6 md:px-10 lg:px-20">
        <div className="flex flex-col gap-0">
          {serviceDetails.map((service, idx) => (
            <RevealOnScroll key={service.id}>
              <section
                id={service.id}
                className={cn(
                  "relative py-24 md:py-32 border-t border-border group",
                  idx === serviceDetails.length - 1 && "border-b"
                )}
              >
                {/* Background Number */}
                <span className="absolute top-8 right-6 md:right-20 font-display text-[120px] md:text-[200px] lg:text-[280px] text-gold opacity-[0.04] select-none pointer-events-none group-hover:opacity-[0.07] transition-opacity duration-1000 leading-none">
                  {service.number}
                </span>

                <div className="relative z-10">
                  {/* Service Header */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-xl border border-border bg-card/50 flex items-center justify-center group-hover:border-gold/40 group-hover:bg-gold-glow transition-all duration-700">
                      <service.icon size={28} strokeWidth={1.5} className="text-gold" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold block mb-1">
                        Service {service.number}
                      </span>
                      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream group-hover:text-gold transition-colors duration-500">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="font-display italic text-xl md:text-2xl text-cream/60 mb-12 max-w-2xl">
                    {service.tagline}
                  </p>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left: Description + Deliverables */}
                    <div>
                      <p className="font-ui text-base md:text-lg text-muted leading-relaxed mb-12">
                        {service.desc}
                      </p>

                      <div className="mb-10">
                        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-dim block mb-6">
                          What We Deliver
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.deliverables.map((d) => (
                            <li key={d} className="text-sm text-cream/80 flex items-center gap-3 font-ui">
                              <CheckCircle2 size={14} className="text-gold shrink-0" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right: Tech + Highlights */}
                    <div className="flex flex-col gap-6">
                      {/* Tech Stack Card */}
                      <div className="p-8 border border-border bg-card/30 rounded-sm">
                        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-dim block mb-6">
                          Tech Stack
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {service.tech.map((t) => (
                            <Tag key={t} className="bg-gold-glow border-gold/20 text-gold">{t}</Tag>
                          ))}
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="grid grid-cols-1 gap-4">
                        {service.highlights.map((h) => (
                          <div
                            key={h.label}
                            className="p-6 border border-border bg-card/30 rounded-sm flex items-start gap-4 hover:border-gold/30 transition-all duration-500"
                          >
                            <div className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                            <div>
                              <span className="font-display text-lg text-cream block mb-1">{h.label}</span>
                              <div className="text-sm text-muted font-ui">{h.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
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
