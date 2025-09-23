import { V as store_get, Z as unsubscribe_stores } from "../../../../../chunks/index2.js";
import { p as page } from "../../../../../chunks/stores.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import { a as attr } from "../../../../../chunks/attributes.js";
import "@sveltejs/kit/internal/server";
import "../../../../../chunks/state.svelte.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let name = "";
    let email = "";
    let username = "";
    let password = "";
    store_get($$store_subs ??= {}, "$page", page).data?.user;
    $$renderer2.push(`<div class="settings-container"><form class="settings-form" method="POST" enctype="multipart/form-data"><div class="subpage-container settings-subpage"><div class="subpage-card settings-card"><div class="subpage-header"><h1 class="subpage-title">Account Settings</h1></div> <div class="profile-pic-section"><img${attr("src", "/default-profile.png")} alt="Profile preview" class="profile-pic-preview"/> <label for="profilePicture" class="upload-label">Change Photo <input id="profilePicture" name="profilePicture" type="file" accept="image/*"/></label></div> <div class="form-row"><label for="username">Username</label> <input id="username" name="username" type="text"${attr("value", username)} required/></div> <div class="form-row"><label for="name">Name</label> <input id="name" name="name" type="text"${attr("value", name)} required/></div> <div class="form-row"><label for="email">Email</label> <input id="email" name="email" type="email"${attr("value", email)} required/></div> <div class="form-row"><label for="password">New Password</label> <input id="password" name="password" type="password"${attr("value", password)} placeholder="Leave blank to keep current password" autocomplete="new-password"/></div> <button class="save-btn" type="submit">Save Changes</button> `);
    if (store_get($$store_subs ??= {}, "$page", page).form?.success) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="message success">Account updated successfully!</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (store_get($$store_subs ??= {}, "$page", page).form?.error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="message error">${escape_html(store_get($$store_subs ??= {}, "$page", page).form.error)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></form></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
