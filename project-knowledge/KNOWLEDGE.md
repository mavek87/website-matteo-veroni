# Project Knowledge

This document defines how AI agents interact with the project knowledge base.
It is the schema for the system — read it before touching anything in this directory.

---

## Structure

```
project-knowledge/
├── KNOWLEDGE.md      ← this file (schema, rules, workflows)
├── raw/              ← immutable source documents (articles, notes, transcripts, etc.)
└── wiki/
    ├── index.md      ← catalog of all wiki pages (entry point for navigation)
    ├── log.md        ← append-only record of all operations
    └── ...           ← topic pages, entity pages, concept pages
```

---

## Layers

**`raw/`** — source documents provided by the user. Treat as immutable: read freely, never modify or delete. This is the source of truth.

**`wiki/`** — structured, interlinked markdown pages maintained by the agent. Summaries, entity pages, concept pages, comparisons, analyses. This layer is what the agent writes and keeps consistent over time.

---

## Wiki page conventions

Every wiki page must start with YAML frontmatter:

```yaml
---
title: Page name
type: entity | topic | analysis | overview | index | log
tags: [...]
sources:              # only for pages citing raw/ files
  - ../raw/<file>.md
related:              # relative paths to other wiki pages
  - ./<page>.md
updated: YYYY-MM-DD
---
```

### Link rules

- Links to other wiki pages → relative paths (e.g. `./skills.md`). Never use `[[wikilink]]` syntax.
- Links to raw sources → relative paths (e.g. `../raw/<file>.md`). Never use external URLs when a local copy exists.
- External URLs only when the source has not been ingested yet.

### Citation rules

- Every non-obvious factual claim must cite a raw source using `[1]`, `[2]` etc.
- Add a `## Sources` section at the bottom of the page listing the cited files.
- If sources contradict each other, write it explicitly in the body.
- Do not mix background knowledge with citations: if something is not in raw, label it as "background knowledge".

---

## Rules

### Reading
- Read from the knowledge base only when it is relevant to the current task or query.
- Start from `wiki/index.md` to find relevant pages, then drill into them following links.
- Do not load the entire wiki into context — read only what is needed.

### Writing
- **Never create or modify knowledge autonomously.** The user is always in charge of sourcing.
- Write to `wiki/` only when the user explicitly requests an ingest, update, or analysis to be filed.
- After writing, always update `wiki/index.md` (add or update the entry) and append to `wiki/log.md`.
- Never modify files in `raw/`.

---

## Operations

### Ingest
Triggered explicitly by the user when a new source is added to `raw/`.

1. Read the source document.
2. Discuss key takeaways with the user if needed.
3. Write a summary page in `wiki/`.
4. Update relevant entity and concept pages across `wiki/`.
5. Update `wiki/index.md` (add or update the entry; each entry must include: relative link, one-line summary, and optionally date or source count; organize by category).
6. Append an entry to `wiki/log.md`:

```
## [YYYY-MM-DD] ingest | Source Title
Brief description of what was added and which pages were updated.
```

### Query
Triggered when the user asks a question that requires synthesizing knowledge.

1. Read `wiki/index.md` to locate relevant pages.
2. Read the relevant pages, following links as needed.
3. Synthesize and answer with citations to wiki pages.
4. If the answer is valuable (analysis, comparison, discovery), offer to file it as a new wiki page.
5. If filed, update `wiki/index.md` and append to `wiki/log.md`:

```
## [YYYY-MM-DD] query | Question or Page Title
Brief description of what was answered and whether it was filed.
```

### Lint
Triggered explicitly by the user to health-check the wiki.

Check for:
- Contradictions between pages
- Stale claims superseded by newer sources
- Orphan pages with no inbound links
- Important concepts mentioned but lacking their own page
- Missing cross-references

Append to `wiki/log.md`:

```
## [YYYY-MM-DD] lint
Summary of issues found and actions taken.
```

---

## Style

- **Always use English.**
- **Brevity:** concise pages. A page fits in under 300 lines. Prefer links over duplication.
- **No noise:** no meta-commentary, no "what I'll do next". Content only.

---

## What NOT to do

- Do not modify files in `raw/`.
- Do not create stub pages with only a title and TODO — better no page than an empty one.
- Do not write summaries of summaries. If a page lacks content, do not create it.
- Do not create or modify knowledge autonomously. The user is always in charge of sourcing. Write to `wiki/` only when explicitly requested.
