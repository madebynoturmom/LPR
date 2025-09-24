import { c as ensure_array_like, d as stringify, f as bind_props } from './index2-CW9yIE9Z.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { b as attr } from './attributes-Y1rI5qy_.js';
import './context-BatlNbRu.js';
import './utils2-JZdwKo0Y.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let { guestPasses } = data;
    $$renderer2.push(`<div class="guest-page-container svelte-6mer7b"><a href="/user/dashboard" class="back-btn svelte-6mer7b">← Back to Dashboard</a> <h2>Your Guest Passes</h2> <a href="/user/dashboard/guests/create" class="add-btn svelte-6mer7b">+ Create Guest Pass</a> `);
    if (guestPasses.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p>No guest passes found for your account.</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<ul class="guest-pass-list svelte-6mer7b"><!--[-->`);
      const each_array = ensure_array_like(guestPasses);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let g = each_array[$$index];
        $$renderer2.push(`<li class="svelte-6mer7b"><strong>Plate:</strong> ${escape_html(g.plateNumber)}<br/> <strong>Visit Time:</strong> ${escape_html(new Date(g.visitTime).toLocaleString())}<br/> <strong>Duration:</strong> ${escape_html(g.durationMinutes)} minutes<br/> <form method="POST" action="?/revoke" style="display:inline"><input type="hidden" name="id"${attr("value", g.id)}/> <button type="submit" class="revoke-btn svelte-6mer7b">Revoke</button></form> <form method="POST" action="?/extend" class="extend-form svelte-6mer7b"><input type="hidden" name="id"${attr("value", g.id)}/> <label${attr("for", `extend-${stringify(g.id)}`)} class="extend-label">Add minutes:</label> <input${attr("id", `extend-${stringify(g.id)}`)} type="number" name="duration" min="1" step="1" placeholder="30" class="duration-input svelte-6mer7b" required/> <button type="submit" class="extend-btn svelte-6mer7b">Extend</button></form></li>`);
      }
      $$renderer2.push(`<!--]--></ul>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CI_ypa2n.js.map
