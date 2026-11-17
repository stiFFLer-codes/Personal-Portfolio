// The site-wide ledger: every claim the site makes about Maitreya, with how
// far a reader can check it. Papers and projects carry their own `ledger` in
// frontmatter; study, work and the site itself are gathered here.
//
// The counts on the home page are the lengths of these lists, nothing else.
// To move a claim from "on my word" to "checkable", give it a link.
import { getCollection } from 'astro:content';
import { CERTIFICATIONS, EDUCATION, type Credential } from './site.config';
import { span } from './format';
import audit from './data/a11y-audit.json';

export type State = 'checkable' | 'word' | 'open';

export interface LedgerItem {
  claim: string;
  state: State;
  note?: string;
  todo?: string;
  links: { label: string; href: string }[];
  /** The page the claim lives on. */
  source: { label: string; href: string };
  group: 'papers' | 'systems' | 'study' | 'work' | 'site';
}

export const STATE_WORD: Record<State, string> = {
  checkable: 'checkable',
  word: 'on my word',
  open: 'unresolved',
};

// Short names for the long paper titles, used as source labels.
const SHORT: Record<string, string> = {
  'carta-when-chats-split-apart': 'CARTA',
  'what-ai-should-refuse-to-say': 'What AI should refuse to say',
  'prediction-is-not-selection': 'Prediction is not selection',
  'three-voices': 'Three Voices',
  'mortgage-knowledge-assistant': 'eRESI',
  'maatritwa-ai': 'Maatritwa AI',
  'amazon-sales-analysis': 'Amazon India sales analysis',
  datasaarthi: 'DataSaarthi',
};
export const shortTitle = (id: string, fallback: string) => SHORT[id] ?? fallback;

const credential = (c: Credential): LedgerItem => ({
  claim: [c.title, c.note, c.where, c.date].filter(Boolean).join(' · '),
  state: c.proof ? 'checkable' : 'word',
  todo: c.proof ? undefined : c.todo,
  links: c.proof ? [{ label: 'certificate', href: c.proof }] : [],
  source: { label: 'Study', href: '/#study' },
  group: 'study',
});

// What the site can and can't say about itself. Drafted by Fable; each line
// is a statement of fact about this repository on the day it was written.
const siteItems = (): LedgerItem[] => {
  const source = { label: 'This site', href: '/unresolved#site' };
  const pages = audit.pages.length;
  const violations = audit.pages.reduce((n, p) => n + p.violations.length, 0);
  return [
    {
      claim:
        pages > 0
          ? `axe-core ran on ${pages} pages, in light and dark, on ${audit.date}, and found ${violations === 0 ? 'no violations' : `${violations} violations, listed below`}.`
          : 'An automated accessibility check of every page.',
      state: pages > 0 ? 'checkable' : 'open',
      note: pages > 0 ? undefined : 'The audit has not been run yet: npm run audit.',
      links: pages > 0 ? [{ label: 'the run', href: '/unresolved#audit' }] : [],
      source,
      group: 'site',
    },
    {
      claim: 'Whether the site works with a screen reader, for someone who relies on one.',
      state: 'open',
      note: 'Automated checks are not an audit. Nobody who uses a screen reader every day has tested these pages yet.',
      source,
      links: [],
      group: 'site',
    },
    {
      claim: 'Tap targets on the map, on a phone.',
      state: 'open',
      note: 'At phone width some stops on the map sit closer together than a 24 pixel tap target allows (Oslo and Sandefjord, Helsinki and Tallinn). The stop index beside the map and the field log under it reach every stop.',
      source: { label: 'The north', href: '/travel' },
      links: [],
      group: 'site',
    },
    {
      claim: 'The margin the coin-flip demo uses.',
      state: 'open',
      note: 'The 0.487 against 0.499 case is real. The margin drawn in the demo is a stand-in so the slider has somewhere to go; the paper fixes its own.',
      todo: 'the margin from the Three Voices paper, and the spoken Hindi sentence.',
      source: { label: 'The demo', href: '/#coin-flip' },
      links: [],
      group: 'site',
    },
  ];
};

export async function getLedger(): Promise<LedgerItem[]> {
  const [research, projects, experience] = await Promise.all([
    getCollection('research'),
    getCollection('projects'),
    getCollection('experience'),
  ]);
  const byOrder = <T extends { data: { order: number } }>(a: T, b: T) =>
    a.data.order - b.data.order;

  const papers = research.sort(byOrder).flatMap((r) =>
    r.data.ledger.map<LedgerItem>((l) => ({
      ...l,
      source: { label: shortTitle(r.id, r.data.title), href: `/research/${r.id}` },
      group: 'papers',
    }))
  );
  const systems = projects.sort(byOrder).flatMap((p) =>
    p.data.ledger.map<LedgerItem>((l) => ({
      ...l,
      source: { label: shortTitle(p.id, p.data.title), href: `/projects/${p.id}` },
      group: 'systems',
    }))
  );
  const work = experience.sort(byOrder).map<LedgerItem>((e) => ({
    claim: `${e.data.role}, ${e.data.company}, ${span(e.data.start, e.data.end)}.`,
    state: 'word',
    note: e.data.note,
    links: [],
    source: { label: 'Work', href: '/#work' },
    group: 'work',
  }));
  const study = [...EDUCATION, ...CERTIFICATIONS].map(credential);

  return [...papers, ...systems, ...study, ...work, ...siteItems()];
}

export const tally = (items: LedgerItem[]) => ({
  total: items.length,
  checkable: items.filter((i) => i.state === 'checkable').length,
  word: items.filter((i) => i.state === 'word').length,
  open: items.filter((i) => i.state === 'open').length,
});
