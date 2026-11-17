// edit/fix-site-info-02.mjs
// 站内信息修复 batch 2:
//  (1) 全站批量: "3.3.3 m" -> "3.3 m"  (40+ 处错误尺寸, EN + ES + 博客组件)
//  (2) 死链: /blog/curved-tempered-glass-vs-flat-tempered-glass -> /blog/curved-glass-vs-flat-glass
// 字面替换(非正则), × 等 Unicode 不受影响; 幂等; 备份到 edit/_bak_02/. 根目录运行:
//   node edit\fix-site-info-02.mjs   然后   npm run build
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, copyFileSync } from "node:fs";
import { join, dirname, relative } from "node:path";

const ROOT = "src";
const BAK = "edit/_bak_02";
const EXTS = new Set([".ts", ".tsx"]);

const REPLACEMENTS = [
  ["3.3.3 m", "3.3 m"],
  ["/blog/curved-tempered-glass-vs-flat-tempered-glass", "/blog/curved-glass-vs-flat-glass"],
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else {
      const dot = name.lastIndexOf(".");
      if (dot >= 0 && EXTS.has(name.slice(dot))) out.push(p);
    }
  }
  return out;
}

const touched = [];
const hits = { "3.3.3 m": 0, deadlink: 0 };
for (const f of walk(ROOT)) {
  const raw = readFileSync(f, "utf8");
  let next = raw;
  for (const [a, b] of REPLACEMENTS) {
    const before = next;
    next = next.split(a).join(b);
    if (next !== before) {
      const n = (before.length - next.length) / Math.max(1, a.length - b.length);
      if (a.startsWith("3.3.3")) hits["3.3.3 m"] += Math.round(n);
      else hits.deadlink += 1;
    }
  }
  if (next !== raw) {
    const bak = join(BAK, relative(ROOT, f));
    mkdirSync(dirname(bak), { recursive: true });
    copyFileSync(f, bak);
    writeFileSync(f, next);
    touched.push(f);
  }
}

console.log(`Changed ${touched.length} files.  "3.3.3 m" fixes: ${hits["3.3.3 m"]}, deadlink fixes: ${hits.deadlink}`);
for (const t of touched) console.log("  " + t);
console.log(touched.length ? "Backups in edit/_bak_02/. Now run: npm run build" : "No matches (already clean).");