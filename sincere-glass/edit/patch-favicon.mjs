#!/usr/bin/env node
/**
 * patch-favicon.mjs
 * 将 logo.png 复制为 Next.js App Router 自动识别的 favicon 文件
 *
 * 使用方式：在项目根目录运行
 *   node patch-favicon.mjs
 */

import { copyFileSync, existsSync } from "fs";
import { resolve } from "path";

const ROOT = process.cwd();
const logo = resolve(ROOT, "public/images/logo.png");
const target = resolve(ROOT, "src/app/icon.png");

if (!existsSync(logo)) {
  console.error("❌ 找不到 public/images/logo.png");
  process.exit(1);
}

copyFileSync(logo, target);
console.log("✅ 已复制 logo.png → src/app/icon.png");
console.log("   Next.js 会自动将其作为浏览器标签页图标");
console.log("\n🎉 完成！重新 npm run dev 或部署后生效。");
