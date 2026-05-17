import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');
const VALID_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.css', '.html']);

const TOKEN_PATTERNS = [
  {
    regex: /\b-?(?:m|p)(?:[trblxy])?-(?:\d+\.5|px|\[[^\]]+\])/g,
    reason: 'margin/padding must use 4px grid utilities (no .5, px, or arbitrary values)',
  },
  {
    regex: /\b(?:gap|gap-x|gap-y|space-x|space-y)-(?:\d+\.5|px|\[[^\]]+\])/g,
    reason: 'gap/space must use 4px grid utilities (no .5, px, or arbitrary values)',
  },
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name.startsWith('.')) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    if (VALID_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function getLineInfo(content, index) {
  const upToIndex = content.slice(0, index);
  const line = upToIndex.split('\n').length;
  const lastNewline = upToIndex.lastIndexOf('\n');
  const column = index - lastNewline;
  return { line, column };
}

function findViolations(filePath, content) {
  const violations = [];

  for (const pattern of TOKEN_PATTERNS) {
    pattern.regex.lastIndex = 0;
    let match = pattern.regex.exec(content);

    while (match) {
      const token = match[0];
      const { line, column } = getLineInfo(content, match.index);
      violations.push({ filePath, line, column, token, reason: pattern.reason });
      match = pattern.regex.exec(content);
    }
  }

  return violations;
}

async function main() {
  const files = await walk(SRC_DIR);
  const violations = [];

  for (const filePath of files) {
    const content = await readFile(filePath, 'utf8');
    violations.push(...findViolations(filePath, content));
  }

  if (violations.length === 0) {
    console.log('✓ Spacing grid check passed (no non-4px spacing utilities found).');
    process.exit(0);
  }

  console.error(`✗ Spacing grid check failed with ${violations.length} violation(s):`);
  for (const item of violations) {
    const relativePath = path.relative(ROOT, item.filePath);
    console.error(`- ${relativePath}:${item.line}:${item.column} ${item.token}`);
    console.error(`  ${item.reason}`);
  }

  process.exit(1);
}

main().catch((error) => {
  console.error('Spacing grid check failed unexpectedly.');
  console.error(error);
  process.exit(1);
});
