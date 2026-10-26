#!/usr/bin/env node
/**
 * Build: render src/ into dist/.
 *
 * Node built-ins only — no dependencies, no install step.
 *   node build.js            → build once
 *   node build.js --watch    → rebuild when src/ changes
 */

import { mkdir, rm, writeFile, cp } from 'node:fs/promises';
import { watch } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');

async function build() {
  const started = Date.now();

  // Cache-bust the template modules so --watch picks up edits.
  const stamp = Date.now();
  const { homePage } = await import(`./src/templates/home.js?v=${stamp}`);
  const { menuPage } = await import(`./src/templates/menu.js?v=${stamp}`);

  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });

  await Promise.all([
    writeFile(path.join(dist, 'index.html'), homePage(), 'utf8'),
    writeFile(path.join(dist, 'menu.html'), menuPage(), 'utf8'),
    cp(path.join(src, 'styles'), path.join(dist, 'styles'), { recursive: true }),
    cp(path.join(src, 'scripts'), path.join(dist, 'scripts'), { recursive: true }),
    cp(path.join(src, 'assets'), path.join(dist, 'assets'), { recursive: true }),
  ]);

  console.log(`built dist/ in ${Date.now() - started}ms`);
}

await build();

if (process.argv.includes('--watch')) {
  console.log('watching src/ — ctrl+c to stop');

  let queued = null;
  watch(src, { recursive: true }, () => {
    clearTimeout(queued);
    queued = setTimeout(() => {
      build().catch((error) => console.error(error));
    }, 60);
  });
}
