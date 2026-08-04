---
description: Linkme data toolkit via ScraperSocial — resolve a Linkme page to the links and profile details it publishes.
tagline: Resolve a Linkme page to its links and profile details.
example: get_page.js <linkme-handle>
---

## lede

Read public Linkme pages as clean JSON. This Linkme API skill has a single endpoint: give it a handle and it returns the links and profile details that page publishes, for 1 credit — the quickest way to turn a creator's link-in-bio into structured data.

## when-to-use

- You are resolving a creator's link-in-bio into their actual destinations.
- You are building a creator profile and want every channel they link to.
- A user pastes a Linkme handle and asks what is on it.

## when-not-to-use

- **The page is a Linktree, not a Linkme.** Use the `linktree-api` skill; they are different services.
- **You need analytics for a page you own.** Linkme's own dashboard has those.

## faq

### What does the Linkme endpoint return?

`get_page.js` with the handle returns the page's links and profile details, for 1 credit.

### Is this the same as Linktree?

No. Linktree is a separate service with its own skill in this repo, `linktree-api`.

### Is this an official Linkme API?

No. ScraperSocial is independent and not affiliated with Linkme. It returns publicly available page data only.
