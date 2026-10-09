# Installing social-media-api-skills (for AI agents)

This repository contains agent skills that read public social media data through the ScraperSocial API. Follow these steps exactly.

## 1. Get an API key
Open https://scrapersocial.com/signup?utm_source=llms-install and create an account. New accounts receive 100 free credits, no card. Create a key on https://scrapersocial.com/app/keys. Keys start with `sk_live_`.

## 2. Make the key available
Set the environment variable `SCRAPERSOCIAL_KEY` to the key value. Every script in this repository reads that variable. Never write the key into a file that is committed.

## 3. Install the skill
Prefer the hosted MCP server when the client supports MCP: add `https://mcp.scrapersocial.com` as a streamable-HTTP server with header `Authorization: Bearer <key>`, or let the client complete OAuth.

Otherwise install the skill files:
- All skills: `npx skills add nikhonit/social-media-api-skills`
- One platform: `npx clawhub@latest install scrapersocial-tiktok` (also `-instagram`, `-linkedin`, `-youtube`), or copy `skills/<platform>-api/` into the agent's skills directory.
- The catch-all `skills/social-media-api/` reaches every endpoint on every platform through `scripts/list_endpoints.js` and `scripts/call_endpoint.js`.

## 4. Verify
Run `node skills/social-media-api/scripts/list_endpoints.js` (free, no credits). Then run one 1-credit call, for example `node skills/instagram-api/scripts/get_stats.js --url https://www.instagram.com/nasa/`. A JSON object with `data` and `meta` confirms the install.

## Requirements
Node.js 20 or newer. No npm dependencies. Credits are charged per item returned; failed calls are free. Public data only. ScraperSocial is independent and not affiliated with any platform it reads.
