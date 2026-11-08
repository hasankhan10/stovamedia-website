"use client";

import { useChat } from "ai/react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Calendar, 
  RotateCcw,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import AppointmentModal from "./AppointmentModal";

const starterPrompts = [
  {
    icon: "🚀",
    title: "Engineering Services",
    prompt: "What core engineering services and timelines does Stova Media offer?",
  },
  {
    icon: "💳",
    title: "Milestone Pricing",
    prompt: "How does your 50/50 milestone pricing and IP ownership work?",
  },
  {
    icon: "⚡",
    title: "Custom vs WordPress",
    prompt: "Why should we build custom Next.js 15 instead of WordPress templates?",
  },
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading, append, setMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handlePromptClick = (prompt: string) => {
    append({
      role: "user",
      content: prompt,
    });
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 select-none">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-16 sm:bottom-18 right-0 w-[92vw] sm:w-[410px] bg-[#07080C]/95 border border-white/[0.12] rounded-2xl sm:rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col overflow-hidden text-white"
              style={{ height: "550px", maxHeight: "calc(100vh - 110px)" }}
            >
              {/* Top Arch Glow */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] pointer-events-none z-0"
                style={{
                  background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(139, 92, 246, 0.35) 0%, transparent 75%)",
                  filter: "blur(40px)",
                }}
              />

              {/* Chat Header */}
              <div className="relative z-10 px-4.5 sm:px-5 py-3.5 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 overflow-hidden flex items-center justify-center p-0.5 shadow-sm shadow-violet-500/20">
                      <Image
                        src="/logo.jpeg"
                        alt="Stova Media"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#07080C]" />
                  </div>

                  <div>
                    <span className="font-medium text-xs sm:text-sm text-slate-100 tracking-tight block">
                      Stova Architect AI
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="px-2.5 py-1 rounded-lg bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/30 text-violet-200 text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer"
                    title="Book free strategy consultation"
                  >
                    <Calendar size={11} />
                    <span>Book Call</span>
                  </button>

                  {messages.length > 0 && (
                    <button
                      onClick={handleClearChat}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer"
                      title="Reset chat"
                    >
                      <RotateCcw size={14} />
                    </button>
                  )}

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer"
                    aria-label="Close chat"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {/* Messages Content Viewport */}
              <div 
                className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4 relative z-10"
                data-lenis-prevent
              >
                {messages.length === 0 && (
                  <div className="text-center my-auto py-6 px-2 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center p-2 mb-3 shadow-[0_0_24px_rgba(139,92,246,0.2)]">
                      <Image
                        src="/logo.jpeg"
                        alt="Stova Media"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>

                    <h3 className="font-medium text-sm sm:text-base text-slate-100 mb-1 tracking-tight">
                      How can we engineer your vision?
                    </h3>
                    <p className="text-slate-400 text-xs max-w-xs leading-relaxed mb-6 font-normal">
                      Ask about custom Next.js platforms, milestone scopes, turnaround dates, or autonomous AI agents.
                    </p>

                    <div className="w-full space-y-2 text-left">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-1">
                        Frequently Inquired:
                      </span>
                      {starterPrompts.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => handlePromptClick(item.prompt)}
                          className="w-full p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-violet-500/40 text-left transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs">{item.icon}</span>
                            <span className="text-xs font-medium text-slate-200 group-hover:text-violet-200 transition-colors">
                              {item.title}
                            </span>
                          </div>
                          <ArrowRight size={12} className="text-slate-500 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "flex gap-2.5 items-start",
                      m.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div
                      className={cn(
                        "w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs mt-0.5",
                        m.role === "user"
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                          : "bg-white/[0.06] border border-white/10 text-violet-300"
                      )}
                    >
                      {m.role === "user" ? <User size={12} /> : <Bot size={12} />}
                    </div>

                    <div
                      className={cn(
                        "px-3.5 py-2.5 max-w-[82%] text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap rounded-2xl shadow-sm",
                        m.role === "user"
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-tr-xs font-normal"
                          : "bg-white/[0.04] text-slate-200 border border-white/[0.08] rounded-tl-xs backdrop-blur-md"
                      )}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-2.5 items-start">
                    <div className="w-6 h-6 rounded-lg bg-white/[0.06] border border-white/10 text-violet-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={12} />
                    </div>
                    <div className="px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-2xl rounded-tl-xs flex items-center gap-2 text-slate-400 text-xs">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" />
                      </span>
                      <span className="font-mono text-[10px] text-violet-300">Architect thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form 
                onSubmit={handleSubmit} 
                className="p-3 sm:p-3.5 border-t border-white/[0.08] bg-white/[0.02] relative z-10"
              >
                <div className="relative flex items-center">
                  <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about architecture, scope, pricing..."
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-3.5 pr-11 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-500/80 focus:bg-white/[0.06] transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!input || input.trim().length === 0 || isLoading}
                    className="absolute right-1.5 w-7 h-7 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-violet-600/30 cursor-pointer"
                    aria-label="Send message"
                  >
                    <Send size={12} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Trigger Button (FAB) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "group relative px-3.5 py-2.5 rounded-full flex items-center gap-2.5 text-white transition-all duration-300 shadow-[0_10px_35px_rgba(139,92,246,0.35)] cursor-pointer backdrop-blur-xl border border-white/15",
            isOpen 
              ? "bg-[#0B0D16] hover:bg-[#141724]" 
              : "bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 hover:scale-[1.03] active:scale-[0.98]"
          )}
          aria-label="Toggle AI Assistant"
        >
          {isOpen ? (
            <>
              <X size={18} className="text-slate-200" />
              <span className="text-xs font-medium pr-1">Close</span>
            </>
          ) : (
            <>
              <div className="relative flex items-center justify-center">
                <Bot size={17} className="text-white group-hover:rotate-12 transition-transform duration-200" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="text-xs font-medium tracking-tight pr-1 hidden sm:inline-block">
                AI Assistant
              </span>
            </>
          )}
        </button>
      </div>

      {/* Embedded Appointment Modal for Direct Booking from Chat */}
      <AppointmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService="Custom Architecture & AI Sprints"
      />
    </>
  );
}
