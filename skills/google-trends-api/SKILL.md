---
name: google-trends-api
version: 1.0.1
description: Google Trends data toolkit via ScraperSocial — interest-over-time exploration and rising related queries.
license: MIT-0
author: ScraperSocial
homepage: https://scrapersocial.com
repository: https://github.com/nikhonit/social-media-api-skills
tags:
  - google-trends
  - trends
  - keyword-research
  - social-media
  - api
  - mcp
metadata:
  openclaw:
    primaryEnv: SCRAPERSOCIAL_KEY
    homepage: https://scrapersocial.com
    requires:
      env:
        - SCRAPERSOCIAL_KEY
---

# Google Trends API skill

Read public Google Trends data as clean JSON. This Google Trends API skill has two endpoints: `explore` returns interest-over-time for a term, and `rising` returns the related queries gaining momentum around it — the standard inputs for keyword research, trend spotting and content planning.

This skill wraps **2 live Google Trends endpoints** from the [ScraperSocial](https://scrapersocial.com) API. Public data only, returned as clean JSON.

## When to use this skill

- You are checking whether interest in a topic is growing or fading.
- You want the rising related searches around a seed keyword, for content or SEO planning.
- A user asks whether something is trending.

### Do not use this skill when

- **You need absolute search volume.** Trends returns relative interest, indexed to 100 — it is not a volume estimate, and no endpoint here converts it into one.
- **You need per-result cheapness.** `explore` costs 6 credits, the priciest non-AI call in this repo outside the video endpoints. Do not loop it over a large keyword list without checking the budget.

## Setup

```bash
export SCRAPERSOCIAL_KEY=sk_live_...   # https://scrapersocial.com/app/keys
```

Signing up at [scrapersocial.com/signup](https://scrapersocial.com/signup) includes 100 free credits, no card required.

## Scripts

| Script | What it does | Input | Credits |
|---|---|---|---|
| `get_explore.js` | Get Google Trends explore. | query | 6 credits |
| `get_rising.js` | List Google Trends rising. | query | 3 credits per query |
| `call_endpoint.js` | Call any `/v1/google_trends/` endpoint directly | path + params | varies |

Every script also accepts `--limit`, `--cursor`, `--fields`, `--format` and `--fresh`. `--limit` is clamped to 50: above that the API returns an async job instead of data.

## Example

```bash
node skills/google-trends-api/scripts/get_explore.js "electric vehicles"
```

Every response uses the same envelope:

```json
{ "data": {}, "meta": { "count": 20, "next_cursor": "..." }, "request_id": "a18e4ef88ad4b00b" }
```

`meta` appears on paginated endpoints only. Keep `request_id` — support traces calls with it.

## Endpoints

| Endpoint | Input | Returns | Credits | Paginated |
|---|---|---|---|---|
| `/v1/google_trends/explore` | query | report | 6 credits | no |
| `/v1/google_trends/rising` | query | query | 3 credits per query | yes |

Costs shown per item for paginated endpoints, per call otherwise. Failed calls are not charged.

## FAQ

### How do I get interest over time for a keyword?

`get_explore.js` with the query, 6 credits per call.

### How do I find rising related searches?

`get_rising.js` with a seed query, 3 credits per result returned.

### Does this give me search volume numbers?

No. Google Trends publishes relative interest on a 0–100 index, not absolute volume. Anything presenting it as volume is inferring, not reporting.

### Is this an official Google API?

No. ScraperSocial is independent and not affiliated with Google.

## Links

- [Google Trends data on ScraperSocial](https://scrapersocial.com)
- [All 33 platform skills](https://github.com/nikhonit/social-media-api-skills)
- [OpenAPI spec](https://scrapersocial.com/openapi.json) · [llms.txt](https://scrapersocial.com/llms.txt)

## Disclaimer

ScraperSocial is an independent product and is not affiliated with, endorsed by, or sponsored by any platform named in this repository. All product names, logos and brands are property of their respective owners. These skills return only publicly available data.
