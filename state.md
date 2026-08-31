# state.md

Working state for **maitreyasapariya.me**. Written 2026-08-31 as a session handoff.
Not site content. Not committed by default — delete it once it stops being useful.

Authoritative documents remain **CLAUDE.md** (the law) and **AGENTS.md** (builder brief).
This file only records where things stand.

---

## Where the repo is right now

```
origin/main               f3b3afc  test: verify personal ssh setup
main                      3b6bb22  chore: remove agent tool artifacts, replace stock README
refactor/consolidate-v2   3a6ba49  refactor: consolidate the two scaffolds into one site   <- HEAD
```

**Nothing has been pushed.** `main` is 1 commit ahead of `origin/main`; the
consolidation branch is 1 further ahead of that. Both commits are local only.

Untracked: `.claude/` (contains `settings.local.json`), and this file.

Remote: `git@github-personal:stiFFLer-codes/Personal-Portfolio.git`
(SSH host alias `github-personal` — not the default `github.com` key.)

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

## Build verification (last run, passing)

```
6 routes:  /  /about  /log  /projects  /projects/maatritwa-ai  /404
0 npm vulnerabilities
0 .js files shipped
658K dist
portrait 1934kB -> 12kB / 31kB webp
14 self-hosted woff2
no third-party network requests remaining (verified by grepping built HTML/CSS for https:// hosts)
```

`npx astro check` was **not** run — it wants to install `@astrojs/check` and
`typescript` as dev dependencies, and CLAUDE.md forbids adding dependencies
unasked. That decision is still open.

---

## Open items, roughly in priority order

### 1. Broken links are live in the built HTML

`src/site.config.ts` still ships literal TODOs that render as real hrefs in the
footer of **every page**:

```ts
github:   'https://github.com/TODO_YOUR_USERNAME',
linkedin: 'https://www.linkedin.com/in/TODO_YOUR_SLUG',
```

One-line fix once the real URLs are known. This is CLAUDE.md phase 4.

### 2. The countdown clock — a judgment call, not a bug

`StatusLedger` ships ~500 bytes of inline JS rendering
**"T-minus Nd to EDISS target"** in the dark strip at the top of every page,
counting down to `2026-12-17T18:30:00.000Z`.

Two objections were raised and are **not yet resolved**:

- Reader test: a professor at 11 PM sees an applicant publicly counting down to
  their own application deadline. That reads anxious, not credible.
- It is the only thing on the site that trips the checklist item
  *"No client-side JS shipped for a static section."*

Recommendation on record: cut the countdown, keep the `now:` line. Not actioned —
this is Maitreya's call.

### 3. Project name has three spellings

- `Matritva`      — old CLAUDE.md
- `Maatritwa AI`  — current v2 content and the URL slug
- `mamta`         — changelog filename `2026-08-30-mamta-methodology.md`

Pick one and make it consistent across content, slug, and filenames. Also
CLAUDE.md phase 4.

### 4. Thesis sentence needs confirming

CLAUDE.md carries a working thesis with an explicit HTML comment handing the
wording back to Maitreya. Direction is settled; the exact sentence is not.
No agent may rewrite it (content rule 5).

### 5. Decide what to do with the unpushed work

Merge `refactor/consolidate-v2` into `main` and push, or keep iterating on the
branch. Standing rule: **never force-push main.**

Advice on record: run `npm run dev` and look at the site first. The design
changed completely during the merge and it has not been viewed rendered.

### 6. Smaller, still open

- Add `.claude/settings.local.json` to `.gitignore`.
- Run the `anti-ai` skill over site prose once the copy is settled.
- Decide on `@astrojs/check` + `typescript` as dev deps.

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
4. **Fill `site.config.ts` TODOs; settle the project's spelling  <- current**
5. Case study: the maternal-health system (the one that carries the thesis)
6. Research (in-progress, honest) + Experience
7. Case studies: Romanian Fiscal AI, DataSaarthi
8. Writing
9. Nordic map — optional, only after everything above is live
