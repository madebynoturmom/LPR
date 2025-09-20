import { _ as bind_props } from "../../../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../../../chunks/exports.js";
import "../../../../../../chunks/utils.js";
import { e as escape_html } from "../../../../../../chunks/escaping.js";
import "../../../../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let resident = data.resident;
    $$renderer2.push(`<section class="resident-detail-section svelte-1ttskn9"><button type="button" class="back-btn svelte-1ttskn9">← Back</button> <h2>Resident Details</h2> `);
    if (resident) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<ul class="resident-detail-list svelte-1ttskn9"><li class="svelte-1ttskn9"><strong>Name:</strong> ${escape_html(resident.name)}</li> <li class="svelte-1ttskn9"><strong>Email:</strong> ${escape_html(resident.email)}</li> <li class="svelte-1ttskn9"><strong>Phone:</strong> ${escape_html(resident.phone)}</li> <li class="svelte-1ttskn9"><strong>Car Number:</strong> ${escape_html(resident.carNumber)}</li> <li class="svelte-1ttskn9"><strong>House Address:</strong> ${escape_html(resident.houseAddress)}</li></ul>`);
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
