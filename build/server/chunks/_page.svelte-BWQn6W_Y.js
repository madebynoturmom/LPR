import { $ as bind_props } from './index2-Dybjf8Ej.js';
import { b as attr } from './attributes-Y1rI5qy_.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './utils2-JZdwKo0Y.js';
import './context-DXUidelg.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let form = $$props["form"];
    let model = "";
    let makeYear = "";
    let plateNumber = "";
    $$renderer2.push(`<h2>Add Vehicle</h2> <form method="POST" class="svelte-as7bay"><label class="svelte-as7bay">Model <input name="model"${attr("value", model)} required/></label> <label class="svelte-as7bay">Make Year <input name="makeYear" type="number"${attr("value", makeYear)} required/></label> <label class="svelte-as7bay">Plate Number <input name="plateNumber"${attr("value", plateNumber)} required/></label> <button type="submit" class="btn svelte-as7bay">Add Vehicle</button></form> `);
    if (form?.error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="error svelte-as7bay">${escape_html(form.error)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { form });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BWQn6W_Y.js.map
