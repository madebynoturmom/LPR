import { d as db, v as vehicle, g as guestPass } from "../../../../../../chunks/index3.js";
import { v4 } from "uuid";
import { fail, redirect } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";
const actions = {
  default: async ({ request, locals }) => {
    console.log("Received request to create guest pass");
    const user = locals.user;
    console.log("User from locals:", user);
    if (!user || !user.role) {
      console.error("Authentication failed:", user);
      return fail(401, { error: "Not authenticated." });
    }
    const { id: userId, role: userRole } = user;
    console.log("User ID:", userId, "Role:", userRole);
    if (!userRole || userRole !== "guard" && userRole !== "resident" && userRole !== "admin") {
      console.error("Role validation failed:", userRole);
      return fail(403, { error: "Only guards, residents, or admins can create guest passes." });
    }
    const form = await request.formData();
    const plateNumber = form.get("plateNumber")?.toString().trim();
    const name = form.get("name")?.toString().trim();
    const phone = form.get("phone")?.toString().trim();
    const visitTime = form.get("visitTime")?.toString();
    const durationMinutes = Number(form.get("durationMinutes"));
    console.log("Form Data:", { plateNumber, name, phone, visitTime, durationMinutes });
    if (!plateNumber || !name || !phone || !visitTime || !durationMinutes) {
      console.error("Validation failed for form data:", { plateNumber, name, phone, visitTime, durationMinutes });
      return fail(400, { error: "All fields are required." });
    }
    const existingVehicle = await db.select().from(vehicle).where(and(eq(vehicle.plateNumber, plateNumber), eq(vehicle.ownerId, userId))).limit(1);
    if (existingVehicle.length > 0) {
      console.error("Plate number already exists in user vehicles:", plateNumber);
      return fail(400, { error: "This plate number belongs to one of your registered vehicles. Please enter a different plate number for the guest pass." });
    }
    const id = v4();
    try {
      await db.insert(guestPass).values({
        id,
        plateNumber,
        visitTime: new Date(visitTime),
        durationMinutes,
        status: "active",
        userId,
        // Associate the guest pass with the logged-in user
        type: "visitors",
        name,
        phone
      });
      console.log("Guest pass created:", id);
      setTimeout(async () => {
        await db.update(guestPass).set({ status: "expired" }).where(eq(guestPass.id, id));
        console.log("Guest pass expired:", id);
      }, durationMinutes * 60 * 1e3);
    } catch (e) {
      console.error("Error creating guest pass:", e);
      return fail(500, { error: "Failed to create guest pass." });
    }
    throw redirect(303, "/user/dashboard/guests");
  }
};
export {
  actions
};
