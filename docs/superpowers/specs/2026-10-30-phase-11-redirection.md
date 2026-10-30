# Phase 11: from fieldbook concept to academic homepage

Status: proposed, awaiting Maitreya's approval. Nothing here is built except
the SEO plumbing in section 6.

## 1. Diagnosis: why the site feels off

The rules are good. The problem is that the site has a *concept* (a
fieldbook, a ledger of state) but no *genre*. A professor at 11 PM does not
want to learn a new way of reading a page. They already know how to read one
kind of page in two seconds: the academic homepage. Name, face, one-line
position, a short bio, links (CV, email, ORCID), publications, news. Every
lab member's page they have ever opened looks like that.

We invented our own genre and then followed it faithfully. Concretely:

1. **The name is missing.** The home page never says "Maitreya Sapariya"
   above the footer. The h1 is a mission statement. The reader's first
   question ("who is this?") and the search engine's first question are the
   same, and neither is answered.
2. **The strip is vestigial.** The ledger was built to carry `now:`,
   `target:` (a countdown) and `log:`. Phase 10 removed two of three. What is
   left is a full-bleed black bar carrying one fact the hero should carry.
3. **Everything is the same list.** Projects, research and Recent are three
   identical rails. The strongest evidence on the site (an accepted journal
   paper, a presented workshop paper, an arXiv preprint, a pre-registered
   study) has the same visual weight as a project summary.
4. **Research is in the wrong format.** A professor scans publications as
   *citations*: title, authors, venue, year, links. The rail shows a title
   and a paragraph of summary instead, so the venue (the credibility) is
   invisible on the home page.
5. **The hero claims something no longer true.** The lede says "a production
   maternal-health risk system in rural India". `maatritwa-ai.md` says
   archived prototype. That is a content-rule 1 violation and the first
   thing to fix, whatever else happens. "Currently shipping" over an
   archived prototype and a "complete, not deployed" project has the same
   problem.
6. **Space is spent, not used.** `--hero-y` (up to 6rem) above the kicker,
   `--section-y` (up to 4rem) on both sides of every rule, a 54rem container
   with text held to 38rem. On a 1440px screen the first research paper
   starts below the second fold.
7. **The thesis sentence is generic.** "I build software systems that turn
   messy, real-world data into decisions people can act on" could sit on any
   data engineer's page. It describes a job, not a research identity.

## 2. The thread the work already has

Read every piece side by side:

| Work | What it is actually about |
| --- | --- |
| CARTA | recover what is safe, quarantine and *report* what is not |
| Three Voices | do not render a coin flip as a red light; derate when the margin is thin; 561 duplicate rows inflated recall |
| What AI should refuse to say | whether the model should issue its strongest claim at all, and to whom |
| Prediction is not selection | a pre-registered negative result, reported as one |
| InnoByte | naive revenue sums overstated by 10.6%; a fulfilment comparison that was invalid |
| Writing | "A coin flip should not look like a red light", "One line of code deleted a third of my accuracy" |

Every one is about the **gap between what data appears to say and what it
can honestly support, and how a system should communicate that gap to the
person relying on it.** That is a research agenda, not a job description,
and it is far more distinctive than the current thesis. (The July spec's
original thesis, "I build AI systems, and I study who they exclude", was
closer to it.)

Per content rule 5, the sentence itself is Maitreya's to write. This brief
only names the thread.

## 3. Proposed home page

Mock: built as a throwaway HTML sketch during review, not committed.

1. **Header**: wordmark becomes the full name in the serif. No ledger strip.
2. **Hero** (wide container, two columns; portrait right, stacks on phone):
   - h1: `Maitreya Sapariya`
   - mono role line: current role · independent researcher · city
     (replaces the strip; reads from `SITE.now`)
   - 2 to 3 sentence bio, *Maitreya's prose*, built on the thread above
   - link row: **CV (pdf)** as the one filled button, then email, ORCID,
     GitHub, LinkedIn
3. **Publications & preprints**: citation format. Left column: status word
   with dot (accepted / presented / preprint / in progress). Right: title,
   author line with the name bolded, venue in italics, year; then
   `doi · code · summary` links. Must be above the fold at 1440×900 for at
   least the first entry.
4. **News + Projects** side by side on desktop, stacked on phone. News is
   the changelog: date left in mono, one line each, normal weight (not the
   current bold h3s). Projects: name, honest status word, one line.
5. **Background**: two or three dated lines (degree, Jyväskylä). Full detail
   stays on `/about`.

## 4. About page

- h1 "Engineer first, still figuring the rest out in public" undersells. It
  reads as an apology. Maitreya to rewrite.
- "Where I'm headed" becomes **Research interests**: two or three concrete
  questions he wants to work on next, each tied to a piece of existing work.
  The current paragraph is vague ("rigorous graduate study abroad"),
  defensive ("rather than a credential I'm chasing") and points at the
  retired log.
- Experience: the status vocabulary does not fit jobs ("in progress" for a
  job, "shipped" for an internship). Use dates, not status dots.
- Fix the dot alignment on the Experience rail (the dot sits a full line
  above the title).
- Add an **Education** block (degree, institution, year) and keep
  Certifications.

## 5. Design-system changes this needs (CLAUDE.md edits on approval)

- Remove the ledger strip and the "terminal" surface from the design law.
  The filled CTA keeps `--terminal-bg`.
- The status rail stays on `/research` and `/projects` index pages, where it
  encodes state. The home page uses the citation and news formats instead.
- Tighten rhythm: `--hero-y` to about `clamp(2rem, 5vw, 3.5rem)`,
  `--section-y` to about `clamp(1.75rem, 4vw, 2.75rem)`.
- Content model: add `authors: string[]` and `year` to `research`; the home
  page needs them for the citation line. Authorship is a fact and must be
  confirmed per paper by Maitreya before it ships.
- `public/cv.pdf` (redacted like the certificates).

## 6. Search: shipped on this branch

The name is unique, so a committee member searching it should land here
first, with the knowledge panel tied to the right profiles.

Done:
- schema.org `Person` JSON-LD on `/` (name, role, employer, alma mater,
  `sameAs` ORCID / GitHub / LinkedIn), from `site.config.ts`.
- `/sitemap.xml` generated from the collections; listed in `robots.txt`.

Still needed, outside the repo (Maitreya):
- Google Search Console: verify the domain, submit the sitemap.
- Put `https://www.maitreyasapariya.me` in the website field of GitHub,
  LinkedIn, ORCID, and later the arXiv and Google Scholar profiles. Every
  profile pointing back is what makes this the top result.
- ORCID: add the CARTA and Three Voices Zenodo DOIs as works.
- Google Scholar profile once the arXiv preprint is announced.
- The h1 on `/` becoming the name (section 3) is the largest on-page win.

## 7. Order of work

1. Maitreya: fix the false "production" claim in the hero lede (now).
2. Maitreya: approve or amend this brief.
3. Maitreya: write the bio, the about h1, Research interests, and confirm
   authors per paper. Supply a redacted CV.
4. Builder: header + hero + strip removal + spacing tokens.
5. Builder: citation component + `authors`/`year` fields.
6. Builder: News/Projects/Background block; About restructure.
7. Review against the checklist; Lighthouse; 375px.
