import { d as db, b as guestPass, e as eq } from './index3-DfwD5jMB.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-CAO4MP8_.js')).default;
const server_id = "src/routes/admin/dashboard/guests/+page.server.ts";
const imports = ["_app/immutable/nodes/12.D5WA9v5J.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dr5p_gXH.js","_app/immutable/chunks/D6_VZFDO.js","_app/immutable/chunks/G6y-YXti.js","_app/immutable/chunks/BDSG5-H0.js","_app/immutable/chunks/DtrBNwtL.js","_app/immutable/chunks/BHQlukOt.js","_app/immutable/chunks/CYxAlzJ1.js","_app/immutable/chunks/BdvQLAZU.js","_app/immutable/chunks/g0qwyJPX.js","_app/immutable/chunks/BfIrQ_zr.js","_app/immutable/chunks/C80BVqqJ.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/Dr4jViYc.js","_app/immutable/chunks/Cko499XQ.js","_app/immutable/chunks/CmAcq_e6.js","_app/immutable/chunks/BWorSmfV.js","_app/immutable/chunks/DPinqpzW.js","_app/immutable/chunks/DDKRNP9O.js"];
const stylesheets = ["_app/immutable/assets/12.BvxMG4p2.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-CjaL2MQe.js.map
