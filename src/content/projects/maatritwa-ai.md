---
title: 'Maatritwa AI'
status: 'in-progress'
statusLabel: 'Methodology locked, model training not started'
summary: 'A preeclampsia risk system for rural India, built around a three-tier explainability layer for clinicians, ASHA workers, and mothers-to-be.'
stack: ['React 19', 'FastAPI', 'Supabase', 'SHAP']
order: 1
---

## The problem

Hypertensive disorders like preeclampsia are among the leading causes of maternal death, and they are detectable early if someone is actually watching for the signs. In rural India, the person most likely to be watching is an ASHA worker, a community health worker who is often already managing dozens of households through a mix of paper registers and overlapping mobile apps. A tool built for this setting has to work inside that reality, not around it.

## What it does

Maatritwa AI takes a small set of signals an ASHA worker can collect in the field, with no lab dependency, and produces an early preeclampsia risk read. The modeling approach compares Logistic Regression, Random Forest, and XGBoost, using SHAP for attribution, so a prediction comes with a reason attached rather than a bare number.

The part I care about most is the explainability layer. A single risk output means something different to a clinician, to an ASHA worker, and to the pregnant woman herself, so the system explains itself three ways:

- **Clinician** — a full SHAP-based triage dashboard
- **ASHA worker** — a simplified, actionable recommendation
- **Mother-to-be** — a spoken explanation, in Hindi, that does not require reading

## Stack

React 19 on the frontend, FastAPI on the backend, Supabase for data, SHAP for the explainability layer.

## Where it actually stands

I would rather be precise than impressive here. The evaluation methodology is locked: stratified k-fold cross-validation, SMOTE applied only within training folds, binary risk as the primary target with three-class severity as a secondary, more exploratory target. But the model has not been trained yet, so there are no accuracy or recall numbers to report. The explainability evaluation for each of the three tiers is designed but not yet run.

The research side of this work is being written up separately as a paper (working title: MAMTA). That is a distinct piece of work from the deployed system, with its own open items: ethics approval, a co-author, and a target journal. This page gets updated as those move, not before.

## What's next

- Train and evaluate the three models against the locked methodology
- Run the clinician-tier and ASHA-tier explainability evaluation
- Get the MAMTA paper to at least an arXiv or medRxiv preprint
