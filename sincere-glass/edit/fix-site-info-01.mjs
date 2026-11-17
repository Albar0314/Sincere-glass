// edit/fix-site-info-01.mjs
// 站内信息修复 batch 1:
//  (1) useCountUp.ts - SSR 直接渲染最终数字（修 "0+" 计数器，利好无JS/AI爬虫）
//  (2) sitemap.ts   - productSlugs 补上 curved-tempered-glass
// 读真实文件、写 .bak、幂等、CRLF 容错。根目录运行: node edit\fix-site-info-01.mjs
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const detectEol = (s) => (s.includes("\r\n") ? "\r\n" : "\n");
let changed = 0;

// ---- (1) useCountUp.ts : 整文件重写（极小稳定 util，先备份） ----
{
  const path = "src/lib/useCountUp.ts";
  if (!existsSync(path)) { console.error("MISSING:", path); process.exit(1); }
  const raw = readFileSync(path, "utf8");
  const eol = detectEol(raw);
  if (raw.includes("FIX-COUNTUP-SSR-V1")) {
    console.log("SKIP useCountUp.ts (already patched)");
  } else {
    writeFileSync(path + ".bak", raw);
    const lines = [
      '"use client";',
      '',
      'import { useEffect, useRef, useState } from "react";',
      '',
      '// FIX-COUNTUP-SSR-V1: SSR and no-JS render the final target so crawlers and',
      '// non-JS users see the real number (fixes "0+" counters). On the client, when',
      '// the element scrolls into view (isActive), the value resets to 0 once and',
      '// animates up to the target.',
      'export function useCountUp(target: number, isActive: boolean, duration = 1500) {',
      '  const [count, setCount] = useState(target);',
      '  const hasAnimated = useRef(false);',
      '',
      '  useEffect(() => {',
      '    if (!isActive || hasAnimated.current) return;',
      '    hasAnimated.current = true;',
      '',
      '    setCount(0);',
      '    const startTime = performance.now();',
      '',
      '    function step(now: number) {',
      '      const elapsed = now - startTime;',
      '      const progress = Math.min(elapsed / duration, 1);',
      '      const eased = 1 - Math.pow(1 - progress, 3);',
      '      setCount(Math.round(eased * target));',
      '      if (progress < 1) requestAnimationFrame(step);',
      '    }',
      '',
      '    requestAnimationFrame(step);',
      '  }, [isActive, target, duration]);',
      '',
      '  return count;',
      '}',
      '',
    ];
    writeFileSync(path, lines.join(eol));
    console.log("OK useCountUp.ts patched (.bak written)");
    changed++;
  }
}

// ---- (2) src/app/sitemap.ts : productSlugs 补 curved-tempered-glass ----
{
  const path = "src/app/sitemap.ts";
  if (!existsSync(path)) { console.error("MISSING:", path); process.exit(1); }
  const raw = readFileSync(path, "utf8");
  const eol = detectEol(raw);
  if (raw.includes("curved-tempered-glass")) {
    console.log("SKIP sitemap.ts (curved-tempered-glass already present)");
  } else {
    const anchor = /^([ \t]*)["']low-e-glass["'],[ \t]*\r?\n/m;
    const mm = raw.match(anchor);
    if (!mm) {
      console.error("ANCHOR NOT FOUND in sitemap.ts (low-e-glass). Tail 400:");
      console.error(raw.slice(-400));
      process.exit(1);
    }
    const indent = mm[1];
    writeFileSync(path + ".bak", raw);
    const next = raw.replace(anchor, (full) => full + indent + '"curved-tempered-glass",' + eol);
    writeFileSync(path, next);
    console.log("OK sitemap.ts patched (.bak written)");
    changed++;
  }
}

console.log(changed === 0 ? "No changes." : `Done. ${changed} file(s). Now run: npm run build`);