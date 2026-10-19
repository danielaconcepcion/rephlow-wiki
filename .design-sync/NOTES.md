# design-sync notes for madrid-ucm

## Repo shape

- No packaged library build — `package.json` has no `main`/`module`/`exports`.
  This is a Vite app, not a component library. `shape: "package"` with a
  hand-authored `.design-sync/entry.tsx` (re-exporting only the 5 scoped
  components) is used instead of the converter's default synth-entry
  fallback, which would otherwise bundle every `.tsx`/`.jsx` under `src/`.
- Scope for this sync: `Navbar`, `Header`, `Footer`, `NotFound`,
  `PageSectionNav` (from `src/components/`) — chosen explicitly by the user;
  `Callout` and the `LabFolders` system were excluded. Revisit `entry.tsx` +
  `componentSrcMap` if the scope should grow.
- Tokens/base CSS come from `src/containers/App/App.css` (`cfg.cssEntry`) —
  it's the single global stylesheet (tokens, reset, navbar/footer/page-shell
  rules); no separate tokens package exists.
- Brand fonts (`@fontsource/inter`, `@fontsource/space-grotesk`) are wired
  via `cfg.extraFonts`, pointing at the exact weight files `src/main.tsx`
  actually imports (400/500/600 Inter, 500/600/700 Space Grotesk) — don't
  widen this to "all weights," it should track what the app really loads.

## Gotchas hit this run

- **Barrel-import bloat (fixed in app source, not just config).**
  `Footer.tsx` imports `asset` from the `src/utils/index.ts` barrel, which
  used to also re-export `getPathMapping` — and `getPathMapping` imports
  `pages.ts` → `contents/index.tsx` → every page component in the app
  (Team, the D3 Model graph, LabFolders, ...). That pulled ~200KB of
  unrelated JS and 5 unrelated stylesheets into the design-system bundle.
  Fixed by splitting the barrel: `getPathMapping` is no longer re-exported
  from `src/utils/index.ts`; `App.tsx` now imports it directly from
  `"../../utils/getPathMapping"`. If bundle size or stray CSS
  (`grep "^/\* src/" ds-bundle/_ds_bundle.css`) ever balloons again on a
  future re-sync, suspect the same pattern — some other leaf component
  reaching into a barrel that transitively pulls in routing/pages.
- **Don't nest a second `<Router>` in a preview.** `cfg.provider` already
  wraps every card in `MemoryRouter` at `/`. An earlier draft of the
  `Navbar` preview tried to show a second route by nesting another
  `MemoryRouter` inside a story — react-router throws ("An error occurred
  in the `<Router>` component") and the card renders blank. `Navbar` only
  has one preview export (`Default`) because of this; there's no supported
  way to sweep route-dependent active-link state per-story without a
  provider mechanism keyed per-story (not available in this shape).
- **`PageSectionNav` needs a wide viewport override.** Its CSS has a
  `max-width: 600px` breakpoint that swaps the vertical sticky sidebar for
  a horizontal mobile pill bar and hides subsections entirely. The default
  card viewport was narrower than that, so both preview exports silently
  rendered the wrong (mobile) variant with subsections invisible. Fixed via
  `cfg.overrides.PageSectionNav.viewport: "760x480"`. If this component's
  breakpoint ever changes, the override width should move with it.
- **`import.meta.env.BASE_URL`** (used by `src/utils/asset.ts`, e.g. for
  Footer's logo) resolves fine automatically — the converter's IIFE build
  already defines `import.meta.env` with `BASE_URL: "/"` for exactly this
  Vite convention. No action needed, but don't "fix" it if `[FONT_MISSING]`-
  style scares appear near it; it's expected behavior.

## Verification: not machine-checked this run

The user chose to skip installing Playwright/Chromium (~200MB) for the
automated render check, and `package-capture.mjs`'s screenshot-based
absolute grading needs the same browser — so no automated render-check or
screenshot grading ran (`--no-render-check` throughout). Instead, I served
`ds-bundle/.review.html` locally and eyeballed every component + story
directly (both the combined review page and each `?story=` cell) via the
Browser pane — all 5 components confirmed rendering correctly, no console
errors, both `PageSectionNav` variants confirmed at the corrected viewport.
This caught the nested-Router bug above (which a screenshot-only pass might
also have caught as `[RENDER_BLANK]`, but there was no such automated check
available). **If Playwright gets installed later, re-run
`package-validate.mjs` without `--no-render-check` once** to get a real
machine-verified baseline — nothing here should fail it, but it hasn't
actually been asserted by the tool itself yet.

## Re-sync risks

- The barrel-splitting fix lives in real app source (`src/utils/index.ts`,
  `src/containers/App/App.tsx`), not in `.design-sync/`. It's committed
  with the rest of the app, so it won't get lost, but a future contributor
  re-adding `getPathMapping` to the barrel (or a new leaf component
  reaching into a similarly deep barrel) would silently reintroduce the
  bloat — nothing in the sync tooling itself guards against it. Spot-check
  bundle size / stray-CSS markers on future re-syncs (see gotcha above).
- No automated render-check or grading has ever run against this bundle
  (see "Verification" above) — the very first thing a future re-sync
  should do, once Playwright is available, is a full validate pass without
  `--no-render-check` to establish a real baseline.
- `cfg.overrides.PageSectionNav.viewport` is tied to the component's own
  600px CSS breakpoint. If `PageSectionNav.css` changes that number, update
  the override to match or the preview will silently go back to rendering
  the wrong (mobile) variant.
