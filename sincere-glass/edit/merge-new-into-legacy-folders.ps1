# ============================================================
# Sincere Glass — merge new equipment-raw folders into legacy ones
# Marker: SG-MERGE-EQUIPMENT-RAW-V1
#
# Problem: prepare-equipment-images.mjs's CATEGORY_MAP matches
# multiple folder aliases to the same key. If both old and new
# folders exist (e.g. "cutting" + "cutting equipment"), script
# wipes output dir twice, hitting EBUSY on sharp's residual handle.
#
# Fix: merge new folder contents into legacy folder with sequential
# renaming (continuing legacy's numbering), then delete empty new.
#
# Preserves all historical equipment photos; adds new factory photos
# as higher-numbered entries.
#
# Idempotent: if new folder gone/empty, skips cleanly.
# ============================================================

$ErrorActionPreference = "Stop"

$Raw = "D:\桌面\sincere-glass\sincere-glass\public\images\equipment-raw"

# Mapping: new folder (created by place-factory-photos.ps1) -> legacy folder (preserved)
$Mergers = @(
  @{ New = "cutting";     Old = "cutting equipment" },
  @{ New = "edging";      Old = "Edge grinding equipment" },
  @{ New = "insulating";  Old = "Hollow device" },
  @{ New = "laminating";  Old = "Laminating equipment" },
  @{ New = "tempering";   Old = "Tempering equipment" }
)

foreach ($m in $Mergers) {
  $newPath = Join-Path $Raw $m.New
  $oldPath = Join-Path $Raw $m.Old

  if (-not (Test-Path -LiteralPath $newPath)) {
    Write-Host "[skip] '$($m.New)' not found (already merged?)" -ForegroundColor DarkGray
    continue
  }
  if (-not (Test-Path -LiteralPath $oldPath)) {
    Write-Host "[!] Legacy folder '$($m.Old)' missing — renaming '$($m.New)' to it instead" -ForegroundColor Yellow
    Rename-Item -LiteralPath $newPath -NewName $m.Old
    continue
  }

  # Count existing files in old folder to determine starting index
  $existing = @(Get-ChildItem -LiteralPath $oldPath -File | Where-Object { $_.Extension -match '\.(png|jpe?g|webp)$' })
  $startIdx = $existing.Count + 1

  # Get new files sorted naturally (so insulating-1 < insulating-2 < shaped-igu-1)
  $newFiles = @(Get-ChildItem -LiteralPath $newPath -File | Where-Object { $_.Extension -match '\.(png|jpe?g|webp)$' } | Sort-Object Name)

  if ($newFiles.Count -eq 0) {
    Write-Host "[skip] '$($m.New)' has no images; removing empty folder" -ForegroundColor DarkGray
    Remove-Item -LiteralPath $newPath -Force -Recurse
    continue
  }

  Write-Host ""
  Write-Host "[$($m.New) -> $($m.Old)]  (legacy has $($existing.Count), adding $($newFiles.Count))" -ForegroundColor Cyan

  $idx = $startIdx
  foreach ($f in $newFiles) {
    $ext = $f.Extension.ToLower()
    $dest = Join-Path $oldPath "$idx$ext"
    # Avoid overwriting if dest somehow exists (shouldn't, but safe)
    while (Test-Path -LiteralPath $dest) {
      $idx++
      $dest = Join-Path $oldPath "$idx$ext"
    }
    Move-Item -LiteralPath $f.FullName -Destination $dest
    Write-Host "  $($f.Name)  ->  $idx$ext"
    $idx++
  }

  # Remove the now-empty new folder
  $remaining = @(Get-ChildItem -LiteralPath $newPath -File)
  if ($remaining.Count -eq 0) {
    Remove-Item -LiteralPath $newPath -Force -Recurse
    Write-Host "  [cleanup] removed empty '$($m.New)' folder" -ForegroundColor DarkGray
  } else {
    Write-Host "  [warn] '$($m.New)' still has $($remaining.Count) non-image file(s); not removed" -ForegroundColor Yellow
  }
}

Write-Host ""
Write-Host "[DONE] Merge complete. Final state of equipment-raw:" -ForegroundColor Green
Write-Host ""
Get-ChildItem -LiteralPath $Raw -Directory | ForEach-Object {
  $count = (Get-ChildItem $_.FullName -File -ErrorAction SilentlyContinue).Count
  "  {0,-35} {1} files" -f $_.Name, $count
}

Write-Host ""
Write-Host "Next: node edit\run-regen-with-retry.mjs  (should now complete without EBUSY)"
