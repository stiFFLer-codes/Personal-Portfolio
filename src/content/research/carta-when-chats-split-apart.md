---
title: 'When Chats Split Apart: Formalizing Temporal Communication Fragmentation and the CARTA Reconstruction Framework'
status: 'in-progress'
statusLabel: 'Draft in revision, resolving an internal inconsistency before submission'
summary: 'Formalizes what happens when a messaging account''s history splits across two devices with no way to recombine them, and proposes CARTA, a reconstruction contract that quarantines and reports what it can''t safely resolve.'
order: 2
links:
  code: 'https://github.com/stiFFLer-codes/champ-pipeline'
---

## The problem

Temporal Communication Fragmentation occurs when a messaging account's history becomes irreconcilably split across two or more devices with no synchronization bridge. This isn't just a sync bug—it's a structural problem in systems where the ground truth of conversation state is distributed, and the devices can't re-converge.

## The framework

CARTA (Communication Account Reconstruction Triage and Attribution) formalizes what you can and cannot safely reconstruct in this scenario. Instead of guessing or silently dropping messages, CARTA defines a contract:

- Identify what is unambiguously recoverable
- Quarantine what has conflicting interpretations  
- Report both to the user with transparency about what was lost and why

The CHAMP-Pipeline is a zero-dependency reference implementation of this contract.

## Current status

The manuscript draft is currently in revision. We're resolving an internal inconsistency in the formal model before submission—specifically around the ordering guarantees when messages arrive out-of-causal-order from the fragmented branches. This is not a minor point: the consistency model is the entire contribution, and it needs to be airtight.

## What's next

- Resolve the formal-model inconsistency
- Finalize manuscript
- Submit for review
