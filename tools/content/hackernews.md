---
description: Hacker News data toolkit via ScraperSocial — stories, full comment threads, user profiles and keyword search.
tagline: Stories, comment threads, user profiles and keyword search.
---

## lede

Read public Hacker News data as clean JSON. This Hacker News API skill returns a story, its full comment thread, a user's profile, or keyword search across the site — all at 1 credit, which makes it a good endpoint to smoke-test your key with.

## when-to-use

- A user pastes an HN link and wants the discussion summarised.
- You are researching how a product, company or idea was received by that audience.
- You want to track mentions of a term on Hacker News.

## when-not-to-use

- **You need the whole firehose or historical bulk.** The official Firebase API and the Algolia HN search API are free and better suited to bulk work.
- **You need to post or vote.** Read-only.

## faq

### How do I get the comments on a Hacker News story?

`get_story_comments.js` with the story handle returns the thread at 1 credit per comment. `get_story.js` returns the story itself.

### Why use this instead of the free official HN API?

Only for consistency with the other platforms here — same envelope, same client, same key. If HN is your only source, the official API is free.

### Is this an official Hacker News API?

No. ScraperSocial is independent and not affiliated with Hacker News or Y Combinator.
