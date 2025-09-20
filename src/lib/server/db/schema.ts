import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const guestPassHistory = sqliteTable('guest_pass_history', {
	id: text('id').primaryKey(),
	plateNumber: text('plate_number').notNull(),
	visitTime: integer('visit_time', { mode: 'timestamp' }).notNull(),
	durationMinutes: integer('duration_minutes').notNull(),
	status: text('status', { enum: ['active', 'expired', 'revoked'] }).notNull(),
	userId: text('user_id').notNull(),
	type: text('type', { enum: ['visitors', 'food_delivery'] }).notNull(),
	revokedAt: integer('revoked_at', { mode: 'timestamp' }).notNull(),
	name: text('name'),
	phone: text('phone')
});

export type GuestPassHistory = typeof guestPassHistory.$inferSelect;
export * from './vehicle';
export * from './event';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	role: text('role', { enum: ['guard', 'resident'] }).notNull(),
	// Resident-specific fields
	name: text('name'),
	email: text('email'),
	phone: text('phone'),
	carNumber: text('car_number'),
	houseAddress: text('house_address'),
	profilePic: text('profile_pic')
});

export const admin = sqliteTable('admin', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	name: text('name'),
	email: text('email'),
	phone: text('phone'),
	profilePic: text('profile_pic')
});

export type Admin = typeof admin.$inferSelect;

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export type Session = typeof session.$inferSelect;

export const otp = sqliteTable('otp', {
	id: text('id').primaryKey(),
	email: text('email').notNull(),
	code: text('code').notNull(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export type Otp = typeof otp.$inferSelect;

export type User = typeof user.$inferSelect;
 
export const guestPass = sqliteTable('guest_pass', {
	id: text('id').primaryKey(),
	plateNumber: text('plate_number').notNull(),
	visitTime: integer('visit_time', { mode: 'timestamp' }).notNull(),
	durationMinutes: integer('duration_minutes').notNull(),
	status: text('status', { enum: ['active', 'expired', 'revoked'] }).notNull(),
	userId: text('user_id').notNull(), // Ensure userId is non-nullable
	type: text('type', { enum: ['visitors', 'food_delivery'] }).notNull().default('visitors'),
	name: text('name').notNull(),
	phone: text('phone').notNull()
});

export type GuestPass = typeof guestPass.$inferSelect;

export const guard = sqliteTable('guard', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	username: text('username').notNull().unique(),
	name: text('name'),
	phone: text('phone'),
	guardId: text('guard_id').notNull().unique(),
	profilePic: text('profile_pic') // URL or path to profile picture
});

export type Guard = typeof guard.$inferSelect;

export const vehicle = sqliteTable('vehicle', {
    id: text('id').primaryKey(),
    plateNumber: text('plate_number').notNull().unique(),
    ownerId: text('owner_id').notNull(),
    model: text('model').notNull(),
    makeYear: integer('make_year').notNull(),
    accessTime: integer('access_time', { mode: 'timestamp' })
});
