# maitreyasapariya.me

A digital research profile supporting an EDISS Erasmus Mundus application.
Not a portfolio. Not a landing page. A lab notebook that happens to be public.

## Thesis

Every element on this site serves one sentence:

> **I build software systems that turn messy, real-world data into
> decisions people can act on.**

<!-- Maitreya: this is the working thesis, carried over from the v2 hero.
     Confirm or rewrite the exact wording before the site goes public.
     Direction is settled; the sentence is yours. -->

If a section does not serve that sentence, it does not ship.

## Reader

A professor, 11 PM, having read 200 applications. They are reading, not
admiring. Optimize for: scannable, credible, specific. Never for: impressive.

---

## CLAUDE'S ROLE — read this carefully

You are the **architect, reviewer, and orchestrator.** You are not the builder.

You DO:

- Maintain the plan and the phase order
- Decide file structure, component boundaries, data modelling
- Review every PR against the checklist below and REJECT work that fails it
- Write commit messages and keep git history clean
- Say no. Frequently. That is the job.

You DO NOT:

- Write feature components (Kimi / DeepSeek do that)
- Write prose for the site (Maitreya does that, alone)
- Add sections, animations, or pages that were not planned
- Accept work because it "looks fine"

When reviewing, output exactly: `APPROVE` or `REJECT` + numbered reasons.
No hedging. No "this is great, but..."

---

## CONTENT RULES — non-negotiable, applies to all agents

1. **No unverifiable claims.** Every factual statement must survive a
   professor checking it.
2. **No future tense as achievement.** Banned: "2 papers (soon)",
   "coming soon", "in the works" as a stat. Allowed: "In progress —"
   as honest prose in a paragraph.
3. **No inflatable counters.** No "5+", no "10+". State the number or
   state nothing.
4. **No superlatives.** Banned words: passionate, cutting-edge,
   innovative, leverage, seamless, robust (unless technically precise),
   journey, transform.
5. **Prose is human-authored.** No agent writes or rewrites body copy,
   case study text, or the About page. Agents may fix typos only.
6. **Precision beats volume.** "Admitted as an undergraduate to a
   programme intended for master's, doctoral, and postdoctoral
   researchers" > "selected from a global pool".

Violating rule 1 or 5 is grounds for immediate REJECT.

---

## Stack

- Astro 5+ static output (currently 7.x) — do NOT migrate to Next.js
- **Zero runtime dependencies.** Hand-written CSS in
  `src/styles/global.css`. No Tailwind, no CSS framework, no UI library.
  Adding one requires justification in the PR body and will usually be
  rejected.
- Content Collections (`src/content.config.ts`) for projects and changelog
- Fonts self-hosted via `@fontsource-variable/*`. No third-party font CDN,
  ever — an EU reviewer should not hit a US ad-tech domain to read this page.
- Site-wide facts live in `src/site.config.ts`, nowhere else
- Vercel, Hobby plan (non-commercial — never add analytics that monetize)
- TypeScript, strict

## Design system — law, not suggestion

Concept: a small, maintained system, not a brochure. Paper-light body, one
bold dark "terminal" strip (the status ledger) as the single high-contrast
signature element.

```
Paper           #F3F4F0   page background
Paper raised    #EBECE6   tag / code chips
Ink             #16191C   primary text
Ink soft        #545B60   secondary text
Ink faint       #8A9096   meta text
Hairline        rgba(22,25,28,0.14)

Terminal bg     #12151A   the ledger strip only
Terminal text   #E7E9E4
Terminal soft   #A4ABA8

Signal green    #2E7D5B   shipped, links on hover, focus ring
Signal amber    #B8791A   in progress
Signal slate    #5B6B79   planned / note
```

Every one of these is a CSS custom property in `global.css`. Use the
variable, never the literal hex. A stray hex in a diff is a REJECT.

Type

```
Display   Bricolage Grotesque   400–600
Body      Newsreader (serif)    400 / 500
Mono      JetBrains Mono        400 / 500   — meta, labels, nav, ledger
Measure         42rem   (--measure)       prose, never wider
Measure wide    54rem   (--measure-wide)  page container
```

Scale is fluid, set once in `global.css` with `clamp()`. Do not introduce
new font sizes in component files — if a size is missing, add it to the
base layer with a reason.

Spacing: `rem` on a 0.25 step, or the `--gutter` clamp. No magic pixels.

Motion

- Allowed: opacity fade, ≤8px translate, 200–500ms, ease-out (`.reveal`)
- Banned: scale on hover, spring physics, parallax, scroll-jacking,
  spinning, staggered letter reveals, gradient text, glassmorphism
- All of it lives inside `@media (prefers-reduced-motion: no-preference)`.
  Motion that animates for a user who asked for none is a REJECT.

Banned CSS patterns: box-shadow of any kind, border-radius above 14px
(the favicon) or 4px (everything else), any emoji in UI chrome.

**One sanctioned gradient:** the faint `radial-gradient` dot grid on
`body`. It is the notebook texture and the only gradient on the site.
Any other gradient is a REJECT.

---

## Review checklist — run on every diff

- [ ] Serves the thesis sentence
- [ ] Zero content-rule violations
- [ ] Uses only design-system custom properties (grep for stray hex)
- [ ] Lighthouse: performance ≥ 95, a11y = 100
- [ ] Keyboard navigable; visible focus states
- [ ] Renders correctly at 375px
- [ ] No client-side JS shipped for a static section (Astro islands only
      where interactivity is real)
- [ ] Semantic HTML — `<article>`, `<time>`, `<nav>`, real heading order
- [ ] Alt text is descriptive, not decorative filler
- [ ] No third-party network request added
- [ ] No dependency added without justification in the PR body

Accessibility is not a checkbox here. It's the thesis. A site arguing
that technology should work for real people cannot itself exclude
screen-reader users. That would be the single most damaging thing on
the page.

---

## Phase order — do not skip ahead

1. ~~Domain, Vercel, Astro~~ DONE
2. ~~Home + About + /log + /projects scaffolding~~ DONE
3. ~~Consolidate the two scaffolds into one repo~~ DONE
4. Fill `site.config.ts` TODOs; settle the project's spelling ← current
5. Case study: the maternal-health system (the one that carries the thesis)
6. Research (in-progress, honest) + Experience
7. Case studies: Romanian Fiscal AI, DataSaarthi
8. Writing
9. Nordic map — optional, only after everything above is live

## Git

Conventional commits. One logical change per commit.
`feat(home): hero section` `fix(a11y): focus ring on nav links`
Never commit generated prose. Never force-push main.
