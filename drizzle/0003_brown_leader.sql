PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_guest_pass_history` (
	`id` text PRIMARY KEY NOT NULL,
	`plate_number` text NOT NULL,
	`visit_time` integer NOT NULL,
	`duration_minutes` integer NOT NULL,
	`status` text NOT NULL,
	`user_id` text NOT NULL,
	`type` text NOT NULL,
	`revoked_at` integer NOT NULL,
	`name` text,
	`phone` text
);
--> statement-breakpoint
INSERT INTO `__new_guest_pass_history`("id", "plate_number", "visit_time", "duration_minutes", "status", "user_id", "type", "revoked_at", "name", "phone") SELECT "id", "plate_number", "visit_time", "duration_minutes", "status", "user_id", "type", "revoked_at", "name", "phone" FROM `guest_pass_history`;--> statement-breakpoint
DROP TABLE `guest_pass_history`;--> statement-breakpoint
ALTER TABLE `__new_guest_pass_history` RENAME TO `guest_pass_history`;--> statement-breakpoint
PRAGMA foreign_keys=ON;