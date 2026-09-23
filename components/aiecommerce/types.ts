import { LucideIcon } from "lucide-react";

export interface TargetAudience {
  title: string;
  desc: string;
  icon: LucideIcon;
  tag: string;
  accent: string;
}

export interface FAQItem {
  q: string;
  a: string;
}
