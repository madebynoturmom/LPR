import { X as ensure_array_like, W as attr_class, _ as stringify, $ as bind_props } from './index2-D53USUVF.js';
import { j as escape_html } from './escaping-CItVpVa9.js';
import { a as attr } from './attributes-CgdCmHPy.js';
import './context-DXUidelg.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let passes = data?.passes ?? [];
    let expandedId = null;
    let extendingId = null;
    let extendMinutes = 30;
    function formatDate(dt) {
      if (!dt) return "—";
      try {
        const d = new Date(dt);
        return d.toLocaleString();
      } catch (e) {
        return String(dt);
      }
    }
    $$renderer2.push(`<div class="subpage-container"><div class="subpage-card"><div class="subpage-header"><div><h2 class="subpage-title">Manage Guest Passes</h2></div></div> <form method="POST" action="?/create" class="vehicle-form svelte-1fxmhl"><label class="svelte-1fxmhl">Plate Number: <input name="plateNumber" required class="svelte-1fxmhl"/></label> <label class="svelte-1fxmhl">Name: <input name="name" required class="svelte-1fxmhl"/></label> <label class="svelte-1fxmhl">Phone: <input name="phone" required class="svelte-1fxmhl"/></label> <label class="svelte-1fxmhl">Visit Time: <input name="visitTime" type="datetime-local" required class="svelte-1fxmhl"/></label> <label class="svelte-1fxmhl">Duration (minutes): <input name="durationMinutes" type="number" min="1" required class="svelte-1fxmhl"/></label> <button type="submit" class="btn btn-update svelte-1fxmhl">Create Pass</button></form> <h3>Active Guest Passes</h3> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (passes.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="resident-list svelte-1fxmhl"><!--[-->`);
      const each_array = ensure_array_like(passes);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let pass = each_array[$$index];
        $$renderer2.push(`<div${attr_class(`resident-item ${stringify(expandedId === pass.id ? "expanded" : "")}`, "svelte-1fxmhl")}><button class="resident-summary svelte-1fxmhl"><div class="resident-name svelte-1fxmhl">${escape_html(pass.name)}</div> <div class="resident-house svelte-1fxmhl">${escape_html(pass.plateNumber)}</div> <div class="chev svelte-1fxmhl">${escape_html(expandedId === pass.id ? "▾" : "▸")}</div></button> `);
        if (expandedId === pass.id) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="resident-details svelte-1fxmhl"><div class="detail-row svelte-1fxmhl"><strong>Plate:</strong> ${escape_html(pass.plateNumber)}</div> <div class="detail-row svelte-1fxmhl"><strong>Name:</strong> ${escape_html(pass.name)}</div> <div class="detail-row svelte-1fxmhl"><strong>Phone:</strong> ${escape_html(pass.phone)}</div> <div class="detail-row svelte-1fxmhl"><strong>Visit:</strong> ${escape_html(formatDate(pass.visitTime))}</div> <div class="detail-row svelte-1fxmhl"><strong>Duration:</strong> ${escape_html(pass.durationMinutes)} minutes</div> <div class="detail-actions svelte-1fxmhl">`);
          if (extendingId === String(pass.id)) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<input class="extend-input svelte-1fxmhl" type="number" min="1"${attr("value", extendMinutes)}/> <button type="button" class="edit-btn svelte-1fxmhl">Apply</button> <button type="button" class="btn btn-ghost svelte-1fxmhl">Cancel</button>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<button type="button" class="edit-btn svelte-1fxmhl">Extend</button> <form method="POST" action="?/delete" style="display:inline"><input type="hidden" name="id"${attr("value", pass.id)}/> <button type="submit" class="delete-btn svelte-1fxmhl">Delete</button></form>`);
          }
          $$renderer2.push(`<!--]--></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<p>No guest passes found.</p>`);
    }
    $$renderer2.push(`<!--]--></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CAO4MP8_.js.map
