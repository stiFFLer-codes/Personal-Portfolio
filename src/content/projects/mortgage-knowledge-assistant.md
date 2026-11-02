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

<figure class="arch">
<svg viewBox="0 0 352 448" font-size="11" role="img" aria-labelledby="arch-title arch-desc">
<title id="arch-title">Architecture of the mortgage knowledge assistant</title>
<desc id="arch-desc">The client intranet and website embed a React app with a pdf.js viewer. The app sends questions to AWS Lambda, which calls Amazon Bedrock for agentic retrieval with reranking over a knowledge base of guideline PDFs in Amazon S3, and keeps chat history in Amazon DynamoDB. If nothing relevant is found, a fixed reply sends the user to a human underwriter; otherwise the answer streams back with citations, and the viewer opens the cited PDF from S3.</desc>
<defs><marker id="arch-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path class="arch-head" d="M0 0L8 4L0 8z"/></marker></defs>
<rect class="arch-box" x="16" y="1" width="156" height="32" rx="3"/>
<text class="arch-text" x="94" y="21" text-anchor="middle">Client intranet</text>
<rect class="arch-box" x="196" y="1" width="155" height="32" rx="3"/>
<text class="arch-text" x="273.5" y="21" text-anchor="middle">Client website</text>
<path class="arch-line" d="M94 33V56" marker-end="url(#arch-arrow)"/>
<path class="arch-line" d="M274 33V56" marker-end="url(#arch-arrow)"/>
<rect class="arch-box" x="16" y="58" width="335" height="100" rx="3"/>
<text class="arch-text arch-strong" x="28" y="78">Embedded React app</text>
<rect class="arch-inner" x="28" y="90" width="311" height="56" rx="3"/>
<text class="arch-text" x="40" y="113">pdf.js viewer: opens the cited page,</text>
<text class="arch-text" x="40" y="130">highlights the supporting sentences</text>
<path class="arch-line" d="M110 158V194" marker-end="url(#arch-arrow)"/>
<text class="arch-label" x="116" y="181" font-size="10">question</text>
<path class="arch-line" d="M250 195V160" marker-end="url(#arch-arrow)"/>
<text class="arch-label" x="256" y="174" font-size="10">streamed answer</text>
<text class="arch-label" x="256" y="187" font-size="10">with citations</text>
<rect class="arch-box" x="76" y="196" width="216" height="32" rx="3"/>
<text class="arch-text" x="184" y="216" text-anchor="middle">AWS Lambda (API and auth)</text>
<path class="arch-line" d="M120 228V256" marker-end="url(#arch-arrow)"/>
<path class="arch-line" d="M276 228V256" marker-end="url(#arch-arrow)"/>
<rect class="arch-box" x="16" y="258" width="208" height="80" rx="3"/>
<text class="arch-text arch-strong" x="28" y="277">Amazon Bedrock</text>
<text class="arch-text" x="28" y="294">agentic retrieval with</text>
<text class="arch-text" x="28" y="309">reranking over a knowledge</text>
<text class="arch-text" x="28" y="324">base, filtered per document</text>
<rect class="arch-box" x="240" y="258" width="111" height="48" rx="3"/>
<text class="arch-text arch-strong" x="295.5" y="278" text-anchor="middle">Amazon DynamoDB</text>
<text class="arch-text" x="295.5" y="295" text-anchor="middle">chat history</text>
<path class="arch-line" d="M90 382V340" marker-end="url(#arch-arrow)"/>
<text class="arch-label" x="96" y="365" font-size="10">reads</text>
<path class="arch-line" d="M212 338V380" marker-end="url(#arch-arrow)"/>
<text class="arch-label" x="218" y="356" font-size="10">nothing relevant</text>
<text class="arch-label" x="218" y="369" font-size="10">found</text>
<rect class="arch-box" x="16" y="382" width="150" height="46" rx="3"/>
<text class="arch-text arch-strong" x="28" y="401">Amazon S3:</text>
<text class="arch-text" x="28" y="418">guideline PDFs</text>
<rect class="arch-box arch-fallback" x="196" y="382" width="155" height="60" rx="3"/>
<text class="arch-text arch-strong" x="208" y="401">fixed reply:</text>
<text class="arch-text" x="208" y="416">check with a human</text>
<text class="arch-text" x="208" y="431">underwriter</text>
<path class="arch-line arch-dashed" d="M16 405H6V118H26" marker-end="url(#arch-arrow)"/>
</svg>
<figcaption>
<ol class="arch-steps">
<li>The client intranet and the client website both embed the React app.</li>
<li>The React app sends the question to AWS Lambda (API and auth).</li>
<li>Lambda calls Amazon Bedrock: agentic retrieval with reranking over a knowledge base, filtered per document.</li>
<li>Bedrock reads the guideline PDFs from Amazon S3.</li>
<li>If nothing relevant is found, the reply is fixed: check with a human underwriter.</li>
<li>Otherwise the answer streams back to the React app with citations.</li>
<li>The pdf.js viewer loads the cited PDF from S3, opens the cited page and highlights the supporting sentences.</li>
<li>Lambda keeps chat history in Amazon DynamoDB.</li>
</ol>
</figcaption>
</figure>

## Citations a reader can check

Every answer carries inline citations. Clicking a citation opens the cited PDF at the right page and highlights the supporting sentences. The retrieval API returns no page numbers, so the location is reconstructed in the browser. When a sentence can't be matched, the viewer falls back to the page instead of highlighting text that doesn't support the answer.

## When there is no answer

Retrieval runs as Bedrock agentic retrieval with reranking over a shared knowledge base, filtered per document. When retrieval finds nothing relevant, the assistant does not generate a guess. It returns a fixed reply telling the user to check with a human underwriter.

## What I'd change

- **Build the evaluation set before the features.** A golden set of real questions over the actual guideline PDFs gives an accuracy number and makes model swaps safe. The model provider has already retired one model the system depended on.
- **Make "can't answer" a measured signal.** The fallback fires when retrieval cites nothing. That can't catch a weak answer that still cites something. A relevance threshold on the reranker scores, tuned against the evaluation set, would.
- **Design access control first.** The project started with a demo user switcher and later needed proper server-side authentication and separate access for the two sites. Hiding a tab in React isn't security; enforcement belongs on the server from the start.
