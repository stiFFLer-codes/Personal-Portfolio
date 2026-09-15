# state.md

Working state for **maitreyasapariya.me**. Rewritten 2026-09-15, same session as
the 08-31 rewrite — phases 5–7 closed out within this session, so this is a
same-day refresh rather than a new stale-doc correction.
Not site content. Not committed by default — delete it once it stops being useful.

Authoritative documents remain **CLAUDE.md** (the law) and **AGENTS.md** (builder brief).
This file only records where things stand.

---

## Where the repo is right now

Working tree clean after this session's commits, all pushed to
`origin/claude/upbeat-carson-kieo3s`. `npm install && npm run build` both run
clean this session — 16 routes, no errors. Not deployed/merged to `main` yet.

---

## What's actually shipped (vs. the phase order in CLAUDE.md)

| Phase | State |
|---|---|
| 1–4 | Done |
| 5 — maternal-health case study | Done. `maatritwa-ai.md` rewritten to describe the actual prototype (national innovation demo, ASHA + doctor views wired, mother view a documented mock) instead of stale "model not trained yet" copy |
| 6 — Research + Experience | Done. `/research` has 3 entries (`ads-cascade`, `carta-when-chats-split-apart`, `three-voices`); Experience is a section on `/about` (new `experience` content collection, 2 entries) |
| 7 — Case studies | Done. DataSaarthi added to `/projects`. "Romanian Fiscal AI" turned out to be confidential Crest production work, not publishable in detail — it's a one-line Experience mention; the research question it raised is the ADS-Cascade paper |
| 8 — Writing | Done, shipped ahead of 6/7 (recorded as an intentional deviation in CLAUDE.md) |
| 9 — travel map | Optional, untouched |

All nine phases are now done or explicitly resolved-as-not-applicable.

---

## What changed this session, in order

1. **Bookkeeping pass**: `state.md`, `CLAUDE.md`'s phase order, and `AGENTS.md`'s
   site map were all stale relative to the actual repo (25 commits had landed
   without updating them). Corrected all three.
2. **Experience section**: new `experience` content collection
   (`company`/`role`/`status`/`statusLabel`/`summary`), rendered via the
   existing `Entry.astro` status rail on `/about` — no detail pages, since a
   job isn't a case study. Two entries: Crest Infosystems (current) and
   InnoByte Services (a completed June–July 2025 internship).
3. **Research entries fixed**: CARTA was mis-expanded on the site as
   "Communication Account Reconstruction Triage and Attribution" — the actual
   paper defines it as "Chat Archive Reconstruction & Temporal Access".
   Both `ads-cascade.md` and `carta-when-chats-split-apart.md` had stale
   submission statuses (ADS-Cascade is already submitted to arXiv; CARTA's
   manuscript is complete and archived on Zenodo, not "in revision"). Added
   Zenodo DOI links to both.
4. **Maatritwa AI vs. Three Voices**: the site's `maatritwa-ai.md` said the
   model hadn't been trained yet, and described it as preeclampsia-specific.
   Both were stale/inaccurate — Maitreya confirmed Maatritwa AI is the
   prototype (three-role referral demo) and Three Voices is the separate,
   completed research paper (public UCI dataset, generic risk, not
   preeclampsia-specific) that extracted the prototype's hardest design
   question. Rewrote `maatritwa-ai.md` from Maitreya's own description,
   added a `three-voices.md` research entry, cross-linked both.
5. **DataSaarthi** added to `/projects` — completed, not deployed, repo
   linked. One of Maitreya's three draft versions used "transform" (a CLAUDE.md
   rule-4 banned word) — skipped that draft, used the other two instead.
6. Build verified clean after every content change (`npm run build`, grep for
   stray hex/banned words, cross-link check between the two new entries).

---

## Open items, roughly in priority order

1. Not merged to `main` / not deployed. Someone needs to open a PR or merge
   the branch when ready.
2. `astro check` (strict typecheck) still never run — needs `@astrojs/check` +
   `typescript` as dev deps, which CLAUDE.md gates behind justification.
   Decision still open, unchanged from prior sessions.
3. `anti-ai` pass over the new/edited prose (Experience entries, Maatritwa AI,
   Three Voices, DataSaarthi) hasn't been run. Maitreya invoked `/anti-ai` and
   `/anthropic-skills:frontend-design` earlier in this session but the
   conversation moved to fact-correction before either ran against the new
   copy — worth doing before this branch ships.
4. No Lighthouse/real-browser a11y pass this session — verified structurally
   (heading order, semantic markup, no stray JS) but not with a live audit.
5. Optional: changelog entry for AWS Certified Machine Learning – Associate
   (passed 3 June 2026) — still not created.
6. GitHub account cleanup (username `stiFFLer-codes` → real name, repo
   rename, profile audit) — web-UI work, unchanged from the 08-31 list.
