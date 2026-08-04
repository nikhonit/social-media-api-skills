---
description: Google data toolkit via ScraperSocial — search results, Business Profile info, business reviews and updates, and company ad listings.
tagline: Search results, Business Profile info, reviews and company ads.
---

## lede

Read public Google results as clean JSON. This Google API skill returns search result pages, Google Business Profile details, the reviews and updates attached to a business, and the ads a company is running — the core inputs for local SEO work, reputation monitoring and competitive research.

## when-to-use

- You need SERP results for a query, as structured data rather than HTML.
- You are monitoring a business's Google reviews or its profile details.
- You want to see what ads a company is running.
- You are doing local SEO and need what Google publishes about a listing.

## when-not-to-use

- **You need Google Search Console or Analytics data** for a property you own. Those are account-scoped; use Google's own APIs.
- **You need Maps places data.** Use the `google-maps-api` skill — `place`, `photos` and `contacts` live there.
- **You need news results.** Use `google-news-api`. Shopping results are in `google-shopping-api`, and interest-over-time is in `google-trends-api`.
- **You are firing searches speculatively.** Each result costs credits.

## faq

### How do I get Google search results as JSON?

`search.js` with a query returns results at 2 credits per result. Use `--limit` to keep volume down.

### Can I monitor Google reviews for a business?

Yes. `get_business_reviews.js` takes the business URL or handle and returns reviews at 2 credits each. `get_business_info.js` returns the profile itself.

### Is this an official Google API?

No. ScraperSocial is independent and not affiliated with Google. It returns publicly available data only.

### Which skill do I use for Maps, News, Shopping or Trends?

Each is a separate skill in this repo, because each is a separate set of endpoints: `google-maps-api`, `google-news-api`, `google-shopping-api`, `google-trends-api`.
