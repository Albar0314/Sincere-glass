// edit/patch-products-isr.mjs
// 目的：把产品页从 force-dynamic 改成 ISR (每小时自动再生)
// 使用：从项目根目录运行 `node edit\patch-products-isr.mjs`

import fs from 'fs';
import path from 'path';

const files = [
  'src/app/products/page.tsx',
  'src/app/products/[slug]/page.tsx',
];

const REVALIDATE_LINE = 'export const revalidate = 3600; // ISR: 每小时重新拉取 WP 数据';

let changedCount = 0;
let errorCount = 0;

for (const file of files) {
  const fullPath = path.resolve(file);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ 文件不存在: ${file}`);
    errorCount++;
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');
  const original = content;

  // 1. 移除 force-dynamic (支持单引号/双引号/分号可选)
  const dynamicRegex = /export\s+const\s+dynamic\s*=\s*["']force-dynamic["']\s*;?\s*\n?/g;
  const dynamicMatches = content.match(dynamicRegex);

  if (!dynamicMatches) {
    console.warn(`⚠️  ${file}: 没找到 force-dynamic 声明，跳过`);
    continue;
  }

  console.log(`📄 ${file}: 找到 ${dynamicMatches.length} 处 force-dynamic`);
  content = content.replace(dynamicRegex, '');

  // 2. 在文件顶部的 import 块之后插入 revalidate 声明
  //    策略：找到最后一个 import 语句后插入
  const importRegex = /^(import\s+.*?\s+from\s+["'].*?["']\s*;?\s*\n)+/m;
  const importMatch = content.match(importRegex);

  if (!importMatch) {
    console.error(`❌ ${file}: 找不到 import 块，无法插入 revalidate`);
    errorCount++;
    continue;
  }

  const insertAt = importMatch.index + importMatch[0].length;
  // 检查是否已经有 revalidate 声明，避免重复
  if (/export\s+const\s+revalidate\s*=/.test(content)) {
    console.warn(`⚠️  ${file}: 已存在 revalidate 声明，仅移除 force-dynamic`);
  } else {
    content =
      content.slice(0, insertAt) +
      '\n' + REVALIDATE_LINE + '\n' +
      content.slice(insertAt);
  }

  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    changedCount++;
    console.log(`✅ ${file}: 已更新`);
  }
}

console.log(`\n完成: ${changedCount} 个文件已修改, ${errorCount} 个错误`);

if (errorCount > 0) {
  process.exit(1);
}

console.log(`
下一步：
1. 本地测试: npm run build && npm run start
   - 访问 http://localhost:3000/products 和一个产品详情页
   - 应该不再报 403，而且首屏速度明显更快
2. 查看 .next/server/app/products/ 下应该有预渲染的 HTML
3. 推 GitHub → Vercel 自动部署
4. 部署后用 curl -I 看响应头:
   - 原来会有 "x-vercel-cache: DYNAMIC"
   - 现在应该是 "x-vercel-cache: HIT" 或 "PRERENDER"
`);