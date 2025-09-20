import { $ as bind_props } from "../../../../../../../chunks/index2.js";
import { a as attr } from "../../../../../../../chunks/attributes.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let { vehicle } = data;
    let model = vehicle.model || "";
    let makeYear = vehicle.makeYear || "";
    let plateNumber = vehicle.plateNumber || "";
    $$renderer2.push(`<h2>Edit Vehicle</h2> <form class="svelte-13dj7uc"><label class="svelte-13dj7uc">Model <input name="model"${attr("value", model)} required/></label> <label class="svelte-13dj7uc">Make Year <input name="makeYear" type="number"${attr("value", makeYear)} required/></label> <label class="svelte-13dj7uc">Plate Number <input name="plateNumber"${attr("value", plateNumber)} required/></label> <button type="submit" class="svelte-13dj7uc">Save Changes</button></form> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
