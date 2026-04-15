# Project

This is a static personal website built with vanilla JS + SCSS, bundled by Webpack 5.
This file provides guidance to the AI Agents when working with code in this repository.

## Commands

```bash
pnpm install        # Install dependencies
pnpm build          # Build and minify into dist/ (production only, no dev server)
```

There is no dev server, linter, or test suite configured.

## Deployment

Pushing to `main` triggers an automatic Netlify build and deploy to [matteoveroni.com](https://www.matteoveroni.com). The `dist/` folder is the build output — never edit it directly.

## Architecture

**Entry point:** `src/js/index.js` → compiled to `dist/app.bundle.js`  
**Styles:** `src/css/styles.scss` → extracted by `MiniCssExtractPlugin`  
**HTML template:** `src/index.html` → processed by `HtmlWebpackPlugin` into `dist/index.html`

### Localization system

The site supports multiple languages (EN, IT, and a fallback `_` for unsupported locales) using a custom Web Component approach:

- `src/js/dictionary.js` — flat key/value translation map keyed by locale code (`en`, `it`, `_`)
- `src/js/localization.js` — reads/writes locale preference via a `wmvlocale` cookie (1-day expiry); falls back to `navigator.language`
- `src/js/index.js` — defines a `<localized-text key="...">` custom HTML element that renders translated text on connect; language changes update all `<localized-text>` elements in-place
- `src/js/constants.js` — shared constants (element name, cookie name, email address)

To add a new translation key: add it to every locale block in `dictionary.js` (including `_`). To add a new language: add a new locale block and a corresponding `<option>` in `src/index.html`.

### Static assets

- `src/assets/` — images and PDF resume; copied verbatim to `dist/assets/` by `CopyWebpackPlugin`
- `src/libs/fontawesome-free-6.4.0-web/` — vendored FontAwesome; CSS copied to `dist/css/`, webfonts to `dist/webfonts/`
- `src/fonts/` — Inter font files (referenced in SCSS but not currently wired into the webpack copy step)

### Mail

`src/js/mail.js` — opens a `mailto:` link with a pre-filled subject when the CTA buttons are clicked.
