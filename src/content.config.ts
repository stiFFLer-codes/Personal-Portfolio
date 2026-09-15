import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each project is one markdown file. To add a new project, drop a new file
// into src/content/projects/ — nothing else needs to change.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    // status drives the colored dot everywhere this project is listed.
    status: z.enum(['shipped', 'in-progress', 'planned']),
    statusLabel: z.string(),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
    order: z.number().default(99),
    startDate: z.coerce.date().optional(),
    links: z
      .object({
        repo: z.string().url().optional(),
        live: z.string().url().optional(),
        preprint: z.string().url().optional(),
      })
      .default({}),
  }),
});

// Each changelog entry is one markdown file, named YYYY-MM-DD-slug.md so
// entries sort naturally in a file browser too. To log an update, add one
// small file here — the home page and /log both pick it up automatically.
const changelog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/changelog' }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    // tag drives the colored dot: ship = green, progress = amber, note = slate
    tag: z.enum(['ship', 'progress', 'note']).default('note'),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['shipped', 'in-progress', 'planned']),
    statusLabel: z.string(),
    summary: z.string(),
    venue: z.string().optional(),
    order: z.number().default(99),
    links: z
      .object({
        arxiv: z.string().url().optional(),
        code: z.string().url().optional(),
        doi: z.string().url().optional(),
      })
      .default({}),
  }),
});

// Each post is one markdown file. Prose is human-authored; agents fix typos
// only. `order` drives the reading order on /writing — the dates are all
// close together, so listing order is an editorial call, not a sort by time.
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(99),
  }),
});

// One entry per employer. Listed on /about via Entry.astro — no detail
// pages, since a role isn't a case study. Reuses the same status enum as
// projects/research: in-progress for a current role, shipped for one that's
// finished.
const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    status: z.enum(['shipped', 'in-progress', 'planned']),
    statusLabel: z.string(),
    summary: z.string(),
    order: z.number().default(99),
  }),
});

// One stop on the Aug 2025 Nordic/Baltic trip (the Jyväskylä Summer School
// and the solo travel around it). Rendered on /travel: as a marker on the
// hand-drawn map, and as a row in the field log below it. `order` is the
// travel order and drives the route line drawn between stops. `x`/`y` are the
// marker's position on the map, as percentages of the SVG viewBox — geometry
// lives in the content record, not the component, so a stop moves by editing
// one file. `anchor` marks the single summer-school stop (drawn green, the
// spine of the trip). Prose (`blurb`) is human-authored; photos are optional
// so the page ships with empty specimen frames until they are mounted.
const places = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/places' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      country: z.string(),
      dateLabel: z.string(),
      order: z.number().default(99),
      // Marker position as a percentage of the map viewBox (0–100).
      x: z.number().min(0).max(100),
      y: z.number().min(0).max(100),
      // The summer-school stop — the anchor of the trip. Exactly one.
      anchor: z.boolean().default(false),
      // One honest line, human-authored.
      blurb: z.string(),
      // 1–2 per stop. Optional: an unmounted stop shows a "to be mounted"
      // frame rather than a broken image.
      photos: z
        .array(z.object({ src: image(), alt: z.string() }))
        .default([]),
    }),
});

export const collections = {
  projects,
  changelog,
  research,
  writing,
  experience,
  places,
};
