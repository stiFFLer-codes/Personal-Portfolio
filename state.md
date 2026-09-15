# state.md

Working state for **maitreyasapariya.me**. Rewritten 2026-09-15 — the previous
version (written 2026-08-31, "session 2") had gone stale: 25 commits landed
after it without an update, so it described a repo that no longer existed.
Not site content. Not committed by default — delete it once it stops being useful.

Authoritative documents remain **CLAUDE.md** (the law) and **AGENTS.md** (builder brief).
This file only records where things stand.

---

## Where the repo is right now

```
HEAD == main == origin/main   2930725
```

Working tree clean. No divergence, no unmerged branches, nothing pending.
`node_modules` is **not installed** in this environment — the site has not
been build-verified this session.

---

## What's actually shipped (vs. the phase order in CLAUDE.md)

| Phase | State |
|---|---|
| 1–4 | Done |
| 5 — maternal-health case study | Done. `src/content/projects/maatritwa-ai.md` — honest about what's trained (nothing yet) vs. designed (methodology locked) |
| 6 — Research | Half done. `/research` live with 2 entries (`ads-cascade`, `carta-when-chats-split-apart`) |
| 6 — Experience | **Not started.** No page, no content collection, nothing. Current focus. |
| 7 — Romanian Fiscal AI case study | Not started |
| 7 — DataSaarthi case study | Not started |
| 8 — Writing | Done, shipped ahead of 6/7. `/writing`, 4 posts. Intentional deviation, not an oversight — see CLAUDE.md phase-order note. |
| 9 — travel map | Optional, untouched |

Also landed since the 08-31 snapshot: a design-system rework
(`feat(design): single-serif type system, status-rail component, sources
block pattern`) and a repo link added to the Maatritwa AI project entry.

---

## Content collections (`src/content.config.ts`)

Four collections: `projects`, `changelog`, `research`, `writing`. Each is
markdown-per-entry, schema-validated with Zod. Adding an entry to any of
them means dropping a file with frontmatter matching that collection's
schema — no other code changes needed. See the file itself for the exact
schema of each (status enums, required fields, link shapes).

---

## Open items, priority order

### 1. Experience section — current focus

Does not exist. Needs: a decision on shape (own content collection like
`research`/`writing`, or a static block on `/about`), then the actual
facts from Maitreya (role, dates, scope at Crest Infosystems) — prose is
his to write per content rule 5, not an agent's.

### 2. Case studies: Romanian Fiscal AI, DataSaarthi

Same shape as `maatritwa-ai.md`. Need source material from Maitreya before
any file gets created — do not draft placeholder prose.

### 3. Build never verified this session

`node_modules` absent. Before trusting any of the above, run
`npm install && npm run build`, and re-run the review checklist
(Lighthouse, a11y, 375px render) once there's new content to check.

### 4. Smaller, still open (carried over, unresolved)

- `astro check` (strict typecheck) has never been run — needs
  `@astrojs/check` + `typescript` as dev deps, which CLAUDE.md gates behind
  justification. Decision still open.
- `anti-ai` pass over site prose, once copy for the new sections is settled.
- Add `.claude/settings.local.json` to `.gitignore` if it's not already
  covered by a global exclude.
- Optional: changelog entry for AWS Certified Machine Learning – Associate
  (passed 3 June 2026) — cert is listed on `/about`, no `/log` entry yet.
- GitHub account cleanup (username `stiFFLer-codes` → real name, repo
  rename, profile audit) — web-UI work, `gh` CLI not available here. Full
  list from the 08-31 session is still valid; not re-checked this pass.

---

## Environment notes for whoever picks this up

- This session: Linux container, Bash tool available, `gh` CLI not
  installed — GitHub work goes through the GitHub MCP tools instead.
- Use absolute paths in Bash calls; working directory persists between
  calls in this harness.
