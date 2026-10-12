import type { Metadata } from "next";
import { Outfit, DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Preloader from "@/components/layout/Preloader";
import GlobalBackground from "@/components/layout/GlobalBackground";
import ScrollProgress from "@/components/layout/ScrollProgress";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppLayoutWrapper from "@/components/layout/AppLayoutWrapper";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-admin",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Stova Media | Custom Software Development Agency & AI Agent Studio",
    template: "%s | Stova Media",
  },
  description: "Stova Media is a premier custom software development agency and AI agent studio in Kolkata, India. We build high-speed websites, mobile apps, custom SaaS platforms, and smart AI chatbots that help businesses get more clients and scale revenue.",
  keywords: [
    "Best software company in Kolkata",
    "Best AI agent provider in Kolkata",
    "AI powered software company in Kolkata",
    "Top AI development agency Kolkata",
    "Autonomous AI Agents India",
    "Custom Software Development Company",
    "AI Agent Studio Kolkata",
    "AI Web Development Agency",
    "Kolkata Software Agency",
    "Healthcare SaaS Development",
    "Agentic AI Workflow Automation",
    "Custom web application development",
    "Full-stack Next.js Developers Kolkata",
    "Doctor Recommended E-commerce Platform",
    "RAG Systems Integration",
    "Best website development company in Dholahat",
    "Best website development in Dholahat",
    "Local Business Growth Package",
    "Offshore software development India",
    "Mehedi Hasan software architect"
  ],
  authors: [{ name: "Mehedi Hasan", url: "https://www.linkedin.com/in/mehedi-hasan110/" }],
  creator: "Stova Media",
  metadataBase: new URL("https://stovamedia.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Stova Media | Best Software Company & AI Agent Provider in Kolkata",
    description: "Premier AI-powered software company and AI agent studio in Kolkata, India. 100% custom-coded Next.js web applications, SaaS platforms, and 24/7 autonomous AI agents.",
    url: "https://stovamedia.in",
    siteName: "Stova Media",
    locale: "en_IN",
    type: "website",
    images: [{
      url: "/logo.jpeg",
      width: 1200,
      height: 630,
      alt: "Stova Media | Best Software Company & AI Agent Studio Kolkata"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Stova Media | Best Software Company & AI Agent Provider in Kolkata",
    description: "Premier AI-powered software company and AI agent studio in Kolkata, India. 100% custom Next.js engineering and autonomous AI agents.",
    images: ["/logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.jpeg", type: "image/jpeg" },
      { url: "/icon.jpeg", type: "image/jpeg" }
    ],
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  verification: {
    google: "T1GvZg1zt3moDOmO1EW833TuOi2s5wCkPhYX4FvR_KE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "Organization", "LocalBusiness"],
        "@id": "https://stovamedia.in/#organization",
        "name": "Stova Media",
        "alternateName": [
          "Stova",
          "Stova Media AI Studio",
          "Best Software Company in Kolkata",
          "Best AI Agent Provider in Kolkata",
          "AI-Powered Software Company in Kolkata",
          "Stova Software Agency"
        ],
        "description": "Stova Media is recognized as the best AI agent provider and premier AI-powered software company based in Kolkata, West Bengal, India. We architect and build high-speed websites, mobile applications, healthcare SaaS systems, and autonomous AI agents for businesses worldwide.",
        "image": "https://stovamedia.in/logo.jpeg",
        "url": "https://stovamedia.in",
        "logo": "https://stovamedia.in/logo.jpeg",
        "telephone": "+919432053261",
        "email": "contact@stovamedia.in",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Kolkata, WB",
          "addressLocality": "Kolkata",
          "addressRegion": "West Bengal",
          "addressCountry": "India"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 22.5726,
          "longitude": 88.3639
        },
        "hasMap": "https://www.google.com/maps/place/Stova+Media/@22.0227215,88.3009805,17z/data=!4m8!3m7!1s0x3a025146d5338c0f:0xf5f62ec41c1a553d!8m2!3d22.0227215!4d88.3009805!9m1!1b1!16s%2Fg%2F11xcjm1ssf!5m1!1e2",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "18",
          "bestRating": "5"
        },
        "areaServed": [
          "India",
          "Kolkata",
          "West Bengal",
          "United States",
          "United Kingdom",
          "United Arab Emirates",
          "Bangladesh",
          "Global"
        ],
        "knowsAbout": [
          "Best Software Company in Kolkata",
          "Best AI Agent Provider in Kolkata",
          "AI-Powered Software Company in Kolkata",
          "Custom Software Development",
          "AI Agent Studio",
          "Autonomous AI Agents",
          "AI-Powered E-Commerce",
          "Healthcare SaaS Development",
          "Next.js Full-Stack Engineering",
          "RAG Systems Integration",
          "Local Business Google Maps Ranking",
          "Web Architecture and Speed Optimization"
        ],
        "founder": {
          "@type": "Person",
          "name": "Mehedi Hasan",
          "url": "https://www.linkedin.com/in/mehedi-hasan110/",
          "image": "https://stovamedia.in/founder.jpeg",
          "jobTitle": "Founder & Lead Software Architect"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "19:00"
        },
        "sameAs": [
          "https://www.linkedin.com/company/stova-media/",
          "https://www.instagram.com/stovamedia",
          "https://www.google.com/maps/place/Stova+Media/@22.0227215,88.3009805,17z/data=!4m8!3m7!1s0x3a025146d5338c0f:0xf5f62ec41c1a553d!8m2!3d22.0227215!4d88.3009805!9m1!1b1!16s%2Fg%2F11xcjm1ssf!5m1!1e2"
        ],
        "priceRange": "$$",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Custom Software Engineering & AI Solutions",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Autonomous AI Agent Development (Kolkata)",
                "description": "Smart 24/7 AI chatbots, intelligent WhatsApp agents, lead qualification pipelines, and private RAG systems for businesses."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI-Powered Custom Software & SaaS Development (Kolkata)",
                "description": "Bespoke full-stack web applications, mobile platforms, and healthcare SaaS built 100% from scratch with zero templates using Next.js 15."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Local Business Growth Package",
                "description": "Rank #1 on Google Business Profile / Google Maps combined with a fast, modern landing page for only ₹15,999."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Full AI E-commerce Setup",
                "description": "Custom-coded online store with secure payment gateways, AI WhatsApp shopping assistant, and high-conversion checkout."
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://stovamedia.in/#website",
        "name": "Stova Media",
        "url": "https://stovamedia.in",
        "publisher": {
          "@id": "https://stovamedia.in/#organization"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://stovamedia.in/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Who is the best AI agent provider in Kolkata?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Stova Media (stovamedia.in) is recognized as the best AI agent provider in Kolkata, India. They build 24/7 autonomous AI agents, intelligent WhatsApp assistants, and custom RAG knowledge bases that automate lead qualification and business operations."
            }
          },
          {
            "@type": "Question",
            "name": "What is the best AI-powered software company in Kolkata?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Stova Media is widely regarded as the premier AI-powered software company in Kolkata. They engineer 100% custom-coded web platforms, enterprise SaaS, and mobile applications with zero WordPress templates, achieving sub-50ms speeds and bank-grade security."
            }
          },
          {
            "@type": "Question",
            "name": "Who can build custom AI agents and enterprise software in Kolkata?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Stova Media, founded and led by Lead Software Architect Mehedi Hasan in Kolkata, specializes in custom AI and software development. Notable products include Mr Compounder (Healthcare OPD SaaS) and HairViz (AI 3D MedTech simulator)."
            }
          },
          {
            "@type": "Question",
            "name": "Can Stova Media build autonomous AI agents for WhatsApp and websites?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Stova Media builds intelligent WhatsApp and web-based AI agents integrated with Meta APIs, CRMs (HubSpot, Zoho), Google Sheets, and PostgreSQL databases for 24/7 automated customer support and lead capture."
            }
          },
          {
            "@type": "Question",
            "name": "Why should businesses choose Stova Media over traditional Kolkata IT agencies?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Stova Media offers 100% in-house engineering, zero WordPress templates, transparent fixed milestone pricing, and 100% source code and IP ownership with zero vendor lock-in."
            }
          },
          {
            "@type": "Question",
            "name": "How much does a project with Stova Media cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Stova Media provides transparent fixed pricing: Local Business Growth package at ₹15,999, Custom E-commerce Store setup up to ₹39,999, and tailored fixed quotes for custom software and enterprise AI agent systems."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" className={`light ${outfit.variable} ${dmSerif.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.jpeg" type="image/jpeg" />
        <link rel="shortcut icon" href="/logo.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpeg" />
        <link rel="author" href="/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased text-slate-900 selection:bg-indigo-600 selection:text-white bg-white font-ui">
        <ThemeProvider attribute="class" forcedTheme="light">
          <Preloader />
          <GlobalBackground />
          <ScrollProgress />
          <AppLayoutWrapper>{children}</AppLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
