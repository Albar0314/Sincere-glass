$ErrorActionPreference = 'Continue'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$SrcDir = "src"
$OutFile = "schema-dupes-$(Get-Date -Format 'yyyyMMdd-HHmm').md"

$patterns = @(
    @{ Name = "Organization type"; Regex = '@type.{0,5}Organization|type:\s*.Organization' },
    @{ Name = "foundingDate"; Regex = 'foundingDate' },
    @{ Name = "WebSite type"; Regex = '@type.{0,5}WebSite|type:\s*.WebSite' },
    @{ Name = "schema.org reference"; Regex = 'schema\.org' },
    @{ Name = "JSON-LD script tag"; Regex = 'application/ld\+json' },
    @{ Name = "Schema helpers"; Regex = 'generateSchema|organizationSchema|orgSchema|OrganizationSchema|getOrgSchema|buildSchema' }
)

$out = New-Object System.Collections.Generic.List[string]
$out.Add("# Schema Duplication Audit - $(Get-Date -Format 'yyyy-MM-dd HH:mm')")
$out.Add("")

foreach ($p in $patterns) {
    $out.Add("## " + $p.Name)
    $out.Add("")
    $out.Add('```')

    $hits = Get-ChildItem -Path $SrcDir -Recurse -File -Include *.ts,*.tsx,*.js,*.jsx,*.mjs -ErrorAction SilentlyContinue |
        Where-Object { $_.FullName -notmatch 'node_modules|\.next|\.turbo|dist|build' } |
        Select-String -Pattern $p.Regex -Encoding UTF8 -ErrorAction SilentlyContinue

    if ($hits) {
        $byFile = $hits | Group-Object Path | Sort-Object Name
        foreach ($g in $byFile) {
            $rel = $g.Name -replace [regex]::Escape((Get-Location).Path + '\'), ''
            $out.Add(("FILE: {0}  (hits: {1})" -f $rel, $g.Count))
            foreach ($h in ($g.Group | Select-Object -First 5)) {
                $snip = $h.Line.Trim()
                if ($snip.Length -gt 120) { $snip = $snip.Substring(0, 120) + "..." }
                $out.Add(("  L{0}: {1}" -f $h.LineNumber, $snip))
            }
            if ($g.Count -gt 5) {
                $out.Add(("  ... and {0} more" -f ($g.Count - 5)))
            }
            $out.Add("")
        }
    } else {
        $out.Add("(no matches)")
    }

    $out.Add('```')
    $out.Add("")
}

$out.Add("## Home / Layout files")
$out.Add("")
$out.Add('```')
$homePages = Get-ChildItem -Path $SrcDir -Recurse -File -Include page.tsx,layout.tsx -ErrorAction SilentlyContinue |
    Where-Object { $_.FullName -notmatch 'node_modules|\.next' }
foreach ($f in $homePages) {
    $rel = $f.FullName -replace [regex]::Escape((Get-Location).Path + '\'), ''
    $out.Add(("- {0}  ({1} bytes)" -f $rel, $f.Length))
}
$out.Add('```')

[System.IO.File]::WriteAllLines((Resolve-Path .).Path + "\" + $OutFile, $out, (New-Object System.Text.UTF8Encoding $false))
Write-Host ("Done: " + $OutFile) -ForegroundColor Green
