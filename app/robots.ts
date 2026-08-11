import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
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
        disallow: ["/api/"],
      }
    ],
    sitemap: "https://stovamedia.in/sitemap.xml",
  };
}
