import { MetadataRoute } from "next";
import { getAllWork } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://stovamedia.in";

  const allWork = getAllWork();

  // Static Routes
  const staticRoutes = ["", "/work", "/services", "/pricing", "/about", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic Case Studies
  const workRoutes = allWork.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes];
}
