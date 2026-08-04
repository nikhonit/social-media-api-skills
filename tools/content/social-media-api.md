---
description: One social media API skill for all 33 platforms — discover every available endpoint and call any of them by path, without installing a per-platform skill.
tagline: Discover and call any endpoint across every platform.
---

## lede

One social media API skill that reaches every platform ScraperSocial covers. Instead of installing a skill per platform, this one lists the whole endpoint catalogue and calls any endpoint by path — useful when you do not know in advance which platform a task will need, or when you want a single generic tool rather than 33 specific ones.

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

It is a snapshot generated from the live OpenAPI spec when the repo was last built. `call_endpoint.js` talks to the live API, so a newly added endpoint works even if the snapshot has not caught up.

### Should I use this or the per-platform skills?

Per-platform when you know the platform — they carry the guardrails. This one when you do not, or when you need an endpoint no script wraps.
