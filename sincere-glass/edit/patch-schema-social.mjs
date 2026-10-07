#!/usr/bin/env node
/**
 * patch-schema-social.mjs
 * 将社交账号 URL 加入 Organization schema 的 sameAs 数组
 *
 * 使用方式：在项目根目录运行
 *   node patch-schema-social.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const ROOT = process.cwd();
const schemaPath = resolve(ROOT, "src/lib/schema.ts");

if (!existsSync(schemaPath)) {
  console.error("❌ 找不到 src/lib/schema.ts，请先运行 patch-schema.mjs");
  process.exit(1);
}

let content = readFileSync(schemaPath, "utf-8");

const socialUrls = [
  '"https://www.youtube.com/@XinchenGlass"',
  '"https://www.facebook.com/people/SincereGlass/61594988708395/"',
  '"https://www.linkedin.com/in/%E5%9F%8E-%E6%9D%8E-3136a7441/"',
].join(",\n      ");

const newSameAs = `sameAs: [\n      ${socialUrls},\n    ],`;

if (content.includes("youtube.com/@XinchenGlass")) {
  console.log("⚠️  社交账号已存在，跳过");
  process.exit(0);
}

// 匹配 sameAs: [],  或  sameAs: [\n ... \n  ],
const beforeLen = content.length;
content = content.replace(/sameAs:\s*\[\s*\],/, newSameAs);

if (content.length === beforeLen) {
  console.error("❌ 没找到 sameAs: [], 字段。可能已被修改过，请手动检查 src/lib/schema.ts");
  process.exit(1);
}

writeFileSync(schemaPath, content, "utf-8");
console.log("✅ 已更新 src/lib/schema.ts");
console.log("");
console.log("📦 已加入 sameAs：");
console.log("   • YouTube:  @XinchenGlass");
console.log("   • Facebook: Sincere Glass 公司页");
console.log("   • LinkedIn: Li Cheng（CEO 个人主页）");
console.log("");
console.log("💡 等以后开了 LinkedIn 公司页，把个人主页 URL 换成公司页 URL 即可");
