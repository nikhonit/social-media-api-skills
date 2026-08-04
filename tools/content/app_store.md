---
description: Apple App Store data toolkit via ScraperSocial — app metadata, user reviews, keyword search, category charts and storefront locations.
tagline: App metadata, reviews, keyword search and category charts.
---

## lede

Read public Apple App Store data as clean JSON. This App Store API skill returns app metadata, user reviews, keyword search results, ranked category lists and the storefronts an app is available in — the raw material for app store optimisation, competitor tracking and review analysis. Every endpoint here costs 1 credit, which makes it cheap to poll regularly.

## when-to-use

- You are doing ASO work: checking how an app ranks for a keyword, or what its listing says.
- You need user reviews for an app to summarise sentiment or track a regression after a release.
- You are building a competitor watchlist and want category charts over time.
- A user pastes an App Store link and asks what the app is or how it is rated.

## when-not-to-use

- **You need App Store Connect data** — sales, installs, crash reports or anything tied to a developer account. This reads the public storefront only.
- **You need Google Play data.** Use the `google-play-api` skill; the two stores are separate endpoints with different app identifiers.
- **You want download or revenue estimates.** The API returns what the storefront publishes; it does not model private metrics.

## faq

### How do I get App Store reviews as JSON?

`get_app_reviews.js` takes the app handle and returns reviews at 1 credit per review. Use `--limit` to control volume and `--cursor` to page.

### How do I find an app without knowing its ID?

Use `app_search.js` with a keyword, or `get_app_list.js` for ranked category lists. Both return handles you can pass to `get_app_info.js`.

### Does this cover every country storefront?

`get_locations.js` returns the storefronts the API supports. App availability and rankings differ by storefront.

### Is this an official Apple API?

No. ScraperSocial is independent and not affiliated with Apple. It returns publicly available App Store data only.
