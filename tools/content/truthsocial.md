---
description: Truth Social data toolkit via ScraperSocial — public profiles and user post timelines as clean JSON.
tagline: Public profiles and user post timelines.
---

## lede

Read public Truth Social data as clean JSON. This Truth Social API skill has two endpoints: a public profile and a user's posts, at 2 credits each. Coverage of this network by mainstream data tools is thin, which matters for anyone doing balanced media monitoring rather than monitoring only the platforms that are easy to read.

## when-to-use

- You are doing cross-platform media or discourse monitoring and need this network represented.
- You are tracking what a specific public account posts.
- A user pastes a Truth Social link and asks what the account is.

## when-not-to-use

- **You need search.** There is no search endpoint here — you need a known handle. Profile and posts only.
- **You need to post or interact.** Read-only.
- **You need private accounts.** Public data only.

## faq

### What can I get from Truth Social?

Two endpoints: `get_profile.js` for a public profile and `get_user_posts.js` for that account's posts, 2 credits each.

### Can I search Truth Social by keyword?

No. This API covers profile and posts only, so you need the handle up front.

### Is this an official Truth Social API?

No. ScraperSocial is independent and not affiliated with Truth Social or TMTG. It returns publicly available data only.
