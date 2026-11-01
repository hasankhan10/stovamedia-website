"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Check,
  Zap,
  Hotel,
  Car,
  Clock
} from "lucide-react";
import { TravelPackageDemo } from "./types";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  packages?: TravelPackageDemo[];
}

const DEMO_PACKAGES: Record<string, TravelPackageDemo[]> = {
  darjeeling: [
    {
      id: "darj-1",
      name: "Darjeeling & Mirik Scenic Escape",
      duration: "3 Nights / 4 Days",
      price: 8499,
      oldPrice: 10999,
      badge: "Winter Bestseller",
      desc: "Tiger Hill sunrise, Batasia Loop, Rock Garden ও Mirik Lake দর্শন সহ কমপ্লিট আরামদায়ক ট্যুর।",
      hotel: "3-Star Deluxe Hotel (Mall Road View)",
      transport: "Dedicated Private Innova / Sumo",
      itinerary: ["Day 1: NJP to Darjeeling transfer", "Day 2: 7-Point Sightseeing + Tiger Hill", "Day 3: Mirik Day Excursion & Pashupati", "Day 4: Departure via Kurseong"]
    }
  ],
  kashmir: [
    {
      id: "kash-1",
      name: "Kashmir Paradise Snow Valley Tour",
      duration: "5 Nights / 6 Days",
      price: 18500,
      oldPrice: 22999,
      badge: "Trending Season",
      desc: "Srinagar Dal Lake Shikara ride, Gulmarg Gondola, Pahalgam Betaab Valley ও Sonmarg গ্লেসিয়ার ট্যুর।",
      hotel: "Dal Lake Houseboat (1N) + 4-Star Resort (4N)",
      transport: "Exclusive Sanitized Sedan / SUV",
      itinerary: ["Day 1: Srinagar Arrival & Shikara", "Day 2: Gulmarg Gondola Ride", "Day 3-4: Pahalgam & Betaab Valley", "Day 5: Sonmarg Day Trip", "Day 6: Airport Drop"]
    }
  ],
  dooars: [
    {
      id: "dooars-1",
      name: "Dooars Wildlife & Jungle Safari",
      duration: "2 Nights / 3 Days",
      price: 6200,
      oldPrice: 7999,
      badge: "Family Favorite",
      desc: "Gorumara National Park, Jaldapara Elephant Safari ও Murti River সূর্যাস্ত।",
      hotel: "Forest Eco Resort (Jungle Facing)",
      transport: "Private Car + Jungle Safari Gypsy",
      itinerary: ["Day 1: Hasimara/Malbazar to Resort + Murti", "Day 2: Morning Jungle Safari & Watchtower", "Day 3: Tea Garden Walk & Return"]
    }
  ]
};

export default function AILandingChatbotDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "নমস্কার! 🙏 আমি Stova Travel AI Assistant। আপনার কাস্টমার যেকোনো সময় প্যাকেজ, গাড়ি, হোটেল বা বাজেট নিয়ে জিজ্ঞেস করলেই আমি ২৪ ঘণ্টা এভাবে ঠিকঠাক উত্তর দিয়ে বুকিং সাহায্য করি।\n\nআপনি একটি অপশন বেছে নিয়ে দেখুন কিভাবে কাস্টমারকে সার্ভিস দেওয়া হয়:",
      timestamp: "এখন"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const msgCounter = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendPrompt = (promptText: string, pkgKey: string) => {
    if (isTyping) return;

    msgCounter.current += 1;
    const userMsg: Message = {
      id: `u-${msgCounter.current}`,
      sender: "user",
      text: promptText,
      timestamp: "এইমাত্র"
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      msgCounter.current += 1;
      const selectedPkgs = DEMO_PACKAGES[pkgKey] || DEMO_PACKAGES.darjeeling;
      const aiReply: Message = {
        id: `ai-${msgCounter.current}`,
        sender: "ai",
        text: `অসাধারণ চয়েস! এই মরশুমের জন্য সেরা প্যাকেজের বিবরণ নিচে দেওয়া হলো — হোটেল, গাড়ি, দিনভিত্তিক শিডিউল ও অফার প্রাইস সহ:`,
        timestamp: "এইমাত্র",
        packages: selectedPkgs
      };

      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 850);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const val = input.toLowerCase();
    let key = "darjeeling";
    if (val.includes("kashmir") || val.includes("কাশ্মীর") || val.includes("বরফ")) {
      key = "kashmir";
    } else if (val.includes("dooars") || val.includes("ডুয়ার্স") || val.includes("জঙ্গল") || val.includes("safari")) {
      key = "dooars";
    }

    const currentInput = input;
    setInput("");
    handleSendPrompt(currentInput, key);
  };

  const handleConfirmSeat = (pkgName: string) => {
    msgCounter.current += 1;
    const confirmMsg: Message = {
      id: `ai-book-${msgCounter.current}`,
      sender: "ai",
      text: `🎉 "${pkgName}"-এর জন্য আপনার সিট রিকোয়েস্ট তৈরি হয়েছে! এজেন্সি ওনারের ফোনে সাথে সাথে নোটিফিকেশন পৌঁছে গেছে: "দাদা, ২টো seat confirm করুন।" 📞`,
      timestamp: "এইমাত্র"
    };
    setMessages((prev) => [...prev, confirmMsg]);
  };

  return (
    <div className="flex flex-col h-[520px] sm:h-[560px] bg-white font-['Hind_Siliguri',sans-serif]">
      {/* Top Header */}
      <div className="p-3.5 sm:p-4 bg-gradient-to-r from-indigo-700 via-indigo-600 to-cyan-600 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Bot size={20} className="text-white animate-pulse" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold leading-tight flex items-center gap-1.5">
              <span>Travel AI Assistant</span>
              <span className="px-1.5 py-0.5 text-[9px] bg-emerald-500 text-white rounded font-ui font-extrabold uppercase">
                24/7 Live
              </span>
            </h4>
            <p className="text-[11px] text-indigo-100 flex items-center gap-1">
              <span>Smart Booking Engine</span> • <span>২৪ ঘণ্টা অ্যাক্টিভ</span>
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="p-2 sm:p-2.5 bg-slate-50 border-b border-slate-200/80 flex items-center gap-1.5 overflow-x-auto text-[11px] sm:text-xs">
        <span className="text-slate-500 font-bold whitespace-nowrap pl-1 font-ui flex items-center gap-1">
          <Zap size={12} className="text-amber-500 fill-amber-500" />
          ট্রাই করুন:
        </span>
        <button
          onClick={() => handleSendPrompt("শীতের দার্জিলিং ৪ দিনের প্যাকেজ ও গাড়ির তথ্য দেখান", "darjeeling")}
          className="px-2.5 py-1 bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 text-slate-700 rounded-lg whitespace-nowrap transition cursor-pointer shadow-2xs font-medium"
        >
          🏔️ দার্জিলিং প্যাকেজ
        </button>
        <button
          onClick={() => handleSendPrompt("কাশ্মীর ট্যুর প্যাকেজ, হাউস বোট ও বাজেট কত?", "kashmir")}
          className="px-2.5 py-1 bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 text-slate-700 rounded-lg whitespace-nowrap transition cursor-pointer shadow-2xs font-medium"
        >
          ❄️ কাশ্মীর স্নো ট্যুর
        </button>
        <button
          onClick={() => handleSendPrompt("ডুয়ার্স জঙ্গল সাফারি ও রিসোর্ট প্যাকেজ", "dooars")}
          className="px-2.5 py-1 bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 text-slate-700 rounded-lg whitespace-nowrap transition cursor-pointer shadow-2xs font-medium"
        >
          🌿 ডুয়ার্স সাফারি
        </button>
      </div>

      {/* Chat Messages Log */}
      <div ref={scrollRef} className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[88%] sm:max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                m.sender === "user"
                  ? "bg-indigo-600 text-white rounded-br-xs shadow-sm font-medium"
                  : "bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs"
              }`}
            >
              <div className="whitespace-pre-line">{m.text}</div>

              {/* Travel Package Interactive Card Render */}
              {m.packages && (
                <div className="mt-3 space-y-3">
                  {m.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="p-3 bg-gradient-to-b from-indigo-50/60 to-white border border-indigo-200 rounded-xl space-y-2 text-slate-800"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full font-ui uppercase tracking-wider">
                            {pkg.badge}
                          </span>
                          <h5 className="font-bold text-sm text-slate-900 mt-1 leading-snug">
                            {pkg.name}
                          </h5>
                          <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                            <Clock size={12} className="text-cyan-600" />
                            {pkg.duration}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs text-slate-400 line-through">
                            ₹{pkg.oldPrice}
                          </span>
                          <div className="text-base font-extrabold text-emerald-600">
                            ₹{pkg.price}
                            <span className="text-[10px] font-normal text-slate-500">/জন</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                        {pkg.desc}
                      </p>

                      <div className="grid grid-cols-2 gap-1.5 text-[10px] pt-1 border-t border-slate-100 text-slate-600">
                        <div className="flex items-center gap-1 truncate">
                          <Hotel size={11} className="text-indigo-600 shrink-0" />
                          <span className="truncate">{pkg.hotel}</span>
                        </div>
                        <div className="flex items-center gap-1 truncate">
                          <Car size={11} className="text-indigo-600 shrink-0" />
                          <span className="truncate">{pkg.transport}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleConfirmSeat(pkg.name)}
                        className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition cursor-pointer"
                      >
                        <Check size={14} />
                        <span>১ ক্লিকেই সিট বুকিং রিকোয়েস্ট পাঠান</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-2xl rounded-bl-xs text-xs text-slate-500 w-fit shadow-xs">
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
            <span className="pl-1">প্যাকেজ ডিটেইলস প্রস্তুত হচ্ছে...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <form onSubmit={handleCustomSubmit} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="প্যাকেজ বা ট্যুর সম্পর্কে যেকোনো প্রশ্ন লিখুন..."
          className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl transition cursor-pointer shadow-sm active:scale-95"
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
