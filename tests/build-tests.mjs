import{createRequire}from'node:module';
const require=createRequire(import.meta.url);const{build}=createRequire(require.resolve('drizzle-kit'))('esbuild');
await build({entryPoints:['tests/integration.ts'],outfile:'.sites-runtime/integration.mjs',bundle:true,platform:'node',format:'esm',plugins:[{name:'test-transport',setup(b){b.onResolve({filter:/^cloudflare:workers$/},()=>({path:process.cwd()+'/tests/mock-env.ts'}));b.onResolve({filter:/chatgpt-auth$/},()=>({path:process.cwd()+'/tests/mock-auth.ts'}));}}]});
