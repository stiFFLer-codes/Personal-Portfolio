# Academic Portfolio Design

> **Superseded — historical record only.**
> This spec predates the consolidation. Its thesis sentence, its route
> names, and the `Matritva` spelling are all stale. `CLAUDE.md` is the
> current law; `AGENTS.md` is the current brief. Read this for the
> reasoning, never for the rules.

## Purpose

Create a public academic research profile for `maitreyasapariya.me` that helps a reviewer for a research-oriented graduate programme in Europe understand the applicant's work quickly and verify the evidence behind it. The site is a research notebook, not a conventional portfolio or marketing landing page. (The specific programme and what its evaluators weight: see `PRIVATE_NOTES.md`, gitignored.)

The existing site thesis remains the editorial filter: **“I build AI systems, and I study who they exclude.”**

## Audience and success criteria

The primary reader is an academic reviewer scanning many applications. Each page must make three things easy to find:

- the current research focus;
- evidence of work, with honest scope and status;
- a clear path to the most relevant supporting material.

Success means that adding a new project, research entry, or writing item requires changing a single content record rather than restructuring a page. The site remains static, keyboard accessible, and readable at 375px and 1440px.

## Information architecture

The first release has two public routes and a content layer. Later routes follow the existing phase order in `CLAUDE.md`.

```text
/
  Thesis and current status
  Selected work
  Recent writing
  Contact

/about/
  Portrait
  Human-authored biography
  Education
  Research interests
  Contact

/work/[slug]/                 (after Home + About)
  One evidence-led case study per substantive project

/research/                   (after the first case study)
  Honest in-progress research and experience

/writing/[slug]/             (after research and experience)
  Human-authored writing
```

The navigation stays short in the first release: Home and About. Work, Research, and Writing only enter navigation after each has at least one complete, factual entry.

## Content model

Page components render structured metadata; the applicant supplies all body prose and factual claims. No empty cards, invented dates, temporary achievement counters, or unpublished future entries appear on public pages.

| Content type | Required fields | Optional fields | Public rule |
| --- | --- | --- | --- |
| Profile | name, search description, thesis line, current-status line | portrait, contact links | Status must describe the present honestly. |
| Project | title, summary, tags, status | link, date, image | A card is visible only when title and summary are verified. |
| Case study | title, date, role, problem, approach, outcome, evidence links | images, related writing | The narrative is human-authored and evidence-led. |
| Education | institution, programme, dates | credential link | Dates and programme wording are verified before publication. |
| Research interest | label | supporting sentence | Use compact labels on About; explain only in human-authored prose. |
| Writing | title, date, venue or type, summary, URL | tags | Publish only completed work. |
| Contact link | label, URL | none | Render only real destinations. |

Implementation will store collection content under `src/content/` and shared profile metadata in a typed module. Page routes consume those records; components do not own duplicated arrays of content.

## Visual direction: Quiet evidence shelf

The visual language takes the clarity and material polish associated with the requested Apple-inspired reference, without copying it or using glassmorphism. It uses the existing system rather than adding a new aesthetic layer.

- **Surface:** near-white background and white cards divided by thin borders; no gradients, blur, or elevated shadows.
- **Type:** Space Grotesk headings establish a measured technical voice; Inter handles body and metadata for long-form clarity.
- **Layout:** a single readable column anchors each page. On larger screens, selected-work cards form a restrained two-column shelf only when their content is complete. Mobile remains one column.
- **Signature:** the “evidence shelf” uses aligned card headers, compact metadata, and deliberate dividers to make projects resemble a readable research record rather than promotional tiles.
- **Motion:** one 200ms opacity-and-6px-rise entry transition; no hover scaling, parallax, or decorative animation. `prefers-reduced-motion` disables it.
- **Accent:** blue is reserved for links and one page-level focal relationship. It never becomes a decorative wash.

This direction is intentionally revised away from generic glass UI: the distinctive element is information discipline, not visual effects.

## Component boundaries

| Unit | Responsibility | Does not own |
| --- | --- | --- |
| `BaseLayout` | document metadata, skip link, shared frame | page content or navigation decisions |
| `Header` | primary navigation driven by enabled routes | page-specific calls to action |
| `Footer` | verified contact links | social URLs that are not supplied |
| `Section` | semantic section heading and spacing | content data |
| `Card` | compact project/writing metadata presentation | case-study prose |
| `Badge` | accessible topic label | status semantics |
| Content collections | validated records for work and writing | layout concerns |
| Profile data module | shared site metadata and verified links | long-form prose |

## Rollout

1. Establish the typed profile and content layer, then move Home and About from inline placeholder arrays to it.
2. Complete the Matritva case study and publish the Work route only with that complete entry.
3. Add Research and Experience with precise current-status language.
4. Add Romanian Fiscal AI and DataSaarthi only when their case-study records are ready.
5. Add Writing when there is at least one finished item.
6. Consider the travel map only after the preceding phases are live and it improves comprehension.

## Acceptance criteria

- All public content comes from one typed source of truth per content type.
- Missing records do not create empty public UI.
- No component introduces body prose, unverifiable claims, superlatives, or achievement counters.
- The existing six-color system, two fonts, type scale, spacing rhythm, and motion limits remain unchanged.
- Navigation, interactive links, and focus states are keyboard accessible.
- No client-side JavaScript is added for static content.
- `npm.cmd run build` completes successfully before deployment work is considered done.

## Verification plan

- Run the Astro production build.
- Check strict TypeScript through the Astro build pipeline.
- Inspect Home and About at 375px and 1440px.
- Check keyboard traversal, skip link, heading order, link names, and focus visibility.
- Search changed files for arbitrary Tailwind values, unapproved hex values, gradients, glass effects, and placeholder content rendered as cards.
- Run Lighthouse accessibility after the local preview server is available.

## Scope boundaries

This blueprint does not create factual content, rewrite the About biography, infer academic credentials, add analytics, introduce a CMS, or change hosting and domain configuration. Those are outside the design and need explicit user-provided information or a later task.
