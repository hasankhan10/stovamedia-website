"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { checkAdminSession, logoutAdmin, loginAdminWithSupabase } from "@/lib/admin-auth";
import { Inquiry } from "@/lib/db-inquiries";
import {
  Users,
  BarChart3,
  Search,
  MessageSquare,
  Mail,
  Phone,
  Trash2,
  RefreshCw,
  LogOut,
  ExternalLink,
  Eye,
  X,
  Building,
  KeyRound,
  EyeOff,
  ArrowRight,
  AlertCircle,
  FileSpreadsheet,
  Layers,
  Clock,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Globe,
  Bot,
  Server
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  // Default to overview as top tab, or user can toggle to leads
  const [activeNav, setActiveNav] = useState<"overview" | "leads">("overview");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Inquiry | null>(null);

  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Load inquiries from Supabase API
  const loadInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      if (res.ok) {
        const json = await res.json();
        setInquiries(Array.isArray(json.inquiries) ? json.inquiries : []);
      }
    } catch (err) {
      console.error("Error loading leads:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const hasSession = checkAdminSession();
    setIsAuthenticated(hasSession);
    if (hasSession) {
      loadInquiries();
    }
  }, [loadInquiries]);

  // Auth handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginSubmitting(true);
    try {
      const res = await loginAdminWithSupabase(loginEmail, loginPassword);
      if (res.success) {
        setIsAuthenticated(true);
        loadInquiries();
      } else {
        setLoginError(res.error || "Invalid admin credentials");
      }
    } catch (err: any) {
      setLoginError(err.message || "Failed to log in");
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
  };

  // Status update handler (Supports strictly 'new' and 'sheet_imported')
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
        if (selectedLead?.id === id) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  // Delete lead handler
  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this lead?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
      } else {
        alert("Failed to delete lead");
      }
    } catch {
      alert("Error deleting lead");
    }
  };

  // WhatsApp Link Extractor
  const getWhatsAppLink = (inquiry: Inquiry) => {
    const raw = `${inquiry.email || ""} ${inquiry.details || ""}`;
    const match = raw.match(/(\+?[0-9]{10,14})/);
    const phone = match ? match[1].replace(/[^0-9]/g, "") : String(inquiry.email || "").replace(/[^0-9]/g, "");
    if (phone.length >= 10) {
      const text = encodeURIComponent(
        `Hi ${inquiry.name || "Client"}, thank you for contacting Stova Media regarding your ${inquiry.project_type || "inquiry"}. We'd love to assist you!`
      );
      return `https://wa.me/${phone}?text=${text}`;
    }
    return null;
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Just now";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  // Status mapping helper: standardizes to 'new' or 'sheet_imported'
  const getNormalizedStatus = (status?: string): "new" | "sheet_imported" => {
    const s = String(status || "").toLowerCase().trim();
    if (s === "sheet_imported" || s === "sheet imported" || s === "imported") {
      return "sheet_imported";
    }
    return "new";
  };

  // Analytics & Stats calculation
  const stats = useMemo(() => {
    const total = inquiries.length;
    const newLeads = inquiries.filter((i) => getNormalizedStatus(i.status) === "new").length;
    const sheetImported = inquiries.filter((i) => getNormalizedStatus(i.status) === "sheet_imported").length;

    // Service breakdown
    const services: Record<string, number> = {};
    inquiries.forEach((inq) => {
      const s = inq.project_type || "Consultation";
      services[s] = (services[s] || 0) + 1;
    });

    return { total, newLeads, sheetImported, services };
  }, [inquiries]);

  // Filtered Leads for Leads Queue Tab
  const filteredInquiries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return inquiries.filter((inq) => {
      if (!inq) return false;
      const normalizedStatus = getNormalizedStatus(inq.status);
      const matchesStatus = statusFilter === "all" || normalizedStatus === statusFilter;
      if (!matchesStatus) return false;
      if (!q) return true;

      return (
        String(inq.name || "").toLowerCase().includes(q) ||
        String(inq.email || "").toLowerCase().includes(q) ||
        String(inq.company || "").toLowerCase().includes(q) ||
        String(inq.project_type || "").toLowerCase().includes(q) ||
        String(inq.details || "").toLowerCase().includes(q)
      );
    });
  }, [inquiries, searchQuery, statusFilter]);

  // 1. Initial Loading State
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-800 font-ui">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="animate-spin text-indigo-600" size={26} />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
            Initializing Executive Control Center...
          </span>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-ui text-slate-900">
        <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 mb-4 bg-slate-50 shadow-sm">
              <Image src="/logo.jpeg" alt="Stova Media" width={64} height={64} className="w-full h-full object-cover" priority />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 mb-2">
              <Sparkles size={12} className="text-indigo-600" />
              <span>Stova Media Studio</span>
            </div>
            <h1 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">Studio Control Center</h1>
            <p className="text-xs text-slate-500 font-light mt-1">Sign in with authorized administrator credentials.</p>
          </div>

          {loginError && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 font-medium">
              <AlertCircle size={16} className="shrink-0 text-rose-600" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase font-mono tracking-wider">Admin Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="stovamedia@gmail.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-sm text-slate-900 outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase font-mono tracking-wider">Password</label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 pl-10 pr-10 py-2.5 rounded-xl text-sm text-slate-900 outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginSubmitting}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-indigo-600/25 transition-all mt-4 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 font-ui"
            >
              <span>{loginSubmitting ? "Signing in..." : "Access Control Center"}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 3. Authenticated Dashboard with Clean Premium Sidebar
  return (
    <div className="admin-theme min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row text-slate-900 font-ui relative z-10">
      {/* =========================================================================
          SIDEBAR NAVIGATION
          ========================================================================= */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 p-5 z-20 shadow-2xs">
        <div className="space-y-6">
          {/* Brand Logo & Studio Header */}
          <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shrink-0 shadow-2xs">
              <Image src="/logo.jpeg" alt="Stova Media" width={40} height={40} className="w-full h-full object-cover" priority />
            </div>
            <div>
              <div className="font-display font-extrabold text-base text-slate-900 tracking-tight leading-tight">
                Stova Media
              </div>
              <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                STUDIO ADMIN
              </span>
            </div>
          </div>

          {/* Sidebar Menu Items: 1. Overview & Stats (TOP), 2. Leads Queue (DOWN) */}
          <nav className="space-y-2">
            {/* 1. OVERVIEW & STATS (ON TOP) */}
            <button
              onClick={() => setActiveNav("overview")}
              className={cn(
                "w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer select-none",
                activeNav === "overview"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <BarChart3 size={16} />
              <span>Overview &amp; Stats</span>
            </button>

            {/* 2. LEADS QUEUE (DOWN) */}
            <button
              onClick={() => setActiveNav("leads")}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer select-none",
                activeNav === "leads"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Users size={16} />
                <span>Leads Queue</span>
              </div>
              <span
                className={cn(
                  "text-[11px] px-2 py-0.5 rounded-full font-mono font-bold tracking-tight",
                  activeNav === "leads" ? "bg-white/20 text-white" : "bg-rose-100 text-rose-700 border border-rose-200"
                )}
              >
                {stats.newLeads} New
              </span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-slate-100 space-y-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Supabase Connected</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <span>Live Agency Site</span>
            <ExternalLink size={13} />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          MAIN EXECUTIVE CONTENT AREA (SEPARATE ACCORDING TO TAB)
          ========================================================================= */}
      <main className="flex-1 p-5 sm:p-8 overflow-y-auto space-y-6 relative z-10">
        {/* Top Header: Title & Sync Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeNav === "overview" ? "Executive Overview & Telemetry" : "Client Leads Queue"}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-light">
              {activeNav === "overview"
                ? "Key performance metrics, pipeline volume, and service category demand distribution."
                : `Managing ${inquiries.length} total client inquiries with direct 1-Tap WhatsApp outreach.`}
            </p>
          </div>

          {/* Sync Button */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={loadInquiries}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition-all cursor-pointer shadow-2xs"
              title="Refresh latest leads from Supabase"
            >
              <RefreshCw size={14} className={cn(loading && "animate-spin")} />
              <span>Sync Data</span>
            </button>
          </div>
        </div>

        {/* =======================================================================
            TAB 1: OVERVIEW TAB (ONLY OVERVIEW & STATS SHOWING)
            ======================================================================= */}
        {activeNav === "overview" && (
          <div className="space-y-6">
            {/* Top 3 Core Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {/* Total Leads */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-500">
                    Total Inquiries
                  </span>
                  <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700">
                    <Layers size={18} />
                  </div>
                </div>
                <div>
                  <div className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                    {stats.total}
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">Lifetime leads logged in PostgreSQL</p>
                </div>
              </div>

              {/* New Leads */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase font-mono font-bold tracking-wider text-rose-600">
                    Actionable New Leads
                  </span>
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700">
                    <Clock size={18} />
                  </div>
                </div>
                <div>
                  <div className="font-display text-4xl sm:text-5xl font-extrabold text-rose-600 tracking-tight">
                    {stats.newLeads}
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">Awaiting initial WhatsApp response</p>
                </div>
              </div>

              {/* Sheet Imported */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-indigo-200 bg-indigo-50/20 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase font-mono font-bold tracking-wider text-indigo-700">
                    Sheet Imported
                  </span>
                  <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700">
                    <FileSpreadsheet size={18} />
                  </div>
                </div>
                <div>
                  <div className="font-display text-4xl sm:text-5xl font-extrabold text-indigo-700 tracking-tight font-mono">
                    {stats.sheetImported}
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">Processed &amp; synced with external sheet</p>
                </div>
              </div>
            </div>

            {/* Service Category Demand Breakdown Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900">Service Category Distribution</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Breakdown of inquiries by requested architecture package</p>
                </div>
                <button
                  onClick={() => setActiveNav("leads")}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Go to Leads Queue →
                </button>
              </div>

              <div className="space-y-4">
                {Object.entries(stats.services).length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No service inquiries logged yet.</p>
                ) : (
                  Object.entries(stats.services).map(([service, count]) => {
                    const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                    return (
                      <div key={service} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-800 flex items-center gap-2">
                            {service.toLowerCase().includes("ai") ? (
                              <Bot size={14} className="text-indigo-600 shrink-0" />
                            ) : (
                              <Globe size={14} className="text-emerald-600 shrink-0" />
                            )}
                            <span>{service}</span>
                          </span>
                          <span className="font-mono text-slate-600 font-bold">
                            {count} ({pct}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(pct, 6)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* =======================================================================
            TAB 2: LEADS QUEUE TAB (ONLY LEADS SHOWING)
            ======================================================================= */}
        {activeNav === "leads" && (
          <div className="space-y-4">
            {/* Search Bar & 2-Status Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search leads by client name, phone, email, brand, or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50/80 border border-slate-200 pl-10 pr-8 py-2.5 rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-600 focus:bg-white transition-all font-medium placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* ONLY 2 STATUS FILTERS: 'new' & 'sheet_imported' (+ 'all') */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { key: "all", label: `All (${inquiries.length})` },
                  { key: "new", label: `New (${stats.newLeads})` },
                  { key: "sheet_imported", label: `Sheet Imported (${stats.sheetImported})` },
                ].map((st) => (
                  <button
                    key={st.key}
                    onClick={() => setStatusFilter(st.key)}
                    className={cn(
                      "px-3.5 py-2 rounded-xl text-[11px] uppercase font-mono font-bold border transition-all whitespace-nowrap cursor-pointer shadow-2xs",
                      statusFilter === st.key
                        ? "bg-indigo-600 text-white border-indigo-600 font-extrabold"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* LEADS DATA TABLE */}
            <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] font-mono font-bold tracking-wider">
                      <th className="py-4 px-5">Date &amp; Time</th>
                      <th className="py-4 px-5">Client &amp; Brand</th>
                      <th className="py-4 px-5">Contact Details</th>
                      <th className="py-4 px-5">Service Category</th>
                      <th className="py-4 px-5">Budget &amp; Scope</th>
                      <th className="py-4 px-5">Status</th>
                      <th className="py-4 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-ui">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-16 text-center text-slate-500">
                          <AlertCircle size={32} className="mx-auto mb-2.5 text-slate-400" />
                          <p className="text-base font-bold text-slate-900 font-display">No inquiries found in this view</p>
                          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                            Incoming submissions from the contact form will appear here in real-time.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq, idx) => {
                        const waLink = getWhatsAppLink(inq);
                        const currentStatus = getNormalizedStatus(inq.status);

                        return (
                          <tr
                            key={inq.id || `lead-${idx}`}
                            className={cn(
                              "hover:bg-slate-50/80 transition-colors group",
                              currentStatus === "new" && "bg-rose-50/20"
                            )}
                          >
                            {/* Date */}
                            <td className="py-4 px-5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                              {formatDate(inq.created_at)}
                            </td>

                            {/* Client Name & Brand */}
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-display font-bold text-sm uppercase shrink-0">
                                  {inq.name ? inq.name.charAt(0) : "C"}
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                                    {inq.name || "Client Lead"}
                                  </div>
                                  {inq.company && (
                                    <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                                      <Building size={11} className="text-slate-400" />
                                      <span>{inq.company}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Contact Info + 1-Tap WhatsApp */}
                            <td className="py-4 px-5">
                              <div className="space-y-1">
                                <div className="font-mono text-slate-900 text-[11px] font-semibold flex items-center gap-1.5">
                                  <Phone size={12} className="text-emerald-600 shrink-0" />
                                  <span>{inq.email || "No contact info"}</span>
                                </div>
                                {waLink && (
                                  <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] text-emerald-700 hover:text-emerald-800 font-bold transition-colors"
                                  >
                                    <MessageSquare size={11} /> 1-Tap WhatsApp
                                  </a>
                                )}
                              </div>
                            </td>

                            {/* Service Category */}
                            <td className="py-4 px-5 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold text-[11px]">
                                {inq.project_type || "Consultation"}
                              </span>
                            </td>

                            {/* Budget & Scope */}
                            <td className="py-4 px-5 max-w-xs">
                              {inq.budget && (
                                <div className="text-emerald-700 font-mono font-bold text-[11px] mb-0.5">
                                  {inq.budget}
                                </div>
                              )}
                              <p className="text-[11px] text-slate-600 truncate font-light" title={inq.details}>
                                {inq.details || "No scope details provided."}
                              </p>
                            </td>

                            {/* ONLY 2 STATUS OPTIONS: NEW & SHEET IMPORTED */}
                            <td className="py-4 px-5 whitespace-nowrap">
                              <select
                                value={currentStatus}
                                onChange={(e) => inq.id && handleUpdateStatus(inq.id, e.target.value)}
                                className={cn(
                                  "text-[10px] uppercase font-mono font-bold px-3 py-1.5 rounded-full border outline-none cursor-pointer transition-all shadow-2xs",
                                  currentStatus === "new"
                                    ? "bg-rose-50 text-rose-700 border-rose-200"
                                    : "bg-indigo-50 text-indigo-700 border-indigo-200"
                                )}
                              >
                                <option value="new">NEW</option>
                                <option value="sheet_imported">SHEET IMPORTED</option>
                              </select>
                            </td>

                            {/* Action Buttons */}
                            <td className="py-4 px-5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedLead(inq)}
                                  title="Inspect Full Details"
                                  className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 rounded-xl cursor-pointer transition-all shadow-2xs"
                                >
                                  <Eye size={14} />
                                </button>

                                {waLink && (
                                  <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Open WhatsApp Chat"
                                    className="p-2 text-emerald-700 hover:bg-emerald-50 border border-slate-200 rounded-xl transition-all shadow-2xs"
                                  >
                                    <MessageSquare size={14} />
                                  </a>
                                )}

                                {inq.id && (
                                  <button
                                    onClick={() => handleDeleteLead(inq.id!)}
                                    title="Delete Lead"
                                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-xl cursor-pointer transition-all shadow-2xs"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>
                  Showing <strong className="text-slate-900">{filteredInquiries.length}</strong> of{" "}
                  <strong className="text-slate-900">{inquiries.length}</strong> total leads
                </span>
                <span className="text-slate-400">
                  Direct Supabase PostgreSQL real-time sync.
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          LEAD DETAIL INSPECTOR MODAL
          ========================================================================= */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {selectedLead.name || "Client Inquiry"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Received on {formatDate(selectedLead.created_at)}
                </p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Status Switcher */}
            <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <span className="text-xs uppercase font-mono font-bold text-slate-700">Lead Status:</span>
              <select
                value={getNormalizedStatus(selectedLead.status)}
                onChange={(e) => selectedLead.id && handleUpdateStatus(selectedLead.id, e.target.value)}
                className="bg-white border border-indigo-300 text-indigo-700 text-xs px-3 py-1.5 rounded-xl font-mono font-bold outline-none cursor-pointer"
              >
                <option value="new">NEW</option>
                <option value="sheet_imported">SHEET IMPORTED</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block">Contact Info</span>
                <span className="font-mono text-xs font-bold text-slate-900 break-all">{selectedLead.email || "—"}</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block">Brand / Company</span>
                <span className="text-xs font-bold text-slate-900">{selectedLead.company || "Direct Individual"}</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block">Service Package</span>
                <span className="text-xs font-bold text-indigo-700">{selectedLead.project_type || "Consultation"}</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block">Budget Scope</span>
                <span className="text-xs font-bold text-emerald-700 font-mono">{selectedLead.budget || "Needs Quote"}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1.5">
                Project Scope &amp; Client Description
              </span>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap font-light">
                {selectedLead.details || "No scope message provided."}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              {getWhatsAppLink(selectedLead) && (
                <a
                  href={getWhatsAppLink(selectedLead)!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <MessageSquare size={13} />
                  <span>Open WhatsApp</span>
                </a>
              )}

              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer ml-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
