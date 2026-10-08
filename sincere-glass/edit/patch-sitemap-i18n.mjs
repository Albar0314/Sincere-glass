// edit/patch-sitemap-i18n.mjs
// Rewrite src/app/sitemap.ts to include ES URLs with hreflang alternates.
//
// Usage: node edit\patch-sitemap-i18n.mjs

import fs from 'fs';
import path from 'path';

const sitemapPath = path.resolve('src/app/sitemap.ts');
if (!fs.existsSync(sitemapPath)) {
  console.error(`❌ Not found: ${sitemapPath}`);
  process.exit(1);
}

// Backup existing
const backupPath = sitemapPath + '.bak';
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(sitemapPath, backupPath);
  console.log(`💾 Backup saved: ${path.relative(process.cwd(), backupPath)}`);
}

const newSitemap = `import type { MetadataRoute } from "next";
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
      entries.push(makeEntry(\`/products/\${slug}\`, locale, now, "monthly", 0.8));
    }
  }

  for (const article of blogArticles) {
    const lastMod = article.updatedDate || article.publishDate;
    for (const locale of LOCALES) {
      entries.push(makeEntry(\`/blog/\${article.slug}\`, locale, lastMod, "monthly", 0.7));
    }
  }

  return entries;
}
`;

fs.writeFileSync(sitemapPath, newSitemap, 'utf-8');
console.log(`✅ Rewrote: src/app/sitemap.ts`);

console.log(`
${'='.repeat(60)}
完成。效果:

原来 sitemap.xml 里只有 EN URL (~25 条)。
现在每条 URL 都有 EN + ES 两个入口 (~50 条),
每条带 <xhtml:link rel="alternate" hreflang="en/es/x-default"/>.

Google 用这个判断两个页面是同一内容的不同语言版本,
不会判成重复内容, 并会在搜索结果里给地区用户展示合适的语言版本.

下一步:
1. 本地验证: 启动 npm run dev, 访问 http://localhost:3000/sitemap.xml
   应该看到类似:
   <url>
     <loc>https://sincereglass.com/about</loc>
     <xhtml:link rel="alternate" hreflang="en" href="https://sincereglass.com/about"/>
     <xhtml:link rel="alternate" hreflang="es" href="https://sincereglass.com/es/about"/>
     <xhtml:link rel="alternate" hreflang="x-default" href="https://sincereglass.com/about"/>
     ...
   </url>
   每个 URL 都有这个结构.

2. 构建 + 推线上: npm run build && git push

3. Google Search Console 重新提交 sitemap:
   - 进 Sitemaps 页面
   - 删除旧的 sitemap.xml (如果显示 Success)
   - 重新提交 sitemap.xml
   - 等 1-7 天让 Google 爬取 ES 页面

备份已保存: src/app/sitemap.ts.bak
如需回滚: ren src\\app\\sitemap.ts.bak sitemap.ts
${'='.repeat(60)}
`);
