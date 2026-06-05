# prompt-rules.md — BHB Components

Rules for AI tools (Claude Code, Claude.ai, etc.) generating prototypes against this library.

## Hard rules

- **Components live in `components/`**. Import from the barrel: `import { Button } from 'bhb-components'`.
- **Use existing components only**. Never write a custom `<button>`, `<input>`, etc. — use the library equivalent.
- **All colors come from `tokens/colors.css`**. Never hardcode hex values. Use `var(--brand)`, `var(--alert)`, etc.
- **All spacing comes from `tokens/spacing.css`**. No `px` literals for padding/margin/gap.
- **All typography comes from `tokens/typography.css`**. Use the predefined type scale (XXXL → XS, regular/bold/caps).
- **Class names use BEM with `bhb-` prefix**: `.bhb-button`, `.bhb-button--primary`, `.bhb-button__label`.
- **Default labels are German**: "Speichern & Weiter", "Abbrechen", "Hinzufügen", "Löschen". This is BuchhaltungsButler — a German accounting/bookkeeping product.

## Banned patterns

- Tailwind utility classes
- Inline `style={}` props
- CSS-in-JS libraries (styled-components, emotion, etc.)
- Material UI, Chakra UI, Ant Design, or any other competing component library
- Hardcoded font-family declarations. Use Lato via tokens.
- Hex colors anywhere — every color must reference a CSS variable from `tokens/colors.css`.
- `border-radius` literals on components — production design is intentionally square (0px). Use `var(--bhb-radius-none)` if a radius token exists.

## Color palette

*Filled by `figma-tokens-extract`. Source: Figma "Color" variable collection.*

## Typography

*Filled by `figma-tokens-extract`. Font family: Lato. Type scale: XXXL/XXL/XXML/XL/L/M/S/XS at 40/28/26/19/16/14/12/10 px, with Bold and Caps variants.*

## Spacing

*Filled by `figma-tokens-extract`. Production scale uses `$br[N]` tokens (e.g. $br8, $br12, $br18).*

## Production context

- Production stack: PHP + SCSS + Foundation (legacy). This Claude Code library targets React + TS + CSS variables for **prototyping only** — it is not the production code.
- Production class names use camelCase (e.g. `.buttonPrimary`, `.narrow`, `.iconOnly`). The new library uses BEM with `bhb-` prefix — the two systems don't conflict if loaded together.
- Production uses FontAwesome (`far fa-*`) plus a custom `.fbbr` BHB icon font. Library icon strategy TBD when icon component is built.

## Per-component rules

*Filled in by `component-from-figma` as components are added.*

### Button (coming soon)

Figma source: file `fUcrmr5PRAIQulDadSGsB8`, page "Button", Component Set "Button" with three properties:
- `Variant`: Primary | Secondary | Ghost | Danger
- `Size`: Large (Medium/Small to be added)
- `State`: Rest | Hover | Focus | Disabled | Loading

20 variants built. See `docs/button-spec-for-figma.md` for the full spec.
