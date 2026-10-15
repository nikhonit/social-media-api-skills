# ScraperSocial for Gemini CLI

This extension connects Gemini CLI to the ScraperSocial MCP server (https://mcp.scrapersocial.com), which returns public social media and web data as JSON: profiles, posts, comments, search and transcripts across 31 platforms.

Setup: create a free key (100 credits, no card) at https://scrapersocial.com/signup?utm_source=gemini-cli, then export SCRAPERSOCIAL_KEY before starting Gemini CLI. Every tool call spends credits; costs are stated in each tool's description. Failed calls are free.

Use the tools only when the user asks for data about a specific profile, post, search or transcript. Public data only; ScraperSocial is independent and not affiliated with any platform it reads.

Prefer the per-platform servers when a task is about one platform: replace the URL with https://mcp.scrapersocial.com/<platform> (tiktok, instagram, linkedin, twitter, reddit, threads, and 25 more).
