import{actor,failure}from'../../lib/server';
export async function GET(){try{return Response.json(await actor(),{headers:{'Cache-Control':'no-store'}});}catch(e){return failure(e);}}
