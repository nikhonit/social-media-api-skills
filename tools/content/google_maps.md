---
description: Google Maps data toolkit via ScraperSocial — place details, place search, photos and business contact discovery.
tagline: Place details, place search, photos and contact discovery.
---

## lede

Read public Google Maps data as clean JSON. This Google Maps API skill returns place details from a Maps URL, searches places by query, pulls the photos attached to a place, and extracts business contact details — the building blocks for local lead lists, store locators and location research.

## when-to-use

- A user pastes a Google Maps link and wants the place's details.
- You are building a local prospect list for a category and area.
- You need contact details for businesses matching a search.
- You want the photos associated with a location.

## when-not-to-use

- **You need routing, geocoding or a map widget.** Google's Places and Directions APIs do those properly, with a licence that permits display.
- **You are compiling personal data.** `get_contacts.js` returns business contact details; treat the output under GDPR and local law, and do not use it for unsolicited bulk contact where that is restricted.
- **You need reviews.** Business reviews live in the `google-api` skill, not this one.

## faq

### How do I get place details from a Google Maps URL?

`get_place.js` with the Maps URL returns the place as structured JSON, for 3 credits.

### How do I find places by keyword?

`search.js` with a query, 2 credits per result returned. Use `--limit` to control cost.

### What does the contacts endpoint return?

`get_contacts.js` takes a query and returns business contact details at 3 credits per result. It is business data, not personal profiles — use it accordingly.

### Is this an official Google Maps API?

No. ScraperSocial is independent and not affiliated with Google. If you need to display a map or compute routes, use Google's own Platform APIs.
