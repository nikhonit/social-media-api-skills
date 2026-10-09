---
name: social-media-api
version: 1.0.2
description: One social media API skill for all 33 platforms — discover every available endpoint and call any of them by path, without installing a per-platform skill.
license: MIT-0
author: ScraperSocial
homepage: https://scrapersocial.com
repository: https://github.com/nikhonit/social-media-api-skills
tags:
  - social-media-api
  - mcp
  - agent-skills
  - api
  - web-scraping
  - social-media
allowed-tools: Bash(node:*)
metadata:
  openclaw:
    primaryEnv: SCRAPERSOCIAL_KEY
    homepage: https://scrapersocial.com
    requires:
      env:
        - SCRAPERSOCIAL_KEY
    network:
      allow:
        - api.scrapersocial.com
    shell:
      only: scripts/*.js
---

# Social media API skill

One social media API skill that reaches every platform ScraperSocial covers. Instead of installing a skill per platform, this one lists the whole endpoint catalogue and calls any endpoint by path — useful when you do not know in advance which platform a task will need, or when you want a single generic tool rather than 33 specific ones.

`list_endpoints.js` reads a bundled snapshot, so discovery is free and works without an API key. Only `call_endpoint.js` spends credits.

This skill reaches **all 227 endpoints across 33 platforms** in one place, instead of one skill per platform.

## When to use this skill

- You do not know which platform a request will need until you see it.
- You want one tool in the agent's context rather than 33.
- You need an endpoint that has no dedicated script in its platform skill.
- You are exploring what the API can do before committing to a specific skill.

### Do not use this skill when

- **You already know the platform.** The dedicated skill has argument validation, section flags and platform-specific guidance on what not to do. Prefer `tiktok-api` over this for TikTok work.
- **You want guidance on cost or privacy for a specific platform.** That lives in the per-platform skill, where it can be specific.
- **You are looping over many endpoints to see what sticks.** Every call costs credits. Use `list_endpoints.js` — which is free — to decide first.

## Setup

```bash
export SCRAPERSOCIAL_KEY=sk_live_...   # https://scrapersocial.com/app/keys
```

## Permissions and scope

These scripts do exactly three things and nothing else: read one environment variable (`SCRAPERSOCIAL_KEY`), send HTTPS requests to `https://api.scrapersocial.com` (the host is a constant in the code, not configurable), and print JSON. They run as `node scripts/<name>.js` with no other shell use, no file writes and no persistence. `call_endpoint.js` accepts only paths present in the bundled `endpoints.json` catalogue and refuses anything else before a request is made.

## Scripts

| Script | What it does | Credits |
|---|---|---|
| `list_endpoints.js` | List every endpoint, filterable by platform or keyword | free, no key needed |
| `call_endpoint.js` | Call any endpoint by path | the endpoint's own cost |

```bash
node skills/social-media-api/scripts/list_endpoints.js --search transcript
node skills/social-media-api/scripts/call_endpoint.js /v1/github/profile --handle torvalds
```

## Platforms

| Platform | Path segment | Endpoints |
|---|---|---|
| Amazon | `/v1/amazon/` | 4 |
| App Store | `/v1/app_store/` | 6 |
| Bluesky | `/v1/bluesky/` | 3 |
| Facebook | `/v1/facebook/` | 23 |
| GitHub | `/v1/github/` | 11 |
| Google | `/v1/google/` | 5 |
| Google Finance | `/v1/google_finance/` | 3 |
| Google Maps | `/v1/google_maps/` | 4 |
| Google News | `/v1/google_news/` | 1 |
| Google Play | `/v1/google_play/` | 4 |
| Google Shopping | `/v1/google_shopping/` | 1 |
| Google Trends | `/v1/google_trends/` | 2 |
| Hacker News | `/v1/hackernews/` | 4 |
| Instagram | `/v1/instagram/` | 23 |
| Kwai | `/v1/kwai/` | 3 |
| LinkedIn | `/v1/linkedin/` | 38 |
| Linkme | `/v1/linkme/` | 1 |
| Linktree | `/v1/linktree/` | 1 |
| Naver | `/v1/naver/` | 4 |
| Pinterest | `/v1/pinterest/` | 3 |
| Polymarket | `/v1/polymarket/` | 1 |
| Reddit | `/v1/reddit/` | 8 |
| Snapchat | `/v1/snapchat/` | 1 |
| Spotify | `/v1/spotify/` | 6 |
| Threads | `/v1/threads/` | 5 |
| TikTok | `/v1/tiktok/` | 16 |
| TikTok Shop | `/v1/tiktokshop/` | 5 |
| Tripadvisor | `/v1/tripadvisor/` | 2 |
| Trustpilot | `/v1/trustpilot/` | 1 |
| Truth Social | `/v1/truthsocial/` | 2 |
| Twitch | `/v1/twitch/` | 3 |
| X (Twitter) | `/v1/twitter/` | 7 |
| YouTube | `/v1/youtube/` | 26 |

## FAQ

### How do I find the right endpoint?

`list_endpoints.js --search transcript` filters by keyword, `--platform tiktok` filters by platform. It reads a local snapshot, so it costs nothing and needs no key.

### How do I call an endpoint?

`call_endpoint.js /v1/github/profile --handle torvalds`. Any flag after the path is passed through as a query parameter, so `--limit`, `--cursor`, `--fields`, `--format` and `--fresh` all work.

### Is the bundled endpoint list always current?

It is a snapshot generated from the live OpenAPI spec when the repo was last built. `call_endpoint.js` talks to the live API, so a newly added endpoint works even if the snapshot has not caught up.

### Should I use this or the per-platform skills?

Per-platform when you know the platform — they carry the guardrails. This one when you do not, or when you need an endpoint no script wraps.

## Disclaimer

ScraperSocial is an independent product and is not affiliated with, endorsed by, or sponsored by any platform named in this repository. All product names, logos and brands are property of their respective owners. These skills return only publicly available data.
