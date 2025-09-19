import { X as store_get, Z as unsubscribe_stores } from "../../../../../chunks/index2.js";
import { p as page } from "../../../../../chunks/stores.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import { a as attr } from "../../../../../chunks/attributes.js";
import "../../../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let name = "";
    let email = "";
    let username = "";
    let password = "";
    store_get($$store_subs ??= {}, "$page", page).data?.user;
    $$renderer2.push(`<div class="settings-container svelte-6y6vmx"><a href="/admin/dashboard" class="back-btn">← Back to Dashboard</a> <h1 class="svelte-6y6vmx">Account Settings</h1> <form class="settings-form svelte-6y6vmx" enctype="multipart/form-data"><div class="profile-pic-section svelte-6y6vmx"><img${attr("src", "/default-profile.png")} alt="Profile preview" class="profile-pic-preview svelte-6y6vmx"/> <label for="profilePicture" class="upload-label svelte-6y6vmx">Change Photo <input id="profilePicture" type="file" accept="image/*" class="svelte-6y6vmx"/></label></div> <div class="form-row svelte-6y6vmx"><label for="username" class="svelte-6y6vmx">Username</label> <input id="username" type="text"${attr("value", username)} required class="svelte-6y6vmx"/></div> <div class="form-row svelte-6y6vmx"><label for="name" class="svelte-6y6vmx">Name</label> <input id="name" type="text"${attr("value", name)} required class="svelte-6y6vmx"/></div> <div class="form-row svelte-6y6vmx"><label for="email" class="svelte-6y6vmx">Email</label> <input id="email" type="email"${attr("value", email)} required class="svelte-6y6vmx"/></div> <div class="form-row svelte-6y6vmx"><label for="password" class="svelte-6y6vmx">New Password</label> <input id="password" type="password"${attr("value", password)} placeholder="Leave blank to keep current password" autocomplete="new-password" class="svelte-6y6vmx"/></div> <button class="save-btn svelte-6y6vmx" type="submit">Save Changes</button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></form></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
