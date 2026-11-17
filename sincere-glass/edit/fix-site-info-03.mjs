// edit/fix-site-info-03.mjs
// 站内信息修复 batch 3:
//  (A) 标题双品牌: 每个页面 metadata.title (文件内第一处 title:) 去掉自带品牌
//      ("| Sincere Glass" / "— Sincere Glass" / "| Sincere Glass Blog" / "| Blog de Sincere Glass")
//      —— 让 layout 的 template "%s | Sincere Glass" 只补一次; og/twitter title 不动; 首页自动跳过
//  (B) 认证数: 95 -> 从 manifest 动态算 (WITC 规格报告 = tempered+laminated+insulated+lowE = 90)
// 只改每文件第一处 title: 行, 幂等; Unicode 用 \u 转义匹配, 脚本本体纯 ASCII.
//   node edit\fix-site-info-03.mjs   然后   npm run build
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, copyFileSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";

const BAK = "edit/_bak_03";
function backup(path, raw) {
  const b = join(BAK, path.replace(/^src[\\/]/, ""));
  mkdirSync(dirname(b), { recursive: true });
  copyFileSync(path, b);
}

// ---------- Part A: 标题去重 ----------
const BRAND_RE = /\s*(\||\u2014|\u2013|-)\s*(?:Blog de\s*)?Sincere Glass(?:\s*Blog)?/;

function walkPages(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkPages(p, out);
    else if (name === "page.tsx") out.push(p);
  }
  return out;
}

const targets = walkPages("src/app");
const blogLayout = "src/components/blog/BlogArticleLayout.tsx";
if (existsSync(blogLayout)) targets.push(blogLayout);

const titleTouched = [];
for (const f of targets) {
  const raw = readFileSync(f, "utf8");
  // 无 /g 的 replace 只命中第一处 title: 行 = metadata.title
  const next = raw.replace(/^[ \t]*title:[^\n]*$/m, (line) =>
    BRAND_RE.test(line) ? line.replace(BRAND_RE, "") : line
  );
  if (next !== raw) {
    backup(f, raw);
    writeFileSync(f, next);
    titleTouched.push(f);
  }
}

// ---------- Part B: 认证数动态化 ----------
{
  const f = "src/app/certifications/page.tsx";
  if (!existsSync(f)) {
    console.error("MISSING:", f);
  } else {
    const orig = readFileSync(f, "utf8");
    let raw = orig;
    const eol = raw.includes("\r\n") ? "\r\n" : "\n";

    // B1: 在 manifest import 后声明 WITC_REPORT_COUNT (幂等)
    if (!raw.includes("WITC_REPORT_COUNT")) {
      const importRe = /^(import manifest from "@\/lib\/test-reports-manifest\.json";)[ \t]*\r?\n/m;
      if (importRe.test(raw)) {
        const decl =
          'const WITC_REPORT_COUNT = ["tempered", "laminated", "insulated", "lowE"]' +
          '.reduce((n, k) => n + (((manifest as any)[k])?.length || 0), 0);' + eol;
        raw = raw.replace(importRe, (m, imp) => imp + eol + decl);
      } else {
        console.error("B1 anchor (manifest import) NOT FOUND - 跳过 count 接线, 请人工检查");
      }
    }

    // B2: meta 描述 95 -> ${WITC_REPORT_COUNT} (该串转模板字面量)
    const descOld =
      '"95 independent test reports from WITC (CMA-accredited lab), covering every architectural glass specification Sincere Glass produces. Verified under GB 15763.2-2005.",';
    const descNew =
      '`${WITC_REPORT_COUNT} independent test reports from WITC (CMA-accredited lab), covering every architectural glass specification Sincere Glass produces. Verified under GB 15763.2-2005.`,';
    if (raw.includes(descOld)) raw = raw.replace(descOld, descNew);
    else console.error("B2 anchor (desc '95 independent...') NOT FOUND - 请人工检查 line 10");

    // B3: 徽章 "95 Reports Available" -> 动态
    if (raw.includes(">95 Reports Available<")) raw = raw.replace(">95 Reports Available<", ">{WITC_REPORT_COUNT} Reports Available<");
    else console.error("B3 anchor ('95 Reports Available') NOT FOUND - 请人工检查 line 39");

    if (raw !== orig) {
      backup(f, orig);
      writeFileSync(f, raw);
      console.log("OK certifications/page.tsx -> 95 改为动态 (7+27+28+28 = 90)");
    } else {
      console.log("SKIP certifications (已是最新或 anchor 未命中)");
    }
  }
}

console.log(`\n标题去重: ${titleTouched.length} 个文件`);
for (const t of titleTouched) console.log("  " + relative(".", t));
console.log(titleTouched.length ? "备份在 edit/_bak_03/. 现在跑: npm run build" : "标题无改动");