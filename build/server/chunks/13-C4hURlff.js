import { d as db, u as user, e as eq } from './index3-Dp-zUSVy.js';
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

const index = 13;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BPCMwrQr.js')).default;
const server_id = "src/routes/admin/dashboard/residents/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/13.wawAShe6.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/tQRZQKdW.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CeacdKOn.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js","_app/immutable/chunks/DC2F6t9P.js","_app/immutable/chunks/-kgmExda.js","_app/immutable/chunks/Cdivgpra.js"];
const stylesheets = ["_app/immutable/assets/13.Dx5DOKPL.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=13-C4hURlff.js.map
