# maitreyasapariya.me

A digital research profile supporting an application to a research-oriented
graduate programme in Europe. (The specific programme, the rationale, and what
its evaluators weight live in `PRIVATE_NOTES.md` — gitignored, never committed.)
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
  **Two families only** (Newsreader, JetBrains Mono), weight-axis builds.
  Adding a third face needs the same justification as adding a dependency.
- Site-wide facts live in `src/site.config.ts`, nowhere else
- Vercel, Hobby plan (non-commercial — never add analytics that monetize)
- TypeScript, strict

## Design system — law, not suggestion

Concept: **a fieldbook.** One hue family — a deep pine green — tinted the
whole way from paper to ink, so the page reads as a single material rather
than a neutral sheet with accents dropped on it. Two typefaces. One dark
"terminal" strip (the status ledger) as the single high-contrast surface.

```
Paper           #F2F4EF   page background — pale limestone, green cast
Paper raised    #E6EAE1   inline code
Ink             #171C1A   primary text — green-black, not neutral black
Ink soft        #4C5450   secondary text
Ink faint       #646E69   meta text
Hairline        rgba(23,28,26,0.13)
Hairline strong rgba(23,28,26,0.24)   borders, underlines

Terminal bg     #141A18   the ledger strip only
Terminal text   #E4E8E1
Terminal soft   #9AA49E

Signal green    #2B6B4F   shipped, links on hover, focus ring, live rail
Signal amber    #8A5A17   in progress
Signal slate    #4A5D6B   planned / note
```

Every one of these is a CSS custom property in `global.css`. Use the
variable, never the literal hex. A stray hex in a diff is a REJECT.

**Every text color above clears WCAG AA (4.5:1) on `--paper` at body size.**
If you introduce a color, compute the ratio before you ship it. Signal
colors are never the sole carrier of meaning — a text label saying the same
thing sits beside every status dot on the site.

Type

```
Display + body  Newsreader (serif)   380 for h1, 500 h2, 600 h3, 400 body
Mono            JetBrains Mono       meta, labels, nav, ledger, status
Measure         38rem   (--measure)       prose, ~68 chars, never wider
Measure wide    54rem   (--measure-wide)  page container
```

One serif doing display and body is deliberate. Hierarchy comes from size,
weight and the mono, not from a second family. A grotesque display face is
what made this read as a portfolio rather than a notebook.

Scale is fluid, set once in `global.css` (`--t-2xs` … `--t-xl`) with
`clamp()`. Do not introduce a new font size in a component file — if one is
missing, add it to the token block with a reason.

Spacing: the `--s-1` … `--s-8` scale (0.25rem step), `--gutter`,
`--section-y`, `--hero-y`. No magic pixels, no bare `rem` in a component.

Signature element: **the status rail.** Every list is a hairline spine with
each entry's status dot straddling the line; hovering a linked entry lights
that segment green. It exists because it encodes something true — this site
is a ledger of state — not because a list needed decorating. All list
markup lives in `Entry.astro`; change the shape there, not per page.

Motion

- Allowed: opacity fade, ≤8px translate, 200–500ms, ease-out (`.reveal`)
- Banned: scale on hover, spring physics, parallax, scroll-jacking,
  spinning, staggered letter reveals, gradient text, glassmorphism
- All of it lives inside `@media (prefers-reduced-motion: no-preference)`.
  Motion that animates for a user who asked for none is a REJECT.

Banned CSS patterns: box-shadow of any kind, border-radius above 14px
(the favicon) or 4px (everything else — circles excepted, the status dots
are `50%`), any emoji in UI chrome. Symbol glyphs in chrome are a hazard
too: `⧗` and `↻` were removed from the ledger because neither is in
JetBrains Mono and both fell back to a different font. Use words.

**One sanctioned gradient:** the faint `radial-gradient` dot grid on
`body`. It is the notebook texture and the only gradient on the site.
Any other gradient is a REJECT.

---

## Review checklist — run on every diff

- [ ] Serves the thesis sentence
- [ ] Zero content-rule violations
- [ ] Uses only design-system custom properties (grep for stray hex)
- [ ] Any new text color computed against `--paper` and ≥ 4.5:1
- [ ] Status is carried by a word, not only by a color
- [ ] Lighthouse: performance ≥ 95, a11y = 100
- [ ] Keyboard navigable; visible focus states
- [ ] Renders correctly at 375px
- [ ] No client-side JS shipped for a static section (Astro islands only
      where interactivity is real). **One sanctioned exception:** the
      ~500-byte inline script in `StatusLedger.astro` that renders the
      countdown and the "log:" date in the terminal strip. This was
      reviewed and accepted as a permanent, intentional carve-out — the
      values must be computed at view time, not build time. It is not an
      open violation. Do not re-flag it, and do not remove it without an
      explicit instruction from Maitreya. Any *other* client-side JS on a
      static section is still a REJECT.
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
9. travel map — optional, only after everything above is live

## Git

Conventional commits. One logical change per commit.
`feat(home): hero section` `fix(a11y): focus ring on nav links`
Never commit generated prose. Never force-push main.
