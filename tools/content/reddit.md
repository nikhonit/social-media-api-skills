---
description: Reddit data toolkit via ScraperSocial — posts, full comment threads, subreddit listings and details, user profiles and keyword search.
tagline: Posts, comment threads, subreddit listings, user profiles and search.
---

## lede

Read public Reddit data as clean JSON. This Reddit API skill returns a post and its full comment tree, subreddit listings and metadata, user profiles and their post history, plus keyword search across posts and subreddits. Reddit is where people say what they actually think about a product, which makes it the highest-signal source in this repo for sentiment and research work.

## when-to-use

- A user pastes a Reddit thread and asks what the discussion concluded.
- You are researching how a product, company or topic is talked about by real users.
- You are monitoring a subreddit for mentions of a brand.
- You want to find the right subreddits for a topic.

## when-not-to-use

- **You need to post, comment or vote.** Read-only. Reddit's own API handles writes.
- **You are pulling a large subreddit's full history.** Listings are charged per item; scope with `--limit` and page deliberately.
- **You need private or quarantined content**, or removed comments. Public data only.
- **A Reddit link appears in passing** with no question attached.

## faq

### How do I get the comments on a Reddit post?

`get_post_comments.js` with the post URL returns the thread at 2 credits per comment. `get_post.js` returns the post itself for 4.

### How do I monitor a subreddit?

`get_subreddit.js` with the subreddit handle lists posts at 2 credits each. `get_subreddit_details.js` returns the subreddit's own metadata for 4.

### How do I find subreddits about a topic?

`subreddit_search.js` with a query. For post-level search across Reddit, use `search.js`.

### Is this an official Reddit API?

No. ScraperSocial is independent and not affiliated with Reddit. It returns publicly available data only. Reddit's own API remains the sanctioned route, particularly for writes.
