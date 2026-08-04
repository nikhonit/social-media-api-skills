---
description: Bluesky data toolkit via ScraperSocial — public profiles, user post timelines and keyword search across the network.
tagline: Public profiles, post timelines and keyword search.
---

## lede

Read public Bluesky data as clean JSON. This Bluesky API skill returns a profile, a user's posts, or keyword search results across the network — at 1 credit per call, which makes it one of the cheapest ways to monitor a conversation on an open social platform.

## when-to-use

- You are tracking what a specific Bluesky account is posting.
- You want keyword search across public posts, for monitoring a brand or topic.
- A user pastes a Bluesky handle and asks who it is or what they post about.

## when-not-to-use

- **You need to post, reply or follow.** This is read-only. Bluesky's own AT Protocol API handles writes and is free for authenticated users.
- **You need the full firehose.** These are point queries, not a streaming feed. For real-time ingestion at volume, connect to the protocol directly.
- **You need private or blocked-account data.** Public data only.

## faq

### How do I get Bluesky posts for a user?

`get_user_posts.js` with the handle returns their public posts, 1 credit per post returned.

### Do I need a Bluesky account?

No. These endpoints read public data and authenticate against ScraperSocial, not Bluesky.

### Is this an official Bluesky API?

No. ScraperSocial is independent and not affiliated with Bluesky. Bluesky also publishes its own open API, which is a better fit if you need writes or the firehose.

### What does it cost?

1 credit per call, or per item on the paginated endpoints. The 100 free signup credits go a long way here.
