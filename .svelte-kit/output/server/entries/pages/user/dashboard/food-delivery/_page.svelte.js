import { X as ensure_array_like, _ as stringify, $ as bind_props } from "../../../../../chunks/index2.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
import { a as attr } from "../../../../../chunks/attributes.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let { foodDeliveryPasses } = data;
    $$renderer2.push(`<div class="food-delivery-page-container svelte-1asa6rd"><a href="/user/dashboard" class="back-btn svelte-1asa6rd">← Back to Dashboard</a> <h2>Your Food Delivery Passes</h2> <a href="/user/dashboard/food-delivery/create" class="add-btn svelte-1asa6rd">+ Create Food Delivery Pass</a> `);
    if (foodDeliveryPasses.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p>No food delivery passes found for your account.</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<ul class="food-delivery-pass-list svelte-1asa6rd"><!--[-->`);
      const each_array = ensure_array_like(foodDeliveryPasses);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let f = each_array[$$index];
        $$renderer2.push(`<li class="svelte-1asa6rd"><strong>Plate:</strong> ${escape_html(f.plateNumber)}<br/> <strong>Visit Time:</strong> ${escape_html(new Date(f.visitTime).toLocaleString())}<br/> <strong>Duration:</strong> ${escape_html(f.durationMinutes)} minutes<br/> <form method="POST" action="?/revoke" style="display:inline"><input type="hidden" name="id"${attr("value", f.id)}/> <button type="submit" class="revoke-btn svelte-1asa6rd">Revoke</button></form> <form method="POST" action="?/extend" class="extend-form"><input type="hidden" name="id"${attr("value", f.id)}/> <label${attr("for", `extend-${stringify(f.id)}`)} class="extend-label">Add minutes:</label> <input${attr("id", `extend-${stringify(f.id)}`)} type="number" name="duration" min="1" step="1" placeholder="30" class="duration-input" required/> <button type="submit" class="extend-btn svelte-1asa6rd">Extend</button></form></li>`);
      }
      $$renderer2.push(`<!--]--></ul>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
