"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RefreshCw, LogOut, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminHeaderProps {
  isFromDb: boolean;
  newLeadsCount?: number;
  onRefresh: () => void;
  onLogout: () => void;
}

export default function AdminHeader({
  newLeadsCount = 0,
  onRefresh,
  onLogout,
}: AdminHeaderProps) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefreshClick = () => {
    setRefreshing(true);
    onRefresh();
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <header className="border-b border-slate-200/90 bg-white/95 sticky top-0 z-40 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
      {/* BRAND & LOGO */}
      <div className="flex items-center gap-3 sm:gap-5">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-slate-200 shadow-2xs group-hover:scale-105 transition-transform bg-slate-50">
            <Image
              src="/logo.jpeg"
              alt="Stova Media"
              width={36}
              height={36}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-base sm:text-lg text-slate-900 font-extrabold tracking-tight block leading-tight">
                Stova Media
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-700 font-mono">
                <Sparkles size={10} /> STUDIO ADMIN
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 font-medium hidden sm:block">
              Client Leads &amp; Consultations Control Center
            </span>
          </div>
        </Link>
      </div>

      {/* CONTROLS & ACTIONS */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* DB Status Pill */}
        <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Supabase DB Connected</span>
        </div>

        {/* New Leads Notification Badge */}
        {newLeadsCount > 0 && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>{newLeadsCount} New Lead{newLeadsCount > 1 ? "s" : ""}</span>
          </div>
        )}

        {/* VIEW LIVE WEBSITE */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shadow-2xs"
          title="Open live agency site"
        >
          <span>Live Site</span>
          <ExternalLink size={12} />
        </Link>

        {/* REFRESH BUTTON */}
        <button
          onClick={handleRefreshClick}
          className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 border border-slate-200 rounded-xl hover:border-indigo-300 text-slate-700 hover:text-indigo-700 bg-white hover:bg-slate-50 transition-all cursor-pointer text-xs font-semibold shadow-2xs"
          title="Sync latest inquiries from Supabase"
        >
          <RefreshCw size={14} className={cn(refreshing && "animate-spin text-indigo-600")} />
          <span className="hidden sm:inline font-mono">Sync</span>
        </button>

        {/* LOGOUT BUTTON */}
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-rose-600 border border-slate-200 px-3 py-1.5 rounded-xl hover:border-rose-200 hover:bg-rose-50/60 bg-white transition-colors cursor-pointer shadow-2xs"
          title="Sign out of admin session"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
