# ElliotSite

[Kaijualotl.com](https://kaijualotl.com/)

React + Tailwind rewrite of the original static portfolio.

## Development

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

## Quality checks

- Enforce 4px spacing grid classes: `npm run check:spacing`
- Run component tests: `npm run test`
- CI command (spacing check + production build): `npm run ci`
- GitHub Actions runs `npm run ci` on push, pull request, and manual dispatch: [.github/workflows/ci.yml](.github/workflows/ci.yml)
- Manual preview workflow builds selected ref and uploads `dist` as an artifact: [.github/workflows/preview.yml](.github/workflows/preview.yml)

## Editing the site

Most content changes are made in one file: **`src/data/siteData.js`**.
After editing, run `npm run ci` to verify everything builds, then push to deploy.

---

### Upcoming exhibitions

Open `src/data/siteData.js` and find `upcomingExhibitions`. Add a new string to
the array:

```js
upcomingExhibitions: [
  "New Show — Gallery Name, City, ST — June 2026",
  // existing entries…
],
```

When a show is over, move its string from `upcomingExhibitions` into the
`pastExhibitions` array directly below it.

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
- `--ui-link`, `--ui-link-hover`, `--ui-link-active`
- `--ui-accent`, `--ui-accent-hover`
- `--ui-press-link`, `--ui-press-link-hover`
- `--watermark-rgba` (image watermark color)

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
