# ============================================================
# Sincere Glass — Factory photo placement
# Marker: SG-FACTORY-PHOTOS-V1
#
# Source: D:\xwechat_files\wxid_7gmvc988je6232_591b\msg\file\
#         2026-11\外贸拍摄素材\外贸拍摄素材\
# Repo:   D:\桌面\sincere-glass\sincere-glass\
#
# Places 17 raw factory photos into:
#   A) public/images/equipment-raw/{category}/   (auto-regen gallery)
#   B) public/images/about/                      (About trust strip)
#   C) public/images/blog/_source/               (hero source masters —
#                                                  you convert to webp
#                                                  and overwrite existing
#                                                  {slug}-hero.webp)
#
# Idempotent: Copy-Item -Force overwrites; safe to re-run.
# ============================================================

$ErrorActionPreference = "Stop"

$Src  = "D:\xwechat_files\wxid_7gmvc988je6232_591b\msg\file\2026-11\外贸拍摄素材\外贸拍摄素材"
$Repo = "D:\桌面\sincere-glass\sincere-glass"

if (-not (Test-Path $Src))  { throw "Source folder not found: $Src" }
if (-not (Test-Path $Repo)) { throw "Repo root not found: $Repo" }

# ---- Mapping table: SourceFile -> TargetRelativePath ----
$Mapping = @(
  # A) Equipment page auto-regen (6 categories)
  @{ Src = "切割.png";     Dst = "public\images\equipment-raw\cutting\cutting-1.png" },

  @{ Src = "磨边1.png";    Dst = "public\images\equipment-raw\edging\edging-1.png" },
  @{ Src = "磨边2.png";    Dst = "public\images\equipment-raw\edging\edging-2.png" },

  @{ Src = "夹胶1.png";    Dst = "public\images\equipment-raw\laminating\laminating-1.png" },
  @{ Src = "夹胶2.png";    Dst = "public\images\equipment-raw\laminating\laminating-2.png" },
  @{ Src = "夹胶3.png";    Dst = "public\images\equipment-raw\laminating\laminating-3.png" },

  @{ Src = "中空1.png";    Dst = "public\images\equipment-raw\insulating\insulating-1.png" },
  @{ Src = "中空2.png";    Dst = "public\images\equipment-raw\insulating\insulating-2.png" },
  @{ Src = "中空3.png";    Dst = "public\images\equipment-raw\insulating\insulating-3.png" },
  @{ Src = "中空4.png";    Dst = "public\images\equipment-raw\insulating\insulating-4.png" },
  @{ Src = "异形中空.png"; Dst = "public\images\equipment-raw\insulating\shaped-igu-1.png" },

  @{ Src = "弯钢1.png";    Dst = "public\images\equipment-raw\tempering\curved-tempered-1.png" },
  @{ Src = "弯钢2.png";    Dst = "public\images\equipment-raw\tempering\curved-tempered-2.png" },

  @{ Src = "镀银.png";     Dst = "public\images\equipment-raw\enameling\ceramic-frit-1.png" },

  # B) About page (new raw-material + logistics assets)
  @{ Src = "原片1.png";    Dst = "public\images\about\raw-stock-1.png" },
  @{ Src = "原片2.png";    Dst = "public\images\about\raw-stock-2.png" },
  @{ Src = "原片3.png";    Dst = "public\images\about\raw-stock-3.png" },
  @{ Src = "发货.png";     Dst = "public\images\about\shipping-1.png" },

  # C) Blog Hero source masters (convert to webp → overwrite existing)
  # #24 Low Iron Pillar  → 原片1 (raw clear stock, highest visual trust)
  @{ Src = "原片1.png";    Dst = "public\images\blog\_source\low-iron-glass-complete-guide-hero-src.png" },
  # #26 Insulated Pillar → 中空1
  @{ Src = "中空1.png";    Dst = "public\images\blog\_source\insulated-glass-complete-guide-hero-src.png" },
  # #27 Double vs Triple → 中空3
  @{ Src = "中空3.png";    Dst = "public\images\blog\_source\double-pane-vs-triple-pane-hero-src.png" }
)

# ---- Pre-flight: verify all source files exist ----
$missing = @()
foreach ($m in $Mapping) {
  $sp = Join-Path $Src $m.Src
  if (-not (Test-Path -LiteralPath $sp)) { $missing += $m.Src }
}
if ($missing.Count -gt 0) {
  Write-Host "[!] Missing source files:" -ForegroundColor Red
  $missing | ForEach-Object { Write-Host "    - $_" }
  throw "Aborting. Verify source folder contents match expected 17 filenames."
}

# ---- Execute copy ----
$copied = 0
foreach ($m in $Mapping) {
  $sp = Join-Path $Src  $m.Src
  $dp = Join-Path $Repo $m.Dst
  $dd = Split-Path $dp -Parent
  if (-not (Test-Path -LiteralPath $dd)) {
    New-Item -ItemType Directory -Path $dd -Force | Out-Null
  }
  Copy-Item -LiteralPath $sp -Destination $dp -Force
  Write-Host "[+] $($m.Src)  ->  $($m.Dst)"
  $copied++
}

Write-Host ""
Write-Host "[DONE] $copied file(s) placed." -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1) node edit\prepare-equipment-images.mjs"
Write-Host "     (regenerates src\lib\equipment-gallery.ts from equipment-raw\)"
Write-Host ""
Write-Host "  2) Convert 3 hero sources to WebP (Squoosh / cwebp / sharp), save to:"
Write-Host "       public\images\blog\low-iron-glass-complete-guide-hero.webp"
Write-Host "       public\images\blog\insulated-glass-complete-guide-hero.webp"
Write-Host "       public\images\blog\double-pane-vs-triple-pane-hero.webp"
Write-Host "     (1600x900, quality 85 — overwrites existing AI-generated hero)"
Write-Host ""
Write-Host "  3) npm run build"
Write-Host "  4) git add public/images  src/lib/equipment-gallery.ts"
Write-Host "     git commit -m `"feat: real factory photos for equipment page + 3 pillar heroes`""
Write-Host "     git push"
