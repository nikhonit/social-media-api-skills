---
description: One skill for ScraperSocial's public social media and web data API — discover every documented endpoint across 33 sources (social networks plus Amazon, Google, app stores, review sites and prediction markets) and call any of them by path. Personal-contact endpoints are excluded.
tagline: Discover and call any documented endpoint across every source, social and web.
example: list_endpoints.js --search transcript
---

## lede

One skill that reaches every source ScraperSocial covers. Most are social networks (TikTok, Instagram, LinkedIn, YouTube, X, Reddit, Threads, Facebook and more); the catalogue also includes public web data that is not social media: Amazon products and reviews, Google Search, Maps, News, Trends, Finance and Shopping, the App Store and Google Play, Tripadvisor, Trustpilot and Polymarket. Instead of installing a skill per platform, this one lists the whole documented catalogue and calls any entry by path. Endpoints that return a person's contact details are deliberately not callable from here; see Personal data below.

`list_endpoints.js` reads a bundled snapshot, so discovery is free and works without an API key. Only `call_endpoint.js` spends credits.

## when-to-use

- You do not know which platform a request will need until you see it.
- You want one tool in the agent's context rather than 33.
- You need an endpoint that has no dedicated script in its platform skill.
- You are exploring what the API can do before committing to a specific skill.

## when-not-to-use

- **You already know the platform.** The dedicated skill has argument validation, section flags and platform-specific guidance on what not to do. Prefer `tiktok-api` over this for TikTok work.
- **You want guidance on cost or privacy for a specific platform.** That lives in the per-platform skill, where it can be specific.
- **You are looping over many endpoints to see what sticks.** Every call costs credits. Use `list_endpoints.js` — which is free — to decide first.

## faq

### How do I find the right endpoint?

`list_endpoints.js --search transcript` filters by keyword, `--platform tiktok` filters by platform. It reads a local snapshot, so it costs nothing and needs no key.

### How do I call an endpoint?

`call_endpoint.js /v1/github/profile --handle torvalds`. Any flag after the path is passed through as a query parameter, so `--limit`, `--cursor`, `--fields`, `--format` and `--fresh` all work.

### Is the bundled endpoint list always current?

It is a snapshot generated from the live OpenAPI spec when the repo was last built. `call_endpoint.js` only accepts paths that are in that snapshot, so an endpoint added to the API after the last build is refused until the repo is rebuilt. That is intentional: the callable surface is exactly what this file documents.

### Can this skill fetch someone's email or phone number?

No. The two endpoints that return personal contact details (`/v1/linkedin/profile-contact` and `/v1/google_maps/contacts`) are excluded from `call_endpoint.js`, and the `include_email` parameter is stripped before any request is sent. If you have a lawful basis to process a specific person's contact data, use the `linkedin-api` skill, which documents the requirements and the cost; this skill will not do it.

### Should I use this or the per-platform skills?

Per-platform when you know the platform — they carry the guardrails. This one when you do not, or when you need an endpoint no script wraps.
