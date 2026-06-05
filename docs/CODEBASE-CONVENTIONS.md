# Codebase conventions — BuchhaltungsButler (production)

_Scanned 2026-06-05. Source: `/Users/cristinaiftode/bhb-design-system` (cloned from `github.com/danielbarfuss-visma/bhb-design-system`)._

This document records how the **production app** is built. It is a reference for the new
`bhb-components` library — the library does not have to mirror every production convention,
but knowing what production does helps decide which conventions to inherit vs. intentionally diverge from.

## 1. Framework

**PHP side:** PHP 8.1 + Laminas MVC (formerly Zend) + native `.phtml` templates.

**React side:** **React 19.0.0**, **TypeScript 6+**, **Vite 8** as bundler. Sass via Vite plugin. PostCSS limited to autoprefixer only.

> 📌 Note for the new library: production runs React 19; `bhb-components` targets React 18 to stay broadly compatible. All patterns are forward-compatible.

## 2. Styling approach

**PHP/SCSS side:** Plain SCSS files in `_assets/scss/`. Mixin-based architecture. Files prefixed with `_` contain definitions only. Global mixins prefixed `bb` to prevent conflicts. **No CSS Modules. No Tailwind.**

**React side:**
- Components import SCSS directly: `import "./Datepicker.scss"`
- Conditional class strings via the `classnames` utility (`cx(...)`)
- Minimal inline styles, only for conditional `display` toggles
- `react-select` uses its own `StylesConfig` (a CSS-in-JS pattern, only inside that one component)
- **No styled-components. No emotion. No Tailwind. No CSS Modules.**

## 3. Class naming convention

**Everywhere: camelCase, no prefix, no BEM.**

PHP/SCSS: `.buttonPrimary`, `.customCheckbox`, `.checkboxContainer`, `.messageStack`, `.badge`, `.warningTextStrong`, `.cap`, `.disabled`, `.filter`.

React: same — `.buttonPrimary`, `.loadingState`, `.greyIcon`, `.error`, `.modalContentScrollContainer`.

Modifiers are flat additional classes (`.buttonPrimary.inactive`) rather than BEM modifiers (`.button--inactive`).

> 📌 Divergence intent: `bhb-components` uses BEM with `bhb-` prefix (`.bhb-button--primary`). This is intentional and lets the library coexist with production CSS in the same page without collision.

## 4. File structure

**React components — two patterns coexist:**

- **Simple (single-file):** `Component.tsx` next to optional `Component.stories.tsx`.
  Example: `srcFull/core/components/Button.tsx` + `Button.stories.tsx`.
- **Complex (folder):** Folder with multiple `.tsx` files + a co-located `.scss` per piece.
  Example: `Dialog/` containing `DialogContent.tsx + DialogContent.scss + DialogFooter.tsx + DialogFooter.scss + ActionItems/`.

**No barrel `index.ts`** files in production component folders.

**Test files**: none found in `core/components` (Vite is configured for `*.test.ts`/`*.spec.tsx` but no files match yet).

## 5. Type system

- **Inline TypeScript interfaces** declared at the top of each component file:
  ```ts
  interface Props { variant: "primary" | "secondary"; ... }
  type ButtonType = "primary" | "secondary";
  ```
- **No separate `.types.ts` files.**
- **`React.FunctionComponent<Props>`** used consistently:
  ```ts
  export const Button: React.FunctionComponent<Props> = ({ ... }) => { ... }
  ```
- TypeScript strict mode enabled (`"strict": true` in tsconfig).
- **Zero `any` use** detected across `core/components` (grep confirmed).
- Intersection types used to extend HTML attributes:
  ```ts
  React.FunctionComponent<{ label: string } & React.InputHTMLAttributes<HTMLInputElement>>
  ```

## 6. Import style

**All custom components use named exports.** No default exports in component files.

```ts
// component.tsx
export const Button: React.FunctionComponent<Props> = (...) => { ... }

// consumer
import { Button } from "../../core/components/Button";
```

Default exports appear only in:
- Storybook stories (`export default { ... }` for Storybook meta)
- Page-level wrapper components imported from outside the design system

Third-party libraries follow their native export style — React itself imported as `import React, { useState } from "react"`.

## 7. Icon strategy

**Three coexisting systems:**

1. **FontAwesome React components** (modern path):
   ```tsx
   import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
   import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
   <FontAwesomeIcon icon={faCaretDown} className="..." />
   ```
   Packages: `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/free-regular-svg-icons`.

2. **FontAwesome via CSS classes** (legacy path used by PHP templates):
   ```html
   <span class="icon far fa-spinner fa-spin-custom-speed-7"></span>
   ```

3. **Custom BHB icon font (`.fbbr`)** — proprietary glyphs not in FontAwesome (e.g., `fbb-zoom-plus`, `fbb-select-text`).
   SCSS source: `_assets/scss/vendor/font-bb/scss/regular.scss`.

**No modern icon library** (lucide, heroicons, phosphor, react-icons) detected.
**No inline SVG component files** in `react-ui/srcFull`.

## 8. Banned patterns

From `.eslintrc.json` at repo root:

| Rule | Setting | Effect |
|---|---|---|
| `eqeqeq` | error | `===` required, no `==` |
| `no-nested-ternary` | error | Flatten ternaries |
| `no-implicit-coercion` | error | No `!!x`, no `+x` to convert |
| `require-await` | error | `async` must use `await` |
| `camelcase` | error (properties: never) | Variables camelCase; object keys exempted |
| `max-depth` | error (4) | Max 4 levels of nesting |
| `max-params` | error (8) | Max 8 function params |
| `semi` | error | Semicolons required |
| `no-restricted-imports` | error | Specific modules banned (rules not in shown config) |
| `no-restricted-globals` | error | Specific globals banned (rules not in shown config) |
| `strict` | error | `"use strict"` at module top |
| `no-multiple-empty-lines` | max 1 inside | Tight whitespace |
| `no-unused-vars` | error (ignore `_`-prefixed) | Unused arg → prefix with `_` |

**Notably permissive:**
- `no-console` is **off** (console allowed)
- `no-var` is **off** (legacy code uses `var`)
- `prefer-const` is **off**

**React-specific:**
- `eslint-plugin-react-hooks` installed
- `eslint-plugin-prefer-arrow-functions` installed (suggests preference for arrow components)
- No dedicated `react-ui/.eslintrc` — likely inherits from root

**TypeScript:**
- `strict: true` (entire strict family enabled)
- `forceConsistentCasingInFileNames: true`
- Modern `jsx: "react-jsx"` (no React import required for JSX)

**Prettier:** v3.8.3, run via `lint:prettier` script.

**Visma tooling:**
- `polaris.yml` — Synopsys Coverity integration (static analysis, not style)

**Style guides:**
- `_assets/scss/README.md` documents SCSS file naming (camelCase, `_` prefix for definitions, `bb` prefix for global mixins, hyphen-case for SCSS functions).
- No `CONVENTIONS.md`, `STYLE_GUIDE.md`, `CLAUDE.md`, or `.cursorrules` in repo root.

## Uncertainty flags

1. **Dedicated React ESLint config in `react-ui/`** — none found. Likely inherits from root, but the specific React rules in effect are inferred from installed plugins, not from a config file.
2. **`no-restricted-imports` / `no-restricted-globals` lists** — the banned items aren't enumerated in the shown ESLint config. There may be a separate file or CLI config.
3. **Test coverage** — `react-ui/` Vite config supports `*.test.tsx` but no test files exist yet in `core/components`. Either tests live elsewhere or component testing isn't yet established.
4. **CSS Modules in receipts subdir** — only sampled `core/components`. Other React subdirs may use different patterns.
5. **PostCSS plugin set** — only autoprefixer confirmed. Sass provides nesting/mixins, so PostCSS layer is thin.

## What `bhb-components` should inherit vs. diverge

| Aspect | Production | Library | Why |
|---|---|---|---|
| Framework | React 19 + TS 6 | React 18 + TS 5 | Broader compatibility for AI tool consumers |
| Styling | SCSS + classnames | **Plain CSS files + classnames** | Simpler for AI to generate; SCSS adds unnecessary layer |
| Class naming | `camelCase`, no prefix | **BEM with `bhb-` prefix** | Avoid collisions if both loaded together |
| Component pattern | `React.FunctionComponent<Props>` + named export | **Same** | Consistency with prod muscle memory |
| Types | Inline `interface Props` | **Same** | Same |
| Folder | Mix of single-file + folder | **Folder per component** (Button/Button.tsx + Button.css) | More consistent; easier for AI to navigate |
| Icons | FontAwesome React + `.fbbr` font | **TBD — leaning toward FontAwesome React** | Match prod once icon component is built |
| Conditional class | `classnames` (`cx(...)`) | **Same** — add to deps | Same idiom |
| Banned | Tailwind, CSS-in-JS | **Same** | Consistency |
