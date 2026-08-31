---
title: 'Historical Consistency Predicts Mechanism Accuracy, Not Mechanism Ranking'
status: 'in-progress'
statusLabel: 'Draft finalized, arXiv endorsement secured, submission pending'
summary: 'A pre-registered 240-condition synthetic experiment testing whether historical decision consistency predicts which of two classification mechanisms should be chosen.'
order: 1
links:
  code: 'https://github.com/stiFFLer-codes/ADS-Cascade'
---

## The question

When you have two candidate decision-making mechanisms—exact-match rules vs. fuzzy retrieval, for example—and you want to know which one should take the lead, does the historical consistency of decisions tell you anything about which mechanism to trust?

## The experiment

Pre-registered 240-condition synthetic experiment: each condition varies the lexical noise, decision diversity, and mechanism behavior independently. For each condition, we train both mechanisms on the same labeled historical decisions, then ask: does the one with higher historical consistency accuracy also win head-to-head on new data?

## The finding

Consistency strongly predicts each mechanism's own accuracy—if it's been right before, it stays right. But mechanism ranking is governed by something else entirely: lexical noise, a variable the consistency signal can't see. Consistency is not a cross-mechanism predictor.

This has real implications for systems that need to choose between different decision strategies at runtime.

## Status

The manuscript has been finalized and we've secured arXiv endorsement. Submission is pending final logistics.

## What's next

- Final revision pass
- Submit to arXiv  
- Sync ORCID, Google Scholar, and ResearchGate once live
