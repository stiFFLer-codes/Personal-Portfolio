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

`npm run audit` writes `src/data/a11y-audit.json`. The footer prints what is
in that file, so the accessibility claim on the site is the last run, not a
sentence someone typed. It needs Playwright with
a Chromium it can launch; that is deliberately not a dependency of the site.

## Content model

Projects, research, writing, experience, changelog, and travel stops (`places`, rendered on `/travel`) are each single-file content collections. To add work to the site, add one file. Schema lives in `src/content.config.ts`.

Papers and projects list their `links` (doi, code, repository, and so on);
they render under each row and as Sources on the work's own page.

A `todo:` on a credential (or a `<Todo>` in a component, or a
`# TODO(markie): ...` comment in a content file) is a fact only Maitreya can
supply. It renders as an amber `TODO(markie)` in `npm run dev` and is left
out of production builds; build with `PUBLIC_SHOW_TODOS=true` to see them in
one. List them all with:

```sh
grep -rn "todo:\|Todo text=\|TODO(markie)" src
```

## Governance

Two files hold the rules:
- `CLAUDE.md`: the law. Content rules, design system, sanctioned scripts,
  review checklist, settled and pending decisions, history.
- `AGENTS.md`: context for fresh sessions. Site map, content workflow, the
  links, figures and TODOs, the checks to run before every push.

`FABLE_NOTES.md` is the reasoning behind phase 13, the current design.

All factual claims on the site must survive verification. Accessibility is not optional.
