import{unzipSync,zipSync,strFromU8,strToU8}from'fflate';
import{TEMPLATE_BASE64}from'./template-data';
import type{RecordRow}from'./domain';
// Fill the reviewed Artifact Tool workbook template without changing its styles or columns.
function xml(s:string){return s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function serial(s:string,dateOnly=false){return (Date.parse(s)-(dateOnly?0:4*3600000))/86400000+25569;}
function col(i:number){let s='';for(i++;i;i=Math.floor((i-1)/26))s=String.fromCharCode(65+(i-1)%26)+s;return s;}
export function fillWorkbook(rows:RecordRow[]){
 const bin=Uint8Array.from(atob(TEMPLATE_BASE64),c=>c.charCodeAt(0)),files=unzipSync(bin),sheetKey='xl/worksheets/sheet1.xml';let sheet=strFromU8(files[sheetKey]);
 const sample=sheet.match(/<x:row\b[^>]*\br="5"[^>]*>[\s\S]*?<\/x:row>/)?.[0]||'';
 const styles:Record<string,string>={};for(const m of sample.matchAll(/<x:c\b[^>]*\br="([A-Z]+)5"[^>]*\bs="(\d+)"/g))styles[m[1]]=m[2];
 const header=sheet.match(/<x:sheetData>([\s\S]*?)<\/x:sheetData>/)?.[1].replace(/<x:row\b[^>]*\br="5"[^>]*>[\s\S]*?<\/x:row>/,'')||'';
 const data=rows.map((r,i)=>{const values:(string|number|null)[]=[r.id,serial(r.recorded_at),serial(r.collected_on,true),r.branch,r.client,r.number,serial(r.issued_on,true),r.client_nit,r.total_cents/100,r.amount_cents/100,r.method,r.terms,r.receipt,r.collector,r.status,r.received_by,r.received_at?serial(r.received_at):null,r.close_reference,r.notes,r.issuer_nit,r.cuf,r.qr,r.evidence_key?'Sí':'No'];
 const cells=values.map((v,j)=>{const c=col(j),style=styles[c]?` s="${styles[c]}"`:'';return typeof v==='number'?`<x:c r="${c}${i+5}"${style}><x:v>${v}</x:v></x:c>`:`<x:c r="${c}${i+5}"${style} t="inlineStr"><x:is><x:t xml:space="preserve">${xml(String(v??''))}</x:t></x:is></x:c>`;}).join('');return`<x:row r="${i+5}" ht="26" customHeight="1">${cells}</x:row>`;}).join('');
 sheet=sheet.replace(/<x:sheetData>[\s\S]*?<\/x:sheetData>/,`<x:sheetData>${header}${data}</x:sheetData>`);
 const last=Math.max(5,rows.length+4);sheet=sheet.replace(/<x:dimension\b[^>]*\/>/,`<x:dimension ref="A1:W${last}"/>`);files[sheetKey]=strToU8(sheet);
 for(const key of Object.keys(files))if(/^xl\/tables\/table\d+\.xml$/.test(key)){let table=strFromU8(files[key]);table=table.replace(/ref="A4:W5"/g,`ref="A4:W${last}"`);files[key]=strToU8(table);}
 return zipSync(files,{level:6});
}
