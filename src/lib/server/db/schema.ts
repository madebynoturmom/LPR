import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const guestPassHistory = sqliteTable('guest_pass_history', {
	id: text('id').primaryKey(),
	plateNumber: text('plate_number').notNull(),
	visitTime: integer('visit_time', { mode: 'timestamp' }).notNull(),
	durationMinutes: integer('duration_minutes').notNull(),
	revokedAt: integer('revoked_at', { mode: 'timestamp' }).notNull()
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
	houseNumber: text('house_number'),
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

export type User = typeof user.$inferSelect;
 
export const guestPass = sqliteTable('guest_pass', {
    id: text('id').primaryKey(),
    plateNumber: text('plate_number').notNull(),
    visitTime: integer('visit_time', { mode: 'timestamp' }).notNull(),
    durationMinutes: integer('duration_minutes').notNull(),
    revokedAt: integer('revoked_at', { mode: 'timestamp' }), // Added for admin dashboard functionality
    type: text('type')
});


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
    plateNumber: text('plate_number').notNull(),
    ownerId: text('owner_id').notNull(),
    model: text('model').notNull(),
    makeYear: integer('make_year').notNull(),
    accessTime: integer('access_time', { mode: 'timestamp' })
});
