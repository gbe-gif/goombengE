import { build } from 'esbuild';
const result = await build({ entryPoints: ['tests/ooc.test.mjs'], bundle: true, write: false, format: 'esm', platform: 'node' });
await import('data:text/javascript;base64,' + Buffer.from(result.outputFiles[0].text).toString('base64'));
