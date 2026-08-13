"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

const SQL_SCHEMA_SCRIPT = `-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  index_number TEXT,
  title TEXT NOT NULL,
  tag TEXT,
  category TEXT DEFAULT 'Web Apps',
  tagline TEXT,
  overview TEXT,
  challenge TEXT,
  solution TEXT,
  results JSONB DEFAULT '[]'::jsonb,
  metrics JSONB DEFAULT '[]'::jsonb,
  tech JSONB DEFAULT '[]'::jsonb,
  timeline TEXT,
  status TEXT DEFAULT 'Live',
  hero_color TEXT DEFAULT 'linear-gradient(135deg, #080808, #0A1A0A)',
  featured BOOLEAN DEFAULT true,
  locked BOOLEAN DEFAULT false,
  external_url TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  project_type TEXT NOT NULL,
  budget TEXT,
  details TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow all access on projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Allow public insert on inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all access on inquiries" ON public.inquiries FOR ALL USING (true);`;

export default function SqlSchemaTab() {
  const [copiedSql, setCopiedSql] = useState(false);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="border border-gold/30 bg-gold-glow p-8 rounded-sm flex justify-between items-center">
        <div>
          <h3 className="font-display text-2xl text-gold mb-1">Supabase DDL Setup Script</h3>
          <p className="text-xs text-cream/80">Copy this SQL script and paste it into your Supabase Dashboard SQL Editor.</p>
        </div>
        <button
          onClick={handleCopySql}
          className="flex items-center gap-2 bg-gold text-ink font-semibold px-5 py-2.5 rounded-sm hover:bg-gold-light transition-colors text-xs uppercase tracking-wider shrink-0"
        >
          {copiedSql ? <Check size={16} /> : <Copy size={16} />}
          {copiedSql ? "Copied to Clipboard!" : "Copy SQL Script"}
        </button>
      </div>

      <div className="bg-ink border border-border p-6 rounded-sm font-mono text-xs text-gold/90 overflow-x-auto">
        <pre>{SQL_SCHEMA_SCRIPT}</pre>
      </div>
    </div>
  );
}
