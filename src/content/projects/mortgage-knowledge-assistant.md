---
title: 'AI knowledge assistant for a mortgage lender'
context: 'client work · Crest Infosystems'
status: 'shipped'
stage: 'in production'
statusLabel: 'In production for the client; built in a Crest Infosystems team'
summary: "A production Q&A assistant over a mortgage lender's guideline PDFs. Every answer links to the sentence it came from, and questions it can't answer go to a human underwriter."
stack: ['React', 'TypeScript', 'pdf.js', 'AWS Bedrock', 'AWS Lambda', 'Amazon S3', 'Amazon DynamoDB']
order: 1
sourcesNote: 'Client work. The source code is private.'
---

## The problem

A mortgage lender's guidelines and product matrices live in long PDFs. The client wanted a question-and-answer assistant over those documents that shows exactly where every answer comes from, embedded in its intranet and its public website.

## What I built

I built the user-facing side: the chat interface, streamed answers, the document-scope picker, chat history and staged loading states. I also wrote the early retrieval and S3 upload services. The work was part of a Crest Infosystems team, in a codebase with a 229-test Vitest suite.

## Citations a reader can check

Every answer carries inline citations. Clicking a citation opens the cited PDF at the right page and highlights the supporting sentences. The retrieval API returns no page numbers, so the location is reconstructed in the browser. When a sentence can't be matched, the viewer falls back to the page instead of highlighting text that doesn't support the answer.

## When there is no answer

Retrieval runs as Bedrock agentic retrieval with reranking over a shared knowledge base, filtered per document. When retrieval finds nothing relevant, the assistant does not generate a guess. It returns a fixed reply telling the user to check with a human underwriter.

## What I'd change

- **Build the evaluation set before the features.** A golden set of real questions over the actual guideline PDFs gives an accuracy number and makes model swaps safe. The model provider has already retired one model the system depended on.
- **Make "can't answer" a measured signal.** The fallback fires when retrieval cites nothing. That can't catch a weak answer that still cites something. A relevance threshold on the reranker scores, tuned against the evaluation set, would.
- **Design access control first.** The project started with a demo user switcher and later needed proper server-side authentication and separate access for the two sites. Hiding a tab in React isn't security; enforcement belongs on the server from the start.
