"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel, SpotlightCard, MagneticElement } from "@/components/ui";
import { cn } from "@/lib/utils";
import { 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ChevronDown, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  Copy, 
  ArrowUpRight, 
  Phone, 
  Laptop, 
  Lock, 
  HelpCircle,
  Check
} from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget: string;
  details: string;
}

const projectCategories = [
  "Autonomous AI Agents",
  "Custom SaaS Platform",
  "AI E-Commerce Engine",
  "Full-Stack Web App",
  "Clinical Ops / Healthcare",
  "Other Bespoke Software"
];

const budgetRanges = [
  "₹35k - ₹60k (Launch)",
  "₹60k - ₹1.2L (Growth)",
  "₹1.2L+ (Enterprise Custom)",
  "$1,500 - $5,000+ (Global)"
];

const faqs = [
  { 
    q: "How fast do you typically deliver an MVP or custom software?", 
    a: "Core MVPs and AI workflow automations typically ship in 10 to 14 days. Comprehensive enterprise platforms, custom SaaS, and complex e-commerce engines usually span 3 to 6 weeks with clear weekly staging milestone demos." 
  },
  { 
    q: "Who will actually architect and write my codebase?", 
    a: "100% of the engineering and system architecture is handled directly by our senior in-house engineering team in Kolkata, led personally by Founder & Lead Architect Mehedi Hasan. We never subcontract to junior interns or offshore mills." 
  },
  { 
    q: "What is your milestone and payment structure?", 
    a: "We operate on transparent, deterministic milestone billing (typically 40% initiation, 30% alpha staging milestone, and 30% final production cutover). Once the scope is locked, your quote is 100% fixed with zero hidden hourly fees." 
  },
  { 
    q: "Do you offer post-launch warranties and support?", 
    a: "Yes. Every deployment includes 30 to 90 days of complimentary priority bug-fix warranty, automated database backup configurations, and full CI/CD deployment handover. We also offer monthly maintenance retainers." 
  },
  { 
    q: "Can you integrate with our existing databases, ERPs, or Shopify?", 
    a: "Absolutely. We build custom real-time bidirectional synchronization pipelines connecting Next.js, Supabase, PostgreSQL, Shopify API, REST/GraphQL microservices, and WhatsApp Business webhooks." 
  },
  { 
    q: "How do you handle intellectual property (IP) and NDAs?", 
    a: "You retain 100% ownership of all source code, design assets, and database schemas from day one. We gladly sign mutual non-disclosure agreements (NDAs) prior to in-depth technical discovery." 
  }
];

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(projectCategories[0]);
  const [selectedBudget, setSelectedBudget] = useState<string>(budgetRanges[1]);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    defaultValues: {
      projectType: projectCategories[0],
      budget: budgetRanges[1]
    }
  });

  const copyEmail = () => {
    navigator.clipboard.writeText("stovamedia@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      const payload = {
        ...data,
        projectType: selectedCategory || data.projectType,
        budget: selectedBudget || data.budget
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Unable to send inquiry. Please reach us directly on WhatsApp at +91 9432053261.");
      }
    } catch {
      alert("Unable to send inquiry. Please reach us directly on WhatsApp at +91 9432053261.");
    }
  };

  return (
    <main className="pt-28 md:pt-36 min-h-screen bg-[#05070D] text-[#F8FAFC]">
      {/* 1. HERO SECTION */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 mb-16 md:mb-24 flex flex-col items-center text-center relative overflow-hidden">
        <div 
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] md:w-[1000px] h-[450px] rounded-full blur-[140px] opacity-25 z-0"
          style={{ background: "radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(6, 182, 212, 0.25) 50%, transparent 75%)" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-indigo-500/40 bg-[#0B0F19]/90 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="text-xs uppercase font-ui tracking-wider font-semibold text-cyan-300">
              Direct Founder Intake · &lt; 4-Hour Response SLA · Kolkata &amp; Worldwide
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.04] tracking-tight text-[#F8FAFC]">
            Let&apos;s Build Your{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Next Project.
            </span>
          </h1>

          <p className="mt-6 text-slate-300 font-ui text-base sm:text-xl max-w-2xl leading-relaxed font-light">
            Tell us about your website, app idea, or business goals. You will receive a clear roadmap, estimated timeline, and fixed quote directly from our lead engineer.
          </p>
        </div>
      </section>

      {/* 2. MAIN WORKSPACE GRID: FORM & DIRECT DOSSIER */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1400px] mx-auto mb-24 md:mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <SpotlightCard
              spotlightColor="rgba(99, 102, 241, 0.18)"
              className="p-7 sm:p-10 md:p-12 border-slate-800 bg-[#0B0F19]/90 backdrop-blur-xl rounded-xs shadow-2xl relative"
            >
              {!submitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-cyan-400" />
                      <span className="font-display font-bold text-sm sm:text-base text-[#F8FAFC]">
                        Project Intake &amp; Architecture Brief
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">STEP 1 OF 1</span>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider font-bold text-slate-300 mb-2">
                        Your Name *
                      </label>
                      <input 
                        type="text"
                        placeholder="e.g. Alex Rivera"
                        {...register("name", { required: "Name is required" })}
                        className={cn(
                          "w-full px-4 py-3.5 bg-[#05070D] border rounded-xs font-ui text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors",
                          errors.name ? "border-rose-500/60" : "border-slate-800 focus:border-cyan-500/60"
                        )}
                      />
                      {errors.name && <p className="text-[11px] text-rose-400 mt-1 font-mono">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider font-bold text-slate-300 mb-2">
                        Work Email *
                      </label>
                      <input 
                        type="email"
                        placeholder="alex@company.com"
                        {...register("email", { 
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                        })}
                        className={cn(
                          "w-full px-4 py-3.5 bg-[#05070D] border rounded-xs font-ui text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors",
                          errors.email ? "border-rose-500/60" : "border-slate-800 focus:border-cyan-500/60"
                        )}
                      />
                      {errors.email && <p className="text-[11px] text-rose-400 mt-1 font-mono">{errors.email.message}</p>}
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider font-bold text-slate-300 mb-2">
                        Phone / WhatsApp (Recommended)
                      </label>
                      <input 
                        type="tel"
                        placeholder="+91 98765 43210 or +1..."
                        {...register("phone")}
                        className="w-full px-4 py-3.5 bg-[#05070D] border border-slate-800 rounded-xs font-ui text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider font-bold text-slate-300 mb-2">
                        Company / Organization
                      </label>
                      <input 
                        type="text"
                        placeholder="e.g. Apex Health or Stova Labs"
                        {...register("company")}
                        className="w-full px-4 py-3.5 bg-[#05070D] border border-slate-800 rounded-xs font-ui text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Category Selection */}
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider font-bold text-slate-300 mb-2.5">
                      What are you building? *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {projectCategories.map((cat, idx) => {
                        const isSelected = selectedCategory === cat;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(cat);
                              setValue("projectType", cat);
                            }}
                            className={cn(
                              "p-2.5 text-left text-xs font-ui rounded-xs border transition-all duration-200 flex items-center justify-between cursor-pointer",
                              isSelected 
                                ? "bg-indigo-950/70 border-indigo-500 text-cyan-300 shadow-[0_0_15px_rgba(99,102,241,0.25)] font-medium" 
                                : "bg-[#05070D] border-slate-800/90 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                            )}
                          >
                            <span className="truncate">{cat}</span>
                            {isSelected && <Check size={12} className="text-cyan-400 shrink-0 ml-1" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider font-bold text-slate-300 mb-2.5">
                      Target Budget Range *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {budgetRanges.map((bud, idx) => {
                        const isSelected = selectedBudget === bud;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setSelectedBudget(bud);
                              setValue("budget", bud);
                            }}
                            className={cn(
                              "p-2.5 text-center text-xs font-mono rounded-xs border transition-all duration-200 cursor-pointer",
                              isSelected 
                                ? "bg-cyan-950/60 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.25)]" 
                                : "bg-[#05070D] border-slate-800/90 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                            )}
                          >
                            {bud}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider font-bold text-slate-300 mb-2">
                      Project Scope, Requirements &amp; Goals *
                    </label>
                    <textarea 
                      rows={4}
                      placeholder="Share high-level details: current bottleneck, target launch date, existing tech stack, or links to references..."
                      {...register("details", { required: "Project details are required" })}
                      className={cn(
                        "w-full px-4 py-3.5 bg-[#05070D] border rounded-xs font-ui text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none leading-relaxed",
                        errors.details ? "border-rose-500/60" : "border-slate-800 focus:border-cyan-500/60"
                      )}
                    />
                    {errors.details && <p className="text-[11px] text-rose-400 mt-1 font-mono">{errors.details.message}</p>}
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full py-4 px-8 rounded-xs font-ui font-semibold text-sm tracking-wide text-white transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group shadow-lg cursor-pointer",
                        isSubmitting 
                          ? "bg-indigo-800/50 cursor-wait" 
                          : "bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:brightness-110 active:scale-[0.99]"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Transmitting Architecture Request...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                          <span>Submit Technical Brief · Receive Proposal</span>
                        </>
                      )}
                    </button>
                    <p className="text-center font-ui text-[11px] text-slate-400 mt-3 font-light">
                      🔒 No spam guaranteed. We treat your product ideas with strict commercial confidentiality.
                    </p>
                  </div>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-6 flex flex-col items-center text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                    <CheckCircle2 size={40} className="text-cyan-300" />
                  </div>

                  <div className="space-y-2">
                    <span className="px-3 py-1 text-xs font-mono uppercase bg-indigo-950/70 border border-indigo-500/40 text-cyan-300 rounded-xs">
                      Brief Logged Successfully
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#F8FAFC]">
                      We Have Received Your Architecture Request.
                    </h2>
                    <p className="font-ui text-sm sm:text-base text-slate-300 max-w-md mx-auto font-light leading-relaxed">
                      Founder &amp; Lead Architect Mehedi Hasan will personally review your brief and reply within 4 to 24 hours with an actionable technical plan.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                    <a 
                      href="https://wa.me/919432053261?text=Hi%20Mehedi%2C%20I%20just%20submitted%20a%20project%20inquiry%20on%20Stova%20Media%20website%20and%20wanted%20to%20connect%20directly."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 rounded-xs bg-emerald-500 hover:bg-emerald-400 text-[#05070D] font-ui font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      <MessageSquare size={15} />
                      <span>Instant WhatsApp Follow-Up</span>
                      <ArrowUpRight size={13} />
                    </a>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-6 py-3 rounded-xs border border-slate-800 bg-[#05070D] hover:border-slate-700 text-slate-300 font-ui text-xs transition-colors cursor-pointer"
                    >
                      Submit Another Requirement
                    </button>
                  </div>
                </motion.div>
              )}
            </SpotlightCard>
          </div>

          {/* Right Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.22)"
              className="p-6 sm:p-7 border-slate-800 bg-[#0B0F19]/90 backdrop-blur-md rounded-xs shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-400">
                    Studio Status: Available
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">2026 Q2/Q3</span>
              </div>

              <h4 className="font-display font-bold text-lg text-[#F8FAFC] mb-2">
                Accepting 2 New Production Deployments
              </h4>
              <p className="font-ui text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                To guarantee zero compromises and direct founder technical supervision, we maintain a strict concurrency limit on active client builds.
              </p>
            </SpotlightCard>

            <SpotlightCard
              spotlightColor="rgba(99, 102, 241, 0.18)"
              className="p-6 sm:p-8 border-slate-800 bg-[#0B0F19]/90 backdrop-blur-md rounded-xs space-y-6 shadow-xl"
            >
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs uppercase font-mono tracking-widest font-bold text-indigo-400 block mb-1">
                  Direct Line
                </span>
                <h3 className="font-display text-xl font-bold text-[#F8FAFC]">
                  Founder &amp; Engineering Contacts
                </h3>
              </div>

              <div className="space-y-4 font-ui text-sm">
                <a 
                  href="https://wa.me/919432053261?text=Hi%20Mehedi%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20Stova%20Media."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-slate-800/90 bg-[#05070D] rounded-xs flex items-center justify-between hover:border-emerald-500/50 transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xs bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Fastest Response (Instant)
                      </span>
                      <span className="font-display font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                        +91 9432053261 (WhatsApp)
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </a>

                <div className="p-4 border border-slate-800/90 bg-[#05070D] rounded-xs flex items-center justify-between hover:border-indigo-500/50 transition-all group">
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xs bg-indigo-950/60 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Official Inquiries
                      </span>
                      <a 
                        href="mailto:stovamedia@gmail.com"
                        className="font-display font-bold text-slate-100 hover:text-cyan-300 transition-colors block"
                      >
                        stovamedia@gmail.com
                      </a>
                    </div>
                  </div>
                  <button 
                    onClick={copyEmail}
                    title="Copy Email Address"
                    className="p-2 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {copiedEmail ? <Check size={16} className="text-cyan-400" /> : <Copy size={16} />}
                  </button>
                </div>

                <div className="p-4 border border-slate-800/90 bg-[#05070D] rounded-xs flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xs bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Studio Headquarters
                    </span>
                    <span className="font-display font-bold text-slate-100 block">
                      Kolkata, West Bengal, India
                    </span>
                    <span className="text-xs text-slate-400 font-light block mt-0.5">
                      Serving Global Clients (USA, UK, UAE, Bangladesh, India)
                    </span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* 3. ARCHITECTURAL FAQ ACCORDION */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1100px] mx-auto mb-24 md:mb-36">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel className="justify-center">Architecture FAQs</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#F8FAFC] mt-3">
            Clear Answers Before We Kick Off
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
    </main>
  );
}
