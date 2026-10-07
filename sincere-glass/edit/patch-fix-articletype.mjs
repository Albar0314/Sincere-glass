import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const f = join(process.cwd(), 'src', 'lib', 'blog-registry.ts');
let c = readFileSync(f, 'utf-8');
c = c.replace("articleType: 'Comparison' as const,", "articleType: 'comparison' as const,");
writeFileSync(f, c);
console.log('✅ blog-registry.ts — articleType fixed to lowercase "comparison"');
