---
description: Amazon data toolkit via ScraperSocial — product detail, product search, customer reviews and seller listings as clean JSON.
tagline: Product detail, product search, reviews and seller listings.
example: product_search.js "wireless earbuds"
---

## lede

Read public Amazon listing data as clean JSON. This Amazon API skill fetches a product page by URL, searches the catalog by keyword, pulls customer reviews, and lists the sellers offering a given item — useful for price tracking, competitive research, and review-mining without maintaining a scraper against one of the most defended sites on the web.

## when-to-use

- A user pastes an Amazon product URL and wants the title, price, rating or specifications.
- You are comparing how a product is priced or positioned across sellers.
- You need the review text for a product to summarise sentiment or pull out recurring complaints.
- You want to find products matching a keyword and rank them.

## when-not-to-use

- **You need order, account or Seller Central data.** This reads public listing pages only. Use Amazon's own SP-API for anything tied to an account.
- **You need a live price guarantee.** Prices change constantly and responses may be served from cache. Pass `--fresh` when the exact current price matters.
- **You want a plain keyword search endpoint called `search`.** Amazon's search capability here is `product-search`; there is no `/v1/amazon/search`.
- **A product link appears in passing** with no question attached. Calls cost credits.

## faq

### How do I get Amazon product data as JSON?

Run `get_product.js` with the product URL. It returns the listing as structured JSON for 3 credits. For keyword lookups use `product_search.js` instead.

### Can I get Amazon reviews through the API?

Yes. `get_reviews.js` takes a product URL and returns reviews, charged 3 credits per review returned. Cap the volume with `--limit`.

### Is this an official Amazon API?

No. ScraperSocial is independent and not affiliated with Amazon. It returns publicly available listing data only.

### Why is my price slightly stale?

Responses can come from cache, which is what makes them fast. Add `--fresh` to bypass the cache at the same credit cost.
