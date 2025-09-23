import { $ as bind_props } from "../../../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../../../chunks/exports.js";
import "../../../../../../chunks/utils.js";
import { e as escape_html } from "../../../../../../chunks/escaping.js";
import "@sveltejs/kit/internal/server";
import "../../../../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let resident = data.resident;
    $$renderer2.push(`<div class="subpage-container"><div class="subpage-card"><div class="subpage-header"><div><button type="button" class="back-btn">← Back</button> <h2 class="subpage-title">Resident Details</h2></div></div> `);
    if (resident) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<ul class="resident-detail-list"><li><strong>Name:</strong> ${escape_html(resident.name)}</li> <li><strong>Email:</strong> ${escape_html(resident.email)}</li> <li><strong>Phone:</strong> ${escape_html(resident.phone)}</li> <li><strong>Car Number:</strong> ${escape_html(resident.carNumber)}</li> <li><strong>House Address:</strong> ${escape_html(resident.houseAddress)}</li></ul>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="error">Resident not found.</div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
