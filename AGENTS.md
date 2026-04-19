# Project

This file provides guidance to the AI Agents when working with code in this repository.

## Project Knowledge

Project knowledge lives in `project-knowledge/`.

- **Read** `project-knowledge/KNOWLEDGE.md` for the full schema, rules, and workflows.
- **Read** `wiki/index.md` first, then drill into relevant pages — only when relevant to the current task.
- **Write** only when explicitly requested by the user.

## Agent Rules

- Never use symbol —
- Always **use English** when you write into files.
- Always **be honest and objective**. Unjustified complacency would harm me. In such cases, state your opposing views and provide your reasoning.
- If in doubt, **ask questions to clarify unclear points**. Acting in a state of indecision or doubt would harm me.

## Commands

```bash
pnpm install        # Install dependencies
pnpm build          # Build and minify into dist/ (production only, no dev server)
```

There is no dev server, linter, or test suite configured. Never edit `dist/` directly.

## Deployment

Push to `main` → Netlify builds and deploys automatically. See [Deployment](README.md#deployment) for details.

## Architecture

Static personal website — vanilla JS + SCSS, bundled by Webpack 5.

| Layer | Source | Output |
|---|---|---|
| JS entry | `src/js/index.js` | `dist/app.bundle.js` |
| Styles | `src/css/styles.scss` | extracted by MiniCssExtractPlugin |
| HTML | `src/index.html` | `dist/index.html` |

- **Localization**: custom `<localized-text>` web component, cookie-based locale persistence, per-locale dictionary. See [Localization system](README.md#localization-system).
- **Static assets**: images, PDF resume, vendored FontAwesome. See [Static assets](README.md#static-assets).
- **Mail**: CTA buttons open a pre-filled `mailto:` link via `src/js/mail.js`. See [Mail](README.md#mail).
