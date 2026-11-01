import type { Metadata } from "next";
import { Hind_Siliguri, Anek_Bangla, Noto_Sans_Bengali, Caveat } from "next/font/google";
import { MetaPixel } from "@/components/analytics";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const anekBangla = Anek_Bangla({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-anek-bangla",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-bengali",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Travel Agency AI Website & Scrolling Animation | Stova Media",
  description: "West Bengal-এর first-time Scrolling Animation ও AI Assistant যুক্ত premium website — শুধু আপনার travel business-এর জন্য। ২৪ ঘণ্টা AI বুকিং অ্যাসিস্ট্যান্ট ও সিনেমাটিক মোশন।",
  keywords: [
    "Travel Agency AI Website Kolkata",
    "Travel Agency Website Development West Bengal",
    "Best AI agent provider in Kolkata",
    "AI powered software company in Kolkata",
    "Travel Agency Scrolling Animation Website",
    "West Bengal Travel Agency AI Booking System",
    "Bengali Travel Website Designer",
    "Stova Media Travel AI"
  ],
  openGraph: {
    title: "Travel Agency AI Website & Scrolling Animation | Stova Media",
    description: "আপনার tour ভালো, তাহলে booking কেন competitor-এর কাছে চলে যাচ্ছে? নিয়ে আসুন West Bengal-এর প্রথম Scrolling Animation ও AI Assistant যুক্ত ট্রাভেল ওয়েবসাইট।",
    url: "https://stovamedia.in/ailandingpage",
    siteName: "Stova Media",
    locale: "bn_BD",
    type: "website",
  },
};

export default function AILandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Stova Media - Travel Agency AI Platform",
    "description": "West Bengal's first-time Scrolling Animation & 24/7 AI Assistant powered website development for Travel Agencies.",
    "url": "https://stovamedia.in/ailandingpage",
    "telephone": "+919432053261",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kolkata",
      "addressRegion": "West Bengal",
      "addressCountry": "IN"
    },
    "serviceType": [
      "Travel Agency AI Website Development",
      "Scrolling Animation Web Design",
      "AI Travel Booking Assistant",
      "AI Powered Software Development in Kolkata"
    ],
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "West Bengal"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div
        className={`${hindSiliguri.variable} ${anekBangla.variable} ${notoSansBengali.variable} ${caveat.variable} font-['Hind_Siliguri',sans-serif] min-h-screen bg-[#FDFBF7] text-slate-900 selection:bg-orange-500 selection:text-white`}
      >
        <MetaPixel />
        {children}
      </div>
    </>
  );
}
