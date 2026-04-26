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
            className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] bg-ink border border-border shadow-2xl flex flex-col overflow-hidden"
            style={{ height: '500px', maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="bg-card px-4 py-3 border-b border-border flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="text-gold" size={20} />
                <span className="font-display text-cream font-medium">Stova Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-cream transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4"
              data-lenis-prevent
            >
              {messages.length === 0 && (
                <div className="text-center text-muted/70 font-ui text-sm my-10">
                  <Bot size={32} className="mx-auto mb-3 opacity-50" />
                  <p>Hi! I&apos;m the Stova Media assistant. How can I help you architect your next project?</p>
                </div>
              )}
              {messages.map(m => (
                <div key={m.id} className={cn("flex gap-3", m.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    m.role === 'user' ? "bg-gold/20 text-gold" : "bg-card border border-border text-cream"
                  )}>
                    {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={cn(
                    "px-4 py-2 max-w-[75%] font-ui text-sm leading-relaxed whitespace-pre-wrap",
                    m.role === 'user' 
                      ? "bg-gold/10 text-cream border border-gold/20 rounded-2xl rounded-tr-sm" 
                      : "bg-card text-cream/90 border border-border rounded-2xl rounded-tl-sm"
                  )}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-card border border-border text-cream flex items-center justify-center flex-shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="px-4 py-3 bg-card border border-border rounded-2xl rounded-tl-sm flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-ink">
              <div className="relative flex items-center">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me anything..."
                  className="w-full bg-card border border-border rounded-full pl-4 pr-12 py-3 text-sm text-cream font-ui outline-none focus:border-gold/50 transition-colors placeholder:text-muted"
                />
                <button 
                  type="submit" 
                  disabled={!input || input.trim().length === 0}
                  className="absolute right-2 w-8 h-8 bg-gold text-ink rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold-light transition-colors"
                >
                  <Send size={14} className="ml-0.5" />
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
          "w-14 h-14 rounded-full flex items-center justify-center text-ink transition-transform hover:scale-105 shadow-[0_0_20px_rgba(201,168,76,0.3)] z-50",
          isOpen ? "bg-card border border-border text-cream shadow-none hover:bg-card-2" : "bg-gold"
        )}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
