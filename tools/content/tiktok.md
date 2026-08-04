---
description: TikTok data toolkit via ScraperSocial — video transcripts, AI summaries, post and channel stats, comments, follower lists, song lookups, keyword and hashtag search.
tagline: Transcripts, summaries, channel stats, comments, hashtag and song search.
example: search.js "sourdough starter"
---

## lede

Read public TikTok data as clean JSON. This TikTok API skill turns a video URL into a full transcript or an AI summary, pulls engagement stats for any post or creator, walks comment threads, lists follower and following graphs, and searches TikTok by keyword, hashtag, user or song — without a headless browser, a login, or a scraping stack to maintain.

The transcript endpoint is the one most people come for: give it a video URL and it returns the spoken words, which is what makes TikTok content searchable, summarisable and usable as model input.

## when-to-use

- A user gives you a TikTok video URL and asks what is said in it, or asks for a summary.
- You are researching a creator: follower counts, posting cadence, which videos performed.
- You need the comments on a video, for sentiment or for finding recurring questions.
- You are tracking a hashtag, a trend or a sound and want the videos ranked under it.
- You want to find creators or videos by keyword rather than by URL.

## when-not-to-use

- **A TikTok link appears in passing** and the user has not asked anything about it. Every call spends credits — a mention is not a request.
- **The user asks something answerable from the page they already pasted.** If they pasted the caption and want it rephrased, no API call is needed.
- **You need private data**: non-public accounts, DMs, analytics only the account owner sees, or anything behind a login. The API returns public data only and will 404 rather than guess.
- **You need to post, comment, follow or upload.** This is read-only.
- **You need a guaranteed-complete follower list for a large account.** Follower endpoints are paginated and charged per item; pulling millions of rows is slow and expensive. Sample, or ask the user first.

## faq

### How do I get a TikTok transcript from a URL?

Run `get_transcript.js` with the video URL. It returns the spoken content as text, 8 credits per video. Videos with no speech return an empty transcript rather than an error.

### What is the difference between transcript and summary?

`--section` on the same script: the default returns the raw transcript, `--section=summary` returns an AI-written summary of the video. Summary costs 10 credits and reads the video itself, so you do not need to fetch the transcript first.

### Can I search TikTok without a video URL?

Yes. `search.js` covers keyword search, `--section=top-search` for top results, `--section=hashtag-search` for a hashtag, and `--section=user-search` for creators.

### Is this an official TikTok API?

No. ScraperSocial is independent and not affiliated with TikTok. It returns publicly available data only. For posting, ad management or owned-account analytics, use TikTok's own developer platform.

### What does it cost?

Between 2 and 10 credits depending on the endpoint — the table above lists each one. Signup includes 100 free credits with no card, which is enough to try every endpoint here.
