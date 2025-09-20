import * as server from '../entries/pages/admin/dashboard/guards/_page.server.ts.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/dashboard/guards/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/dashboard/guards/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.CluZ12dP.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/tQRZQKdW.js","_app/immutable/chunks/DQGvmDc0.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CeacdKOn.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js"];
export const stylesheets = ["_app/immutable/assets/9.Wa_G3UM1.css"];
export const fonts = [];
