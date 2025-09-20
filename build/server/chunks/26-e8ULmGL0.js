import { d as db, k as guestPassHistory, e as eq, b as guestPass, f as and } from './index3-Dp-zUSVy.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-BdAgJ3QH.js')).default;
const server_id = "src/routes/user/dashboard/history/+page.server.ts";
const imports = ["_app/immutable/nodes/26.Bk2IDCMj.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/tQRZQKdW.js","_app/immutable/chunks/DQGvmDc0.js","_app/immutable/chunks/DZss8mLC.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CeacdKOn.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js"];
const stylesheets = ["_app/immutable/assets/26.BRUEHXMY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=26-e8ULmGL0.js.map
