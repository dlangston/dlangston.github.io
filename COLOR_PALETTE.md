# Color Palette Reference

This lists the actual color values defined in [`src/styles/palette.css`](src/styles/palette.css) and what each one is used for. That file is the single source of truth — if a value here ever looks out of date, trust the CSS file over this doc.

## Raw palette colors (`--color-*`)

Base swatches that the semantic tokens below are built from. Not used directly in components.

| Token | Value | Hex | Approx. color |
|---|---|---|---|
| `--color-neutral-50` | `oklch(98.5% 0 0)` | `#FAFAFA` | near-white gray |
| `--color-neutral-100` | `oklch(97% 0 0)` | `#F5F5F5` | very light gray |
| `--color-neutral-200` | `oklch(92.2% 0 0)` | `#E5E5E5` | light gray |
| `--color-neutral-700` | `oklch(37.1% 0 0)` | `#404040` | dark gray |
| `--color-neutral-800` | `oklch(26.9% 0 0)` | `#262626` | very dark gray |
| `--color-neutral-900` | `oklch(20.5% 0 0)` | `#171717` | near-black gray |
| `--color-neutral-950` | `oklch(14.5% 0 0)` | `#0A0A0A` | near-black |
| `--color-slate-700` | `oklch(37.2% 0.044 257.287)` | `#314158` | dark blue-gray |
| `--color-slate-800` | `oklch(27.9% 0.041 260.031)` | `#1D293D` | darker blue-gray |
| `--color-slate-300` | `oklch(86.9% 0.022 252.894)` | `#CAD5E2` | light blue-gray |
| `--color-slate-200` | `oklch(92.9% 0.013 255.508)` | `#E2E8F0` | very light blue-gray |
| `--color-gray-500` | `oklch(55.1% 0.027 264.364)` | `#6A7282` | medium gray |
| `--color-gray-400` | `oklch(70.7% 0.022 261.325)` | `#99A1AF` | light-medium gray |
| `--color-cyan-700` | `oklch(52% 0.105 223.128)` | `#007595` | dark cyan/teal |
| `--color-cyan-500` | `oklch(71.5% 0.143 215.221)` | `#00B8DB` | medium cyan |
| `--color-cyan-400` | `oklch(78.9% 0.154 211.53)` | `#00D3F2` | bright cyan |
| `--color-cyan-300` | `oklch(86.5% 0.127 207.078)` | `#53EAFD` | light cyan |

Hex values above are computed from the oklch values (verified with the `culori` conversion library), since oklch is what `palette.css` actually defines.

## Semantic tokens (`--ui-*`)

These are what components actually reference. Light values come from `:root`, dark values from `.dark`.

| Token | Light value | Light hex | Dark value | Dark hex | Used for |
|---|---|---|---|---|---|
| `--ui-page-bg` | white | `#FFFFFF` | `neutral-950` | `#0A0A0A` | Overall page background ([styles.css](src/styles.css)) |
| `--ui-page-text` | `neutral-900` | `#171717` | `neutral-100` | `#F5F5F5` | Default body text color |
| `--ui-surface-bg` | `neutral-50` | `#FAFAFA` | `neutral-800` | `#262626` | Card/panel backgrounds — gallery thumbnails, video cards, upcoming/press boxes, theme toggle button |
| `--ui-surface-border` | `neutral-200` | `#E5E5E5` | `neutral-700` | `#404040` | Borders on cards, thumbnails, video embeds, theme toggle button |
| `--ui-divider` | `neutral-200` | `#E5E5E5` | `neutral-700` | `#404040` | Header/footer divider lines in [Layout.jsx](src/components/Layout.jsx) |
| `--ui-link` | `slate-700` | `#314158` | `slate-300` | `#CAD5E2` | Default nav and text link color |
| `--ui-link-hover` | `gray-500` | `#6A7282` | `gray-400` | `#99A1AF` | Nav/link color on hover |
| `--ui-link-active` | `slate-800` | `#1D293D` | `slate-200` | `#E2E8F0` | Reserved for an active/pressed link state — defined but not currently wired to any component |
| `--ui-link-current` | `#7c3aed` | `#7C3AED` | `#a78bfa` | `#A78BFA` | Nav link color for the current page ([Nav.jsx](src/components/Nav.jsx), [DrawingsNav.jsx](src/components/DrawingsNav.jsx)) |
| `--ui-muted-text` | `neutral-800` | `#262626` | `neutral-200` | `#E5E5E5` | Secondary text — video titles, upcoming list items |
| `--ui-accent` | `cyan-400` | `#00D3F2` | `cyan-500` | `#00B8DB` | Accent color (hover-border base on drawing cards) |
| `--ui-accent-hover` | `cyan-500` | `#00B8DB` | `cyan-500` | `#00B8DB` | Hover border color on cards and the theme toggle button |
| `--ui-press-link` | `cyan-700` | `#007595` | `cyan-400` | `#00D3F2` | Press/award link text on the Upcoming page |
| `--ui-press-link-hover` | `cyan-500` | `#00B8DB` | `cyan-300` | `#53EAFD` | Press/award link hover color |
| `--ui-overlay-caption` | `neutral-200` | `#E5E5E5` | `neutral-200` | `#E5E5E5` | Caption text in the gallery lightbox modal |
| `--ui-modal-overlay` | `rgba(0,0,0,0.85)` | `#000000` @ 85% | same | same | Lightbox backdrop |
| `--ui-modal-control-bg` | `rgba(0,0,0,0.60)` | `#000000` @ 60% | same | same | Lightbox close/prev/next button background |
| `--ui-modal-control-hover-bg` | `rgba(0,0,0,0.80)` | `#000000` @ 80% | same | same | Lightbox button background on hover |
| `--ui-modal-control-text` | `#ffffff` | `#FFFFFF` | same | same | Lightbox button icon/text color |
| `--ui-modal-control-ring` | `#ffffff` | `#FFFFFF` | same | same | Focus ring on lightbox buttons |
| `--ui-modal-loading-bg` | `#111827` | `#111827` | same | same | Lightbox image loading placeholder background |
| `--ui-modal-loading-text` | `#ffffff` | `#FFFFFF` | same | same | Lightbox "Loading..." text |
| `--watermark-rgba` | `rgba(40,40,40,0.75)` | `#282828` @ 75% | light only | — | Overlay color used to stamp the watermark onto images ([watermark.js](src/lib/watermark.js)) |

## Editor preview swatches (`--preview-*`)

Literal duplicates of a subset of the light/dark `--ui-*` values, defined only so color-preview editor extensions (e.g. VS Code color swatches) can render a dot next to the token in `palette.css`. Not referenced by any component — see [palette.css](src/styles/palette.css#L70-L84) (light) and [palette.css](src/styles/palette.css#L115-L124) (dark).

## Changing a color

See the "Changing colors" section of [README.md](README.md#L222) for the recommended workflow (edit `--ui-*` tokens first; only touch `--color-*` if you need a genuinely new base color).
