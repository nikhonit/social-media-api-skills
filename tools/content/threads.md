---
description: Threads data toolkit via ScraperSocial — profiles, user post timelines, post stats, keyword search and user search.
tagline: Profiles, post timelines, post stats and keyword search.
example: search.js "design systems"
---

## lede

Read public Threads data as clean JSON. This Threads API skill returns a profile, a user's posts, stats for a single post, and both keyword and user search. Threads is young enough that tooling for it is thin, so a straightforward JSON read is worth more here than on the established networks.

## when-to-use

- You are tracking what an account posts on Threads.
- You are monitoring a keyword or brand mention on the network.
- A user pastes a Threads post and asks about its engagement.

## when-not-to-use

- **You need comments or reply threads.** Threads has no comments endpoint in this API — profile, posts, stats and search only. Do not promise a reply tree you cannot fetch.
- **You expect view counts.** Threads does not publish every metric, so some fields other platforms expose are simply absent.
- **You need to post or reply.** Read-only; Meta's own Threads API covers publishing.

## faq

### What can I get from Threads?

Five endpoints: `get_profile.js`, `get_posts.js`, `get_stats.js`, `search.js` and `user_search.js`, costing 3–4 credits each.

### Can I get replies to a Threads post?

No. There is no comments or replies endpoint for Threads in this API. Facebook, Instagram, YouTube, LinkedIn, Reddit, TikTok and Hacker News do have one.

### Why are some engagement fields missing?

Threads does not publish everything other networks do — view counts in particular. The API returns what is public rather than estimating.

### Is this an official Threads API?

No. ScraperSocial is independent and not affiliated with Meta. It returns publicly available data only.
