import { a as attr } from './attributes-CgdCmHPy.js';
import './exports-4vquAdf5.js';
import './state.svelte-Bg4bqYdm.js';
import './escaping-CItVpVa9.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let username = "";
    let password = "";
    let name = "";
    let email = "";
    let phone = "";
    let creating = false;
    $$renderer2.push(`<section class="admin-section svelte-kg74qh"><button type="button" class="back-btn svelte-kg74qh">← Back</button> <h2 class="admin-title svelte-kg74qh">Add New Admin</h2> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <form class="create-admin-form"><div class="form-grid svelte-kg74qh"><label>Username <input class="text-input svelte-kg74qh" type="text"${attr("value", username)} required/></label> <label>Password <input class="text-input svelte-kg74qh" type="password"${attr("value", password)} required/></label> <label>Name <input class="text-input svelte-kg74qh" type="text"${attr("value", name)}/></label> <label>Email <input class="text-input svelte-kg74qh" type="email"${attr("value", email)}/></label> <label>Phone <input class="text-input svelte-kg74qh" type="text"${attr("value", phone)}/></label></div> <label class="profile-upload svelte-kg74qh">Profile Picture <input type="file" accept="image/*" class="svelte-kg74qh"/></label> <div class="avatar-preview svelte-kg74qh">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<img src="/default-profile.png" alt="Default profile placeholder" class="svelte-kg74qh"/>`);
    }
    $$renderer2.push(`<!--]--></div> <button type="submit" class="btn btn-create primary-cta svelte-kg74qh"${attr("disabled", creating, true)}>Create Admin</button></form></section>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DFLLPq7V.js.map
