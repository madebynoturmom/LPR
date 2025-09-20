import { a0 as maybe_selected, X as ensure_array_like, $ as bind_props } from "../../../../../../chunks/index2.js";
import { a as attr } from "../../../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let users = data?.users ?? [];
    $$renderer2.push(`<div class="subpage-container"><div class="subpage-card"><div class="subpage-header"><div><button type="button" class="back-btn svelte-a019ei">← Back</button> <h2 class="subpage-title">Add Vehicle</h2></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <form method="POST" class="vehicle-form svelte-a019ei"><label class="svelte-a019ei">Plate Number: <input name="plateNumber" required/></label> <label class="svelte-a019ei">Owner (Resident): <select name="ownerId" required><option value=""${maybe_selected($$renderer2, "")}>Select owner</option><!--[-->`);
    const each_array = ensure_array_like(users);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let user = each_array[$$index];
      $$renderer2.push(`<option${attr("value", user.id)}${maybe_selected($$renderer2, user.id)}>${escape_html(user.name)} (${escape_html(user.houseAddress)})</option>`);
    }
    $$renderer2.push(`<!--]--></select></label> <label class="svelte-a019ei">Car Model: <input name="model" required/></label> <label class="svelte-a019ei">Make Year: <input name="makeYear" type="number" min="1900" max="2100" required/></label> <button type="submit" class="btn btn-update svelte-a019ei">Add Vehicle</button></form></div></div>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
