---
description: GitHub data toolkit via ScraperSocial — repositories, commits, contributors, issues, releases, languages, user profiles, repo search and trending.
tagline: Repos, commits, contributors, issues, releases, profiles and trending.
---

## lede

Read public GitHub data as clean JSON. This GitHub API skill covers repositories and their commits, contributors, issues, releases and language breakdown, plus user and organisation profiles, repo search and the trending list. Every endpoint costs 1 credit, making this the cheapest platform in the repo and a good one to test your key against.

## when-to-use

- You are evaluating a dependency or a project and want its activity, contributors or release history.
- You need issue lists for triage, changelog generation or research.
- You are tracking what is trending, or searching repos by keyword.
- A user pastes a GitHub URL and asks what the project is or how active it is.

## when-not-to-use

- **You are authenticated and near no rate limit.** GitHub's own REST and GraphQL APIs are free, richer and support writes. Use this when you want one uniform client across many platforms, or want to avoid managing another token.
- **You need private repositories.** Public data only.
- **You need to open issues, push code or comment.** Read-only.

## faq

### How do I get a repo's commits as JSON?

`get_repo.js --section=commits` with the `owner/name` handle. Commits, contributors, issues, languages and releases are all sections of the same script.

### How do I list a user's or an organisation's repositories?

`get_repos.js --section=user-repos` or `get_repos.js --section=org-repos`, passing the handle.

### Why use this instead of GitHub's own API?

Mostly consistency: same envelope, same auth and same client as the other 32 platforms here. If GitHub is the only source you need, their official API is free and a better fit.

### Is this an official GitHub API?

No. ScraperSocial is independent and not affiliated with GitHub. It returns publicly available data only.
