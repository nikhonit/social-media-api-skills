---
description: Polymarket data toolkit via ScraperSocial — prediction market listings and current odds as clean JSON.
tagline: Prediction market listings and current odds.
example: get_markets.js "election"
---

## lede

Read public Polymarket data as clean JSON. This Polymarket API skill has a single endpoint: search markets by query and get back the listings with their current odds, at 1 credit per market. Prediction market prices are a genuinely useful forecast signal, and this is a cheap way to put them in front of an agent.

## when-to-use

- A user asks what the market thinks the odds of an event are.
- You want a forecast signal to compare against commentary or polling.
- You are tracking how odds on a question move over time.

## when-not-to-use

- **You are placing trades.** This is read-only and is not trading infrastructure. Nothing here executes orders, and the odds may be cached rather than live.
- **You are presenting odds as fact.** They are a market price, not a prediction from an authority — say so when you surface them.
- **You need order book depth or historical series.** One endpoint, current listings only.

## faq

### How do I get prediction market odds?

`get_markets.js` with a query returns matching markets and their odds, 1 credit per market.

### Are the odds live?

They may be served from cache. Pass `--fresh` to bypass it at the same credit cost, but treat the result as indicative rather than an execution price.

### Can I trade through this?

No. Read-only. Use Polymarket directly for anything transactional.

### Is this an official Polymarket API?

No. ScraperSocial is independent and not affiliated with Polymarket.
