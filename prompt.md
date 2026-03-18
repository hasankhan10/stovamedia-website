**PROMPT 01:Scaffold + Design System**
Goal: Install everything. Create file structure. Define all design tokens.
Stack: Next.js 15 (already install), TypeScript, Tailwind v4, GSAP 3 (+ Club),
Lenis, Framer Motion 11, Lucide React, clsx, tailwind-merge,
react-hook-form, resend, next-mdx-remote, gray-matter.
File structure:
/app /components/ui /components/layout /components/sections
/components/animations /lib /hooks /styles /content/work /content/posts
globals.css — CSS variables:
--ink:#080808 --ink-2:#0C0C0C --card:#0F0F0F --card-2:#141414
--border:#1C1C1C --border-2:#2A2A2A
--gold:#C9A84C --gold-light:#E8C97E --gold-glow:rgba(201,168,76,0.08)
--cream:#F0EDE6 --muted:#6A6560 --dim:#3A3835
--font-display:(DM Serif Display) --font-ui:(Outfit)
Fonts via next/font/google:
DM_Serif_Display — weight 400, italic. CSS var: --font-display
Outfit — weights 300,400,500,600. CSS var: --font-ui
Apply both vars to <html> in layout.tsx.
globals.css — base styles:
html { scroll-behavior:auto } /* Lenis handles scroll */
body { background:var(--ink); color:var(--cream); font-family:var(--font-ui);
font-weight:300; -webkit-font-smoothing:antialiased; cursor:none }
body::before { content:""; position:fixed; inset:-200%;
width:400%; height:400%; opacity:0.025; pointer-events:none; z-index:9000;
background-image:url("data:image/svg+xml,...svgNoise...");
animation:grain 8s steps(2) infinite }
@keyframes grain { 0%{transform:translate(0,0)} 25%{translate(-5%,-10%)}
50%{translate(-15%,5%)} 75%{translate(5%,-15%)} 100%{translate(-10%,10%)} }
::-webkit-scrollbar { width:3px }
::-webkit-scrollbar-thumb { background:var(--border-2) }
::-webkit-scrollbar-thumb:hover { background:var(--gold) }
::selection { background:var(--gold); color:var(--ink) }
/lib/utils.ts: export cn = (...inputs) => twMerge(clsx(inputs))
Result: npm run dev starts. Zero errors. Zero warnings

**PROMPT 02:Lenis + GSAP + Navbar + Cursor + Footer**
Goal: Global smooth scroll. Sticky morphing nav. Magnetic cursor. Footer.
■■ SMOOTH SCROLL /components/animations/SmoothScroll.tsx ■■
"use client"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
const lenis = new Lenis({ lerp:0.08, wheelMultiplier:1.2,
touchMultiplier:1.5, autoRaf:false })
lenis.on("scroll", ScrollTrigger.update)
gsap.ticker.add((time) => { lenis.raf(time * 1000) })
gsap.ticker.lagSmoothing(0)
Export useLenis() hook. Add <SmoothScroll> first in layout.tsx.
■■ CURSOR /components/layout/CustomCursor.tsx ■■
"use client". Two divs: dot (8px gold) + ring (36px gold border).
Dot: instant mouse follow via useState + CSS transform.
Ring: lerp lag via requestAnimationFrame, factor 0.1.
States via data-cursor on elements:
default: dot 8px + ring 36px
hover: dot hidden + ring 64px + mix-blend-mode:difference
link: dot 6px + ring 48px
Hide on touch devices (@media (pointer:coarse)).
■■ NAVBAR /components/layout/Navbar.tsx ■■
"use client". Fixed, z-index:100, padding:0 40px.
Default: transparent bg.
Scrolled (>80px): bg rgba(8,8,8,0.88) + backdrop-blur(24px)
+ border-bottom 1px var(--border). framer-motion animate.
Left: Logo DM Serif Display 18px. "Stova" cream · "." gold · "Media" 300.
Center: Work · Services · About · Contact.
Outfit 11px, letter-spacing 0.1em, uppercase, muted.
Hover: clip-path underline draw (inset 0 100% 0 0 → 0 0% 0 0).
Right: "Start a Project" pill. Hover: bg gold, color ink. MagneticElement.
Mobile: hamburger → full-screen overlay. Links DM Serif 36px, staggered.
■■ FOOTER /components/layout/Footer.tsx ■■
border-top:1px var(--border). Padding:64px 40px 40px. 3-col grid:
Col 1: Logo + tagline + green pulsing "Available" badge.
Col 2: Work / Services / About / Contact.
Col 3: LinkedIn / GitHub / stovamedia@gmail.com / mrcompounder.com.
Bottom: copyright · "Kolkata, India ■" (■ pulses gold).
■■ /app/layout.tsx ■■
Order: SmoothScroll > CustomCursor > Navbar > {children} > Footer.
Apply font vars to <html>. Root metadata.

**PROMPT 03:Component Library**
Goal: Every shared UI primitive. Used across all pages
■■ Button (primary | outline | ghost) ■■
primary: bg gold, color ink, Outfit 11px 500 uppercase, padding:14px 36px.
Hover: shimmer ::after + translateY(-2px).
outline: border 1px var(--border). Hover: border-2, cream, lift.
ghost: underline draw-on via clip-path ::after.
Renders as <Link> if href prop passed.
■■ SplitHeadline ■■
Props: children, tag, delay. Font: DM Serif Display.
GSAP SplitText by words. On scroll into view (ScrollTrigger, once:true):
gsap.from(split.words, { yPercent:110, opacity:0,
duration:0.9, stagger:0.08, ease:"power4.out" })
Each word: parent div overflow:hidden = clean clip reveal.
This is the signature animation of the entire site.
■■ RevealOnScroll ■■
framer-motion + useInView (once:true, margin:"-80px").
initial: { opacity:0, y:32 } → animate: { opacity:1, y:0 }
transition: { duration:0.8, ease:[0.16,1,0.3,1], delay }
■■ SectionLabel ■■
28px gold line + Outfit 9px uppercase letter-spacing:0.22em gold.
■■ MagneticElement ■■
"use client". On mousemove: track delta from element center.
gsap.to(el, { x:dX*strength, y:dY*strength, duration:0.4, ease:"power2.out" })
On mouseleave: gsap.to(el, { x:0, y:0, duration:0.6, ease:"elastic.out(1,0.3)" })
Wrap: all CTA buttons, logo, social icons.
■■ ProjectCard ■■
Next.js Link to /work/[slug]. bg var(--card). min-height:380px. padding:40px.
Image reveal on hover: absolute image, scale(1.1) opacity:0
→ scale(1) opacity:0.12, 600ms transition. Cinematic depth.
Top: Tag pill + index number right-aligned.
Bottom: title DM Serif 40px + tagline 12px muted.
Hover: border-2, gold glow overlay, arrow ■ translates.
■■ Tag ■■ Outfit 9px uppercase. gold. bg gold-glow. border rgba gold 0.2.
■■ MarqueeTrack ■■ Duplicate items. Pause on hover. Gold "✦" separator.
Export all from /components/ui/index.ts

**PROMPT 04:Hero Section**
Goal: Full-viewport hero. The first 3 seconds. Nothing compromised
FILE: /components/sections/Hero.tsx "use client"
Container: min-height:100svh, flex-direction:column, justify-content:center,
padding:0 40px, padding-top:120px, overflow:hidden.
BG LAYERS (absolute, pointer-events:none):
Grid: H+V lines rgba(255,255,255,0.018), 64px grid.
mask: radial-gradient(ellipse 70% 70%, black, transparent)
Orb 1: top:5% right:-10%, 700px circle.
radial-gradient gold 0.10→transparent. animation:float 6s infinite.
Orb 2: bottom:-5% left:-5%, 400px. gold 0.05. float 8s reverse.
@keyframes float { 0%,100%{translateY(0)} 50%{translateY(-16px)} }
CONTENT:
SectionLabel "Custom Software Studio · Kolkata, India"
GSAP fadeUp, delay:0.3s.
Headline — DM Serif Display, clamp(60px,8vw,112px), line-height:0.95.
Line 1: "We build" — cream
Line 2: "software " + <em>serious</em> — italic gold
Line 3: "businesses" — color:transparent,
-webkit-text-stroke:1px rgba(240,237,230,0.35)
SplitHeadline. GSAP word reveal on load, delay:0.5s, stagger:0.09s.
Sub: Outfit 16px 300, muted, max-width:500px, line-height:1.85.
"From healthcare SaaS to white-label platforms — we design,
architect, and ship products that last. No shortcuts. No bloat."
GSAP fadeUp, delay:1.2s.
CTA: Primary "See Our Work" + Ghost "Let's Talk →". Both MagneticElement.
GSAP fadeUp, delay:1.4s.
STATS BAR: flex, gap:60px, border-top:1px var(--border), padding-top:44px.
3+ Products · 500+ Clinic Users · 4yr · 0% Outsourced
Number: DM Serif 52px, suffix gold. Label: Outfit 10px uppercase dim.
Counter: gsap.from(el,{textContent:0,snap:{textContent:1},
duration:1.5,ease:"power2.out"}) on viewport entry.
GSAP fadeUp, delay:1.6s.
Mobile: padding:100px 24px. Stats flex-wrap. CTA column on <480px.

**PROMPT 05:Marquee + Services**
Goal: Dual marquee. 4-column hover-reveal services grid.
■■ MARQUEE ■■
border-top+bottom:1px var(--border). bg var(--ink-2). padding:18px 0.
Row 1 (left→): Healthcare SaaS · Web Apps · React Native · API Systems
· White-label · 3D Visualization · Clinic Software
Row 2 (←, slower): same items reversed.
Pause on hover. Gold "✦" separator.
■■ SERVICES ■■ id="services". padding:140px 40px.
HEADER: 2-col grid, align-items:end.
Left: SectionLabel + SplitHeadline "Software with craft & intention."
"craft" italic gold.
Right: Outfit 15px muted. "We don't do generic..."
GRID: 4-col, gap:1px, bg:var(--border).
Each card: bg var(--ink), padding:48px 36px.
Number DM Serif 14px gold · Icon lucide-react 44px ·
Name DM Serif Display 28px · Desc Outfit 12.5px dim.
Hover: bg var(--card), gold glow ::before, icon→gold, arrow→■.
01 Healthcare SaaS | Activity icon
"Clinic management, queue systems — built for Indian realities."
02 Web Applications | Monitor icon
"Full-stack platforms. From MVP to production — we see it through."
03 Mobile & Cross-Platform | Smartphone icon
"React Native for low-bandwidth — built for Bharat."
04 White-label Products | Layers icon
"Ready-to-deploy, fully branded. Done faster."
Each: RevealOnScroll, delay increments 0.1s.

**PROMPT 06:Work: Pinned Horizontal Scroll**
Goal: GSAP ScrollTrigger pin. Scroll down → travel sideways
FILE: /components/sections/WorkHorizontal.tsx "use client"
const containerRef = useRef() // pinned
const trackRef = useRef() // moves horizontally
useGSAP(() => {
const w = trackRef.current.scrollWidth - window.innerWidth
gsap.to(trackRef.current, {
x: -w, ease:"none",
scrollTrigger: {
trigger:containerRef.current, start:"top top",
end:() => `+=${w}`, pin:true, scrub:1.2,
invalidateOnRefresh:true
}
})
})
<section ref={containerRef} id="work" style={{height:"100vh",overflow:"hidden"}}>
<div> /* header: SectionLabel + SplitHeadline + "View All →" link */
<div ref={trackRef} style={{display:"flex",gap:"2px",width:"max-content"}}>
{projects.map(p => <ProjectCard {...p} />)}
</div>
<div> /* gold progress bar: width 0→100% via ScrollTrigger progress */
</section>
Cards: width:500px (featured:680px), height:calc(100vh-140px), flex-shrink:0.
Mobile (<=768px): disable GSAP pin. Vertical stack. framer-motion whileInView.
Projects:
Mr Compounder | Healthcare SaaS | slug:mr-compounder | featured
HairViz | 3D Platform | slug:hairviz
RMS | Distribution | slug:rms

**PROMPT 07:Process + About + Testimonial + CTA + Assembly**
Goal: All remaining homepage sections. Wire into page.tsx.
■■ PROCESS id="process" padding:140px 40px ■■
CSS grid 2-col (1fr 1.5fr). Left sticky:120px.
SectionLabel + SplitHeadline "From idea to shipped."
4 steps right: border-bottom, padding:36px 0, grid 2-col (48px 1fr).
Hover: padding-left 0→12px. Step name: muted→gold.
GSAP progress line: vertical gold, height 0→100% scrub.
01 Discovery & Scoping 02 Design & Architecture
03 Build & Iterate 04 Launch & Support
■■ ABOUT id="about" padding:140px 40px bg var(--ink-2) ■■
CSS grid 2-col, gap:100px.
Left: SectionLabel + SplitHeadline "Founder-led. Product-minded."
2 body paragraphs. Founder: 52px avatar "M" + name + title.
Right: 2x2 stat grid (bg var(--border)):
3+ Products · 500+ Users · 4yr · 0 Outsourced
GSAP counter animation on each.
■■ TESTIMONIAL padding:120px 40px centered ■■
SectionLabel "Client Perspective" centered.
DM Serif italic clamp(26px,3.2vw,46px). max-width:820px.
Gold curly quotes via ::before ::after.
"They didn't just build what we asked for — they pushed back on two features
that would have slowed us down and delivered something far better."
Attribution: Outfit 11px uppercase dim.
■■ CTA id="contact" ■■
Container: bg var(--card), border, padding:100px 80px, centered.
Eyebrow "Let's Build Together" + gold lines both sides.
SplitHeadline "Have a product idea? Let's build it." — "build it." italic gold.
Primary "Start a Conversation" + Outline "See Our Work". Both MagneticElement.
■■ /app/page.tsx ■■
<Hero /> <MarqueeStrip /> <RevealOnScroll><Services /></RevealOnScroll>
<WorkHorizontal /> <RevealOnScroll><Process /></RevealOnScroll>
<RevealOnScroll><About /></RevealOnScroll>
<RevealOnScroll><Testimonial /></RevealOnScroll> <CTASection />

**PROMPT 08:Work Index + Case Study Template**
Goal: Filterable /work grid. Scroll-driven /work/[slug] template.
■■ /app/work/page.tsx ■■
SplitHeadline "Products built with intention."
Filter pills: All · Healthcare · Web Apps · Mobile · White-label.
Active: bg gold, ink. Inactive: border var(--border).
AnimatePresence mode="popLayout". Each card: motion.div layout + opacity/scale.
Grid: 3-col, gap:2px. Projects:
Mr Compounder | Healthcare | mr-compounder | featured
HairViz | Web Apps | hairviz
RMS | Web Apps | rms
AI Hair Sim | White-label| hair-sim
Call Recorder | Mobile | call-recorder
NDA Financial | Web Apps | null (locked card, no link)
■■ /lib/work.ts ■■
Interface: { slug, title, tag, tagline, overview, challenge, solution,
results:string[], tech:string[], timeline, status, heroColor, nextSlug? }
Export getAllWork(), getWorkBySlug(slug).
■■ /app/work/[slug]/page.tsx ■■
generateStaticParams() + generateMetadata(). notFound() if invalid.
Back link "← All Work" fixed top-left below nav.
Sections:
1. HERO (60vh): bg heroColor. Tag + SplitHeadline + tagline.
Meta row: Timeline · Status · Tech tags.
2. OVERVIEW (2-col): overview | numbered results.
Results: DM Serif 22px gold number + text.
3. CHALLENGE (centered): DM Serif italic 38px pull quote, max-width:760px.
4. SOLUTION (2-col): paragraphs | Tech Stack Tag pills.
5. RESULTS (3-col): large metric + description. GSAP counter.
6. NEXT PROJECT: full-width card → /work/[nextSlug].
7. CTASection.
All sections: RevealOnScroll.

**PROMPT 09:Case Study Content — All 3 Projects**
Goal: Populate /lib/work.ts with complete real data.
// Mr Compounder
slug:'mr-compounder', title:'Mr Compounder', tag:'Healthcare SaaS',
tagline:'A Silent OPD system replacing paper queues in Indian clinics.',
overview:'Usage-based digital token and queue management for Indian clinics.
No patient app required. Works on 2G. 500+ active users.',
challenge:'Every existing solution required patients to download an app.
In semi-urban India that was a non-starter. Zero friction was non-negotiable.',
solution:'Web-based token via SMS + WhatsApp. Clinic gets dashboard.
Patient gets a number. No app. No account. No barrier.',
results:['50+ active clinic users','Zero patient app installs required',
'Works on 2G','Rs. 2 per patient usage-based'],
tech:['Next.js 15','TypeScript','Prisma','PostgreSQL','Twilio',
'WhatsApp Business API','Vercel','Supabase'],
timeline:'4 months MVP to launch', status:'Live',
heroColor:'linear-gradient(135deg,#080808,#0A1A0A)',nextSlug:'hairviz'
// HairViz
slug:'hairviz', title:'HairViz', tag:'3D Consultation Platform',
tagline:'B2B 3D hair transplant consultation tool for Indian clinics.',
overview:'Surgeons upload photos, generate 3D head models, design hairlines,
map scalp zones, calculate grafts, show Month 1-18 growth timelines.',
challenge:'Clinics lose patients at consultation because outcomes are hard to
visualise. Surgeons needed a tool that builds real-time trust.',
solution:'Next.js + React Three Fiber. 3D head model, face texture mapping,
interactive hairline drawing, graft calculator.',
results:['3D head model + face texture','Live hairline design tool',
'Automated graft calculator','Month 1-18 animated timeline',
'White-labelled per clinic'],
tech:['Next.js 15','React Three Fiber','Three.js r160','TypeScript',
'Zustand','Tailwind v4','Supabase'],
timeline:'In active development', status:'In Development',
heroColor:'linear-gradient(135deg,#080808,#100A18)',nextSlug:'rms'
// RMS
slug:'rms', title:'Recharge Management System', tag:'Distribution SaaS',
tagline:'End-to-end recharge distribution platform for a national operator.',
overview:'LAPU SIM lifecycle, M-Robotics API, real-time retailer wallet,
multi-tier commission chain management.',
challenge:'Client managed a national recharge network on spreadsheets.
Real-time balance, commissions, and onboarding needed full automation.',
solution:'Custom SaaS: LAPU SIM pools, wallet top-up, automated commissions,
full admin panel for the distributor.',
results:['Full LAPU SIM lifecycle','Real-time retailer wallet',
'Automated commission chains','M-Robotics API integrated',
'Bangla + English dual-language UI'],
tech:['Next.js','Node.js','PostgreSQL','Prisma','M-Robotics API','Tailwind'],
timeline:'3 months — delivered', status:'Delivered',
heroColor:'linear-gradient(135deg,#080808,#080C08)',nextSlug:'mr-compounder'

**PROMPT 10:Services + About + Contact Pages**
Goal: Three inner pages. Each unique.
■■ /app/services/page.tsx ■■
SplitHeadline "Software that matters, built with craft."
Layout: 2-col grid. Left: sticky service nav (top:120px).
Active: gold left bar. Scroll-driven via ScrollTrigger.
4 service blocks. Header: DM Serif 160px gold number (opacity:0.08 bg).
Body: description + deliverables | tech card + featured project.
Bottom: pricing philosophy + CTASection.
■■ /app/about/page.tsx ■■
SplitHeadline "Founder-led. Product-minded. Kolkata-based."
Founder: 180px avatar "M" | bio. Vertical gold line left-borders text.
Values 4-col: 01 Honesty · 02 Craft · 03 Business-first · 04 Zero outsourcing.
Timeline (GSAP scrub progress line, center axis):
2020 Founded · 2021 First client · 2022 Mr Compounder
2023 Stova Media established · 2024 HairViz · 2026 Scaling.
CTASection.
■■ /app/contact/page.tsx ■■
SplitHeadline "Let's build something serious."
Layout: 1.4fr 1fr grid.
Left: react-hook-form.
Fields: Name* | Email* | Company | Project Type* | Budget* | Details*.
Focus: label→gold, left border 2px gold draws in (scaleY 0→1).
Loading / Success (green) / Error (red) states.
Right: Availability badge (green pulse). Email. Location. Response time.
WhatsApp link. LinkedIn.
FAQ: 5 Qs. framer-motion AnimatePresence accordion.
■■ /app/api/contact/route.ts ■■
POST. Validate required fields.
import { Resend } from "resend"
Send to stovamedia@gmail.com.
200 success | 400 validation | 500 error

**PROMPT 11:Blog + Polish + SEO + Deploy**
Goal: MDX blog. Preloader. 404. Transitions. Ship it.
■■ BLOG ■■
npm i next-mdx-remote gray-matter reading-time
/lib/blog.ts: getAllPosts() reads /content/posts/*.mdx, parses frontmatter.
/app/blog/page.tsx: 2-col post grid. Card: tag + date + DM Serif title + excerpt.
/app/blog/[slug]/page.tsx: article | sticky TOC sidebar.
Reading progress bar: gold, fixed top, ScrollTrigger scrub.
Prose: headings→gold DM Serif · links→gold · code→card bg gold text.
Seed: why-indian-clinic-software-fails.mdx + building-3d-hair-transplant-tool.mdx
■■ PRELOADER /components/layout/Preloader.tsx ■■
"use client". Fires once only (sessionStorage).
0.0s: "Stova" chars appear, GSAP stagger 0.07s.
0.9s: "." gold. 1.1s: "Media" chars.
1.8s: gold underline draws (scaleX 0→1).
2.4s: overlay scales up + fades out.
■■ /app/not-found.tsx ■■
"404" DM Serif clamp(120px,20vw,220px). Outlined text. Float animation.
"This page doesn't exist. But your project can." italic 24px.
"Go Home" + "See Our Work" MagneticElement.
■■ PAGE TRANSITION /components/layout/PageTransition.tsx ■■
"use client". framer-motion AnimatePresence. Key: usePathname().
Curtain: gold bg 15% opacity.
Exit: y:0→"100vh", 0.5s, ease:[0.76,0,0.24,1].
Enter: y:"-100vh"→0, same.
Add ScrollProgress (2px gold bar, ScrollTrigger scrub) to layout.tsx.
Add BackToTop (shows at 600px, MagneticElement, gold hover) to layout.tsx.
■■ SEO ■■
layout.tsx metadata: title template '%s | Stova Media',
description, openGraph (url:'https://stovamedia.in', locale:'en_IN'),
twitter card, robots index+follow.
/app/sitemap.ts: static + /work/[slug] + /blog/[slug].
/app/robots.ts: allow all, disallow /api/.
■■ VERCEL ■■
vercel.json: X-Frame-Options DENY, X-Content-Type-Options nosniff.
.env.example: RESEND_API_KEY= NEXT_PUBLIC_SITE_URL=https://stovamedia.in
■■ FINAL QA ■■
[ ] Lenis silky on all pages
[ ] SplitText reveals on all headlines
[ ] Horizontal scroll works desktop, vertical on mobile
[ ] Magnetic cursor on all CTAs, hidden on touch
[ ] All 3 case studies render
[ ] Contact form submits, email received
[ ] Page transition curtain fires
[ ] Preloader fires once only
[ ] npx next build — 0 errors, 0 warnings
[ ] Deploy. stovamedia.in live