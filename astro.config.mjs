// @ts-check
import { defineConfig } from 'astro/config';

// The primary host. It powers canonical URLs and the Open Graph tags in
// Base.astro, so it must match the production domain set in Vercel (the
// apex 308-redirects here).
export default defineConfig({
  site: 'https://www.maitreyasapariya.me',
  // The stylesheet goes into the page instead of a separate request. It is
  // the only render-blocking resource the site has, and on a slow connection
  // that request was most of the wait before first paint.
  build: { inlineStylesheets: 'always' },
});
