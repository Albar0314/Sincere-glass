#!/usr/bin/env node
/**
 * patch-logo.mjs
 * 替换 Header 和 Footer 中的纯文字 Logo 为图片 + 文字组合
 *
 * 使用方式：在项目根目录运行
 *   node patch-logo.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const ROOT = process.cwd();

function patchFile(relPath, patches) {
  const abs = resolve(ROOT, relPath);
  let content;
  try {
    content = readFileSync(abs, "utf-8");
  } catch {
    console.error(`❌ 找不到文件: ${relPath}`);
    return false;
  }
  let updated = content;
  for (const { find, replace, label } of patches) {
    if (!updated.includes(find)) {
      console.warn(`⚠️  [${relPath}] 找不到目标片段: ${label}`);
      continue;
    }
    updated = updated.replace(find, replace);
    console.log(`✅ [${relPath}] ${label}`);
  }
  if (updated !== content) {
    writeFileSync(abs, updated, "utf-8");
  }
  return true;
}

// ─── 1. Header.tsx ───
patchFile("src/components/Header.tsx", [
  {
    label: "Header Logo: 文字 → 图片+文字",
    find: `<Link href="/" className="font-display text-xl font-bold text-white tracking-tight">
            Sincere Glass
          </Link>`,
    replace: `<Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/logo.png"
              alt="Sincere Glass"
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
              priority
            />
            <span className="font-display text-lg font-bold text-white tracking-tight">
              Sincere Glass
            </span>
          </Link>`,
  },
]);

// ─── 2. Footer.tsx ───
patchFile("src/components/Footer.tsx", [
  {
    label: "Footer: 添加 Image import",
    find: `import Link from "next/link";`,
    replace: `import Link from "next/link";\nimport Image from "next/image";`,
  },
  {
    label: "Footer Logo: 文字 → 图片+文字",
    find: `<h3 className="font-display text-white text-lg font-bold mb-3">
              Sincere Glass
            </h3>`,
    replace: `<div className="flex items-center gap-2.5 mb-3">
              <Image
                src="/images/logo.png"
                alt="Sincere Glass"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <h3 className="font-display text-white text-lg font-bold">
                Sincere Glass
              </h3>
            </div>`,
  },
]);

console.log("\n🎉 Logo 替换完成！运行 npm run dev 预览效果。");
