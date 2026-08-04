---
description: TikTok Shop data toolkit via ScraperSocial — product detail, product reviews, shop catalogues, creator showcases and product search.
tagline: Product detail, reviews, shop catalogues and creator showcases.
example: search.js "phone case"
---

## lede

Read public TikTok Shop data as clean JSON. This TikTok Shop API skill returns a product, its reviews, a shop's catalogue, a creator's showcase, and keyword product search — all at 3 credits. TikTok Shop is where a large share of social commerce now happens, and it is barely covered by conventional e-commerce data tools.

## when-to-use

- You are researching what sells on TikTok Shop in a category.
- You need reviews for a TikTok Shop product to gauge sentiment or quality.
- You are tracking which products a creator promotes in their showcase.
- You are comparing a product's TikTok Shop listing against other marketplaces.

## when-not-to-use

- **You need seller-account data** — orders, fulfilment, payouts. That is account-scoped; TikTok's Shop Partner API covers it.
- **You confused this with the main TikTok skill.** Videos, transcripts and creator stats live in `tiktok-api`; this skill is the commerce surface only.
- **You need guaranteed live stock or price.** Responses may be cached; use `--fresh` when it matters.

## faq

### How do I search TikTok Shop products?

`search.js` with a query returns matching products at 3 credits each.

### How do I get reviews for a product?

`get_product_reviews.js` with the product URL, 3 credits per review returned.

### What is a creator showcase?

`get_user_showcase.js` returns the products a given creator features — useful for tracking affiliate promotion.

### Is this an official TikTok Shop API?

No. ScraperSocial is independent and not affiliated with TikTok or ByteDance. It returns publicly available listing data only.
