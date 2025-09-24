import { f as bind_props } from "../../../../../../chunks/index2.js";
import { a as attr } from "../../../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let form = $$props["form"];
    let plateNumber = "";
    let name = "";
    let phone = "";
    let durationMinutes = 30;
    $$renderer2.push(`<div class="create-food-delivery-pass svelte-1qwzayq"><a href="/user/dashboard/food-delivery" class="back-btn svelte-1qwzayq">← Back to Food Delivery</a> <h2>Create Food Delivery Pass</h2> <form method="POST" class="svelte-1qwzayq"><label class="svelte-1qwzayq">Plate Number <input name="plateNumber"${attr("value", plateNumber)} required class="svelte-1qwzayq"/></label> <label class="svelte-1qwzayq">Name <input name="name"${attr("value", name)} required class="svelte-1qwzayq"/></label> <label class="svelte-1qwzayq">Phone <input name="phone"${attr("value", phone)} required class="svelte-1qwzayq"/></label> <label class="svelte-1qwzayq">Duration (minutes) <input name="durationMinutes" type="number"${attr("value", durationMinutes)} min="10" max="120" required class="svelte-1qwzayq"/></label> <button type="submit" class="btn svelte-1qwzayq">Grant Access</button></form> `);
    if (form?.error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="error svelte-1qwzayq">${escape_html(form.error)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { form });
  });
}
export {
  _page as default
};
