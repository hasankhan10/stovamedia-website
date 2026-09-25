import type { Metadata } from "next";
import { DM_Serif_Display, Outfit } from "next/font/google";
import "./globals.css";

import Preloader from "@/components/layout/Preloader";
import GlobalBackground from "@/components/layout/GlobalBackground";
import ScrollProgress from "@/components/layout/ScrollProgress";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppLayoutWrapper from "@/components/layout/AppLayoutWrapper";

const displayFont = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
});

const uiFont = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-ui",
});

export const metadata: Metadata = {
  title: {
    default: "Stova Media | Custom Software Development Agency & AI Agent Studio",
    template: "%s | Stova Media",
  },
  description: "Stova Media is a premier custom software development agency and AI agent studio in Kolkata, India. We build high-speed websites, mobile apps, custom SaaS platforms, and smart AI chatbots that help businesses get more clients and scale revenue.",
  keywords: [
    "Custom Software Development Company",
    "AI Agent Studio",
    "AI Web Development Agency",
    "Kolkata Software Agency",
    "Autonomous AI Agents India",
    "Healthcare SaaS Development",
    "Agentic AI Workflow Automation",
    "Best software company in Kolkata",
    "Custom web application development",
    "Full-stack Next.js Developers",
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
    title: "Stova Media | Custom Software Development Agency & AI Agent Studio",
    description: "We build custom websites, mobile apps, and smart AI tools that help your business get more clients and grow revenue. 100% in-house engineering with zero templates.",
    url: "https://stovamedia.in",
    siteName: "Stova Media",
    locale: "en_IN",
    type: "website",
    images: [{
      url: "/logo.jpeg",
      width: 1200,
      height: 630,
      alt: "Stova Media | Custom Software & AI Agent Studio Kolkata"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Stova Media | Custom Software Development & AI Agent Studio",
    description: "We build custom websites, mobile apps, and smart AI tools that help your business get more clients and grow revenue.",
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
        "alternateName": ["Stova", "Stova Media AI Studio", "Stova Software Agency"],
        "description": "Premier Custom Software Development Agency and AI Agent Studio based in Kolkata, West Bengal, India. We architect and build high-speed websites, mobile applications, healthcare SaaS systems, and autonomous AI agents for businesses worldwide.",
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
        "areaServed": [
          "India",
          "Kolkata",
          "United States",
          "United Kingdom",
          "United Arab Emirates",
          "Bangladesh",
          "Global"
        ],
        "knowsAbout": [
          "Custom Software Development",
          "AI Agent Studio",
          "Autonomous AI Agents",
          "AI-Powered E-Commerce",
          "Healthcare SaaS Development",
          "Next.js Full-Stack Engineering",
          "Local Business Google Maps Ranking",
          "Web Architecture and Speed Optimization"
        ],
        "founder": {
          "@type": "Person",
          "name": "Mehedi Hasan",
          "url": "https://www.linkedin.com/in/mehedi-hasan110/",
          "image": "https://stovamedia.in/founder.jpeg",
          "jobTitle": "Founder & Lead Architect"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "19:00"
        },
        "sameAs": [
          "https://www.linkedin.com/company/stova-media/",
          "https://www.instagram.com/stovamedia"
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
                "name": "Custom Software & Web App Development",
                "description": "Bespoke full-stack web applications, mobile platforms, and healthcare SaaS built 100% from scratch with zero templates."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Autonomous AI Agent Studio",
                "description": "Smart AI chatbots, customer support bots, and automated lead capture systems that work 24/7."
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
                "name": "Full E-commerce Setup",
                "description": "Custom-coded online store with secure payment gateways, fast mobile checkout, and high conversion design for upto ₹39,999."
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
            "name": "What services does Stova Media offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Stova Media provides Custom Software Development, Smart AI Agent Automation, Local Business Growth Packages (Google Maps ranking + modern website), and Custom E-commerce Store setups."
            }
          },
          {
            "@type": "Question",
            "name": "How does Stova Media help businesses get more customers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We build fast, beautiful websites that rank high on Google and integrate 24/7 smart AI chatbots that answer customer questions instantly and capture sales leads automatically."
            }
          },
          {
            "@type": "Question",
            "name": "Where is Stova Media located and who do you work with?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We are based in Kolkata, India, and work with local businesses across West Bengal as well as international companies across the USA, UK, UAE, Bangladesh, and worldwide."
            }
          },
          {
            "@type": "Question",
            "name": "Do you use pre-made WordPress templates or write custom code?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We build 100% custom-coded software and websites using modern technologies like Next.js and TypeScript. No slow WordPress themes, no generic templates, and zero outsourcing."
            }
          },
          {
            "@type": "Question",
            "name": "How much does a project with Stova Media cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer transparent fixed pricing: Local Business Growth package at ₹15,999, Custom E-commerce Store setup up to ₹39,999, and tailored fixed quotes for custom software and AI systems."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" className={`dark ${displayFont.variable} ${uiFont.variable}`} suppressHydrationWarning>
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
      <body className="antialiased text-cream selection:bg-gold selection:text-ink bg-[#05070D]">
        <ThemeProvider attribute="class" forcedTheme="dark">
          <Preloader />
          <GlobalBackground />
          <ScrollProgress />
          <AppLayoutWrapper>{children}</AppLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
