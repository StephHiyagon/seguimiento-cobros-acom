export const ISSUER_NIT='1013899024';
export const BRANCHES=['Santa Cruz','Cochabamba','La Paz'] as const;
export const METHODS=['Efectivo','QR','Transferencia'] as const;
export const TERMS=['Crédito vigente','Contado contra entrega','Pago post entrega autorizado','Pago anticipado'] as const;
export const ROLES:Record<string,string>={admin:'Administración',ctc:'CTC',comercial:'Comercial',cobranzas:'Créditos y Cobranzas'};
export function parseInvoiceQR(raw:string){
 let u:URL;try{u=new URL(raw.trim());}catch{throw new Error('No se reconoce el QR. Utiliza el ingreso manual.');}
 if(u.protocol!=='https:'||u.hostname!=='siat.impuestos.gob.bo'||u.pathname!=='/consulta/QR')throw new Error('Este QR no corresponde al formato SIAT de la factura.');
 const nit=u.searchParams.get('nit')||'',number=u.searchParams.get('numero')||'',cuf=u.searchParams.get('cuf')||'';
 if(!/^\d{5,20}$/.test(nit)||!/^\d{1,20}$/.test(number)||! /^[A-Fa-f0-9]{20,100}$/.test(cuf))throw new Error('El QR de la factura está incompleto.');
 if(nit!==ISSUER_NIT)throw new Error('El NIT emisor no coincide con la factura de referencia de Invetsa. Revisa el documento.');
 return {issuerNit:nit,number,cuf:cuf.toUpperCase(),qr:u.href};
}
export function cents(value:unknown){const s=String(value??'').trim();if(!/^\d{1,10}([.,]\d{1,2})?$/.test(s))throw new Error('Ingresa un importe positivo con hasta dos decimales, sin separador de miles.');const[a,b='']=s.replace(',','.').split('.');const n=Number(a)*100+Number(b.padEnd(2,'0'));if(!Number.isSafeInteger(n)||n<=0||n>100000000000)throw new Error('El importe no es válido.');return n;}
export function validDay(s:string){return /^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s;}
export function todayBO(){return new Intl.DateTimeFormat('en-CA',{timeZone:'America/La_Paz'}).format(new Date());}
export function money(n:number){return new Intl.NumberFormat('es-BO',{style:'currency',currency:'BOB',minimumFractionDigits:2}).format(n/100);}
export type RecordRow={id:string;invoice_id:string;recorded_at:string;collected_on:string;branch:string;amount_cents:number;method:string;terms:string;receipt:string;collector_id:string;collector:string;collector_email:string;status:string;received_by:string|null;received_at:string|null;close_reference:string|null;notes:string;evidence_key:string|null;qr:string;client:string;client_nit:string;number:string;issued_on:string;issuer_nit:string;cuf:string;total_cents:number;paid_cents:number};
