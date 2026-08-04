# Security policy

## Reporting a vulnerability

Email **support@scrapersocial.com**. Please do not open a public issue for a
security report.

Include what you found, how to reproduce it, and what you think the impact is.
We will acknowledge your report and keep you updated on the fix.

## Scope

This repository contains agent skills that call the ScraperSocial API over
HTTPS. It has no dependencies, no build step and no server component. The most
likely issues here are:

- A script leaking your API key into logs or output.
- A generated script building a request URL incorrectly.

Both are in scope, as is anything affecting the ScraperSocial API itself.

## Handling your API key

`SCRAPERSOCIAL_KEY` is a secret. Keep it in your environment, not in source
control. The scripts read it from the environment only, never from a file or an
argument, and never print it — error output includes the `request_id` for
support, not the key.

If a key is exposed, rotate it at https://scrapersocial.com/app/keys.
