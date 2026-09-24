# TextFixer

Fast, private, no-login text utilities.

TextFixer is a static website of browser-based tools for cleaning, transforming, analyzing, extracting, comparing, and validating text. **V1 processing runs locally in the browser** — normal tools do not upload user text to a server.

## Stack

- [Astro](https://astro.build) (static output)
- TypeScript (strict)
- Tailwind CSS v4
- Vitest (unit tests)
- Cloudflare Pages–ready (`dist/`)

No database, auth, or backend in V1.

## Local setup

```bash
npm install
cp .env.example .env   # optional
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:4321`).

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Production static build |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Astro check + `tsc` |
| `npm run test` | Vitest unit tests |
| `npm run check` | typecheck + lint + test + build |

## Architecture

```
src/
  components/     # Shared UI (Header, ToolSearch, AdSlot, …)
  layouts/        # BaseLayout, ToolLayout
  pages/          # Indexable routes
  lib/
    tools/        # Tool definitions, registry, pure processors
    utilities/    # Text helpers, clipboard, download
    seo/          # Site URL helpers + JSON-LD
    analytics/    # Anonymous event stubs (no user text)
  scripts/        # Client islands (theme, tool workbench)
  styles/         # Design tokens + Tailwind
```

### Tool engine

Each tool is a `ToolDefinition`:

- metadata (slug, SEO, FAQ, related tools)
- typed options
- a **pure** `process(input, options)` function (no DOM)

Register tools in `src/lib/tools/registry.ts`. Wire the processor into `ToolShell`’s client map when adding interactive pages.

### Adding a new tool

1. Create `src/lib/tools/<name>.ts` with a pure processor + unit tests.
2. Create `src/lib/tools/<name>.definition.ts` with SEO/content/options.
3. Add it to `registry.ts`.
4. Add `src/pages/<slug>.astro` using `ToolLayout`.
5. Register the processor in `ToolShell.astro`’s client `processors` map.
6. Run `npm run check`.

## Privacy architecture

- User text for normal tools stays in the browser.
- `localStorage` is only for non-sensitive prefs (e.g. theme).
- Analytics stubs accept **event names / tool slugs only** — never input/output text.
- Privacy policy: `/privacy`.

## SEO architecture

- One indexable URL per tool (`/text-cleaner`, …)
- Unique title, meta description, canonical, Open Graph
- `sitemap` via `@astrojs/sitemap` (set `PUBLIC_SITE_URL`)
- `public/robots.txt`
- JSON-LD for WebApplication, Breadcrumbs, FAQ where valid
- Trust pages: `/about`, `/privacy`, `/terms`, `/contact`

### Search Console / Bing

Set optional verification tokens in `.env` (see `.env.example`):

- `PUBLIC_GOOGLE_SITE_VERIFICATION`
- `PUBLIC_BING_SITE_VERIFICATION`

Do not commit secrets.

## Analytics architecture

`src/lib/analytics/track.ts` is a typed stub. Enable later with:

- `PUBLIC_ANALYTICS_ENABLED=true`
- `PUBLIC_ANALYTICS_ENDPOINT=…`

Allowed events: `tool_view`, `tool_run`, `copy_result`, `download_result`, `related_tool_click`, `tool_search`, `error`.

## AdSense readiness

`AdSlot` reserves a labeled region when `PUBLIC_ADS_ENABLED=true`. Ads are off by default. Do not place ads that look like tool controls.

## Deployment (Cloudflare Pages)

1. Connect the GitHub repo to Cloudflare Pages.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set `PUBLIC_SITE_URL` to the production domain (no trailing slash).

## Current scope (V1 — 19 tools)

Implemented:

- **Cleaning (2):** Text Cleaner, Keyword Counter
- **Transformation (6):** Case Converter, Find & Replace, Sort Lines, Add Prefix / Suffix, Add Line Numbers, Collapse to One Line
- **Analysis (6):** Word Counter, Character Counter, Text Statistics, Reading Time Estimator, Readability Checker, Keyword Density
- **Extraction (3):** Email Extractor, URL Extractor, Phone Number Extractor
- **Comparison (2):** Text Diff, Compare Two Lists

## License

Proprietary unless otherwise stated.
