"use client";

import { useChat } from 'ai/react';
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] bg-white border border-slate-200 rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.15)] flex flex-col overflow-hidden"
            style={{ height: '500px', maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <span className="font-display text-slate-900 font-bold text-sm block">Stova Assistant</span>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online 24/7
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div 
              className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 bg-slate-50/40"
              data-lenis-prevent
            >
              {messages.length === 0 && (
                <div className="text-center text-slate-500 font-ui text-xs sm:text-sm my-10 px-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                    <Bot size={24} />
                  </div>
                  <p className="font-medium text-slate-700 mb-1">How can we help your business?</p>
                  <p className="text-slate-500 text-xs">Ask about custom websites, enterprise software, pricing, or our AI workflow automation.</p>
                </div>
              )}
              {messages.map(m => (
                <div key={m.id} className={cn("flex gap-2.5", m.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs",
                    m.role === 'user' ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-700"
                  )}>
                    {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={cn(
                    "px-4 py-2.5 max-w-[78%] font-ui text-xs sm:text-sm leading-relaxed whitespace-pre-wrap rounded-2xl",
                    m.role === 'user' 
                      ? "bg-indigo-600 text-white rounded-tr-xs" 
                      : "bg-white text-slate-800 border border-slate-200/80 shadow-xs rounded-tl-xs"
                  )}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="px-4 py-3 bg-white border border-slate-200 rounded-2xl rounded-tl-xs flex items-center gap-1.5 shadow-xs">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-slate-100 bg-white">
              <div className="relative flex items-center">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask a question..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-full pl-4 pr-11 py-2.5 text-xs sm:text-sm text-slate-900 font-ui outline-none focus:bg-white focus:border-indigo-500 transition-colors placeholder:text-slate-400"
                />
                <button 
                  type="submit" 
                  disabled={!input || input.trim().length === 0}
                  className="absolute right-1.5 w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
                >
                  <Send size={12} className="ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-13 h-13 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-105 shadow-[0_10px_25px_rgba(79,70,229,0.35)] z-50 cursor-pointer",
          isOpen ? "bg-slate-900 shadow-none hover:bg-slate-800" : "bg-indigo-600 hover:bg-indigo-700"
        )}
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
      </button>
    </div>
  );
}
