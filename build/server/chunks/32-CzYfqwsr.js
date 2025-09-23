import { d as db, j as guestPassHistory, e as eq, c as guestPass, h as and } from './index3-CPj-fGVF.js';
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

const index = 32;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Bl-nsbv3.js')).default;
const server_id = "src/routes/user/dashboard/history/+page.server.ts";
const imports = ["_app/immutable/nodes/32.CfyFiSeW.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/i9DHmAX1.js","_app/immutable/chunks/MgvKJ5Oe.js","_app/immutable/chunks/tNEdk8z3.js","_app/immutable/chunks/DANlTl3y.js","_app/immutable/chunks/TZ4K4ZOd.js","_app/immutable/chunks/uYRH7WDe.js","_app/immutable/chunks/D3LgcHxc.js","_app/immutable/chunks/DbZgNqix.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/mO3J0t2N.js","_app/immutable/chunks/BifvwZtI.js","_app/immutable/chunks/BIazggEA.js","_app/immutable/chunks/BzyUH8j5.js"];
const stylesheets = ["_app/immutable/assets/32.BRUEHXMY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=32-CzYfqwsr.js.map
