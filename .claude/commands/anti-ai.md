---
description: Audit and rewrite text to strip AI-generated writing tells
argument-hint: [paste draft, or leave blank to use the current selection/file]
---

Run the anti-AI tells audit and rewrite on the text below (or, if none is given,
on the text the user just shared / the file in context).

TEXT:
$ARGUMENTS

---

# Anti AI: strip the tells, keep the substance

Audit and rewrite text so it doesn't read as AI-generated. Patterns below are
from corpus studies (Kobak et al. Science Advances 2025 — 15M PubMed abstracts;
Reinhart et al. PNAS 2025) plus platform analyses of LinkedIn, cold email,
YouTube, and blog writing.

**Figure out the use case first** (section 3) — the rules genuinely differ.
Stripping hedging from a methods section is wrong; stripping it from a LinkedIn
post is right. Don't apply one blanket "sound casual" fix everywhere.

## Your task

1. **Identify the use case** from section 3. If not obvious, ask.
2. **Audit first, rewrite second.** Scan against sections 1, 2, and the relevant
   part of section 3. List what you find, briefly, grouped by category. Tag the
   tells, don't write an essay.
3. **Rewrite.** Fix what you found. Keep the point and voice; don't launder it
   into a different opinion or register than the use case calls for.
4. **Run the fix workflow** (section 5) as a final pass.
5. **Coffee shop test, adjusted per use case.** Casual writing (email, DM,
   LinkedIn, CV bullets): would a person say this out loud? Academic writing:
   would a careful researcher who knows this data write this sentence —
   specific, cited, not padded?
6. Present: tells found, then the rewrite. Skip the audit list if already clean.

---

## 1. Overused AI vocabulary and fake professional jargon

Post-ChatGPT corpus studies: "delves" ~28x its pre-2022 rate in biomedical
abstracts; GPT-4o uses "camaraderie" at 162x and "tapestry" at 155x the human
rate. Not banned words — but stacking three in a paragraph is the fingerprint,
and it's what editors and detectors now catch.

**Coffee shop test:** if you wouldn't say the word out loud to a friend over
coffee, it's probably a tell (doesn't apply as-is to academic prose — see 3.1).

| Category | Watch for | Swap in |
|---|---|---|
| Grandiose verbs | delve/delving, underscore, elevate, foster, harness, elucidate, unlock, leverage, illuminate, showcase | explore, show, improve, use, build, explain, demonstrate |
| Spatial/fabric metaphors | tapestry, realm, landscape, labyrinth, cornerstone, symphony, intersection, journey | field, area, market, mess, basis, mix, overlap, process |
| Elevated adjectives | intricate, meticulous, nuanced, pivotal, crucial, multifaceted, vibrant, robust, seamless, comprehensive, palpable, amidst, novel (loose) | complex, careful, detailed, key, important, varied, solid, smooth, complete, real, during, new |
| Corporate buzzwords | synergy, spearhead, streamline, cutting-edge, game-changer, holistic, scalable, revolutionize, transformative, innovative | efficiency, lead, simplify, advanced, major shift, flexible, change |
| Hedges (tone-flattening) | generally speaking, typically, arguably, to some extent, broadly speaking, tends to | usually, often, some say, overall (legitimate statistical hedging is different — see 3.1) |
| Vague attribution | industry experts say, studies suggest, many argue, research has shown (no source named) | name the actual source, or cut the claim |
| Recycled clichés | trust is key, lead with empathy, think outside the box, at the end of the day, in today's fast-paced world | cut it, or replace with something specific to this situation |
| Significance inflation | stands as a testament to, plays a vital role, marks a profound shift | just say what happened: "they were careful, here's how" |

---

## 2. Robotic sentence structures and synthetic transitions

**"It's not X, it's Y" (negative parallelism).** The most recognized AI tell.
Readers process the negated half first, so it lands weaker anyway. Fix: state
the positive thesis directly.

**Rule of three.** AI defaults to triplets for everything. One triplet is fine;
the tell is that *everything* comes in threes. Fix: use two, four, or seven.

**Trailing "-ing" participial tails.** "...ensuring seamless delivery and
fostering trust," "...highlighting the importance of collaboration." Fix: split
into a direct statement, or cut the tail.

**Formulaic connectives.** Moreover, Furthermore, Additionally, Consequently,
"It is important to note that," "That being said." Deadly when every paragraph
opens with one. Fix: delete, or use "And/But/So" (informal) or a real logical
connector (formal).

**Em-dash overuse.** Swap for a period, comma, or colon. More than one em dash
in a sentence is a rewrite candidate.

**Low burstiness (uniform sentence length).** AI clusters at 15–25 words with
little variation. Fix: vary rhythm deliberately. Short fragment. Then a longer
sentence that takes its time. Read aloud — if it's a metronome, break it up. (In
academic writing, vary clause complexity, not add casual fragments.)

---

## 3. Use-case playbook

### 3.1 Academic writing (papers, manuscripts, journal submissions)

Highest-stakes: desk editors and Turnitin's AI indicator screen submissions.

**Don't strip everything.** Passive voice in methods, formal register, and
*justified* statistical hedging ("was associated with," "may reflect," "did not
reach significance") are convention, not tells. The tell is *unjustified*
vagueness — hedging with nothing behind it.

**Paper-specific tells:** "delve into," "underscore," "shed light on," "plays a
pivotal/crucial role," "novel framework" (when it isn't), "robust results"
(without numbers), "paves the way for future research"; "This study aims to
investigate..." (say what you did); "In conclusion, this study demonstrates..."
+ restatement + reflexive "further research is needed"; "several studies have
shown" without naming them; never let an unverified citation into a draft;
"a significant improvement" instead of "an AUC of 0.89 (95% CI 0.84–0.93)".

**Fix:** replace every vague significance claim with your actual number (SHAP,
AUC, sample size, p-value). Vary sentence complexity across the paragraph. Every
claim traces to a citation or your own reported result.

### 3.2 SOPs, application essays, professor outreach

**Tells:** "My journey began when...", "This experience opened my eyes to...",
"I am confident that this program will help me achieve my goals," "I have always
been passionate about combining X and Y," generic passion statements.

**Fix:** anchor every claim in something only you could have written — the
actual course name, the actual number, the actual moment. If a sentence could
sit unchanged in someone else's SOP, it isn't doing its job. For re-engagement
emails, lead with the one real point of connection, not a flattery template.

### 3.3 Professional and client email

**Tells:** "I hope this email finds you well," "I wanted to reach out to...",
"Please let me know if you have any questions" as a reflexive closer, "streamline
workflows" / "drive actionable insights" when you mean something specific.

**Fix:** open with the actual point or update. State numbers and specifics (what
shipped, what's blocked, what you need). Keep it as short as the message needs.

### 3.4 Connection messages and cold DMs

**Tells:** "I'd love to connect and pick your brain," "I came across your profile
and was impressed," generic flattery with no specific referent.

**Fix:** one real hook — their actual paper, a mutual specific context, why
*them* and not a template version of them. If you can't name the specific reason
in one sentence, it's not ready.

### 3.5 Motivation/vlog scripts (raw notes → script)

Failure mode isn't the usual tells — it's over-smoothing your voice into generic
uplift.

- Treat raw input as source of truth. Keep good specific phrases near verbatim.
- Elaborate by adding concrete detail, not motivational filler.
- Avoid "believe in yourself and anything is possible," "the future is bright."
  The test isn't "is this positive," it's "is this positive in a way that's
  specifically yours."
- Open with the concrete stakes or moment, not "in this video I'm going to...".
  Cut any reflexive recap-then-CTA outro.

### 3.6 CV and resume content

**Ban outright:** results-driven, detail-oriented, team player, passionate,
dynamic, self-starter, hardworking, go-getter, any adjective describing yourself
rather than what you did.

**Fix:** every bullet = action verb + what you built/did + concrete
outcome/metric + the actual tool/stack. Keep certifications and scores exact.
If a bullet would be true of a hundred other candidates, it's not specific yet.

### 3.7 LinkedIn posts

**Tells ("corporate foam"):** faux-introspective hooks ("I've been thinking a
lot about..."), the humblebrag redemption arc, a line break after every
sentence, emoji listicles, the balanced platitude, the engagement-bait closer
("Agree? Thoughts?") — which the algorithm now suppresses.

**Fix:** lead with one specific verifiable detail. Write like a slightly messy
voice note. Keep a genuine closing question if you have one; drop the bait.

### 3.8 Blog posts, reports, daily writing

Watch for SEO-bloat intros ("In today's rapidly evolving landscape..."), rigid
symmetrical H2/H3 sections, FAQ padding, the mandatory "Conclusion" header.
Fix: answer the actual question in the first two sentences, let section length
reflect real complexity, kill the "Conclusion" header.

---

## 4. Structural weaknesses (cross-cutting)

**Generic introductions.** "In today's rapidly evolving landscape, X has become
increasingly important." Cut the first paragraph almost every time. Start with
the sharpest concrete detail you have.

**Empty transitions.** Paragraphs that summarize the previous one instead of
advancing the argument. Connect through repetition of key terms and implication,
not explicit signposting.

**Formulaic conclusions.** Recapping every point chronologically + the mandatory
uplifting horizon ("the future is bright," "further research is needed"). End on
your strongest concrete point. If you don't have a new synthesis, it isn't done.

---

## 5. The fix workflow (final pass)

1. Cut the first paragraph if it's throat-clearing.
2. Find-and-cut pass on the highest-signal words from section 1.
3. Kill formulaic connectives and any "Conclusion" header. Kill compulsive summaries.
4. Search for "not just," "not only," "it's not X, it's Y." Cut all but at most one.
5. Break every list that's rigidly three items for no reason.
6. Replace one abstract claim per section with a real number, name, or anecdote.
   In academic writing this is not optional.
7. Read it aloud (for academic writing, read it as a reviewer would). Vary rhythm
   for the register.
8. Run the use-case-specific pass from section 3.
9. Academic writing only: confirm every citation is real and every number is the
   one you actually have. Don't invent specificity that isn't true.
10. Coffee shop test (adjusted per use case).

---

## Output format

1. **Use case identified** (one line).
2. **Tells found** (brief, grouped by category). Skip if already clean.
3. **Rewrite.**
4. Optional one-line note on the biggest structural change made.

No "here's why this matters" preamble. Just run it.
