# CLAUDE.md — Project rules for BHB Components

Before writing any code in this project:
1. Read `manifest.json` to see what components and tokens exist.
2. Read `prompt-rules.md` for styling rules and banned patterns.
3. Read `tokens/*.css` for available tokens (colors, spacing, typography).
4. Skim `docs/` for the design context (Button spec, Figma readiness report).

## Never

- Invent new colors, tokens, or components. If you need one, ask first.
- Use frameworks/libraries listed under "Banned patterns" in `prompt-rules.md`.
- Hardcode hex values, font names, or pixel literals.
- Skip German default labels — this is BuchhaltungsButler, a German accounting product.

## Always

- Import from the barrel: `import { Button } from 'bhb-components'`.
- Use CSS variables (`var(--brand)`) referenced from `tokens/*.css`.
- Follow BEM with `bhb-` prefix when adding new components.

## Source of truth

- **Design source:** Figma file `fUcrmr5PRAIQulDadSGsB8` ("Styles - Components Webapp").
- **Production code:** `github.com/danielbarfuss-visma/bhb-design-system` (PHP + SCSS — read-only reference; this React library is a separate, prototyping-only artifact).
