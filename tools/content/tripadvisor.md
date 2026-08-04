---
description: Tripadvisor data toolkit via ScraperSocial — property and attraction search plus full review listings.
tagline: Hotel, restaurant and attraction search with review listings.
---

## lede

Read public Tripadvisor data as clean JSON. This Tripadvisor API skill does two things: search for hotels, restaurants and attractions, and pull the reviews for one. Review text is the valuable part — it is the most detailed public record of what guests actually experienced at a property.

## when-to-use

- You are researching a hotel, restaurant or attraction and want its reviews summarised.
- You are benchmarking a property against competitors on rating and review themes.
- A user pastes a Tripadvisor link and asks whether the place is any good.

## when-not-to-use

- **You need live availability or pricing.** Not covered — this is listings and reviews, not a booking API.
- **You manage the property.** Tripadvisor's own management centre gives owners more.
- **You are pulling every review for a large hotel.** Reviews are charged per item; scope with `--limit`.

## faq

### How do I get Tripadvisor reviews as JSON?

`get_reviews.js` with the property URL, 3 credits per review returned. Use `--limit` and `--cursor` to page.

### How do I find a property without its URL?

`search.js` with a query returns matching properties at 3 credits each.

### Does this include hotel prices or availability?

No. Listings and reviews only.

### Is this an official Tripadvisor API?

No. ScraperSocial is independent and not affiliated with Tripadvisor. It returns publicly available data only.
