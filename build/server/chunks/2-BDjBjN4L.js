import { d as db, a as admin, e as eq } from './index3-CPj-fGVF.js';
import { r as redirect } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async ({ locals }) => {
  const user = locals.user;
  if (!user) throw redirect(303, "/login");
  const admins = await db.select().from(admin).where(eq(admin.id, user.id));
  if (!admins.length) throw redirect(303, "/login");
  const adminData = admins[0];
  return { user: adminData };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-BlycE1Xy.js')).default;
const server_id = "src/routes/admin/dashboard/+layout.server.ts";
const imports = ["_app/immutable/nodes/2.DCxQmG49.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/i9DHmAX1.js","_app/immutable/chunks/MgvKJ5Oe.js","_app/immutable/chunks/tNEdk8z3.js","_app/immutable/chunks/DANlTl3y.js","_app/immutable/chunks/TZ4K4ZOd.js","_app/immutable/chunks/uYRH7WDe.js","_app/immutable/chunks/D3LgcHxc.js","_app/immutable/chunks/EO6i301i.js","_app/immutable/chunks/STPvjbMu.js","_app/immutable/chunks/DbZgNqix.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/mO3J0t2N.js","_app/immutable/chunks/BIazggEA.js","_app/immutable/chunks/BzyUH8j5.js","_app/immutable/chunks/CprSpIeg.js","_app/immutable/chunks/CK-fib3O.js","_app/immutable/chunks/BQQlMUYl.js","_app/immutable/chunks/D5ruwRzR.js","_app/immutable/chunks/tN8zdOQx.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-BDjBjN4L.js.map
