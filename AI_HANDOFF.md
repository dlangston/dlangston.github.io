# AI Handoff

Use this file together with README.md when handing the repo to another AI.

## Project purpose

This is a React + Vite rewrite of an artist portfolio site. The site is mostly content-driven and relatively small. Most edits are either:

- content changes in shared data files
- Tailwind utility changes inside JSX
- theme/color token changes in the palette file

The codebase is not heavily abstracted. Direct, local edits are usually the right approach.

## Stack

- React 19
- React Router 7
- Vite 6
- Tailwind CSS v4 via the Vite plugin
- Vitest + Testing Library + jsdom
- GitHub Actions deploy to GitHub Pages

Main scripts from package.json:

- `npm run dev` starts Vite dev server
- `npm run build` builds production output
- `npm run preview` serves the production build locally
- `npm run test` runs Vitest once
- `npm run check:spacing` enforces the 4px spacing grid
- `npm run ci` runs spacing check, tests, and production build

## App structure

Main route wiring lives in `src/App.jsx`.

Current routes:

- `/` home page
- `/video`
- `/drawings`
- `/drawings/:category`
- `/sculpture/pipe-cleaners`
- `/upcoming`

`src/components/Layout.jsx` wraps all pages with:

- top logo
- main nav
- drawings sub-nav on drawing routes only
- theme toggle
- footer/social links

## Data model and content flow

Most editable site content lives in `src/data/siteData.js`.

That file currently owns:

- main navigation items
- drawing category nav items
- homepage hero image export
- homepage hero video path
- awards and press data for Upcoming
- social/contact links
- about text
- video page section data

Important detail:

- homepage hero image is `homePageImage`
- upcoming collage image is separate as `collageImage`

Do not recombine those unless the goal is to intentionally share the same image across pages.

Exhibitions are separate in `src/data/exhibitions.js`.

That file contains:

- one `exhibitionEvents` array
- helper logic that splits the list into upcoming vs past based on the current date

Expected shape:

```js
{ label: 'Event name', date: 'YYYY-MM-DD', href?: 'https://example.com' }
```

If an event date is invalid, the helper currently falls back to treating it like past content.

## Homepage specifics

Homepage implementation is in `src/pages/HomePage.jsx`.

Current behavior:

- top hero image is above the video
- the hero image is letterboxed using `object-contain` inside a fixed `aspect-video` frame
- the letterbox frame background is set to `var(--ui-page-bg)` so it matches the page background in both themes
- the video sits below that image
- below the video are manual preview grids for sculpture and drawings
- the About section is at the bottom of the page

Important implementation note:

- homepage preview thumbnails are manually imported and assembled in `HomePage.jsx`
- they are not generated from a central gallery manifest

Also note that `HomePage.jsx` has been an active tweak area. If a future visual issue appears on the homepage, start there first.

## Styling model

The site uses Tailwind utilities directly in JSX plus a small global CSS layer.

Main styling files:

- `src/styles.css` for global base styles and a few shared utilities
- `src/styles/palette.css` for all theme/color tokens

Theme system:

- raw palette values use `--color-*`
- semantic app tokens use `--ui-*`
- light theme tokens are in `:root`
- dark theme overrides are in `.dark`

Rule of thumb:

- change `--ui-*` first
- avoid touching `--color-*` unless a truly new base color is needed

Commonly used semantic tokens:

- `--ui-page-bg`
- `--ui-page-text`
- `--ui-surface-bg`
- `--ui-surface-border`
- `--ui-divider`
- `--ui-link`
- `--ui-link-hover`
- `--ui-link-current`
- `--ui-accent`

Reusable utility in `src/styles.css`:

- `.surface-bg-15` gives a theme-aware translucent surface background

Spacing convention:

- the repo enforces a 4px spacing grid
- if spacing classes change, `npm run check:spacing` can fail

## Theme behavior

Theme logic is in `src/context/ThemeContext.jsx`.

Current behavior:

- if no saved theme exists, the site follows OS preference
- OS theme changes update the site live while in system mode
- manual toggle switches to explicit light or dark mode
- explicit mode is saved in `localStorage` under `theme`
- returning to system-follow means removing that key

The theme toggle in Layout only exposes a light/dark switch, but under the hood the default state is system-follow.

## Navigation behavior

Main nav and drawings sub-nav are data-driven from `siteData.js`.

Current styling behavior:

- active/current links use the `--ui-link-current` token
- home link is part of the normal nav
- the drawings sub-nav only appears on drawing routes

If nav behavior changes, inspect `src/components/Nav.jsx` and `src/components/DrawingsNav.jsx`.

## Media and assets

There are two broad asset patterns:

- source-managed images imported from `images/` or `pages/.../img/...`
- static video files served from `public/videos/...`

Important repo quirk:

- there is a folder named `images/scultpture/` with a typo in the directory name

Do not “fix” that typo casually. Existing imports depend on it.

Gallery images are organized by category and by full/thumb folders. Home page previews use manual imports, but gallery pages load from the established folder structure.

## Tests and validation

Testing is configured through `vite.config.js`.

Current test setup:

- environment is `jsdom`
- setup file is `src/test/setup.js`
- setup file includes explicit Testing Library cleanup after each test

That cleanup matters. It was added to prevent duplicate DOM contamination between tests.

When making changes, the normal validation path is:

1. `npm run test` if behavior changed
2. `npm run build` for production output sanity
3. `npm run ci` before pushing
4. `npm run preview` if a visual change needs production-like confirmation

For visual fixes, previewing the built app is more trustworthy than only checking the dev server.

## Deployment

There are three separate workflow files under `.github/workflows/`, all running `npm run ci`, but with different triggers and purposes. Do not assume they are the same workflow just because they share that step.

- `ci.yml` — runs on every push, every pull request, and manual dispatch. Runs `npm run ci` and verifies `dist/index.html` references a compiled asset rather than raw source JSX. Does not deploy.
- `deploy.yml` — the actual deploy workflow. Triggers on push to `master` or `main` (plus manual `workflow_dispatch`). Runs the same checks as `ci.yml`, then uploads `dist` and deploys to GitHub Pages.
- `preview.yml` — manual `workflow_dispatch` only, with an optional `ref` input. Builds any branch/tag/SHA and uploads `dist` as a downloadable artifact. Does not deploy.

Practical notes:

- a push to `master`/`main` fires `ci.yml` and `deploy.yml` at the same time — that's expected, not a duplicate/misconfigured run
- pull requests only run `ci.yml`; there is no PR preview deploy
- when checking Actions, check both the workflow name and the event (`push` vs `pull_request` vs `workflow_dispatch`) to know which one you're looking at

## Working style for this repo

Best approach for edits:

- prefer small, local changes
- start from the page or component directly responsible for the visible behavior
- avoid broad refactors unless clearly requested
- preserve current naming and folder conventions, even if imperfect

Areas most likely to be edited for routine work:

- `src/data/siteData.js`
- `src/data/exhibitions.js`
- `src/pages/HomePage.jsx`
- `src/pages/UpcomingPage.jsx`
- `src/pages/VideoPage.jsx`
- `src/styles/palette.css`
- `src/styles.css`

## Current important state

As of this handoff:

- homepage uses a dedicated `homePageImage` above the video
- homepage hero is intentionally letterboxed, not cropped
- the letterbox color is intended to match the page background token
- upcoming exhibitions are derived from one date-sorted list in `src/data/exhibitions.js`
- theme auto-detection is implemented and live
- CI and deploy are expected to run through GitHub Actions

## Good first checks for a new AI

When a new task comes in, the fastest grounding reads are usually:

1. `README.md`
2. `src/App.jsx`
3. `src/components/Layout.jsx`
4. the page/component directly affected
5. `src/data/siteData.js` if the task smells content-driven
6. `src/styles/palette.css` if the task smells theme/color-related

That will usually be enough to make a correct local change without over-exploring the repo.