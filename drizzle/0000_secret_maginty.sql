CREATE TABLE `audit` (
	`id` text PRIMARY KEY NOT NULL,
	`collection_id` text,
	`action` text NOT NULL,
	`actor` text NOT NULL,
	`at` text NOT NULL,
	`detail` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `collections` (
	`id` text PRIMARY KEY NOT NULL,
	`invoice_id` text NOT NULL,
	`recorded_at` text NOT NULL,
	`collected_on` text NOT NULL,
	`branch` text NOT NULL,
	`amount_cents` integer NOT NULL,
	`method` text NOT NULL,
	`terms` text NOT NULL,
	`receipt` text NOT NULL,
	`collector_id` text NOT NULL,
	`collector` text NOT NULL,
	`collector_email` text NOT NULL,
	`status` text NOT NULL,
	`received_by` text,
	`received_at` text,
	`close_reference` text,
	`notes` text DEFAULT '' NOT NULL,
	`evidence_key` text,
	`qr` text DEFAULT '' NOT NULL,
	FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `receipt_per_branch` ON `collections` (`branch`,`receipt`);--> statement-breakpoint
CREATE TABLE `invoices` (
	`id` text PRIMARY KEY NOT NULL,
	`issuer_nit` text NOT NULL,
	`number` text NOT NULL,
	`issued_on` text NOT NULL,
	`cuf` text DEFAULT '' NOT NULL,
	`client` text NOT NULL,
	`client_nit` text DEFAULT '' NOT NULL,
	`total_cents` integer NOT NULL,
	`paid_cents` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `invoice_identity` ON `invoices` (`issuer_nit`,`number`,`issued_on`);--> statement-breakpoint
CREATE TABLE `members` (
	`email` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`name` text NOT NULL,
	`role` text NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
