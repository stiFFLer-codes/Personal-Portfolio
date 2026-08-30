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

export const collections = { projects, changelog };
