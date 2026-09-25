"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Mail, Instagram, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "AI E-Commerce", href: "/aiecommerce" },
];

const socialLinks = [
  { name: "Agency LinkedIn", href: "https://www.linkedin.com/company/stova-media/", icon: <Linkedin size={16} /> },
  { name: "Instagram", href: "https://www.instagram.com/stovamedia", icon: <Instagram size={16} /> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-[#05070D] border-t border-slate-800/80 pt-16 sm:pt-20 px-6 md:px-12 lg:px-20 pb-12 relative z-20 overflow-hidden">
      {/* Subtle top glow */}
      <div 
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] rounded-full blur-[140px] opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)"
        }}
      />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 relative z-10">
        
        {/* Col 1: Logo & Agency Bio (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Link href="/" className="group block w-fit">
            <Image 
              src="/logo.jpeg" 
              alt="Stova Media" 
              width={160} 
              height={40} 
              className="h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-105 rounded-full" 
            />
          </Link>
          <p className="text-slate-300 text-sm sm:text-base max-w-sm leading-relaxed font-light">
            Stova Media is an elite software engineering studio &amp; AI lab. We architect high-performance custom web applications, autonomous AI agents, and enterprise platforms.
          </p>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 w-fit text-xs font-semibold uppercase tracking-wider font-ui shadow-sm">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
            />
            <span>Available for Q2/Q3 Projects</span>
          </div>
        </div>

        {/* Col 2: Navigation Links (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          <span className="text-xs uppercase tracking-widest font-bold text-cyan-400 font-ui">
            Navigation
          </span>
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-slate-300 hover:text-cyan-300 transition-colors duration-300 w-fit flex items-center gap-1 group font-medium"
              >
                <span>{link.name}</span>
                <ArrowUpRight size={13} className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-cyan-400 transition-all" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Col 3: Direct Connect & Socials (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-400 font-ui">
            Get In Touch
          </span>
          <div className="flex flex-col gap-4">
            <a
              href="mailto:stovamedia@gmail.com"
              className="text-sm text-slate-200 hover:text-cyan-300 transition-colors flex items-center gap-2.5 w-fit font-mono font-medium"
            >
              <Mail size={16} className="text-cyan-400" />
              stovamedia@gmail.com
            </a>
            
            <p className="text-xs text-slate-400 font-ui leading-relaxed">
              Direct technical feasibility reviews within 4 hours. No agency bureaucracy.
            </p>

            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-slate-800 bg-[#0B0F19] flex items-center justify-center text-slate-300 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal & Location Strip */}
      <div className="max-w-[1400px] mx-auto pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-ui">
        <div className="flex items-center gap-3">
          <span>© {currentYear} Stova Media. All rights reserved.</span>
          <span>·</span>
          <Link href="/admin" className="text-slate-400 hover:text-cyan-400 transition-colors font-mono">
            Admin Portal
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 uppercase tracking-wider text-[11px]">Kolkata, India</span>
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"
          />
        </div>
      </div>
    </footer>
  );
}
