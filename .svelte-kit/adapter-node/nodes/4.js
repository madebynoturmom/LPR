import * as server from '../entries/pages/user/dashboard/_layout.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/user/dashboard/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/user/dashboard/+layout.server.ts";
export const imports = ["_app/immutable/nodes/4.BqOYE5-0.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DsPuBiMm.js","_app/immutable/chunks/N5lxWZGS.js","_app/immutable/chunks/BaSLTKbU.js","_app/immutable/chunks/B135_YsI.js","_app/immutable/chunks/Dx3h8YKD.js","_app/immutable/chunks/UGtQv9Vd.js","_app/immutable/chunks/CsTGPyzP.js","_app/immutable/chunks/DSP_IF8R.js","_app/immutable/chunks/CyspWyKM.js","_app/immutable/chunks/BnZ110ug.js","_app/immutable/chunks/Ct8xIc2f.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/Bc0xGMnQ.js","_app/immutable/chunks/CkJi4ZpE.js","_app/immutable/chunks/Ctr7oTW1.js","_app/immutable/chunks/DDCxn3ry.js","_app/immutable/chunks/WNbVgFxQ.js","_app/immutable/chunks/BSK96_y8.js"];
export const stylesheets = ["_app/immutable/assets/4.3aK3_JQn.css"];
export const fonts = [];
