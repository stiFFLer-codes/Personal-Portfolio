# maitreyasapariya.me

A personal research profile site. Static, built with [Astro](https://astro.build), deployed on Vercel.

> **This branch (`claude/charming-hopper-ogbbt8`) is a reimagining, not a
> release.** Read [`FABLE_NOTES.md`](./FABLE_NOTES.md) first: what changed,
> why, what is still open, and which words are waiting on Maitreya.

## Running it

Requires Node 22.12 or newer.

```sh
npm install
npm run dev      # local server at localhost:4321
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Checks

```sh
npm run audit      # build, run axe-core + a Tab pass on every page, rebuild
npm run contrast   # WCAG contrast of every text colour, both themes
node scripts/og-image.mjs   # regenerate public/og.png
```

`npm run audit` writes `src/data/a11y-audit.json`. The footer and
`/unresolved` print what is in that file, so the accessibility claim on the
site is the last run, not a sentence someone typed. It needs Playwright with
a Chromium it can launch; that is deliberately not a dependency of the site.

## Content model

Projects, research, writing, experience, changelog, and travel stops (`places`, rendered on `/travel`) are each single-file content collections. To add work to the site, add one file. Schema lives in `src/content.config.ts`.

Papers and projects carry a `ledger`: what the page claims, and whether each
claim is `checkable` (there is a public link), `word` (stated, nothing public
to link) or `open` (unresolved). `src/ledger.ts` gathers them, with study and
work from `src/site.config.ts`, into the counts on the home page and the full
list on `/unresolved`. To move a claim from "on my word" to "checkable", give
it a link.

## Governance

Two files hold the rules:
- `CLAUDE.md` — design system, content rules, phase order, review checklist
- `AGENTS.md` — context for fresh sessions; what to build next

On this branch both are out of date on purpose; see the note at the top of `CLAUDE.md`.

All factual claims on the site must survive verification. Accessibility is not optional.
