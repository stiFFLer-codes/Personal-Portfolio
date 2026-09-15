---
title: "A coin flip should not look like a red light"
summary: "One AI prediction, three very different people reading it, and the awkward question of who gets to know when the model is unsure."
date: 2026-09-06
tags: ["ai", "explainability", "healthcare", "design"]
order: 1
---

A model I built once split a case almost exactly down the middle. It gave one risk level 0.487 and the next level up 0.499. That is a gap of 0.012. A coin flip with extra steps. And the model was wrong anyway: the true answer was the middle level, not the high one.

Here is what bothered me about it. A doctor can look at 0.487 against 0.499 and shrug. Nearly a tie, they think, let me not overreact. But that same prediction also has to reach the pregnant woman it is actually about. If it lands on her phone as a big red ALARM, she has no way to push back on it. She cannot see the 0.487. She just gets frightened by a coin flip.

So I spent a summer on one small idea: one prediction, three readers who need completely different things from it.

The clinician gets everything. The full messy breakdown, every feature, every number, both close probabilities shown exactly as they are. They can argue with the model, so give them the ammunition.

The community health worker who visits the home gets a short card instead. The two factors that mattered most, in plain words, and one next step. Not a smaller version of the doctor's screen. A lighter one, because her day is already full of forms.

And the mother-to-be gets a colour and a single spoken sentence in Hindi. No percentage, no chart, no reading required. In the population this is built for, roughly a third of rural women have never used the internet, so a chart of feature contributions is not "simple," it is a second wall.

The part I actually care about is who gets the loudest signal. When the model is on a knife edge, I hold the red alarm back from the person least able to question it, and from nobody else. The clinician still sees the near-tie. The mother gets amber instead of red. Amber is never green. It still says go and get checked, soon. A near-tie means the system is not allowed to shout. It does not mean everything is fine, and reading it that way gets it backwards.

I want to be straight about what this is. I ran a critique on my own design and it found five real bugs. One card listed a reading that argued *against* its own prediction, sitting right under a heading that said "here is what we flagged." Embarrassing. All five are fixed now. But nobody in any of those three groups has used this yet, so I am not going to tell you it works. What I will tell you is the question I think more people should be asking: when a model is unsure, what is each person actually entitled to be told?

*The preprint and the code are public if you want to check the claims: [github.com/stiFFLer-codes/three-voices](https://github.com/stiFFLer-codes/three-voices).*
