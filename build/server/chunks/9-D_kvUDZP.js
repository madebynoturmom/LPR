import { d as db, b as eventLog, u as user } from './index3-CPj-fGVF.js';
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

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BR5uhhyB.js')).default;
const server_id = "src/routes/admin/dashboard/events/+page.server.ts";
const imports = ["_app/immutable/nodes/9.DmeJ6J34.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DsPuBiMm.js","_app/immutable/chunks/N5lxWZGS.js","_app/immutable/chunks/B135_YsI.js","_app/immutable/chunks/Dx3h8YKD.js","_app/immutable/chunks/UGtQv9Vd.js","_app/immutable/chunks/DrWauV8B.js","_app/immutable/chunks/DSP_IF8R.js","_app/immutable/chunks/Bc0xGMnQ.js","_app/immutable/chunks/BBnkIoAR.js","_app/immutable/chunks/CkJi4ZpE.js","_app/immutable/chunks/Ctr7oTW1.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=9-D_kvUDZP.js.map
