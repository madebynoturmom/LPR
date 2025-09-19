import { d as db, u as user, e as eq } from './index3-DE5iFVeB.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async ({ params }) => {
  const id = params.id;
  const resident = await db.select().from(user).where(eq(user.id, id)).then((rows) => rows[0]);
  return { resident };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CfiOVz1Y.js')).default;
const server_id = "src/routes/admin/dashboard/residents/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/12.VX-Zxtrf.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/HIJMQ0Il.js","_app/immutable/chunks/Cd9Ou9lz.js","_app/immutable/chunks/B5CKEvbc.js","_app/immutable/chunks/CE_Elu-f.js","_app/immutable/chunks/p-fOG7Xz.js","_app/immutable/chunks/BSmjIgV1.js","_app/immutable/chunks/CYbLQOsd.js","_app/immutable/chunks/Xyw_xob0.js","_app/immutable/chunks/BqEnfvlG.js","_app/immutable/chunks/DJtz8HCy.js","_app/immutable/chunks/CmkkP05h.js"];
const stylesheets = ["_app/immutable/assets/12.Dx5DOKPL.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-BZIUBcl8.js.map
