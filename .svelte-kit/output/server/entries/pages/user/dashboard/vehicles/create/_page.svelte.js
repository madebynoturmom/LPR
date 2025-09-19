import { a as attr } from "../../../../../../chunks/attributes.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let model = "";
    let makeYear = "";
    let plateNumber = "";
    $$renderer2.push(`<h2>Add Vehicle</h2> <form class="svelte-as7bay"><label class="svelte-as7bay">Model <input name="model"${attr("value", model)} required/></label> <label class="svelte-as7bay">Make Year <input name="makeYear" type="number"${attr("value", makeYear)} required/></label> <label class="svelte-as7bay">Plate Number <input name="plateNumber"${attr("value", plateNumber)} required/></label> <button type="submit" class="svelte-as7bay">Add Vehicle</button></form> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
