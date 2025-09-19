import { d as db, c as vehicle } from "../../../../../../chunks/index3.js";
import { fail } from "@sveltejs/kit";
import { v4 } from "uuid";
function getUserIdFromSession(cookies) {
  return "R001";
}
const actions = {
  default: async ({ request, cookies }) => {
    const userId = getUserIdFromSession();
    const form = await request.formData();
    const model = form.get("model")?.toString();
    const makeYear = Number(form.get("makeYear"));
    const plateNumber = form.get("plateNumber")?.toString();
    if (!model || !makeYear || !plateNumber) {
      return fail(400, { error: "All fields are required." });
    }
    try {
      await db.insert(vehicle).values({
        id: v4(),
        model,
        makeYear,
        plateNumber,
        ownerId: userId
      });
      return { success: true };
    } catch (e) {
      return fail(500, { error: "Failed to add vehicle." });
    }
  }
};
export {
  actions
};
