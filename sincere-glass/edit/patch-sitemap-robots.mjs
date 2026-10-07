#!/usr/bin/env node
/**
 * patch-sitemap-robots.mjs
 * 创建 Next.js App Router 的动态 sitemap.ts 和 robots.ts
 *
 * 使用方式：在项目根目录运行
 *   node patch-sitemap-robots.mjs
 */

import { writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";

const ROOT = process.cwd();

// ─── sitemap.ts ───────────────────────────────────────────
const sitemapPath = resolve(ROOT, "src/app/sitemap.ts");
const sitemapContent = `import type { MetadataRoute } from "next";
import { blogArticles } from "@/lib/blog-registry";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://sincereglass.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // ── Static pages ──
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: \`\${SITE}/about\`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: \`\${SITE}/products\`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: \`\${SITE}/projects\`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: \`\${SITE}/equipment\`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: \`\${SITE}/blog\`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: \`\${SITE}/contact\`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
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
    url: \`\${SITE}/products/\${slug}\`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // ── Blog articles (dynamic from registry) ──
  const blogPages: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: \`\${SITE}/blog/\${article.slug}\`,
    lastModified: article.updatedDate || article.publishDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...blogPages];
}
`;

// ─── robots.ts ────────────────────────────────────────────
const robotsPath = resolve(ROOT, "src/app/robots.ts");
const robotsContent = `import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://sincereglass.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: \`\${SITE}/sitemap.xml\`,
  };
}
`;

// ─── Write files ──────────────────────────────────────────
const appDir = resolve(ROOT, "src/app");
if (!existsSync(appDir)) {
  console.error("❌ 找不到 src/app/ 目录，请确保在项目根目录运行");
  process.exit(1);
}

if (existsSync(sitemapPath)) {
  console.log("⚠️  src/app/sitemap.ts 已存在，将覆盖");
}
if (existsSync(robotsPath)) {
  console.log("⚠️  src/app/robots.ts 已存在，将覆盖");
}

writeFileSync(sitemapPath, sitemapContent, "utf-8");
console.log("✅ 已创建 src/app/sitemap.ts");

writeFileSync(robotsPath, robotsContent, "utf-8");
console.log("✅ 已创建 src/app/robots.ts");

console.log("");
console.log("🎉 完成！部署后可访问：");
console.log("   https://sincereglass.com/sitemap.xml");
console.log("   https://sincereglass.com/robots.txt");
console.log("");
console.log("📌 sitemap 会自动包含：");
console.log("   • 7 个静态页面（首页、关于、产品列表、项目、设备、博客、联系）");
console.log("   • 5 个产品详情页");
console.log("   • 所有 blog-registry.ts 中注册的博客文章");
console.log("");
console.log("   以后发布新文章只需在 blog-registry.ts 添加条目，");
console.log("   sitemap 会自动更新，无需手动维护。");
