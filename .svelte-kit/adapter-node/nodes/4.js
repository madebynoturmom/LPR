import * as server from '../entries/pages/user/dashboard/_layout.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/user/dashboard/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/user/dashboard/+layout.server.ts";
export const imports = ["_app/immutable/nodes/4.DRvbt7UP.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Dr5p_gXH.js","_app/immutable/chunks/D6_VZFDO.js","_app/immutable/chunks/G6y-YXti.js","_app/immutable/chunks/BDSG5-H0.js","_app/immutable/chunks/DtrBNwtL.js","_app/immutable/chunks/BHQlukOt.js","_app/immutable/chunks/CYxAlzJ1.js","_app/immutable/chunks/g0qwyJPX.js","_app/immutable/chunks/DPwYzefT.js","_app/immutable/chunks/BfIrQ_zr.js","_app/immutable/chunks/C80BVqqJ.js","_app/immutable/chunks/DkPbIObf.js","_app/immutable/chunks/CmAcq_e6.js","_app/immutable/chunks/DPinqpzW.js","_app/immutable/chunks/DDKRNP9O.js","_app/immutable/chunks/74iUYhy1.js","_app/immutable/chunks/CrdiqAgI.js","_app/immutable/chunks/BvzuUZFe.js"];
export const stylesheets = ["_app/immutable/assets/4.3aK3_JQn.css"];
export const fonts = [];
