import { d as db, g as guestPass } from "../../../../../../chunks/index3.js";
import { v4 } from "uuid";
import { fail } from "@sveltejs/kit";
const actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const plateNumber = form.get("plateNumber")?.toString();
    const durationMinutes = Number(form.get("durationMinutes"));
    if (!plateNumber || !durationMinutes) {
      return fail(400, { error: "All fields are required." });
    }
    try {
      await db.insert(guestPass).values({
        id: v4(),
        plateNumber,
        visitTime: /* @__PURE__ */ new Date(),
        durationMinutes
      });
      return { success: true };
    } catch (e) {
      return fail(500, { error: "Failed to create guest pass." });
    }
  }
};
export {
  actions
};
