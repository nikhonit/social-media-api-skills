---
name: youtube-api
version: 1.0.0
description: YouTube data toolkit via ScraperSocial — transcripts, captions and subtitles, video and channel stats, comments and replies, Shorts, search, trending and media URLs.
license: MIT-0
author: ScraperSocial
homepage: https://scrapersocial.com
repository: https://github.com/nikhonit/social-media-api-skills
tags:
  - youtube
  - transcript
  - captions
  - comments
  - video-data
  - social-media
  - api
  - mcp
metadata:
  openclaw:
    primaryEnv: SCRAPERSOCIAL_KEY
    homepage: https://scrapersocial.com
    requires:
      env:
        - SCRAPERSOCIAL_KEY
---

# YouTube API skill

Read public YouTube data as clean JSON. This YouTube API skill covers the full read surface: transcripts, captions and subtitles; video and channel statistics; comment threads, top comments and replies; Shorts listings, search and trending; channel videos, live streams and playlists; search with recency and suggestion variants; and direct media URLs for audio and video files.

Transcripts are the headline use. One call turns a video into text an agent can actually reason over, and at 3 credits it is the cheapest transcript in this repo — a fraction of the Instagram or Facebook equivalents.

This skill wraps **26 live YouTube endpoints** from the [ScraperSocial](https://scrapersocial.com) API. Public data only, returned as clean JSON.

## When to use this skill

- A user pastes a YouTube URL and asks what the video says, or wants it summarised from the transcript.
- You are researching a channel: subscriber counts, upload cadence, which videos performed.
- You need comments on a video for sentiment or for surfacing recurring questions.
- You are tracking what is trending, or searching videos, Shorts or hashtags.
- You need a playlist's contents or a channel's live streams.

### Do not use this skill when

- **A YouTube link appears in passing** and the user has not asked about its contents.
- **The user only wants the title they already pasted.** No call needed.
- **You need your own channel's analytics.** Watch time, retention and revenue are account-scoped — use YouTube Analytics.
- **You need to upload, comment or manage a channel.** Read-only.
- **You intend to redistribute the media.** `get_media.js` returns file URLs for technical access; downloading and republishing content you do not own is a copyright matter and usually a terms violation. Use it for analysis, not distribution.

## Setup

```bash
export SCRAPERSOCIAL_KEY=sk_live_...   # https://scrapersocial.com/app/keys
```

Signing up at [scrapersocial.com/signup](https://scrapersocial.com/signup) includes 100 free credits, no card required.

## Scripts

| Script | What it does | Input | Credits |
|---|---|---|---|
| `get_transcript.js` | Get YouTube transcript. | url | 3 credits |
| `get_transcript.js` `--section=captions` | Get YouTube captions. | url | 3 credits |
| `get_transcript.js` `--section=subtitles` | Get YouTube subtitles. | url | 1 credit |
| `get_channel.js` `--section=lives` | List YouTube channel lives. | handle | 1 credit per stream |
| `get_channel.js` `--section=search` | List YouTube channel search. | query | 2 credits per channel |
| `get_channel.js` `--section=shorts` | List YouTube channel shorts. | handle | 2 credits per short |
| `get_channel.js` `--section=stats` | Get YouTube channel stats. | handle | 2 credits |
| `get_channel.js` `--section=top-videos` | List YouTube channel top videos. | handle | 1 credit per video |
| `get_channel.js` `--section=videos` | List YouTube channel videos. | handle | 1 credit per video |
| `get_comments.js` | List YouTube comments. | url | 1 credit per comment |
| `get_comments.js` `--section=comment-replies` | List YouTube comment replies. | url | 1 credit per reply |
| `get_comments.js` `--section=top` | List YouTube comments top. | url | 1 credit per comment |
| `search.js` | List YouTube search. | query | 1 credit per result |
| `search.js` `--section=hashtag-search` | List YouTube hashtag search. | query | 2 credits per result |
| `search.js` `--section=recent` | List YouTube search recent. | query | 1 credit per result |
| `search.js` `--section=streams-search` | List YouTube streams search. | query | 1 credit per stream |
| `search.js` `--section=suggestions` | List YouTube search suggestions. | query | 1 credit per suggestion |
| `get_shorts.js` `--section=hashtag-search` | List YouTube shorts hashtag search. | query | 2 credits per short |
| `get_shorts.js` `--section=search` | List YouTube shorts search. | query | 1 credit per short |
| `get_shorts.js` `--section=trending` | List YouTube shorts trending. | none | 2 credits per short |
| `get_media.js` `--section=thumbnails` | Get YouTube thumbnails. | url | 1 credit |
| `get_media.js` `--section=video-audio` | Get YouTube video audio. | url | 3 credits |
| `get_media.js` `--section=video-files` | Get YouTube video files. | url | 3 credits |
| `get_playlist.js` `--section=items` | List YouTube playlist items. | url | 1 credit per video |
| `get_trending.js` | List YouTube trending. | none | 2 credits per video |
| `get_stats.js` | Get YouTube stats. | url | 1 credit |
| `call_endpoint.js` | Call any `/v1/youtube/` endpoint directly | path + params | varies |

Every script also accepts `--limit`, `--cursor`, `--fields`, `--format` and `--fresh`. `--limit` is clamped to 50: above that the API returns an async job instead of data.

## Example

```bash
node skills/youtube-api/scripts/get_channel.js nasa --section=lives
```

Every response uses the same envelope:

```json
{ "data": {}, "meta": { "count": 20, "next_cursor": "..." }, "request_id": "a18e4ef88ad4b00b" }
```

`meta` appears on paginated endpoints only. Keep `request_id` — support traces calls with it.

## Endpoints

| Endpoint | Input | Returns | Credits | Paginated |
|---|---|---|---|---|
| `/v1/youtube/captions` | url | video | 3 credits | no |
| `/v1/youtube/channel-lives` | handle | stream | 1 credit per stream | yes |
| `/v1/youtube/channel-search` | query | channel | 2 credits per channel | yes |
| `/v1/youtube/channel-shorts` | handle | short | 2 credits per short | yes |
| `/v1/youtube/channel-stats` | handle | channel | 2 credits | no |
| `/v1/youtube/channel-top-videos` | handle | video | 1 credit per video | yes |
| `/v1/youtube/channel-videos` | handle | video | 1 credit per video | yes |
| `/v1/youtube/comment-replies` | url | reply | 1 credit per reply | yes |
| `/v1/youtube/comments` | url | comment | 1 credit per comment | yes |
| `/v1/youtube/comments-top` | url | comment | 1 credit per comment | yes |
| `/v1/youtube/hashtag-search` | query | result | 2 credits per result | yes |
| `/v1/youtube/playlist-items` | url | video | 1 credit per video | yes |
| `/v1/youtube/search` | query | result | 1 credit per result | yes |
| `/v1/youtube/search-recent` | query | result | 1 credit per result | yes |
| `/v1/youtube/search-suggestions` | query | suggestion | 1 credit per suggestion | yes |
| `/v1/youtube/shorts-hashtag-search` | query | short | 2 credits per short | yes |
| `/v1/youtube/shorts-search` | query | short | 1 credit per short | yes |
| `/v1/youtube/shorts-trending` | none | short | 2 credits per short | yes |
| `/v1/youtube/stats` | url | video | 1 credit | no |
| `/v1/youtube/streams-search` | query | stream | 1 credit per stream | yes |
| `/v1/youtube/subtitles` | url | video | 1 credit | no |
| `/v1/youtube/thumbnails` | url | video | 1 credit | no |
| `/v1/youtube/transcript` | url | video | 3 credits | no |
| `/v1/youtube/trending` | none | video | 2 credits per video | yes |
| `/v1/youtube/video-audio` | url | video | 3 credits | no |
| `/v1/youtube/video-files` | url | video | 3 credits | no |

Costs shown per item for paginated endpoints, per call otherwise. Failed calls are not charged.

## FAQ

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

## Links

- [YouTube data on ScraperSocial](https://scrapersocial.com)
- [All 33 platform skills](https://github.com/nikhonit/social-media-api-skills)
- [OpenAPI spec](https://scrapersocial.com/openapi.json) · [llms.txt](https://scrapersocial.com/llms.txt)

## Disclaimer

ScraperSocial is an independent product and is not affiliated with, endorsed by, or sponsored by any platform named in this repository. All product names, logos and brands are property of their respective owners. These skills return only publicly available data.
