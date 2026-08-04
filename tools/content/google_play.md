---
description: Google Play data toolkit via ScraperSocial — Android app metadata, user reviews, keyword search and store categories.
tagline: Android app metadata, reviews, keyword search and categories.
example: app_search.js "habit tracker"
---

## lede

Read public Google Play data as clean JSON. This Google Play API skill returns Android app metadata, user reviews, keyword search results and the store's category list — the Android half of app store optimisation work, at 1 credit per call.

## when-to-use

- You are doing ASO for an Android app and need listing data or rankings for a keyword.
- You need Play Store reviews to track sentiment after a release.
- A user pastes a Play Store link and asks what the app is or how it is rated.

## when-not-to-use

- **You need Play Console data** — installs, revenue, crash rates, or anything tied to a developer account. This reads the public storefront only.
- **You need iOS data.** Use the `app-store-api` skill; app identifiers differ between the two stores.

## faq

### How do I get Google Play reviews as JSON?

`get_app_reviews.js` with the app handle, 1 credit per review returned. Page with `--cursor`.

### How do I find an app by keyword?

`app_search.js` with a query returns matching apps and their handles, which you pass to `get_app_info.js`.

### Is this an official Google Play API?

No. ScraperSocial is independent and not affiliated with Google. It returns publicly available storefront data only.
