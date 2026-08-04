---
description: Instagram data toolkit via ScraperSocial — reel transcripts, AI summaries, profile and post stats, comments, hashtag and location analytics, keyword search.
tagline: Reel transcripts, profile and post stats, comments, hashtags and locations.
---

## lede

Read public Instagram data as clean JSON. This Instagram API skill transcribes reels, summarises them, returns profile and post statistics, walks comment threads, and analyses hashtags and locations — including post counts, top posts and reels for a tag or place. It also covers keyword, profile and reel search.

Instagram is one of the harder platforms to read programmatically. These endpoints return structured JSON without a logged-in session or a browser farm.

## when-to-use

- A user pastes a reel URL and asks what is said in it, or wants it summarised.
- You are researching a creator or brand account: followers, posting pattern, engagement.
- You need comments on a post for sentiment or FAQ mining.
- You are tracking a hashtag or a location and want its stats and top posts.

## when-not-to-use

- **Watch the price on media endpoints.** `get_transcript.js` and `get_download.js` cost 40 credits, and `--section=summary` costs 42 — the most expensive calls in the API. Never fire them speculatively; confirm the user actually wants the video's content first.
- **An Instagram link appears in passing** with no question attached.
- **You need private accounts, stories from private users, or DMs.** Public data only.
- **You run the account yourself.** Meta's Graph API gives owners richer insights for free.
- **You need to post, comment or follow.** Read-only.

## faq

### How do I transcribe an Instagram reel?

`get_transcript.js` with the reel URL, 40 credits. `--section=summary` returns an AI summary instead, for 42. Both read the video directly. These are the priciest calls here — check before spending.

### How do I get an Instagram profile as JSON?

`get_profile.js --section=full` returns the full profile, `--section=about` a lighter version. This script has no default section, so `--section` is required.

### Can I get hashtag statistics?

Yes. `get_hashtag.js --section=stats` returns counts, `--section=analytics` a richer breakdown, and `--section=posts` or `--section=reels` the content ranked under the tag.

### Why does a post return 404?

It is private, deleted, or from an account that blocks public reads. The API returns `not_found` rather than guessing, and failed calls are not charged.

### Is this an official Instagram API?

No. ScraperSocial is independent and not affiliated with Meta. It returns publicly available data only.
