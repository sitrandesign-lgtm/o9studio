import { cp, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pages, files } from './site-files.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
await mkdir(output, { recursive: true });
for (const name of [...files, 'assets']) {
  await cp(path.join(root, name), path.join(output, name), { recursive: true });
}
for (const route of pages.slice(1)) {
  const directory = path.join(output, route);
  await mkdir(directory, { recursive: true });
  await cp(path.join(root, 'index.html'), path.join(directory, 'index.html'));
}
console.log('Static site built in dist/');
