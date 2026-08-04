/**
 * Presentation config for each platform.
 *
 * This file holds only things a machine cannot derive: the folder name, the
 * human-readable brand name, SEO tags, and how many scripts a big platform's
 * endpoints should be grouped into. Endpoint facts — paths, credits, inputs —
 * never appear here; they come from coverage.json.
 *
 * `slug` is the skill folder (hyphens). `key` is the API path segment and keeps
 * the registry spelling: underscores where the registry has them (app_store),
 * and no separator at all where it doesn't (tiktokshop, hackernews). Getting
 * this mapping wrong makes every call on that platform 404.
 *
 * `families` groups related capabilities behind one script with a --section
 * flag, so no skill ships dozens of near-identical scripts. A family matches a
 * capability when the capability equals a prefix or starts with `prefix-`;
 * the longest matching prefix wins. Platforms without `families` get one
 * script per endpoint. generate.mjs fails loudly if a new endpoint matches no
 * family, so coverage growth can never silently go undocumented.
 */

export const REPO = {
  name: 'social-media-api-skills',
  version: '1.0.0',
  owner: 'nikhonit',
  url: 'https://github.com/nikhonit/social-media-api-skills',
  homepage: 'https://scrapersocial.com',
  author: 'ScraperSocial',
  license: 'MIT-0',
  envVar: 'SCRAPERSOCIAL_KEY',
  apiBase: 'https://api.scrapersocial.com',
  mcp: 'https://mcp.scrapersocial.com',
  support: 'support@scrapersocial.com',
};

export const DISCLAIMER =
  'ScraperSocial is an independent product and is not affiliated with, endorsed by, ' +
  'or sponsored by any platform named in this repository. All product names, logos and ' +
  'brands are property of their respective owners. These skills return only publicly ' +
  'available data.';

export const PLATFORMS = {
  amazon: { slug: 'amazon-api', name: 'Amazon', tags: ['amazon', 'ecommerce', 'reviews', 'product-data'] },
  app_store: { slug: 'app-store-api', name: 'App Store', tags: ['app-store', 'ios', 'aso', 'reviews'] },
  bluesky: { slug: 'bluesky-api', name: 'Bluesky', tags: ['bluesky', 'atproto', 'social-media'] },
  facebook: {
    slug: 'facebook-api',
    name: 'Facebook',
    tags: ['facebook', 'transcript', 'ads', 'marketplace', 'social-media'],
    families: [
      { name: 'stats', prefixes: ['stats', 'page-stats'] },
      { name: 'transcript', prefixes: ['transcript', 'summary'] },
      { name: 'comments', prefixes: ['comments', 'comment-replies'] },
      { name: 'posts', prefixes: ['channel-posts', 'group-posts', 'reels', 'photos'] },
      { name: 'audience', prefixes: ['followers', 'following'] },
      { name: 'page', prefixes: ['page-ads', 'page-search', 'page-events'] },
      { name: 'ads', prefixes: ['ad', 'ads-search'] },
      { name: 'marketplace', prefixes: ['marketplace-item', 'marketplace-search'] },
      { name: 'events', prefixes: ['event', 'events-search'] },
      { name: 'reviews', prefixes: ['reviews'] },
      { name: 'download', prefixes: ['download'] },
    ],
  },
  github: {
    slug: 'github-api',
    name: 'GitHub',
    tags: ['github', 'repos', 'developer-data', 'trending'],
    families: [
      { name: 'repo', prefixes: ['repo'] },
      { name: 'repos', prefixes: ['org-repos', 'user-repos'] },
      { name: 'profile', prefixes: ['profile'] },
      { name: 'trending', prefixes: ['trending'] },
    ],
  },
  google: { slug: 'google-api', name: 'Google', tags: ['google', 'serp', 'business-profile', 'reviews'] },
  google_finance: { slug: 'google-finance-api', name: 'Google Finance', tags: ['google-finance', 'stocks', 'quotes', 'market-data'] },
  google_maps: { slug: 'google-maps-api', name: 'Google Maps', tags: ['google-maps', 'places', 'local-seo', 'contacts'] },
  google_news: { slug: 'google-news-api', name: 'Google News', tags: ['google-news', 'news', 'headlines'] },
  google_play: { slug: 'google-play-api', name: 'Google Play', tags: ['google-play', 'android', 'aso', 'reviews'] },
  google_shopping: { slug: 'google-shopping-api', name: 'Google Shopping', tags: ['google-shopping', 'ecommerce', 'price-data'] },
  google_trends: { slug: 'google-trends-api', name: 'Google Trends', tags: ['google-trends', 'trends', 'keyword-research'] },
  hackernews: { slug: 'hacker-news-api', name: 'Hacker News', tags: ['hacker-news', 'hn', 'tech-news', 'comments'] },
  instagram: {
    slug: 'instagram-api',
    name: 'Instagram',
    tags: ['instagram', 'reels', 'transcript', 'hashtags', 'social-media'],
    families: [
      { name: 'profile', prefixes: ['profile', 'similar', 'tagged'] },
      { name: 'channel', prefixes: ['channel'] },
      { name: 'hashtag', prefixes: ['hashtag'] },
      { name: 'location', prefixes: ['location'] },
      { name: 'search', prefixes: ['keyword-search', 'reels-search'] },
      { name: 'comments', prefixes: ['comments'] },
      { name: 'transcript', prefixes: ['transcript', 'summary'] },
      { name: 'download', prefixes: ['download'] },
      { name: 'stats', prefixes: ['stats'] },
    ],
  },
  kwai: { slug: 'kwai-api', name: 'Kwai', tags: ['kwai', 'short-video', 'social-media'] },
  linkedin: {
    slug: 'linkedin-api',
    name: 'LinkedIn',
    tags: ['linkedin', 'b2b', 'lead-generation', 'jobs', 'recruiting'],
    families: [
      { name: 'profile', prefixes: ['profile'] },
      { name: 'company', prefixes: ['company'] },
      { name: 'post', prefixes: ['post'] },
      { name: 'people-search', prefixes: ['people-search'] },
      { name: 'job-search', prefixes: ['job-search'] },
      { name: 'ads-search', prefixes: ['ads-search'] },
      { name: 'comments', prefixes: ['comments'] },
      { name: 'search', prefixes: ['search'] },
      { name: 'stats', prefixes: ['stats'] },
    ],
  },
  linkme: { slug: 'linkme-api', name: 'Linkme', tags: ['linkme', 'link-in-bio', 'creator'] },
  linktree: { slug: 'linktree-api', name: 'Linktree', tags: ['linktree', 'link-in-bio', 'creator'] },
  naver: { slug: 'naver-api', name: 'Naver', tags: ['naver', 'korea', 'blog', 'shopping'] },
  pinterest: { slug: 'pinterest-api', name: 'Pinterest', tags: ['pinterest', 'pins', 'visual-search'] },
  polymarket: { slug: 'polymarket-api', name: 'Polymarket', tags: ['polymarket', 'prediction-markets', 'odds'] },
  reddit: { slug: 'reddit-api', name: 'Reddit', tags: ['reddit', 'subreddit', 'comments', 'social-media'] },
  snapchat: { slug: 'snapchat-api', name: 'Snapchat', tags: ['snapchat', 'creator', 'social-media'] },
  spotify: { slug: 'spotify-api', name: 'Spotify', tags: ['spotify', 'music', 'playlists', 'artists'] },
  threads: { slug: 'threads-api', name: 'Threads', tags: ['threads', 'meta', 'social-media'] },
  tiktok: {
    slug: 'tiktok-api',
    name: 'TikTok',
    tags: ['tiktok', 'transcript', 'hashtags', 'creator-analytics', 'social-media'],
    families: [
      { name: 'channel', prefixes: ['channel'] },
      { name: 'audience', prefixes: ['followers', 'following'] },
      { name: 'search', prefixes: ['search', 'top-search', 'hashtag-search', 'user-search'] },
      { name: 'song', prefixes: ['song'] },
      { name: 'transcript', prefixes: ['transcript', 'summary'] },
      { name: 'comments', prefixes: ['comments'] },
      { name: 'stats', prefixes: ['stats'] },
    ],
  },
  tiktokshop: { slug: 'tiktok-shop-api', name: 'TikTok Shop', tags: ['tiktok-shop', 'ecommerce', 'product-reviews'] },
  tripadvisor: { slug: 'tripadvisor-api', name: 'Tripadvisor', tags: ['tripadvisor', 'travel', 'reviews', 'hotels'] },
  trustpilot: { slug: 'trustpilot-api', name: 'Trustpilot', tags: ['trustpilot', 'reviews', 'reputation'] },
  truthsocial: { slug: 'truth-social-api', name: 'Truth Social', tags: ['truth-social', 'social-media'] },
  twitch: { slug: 'twitch-api', name: 'Twitch', tags: ['twitch', 'streaming', 'clips', 'creator'] },
  twitter: { slug: 'twitter-api', name: 'X (Twitter)', tags: ['twitter', 'x', 'tweets', 'transcript', 'social-media'] },
  youtube: {
    slug: 'youtube-api',
    name: 'YouTube',
    tags: ['youtube', 'transcript', 'captions', 'comments', 'video-data'],
    families: [
      { name: 'transcript', prefixes: ['transcript', 'captions', 'subtitles'] },
      { name: 'channel', prefixes: ['channel'] },
      { name: 'comments', prefixes: ['comments', 'comment'] },
      { name: 'search', prefixes: ['search', 'streams-search', 'hashtag-search'] },
      { name: 'shorts', prefixes: ['shorts'] },
      { name: 'media', prefixes: ['video', 'thumbnails'] },
      { name: 'playlist', prefixes: ['playlist'] },
      { name: 'trending', prefixes: ['trending'] },
      { name: 'stats', prefixes: ['stats'] },
    ],
  },
};

/** The one skill that is not a platform: a generic gateway to the whole surface. */
export const CATCH_ALL = {
  slug: 'social-media-api',
  name: 'Social media',
  tags: ['social-media-api', 'mcp', 'agent-skills', 'api', 'web-scraping'],
};
