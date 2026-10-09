'use strict';
// Test-only preload (loaded via NODE_OPTIONS=--require). The shipped scripts
// hardcode https://api.scrapersocial.com; this swaps that origin for the local
// mock server so the suite never touches the network. It exists only here.
const target = process.env.SCRAPERSOCIAL_TEST_BASE;
if (target) {
  const real = globalThis.fetch;
  globalThis.fetch = (input, init) => {
    const href = input instanceof URL ? input.href : typeof input === 'string' ? input : input.url;
    const url = new URL(href);
    if (url.origin === 'https://api.scrapersocial.com') {
      const mock = new URL(target);
      url.protocol = mock.protocol;
      url.host = mock.host;
    }
    return real(url.toString(), init);
  };
}

// The shipped client uses a fixed 60s request timeout. Tests that exercise the
// timeout path cap it here instead of through the client, so no environment
// variable reaches the shipped code.
const cap = Number(process.env.SCRAPERSOCIAL_TEST_TIMEOUT_MS);
if (cap > 0) {
  const realTimeout = AbortSignal.timeout.bind(AbortSignal);
  AbortSignal.timeout = (ms) => realTimeout(Math.min(ms, cap));
}
