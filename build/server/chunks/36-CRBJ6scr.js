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

const index = 36;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BNdE1Gsi.js')).default;
const server_id = "src/routes/user/dashboard/history/+page.server.ts";
const imports = ["_app/immutable/nodes/36.BW5avmko.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DsPuBiMm.js","_app/immutable/chunks/N5lxWZGS.js","_app/immutable/chunks/B135_YsI.js","_app/immutable/chunks/Dx3h8YKD.js","_app/immutable/chunks/UGtQv9Vd.js","_app/immutable/chunks/DrWauV8B.js","_app/immutable/chunks/DSP_IF8R.js","_app/immutable/chunks/Ct8xIc2f.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/Bc0xGMnQ.js","_app/immutable/chunks/BBnkIoAR.js","_app/immutable/chunks/CkJi4ZpE.js","_app/immutable/chunks/Ctr7oTW1.js"];
const stylesheets = ["_app/immutable/assets/36.BRUEHXMY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=36-CRBJ6scr.js.map
