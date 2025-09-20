import { d as db, u as user, e as eq } from './index3-Dp-zUSVy.js';
import { r as redirect } from './index-BmA2ZghE.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async ({ locals }) => {
  const user$1 = locals.user;
  if (!user$1) throw redirect(303, "/login");
  const users = await db.select().from(user).where(eq(user.id, user$1.id));
  if (!users.length) throw redirect(303, "/login");
  const userData = users[0];
  return { user: userData };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-C4CBK2ce.js')).default;
const server_id = "src/routes/user/dashboard/+layout.server.ts";
const imports = ["_app/immutable/nodes/3.jM4ExwW6.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/tQRZQKdW.js","_app/immutable/chunks/DQGvmDc0.js","_app/immutable/chunks/CrPu_4lx.js","_app/immutable/chunks/CFpdNlsL.js","_app/immutable/chunks/DZss8mLC.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js","_app/immutable/chunks/BIKuTJgm.js","_app/immutable/chunks/DioV78hU.js","_app/immutable/chunks/-kgmExda.js","_app/immutable/chunks/Cdivgpra.js","_app/immutable/chunks/DC2F6t9P.js"];
const stylesheets = ["_app/immutable/assets/3.B3jJJPDi.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-Cm376toH.js.map
