#!/usr/bin/env node
/**
 * patch-clarity.mjs
 * 将 Microsoft Clarity 追踪代码加入 Next.js layout.tsx
 *
 * 使用方式：在项目根目录运行
 *   node patch-clarity.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const ROOT = process.cwd();
const layoutPath = resolve(ROOT, "src/app/layout.tsx");

if (!existsSync(layoutPath)) {
  console.error("❌ 找不到 src/app/layout.tsx");
  process.exit(1);
}

let content = readFileSync(layoutPath, "utf-8");

// 幂等检查
if (content.includes("clarity.ms") || content.includes("ytuys5fd7j")) {
  console.log("⚠️  Clarity 代码已存在，无需重复添加");
  process.exit(0);
}

// 1. 添加 Script 导入
if (!content.includes('from "next/script"')) {
  content = content.replace(
    'import type { Metadata } from "next";',
    'import type { Metadata } from "next";\nimport Script from "next/script";'
  );
}

// 2. 在 </body> 之前插入 Clarity Script
const clarityScript = `        <Script id="ms-clarity" strategy="afterInteractive">
          {\`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ytuys5fd7j");
          \`}
        </Script>
      </body>`;

content = content.replace("      </body>", clarityScript);

writeFileSync(layoutPath, content, "utf-8");

console.log("✅ 已将 Microsoft Clarity 追踪代码加入 src/app/layout.tsx");
console.log("");
console.log("📌 使用说明：");
console.log("   • Project ID: ytuys5fd7j");
console.log("   • 加载策略: afterInteractive（页面交互后加载，不阻塞首屏）");
console.log("   • 本地开发也会上报，如需只在生产环境启用，可用 NODE_ENV 判断");
console.log("");
console.log("🚀 部署到 Vercel 后，访问 https://clarity.microsoft.com 查看数据");
console.log("   （首次有数据通常要等 2 小时左右）");
