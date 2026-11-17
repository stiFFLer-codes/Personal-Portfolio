# Context for fresh sessions

This site is a maintained system, not a brochure. Every claim is true; every
state honest.

## What this site is

A research profile supporting an application to research-oriented graduate
programmes in Europe. See `PRIVATE_NOTES.md` (gitignored) for the specific
programme and reasoning. The public site refers only to "research-oriented
graduate programmes in Europe".

The thesis, in Maitreya's words: **"I build software systems that report what
they couldn't resolve."** Every section serves that sentence or it doesn't
ship. Since phase 13 the site applies it to itself: every claim it makes is
`checkable`, `on my word` or `unresolved`, the home page counts them, and
every paper and system page leads with what that work couldn't resolve.

The reader: someone who looks Maitreya up from his CV or LinkedIn, most often
a professor late at night after two hundred applications. The top of the home
page makes the argument; the record further down is the academic homepage,
one link from the top, for the reader in a hurry.

`CLAUDE.md` is the law: content rules, design system, sanctioned scripts,
review checklist, settled and pending decisions. `FABLE_NOTES.md` is the
reasoning behind phase 13. This file is the working context.

## Site map

| Route | Status | Purpose |
| --- | --- | --- |
| `/` | Live | The thesis and the tally; six findings, struck through as found; the coin-flip demo; the record (papers, systems, work, study); writing; the north; a closing band |
| `/research` | Live | All papers ("papers" in the nav), with stage, citation, tally and links |
| `/research/[slug]` | Live | A paper: what it couldn't resolve, then the write-up beside its ledger and related work |
| `/projects` | Live | All systems and analyses ("systems" in the nav) |
| `/projects/[slug]` | Live | A system: the same shape as a paper page |
| `/writing` | Live | The four posts |
| `/writing/[slug]` | Live | A post, Maitreya's words, with the work behind it beside it where there is some |
| `/travel` | Live | The August 2025 trip ("the north"): the atlas plate and the field log |
| `/404` | Live | "This address couldn't be resolved." |
| `/sitemap.xml`, `/sw.js` | Live | Generated from the collections at build |
| `/about`, `/log` | Retired | 308 to `/` in `vercel.json` |
| `/research/ads-cascade` | Retired | 308 to `/research/prediction-is-not-selection` |
| `/unresolved` | Retired | Removed before it ever deployed (Maitreya, 17 Nov 2026); no redirect |

## Content workflow

`src/content.config.ts` is the authority on every field below. If this file
and the schema disagree, the schema wins and this file is the bug.

### Adding research

Create `src/content/research/[slug].md`.

Required: `title`, `status` (not rendered since phase 13; keep it truthful),
`stage` (the word in the margin: `published`, `accepted`, `presented`,
`preprint`, `submitted`, `completed`), `statusLabel` (a sentence naming the
real state; the citation shows it when there is no venue), `summary`.

Optional: `authors` (full list in published order, exactly as on the paper;
`SITE.name` renders in bold; leave unset until confirmed, never guess),
`venue` (italic in the citation), `citation` (volume, issue, year and pages
once published), `kind` (what sort of thing it is: "journal paper",
"pre-registered study"), `ledger` (below), `related` (other ways into the
same work: `{ label, href }`, e.g. the plain-language post), `order`,
`links` (`doi` for the paper's own DOI, `arxiv`, `zenodo`, `code`: full URLs).

### Adding a system or analysis

Create `src/content/projects/[slug].md`.

Required: `title`, `status` (not rendered; keep it truthful), `stage` (the
margin word: `in production`, `complete`, `archived`, `live`), `statusLabel`,
`summary`.

Optional: `context` (whose work it was: "independent", "client work · Crest
Infosystems"), `kind` ("production system", "prototype"), `ledger`, `stack`,
`order`, `links` (`repo`, `live`, `preprint`: full URLs).

The body is Markdown; each `##` gets a rule above it.

### The ledger

Every paper and system carries a `ledger:`, a list of what its page claims:

```yaml
ledger:
  - claim: 'The manuscript is archived on Zenodo.'
    state: checkable            # checkable | word | open
    links:
      - { label: 'zenodo', href: 'https://doi.org/...' }
  - claim: 'How CARTA does on a real chat archive.'
    state: open
    note: 'Maitreya''s own sentence from the page, wherever one exists.'
    todo: 'a fact only Maitreya can supply'
```

- `checkable` needs a link that works. `word` is stated with nothing public
  to link. `open` is not done, not known, not tested, or pending.
- To move a claim from `word` to `checkable`, add the link. Nothing else.
- `open` claims appear first on the page, in "What this couldn't resolve".
- `src/ledger.ts` gathers every ledger, with study and work from
  `site.config.ts`, into the counts on the home page. Counts are computed;
  never type one.

### TODOs

A `todo:` on a claim or a credential, or a `<Todo text="..." />` in a
component, is a fact only Maitreya can supply. Never guess one; add a `todo`.
It renders as an amber `TODO(markie)` in `npm run dev` and is left out of
every production build (`src/todo.ts`); build with `PUBLIC_SHOW_TODOS=true`
to see them in one. List them:

```sh
grep -rn "todo:\|Todo text=" src
```

### Adding a post

Create `src/content/writing/[slug].md`. The words are Maitreya's; agents fix
typos only.

Required: `title`, `date` (the site shows the year only), `summary`.
Optional: `tags`, `related` (`{ label, href }`: the work the post is the
plain-language version of), `order` (the reading order on `/writing` is an
editorial call, not a sort by date).

### Adding experience

Create `src/content/experience/[slug].md`. It renders in the record on `/`.
No detail page, since a job isn't a case study. A job is labelled by its
dates ("Jan 2026 – now"), never by a status word, and counts as `on my word`.

Required: `company`, `role`, `start` (date), `summary`.
Optional: `end` (unset means current), `location`, `note` (one line the
dates can't carry, e.g. a conversion to full-time), `project` (the project
page the role produced; the title links to it), `order`.

### Education and certifications

`EDUCATION` and `CERTIFICATIONS` in `src/site.config.ts`. A line with a
`proof` (a redacted certificate under `public/`, or the issuer's own
validation page) counts as `checkable`; without one it is `on my word`, and
a `todo` can say what proof would change that. Lines can also carry an
internal `href` and a mono `note`.

### Adding a changelog entry

Create `src/content/changelog/[YYYY-MM-DD]-slug.md` with `date` and `title`
(optional `tag`: `ship`, `progress`, `note`). Nothing renders these since the
News list was retired in phase 12; they are kept as a record.

### Adding a travel stop

Create `src/content/places/[order]-[slug].md`. Each stop is a marker on the
`/travel` map and a row in the field log below it.

Required: `name`, `country` (or a route in words: "Helsinki to Stockholm";
never a typed arrow), `dateLabel` (generalized, e.g. "August '25"), `order`
(the travel order, which also draws the route), `x` and `y` (the marker as a
percentage of the map viewBox), `blurb` (one honest line, Maitreya's).

Optional: `anchor` (the single summer-school stop, drawn green), `photos`
(`{ src, alt }`, `src` resolved by Astro `image()`), `source` (`{ label,
href }`: a checkable artifact under `public/`).

Geometry is not hand-authored: country shapes, labels, lakes, graticule and
each city's projected `x`/`y` are regenerated by `scripts/build-travel-geo.py`
into `src/components/travel-geo.ts`. That script runs at authoring time only;
it is not a runtime dependency and adds no runtime request.

### Links are not optional decoration

A paper with a public repo and no link to it is a bug: on a site whose
argument is "check my claims", the link is what makes a claim `checkable`.

## Checks before every push

```sh
npm run build                 # must pass
npx astro check               # 0 errors (needs @astrojs/check and typescript, installed without saving)
npm run contrast              # after any colour change
npm run audit                 # axe-core + Tab pass on every page; commit src/data/a11y-audit.json
grep -r "TODO(markie)" dist   # must print nothing
```

Then look at what changed at 375px and 1440px, in light and dark, and run
Lighthouse on `/`, a paper page and `/travel` (performance ≥ 95,
accessibility = 100). The full list is the review checklist in `CLAUDE.md`.

## Rules and tokens

For content rules, design tokens, design-system law and the review checklist,
read `CLAUDE.md`. Don't duplicate them here; it is the single source of truth.

Never name the programme, consortium or partner institutions in any committed
file. Use generic language only. The reasoning lives in `PRIVATE_NOTES.md`.

## One principle

**Simplicity over complexity.** When there's a simpler way to build or word
something, take it. Don't add sections, dependencies or process overhead the
site doesn't need yet.

## Session startup

1. Read this file.
2. Check `state.md` (local, untracked) to see where work left off, if it exists.
3. Read `CLAUDE.md` before shipping anything, including *Settled decisions*
   and *Pending Maitreya's call*.
4. If you're unsure whether something is in scope, it probably isn't: ask.
