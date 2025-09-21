import { d as db, s as sql, b as guestPass, f as and, e as eq, k as desc } from './index3-DfwD5jMB.js';
import 'dotenv/config';
import 'better-sqlite3';

const load = async ({ locals }) => {
  const user = locals.user;
  if (!user) {
    return {
      recentActivity: {
        activeGuestPasses: 0,
        activeFoodDeliveryPasses: 0,
        recentCarAccess: "N/A"
      },
      activeGuestPasses: [],
      activeFoodDeliveryPasses: []
    };
  }
  const activeGuestPassesRows = await db.all(
    sql`SELECT COUNT(*) as count FROM guest_pass WHERE user_id = ${user.id} AND status = 'active' AND type = 'visitors'`
  );
  const activeGuestPassesCount = activeGuestPassesRows[0]?.count ? Number(activeGuestPassesRows[0].count) : 0;
  const allActiveGuestPasses = await db.select().from(guestPass).where(
    and(
      eq(guestPass.userId, user.id),
      eq(guestPass.status, "active"),
      eq(guestPass.type, "visitors")
    )
  ).orderBy(desc(guestPass.visitTime));
  const now = Math.floor(Date.now() / 1e3);
  const activeGuestPasses = allActiveGuestPasses.filter((pass) => {
    const visitTimeSeconds = Math.floor(pass.visitTime.getTime() / 1e3);
    const expirationTime = visitTimeSeconds + pass.durationMinutes * 60;
    return now < expirationTime;
  });
  const activeFoodDeliveryPassesRows = await db.all(
    sql`SELECT COUNT(*) as count FROM guest_pass WHERE user_id = ${user.id} AND status = 'active' AND type = 'food_delivery'`
  );
  const activeFoodDeliveryPassesCount = activeFoodDeliveryPassesRows[0]?.count ? Number(activeFoodDeliveryPassesRows[0].count) : 0;
  const allActiveFoodDeliveryPasses = await db.select().from(guestPass).where(
    and(
      eq(guestPass.userId, user.id),
      eq(guestPass.status, "active"),
      eq(guestPass.type, "food_delivery")
    )
  ).orderBy(desc(guestPass.visitTime));
  const activeFoodDeliveryPasses = allActiveFoodDeliveryPasses.filter((pass) => {
    const visitTimeSeconds = Math.floor(pass.visitTime.getTime() / 1e3);
    const expirationTime = visitTimeSeconds + pass.durationMinutes * 60;
    return now < expirationTime;
  });
  const recentCarAccess = "N/A";
  return {
    recentActivity: {
      activeGuestPasses: activeGuestPassesCount,
      activeFoodDeliveryPasses: activeFoodDeliveryPassesCount,
      recentCarAccess
    },
    activeGuestPasses,
    activeFoodDeliveryPasses
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 24;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-FAEOibR9.js')).default;
const server_id = "src/routes/user/dashboard/+page.server.ts";
const imports = ["_app/immutable/nodes/24.Dp9milGR.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dr5p_gXH.js","_app/immutable/chunks/D6_VZFDO.js","_app/immutable/chunks/BDSG5-H0.js","_app/immutable/chunks/DtrBNwtL.js","_app/immutable/chunks/BHQlukOt.js","_app/immutable/chunks/BdvQLAZU.js","_app/immutable/chunks/g0qwyJPX.js","_app/immutable/chunks/BfIrQ_zr.js","_app/immutable/chunks/BkOMJDxY.js","_app/immutable/chunks/CdEA5IGF.js","_app/immutable/chunks/CmAcq_e6.js","_app/immutable/chunks/BWorSmfV.js","_app/immutable/chunks/DPinqpzW.js","_app/immutable/chunks/DDKRNP9O.js","_app/immutable/chunks/74iUYhy1.js","_app/immutable/chunks/CrdiqAgI.js","_app/immutable/chunks/G6y-YXti.js","_app/immutable/chunks/CYxAlzJ1.js","_app/immutable/chunks/BvzuUZFe.js"];
const stylesheets = ["_app/immutable/assets/24.m9s_vsEn.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=24-unRgRyFO.js.map
