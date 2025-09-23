import * as server from '../entries/pages/admin/dashboard/events/_page.server.ts.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/dashboard/events/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/dashboard/events/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.ZrK_Uo_F.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/i9DHmAX1.js","_app/immutable/chunks/MgvKJ5Oe.js","_app/immutable/chunks/tNEdk8z3.js","_app/immutable/chunks/DANlTl3y.js","_app/immutable/chunks/TZ4K4ZOd.js","_app/immutable/chunks/uYRH7WDe.js","_app/immutable/chunks/D3LgcHxc.js","_app/immutable/chunks/mO3J0t2N.js","_app/immutable/chunks/BifvwZtI.js","_app/immutable/chunks/BIazggEA.js","_app/immutable/chunks/BzyUH8j5.js"];
export const stylesheets = [];
export const fonts = [];
