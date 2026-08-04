---
description: Google Finance data toolkit via ScraperSocial — live quotes, historical price candles and instrument search.
tagline: Quotes, historical price history and instrument search.
---

## lede

Read public Google Finance data as clean JSON. This Google Finance API skill returns a current quote for an instrument, historical price candles, and search across tickers — at 1 credit per call, which makes it practical to poll a watchlist.

## when-to-use

- A user asks what a stock, index or currency pair is trading at.
- You need historical candles to chart or compute a return.
- You need to resolve a company name to a ticker symbol.

## when-not-to-use

- **You are making trading or investment decisions on this data.** It is a convenience read of a public page, not an exchange feed. It is not licensed market data, may be delayed, and may be served from cache.
- **You need tick-level or real-time data.** Use a market data vendor.
- **You need fundamentals, filings or analyst estimates.** Not covered here.

## faq

### How do I get a stock quote as JSON?

`get_quote.js` with the instrument handle, for 1 credit. Use `search.js` first if you only know the company name.

### Can I get historical prices?

Yes. `get_history.js` returns candles, charged 1 credit per candle returned, so set `--limit` deliberately.

### Is this real-time data?

No. Treat it as indicative. Responses may be cached; `--fresh` bypasses the cache at the same cost, but the underlying page is not an exchange feed.

### Is this an official Google API?

No. ScraperSocial is independent and not affiliated with Google.
