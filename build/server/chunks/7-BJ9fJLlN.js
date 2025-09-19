import { d as db, c as eventLog, u as user } from './index3-DE5iFVeB.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async () => {
  const eventsRaw = await db.select().from(eventLog).all();
  const users = await db.select().from(user).all();
  const userMap = Object.fromEntries(users.map((u) => [u.id, u]));
  const events = eventsRaw.map((e) => {
    const ts = typeof e.timestamp === "string" ? parseInt(e.timestamp, 10) : e.timestamp;
    return {
      ...e,
      userName: e.userId ? userMap[e.userId]?.name || userMap[e.userId]?.username || "-" : "System",
      time: new Date(Number(ts) * 1e3).toLocaleString()
    };
  });
  return { events };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B9fJu3o_.js')).default;
const server_id = "src/routes/admin/dashboard/events/+page.server.ts";
const imports = ["_app/immutable/nodes/7.LYLaKm_B.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CaduOojm.js","_app/immutable/chunks/c4qruIAv.js","_app/immutable/chunks/HIJMQ0Il.js","_app/immutable/chunks/Cd9Ou9lz.js","_app/immutable/chunks/B5CKEvbc.js","_app/immutable/chunks/CE_Elu-f.js","_app/immutable/chunks/DLge_FqR.js","_app/immutable/chunks/p-fOG7Xz.js","_app/immutable/chunks/BSmjIgV1.js","_app/immutable/chunks/CYbLQOsd.js","_app/immutable/chunks/Xyw_xob0.js"];
const stylesheets = ["_app/immutable/assets/7.BRYy26hY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-BJ9fJLlN.js.map
