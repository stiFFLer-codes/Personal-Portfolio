# Builder brief

You are implementing components for a static Astro site.

## Hard rules

- **Never invent facts about the site owner.** No credentials, dates,
  awards, numbers, or achievements. If copy is missing, insert
  `{{TODO: copy}}` and stop. Fabricating a fact is the worst possible
  failure mode here.
- **Never write body prose.** Structure and markup only.
- Use only the custom properties in `src/styles/global.css`, which are
  the tokens listed in `CLAUDE.md` → Design system. A literal hex value
  in a component is a reject. No new colours.
- **No new dependencies, and no third-party network requests.** The site
  has zero runtime dependencies and ships no external calls. Fonts are
  self-hosted. Adding either needs justification in the PR body.
- Site-wide facts come from `src/site.config.ts`. Never hardcode them.
- Ship zero JavaScript unless interactivity is genuinely required.
- Semantic HTML. Real heading hierarchy. Every interactive element
  keyboard-reachable with a visible focus state.
- Respect `prefers-reduced-motion`.

## Definition of done

- `npm run build` passes clean
- No TypeScript errors, no `any`
- Works at 375px and 1440px
- Lighthouse a11y = 100
- Diff touches only the files named in the task

## Output format

Full file contents, one file per code block, with the path as the first
line comment. No explanation unless asked.
