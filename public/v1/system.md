# Vibe Coding Design System — System Spec

Machine- and human-readable definition of this design system. An agent should
read this file plus `tokens.json`, then apply the system to a target in the
target's own tech stack — using exact token values, never approximations.

## Tokens

### font
- `--font-display`: `ui-serif, Georgia, "Times New Roman", serif`
- `--font-body`: `system-ui, -apple-system, "Segoe UI", sans-serif`

### color
- `--color-bg`: `oklch(1 0 0)`
- `--color-surface`: `oklch(0.975 0 0)`
- `--color-ink`: `oklch(0.2 0 0)`
- `--color-muted`: `oklch(0.48 0 0)`
- `--color-line`: `oklch(0.88 0 0)`
- `--color-primary`: `oklch(0.42 0 0)`
- `--color-primary-hover`: `oklch(0.36 0 0)`
- `--color-accent`: `oklch(0.72 0 0)`
- `--color-accent-ink`: `oklch(0.28 0 0)`
- `--color-coral`: `oklch(0.58 0 0)`
- `--color-green`: `oklch(0.46 0 0)`
- `--color-success`: `oklch(0.48 0 0)`
- `--color-error`: `oklch(0.52 0 0)`
- `--color-focus`: `oklch(0.55 0 0)`

### space
- `--space-xs`: `0.25rem`
- `--space-sm`: `0.5rem`
- `--space-md`: `1rem`
- `--space-lg`: `1.5rem`
- `--space-xl`: `2.5rem`
- `--space-2xl`: `4rem`
- `--space-3xl`: `6rem`

### text
- `--text-caption`: `0.8125rem`
- `--text-secondary`: `0.9375rem`
- `--text-body`: `1rem`
- `--text-subheading`: `1.125rem`
- `--text-heading`: `1.5rem`
- `--text-display`: `clamp(2.25rem, 4vw + 1rem, 4.5rem)`

### radius
- `--radius-sm`: `0.25rem`
- `--radius-md`: `0.5rem`
- `--radius-lg`: `0.75rem`

### z
- `--z-dropdown`: `10`
- `--z-sticky`: `20`
- `--z-modal-backdrop`: `30`
- `--z-modal`: `40`
- `--z-toast`: `50`
- `--z-tooltip`: `60`

### ease
- `--ease-out-quart`: `cubic-bezier(0.25, 1, 0.5, 1)`

### duration
- `--duration-fast`: `150ms`
- `--duration-normal`: `220ms`

## Status: neutral canvas

No design context defined yet — these are placeholder/neutral tokens. Run
`/impeccable init` then `/impeccable document` to generate `PRODUCT.md` and
`DESIGN.md`, then re-run `publish-system` to enrich this spec.

## Applying this system

1. Read this file and `tokens.json`.
2. Detect the target project's stack; emit idiomatic code for it.
3. Map every color/type/space/radius/motion value to an exact token above.
4. Follow the voice and visual rules; introduce none of the anti-patterns.
