"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui";
import { CheckCircle2, MessageSquare, Send, Lock, RefreshCw } from "lucide-react";
import AIEcomTimer from "./AIEcomTimer";

interface AIEcomBookingProps {
  bookingRef: React.RefObject<HTMLDivElement | null>;
  onWhatsAppClick?: (url: string) => void;
  onRequestConfirm?: (onConfirm: () => void) => void;
}

export default function AIEcomBooking({ 
  bookingRef, 
  onWhatsAppClick, 
  onRequestConfirm 
}: AIEcomBookingProps) {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success">("idle");
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: "", phone: "", business: "", category: "" });

  const handleExpire = useCallback(() => setIsExpired(true), []);

  useEffect(() => {
    sessionStorage.removeItem("stova_aiecom_booked");

    const checkBooked = () => {
      setIsBooked(true);
      setIsExpired(false);
    };
    window.addEventListener("stova_aiecom_booked_event", checkBooked);

    const startTime = sessionStorage.getItem("stova_aiecom_timer_10m");
    if (startTime && Math.floor((Date.now() - parseInt(startTime, 10)) / 1000) >= 600) {
      setIsExpired(true);
    }

    return () => window.removeEventListener("stova_aiecom_booked_event", checkBooked);
  }, []);

  const handleRefreshUnlock = () => {
    sessionStorage.setItem("stova_aiecom_timer_10m", String(Date.now()));
    window.location.reload();
  };

  const executeFormSubmission = async () => {
    if (isExpired || isBooked) return;
    setFormStatus("loading");

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: `${formData.phone.replace(/[^0-9]/g, "") || "lead"}@stovamedia.in`,
          company: formData.business || "N/A",
          category: formData.category || "General",
          projectType: "AI E-commerce Platform",
          budget: "Discovery Consultation",
          details: `Phone/WhatsApp: ${formData.phone} | Brand: ${formData.business || "N/A"} | Category: ${formData.category || "General"}`
        })
      });
    } catch (err) {
      console.error("Booking error:", err);
    } finally {
      setIsBooked(true);
      setIsExpired(false);
      window.dispatchEvent(new Event("stova_aiecom_booked_event"));
      setFormStatus("success");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isExpired || isBooked) return;
    if (onRequestConfirm) {
      onRequestConfirm(executeFormSubmission);
    } else {
      executeFormSubmission();
    }
  };

  return (
    <section 
      id="booking"
      ref={bookingRef} 
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 750px" }}
      className="pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 px-5 sm:px-8 md:px-12 lg:px-20 bg-[#070A12] relative z-10 overflow-hidden"
    >
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[450px] md:h-[550px] rounded-full opacity-20 z-0"
        style={{ background: "radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(6, 182, 212, 0.2) 60%, transparent 70%)" }}
      />

      <div className="max-w-[1250px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left: Value Proposition */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-emerald-500/40 bg-emerald-950/40 text-emerald-400 text-xs sm:text-sm font-semibold uppercase tracking-wider font-ui">
            {isBooked ? "✓ Slot Reserved for you" : "Limited Monthly Intake (৩-৫ Brands)"}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] text-[#F8FAFC]">
            আপনার Business-কে এবার একটা <span className="text-cyan-400">Real AI-Powered</span> Platform দিন
          </h2>

          <p className="text-slate-300 text-base sm:text-xl md:text-2xl leading-relaxed font-light">
            কোনো ঝুঁকি ছাড়াই, একটা Complete Premium Platform। প্রতি মাসে আমরা মাত্র ৩-৫টি ব্র্যান্ড নিয়ে সম্পূর্ণ ফোকাস দিয়ে কাজ করি — আপনার Slot শেষ হওয়ার আগেই যোগাযোগ করুন।
          </p>

          <div className="pt-2 sm:pt-4 space-y-3 font-ui text-sm sm:text-base text-slate-300">
            {[
              "ফ্রি ৩০ মিনিটের টেকনিক্যাল কনসাল্টেশন ও প্রজেক্ট এস্টিমেট",
              "আপনার Brand-এর জন্য ১০০% ফ্রি ও Actionable AI Growth Roadmap",
              "সরাসরি আমাদের সাথে কনসাল্টেশন"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-slate-200">
                <CheckCircle2 size={18} className="text-cyan-400 flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <a 
              href="https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20book%20a%20free%20consultation%20for%20AI%20E-commerce"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                const url = "https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20book%20a%20free%20consultation%20for%20AI%20E-commerce";
                if (onWhatsAppClick) {
                  e.preventDefault();
                  onWhatsAppClick(url);
                }
              }}
              className="inline-flex items-center gap-2.5 px-8 py-4.5 bg-[#25D366] hover:bg-[#20bd5a] text-[#05070D] font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(37,211,102,0.35)] min-h-[50px]"
            >
              <MessageSquare size={18} />
              <span>Direct WhatsApp Consultation</span>
            </a>
          </div>
        </div>

        {/* Right: Booking Form or States */}
        <div id="booking-form" className="lg:col-span-6 w-full scroll-mt-20 sm:scroll-mt-24">
          <SpotlightCard 
            spotlightColor="rgba(99, 102, 241, 0.2)"
            className="p-6 sm:p-9 md:p-11 border-slate-800 bg-[#0B0F19]/90 shadow-2xl rounded-3xl"
          >
            {!isBooked && (
              <div className="mb-6">
                <AIEcomTimer size="md" className="w-full" onExpire={handleExpire} />
              </div>
            )}

            {isBooked || formStatus === "success" ? (
              <div className="p-7 sm:p-10 bg-emerald-950/40 border border-emerald-500/50 text-center space-y-4 rounded-2xl shadow-[0_0_35px_rgba(16,185,129,0.2)]">
                <div className="w-16 h-16 rounded-full bg-emerald-900/50 border border-emerald-400/60 flex items-center justify-center mx-auto text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                  <CheckCircle2 size={36} className="animate-bounce" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white font-['Hind_Siliguri',sans-serif]">
                  ধন্যবাদ! আপনার কনসাল্টেশন স্লট সফলভাবে বুক করা হয়েছে।
                </h4>
                <p className="text-sm sm:text-base text-slate-300 font-light font-['Hind_Siliguri',sans-serif] leading-relaxed">
                  আমাদের লিড আর্কিটেক্ট ও টেকনিক্যাল টিম খুব দ্রুত আপনার সাথে WhatsApp বা কলে সরাসরি যোগাযোগ করবে।
                </p>
                <div className="pt-2">
                  <a 
                    href="https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20just%20submitted%20my%20booking%20on%20your%20website"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      const url = "https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20just%20submitted%20my%20booking%20on%20your%20website";
                      if (onWhatsAppClick) {
                        e.preventDefault();
                        onWhatsAppClick(url);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-[#05070D] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all font-ui shadow-md rounded-xl"
                  >
                    <MessageSquare size={16} />
                    <span>WhatsApp-এ সরাসরি মেসেজ দিন</span>
                  </a>
                </div>
              </div>
            ) : isExpired ? (
              <div className="p-7 sm:p-9 bg-[#110A14] border border-rose-500/50 text-center space-y-4 rounded-2xl shadow-[0_0_35px_rgba(244,63,94,0.15)] relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-rose-950/60 border border-rose-500/50 flex items-center justify-center mx-auto text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                  <Lock size={32} className="animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl sm:text-2xl font-bold text-white font-['Hind_Siliguri',sans-serif]">
                    সময় সমাপ্ত! স্লট বুকিং সাময়িকভাবে লক হয়েছে
                  </h4>
                  <p className="text-sm sm:text-base text-slate-300 font-light font-['Hind_Siliguri',sans-serif] leading-relaxed max-w-md mx-auto">
                    সীমিত মাসিক ক্লায়েন্ট ইনটেক বজায় রাখতে ১০ মিনিটের উইন্ডো সমাপ্ত হলে ফর্ম লক হয়ে যায়। নতুন স্লট বরাদ্দ করতে ও ফর্ম আনলক করতে পেজটি রিফ্রেশ করুন।
                  </p>
                </div>
                <div className="pt-2 flex flex-col gap-3 max-w-sm mx-auto">
                  <button
                    onClick={handleRefreshUnlock}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer rounded-xl"
                  >
                    <RefreshCw size={16} />
                    <span>পেজ রিফ্রেশ করে ফর্ম আনলক করুন</span>
                  </button>
                  <a
                    href="https://wa.me/919432053261?text=Hello%20Stova%20Media,%20My%20timer%20expired%20on%20the%20landing%20page,%20I%20want%20to%20claim%20a%20slot%20directly"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      const url = "https://wa.me/919432053261?text=Hello%20Stova%20Media,%20My%20timer%20expired%20on%20the%20landing%20page,%20I%20want%20to%20claim%20a%20slot%20directly";
                      if (onWhatsAppClick) {
                        e.preventDefault();
                        onWhatsAppClick(url);
                      }
                    }}
                    className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-[#05070D] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md font-ui rounded-xl"
                  >
                    <MessageSquare size={16} />
                    <span>সরাসরি WhatsApp-এ যোগাযোগ করুন</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-sm">
                {[
                  { label: "আপনার নাম *", key: "name", type: "text", req: true, placeholder: "e.g. Rahul Sen" },
                  { label: "Phone / WhatsApp Number *", key: "phone", type: "tel", req: true, placeholder: "+91 98765 43210" },
                  { label: "Business / Brand Name", key: "business", type: "text", req: false, placeholder: "e.g. MyBrand D2C" },
                  { label: "Business Category *", key: "category", type: "text", req: true, placeholder: "e.g. Fashion, Skincare, Electronics, Jewelry..." },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-slate-300 uppercase tracking-wider text-xs sm:text-sm font-bold mb-1.5 font-ui">
                      {f.label}
                    </label>
                    <input 
                      type={f.type} 
                      required={f.req}
                      placeholder={f.placeholder} 
                      value={formData[f.key as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                      className="w-full p-4 bg-[#05070D] border border-slate-800 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none text-base sm:text-sm transition-colors rounded-xl min-h-[48px]"
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full py-4.5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(99,102,241,0.4)] disabled:opacity-60 cursor-pointer min-h-[52px] rounded-xl"
                >
                  {formStatus === "loading" ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Free Consultation Confirm করুন</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </SpotlightCard>
        </div>
      </div>

      {/* Compact Clean Footer */}
      <div className="mt-8 sm:mt-10 pt-4 border-t border-slate-900/90 text-center text-xs text-slate-400 font-ui flex flex-col items-center gap-2.5">
        <Link href="/" className="group inline-flex items-center gap-2">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-300" />
            <Image 
              src="/logo.jpeg" 
              alt="Stova Media Logo" 
              width={160} 
              height={42} 
              className="relative h-8 sm:h-9 w-auto object-contain rounded-full border border-slate-700 shadow-sm" 
            />
          </div>
        </Link>
        <p className="text-[11px] sm:text-xs text-slate-500">
          © {new Date().getFullYear()} Stova Media • All Rights Reserved. Transforming E-Commerce with Intelligent AI Solutions.
        </p>
      </div>
    </section>
  );
}
