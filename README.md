# bhb-components

BuchhaltungsButler design system — Claude Code prototyping library.

This is **not** the production code. It's a React + TS + CSS-variables library that mirrors
the BuchhaltungsButler visual language, intended for AI tools (Claude Code, Claude.ai,
Figma Make, v0, Lovable) to use when generating prototypes and flows.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

## Project structure

```
tokens/         Design tokens (colors, spacing, typography) as CSS variables
components/     React components (TSX + CSS per component)
prototypes/     Sample prototype pages built from the components
reference/      Production code snippets the AI uses for convention matching
docs/           Spec documents (Button spec, Figma readiness report, build state ledger)
manifest.json   AI-consumable index of components + tokens
prompt-rules.md Rules for AI tools generating code against this library
CLAUDE.md       Project rules loaded at the start of every Claude Code session
```

## Fonts

The library uses **Lato** (400 and 700 weights). It's loaded from Google Fonts in
`index.html` via a `<link>` tag with `display=swap` so text shows immediately in a
system fallback and swaps to Lato when it arrives. No font files are bundled — the
browser fetches them from `fonts.googleapis.com` on first load.

If you're using `bhb-components` inside your own app (not this showcase), make sure
your app's HTML loads Lato too — either via the same Google Fonts link or by
self-hosting the font files.

## Related

- **Figma file:** https://www.figma.com/design/fUcrmr5PRAIQulDadSGsB8/Styles---Components-Webapp
- **Production repo:** https://github.com/danielbarfuss-visma/bhb-design-system

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check + production build
- `npm run preview` — preview the production build locally
