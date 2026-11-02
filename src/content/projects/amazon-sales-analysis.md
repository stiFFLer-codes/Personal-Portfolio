---
title: 'Amazon India sales analysis'
context: 'internship · InnoByte Services'
status: 'shipped'
stage: 'complete'
statusLabel: 'Completed during a one-month internship, June to July 2025'
summary: 'An exploratory analysis of an Amazon India sales report: 128,976 line items across 120,229 orders, March to June 2022.'
stack: ['Python', 'pandas', 'matplotlib']
order: 4
links:
  repo: 'https://github.com/stiFFLer-codes/amazon-sales-analysis'
# TODO(markie): finding 2 and finding 3 for "What it found". Candidates, with
# sources in INSIGHTS.md, are in the phase 12 report. Kept here rather than as
# list items in the body, where they would render on the page.
---

## The brief

A one-month internship task: analyse an Amazon India sales report covering March to June 2022 and turn it into recommendations. The brief set six areas: sales trends, products, fulfilment, customer segments, geography and business actions.

## Cleaning decisions

- Two columns were entirely empty and were dropped.
- Amount is blank on 7,800 rows (6.0%), mostly cancellations. Those rows still count as orders but stay out of value totals.
- State names arrived in 69 spellings for about 36 states. Trimming and upper-casing brought that to 47. I left the remaining genuine misspellings unmerged, so fuzzy matching couldn't join two different places.
- A repeated order ID is a line item, not a duplicate: 128,976 line items across 120,229 orders.

## What it found

- Gross order value (₹78.59M) overstates realised revenue (₹70.28M) by 10.6% once cancelled, returned and failed lines are taken out.

## A note on duplicates

Revisiting this analysis in November 2026, I found 959 rows that are exact copies of another row. The file has no product-level identifier, so it can't tell two identical units in one order from an export duplicate. I kept the rows and report every figure as it stands. Removing them would lower the totals by about 0.5 to 0.7 percent; the check is in the repository.
