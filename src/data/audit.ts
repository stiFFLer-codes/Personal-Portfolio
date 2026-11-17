// The accessibility run, typed. scripts/audit.mjs writes a11y-audit.json;
// the footer, the ledger and /unresolved read it through here.
import raw from './a11y-audit.json';

export interface AuditViolation {
  id: string;
  impact: string | null;
  help: string;
  nodes: number;
  scheme: string;
  width: number;
  targets: string[];
}

export interface AuditPage {
  path: string;
  /** axe-core rules that passed on this page. */
  passes: number;
  violations: AuditViolation[];
  /** Links and controls reached by pressing Tab, of those on the page. */
  keyboard: { reached: number; total: number };
}

export interface Audit {
  /** "17 Nov 2026" */
  date: string;
  /** "axe-core 4.11.1" */
  tool: string;
  pages: AuditPage[];
}

export const audit = raw as Audit;

export const auditTotals = {
  pages: audit.pages.length,
  violations: audit.pages.reduce((n, p) => n + p.violations.length, 0),
  reached: audit.pages.reduce((n, p) => n + p.keyboard.reached, 0),
  stops: audit.pages.reduce((n, p) => n + p.keyboard.total, 0),
};
