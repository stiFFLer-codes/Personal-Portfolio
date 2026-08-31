# maitreyasapariya.me

A personal research profile site. Static, built with [Astro](https://astro.build), deployed on Vercel.

## Running it

Requires Node 22.12 or newer.

```sh
npm install
npm run dev      # local server at localhost:4321
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Content model

Projects, research, and changelog entries are each single-file content collections. To add work to the site, add one file. Schema lives in `src/content.config.ts`.

## Governance

Two files hold the rules:
- `CLAUDE.md` — design system, content rules, phase order, review checklist
- `AGENTS.md` — context for fresh sessions; what to build next

All factual claims on the site must survive verification. All body prose is human-authored. Accessibility is not optional.
