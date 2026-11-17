# maitreyasapariya.me

A digital research profile supporting an application to research-oriented
graduate programmes in Europe. (The specific programme, the rationale, and what
its evaluators weight live in `PRIVATE_NOTES.md`, gitignored, never committed.)

A portfolio, not a court hearing: the work, said plainly and linked where it
can be. (Maitreya, 17 Nov 2026.)

## Thesis

Every element on this site serves one sentence:

> **I build software systems that report what they couldn't resolve.**

(Maitreya's line, adopted in phase 11. It replaced "I build software systems
that turn messy, real-world data into decisions people can act on", which
described a job rather than a research identity.)

Since phase 13 the home page shows it through the work itself: the
better-sounding answer struck through beside the one each piece of work
reported, a playable version of the Three Voices idea, and CARTA's own
figure.

If a section does not serve that sentence, it does not ship.

## Reader

Someone who looks Maitreya up from his CV or LinkedIn. Most often a professor
late at night after two hundred applications; also a possible supervisor or
collaborator, or someone he met on the 2025 trip. No programme asks for this
site. It is what they find.

The home page serves two speeds:

- **The argument**, top of the page: the thesis, the struck-through findings,
  the coin-flip demo. For a reader with a minute of curiosity.
- **The record**, further down: the academic-homepage genre (papers, systems,
  work, study) compressed into one section. For the reader in a hurry, one
  link from the top ("Short on time? Skip to the record").

Content is scannable, credible and specific everywhere. Since phase 13,
deliberate visual ambition is allowed site-wide, inside the design system
below. That licence never loosens the content rules.

---

## CLAUDE'S ROLE: read this carefully

Claude is the **architect, builder and reviewer.** Claude reviews its own diff
against the checklist below before every push, with the same severity it would
apply to anyone else's.

You DO:

- Maintain the plan and the phase order
- Decide file structure, component boundaries, data modelling
- Build the components, styles and pages
- Run the review checklist on every diff, and fix what fails before pushing
- Write commit messages and keep git history clean
- Say no. Frequently. That is the job.

You DO NOT:

- **Rewrite Maitreya's words.** His thesis, bio, posts, stop notes, paper and
  project bodies, page ledes, and every line quoted from them. Fix typos only.
  A sentence a change has made false may be cut; flag it with a `todo:` so he
  can rewrite it.
- **Draft copy unasked.** Draft only when Maitreya asks for it in that
  session, and mark every drafted block with a `drafted by <who>` comment, so
  he can find the words that are his to rewrite. Drafted copy is never passed
  off as his.
- **Guess at a fact** (an author list, a date, a venue, a number, a link).
  Leave the field unset and add a `todo:`.
- Add sections, animations, or pages that were not planned
- Reopen anything under *Settled decisions* unasked
- Accept work because it "looks fine"

When asked to review, output exactly: `APPROVE` or `REJECT` + numbered
reasons. No hedging. No "this is great, but...".

---

## CONTENT RULES: non-negotiable, apply to all agents

1. **No unverifiable claims.** Every factual statement must survive a
   professor checking it.
2. **A portfolio, not a court hearing.** Say what the work is and link what
   can be linked. Never label, count, sort or flag a claim by how provable it
   is: no "checkable", "on my word" or "unresolved", no tally of claims, no
   box of what a piece of work couldn't settle. Honest limits belong in the
   work's own write-up, in Maitreya's words, not in site furniture.
3. **No future tense as achievement.** Banned: "2 papers (soon)", "coming
   soon", "in the works" as a stat. Allowed: "In progress" as honest prose.
4. **No inflatable counters.** No "5+", no "10+". State the number or state
   nothing. A count on the site (the accessibility sentence in the footer)
   is computed from content at build, never typed.
5. **No superlatives.** Banned words: passionate, cutting-edge, innovative,
   leverage, seamless, robust (unless technically precise), journey,
   transform.
6. **Maitreya's prose is his.** See *Claude's role*. Agents fix typos only in
   his words, and mark anything they draft.
7. **Precision beats volume.** "Admitted as an undergraduate to a programme
   intended for master's, doctoral, and postdoctoral researchers" beats
   "selected from a global pool".
8. **Avoid the em dash.** Use a comma, colon or full stop instead; keep an em
   dash only where nothing else works. Labels, titles and page titles never
   carry one (the title separator is ` · `).
9. **The programme is never named** in any committed file. Publicly it is
   "research-oriented graduate programmes in Europe".

Violating rule 1, 2 or 6 is grounds for immediate REJECT.

---

## Stack

- Astro 7, static output, `build.inlineStylesheets: 'always'` (the stylesheet
  was the only render-blocking request). Do NOT migrate to Next.js.
- **Dependencies:** `astro` and three `@fontsource-variable/*` packages.
  Dev only: `axe-core`. Playwright drives `scripts/audit.mjs` and
  `scripts/og-image.mjs` but is deliberately not a dependency. No CSS
  framework, no UI library. Adding a dependency requires justification in
  the PR body and will usually be rejected.
- **Hand-written CSS:** `src/styles/global.css` (tokens and everything
  site-wide) and `src/styles/travel.css` (the `/travel` plate, imported only
  by that page).
- Content collections in `src/content.config.ts`. Site-wide facts (name,
  links, role, education, certifications) in `src/site.config.ts`, nowhere
  else. Link labels in `src/links.ts`.
- Fonts self-hosted. No third-party font CDN, ever: an EU reviewer should not
  hit a US ad-tech domain to read this page.
- **No third-party requests and no trackers.** The footer says so; keep it
  true.
- Vercel, Hobby plan (non-commercial: never add analytics that monetize).
- TypeScript, strict. `npx astro check` reports 0 errors (it needs
  `@astrojs/check` and `typescript`; install them without saving).

## Design system: law, not suggestion

Concept: **the work, shown plainly.** The better-sounding number struck
through in red beside the one each piece of work reported, an amber
highlighter on the words that carry the argument, and a mono margin that says
what stage each thing is at. (Phase 13, Fable. It replaced the phase 9 to 12
"fieldbook": one pine-green hue and two typefaces. The claim ledger Fable
began with was retired the same day; see *Settled decisions*.)

### Colour

Every colour is a custom property in the `:root` token block of `global.css`.
Dark mode repeats the colour tokens twice, under
`@media (prefers-color-scheme: dark)` and under `:root[data-theme='dark']`;
**the two copies must stay identical.** A literal colour anywhere else is a
REJECT. Three known exceptions: the ORCID iD's white knockout, the print
stylesheet's white page, and the `/travel` plate's lift shadow.

```
                light     dark      contrast on --paper (light / dark)
Paper           #F5F2E9   #0F1513   page background
Paper 2         #ECE8DB   #18201D   raised surfaces: the demo, inline code
Paper 3         #E0DBCA   #222C28
Ink             #15201C   #ECE8DC   14.95 / 15.08
Ink soft        #414C47   #BCC2B9    7.98 / 10.16
Ink faint       #5D6761   #929C95    5.24 /  6.52   meta text
Line            ink at 14% alpha                    hairlines
Line strong     ink at 30 to 32% alpha              borders, underlines

Green           #1D6747   #77CF9F    6.08 /  9.86   link hover
Amber           #925600   #F0B04C    5.28 /  9.69   the lead accent
Red             #A52A1F   #FF9A8B    6.36 /  9.01   text beside a strike ("first draft")
Slate           #48596A   #A9BCCB    6.44 /  9.45   travel stop dots

Fills, never text: --amber-fill (lamps; also the focus ring), --green-fill,
--red-fill (the strike, the red lamp), --marker (the highlighter),
--lamp-off, --housing, --housing-edge, --housing-off, --housing-ring
Brand ORCID     #A6CE39   the ORCID iD disc only (--brand-orcid)
```

- **Every text colour clears 4.5:1 on both `--paper` and `--paper-2`, in
  both themes**, and text set on a fill clears it on that fill. The tightest
  pairs today are ink-faint and amber on `--paper-2` in light (4.79 and
  4.82). Run `npm run contrast` whenever a colour changes; it checks every
  pair above, and exits non-zero if any fails. A new text-on-fill pair joins
  its list.
- **Amber is the lead accent:** the highlighter, the focus ring, and the
  near-tie lamp in the demo. Red is only for the strike and the red lamp.
  Green is link hover.
- **Both themes are first-class.** The site follows the system setting; the
  footer switch (auto, light, dark) stores a choice in `localStorage`. Check
  every new component in both.
- `prefers-contrast: more` folds ink-faint into ink-soft and makes hairlines
  solid. `forced-colors: active` replaces fills with system colours and
  leans on borders and words. Keep both working.

### Type

```
Display   Fraunces          thesis, h1 to h3, the big numbers. 'SOFT' axis.
Body      Newsreader        reading text; italic for quotes
System    JetBrains Mono    states, dates, labels, nav, evidence links
Measure   38rem  (--measure)        prose, never wider
Wide      74rem  (--measure-wide)   page container
```

- **Three families.** A fourth needs the same justification as a dependency.
- Fraunces is the **soft build** (weight and SOFT axes only), Latin only,
  declared by hand in `Base.astro` and preloaded. Do not swap in the full
  build (twice the bytes) or use the WONK or opsz axes (not in the build).
- The rupee sign comes from a system serif (`.rs`, `.cur`): no web face
  carries it in its Latin file, and loading Fraunces' Latin Extended file
  for one glyph added 103 KB to the home page.
- The scale is set once in the token block (`--t-2xs` to `--t-hero`, and
  `--t-num` for the struck numbers). Do not introduce a font size in a
  component; add a token with a reason.
- Spacing is the `--s-1` to `--s-9` scale, `--gutter`, `--section-y`,
  `--hero-y`. No magic pixels, no bare `rem` in a component.

### Signature elements

1. **The strike** (`.finding`, `.was`, `.is` on the home page). The
   better-sounding answer, struck through with one off-level red stroke,
   above the answer the work reported, set large. CARTA's card shows the
   paper's Fig. 1, redrawn in the site's tokens (`.finding-figure`), in
   place of numbers. Every finding must be backed by the page it links to;
   never strike something the work did not actually report.
2. **The margin** (`Entry.astro`, the only list-row shape). A mono margin on
   the left, then the content; the row ends with its links.
   The margin says what stage the thing is at, in a word chosen for the kind
   of thing, or when it happened:

   | Kind | Margin shows |
   | --- | --- |
   | Papers | `stage`: published · accepted · presented · preprint · submitted · completed |
   | Systems | `stage`: in production · complete · archived · live |
   | Jobs | dates: `Jan 2026 – now` |
   | Education, certifications | a date |
   | Writing posts | the year only (`2026`): never a day or month the post can't vouch for |

   The `status` enum stays in the schema but nothing renders it since phase
   13; set it truthfully anyway. Never show it as a word: beside a job,
   "shipped" reads like cargo. Change the row shape in `Entry.astro`, not
   per page. The `/travel` field log is the one list that keeps a spine,
   because it is a route.
3. **The coin flip** (`CoinFlip.astro`). One prediction, three readers.
   Rendered on the server at the one real case (0.487 against 0.499), so it
   is complete with scripts off; the script only moves the gap. Below the
   margin the mother's lamp is amber, never red and never green. The demo
   says, inside itself, which numbers are real and which are stand-ins
   (`MARGIN` until Maitreya supplies the paper's; `HINDI_SENTENCE` empty
   until he supplies it). Keep it that way.
4. **The highlighter** (`mark`, `.marked`): an amber marker stroke on the
   words that carry the argument. Sparingly: the thesis and the titles that
   restate it.
5. **A paper's own figures** go on its page as images cropped from the
   published PDF, with the paper's caption word for word and alt text that
   describes the whole diagram (`.prose figure`; CARTA's Fig. 1 and 2).

### Shape

- **Radii:** `--radius` (4px) for boxes, `--radius-lg` (14px) for large
  containers and photos, a full pill for controls (buttons, chips, the
  toggle, the theme switch, the lamp housing), `50%` for circles. Nothing
  else.
- **Gradients:** hard-edged fills only: the highlighter and the demo
  slider's amber-to-red track. Never a soft fade,
  never gradient text.
- **Box-shadow:** two, both sanctioned: the glow ring on a lit lamp in the
  demo, and the `/travel` plate's lift. Nothing else.
- **Marks and icons:** the drawn arrows (below); the profile links'
  official
  Email, GitHub, LinkedIn and ORCID marks (`ProfileLinks.astro`, inline SVG,
  each beside its name, `aria-hidden`, never an `<img>` from the brand's
  server; the ORCID iD keeps its green). No other icons. No emoji in chrome.
- **Glyphs:** only those the self-hosted font files carry. Check a new glyph
  against the `.woff2` before using it. The Latin files carry `↓` and `↑`
  but not `→`, `←` or `↗`, so **arrows are drawn, never typed**: the
  `--arrow-right`, `--arrow-left`, `--arrow-down` and `--arrow-out` shapes in
  the token block, used as masks in the current text colour (the "Drawn
  arrows" rule in `global.css`; a new arrowed element joins its selector
  list, including the `forced-colors` copy). Screen readers announce
  nothing for them, which is right: each sits beside words that say where
  the link goes. In content, say it in words ("Helsinki to Stockholm").
  `⧗` and `↻` were removed in phase 10 for the same reason.

### Motion

All motion lives inside `@media (prefers-reduced-motion: no-preference)`, and
a `reduce` rule zeroes every transition and animation. Motion that plays for
a reader who asked for none is a REJECT.

Allowed:

- The load reveal (`.reveal`): opacity and an 8px rise, 0.6s, ease-out
- The highlighter drawn once across the thesis
- The strike drawn as a finding scrolls into view, only where the browser
  supports `animation-timeline`; it is simply there otherwise
- The arrow glide on `.go` links: 3px in the arrow's direction
- State changes on direct input: the toggle thumb, the demo's bars and lamps

Banned: scale on hover, spring physics, parallax (outside `/travel`),
scroll-jacking, spinning, staggered letter reveals, gradient text,
glassmorphism, anything that plays on its own after load.

**The `/travel` carve-out** (reviewed with Maitreya; the list is unchanged
since phase 9):
(1) the route line draws itself once on load via `stroke-dashoffset`; (2) a
small green token travels the route (CSS `offset-path`); (3) a two-plane
pointer-parallax, map and pins drifting toward the cursor within a small
bound, fine pointers only; (4) a staged load: grid and labels fade, route
inks, token travels, pins appear in order; (5) a static tilt of at most
1.5° on mounted photos. All reduced-motion gated, and the plate is fully
static and functional without motion or JS. Do not extend this to other
sections; do not remove it without an explicit instruction from Maitreya.
On a phone the map's markers are not tap targets (they sit too close
together); the stop index under the map is.

### Client-side JavaScript

The pages are static, and **every page works with scripts off.** The
sanctioned scripts, each pure enhancement:

| Where | What it does | With scripts off |
| --- | --- | --- |
| `Base.astro`, head | adds the `js` class; applies a saved theme before first paint | follows the system theme |
| `Base.astro`, body | registers `/sw.js`; shows the offline notice | no saved copy; no notice |
| `Footer.astro` | the theme switch | the switch is hidden |
| `CoinFlip.astro` | moves the gap; speaks the Hindi sentence once supplied | the real case is shown; the slider is hidden |
| `TravelMap.astro` | pointer-parallax; lights the route leg into a hovered stop | the map renders; every marker links |
| `/sw.js` (`src/pages/sw.js.ts`) | pages network-first, hashed assets cache-first; one cache per build | nothing is cached |

Any other client-side script is a REJECT. The service worker is the one
piece that outlives a deploy; how to switch it off is in the header of
`src/pages/sw.js.ts`.

### Accessibility

Accessibility is not a checkbox here. It's the thesis. A site arguing that
technology should work for real people cannot itself exclude screen-reader
users. That would be the single most damaging thing on the page.

The footer prints the last accessibility run from
`src/data/a11y-audit.json`, which `npm run audit` writes (axe-core on every
page in the sitemap, light and dark, at 1280 and 390px, then a scripted Tab
pass). The claim is the file, not a sentence someone typed: re-run it and
commit the JSON whenever a page changes, or the footer goes stale. The
footer also says the site has not been tested by someone who relies on a
screen reader; keep that sentence until it is no longer true.

---

## Content model

`src/content.config.ts` is the authority; if this file disagrees, the schema
wins and this file is the bug.

| Collection | Renders on | Notes |
| --- | --- | --- |
| `research` | `/`, `/research`, `/research/[slug]` | `kind`, `related`; `authors` in published order, never guessed |
| `projects` | `/`, `/projects`, `/projects/[slug]` | `kind`, `sourcesNote` |
| `writing` | `/`, `/writing`, `/writing/[slug]` | `related`: the work a post is the plain-language version of |
| `experience` | `/` (the record) | dates, no status |
| `places` | `/travel` | one marker and one field-log row per stop |
| `changelog` | nothing | kept as a record since the News list retired |

**Links.** A paper's or project's `links` render under its row and as Sources
on its page (`src/links.ts` names them). With no links, a project's
`sourcesNote` shows instead ("Client work. The source code is private.").
Education and certifications in `site.config.ts` carry a `proof` link when
there is one.

**TODOs.** A `todo:` on a credential, or a `<Todo>` in a component, is a
fact only Maitreya can supply. It renders as an amber `TODO(markie)` in
`npm run dev` and is left out of every production build (`src/todo.ts`);
build with `PUBLIC_SHOW_TODOS=true` to see them in one. List them:

```sh
grep -rn "todo:\|Todo text=\|TODO(markie)" src
```

(Reminders inside content files are YAML comments, `# TODO(markie): ...`.)

**Who wrote what.** Maitreya's: the thesis, the bio, every post, every stop
note, the paper and project bodies, the page ledes, and every quoted line.
Drafted (Fable's and later Claude's): search for `drafted by`.

## Routes

| Route | What |
| --- | --- |
| `/` | the whole argument and the record |
| `/research`, `/research/[slug]` | papers ("papers" in the nav) |
| `/projects`, `/projects/[slug]` | systems and analyses ("systems") |
| `/writing`, `/writing/[slug]` | posts |
| `/travel` | the August 2025 trip ("the north") |
| `/404` | "This address couldn't be resolved." |
| `/sitemap.xml`, `/sw.js` | generated from the collections |

Retired: `/log` and `/about` 308 to `/`, `/research/ads-cascade` 308 to
`/research/prediction-is-not-selection` (all in `vercel.json`). `/unresolved`
was retired before it ever deployed, so it needs no redirect.

---

## Review checklist: run on every diff

- [ ] Serves the thesis sentence
- [ ] Zero content-rule violations; every new fact has a source in the repo
      or is a `todo:`
- [ ] Every link works; nothing labels a claim by how provable it is
- [ ] Maitreya's words untouched beyond typos; drafted copy marked
- [ ] Only design tokens: no literal colour outside the token block
- [ ] `npm run contrast` passes after any colour change
- [ ] Meaning never carried by colour alone (the demo's lamps say it in words)
- [ ] Checked in light and dark
- [ ] `npm run build` and `npx astro check`: 0 errors
- [ ] `npm run audit`: 0 violations, every link and control reached by Tab;
      the new `a11y-audit.json` committed
- [ ] No broken internal links or anchors (above all after retiring a page)
- [ ] Lighthouse on `/`, a paper page and `/travel`: performance ≥ 95,
      accessibility = 100
- [ ] Renders correctly at 375px; keyboard navigable; the amber focus ring
      visible
- [ ] Works with scripts off; only the sanctioned scripts
- [ ] With reduced motion, nothing moves
- [ ] Semantic HTML: `<article>`, `<time>`, `<nav>`, real heading order
- [ ] Alt text is descriptive, not decorative filler
- [ ] No third-party network request; no dependency without justification
- [ ] No `TODO(markie)` in `dist/` (`grep -r "TODO(markie)" dist`)
- [ ] The programme is named in no committed file

---

## Settled decisions: do not reopen unasked

- The thesis sentence (phase 11).
- There is no `/about` and no `/log`; the home page is the whole profile.
- The News list is retired (phase 12). The changelog stays unrendered.
- The CV link was removed outright, with no placeholder. Whether a CV belongs
  on the site is Maitreya's call, later. Do not re-add it unasked.
- "Romanian Fiscal AI" is confidential Crest production work, never a public
  case study.
- Maatritwa AI (the archived prototype) and Three Voices (the paper, on a
  public dataset) are related but separate, and the pages say so.
- ADS-Cascade is superseded by "Prediction is not selection".
- The claim ledger is retired (Maitreya, 17 Nov 2026: "This is portfolio
  website, not a court hearing where you need to prove every word you write
  or speak."). No `checkable` / `on my word` / `unresolved` labels, no tally
  of claims, no "What this couldn't resolve" boxes, no page listing claims
  (`/unresolved` went first), anywhere. Do not bring any of it back.
- `TODO(markie)` notes never render in production.
- Writing posts show the year only.

## Pending Maitreya's call: do not decide for him

- The crossed-out first draft of the thesis above the thesis on `/`
- The drafted copy (search `drafted by`)
- The facts behind the open `todo:` notes
- Whether the AI-assistance disclosure, the accessibility-run table and the
  list of what the site does automatically come back, in the footer or
  elsewhere (all three left with `/unresolved`)

## Known gaps: fix them, never copy them

None open (17 Nov 2026). When a diff knowingly leaves a rule above broken,
list it here with what breaks it, so no later session reads it as precedent.

---

## History

The detail is in `git log`, `docs/superpowers/specs/` and `FABLE_NOTES.md`.

1. Domain, Vercel, Astro
2. Home, About, /log and /projects scaffolding
3. The two scaffolds consolidated into one repo
4. `site.config.ts` filled; the project's spelling settled
5. Maternal-health case study: Maatritwa AI and Three Voices separated
6. Research and experience
7. DataSaarthi case study; Romanian Fiscal AI kept confidential
8. Writing (shipped ahead of 6 and 7, left as a decision)
9. `/travel`: the atlas plate, built from Natural Earth data at build time
10. Status refresh (Oct 2026): `/log` and the ledger countdown retired; www
    canonical; Open Graph card; redacted certificates
11. Redirection to an academic homepage (approved 30 Oct 2026): the new
    thesis line and bio; `/about` retired; the margin fitted to each kind of
    thing; author lists; Claude builds as well as reviews
12. Refinements: the News list retired; the counted tally under headings
    added and reverted the same day
13. **The reimagining** (Fable, 17 Nov 2026, at Maitreya's invitation): the
    struck-through findings; the playable coin flip; Fraunces, light and
    dark; the audit script and the computed footer; the offline worker; and
    a claim ledger. The same day, at Maitreya's request: `/unresolved`
    retired, TODO notes made development-only, then the whole claim ledger
    retired ("a portfolio website, not a court hearing"), and CARTA's
    figures added from the paper. On branch
    `claude/charming-hopper-ogbbt8`, pending merge.

## Git

Conventional commits, one logical change per commit:
`feat(home): hero section` `fix(a11y): focus ring on nav links`.
Work on a branch and merge to `main` through a pull request; Vercel deploys
`main`. Never commit drafted prose unmarked. Never force-push `main`.
