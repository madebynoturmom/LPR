import * as server from '../entries/pages/admin/dashboard/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/dashboard/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/dashboard/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.DCxQmG49.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/i9DHmAX1.js","_app/immutable/chunks/MgvKJ5Oe.js","_app/immutable/chunks/tNEdk8z3.js","_app/immutable/chunks/DANlTl3y.js","_app/immutable/chunks/TZ4K4ZOd.js","_app/immutable/chunks/uYRH7WDe.js","_app/immutable/chunks/D3LgcHxc.js","_app/immutable/chunks/EO6i301i.js","_app/immutable/chunks/STPvjbMu.js","_app/immutable/chunks/DbZgNqix.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/mO3J0t2N.js","_app/immutable/chunks/BIazggEA.js","_app/immutable/chunks/BzyUH8j5.js","_app/immutable/chunks/CprSpIeg.js","_app/immutable/chunks/CK-fib3O.js","_app/immutable/chunks/BQQlMUYl.js","_app/immutable/chunks/D5ruwRzR.js","_app/immutable/chunks/tN8zdOQx.js"];
export const stylesheets = [];
export const fonts = [];
