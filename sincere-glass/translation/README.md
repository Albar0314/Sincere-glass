# Translation Pipeline

Multilingual infrastructure for Sincere Glass. Pilot language: Spanish (ES).

## Architecture

- **EN** stays at the root: `sincereglass.com/products`
- **ES** gets a prefix: `sincereglass.com/es/products`
- Translation runs at build time (or on demand), generating a mirror of the EN
  TSX tree under `src/app/es/` with text content replaced.
- Hash-based caching: unchanged content isn't re-translated.
- Industry glossary enforces consistent terminology (vidrio templado, valor U, etc.)

## Setup

1. Copy `config.example.mjs` to `config.mjs` and fill in your relay API credentials.
2. Review `glossary/es.json` and adjust any terms you want translated differently.
3. The pipeline script (coming in the next patch) reads these configs and
   translates specified page files.

## Files

- `glossary/es.json` — Industry terminology mapping (hard-enforced via system prompt)
- `config.mjs` — Your API credentials (gitignored)
- `cache/` — Content-hash-indexed translation cache (gitignored)
- `reports/` — Audit reports after each translation run (gitignored)

## Workflow (once pipeline is in place)

```bash
# Translate a single page
node scripts/translate-page.mjs src/app/page.tsx es

# Translate everything
node scripts/translate-all.mjs es

# Review the audit report
cat translation/reports/es-latest.md
```

## Glossary rules

The glossary is enforced via the translation system prompt. If a term in the
source EN text matches a glossary key (case-insensitive), the model is required
to use the corresponding ES term. Add new terms whenever you spot an
inconsistent translation during review.
