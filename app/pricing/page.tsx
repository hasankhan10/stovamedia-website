"use client";

import React from "react";
import { 
  SplitHeadline, 
  SectionLabel, 
  Button, 
  RevealOnScroll 
} from "@/components/ui";
import { 
  Code2, 
  Bot, 
  Zap, 
  ShieldCheck, 
  LineChart, 
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  Gem
} from "lucide-react";
import { cn } from "@/lib/utils";
import CTASection from "@/components/sections/CTASection";

const tracks = [
  {
    title: "Custom Software",
    icon: Code2,
    tagline: "High-performance digital foundations.",
    color: "from-gold/20 to-transparent",
    plans: [
      {
        name: "MVP Protocol",
        price: "$12k - $25k",
        timing: "4-8 Weeks",
        focus: "Speed to Market",
        features: [
          "Core Feature Set Architecture",
          "Production-Ready Infrastructure",
          "Premium UI/UX Design",
          "Database Modeling",
          "Security Hardening",
          "30-Day Launch Post-Support"
        ],
        highlight: false
      },
      {
        name: "Enterprise Level",
        price: "$30k - $75k+",
        timing: "3-6 Months",
        focus: "Scale & Complexity",
        features: [
          "Multi-tier System Architecture",
          "Complex Business Logic",
          "Advanced Analytics Integration",
          "Platform Scalability Audit",
          "Custom API Ecosystem",
          "Priority 24/7 Support"
        ],
        highlight: true
      }
    ]
  },
  {
    title: "AI Agent",
    icon: Bot,
    tagline: "Autonomous intelligence for growth.",
    color: "from-green-500/10 to-transparent",
    plans: [
      {
        name: "Pilot Agent",
        price: "$8k - $15k",
        timing: "3-5 Weeks",
        focus: "Specific Task Automation",
        features: [
          "Single-Purpose AI Logic",
          "Custom RAG Implementation",
          "Data Source Integration",
          "Human-in-the-loop Pipeline",
          "Usage Monitoring Dashboard",
          "Performance Optimization"
        ],
        highlight: false
      },
      {
        name: "Global Brain",
        price: "$20k - $50k+",
        timing: "2-4 Months",
        focus: "Cross-platform Intelligence",
        features: [
          "Full-workflow Automation",
          "Proprietary Model Fine-tuning",
          "Omnichannel Integration",
          "Predictive Analytics Engine",
          "Real-time Data Processing",
          "Self-Optimizing Loops"
        ],
        highlight: true
      }
    ]
  }
];

export default function PricingPage() {
  return (
    <main className="pt-32 min-h-screen">
      
      {/* HERO */}
      <div className="px-6 md:px-10 lg:px-20 mb-32 flex flex-col items-center text-center">
        <SectionLabel className="justify-center">Investment Architecture</SectionLabel>
        <SplitHeadline tag="h1" className="text-5xl md:text-7xl lg:text-8xl leading-none text-center justify-center">
          Value. Not just a cost.
        </SplitHeadline>
        <p className="mt-10 text-muted font-ui text-lg md:text-xl max-w-2xl leading-relaxed mx-auto">
          We don&apos;t believe in one-size-fits-all. Every project we architect is 
          calculated based on value and impact. Start a conversation to receive a 
          bespoke proposal for your vision.
        </p>
      </div>

      {/* TRACK SELECTION REMOVED */}


      {/* THE STOVA STANDARD SECTION */}
      <section className="px-6 md:px-10 lg:px-20 py-32 border-t border-border bg-ink">
        <div className="max-w-4xl mx-auto text-center mb-24">
           <SectionLabel className="justify-center">Why Invest with Us?</SectionLabel>
           <h2 className="font-display text-4xl md:text-5xl mt-6">The Stova Media Standard.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StandardCard 
              icon={ShieldCheck} 
              title="Fixed Scope Quotes" 
              desc="No surprise hourly billing. Once we finalize the architecture, your price is locked. No hidden fees."
            />
            <StandardCard 
              icon={Zap} 
              title="0% Outsourced" 
              desc="Every pixel and line of code is produced in-house in Kolkata. No communication loss, 100% quality control."
            />
            <StandardCard 
              icon={Gem} 
              title="Premium Maintenance" 
              desc="We don't leave you after launch. Our retainers keep your software scaling and performing at its peak."
            />
        </div>
      </section>

      <CTASection />
    </main>
  );
}

function StandardCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="p-10 border border-border group hover:border-gold/30 transition-all duration-500">
      <div className="w-12 h-12 border border-border flex items-center justify-center text-gold mb-8 group-hover:bg-gold-glow transition-all">
        <Icon size={20} />
      </div>
      <h3 className="font-display text-xl mb-4 group-hover:text-gold transition-colors">{title}</h3>
      <p className="text-muted text-sm leading-relaxed group-hover:text-cream/90 transition-all">{desc}</p>
    </div>
  );
}
