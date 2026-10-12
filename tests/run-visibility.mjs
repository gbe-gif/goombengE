import { build } from 'esbuild';
import { writeFile, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { test } from 'node:test';
const manifest = JSON.parse(await readFile('package.json', 'utf8'));
const lock = JSON.parse(await readFile('package-lock.json', 'utf8'));
test('React and its renderers have matching pinned and locked versions', () => {
  const version = manifest.dependencies.react;
  assert.match(version, /^\d+\.\d+\.\d+$/);
  assert.equal(manifest.dependencies['react-dom'], version);
  assert.equal(manifest.devDependencies['react-test-renderer'], version);
  for (const name of ['react', 'react-dom', 'react-test-renderer']) assert.equal(lock.packages['node_modules/' + name].version, version);
});
const auth = `import React from 'react'; export const AuthContext = React.createContext({isAdmin:false,loading:true}); export const useAuth = () => React.useContext(AuthContext);`;
const firestore = `export const calls=[]; export const listeners=[]; export const collection=(_,name)=>({name}); export const where=(...args)=>args; export const query=(source,...filters)=>({source,filters}); export const onSnapshot=(q,success,error)=>{ const listener={q,success,error,closed:false}; calls.push(q); listeners.push(listener); return ()=>{listener.closed=true}; };`;
const result = await build({entryPoints:['tests/visibility.test.mjs'],bundle:true,write:false,format:'esm',platform:'node',external:['react','react-test-renderer'],plugins:[{name:'mocks',setup(b){b.onResolve({filter:/useAuth$|^mock-auth$/},()=>({path:'auth',namespace:'mock'})); b.onResolve({filter:/^firebase\/firestore$|^mock-firestore$/},()=>({path:'firestore',namespace:'mock'})); b.onResolve({filter:/lib\/firebase$/},()=>({path:'db',namespace:'mock'})); b.onLoad({filter:/.*/,namespace:'mock'},args=>({contents:args.path==='auth'?auth:args.path==='firestore'?firestore:'export const db={};',loader:'js'}));}}]});
await writeFile('tests/.visibility.test.mjs',result.outputFiles[0].text);
await import('./.visibility.test.mjs');

