/**
 * Tests the scripts that actually ship, by pointing them at a local HTTP server
 * via SCRAPERSOCIAL_API_BASE. No network, no API key, no credits spent.
 */
import { test, before, after, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

/** Set by each test to control how the fake API responds. */
let handler;
/** Every request the fake API received, in order. */
let received;
let baseUrl;
let server;

before(async () => {
  server = createServer((req, res) => {
    received.push(req);
    handler(req, res);
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

function ok(req, res) {
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ data: { echo: req.url }, request_id: 'test-req-id' }));
}

/** Run a shipped script and resolve with its exit code, stdout and stderr. */
function run(script, args = [], env = {}) {
  received = [];
  return new Promise((resolve) => {
    execFile(
      process.execPath,
      [join(ROOT, script), ...args],
      {
        env: {
          PATH: process.env.PATH,
          SCRAPERSOCIAL_KEY: 'sk_live_test',
          SCRAPERSOCIAL_API_BASE: baseUrl,
          ...env,
        },
      },
      (error, stdout, stderr) => resolve({ code: error ? error.code ?? 1 : 0, stdout, stderr })
    );
  });
}

describe('URL building', () => {
  test('handle input becomes ?handle=', async () => {
    handler = ok;
    const { code } = await run('skills/github-api/scripts/get_profile.js', ['torvalds']);
    assert.equal(code, 0);
    assert.equal(received[0].url, '/v1/github/profile?handle=torvalds');
  });

  test('query input becomes ?query=', async () => {
    handler = ok;
    await run('skills/google-news-api/scripts/search.js', ['climate policy']);
    assert.equal(received[0].url, '/v1/google_news/search?query=climate+policy');
  });

  test('url|handle endpoint picks url for an http argument', async () => {
    handler = ok;
    await run('skills/trustpilot-api/scripts/get_reviews.js', ['https://www.trustpilot.com/review/example.com']);
    assert.match(received[0].url, /^\/v1\/trustpilot\/reviews\?url=https/);
  });

  test('url|handle endpoint picks handle for a bare argument', async () => {
    handler = ok;
    await run('skills/trustpilot-api/scripts/get_reviews.js', ['example.com']);
    assert.equal(received[0].url, '/v1/trustpilot/reviews?handle=example.com');
  });

  test('--section selects the right endpoint path', async () => {
    handler = ok;
    await run('skills/tiktok-api/scripts/get_transcript.js', ['https://tiktok.com/@a/video/1', '--section=summary']);
    assert.match(received[0].url, /^\/v1\/tiktok\/summary\?/);
  });

  test('omitting --section uses the family default', async () => {
    handler = ok;
    await run('skills/tiktok-api/scripts/get_transcript.js', ['https://tiktok.com/@a/video/1']);
    assert.match(received[0].url, /^\/v1\/tiktok\/transcript\?/);
  });

  test('no-input endpoints send no input parameter', async () => {
    handler = ok;
    await run('skills/youtube-api/scripts/get_trending.js', []);
    assert.equal(received[0].url, '/v1/youtube/trending');
  });

  test('call_endpoint.js passes arbitrary flags through', async () => {
    handler = ok;
    await run('skills/reddit-api/scripts/call_endpoint.js', [
      '/v1/reddit/subreddit',
      '--handle',
      'programming',
      '--limit',
      '5',
    ]);
    assert.equal(received[0].url, '/v1/reddit/subreddit?handle=programming&limit=5');
  });
});

describe('request headers', () => {
  test('sends bearer auth and a identifying user-agent', async () => {
    handler = ok;
    await run('skills/github-api/scripts/get_profile.js', ['torvalds']);
    assert.equal(received[0].headers.authorization, 'Bearer sk_live_test');
    assert.match(received[0].headers['user-agent'], /social-media-api-skills/);
  });
});

describe('limit handling', () => {
  test('clamps limit to 50 so the API does not return an async job', async () => {
    handler = ok;
    const { stderr } = await run('skills/reddit-api/scripts/get_subreddit.js', [
      'programming',
      '--limit',
      '500',
    ]);
    assert.match(received[0].url, /limit=50(&|$)/);
    assert.match(stderr, /clamped to 50/);
  });

  test('passes a limit under the cap through unchanged', async () => {
    handler = ok;
    await run('skills/reddit-api/scripts/get_subreddit.js', ['programming', '--limit', '10']);
    assert.match(received[0].url, /limit=10(&|$)/);
  });

  test('rejects a non-numeric limit without calling the API', async () => {
    handler = ok;
    const { code, stderr } = await run('skills/reddit-api/scripts/get_subreddit.js', [
      'programming',
      '--limit',
      'abc',
    ]);
    assert.equal(code, 1);
    assert.equal(received.length, 0);
    assert.match(stderr, /invalid_limit/);
  });
});

describe('error handling', () => {
  test('missing API key exits non-zero and names the env var', async () => {
    handler = ok;
    const { code, stderr } = await run(
      'skills/github-api/scripts/get_profile.js',
      ['torvalds'],
      { SCRAPERSOCIAL_KEY: '' }
    );
    assert.equal(code, 1);
    assert.match(stderr, /SCRAPERSOCIAL_KEY/);
    assert.match(stderr, /scrapersocial\.com\/app\/keys/);
    assert.equal(received.length, 0, 'must not call the API without a key');
  });

  test('missing required argument exits 2 with usage', async () => {
    handler = ok;
    const { code, stderr } = await run('skills/github-api/scripts/get_profile.js', []);
    assert.equal(code, 2);
    assert.match(stderr, /Usage/);
    assert.equal(received.length, 0);
  });

  test('surfaces the API error code, hint and request_id', async () => {
    handler = (req, res) => {
      res.writeHead(400, { 'content-type': 'application/json' });
      res.end(
        JSON.stringify({
          error: {
            code: 'invalid_handle',
            message: 'Handle is not valid.',
            hint: 'Pass the handle without @.',
            request_id: 'abc123',
          },
        })
      );
    };
    const { code, stderr } = await run('skills/github-api/scripts/get_profile.js', ['@bad']);
    assert.equal(code, 1);
    const payload = JSON.parse(stderr);
    assert.equal(payload.error, 'invalid_handle');
    assert.equal(payload.request_id, 'abc123');
    assert.match(payload.detail, /without @/);
  });

  test('does not retry a 4xx', async () => {
    handler = (req, res) => {
      res.writeHead(404, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: { code: 'not_found', message: 'gone' } }));
    };
    const { code } = await run('skills/github-api/scripts/get_profile.js', ['ghost']);
    assert.equal(code, 1);
    assert.equal(received.length, 1, '4xx other than 429 must not be retried');
  });

  test('retries a 502 and succeeds', async () => {
    let calls = 0;
    handler = (req, res) => {
      calls += 1;
      if (calls < 3) {
        res.writeHead(502, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ error: { code: 'upstream_failure' } }));
        return;
      }
      ok(req, res);
    };
    const { code, stdout } = await run('skills/github-api/scripts/get_profile.js', ['torvalds']);
    assert.equal(code, 0);
    assert.equal(received.length, 3);
    assert.equal(JSON.parse(stdout).request_id, 'test-req-id');
  });

  test('retries a 429', async () => {
    let calls = 0;
    handler = (req, res) => {
      calls += 1;
      if (calls === 1) {
        res.writeHead(429, { 'content-type': 'application/json', 'retry-after': '0' });
        res.end(JSON.stringify({ error: { code: 'rate_limited' } }));
        return;
      }
      ok(req, res);
    };
    const { code } = await run('skills/github-api/scripts/get_profile.js', ['torvalds']);
    assert.equal(code, 0);
    assert.equal(received.length, 2);
  });
});

describe('parseFlags', () => {
  const { parseFlags } = require(join(ROOT, 'skills/github-api/scripts/_client.js'));

  test('parses --flag value, --flag=value and bare flags', () => {
    const { _, flags } = parseFlags(['torvalds', '--limit', '5', '--fields=id,name', '--fresh']);
    assert.deepEqual(_, ['torvalds']);
    assert.equal(flags.limit, '5');
    assert.equal(flags.fields, 'id,name');
    assert.equal(flags.fresh, true);
  });
});
