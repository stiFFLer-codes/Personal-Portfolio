// One place to update the small facts that show up all over the site.
// Edit these as things change. The status ledger and footer read from here.

export const SITE = {
  name: 'Maitreya Sapariya',
  title: 'Maitreya Sapariya · building data-intensive software systems',
  // Programme specifics deliberately omitted here — see PRIVATE_NOTES.md (gitignored).
  // TODO(markie): replace this description; Markie is sending the text.
  description:
    'Software engineer building production ML systems and working toward a research-oriented graduate programme in Europe.',
  email: 'maitreyasapariya@gmail.com',

  github: 'https://github.com/stiFFLer-codes',
  linkedin: 'https://www.linkedin.com/in/maitreya-sapariya/',
  orcid: 'https://orcid.org/0009-0003-9346-3775',

  // Shown in the status ledger as "now:"
  now: 'Software Engineer @ Crest Infosystems',

  // Structured data (schema.org Person) on the home page. This is what lets a
  // search engine tie the name to this site and to the profiles below.
  jobTitle: 'Software Engineer',
  employer: 'Crest Infosystems',
  alumniOf: 'A. D. Patel Institute of Technology, CVM University',
} as const;
