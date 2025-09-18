CREATE TABLE `admin` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`name` text,
	`email` text,
	`phone` text,
	`profile_pic` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admin_username_unique` ON `admin` (`username`);--> statement-breakpoint
CREATE TABLE `guard` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`name` text,
	`phone` text,
	`guard_id` text NOT NULL,
	`profile_pic` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `guard_username_unique` ON `guard` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `guard_guard_id_unique` ON `guard` (`guard_id`);--> statement-breakpoint
CREATE TABLE `guest_pass` (
	`id` text PRIMARY KEY NOT NULL,
	`plate_number` text NOT NULL,
	`visit_time` integer NOT NULL,
	`duration_minutes` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`age` integer,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`role` text NOT NULL,
	`name` text,
	`email` text,
	`phone` text,
	`car_number` text,
	`house_number` text,
	`profile_pic` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
CREATE TABLE `vehicle` (
	`id` text PRIMARY KEY NOT NULL,
	`plate_number` text NOT NULL,
	`owner_id` text NOT NULL,
	`model` text NOT NULL,
	`make_year` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vehicle_plate_number_unique` ON `vehicle` (`plate_number`);--> statement-breakpoint
CREATE TABLE `event_log` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`user_id` text,
	`details` text,
	`timestamp` integer NOT NULL
);
