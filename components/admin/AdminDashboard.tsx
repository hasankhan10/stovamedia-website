"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { checkAdminSession, logoutAdmin, loginAdminWithSupabase } from "@/lib/admin-auth";
import { Inquiry } from "@/lib/db-inquiries";
import {
  RefreshCw,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Sparkles
} from "lucide-react";

// Sub-components
import AdminHeader from "./AdminHeader";
import LeadsTab from "./LeadsTab";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  // Login form states (for inline auth)
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Leads Data
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isFromDb, setIsFromDb] = useState(true);

  const loadInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const resInquiries = await fetch("/api/admin/inquiries");
      if (resInquiries.ok) {
        const jsonI = await resInquiries.json();
        setInquiries(jsonI.inquiries || []);
        setIsFromDb(true);
      }
    } catch (err) {
      console.error("Inquiries data load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Check auth session safely on client mount
  useEffect(() => {
    const hasSession = checkAdminSession();
    setIsAuthenticated(hasSession);
    if (hasSession) {
      loadInquiries();
    }
  }, [loadInquiries]);

  const handleInlineLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginSubmitting(true);

    try {
      const result = await loginAdminWithSupabase(loginEmail, loginPassword);
      if (result.success) {
        setIsAuthenticated(true);
        loadInquiries();
      } else {
        setLoginError(result.error || "Invalid credentials. Please try again.");
      }
    } catch (err: any) {
      setLoginError(err.message || "Failed to authenticate.");
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
  };

  const handleUpdateInquiryStatus = async (id: string, status: Inquiry["status"]) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead? This action cannot be undone.")) return;

    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      } else {
        const err = await res.json();
        alert(`Error deleting lead: ${err.error || "Failed"}`);
      }
    } catch (err) {
      alert("Failed to delete lead");
    }
  };

  // 1. Initial hydration check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#05070D] flex items-center justify-center text-slate-200">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl border border-cyan-500/40 bg-[#0B0F19] flex items-center justify-center text-cyan-400">
            <RefreshCw className="animate-spin" size={20} />
          </div>
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Loading Client Leads...
          </span>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated Inline Authentication Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#05070D] flex items-center justify-center px-4 sm:px-6 py-12 font-ui text-[#F8FAFC] relative overflow-hidden">
        {/* Ambient background glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] opacity-25 z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(6, 182, 212, 0.25) 50%, transparent 70%)",
          }}
        />

        <div className="w-full max-w-md bg-[#0B0F19]/90 border border-slate-800/90 p-8 sm:p-10 rounded-2xl shadow-2xl relative z-10 backdrop-blur-2xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-cyan-500/40 mb-4 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
              <Image
                src="/logo.jpeg"
                alt="Stova Media"
                width={64}
                height={64}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-[10px] uppercase font-mono tracking-widest text-cyan-300 font-bold mb-3">
              <Sparkles size={11} />
              <span>Stova Media Studio</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
              Client Leads Portal
            </h1>
            <p className="text-xs text-slate-400 font-light mt-1.5">
              Enter authorized administrator credentials to manage inquiries &amp; client bookings.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3.5 bg-rose-950/30 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 rounded-xl">
              <AlertCircle size={16} className="shrink-0 text-rose-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleInlineLogin} className="space-y-4">
            <div>
              <label className="text-[11px] uppercase font-mono tracking-wider font-bold text-slate-300 block mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="stovamedia@gmail.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-[#05070D] border border-slate-800 pl-10 pr-4 py-3 text-sm font-mono text-slate-100 outline-none focus:border-cyan-400 rounded-xl transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase font-mono tracking-wider font-bold text-slate-300 block mb-1.5">
                Access Token / Password
              </label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-[#05070D] border border-slate-800 pl-10 pr-10 py-3 text-sm font-mono text-slate-100 outline-none focus:border-cyan-400 rounded-xl transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer"
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 rounded-xl shadow-lg shadow-indigo-500/20 mt-4 cursor-pointer"
            >
              <span>{loginSubmitting ? "Authenticating..." : "Unlock Leads Portal"}</span>
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500 font-mono flex items-center justify-center gap-1.5">
              <ShieldCheck size={14} className="text-cyan-400" />
              <span>Supabase Cloud Endpoints Verified</span>
            </p>
          </div>
        </div>
      </main>
    );
  }

  // 3. Authenticated Leads Command Center
  const newLeadsCount = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="min-h-screen bg-[#05070D] text-slate-100 font-ui selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* HEADER */}
      <AdminHeader
        isFromDb={isFromDb}
        newLeadsCount={newLeadsCount}
        onRefresh={loadInquiries}
        onLogout={handleLogout}
      />

      <main className="px-4 sm:px-8 py-8 max-w-[1600px] mx-auto">
        <LeadsTab
          inquiries={inquiries}
          onUpdateStatus={handleUpdateInquiryStatus}
          onDeleteInquiry={handleDeleteInquiry}
        />
      </main>
    </div>
  );
}
