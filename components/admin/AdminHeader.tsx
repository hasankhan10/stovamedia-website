"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RefreshCw, LogOut } from "lucide-react";
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
    <header className="border-b border-slate-800/80 bg-[#05070D]/90 sticky top-0 z-40 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xl">
      {/* BRAND & LOGO */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-700/80 shadow-[0_0_20px_rgba(99,102,241,0.25)] group-hover:border-cyan-500/50 transition-all">
            <Image
              src="/logo.jpeg"
              alt="Stova Media Logo"
              width={40}
              height={40}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              priority
            />
          </div>
          <div>
            <span className="font-display text-lg text-slate-100 font-bold tracking-tight block leading-tight">
              Stova Media
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-medium">
              Client Leads Control Center
            </span>
          </div>
        </Link>
      </div>

      {/* CONTROLS & ACTIONS */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* REFRESH BUTTON */}
        <button
          onClick={handleRefreshClick}
          className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 border border-slate-800 rounded-xl hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 bg-[#0B0F19]/80 transition-colors cursor-pointer text-xs"
          title="Refresh Leads Data"
        >
          <RefreshCw size={15} className={cn(refreshing && "animate-spin text-cyan-400")} />
          <span className="hidden sm:inline font-mono">Sync</span>
        </button>

        {/* LOGOUT BUTTON */}
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-rose-400 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-rose-500/40 hover:bg-rose-950/20 bg-[#0B0F19]/80 transition-colors cursor-pointer"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
