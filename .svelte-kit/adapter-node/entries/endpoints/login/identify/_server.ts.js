import { d as db, a as admin, b as guard, u as user } from "../../../../chunks/index3.js";
import { eq } from "drizzle-orm";
import { json } from "@sveltejs/kit";
const GET = async ({ url }) => {
  const username = url.searchParams.get("username")?.toString().trim();
  if (!username) return json({ role: null }, { status: 400 });
  const usernameLower = username.toLowerCase();
  const admins = await db.select().from(admin).where(eq(admin.username, usernameLower));
  if (admins.length > 0) return json({ role: "admin" });
  const guards = await db.select().from(guard).where(eq(guard.username, usernameLower));
  if (guards.length > 0) return json({ role: "guard" });
  const users = await db.select().from(user).where(eq(user.username, usernameLower));
  if (users.length > 0) return json({ role: users[0].role });
  return json({ role: null }, { status: 404 });
};
export {
  GET
};
