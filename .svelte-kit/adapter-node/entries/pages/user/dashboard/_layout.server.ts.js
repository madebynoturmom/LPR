import { d as db, u as user } from "../../../../chunks/index3.js";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
const load = async ({ locals }) => {
  const user$1 = locals.user;
  if (!user$1) throw redirect(303, "/login");
  const users = await db.select().from(user).where(eq(user.id, user$1.id));
  if (!users.length) throw redirect(303, "/login");
  const userData = users[0];
  console.log("Layout load - user data:", userData);
  console.log("Layout load - profile pic:", userData.profilePic);
  return { user: userData };
};
export {
  load
};
