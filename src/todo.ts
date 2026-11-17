// Whether TODO(markie) notes render. They are notes for Maitreya, not for
// visitors: on in `npm run dev`, off in a production build. The claim beside
// each one still shows its honest state ("on my word", "unresolved"); only
// the to-do itself is left out.
//
// To see them in a production build (a Vercel preview, say), build with
// PUBLIC_SHOW_TODOS=true.
export const SHOW_TODOS: boolean =
  import.meta.env.DEV || import.meta.env.PUBLIC_SHOW_TODOS === 'true';
