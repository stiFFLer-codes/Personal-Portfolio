---
company: 'InnoByte Services'
role: 'Data Analyst Intern'
status: 'shipped'
statusLabel: 'Internship, June–July 2025'
summary: 'Performed an end-to-end exploratory data analysis on 128,976 Amazon India sales transactions (120,229 orders) spanning March–June 2022, generating ₹78.59M in gross order value.'
order: 2
---

Built a reusable, generic CSV analysis tool (`analyze.py`) that automatically infers
column roles (date, revenue, quantity, order ID, status, dimensions) from any tabular
sales export and produces a self-contained HTML report with 22 charts and 28 tables — no
hardcoded column names or file dependencies.

**Key contributions:**

- Identified a ₹8.31M revenue overstatement (10.6%) caused by cancelled/returned orders
  being included in naive revenue sums — a reporting gap most dashboards would silently
  propagate.
- Exposed a flawed fulfilment comparison between Amazon (FBA) and Merchant channels:
  Amazon-fulfilled orders terminate at "Shipped" with no delivery/return tracking, making
  the apparent 12.8% vs 22.9% failure-rate comparison invalid. Isolated cancellation rate
  as the only comparable metric (12.8% vs 17.5%).
- Delivered geographic and product insights: top 5 states drive 56% of revenue; T-shirts
  and Shirts account for 77% of revenue; a 16% per-day revenue decline from April to June
  flagged a volume problem requiring further investigation.
- Built a data cleaning pipeline with transparent logging — every normalisation, dropped
  column, and data quality issue is surfaced in the report, not hidden.
- Wrote automated tests covering role detection, override precedence, key normalisation,
  and degradation paths for missing columns.
