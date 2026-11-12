// ============================================================
// Sincere Glass — regen wrapper with EBUSY retry
// Marker: SG-REGEN-RETRY-V1
//
// Problem: On Windows, sharp's webp writer holds the file handle
// briefly after returning. prepare-equipment-images.mjs then
// synchronously fs.unlinkSync()'s the just-written file → EBUSY.
// Windows Defender / Explorer thumbnail cache can also lock briefly.
//
// Fix: monkey-patch fs.unlinkSync with retry-on-EBUSY/EPERM,
// then dynamic-import the original script. No edit to the
// original script required.
//
// Usage:
//   node edit\run-regen-with-retry.mjs
// ============================================================

import fs from "node:fs";

const MAX_ATTEMPTS = 25;        // ~6s total worst case
const BACKOFF_MS = 250;

const origUnlinkSync = fs.unlinkSync;
fs.unlinkSync = function patchedUnlinkSync(target) {
  let lastErr;
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    try {
      return origUnlinkSync(target);
    } catch (e) {
      // ENOENT = file already gone, treat as success
      if (e.code === "ENOENT") return;
      // Only retry transient Windows lock errors
      if (e.code !== "EBUSY" && e.code !== "EPERM") throw e;
      lastErr = e;
      // Busy-wait sleep (sync — we're in a sync unlink shim)
      const deadline = Date.now() + BACKOFF_MS;
      while (Date.now() < deadline) {}
      if (i === 0) {
        process.stdout.write(`    [retry] unlink ${target} locked, retrying...`);
      } else {
        process.stdout.write(".");
      }
    }
  }
  console.log(` FAILED after ${MAX_ATTEMPTS} attempts`);
  throw lastErr;
};

// Also patch renameSync and writeFileSync just in case sharp uses them
const origRenameSync = fs.renameSync;
fs.renameSync = function patchedRenameSync(oldPath, newPath) {
  let lastErr;
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    try {
      return origRenameSync(oldPath, newPath);
    } catch (e) {
      if (e.code !== "EBUSY" && e.code !== "EPERM") throw e;
      lastErr = e;
      const deadline = Date.now() + BACKOFF_MS;
      while (Date.now() < deadline) {}
    }
  }
  throw lastErr;
};

console.log("[SG-REGEN-RETRY-V1] fs.unlinkSync + fs.renameSync patched with retry");
console.log("[SG-REGEN-RETRY-V1] handing off to prepare-equipment-images.mjs...\n");

// Dynamic import — original script runs with patched fs
await import("./prepare-equipment-images.mjs");
