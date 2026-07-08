/**
 * Copies component CSS into dist (mirroring src) and emits dist/styles.css,
 * a single aggregate stylesheet (tokens first, then every component).
 */
import { cpSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');

const cssFiles = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.css')) cssFiles.push(p);
  }
})(SRC);

for (const f of cssFiles) {
  cpSync(f, join(DIST, relative(SRC, f)));
}

const aggregate = [
  "@import '@maxilius/tokens/css';",
  ...cssFiles.map((f) => `@import './${relative(SRC, f)}';`),
  '',
].join('\n');
writeFileSync(join(DIST, 'styles.css'), aggregate);

console.log(`✓ css: ${cssFiles.length} files copied, styles.css aggregated`);
