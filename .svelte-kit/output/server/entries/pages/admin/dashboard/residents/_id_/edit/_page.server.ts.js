import { d as db, u as user } from "../../../../../../../chunks/index3.js";
import { eq } from "drizzle-orm";
import { fail, redirect } from "@sveltejs/kit";
const load = async ({ params }) => {
  const id = params.id;
  const resident = await db.select().from(user).where(eq(user.id, id)).then((rows) => rows[0]);
  return { resident };
};
const actions = {
  default: async ({ request, params }) => {
    const form = await request.formData();
    const name = form.get("name")?.toString().trim();
    const email = form.get("email")?.toString().trim();
    const phone = form.get("phone")?.toString().trim();
    const carNumber = form.get("carNumber")?.toString().trim();
    const houseAddress = form.get("houseAddress")?.toString().trim();
    if (!name || !email || !phone || !carNumber || !houseAddress) {
      return fail(400, { error: "All fields are required." });
    }
    try {
      await db.update(user).set({ name, email, phone, carNumber, houseAddress }).where(eq(user.id, params.id));
      throw redirect(303, "/admin/dashboard/residents");
    } catch (e) {
      return fail(500, { error: "Failed to update resident." });
    }
  }
};
export {
  actions,
  load
};
