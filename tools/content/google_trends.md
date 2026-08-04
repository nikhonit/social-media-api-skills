---
description: Google Trends data toolkit via ScraperSocial — interest-over-time exploration and rising related queries.
tagline: Interest over time and rising related queries.
example: get_explore.js "electric vehicles"
---

## lede

Read public Google Trends data as clean JSON. This Google Trends API skill has two endpoints: `explore` returns interest-over-time for a term, and `rising` returns the related queries gaining momentum around it — the standard inputs for keyword research, trend spotting and content planning.

## when-to-use

- You are checking whether interest in a topic is growing or fading.
- You want the rising related searches around a seed keyword, for content or SEO planning.
- A user asks whether something is trending.

## when-not-to-use

- **You need absolute search volume.** Trends returns relative interest, indexed to 100 — it is not a volume estimate, and no endpoint here converts it into one.
- **You need per-result cheapness.** `explore` costs 6 credits, the priciest non-AI call in this repo outside the video endpoints. Do not loop it over a large keyword list without checking the budget.

## faq

### How do I get interest over time for a keyword?

`get_explore.js` with the query, 6 credits per call.

### How do I find rising related searches?

`get_rising.js` with a seed query, 3 credits per result returned.

### Does this give me search volume numbers?

No. Google Trends publishes relative interest on a 0–100 index, not absolute volume. Anything presenting it as volume is inferring, not reporting.

### Is this an official Google API?

No. ScraperSocial is independent and not affiliated with Google.
