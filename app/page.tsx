import Hero from "@/components/sections/Hero";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import Services from "@/components/sections/Services";
import WorkHorizontal from "@/components/sections/WorkHorizontal";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Testimonial from "@/components/sections/Testimonial";
import CTASection from "@/components/sections/CTASection";
import { RevealOnScroll } from "@/components/ui";
import { getAllWork } from "@/lib/work";

export default function Home() {
  const allProjects = getAllWork();
  // Filter featured for the horizontal showcase
  const featuredProjects = allProjects.filter(p => !p.locked).slice(0, 3);

  return (
    <main>
      <Hero />
      <MarqueeStrip />
      
      <RevealOnScroll>
        <Services />
      </RevealOnScroll>
      
      <WorkHorizontal projects={featuredProjects} />
      
      <RevealOnScroll>
        <Process />
      </RevealOnScroll>
      
      <RevealOnScroll>
        <About />
      </RevealOnScroll>
      
      <RevealOnScroll>
        <Testimonial />
      </RevealOnScroll>
      
      <CTASection />
    </main>
  );
}
