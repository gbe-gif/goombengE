import { build } from 'esbuild';
import { writeFile } from 'node:fs/promises';
const auth = `import React from 'react'; export const AuthContext = React.createContext({isAdmin:false,loading:true}); export const useAuth = () => React.useContext(AuthContext);`;
const firestore = `export const calls=[]; export const listeners=[]; export const collection=(_,name)=>({name}); export const where=(...args)=>args; export const query=(source,...filters)=>({source,filters}); export const onSnapshot=(q,success,error)=>{ const listener={q,success,error,closed:false}; calls.push(q); listeners.push(listener); return ()=>{listener.closed=true}; };`;
const result = await build({entryPoints:['tests/visibility.test.mjs'],bundle:true,write:false,format:'esm',platform:'node',external:['react','react-test-renderer'],plugins:[{name:'mocks',setup(b){b.onResolve({filter:/useAuth$|^mock-auth$/},()=>({path:'auth',namespace:'mock'})); b.onResolve({filter:/^firebase\/firestore$|^mock-firestore$/},()=>({path:'firestore',namespace:'mock'})); b.onResolve({filter:/lib\/firebase$/},()=>({path:'db',namespace:'mock'})); b.onLoad({filter:/.*/,namespace:'mock'},args=>({contents:args.path==='auth'?auth:args.path==='firestore'?firestore:'export const db={};',loader:'js'}));}}]});
await writeFile('tests/.visibility.test.mjs',result.outputFiles[0].text);
await import('./.visibility.test.mjs');

