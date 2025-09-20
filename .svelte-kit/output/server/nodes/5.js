import * as server from '../entries/pages/admin/dashboard/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/dashboard/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/dashboard/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.DGjLvSos.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYPRAMuI.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/-kgmExda.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/Cdivgpra.js","_app/immutable/chunks/DQGvmDc0.js","_app/immutable/chunks/CFpdNlsL.js","_app/immutable/chunks/DQqwweIW.js","_app/immutable/chunks/GsMnuBgZ.js","_app/immutable/chunks/CeacdKOn.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js","_app/immutable/chunks/CXo3jt2d.js"];
export const stylesheets = ["_app/immutable/assets/5.DkgmTxDY.css"];
export const fonts = [];
