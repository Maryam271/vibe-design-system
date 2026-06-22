---
name: publish-system
description: >-
  Regenerate the agent-readable design-system layer (tokens.json, tokens.css,
  system.md, llms.txt) plus the versioned /v1/ copies and the installable
  hosted skill, from the live tokens in src/styles/global.css and the design
  context (PRODUCT.md/DESIGN.md). Use when asked to publish/regenerate/update
  the design system or after changing tokens.
---

# publish-system

Run the generator:

```sh
npm run publish-system
```

This runs `node scripts/publish-system.mjs` and writes the following to `public/`:

- `public/tokens.json` — exact token values (grouped)
- `public/tokens.css` — drop-in `:root` custom properties
- `public/system.md` — human/agent-readable spec (rules + tokens)
- `public/llms.txt` — discovery + how-to-apply for agents
- `public/v1/tokens.json`, `public/v1/tokens.css`, `public/v1/system.md` — versioned copies
- `public/v1/skills/apply-system.md` — installable hosted skill (absolute URLs baked in)

## SITE_URL

The deployed URL is baked in via the `SITE_URL` env var (default:
`https://vibe-design-system.lucas-silva-cea.workers.dev`). Override it:

```sh
SITE_URL=https://your-url npm run publish-system
```

## When to re-run

Re-run after editing tokens in `src/styles/global.css` or after updating
`PRODUCT.md` / `DESIGN.md`. Output lands in `public/`.
