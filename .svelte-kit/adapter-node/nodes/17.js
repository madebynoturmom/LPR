import * as server from '../entries/pages/admin/dashboard/vehicles/_page.server.ts.js';

export const index = 17;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/dashboard/vehicles/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/dashboard/vehicles/+page.server.ts";
export const imports = ["_app/immutable/nodes/17.DnZ4FT3S.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/DQGvmDc0.js","_app/immutable/chunks/CFpdNlsL.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CeacdKOn.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js"];
export const stylesheets = ["_app/immutable/assets/17.Csni5dJ0.css"];
export const fonts = [];
