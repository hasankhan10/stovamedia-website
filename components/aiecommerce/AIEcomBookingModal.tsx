"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { CheckCircle2, MessageSquare, Send, Lock, RefreshCw, X, Sparkles, AlertCircle, Check } from "lucide-react";
import AIEcomTimer from "./AIEcomTimer";

interface AIEcomBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWhatsAppClick?: (url: string) => void;
  onRequestConfirm?: (onConfirm: () => void) => void;
}

interface FormData {
  name: string;
  phone: string;
  business: string;
  category: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  business?: string;
  category?: string;
}

const quickCategories = ["Fashion & Apparel", "Skincare & Beauty", "Electronics", "Jewelry", "Grocery & Organic", "D2C Brand"];

export default function AIEcomBookingModal({
  isOpen,
  onClose,
  onWhatsAppClick,
  onRequestConfirm
}: AIEcomBookingModalProps) {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success">("idle");
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  
  const [formData, setFormData] = useState<FormData>({ 
    name: "", 
    phone: "", 
    business: "", 
    category: "" 
  });
  
  const [touched, setTouched] = useState<{ [K in keyof FormData]?: boolean }>({});
  const [errors, setErrors] = useState<FormErrors>({});

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const businessInputRef = useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLInputElement>(null);

  const handleExpire = useCallback(() => setIsExpired(true), []);

  // Validation function
  const validateField = (field: keyof FormData, value: string): string | undefined => {
    const trimmed = value.trim();
    
    if (field === "name") {
      if (!trimmed) return "অনুগ্রহ করে আপনার পুরো নাম লিখুন।";
      if (trimmed.length < 2) return "নাম কমপক্ষে ২ অক্ষরের হতে হবে।";
      if (!/^[\p{L}\s.'-]+$/u.test(trimmed)) return "নামে শুধুমাত্র অক্ষর ব্যবহার করুন।";
    }

    if (field === "phone") {
      if (!trimmed) return "Phone বা WhatsApp নম্বর আবশ্যক।";
      const digits = trimmed.replace(/[^0-9]/g, "");
      if (digits.length < 10) return "কমপক্ষে ১০ ডিজিটের সঠিক মোবাইল নম্বর দিন।";
      if (digits.length > 15) return "নম্বরটি অতিরিক্ত দীর্ঘ (সর্বোচ্চ ১৫ ডিজিট)।";
    }

    if (field === "business") {
      if (trimmed && trimmed.length < 2) {
        return "ব্র্যান্ডের নাম কমপক্ষে ২ অক্ষরের হতে হবে।";
      }
    }

    if (field === "category") {
      if (!trimmed) return "বিজনেসের ক্যাটাগরি উল্লেখ করুন বা নির্বাচন করুন।";
      if (trimmed.length < 2) return "ক্যাটাগরি কমপক্ষে ২ অক্ষরের হতে হবে।";
    }

    return undefined;
  };

  const validateAll = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};
    const nameErr = validateField("name", data.name);
    if (nameErr) newErrors.name = nameErr;

    const phoneErr = validateField("phone", data.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const bizErr = validateField("business", data.business);
    if (bizErr) newErrors.business = bizErr;

    const catErr = validateField("category", data.category);
    if (catErr) newErrors.category = catErr;

    return newErrors;
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (field: keyof FormData, val: string) => {
    const updated = { ...formData, [field]: val };
    setFormData(updated);

    if (touched[field]) {
      const errorMsg = validateField(field, val);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
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
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: `${formData.phone.replace(/[^0-9]/g, "") || "lead"}@stovamedia.in`,
          company: formData.business.trim() || "N/A",
          category: formData.category.trim() || "General",
          projectType: "AI E-commerce Platform",
          budget: "Discovery Consultation",
          details: `Phone/WhatsApp: ${formData.phone.trim()} | Brand: ${formData.business.trim() || "N/A"} | Category: ${formData.category.trim() || "General"}`
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

    // Mark all as touched
    setTouched({
      name: true,
      phone: true,
      business: true,
      category: true
    });

    const validationErrors = validateAll(formData);
    setErrors(validationErrors);

    // If there are errors, focus the first invalid input
    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.name && nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (validationErrors.phone && phoneInputRef.current) {
        phoneInputRef.current.focus();
      } else if (validationErrors.business && businessInputRef.current) {
        businessInputRef.current.focus();
      } else if (validationErrors.category && categoryInputRef.current) {
        categoryInputRef.current.focus();
      }
      return;
    }

    if (onRequestConfirm) {
      onRequestConfirm(executeFormSubmission);
    } else {
      executeFormSubmission();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Content */}
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#0B0F19] border border-indigo-500/40 rounded-3xl shadow-[0_0_50px_rgba(99,102,241,0.25)] z-10 animate-in zoom-in-95 duration-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Glow ambient background */}
        <div 
          className="pointer-events-none absolute -top-24 -left-24 w-52 h-52 rounded-full opacity-30 z-0"
          style={{ background: "radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 70%)" }}
        />
        <div 
          className="pointer-events-none absolute -bottom-24 -right-24 w-52 h-52 rounded-full opacity-30 z-0"
          style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, transparent 70%)" }}
        />

        {/* Modal Header */}
        <div className="relative z-10 p-5 sm:p-6 sm:pb-4 border-b border-slate-800/80 flex items-start justify-between gap-4 bg-[#080C16]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-emerald-500/40 bg-emerald-950/40 text-emerald-400 text-xs font-semibold uppercase tracking-wider font-ui rounded-full mb-2">
              <Sparkles size={13} />
              <span>{isBooked ? "✓ Slot Reserved" : "Limited Intake (৩-৫ Brands/Month)"}</span>
            </div>
            <h2 className="font-['Anek_Bangla','Amar_Bangla',sans-serif] text-2xl sm:text-3xl font-bold text-[#F8FAFC] leading-snug">
              Free Consultation Appointment বুক করুন
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light font-['Noto_Sans_Bengali',sans-serif] mt-1">
              আপনার ব্যবসার জন্য কাস্টম AI Roadmap ও 30-min আর্কিটেক্ট ডিসকাশন
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2.5 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-full border border-slate-700/60 transition-colors cursor-pointer shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body with smooth scrolling */}
        <div className="relative z-10 p-5 sm:p-7 overflow-y-auto space-y-5">
          {!isBooked && (
            <div>
              <AIEcomTimer size="md" className="w-full" onExpire={handleExpire} />
            </div>
          )}

          {isBooked || formStatus === "success" ? (
            <div className="p-6 sm:p-8 bg-emerald-950/40 border border-emerald-500/50 text-center space-y-4 rounded-2xl shadow-[0_0_35px_rgba(16,185,129,0.2)]">
              <div className="w-14 h-14 rounded-full bg-emerald-900/50 border border-emerald-400/60 flex items-center justify-center mx-auto text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                <CheckCircle2 size={32} className="animate-bounce" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white font-['Hind_Siliguri',sans-serif]">
                ধন্যবাদ! আপনার কনসাল্টেশন স্লট সফলভাবে বুক করা হয়েছে।
              </h4>
              <p className="text-sm text-slate-300 font-light font-['Hind_Siliguri',sans-serif] leading-relaxed">
                আমাদের লিড আর্কিটেক্ট ও টেকনিক্যাল টিম খুব দ্রুত আপনার সাথে WhatsApp বা কলে সরাসরি যোগাযোগ করবে।
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
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
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-[#05070D] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all font-ui shadow-md rounded-xl"
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp-এ সরাসরি মেসেজ দিন</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all font-ui rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : isExpired ? (
            <div className="p-6 sm:p-8 bg-[#110A14] border border-rose-500/50 text-center space-y-4 rounded-2xl shadow-[0_0_35px_rgba(244,63,94,0.15)]">
              <div className="w-14 h-14 rounded-full bg-rose-950/60 border border-rose-500/50 flex items-center justify-center mx-auto text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                <Lock size={28} className="animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-lg sm:text-xl font-bold text-white font-['Hind_Siliguri',sans-serif]">
                  সময় সমাপ্ত! স্লট বুকিং সাময়িকভাবে লক হয়েছে
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-light font-['Hind_Siliguri',sans-serif] leading-relaxed max-w-md mx-auto">
                  সীমিত মাসিক ক্লায়েন্ট ইনটেক বজায় রাখতে ১০ মিনিটের উইন্ডো সমাপ্ত হলে ফর্ম লক হয়ে যায়।
                </p>
              </div>
              <div className="pt-2 flex flex-col gap-2.5 max-w-sm mx-auto">
                <button
                  onClick={handleRefreshUnlock}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer rounded-xl"
                >
                  <RefreshCw size={15} />
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
                  <MessageSquare size={15} />
                  <span>সরাসরি WhatsApp-এ যোগাযোগ করুন</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} noValidate className="space-y-4 font-sans text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Name Input */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-slate-300 uppercase tracking-wider text-[11px] sm:text-xs font-bold font-ui">
                      আপনার নাম <span className="text-cyan-400">*</span>
                    </label>
                    {touched.name && !errors.name && formData.name && (
                      <span className="text-emerald-400 text-[10px] flex items-center gap-0.5 font-ui">
                        <Check size={12} /> Valid
                      </span>
                    )}
                  </div>
                  <input 
                    ref={nameInputRef}
                    type="text"
                    required
                    placeholder="e.g. Rahul Sen" 
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={`w-full px-3.5 py-3 bg-[#05070D] border ${
                      touched.name && errors.name 
                        ? "border-rose-500/80 bg-rose-950/20 text-white focus:border-rose-400 focus:ring-1 focus:ring-rose-500/30" 
                        : touched.name && !errors.name && formData.name
                          ? "border-emerald-500/60 focus:border-emerald-400"
                          : "border-slate-800 text-white focus:border-cyan-400"
                    } placeholder:text-slate-600 focus:outline-none text-sm transition-colors rounded-xl min-h-[44px]`}
                  />
                  {touched.name && errors.name && (
                    <p className="text-xs text-rose-400 flex items-center gap-1 mt-1.5 font-['Hind_Siliguri',sans-serif]">
                      <AlertCircle size={13} className="shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* 2. Phone / WhatsApp Input */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-slate-300 uppercase tracking-wider text-[11px] sm:text-xs font-bold font-ui">
                      Phone / WhatsApp Number <span className="text-cyan-400">*</span>
                    </label>
                    {touched.phone && !errors.phone && formData.phone && (
                      <span className="text-emerald-400 text-[10px] flex items-center gap-0.5 font-ui">
                        <Check size={12} /> Valid
                      </span>
                    )}
                  </div>
                  <input 
                    ref={phoneInputRef}
                    type="tel"
                    required
                    placeholder="+91 98765 43210" 
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    className={`w-full px-3.5 py-3 bg-[#05070D] border ${
                      touched.phone && errors.phone 
                        ? "border-rose-500/80 bg-rose-950/20 text-white focus:border-rose-400 focus:ring-1 focus:ring-rose-500/30" 
                        : touched.phone && !errors.phone && formData.phone
                          ? "border-emerald-500/60 focus:border-emerald-400"
                          : "border-slate-800 text-white focus:border-cyan-400"
                    } placeholder:text-slate-600 focus:outline-none text-sm transition-colors rounded-xl min-h-[44px]`}
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-xs text-rose-400 flex items-center gap-1 mt-1.5 font-['Hind_Siliguri',sans-serif]">
                      <AlertCircle size={13} className="shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* 3. Business / Brand Name Input */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-slate-300 uppercase tracking-wider text-[11px] sm:text-xs font-bold font-ui">
                      Business / Brand Name <span className="text-slate-500 text-[10px] font-normal">(Optional)</span>
                    </label>
                    {touched.business && !errors.business && formData.business && (
                      <span className="text-emerald-400 text-[10px] flex items-center gap-0.5 font-ui">
                        <Check size={12} /> Valid
                      </span>
                    )}
                  </div>
                  <input 
                    ref={businessInputRef}
                    type="text"
                    placeholder="e.g. MyBrand D2C" 
                    value={formData.business}
                    onChange={(e) => handleChange("business", e.target.value)}
                    onBlur={() => handleBlur("business")}
                    className={`w-full px-3.5 py-3 bg-[#05070D] border ${
                      touched.business && errors.business 
                        ? "border-rose-500/80 bg-rose-950/20 text-white focus:border-rose-400 focus:ring-1 focus:ring-rose-500/30" 
                        : touched.business && !errors.business && formData.business
                          ? "border-emerald-500/60 focus:border-emerald-400"
                          : "border-slate-800 text-white focus:border-cyan-400"
                    } placeholder:text-slate-600 focus:outline-none text-sm transition-colors rounded-xl min-h-[44px]`}
                  />
                  {touched.business && errors.business && (
                    <p className="text-xs text-rose-400 flex items-center gap-1 mt-1.5 font-['Hind_Siliguri',sans-serif]">
                      <AlertCircle size={13} className="shrink-0" />
                      <span>{errors.business}</span>
                    </p>
                  )}
                </div>

                {/* 4. Business Category Input */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-slate-300 uppercase tracking-wider text-[11px] sm:text-xs font-bold font-ui">
                      Business Category <span className="text-cyan-400">*</span>
                    </label>
                    {touched.category && !errors.category && formData.category && (
                      <span className="text-emerald-400 text-[10px] flex items-center gap-0.5 font-ui">
                        <Check size={12} /> Valid
                      </span>
                    )}
                  </div>
                  <input 
                    ref={categoryInputRef}
                    type="text"
                    required
                    placeholder="e.g. Fashion, Skincare, Jewelry..." 
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    onBlur={() => handleBlur("category")}
                    className={`w-full px-3.5 py-3 bg-[#05070D] border ${
                      touched.category && errors.category 
                        ? "border-rose-500/80 bg-rose-950/20 text-white focus:border-rose-400 focus:ring-1 focus:ring-rose-500/30" 
                        : touched.category && !errors.category && formData.category
                          ? "border-emerald-500/60 focus:border-emerald-400"
                          : "border-slate-800 text-white focus:border-cyan-400"
                    } placeholder:text-slate-600 focus:outline-none text-sm transition-colors rounded-xl min-h-[44px]`}
                  />
                  {touched.category && errors.category && (
                    <p className="text-xs text-rose-400 flex items-center gap-1 mt-1.5 font-['Hind_Siliguri',sans-serif]">
                      <AlertCircle size={13} className="shrink-0" />
                      <span>{errors.category}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Quick Category Suggestion Tags */}
              <div className="pt-1">
                <span className="text-[11px] text-slate-400 font-ui block mb-1.5">Quick Select:</span>
                <div className="flex flex-wrap gap-1.5">
                  {quickCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        handleChange("category", cat);
                        setTouched((prev) => ({ ...prev, category: true }));
                        setErrors((prev) => ({ ...prev, category: undefined }));
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-ui transition-all border ${
                        formData.category === cat 
                          ? "bg-cyan-950/70 border-cyan-400/80 text-cyan-300 font-semibold shadow-sm"
                          : "bg-[#05070D] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 space-y-3">
                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full py-4 bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(99,102,241,0.4)] disabled:opacity-60 cursor-pointer min-h-[48px] rounded-xl active:scale-[0.99]"
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

                <div className="flex items-center justify-center">
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
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#25D366] hover:text-[#20bd5a] transition-colors font-medium font-ui py-1"
                  >
                    <MessageSquare size={15} />
                    <span>অথবা সরাসরি WhatsApp-এ কথা বলুন (+91 9432053261)</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
