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
const component = async () => component_cache ??= (await import('./_layout.svelte-BSYQQTym.js')).default;
const server_id = "src/routes/admin/dashboard/+layout.server.ts";
const imports = ["_app/immutable/nodes/2.QVQmgx1I.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DsPuBiMm.js","_app/immutable/chunks/N5lxWZGS.js","_app/immutable/chunks/B135_YsI.js","_app/immutable/chunks/Dx3h8YKD.js","_app/immutable/chunks/UGtQv9Vd.js","_app/immutable/chunks/DrWauV8B.js","_app/immutable/chunks/DSP_IF8R.js","_app/immutable/chunks/CyspWyKM.js","_app/immutable/chunks/BnZ110ug.js","_app/immutable/chunks/Ct8xIc2f.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/Bc0xGMnQ.js","_app/immutable/chunks/CkJi4ZpE.js","_app/immutable/chunks/Ctr7oTW1.js","_app/immutable/chunks/DDCxn3ry.js","_app/immutable/chunks/WNbVgFxQ.js","_app/immutable/chunks/BaSLTKbU.js","_app/immutable/chunks/CsTGPyzP.js","_app/immutable/chunks/BSK96_y8.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-BeiXJaqO.js.map
