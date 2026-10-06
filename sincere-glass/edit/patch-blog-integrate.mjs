/**
 * patch-blog-integrate.mjs
 * 
 * Handles the 3 manual integration steps:
 * 1. Add blog-prose.css import to globals.css
 * 2. Replace BlogTeaser with BlogTeaserLive on homepage
 * 3. Add /blog link to Header nav
 * 
 * Run from project root: node edit\patch-blog-integrate.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';

let changes = 0;

function patch(filepath, description, searchStr, replaceStr) {
  if (!existsSync(filepath)) {
    console.log(`⚠️  File not found: ${filepath} — skipping`);
    return false;
  }
  let content = readFileSync(filepath, 'utf8');
  if (content.includes(replaceStr.trim())) {
    console.log(`⏭️  Already patched: ${description}`);
    return false;
  }
  if (!content.includes(searchStr)) {
    console.log(`⚠️  Search string not found in ${filepath} for: ${description}`);
    console.log(`    Looking for: "${searchStr.slice(0, 80)}..."`);
    return false;
  }
  content = content.replace(searchStr, replaceStr);
  writeFileSync(filepath, content, 'utf8');
  console.log(`✅ ${description}`);
  changes++;
  return true;
}

function prepend(filepath, description, textToAdd) {
  if (!existsSync(filepath)) {
    console.log(`⚠️  File not found: ${filepath} — skipping`);
    return false;
  }
  let content = readFileSync(filepath, 'utf8');
  if (content.includes(textToAdd.trim())) {
    console.log(`⏭️  Already patched: ${description}`);
    return false;
  }
  content = textToAdd + content;
  writeFileSync(filepath, content, 'utf8');
  console.log(`✅ ${description}`);
  changes++;
  return true;
}

// ---- Step 1: Add blog-prose.css import to globals.css ----
const globalsPath = 'src/app/globals.css';
if (existsSync(globalsPath)) {
  const globals = readFileSync(globalsPath, 'utf8');
  if (globals.includes('blog-prose.css')) {
    console.log('⏭️  Already patched: blog-prose.css import');
  } else {
    // Find the right place to insert — after existing @import lines, or before @tailwind
    let newContent;
    if (globals.includes('@tailwind')) {
      // Insert before @tailwind directives
      newContent = globals.replace(
        /(@tailwind\s)/,
        "@import '../styles/blog-prose.css';\n\n$1"
      );
    } else if (globals.includes('@import')) {
      // Append after last @import
      const lastImportIndex = globals.lastIndexOf('@import');
      const lineEnd = globals.indexOf('\n', lastImportIndex);
      newContent =
        globals.slice(0, lineEnd + 1) +
        "@import '../styles/blog-prose.css';\n" +
        globals.slice(lineEnd + 1);
    } else {
      // Just prepend
      newContent = "@import '../styles/blog-prose.css';\n\n" + globals;
    }
    writeFileSync(globalsPath, newContent, 'utf8');
    console.log('✅ Step 1: Added blog-prose.css import to globals.css');
    changes++;
  }
} else {
  console.log('⚠️  globals.css not found at ' + globalsPath);
}

// ---- Step 2: Replace BlogTeaser with BlogTeaserLive on homepage ----
// Try common homepage paths
const homePagePaths = [
  'src/app/page.tsx',
  'src/app/(home)/page.tsx',
];

let homePatched = false;
for (const homePath of homePagePaths) {
  if (!existsSync(homePath)) continue;

  const homeContent = readFileSync(homePath, 'utf8');

  // Patch import
  if (homeContent.includes('BlogTeaser') && !homeContent.includes('BlogTeaserLive')) {
    let updated = homeContent;

    // Replace import statement
    updated = updated.replace(
      /import\s+BlogTeaser\s+from\s+['"]@\/components\/BlogTeaser['"]/,
      "import BlogTeaserLive from '@/components/BlogTeaserLive'"
    );

    // Replace component usage
    updated = updated.replace(/<BlogTeaser\s*\/>/g, '<BlogTeaserLive />');
    updated = updated.replace(/<BlogTeaser>/g, '<BlogTeaserLive>');
    updated = updated.replace(/<\/BlogTeaser>/g, '</BlogTeaserLive>');

    writeFileSync(homePath, updated, 'utf8');
    console.log(`✅ Step 2: Replaced BlogTeaser → BlogTeaserLive in ${homePath}`);
    changes++;
    homePatched = true;
    break;
  } else if (homeContent.includes('BlogTeaserLive')) {
    console.log('⏭️  Already patched: BlogTeaserLive');
    homePatched = true;
    break;
  }
}
if (!homePatched) {
  console.log('⚠️  Step 2: Could not find BlogTeaser in homepage — do this manually:');
  console.log("    Replace import BlogTeaser from '@/components/BlogTeaser'");
  console.log("    With    import BlogTeaserLive from '@/components/BlogTeaserLive'");
  console.log('    And replace <BlogTeaser /> with <BlogTeaserLive />');
}

// ---- Step 3: Add /blog to Header nav ----
// Try common header paths
const headerPaths = [
  'src/components/Header.tsx',
  'src/components/header/Header.tsx',
  'src/components/layout/Header.tsx',
  'src/components/MegaMenuHeader.tsx',
];

let headerPatched = false;
for (const headerPath of headerPaths) {
  if (!existsSync(headerPath)) continue;

  const headerContent = readFileSync(headerPath, 'utf8');

  if (headerContent.includes("'/blog'") || headerContent.includes('"/blog"') || headerContent.includes('href="/blog"')) {
    console.log('⏭️  Already patched: /blog link in header');
    headerPatched = true;
    break;
  }

  // Try to find the nav items array or links to inject Blog
  // Look for Contact link and add Blog before it
  if (headerContent.includes('/contact')) {
    const updated = headerContent.replace(
      /(\{[^}]*['"]\/contact['"][^}]*\})/,
      "{ name: 'Blog', href: '/blog' },\n      $1"
    );

    if (updated !== headerContent) {
      writeFileSync(headerPath, updated, 'utf8');
      console.log(`✅ Step 3: Added /blog nav link in ${headerPath}`);
      changes++;
      headerPatched = true;
      break;
    }
  }

  // Alternative: look for nav link patterns
  if (headerContent.includes("href=\"/contact\"")) {
    const updated = headerContent.replace(
      /([\s\S]*?)((\s*)<[^>]*href="\/contact")/,
      (match, before, contactPart, indent) => {
        return before + indent + '<Link href="/blog" className={linkClassName}>Blog</Link>' + contactPart;
      }
    );
    // This regex is fragile — flag for manual if it doesn't work
  }
}

if (!headerPatched) {
  console.log('⚠️  Step 3: Could not auto-patch header — please add /blog link manually');
  console.log('    In your Header/nav component, add a "Blog" link pointing to /blog');
  console.log('    (between Equipment/Projects and Contact)');
}

// ---- Summary ----
console.log('');
console.log('━'.repeat(50));
if (changes > 0) {
  console.log(`Done! ${changes} file(s) patched.`);
} else {
  console.log('No changes needed — everything was already patched.');
}
console.log('━'.repeat(50));
