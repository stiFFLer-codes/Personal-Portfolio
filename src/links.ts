// What each link key is called on the page, wherever links are listed: under
// a row in any list, and in a paper or system page's sources.
export const LINK_LABELS: Record<string, string> = {
  repo: 'repository',
  live: 'live site',
  preprint: 'preprint',
  arxiv: 'arXiv',
  code: 'code',
  doi: 'doi',
  zenodo: 'zenodo',
  certificate: 'certificate',
};

/** The links that are set, as [key, url] pairs, in the order given. */
export const presentLinks = (links: Record<string, string | undefined> = {}) =>
  Object.entries(links).filter(([, url]) => Boolean(url)) as [string, string][];
