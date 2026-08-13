import Hero from "@/components/sections/Hero";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import Services from "@/components/sections/Services";
import WorkHorizontal from "@/components/sections/WorkHorizontal";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Testimonial from "@/components/sections/Testimonial";
import CTASection from "@/components/sections/CTASection";
import { RevealOnScroll } from "@/components/ui";
import { fetchProjectsFromSupabase } from "@/lib/db-projects";
import { fetchServicesFromSupabase } from "@/lib/db-services";

export default async function Home() {
  const { data: allProjects } = await fetchProjectsFromSupabase();
  const { data: services } = await fetchServicesFromSupabase();

  // Filter featured for the horizontal showcase
  const featuredProjects = allProjects.filter((p) => p.featured && !p.locked);

  return (
    <main>
      <Hero />
      <MarqueeStrip />
      
      <RevealOnScroll>
        <Services initialServices={services} />
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
