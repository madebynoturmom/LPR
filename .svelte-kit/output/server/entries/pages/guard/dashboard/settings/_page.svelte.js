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
    let profilePic = null;
    let username = "";
    let currentPassword = "";
    let newPassword = "";
    let userInitials = "G";
    if (store_get($$store_subs ??= {}, "$page", page).data.user) {
      profilePic = store_get($$store_subs ??= {}, "$page", page).data.user.profilePic || null;
      username = store_get($$store_subs ??= {}, "$page", page).data.user.username || "";
      const name = store_get($$store_subs ??= {}, "$page", page).data.user.name || username || "G";
      const parts = String(name).trim().split(/\s+/).filter(Boolean);
      if (parts.length === 0) userInitials = "G";
      else if (parts.length === 1) userInitials = parts[0].slice(0, 2).toUpperCase();
      else userInitials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    $$renderer2.push(`<a href="/guard/dashboard" class="back-btn svelte-7r8vh3">← Back to Dashboard</a> <div class="profile-card move-up svelte-7r8vh3"><h1>Account Settings</h1> <div class="profile-forms-row svelte-7r8vh3"><div class="profile-settings-col svelte-7r8vh3"><form class="profile-form svelte-7r8vh3" enctype="multipart/form-data"><div class="profile-pic-section">`);
    if (profilePic) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<img${attr("src", profilePic)} alt="Profile preview" class="profile-pic-preview svelte-7r8vh3"/>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="profile-placeholder-large">${escape_html(userInitials)}</div>`);
    }
    $$renderer2.push(`<!--]--> <label for="profilePicture" class="upload-label svelte-7r8vh3"><span>Change Photo</span> <input id="profilePicture" name="profilePicture" type="file" accept="image/*" class="svelte-7r8vh3"/></label></div> <div class="form-grid svelte-7r8vh3"><div class="form-row svelte-7r8vh3"><label for="username">Username</label> <input id="username" name="username" type="text"${attr("value", username)} readonly/></div></div> <button class="save-btn svelte-7r8vh3" type="submit">Save Changes</button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></form></div> <div class="password-col svelte-7r8vh3"><form class="password-form" autocomplete="off"><h2>Change Password</h2> <div class="form-row svelte-7r8vh3"><label for="currentPassword">Current Password</label> <input id="currentPassword" type="password"${attr("value", currentPassword)} required autocomplete="current-password"/></div> <div class="form-row svelte-7r8vh3"><label for="newPassword">New Password</label> <input id="newPassword" type="password"${attr("value", newPassword)} required autocomplete="new-password"/></div> <button class="save-btn password-btn svelte-7r8vh3" type="submit">Update Password</button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></form></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
