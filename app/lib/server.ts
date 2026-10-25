import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '../chatgpt-auth';
export class HttpError extends Error{constructor(public status:number,message:string){super(message);}}
export const database=()=>{if(!env.DB)throw new HttpError(503,'El registro central no está disponible. No se guardó el cobro.');return env.DB;};
export async function actor(){const user=await getChatGPTUser();if(!user)throw new HttpError(401,'Inicia sesión para acceder al registro.');const db=database(),email=user.email.toLowerCase();
 // Initialization is protected by the new Site's owner-private access policy.
 await db.prepare("INSERT OR IGNORE INTO settings(key,value) VALUES('owner',?)").bind(user.userId).run();
 const owner=await db.prepare("SELECT value FROM settings WHERE key='owner'").first<{value:string}>();
 if(owner?.value===user.userId)await db.prepare("INSERT OR IGNORE INTO members(email,user_id,name,role,active,created_at) VALUES(?,?,?,'admin',1,?)").bind(email,user.userId,user.displayName,new Date().toISOString()).run();
 const m=await db.prepare('SELECT * FROM members WHERE email=? AND active=1').bind(email).first<{email:string;name:string;role:string;user_id:string|null}>();
 if(!m)throw new HttpError(403,'Tu cuenta aún no tiene un rol asignado. Solicita acceso a la administradora.');if(m.user_id&&m.user_id!==user.userId)throw new HttpError(403,'La identidad no coincide con el acceso registrado.');
 if(!m.user_id)await db.prepare('UPDATE members SET user_id=? WHERE email=? AND user_id IS NULL').bind(user.userId,email).run();return{id:user.userId,email,name:m.name,role:m.role};}
export function permit(role:string,allowed:string[]){if(!allowed.includes(role))throw new HttpError(403,'Tu rol no permite realizar esta operación.');}
export function writeOrigin(req:Request){const o=req.headers.get('origin');if(o&&o!==new URL(req.url).origin)throw new HttpError(403,'Solicitud de otro origen no permitida.');}
export function failure(e:unknown){if(e instanceof HttpError)return Response.json({error:e.message},{status:e.status});console.error('Cobros error',e);return Response.json({error:'No se pudo completar la operación. Revisa la conexión e inténtalo nuevamente.'},{status:500});}
export function queryFilter(url:URL,a:{id:string;role:string}){let where='1=1';const args:unknown[]=[];if(a.role==='ctc'){where+=' AND c.collector_id=?';args.push(a.id);}const q=url.searchParams.get('q')?.trim();if(q){where+=' AND (i.client LIKE ? OR i.number LIKE ? OR c.receipt LIKE ? OR c.collector LIKE ?)';args.push(...Array(4).fill('%'+q.slice(0,100)+'%'));}for(const[p,col]of[['branch','c.branch'],['status','c.status']]){const v=url.searchParams.get(p);if(v){where+=` AND ${col}=?`;args.push(v);}}for(const[p,op]of[['from','>='],['to','<=']]){const v=url.searchParams.get(p);if(v){if(!/^\d{4}-\d{2}-\d{2}$/.test(v))throw new HttpError(400,'Fecha de filtro no válida.');where+=` AND c.collected_on${op}?`;args.push(v);}}return{where,args};}
export const JOIN='FROM collections c JOIN invoices i ON c.invoice_id=i.id';
export const SELECT='c.*,i.client,i.client_nit,i.number,i.issued_on,i.issuer_nit,i.cuf,i.total_cents,i.paid_cents';
