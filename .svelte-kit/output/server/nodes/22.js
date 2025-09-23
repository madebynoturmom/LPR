import * as server from '../entries/pages/guard/dashboard/_page.server.ts.js';

export const index = 22;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/guard/dashboard/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/guard/dashboard/+page.server.ts";
export const imports = ["_app/immutable/nodes/22.DhOKX_D7.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/i9DHmAX1.js","_app/immutable/chunks/MgvKJ5Oe.js","_app/immutable/chunks/tNEdk8z3.js","_app/immutable/chunks/DANlTl3y.js","_app/immutable/chunks/TZ4K4ZOd.js","_app/immutable/chunks/uYRH7WDe.js","_app/immutable/chunks/D3LgcHxc.js","_app/immutable/chunks/STPvjbMu.js","_app/immutable/chunks/5UxS6Hio.js","_app/immutable/chunks/mO3J0t2N.js","_app/immutable/chunks/BifvwZtI.js","_app/immutable/chunks/BIazggEA.js","_app/immutable/chunks/BzyUH8j5.js"];
export const stylesheets = ["_app/immutable/assets/22.Dxm5GUdE.css"];
export const fonts = [];
