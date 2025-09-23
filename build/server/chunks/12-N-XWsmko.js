import { d as db, c as guestPass, e as eq } from './index3-CPj-fGVF.js';
import { v4 } from 'uuid';
import { f as fail, r as redirect } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async () => {
  const passes = await db.select().from(guestPass).all();
  return { passes };
};
const actions = {
  create: async (event) => {
    const { request, locals } = event;
    const user = locals.user;
    if (!user || user.role !== "guard" && user.role !== "resident" && user.role !== "admin") {
      return fail(403, { error: "Only guards, residents, or admins can create guest passes." });
    }
    console.log("User Role:", user.role);
    const form = await request.formData();
    const plateNumber = form.get("plateNumber")?.toString().trim();
    const name = form.get("name")?.toString().trim();
    const phone = form.get("phone")?.toString().trim();
    const visitTime = form.get("visitTime")?.toString();
    const durationMinutes = Number(form.get("durationMinutes"));
    if (!plateNumber || !name || !phone || !visitTime || !durationMinutes) {
      return fail(400, { error: "All fields are required." });
    }
    const id = v4();
    await db.insert(guestPass).values({
      id,
      plateNumber,
      visitTime: new Date(visitTime),
      durationMinutes,
      status: "active",
      userId: user.id,
      type: "visitors",
      name,
      phone
    });
    setTimeout(async () => {
      const client = db.$client;
      client.prepare(
        `UPDATE guest_pass SET status = 'expired' WHERE id = ? AND status != 'revoked'`
      ).run(id);
      client.prepare(
        `INSERT INTO guest_pass_history (id, plate_number, visit_time, duration_minutes, status, user_id, type, revoked_at, name, phone)
				SELECT id, plate_number, visit_time, duration_minutes, 'expired', user_id, type, strftime('%s', 'now'), name, phone
				FROM guest_pass
				WHERE id = ? AND status = 'expired'`
      ).run(id);
      client.prepare(
        `DELETE FROM guest_pass WHERE id = ? AND status = 'expired'`
      ).run(id);
      console.log("Guest pass expired:", id);
    }, durationMinutes * 60 * 1e3);
    return { success: true };
  },
  delete: async ({ request }) => {
    const form = await request.formData();
    const id = form.get("id")?.toString();
    if (!id) return fail(400, { error: "Missing pass ID." });
    await db.delete(guestPass).where(eq(guestPass.id, id));
    throw redirect(303, "/admin/dashboard/guests?deleted=1");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-nWh_NOgC.js')).default;
const server_id = "src/routes/admin/dashboard/guests/+page.server.ts";
const imports = ["_app/immutable/nodes/12.7sSB9cNA.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/i9DHmAX1.js","_app/immutable/chunks/MgvKJ5Oe.js","_app/immutable/chunks/BQQlMUYl.js","_app/immutable/chunks/tNEdk8z3.js","_app/immutable/chunks/DANlTl3y.js","_app/immutable/chunks/TZ4K4ZOd.js","_app/immutable/chunks/D5ruwRzR.js","_app/immutable/chunks/uYRH7WDe.js","_app/immutable/chunks/D3LgcHxc.js","_app/immutable/chunks/STPvjbMu.js","_app/immutable/chunks/DbZgNqix.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/CBbLTMDG.js","_app/immutable/chunks/5UxS6Hio.js","_app/immutable/chunks/mO3J0t2N.js","_app/immutable/chunks/BifvwZtI.js","_app/immutable/chunks/BIazggEA.js","_app/immutable/chunks/BzyUH8j5.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-N-XWsmko.js.map
