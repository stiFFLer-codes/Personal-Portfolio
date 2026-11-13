---
title: 'Prediction is not selection: a pre-registered study of design-time mechanism choice in author name disambiguation'
status: 'shipped'
stage: 'preprint'
authors: ['Maitreya Sapariya']
statusLabel: 'Preprint, November 2026'
venue: 'Zenodo'
citation: 'preprint v2.0.0, 2026'
summary: 'Can a designer measure a property of their own data before building anything and learn which classification mechanism to build? On seven public author name disambiguation datasets the answer is mostly no, for two separate reasons.'
order: 3
links:
  doi: 'https://doi.org/10.5281/zenodo.24184394'
  code: 'https://github.com/stiFFLer-codes/prediction-is-not-selection'
# Body: two sections of Maitreya's repository README, verbatim; links point at
# the v2.0.0 release, the version of the PDF.
---

## What the study found

1. **One common comparison is decided before it starts.** An exact-match rule is a strict sub-case of a retriever that assigns from the single nearest name form, whenever the similarity gives its maximum only to identical strings: a string already in the history is its own nearest neighbour. In the comparison most practitioners would run, the rule therefore cannot win at any cutoff. We measured zero rule wins on 199,713 held-out mentions in two metric families before we understood why.
2. **On a fair pair, the pooled contest is a near tie.** With the rule against a k-nearest vote, where neither mechanism contains the other, the two score 0.8244 and 0.8294 pooled over seven datasets. No consistency band and no variability band clears the margin fixed in advance, so both selection hypotheses return Inconclusive.
3. **The pool hides two datasets that go opposite ways.** kisti favours the rule by 0.1131 [+0.1015, +0.1250] through better matching. zbmath favours the vote by 0.0631 [−0.0761, −0.0512], because the rule abstains. A third dataset, inspire, holds 11,110 of the 13,902 blocks and dominates the pooled number.
4. **An unregistered signal, block size, is the only one with decided verdicts.** With all seven datasets pooled, the vote is ahead on the smallest blocks, and the cause is the rule's abstentions on them.
5. **Most mentions leave no room for a contest.** A two-sided contest, in which either mechanism can beat the other, is possible only where a name's history is both mixed and written in more than one way: 42.2% of held-out mentions.

## Check it yourself

- **Pre-registered.** The hypotheses, margins and analysis were frozen in [`phase2/PREREG.md`](https://github.com/stiFFLer-codes/prediction-is-not-selection/blob/v2.0.0/phase2/PREREG.md) at commit `8869b82`, before any accuracy existed. The amendment and addendum (`5f452ad`, `3e79a48`) came before the reported run (`9e3d921`). Every hash the paper cites resolves in this repository.
- **Deviations listed.** Section 6.4 of the paper lists each point where the record falls short of a clean pre-registration, including two rules inserted nine hours after the freeze.
- **Reproduced cold.** A fresh clone on a two-core laptop regenerated all 108 output files with identical content in 19 minutes ([cold-run report](https://github.com/stiFFLer-codes/prediction-is-not-selection/blob/v2.0.0/phase2/reports/phase2_9c_cold_run.md)).
- **Checked number by number.** An independent pass traced the 829 numbers in the PDF to committed tables, or to arithmetic on them. The two it could not match were corrected before release ([ledger](https://github.com/stiFFLer-codes/prediction-is-not-selection/blob/v2.0.0/phase2/reports/tables/phase2_9d_number_ledger.csv), [verifier report](https://github.com/stiFFLer-codes/prediction-is-not-selection/blob/v2.0.0/phase2/reports/phase2_9d_verifier.md)).
- **AI use disclosed.** The work was done with an AI assistant (Claude, Anthropic) under the author's direction. The paper's disclosure and the [pass log](https://github.com/stiFFLer-codes/prediction-is-not-selection/blob/v2.0.0/phase2/PASSLOG.md) record how.
