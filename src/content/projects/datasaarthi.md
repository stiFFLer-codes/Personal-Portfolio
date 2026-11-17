---
title: 'DataSaarthi'
status: 'shipped'
stage: 'complete'
context: 'independent'
statusLabel: 'Complete'
summary: 'An AI-assisted data analysis platform: upload a CSV, automatically identify patterns and anomalies, generate visual insights, compare datasets, and interact with the data through an AI-powered chat interface.'
stack: ['React', 'TypeScript', 'Vite', 'FastAPI', 'Python', 'Supabase', 'Groq']
order: 3
links:
  repo: 'https://github.com/stiFFLer-codes/DataSaarthi'
kind: 'platform'
# The ledger below was drafted by Fable from sentences already in this repo.
# Notes in double quotes that read like Maitreya are his, verbatim. Rewrite freely.
ledger:
  - claim: 'The code is public.'
    state: checkable
    links:
      - { label: 'repository', href: 'https://github.com/stiFFLer-codes/DataSaarthi' }
  - claim: 'Where DataSaarthi falls short.'
    state: open
    note: 'Every other page here says what the work couldn’t settle. This one doesn’t yet.'
    todo: 'one or two honest lines on what DataSaarthi gets wrong or leaves undone.'
---

## Stack and history

Built with React, TypeScript, and Vite on the frontend and FastAPI + Python on the
backend, with Supabase providing authentication and persistent data storage and
Groq-powered AI supporting the analysis. The project evolved from an earlier team-built
prototype into a more structured application with persistent reports, authentication,
automated analysis, visualizations, exports, and a tested backend/frontend
architecture.
