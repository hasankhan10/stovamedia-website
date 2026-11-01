"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  AlertCircle,
  Plane
} from "lucide-react";
import AILandingTimer from "./AILandingTimer";
import { trackEvent } from "@/lib/meta-pixel";

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

interface AILandingBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWhatsAppClick?: (url: string) => void;
  onRequestConfirm?: (action: () => void) => void;
}

export default function AILandingBookingModal({
  isOpen,
  onClose,
  onWhatsAppClick,
  onRequestConfirm
}: AILandingBookingModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    business: "",
    category: "Domestic & International Tours"
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isExpired, setIsExpired] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const businessInputRef = useRef<HTMLInputElement>(null);

  const validateField = (field: keyof FormData, val: string): string | undefined => {
    switch (field) {
      case "name":
        if (!val.trim()) return "অনুগ্রহ করে আপনার নামটি লিখুন।";
        if (val.trim().length < 2) return "নামটি অন্তত ২ অক্ষরের হতে হবে।";
        return undefined;
      case "phone": {
        const cleaned = val.replace(/[\s\-\+\(\)]/g, "");
        if (!cleaned) return "আপনার WhatsApp মোবাইল নম্বর প্রদান করুন।";
        if (cleaned.length < 10) return "সঠিক ১০ ডিজিটের মোবাইল নম্বর দিন।";
        return undefined;
      }
      case "business":
        if (!val.trim()) return "আপনার ট্রাভেল এজেন্সি বা বিজনেসের নাম দিন।";
        return undefined;
      default:
        return undefined;
    }
  };

  const validateAll = (data: FormData): FormErrors => {
    const errs: FormErrors = {};
    const nErr = validateField("name", data.name);
    if (nErr) errs.name = nErr;
    const pErr = validateField("phone", data.phone);
    if (pErr) errs.phone = pErr;
    const bErr = validateField("business", data.business);
    if (bErr) errs.business = bErr;
    return errs;
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
    window.addEventListener("stova_ailanding_booked_event", checkBooked);

    const startTime = sessionStorage.getItem("stova_ailanding_timer_10m");
    if (startTime && Math.floor((Date.now() - parseInt(startTime, 10)) / 1000) >= 600) {
      setIsExpired(true);
    }

    return () => window.removeEventListener("stova_ailanding_booked_event", checkBooked);
  }, []);

  const handleRefreshUnlock = () => {
    sessionStorage.setItem("stova_ailanding_timer_10m", String(Date.now()));
    window.location.reload();
  };

  const executeFormSubmission = async () => {
    if (isExpired || isBooked) return;
    setFormStatus("loading");

    const eventId = `ailanding_lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Trigger Meta Pixel 'Lead' event for Travel Agency landing page conversion tracking
    trackEvent("Lead", {
      content_name: "Travel Agency AI Platform",
      content_category: formData.category.trim() || "Travel & Tourism",
      value: 29999,
      currency: "INR",
    }, eventId);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: `${formData.phone.replace(/[^0-9]/g, "") || "lead"}@stovamedia.in`,
          company: formData.business.trim() || "Travel Agency",
          category: formData.category.trim() || "Travel & Tourism",
          projectType: "Travel Agency AI Website & Scrolling Animation",
          budget: "Pujo Offer Consultation Slot",
          details: `Phone/WhatsApp: ${formData.phone.trim()} | Agency: ${formData.business.trim()} | Category: ${formData.category.trim()}`,
          eventId,
          sourceUrl: "https://stovamedia.in/ailandingpage",
        })
      });
    } catch (err) {
      console.error("Booking error:", err);
    } finally {
      setIsBooked(true);
      setIsExpired(false);
      window.dispatchEvent(new Event("stova_ailanding_booked_event"));
      setFormStatus("success");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isExpired || isBooked) return;

    setTouched({
      name: true,
      phone: true,
      business: true,
      category: true
    });

    const validationErrors = validateAll(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.name && nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (validationErrors.phone && phoneInputRef.current) {
        phoneInputRef.current.focus();
      } else if (validationErrors.business && businessInputRef.current) {
        businessInputRef.current.focus();
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
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Box */}
      <div 
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.18)] z-10 flex flex-col font-['Hind_Siliguri',sans-serif] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full border border-slate-200 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-indigo-50/80 via-white to-cyan-50/80 border-b border-slate-100 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-[11px] font-bold uppercase tracking-wider font-ui rounded-full shadow-2xs mb-3">
            <Plane size={13} />
            <span>Travel Agency Special Offer</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
            আপনার <span className="text-green-700">ফ্রি কনসাল্টেশন স্লট</span> বুক করুন
          </h3>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
            সীমিত স্লট • পুজো অফার মাত্র এক সপ্তাহের জন্য। আপনার তথ্য দিন, আমরা সম্পূর্ণ সমাধান ও পরের ধাপ পরিষ্কার বুঝিয়ে দেবো।
          </p>

          {!isBooked && !isExpired && (
            <div className="mt-4">
              <AILandingTimer size="md" onExpire={() => setIsExpired(true)} />
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* State 1: Expired Notice */}
          {isExpired && !isBooked && (
            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-3">
              <AlertCircle size={32} className="text-rose-500 mx-auto" />
              <h4 className="text-lg font-bold text-rose-900">এই সেশনের সময় সমাপ্ত হয়েছে</h4>
              <p className="text-xs sm:text-sm text-rose-700 font-medium">
                কোয়ালিটি বজায় রাখতে সীমিত স্লট রাখা হয়েছে। আপনি পুনরায় আনলক করতে নিচের বাটনে ক্লিক করুন।
              </p>
              <button
                onClick={handleRefreshUnlock}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
              >
                স্লট পুনরায় আনলক করুন
              </button>
            </div>
          )}

          {/* State 2: Success Confirmation */}
          {isBooked ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-emerald-950">
                🎉 আপনার স্লট বুকিং সফল হয়েছে!
              </h4>
              <p className="text-sm sm:text-base text-emerald-800 leading-relaxed font-medium">
                ধন্যবাদ! Stova Media-র টিম আপনার সাথে যোগাযোগ করে আপনার ট্রাভেল বিজনেসের উপযোগী রোডম্যাপ ও পরবর্তী ধাপ জানিয়ে দেবে।
              </p>

              <div className="pt-2">
                <a
                  href="https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20claim%20a%20Free%20Consultation%20Slot%20for%20Travel%20Business"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    const url = "https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20claim%20a%20Free%20Consultation%20Slot%20for%20Travel%20Business";
                    if (onWhatsAppClick) {
                      e.preventDefault();
                      onWhatsAppClick(url);
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base rounded-2xl shadow-md transition"
                >
                  <MessageSquare size={18} />
                  <span>সরাসরি WhatsApp-এ কথা বলুন</span>
                </a>
              </div>
            </div>
          ) : (
            /* State 3: Booking Form */
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  আপনার নাম <span className="text-rose-500">*</span>
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  placeholder="যেমন: রাহুল ব্যানার্জী"
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-none focus:bg-white transition ${
                    errors.name ? "border-rose-400 bg-rose-50/30" : "border-slate-200 focus:border-indigo-500"
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.name}</p>}
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  WhatsApp মোবাইল নম্বর <span className="text-rose-500">*</span>
                </label>
                <input
                  ref={phoneInputRef}
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  placeholder="যেমন: 98765 43210"
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-none focus:bg-white transition ${
                    errors.phone ? "border-rose-400 bg-rose-50/30" : "border-slate-200 focus:border-indigo-500"
                  }`}
                />
                {errors.phone && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.phone}</p>}
              </div>

              {/* Agency Name */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  ট্রাভেল এজেন্সি / ব্যবসার নাম <span className="text-rose-500">*</span>
                </label>
                <input
                  ref={businessInputRef}
                  type="text"
                  value={formData.business}
                  onChange={(e) => handleChange("business", e.target.value)}
                  onBlur={() => handleBlur("business")}
                  placeholder="যেমন: রূপসী বাংলা ট্রাভেলস / বেঙ্গল হলিডেজ"
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-none focus:bg-white transition ${
                    errors.business ? "border-rose-400 bg-rose-50/30" : "border-slate-200 focus:border-indigo-500"
                  }`}
                />
                {errors.business && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.business}</p>}
              </div>

              {/* Tour Focus Selection */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  প্যাকেজ ক্যাটাগরি
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition font-medium"
                >
                  <option value="Domestic & International Tours">উভয়ই — Domestic ও International প্যাকেজ</option>
                  <option value="Domestic Tour Specialist">শুধুমাত্র ডমেস্টিক প্যাকেজ (দার্জিলিং, কাশ্মীর, গোয়া, কেরল ইত্যাদি)</option>
                  <option value="International Tour Specialist">শুধুমাত্র ইন্টারন্যাশনাল প্যাকেজ (দুবাই, থাইল্যান্ড, বালি ইত্যাদি)</option>
                  <option value="Custom & Weekend Trips">কাস্টম ও উইকএন্ড ট্যুর</option>
                </select>
              </div>

              {/* Trust badge */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                <span>আপনার তথ্যের সম্পূর্ণ গোপনীয়তা বজায় রাখা হবে। কোনো স্প্যাম নেই।</span>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={formStatus === "loading" || isExpired}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 disabled:opacity-50 text-white font-bold text-base tracking-wide rounded-2xl shadow-[0_4px_25px_rgba(99,102,241,0.35)] hover:shadow-[0_8px_35px_rgba(6,182,212,0.45)] transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                {formStatus === "loading" ? (
                  <span>স্লট বুকিং প্রসেস হচ্ছে...</span>
                ) : (
                  <>
                    <span>আপনার স্লট বুক করুন</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
