// Date labels for the margin column. One place, so every list on the site
// writes a date the same way. Months are fixed three-letter forms: locale
// data writes "Sept" but "Oct", which breaks the mono column's alignment.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const mon = (d: Date) => MONTHS[d.getUTCMonth()];

/** "29 Oct 2026" */
export const day = (d: Date) => `${d.getUTCDate()} ${mon(d)} ${d.getUTCFullYear()}`;

/** "Jun 2026" */
export const month = (d: Date) => `${mon(d)} ${d.getUTCFullYear()}`;

/** "Jan 2026 – now", "Jun – Jul 2025", "Nov 2025 – Feb 2026" */
export function span(start: Date, end?: Date) {
  if (!end) return `${month(start)} – now`;
  if (start.getUTCFullYear() === end.getUTCFullYear()) {
    return `${mon(start)} – ${month(end)}`;
  }
  return `${month(start)} – ${month(end)}`;
}
