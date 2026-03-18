"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "LinkedIn", href: "#", icon: <Linkedin size={16} /> },
  { name: "GitHub", href: "#", icon: <Github size={16} /> },
  { name: "Twitter", href: "#", icon: <ExternalLink size={16} /> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-transparent border-t border-border pt-16 px-10 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
        
        {/* Col 1: Logo & Status */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="group block w-fit">
            <Image 
              src="/stova-media-logo.jpg" 
              alt="Stova Media" 
              width={140} 
              height={35} 
              className="h-8 w-auto object-contain transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
            />
          </Link>
          <p className="text-muted text-sm max-w-xs leading-relaxed">
            Building premium software solutions that drive real-world business results. 
            No shortcuts. No bloat.
          </p>
          <div className="flex items-center gap-2.5">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
            />
            <span className="text-[10px] uppercase tracking-widest font-semibold text-green-500">
              Available for new projects
            </span>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="flex flex-col gap-6">
          <span className="text-[10px] uppercase tracking-widest font-bold text-dim">Navigation</span>
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-cream/70 hover:text-gold transition-colors duration-300 w-fit"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Col 3: Socials & Contact */}
        <div className="flex flex-col gap-6">
          <span className="text-[10px] uppercase tracking-widest font-bold text-dim">Get in touch</span>
          <div className="flex flex-col gap-4">
            <a
              href="mailto:stovamedia@gmail.com"
              className="text-sm text-cream/70 hover:text-gold transition-colors flex items-center gap-3 w-fit"
            >
              <Mail size={16} className="text-gold" />
              stovamedia@gmail.com
            </a>
            <div className="flex items-center gap-4 mt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:border-gold hover:text-gold transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] text-muted tracking-wide uppercase">
          © {currentYear} Stova Media. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-muted tracking-wide uppercase">Kolkata, India</span>
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-gold rounded-full"
          />
        </div>
      </div>
    </footer>
  );
}
