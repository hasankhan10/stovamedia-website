"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight, MessageSquare } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "AI E-Commerce", href: "/aiecommerce", badge: "AI" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-[500] transition-all duration-300 px-5 sm:px-8 md:px-12 lg:px-20",
          scrolled ? "py-3 md:py-3.5" : "py-5 md:py-6"
        )}
      >
        <div
          className={cn(
            "max-w-[1400px] mx-auto flex items-center justify-between transition-all duration-300 rounded-full px-5 sm:px-7 py-2.5",
            scrolled
              ? "bg-[#070B16]/90 backdrop-blur-2xl border border-slate-800/90 shadow-[0_10px_35px_rgba(0,0,0,0.7)]"
              : "bg-[#070B16]/60 backdrop-blur-md border border-slate-800/50"
          )}
        >
          {/* Left: Brand Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-300" />
              <Image 
                src="/logo.jpeg" 
                alt="Stova Media" 
                width={150} 
                height={38} 
                className="relative h-7 sm:h-8 w-auto object-contain rounded-full border border-slate-800" 
                priority
              />
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative text-xs uppercase tracking-[0.16em] font-ui font-semibold transition-all py-1 flex items-center gap-1.5 group",
                    isActive ? "text-cyan-300" : "text-slate-300 hover:text-[#F8FAFC]"
                  )}
                >
                  <span>{link.name}</span>

                  {link.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold bg-cyan-950 border border-cyan-500/50 text-cyan-400 rounded-xs shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                      {link.badge}
                    </span>
                  )}

                  {isActive && (
                    <motion.div 
                      layoutId="active-nav-glow-line"
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Quick Link */}
            <a
              href="https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20am%20interested%20in%20discussing%20a%20software%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40 transition-colors text-xs font-ui font-semibold"
            >
              <MessageSquare size={13} />
              <span>WhatsApp</span>
            </a>

            {/* Primary CTA Button */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300 active:scale-[0.98]"
            >
              <span>Start Project</span>
              <ArrowUpRight size={14} />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              className="lg:hidden text-slate-200 p-2 hover:text-cyan-400 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Fullscreen Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#05070D]/95 backdrop-blur-2xl z-[1000] flex flex-col p-6 sm:p-10 overflow-y-auto"
            data-lenis-prevent
          >
            {/* Drawer Top Header */}
            <div className="flex justify-between items-center pb-6 border-b border-slate-800">
              <Image 
                src="/logo.jpeg" 
                alt="Stova Media" 
                width={150} 
                height={38} 
                className="h-8 w-auto object-contain rounded-full border border-slate-800" 
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 p-2 hover:text-cyan-400 transition-colors rounded-full border border-slate-800 bg-[#0B0F19]"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <nav className="flex flex-col gap-6 my-auto py-8">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "font-display text-3xl sm:text-4xl transition-colors flex items-center justify-between font-bold",
                        isActive ? "text-cyan-400" : "text-[#F8FAFC] hover:text-cyan-300"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span>{link.name}</span>
                        {link.badge && (
                          <span className="text-[11px] font-mono px-2 py-0.5 bg-cyan-950 border border-cyan-500/50 text-cyan-400 font-bold rounded-xs">
                            {link.badge}
                          </span>
                        )}
                      </span>
                      <ArrowUpRight size={22} className={isActive ? "text-cyan-400" : "text-slate-600"} />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-slate-800 flex flex-col gap-3 mt-auto">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-4 bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white font-bold text-sm uppercase tracking-wider rounded-lg shadow-[0_0_25px_rgba(99,102,241,0.4)]"
              >
                Start A Project
              </Link>

              <a
                href="https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20discuss%20a%20software%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
