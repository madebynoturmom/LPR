import { fail, redirect } from "@sveltejs/kit";
import { d as db, u as user } from "../../../../../chunks/index3.js";
import { eq } from "drizzle-orm";
const load = async () => {
  const residents = await db.select().from(user).where(eq(user.role, "resident"));
  return { residents };
};
const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const name = form.get("name")?.toString().trim();
    const email = form.get("email")?.toString().trim();
    const phone = form.get("phone")?.toString().trim();
    const carNumber = form.get("carNumber")?.toString().trim();
    const houseNumber = form.get("houseNumber")?.toString().trim();
    if (!name || !email || !phone || !carNumber || !houseNumber) {
      return fail(400, { error: "All fields are required." });
    }
    const username = email;
    const id = crypto.randomUUID();
    const passwordHash = "";
    try {
      await db.insert(user).values({
        id,
        username,
        passwordHash,
        role: "resident",
        name,
        email,
        phone,
        carNumber,
        houseNumber
      });
      throw redirect(303, "/admin/dashboard/residents");
    } catch (e) {
      return fail(500, { error: "Failed to create resident." });
    }
  }
};
export {
  actions,
  load
};
