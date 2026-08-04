# Contributing

Thanks for helping out. One thing to know before you edit anything:

## Most of this repo is generated

`skills/`, `manifest.json` and parts of `README.md` are built by
`tools/generate.mjs`. Editing them directly will be overwritten, and CI will
fail the build.

Edit these instead:

| To change | Edit |
|---|---|
| A skill's prose, use cases or FAQ | `tools/content/<platform>.md` |
| The shared HTTP client | `tools/templates/_client.js` |
| A skill's folder name, display name, tags or script grouping | `tools/platforms.mjs` |
| Endpoint paths, credits, inputs | nothing — these come from the live API |

Then regenerate:

```bash
node tools/generate.mjs
```

## Endpoint facts are never hand-written

Every endpoint, its credit cost and its input kind is derived from the live
OpenAPI spec at https://scrapersocial.com/openapi.json via
`tools/fetch-coverage.mjs`. This is deliberate: hand-maintained tables go stale,
and a stale claim is the copy users actually read.

If the API has changed:

```bash
node tools/fetch-coverage.mjs   # refresh tools/coverage.json
node tools/generate.mjs         # rebuild the tree
```

If a new platform appears, `generate.mjs` will fail until you add it to
`tools/platforms.mjs` and write `tools/content/<platform>.md`. That failure is
intentional — it stops a new platform shipping with a wrong folder name or no
documentation.

## Before opening a PR

```bash
npm test
```

This runs the unit tests, checks the generated tree is current, and checks the
repo's claims against the live API. All three must pass.

## What we will not merge

- Claims the API does not support. If an endpoint is not in the live spec, it
  does not go in the docs.
- Invented example responses. Sample output must be really returned by the API.
- Anything that writes to a platform. These skills are read-only.
