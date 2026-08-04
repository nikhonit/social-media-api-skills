#!/usr/bin/env node
/**
 * Captures REAL API responses for use as documentation samples.
 *
 * Sample output in this repo must be genuinely returned by the API — never
 * invented, never "plausible looking". This script is the only sanctioned way
 * to produce it.
 *
 * It is restricted to 1-credit endpoints, so a full run costs a handful of
 * credits. Captures are trimmed for readability and written to tools/captures/,
 * where generate.mjs picks them up.
 *
 *   SCRAPERSOCIAL_KEY=sk_live_... node tools/capture.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(HERE, 'captures');
const API_BASE = process.env.SCRAPERSOCIAL_API_BASE || 'https://api.scrapersocial.com';

const KEY = process.env.SCRAPERSOCIAL_KEY;
if (!KEY) {
  console.error('Set SCRAPERSOCIAL_KEY first. Create one at https://scrapersocial.com/app/keys');
  process.exit(1);
}

/** Only 1-credit endpoints. Keep it that way. */
const TARGETS = [
  { name: 'github.profile', path: '/v1/github/profile', params: { handle: 'torvalds' } },
  { name: 'hackernews.profile', path: '/v1/hackernews/profile', params: { handle: 'pg' } },
  { name: 'bluesky.profile', path: '/v1/bluesky/profile', params: { handle: 'bsky.app' } },
  { name: 'linktree.page', path: '/v1/linktree/page', params: { handle: 'linktree' } },
];

/** Keep samples short: cap arrays, truncate long strings, limit nesting. */
function trim(value, depth = 0) {
  if (typeof value === 'string') {
    return value.length > 160 ? value.slice(0, 157) + '...' : value;
  }
  if (Array.isArray(value)) {
    return value.slice(0, 2).map((v) => trim(v, depth + 1));
  }
  if (value && typeof value === 'object') {
    if (depth >= 3) return '...';
    const out = {};
    for (const [k, v] of Object.entries(value).slice(0, 12)) out[k] = trim(v, depth + 1);
    return out;
  }
  return value;
}

mkdirSync(OUT_DIR, { recursive: true });

let failures = 0;
for (const target of TARGETS) {
  const url = new URL(target.path, API_BASE);
  for (const [k, v] of Object.entries(target.params)) url.searchParams.set(k, v);

  const res = await fetch(url, {
    headers: { authorization: `Bearer ${KEY}`, accept: 'application/json' },
  });
  const body = await res.json().catch(() => null);

  if (!res.ok) {
    console.error(`FAILED ${target.name}: HTTP ${res.status} ${JSON.stringify(body?.error || body)}`);
    failures += 1;
    continue;
  }

  const capture = {
    // Provenance matters: this records that the sample is real and how it was made.
    captured_from: `GET ${target.path}?${url.searchParams}`,
    trimmed: true,
    response: trim(body),
  };
  const file = join(OUT_DIR, `${target.name}.json`);
  writeFileSync(file, JSON.stringify(capture, null, 2) + '\n');
  console.log(`Captured ${target.name} (x-cache: ${res.headers.get('x-cache') || 'n/a'})`);
}

console.log(
  failures
    ? `\n${failures} capture(s) failed. Fix before regenerating.`
    : '\nAll captures written. Now run: node tools/generate.mjs'
);
process.exit(failures ? 1 : 0);
