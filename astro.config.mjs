// @ts-check
import { defineConfig } from 'astro/config';

// The primary host. It powers canonical URLs and the Open Graph tags in
// Base.astro, so it must match the production domain set in Vercel (the
// apex 308-redirects here).
export default defineConfig({
  site: 'https://www.maitreyasapariya.me',
});
