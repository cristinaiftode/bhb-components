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

**Code Connect:** template at [components/Button/Button.figma.ts](components/Button/Button.figma.ts) maps the Figma Component Set → code component. Property mapping: Variant→`variant`, Size→`size`, State→`disabled`/`loading` booleans (Rest/Hover/Focus are CSS-only). **Registered on 2026-06-05** — all 20 variants link to `components/Button/Button.tsx` in Figma Dev Mode.

### Forms components

Seven form-family components, all sharing the same labeling + helper + error pattern. Each wraps a native HTML element for accessibility and behavior, with custom styling on top.

**Shared props across the input family** (`Input`, `InputWithIcon`, `Textarea`, `Select`, `DatePicker`):
- `label?: string` — uppercase label above the field
- `helperText?: string` — small text below
- `error?: string` — error message; presence triggers red border + red text
- `prompt?: boolean` — Figma `Type=Prompt` variant. Currently visually identical to default; reserved for future divergence.
- `disabled?: boolean`, `readOnly?: boolean` — native attributes

**Shared visual treatment:**
- Field height: 48px (matches Button Large) for inputs / 80px min for textarea
- Border: 1px rain-grey, transitions to brand on hover/focus, alert on error
- Border-radius: 0 (square — matches Button)
- Focus: 1px inset box-shadow doubles the border to 2px visually; outer `outline` ring on `:focus-visible`
- Font: Lato 14px (`var(--font-size-m)`)
- Label uses `bhb-text-caps-bold-s`-equivalent inline styles
- All states bound to existing color tokens

#### Input
```tsx
<Input label="Email" placeholder="name@firma.de" error="Bitte E-Mail eingeben" />
```

#### InputWithIcon
```tsx
<InputWithIcon label="Suche" iconLeft={<FontAwesomeIcon icon={faSearch} />} />
<InputWithIcon label="Token" iconRight={<FontAwesomeIcon icon={faShieldHalved} />} />
```

#### Textarea
```tsx
<Textarea label="Notiz" rows={5} />
```

#### Select
Native `<select>` with custom chevron. Pass `options` (array of `{value, label, disabled?}`) or use `<option>` children directly.
```tsx
<Select label="Land" placeholder="Bitte wählen" options={[
  { value: 'de', label: 'Deutschland' },
  { value: 'at', label: 'Österreich' },
]} />
```

#### DatePicker
Currently a text input with German format placeholder (`TT.MM.JJJJ`) + calendar icon. Full calendar popover is a future iteration — for now, pair it with a state hook and validate the string yourself.
```tsx
<DatePicker label="Geburtsdatum" />
```

#### Checkbox
```tsx
<Checkbox label="Newsletter abonnieren" />
<Checkbox label="AGB akzeptiert" defaultChecked />
```

#### RadioButton
Group via shared `name` attribute. Control via `checked` + `onChange`.
```tsx
<RadioButton name="plan" value="basic" label="Basic" checked={plan === 'basic'} onChange={...} />
<RadioButton name="plan" value="pro"   label="Pro"   checked={plan === 'pro'}   onChange={...} />
```

### Logo + Icons

#### Logo
BHB brand mark (white banderole rectangle + dark "Fliege" bow tie). The bow tie uses `currentColor`. Default width 40px; height auto-scales to 5:4 aspect.
```tsx
import { Logo } from 'bhb-components';
<Logo width={40} />
<Logo width={60} glyphOnly />   // just the bow tie, transparent bg
```

#### Icons
~30 SVG icon components, all monochrome via `currentColor`. They accept `size`, `className`, and any other `<svg>` attribute. Pass them as ReactNodes into any component that takes an icon slot (Button.iconLeft, Sidebar item.icon, InputWithIcon.iconLeft, etc.).

```tsx
import { HomeIcon, TrashIcon, BellIcon } from 'bhb-components';

<Button iconLeft={<TrashIcon size={16} />}>Löschen</Button>
<Sidebar sections={[{ items: [{ id: 'home', label: 'Startseite', icon: <HomeIcon /> }] }]} />
```

**Intent coloring:** for status icons (success, warning, error), set the color on the parent element so the icon inherits via `currentColor`. Do NOT add color directly to the icon as a prop — keep token discipline.

```tsx
<span style={{ color: 'var(--alert)' }}>
  <ExclamationTriangleIcon />
</span>
```

**Available icons** (grouped):
- *Form fields:* CalendarIcon (DatePicker), CaretDownIcon (Select chevron)
- *Nav:* HomeIcon, FileInvoiceIcon, FilePlusIcon, ExchangeIcon, ColumnsIcon, IndustryIcon, ClipboardListIcon, AnalyticsIcon, BellIcon, QuestionCircleIcon, CogIcon
- *Status / common:* CheckIcon, CheckCircleIcon, TimesIcon, TrashIcon, ExclamationTriangleIcon, InfoCircleIcon, ArrowLeftIcon, SyncIcon, RedoIcon, ListIcon, LockIcon, LightbulbIcon, CommentIcon, CutIcon, EraserIcon, FileIcon, FileTimesIcon, TruckIcon, LandmarkIcon
- *Popup-footer (24×24):* ShieldCheckIcon, CommentCheckIcon, FilePdfIcon, FileCodeIcon, HandHoldingUsdIcon, MoneyBillWaveIcon

If you need an icon not on this list, add it to `components/icons/icons.tsx` following the existing pattern (use `currentColor` for fills, no hex codes).

### Data components

#### MultiSelection
Batch-action toolbar shown when N items are selected (Figma 19:299). 42px tall row.

**Anatomy:** Left segment = round badge (`--ink` bg, white text) + label (`--steel-grey` text) on a `--mist` background. Right segments = icon + label action buttons. Segments are visually separated by 1px gaps showing the wrapper's white background — no borders.

**Tone per action** (replaces the old `active` boolean):
- `default` — `--steel-grey` bg, white text + icon. Used for most actions.
- `primary` — `--success-shade` green bg, white text + icon. Use ONE per toolbar for the confirming action.
- `danger` — `--snow` bg, `--steel-grey` text + icon. Use for destructive actions like Löschen.

```tsx
const [selected, setSelected] = useState<string[]>(['a', 'b']);

<MultiSelection
  count={selected.length}
  itemLabel="ausgewählte Belege"
  actions={[
    { id: 'confirm', label: 'Bestätigen',  icon: <CheckIcon />, tone: 'primary', onClick: confirmAll },
    { id: 'lock',    label: 'Festschreiben', icon: <LockIcon />, onClick: lockAll },
    { id: 'assign',  label: 'Zuweisen',    icon: <TruckIcon />, onClick: openAssignDialog },
    { id: 'delete',  label: 'Löschen',     icon: <TrashIcon />, tone: 'danger', onClick: deleteAll },
  ]}
/>
```

Typography is Lato Regular 12px throughout (not bold). Hide the toolbar (don't render it at all) when `count === 0`.

### Overlay components

#### Tooltip
Interactive tooltip that wraps a trigger (Figma 19:116). Dark navy bubble + triangle pointer, 4 placements. Shows on hover AND focus (keyboard-accessible), hides on mouse leave, blur, or Escape. `pointer-events: none` on the bubble so it never intercepts clicks.

```tsx
<Tooltip content="Miete & Nebenkosten" placement="top">
  <Button variant="ghost" iconOnly aria-label="Details">
    <InfoCircleIcon />
  </Button>
</Tooltip>

// Rich content
<Tooltip
  content={<>Miete & Nebenkosten<br/>51.890 €</>}
  placement="right"
>
  <Anlagenverwaltung />
</Tooltip>
```

Props: `content` (the bubble body), `placement` (`top`/`bottom`/`left`/`right`, default `top`), `delay` (ms before showing, default 100), `disabled` (suppress without removing the trigger). The component renders `role="tooltip"` on the bubble and `aria-describedby` on the wrapped trigger for screen readers.

### Feedback components

#### Message
Alert / banner component (Figma 14:887). Three positions × seven types.

**Positions:**
- `content` — minimal, transparent bg, icon + colored text. Use to flag a state next to a form field or inside another container.
- `stack` (default) — full-width colored banner with icon + text + optional close button. Use at the top of a page or modal.
- `inline` — full-width colored banner without icon or close. Use as a static informational strip.

**Types:** `success` (green), `info` (jeans-grey), `warning` (mustard yellow), `warning-light` (pale yellow cream bg, dark text), `error` (alert red), `brand` (brand blue), `inactive` (moon-grey).

```tsx
<Message type="success" onClose={dismiss}>Erfolgreich gespeichert</Message>
<Message type="error" position="content">Pflichtfeld</Message>
<Message type="brand" position="inline">Neue Funktion verfügbar</Message>
<Message type="warning-light" position="inline">Sanfter Hinweis</Message>
```

Each `type` has a default icon (CheckIcon for success, ExclamationTriangleIcon for error, InfoCircleIcon for everything else). Pass `icon={...}` to override or `icon={null}` to suppress.

### Layout components

#### Sidebar
Primary vertical navigation. 298px wide, dark navy (`--black-grey`) background, white text. Sectioned menu items (with uppercase section titles in `--jeans-grey`), optional user header at the top, optional footer items pinned at the bottom.

Items render as `<a>` when `href` is provided, otherwise `<button>`. Active items get a `color-mix(brand, 16%)` background + brand text + bold weight.

```tsx
<Sidebar
  userName="Peter Berg"
  organization="Beispiel GmbH"
  onSettingsClick={openSettings}
  sections={[
    { items: [{ id: 'home', label: 'Startseite', icon: <Icon/>, active: true, href: '/' }] },
    { title: 'Dokumente', items: [
        { id: 'belege', label: 'Belegverwaltung', icon: <Icon/>, href: '/belege' },
        { id: 'rechnung', label: 'Rechnungsstellung', icon: <Icon/>, href: '/rechnung' },
    ]},
  ]}
  footerItems={[
    { id: 'notif', label: 'Benachrichtigungen', icon: <Icon/> },
    { id: 'help',  label: 'Hilfe & Kontakt',  icon: <Icon/> },
  ]}
/>
```

#### Layout
App shell composing Sidebar + main content + Footer (Figma 17:113). CSS grid: sidebar on the left at auto width (full height), main content in `1fr`, optional footer pinned to the bottom of the main column.

```tsx
<Layout
  sidebar={<Sidebar ... />}
  footer={<Footer ... />}
>
  <h1>Startseite</h1>
  <p>Willkommen zurück, Peter.</p>
  {/* page content */}
</Layout>
```

The Layout fills its container vertically — wrap in `min-height: 100vh` for a full-viewport app shell. Main content area gets 32px padding and snow bg. Footer area gets 8px top / 32px sides+bottom.

#### Footer
Thin horizontal bar (**18px tall**). Inline links separated by `·` dots on the left, copyright on the right. Transparent background — designed to sit on the app's snow content area.

```tsx
<Footer
  links={[
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'AGB', href: '/agb' },
  ]}
  copyright="© 2026 BuchhaltungsButler"
/>
```
