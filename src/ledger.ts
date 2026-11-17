// The site-wide ledger: every claim the site makes about Maitreya, with how
// far a reader can check it. Papers and projects carry their own `ledger` in
// frontmatter; study and work are gathered here from site.config.
//
// The counts on the home page are the lengths of these lists, nothing else.
// To move a claim from "on my word" to "checkable", give it a link.
import { getCollection } from 'astro:content';
import { CERTIFICATIONS, EDUCATION, type Credential } from './site.config';
import { span } from './format';

export type State = 'checkable' | 'word' | 'open';

export interface LedgerItem {
  claim: string;
  state: State;
  note?: string;
  todo?: string;
  links: { label: string; href: string }[];
  /** The page the claim lives on. */
  source: { label: string; href: string };
  group: 'papers' | 'systems' | 'study' | 'work';
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

  return [...papers, ...systems, ...study, ...work];
}

export const tally = (items: LedgerItem[]) => ({
  total: items.length,
  checkable: items.filter((i) => i.state === 'checkable').length,
  word: items.filter((i) => i.state === 'word').length,
  open: items.filter((i) => i.state === 'open').length,
});
