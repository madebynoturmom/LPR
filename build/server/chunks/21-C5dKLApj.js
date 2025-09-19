import { d as db, b as guestPass, e as eq } from './index3-DE5iFVeB.js';
import { f as fail } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

function getUserIdFromSession(cookies) {
  return "R001";
}
const actions = {
  default: async ({ request, cookies }) => {
    const userId = getUserIdFromSession();
    const form = await request.formData();
    const plateNumber = form.get("plateNumber")?.toString();
    const durationMinutes = Number(form.get("durationMinutes"));
    if (!plateNumber || !durationMinutes) {
      return fail(400, { error: "All fields are required." });
    }
    try {
      await db.insert(guestPass).values({
        id: userId,
        // Use userId as the id for the guest pass
        plateNumber,
        visitTime: /* @__PURE__ */ new Date(),
        durationMinutes
      });
      return { success: true };
    } catch (e) {
      return fail(500, { error: "Failed to issue pass." });
    }
  }
};
const load = async ({ cookies }) => {
  const foodDeliveryPasses = await db.select().from(guestPass).where(eq(guestPass.type, "food_delivery"));
  return { foodDeliveryPasses };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 21;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BqzqfwAq.js')).default;
const server_id = "src/routes/user/dashboard/food-delivery/+page.server.ts";
const imports = ["_app/immutable/nodes/21.Co9ycj-W.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/HIJMQ0Il.js","_app/immutable/chunks/Cd9Ou9lz.js","_app/immutable/chunks/B5CKEvbc.js","_app/immutable/chunks/CE_Elu-f.js","_app/immutable/chunks/DLge_FqR.js","_app/immutable/chunks/NX4HCjE0.js","_app/immutable/chunks/p-fOG7Xz.js","_app/immutable/chunks/BSmjIgV1.js","_app/immutable/chunks/CYbLQOsd.js","_app/immutable/chunks/Xyw_xob0.js"];
const stylesheets = ["_app/immutable/assets/21.CJqpWZ1o.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=21-C5dKLApj.js.map
