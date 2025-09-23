import { Y as ensure_array_like, W as attr_class, _ as stringify, $ as bind_props } from "../../../../../chunks/index2.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
import { a as attr } from "../../../../../chunks/attributes.js";
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
    $$renderer2.push(`<div class="subpage-container"><div class="subpage-card"><div class="subpage-header"><div><h2 class="subpage-title">Manage Guest Passes</h2></div></div> <form method="POST" action="?/create" class="vehicle-form"><label>Plate Number: <input name="plateNumber" required/></label> <label>Name: <input name="name" required/></label> <label>Phone: <input name="phone" required/></label> <label>Visit Time: <input name="visitTime" type="datetime-local" required/></label> <label>Duration (minutes): <input name="durationMinutes" type="number" min="1" required/></label> <button type="submit" class="btn btn-update">Create Pass</button></form> <h3>Active Guest Passes</h3> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (passes.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="resident-list"><!--[-->`);
      const each_array = ensure_array_like(passes);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let pass = each_array[$$index];
        $$renderer2.push(`<div${attr_class(`resident-item ${stringify(expandedId === pass.id ? "expanded" : "")}`)}><button class="resident-summary"><div class="resident-name">${escape_html(pass.name)}</div> <div class="resident-house">${escape_html(pass.plateNumber)}</div> <div class="chev">${escape_html(expandedId === pass.id ? "▾" : "▸")}</div></button> `);
        if (expandedId === pass.id) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="resident-details"><div class="detail-row"><strong>Plate:</strong> ${escape_html(pass.plateNumber)}</div> <div class="detail-row"><strong>Name:</strong> ${escape_html(pass.name)}</div> <div class="detail-row"><strong>Phone:</strong> ${escape_html(pass.phone)}</div> <div class="detail-row"><strong>Visit:</strong> ${escape_html(formatDate(pass.visitTime))}</div> <div class="detail-row"><strong>Duration:</strong> ${escape_html(pass.durationMinutes)} minutes</div> <div class="detail-actions">`);
          if (extendingId === String(pass.id)) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<input class="extend-input" type="number" min="1"${attr("value", extendMinutes)}/> <button type="button" class="edit-btn">Apply</button> <button type="button" class="btn btn-ghost">Cancel</button>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<button type="button" class="edit-btn">Extend</button> <form method="POST" action="?/delete" style="display:inline"><input type="hidden" name="id"${attr("value", pass.id)}/> <button type="submit" class="delete-btn">Delete</button></form>`);
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
export {
  _page as default
};
