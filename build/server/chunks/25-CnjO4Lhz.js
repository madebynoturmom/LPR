import { d as db, v as vehicle$1, f as and, e as eq, b as guestPass } from './index3-Dp-zUSVy.js';
import { v4 } from 'uuid';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

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
    const existingVehicle = await db.select().from(vehicle$1).where(and(eq(vehicle$1.plateNumber, plateNumber), eq(vehicle$1.ownerId, userId))).limit(1);
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

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 25;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CvVrvvuy.js')).default;
const server_id = "src/routes/user/dashboard/guests/create/+page.server.ts";
const imports = ["_app/immutable/nodes/25.BCVvCgup.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/tQRZQKdW.js","_app/immutable/chunks/CFpdNlsL.js","_app/immutable/chunks/CBdOqptF.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CeacdKOn.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js"];
const stylesheets = ["_app/immutable/assets/25.CUUPVawk.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=25-CnjO4Lhz.js.map
