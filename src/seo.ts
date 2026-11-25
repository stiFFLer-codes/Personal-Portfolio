// Structured data (schema.org JSON-LD) for search engines. Data blocks, not
// scripts: browsers never execute application/ld+json, so none of this ships
// client-side JS.
//
// One Person, with one stable @id, is the subject of the whole site. The home
// page publishes the full Person inside a ProfilePage and a WebSite; every
// paper and post names the same @id as its author, so a search engine can tie
// them all to one person. Keep `sameAs` in step with ProfileLinks.astro: each
// profile there should link back here.
import { SITE } from './site.config';

export const siteRoot = (site: URL) => new URL('/', site).href;
export const personId = (site: URL) => `${siteRoot(site)}#person`;
export const websiteId = (site: URL) => `${siteRoot(site)}#website`;

/** A pointer to the Person, for use as an author anywhere on the site. */
export const personRef = (site: URL) => ({
  '@type': 'Person',
  '@id': personId(site),
  name: SITE.name,
  url: siteRoot(site),
});

/** The profiles that are this person, in the order they are trusted. */
export const SAME_AS = [SITE.orcid, SITE.researchgate, SITE.github, SITE.linkedin];

/** The home page's graph: the site, the profile page, and the person. */
export function homeGraph(site: URL, imageUrl: string, pageTitle: string) {
  const root = siteRoot(site);
  return [
    {
      '@type': 'WebSite',
      '@id': websiteId(site),
      url: root,
      name: SITE.name,
      // A shorter name Google may show for the site.
      alternateName: [SITE.givenName],
      inLanguage: 'en',
      publisher: { '@id': personId(site) },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${root}#profile`,
      url: root,
      name: pageTitle,
      isPartOf: { '@id': websiteId(site) },
      mainEntity: { '@id': personId(site) },
      inLanguage: 'en',
    },
    {
      '@type': 'Person',
      '@id': personId(site),
      name: SITE.name,
      givenName: SITE.givenName,
      familyName: SITE.familyName,
      url: root,
      image: imageUrl,
      description: SITE.description,
      jobTitle: SITE.jobTitle,
      worksFor: { '@type': 'Organization', name: SITE.employer },
      alumniOf: { '@type': 'CollegeOrUniversity', name: SITE.alumniOf },
      homeLocation: { '@type': 'Place', name: SITE.location },
      knowsAbout: SITE.knowsAbout,
      sameAs: SAME_AS,
    },
  ];
}
