# bhb-components

**BuchhaltungsButler design system** — a React + TypeScript component library designed
for AI-driven prototyping. Hand it to Claude.ai or Claude Code and ask for a feature; the
result will look and feel like the real BHB product without you having to specify spacing,
colors, or typography.

🔗 **Live showcase:** https://cristinaiftode.github.io/bhb-components/
&nbsp;&nbsp;&nbsp;&nbsp;Components tab → every component live · Tokens tab → color + type scale · Pages tab → full sample screen (Eingangsbelege)

This is **not** the production code. It's a parallel React library that mirrors the
production PHP/SCSS implementation visually, but is structured so an LLM can generate
prototypes from it 1:1 with the Figma source of truth.

## What's inside

- **21 components** — Button, Input, Select, DatePicker, Checkbox, RadioButton, Textarea,
  Modal, Popup, Tooltip, Tag, Message, MultiSelection, ContextMenu, SettingsMenu, Sidebar,
  Layout, Footer, BackLink, Logo, InputWithIcon
- **45 monochrome icons** — all use `currentColor`, so they inherit color from their parent
- **21 color tokens, 8-step type scale, font weights, letter-spacings** — every visual
  decision is a CSS variable, never a hex literal
- **One full sample page** (`Eingangsbelege`) — shows how the components compose into a
  real product screen, with sidebar, sticky toolbar, sortable table, batch-action bar, and
  the company-switcher dropdown wired up end-to-end
- **`manifest.json`** — a machine-readable index of every component, its props, its Figma
  source node, and recommended usage. This is what AI tools read first.
- **`prompt-rules.md`** — the do's and don'ts (use tokens, never hardcode hex, prefer the
  barrel import, ship German labels). Loaded into every Claude Code session via `CLAUDE.md`.

## Using bhb-components in a Claude prototype

### In Claude Code

```bash
# 1. Clone next to where you'll build the prototype
git clone https://github.com/cristinaiftode/bhb-components.git
cd bhb-components
npm install
npm run dev    # open http://localhost:5173 to browse all components

# 2. Start a Claude Code session inside the repo
claude
```

Then prompt Claude with something like:

> Build me a new prototype page for **Anlagengüter** (assets management). Use the existing
> components from `components/index.ts`. Match the patterns in
> `src/pages/EingangsbelegePage.tsx`. Add it as a new entry in the "Pages" tab.

Claude will read `CLAUDE.md` at session start, which tells it to consult `manifest.json`,
`prompt-rules.md`, and `tokens/*.css` before writing any code. The result will use
`<Button>`, `<Tag>`, `<MultiSelection>`, etc., with the right tokens, in German.

### In Claude.ai (web UI)

1. Open a new conversation, add the repo as a project knowledge source. The fastest way:
   - Click **Add content** → paste the **raw URLs** for `manifest.json`,
     `prompt-rules.md`, and `tokens/colors.css`. Example:
     `https://raw.githubusercontent.com/cristinaiftode/bhb-components/main/manifest.json`
   - (Optional but useful) also paste `components/index.ts` so Claude sees the exact
     barrel-import names.
2. Ask Claude to build the prototype. It'll generate code that imports from
   `'bhb-components'` and matches the patterns. Copy that code into your local clone of
   this repo and it'll just work.

### In Figma Make / v0 / Lovable

These tools accept arbitrary URLs/code. Same pattern:
- Drop `manifest.json` into the project context so the tool knows what components exist
- Drop `prompt-rules.md` so it follows the BHB conventions
- The Figma source file is referenced inside the manifest at `library.figma` — useful when
  the tool can read Figma directly

## Project structure

```
tokens/             Design tokens (colors, spacing, typography) as CSS variables
components/         React components — one folder per component
  Button/             Button.tsx + Button.css per component
  icons/icons.tsx     45 icons in a single file, monochrome via currentColor
  index.ts            Barrel export — always `import { X } from 'bhb-components'`
src/
  ComponentsPage.tsx  Showcase: every component with live interactive demos
  TokensPage.tsx      Showcase: color swatches + type scale
  pages/
    EingangsbelegePage.tsx   Full sample page (real BHB Belege view)
prototypes/         Standalone prototype pages — add new ones here
reference/          Production code snippets for convention matching
docs/               Specs (button spec, codebase conventions, Figma readiness report)
manifest.json       AI-consumable index of components + tokens + Figma node ids
prompt-rules.md     Rules for AI tools generating code against this library
CLAUDE.md           Loaded at the start of every Claude Code session
```

## How AI tools should use this library

Three rules, distilled from `prompt-rules.md`:

1. **Always import from the barrel.**
   `import { Button, Input, Modal } from 'bhb-components'` — never reach into
   `components/Button/Button.tsx` directly. The barrel is the public API.
2. **Never hardcode colors, spacing, or typography.** Every value must reference a CSS
   variable from `tokens/*.css` (e.g. `var(--brand)`, `var(--font-size-l)`,
   `var(--letter-spacing-caps)`).
3. **Use German default labels.** BHB is a German accounting product — "Speichern",
   "Abbrechen", "Hinzufügen", "Löschen". Don't translate to English.

## Fonts

The library uses **Lato** (400 and 700 weights). It's loaded from Google Fonts in
`index.html` via a `<link>` tag with `display=swap` so text shows immediately in a system
fallback and swaps to Lato when it arrives. No font files are bundled — the browser
fetches them on first load.

If you're using `bhb-components` inside a different app, make sure that app's HTML loads
Lato too — either via the same Google Fonts link, or by self-hosting the font files.

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check + production build
- `npm run preview` — preview the production build locally

## Related

- **Figma source file:** [Styles - Components Webapp](https://www.figma.com/design/fUcrmr5PRAIQulDadSGsB8/Styles---Components-Webapp)
- **Production repo (read-only reference):** https://github.com/danielbarfuss-visma/bhb-design-system

## License

UNLICENSED — internal BuchhaltungsButler prototyping artifact. Not intended for public
package distribution; intended for use inside teams who build BHB prototypes with Claude.
