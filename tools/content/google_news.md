---
description: Google News data toolkit via ScraperSocial — keyword search across news headlines and sources as clean JSON.
tagline: Keyword search across news headlines and sources.
---

## lede

Read public Google News results as clean JSON. This Google News API skill is a single endpoint: search the news index by keyword and get back headlines, sources and links at 1 credit per article — a cheap way to give an agent current-events awareness or to monitor coverage of a company.

## when-to-use

- A user asks what the news says about a topic, company or person.
- You are monitoring press coverage for a brand.
- You need recent headlines as context before answering a time-sensitive question.

## when-not-to-use

- **You need full article text.** This returns headlines and links, not article bodies.
- **You need a persistent alert.** This is a point query; scheduling and deduplication are yours to build.
- **The user's question is not time-sensitive.** Do not spend credits on background you do not need.

## faq

### How do I search news as JSON?

`search.js` with a query, 1 credit per article returned. Set `--limit` to keep volume predictable.

### Does it return the full article?

No — headline, source and link. Fetch the article yourself if you need the body.

### Is this an official Google News API?

No. ScraperSocial is independent and not affiliated with Google. It returns publicly available data only.
