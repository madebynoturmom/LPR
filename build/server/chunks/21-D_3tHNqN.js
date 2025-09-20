import { d as db, s as sql, b as guestPass, f as and, e as eq, j as desc } from './index3-Dp-zUSVy.js';
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

const index = 21;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B_4CCfHe.js')).default;
const server_id = "src/routes/user/dashboard/+page.server.ts";
const imports = ["_app/immutable/nodes/21.FMHYEOgs.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/tQRZQKdW.js","_app/immutable/chunks/DQGvmDc0.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CeacdKOn.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js"];
const stylesheets = ["_app/immutable/assets/21.5q9J2IHQ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=21-D_3tHNqN.js.map
