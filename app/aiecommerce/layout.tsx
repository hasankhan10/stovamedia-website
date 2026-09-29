import type { Metadata } from "next";
import { Hind_Siliguri, Anek_Bangla, Noto_Sans_Bengali } from "next/font/google";
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
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Anek+Bangla:wght@300;400;500;600;700;800&family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Sans+Bengali:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div
        className={`${hindSiliguri.variable} ${anekBangla.variable} ${notoSansBengali.variable} font-['Hind_Siliguri',sans-serif] min-h-screen bg-white text-slate-900 selection:bg-indigo-500 selection:text-white`}
      >
        <MetaPixel />
        {children}
      </div>
    </>
  );
}
