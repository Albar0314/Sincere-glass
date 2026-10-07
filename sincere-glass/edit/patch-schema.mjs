#!/usr/bin/env node
/**
 * patch-schema.mjs
 * 添加全站 Organization + WebSite JSON-LD Schema
 *
 * 发现 5 个产品页已经有 Product + FAQ schema，所以只补全全站 schema：
 *  1. 创建 src/components/JsonLd.tsx — 复用的 Schema 注入组件
 *  2. 创建 src/lib/schema.ts — Organization / Website schema builders
 *  3. 修改 src/app/layout.tsx — 全站注入 Organization + Website schema
 *
 * 使用方式：在项目根目录运行
 *   node patch-schema.mjs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";

const ROOT = process.cwd();

function writeFile(relPath, content) {
  const abs = resolve(ROOT, relPath);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content, "utf-8");
}

// ─── 1. JsonLd 组件 ───────────────────────────────────────
const jsonLdComponent = [
  '/**',
  ' * JsonLd — 将结构化数据注入页面',
  ' * 用法: <JsonLd data={schemaObject} />',
  ' */',
  'export default function JsonLd({ data }: { data: Record<string, unknown> }) {',
  '  return (',
  '    <script',
  '      type="application/ld+json"',
  '      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}',
  '    />',
  '  );',
  '}',
  '',
].join("\n");

writeFile("src/components/JsonLd.tsx", jsonLdComponent);
console.log("✅ 已创建 src/components/JsonLd.tsx");

// ─── 2. schema builders ───────────────────────────────────
const schemaLib = [
  'const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://sincereglass.com";',
  '',
  '/**',
  ' * Organization schema — 公司信息，让 Google 认识这家公司',
  ' * 可能在搜索结果右侧显示知识面板（Knowledge Panel）',
  ' */',
  'export function getOrganizationSchema() {',
  '  return {',
  '    "@context": "https://schema.org",',
  '    "@type": "Organization",',
  '    "@id": `${SITE}/#organization`,',
  '    name: "Sincere Glass",',
  '    alternateName: [',
  '      "\\u6b23\\u57ce\\u73bb\\u7483",',
  '      "\\u6b66\\u6c49\\u6b23\\u57ce\\u73bb\\u7483",',
  '      "\\u6e56\\u5317\\u6b23\\u4e4b\\u57ce\\u73bb\\u7483",',
  '    ],',
  '    url: SITE,',
  '    logo: `${SITE}/images/logo.png`,',
  '    image: `${SITE}/images/logo.png`,',
  '    description:',
  '      "Architectural glass manufacturer in China specializing in tempered, insulated, laminated, enameled and Low-E glass. Two factories, 20,000 m\\u00b2, 3C certified, exporting worldwide.",',
  '    foundingDate: "2010",',
  '    industry: "Architectural Glass Manufacturing",',
  '    address: [',
  '      {',
  '        "@type": "PostalAddress",',
  '        streetAddress: "Wujin Industrial Park, Hannan District",',
  '        addressLocality: "Wuhan",',
  '        addressRegion: "Hubei",',
  '        addressCountry: "CN",',
  '      },',
  '      {',
  '        "@type": "PostalAddress",',
  '        streetAddress: "Xintan Town Industrial Park",',
  '        addressLocality: "Honghu",',
  '        addressRegion: "Hubei",',
  '        addressCountry: "CN",',
  '      },',
  '    ],',
  '    contactPoint: [',
  '      {',
  '        "@type": "ContactPoint",',
  '        contactType: "Sales",',
  '        email: "xcglass@sina.cn",',
  '        availableLanguage: ["English", "Chinese"],',
  '        areaServed: "Worldwide",',
  '      },',
  '      {',
  '        "@type": "ContactPoint",',
  '        contactType: "Sales",',
  '        email: "1348767121@qq.com",',
  '        availableLanguage: ["Chinese"],',
  '        areaServed: "CN",',
  '      },',
  '    ],',
  '    sameAs: [],',
  '    knowsAbout: [',
  '      "Tempered Glass",',
  '      "Insulated Glass",',
  '      "Laminated Glass",',
  '      "Enameled Glass",',
  '      "Low-E Glass",',
  '      "Architectural Glazing",',
  '      "Curtain Wall Glass",',
  '    ],',
  '    hasCredential: {',
  '      "@type": "EducationalOccupationalCredential",',
  '      credentialCategory: "certification",',
  '      name: "China Compulsory Certification (3C/CCC)",',
  '    },',
  '  };',
  '}',
  '',
  '/**',
  ' * WebSite schema — 让 Google 可能在搜索结果中显示站内搜索框',
  ' */',
  'export function getWebsiteSchema() {',
  '  return {',
  '    "@context": "https://schema.org",',
  '    "@type": "WebSite",',
  '    "@id": `${SITE}/#website`,',
  '    url: SITE,',
  '    name: "Sincere Glass",',
  '    description: "Architectural glass manufacturer in China",',
  '    publisher: { "@id": `${SITE}/#organization` },',
  '    inLanguage: "en",',
  '  };',
  '}',
  '',
].join("\n");

writeFile("src/lib/schema.ts", schemaLib);
console.log("✅ 已创建 src/lib/schema.ts");

// ─── 3. 修改 layout.tsx ───────────────────────────────────
const layoutPath = resolve(ROOT, "src/app/layout.tsx");
if (!existsSync(layoutPath)) {
  console.error("❌ 找不到 src/app/layout.tsx");
  process.exit(1);
}

let layout = readFileSync(layoutPath, "utf-8");

if (layout.includes("getOrganizationSchema")) {
  console.log("⏭️  layout.tsx 已包含 Schema，跳过");
} else {
  // 添加 import
  layout = layout.replace(
    'import type { Metadata } from "next";',
    'import type { Metadata } from "next";\nimport JsonLd from "@/components/JsonLd";\nimport { getOrganizationSchema, getWebsiteSchema } from "@/lib/schema";'
  );

  // 在 <body ...> 后插入
  layout = layout.replace(
    /(<body[^>]*>)/,
    '$1\n        <JsonLd data={getOrganizationSchema()} />\n        <JsonLd data={getWebsiteSchema()} />'
  );

  writeFileSync(layoutPath, layout, "utf-8");
  console.log("✅ 已更新 src/app/layout.tsx — 注入 Organization + WebSite schema");
}

console.log("");
console.log("🎉 完成！");
console.log("");
console.log("📦 已添加（全站生效）：");
console.log("   • Organization schema — 公司信息、2 个厂址、联系方式、认证");
console.log("   • WebSite schema — 站内搜索元数据");
console.log("");
console.log("📦 已存在（之前就有，无需改）：");
console.log("   • 5 个产品页：Product schema + FAQ schema");
console.log("");
console.log("🔍 部署后验证：");
console.log("   1. https://search.google.com/test/rich-results");
console.log("   2. 输入 https://sincereglass.com 查看 Organization");
console.log("   3. 输入 https://sincereglass.com/products/tempered-glass 查看 Product + FAQ");
console.log("");
console.log("💡 可选优化：等你有社交账号后，把它们加到 schema.ts");
console.log("   的 sameAs 数组里（LinkedIn、Facebook 公司页等）");
