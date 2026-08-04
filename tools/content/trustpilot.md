---
description: Trustpilot data toolkit via ScraperSocial — company review listings as clean JSON.
tagline: Company review listings.
example: get_reviews.js <company-domain>
---

## lede

Read public Trustpilot reviews as clean JSON. This Trustpilot API skill has a single endpoint: give it a company URL or handle and it returns their reviews at 1 credit each — the cheapest review source in this repo, and the standard reference for company reputation in Europe.

## when-to-use

- You are assessing a company's reputation before recommending or transacting with them.
- You are monitoring your own or a competitor's review flow.
- A user asks whether a company is trustworthy and you want evidence rather than an impression.

## when-not-to-use

- **You need to reply to reviews or flag them.** Read-only; Trustpilot's Business API covers that.
- **You are pulling every review for a large brand.** Charged per review — scope with `--limit`.
- **You need product-level reviews.** This is company-level. Product reviews live in `amazon-api`, `tiktok-shop-api`, `app-store-api` and `google-play-api`.

## faq

### How do I get Trustpilot reviews as JSON?

`get_reviews.js` with the company URL or handle, 1 credit per review returned.

### Can I get an overall rating?

The review listing carries the rating data Trustpilot publishes alongside each review. There is no separate summary endpoint.

### Is this an official Trustpilot API?

No. ScraperSocial is independent and not affiliated with Trustpilot. It returns publicly available review data only.
