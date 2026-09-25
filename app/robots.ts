import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/admin"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "Googlebot",
          "Bytespider",
          "Applebot-Extended",
          "cohere-ai",
          "diffbot",
          "CCBot"
        ],
        allow: "/",
        disallow: ["/api/", "/admin/", "/admin"],
      }
    ],
    sitemap: "https://stovamedia.in/sitemap.xml",
  };
}
