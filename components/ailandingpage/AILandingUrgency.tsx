"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticElement, SpotlightCard } from "@/components/ui";
import { CheckCircle2, ShieldCheck, Award, Clock, Flame } from "lucide-react";
import AILandingTimer from "./AILandingTimer";

gsap.registerPlugin(ScrollTrigger);

const travelDeliverables = [
  { title: "Cinematic Motion Website", desc: "কাস্টমার স্ক্রোল করলেই প্রতিটি পাহাড়, সমুদ্র বা জঙ্গল প্যাকেজ জীবন্ত হয়ে ফুটে ওঠে।" },
  { title: "24/7 Travel AI Booking Assistant", desc: "রাত ৩টাতেও কাস্টমারকে সঠিক প্যাকেজ, বাজেট ও গাড়ির তথ্য দিয়ে বুকিং সাহায্য করে।" },
  { title: "Integrated Hotel, Car & Itinerary", desc: "দিনভিত্তিক ট্রিপ শিডিউল, হোটেল ও গাড়ির সম্পূর্ণ বিবরণ কাস্টমারের চোখের সামনে।" },
  { title: "1-Click Direct WhatsApp Lead Engine", desc: "পছন্দের প্যাকেজ সিলেক্ট করলেই আপনার ফোনে সাথে সাথে সিট কনফার্মেশন অ্যালার্ট।" },
  { title: "Travel Google SEO Optimization", desc: "আপনার জেলার ট্যুরিস্টরা গুগলে সার্চ করলেই যাতে আপনার এজেন্সি সবার আগে আসে।" },
  { title: "৩ মাসের Priority Technical Support", desc: "ওয়েবসাইট লঞ্চের পর ৩ মাস সার্বক্ষণিক টেকনিক্যাল সাপোর্ট, মেনটেনেন্স ও টিউনিং।" },
];

export default function AILandingUrgency({ onBookClick }: { onBookClick: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const handleBooked = () => setIsBooked(true);
    window.addEventListener("stova_ailanding_booked_event", handleBooked);
    return () => window.removeEventListener("stova_ailanding_booked_event", handleBooked);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        ".urgency-card-wrap",
        { scale: 0.95, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        ".urgency-card-wrap",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 750px" }}
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-20 bg-slate-50/90 relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-[1300px] mx-auto">
        <div className="urgency-card-wrap">
          <SpotlightCard 
            spotlightColor="rgba(99, 102, 241, 0.08)"
            className="p-6 sm:p-10 md:p-14 lg:p-20 border-slate-200/90 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] relative rounded-3xl"
          >
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 text-white text-xs sm:text-sm font-bold uppercase tracking-widest font-ui mb-5 shadow-xs rounded-full">
                <Flame size={14} className="animate-bounce" />
                <span>Urgency • কেন এখনই</span>
              </div>

              <h2 className="font-['Anek_Bangla','Amar_Bangla',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
                সারা বছরের সবচেয়ে বড়{" "}
                <span className="text-green-700">booking season</span>{" "}
                <span className="text-rose-600">এখনই শুরু</span>{" "}
                <span className="text-red-500">!!!</span>
              </h2>

              <div className="font-['Noto_Sans_Bengali','Noto_Sans',sans-serif] text-slate-600 text-base sm:text-xl md:text-2xl mt-5 font-medium leading-relaxed space-y-3">
                <p>
                  পুজো তো চলে গেছে। কিন্তু সারা বছরের সবচেয়ে বড় বুকিং মরশুম এখনই শুরু —{" "}
                  <strong className="text-indigo-700 font-bold">ভাইফোঁটা</strong>, তারপর{" "}
                  <strong className="text-cyan-700 font-bold">শীত</strong> আর{" "}
                  <strong className="text-emerald-700 font-bold">Christmas-New Year</strong>।
                </p>
                <p className="text-sm sm:text-lg md:text-xl text-slate-700">
                  এই সময় customer সবচেয়ে বেশি <strong className="text-blue-600 font-bold">Google</strong> করে। এখন যদি আপনার <strong className="text-rose-600 font-bold underline decoration-rose-300 underline-offset-4">online presence</strong> ঠিক না থাকে, এই season-এর booking-ও চলে যাবে <span className="text-red-500 font-bold">competitor-এর কাছে</span>।
                </p>
                <p className="text-xs sm:text-base md:text-lg text-slate-500 font-normal">
                  আর এই <span className="text-green-700 font-semibold">পুজো অফার শুধুমাত্র এক সপ্তাহের জন্য</span>। কাজের মান ধরে রাখতে আমরা মাত্র কিছু <span className="text-indigo-600 font-semibold">সীমিত প্রজেক্ট</span> নিয়েই কাজ করি — তাই <span className="text-red-600 font-bold">স্লট শেষ হলে অফারও শেষ</span>।
                </p>
              </div>
            </div>

            {/* Deliverables Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-14">
              {travelDeliverables.map((item, i) => (
                <div key={i} className="p-6 sm:p-7 bg-slate-50/80 border border-slate-200 flex items-start gap-4 hover:border-indigo-300 hover:bg-white transition-all rounded-2xl shadow-2xs">
                  <CheckCircle2 size={22} className="text-cyan-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg md:text-xl mb-1.5">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Guarantees Banner */}
            <div className="p-6 sm:p-9 bg-gradient-to-r from-indigo-50/70 via-slate-50/50 to-cyan-50/70 border border-indigo-200 mb-10 sm:mb-12 grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-9 items-center rounded-2xl shadow-xs">
              <div className="flex items-start gap-4">
                <ShieldCheck size={36} className="text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">১০০% নো-রিস্ক ডেভেলপমেন্ট গ্যারান্টি</h4>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                    Website সম্পূর্ণ তৈরি হয়ে আপনার <span className="font-semibold text-emerald-700">Approval</span> না পাওয়া পর্যন্ত Final Payment করতে হবে না।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t md:border-t-0 md:border-l border-indigo-200/80 pt-6 md:pt-0 md:pl-8">
                <Award size={36} className="text-cyan-700 flex-shrink-0" />
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">প্রমাণিত ইন্ডাস্ট্রিয়াল অভিজ্ঞতা</h4>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                    আমাদের টিমের Experience-এর মধ্যে রয়েছে খ্যাতনামা <strong className="text-rose-600 font-bold">Dr. Paul&apos;s</strong>-এর প্রফেশনাল Software Development ও লং-টার্ম Maintenance।
                  </p>
                </div>
              </div>
            </div>

            {/* Action Area with Countdown Timer */}
            <div className="text-center flex flex-col items-center">
              {!isBooked && (
                <div className="mb-6 w-full max-w-md sm:max-w-lg mx-auto">
                  <AILandingTimer size="lg" />
                </div>
              )}

              {/* Scarcity Line */}
              <div className="my-6 px-6 py-4 rounded-2xl bg-indigo-50 border border-indigo-200 shadow-xs max-w-3xl mx-auto flex items-center justify-center gap-3 text-center">
                <Clock size={22} className="text-indigo-600 flex-shrink-0 animate-pulse" />
                <span className="text-base sm:text-lg md:text-xl font-medium text-indigo-950 leading-relaxed">
                  {isBooked
                    ? "✓ আপনার কনসাল্টেশন স্লট নিশ্চিত করা হয়েছে। ধন্যবাদ!"
                    : "পুজো অফার মাত্র এক সপ্তাহের জন্য। কাজের মান ধরে রাখতে মাত্র কিছু সীমিত প্রজেক্ট নেওয়া হবে।"}
                </span>
              </div>

              <MagneticElement className="w-full sm:w-auto">
                <button 
                  onClick={onBookClick} 
                  className="w-full sm:w-auto px-9 sm:px-12 py-5 text-sm sm:text-base md:text-lg font-bold tracking-wider bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-[0_4px_25px_rgba(99,102,241,0.35)] hover:shadow-[0_8px_35px_rgba(6,182,212,0.45)] transition-all duration-300 cursor-pointer min-h-[52px] rounded-2xl active:scale-[0.98]"
                >
                  {isBooked ? "বুকিং স্ট্যাটাস দেখুন" : "আপনার Travel Business-এর জন্য স্লট বুক করুন →"}
                </button>
              </MagneticElement>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
