"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, Instagram, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/#work" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "AI E-Commerce", href: "/aiecommerce" },
];

const capabilities = [
  "Custom Next.js 15 web systems",
  "Enterprise PostgreSQL SaaS & APIs",
  "Autonomous AI agents & workflows",
  "Sub-50ms edge caching architectures",
  "Private business RAG integrations"
];

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/stova-media/", icon: <Linkedin size={15} /> },
  { name: "Instagram", href: "https://www.instagram.com/stovamedia", icon: <Instagram size={15} /> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050609] text-white border-t border-white/[0.08] pt-14 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8 relative z-20 overflow-hidden">
      {/* Subtle Bottom Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet-600/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-14 sm:mb-16">
          {/* Col 1: Logo & Agency Bio (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            <Link href="/" className="group block w-fit">
              <Image 
                src="/logo.jpeg" 
                alt="Stova Media" 
                width={130} 
                height={32} 
                className="h-7 w-auto object-contain rounded-full border border-white/10" 
              />
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed font-normal">
              Stova Media is an autonomous software engineering studio based in Kolkata. We build high-speed web platforms, enterprise SaaS, and 24/7 AI systems engineered to scale client revenue.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-slate-300 w-fit text-[11px] font-mono shadow-2xs backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Accepting Q2/Q3 project engagements</span>
            </div>
          </div>

          {/* Col 2: Capabilities (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-2.5">
            <span className="text-xs font-mono text-slate-200 font-medium">
              Capabilities
            </span>
            <ul className="flex flex-col gap-2">
              {capabilities.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-400 leading-normal font-normal">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-2.5">
            <span className="text-xs font-mono text-slate-200 font-medium">
              Navigation
            </span>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs text-slate-400 hover:text-white transition-colors w-fit flex items-center gap-1 font-normal"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight size={11} className="text-slate-500" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 4: Direct Technical Line (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-2.5">
            <span className="text-xs font-mono text-slate-200 font-medium">
              Technical Line
            </span>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:stovamedia@gmail.com"
                className="text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 font-normal"
              >
                <Mail size={13} className="text-violet-400" />
                <span>stovamedia@gmail.com</span>
              </a>
              
              <p className="text-[11px] text-slate-400 font-mono leading-normal mt-1">
                Kolkata studio · 4-hour architectural feasibility SLA
              </p>

              <div className="flex items-center gap-2 mt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/40 transition-colors shadow-2xs"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <p>© {currentYear} Stova Media. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
