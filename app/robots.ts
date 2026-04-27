import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["GPTBot", "CCBot", "PerplexityBot", "ClaudeBot", "Google-Extended"],
        allow: "/",
      }
    ],
    sitemap: "https://stovamedia.in/sitemap.xml",
  };
}
