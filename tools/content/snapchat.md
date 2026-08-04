---
description: Snapchat data toolkit via ScraperSocial — public creator profile lookups as clean JSON.
tagline: Public creator profile lookups.
example: get_profile.js <snapchat-handle>
---

## lede

Read public Snapchat profiles as clean JSON. This Snapchat API skill has a single endpoint: give it a handle and it returns the public profile for 2 credits. Snapchat publishes very little publicly, which is exactly why a reliable profile lookup is worth having — it is usually the only programmatic read available.

## when-to-use

- You are verifying that a Snapchat handle exists and belongs to the creator you think it does.
- You are building a cross-platform creator profile and Snapchat is one of the channels.

## when-not-to-use

- **You expect posts, stories or engagement data.** One endpoint, profile only. Snapchat does not publish the rest.
- **You need Snap Ads or account analytics.** Those are account-scoped; use Snap's own APIs.
- **You need to send snaps or messages.** Read-only.

## faq

### What does the Snapchat endpoint return?

`get_profile.js` with the handle returns the public profile for 2 credits.

### Can I get someone's stories or snaps?

No. Stories and snaps are not public data and are not available through this API.

### Is this an official Snapchat API?

No. ScraperSocial is independent and not affiliated with Snap Inc. It returns publicly available profile data only.
