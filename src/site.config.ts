// One place to update the small facts that show up all over the site.
// Edit these as things change. The home page, footer, meta tags and
// structured data all read from here.

export const SITE = {
  name: 'Maitreya Sapariya',
  title: 'Maitreya Sapariya · software engineer and researcher',
  // Maitreya's line. Shown under the name on the home page and on the Open
  // Graph card. The description below is his own first two sentences, verbatim.
  thesis: 'I build software systems that report what they couldn’t resolve.',
  // Programme specifics deliberately omitted here — see PRIVATE_NOTES.md (gitignored).
  description:
    'I build software systems that report what they couldn’t resolve. I’m a software engineer with a degree in AI and data science, so I work on both halves: the pipelines, and the models that run on them.',
  email: 'maitreyasapariya@gmail.com',

  github: 'https://github.com/stiFFLer-codes',
  linkedin: 'https://www.linkedin.com/in/maitreya-sapariya/',
  orcid: 'https://orcid.org/0009-0003-9346-3775',

  // The role line under the bio, and the schema.org Person block.
  jobTitle: 'Software Engineer',
  employer: 'Crest Infosystems',
  location: 'Surat, India',
  alumniOf: 'A. D. Patel Institute of Technology, CVM University',
  // schema.org `knowsAbout`: read by search engines, never shown. Each topic
  // is one the publications and education on the home page bear out.
  knowsAbout: [
    'Accessibility',
    'Human-centred AI',
    'Uncertainty communication',
    'Machine learning',
    'Software engineering',
  ],

  // The footer's one-line accessibility note. It states only what is run
  // before every release (CLAUDE.md checklist); keep it that narrow. Not
  // "WCAG compliant" (automated checks are not an audit), and no screen-reader
  // claim until one has actually been tested.
  accessibilityNote: 'Accessibility checked with axe-core and keyboard-only navigation.',
} as const;

// Education and certifications on the home page, newest first. `proof` is a
// redacted certificate under public/, so every line can be checked.
export interface Credential {
  date: string;
  title: string;
  where?: string;
  /** A mono line under the title: the course taken at a school, say. */
  note?: string;
  href?: string;
  proof?: string;
}

export const EDUCATION: Credential[] = [
  {
    date: '2026',
    title: 'Bachelor of Technology, Artificial Intelligence (AI) and Data Science',
    where: 'A. D. Patel Institute of Technology, CVM University, Anand',
  },
  // Both Jyväskylä lines lead with the school's official name, as printed on
  // its certificates; the course follows as the note.
  {
    date: '2026',
    title: '35th Jyväskylä Summer School',
    where: 'University of Jyväskylä, online',
    note: 'COG1: Fundamentals of Inclusive and Accessible Design of Technology (3 ECTS)',
    proof: '/jyu-cog1-2026-credits.pdf',
  },
  {
    date: '2025',
    title: '34th Jyväskylä Summer School',
    where: 'University of Jyväskylä, Finland',
    // Course name and code as the 2025 letter of admission gives them.
    note: 'MA1: Machine Learning and Stochastic Control',
    href: '/travel',
    proof: '/jyvaskyla-summer-school-2025.pdf',
  },
];

export const CERTIFICATIONS: Credential[] = [
  {
    date: 'Nov 2026',
    title: 'Ethics of AI (2 ECTS)',
    where: 'University of Helsinki, online',
    // The university's own validation page, so no copy is hosted here.
    proof: 'https://certificates.mooc.fi/validate/i1o2gbgn5',
  },
  { date: 'Jun 2026', title: 'AWS Certified Machine Learning Engineer – Associate' },
  { date: 'Apr 2026', title: 'AWS Certified AI Practitioner' },
];
