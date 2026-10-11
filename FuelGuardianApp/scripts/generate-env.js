const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const ENV_FILE = path.join(ROOT_DIR, '.env');
const EXAMPLE_FILE = path.join(ROOT_DIR, '.env.example');
const OUTPUT_DIR = path.join(ROOT_DIR, 'src', 'assets');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'env.js');

const FALLBACK_BASE_URL = 'https://localhost:7154/';

function normalizeBaseUrl(value) {
  try {
    const url = new URL(String(value).trim());
    if (!url.pathname.endsWith('/')) {
      url.pathname += '/';
    }
    return url.href;
  } catch {
    return null;
  }
}

const ENV_KEYS = [
  {
    envKey: 'BASE_URL',
    windowKey: 'baseURL',
    fallback: FALLBACK_BASE_URL,
    normalize: normalizeBaseUrl,
  },
];

function parseEnvFile(contents) {
  const vars = {};

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).replace(/^export\s+/, '').trim();
    let value = line.slice(separatorIndex + 1).trim();

    const isDoubleQuoted = value.startsWith('"') && value.endsWith('"');
    const isSingleQuoted = value.startsWith("'") && value.endsWith("'");
    if (isDoubleQuoted || isSingleQuoted) {
      value = value.slice(1, -1);
    } else {
      const commentIndex = value.indexOf(' #');
      if (commentIndex !== -1) {
        value = value.slice(0, commentIndex).trim();
      }
    }

    if (key) {
      vars[key] = value;
    }
  }

  return vars;
}

function loadEnv() {
  if (fs.existsSync(ENV_FILE)) {
    return { vars: parseEnvFile(fs.readFileSync(ENV_FILE, 'utf8')), source: '.env' };
  }
  if (fs.existsSync(EXAMPLE_FILE)) {
    return { vars: parseEnvFile(fs.readFileSync(EXAMPLE_FILE, 'utf8')), source: '.env.example' };
  }
  return { vars: {}, source: null };
}

function resolveValue(config, vars) {
  const rawValue = vars[config.envKey];
  if (rawValue === undefined || rawValue === '') {
    console.warn(`[env] ${config.envKey} not set, falling back to "${config.fallback}"`);
    return config.fallback;
  }

  const normalized = config.normalize ? config.normalize(rawValue) : rawValue;
  if (normalized === null) {
    console.warn(`[env] Invalid ${config.envKey} "${rawValue}", falling back to "${config.fallback}"`);
    return config.fallback;
  }

  return normalized;
}

function main() {
  console.log('[env] Generating runtime environment from .env file');

  const { vars, source } = loadEnv();
  if (!source) {
    console.warn('[env] No .env or .env.example found, using built-in defaults');
  } else if (source === '.env.example') {
    console.warn('[env] No .env file found, falling back to .env.example');
  }

  const entries = ENV_KEYS.map((config) => {
    const value = resolveValue(config, vars);
    console.log(`[env]   ${config.windowKey} = ${value}`);
    return `  window.__env.${config.windowKey} = ${JSON.stringify(value)};`;
  });

  const output = [
    '(function (window) {',
    '  window.__env = window.__env || {};',
    ...entries,
    '})(this);',
    '',
  ].join('\n');

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`[env] Wrote ${path.relative(process.cwd(), OUTPUT_FILE)}`);
}

main();
