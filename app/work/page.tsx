import { getAllWork } from "@/lib/work";
import WorkIndexClient from "@/components/work/WorkIndexClient";

export const metadata = {
  title: "Our Work | Portfolio of High-Fidelity Products",
  description: "Explore our archive of healthcare SaaS, 3D visualization tools, and enterprise mobile applications built for Indian markets.",
};

export default function WorkPage() {
  const allProjects = getAllWork();

  return <WorkIndexClient projects={allProjects} />;
}
