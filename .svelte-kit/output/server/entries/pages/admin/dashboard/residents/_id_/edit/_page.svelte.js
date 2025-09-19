import { _ as bind_props } from "../../../../../../../chunks/index2.js";
import { a as attr } from "../../../../../../../chunks/attributes.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let resident = data.resident;
    $$renderer2.push(`<section class="admin-section svelte-tqj8l2"><button type="button" class="back-btn svelte-tqj8l2">← Back</button> <h2>Edit Resident</h2> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (resident) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<form method="POST" class="resident-form svelte-tqj8l2"><label class="svelte-tqj8l2">Name<input name="name"${attr("value", resident.name)} required class="svelte-tqj8l2"/></label> <label class="svelte-tqj8l2">Email<input name="email" type="email"${attr("value", resident.email)} required class="svelte-tqj8l2"/></label> <label class="svelte-tqj8l2">Phone Number<input name="phone"${attr("value", resident.phone)} required class="svelte-tqj8l2"/></label> <label class="svelte-tqj8l2">Car Number<input name="carNumber"${attr("value", resident.carNumber)} required class="svelte-tqj8l2"/></label> <label class="svelte-tqj8l2">House Number<input name="houseNumber"${attr("value", resident.houseNumber)} required class="svelte-tqj8l2"/></label> <button type="submit" class="btn btn-update svelte-tqj8l2">Update Resident</button></form>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="error">Resident not found.</div>`);
    }
    $$renderer2.push(`<!--]--></section>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
