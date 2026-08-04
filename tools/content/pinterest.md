---
description: Pinterest data toolkit via ScraperSocial — pin details, keyword search and save counts for any URL.
tagline: Pin details, keyword search and per-URL save counts.
---

## lede

Read public Pinterest data as clean JSON. This Pinterest API skill returns a pin by URL, searches pins by keyword, and — the genuinely useful one — reports how many times any URL has been saved to Pinterest. That last endpoint costs 1 credit and is a real distribution signal for a page you publish.

## when-to-use

- You want to know how much traction one of your URLs has on Pinterest.
- You are researching visual trends or how a product is being pinned.
- A user pastes a pin link and wants its details.

## when-not-to-use

- **You need to create pins or boards.** Read-only; Pinterest's own API handles writes.
- **You need board-level or account analytics.** Only pins, search and URL save counts are covered.

## faq

### How do I check how often a URL was saved to Pinterest?

`get_url_stats.js` with the URL returns its save count for 1 credit. It works for any URL, not just ones you own.

### How do I search Pinterest?

`search.js` with a query, 2 credits per pin returned.

### Is this an official Pinterest API?

No. ScraperSocial is independent and not affiliated with Pinterest. It returns publicly available data only.
