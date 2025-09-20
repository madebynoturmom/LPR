import { a as attr } from './attributes-CO48CUe7.js';
import './exports-4vquAdf5.js';
import './state.svelte-CKb08XUO.js';
import './escaping-CqgfEcN3.js';
import './utils2-JZdwKo0Y.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let username = "";
    let password = "";
    let name = "";
    let email = "";
    let phone = "";
    let creating = false;
    $$renderer2.push(`<section class="admin-section svelte-kg74qh"><button type="button" class="back-btn svelte-kg74qh">← Back</button> <h2>Add New Admin</h2> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <form class="create-admin-form svelte-kg74qh"><label class="svelte-kg74qh">Username <input type="text"${attr("value", username)} required/></label> <label class="svelte-kg74qh">Password <input type="password"${attr("value", password)} required/></label> <label class="svelte-kg74qh">Name <input type="text"${attr("value", name)}/></label> <label class="svelte-kg74qh">Email <input type="email"${attr("value", email)}/></label> <label class="svelte-kg74qh">Phone <input type="text"${attr("value", phone)}/></label> <label class="svelte-kg74qh">Profile Picture <input type="file" accept="image/*"/></label> <div style="margin-bottom:1rem;">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<img src="/default-profile.png" alt="Default profile placeholder" style="max-width:120px;max-height:120px;opacity:0.3;border-radius:8px;"/>`);
    }
    $$renderer2.push(`<!--]--></div> <button type="submit" class="btn btn-create svelte-kg74qh"${attr("disabled", creating, true)}>Create Admin</button></form></section>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DiSfvzsa.js.map
