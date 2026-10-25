let decoder:Promise<typeof import('zxing-wasm/reader')>|null=null;
export async function decodeQR(input:Blob|ImageData){
 if(!decoder)decoder=import('zxing-wasm/reader').then(m=>{m.prepareZXingModule({overrides:{locateFile:(path:string,prefix:string)=>path.endsWith('.wasm')?'/zxing_reader.wasm':prefix+path}});return m;});
 const m=await decoder;const results=await m.readBarcodes(input,{formats:['QRCode'],tryHarder:true,maxNumberOfSymbols:1});return results[0]?.text||'';
}
