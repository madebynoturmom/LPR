import { load as load$1 } from "../../_page.server.ts.js";
const load = async (event) => {
  const data = await load$1(event);
  return data;
};
export {
  load
};
