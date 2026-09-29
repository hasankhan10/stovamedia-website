"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, Instagram, ArrowUpRight, MessageSquare } from "lucide-react";
import { MagneticElement } from "@/components/ui";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "AI E-Commerce", href: "/aiecommerce" },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/stova-media/", icon: <Linkedin size={16} /> },
  { name: "Instagram", href: "https://www.instagram.com/stovamedia", icon: <Instagram size={16} /> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200/80 pt-10 sm:pt-12 px-5 sm:px-8 md:px-12 lg:px-20 pb-6 relative z-20 overflow-hidden">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 sm:mb-10">
        
        {/* Col 1: Logo & Agency Bio (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-3.5">
          <Link href="/" className="group block w-fit">
            <Image 
              src="/logo.jpeg" 
              alt="Stova Media" 
              width={140} 
              height={36} 
              className="h-7 sm:h-8 w-auto object-contain rounded-full border border-slate-200 group-hover:scale-105 transition-transform" 
            />
          </Link>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-light">
            Stova Media is an elite software engineering studio &amp; AI lab based in Kolkata. We build high-speed websites, custom SaaS platforms, and autonomous AI systems that scale revenue.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 w-fit text-[11px] font-semibold shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for Q2/Q3 Project Engagements</span>
          </div>
        </div>

        {/* Col 2: Navigation Links (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-2.5">
          <span className="text-xs uppercase tracking-widest font-bold text-slate-900 font-ui">
            Navigation
          </span>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs sm:text-sm text-slate-600 hover:text-indigo-600 transition-colors duration-200 w-fit flex items-center gap-1 group font-medium"
              >
                <span>{link.name}</span>
                <ArrowUpRight size={12} className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-indigo-600 transition-all" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Col 3: Direct Connect & Socials (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-2.5">
          <span className="text-xs uppercase tracking-widest font-bold text-slate-900 font-ui">
            Direct Contact
          </span>
          <div className="flex flex-col gap-2">
            <a
              href="mailto:contact@stovamedia.in"
              className="text-xs sm:text-sm text-slate-700 hover:text-indigo-600 transition-colors flex items-center gap-2 font-medium"
            >
              <Mail size={14} className="text-indigo-600" />
              contact@stovamedia.in
            </a>

            <a
              href="https://wa.me/919432053261?text=Hello%20Stova%20Media,%20I%20want%20to%20discuss%20a%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-2 font-semibold"
            >
              <MessageSquare size={14} />
              +91 9432053261
            </a>
            
            <p className="text-[11px] text-slate-500 leading-normal">
              Direct technical feasibility review within 4 hours.
            </p>

            <div className="flex items-center gap-2 mt-1">
              {socialLinks.map((social) => (
                <MagneticElement key={social.name} strength={0.35}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                </MagneticElement>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal & Location Strip */}
      <div className="max-w-[1300px] mx-auto pt-5 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-500 font-ui">
        <div className="flex items-center gap-3">
          <span>© {currentYear} Stova Media. All rights reserved.</span>
          <span>·</span>
          <Link href="/admin" className="text-slate-400 hover:text-slate-700 transition-colors font-mono">
            Admin
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 uppercase tracking-wider text-[11px] font-semibold">Kolkata, India</span>
          <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
        </div>
      </div>
    </footer>
  );
}
