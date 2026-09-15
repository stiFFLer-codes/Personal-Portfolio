---
title: 'Three Voices: Uncertainty-Gated Rendering of a Maternal-Health Risk Alarm'
status: 'in-progress'
statusLabel: 'Manuscript complete, archived on Zenodo; arXiv submission in progress'
summary: "Takes one prediction from a random forest model trained on the UCI Maternal Health Risk dataset and renders it three different ways depending on who's reading it: the full SHAP decomposition for a clinician, a ranked-factor card for a community health worker, and a three-lamp visual with a spoken Hindi sentence for the mother."
order: 3
links:
  code: 'https://github.com/stiFFLer-codes/three-voices'
  doi: 'https://doi.org/10.5281/zenodo.22252076'
---

Three Voices takes one prediction from a random forest model trained on the UCI
Maternal Health Risk dataset and renders it three different ways depending on who's
reading it: the full SHAP decomposition for a clinician, a ranked-factor card for a
community health worker, and a three-lamp visual with a spoken Hindi sentence for the
mother. When the model's top two risk classes are separated by less than a fixed margin,
the highest-severity signal is derated from red to amber rather than shown as a false
all-clear, and every string is filled from a deterministic template with no language
model at inference, so any rendering can be audited line by line.

The paper also audits the benchmark dataset itself, showing that 561 duplicate rows
inflate reported macro-recall from 0.580 to 0.859 under identical cross-validation, and
reports the true, deduplicated figures throughout.

Evaluation to date is a formative single-evaluator heuristic critique of the artifact,
not a user study or clinical-validity claim. Co-authored with Aditi Patil (Sumandeep
Vidyapeeth).

This work extracted its core question — how to communicate model uncertainty to a
non-clinical audience — from [Maatritwa AI](/projects/maatritwa-ai), an earlier
prototype built for a national innovation demo. The two are related but distinct: this
paper is a rigorous exercise on a public dataset, not an evaluation of that prototype's
real-world performance.
