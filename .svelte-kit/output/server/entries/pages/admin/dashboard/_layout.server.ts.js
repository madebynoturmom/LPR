import { d as db, a as admin } from "../../../../chunks/index3.js";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
const load = async ({ locals }) => {
  const user = locals.user;
  if (!user) throw redirect(303, "/login");
  const admins = await db.select().from(admin).where(eq(admin.id, user.id));
  if (!admins.length) throw redirect(303, "/login");
  const adminData = admins[0];
  return { user: adminData };
};
export {
  load
};
