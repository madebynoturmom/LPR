import { $ as bind_props } from './index2-D53USUVF.js';
import { a as attr } from './attributes-CgdCmHPy.js';
import { j as escape_html } from './escaping-CItVpVa9.js';
import './context-DXUidelg.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let form = $$props["form"];
    let plateNumber = "";
    let name = "";
    let phone = "";
    let visitTime = "";
    let durationMinutes = 60;
    $$renderer2.push(`<a href="/user/dashboard" class="back-btn outside-back svelte-1cvmrf2" aria-label="Back to dashboard">← Back to Dashboard</a> <div class="page-container svelte-1cvmrf2"><div class="page-header center-heading svelte-1cvmrf2"><h2 class="svelte-1cvmrf2">Create Guest Pass</h2></div> <div class="form-wrap svelte-1cvmrf2"><form method="POST" class="guest-form svelte-1cvmrf2"><label class="svelte-1cvmrf2">Plate Number: <input name="plateNumber"${attr("value", plateNumber)} required class="svelte-1cvmrf2"/></label> <label class="svelte-1cvmrf2">Name: <input name="name"${attr("value", name)} required class="svelte-1cvmrf2"/></label> <label class="svelte-1cvmrf2">Phone: <input name="phone"${attr("value", phone)} required class="svelte-1cvmrf2"/></label> <label class="svelte-1cvmrf2">Visit Time: <input name="visitTime" type="datetime-local"${attr("value", visitTime)} required class="svelte-1cvmrf2"/></label> <label class="svelte-1cvmrf2">Duration (minutes): <input name="durationMinutes" type="number"${attr("value", durationMinutes)} min="10" max="480" required class="svelte-1cvmrf2"/></label> <button type="submit" class="btn svelte-1cvmrf2">Create Guest Pass</button></form></div></div> `);
    if (form?.error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="error svelte-1cvmrf2">${escape_html(form.error)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { form });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Caz4dTn3.js.map
