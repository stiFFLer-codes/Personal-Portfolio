---
title: 'Maatritwa AI'
status: 'in-progress'
statusLabel: 'ASHA and doctor views fully wired; mother view is a documented UI mock'
summary: "A three-sided referral system for rural antenatal care in India, built for a national innovation demo: ASHA community health workers log a mother's vitals and get a risk score, doctors see the case as a referral with full history and lab data, and the mother gets a simplified, Hindi-language view of her own risk."
stack: ['React', 'Vite', 'FastAPI', 'Supabase']
order: 1
links:
  repo: 'https://github.com/stiFFLer-codes/Maatritwa-AI'
  live: 'https://stiffler-codes.github.io/Maatritwa-AI/'
---

## The design problem

The interesting design problem — and the one that turned into a research paper — was
what to do when the model's prediction sits right on the boundary between risk levels: a
doctor can read a 0.487 vs 0.499 split and shrug, but a mother handed a red alert can't.
The system solves this by making uncertainty part of the UI itself — derating an
ambiguous "red" down to "amber" specifically on the mother's screen, never hiding real
risk, just refusing to overstate a coin flip as certainty.

## Where it actually stands

Built with React/Vite on the frontend and FastAPI + Supabase on the backend, with a
rule-based fallback so the whole thing runs standalone with no ML artifacts required.
Two of three interfaces — ASHA and doctor — are fully wired end-to-end; the
mother-facing view remains a UI mock, documented as such. That's a deliberate, honest
scope cut, not a hidden gap.

The hardest design question this prototype raised — how to communicate model
uncertainty to a non-clinical audience without either alarming or misleading them —
became a separate research paper, [Three Voices](/research/three-voices), built as its
own rigorous exercise on a public dataset rather than this system's real data.
