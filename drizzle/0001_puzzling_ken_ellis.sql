CREATE TABLE `guest_pass_history` (
	`id` text PRIMARY KEY NOT NULL,
	`plate_number` text NOT NULL,
	`visit_time` integer NOT NULL,
	`duration_minutes` integer NOT NULL,
	`status` text NOT NULL,
	`user_id` text NOT NULL,
	`type` text NOT NULL,
	`revoked_at` integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE `guest_pass` ADD `status` text NOT NULL;--> statement-breakpoint
ALTER TABLE `guest_pass` ADD `user_id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `guest_pass` ADD `type` text DEFAULT 'visitors' NOT NULL;--> statement-breakpoint
ALTER TABLE `guest_pass` ADD `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `guest_pass` ADD `phone` text NOT NULL;--> statement-breakpoint
ALTER TABLE `vehicle` ADD `access_time` integer;