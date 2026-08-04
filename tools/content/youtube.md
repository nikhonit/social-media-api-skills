---
description: YouTube data toolkit via ScraperSocial — transcripts, captions and subtitles, video and channel stats, comments and replies, Shorts, search, trending and media URLs.
tagline: Transcripts, captions, video and channel stats, comments, Shorts and search.
example: search.js "transformer architecture explained"
---

## lede

Read public YouTube data as clean JSON. This YouTube API skill covers the full read surface: transcripts, captions and subtitles; video and channel statistics; comment threads, top comments and replies; Shorts listings, search and trending; channel videos, live streams and playlists; search with recency and suggestion variants; and direct media URLs for audio and video files.

Transcripts are the headline use. One call turns a video into text an agent can actually reason over, and at 3 credits it is the cheapest transcript in this repo — a fraction of the Instagram or Facebook equivalents.

## when-to-use

- A user pastes a YouTube URL and asks what the video says, or wants it summarised from the transcript.
- You are researching a channel: subscriber counts, upload cadence, which videos performed.
- You need comments on a video for sentiment or for surfacing recurring questions.
- You are tracking what is trending, or searching videos, Shorts or hashtags.
- You need a playlist's contents or a channel's live streams.

## when-not-to-use

- **A YouTube link appears in passing** and the user has not asked about its contents.
- **The user only wants the title they already pasted.** No call needed.
- **You need your own channel's analytics.** Watch time, retention and revenue are account-scoped — use YouTube Analytics.
- **You need to upload, comment or manage a channel.** Read-only.
- **You intend to redistribute the media.** `get_media.js` returns file URLs for technical access; downloading and republishing content you do not own is a copyright matter and usually a terms violation. Use it for analysis, not distribution.

## faq

### How do I get a YouTube transcript from a URL?

`get_transcript.js` with the video URL, 3 credits. `--section=captions` and `--section=subtitles` return the caption tracks instead when you need timing or a specific language.

### How do I get channel statistics?

`get_channel.js --section=stats` with the channel handle, 2 credits. Other sections cover `videos`, `top-videos`, `shorts`, `lives` and `search`.

### Can I get YouTube comments and their replies?

Yes. `get_comments.js` returns comments at 1 credit each, `--section=top` returns top comments, and `--section=comment-replies` walks the replies under one comment.

### Does this cover Shorts?

Yes, separately from long-form video: `get_shorts.js` with `--section=search`, `--section=trending` or `--section=hashtag-search`.

### Is this an official YouTube API?

No. ScraperSocial is independent and not affiliated with YouTube or Google. It returns publicly available data only. YouTube's own Data API is free within quota and is the sanctioned route — this is most useful for transcripts, which the official API does not straightforwardly provide.
