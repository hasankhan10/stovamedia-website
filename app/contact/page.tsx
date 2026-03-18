"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { SplitHeadline, SectionLabel, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Mail, MapPin, Clock, MessageCircle, ChevronDown, CheckCircle2 } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  details: string;
}

const faqs = [
  { q: "What is your typical project timeline?", a: "MVP development usually takes 4-8 weeks. Complex enterprise platforms can range from 3-6 months depending on requirements." },
  { q: "Do you offer post-launch support?", a: "Every project comes with a 30-day bug-free guarantee. We also offer monthly maintenance retainers for long-term growth and scaling." },
  { q: "Can you build for low-bandwidth environments?", a: "Yes. Our roots are in clinical software for Indian clinics (2G optimization). We specifically architect for performance on slower networks." },
  { q: "How do we get started?", a: "Fill out the form. We'll review your project and get back to you within 24 hours to schedule a discovery call." },
  { q: "Are project quotes fixed?", a: "Once the scope is finalized, we provide fixed quotes. No surprise hourly billing. No hidden fees." },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="pt-32 min-h-screen bg-ink">
      <div className="px-6 md:px-10 lg:px-20 mb-32">
        <SectionLabel>Get In Touch</SectionLabel>
        <SplitHeadline tag="h1" className="text-5xl md:text-7xl lg:text-8xl leading-none">
          Let&apos;s build something serious.
        </SplitHeadline>
      </div>

      <div className="px-6 md:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-20 pb-40">
        
        {/* Left: Form */}
        <div>
          {!submitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <InputGroup label="Name*" register={register("name", { required: true })} error={errors.name} />
                <InputGroup label="Email*" type="email" register={register("email", { required: true, pattern: /^\S+@\S+$/i })} error={errors.email} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <InputGroup label="Company" register={register("company")} />
                <InputGroup label="Project Type*" register={register("projectType", { required: true })} error={errors.projectType} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <InputGroup label="Budget Range*" register={register("budget", { required: true })} error={errors.budget} />
                <InputGroup label="Details*" register={register("details", { required: true })} error={errors.details} />
              </div>

              <div className="pt-8">
                <Button variant="primary" type="submit" className="w-full md:w-fit px-12 py-5" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Start a Conversation"}
                </Button>
              </div>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="p-16 border border-gold/30 bg-gold-glow flex flex-col items-center text-center gap-6"
            >
              <CheckCircle2 size={64} className="text-gold" />
              <h2 className="font-display text-4xl">Message Received.</h2>
              <p className="font-ui text-muted max-w-sm">
                We&apos;ll review your project and get back to you personally within 24 hours. 
                Talk soon.
              </p>
            </motion.div>
          )}

          {/* FAQ Accordion */}
          <div className="mt-32">
            <h3 className="text-[12px] uppercase tracking-[0.3em] font-bold text-dim mb-12">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-border/50">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-8 flex justify-between items-center text-left group"
                  >
                    <span className="font-display text-xl group-hover:text-gold transition-colors">{faq.q}</span>
                    <ChevronDown className={cn("text-gold transition-transform duration-500", openFaq === i ? "rotate-180" : "")} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-sm text-dim max-w-2xl leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Info Sidebar */}
        <aside className="space-y-16">
          <div className="bg-card p-10 md:p-14 border border-border">
            <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-dim mb-10">Direct Reach</h3>
            <div className="space-y-10">
              <ContactInfo icon={Mail} label="Email" value="stovamedia@gmail.com" href="mailto:stovamedia@gmail.com" />
              <ContactInfo icon={MapPin} label="Studio Location" value="Kolkata, WB. India." />
              <ContactInfo icon={Clock} label="Average Response" value="Under 24 Hours" />
              <ContactInfo 
                 icon={MessageCircle} 
                 label="Direct Chat" 
                 value="WhatsApp: +91 9432053261" // Placeholder number
                 href="https://wa.me/919432053261"
                 active
              />
            </div>
          </div>

          <div className="bg-gold-glow p-10 border border-gold/10">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] uppercase font-bold text-green-500 tracking-widest">Available</span>
             </div>
             <p className="text-sm text-gold/80 font-ui leading-relaxed">
               We are currently accepting new projects for **April 2026** onwards. 
               Reach out today to secure your Slot.
             </p>
          </div>
        </aside>

      </div>
    </main>
  );
}

function InputGroup({ label, type = "text", register, error }: any) {
  return (
    <div className="relative group/field pb-4 border-b border-border/50 focus-within:border-gold transition-all duration-500">
      <div className="absolute left-0 bottom-0 h-[2px] w-full bg-gold scale-x-0 transition-transform duration-700 group-focus-within/field:scale-x-100" />
      <label className={cn("text-[9px] uppercase tracking-widest font-bold block mb-2 transition-all group-focus-within/field:text-gold", error ? "text-red-500" : "text-dim")}>
        {label}
      </label>
      <input 
        type={type} 
        {...register}
        autoComplete="off"
        className="w-full bg-transparent border-none outline-none font-display py-2 text-xl text-cream" 
      />
    </div>
  );
}

function ContactInfo({ icon: Icon, label, value, href, active }: any) {
  const content = (
    <div className="flex items-start gap-6 group cursor-pointer">
      <div className="w-12 h-12 border border-border flex items-center justify-center text-muted group-hover:border-gold group-hover:text-gold transition-all duration-500">
        <Icon size={20} />
      </div>
      <div>
        <span className="text-[9px] uppercase tracking-widest font-bold text-dim block mb-1">{label}</span>
        <span className={cn("text-lg font-display transition-colors", active ? "text-gold" : "text-cream hover:text-gold")}>{value}</span>
      </div>
    </div>
  );

  return href ? <a href={href}>{content}</a> : <div>{content}</div>;
}
