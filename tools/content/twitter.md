---
description: X (Twitter) data toolkit via ScraperSocial — video transcripts, AI summaries, post stats, profiles, user tweets, list tweets and keyword search.
tagline: Transcripts, AI summaries, post stats, profiles, tweets and search.
---

## lede

Read public X (formerly Twitter) data as clean JSON. This Twitter API skill returns post statistics, profiles, a user's tweets, the tweets in a list, keyword search — and, less commonly available, transcripts and AI summaries of the video attached to a post.

X's own API pricing pushed a lot of people off the platform's data entirely. These endpoints start at 1 credit, which makes ordinary reads viable again.

## when-to-use

- A user pastes a post URL and wants its engagement numbers or the video transcribed.
- You are tracking what an account posts, or monitoring a keyword.
- You are researching a profile's reach and posting pattern.
- You need the tweets from a curated list as a monitoring feed.

## when-not-to-use

- **You need real-time streaming.** These are point queries, not a firehose.
- **You need to post, reply or DM.** Read-only.
- **You need protected accounts or deleted posts.** Public data only.
- **A link appears in passing** with no question attached — `get_transcript.js` at 7 credits and `get_summary.js` at 9 are not calls to make speculatively.

## faq

### How do I get tweet stats as JSON?

`get_stats.js` with the post URL, 1 credit. `get_profile.js` returns an account for 5.

### Can I transcribe the video in a post?

Yes. `get_transcript.js` with the post URL returns the spoken content for 7 credits; `get_summary.js` returns an AI summary for 9.

### How do I monitor a keyword on X?

`search.js` with a query, 2 credits per result. For a curated feed, `get_list_tweets.js` returns the tweets in a list at 1 credit each.

### How does this compare to X's official API?

X's own API is the sanctioned route and the only one that supports posting. This is a read-only alternative with per-call pricing and no monthly tier commitment.

### Is this an official X API?

No. ScraperSocial is independent and not affiliated with X Corp. It returns publicly available data only.
