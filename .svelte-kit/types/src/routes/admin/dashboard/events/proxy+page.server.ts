// @ts-nocheck
import { db } from '$lib/server/db';
import { eventLog, user } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load = async () => {
  const eventsRaw = await db.select().from(eventLog).all();
  const users = await db.select().from(user).all();
  const userMap = Object.fromEntries(users.map(u => [u.id, u]));
  const events = eventsRaw.map(e => {
    const ts = typeof e.timestamp === 'string' ? parseInt(e.timestamp, 10) : e.timestamp;
    return {
      ...e,
      userName: e.userId ? (userMap[e.userId]?.name || userMap[e.userId]?.username || '-') : 'System',
      time: new Date(Number(ts) * 1000).toLocaleString()
    };
  });
  return { events };
};
;null as any as PageServerLoad;