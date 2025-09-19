import { d as db, u as user, c as vehicle } from "../../../../../../chunks/index3.js";
import { v4 } from "uuid";
import { fail, redirect } from "@sveltejs/kit";
const load = async () => {
  const allUsers = await db.select().from(user).all();
  const users = allUsers.filter((u) => u.role === "resident");
  return { users };
};
const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const plateNumber = form.get("plateNumber")?.toString().trim();
    const ownerId = form.get("ownerId")?.toString();
    const model = form.get("model")?.toString();
    const makeYear = Number(form.get("makeYear"));
    if (!plateNumber || !ownerId || !model || !makeYear) {
      return fail(400, { error: "All fields are required." });
    }
    await db.insert(vehicle).values({
      id: v4(),
      plateNumber,
      ownerId,
      model,
      makeYear
    });
    throw redirect(303, "/admin/dashboard/vehicles");
  }
};
export {
  actions,
  load
};
