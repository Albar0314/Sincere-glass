import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://sincereglass.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
