"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { checkAdminSession, loginAdminWithSupabase } from "@/lib/admin-auth";
import { ShieldCheck, ArrowRight, AlertCircle, Mail, KeyRound, Eye, EyeOff, Sparkles } from "lucide-react";

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
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 sm:px-6 py-16 font-ui text-slate-900 relative overflow-hidden">
      {/* Soft Ambient Background Glow */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-40 z-0 bg-gradient-to-tr from-indigo-200/80 via-cyan-100/50 to-blue-100/40"
      />

      <div className="w-full max-w-md bg-white border border-slate-200/90 p-8 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.08)] relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 mb-4 shadow-sm bg-slate-50">
            <Image
              src="/logo.jpeg"
              alt="Stova Media"
              width={64}
              height={64}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 mb-3 shadow-2xs">
            <Sparkles size={12} className="text-indigo-600" />
            <span>Stova Media Studio</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Studio Control Center
          </h1>
          <p className="text-xs text-slate-600 font-light mt-1.5 leading-relaxed">
            Enter authorized administrator credentials to manage inquiries &amp; metrics.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 rounded-2xl shadow-2xs">
            <AlertCircle size={16} className="shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[11px] uppercase font-mono tracking-wider font-bold text-slate-700 block mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="stovamedia@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50/70 border border-slate-200 pl-10 pr-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 rounded-xl transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase font-mono tracking-wider font-bold text-slate-700 block mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50/70 border border-slate-200 pl-10 pr-10 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 rounded-xl transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none cursor-pointer"
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded-xl shadow-md shadow-indigo-600/30 mt-5 active:scale-[0.99] cursor-pointer disabled:opacity-60"
          >
            <span>{loading ? "Authenticating..." : "Unlock Dashboard"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500 font-light flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Supabase Authenticated Endpoints</span>
          </p>
        </div>
      </div>
    </main>
  );
}
