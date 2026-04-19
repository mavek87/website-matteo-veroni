# matteo-veroni.com

Personal portfolio website for Matteo Veroni. Static site built with Astro, TypeScript, and plain CSS. Supports five languages and includes a blog.

## Tech stack

- **Astro 6** — static site generator, content collections, native i18n routing
- **TypeScript** — strict mode
- **CSS** — plain, modular per-component files
- **Fonts** — JetBrains Mono, Space Grotesk (via `@fontsource`)
- **Icons** — FontAwesome 7
- **Sitemap** — `@astrojs/sitemap`

## Project structure

```
src/
  pages/         # Route pages, locale-prefixed (en/, it/, de/, es/, fr/)
  components/    # Astro components (Hero, Services, About, BlogPreview, etc.)
  layouts/       # BaseLayout.astro
  i18n/          # Translation dictionaries + useTranslations() helper
  styles/        # Modular CSS files
  content/       # Blog markdown files, organized by language
public/          # Static assets (favicon)
dist/            # Build output — generated, do not edit
```

## Commands

| Command        | Action                                  |
| :------------- | :-------------------------------------- |
| `pnpm install` | Install dependencies                    |
| `pnpm dev`     | Start dev server at `localhost:4321`    |
| `pnpm build`   | Build production site to `./dist/`      |
| `pnpm preview` | Preview production build locally        |

## Localization

Five languages are supported: English (default), Italian, German, Spanish, French.

- Translation dictionaries: `src/i18n/{en,it,de,es,fr}.ts`
- Helper: `useTranslations(lang)` returns a typed `t(key)` function
- Routing: all locales are URL-prefixed — `/en/`, `/it/`, `/de/`, `/es/`, `/fr/`
- The root `/` is redirect-only (no content)

### Language detection flow

| Scenario | What happens |
|---|---|
| First visit, IT browser | Netlify reads `Accept-Language: it` at CDN edge → redirects to `/it/` |
| First visit, EN or unknown browser | No rule matches → Netlify fallback → `/en/` |
| User changes language via selector | JS sets `preferred_lang` cookie (1y, `SameSite=Lax`), navigates to new locale |
| Return visit with cookie | `src/pages/index.astro` inline script reads cookie → `window.location.replace('/<lang>/')` |
| Return visit, no cookie | Same as first visit — Netlify Accept-Language fires again |

The `preferred_lang` cookie is a functional cookie (remembers an explicit user choice) — no GDPR consent dialog required.

## System Logs

The System Logs section (`src/components/SystemLogs.astro`) displays a live terminal feed. Content is managed manually — no API, no external service.

Two types of entries:

- **Manual messages** — hardcoded in `SystemLogs.astro` frontmatter as a static array. Use `WARN` for urgent/time-sensitive items (availability, offers), `INFO` for general facts. These appear first.
- **Blog posts** — fetched at build time from the blog content collection. The 3 most recent posts for the current locale appear automatically after manual messages.

To add or update manual messages, edit the log entries array in `SystemLogs.astro`.

## Deployment

Hosted on Netlify. Push to `main` → automatic build and deploy.

- Build command: `pnpm build`
- Publish directory: `dist/`
- Node version: 20 (see `netlify.toml`)
