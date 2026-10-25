// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';
export const members = sqliteTable('members', {
  email:text('email').primaryKey(),userId:text('user_id'),name:text('name').notNull(),role:text('role').notNull(),active:integer('active').notNull().default(1),createdAt:text('created_at').notNull(),
});
export const settings=sqliteTable('settings',{key:text('key').primaryKey(),value:text('value').notNull()});
export const invoices=sqliteTable('invoices',{
 id:text('id').primaryKey(),issuerNit:text('issuer_nit').notNull(),number:text('number').notNull(),issuedOn:text('issued_on').notNull(),cuf:text('cuf').notNull().default(''),client:text('client').notNull(),clientNit:text('client_nit').notNull().default(''),totalCents:integer('total_cents').notNull(),paidCents:integer('paid_cents').notNull().default(0),
},t=>[uniqueIndex('invoice_identity').on(t.issuerNit,t.number,t.issuedOn)]);
export const collections=sqliteTable('collections',{
 id:text('id').primaryKey(),invoiceId:text('invoice_id').notNull().references(()=>invoices.id),recordedAt:text('recorded_at').notNull(),collectedOn:text('collected_on').notNull(),branch:text('branch').notNull(),amountCents:integer('amount_cents').notNull(),method:text('method').notNull(),terms:text('terms').notNull(),receipt:text('receipt').notNull(),collectorId:text('collector_id').notNull(),collector:text('collector').notNull(),collectorEmail:text('collector_email').notNull(),status:text('status').notNull(),receivedBy:text('received_by'),receivedAt:text('received_at'),closeReference:text('close_reference'),notes:text('notes').notNull().default(''),evidenceKey:text('evidence_key'),qr:text('qr').notNull().default(''),
},t=>[uniqueIndex('receipt_per_branch').on(t.branch,t.receipt)]);
export const audit=sqliteTable('audit',{id:text('id').primaryKey(),collectionId:text('collection_id'),action:text('action').notNull(),actor:text('actor').notNull(),at:text('at').notNull(),detail:text('detail').notNull()});
