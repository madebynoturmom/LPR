import { json } from "@sveltejs/kit";
import { d as db, g as guestPass } from "../../../../../chunks/index3.js";
import { v4 } from "uuid";
const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const plateNumber = formData.get("plateNumber")?.toString();
    const durationMinutes = parseInt(formData.get("durationMinutes")?.toString() || "0", 10);
    const userId = formData.get("userId")?.toString();
    const name = formData.get("name")?.toString();
    const phone = formData.get("phone")?.toString();
    if (!plateNumber || isNaN(durationMinutes) || durationMinutes <= 0 || !userId || !name || !phone) {
      return json({ success: false, error: "Invalid input data" }, { status: 400 });
    }
    await db.insert(guestPass).values({
      id: v4(),
      plateNumber,
      durationMinutes,
      visitTime: /* @__PURE__ */ new Date(),
      type: "food_delivery",
      userId,
      status: "active",
      name,
      phone
    });
    return json({ success: true });
  } catch (error) {
    console.error("Error creating food delivery pass:", error);
    return json({ success: false, error: "Internal server error" }, { status: 500 });
  }
};
export {
  POST
};
