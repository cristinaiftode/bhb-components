# Figma Readiness Report — BHB (BuchhaltungsButler)

**File:** Styles - Components Webapp · key `fUcrmr5PRAIQulDadSGsB8`
**Date:** 2026-06-05
**Scope:** Styles page (Typography), Forms section (31:1461), Components section (5:319), Modal iteration page (316:1517), Sidebar examples (44:281)

## Headline

**Overall: ready, with some cleanup needed.** The Forms components are textbook-good (proper variant sets, full state coverage). The Components section has solid main components but inconsistent naming and many unnamed `Frame N` containers. Variables exist for colors and typography. No blockers — we can proceed to tokens + scaffold + component generation.

## Components found

### Forms (31:1461) — ✅ ready
Every component is a proper variant set with Component Properties:

| Component | Variants | Properties |
|---|---|---|
| `input` | 14 | Type (Default/Prompt) × State (Default/Placeholder/Hover/Focus/Disabled/Readonly/Error) |
| `inputWithIcon` | 14 | same |
| `textarea` | 14 | same |
| `select` | 14 | same |
| `datepicker` | 14 | same |
| `checkbox` | 10 | State × isChecked |
| `radiobutton` | 10 | State × isChecked |
| `.base` | 6 | State (private helper — `.` prefix convention) |
| `.label` | — | private helper |

State coverage is complete: rest, placeholder, hover, focus, disabled, readonly, error.

### Components (5:319) — ⚠️ mostly ready
Main components present:
- `Sidebar`, `Footer`, `Modal`, `Popup`, `Popup/Header`, `Tag`, `SettingsMenu`
- Footer variant set: `Popup/Footer/1 Button`, `Popup/Footer/2 Buttons`, `Popup/Footer/3 Buttons`, `Popup/Footer/2 Buttons + Icons`, `Popup/Footer/1 Button + Back`, `Popup/Footer/2 Buttons + Back`
- Frames with internal variants: `Message` (Position × Type, ~13 variants), `Tooltip`, `ContextMenu`, `Background`

Issues:
- `Modal` (151:301) is a single symbol with no visible variants — yet the Modal iteration page (316:1517) uses it in 5+ configurations. Either Modal needs variant properties, or those configurations are intended as separate frames.
- **No top-level `Button` component** found — but Button instances are used inside Modal frames. Button is probably nested inside another set or lives outside the Components section. Worth locating before generation.

### Modal page (316:1517) — ⚠️ work-in-progress
Labeled "Drafts Modal 'Feature not allowed'" with sections "Existing drafts/live versions 10.2025", "Current Modal ... live 10.2025", "Drafts...". This is an iteration page, not a component definition page. Many `Frame 11` unnamed containers. **Skip for generation** — generate from the Modal main component (151:301) instead.

### Sidebar examples (44:281) — ⏸ not audited in detail
Output exceeded inline size. Treat as usage examples, not source-of-truth. Generate Sidebar from the main component (6:834) on the Components section.

## Design Variables — ✅ confirmed present

Pulled from a Form input node (32:1521):

**Colors (10):**
| Token | Hex | Role |
|---|---|---|
| Brand | `#00A8FF` | primary brand |
| Brand shade | `#0097E6` | brand pressed/darker |
| Alert | `#E84118` | error / destructive |
| Alert shade | `#C23616` | error pressed |
| Black grey | `#2F3640` | primary text |
| Jeans grey | `#7F8FA6` | secondary text |
| Rain grey | `#B1B8C2` | tertiary text / borders |
| Moon grey | `#BCC3CE` | disabled / subtle |
| White | `#FFFFFF` | surface |

**Typography:**
- Font family: **Lato** (not BuchhaltungsButler — that string is a token *name* on the Styles page, not the actual font family)
- Sample styles: `M` = Lato 14/20, `Caps/S` = Lato 12/16 letter-spacing 0.4 (uppercase variant)
- Full type scale on Styles page: XXXL/XXL/XXML/XL/L/M/S/XS, each in regular + bold + uppercase

## Readiness checklist results

| Check | Forms | Components | Modal page |
|---|---|---|---|
| A1 Color Variables | ✅ | ✅ | n/a (instances) |
| A2 Spacing Variables | ⚠️ unverified | ⚠️ unverified | n/a |
| A3 Typography Variables | ✅ | ✅ | n/a |
| B4 Auto-layout | ✅ | ✅ mostly | ⚠️ many unnamed frames |
| B5 Layer names | ✅ | ⚠️ many `Frame 8/9/10/11/54/55`, `Group 7/8/9` | ❌ `Frame 11` repeated |
| C7 `/`-hierarchy naming | ⚠️ uses flat `radiobutton`, `input`, `textarea` | ⚠️ mixed (`Popup/Footer/*` good, `Tag`/`Modal` flat) | n/a |
| C8 Component Properties for variants | ✅ proper `State=…, isChecked=…` syntax | ✅ for Popup/Footer set | n/a |
| C9 Description fields | ⏸ unverified per-component | ⏸ unverified | n/a |
| D10/D11 State coverage | ✅ all 6 states + error | ⚠️ Modal has no variants exposed | n/a |

## Top fixes (do these in Figma before code gen)

1. **Add variants to `Modal`** so the configurations on the Modal iteration page can be modeled as Component Properties (e.g. `Type=Confirm/Info/Warning`, `Footer=1Button/2Buttons/Back+2Buttons`). Otherwise we'll have to ship multiple Modal components in code.
2. **Locate or create the `Button` main component.** Modal references Button instances but no Button main was found in the Components section. If it exists somewhere we missed, share the URL; if not, design it.
3. **Rename the unnamed frames** inside Components (`Frame 8`, `Frame 11`, `Group 9`, etc.) to meaningful names (e.g. `popup-body`, `popup-actions`, `icon-slot`). Affects code-generated class/component names.
4. **Decide naming convention** — pick either `/` hierarchy (`Form/Input/Default`) or flat lowercase (`input`) and apply consistently. Current state is mixed.

Nice-to-have (not blocking):
- Fill in description fields on each main component.
- Add long-text and empty-state examples (Tag with 80-char label, Select with no options, Sidebar collapsed).

## Recommended next step

We're green to proceed in parallel:
- **`figma-tokens-extract`** — colors + typography Variables are confirmed; we can build `tokens/colors.css` and `tokens/typography.css` now.
- **`library-scaffold`** — set up the empty repo at `/Users/cristinaiftode/BHB`.

While we do that, you can (a) fix the Modal variants and locate Button in Figma, and (b) share the BuchhaltungsButler production repo GitHub URL so we can run the conventions scan.

Component generation order, once scaffold + tokens are in place:
1. **Foundational:** Button (find it first), Tag, Tooltip
2. **Forms:** input, inputWithIcon, textarea, select, datepicker, checkbox, radiobutton
3. **Surfaces:** Message, Modal (after variants fix), Popup + Popup/Footer set
4. **Navigation:** Sidebar, Footer, SettingsMenu, ContextMenu
