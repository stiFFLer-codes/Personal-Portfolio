# maitreyasapariya.me

A digital research profile supporting an application to a research-oriented
graduate programme in Europe. (The specific programme, the rationale, and what
its evaluators weight live in `PRIVATE_NOTES.md` — gitignored, never committed.)
Not a portfolio. Not a landing page. A lab notebook that happens to be public.

## Thesis

Every element on this site serves one sentence:

> **I build software systems that report what they couldn't resolve.**

(Maitreya's line, adopted in phase 11. It replaced "I build software systems
that turn messy, real-world data into decisions people can act on", which
described a job rather than a research identity.)

<!-- Maitreya: this is the working thesis, carried over from the v2 hero.
     Confirm or rewrite the exact wording before the site goes public.
     Direction is settled; the sentence is yours. -->

If a section does not serve that sentence, it does not ship.

## Reader

A professor, 11 PM, having read 200 applications. They are reading, not
admiring. Optimize for: scannable, credible, specific. Never for: impressive.

**Revised with Maitreya:** this site is not a deliverable for the target
programme — that programme never asks for a portfolio. It's a supporting digital
presence someone may look up from the CV / LinkedIn. For a *lookup* (not a scored document), evident craft
and care read as an asset, not a liability. So: content stays
scannable/credible/specific, but the `/travel` plate is a sanctioned showcase
where deliberate visual ambition is allowed. That licence is scoped to `/travel`
unless extended explicitly — it does not loosen the content rules anywhere.

---

## CLAUDE'S ROLE — read this carefully

**Revised with Maitreya, 30 Oct 2026 (phase 11):** Claude is the **architect,
builder and reviewer.** No other agent builds on this site. That makes the
review step more important, not less: Claude reviews its own diff against the
checklist below before every push, with the same severity it would apply to
anyone else's.

You DO:

- Maintain the plan and the phase order
- Decide file structure, component boundaries, data modelling
- Build the components, styles and pages
- Run the review checklist on every diff, and fix what fails before pushing
- Write commit messages and keep git history clean
- Say no. Frequently. That is the job.

You DO NOT:

- Write prose for the site (Maitreya does that, alone). Cutting a sentence
  that a change has made false is allowed; flag it with a `TODO(markie)` so
  he can rewrite it. Rewording it is not.
- Guess at a fact (an author list, a date, a venue). Leave the field unset
  and flag it.
- Add sections, animations, or pages that were not planned
- Accept work because it "looks fine"

When asked to review, output exactly: `APPROVE` or `REJECT` + numbered
reasons. No hedging. No "this is great, but..."

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

7. **Avoid the em dash.** Use a comma, colon or full stop instead; keep
   an em dash only where nothing else works. Labels, titles and page
   titles never carry one (the title separator is ` · `).

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
than a neutral sheet with accents dropped on it. Two typefaces. The one dark
surface is the filled button (ink on paper). The dark "terminal" ledger strip
was retired in phase 11: it had shrunk to one fact the intro already carries.

```
Paper           #F2F4EF   page background — pale limestone, green cast
Paper raised    #E6EAE1   inline code
Ink             #171C1A   primary text — green-black, not neutral black
Ink soft        #4C5450   secondary text
Ink faint       #646E69   meta text
Hairline        rgba(23,28,26,0.13)
Hairline strong rgba(23,28,26,0.24)   borders, underlines

Signal green    #2B6B4F   shipped, links on hover, focus ring, live rail
Signal amber    #8A5A17   in progress
Signal slate    #4A5D6B   planned / archived
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
Mono            JetBrains Mono       meta, labels, nav, margin column, status
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

Signature element: **the margin.** Every list on the site is one shape
(`Entry.astro`): a mono margin column on the left, then the content. The
margin says what state the thing is in, in a word chosen for the kind of
thing, or when it happened:

| Kind | Margin shows | Dot |
| --- | --- | --- |
| Papers | `stage`: accepted · presented · submitted · not submitted | yes |
| Projects | `stage`: complete · archived · live | yes |
| Jobs | dates: `Jan 2026 – now` | no |
| Education, certifications, news, posts | a date | no |

Never show the raw `status` enum ("shipped", "in progress") as a word: beside
a job it reads like cargo. `status` only picks a dot colour. The one list that
keeps a spine is the `/travel` field log, because it is a route. All list
markup lives in `Entry.astro`; change the shape there, not per page.

Home page shape (phase 11): the home page is the whole profile, in the
academic-homepage genre a professor already knows how to read. Name as the
h1, the thesis line, Maitreya's bio, role, links (email, ORCID, GitHub,
LinkedIn), portrait; then publications as citations; experience; education
and certifications beside projects and news. Every section is capped (news:
three) so one page stays scannable. There is no `/about`.

Motion

- Allowed: opacity fade, ≤8px translate, 200–500ms, ease-out (`.reveal`)
- One sanctioned hover micro-interaction, site-wide: the directional arrow
  glide on forward/back links (a `→`/`←` pseudo-element that translates ≤3px
  in its own direction on hover/focus). It obeys the Allowed rule above
  (≤8px translate, ease-out, reduced-motion gated), so it is a note for
  honesty, not a carve-out — and it is the only hover-driven motion permitted
  outside `/travel`.
- Banned: scale on hover, spring physics, parallax, scroll-jacking,
  spinning, staggered letter reveals, gradient text, glassmorphism
- All of it lives inside `@media (prefers-reduced-motion: no-preference)`.
  Motion that animates for a user who asked for none is a REJECT.

**One sanctioned motion carve-out: the `/travel` plate.** Reviewed and
accepted with Maitreya as a deliberate showcase exception. It carries a bounded set the list above would
otherwise forbid: (1) the route line *draws itself* once on load via
`stroke-dashoffset`; (2) a small green **token that travels the route path**
on load (CSS `offset-path`); (3) a **multi-layer pointer-parallax** — the map
and the pins drift on two planes toward the cursor (small bound), gated to fine
pointers; (4) a **staged load** (grid/labels fade, route inks, token travels,
pins drop in order); (5) a static ≤1.5° tilt on mounted photos (a tilt, not a
spin). All of it lives inside `prefers-reduced-motion: no-preference` and
degrades to a fully static, functional plate without motion or JS. This is the
*only* place any of it is allowed — the bans above still hold everywhere else.
Do not extend it to other sections, and do not remove it without an explicit
instruction from Maitreya.

Banned CSS patterns: box-shadow of any kind (one sanctioned exception: the
single soft lift on the `/travel` plate, so it reads as a page mounted on the
desk — reviewed with Maitreya), border-radius above 14px (the favicon) or 4px
(everything else — circles excepted, the status dots are `50%`), any emoji in
UI chrome. Symbol glyphs in chrome are a hazard
too: `⧗` and `↻` were removed from the old ledger because neither is in
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
      where interactivity is real). **One sanctioned exception:**
      the small inline script in `TravelMap.astro` (`/travel`), which adds
      bounded pointer-parallax and lights the route leg into a hovered stop.
      It is pure enhancement — the map renders, the route draws, hover cards
      show, and every marker still links to its field-log entry with the
      script absent. Reviewed and accepted; do not re-flag it.
      (The StatusLedger countdown script, once a second exception, was
      removed in phase 10; the ledger itself was retired in phase 11.)
      Any *other* client-side JS on a static section is still a REJECT.
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
4. ~~Fill `site.config.ts` TODOs; settle the project's spelling~~ DONE
5. ~~Case study: the maternal-health system~~ DONE — resolved per Maitreya:
   Maatritwa AI (the prototype, national innovation demo, ASHA/doctor views
   wired, mother view a documented mock) and Three Voices (the research
   paper, public UCI dataset, distinct from the prototype) are related but
   separate. `maatritwa-ai.md` corrected accordingly; Three Voices added
   to `/research`.
6. ~~Research (in-progress, honest) + Experience~~ DONE — `/research` (3
   entries) and an Experience section on `/about` (2 employers)
7. ~~Case study: DataSaarthi~~ DONE. "Romanian Fiscal AI" is confidential
   Crest production work, not a public case study — it lives as a one-line
   mention in the Experience entry, and the research question it raised
   ships as the ADS-Cascade paper instead.
8. ~~Writing~~ DONE — shipped ahead of 6/7. Deviation from "do not skip
   ahead," left as-is rather than unwound; noted here so it reads as a
   decision, not drift.
9. ~~Travel map~~ DONE — `/travel`: an inline-SVG survey plate (accurate
   Natural Earth boundaries + lakes, projected and baked at build time by
   `scripts/build-travel-geo.py` → `src/components/travel-geo.ts`; no runtime
   dep or request) of the Aug 2025 Nordic/Baltic trip, anchored on the Jyväskylä Summer
   School, with a `places` collection, one linked marker per stop, and a
   "field log" list below that carries every stop without JS. Elevated past
   the scaffold into an atlas plate: the map breaks out of the text measure
   with its title/legend/stop-index as marginalia in the side space, labels
   carry a paper knockout halo, and the graticule shows in the sea only.
   Maitreya's photos are mounted and his per-stop blurbs + hero copy are in.
   (The `/writing` h1 and lede, open here, landed in phase 11.)
   Motion + the one inline script are the documented carve-outs above.
10. ~~Status refresh, October 2026~~ DONE on branch, pending Maitreya's review.
    The `/log` route, the ledger's `target:` countdown and `log:` date, and
    their inline script are retired (`/log` 308s to `/` via `vercel.json`);
    the ledger shows `now:` only, and home carries a "Recent" list of the
    newest five changelog entries. Research statuses refreshed (CARTA at
    IJMADA, the accessibility-workshop position paper, Three Voices on
    arXiv); ADS-Cascade is superseded by "Prediction is not selection"
    (`/research/ads-cascade` redirects), so phase 7's research question now
    ships there. Maatritwa AI is an archived prototype. www is the canonical
    host; static Open Graph card (`scripts/og-image.html` → `public/og.png`);
    ORCID in the footer; redacted certificates in `public/` with originals
    kept in the gitignored `private-docs/`.
11. ~~Redirection: academic homepage~~ DONE on branch, approved by Maitreya
    30 Oct 2026. Brief: `docs/superpowers/specs/2026-10-30-phase-11-redirection.md`.
    Maitreya's new thesis line and bio; the home page is the whole profile
    and `/about` 308s to `/`; the ledger strip and terminal tokens are gone;
    every list uses the margin column with words fitted to the kind of
    thing (no "shipped" beside a job); tighter rhythm; full-name wordmark;
    new Open Graph card; Person JSON-LD and `/sitemap.xml`. Claude now
    builds as well as reviews. Follow-ups settled with Maitreya the same day:
    author lists per paper (`authors`, in published order), the `/projects`
    lede kept to his last sentence, the `/writing` lede (his words). The CV
    link was removed outright, with no placeholder: whether a CV belongs on
    the site is his call, later. Do not re-add it unasked.

## Git

Conventional commits. One logical change per commit.
`feat(home): hero section` `fix(a11y): focus ring on nav links`
Never commit generated prose. Never force-push main.
