import "dotenv/config";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
const vehicle$1 = sqliteTable("vehicle", {
  id: text("id").primaryKey(),
  plateNumber: text("plate_number").notNull().unique(),
  ownerId: text("owner_id").notNull(),
  // FK to user.id
  model: text("model").notNull(),
  makeYear: integer("make_year").notNull()
});
const eventLog = sqliteTable("event_log", {
  id: text("id").primaryKey(),
  type: text("type").notNull(),
  // e.g. 'login', 'vehicle_entry', etc.
  userId: text("user_id"),
  // optional, can be null for system events
  details: text("details"),
  timestamp: integer("timestamp", { mode: "timestamp" }).notNull()
});
const guestPassHistory = sqliteTable("guest_pass_history", {
  id: text("id").primaryKey(),
  plateNumber: text("plate_number").notNull(),
  visitTime: integer("visit_time", { mode: "timestamp" }).notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  revokedAt: integer("revoked_at", { mode: "timestamp" }).notNull()
});
const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  age: integer("age"),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role", { enum: ["guard", "resident"] }).notNull(),
  // Resident-specific fields
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  carNumber: text("car_number"),
  houseNumber: text("house_number"),
  profilePic: text("profile_pic")
});
const admin = sqliteTable("admin", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  profilePic: text("profile_pic")
});
const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull()
});
const guestPass = sqliteTable("guest_pass", {
  id: text("id").primaryKey(),
  plateNumber: text("plate_number").notNull(),
  visitTime: integer("visit_time", { mode: "timestamp" }).notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  revokedAt: integer("revoked_at", { mode: "timestamp" }),
  // Added for admin dashboard functionality
  type: text("type")
});
const guard = sqliteTable("guard", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  name: text("name"),
  phone: text("phone"),
  guardId: text("guard_id").notNull().unique(),
  profilePic: text("profile_pic")
  // URL or path to profile picture
});
const vehicle = sqliteTable("vehicle", {
  id: text("id").primaryKey(),
  plateNumber: text("plate_number").notNull(),
  ownerId: text("owner_id").notNull(),
  model: text("model").notNull(),
  makeYear: integer("make_year").notNull(),
  accessTime: integer("access_time", { mode: "timestamp" })
});
const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  admin,
  eventLog,
  guard,
  guestPass,
  guestPassHistory,
  session,
  user,
  vehicle
}, Symbol.toStringTag, { value: "Module" }));
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error("DATABASE_URL is not set");
const client = new Database(dbUrl);
const db = drizzle(client, { schema });
export {
  guard as a,
  admin as b,
  vehicle as c,
  db as d,
  eventLog as e,
  guestPassHistory as f,
  guestPass as g,
  session as s,
  user as u,
  vehicle$1 as v
};
