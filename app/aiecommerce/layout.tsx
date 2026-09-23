import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI-Powered E-Commerce Development | Stova Media",
  description: "আপনার Business-কে দিন একটি রিয়েল AI-Powered E-Commerce Platform। 24/7 AI Shopping Assistant, Smart Search, এবং AI SEO যা প্রতিটা ভিজিটরকে কাস্টমারে রূপান্তর করে।",
  keywords: [
    "AI Ecommerce Website Development",
    "Bengali AI Ecommerce",
    "D2C Website Development Kolkata",
    "AI Shopping Assistant",
    "Smart Ecommerce Search",
    "Stova Media Ecommerce",
    "Dr Pauls Ecommerce Developer"
  ],
  openGraph: {
    title: "AI-Powered E-Commerce Platform | Stova Media",
    description: "আপনার Website-এ Customer আসছে কিন্তু কিনছে না? নিয়ে আসুন 24/7 AI Sales Assistant-যুক্ত কাস্টম ই-কমার্স প্ল্যাটফর্ম।",
    url: "https://stovamedia.in/aiecommerce",
    siteName: "Stova Media",
    locale: "bn_BD",
    type: "website",
  },
};

export default function AIEcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${hindSiliguri.variable} font-sans min-h-screen bg-[#05070D] text-[#F8FAFC] selection:bg-indigo-500 selection:text-white`}>
      {children}
    </div>
  );
}
