#!/usr/bin/env node
/**
 * Builds the whole repo from tools/coverage.json + tools/content/*.md.
 *
 * Generated: every SKILL.md, every script, manifest.json, and the generated
 * blocks inside README.md.
 * Hand-written: tools/content/*.md — positioning, use cases, FAQ answers.
 *
 *   node tools/generate.mjs           # write
 *   node tools/generate.mjs --check   # fail if the tree is out of date
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { PLATFORMS, CATCH_ALL, REPO, DISCLAIMER } from './platforms.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const SKILLS_DIR = join(ROOT, 'skills');
const coverage = JSON.parse(readFileSync(join(HERE, 'coverage.json'), 'utf8'));
const clientTemplate = readFileSync(join(HERE, 'templates', '_client.js'), 'utf8');

/** path -> contents. Written or diffed in one pass at the end. */
const files = new Map();
const emit = (relPath, contents) => files.set(relPath, contents);

// ---------------------------------------------------------------------------
// Content files
// ---------------------------------------------------------------------------

function parseContent(key) {
  const file = join(HERE, 'content', `${key}.md`);
  if (!existsSync(file)) throw new Error(`Missing prose file: tools/content/${key}.md`);
  const raw = readFileSync(file, 'utf8');

  const fm = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fm) throw new Error(`tools/content/${key}.md needs a --- frontmatter block`);

  const meta = {};
  for (const line of fm[1].split('\n')) {
    const m = line.match(/^([a-z_]+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].trim();
  }

  const sections = {};
  const body = fm[2];
  const parts = body.split(/^## /m).slice(1);
  for (const part of parts) {
    const nl = part.indexOf('\n');
    sections[part.slice(0, nl).trim()] = part.slice(nl + 1).trim();
  }

  for (const required of ['description']) {
    if (!meta[required]) throw new Error(`tools/content/${key}.md: missing "${required}" in frontmatter`);
  }
  for (const required of ['lede', 'when-to-use', 'when-not-to-use', 'faq']) {
    if (!sections[required]) throw new Error(`tools/content/${key}.md: missing "## ${required}" section`);
  }
  return { meta, sections, raw: body };
}

/**
 * Prose is hand-written, so it can name a script or a --section that the
 * generator does not actually produce. That kind of error is invisible in
 * review and wrong in public, so fail the build on it.
 */
function validateContentReferences(key, content, families) {
  const scripts = new Set(['_client.js', 'call_endpoint.js', ...families.map((f) => scriptName(f.name))]);
  const sections = new Set(
    families.flatMap((f) => f.sections.map((s) => s.section).filter(Boolean))
  );
  const problems = [];

  for (const [, name] of content.raw.matchAll(/`([a-z0-9_]+\.js)`/g)) {
    if (!scripts.has(name)) {
      problems.push(`references script \`${name}\`, which is not generated. Generated: ${[...scripts].sort().join(', ')}`);
    }
  }
  for (const [, name] of content.raw.matchAll(/--section=([a-z0-9-]+)/g)) {
    if (!sections.has(name)) {
      problems.push(`references \`--section=${name}\`, which does not exist. Valid: ${[...sections].sort().join(', ') || '(none)'}`);
    }
  }

  if (problems.length) {
    throw new Error(`tools/content/${key}.md:\n  - ${[...new Set(problems)].join('\n  - ')}`);
  }
}

// ---------------------------------------------------------------------------
// Families: grouping endpoints into scripts
// ---------------------------------------------------------------------------

/** A capability belongs to a prefix when it equals it or extends it by a segment. */
function prefixMatches(capability, prefix) {
  return capability === prefix || capability.startsWith(prefix + '-');
}

function resolveFamilies(key, endpoints) {
  const config = PLATFORMS[key];
  if (!config.families) {
    // Small platform: one script per endpoint.
    return endpoints.map((e) => ({
      name: e.capability,
      sections: [{ section: null, endpoint: e }],
      endpoints: [e],
    }));
  }

  const buckets = new Map(config.families.map((f) => [f.name, []]));
  const unmapped = [];

  for (const endpoint of endpoints) {
    let best = null;
    for (const family of config.families) {
      for (const prefix of family.prefixes) {
        if (prefixMatches(endpoint.capability, prefix)) {
          if (!best || prefix.length > best.prefix.length) best = { family, prefix };
        }
      }
    }
    if (!best) unmapped.push(endpoint.capability);
    else buckets.get(best.family.name).push(endpoint);
  }

  if (unmapped.length) {
    throw new Error(
      `${key}: these endpoints match no family in tools/platforms.mjs: ${unmapped.join(', ')}.\n` +
        `The API grew. Add them to a family so they get a script and stay documented.`
    );
  }

  const empty = [...buckets].filter(([, v]) => !v.length).map(([k]) => k);
  if (empty.length) {
    throw new Error(`${key}: families with no endpoints (stale config): ${empty.join(', ')}`);
  }

  return config.families.map((family) => {
    const list = buckets.get(family.name);
    const sections = list.map((endpoint) => ({
      section:
        endpoint.capability === family.name
          ? null
          : endpoint.capability.startsWith(family.name + '-')
            ? endpoint.capability.slice(family.name.length + 1)
            : endpoint.capability,
      endpoint,
    }));
    // Default section first, so docs and help text lead with it.
    sections.sort((a, b) => (a.section === null ? -1 : b.section === null ? 1 : a.section.localeCompare(b.section)));
    return { name: family.name, sections, endpoints: list };
  });
}

/** search-shaped scripts read better without the get_ prefix. */
function scriptName(familyName) {
  const base = familyName.replace(/-/g, '_');
  return familyName === 'search' || familyName.endsWith('-search') ? `${base}.js` : `get_${base}.js`;
}

// ---------------------------------------------------------------------------
// Script generation
// ---------------------------------------------------------------------------

const INPUT_ARG = {
  url: 'url',
  handle: 'handle',
  query: 'query',
  'url|handle': 'url-or-handle',
  none: null,
};

function costLabel(e) {
  const base = e.list ? `${e.credits} credit${e.credits === 1 ? '' : 's'} per ${e.unit}` : `${e.credits} credit${e.credits === 1 ? '' : 's'}`;
  return e.creditNote ? `${base} (${e.creditNote})` : base;
}

function buildScript(key, family) {
  const config = PLATFORMS[key];
  const multi = family.sections.length > 1;
  const defaultSection = family.sections.find((s) => s.section === null);
  const lines = [];

  lines.push('#!/usr/bin/env node');
  lines.push("'use strict';");
  lines.push('');
  lines.push('/**');
  lines.push(` * ${config.name}: ${family.name.replace(/-/g, ' ')}`);
  lines.push(' *');
  for (const { section, endpoint } of family.sections) {
    lines.push(` *   ${section ? `--section=${section}` : '(default)'} -> ${endpoint.path} — ${costLabel(endpoint)}`);
  }
  lines.push(' *');
  lines.push(' * Generated by tools/generate.mjs. Do not edit by hand.');
  lines.push(' */');
  lines.push('');
  lines.push("const { callEndpoint, commonParams, main, parseFlags, usage } = require('./_client.js');");
  lines.push('');

  // One table describing each section, so the script stays data-driven.
  lines.push('const SECTIONS = {');
  for (const { section, endpoint } of family.sections) {
    const name = section === null ? 'default' : section;
    lines.push(
      `  ${JSON.stringify(name)}: { path: ${JSON.stringify(endpoint.path)}, input: ${JSON.stringify(endpoint.input)}, list: ${endpoint.list} },`
    );
  }
  lines.push('};');
  lines.push('');
  lines.push('const { _, flags } = parseFlags(process.argv.slice(2));');
  lines.push('');

  if (multi) {
    // "default" is an implementation detail of the lookup table, not a value to advertise.
    const names = family.sections.filter((s) => s.section !== null).map((s) => s.section);
    const script = scriptName(family.name);
    if (defaultSection) {
      lines.push("const section = flags.section || 'default';");
      lines.push('if (!SECTIONS[section]) {');
      lines.push(
        `  usage(${JSON.stringify(
          `Usage: node ${script} <input> [--section=<${names.join('|')}>]\n` +
            `Omit --section for ${defaultSection.endpoint.capability} (${defaultSection.endpoint.path}).\n` +
            `Sections: ${names.join(', ')}`
        )});`
      );
      lines.push('}');
    } else {
      lines.push('const section = flags.section;');
      lines.push('if (!section || !SECTIONS[section]) {');
      lines.push(
        `  usage(${JSON.stringify(
          `Usage: node ${script} <input> --section=<${names.join('|')}>\nSections: ${names.join(', ')}`
        )});`
      );
      lines.push('}');
    }
    lines.push('const target = SECTIONS[section];');
  } else {
    lines.push('const target = SECTIONS.default;');
  }
  lines.push('');

  lines.push('const value = _[0] || flags.url || flags.handle || flags.query;');
  lines.push('const params = { ...commonParams(flags) };');
  lines.push('');
  lines.push('if (target.input !== \'none\') {');
  lines.push('  if (!value) {');
  lines.push(
    `    usage('Missing input. Usage: node ${scriptName(family.name)} <' + target.input + '>' + ${
      multi ? "(section === 'default' ? '' : ' --section=' + section)" : "''"
    });`
  );
  lines.push('  }');
  lines.push("  if (target.input === 'url|handle') {");
  lines.push("    params[/^https?:\\/\\//i.test(value) ? 'url' : 'handle'] = value;");
  lines.push('  } else {');
  lines.push('    params[target.input] = value;');
  lines.push('  }');
  lines.push('}');
  lines.push('');
  if (family.endpoints.some((e) => e.supportsIncludeEmail)) {
    lines.push("if (flags.include_email) params.include_email = 'true';");
    lines.push('');
  }
  lines.push('main(() => callEndpoint(target.path, params));');
  lines.push('');

  return lines.join('\n');
}

function buildCallEndpoint(key) {
  const config = PLATFORMS[key];
  return `#!/usr/bin/env node
'use strict';

/**
 * Escape hatch: call any ${config.name} endpoint by path, including ones that
 * have no dedicated script. Every flag after the path is passed through as a
 * query parameter.
 *
 *   node call_endpoint.js /v1/${key}/<capability> --handle nasa --limit 20
 *
 * Generated by tools/generate.mjs. Do not edit by hand.
 */

const { callEndpoint, main, parseFlags, usage } = require('./_client.js');

const PREFIX = '/v1/${key}/';
const { _, flags } = parseFlags(process.argv.slice(2));
const path = _[0];

if (!path) {
  usage('Usage: node call_endpoint.js ' + PREFIX + '<capability> [--param value ...]');
}
if (!path.startsWith(PREFIX)) {
  usage('This script only calls ' + PREFIX + '* paths. Got: ' + path);
}

const params = {};
for (const [name, value] of Object.entries(flags)) {
  params[name] = value === true ? 'true' : value;
}

main(() => callEndpoint(path, params));
`;
}

// ---------------------------------------------------------------------------
// SKILL.md
// ---------------------------------------------------------------------------

function frontmatter({ name, description, tags }) {
  return [
    '---',
    `name: ${name}`,
    `version: ${REPO.version}`,
    `description: ${description}`,
    `license: ${REPO.license}`,
    `author: ${REPO.author}`,
    `homepage: ${REPO.homepage}`,
    `repository: ${REPO.url}`,
    `tags: [${tags.join(', ')}]`,
    'metadata:',
    '  openclaw:',
    `    primaryEnv: ${REPO.envVar}`,
    `    homepage: ${REPO.homepage}`,
    '    requires:',
    '      env:',
    `        - ${REPO.envVar}`,
    '---',
    '',
  ].join('\n');
}

function scriptsTable(key, families) {
  const rows = ['| Script | What it does | Input | Credits |', '|---|---|---|---|'];
  for (const family of families) {
    const name = scriptName(family.name);
    for (const { section, endpoint } of family.sections) {
      const invocation = section ? `\`${name}\` \`--section=${section}\`` : `\`${name}\``;
      rows.push(
        `| ${invocation} | ${endpoint.summary || endpoint.capability} | ${endpoint.input} | ${costLabel(endpoint)} |`
      );
    }
  }
  rows.push(`| \`call_endpoint.js\` | Call any \`/v1/${key}/\` endpoint directly | path + params | varies |`);
  return rows.join('\n');
}

function endpointTable(endpoints) {
  const rows = ['| Endpoint | Input | Returns | Credits | Paginated |', '|---|---|---|---|---|'];
  for (const e of endpoints) {
    rows.push(
      `| \`${e.path}\` | ${e.input} | ${e.unit} | ${costLabel(e)} | ${e.list ? 'yes' : 'no'} |`
    );
  }
  return rows.join('\n');
}

function exampleFor(key, endpoints) {
  // Prefer the cheapest non-paginated endpoint with a simple input.
  const candidates = endpoints
    .filter((e) => e.input !== 'none')
    .sort((a, b) => a.credits - b.credits);
  return candidates[0] || endpoints[0];
}

function sampleArg(input) {
  switch (input) {
    case 'url': return 'https://example.com/some-public-url';
    case 'handle': return 'nasa';
    case 'query': return '"coffee shops"';
    case 'url|handle': return 'nasa';
    default: return '';
  }
}

function buildSkillMd(key, endpoints, families, content) {
  const config = PLATFORMS[key];
  const { meta, sections } = content;
  const tags = [...new Set([...config.tags, 'social-media', 'api', 'mcp'])];
  const total = endpoints.length;
  const example = exampleFor(key, endpoints);
  const exampleFamily = families.find((f) => f.endpoints.includes(example));
  const exampleSection = exampleFamily.sections.find((s) => s.endpoint === example);

  const out = [];
  out.push(frontmatter({ name: config.slug, description: meta.description, tags }));
  out.push(`# ${config.name} API skill`);
  out.push('');
  out.push(sections.lede);
  out.push('');
  out.push(
    `This skill wraps **${total} live ${config.name} endpoint${total === 1 ? '' : 's'}** from the ` +
      `[ScraperSocial](${REPO.homepage}) API. Public data only, returned as clean JSON.`
  );
  out.push('');
  out.push('## When to use this skill');
  out.push('');
  out.push(sections['when-to-use']);
  out.push('');
  out.push('### Do not use this skill when');
  out.push('');
  out.push(sections['when-not-to-use']);
  out.push('');
  out.push('## Setup');
  out.push('');
  out.push('```bash');
  out.push(`export ${REPO.envVar}=sk_live_...   # https://scrapersocial.com/app/keys`);
  out.push('```');
  out.push('');
  out.push(
    `Signing up at [scrapersocial.com/signup](https://scrapersocial.com/signup) includes 100 free credits, no card required.`
  );
  out.push('');
  out.push('## Scripts');
  out.push('');
  out.push(scriptsTable(key, families));
  out.push('');
  out.push(
    'Every script also accepts `--limit`, `--cursor`, `--fields`, `--format` and `--fresh`. ' +
      '`--limit` is clamped to 50: above that the API returns an async job instead of data.'
  );
  out.push('');
  out.push('## Example');
  out.push('');
  out.push('```bash');
  out.push(
    `node skills/${config.slug}/scripts/${scriptName(exampleFamily.name)} ${sampleArg(example.input)}${
      exampleSection.section ? ` --section=${exampleSection.section}` : ''
    }`.trim()
  );
  out.push('```');
  out.push('');
  if (sections.examples) {
    out.push(sections.examples);
    out.push('');
  }
  out.push('Every response uses the same envelope:');
  out.push('');
  out.push('```json');
  out.push('{ "data": {}, "meta": { "count": 20, "next_cursor": "..." }, "request_id": "a18e4ef88ad4b00b" }');
  out.push('```');
  out.push('');
  out.push('`meta` appears on paginated endpoints only. Keep `request_id` — support traces calls with it.');
  out.push('');
  out.push('## Endpoints');
  out.push('');
  out.push(endpointTable(endpoints));
  out.push('');
  out.push('Costs shown per item for paginated endpoints, per call otherwise. Failed calls are not charged.');
  out.push('');
  out.push('## FAQ');
  out.push('');
  out.push(sections.faq);
  out.push('');
  out.push('## Links');
  out.push('');
  out.push(`- [${config.name} data on ScraperSocial](${REPO.homepage})`);
  out.push(`- [All ${coverage.platformCount} platform skills](${REPO.url})`);
  out.push('- [OpenAPI spec](https://scrapersocial.com/openapi.json) · [llms.txt](https://scrapersocial.com/llms.txt)');
  out.push('');
  out.push('## Disclaimer');
  out.push('');
  out.push(DISCLAIMER);
  out.push('');

  return out.join('\n');
}

// ---------------------------------------------------------------------------
// Build every skill
// ---------------------------------------------------------------------------

const manifestSkills = [];
const readmeRows = [];
/** --only=<platform> regenerates a single skill, for hand-review while iterating. */
const only = (process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1] || null;
const allPlatformKeys = Object.keys(coverage.platforms).sort();
const platformKeys = only ? allPlatformKeys.filter((k) => k === only) : allPlatformKeys;
if (only && !platformKeys.length) throw new Error(`--only=${only}: no such platform in coverage.json`);

for (const key of platformKeys) {
  const config = PLATFORMS[key];
  if (!config) {
    throw new Error(
      `Platform "${key}" is live in the API but has no entry in tools/platforms.mjs.\n` +
        `Add a slug and display name before regenerating, or its skill folder would be wrong.`
    );
  }
  const endpoints = coverage.platforms[key];
  const content = parseContent(key);
  const families = resolveFamilies(key, endpoints);
  validateContentReferences(key, content, families);
  const dir = `skills/${config.slug}`;

  emit(`${dir}/SKILL.md`, buildSkillMd(key, endpoints, families, content));
  emit(`${dir}/scripts/_client.js`, clientTemplate);
  emit(`${dir}/scripts/call_endpoint.js`, buildCallEndpoint(key));
  for (const family of families) {
    emit(`${dir}/scripts/${scriptName(family.name)}`, buildScript(key, family));
  }

  manifestSkills.push({
    name: config.slug,
    path: `${dir}/SKILL.md`,
    description: content.meta.description,
    endpoints: endpoints.length,
  });
  readmeRows.push(
    `| [${config.slug}](${dir}/) | ${config.name} | ${endpoints.length} | ${content.meta.tagline || content.meta.description} |`
  );
}

// The catch-all skill: reaches every endpoint, including any added after this
// repo was last generated.
if (!only) {
  const content = parseContent('social-media-api');
  const dir = `skills/${CATCH_ALL.slug}`;
  const flat = platformKeys.flatMap((key) =>
    coverage.platforms[key].map((e) => ({ platform: key, ...e }))
  );

  emit(
    `${dir}/scripts/endpoints.json`,
    JSON.stringify(
      { platformCount: coverage.platformCount, endpointCount: coverage.endpointCount, endpoints: flat },
      null,
      2
    ) + '\n'
  );
  emit(`${dir}/scripts/_client.js`, clientTemplate);
  emit(
    `${dir}/scripts/list_endpoints.js`,
    `#!/usr/bin/env node
'use strict';

/**
 * List every endpoint this repo knows about. Reads a bundled snapshot, so it
 * costs nothing and needs no API key.
 *
 *   node list_endpoints.js                 # all platforms
 *   node list_endpoints.js --platform tiktok
 *   node list_endpoints.js --search transcript
 *
 * Generated by tools/generate.mjs. Do not edit by hand.
 */

const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { parseFlags } = require('./_client.js');

const catalog = JSON.parse(readFileSync(join(__dirname, 'endpoints.json'), 'utf8'));
const { flags } = parseFlags(process.argv.slice(2));

let rows = catalog.endpoints;
if (flags.platform) rows = rows.filter((e) => e.platform === flags.platform);
if (flags.search) {
  const needle = String(flags.search).toLowerCase();
  rows = rows.filter((e) => (e.path + ' ' + e.summary).toLowerCase().includes(needle));
}

process.stdout.write(JSON.stringify({ count: rows.length, endpoints: rows }, null, 2) + '\\n');
`
  );
  emit(
    `${dir}/scripts/call_endpoint.js`,
    `#!/usr/bin/env node
'use strict';

/**
 * Call any ScraperSocial endpoint by path. Flags become query parameters.
 *
 *   node call_endpoint.js /v1/reddit/subreddit --handle programming --limit 10
 *
 * Generated by tools/generate.mjs. Do not edit by hand.
 */

const { callEndpoint, main, parseFlags, usage } = require('./_client.js');

const { _, flags } = parseFlags(process.argv.slice(2));
const path = _[0];

if (!path || !path.startsWith('/v1/')) {
  usage('Usage: node call_endpoint.js /v1/<platform>/<capability> [--param value ...]');
}

const params = {};
for (const [name, value] of Object.entries(flags)) {
  params[name] = value === true ? 'true' : value;
}

main(() => callEndpoint(path, params));
`
  );

  const out = [];
  out.push(
    frontmatter({
      name: CATCH_ALL.slug,
      description: content.meta.description,
      tags: [...CATCH_ALL.tags, 'social-media'],
    })
  );
  out.push('# Social media API skill');
  out.push('');
  out.push(content.sections.lede);
  out.push('');
  out.push(
    `This skill reaches **all ${coverage.endpointCount} endpoints across ${coverage.platformCount} platforms** ` +
      `in one place, instead of one skill per platform.`
  );
  out.push('');
  out.push('## When to use this skill');
  out.push('');
  out.push(content.sections['when-to-use']);
  out.push('');
  out.push('### Do not use this skill when');
  out.push('');
  out.push(content.sections['when-not-to-use']);
  out.push('');
  out.push('## Setup');
  out.push('');
  out.push('```bash');
  out.push(`export ${REPO.envVar}=sk_live_...   # https://scrapersocial.com/app/keys`);
  out.push('```');
  out.push('');
  out.push('## Scripts');
  out.push('');
  out.push('| Script | What it does | Credits |');
  out.push('|---|---|---|');
  out.push('| `list_endpoints.js` | List every endpoint, filterable by platform or keyword | free, no key needed |');
  out.push('| `call_endpoint.js` | Call any endpoint by path | the endpoint\'s own cost |');
  out.push('');
  out.push('```bash');
  out.push(`node skills/${CATCH_ALL.slug}/scripts/list_endpoints.js --search transcript`);
  out.push(`node skills/${CATCH_ALL.slug}/scripts/call_endpoint.js /v1/github/profile --handle torvalds`);
  out.push('```');
  out.push('');
  if (content.sections.examples) {
    out.push(content.sections.examples);
    out.push('');
  }
  out.push('## Platforms');
  out.push('');
  out.push('| Platform | Path segment | Endpoints |');
  out.push('|---|---|---|');
  for (const key of platformKeys) {
    out.push(`| ${PLATFORMS[key].name} | \`/v1/${key}/\` | ${coverage.platforms[key].length} |`);
  }
  out.push('');
  out.push('## FAQ');
  out.push('');
  out.push(content.sections.faq);
  out.push('');
  out.push('## Disclaimer');
  out.push('');
  out.push(DISCLAIMER);
  out.push('');

  emit(`${dir}/SKILL.md`, out.join('\n'));
  manifestSkills.push({
    name: CATCH_ALL.slug,
    path: `${dir}/SKILL.md`,
    description: content.meta.description,
    endpoints: coverage.endpointCount,
  });
  readmeRows.push(
    `| [${CATCH_ALL.slug}](${dir}/) | All platforms | ${coverage.endpointCount} | ${content.meta.tagline} |`
  );
}

// ---------------------------------------------------------------------------
// manifest.json + README blocks
// ---------------------------------------------------------------------------

if (!only) emit(
  'manifest.json',
  JSON.stringify(
    {
      name: REPO.name,
      version: REPO.version,
      description: `Agent skills for reading public data from ${coverage.platformCount} platforms through the ScraperSocial API.`,
      author: REPO.author,
      homepage: REPO.homepage,
      repository: REPO.url,
      license: REPO.license,
      skills: manifestSkills,
    },
    null,
    2
  ) + '\n'
);

const README = join(ROOT, 'README.md');
if (!only && existsSync(README)) {
  let readme = readFileSync(README, 'utf8');
  // Sample output must be a real recorded call, never an invented one. If no
  // capture exists yet, say so plainly rather than showing something made up.
  const captureFile = join(HERE, 'captures', 'github.profile.json');
  let sample;
  if (existsSync(captureFile)) {
    const capture = JSON.parse(readFileSync(captureFile, 'utf8'));
    sample =
      `Real response from \`${capture.captured_from}\`, trimmed for length:\n\n` +
      '```json\n' +
      JSON.stringify(capture.response, null, 2) +
      '\n```';
  } else {
    sample =
      '> **Note:** no captured sample output is committed yet. The response shape shown below is ' +
      'taken from the [OpenAPI spec](https://scrapersocial.com/openapi.json) — it is not a recorded call. ' +
      'Run `SCRAPERSOCIAL_KEY=... node tools/capture.mjs` to record real output and regenerate.';
  }

  const blocks = {
    skills: ['| Skill | Platform | Endpoints | What it covers |', '|---|---|---|---|', ...readmeRows].join('\n'),
    counts: `${coverage.endpointCount} endpoints across ${coverage.platformCount} platforms`,
    sample,
  };
  for (const [name, value] of Object.entries(blocks)) {
    const re = new RegExp(
      `(<!-- generated:${name} -->)[\\s\\S]*?(<!-- /generated:${name} -->)`,
      'g'
    );
    if (!re.test(readme)) throw new Error(`README.md is missing the <!-- generated:${name} --> markers`);
    readme = readme.replace(re, `$1\n${value}\n$2`);
  }
  emit('README.md', readme);
}

// ---------------------------------------------------------------------------
// Write or check
// ---------------------------------------------------------------------------

function listExisting(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) listExisting(full, acc);
    else acc.push(relative(ROOT, full));
  }
  return acc;
}

const check = process.argv.includes('--check');
const existing = new Set(listExisting(SKILLS_DIR));
const stale = only ? [] : [...existing].filter((f) => !files.has(f));
const drift = [];

for (const [relPath, contents] of files) {
  const full = join(ROOT, relPath);
  const current = existsSync(full) ? readFileSync(full, 'utf8') : null;
  if (current === contents) continue;
  drift.push(relPath);
  if (!check) {
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, contents);
  }
}

if (check) {
  if (drift.length || stale.length) {
    console.error('Generated tree is out of date. Run: node tools/generate.mjs');
    for (const f of drift) console.error(`  changed: ${f}`);
    for (const f of stale) console.error(`  stale:   ${f}`);
    process.exit(1);
  }
  console.log(`Generated tree is up to date (${files.size} files).`);
} else {
  for (const f of stale) rmSync(join(ROOT, f));
  console.log(
    `Generated ${files.size} files: ${manifestSkills.length} skills, ` +
      `${coverage.endpointCount} endpoints across ${coverage.platformCount} platforms.` +
      (stale.length ? ` Removed ${stale.length} stale file(s).` : '')
  );
}
