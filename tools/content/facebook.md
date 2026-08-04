---
description: Facebook data toolkit via ScraperSocial — video transcripts, AI summaries, post and page stats, comments, reels, ads, marketplace, events, groups and reviews.
tagline: Transcripts, page stats, comments, reels, ads, marketplace and events.
example: get_page.js "specialty coffee roasters" --section=search
---

## lede

Read public Facebook data as clean JSON. This Facebook API skill is the broadest surface in the repo after LinkedIn: video transcripts and AI summaries, post and page statistics, comment threads and replies, reels and photos, the ad library, Marketplace listings, events, group posts, follower graphs and page reviews.

If you have tried to get this data yourself, you know the problem — Facebook is aggressive about blocking automated reads. These endpoints return structured JSON without a browser, a session cookie or a proxy pool.

## when-to-use

- A user pastes a Facebook video URL and wants a transcript or a summary of it.
- You are researching a page: follower counts, engagement, what it posts, what people say in reviews.
- You need comment threads on a post, including replies, for sentiment analysis.
- You are doing competitive ad research through the ad library.
- You are monitoring Marketplace listings or public events for a keyword.

## when-not-to-use

- **A Facebook link appears in passing** with no question attached. Transcript and summary are among the priciest calls in the API (15 and 17 credits) — do not fire them speculatively.
- **You need private data**: friends-only posts, private groups, DMs, or Page Insights that only admins see. Public data only.
- **You manage the page yourself.** Meta's Graph API gives owners richer data for free.
- **You need to post, comment or reply.** Read-only.
- **The user only wants the caption they already pasted.** No call needed.

## faq

### How do I transcribe a Facebook video?

`get_transcript.js` with the video URL returns the spoken content for 15 credits. `--section=summary` returns an AI summary instead, for 17 credits — it reads the video directly, so you do not need the transcript first.

### Can I get Facebook page statistics?

Yes. `get_stats.js --section=page-stats` returns page-level metrics for 10 credits. Plain `get_stats.js` returns post-level stats for a single post URL, for 5.

### Does this cover the Facebook ad library?

Yes. `get_ads.js --section=search` searches the ad library by keyword, `get_ads.js` fetches a single ad by URL, and `get_page.js --section=ads` lists the ads running for a given page.

### Is this an official Facebook or Meta API?

No. ScraperSocial is independent and not affiliated with Meta. It returns publicly available data only. If you administer the page, Meta's Graph API is the better and cheaper route.

### Why did I get a 404 for a post that exists?

The post is private, deleted, or the URL is a redirect. The API returns `not_found` rather than guessing, and failed calls are not charged.
