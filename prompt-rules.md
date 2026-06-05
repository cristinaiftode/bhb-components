# prompt-rules.md — BHB Components

Rules for AI tools (Claude Code, Claude.ai, etc.) generating prototypes against this library.

Most of these rules mirror BuchhaltungsButler production conventions (see
[docs/CODEBASE-CONVENTIONS.md](docs/CODEBASE-CONVENTIONS.md)) so the prototyping library
feels consistent with the real product. A few rules diverge intentionally — those are flagged.

## Hard rules

- **Components live in `components/`** — one folder per component (e.g. `components/Button/Button.tsx + Button.css`). Import from the barrel: `import { Button } from 'bhb-components'`.
- **Use existing components only**. Never write a custom `<button>`, `<input>`, etc. — use the library equivalent.
- **All colors come from `tokens/colors.css`**. Never hardcode hex values. Use `var(--brand)`, `var(--alert)`, etc.
- **All spacing comes from `tokens/spacing.css`**. No `px` literals for padding/margin/gap. (Spacing tokens TBD — file is currently a placeholder.)
- **All typography comes from `tokens/typography.css`**. Use the predefined type scale (XXXL → XS, regular/bold/caps) — primitives or the `bhb-text-*` helper classes.
- **Class names use BEM with `bhb-` prefix**: `.bhb-button`, `.bhb-button--primary`, `.bhb-button__label`. **(Intentional divergence from production, which uses camelCase like `.buttonPrimary` — the prefix lets both stylesheets coexist.)**
- **Default labels are German**: "Speichern & Weiter", "Abbrechen", "Hinzufügen", "Löschen". This is BuchhaltungsButler — a German accounting/bookkeeping product.

## Component pattern (matches production)

- **Named exports only.** No default exports in component files.
  ```tsx
  export const Button: React.FunctionComponent<Props> = (props) => { ... }
  ```
- **Inline TypeScript interfaces** at the top of the component file. No separate `.types.ts` files.
  ```tsx
  interface Props {
    variant: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'large' | 'medium' | 'small';
    disabled?: boolean;
    onClick?: () => void;
  }
  ```
- **`React.FunctionComponent<Props>`** is the production convention. Use it consistently.
- **Extend native HTML attributes via intersection** when a component wraps a real element:
  ```tsx
  React.FunctionComponent<{ label: string } & React.InputHTMLAttributes<HTMLInputElement>>
  ```
- **No `any` types.** TypeScript strict mode is enabled.
- **Conditional class strings via `classnames`**:
  ```tsx
  import cx from 'classnames';
  <button className={cx('bhb-button', `bhb-button--${variant}`, { 'bhb-button--disabled': disabled })}>
  ```

## Banned patterns

- Tailwind utility classes
- Inline `style={}` props (except for unavoidable dynamic display/positioning)
- CSS-in-JS libraries (styled-components, emotion, etc.)
- Material UI, Chakra UI, Ant Design, or any other competing component library
- Hardcoded font-family declarations — use Lato via `--font-family-base`
- Hex colors anywhere — every color must reference a CSS variable from `tokens/colors.css`
- `border-radius` literals on components — production design is intentionally square (0px). Use a token if one exists, else `0`.
- `==` and `!=` — always `===` and `!==`
- Nested ternaries — flatten with `if`/`else if` or extract a function
- Default exports in component files (named only)
- Separate `.types.ts` files (inline `interface` instead)

## Code style (matches production ESLint)

- Semicolons required
- camelCase for variables and functions
- Max nesting depth: 4
- Max function params: 8 (refactor to an options object beyond that)
- `async` functions must use `await` (no fire-and-forget)
- Unused function args must be prefixed with `_`

## Icons

Production uses **FontAwesome via React components** plus a custom **`.fbbr`** font for proprietary glyphs. The library should follow the same approach when the Icon component is built:

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
<FontAwesomeIcon icon={faSave} className="bhb-button__icon" />
```

No `lucide-react`, `heroicons`, `phosphor-icons`, etc. — stick with FontAwesome to match production.

## Color palette (extracted 2026-06-05)

11 colors from the Figma "Color" Variable collection. Reference via CSS variables only:

| Token | Hex | Common use |
|---|---|---|
| `--brand` | `#00A8FF` | Primary CTA bg, link color |
| `--brand-shade` | `#0097E6` | Primary CTA hover |
| `--alert` | `#E84118` | Destructive / error |
| `--alert-shade` | `#C23616` | Danger button hover |
| `--black-grey` | `#2F3640` | Primary text |
| `--jeans-grey` | `#7F8FA6` | Secondary text |
| `--rain-grey` | `#B1B8C2` | Borders, secondary hover |
| `--moon-grey` | `#BCC3CE` | Disabled / subtle |
| `--cloud-grey` | `#C8D0DC` | Secondary button bg |
| `--snow` | `#F9FAFF` | Ghost button hover, app bg |
| `--white` | `#FFFFFF` | Default surface |

## Typography (extracted 2026-06-05)

Font family: **Lato**. Type scale: XXXL/XXL/XXML/XL/L/M/S/XS at 40/28/26/19/16/14/12/10 px.

Two ways to use it:

**Primitives (compose your own):**
```css
.thing {
  font-family: var(--font-family-base);
  font-size: var(--font-size-l);
  line-height: var(--line-height-l);
  font-weight: var(--font-weight-bold);
}
```

**Helper classes (32 of them — one per Figma text style):**
```tsx
<h1 className="bhb-text-bold-xxxl">Speichern & Weiter</h1>
<p className="bhb-text-m">Body copy.</p>
<small className="bhb-text-caps-bold-xs">Status</small>
```

Pattern: `bhb-text-[caps-][bold-]<size>`. Full list in [tokens/typography.css](tokens/typography.css).

## Spacing

*Placeholder. The Figma file has no spacing Variables yet. Production uses a `$br[N]` SCSS scale (`$br4`, `$br8`, `$br12`, `$br18`, etc.). When spacing tokens land in Figma, run `figma-tokens-extract` again to populate `tokens/spacing.css`.*

## Production context (read-only reference)

- **Production repo:** `github.com/danielbarfuss-visma/bhb-design-system` (PHP + SCSS + Foundation + small React subtree). This Claude Code library is for **prototyping only** and is not the production code.
- **Production class naming:** camelCase, no prefix (`.buttonPrimary`, `.buttonSecondary`, `.iconOnly`, `.narrow`). Library uses `bhb-` prefix so the two systems can coexist if loaded together.
- **Production styling:** SCSS + classnames. Library uses plain CSS files + classnames (same idiom, simpler tooling).
- **Production icons:** FontAwesome (`.fas`, `.far`) + custom `.fbbr` BHB icon font.

## Per-component rules

*Filled in by `component-from-figma` as components are added.*

### Button

Standard button component. Use for all clickable CTAs and actions.

**Import:**
```tsx
import { Button } from 'bhb-components';
```

**Variants:**

| Variant | Use for | Background (rest → hover) | Text |
|---|---|---|---|
| `primary` (default) | Main CTA, "Speichern & Weiter" | `--brand` → `--brand-shade` | `--white` |
| `secondary` | Neutral / cancel, "Abbrechen" | `--cloud-grey` → `--rain-grey` | `--black-grey` |
| `ghost` | Low-emphasis tertiary action | `--white` → `--snow` | `--brand` |
| `danger` | Destructive action, "Löschen" | `--alert` → `--alert-shade` | `--white` |

**Sizes:** `large` (48px, default), `medium` (40px), `small` (32px). All share 18px horizontal padding.

**Modes:**
- `loading` — replaces label with a spinner, sets `aria-busy`, blocks clicks
- `disabled` — native, drops text to 35% opacity
- `iconLeft` / `iconRight` — passes a ReactNode (e.g., `<FontAwesomeIcon icon={faSave} />`) before/after the label
- `iconOnly` — hides the label, renders children as a centered 24px icon, button becomes square

**Usage:**

```tsx
// Standard
<Button onClick={save}>Speichern & Weiter</Button>

// Variant + size
<Button variant="danger" size="small" onClick={remove}>Löschen</Button>

// With icon
<Button iconLeft={<FontAwesomeIcon icon={faSave} />}>Speichern</Button>

// Loading
<Button variant="primary" loading>Speichern & Weiter</Button>

// Icon-only (square)
<Button iconOnly variant="ghost" aria-label="Menü öffnen">
  <FontAwesomeIcon icon={faBars} />
</Button>
```

**CSS class skeleton:**

```css
.bhb-button { /* base — flex, height by size, padding 0 18px, font Lato bold 14, border-radius 0 */ }
.bhb-button--primary | --secondary | --ghost | --danger
.bhb-button--size-large | --size-medium | --size-small
.bhb-button--loading | --icon-only
.bhb-button__label
.bhb-button__icon
.bhb-button__spinner
```

**Notes:**
- Focus ring uses `outline: 2px solid var(--brand); outline-offset: 2px;` Known limitation: Primary variant has weak contrast (Brand-on-Brand) — designer to refine when needed.
- Loading spinner is CSS-only (`currentColor` ring) — no SVG dependency. Inherits the button's text color so it works on every variant.
- The component extends `React.ButtonHTMLAttributes<HTMLButtonElement>` — pass any native button attribute (`onClick`, `type`, `aria-*`, etc.).

**Figma source:** file `fUcrmr5PRAIQulDadSGsB8`, page "Button", Component Set `3225:6` with three variant properties (Variant / Size / State). 20 variants built. Full spec: [docs/button-spec-for-figma.md](docs/button-spec-for-figma.md).
