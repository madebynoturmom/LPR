import { d as db, k as guestPassHistory, e as eq, b as guestPass, f as and } from './index3-DTrFeyBm.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async ({ locals }) => {
  const user = locals.user;
  if (!user) return { pastPasses: [] };
  const revokedPasses = await db.select().from(guestPassHistory).where(eq(guestPassHistory.userId, user.id));
  const allActivePasses = await db.select().from(guestPass).where(
    and(
      eq(guestPass.userId, user.id),
      eq(guestPass.status, "active")
    )
  );
  const now = Math.floor(Date.now() / 1e3);
  const expiredPasses = allActivePasses.filter((pass) => {
    const visitTimeSeconds = Math.floor(pass.visitTime.getTime() / 1e3);
    const expirationTime = visitTimeSeconds + pass.durationMinutes * 60;
    return now >= expirationTime;
  }).map((pass) => ({ ...pass, reason: "expired" }));
  const pastPasses = [
    ...revokedPasses.map((pass) => ({ ...pass, reason: "revoked" })),
    ...expiredPasses
  ].sort((a, b) => new Date(b.visitTime).getTime() - new Date(a.visitTime).getTime());
  return { pastPasses };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 26;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DYv2G7Fe.js')).default;
const server_id = "src/routes/user/dashboard/history/+page.server.ts";
const imports = ["_app/immutable/nodes/26.C0-mlF-k.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/COTvsYcR.js","_app/immutable/chunks/BjJWVY7i.js","_app/immutable/chunks/DyiMSgY8.js","_app/immutable/chunks/CbnbkC1n.js","_app/immutable/chunks/BN32gUog.js","_app/immutable/chunks/D6O3RN6I.js","_app/immutable/chunks/DMSwwT4m.js","_app/immutable/chunks/CAznQZM0.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/BbceK8gy.js","_app/immutable/chunks/DSozhXEh.js","_app/immutable/chunks/tExuWAHb.js","_app/immutable/chunks/CmONDsb2.js"];
const stylesheets = ["_app/immutable/assets/26.BRUEHXMY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=26-BP6n32B_.js.map
