import { V as store_get, Z as unsubscribe_stores } from './index2-D53USUVF.js';
import { p as page } from './stores-DKj53EOn.js';
import './exports-4vquAdf5.js';
import { a as attr } from './attributes-CgdCmHPy.js';
import './state.svelte-Bg4bqYdm.js';
import { j as escape_html } from './escaping-CItVpVa9.js';
import './context-DXUidelg.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let name = "";
    let email = "";
    let username = "";
    let password = "";
    store_get($$store_subs ??= {}, "$page", page).data?.user;
    $$renderer2.push(`<div class="settings-container svelte-6y6vmx"><form class="settings-form svelte-6y6vmx" method="POST" enctype="multipart/form-data"><div class="subpage-container settings-subpage"><div class="subpage-card settings-card svelte-6y6vmx"><div class="subpage-header svelte-6y6vmx"><h1 class="subpage-title svelte-6y6vmx">Account Settings</h1></div> <div class="profile-pic-section svelte-6y6vmx"><img${attr("src", "/default-profile.png")} alt="Profile preview" class="profile-pic-preview svelte-6y6vmx"/> <label for="profilePicture" class="upload-label svelte-6y6vmx">Change Photo <input id="profilePicture" name="profilePicture" type="file" accept="image/*" class="svelte-6y6vmx"/></label></div> <div class="form-row"><label for="username">Username</label> <input id="username" name="username" type="text"${attr("value", username)} required/></div> <div class="form-row"><label for="name">Name</label> <input id="name" name="name" type="text"${attr("value", name)} required/></div> <div class="form-row"><label for="email">Email</label> <input id="email" name="email" type="email"${attr("value", email)} required/></div> <div class="form-row"><label for="password">New Password</label> <input id="password" name="password" type="password"${attr("value", password)} placeholder="Leave blank to keep current password" autocomplete="new-password"/></div> <button class="save-btn" type="submit">Save Changes</button> `);
    if (store_get($$store_subs ??= {}, "$page", page).form?.success) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="message success svelte-6y6vmx">Account updated successfully!</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (store_get($$store_subs ??= {}, "$page", page).form?.error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="message error svelte-6y6vmx">${escape_html(store_get($$store_subs ??= {}, "$page", page).form.error)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></form></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-C2rsYNpE.js.map
