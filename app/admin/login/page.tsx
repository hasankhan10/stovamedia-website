"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAdminSession, loginAdminWithSupabase } from "@/lib/admin-auth";
import { Lock, ShieldCheck, ArrowRight, AlertCircle, Mail, KeyRound, Eye, EyeOff } from "lucide-react";

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
    <main className="min-h-screen bg-ink flex items-center justify-center px-6 py-20 font-ui text-cream">
      <div className="w-full max-w-md bg-card/50 border border-border p-8 sm:p-12 rounded-sm shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-full border border-gold/30 bg-gold-glow flex items-center justify-center text-gold mb-6">
            <Lock size={28} />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold mb-1">
            Stova Media Studio
          </span>
          <h1 className="font-display text-3xl text-cream">Supabase Admin Login</h1>
          <p className="text-xs text-muted mt-2">
            Enter your admin credentials to unlock website control center.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 rounded-sm">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-[10px] uppercase font-bold tracking-widest text-dim block mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="email"
                required
                placeholder="stovamedia@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-ink border border-border pl-10 pr-4 py-3 text-sm font-mono text-cream outline-none focus:border-gold rounded-sm transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold tracking-widest text-dim block mb-2">
              Password
            </label>
            <div className="relative">
              <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-ink border border-border pl-10 pr-10 py-3 text-sm font-mono text-cream outline-none focus:border-gold rounded-sm transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-gold transition-colors focus:outline-none"
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gold text-ink font-semibold text-xs uppercase tracking-widest hover:bg-gold-light transition-colors flex items-center justify-center gap-2 rounded-sm shadow-lg shadow-gold/10 mt-2"
          >
            <span>{loading ? "Authenticating..." : "Unlock Dashboard"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-[11px] text-muted flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} className="text-gold" />
            <span>Supabase Auth Integrated</span>
          </p>
        </div>
      </div>
    </main>
  );
}
