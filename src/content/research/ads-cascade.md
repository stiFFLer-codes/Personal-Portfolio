---
title: 'Historical Consistency Predicts Mechanism Accuracy, Not Mechanism Ranking'
status: 'in-progress'
statusLabel: 'Submitted to arXiv (cs.LG) 4 September 2026, awaiting the public listing'
summary: "A pre-registered, 240-condition synthetic experiment asking whether a system's historical decision consistency can tell you which classification mechanism to build: exact-match rules or fuzzy retrieval. Consistency strongly predicts each mechanism's own accuracy (Pearson r above 0.9 in both lexical conditions), but it tells you nothing about which one wins."
order: 1
links:
  code: 'https://github.com/stiFFLer-codes/ADS-Cascade'
  doi: 'https://doi.org/10.5281/zenodo.21644208'
---

The question: a production accounting-classification system picks its classification
mechanism using a single frozen threshold on historical label consistency. In one
deployment the consistency statistic landed just above the threshold and the system
picked one mechanism; a synthetic reproduction landed just below and picked a different
one. That near-coincidence raised an obvious question: does historical consistency
actually predict which mechanism performs best, or does it just happen to correlate with
it sometimes?

What I did: a pre-registered, 240-condition synthetic factorial experiment (20 seeds × 6
consistency targets × 2 lexical conditions), comparing exact-match rules against fuzzy
retrieval, once with clean product strings and once with a controlled surface-form
perturbation applied to them.

What I found: consistency is a strong predictor of each mechanism's own accuracy on its
own (r above 0.9 in both conditions), but it carries no information about which mechanism
beats the other. The actual winner is instead a constant function of the lexical
condition, a variable the consistency signal is built not to see. Under perturbation,
retrieval wins in all 120 tested conditions, and the exact-match rule's disadvantage
widens (from -0.137 to -0.185 accuracy points) as consistency rises, which is backwards
from what the standard precedent-based intuition predicts. A frozen consistency-threshold
rule taken from the real production system agrees with the true winner 100% of the time
in one consistency band and 0% of the time in another.

Why it matters: it's a bounded, evidenced answer to a design-time question that shows up
constantly in practice — don't trust a consistency-only signal to pick between
architecturally different mechanisms unless you've also checked what it can't see.

Solo-authored, fully reproducible from public code.
