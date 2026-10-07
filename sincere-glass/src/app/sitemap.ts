import type { MetadataRoute } from "next";
import { blogArticles } from "@/lib/blog-registry";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://sincereglass.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // ── Static pages ──
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/equipment`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  // ── Product pages ──
  const productSlugs = [
    "tempered-glass",
    "insulated-glass",
    "laminated-glass",
    "enameled-glass",
    "low-e-glass",
  ];
  const productPages: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${SITE}/products/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // ── Blog articles (dynamic from registry) ──
  const blogPages: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: `${SITE}/blog/${article.slug}`,
    lastModified: article.updatedDate || article.publishDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...blogPages];
}
