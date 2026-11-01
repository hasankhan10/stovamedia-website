import { LucideIcon } from "lucide-react";

export interface TravelFeature {
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

export interface TravelPackageDemo {
  id: string;
  name: string;
  duration: string;
  price: number;
  oldPrice: number;
  badge: string;
  desc: string;
  hotel: string;
  transport: string;
  itinerary: string[];
}
