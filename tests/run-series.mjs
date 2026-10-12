import { build } from 'esbuild';
import { writeFile } from 'node:fs/promises';
const result = await build({ entryPoints: ['tests/series.test.mjs'], bundle: true, write: false, format: 'esm', platform: 'node' });
await writeFile('tests/.series.test.mjs', result.outputFiles[0].text);
await import('./.series.test.mjs');
