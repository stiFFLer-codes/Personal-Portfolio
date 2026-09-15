---
title: 'When Chats Split Apart: Formalizing Temporal Communication Fragmentation and the CARTA Reconstruction Framework'
status: 'in-progress'
statusLabel: 'Manuscript complete, archived on Zenodo; targeting arXiv (cs.DL, cross-listed cs.CR)'
summary: 'Formalizes what happens when a messaging account''s history splits across two devices with no way to recombine them, and proposes CARTA, a reconstruction contract that quarantines and reports what it can''t safely resolve.'
order: 2
links:
  code: 'https://github.com/stiFFLer-codes/champ-pipeline'
  doi: 'https://doi.org/10.5281/zenodo.22260522'
---

## The problem

Temporal Communication Fragmentation occurs when a messaging account's history becomes irreconcilably split across two or more devices with no synchronization bridge. This isn't just a sync bug—it's a structural problem in systems where the ground truth of conversation state is distributed, and the devices can't re-converge.

## The framework

CARTA (Chat Archive Reconstruction & Temporal Access) formalizes what you can and cannot safely reconstruct in this scenario. Instead of guessing or silently dropping messages, CARTA defines a contract:

- Identify what is unambiguously recoverable
- Quarantine what has conflicting interpretations  
- Report both to the user with transparency about what was lost and why

The CHAMP-Pipeline is a zero-dependency reference implementation of this contract.

## Current status

The manuscript is complete and archived on Zenodo, alongside CHAMP-Pipeline, its
zero-dependency WhatsApp reference implementation. Evaluation is against a synthetic
corpus with known ground truth, not a real archive — no real WhatsApp export has been
reconstructed, and no accuracy figure is claimed.

## What's next

- Submit to arXiv (cs.DL, cross-listed cs.CR)
- Sync ORCID, Google Scholar, and ResearchGate once live
