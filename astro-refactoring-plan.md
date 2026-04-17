# Astro Refactoring Plan

Working document. Covers all steps to migrate the approved `mock.html` into a production-grade Astro project.
Ordered by execution priority. Each macro section is a self-contained phase that can be committed independently.

---

## Macro Points

1. [New Astro Project Scaffold](#1-new-astro-project-scaffold)
2. [CSS Extraction & Organization](#2-css-extraction--organization)
3. [Base Layout Component](#3-base-layout-component)
4. [Header Component](#4-header-component)
5. [Section Components — Landing Page](#5-section-components--landing-page)
6. [Client-Side JavaScript Migration](#6-client-side-javascript-migration)
7. [i18n Setup](#7-i18n-setup)
8. [Assets & Fonts Migration](#8-assets--fonts-migration)
9. [Netlify Config Update](#9-netlify-config-update)
10. [Decommission Old Webpack Project](#10-decommission-old-webpack-project)
11. [Future: Blog with Content Collections](#11-future-blog-with-content-collections)
12. [Future: System Logs Real Content](#12-future-system-logs-real-content)

---

## 1. New Astro Project Scaffold

Create the Astro project **alongside** the existing webpack project (do not delete anything yet — §10 covers cleanup).

### 1.1 Initialize the project

```bash
pnpm create astro@latest astro-site
```

During the wizard, choose:
- Template: **Empty**
- TypeScript: **Yes, strict**
- Install dependencies: Yes
- Git: No (we're inside an existing repo)

The new project lives in `astro-site/` at the repo root.

### 1.2 Install required integrations

```bash
cd astro-site
pnpm add @astrojs/sitemap
pnpm add -D @astrojs/check
```

No framework integration (React/Vue) is needed — this is a vanilla HTML/CSS/JS site.

### 1.3 Configure `astro.config.mjs`

Minimum config at scaffold time (i18n is added in §7):

```js
import { defineConfig } from 'astro';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://matteoveroni.com',
  integrations: [sitemap()],
});
```

### 1.4 Final `astro-site/` directory structure (target)

All locales — including English — are prefixed (`/en/`, `/it/`, etc.).
The root `/` is a redirect-only page (see §7). This is required for the
browser language auto-detection system (see §7 and §9).

```
astro-site/
├── public/
│   └── assets/          ← images, favicon (copied from src/assets/)
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Services.astro
│   │   ├── ServiceCard.astro
│   │   ├── About.astro
│   │   ├── SystemLogs.astro
│   │   ├── IOChannels.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro        ← redirect-only (cookie check + Netlify fallback)
│   │   ├── en/
│   │   │   └── index.astro    ← /en/
│   │   ├── it/
│   │   │   └── index.astro    ← /it/
│   │   ├── de/
│   │   │   └── index.astro    ← /de/
│   │   ├── es/
│   │   │   └── index.astro    ← /es/
│   │   └── fr/
│   │       └── index.astro    ← /fr/
│   ├── scripts/
│   │   └── scroll-reveal.ts
│   ├── i18n/
│   │   ├── index.ts
│   │   ├── en.ts
│   │   ├── it.ts
│   │   ├── de.ts
│   │   ├── es.ts
│   │   └── fr.ts
│   └── styles/
│       ├── global.css
│       ├── animations.css
│       ├── header.css
│       ├── hero.css
│       ├── services.css
│       ├── about.css
│       ├── logs.css
│       ├── io.css
│       └── footer.css
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## 2. CSS Extraction & Organization

The entire CSS lives inline inside the mock's `<style>` block (lines 9–487). Extract it into
per-component files under `src/styles/`.

### 2.1 `global.css`

Contains:
- Box-sizing reset (`* { box-sizing: border-box; margin: 0; padding: 0; }`)
- Targeted transitions (the targeted list already in the mock, replacing the old `transition: all`)
- `body` rules: background color, font-family, grid pattern `background-image`, `min-height`, `overflow-x`
- `body::before` and `body::after` — ambient glow radial gradients
- `.container` max-width and padding
- `:root` CSS variables (card accent colors `--c1` through `--c4`)
- Scroll-reveal classes: `.reveal`, `.reveal-ping`

### 2.2 `animations.css`

Dedicated file for all `@keyframes` — imported by `global.css` via `@import './animations.css'`:
- `@keyframes blink-cursor`
- `@keyframes heroFadeIn`
- `@keyframes pingMaterialize`
- `@keyframes pulse-dot`

Keeping keyframe definitions in one place makes them easy to audit and avoids duplication.

### 2.3 `header.css`

All `.site-header`, `.header-inner`, `.header-logo`, `.cursor`, `.header-right`, `.header-nav`,
`.nav-link`, `.lang-select-wrapper`, `.lang-select`, `.lang-label`, `.lang-caret`,
`.hamburger`, `.mobile-nav` rules and their responsive breakpoints.

### 2.4 `hero.css`

All `.hero`, `h1`, `.hero-roles`, `.hero p`, `.hero-stats`, `.stat`, `.stat-value`, `.stat-label`,
`.hero-pills`, `.hero-pill`, `.cta-btn` rules and their responsive breakpoints.

### 2.5 `services.css`

All `.section-prompt`, `.section-title`, `.services-grid`, `.card`, `.card-bar`, `.card-body`,
`.card-header`, `.card-icon`, `.card h2`, `.card p`, `.card-footer`, `.tags`, `.tag`, `.card-cta`
rules and nth-child color rules.

### 2.6 `about.css`

All `.about-section`, `.about-inner`, `.about-pull`, `.about-body` rules and responsive breakpoints.

### 2.7 `logs.css`

All `.logs-section`, `.log-container`, `.log-container::-webkit-scrollbar*`, `.log-line`,
`.log-line .ts`, `.log-line .lvl`, `.log-line .msg` rules.

### 2.8 `io.css`

All `.io-section`, `.io-grid`, `.io-item`, `.io-item::before`, `.io-item .io-icon`,
`.io-item .io-value`, `.io-item .io-handle` rules.

### 2.9 `footer.css`

All `.footer`, `.footer-status`, `.status-dot` rules and responsive breakpoints.

### 2.10 Import strategy

`global.css` is imported once in `BaseLayout.astro`. Per-component CSS files are imported
inside the `<style>` block of each `.astro` component. For styles that affect child elements
(like `.card:nth-child` selectors), use `<style is:global>` to avoid Astro's scoping.

---

## 3. Base Layout Component

`src/layouts/BaseLayout.astro` — the document shell rendered for every page.

### 3.1 Props

```ts
interface Props {
  title?: string;
  description?: string;
  lang?: string;   // 'en' | 'it' | 'de' | 'es' | 'fr'
}
```

### 3.2 Content

- `<!DOCTYPE html>` + `<html lang={lang}>` (dynamic from prop, default `'en'`)
- `<head>`:
  - `<meta charset>`, `<meta name="viewport">`, `<meta name="description">`, `<title>`
  - Favicon link (from `public/assets/`)
  - Font imports via fontsource (see §8)
  - FontAwesome import (see §8)
  - Global CSS import
- `<body>`:
  - `<slot />` — page-specific content inserted here
  - Global scroll-reveal script import (`src/scripts/scroll-reveal.ts`)

---

## 4. Header Component

`src/components/Header.astro`

### 4.1 HTML structure (from mock, lines 490–534)

The full header + mobile nav HTML is extracted verbatim. The only changes:
- The logo text `MATTEO_VERONI` becomes a prop or constant (not hardcoded in the script)
- Language options are driven by the i18n locale list, not hardcoded `<option>` tags
- Nav links `href="#services"` etc. remain as anchor links for the single-page landing

### 4.2 Client script

Four JS behaviors live in `Header.astro`'s `<script>` block:
1. **Logo typewriter** — types `MATTEO_VERONI` char by char on load
2. **Sticky scroll class** — adds `.scrolled` to header on scroll
3. **Hamburger toggle** — opens/closes `.mobile-nav`, updates `aria-expanded`
4. **Language switcher** — on change, sets `preferred_lang` cookie + navigates to locale URL
   (see §7.5 for the full cookie + navigation logic)

---

## 5. Section Components — Landing Page

Each section from the mock becomes its own `.astro` component. In Phase 1, content is hardcoded
in English. i18n wiring is done in §7.

### 5.1 `Hero.astro`

HTML: lines 539–563 of the mock.
- Role labels line
- `<h1>` with cyan accent spans
- Body copy `<p>`
- Stats dashboard (`.hero-stats` grid of 4 `.stat` elements with `data-count` and `data-suffix`)
- CTA button `> START_CONVERSATION`

The count-up JS (IntersectionObserver) moves to `Hero.astro`'s `<script>` block.

### 5.2 `ServiceCard.astro`

A reusable component for a single service card.

Props:
```ts
interface Props {
  label: string;        // '[ARCH]'
  title: string;        // 'Architecture & Consulting'
  description: string;
  tags: string[];
  colorVar: string;     // '--c1' | '--c2' | '--c3' | '--c4'
  ctaText?: string;     // default '> LEARN_MORE →'
  ctaHref?: string;     // default '#'
  iconSvg: string;      // raw SVG path content
}
```

The `colorVar` prop is applied as `style="--card-color: var(--c1)"` on the card root element.
All `nth-child` color selectors in CSS are rewritten to use `--card-color` instead.
This removes the order-dependency and makes the component fully self-contained.

### 5.3 `Services.astro`

Renders `<section id="services">` with section title and a 2×2 grid of `<ServiceCard />`.
The four card definitions live as a data array in the frontmatter — no logic, just data + markup.
The card bar animation JS (`.loaded` class stagger via `setTimeout`) lives here.

### 5.4 `About.astro`

HTML: lines 641–657 of the mock.
- Section title `> About`
- Asymmetric split grid: pull quote (left) + body copy (right)
- CTA button `> RUN_CONSULTATION`

Scroll reveal is handled globally — no JS needed in this component.

### 5.5 `SystemLogs.astro`

HTML: lines 660–663 of the mock.
- Section title `> System_Logs`
- `<div id="logBox">` empty container

The log generation JS (random log lines via `setInterval`) lives in this component's `<script>`.

### 5.6 `IOChannels.astro`

HTML: lines 665–689 of the mock.
- Section title `> I/O_Channels`
- 4 `.io-item` links (LinkedIn, GitHub, YouTube, Email)

Hardcoded links and handles — no props needed at this stage.

### 5.7 `Footer.astro`

HTML: lines 691–698 of the mock.
- Status dot + `SYSTEM_UPTIME: 100%`
- Copyright `© 2026 MATTEO_VERONI`

### 5.8 Landing page composition

`src/pages/en/index.astro` (and each locale equivalent — `it/`, `de/`, `es/`, `fr/`):

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Hero from '../../components/Hero.astro';
import Services from '../../components/Services.astro';
import About from '../../components/About.astro';
import SystemLogs from '../../components/SystemLogs.astro';
import IOChannels from '../../components/IOChannels.astro';
import Footer from '../../components/Footer.astro';
const lang = 'en';
---
<BaseLayout title="Matteo Veroni | Software Architect & Engineer" lang={lang}>
  <Header lang={lang} />
  <div class="container">
    <div class="header-spacer"></div>
    <Hero lang={lang} />
    <Services lang={lang} />
    <About lang={lang} />
    <SystemLogs />
    <IOChannels />
    <Footer />
  </div>
</BaseLayout>
```

---

## 6. Client-Side JavaScript Migration

All JS currently lives in a single inline `<script>` block (mock lines 700–814). Distribute it
to the component that owns the behavior.

### 6.1 Global: Scroll reveal — `src/scripts/scroll-reveal.ts`

Affects `.reveal` and `.reveal-ping` elements across all components. Lives in a dedicated file
imported in `BaseLayout.astro` so it runs on every page automatically.

### 6.2 `Header.astro` — owns:
- Logo typewriter (lines 701–711)
- Sticky scroll class (lines 713–717)
- Hamburger toggle (lines 719–733)
- Language switcher: cookie write + page navigation (see §7.5)

### 6.3 `Hero.astro` — owns:
- Count-up animation on stats (lines 761–785)

### 6.4 `Services.astro` — owns:
- Card bar `.loaded` stagger (lines 787–789)

### 6.5 `SystemLogs.astro` — owns:
- Log line generation interval (lines 792–814)

### 6.6 TypeScript note

Astro processes `<script>` tags with Vite, which supports TypeScript natively. Use `.ts`
type annotations in all script blocks — no extra config needed.

---

## 7. i18n Setup

> ⚠️ **This is the most complex section of the entire migration. Read carefully before starting.**
>
> Three distinct concerns must be handled correctly and in the right order:
> 1. **Astro routing** — URL structure for each locale
> 2. **Translation content** — all strings translated into 5 languages (real content work, not just code)
> 3. **Language detection & persistence** — first-visit auto-detect + user preference saved via cookie
>
> Concerns 1 and 3 are code. Concern 2 is content work that can block this section for days.
> **Recommended approach: complete Concern 2 (translation content) before writing any i18n code.**
> Stub all locale pages with English content first, then wire translations once all strings are ready.

### 7.1 `astro.config.mjs` — add i18n block

`prefixDefaultLocale: true` — all locales are prefixed, including English.
This is required so the root `/` can act as a pure redirect/detection page.

```js
export default defineConfig({
  site: 'https://matteoveroni.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it', 'de', 'es', 'fr'],
    routing: {
      prefixDefaultLocale: true,  // EN at /en/, IT at /it/, etc.
    },
  },
  integrations: [sitemap()],
});
```

### 7.2 `src/pages/index.astro` — root redirect page

The root `/` is not a content page. It contains only a tiny inline script that checks for a
`preferred_lang` cookie and redirects accordingly. If no cookie is present, it falls through
and Netlify's Accept-Language redirect handles it at the CDN level (see §9.2).

```astro
---
// No layout, no content — this page is invisible to the user.
---
<html>
  <head>
    <script>
      // Check for saved language preference cookie
      const match = document.cookie.split(';').find(c => c.trim().startsWith('preferred_lang='));
      if (match) {
        const lang = match.split('=')[1].trim();
        window.location.replace('/' + lang + '/');
      }
      // If no cookie: Netlify already redirected server-side via Accept-Language.
      // This script only runs if the user somehow reaches / without a Netlify redirect.
    </script>
    <noscript>
      <meta http-equiv="refresh" content="0; url=/en/" />
    </noscript>
  </head>
  <body></body>
</html>
```

### 7.3 Translation files

> ⚠️ **Content work required before this step.**
> The existing `src/js/dictionary.js` contains old translations (about me, services in the old style).
> It can be used as a rough reference for IT/DE/ES/FR, but all new mock content — hero copy,
> about copy, stats labels, service descriptions, CTAs — must be translated from scratch.
> Produce a spreadsheet or document with all EN strings and their translations before writing
> any `.ts` file. This is the most time-consuming step in §7.

Create `src/i18n/en.ts`, `src/i18n/it.ts`, `src/i18n/de.ts`, `src/i18n/es.ts`, `src/i18n/fr.ts`.

Each file exports a typed object covering all translatable strings:

```ts
// src/i18n/en.ts
export const translations = {
  // Meta
  pageTitle: 'Matteo Veroni | Software Architect & Engineer',
  pageDescription: 'Software Architect, Fullstack Developer and AI & DevOps Engineer...',

  // Hero
  heroRoles: 'Software Architect · DevOps Engineer',
  heroH1Line1: 'Architecting',
  heroH1Accent1: 'Scale.',
  heroH1Line2: 'Engineering',
  heroH1Accent2: 'Resilience.',
  heroBody: 'Software should solve your problems — not become one...',
  heroCta: '> START_CONVERSATION',

  // Stats
  stat1Value: '10+', stat1Label: 'Years experience',
  stat2Value: '100K+', stat2Label: 'Daily active users',
  stat3Value: '3+', stat3Label: 'Years leading backend team',
  stat4Value: 'E2E', stat4Label: 'Systems built from scratch',

  // Services section title
  servicesTitle: '> Services',
  // Each card: label, title, description, tags, cta
  // (full card strings omitted here for brevity — expand per card)

  // About
  aboutTitle: '> About',
  aboutPull1: 'For over 10 years, I\'ve built systems where failure isn\'t an option...',
  aboutPull2: 'I find what actually needs solving, not just what I\'m told to build...',
  aboutBody1: 'Before we write a line of code, I\'ll give you a clear picture...',
  aboutBody2: 'Falling behind doesn\'t happen all at once...',
  aboutBody3: 'If your tech is keeping you up at night...',
  aboutCta: '> RUN_CONSULTATION',

  // Sections
  logsTitle: '> System_Logs',
  ioTitle: '> I/O_Channels',

  // Footer
  footerStatus: 'SYSTEM_UPTIME: 100%',
  footerCopyright: '© 2026 MATTEO_VERONI',
};

export type Translations = typeof translations;
```

### 7.4 `src/i18n/index.ts` — utility helper

```ts
import type { Translations } from './en';
import { translations as en } from './en';
import { translations as it } from './it';
import { translations as de } from './de';
import { translations as es } from './es';
import { translations as fr } from './fr';

const all: Record<string, Translations> = { en, it, de, es, fr };

export function useTranslations(lang: string): Translations {
  return all[lang] ?? all.en;
}
```

### 7.5 Language switcher — cookie write + navigation

When the user changes language via the `<select>` in the header, two things happen:
1. A `preferred_lang` cookie is set (1-year expiry, `SameSite=Lax`, no Secure flag needed for
   a language preference)
2. The page navigates to the new locale URL

This runs in `Header.astro`'s `<script>` block:

```ts
function onLangChange(locale: string) {
  // Save preference — functional cookie, no GDPR consent required
  document.cookie = `preferred_lang=${locale}; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`;
  // Navigate to locale
  window.location.href = `/${locale}/`;
}

document.getElementById('langSelect')?.addEventListener('change', (e) => {
  onLangChange((e.target as HTMLSelectElement).value);
});
document.getElementById('langSelectMobile')?.addEventListener('change', (e) => {
  onLangChange((e.target as HTMLSelectElement).value);
});
```

> **Why no GDPR banner for this cookie:** language preference cookies are classified as
> "strictly necessary / functional" under GDPR — they remember an explicit user action
> and do not track behavior or leave the site. No consent dialog is needed.
> This is the same approach used by GitHub, Google, and virtually every i18n site.

### 7.6 Usage in components

In each `.astro` component's frontmatter:

```ts
---
const { lang } = Astro.props;
import { useTranslations } from '../i18n/index.ts';
const t = useTranslations(lang);
---
<h1>
  {t.heroH1Line1} <span style="color:#00e5ff;">{t.heroH1Accent1}</span><br>
  {t.heroH1Line2} <span style="color:#00e5ff;">{t.heroH1Accent2}</span>
</h1>
```

### 7.7 Per-locale page files

Each locale page imports the same components and passes `lang`. The only difference between
`en/index.astro`, `it/index.astro`, etc. is the `lang` constant:

```astro
---
// it/index.astro
const lang = 'it';
import { useTranslations } from '../../i18n';
const t = useTranslations(lang);
// ... same imports as en/index.astro
---
<BaseLayout title={t.pageTitle} lang={lang}>
  <Header lang={lang} />
  ...
</BaseLayout>
```

---

## 8. Assets & Fonts Migration

### 8.1 Favicon

Copy `src/assets/ico/favicon.ico` → `astro-site/public/assets/favicon.ico`.
Reference in `BaseLayout.astro` as `<link rel="icon" href="/assets/favicon.ico">`.

### 8.2 Other static assets

Any images or PDFs from `src/assets/` → copy to `public/assets/` as needed.
At landing page launch, only the favicon is required.

### 8.3 Fonts — self-hosted via fontsource

The mock loads fonts via Google CDN (`@import` in CSS). Self-hosting via fontsource removes
the external dependency and avoids GDPR concerns for EU visitors (no Google request on load).

```bash
pnpm add @fontsource/jetbrains-mono @fontsource/space-grotesk
```

Import in `BaseLayout.astro`:
```ts
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
import '@fontsource/jetbrains-mono/800.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
```

### 8.4 FontAwesome — self-hosted via pnpm

```bash
pnpm add @fortawesome/fontawesome-free
```

Import in `BaseLayout.astro`:
```ts
import '@fortawesome/fontawesome-free/css/all.min.css';
```

---

## 9. Netlify Config Update

### 9.1 `netlify.toml` — build config

```toml
[build]
  base    = "astro-site"
  command = "pnpm build"
  publish = "astro-site/dist"

[build.environment]
  NODE_VERSION = "20"
```

`base = "astro-site"` tells Netlify to run all commands from inside the Astro subdirectory.
The old webpack `src/` and `dist/` at repo root are ignored automatically.

### 9.2 Language auto-detection via Accept-Language redirects

> **Zero Netlify dashboard configuration required.** This is a native Netlify feature available
> on all plans, activated purely by the `netlify.toml` rules below. Push the file — it works.

Netlify reads the browser's `Accept-Language` HTTP header at the CDN edge and redirects
before serving any HTML. This handles **first-visit only** — users who have set a `preferred_lang`
cookie are redirected by the inline script in `index.astro` (§7.2) before Netlify's rules
even matter on return visits.

Add redirect rules to `netlify.toml`:

```toml
# Language-based redirects — first visit, no cookie present
# Rules are evaluated in order; first match wins.

[[redirects]]
  from = "/"
  to = "/it/"
  status = 302
  conditions = { Language = ["it"] }

[[redirects]]
  from = "/"
  to = "/de/"
  status = 302
  conditions = { Language = ["de"] }

[[redirects]]
  from = "/"
  to = "/es/"
  status = 302
  conditions = { Language = ["es"] }

[[redirects]]
  from = "/"
  to = "/fr/"
  status = 302
  conditions = { Language = ["fr"] }

# Final fallback — English for everything else
[[redirects]]
  from = "/"
  to = "/en/"
  status = 302
```

**Why no cookie-based redirect rules in Netlify:** cookie conditions in Netlify redirects may
require a Pro plan. Rather than depend on plan features, return visits are handled entirely
client-side via the inline script in `src/pages/index.astro` (§7.2). The script runs inline
in `<head>` before any content renders, making the redirect invisible to the user.

**Complete flow:**

| Scenario | What happens |
|---|---|
| First visit, IT browser | Netlify reads `Accept-Language: it` → redirects to `/it/` |
| First visit, EN browser | No language rule matches → Netlify fallback → `/en/` |
| User changes language to EN | JS sets `preferred_lang=en` cookie, navigates to `/en/` |
| Return visit, IT browser, EN cookie | `index.astro` script reads cookie → `window.location.replace('/en/')` — no flash |
| Return visit, no cookie | Netlify Accept-Language fires again (same as first visit) |

### 9.3 Verify after deploy

After pushing to `main`, check:
- Netlify build log shows `pnpm build` running from `astro-site/`
- `/` redirects correctly based on browser language
- Changing language via combobox sets the cookie and survives a refresh

---

## 10. Decommission Old Webpack Project

Only after the Astro site is live and verified on production.

### 10.1 What to remove

- `src/` directory (webpack source)
- `dist/` directory (webpack output)
- `webpack.config.js`
- `package.json` at repo root
- `pnpm-lock.yaml` at repo root
- `node_modules/` at repo root
- `playwright.config.ts` and `tests/` (unless a test setup is added to the Astro project)

### 10.2 What to keep forever

- `mock-website/` — reference archive, never delete
- `mock-refactoring-plan.md` — historical record
- `astro-refactoring-plan.md` — this document
- `NEXT_MILESTONE.md`, `CLAUDE.md`, `README.md`, `AGENTS.md`
- `project-knowledge/`

### 10.3 Move Astro project to root (optional)

Once webpack is decommissioned, optionally move `astro-site/` contents up to the repo root
and remove the `base` directive from `netlify.toml`. Not required — subdirectory layout is valid.

---

## 11. Future: Blog with Content Collections

Not part of the current sprint. Implement when 1–2 real articles are ready to publish.

### 11.1 Content Collections setup

Define a `blog` collection in `src/content/config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    lang: z.enum(['en', 'it', 'de', 'es', 'fr']).default('en'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

### 11.2 Blog post files

```
src/content/blog/
├── en/
│   └── building-resilient-systems.md
└── it/
    └── building-resilient-systems.md
```

### 11.3 Blog index page

`src/pages/[lang]/blog/index.astro` — lists all posts for the current locale via `getCollection('blog')`.

### 11.4 Blog post page

`src/pages/[lang]/blog/[slug].astro` — single post page via `getStaticPaths()` + `getEntry()`.
Astro generates one static HTML file per post at build time — no server needed.

### 11.5 Blog Preview section on landing page

Once at least 1 real post exists, add `BlogPreview.astro` to the landing page (between
SystemLogs and IOChannels). It fetches the latest 3 posts via `getCollection` at build time —
no client-side fetch, no API.

---

## 12. Future: System Logs Real Content

The System Logs section currently generates random fake log lines via JS. Deferred until there
is real content to populate it.

### 12.1 Content types

- Site announcements (e.g. "New service page: Architecture & Consulting")
- New blog posts (e.g. "New post: 'Building Resilient Systems' — 2026-04-16")
- Promotional notes (e.g. "Spring offer: Architecture review — 20% off until May 2026")

### 12.2 Implementation

Replace the random JS generator with a static array of real log objects in `SystemLogs.astro`'s
frontmatter. Curated manually, committed to the repo — no external API needed.

```ts
interface LogLine {
  level: 'INFO' | 'NEW' | 'PROMO';
  message: string;
  href?: string;
}
```

Log level colors: `INFO` → green `#10b981`, `NEW` → cyan `#00e5ff`, `PROMO` → amber `#ffb000`.

---

## Execution Status

### ⬜ To Do

| Point | Status |
|---|---|
| 1 — New Astro Project Scaffold | ✅ Completed |
| 2 — CSS Extraction & Organization | ✅ Completed |
| 3 — Base Layout Component | ✅ Completed (fixed) |
| 4 — Header Component | ✅ Completed |
| 5 — Section Components — Landing Page | ✅ Completed (fixed) |
| 6 — Client-Side JavaScript Migration | ✅ Completed |
| 7 — i18n Setup | 🔄 In progress (7.1 ✅, 7.2 ✅ — 7.3–7.7 pending) |
| 8 — Assets & Fonts Migration | ✅ Completed |
| 9 — Netlify Config Update | ✅ Completed |
| 10 — Decommission Old Webpack Project | Not started |

### ⏭️ Future (not in this sprint)

| Point | Trigger |
|---|---|
| 11 — Blog with Content Collections | When 1–2 real articles are ready |
| 12 — System Logs Real Content | When announcements/posts exist to populate |
