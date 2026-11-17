# Context for fresh sessions

This site is a maintained system, not a brochure. Every claim is true. It is
also a portfolio, not a court hearing: say what the work is and link what can
be linked; never label a claim by how provable it is (`CLAUDE.md`, content
rule 2).

## What this site is

A research profile supporting an application to research-oriented graduate
programmes in Europe. See `PRIVATE_NOTES.md` (gitignored) for the specific
programme and reasoning. The public site refers only to "research-oriented
graduate programmes in Europe".

The thesis, in Maitreya's words: **"I build software systems that report what
they couldn't resolve."** Every section serves that sentence or it doesn't
ship. Since phase 13 the home page shows it through the work itself: the
better-sounding answer struck through beside the one each piece of work
reported, a playable version of the Three Voices idea, and CARTA's own
figure.

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
| `/` | Live | The masthead (currently, at, based in), the thesis, bio and links; six findings, five struck through as found and CARTA's figure; the coin-flip demo; the record (papers, systems, work, study); writing; the north |
| `/research` | Live | All papers ("papers" in the nav), with stage, citation and links |
| `/research/[slug]` | Live | A paper: the write-up, with its Sources and related work beside it |
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
"pre-registered study"), `related` (other ways into the same work: `{ label, href }`, e.g. the plain-language post), `order`,
`links` (`doi` for the paper's own DOI, `arxiv`, `zenodo`, `code`: full URLs).

### Adding a system or analysis

Create `src/content/projects/[slug].md`.

Required: `title`, `status` (not rendered; keep it truthful), `stage` (the
margin word: `in production`, `complete`, `archived`, `live`), `statusLabel`,
`summary`.

Optional: `context` (whose work it was: "independent", "client work · Crest
Infosystems"), `kind` ("production system", "prototype"), `stack`,
`order`, `links` (`repo`, `live`, `preprint`: full URLs), `sourcesNote`
(shown under Sources when there is nothing to link, e.g. private code).

The body is Markdown; each `##` gets a rule above it.

### A paper's figures

A paper's own figures go in its write-up as images cropped from the published
PDF (`src/content/research/img/`), inside a `<figure>` with the paper's
caption word for word in a `<figcaption>` and alt text that describes the
whole diagram. See CARTA's page.

### TODOs

A `todo:` on a credential, or a `<Todo text="..." />` in a component, is a
fact only Maitreya can supply. Never guess one; add a `todo`. In a content
file, the reminder is a YAML comment: `# TODO(markie): ...`.
It renders as an amber `TODO(markie)` in `npm run dev` and is left out of
every production build (`src/todo.ts`); build with `PUBLIC_SHOW_TODOS=true`
to see them in one. List them:

```sh
grep -rn "todo:\|Todo text=\|TODO(markie)" src
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
dates ("Jan 2026 – now"), never by a status word.

Required: `company`, `role`, `start` (date), `summary`.
Optional: `end` (unset means current), `location`, `note` (one line the
dates can't carry, e.g. a conversion to full-time), `project` (the project
page the role produced; the title links to it), `order`.

### Education and certifications

`EDUCATION` and `CERTIFICATIONS` in `src/site.config.ts`. A line can carry a
`proof` (a redacted certificate under `public/`, or the issuer's own
validation page), which renders as a "certificate" link; a `todo` can note a
proof still to find (development builds only). Lines can also carry an
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
href }`: an artifact under `public/`, such as the certificate).

Geometry is not hand-authored: country shapes, labels, lakes, graticule and
each city's projected `x`/`y` are regenerated by `scripts/build-travel-geo.py`
into `src/components/travel-geo.ts`. That script runs at authoring time only;
it is not a runtime dependency and adds no runtime request.

### Links are not optional decoration

A paper with a public repo and no link to it is a bug: the link is how a
reader who wants more goes further.

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
