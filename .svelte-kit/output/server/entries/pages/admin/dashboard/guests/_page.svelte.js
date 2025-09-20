import { X as ensure_array_like, _ as bind_props } from "../../../../../chunks/index2.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
import { a as attr } from "../../../../../chunks/attributes.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let passes = data?.passes ?? [];
    $$renderer2.push(`<section class="admin-section svelte-1fxmhl"><button type="button" class="back-btn svelte-1fxmhl">← Back</button> <h2>Manage Guest Passes</h2> <form method="POST" action="?/create" class="guest-form svelte-1fxmhl"><label class="svelte-1fxmhl">Plate Number: <input name="plateNumber" required/></label> <label class="svelte-1fxmhl">Name: <input name="name" required/></label> <label class="svelte-1fxmhl">Phone: <input name="phone" required/></label> <label class="svelte-1fxmhl">Visit Time: <input name="visitTime" type="datetime-local" required/></label> <label class="svelte-1fxmhl">Duration (minutes): <input name="durationMinutes" type="number" min="1" required/></label> <button type="submit" class="btn btn-update svelte-1fxmhl">Create Pass</button></form> <h3>Active Guest Passes</h3> `);
    if (passes.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<table class="guest-table svelte-1fxmhl"><thead><tr><th class="svelte-1fxmhl">Plate Number</th><th class="svelte-1fxmhl">Name</th><th class="svelte-1fxmhl">Phone</th><th class="svelte-1fxmhl">Visit Time</th><th class="svelte-1fxmhl">Duration (min)</th><th class="svelte-1fxmhl">Actions</th></tr></thead><tbody><!--[-->`);
      const each_array = ensure_array_like(passes);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let pass = each_array[$$index];
        $$renderer2.push(`<tr><td class="svelte-1fxmhl">${escape_html(pass.plateNumber)}</td><td class="svelte-1fxmhl">${escape_html(pass.name)}</td><td class="svelte-1fxmhl">${escape_html(pass.phone)}</td><td class="svelte-1fxmhl">${escape_html(new Date(pass.visitTime).toLocaleString())}</td><td class="svelte-1fxmhl">${escape_html(pass.durationMinutes)}</td><td class="svelte-1fxmhl"><form method="POST" action="?/delete" style="display:inline"><input type="hidden" name="id"${attr("value", pass.id)}/> <button type="submit" class="btn btn-delete svelte-1fxmhl">Delete</button></form></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<p>No guest passes found.</p>`);
    }
    $$renderer2.push(`<!--]--></section>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
