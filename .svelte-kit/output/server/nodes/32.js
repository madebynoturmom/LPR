import * as server from '../entries/pages/user/dashboard/food-delivery/_page.server.ts.js';

export const index = 32;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/user/dashboard/food-delivery/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/user/dashboard/food-delivery/+page.server.ts";
export const imports = ["_app/immutable/nodes/32.MtFE5-vF.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DsPuBiMm.js","_app/immutable/chunks/N5lxWZGS.js","_app/immutable/chunks/B135_YsI.js","_app/immutable/chunks/Dx3h8YKD.js","_app/immutable/chunks/UGtQv9Vd.js","_app/immutable/chunks/DrWauV8B.js","_app/immutable/chunks/DSP_IF8R.js","_app/immutable/chunks/BnZ110ug.js","_app/immutable/chunks/Bc0xGMnQ.js","_app/immutable/chunks/BBnkIoAR.js","_app/immutable/chunks/CkJi4ZpE.js","_app/immutable/chunks/Ctr7oTW1.js"];
export const stylesheets = ["_app/immutable/assets/32.CJqpWZ1o.css"];
export const fonts = [];
