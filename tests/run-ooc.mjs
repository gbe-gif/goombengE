import { build } from 'esbuild';
import { writeFile } from 'node:fs/promises';
const result = await build({ entryPoints: ['tests/ooc.test.mjs'], bundle: true, write: false, format: 'esm', platform: 'node', jsx: 'automatic', packages: 'external' });
await writeFile('tests/.ooc.test.mjs', result.outputFiles[0].text);
await import('./.ooc.test.mjs');
