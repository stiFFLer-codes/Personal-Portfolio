// Hand-rolled sitemap: every public route, built from the collections so a
// new project, paper or post is listed the moment its file exists. No
// integration dependency for what is a dozen lines of XML.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const STATIC = ['/', '/research/', '/projects/', '/writing/', '/travel/'];

export const GET: APIRoute = async ({ site }) => {
  const [research, projects, writing] = await Promise.all([
    getCollection('research'),
    getCollection('projects'),
    getCollection('writing'),
  ]);

  const paths = [
    ...STATIC,
    ...research.map((e) => `/research/${e.id}/`),
    ...projects.map((e) => `/projects/${e.id}/`),
    ...writing.map((e) => `/writing/${e.id}/`),
  ];

  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    paths.map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`).join('\n') +
    '\n</urlset>\n';

  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
