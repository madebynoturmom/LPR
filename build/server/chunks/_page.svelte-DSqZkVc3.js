import { $ as bind_props } from './index2-D53USUVF.js';
import './exports-4vquAdf5.js';
import { j as escape_html } from './escaping-CItVpVa9.js';
import './state.svelte-Bg4bqYdm.js';
import './attributes-CgdCmHPy.js';
import './context-DXUidelg.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let resident = data.resident;
    $$renderer2.push(`<div class="subpage-container"><div class="subpage-card"><div class="subpage-header"><div><button type="button" class="back-btn">← Back</button> <h2 class="subpage-title">Resident Details</h2></div></div> `);
    if (resident) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<ul class="resident-detail-list svelte-1ttskn9"><li class="svelte-1ttskn9"><strong>Name:</strong> ${escape_html(resident.name)}</li> <li class="svelte-1ttskn9"><strong>Email:</strong> ${escape_html(resident.email)}</li> <li class="svelte-1ttskn9"><strong>Phone:</strong> ${escape_html(resident.phone)}</li> <li class="svelte-1ttskn9"><strong>Car Number:</strong> ${escape_html(resident.carNumber)}</li> <li class="svelte-1ttskn9"><strong>House Address:</strong> ${escape_html(resident.houseAddress)}</li></ul>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="error">Resident not found.</div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DSqZkVc3.js.map
