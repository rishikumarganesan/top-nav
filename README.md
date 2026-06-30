# PriceLabs Global Navigation Bar

React + TypeScript implementation of the three-row global navigation bar designed in Figma.

## Quick start

```bash
npm install
npm run dev
```

Requires Node 18+. Opens at `http://localhost:5173`.

## Stack

| Concern | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Bundler | Vite 5 |
| Styling | CSS Modules (no Tailwind) |
| Routing | React Router 6 — HashRouter |
| Icons | `@fortawesome/fontawesome-free` 6 (CSS class approach) |
| Font | IBM Plex Sans (Google Fonts via `index.html`) |

## Architecture

```
src/
├── nav/
│   ├── navConfig.ts       ← typed data config (all modules / subtabs / actions)
│   ├── GlobalNav.tsx      ← shell: composes the three rows, reads route
│   ├── ModuleBar.tsx      ← Row 1 (dark, always visible)
│   ├── SubtabBar.tsx      ← Row 2 (white, always visible, content per module)
│   ├── ContextBar.tsx     ← Row 3 (white, conditional — listing single-view only)
│   └── primitives/
│       ├── Button.tsx     ← text + optional icon button (secondary / primary)
│       ├── IconButton.tsx ← 28×28 icon-only button
│       ← Toggle.tsx       ← accessible switch (Enable Price Sync)
│       └── BetaTag.tsx    ← amber pill
├── pages/
│   └── PlaceholderPage.tsx ← stub page for every route
├── App.tsx                ← HashRouter + all routes wired
└── main.tsx               ← entry point
```

## Navigation behaviour

- Switching modules or subtabs is **client-side only** — no full page reload.
- The active module pill (Row 1) and subtab underline (Row 2) are driven by `window.location.hash`.
- **Row 3** (context bar) appears only when the URL contains `/listing/` under Pricing Dashboard.
  - Try it: click "Pricing Dashboard" → click a listing card below the nav.
- Deep links work: paste `http://localhost:5173/#/portfolio-analytics/booking-reports` in a new tab and the nav reflects the correct state.

### Responsive overflow ("More")

When the window is too narrow to show every subtab alongside its action cluster
(most visible on **Portfolio Analytics**, which has 6 subtabs), subtabs that
don't fit collapse into a **More ▾** dropdown on the right of Row 2:

- Measurement lives in `useSubtabOverflow` (`SubtabBar.tsx`) — it compares the
  natural width of every subtab against the available row width (minus the
  action cluster) and recomputes on resize via `requestAnimationFrame`.
- The **active subtab is always kept in the visible row**; if it would have
  overflowed, it swaps into the last visible slot and the More button shows a
  red underline + count badge so the collapsed group still reads as "contains
  the current page."
- The menu closes on outside-click, Escape, or selecting an item.
- Resize the preview / browser window narrow to watch tabs fold into **More**.

## TODO / substitutions

| Item | Note |
|---|---|
| `// TODO: icon` in navConfig | `chart-mixed` is FA6 Pro only; substituted with `fa-chart-column` from FA6 Free |
| `fire-flame-curved` module icon | Available in FA6 Free Solid ✓ |
| PriceLabs logo | SVG placeholder — replace with real asset at `src/nav/ModuleBar.tsx` |
| Listing data in ContextBar | Hardcoded mock — wire to your listing store / API |
| Popular Reports dropdown | Renders label caret; actual dropdown menu not implemented |
| CSV / Bulk Update dropdowns | Render caret; actual dropdown menus not implemented |
| `@fortawesome/fontawesome-free` | Swap for `@fortawesome/react-fontawesome` + Pro kit once kit URL is available |
