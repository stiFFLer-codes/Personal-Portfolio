// One place to update the small facts that show up all over the site.
// Edit these as things change. The home page, footer, meta tags and
// structured data all read from here.

export const SITE = {
  name: 'Maitreya Sapariya',
  title: 'Maitreya Sapariya',
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

  // Path under public/ to a redacted CV. Unset until the file exists: the CV
  // link in the nav and hero renders only when this is set.
  // TODO(markie): drop the redacted PDF at public/cv.pdf and set this to '/cv.pdf'.
  cv: undefined as string | undefined,

  // The role line under the bio, and the schema.org Person block.
  jobTitle: 'Software Engineer',
  employer: 'Crest Infosystems',
  location: 'Surat, India',
  alumniOf: 'A. D. Patel Institute of Technology, CVM University',
} as const;

// Education and certifications on the home page, newest first. `proof` is a
// redacted certificate under public/, so every line can be checked.
export interface Credential {
  date: string;
  title: string;
  where?: string;
  href?: string;
  hrefLabel?: string;
  proof?: string;
}

export const EDUCATION: Credential[] = [
  {
    date: '2026',
    title: 'B.E., Artificial Intelligence and Data Science',
    where: 'A. D. Patel Institute of Technology, CVM University, Anand',
  },
  {
    date: '2026',
    title: 'COG1: Fundamentals of Inclusive and Accessible Design of Technology (3 ECTS)',
    where: 'University of Jyväskylä, attended online',
    proof: '/jyu-cog1-2026-credits.pdf',
  },
  {
    date: '2025',
    title: '34th Jyväskylä Summer School: machine learning and stochastic control',
    where: 'University of Jyväskylä, Finland',
    href: '/travel',
    hrefLabel: 'the trip',
    proof: '/jyvaskyla-summer-school-2025.pdf',
  },
];

export const CERTIFICATIONS: Credential[] = [
  { date: 'Jun 2026', title: 'AWS Certified Machine Learning Engineer – Associate' },
  { date: 'Apr 2026', title: 'AWS Certified AI Practitioner' },
];
