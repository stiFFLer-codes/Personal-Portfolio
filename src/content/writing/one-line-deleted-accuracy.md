---
title: "One line of code deleted a third of my accuracy"
summary: "A public dataset, 561 duplicate rows, and the boring reason a model looks smarter in a notebook than it has any right to be."
date: 2026-09-06
tags: ["machine-learning", "data", "honesty"]
order: 2
---

There is a public dataset that shows up in a lot of maternal-health machine-learning papers. I used it too. It has just over a thousand rows. When I actually opened it and looked, 561 of them were exact duplicates. Same six numbers, same label, copied again and again.

Why that matters takes ten seconds to explain. When you train a model you split the data in two: some rows to learn from, some held back to test on later. If an identical row sits in both piles, the model gets tested on something it has already memorised. It looks brilliant on the test. It just happens to have seen the answer key.

So I ran the exact same model twice. Once with the duplicates left in, once with them taken out. I changed nothing else.

With duplicates in, macro-recall came out at 0.859. With duplicates removed, 0.580.

Same code. Same model. Same cross-validation. One call to `drop_duplicates()`, and roughly a third of the "accuracy" turned out to be the model recognising rows it had seen before.

This is the gap nobody really warns you about, the one between a model that works in a notebook and a model that works for real. It is almost never some exotic architecture problem. It is boring hygiene. Did data leak across the split. Did you look at the raw rows before you trusted the score. The unglamorous half hour that decides whether the impressive number means anything.

I reported the 0.580 as my headline, on purpose. It is the ugly number. It is also the honest one, and I would take an honest 0.580 over a shiny 0.859 that stops being true the second somebody checks my work.

One thing I will not claim: I did not "discover" these duplicates like some detective. `drop_duplicates` is one line. Anyone would find them. What actually surprised me is that the published papers on this dataset mostly report the higher band and do not mention handling duplicates at all. The problem was sitting in plain sight, in a function name every beginner knows. Sometimes that is exactly where these things hide.
