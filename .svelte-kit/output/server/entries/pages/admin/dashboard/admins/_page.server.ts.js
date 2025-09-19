import { d as db, b as admin, s as session } from "../../../../../chunks/index3.js";
import { eq } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
const load = async () => {
  const admins = await db.select().from(admin);
  return { admins };
};
const actions = {
  deleteAdmin: async (event) => {
    const form = await event.request.formData();
    const id = form.get("id");
    if (typeof id !== "string") return fail(400, { error: "Invalid admin ID" });
    await db.delete(session).where(eq(session.userId, id));
    await db.delete(admin).where(eq(admin.id, id));
    return { success: true };
  },
  updateAdmin: async (event) => {
    const form = await event.request.formData();
    const id = form.get("id");
    const username = form.get("username");
    if (typeof id !== "string" || typeof username !== "string") return fail(400, { error: "Invalid input" });
    await db.update(admin).set({ username }).where(eq(admin.id, id));
    return { success: true };
  },
  createAdmin: async (event) => {
    const form = await event.request.formData();
    const username = form.get("username");
    const passwordHash = form.get("passwordHash");
    if (typeof username !== "string" || typeof passwordHash !== "string") return fail(400, { error: "Invalid input" });
    await db.insert(admin).values({
      id: crypto.randomUUID(),
      username,
      passwordHash
    });
    return { success: true };
  }
};
export {
  actions,
  load
};
