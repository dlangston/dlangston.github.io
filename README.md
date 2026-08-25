# ElliotSite

[Kaijualotl.com](https://kaijualotl.com/)

React + Tailwind rewrite of the original static portfolio.

## Recent UI changes

- Added dedicated home hero image source (`homePageImage`) above the homepage video.
- Updated Upcoming page image strip layout:
  - portrait on the left, collage on the right
  - shared strip with no gap between images
  - outer corners rounded
  - background and border styling adjusted
- Standardized section/card backgrounds to a shared 15% surface alpha utility (`surface-bg-15`).
- Updated active/current nav link styling to use `--ui-link-current`.
- Added live OS theme following when no manual theme is saved; manual toggle now sets explicit light/dark mode.

## Development

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

## Quality checks

- Enforce 4px spacing grid classes: `npm run check:spacing`
- Run component tests: `npm run test`
- CI command (spacing check + production build): `npm run ci`

### GitHub Actions workflows

There are three separate workflow files, all running `npm run ci` but for different purposes:

- [.github/workflows/ci.yml](.github/workflows/ci.yml) — runs on every push, every pull request, and manual dispatch. Verifies `npm run ci` passes and that `dist/index.html` references a compiled asset (not raw source JSX). Does not deploy anything.
- [.github/workflows/deploy.yml](.github/workflows/deploy.yml) — runs on push to `master` or `main` (plus manual dispatch). Runs the same checks as `ci.yml`, then uploads `dist` and deploys to GitHub Pages. This is the actual deploy.
- [.github/workflows/preview.yml](.github/workflows/preview.yml) — manual dispatch only. Builds any ref (branch, tag, or SHA) you specify and uploads `dist` as a downloadable artifact, without deploying.

A push to `master` triggers both `ci.yml` and `deploy.yml` in parallel — that's expected, not a misconfiguration. Pull requests only trigger `ci.yml`, since deploys only happen from `master`/`main`.

## Editing the site

Most content changes are made in one file: **`src/data/siteData.js`**.
After editing, run `npm run ci` to verify everything builds, then push to deploy.

---

### Upcoming exhibitions

Open `src/data/exhibitions.js` and add a new item to `exhibitionEvents`:

```js
exhibitionEvents: [
  { 
    label: "New Show - Gallery Name, City, ST - June 2026", 
    date: "2026-06-15",
    href: "https://example.com/event"  // optional link
  },
  // existing entries...
],
```

Use an ISO date in `YYYY-MM-DD` format.

Add an `href` property to make the event clickable (optional).
The link opens in a new tab.

The site now auto-sorts and auto-splits this single list into upcoming and past
on the Upcoming page, so you do not move entries between two arrays anymore.

---

### Awards

Find the `awards` array in `src/data/siteData.js` and add a new string:

```js
awards: [
  "Award Name — Organization, Year",
  // existing entries…
],
```

---

### Press links

Find the `press` array in `src/data/siteData.js`. Each entry has a `label` (display
text) and an `href` (URL):

```js
press: [
  { label: "Article Title — Publication", href: "https://example.com/article" },
  // existing entries…
],
```

---

### Adding drawing gallery images

Each drawing category has its own folder under `pages/drawings/`. The categories are:
`artillery`, `character`, `dragon`, `geometric`, `godzilla`, `sea-life`.

1. Copy the **full-size** image into:
   `pages/drawings/{category}/img/full/{subfolder}/`
2. Copy a **thumbnail** (same filename) into:
   `pages/drawings/{category}/img/thumb/{subfolder}/`

The gallery loads images automatically — no code changes are needed.

**Example** — adding a new godzilla drawing:
```
pages/drawings/godzilla/img/full/godzilla16.png
pages/drawings/godzilla/img/thumb/godzilla16.png
```

---

### Adding pipe-cleaner sculpture images

1. Copy the **full-size** image into:
   `pages/sculpture/pipe-cleaners/img/full/`
2. Copy a **thumbnail** into:
   `pages/sculpture/pipe-cleaners/img/thumb/`

Same filename, no code changes needed.

---

### Changing the homepage preview images

The four sculpture and four drawing preview images on the home page are set
explicitly in `src/pages/HomePage.jsx`.

The large image above the home page video is controlled by `homePageImage` in
`src/data/siteData.js`.

- Current source: `images/scultpture/AxelZilla.jpg`
- Export used by Home: `export const homePageImage = ...`

At the top of that file, update the `import` lines to point to the new images,
then update the `sculpturePreview` or `drawingPreview` arrays that reference them.

```js
// swap one of the existing imports
import myNewThumb from "../../../pages/drawings/godzilla/img/thumb/godzilla16.png";

// then in the drawingPreview array, replace the entry you want to change
const drawingPreview = [myNewThumb, …];
```

---

### Adding a video

Open `src/data/siteData.js` and find the `videoSections` array. Each section has
a `title` and either an `embeds` list (YouTube) or a `videos` list (local files).

**YouTube embed:**
```js
embeds: [
  { title: "Video Title", src: "https://www.youtube.com/embed/VIDEO_ID" },
],
```

**Local video** — place the file under `public/videos/` (keep subfolders if needed),
then add an entry using an absolute path:
```js
videos: [
  { title: "Video Title", src: "/videos/MyFolder/my-video.m4v" },
],
```

**Troubleshooting local videos:**
- Prefer `.mp4` or `.m4v` files for best browser support.
- Confirm the file path in `src` exactly matches the file name and folder (including spaces and capitalization).
- If a video fails, open the file URL directly in the browser (example: `/videos/MyFolder/my-video.m4v`) to verify it is being served.

---

### Editing the About text

Find `aboutText` in `src/data/siteData.js`:

```js
export const aboutText = {
  title: "Your updated title",
  body:  "Your updated bio text.",
};
```

---

### Publishing changes

```bash
npm run ci        # spacing check + tests + production build
git add .
git commit -m "describe your change"
git push
```

GitHub Actions will run the CI checks automatically on push.

---

## Styling

This site uses **Tailwind CSS v4**. Styles live in two places:

| File | What it controls |
|---|---|
| `src/styles.css` | Global base styles (background, link colors, font) |
| Component files (`src/components/`, `src/pages/`) | Layout and element styles via Tailwind utility classes in `className="…"` |

There is no separate CSS file per component — all styling is done with Tailwind class names directly in the JSX.

---

### Changing colors

Color and theme changes are now centralized in `src/styles/palette.css`.

#### Theme model (important)

- `--color-*` = raw palette colors (base values)
- `--ui-*` = semantic app tokens (what components actually use)
- `:root` block = light theme values
- `.dark` block = dark theme values

For predictable results, edit `--ui-*` tokens first.

#### Where to edit

1. Open `src/styles/palette.css`.
2. Edit semantic tokens in:
   - `:root` for light theme
   - `.dark` for dark theme
3. Save and refresh.

Example (surface cards):

```css
:root {
  --ui-surface-bg: var(--color-neutral-50);
}

.dark {
  --ui-surface-bg: var(--color-neutral-800);
}
```

#### Common tokens you will likely change

- `--ui-page-bg`, `--ui-page-text`
- `--ui-surface-bg`, `--ui-surface-border`, `--ui-divider`
- `--ui-link`, `--ui-link-hover`, `--ui-link-active`, `--ui-link-current`
- `--ui-accent`, `--ui-accent-hover`
- `--ui-press-link`, `--ui-press-link-hover`
- `--watermark-rgba` (image watermark color)

#### Current page nav link color

Active/current nav link color is controlled by `--ui-link-current` in
`src/styles/palette.css`.

- `:root` value applies in light theme
- `.dark` value applies in dark theme

This token is used by both the main nav and the drawings sub-nav.

#### Section/card background alpha utility

The site includes a reusable class in `src/styles.css`:

```css
.surface-bg-15 {
  background-color: color-mix(in oklab, var(--ui-surface-bg) 15%, transparent);
}
```

Use `surface-bg-15` on section/card wrappers when you want theme-aware surface
color at 15% alpha.

#### Theme auto-detect behavior

Theme state is managed in `src/context/ThemeContext.jsx`.

- If no saved theme exists, the site follows OS theme (`prefers-color-scheme`).
- While in system mode, changing OS light/dark updates the site live.
- If a user toggles theme manually, it switches to explicit `light` or `dark`
  and stores that in `localStorage` under `theme`.
- To return to auto-follow mode, remove the `theme` key from `localStorage`.

#### Watermark text size (copyright)

Watermark size is controlled in `src/lib/watermark.js`.

Find:

```js
const fontSize = 32;
```

Increase for larger watermark text, decrease for smaller text.

Example:

```js
const fontSize = 24; // smaller
const fontSize = 40; // larger
```

After changing it, refresh the page and open an image modal to verify readability.

#### Quick before/after example

If you want cards/panels to be warmer in light mode:

```css
/* before */
:root {
  --ui-surface-bg: var(--color-neutral-50);
}

/* after */
:root {
  --ui-surface-bg: oklch(96% 0.01 85);
}
```

This affects panel/card backgrounds used in pages like Drawings, Video, and Upcoming.

#### Preview tokens

`--preview-light-*` and `--preview-dark-*` are reference swatches for editor color previews.

- These are for visual guidance only.
- You usually should not edit them unless you want to update the examples.

---

### Changing fonts

The site uses **Exo 2** loaded from Google Fonts. The import is at the top of
`src/styles.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Exo+2:…');
```

To change the font:
1. Replace the Google Fonts `@import` URL with the new font.
2. Update the `font-family` value in the same file so `font-sans` resolves to your new font.

---

### Changing spacing or layout

Spacing is controlled by Tailwind utilities on each element (`p-4`, `mt-8`, `gap-6`, etc.).
The site enforces a **4 px grid** — all spacing values must be multiples of 4 px.  
Running `npm run check:spacing` will catch any violations before you publish.

To adjust padding, margin, or gaps on a section, find the element in the relevant page or component file and change its Tailwind spacing class:

- `p-4` = 16 px padding, `p-8` = 32 px, etc.
- `mt-4` = 16 px top margin, `mt-0` = remove top margin, etc.
- `gap-4` = 16 px gap in a flex/grid layout.

---

### Changing the layout of a page

Each page is a JSX file under `src/pages/`. Open the relevant file and adjust the
Tailwind layout classes on the wrapper elements. Common layout utilities:

- `flex` / `flex-col` / `items-center` — flexbox
- `grid grid-cols-2` — two-column grid
- `max-w-[1088px] mx-auto` — centered fixed-width container
- `w-full` — full width
