# state.md

Working state for **maitreyasapariya.me**. Written 2026-08-31 as a session handoff.
Updated 2026-08-31 (session 2): consolidation merged to main and pushed, phase 4
closed out, Vercel deploy confirmed live. See "Session 2" below.
Not site content. Not committed by default — delete it once it stops being useful.

Authoritative documents remain **CLAUDE.md** (the law) and **AGENTS.md** (builder brief).
This file only records where things stand.

---

## Where the repo is right now

```
origin/main   4f51f2d  Merge refactor/consolidate-v2: consolidated site + phase 4 close-out
main          4f51f2d  (in sync with origin/main)
```

**main is merged, pushed, and live.** `refactor/consolidate-v2` was merged into
`main` with `--no-ff` and pushed to `origin`. The consolidation, the filled
`site.config.ts`, the real AWS cert date, and the status-ledger JS carve-out are
all on `origin/main`. `refactor/consolidate-v2` still exists locally at `49ae471`
and can be deleted whenever.

Untracked (intentionally on hold, do not touch): `Certificates/`, `images/`.

Remote: `git@github-personal:stiFFLer-codes/Personal-Portfolio.git`
(SSH host alias `github-personal` — not the default `github.com` key.)

Deploy: **Vercel git integration is connected and working.** The push to
`origin/main` triggered an automatic redeploy. Live at
`https://www.maitreyasapariya.me/` (apex `maitreyasapariya.me` 308-redirects to
`www`). Verified 2026-08-31: deployed HTML carries the new title, the
`github.com/stiFFLer-codes` footer link, and the corrected AWS date on `/log`.

---

## What was done

### The two-scaffold problem — resolved

There were two projects: a stale scaffold at the repo root (v1) and another
inside `portfolio-v2.zip` (v2). They were not two versions of one site; they
were complementary halves:

- **v1** had the design law, the git history, and zero real content.
- **v2** had the real prose, content collections, and a different design language.

Decision taken: **v2 as the base, v1's rigor ported onto it.** v2's content was
the expensive half to recreate; v1's law was cheap to reapply.

### Cleanup

Deleted: `portfolio-v2/`, `portfolio-v2.zip`, `.agents/`, `.kimchi/`,
`.commandcode/`, `.github/` (held an agent brief for the rejected design
direction), `.astro/`, `dist/`, and the whole v1 Tailwind shell
(`Badge/Card/Section/Prose/Header/Footer.astro`, `BaseLayout.astro`, v1's
`index/about/404.astro`, v1's `global.css`).

Replaced: stock Astro README boilerplate, stock Astro favicon
(`favicon.ico` deleted, `favicon.svg` is now the self-authored mark).

### Consolidation commit

29 files changed, 1447 insertions, 1066 deletions.

- `CLAUDE.md` rewritten (183 lines). Stack, design tokens, type scale, motion
  timing, thesis and phase order all updated to match the merged tree.
  **Preserved verbatim:** the Reader section, CLAUDE'S ROLE, all six CONTENT
  RULES, the review checklist, the accessibility stance, and Git conventions.
- `AGENTS.md` rewritten (~33 lines). Tailwind references removed and replaced
  with custom-property language; added a no-new-dependencies rule and a
  `src/site.config.ts` rule.
- Google Fonts CDN removed. Fonts are now self-hosted via
  `@fontsource-variable/*`, imported in `src/layouts/Base.astro`.
  `newsreader/standard-italic.css` is imported **separately and deliberately** —
  Newsreader's `index.css` ships zero italic faces, and `global.css` uses
  `font-style: italic` on `.prose blockquote`. Do not "tidy" that import away.
- About-page portrait ported from v1 using `astro:assets` `<Image>`.
  Alt text was reused verbatim from v1, not newly authored (content rule 5).
- `404.astro` rewritten in the v2 design language.
- `npm audit fix` run — 3 high-severity build-time transitives resolved,
  Astro stayed at 7.2.9.

### Resolved contradiction, worth remembering

Old CLAUDE.md banned every gradient. v2's signature notebook texture *is* a
`radial-gradient` dot grid on `body`. Rather than silently breaking the law,
CLAUDE.md now carries an explicit carve-out: that one gradient is sanctioned,
any other is a REJECT. Without this, a future review would auto-reject the
site's own design.

---

## Session 2 (2026-08-31) — phase 4 close-out, merge, deploy

Done this session:

- **`src/site.config.ts`**: `github` set to `https://github.com/stiFFLer-codes`
  (confirmed by Maitreya), `linkedin` set to
  `https://www.linkedin.com/in/maitreya-sapariya/`. The `TODO_YOUR_*`
  placeholders are gone; footer links on every page now resolve.
- **AWS changelog entry**: file renamed
  `2026-04-aws-ai-practitioner.md` -> `2026-04-14-aws-ai-practitioner.md`
  (YYYY-MM-DD convention). Body rewritten to
  "Passed the AWS Certified AI Practitioner exam on 14 April 2026." — the
  "(Date above is a placeholder…)" line that was shipping to the public `/log`
  page is removed. Date confirmed by Maitreya.
- **CLAUDE.md**: the review-checklist item "No client-side JS shipped for a
  static section" now names the `StatusLedger.astro` countdown script as a
  reviewed, permanent, sanctioned exception. This is final — do not re-flag it
  in future reviews, do not remove the script without an explicit instruction
  from Maitreya. Any *other* client-side JS on a static section is still a REJECT.
- Two commits on the branch (`a27750e` fix, `4385bd3` docs), then
  `refactor/consolidate-v2` merged into `main` with `--no-ff` (`4f51f2d`),
  clean merge, no conflicts. `main` pushed to `origin` (`3b6bb22..4f51f2d`).
- Build re-run on `main` after merge: passes, 6 routes, zero `TODO_` in `dist/`.
- Vercel picked the push up automatically and redeployed; live site verified
  (see "Where the repo is right now" -> Deploy).

Also confirmed this session: another AWS cert date is now known —
**AWS Certified Machine Learning – Associate, passed 3 June 2026.** The About
page lists this cert but there is **no changelog entry for it yet.** Not created —
outside the scope of the instructions given. Add one if wanted.

Still **not** done: `astro check` (strict typecheck) has never run; `anti-ai`
pass over prose; deciding on `@astrojs/check` + `typescript` dev deps.

---

## Build verification (last run, passing)

```
6 routes:  /  /about  /log  /projects  /projects/maatritwa-ai  /404
0 npm vulnerabilities
0 .js asset files emitted (the ledger script is inlined per-page — see CLAUDE.md carve-out)
portrait 1934kB -> 12kB / 31kB webp
14 self-hosted woff2
no third-party network requests remaining (verified by grepping built HTML/CSS for https:// hosts)
```

`npx astro check` was **not** run — it wants to install `@astrojs/check` and
`typescript` as dev dependencies, and CLAUDE.md forbids adding dependencies
unasked. That decision is still open.

---

## Open items, roughly in priority order

### 1. ~~Broken links live in the built HTML~~ — DONE (session 2)

`site.config.ts` `github`/`linkedin` filled with confirmed real URLs. No `TODO_`
in `dist/`. Footer links resolve on every page.

### 2. ~~The countdown clock — judgment call~~ — RESOLVED (session 2)

Decision is final: the `StatusLedger` inline script stays. CLAUDE.md now records
it as a sanctioned permanent exception to the "no client-side JS on a static
section" rule. Do not re-open this. (The separate "reads anxious" reader-test
objection was set aside with it — if Maitreya later wants the countdown copy
softened or the `T-minus` framing changed, that's a content edit, not a rule
violation.)

### 3. Project name spellings — mostly settled, minor cleanup left

- `Maatritwa AI` — the deployed system, and the URL slug. Canonical.
- `MAMTA` — the research paper. Deliberately distinct from the system; used in
  `2026-08-30-mamta-methodology.md` and that entry's title.
- `Matritva` — stale, only in `docs/superpowers/specs/2026-07-15-academic-portfolio-design.md`.

The system/paper split is intentional and consistent in the live content. Only
loose end: the old spec still says `Matritva`. Low priority.

### 4. Thesis sentence

The site `<h1>` and CLAUDE.md now both carry
"I build software systems that turn messy, real-world data into decisions people
can act on." verbatim, with no TODO/confirm marker in CLAUDE.md. Treat as
settled unless Maitreya says otherwise. No agent rewrites it (content rule 5).

### 5. ~~Decide what to do with the unpushed work~~ — DONE (session 2)

Merged `refactor/consolidate-v2` into `main` (`--no-ff`, clean), pushed to
`origin`, Vercel redeployed automatically. Live and verified. The local
`refactor/consolidate-v2` branch can be deleted.

### 6. Smaller, still open

- Add `.claude/settings.local.json` to `.gitignore` — still open (not currently
  showing as untracked; likely covered by a global exclude, but not in-repo).
- Run the `anti-ai` skill over site prose once the copy is settled.
- Decide on `@astrojs/check` + `typescript` as dev deps.
- Optional: add a changelog entry for **AWS Certified Machine Learning –
  Associate (passed 3 June 2026)**. Cert is already listed on `/about`; no `/log`
  entry exists.

---

## GitHub account cleanup

`gh` CLI is **not installed** on this machine — everything below is web-UI work.

**Highest leverage by far: rename the username `stiFFLer-codes`.**
The site argues for a serious systems engineer; the link next to it goes to
`github.com/stiFFLer-codes`, which reads as a gaming alias. Everything the site
earns, that URL spends. Rename to `maitreyasapariya` via
Settings -> Account -> Change username.

Do it now rather than later: GitHub redirects old repo URLs, but redirects break
once someone claims the freed handle, and anything already on a CV or in an email
keeps pointing at the old name. ~15 months from the submission target, the blast
radius is as small as it will ever be.

After renaming, one command locally:

```
git remote set-url origin git@github-personal:<newname>/<newrepo>.git
```

Then, in order of payoff:

| What | Where | Why |
|---|---|---|
| Rename repo -> `maitreyasapariya.me` | Settings -> General | `Personal-Portfolio` is generic; matching the domain is self-documenting |
| Set the **Website** field to `https://maitreyasapariya.me` | Repo sidebar gear | Free credibility, 30 seconds, most people skip it |
| Repo description + topics | Same place | `astro`, `personal-site`, `static-site` |
| **Audit other public repos** | Profile page | A reviewer sees *every* public repo — old coursework, abandoned tutorials, throwaways. Archive or privatise anything that doesn't help. Often the biggest single difference between profiles. Could not be enumerated from here without `gh` |
| Profile README (`<username>/<username>` repo) | New repo | It is the GitHub landing page. Worth doing, but after the site is finished |

Deliberately **not** doing: rewriting `test: verify personal ssh setup` out of
history. Mild noise, and rewriting it would mean force-pushing main.

---

## Environment notes for whoever picks this up

- Windows 11, PowerShell primary, Bash tool also available.
- **Use absolute paths in every Bash call.** Working directory persists between
  calls in this harness. It caused two real incidents during the merge: an
  inspection that dumped the wrong project, and an `rm -rf` that silently ran in
  the wrong directory and deleted nothing while reporting success. No data was
  lost, but only because the next command's output was read carefully.
- `du -sh node_modules` times out at 2 minutes. Don't bother.
- Remote Control: `remoteControlAtStartup` is `false` in `~/.claude/settings.json`,
  and the daemon key material under `~/.claude/daemon/` was cleared on 2026-08-31.
  Re-enabling requires an explicit opt-in and re-auth. Keep it that way.

---

## Phase order (from CLAUDE.md — do not skip ahead)

1. ~~Domain, Vercel, Astro~~
2. ~~Home + About + /log + /projects scaffolding~~
3. ~~Consolidate the two scaffolds into one repo~~
4. ~~Fill `site.config.ts` TODOs; settle the project's spelling~~ (spec still
   says `Matritva` — see open item 3 — but that's a stale doc, not a blocker)
5. **Case study: the maternal-health system (the one that carries the thesis)  <- current**
6. Research (in-progress, honest) + Experience
7. Case studies: Romanian Fiscal AI, DataSaarthi
8. Writing
9. Nordic map — optional, only after everything above is live
