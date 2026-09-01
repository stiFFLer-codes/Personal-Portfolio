# Context for fresh sessions

This site is a maintained system, not a brochure. Every claim is true; every status honest.

## What this site is

A research profile supporting an application to a research-oriented graduate programme in Europe. See `PRIVATE_NOTES.md` (gitignored) for the specific programme and reasoning. The public site refers only to "a research-oriented graduate programme in Europe."

The thesis: **"I build software systems that turn messy, real-world data into decisions people can act on."** Every section serves that sentence or it doesn't ship.

The reader: a professor at 11 PM who has already read ~200 applications. Optimize for scannable, credible, specific.

## Site map (current + planned)

| Route | Status | Purpose |
| --- | --- | --- |
| `/` | Live | Hero, current work, research, recent log |
| `/about` | Live | Biography, education, research interests |
| `/projects` | Live | List of all projects with status |
| `/projects/[slug]` | Live | Project detail + sources block |
| `/research` | Shipped, live status unconfirmed | List of research (ADS-Cascade, CARTA) |
| `/research/[slug]` | Shipped, live status unconfirmed | Research detail + sources block |
| `/log` | Live | Timestamped changelog |
| `/writing/[slug]` | Planned (phase 8) | Human-authored writing |
| `/travel-map` | Optional (phase 9) | Only after all above are live and proven useful |

The phase order in `CLAUDE.md` is the source of truth. Follow it; don't skip ahead.

## Content workflow

`src/content.config.ts` is the authority on every field below. If this file
and the schema disagree, the schema wins and this file is the bug.

### Adding a project

Create `src/content/projects/[slug].md`.

Required: `title`, `status` (`shipped` / `in-progress` / `planned`), `statusLabel` (a sentence naming the real state, e.g. "Methodology locked, model training not started"), `summary`.
Optional: `stack` (array of strings), `order` (integer, default 99), `startDate`, `links` (`repo`, `live`, `preprint` — full URLs).

Body is Markdown. Each `##` gets a rule above it; there is no per-section box.

### Adding research

Create `src/content/research/[slug].md`.

Required: `title`, `status`, `statusLabel`, `summary`.
Optional: `venue`, `order`, `links` (`arxiv`, `code`, `doi` — full URLs).

### Adding a log entry

Create `src/content/changelog/[YYYY-MM-DD]-slug.md`.

Required: `date`, `title`.
Optional: `tag` — one of `ship`, `progress`, `note` (default `note`). Note these are *not* the project status words. Body optional; if present it shows under the title.

### Links are not optional decoration

Anything in `links` renders as a "sources" block at the foot of the detail page. On a site whose argument is "check my claims", a paper with a public repo and no link to it is a bug.

`npm run build` must pass. No TypeScript errors. Test at 375px and 1440px. Lighthouse a11y = 100.

## Rules and tokens

For content rules, design tokens, design system law, and review checklist: read CLAUDE.md. Don't duplicate them here; it's the single source of truth.

Never name the programme, consortium, or partner institutions in any committed file. Use generic language only. The reasoning lives in PRIVATE_NOTES.md.

## One principle

**Simplicity over complexity.** When there's a simpler way to build or word something, take it. Don't add sections, dependencies, or process overhead the site doesn't need yet.

## Session startup

1. Read this file.
2. Check `state.md` to see where work left off.
3. Check `CLAUDE.md` for design system and full review checklist before shipping anything.
4. If you're unsure whether something is in scope, it probably isn't—ask the user.
