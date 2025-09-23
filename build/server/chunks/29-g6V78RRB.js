import { d as db, u as user, e as eq, v as vehicle$1, h as and, c as guestPass } from './index3-CPj-fGVF.js';
import { v4 } from 'uuid';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

const actions = {
  default: async ({ request, locals }) => {
    const userSession = locals.user;
    if (!userSession) return fail(401, { error: "Not authenticated." });
    const fullUser = await db.select().from(user).where(eq(user.id, userSession.id)).get();
    if (!fullUser) return fail(401, { error: "User not found." });
    const form = await request.formData();
    const plateNumber = form.get("plateNumber")?.toString().trim();
    const name = form.get("name")?.toString().trim();
    const phone = form.get("phone")?.toString().trim();
    const durationMinutes = Number(form.get("durationMinutes"));
    if (!plateNumber || !name || !phone || !durationMinutes) {
      return fail(400, { error: "All fields are required." });
    }
    const existingVehicle = await db.select().from(vehicle$1).where(and(eq(vehicle$1.plateNumber, plateNumber), eq(vehicle$1.ownerId, userSession.id))).limit(1);
    if (existingVehicle.length > 0) {
      return fail(400, { error: "This plate number belongs to one of your registered vehicles. Please enter a different plate number for the food delivery pass." });
    }
    const id = v4();
    try {
      await db.insert(guestPass).values({
        id,
        plateNumber,
        visitTime: /* @__PURE__ */ new Date(),
        durationMinutes,
        status: "active",
        userId: userSession.id,
        type: "food_delivery",
        name,
        phone
      });
    } catch (e) {
      return fail(500, { error: "Failed to issue pass." });
    }
    throw redirect(303, "/user/dashboard/food-delivery");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 29;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C2F7UWNS.js')).default;
const server_id = "src/routes/user/dashboard/food-delivery/create/+page.server.ts";
const imports = ["_app/immutable/nodes/29.Bfr4A3kP.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/i9DHmAX1.js","_app/immutable/chunks/MgvKJ5Oe.js","_app/immutable/chunks/tNEdk8z3.js","_app/immutable/chunks/DANlTl3y.js","_app/immutable/chunks/TZ4K4ZOd.js","_app/immutable/chunks/uYRH7WDe.js","_app/immutable/chunks/STPvjbMu.js","_app/immutable/chunks/5UxS6Hio.js","_app/immutable/chunks/mO3J0t2N.js","_app/immutable/chunks/BifvwZtI.js","_app/immutable/chunks/BIazggEA.js","_app/immutable/chunks/BzyUH8j5.js"];
const stylesheets = ["_app/immutable/assets/29.JdnQOfNv.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=29-g6V78RRB.js.map
