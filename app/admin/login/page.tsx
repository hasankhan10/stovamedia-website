"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAdminSession, loginAdminWithSupabase } from "@/lib/admin-auth";
import { Lock, ShieldCheck, ArrowRight, AlertCircle, Mail, KeyRound, Eye, EyeOff, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (checkAdminSession()) {
      router.replace("/admin");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await loginAdminWithSupabase(email, password);

    if (result.success) {
      router.replace("/admin");
    } else {
      setError(result.error || "Invalid admin credentials. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#05070D] flex items-center justify-center px-6 py-20 font-ui text-[#F8FAFC] relative overflow-hidden">
      {/* Ambient background glow */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] opacity-25 z-0"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(6, 182, 212, 0.25) 50%, transparent 70%)"
        }}
      />

      <div className="w-full max-w-md bg-[#0B0F19]/90 border border-slate-800 p-8 sm:p-10 rounded-xs shadow-2xl relative z-10 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-full border border-indigo-500/40 bg-[#05070D] flex items-center justify-center text-cyan-400 mb-5 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <Lock size={24} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-[10px] uppercase font-mono tracking-widest text-cyan-300 font-bold mb-3">
            <Sparkles size={11} />
            <span>Stova Media Studio</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
            Studio Control Center
          </h1>
          <p className="text-xs text-slate-400 font-light mt-1.5">
            Enter authorized credentials to manage inquiries &amp; metrics.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-rose-950/30 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 rounded-xs">
            <AlertCircle size={16} className="shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#05070D] border border-slate-800 pl-10 pr-4 py-3 text-sm font-mono text-slate-100 outline-none focus:border-cyan-400 rounded-xs transition-colors"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#05070D] border border-slate-800 pl-10 pr-10 py-3 text-sm font-mono text-slate-100 outline-none focus:border-cyan-400 rounded-xs transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors focus:outline-none"
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 rounded-xs shadow-lg shadow-indigo-500/20 mt-4 cursor-pointer"
          >
            <span>{loading ? "Authenticating..." : "Unlock Dashboard"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-500 font-mono flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span>Supabase Authenticated Endpoints</span>
          </p>
        </div>
      </div>
    </main>
  );
}
