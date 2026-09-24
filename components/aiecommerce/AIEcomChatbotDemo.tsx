"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Sparkles,
  Send,
  Check,
  Zap,
  Star,
  ShoppingBag
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  tag: string;
  desc: string;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  products?: Product[];
}

const DEMO_PRODUCTS: Record<string, Product[]> = {
  skincare: [
    {
      id: "skin-1",
      name: "Hydra-Restore Eye Gel Serum",
      category: "Skincare",
      price: 899,
      oldPrice: 1299,
      rating: 4.9,
      reviews: 142,
      tag: "Best Seller",
      desc: "ক্যাফেইন ও নিয়াসিনামাইড সমৃদ্ধ লাইটওয়েট ফর্মুলা যা চোখের নিচের ডার্ক সার্কেল দূর করে এবং স্কিন ময়েশ্চারাইজ রাখে।"
    },
    {
      id: "skin-2",
      name: "Deep Glow Peptide Night Cream",
      category: "Skincare",
      price: 1199,
      oldPrice: 1599,
      rating: 4.8,
      reviews: 98,
      tag: "Top Rated",
      desc: "রাতভর স্কিন রিপেয়ার ও ডিপ হাইড্রেশনের জন্য অ্যাডভান্সড পেপটাইড কমপ্লেক্স।"
    }
  ],
  jacket: [
    {
      id: "jack-1",
      name: "AeroShield Waterproof Windbreaker",
      category: "Apparel",
      price: 1499,
      oldPrice: 2299,
      rating: 4.9,
      reviews: 215,
      tag: "Monsoon Special",
      desc: "১০০% ওয়াটারপ্রুফ, আল্ট্রা-লাইট ব্রিদেবল ফেব্রিক। বর্ষায় কিংবা ট্রাভেলে পরার জন্য সবচেয়ে আরামদায়ক।"
    }
  ],
  watch: [
    {
      id: "wat-1",
      name: "Obsidian Chrono Matte Black Watch",
      category: "Accessories",
      price: 1699,
      oldPrice: 2499,
      rating: 4.9,
      reviews: 310,
      tag: "Luxury Look",
      desc: "ম্যাট ব্ল্যাক স্টেইনলেস স্টিল স্ট্র্যাপ ও ওয়াটার-রেজিস্ট্যান্ট জাপানিজ কোয়ার্টজ মুভমেন্ট।"
    }
  ],
  gift: [
    {
      id: "gift-1",
      name: "Luxury Fragrance & Grooming Combo",
      category: "Gift Set",
      price: 1299,
      oldPrice: 1899,
      rating: 5.0,
      reviews: 86,
      tag: "Gift Ready",
      desc: "প্রিমিয়াম পারফিউম ও গ্রুমিং কিট বক্স — সাথে পাচ্ছেন ফ্রি কাস্টমাইজড গিফট কার্ড ও র‍্যাপিং।"
    }
  ]
};

const PRESET_PROMPTS = [
  { label: "🧴 ডার্ক সার্কেল ও ড্রাই স্কিন সল্যুশন", query: "আমার চোখের নিচের ডার্ক সার্কেল দূর করার জন্য এমন একটা ক্রিম লাগবে যেটা স্কিন ড্রাই করবে না।" },
  { label: "🧥 বর্ষার জন্য হালকা ওয়াটারপ্রুফ জ্যাকেট", query: "বর্ষায় পরার জন্য ওয়াটারপ্রুফ ও ব্রিদেবল হালকা জ্যাকেট দেখান।" },
  { label: "⌚ Under ₹2,000 প্রিমিয়াম ঘড়ি", query: "Under ₹2,000-এর মধ্যে প্রিমিয়াম লুকিং ওয়াচ কোনটা সেরা হবে?" },
  { label: "🎁 বাজেট-ফ্রেন্ডলি গিফট আইডিয়া", query: "ফ্রেন্ডের জন্য সুন্দর একটা বাজেট-ফ্রেন্ডলি গিফট কম্বো সাজেস্ট করুন।" }
];

interface AIEcomChatbotDemoProps {
  onClose?: () => void;
}

export default function AIEcomChatbotDemo({ onClose }: AIEcomChatbotDemoProps = {}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "user",
      text: "আমার চোখের নিচের ডার্ক সার্কেল দূর করার জন্য এমন একটা ক্রিম লাগবে যেটা স্কিন ড্রাই করবে না।",
      timestamp: "Just now"
    },
    {
      id: "msg-2",
      sender: "ai",
      text: "আপনার স্কিনের ময়েশ্চার ব্যালান্স ঠিক রেখে ডার্ক সার্কেল লাইট করার জন্য আমাদের সেরা ক্লিনিক্যালি-টেস্টেড প্রোডাক্টটি খুঁজে পেয়েছি:",
      timestamp: "Just now",
      products: [DEMO_PRODUCTS.skincare[0]]
    }
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [boughtIds, setBoughtIds] = useState<Record<string, boolean>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "auto"
      });
    }
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior
      });
    }
  };

  // On initial open / mount: always start scrolled at the TOP (top: 0) so the user reads the starting question first
  useEffect(() => {
    scrollToTop();
    const t1 = setTimeout(scrollToTop, 50);
    const t2 = setTimeout(scrollToTop, 150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // When user actively interacts / sends a message, smoothly follow new messages down
  const initialMountRef = useRef(true);
  useEffect(() => {
    if (initialMountRef.current) {
      initialMountRef.current = false;
      return;
    }
    scrollToBottom("smooth");
  }, [messages.length, isTyping]);

  const handleAddToCart = (product: Product) => {
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2500);
  };

  const handleSimulatedBuy = (product: Product) => {
    setBoughtIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setBoughtIds((prev) => ({ ...prev, [product.id]: false }));
    }, 3000);
  };

  const processAIResponse = (userText: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const lower = userText.toLowerCase();
      let replyText = "আপনার রিকোয়ারমেন্ট অনুযায়ী আমাদের ক্যাটালগ থেকে সেরা ম্যাচিং প্রোডাক্ট ফিল্টার করা হয়েছে:";
      let matchedProducts: Product[] | undefined = undefined;

      if (lower.includes("ডার্ক") || lower.includes("চোখ") || lower.includes("স্কিন") || lower.includes("ক্রিম") || lower.includes("skin")) {
        replyText = "আপনার স্কিনের হাইড্রেশন বজায় রেখে ডার্ক সার্কেল লাইট করার জন্য আমাদের সেরা রিকমেন্ডেশন:";
        matchedProducts = DEMO_PRODUCTS.skincare;
      } else if (lower.includes("জ্যাকেট") || lower.includes("বৃষ্টি") || lower.includes("বর্ষা") || lower.includes("jacket") || lower.includes("rain")) {
        replyText = "বর্ষার আর্দ্র আবহাওয়া ও পানির ছিটেফোঁটা থেকে ১০০% সুরক্ষিত থাকতে আমাদের আল্ট্রা-লাইট উইন্ডব্রেকার পারফেক্ট:";
        matchedProducts = DEMO_PRODUCTS.jacket;
      } else if (lower.includes("ঘড়ি") || lower.includes("ওয়াচ") || lower.includes("watch") || lower.includes("2000") || lower.includes("২০০০")) {
        replyText = "বাজেটের মধ্যে প্রিমিয়াম লুক ও লং-লাস্টিং বিল্ড কোয়ালিটির জন্য এই মডেলটি সবচেয়ে বেশি জনপ্রিয়:";
        matchedProducts = DEMO_PRODUCTS.watch;
      } else if (lower.includes("গিফট") || lower.includes("gift") || lower.includes("উপহার") || lower.includes("ফ্রেন্ড")) {
        replyText = "দারুণ সারপ্রাইজ গিফটের জন্য আমাদের প্রিমিয়াম গিফট কম্বো সেট দেখতে পারেন (ফ্রি গিফট র‍্যাপিং সহ):";
        matchedProducts = DEMO_PRODUCTS.gift;
      } else if (lower.includes("হ্যালো") || lower.includes("hi") || lower.includes("hello")) {
        replyText = "নমস্কার! আমি আপনার AI শপিং অ্যাসিস্ট্যান্ট। আপনি কী ধরণের প্রোডাক্ট খুঁজছেন বা আপনার কোনো নির্দিষ্ট বাজেট থাকলে আমাকে জানান!";
      } else {
        replyText = `"${userText}" এর সাথে সামঞ্জস্যপূর্ণ সেরা কোয়ালিটির প্রোডাক্ট আমাদের স্মার্ট ইনভেন্টরি থেকে খুঁজে দেওয়া হয়েছে:`;
        matchedProducts = [DEMO_PRODUCTS.skincare[0], DEMO_PRODUCTS.watch[0]];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: replyText,
          timestamp: "Just now",
          products: matchedProducts
        }
      ]);
      setIsTyping(false);
    }, 850);
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: "Just now"
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");
    processAIResponse(text.trim());
  };

  return (
    <div className="w-full rounded-t-3xl sm:rounded-3xl border-0 sm:border border-indigo-500/40 bg-gradient-to-b from-[#0B0F19]/98 via-[#070A14]/98 to-[#090D1A]/98 shadow-[0_0_40px_rgba(99,102,241,0.25)] overflow-hidden backdrop-blur-2xl flex flex-col h-[78svh] sm:h-[560px] max-h-[85svh] sm:max-h-[82vh]">
      {/* 1️⃣ Clean Chat Header without Smart Intent Engine, Cart, or Refresh Icon */}
      <div className="px-4 sm:px-6 py-3.5 bg-[#05070D]/95 border-b border-slate-800/90 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <Bot size={22} className="animate-pulse" />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#05070D]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
              Stova AI Sales Assistant
            </h3>
            <p className="text-[11px] sm:text-xs text-emerald-400 font-ui flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Active & Live 24/7
            </p>
          </div>
        </div>
      </div>

      {/* 2️⃣ Chat Message Area - Isolated Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="flex-1 min-h-0 p-3.5 sm:p-5 overflow-y-auto overscroll-contain touch-pan-y space-y-4 [scrollbar-width:thin] [scrollbar-color:#334155_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700/80 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600"
      >
        {messages.map((msg) => {
          const isUser = msg.sender === "user";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1.5`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[85%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? "bg-[#141B2D] border border-indigo-500/30 text-slate-100 rounded-tr-xs shadow-md"
                    : "bg-gradient-to-br from-[#0F172A] to-[#121C38] border border-indigo-500/40 text-slate-200 rounded-tl-xs shadow-lg"
                }`}
              >
                {!isUser && (
                  <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1 text-xs">
                    <Sparkles size={13} className="text-indigo-400" />
                    <span>AI সাজেস্টেড রেকমেনডেশন:</span>
                  </div>
                )}
                <p className="font-light">{msg.text}</p>

                {/* Render Product Cards with in-demo simulated actions (NO REDIRECTS) */}
                {msg.products && msg.products.length > 0 && (
                  <div className="mt-3 space-y-2.5">
                    {msg.products.map((p) => {
                      const isAdded = addedIds[p.id];
                      const isBought = boughtIds[p.id];

                      return (
                        <div
                          key={p.id}
                          className="p-3 sm:p-3.5 bg-[#060912]/90 border border-slate-800/90 rounded-2xl flex flex-col gap-2.5 hover:border-cyan-500/40 transition-colors shadow-md"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="px-2 py-0.5 bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold rounded-md font-ui uppercase">
                                  {p.tag}
                                </span>
                                <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                                  <Star size={11} className="fill-amber-400" />
                                  <span>{p.rating}</span>
                                  <span className="text-slate-500 font-normal">({p.reviews})</span>
                                </div>
                              </div>
                              <h4 className="font-bold text-white text-xs sm:text-sm tracking-wide">
                                {p.name}
                              </h4>
                            </div>

                            <div className="text-right shrink-0">
                              <p className="text-cyan-400 font-bold font-mono text-sm sm:text-base">
                                ₹{p.price}
                              </p>
                              <p className="text-slate-500 line-through text-[10px] sm:text-xs">
                                ₹{p.oldPrice}
                              </p>
                            </div>
                          </div>

                          <p className="text-[11px] sm:text-xs text-slate-300 font-light leading-relaxed">
                            {p.desc}
                          </p>

                          {/* In-Demo Simulated Buttons (Zero Redirects) */}
                          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
                            <button
                              type="button"
                              onClick={() => handleAddToCart(p)}
                              className={`flex-1 py-2 px-3 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                isAdded
                                  ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                  : "bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white shadow-sm hover:brightness-110 active:scale-[0.98]"
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check size={13} />
                                  <span>কার্টে যোগ হয়েছে ✓</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingBag size={13} />
                                  <span>Add To Cart</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSimulatedBuy(p)}
                              className={`py-2 px-3 rounded-xl text-[11px] sm:text-xs font-bold font-ui flex items-center gap-1 transition-all cursor-pointer ${
                                isBought
                                  ? "bg-emerald-950 border border-emerald-500/50 text-emerald-300 shadow-sm"
                                  : "bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-500/40 text-cyan-300 active:scale-[0.98]"
                              }`}
                            >
                              {isBought ? (
                                <>
                                  <Check size={12} className="text-emerald-400" />
                                  <span>অর্ডার ডেমো ✓</span>
                                </>
                              ) : (
                                <>
                                  <Zap size={12} className="text-amber-400" />
                                  <span>Instant Demo Buy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-500 px-1 font-mono">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {/* Live Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 p-3 bg-[#0F172A] border border-indigo-500/30 rounded-2xl rounded-tl-xs max-w-[200px] text-xs text-cyan-300">
            <Bot size={15} className="animate-spin text-cyan-400" />
            <span className="font-light">AI ক্যাটালগ খুঁজছে</span>
            <span className="flex gap-0.5">
              <span className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" />
              <span className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 3️⃣ Preset Prompt Chips */}
      <div className="px-3 sm:px-4 py-2 bg-[#060912]/90 border-t border-slate-800/80 overflow-x-auto scrollbar-none flex items-center gap-2 shrink-0">
        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider shrink-0 font-ui flex items-center gap-1">
          <Zap size={11} className="text-amber-400" /> ট্রাই করুন:
        </span>
        {PRESET_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(prompt.query)}
            disabled={isTyping}
            className="px-2.5 py-1 bg-[#0F1424] hover:bg-indigo-950 border border-slate-800 hover:border-cyan-400/50 text-[11px] text-slate-300 hover:text-white rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 disabled:opacity-50"
          >
            {prompt.label}
          </button>
        ))}
      </div>

      {/* 4️⃣ Input Box with Safe-Area Insets */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-[#05070D] border-t border-slate-800 flex items-center gap-2 shrink-0"
        style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="প্রোডাক্টের নাম বা প্রয়োজন লিখুন (e.g. ড্রাই স্কিন ক্রিম, জ্যাকেট...)"
          className="flex-1 bg-[#0B0F19] border border-slate-800 focus:border-cyan-400 text-white placeholder:text-slate-500 text-base sm:text-sm px-3.5 py-2.5 rounded-xl focus:outline-none transition-colors min-h-[44px]"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isTyping}
          className="p-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white rounded-xl disabled:opacity-40 transition-all cursor-pointer shadow-md shrink-0 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
