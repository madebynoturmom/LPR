import { d as db, c as guestPass, e as eq, j as guestPassHistory, h as and, k as desc } from './index3-CPj-fGVF.js';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

const actions = {
  revoke: async ({ request, locals }) => {
    const user2 = locals.user;
    if (!user2) return fail(401, { error: "Not authenticated." });
    const form = await request.formData();
    const id = form.get("id")?.toString();
    if (!id) return fail(400, { error: "Missing food delivery pass id" });
    const pass = await db.select().from(guestPass).where(eq(guestPass.id, id)).get();
    if (!pass || pass.userId !== user2.id) return fail(403, { error: "Food delivery pass not found or not owned by you" });
    await db.insert(guestPassHistory).values({
      id: pass.id,
      plateNumber: pass.plateNumber,
      visitTime: pass.visitTime,
      durationMinutes: pass.durationMinutes,
      status: pass.status,
      userId: user2.id,
      // User who revoked
      type: pass.type,
      revokedAt: /* @__PURE__ */ new Date(),
      name: pass.name,
      phone: pass.phone
    });
    await db.delete(guestPass).where(eq(guestPass.id, id));
    throw redirect(303, "/user/dashboard/food-delivery");
  },
  extend: async ({ request, locals }) => {
    const user2 = locals.user;
    if (!user2) return fail(401, { error: "Not authenticated." });
    const form = await request.formData();
    const id = form.get("id")?.toString();
    const additionalMinutes = Number(form.get("duration"));
    if (!id || !additionalMinutes || isNaN(additionalMinutes)) return fail(400, { error: "Missing or invalid data" });
    const pass = await db.select().from(guestPass).where(eq(guestPass.id, id)).get();
    if (!pass || pass.userId !== user2.id) return fail(403, { error: "Food delivery pass not found or not owned by you" });
    const newDuration = pass.durationMinutes + additionalMinutes;
    await db.update(guestPass).set({ durationMinutes: newDuration }).where(eq(guestPass.id, id));
    throw redirect(303, "/user/dashboard/food-delivery");
  }
};
const load = async ({ locals }) => {
  const user2 = locals.user;
  if (!user2) return { foodDeliveryPasses: [] };
  const allFoodDeliveryPasses = await db.select().from(guestPass).where(
    and(
      eq(guestPass.userId, user2.id),
      eq(guestPass.type, "food_delivery"),
      eq(guestPass.status, "active")
    )
  ).orderBy(desc(guestPass.visitTime));
  const now = Math.floor(Date.now() / 1e3);
  const foodDeliveryPasses = allFoodDeliveryPasses.filter((pass) => {
    const visitTimeSeconds = Math.floor(pass.visitTime.getTime() / 1e3);
    const expirationTime = visitTimeSeconds + pass.durationMinutes * 60;
    return now < expirationTime;
  });
  return { foodDeliveryPasses };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 32;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C5B0U1gX.js')).default;
const server_id = "src/routes/user/dashboard/food-delivery/+page.server.ts";
const imports = ["_app/immutable/nodes/32.MtFE5-vF.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DsPuBiMm.js","_app/immutable/chunks/N5lxWZGS.js","_app/immutable/chunks/B135_YsI.js","_app/immutable/chunks/Dx3h8YKD.js","_app/immutable/chunks/UGtQv9Vd.js","_app/immutable/chunks/DrWauV8B.js","_app/immutable/chunks/DSP_IF8R.js","_app/immutable/chunks/BnZ110ug.js","_app/immutable/chunks/Bc0xGMnQ.js","_app/immutable/chunks/BBnkIoAR.js","_app/immutable/chunks/CkJi4ZpE.js","_app/immutable/chunks/Ctr7oTW1.js"];
const stylesheets = ["_app/immutable/assets/32.CJqpWZ1o.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=32-DslRBvOr.js.map
