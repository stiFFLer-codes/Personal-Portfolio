// One place to update the small facts that show up all over the site.
// Edit these as things change — the status ledger and footer read from here.

export const SITE = {
  name: 'Maitreya Sapariya',
  title: 'Maitreya Sapariya — building data-intensive software systems',
  description:
    'Software engineer building production ML systems and working toward the EDISS Erasmus Mundus programme. Notes, projects, and a running log.',
  email: 'maitreyasapariya@gmail.com',

  // TODO: confirm these before deploying — do not guess.
  github: 'https://github.com/TODO_YOUR_USERNAME',
  linkedin: 'https://www.linkedin.com/in/TODO_YOUR_SLUG',

  // Shown in the status ledger as "now:"
  now: 'Software Engineer @ Crest Infosystems',

  // The countdown in the ledger and footer counts down to this date.
  deadline: new Date('2026-12-18T00:00:00'),
  deadlineLabel: 'self-imposed EDISS submission target',
} as const;
