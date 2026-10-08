// edit/inspect-products.mjs
// 只读诊断脚本：打印产品页文件顶部，查看当前导出配置
// 使用：node edit\inspect-products.mjs

import fs from 'fs';
import path from 'path';

const files = [
  'src/app/products/page.tsx',
  'src/app/products/[slug]/page.tsx',
];

for (const file of files) {
  const fullPath = path.resolve(file);
  console.log('\n' + '='.repeat(80));
  console.log(`📄 ${file}`);
  console.log('='.repeat(80));

  if (!fs.existsSync(fullPath)) {
    console.log('❌ 文件不存在');
    continue;
  }

  const content = fs.readFileSync(fullPath, 'utf-8');
  const lines = content.split('\n');

  // 打印前 50 行
  console.log(`总行数: ${lines.length}\n`);
  console.log('--- 前 50 行 ---');
  for (let i = 0; i < Math.min(50, lines.length); i++) {
    console.log(`${String(i + 1).padStart(3, ' ')}  ${lines[i]}`);
  }

  // 搜索关键字
  console.log('\n--- 关键字搜索 ---');
  const keywords = ['dynamic', 'revalidate', 'generateStaticParams', 'force-static', 'force-dynamic', 'export const'];
  for (const kw of keywords) {
    const matches = [];
    lines.forEach((line, idx) => {
      if (line.includes(kw)) {
        matches.push(`  第 ${idx + 1} 行: ${line.trim()}`);
      }
    });
    if (matches.length > 0) {
      console.log(`\n🔍 "${kw}":`);
      matches.forEach(m => console.log(m));
    }
  }
}

console.log('\n' + '='.repeat(80));
console.log('完成。把上面的输出复制给 Claude。');
