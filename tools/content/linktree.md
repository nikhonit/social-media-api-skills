---
description: Linktree data toolkit via ScraperSocial — resolve a Linktree page to the links and profile details it publishes.
tagline: Resolve a Linktree page to its links and profile details.
example: get_page.js <linktree-handle>
---

## lede

Read public Linktree pages as clean JSON. This Linktree API skill has a single endpoint: give it a handle and it returns every link and profile detail that page publishes, for 1 credit. It is the standard first step in creator research — a Linktree usually enumerates every other platform an account is on.

## when-to-use

- You are mapping a creator's presence and want all the channels they link to.
- You are resolving a link-in-bio into real destination URLs.
- A user pastes a Linktree handle and asks what is on it.

## when-not-to-use

- **The page is a Linkme.** Use the `linkme-api` skill instead.
- **You need click analytics.** Those belong to the page owner; Linktree's own dashboard has them.

## faq

### What does the Linktree endpoint return?

`get_page.js` with the handle returns the page's links and profile details, for 1 credit.

### Why is this useful for creator research?

A Linktree usually lists every platform a creator is active on, so one 1-credit call often tells you which of the other 32 skills in this repo to use next.

### Is this an official Linktree API?

No. ScraperSocial is independent and not affiliated with Linktree. It returns publicly available page data only.
