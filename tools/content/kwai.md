---
description: Kwai data toolkit via ScraperSocial — creator profiles, user post listings and single video lookups.
tagline: Creator profiles, post listings and single video lookups.
example: get_profile.js <kwai-handle>
---

## lede

Read public Kwai data as clean JSON. This Kwai API skill returns a creator profile, that creator's posts, or a single video by URL. Kwai is one of the largest short-video platforms in Latin America and South Asia and is poorly served by Western data tools, which is most of the reason this skill exists.

## when-to-use

- You are researching creators or short-video trends in markets where Kwai has real share.
- A user pastes a Kwai link and asks who posted it or what the account is.
- You are benchmarking a creator's Kwai presence against their TikTok or Instagram.

## when-not-to-use

- **You assumed Kwai mirrors TikTok.** They are different platforms with different creators; do not present one as a proxy for the other.
- **You need transcripts or AI summaries.** Kwai has three endpoints — profile, posts and a single post. There is no transcript capability here.
- **You need to post or interact.** Read-only.

## faq

### What can I get from Kwai?

Three things: `get_profile.js` for a creator, `get_user_posts.js` for their posts, and `get_post.js` for one video. Each costs 2 credits.

### Can I transcribe a Kwai video?

Not through this API. Transcripts are available for TikTok, Instagram, Facebook, X and YouTube.

### Is this an official Kwai API?

No. ScraperSocial is independent and not affiliated with Kwai or Kuaishou. It returns publicly available data only.
