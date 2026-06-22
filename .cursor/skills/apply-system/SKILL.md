---
name: apply-system
description: >-
  Apply this project's design system to a target page — refactor an existing
  page to conform, or build a new page in the system. Reads the local source of
  truth (public/tokens.json for exact color/type/space/radius/motion values,
  public/system.md for voice, principles, anti-patterns, and the component
  contract) and emits code in the TARGET's own tech stack using exact token
  values. Use when asked to "apply the design system", "make this on-brand",
  "refactor this page to our system", "build a <page> in our design system",
  or "restyle this to match our system", or when pointed at a file to bring
  onto the system.
---

# apply-system

## Source of truth
Read BOTH before doing anything:
- `public/tokens.json` — exact token values. Never approximate; copy verbatim.
- `public/system.md` — voice, principles, anti-patterns, component contract.

If either file is missing, stop and tell the user to run `publish-system` first.

## Workflow
1. Read `public/system.md` in full, then `public/tokens.json`.
2. Identify the target (file/page) and the mode: refactor existing, or build new.
3. Detect the target's tech stack from its files (plain HTML/CSS, Astro,
   React+Tailwind, Vue, etc.). Emit code idiomatic to THAT stack — never impose
   this repo's stack on the target.
4. Apply the system:
   - Map every color, font, size, spacing, radius, and motion value to an exact
     token from `tokens.json`. No invented values, no near-matches.
   - Structure UI per the component contract and design principles in `system.md`.
   - Do NOT introduce any listed anti-pattern.
   - Refactor mode: preserve all content and functionality. Build mode: fulfill the brief.
5. Write the changes to the target file(s).
6. Summarize which tokens, components, and rules were applied.

## Hard rules
- Lossless: exact token values only.
- Tech-agnostic: match the target's stack; never require Tailwind/Astro/this repo.
- Closed system: use only tokens/components defined in the system — never invent new ones.
