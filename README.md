# social-media-api-skills: social media API skills for AI agents

A social media API toolkit for AI agents. These skills let Claude, ChatGPT, Cursor, or any custom agent loop read public data from 33 platforms — the TikTok API for video transcripts, the Instagram API for reels and hashtags, the LinkedIn API for profiles and company data, the YouTube API for transcripts and comments, plus Reddit, X, Facebook, Amazon, Google and more — through one key and one JSON envelope. There is also a hosted MCP server if you would rather install nothing at all.

<!-- generated:counts -->
227 endpoints across 33 platforms
<!-- /generated:counts -->

Free to start: signing up gives you 100 credits, no card required. Plain Node.js. No dependencies. MIT-0 licensed.

[![License: MIT-0](https://img.shields.io/badge/license-MIT--0-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](https://nodejs.org)
[![API](https://img.shields.io/badge/api-scrapersocial.com-orange.svg)](https://scrapersocial.com)

## Install

Most people want the catch-all skill — one skill that reaches all 33 platforms:

```bash
# OpenClaw (via ClawHub)
npx clawhub@latest install social-media-api

# Hermes Agent
hermes skills install skills-sh/nikhonit/social-media-api-skills/skills/social-media-api

# Generic agent skills (Claude Code, Cursor, Cline) — installs every skill in the repo
npx skills add nikhonit/social-media-api-skills
```

Or install one platform, when you already know which you need. Every platform skill is on ClawHub under a `scrapersocial-` prefixed slug:

```bash
npx clawhub@latest install scrapersocial-tiktok
npx clawhub@latest install scrapersocial-instagram
npx clawhub@latest install scrapersocial-linkedin
npx clawhub@latest install scrapersocial-twitter
npx clawhub@latest install scrapersocial-reddit
npx clawhub@latest install scrapersocial-threads
npx clawhub@latest install scrapersocial-facebook
npx clawhub@latest install scrapersocial-amazon
npx clawhub@latest install scrapersocial-app-store
npx clawhub@latest install scrapersocial-bluesky
npx clawhub@latest install scrapersocial-github
npx clawhub@latest install scrapersocial-google
npx clawhub@latest install scrapersocial-google-finance
npx clawhub@latest install scrapersocial-google-maps
npx clawhub@latest install scrapersocial-google-news
npx clawhub@latest install scrapersocial-google-play
npx clawhub@latest install scrapersocial-google-shopping
npx clawhub@latest install scrapersocial-google-trends
npx clawhub@latest install scrapersocial-hacker-news
npx clawhub@latest install scrapersocial-kwai
npx clawhub@latest install scrapersocial-linkme
npx clawhub@latest install scrapersocial-linktree
npx clawhub@latest install scrapersocial-naver
npx clawhub@latest install scrapersocial-pinterest
npx clawhub@latest install scrapersocial-polymarket
npx clawhub@latest install scrapersocial-snapchat
npx clawhub@latest install scrapersocial-spotify
npx clawhub@latest install scrapersocial-tiktok-shop
npx clawhub@latest install scrapersocial-tripadvisor
npx clawhub@latest install scrapersocial-trustpilot
npx clawhub@latest install scrapersocial-truth-social
npx clawhub@latest install scrapersocial-twitch
```

`npx skills add nikhonit/social-media-api-skills` installs every skill in the repo at once. The per-platform skills carry argument
validation, per-endpoint costs and guidance on when *not* to spend credits; the
catch-all trades that for reach.

## Skills in this repo

<!-- generated:skills -->
| Skill | Platform | Endpoints | What it covers |
|---|---|---|---|
| [amazon-api](skills/amazon-api/SKILL.md) | Amazon | 4 | Product detail, product search, reviews and seller listings. |
| [app-store-api](skills/app-store-api/SKILL.md) | App Store | 6 | App metadata, reviews, keyword search and category charts. |
| [bluesky-api](skills/bluesky-api/SKILL.md) | Bluesky | 3 | Public profiles, post timelines and keyword search. |
| [facebook-api](skills/facebook-api/SKILL.md) | Facebook | 23 | Transcripts, page stats, comments, reels, ads, marketplace and events. |
| [github-api](skills/github-api/SKILL.md) | GitHub | 11 | Repos, commits, contributors, issues, releases, profiles and trending. |
| [google-api](skills/google-api/SKILL.md) | Google | 5 | Search results, Business Profile info, reviews and company ads. |
| [google-finance-api](skills/google-finance-api/SKILL.md) | Google Finance | 3 | Quotes, historical price history and instrument search. |
| [google-maps-api](skills/google-maps-api/SKILL.md) | Google Maps | 4 | Place details, place search, photos and contact discovery. |
| [google-news-api](skills/google-news-api/SKILL.md) | Google News | 1 | Keyword search across news headlines and sources. |
| [google-play-api](skills/google-play-api/SKILL.md) | Google Play | 4 | Android app metadata, reviews, keyword search and categories. |
| [google-shopping-api](skills/google-shopping-api/SKILL.md) | Google Shopping | 1 | Product search across merchants, with pricing. |
| [google-trends-api](skills/google-trends-api/SKILL.md) | Google Trends | 2 | Interest over time and rising related queries. |
| [hacker-news-api](skills/hacker-news-api/SKILL.md) | Hacker News | 4 | Stories, comment threads, user profiles and keyword search. |
| [instagram-api](skills/instagram-api/SKILL.md) | Instagram | 23 | Reel transcripts, profile and post stats, comments, hashtags and locations. |
| [kwai-api](skills/kwai-api/SKILL.md) | Kwai | 3 | Creator profiles, post listings and single video lookups. |
| [linkedin-api](skills/linkedin-api/SKILL.md) | LinkedIn | 38 | Profiles and 20 sub-resources, companies, job and people search, posts and ads. |
| [linkme-api](skills/linkme-api/SKILL.md) | Linkme | 1 | Resolve a Linkme page to its links and profile details. |
| [linktree-api](skills/linktree-api/SKILL.md) | Linktree | 1 | Resolve a Linktree page to its links and profile details. |
| [naver-api](skills/naver-api/SKILL.md) | Naver | 4 | Blog, cafe, local and shopping search across Korea's main portal. |
| [pinterest-api](skills/pinterest-api/SKILL.md) | Pinterest | 3 | Pin details, keyword search and per-URL save counts. |
| [polymarket-api](skills/polymarket-api/SKILL.md) | Polymarket | 1 | Prediction market listings and current odds. |
| [reddit-api](skills/reddit-api/SKILL.md) | Reddit | 8 | Posts, comment threads, subreddit listings, user profiles and search. |
| [snapchat-api](skills/snapchat-api/SKILL.md) | Snapchat | 1 | Public creator profile lookups. |
| [spotify-api](skills/spotify-api/SKILL.md) | Spotify | 6 | Tracks, albums, artists, top tracks, playlists and search. |
| [threads-api](skills/threads-api/SKILL.md) | Threads | 5 | Profiles, post timelines, post stats and keyword search. |
| [tiktok-api](skills/tiktok-api/SKILL.md) | TikTok | 16 | Transcripts, summaries, channel stats, comments, hashtag and song search. |
| [tiktok-shop-api](skills/tiktok-shop-api/SKILL.md) | TikTok Shop | 5 | Product detail, reviews, shop catalogues and creator showcases. |
| [tripadvisor-api](skills/tripadvisor-api/SKILL.md) | Tripadvisor | 2 | Hotel, restaurant and attraction search with review listings. |
| [trustpilot-api](skills/trustpilot-api/SKILL.md) | Trustpilot | 1 | Company review listings. |
| [truth-social-api](skills/truth-social-api/SKILL.md) | Truth Social | 2 | Public profiles and user post timelines. |
| [twitch-api](skills/twitch-api/SKILL.md) | Twitch | 3 | Streamer profiles, clips and video listings. |
| [twitter-api](skills/twitter-api/SKILL.md) | X (Twitter) | 7 | Transcripts, AI summaries, post stats, profiles, tweets and search. |
| [youtube-api](skills/youtube-api/SKILL.md) | YouTube | 26 | Transcripts, captions, video and channel stats, comments, Shorts and search. |
| [social-media-api](skills/social-media-api/SKILL.md) | All platforms | 227 | Discover and call any endpoint across every platform. |
<!-- /generated:skills -->

## Quickstart

```bash
# 1. Get a key — 100 free credits, no card
open https://scrapersocial.com/signup

# 2. Export it
export SCRAPERSOCIAL_KEY=sk_live_...

# 3. Run any script
node skills/github-api/scripts/get_profile.js torvalds
```

<!-- generated:sample -->
> **Note:** no captured sample output is committed yet. The response shape shown below is taken from the [OpenAPI spec](https://scrapersocial.com/openapi.json) — it is not a recorded call. Run `SCRAPERSOCIAL_KEY=... node tools/capture.mjs` to record real output and regenerate.
<!-- /generated:sample -->

Every response uses the same envelope:

```json
{
  "data": {},
  "meta": { "count": 20, "next_cursor": "..." },
  "request_id": "a18e4ef88ad4b00b"
}
```

`data` is an object for single-entity endpoints and an array for paginated ones. `meta` appears on paginated responses only. Keep `request_id` — it is how support traces a call.

Errors follow the same discipline:

```json
{
  "error": {
    "code": "invalid_url",
    "message": "...",
    "hint": "...",
    "request_id": "..."
  }
}
```

Failed calls are not charged.

## Works with

These are plain Node scripts with a documented contract, so anything that can run a command can use them.

- **Claude Code / Claude Skills** — install with `npx skills add nikhonit/social-media-api-skills`
- **ChatGPT** — expose a script as a function or run it in a code interpreter step
- **Cursor, Cline, Windsurf** — drop the repo in and let the agent read `SKILL.md`
- **Any agent loop** — call the scripts as subprocesses and parse stdout

### Zero install: the hosted MCP server

If you would rather not vendor anything, ScraperSocial runs a hosted MCP server that reaches the same endpoints:

[![Add to Cursor](https://img.shields.io/badge/Add_to-Cursor-000000.svg)](cursor://anysphere.cursor-deeplink/mcp/install?name=scrapersocial&config=eyJ1cmwiOiJodHRwczovL21jcC5zY3JhcGVyc29jaWFsLmNvbSJ9) [![Add to VS Code](https://img.shields.io/badge/Add_to-VS_Code-0078d4.svg)](https://insiders.vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522scrapersocial%2522%252C%2522type%2522%253A%2522http%2522%252C%2522url%2522%253A%2522https%253A%252F%252Fmcp.scrapersocial.com%2522%257D)

Claude.ai: Settings → Connectors → Add custom connector → `https://mcp.scrapersocial.com` (OAuth, no key to paste). Full per-client instructions, including Windsurf, Gemini CLI and ChatGPT, are at <https://scrapersocial.com/mcp/>.

```bash
claude mcp add --transport http scrapersocial https://mcp.scrapersocial.com
```

```json
{
  "mcpServers": {
    "scrapersocial": {
      "url": "https://mcp.scrapersocial.com",
      "headers": { "Authorization": "Bearer sk_live_..." }
    }
  }
}
```

It exposes 14 tools — twelve capability tools (`get_transcript`, `get_summary`, `get_post_stats`, `get_comments`, `get_comment_replies`, `get_profile`, `get_channel_posts`, `search`, `search_hashtag`, `get_reviews`, `download_media`, `get_trending`) plus `list_endpoints` and `call_endpoint`, which between them reach the entire surface. Auth is OAuth 2.1 PKCE or a bearer key.

Use the skills in this repo when you want per-platform guidance, argument validation, and control over exactly which endpoint runs. Use the MCP server when you want nothing installed.

## What you get back

- **Clean JSON**, one envelope for every platform
- **`request_id` on every response**, including errors
- **`x-cache: hit|miss`** header telling you whether it came from cache
- **Projection and format control** — `fields` trims the response, `format` switches between `json`, `csv` and `ndjson`
- **OpenAPI 3.1**: [scrapersocial.com/openapi.json](https://scrapersocial.com/openapi.json)
- **Agent-readable summary**: [llms.txt](https://scrapersocial.com/llms.txt) · [llms-full.txt](https://scrapersocial.com/llms-full.txt)

Every endpoint is `GET https://api.scrapersocial.com/v1/{platform}/{capability}`. Optional parameters on every call:

| Param | Effect |
|---|---|
| `limit` | Items on paginated endpoints. Default 20. **Scripts clamp this to 50** — above that the API returns an async job instead of data. |
| `cursor` | `next_cursor` from a previous response's `meta`. |
| `fields` | Projection, e.g. `fields=id,author.name`. |
| `format` | `json` (default), `csv`, `ndjson`. |
| `fresh` | `true` bypasses the cache at the same credit cost. |

## Authentication

Every script reads one environment variable:

```bash
export SCRAPERSOCIAL_KEY=sk_live_...
```

Manage keys at [scrapersocial.com/app/keys](https://scrapersocial.com/app/keys). The scripts never print your key — error output carries the `request_id` instead. Keep it out of source control.

## Pricing

| Plan | Price | Credits | Rate limit |
|---|---|---|---|
| Free | $0 | 100 one-time at signup, no card | 20/min |
| Monthly | $5/mo | 1,000/month, top-ups $4/1k | 200/min |
| Annual | $54/yr | 12,000 upfront, top-ups $3/1k | 300/min |
| Enterprise | custom | custom | 1,500/min |

Credits are charged **per item returned** on paginated endpoints and **per call** otherwise. Costs range from 1 credit (GitHub, Hacker News, Bluesky, Linktree) to 42 (Instagram AI summary). Each skill's `SKILL.md` lists the exact cost of every endpoint it wraps. Cache hits cost the same as fresh calls and return in milliseconds. Failed calls are not charged.

## FAQ

### How do I get TikTok data as JSON?

Install `tiktok-api`, export `SCRAPERSOCIAL_KEY`, and run `node skills/tiktok-api/scripts/get_transcript.js <video-url>`. It returns the spoken content as JSON for 8 credits. Channel stats, comments, hashtag search and song lookups are separate scripts in the same skill.

### Is there a free social media API?

This one starts free: 100 credits at signup with no card. That covers roughly 100 GitHub or Hacker News calls, or a dozen TikTok transcripts. After that, plans start at $5/month for 1,000 credits.

### How do I give Claude access to LinkedIn data?

Two ways. Install the `linkedin-api` skill from this repo, or add the hosted MCP server with `claude mcp add --transport http scrapersocial https://mcp.scrapersocial.com`. Both cover profiles, companies, job and people search, posts and the ad library.

### What is an MCP server for social media?

An MCP server exposes tools an AI agent can call directly, without you writing glue code. ScraperSocial's is at `https://mcp.scrapersocial.com` and exposes 14 tools covering all 33 platforms. Add it once and the agent can read social data on its own.

### Can I transcribe an Instagram reel with an API?

Yes — `node skills/instagram-api/scripts/get_transcript.js <reel-url>`, 40 credits. An AI summary of the same reel costs 42. TikTok transcripts are 8 credits and YouTube transcripts are 3, so check which platform you actually need.

### How much does it cost?

Between 1 and 42 credits per call depending on the endpoint, with credits from $3–5 per thousand. GitHub, Hacker News, Bluesky and Linktree are 1 credit. Video transcripts and AI summaries are the expensive end. Every `SKILL.md` lists exact per-endpoint costs.

### Is this an official TikTok, Instagram or LinkedIn API?

No. ScraperSocial is an independent product, not affiliated with any platform named here, and returns publicly available data only. Where a platform offers its own API — GitHub, Spotify, Reddit, Bluesky — that is often free and richer; these skills are most useful for the platforms that do not, and for using one key across all of them.

### Do the skills work without Node?

They need Node 20 or newer, because they use built-in `fetch`. There are no other dependencies and no build step. If you would rather not run Node at all, use the hosted MCP server.

## Issues and contributions

Bug reports and pull requests are welcome at [github.com/nikhonit/social-media-api-skills](https://github.com/nikhonit/social-media-api-skills/issues).

Note that `skills/` and `manifest.json` are generated — edit `tools/content/*.md` and run `node tools/generate.mjs`. See [CONTRIBUTING.md](CONTRIBUTING.md).

For API questions or a key problem, email support@scrapersocial.com with the `request_id` from the response.

## License

[MIT No Attribution (MIT-0)](LICENSE). Use these however you like, no attribution required.

## Disclaimer

ScraperSocial is an independent product and is not affiliated with, endorsed by, or sponsored by any platform named in this repository. All product names, logos and brands are property of their respective owners. These skills return only publicly available data.
