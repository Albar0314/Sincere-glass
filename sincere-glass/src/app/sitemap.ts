import type { MetadataRoute } from "next";
import { blogArticles } from "@/lib/blog-registry";
import { LOCALES, DEFAULT_LOCALE, localizedPath, SITE_URL, type Locale } from "@/lib/i18n";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

/**
 * Build a sitemap entry for one URL with hreflang alternates pointing at
 * all localized versions. Each language version becomes its own entry;
 * every entry carries the full alternates map (Google's expected format).
 */
function makeEntry(
  canonicalPath: string,
  locale: Locale,
  lastModified: string,
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never",
  priority: number,
): MetadataRoute.Sitemap[number] {
  const url = SITE + localizedPath(canonicalPath, locale);
  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    const hreflang = loc === DEFAULT_LOCALE ? "en" : loc;
    languages[hreflang] = SITE + localizedPath(canonicalPath, loc);
  }
  languages["x-default"] = SITE + localizedPath(canonicalPath, DEFAULT_LOCALE);
  return {
    url,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Canonical EN paths (localizedPath handles the /es/ prefix per locale)
  const staticPaths: Array<{
    path: string;
    freq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority: number;
  }> = [
    { path: "/",          freq: "weekly",  priority: 1.0 },
    { path: "/about",     freq: "monthly", priority: 0.8 },
    { path: "/certifications",freq: "monthly", priority: 0.8 },
    { path: "/products",  freq: "weekly",  priority: 0.9 },
    { path: "/projects",  freq: "monthly", priority: 0.7 },
    { path: "/equipment", freq: "monthly", priority: 0.6 },
    { path: "/blog",      freq: "daily",   priority: 0.8 },
    { path: "/contact",   freq: "yearly",  priority: 0.5 },
  ];

  const productSlugs = [
    "tempered-glass",
    "insulated-glass",
    "laminated-glass",
    "enameled-glass",
    "low-e-glass",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const { path: p, freq, priority } of staticPaths) {
    for (const locale of LOCALES) {
      entries.push(makeEntry(p, locale, now, freq, priority));
    }
  }

  for (const slug of productSlugs) {
    for (const locale of LOCALES) {
      entries.push(makeEntry(`/products/${slug}`, locale, now, "monthly", 0.8));
    }
  }

  for (const article of blogArticles) {
    const lastMod = article.updatedDate || article.publishDate;
    for (const locale of LOCALES) {
      entries.push(makeEntry(`/blog/${article.slug}`, locale, lastMod, "monthly", 0.7));
    }
  }

  return entries;
}
