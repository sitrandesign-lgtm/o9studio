import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const files = ['index.html', 'styles.css', 'app.js'];
const sources = await Promise.all(files.map(name => readFile(path.join(root, name), 'utf8')));
const refs = new Set();
for (const text of sources) {
  if (/\.png\b/i.test(text)) throw new Error('Unexpected PNG reference');
  if (/https:\/\/www\.figma\.com\/api\/mcp\/asset/.test(text)) throw new Error('Temporary Figma asset URL');
  for (const match of text.matchAll(/assets\/[\w/.-]+\.(?:jpg|svg|otf)/g)) refs.add(match[0]);
  for (const match of text.matchAll(/['"]([\w-]+\.jpg)['"]/g)) refs.add(`assets/${match[1]}`);
}
for (const ref of refs) if (!(await stat(path.join(root, ref))).size) throw new Error(`Empty asset: ${ref}`);
async function checkDirectory(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const location = path.join(directory, entry.name);
    if (entry.isDirectory()) await checkDirectory(location);
    else if (/\.png$/i.test(entry.name)) throw new Error(`Unexpected PNG file: ${location}`);
  }
}
await checkDirectory(path.join(root, 'assets'));
console.log(`Verified ${refs.size} referenced assets; no PNG files or temporary asset URLs.`);
