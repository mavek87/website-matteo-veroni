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
- Routing: `/en/`, `/it/`, `/de/`, `/es/`, `/fr/`
- The root path (`/`) redirects to the appropriate locale via Netlify redirects based on the browser's `Accept-Language` header

## Deployment

Hosted on Netlify. Push to `main` → automatic build and deploy.

- Build command: `pnpm build`
- Publish directory: `dist/`
- Node version: 20 (see `netlify.toml`)
