import { copyFileSync, mkdirSync, existsSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// === Configuration ============================================
const SOURCE_VIDEO = 'D:\\xwechat_files\\wxid_7gmvc988je6232_591b\\msg\\video\\2026-10\\sincereglassfactory.mp4';
const DEST_VIDEO = join(ROOT, 'public', 'videos', 'factory-broll.mp4');
// ==============================================================

console.log('\n=== Setting up factory b-roll video + components ===\n');

// --- 1. Copy source mp4 to public/videos ---
if (!existsSync(SOURCE_VIDEO)) {
  console.error('[fail] source video not found at: ' + SOURCE_VIDEO);
  console.error('       update SOURCE_VIDEO at the top of this script if the path moved');
  process.exit(1);
}

mkdirSync(dirname(DEST_VIDEO), { recursive: true });
copyFileSync(SOURCE_VIDEO, DEST_VIDEO);
const sizeMB = (statSync(DEST_VIDEO).size / 1024 / 1024).toFixed(2);
console.log('[ok]   copied video -> public/videos/factory-broll.mp4  (' + sizeMB + ' MB)');

if (parseFloat(sizeMB) > 15) {
  console.warn('[warn] video is ' + sizeMB + ' MB; recommended < 10 MB for hero backgrounds.');
  console.warn('       consider compressing later with ffmpeg (one-time winget install).');
} else if (parseFloat(sizeMB) > 8) {
  console.log('[note] video is ' + sizeMB + ' MB; usable but on the heavier side.');
}

// --- 2. Copy component files ---
function copy(templateName, destPath) {
  const src = join(__dirname, templateName);
  if (!existsSync(src)) {
    console.error('[miss] template not found: ' + templateName);
    return false;
  }
  mkdirSync(dirname(destPath), { recursive: true });
  const content = readFileSync(src, 'utf8');
  writeFileSync(destPath, content);
  console.log('[ok]   ' + destPath.replace(ROOT, '').replace(/\\/g, '/'));
  return true;
}

const COMPONENTS_DIR = join(ROOT, 'src', 'components');
copy('FactoryBrollLoop.tsx.txt', join(COMPONENTS_DIR, 'FactoryBrollLoop.tsx'));
copy('YouTubeEmbed.tsx.txt',     join(COMPONENTS_DIR, 'YouTubeEmbed.tsx'));
copy('VideoSchema.tsx.txt',      join(COMPONENTS_DIR, 'VideoSchema.tsx'));

console.log('\n=== Setup complete. ===\n');
console.log('Next step: wire the components into pages (see snippets in');
console.log('claude/factory-video-integration-guide.md).\n');
console.log('Quick smoke test:');
console.log('  npm run dev');
console.log('  open http://localhost:3000 and verify /videos/factory-broll.mp4 loads');
