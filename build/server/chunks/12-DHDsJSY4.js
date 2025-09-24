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
const component = async () => component_cache ??= (await import('./_page.svelte-BjKSx3sE.js')).default;
const server_id = "src/routes/admin/dashboard/guests/+page.server.ts";
const imports = ["_app/immutable/nodes/12.Ciu6Q0er.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DsPuBiMm.js","_app/immutable/chunks/N5lxWZGS.js","_app/immutable/chunks/BaSLTKbU.js","_app/immutable/chunks/B135_YsI.js","_app/immutable/chunks/Dx3h8YKD.js","_app/immutable/chunks/UGtQv9Vd.js","_app/immutable/chunks/CsTGPyzP.js","_app/immutable/chunks/DrWauV8B.js","_app/immutable/chunks/DSP_IF8R.js","_app/immutable/chunks/BnZ110ug.js","_app/immutable/chunks/Ct8xIc2f.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/BrKrArgY.js","_app/immutable/chunks/DnwoYYiD.js","_app/immutable/chunks/Bc0xGMnQ.js","_app/immutable/chunks/BBnkIoAR.js","_app/immutable/chunks/CkJi4ZpE.js","_app/immutable/chunks/Ctr7oTW1.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-DHDsJSY4.js.map
