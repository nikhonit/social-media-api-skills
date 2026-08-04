---
description: Twitch data toolkit via ScraperSocial — streamer profiles, clips and user video listings as clean JSON.
tagline: Streamer profiles, clips and video listings.
---

## lede

Read public Twitch data as clean JSON. This Twitch API skill returns a streamer's profile, a single clip, or a channel's video listing — 2 credits each. It is the quick read for creator research on Twitch when you do not want to register an application and manage OAuth tokens.

## when-to-use

- You are researching a streamer: their profile, their recent videos, their clips.
- A user pastes a Twitch clip and asks what it is or who made it.
- You are building a cross-platform creator profile that includes Twitch.

## when-not-to-use

- **You need live stream status or chat.** Not covered here. Twitch's own API and EventSub handle real-time state properly.
- **You are building a Twitch integration proper.** The official API is free, richer and supports subscriptions to live events.
- **You need viewer or revenue analytics.** Account-scoped and not public.

## faq

### What can I get from Twitch?

Three endpoints at 2 credits each: `get_profile.js` for a streamer, `get_clip.js` for a clip, and `get_user_videos.js` for a channel's videos.

### Can I tell whether someone is live right now?

Not reliably — there is no live-status endpoint here, and responses may be cached. Use Twitch's own API for real-time state.

### Is this an official Twitch API?

No. ScraperSocial is independent and not affiliated with Twitch or Amazon. It returns publicly available data only.
