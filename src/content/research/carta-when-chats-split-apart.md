---
title: 'When Chats Split Apart: Formalizing Temporal Communication Fragmentation and the CARTA Reconstruction Framework'
status: 'shipped'
stage: 'published'
authors: ['Maitreya Sapariya']
statusLabel: 'Published November 2026'
venue: 'International Journal of Management and Data Analytics (IJMADA)'
citation: 'Vol. 6, Issue 1, 2026, pp. 449–470'
summary: 'Formalizes what happens when a messaging account''s history splits across two devices with no way to recombine them, and proposes CARTA, a reconstruction contract that quarantines and reports what it can''t safely resolve.'
order: 1
links:
  doi: 'https://doi.org/10.68485/ijmada.20266168'
  zenodo: 'https://doi.org/10.5281/zenodo.23526491'
  code: 'https://github.com/stiFFLer-codes/champ-pipeline'
kind: 'journal paper'
---

## The problem

Temporal Communication Fragmentation occurs when a messaging account's history becomes irreconcilably split across two or more devices with no synchronization bridge. This isn't just a sync bug. It's a structural problem in systems where the ground truth of conversation state is distributed, and the devices can't re-converge.

<!-- Figures 1 and 2 are the paper's own (CC BY 4.0), cropped from the published PDF; the captions are the paper's. Added by Claude; Maitreya's text is unchanged. -->
<figure>

![A timeline. Fragment F1, the primary device's history, runs until the failure time t_f, pauses with no new history, and resumes at the recovery time t_r. Fragment F2, the secondary device's history, runs from just before t_f to just after t_r; the two overlaps, delta and epsilon, are hatched. Braces mark the three conditions: C1, bifurcation, at t_f; C2, independent persistence, between t_f and t_r; C3, absent reconciliation, from t_f onwards. After t_r both fragments stay readable (the latent case) until a restore replaces F2 (the manifest case).](./img/carta-fig-1.png)

<figcaption>Fig. 1. TCF on a timeline. C1 and the restore are points; C2 and C3 are spans; hatching marks the overlap regions.</figcaption>
</figure>

## The framework

CARTA (Chat Archive Reconstruction & Temporal Access) formalizes what you can and cannot safely reconstruct in this scenario. Instead of guessing or silently dropping messages, CARTA defines a contract:

- Identify what is unambiguously recoverable
- Quarantine what has conflicting interpretations  
- Report both to the user with transparency about what was lost and why

The CHAMP-Pipeline is a zero-dependency reference implementation of this contract.

<figure>

![A pipeline. The fragment exports F1 to Fn, with n at least 2, pass through Ingestion to structured records R, then Normalization to canonical records R prime; both stages run per fragment, with no cross-fragment reconciliation. Normalization also sends what it cannot interpret to the quarantine set Q, the union of each fragment's set. Synthesis, where the fragments meet, produces the unified archive U and writes the Report, Omega; the quarantine set is carried into it, not reconciled.](./img/carta-fig-2.png)

<figcaption>Fig. 2. The CARTA reconstruction contract.</figcaption>
</figure>

## Current status

Published in the International Journal of Management and Data Analytics (IJMADA),
Vol. 6, Issue 1, 2026, pp. 449–470, under a CC BY 4.0 licence. The manuscript is
also archived on Zenodo, alongside CHAMP-Pipeline, its
zero-dependency WhatsApp reference implementation. Evaluation is against a synthetic
corpus with known ground truth, not a real archive. No real WhatsApp export has been
reconstructed, and no accuracy figure is claimed.
