---
description: Google Shopping data toolkit via ScraperSocial — product search across merchants with pricing as clean JSON.
tagline: Product search across merchants, with pricing.
example: product_search.js "mechanical keyboard"
---

## lede

Read public Google Shopping results as clean JSON. This Google Shopping API skill is a single endpoint: search products by keyword and get back listings with merchants and prices, at 3 credits per product — useful for price comparison, market research and competitive monitoring.

## when-to-use

- You are comparing prices for a product across merchants.
- You need to see how a product is listed and priced in the shopping index.
- A user asks where to buy something and at what price.

## when-not-to-use

- **You need a single merchant's catalogue.** Go to that merchant — `amazon-api` and `tiktok-shop-api` cover theirs.
- **You need guaranteed live prices.** Results may be cached and merchant prices move; pass `--fresh` when accuracy matters more than speed.
- **You need Merchant Center data for your own store.** That is account-scoped; use Google's own API.

## faq

### How do I search Google Shopping as JSON?

`product_search.js` with a query, 3 credits per product returned. Use `--limit` to bound the cost.

### Are the prices live?

They reflect what the shopping index published when the page was read, and may be cached. Use `--fresh` to bypass the cache at the same credit cost.

### Is this an official Google API?

No. ScraperSocial is independent and not affiliated with Google. It returns publicly available data only.
