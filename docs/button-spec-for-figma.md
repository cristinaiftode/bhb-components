# Button — Figma spec (BuchhaltungsButler)

**Status:** Final, decisions resolved 2026-06-05
**Source:** `github.com/danielbarfuss-visma/bhb-design-system` (production PHP app)
**Master CSS:** `_assets/scss/general/_formElements.scss` lines 172–1376
**Theme tokens:** `_assets/scss/definitions/_theme.scss` lines 168–198

---

## TL;DR

**4 variants × 3 sizes × 5 states + 3 icon modes.**

| Variant | Rest BG | Hover BG | Text |
|---|---|---|---|
| **Primary** | `#00A8FF` (Brand) | `#0097E6` (Brand shade) | White |
| **Secondary** | `#C8D0DC` (Cloud grey — new token) | `#B1B8C2` (Rain grey) | Black grey `#2F3640` |
| **Ghost** (was PrimaryAlt) | `#FFFFFF` (White) | `#F9FAFF` (Snow — new token) | `#00A8FF` (Brand) |
| **Danger** (new — not in current production) | `#E84118` (Alert) | `#C23616` (Alert shade) | White |

Sizes: Large 48 / Medium 40 / Small 32 (all 18px horizontal padding).
States: Rest, Hover, Focus (new ring), Disabled, Loading.
Border radius: **0px** (sharper than today's 1px — intentional brand sharpening).

---

## Decisions (resolved before designing)

| # | Decision | Final |
|---|---|---|
| 1 | Border radius | **0px** — fully square, sharper than current 1px production |
| 2 | Focus ring | **2px Brand (`#00A8FF`) outline, 2px offset** — new, didn't exist in production |
| 3 | SecondaryAlt | **Dropped** — dead code in production (defined identical to Secondary, zero template usage) |
| 4 | Danger variant | **Added** — uses existing Alert / Alert shade tokens |
| 5 | New token `#C8D0DC` | **Added to Figma** as **Cloud grey** (continues weather-themed naming: Rain, Moon, Cloud) |

---

## 1. Variants

| Variant | Background (rest) | Background (hover/active) | Text color | Border | Used for |
|---|---|---|---|---|---|
| **Primary** | `#00A8FF` Brand | `#0097E6` Brand shade | `#FFFFFF` White | none | Main CTAs — "Speichern & Weiter" |
| **Secondary** | `#C8D0DC` Cloud grey | `#B1B8C2` Rain grey | `#2F3640` Black grey | none | Neutral / cancel — "Abbrechen" |
| **Ghost** | `#FFFFFF` White | `#F9FAFF` Snow | `#00A8FF` Brand | none at rest | Tertiary actions — "Nächster Beleg" |
| **Danger** | `#E84118` Alert | `#C23616` Alert shade | `#FFFFFF` White | none | Destructive — "Löschen", "Endgültig entfernen" |

**Component Property in Figma:** `Variant` = Primary / Secondary / Ghost / Danger

---

## 2. Sizes

| Size | Height | Horizontal padding | When to use |
|---|---|---|---|
| **Large** (default) | **48px** | 18px | Main CTAs, dialogs |
| **Medium** | **40px** | 18px | Inline forms, table actions |
| **Small** | **32px** | 18px | Dense UI, toolbars |

Padding is constant across sizes — only height changes.

**Component Property:** `Size` = Large / Medium / Small (default: Large)

---

## 3. States

| State | Visual treatment | Notes |
|---|---|---|
| **Rest** | Base variant color | Default |
| **Hover** | Hover background + hover text | 0.25s ease-out transition |
| **Focus** | Rest background + **2px Brand outline, 2px offset** | NEW — for keyboard navigation. Applies to all variants. For Primary/Danger where text is white-on-color, the brand outline still works because it sits *outside* the button on the 2px offset. |
| **Disabled** | Same bg as rest, **text at 35% opacity**, cursor: default | Native `disabled` attribute |
| **Loading** | Text hidden, centered spinner icon | Same vertical size as Rest |

**Active/Pressed = identical to Hover** in production. Not a separate state in Figma.

**Component Property:** `State` = Rest / Hover / Focus / Disabled / Loading (default: Rest)

---

## 4. Icon support

| Mode | What it looks like | Gap / size |
|---|---|---|
| Text only | `[ Label ]` | — |
| Icon left | `[ ⚙ Label ]` | 8px between icon and label, icon ~17px (1.2rem) |
| Icon right | `[ Label ⚙ ]` | 8px gap, icon ~17px |
| Icon only | `[ ⚙ ]` (centered) | Icon scales to **24px**, no label |

**Component Properties:**
- `IconLeft` = boolean
- `IconRight` = boolean
- `IconOnly` = boolean (when true, hides the label slot)

Use 24×24 Figma icon slots; the SVG sits inside. Icons in production come from FontAwesome (`far fa-*`) plus a custom `.fbbr` BHB icon font.

---

## 5. Shape & typography

| Property | Value |
|---|---|
| Border radius | **0px** (fully square) |
| Border at rest | None |
| Border on Focus | **2px Brand `#00A8FF` outline with 2px offset** |
| Font family | **Lato** |
| Font weight | **Bold** (700) |
| Font size | **1rem** (≈14px) — same across all sizes |
| Line height | Matches button height (48 / 40 / 32px) |
| Text transform | None |
| Box shadow | None — entirely flat |
| Transition | 0.25s ease-out on bg, text, border |

---

## 6. Tokens needed in Figma Variables

**Already present** ✅
| Figma Variable | Hex | Maps to production |
|---|---|---|
| Brand | `#00A8FF` | `$brand` / `$themeColorButtonPrimaryBg` |
| Brand shade | `#0097E6` | `$brand-shade` |
| Alert | `#E84118` | `$themeColorAlert` |
| Alert shade | `#C23616` | `$themeColorAlertHighlight` |
| Rain grey | `#B1B8C2` | `$palette-shade-5` |
| Black grey | `#2F3640` | `$themeColorFontPrimary` |
| White | `#FFFFFF` | — |

**Add to Figma Variables** ➕
| Figma Variable | Hex | Maps to production |
|---|---|---|
| **Cloud grey** | `#C8D0DC` | `$palette-shade-3` |
| **Snow** | `#F9FAFF` | `$themeColorBackgroundIntermediate` |

---

## 7. Variant matrix to ship — 4 build passes

Total when complete: 4 variants × 3 sizes × 5 states + icon props = 60 base frames before icon combinations. Don't draw all at once.

**Pass 1 — foundation** (12 frames)
- 4 variants × 3 states (Rest, Hover, Disabled) at Large size only.

**Pass 2 — add Focus + Loading** (+8 frames = 20 total)
- 4 variants × 2 states (Focus, Loading) at Large size.

**Pass 3 — add size variants** (+8 frames = 28 total)
- 4 variants × Rest only × Medium + Small.

**Pass 4 — icon variants** (+12 frames = 40 total)
- 4 variants × Large × Rest × IconLeft + IconRight + IconOnly.

Ping me after Pass 1 — I'll review for consistency before you build the rest.

---

## 8. Production quirks (FYI — won't affect Figma directly)

1. **Default labels are German**: `Speichern & Weiter`, `Abbrechen`, `Nächster Beleg`, `Hochladen`, `Löschen`. Use German in Figma examples too.
2. **`<a>` tags can be styled as buttons** in production — Figma should treat Button as visual, not semantic.
3. **Every `<button>` requires a `<span>` wrapper** around its text (CSS enforces this via `font-size: 0` on `<button>`). Not a Figma concern.
4. **`.inactive` ≠ `:disabled`** in production. `.inactive` = 50% opacity on the whole button (legacy soft-disabled). For Figma, only model the standard Disabled state.
5. **Loading spinner = FontAwesome `fa-spinner`** with a custom rotation. In Figma, draw a generic 17px spinner — devs will swap to the icon font.
6. **`ToolButton.tsx`** (React, PDF viewer toolbar) is its own thing — don't fold into the main Button.
7. **File-upload "buttons" are actually `<label>` elements** wrapping `<input type="file">` — separate control, not part of this Button.

---

## 9. What changed vs. current production

| Aspect | Production today | New Figma library |
|---|---|---|
| Border radius | 1px | **0px** |
| Variants | 4 (incl. dead SecondaryAlt) | 4 (Primary, Secondary, Ghost, **Danger** new) |
| Focus state | None (`outline: none`) | **2px Brand outline, 2px offset** |
| Token coverage | Some hardcoded values | All semantic via Variables |
| Naming | camelCase classes (`.buttonPrimary`) | Figma component names — designer's call |

When devs implement the new Button on the production side, they'll need to: drop `.buttonSecondaryAlt`, add a `.buttonDanger` class, add a focus-visible rule with the new outline, and change `border-radius: 1px` to `0`.
