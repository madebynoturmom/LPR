import { V as store_get, Z as unsubscribe_stores } from './index2-D53USUVF.js';
import { p as page } from './stores-DKj53EOn.js';
import './exports-4vquAdf5.js';
import { a as attr } from './attributes-CgdCmHPy.js';
import './state.svelte-Bg4bqYdm.js';
import './escaping-CItVpVa9.js';
import './context-DXUidelg.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let name = "";
    let email = "";
    let username = "";
    let currentPassword = "";
    let newPassword = "";
    let phone = "";
    let houseAddress = "";
    let profilePic = null;
    if (store_get($$store_subs ??= {}, "$page", page).data.user) {
      const user = store_get($$store_subs ??= {}, "$page", page).data.user;
      name = user.name || "";
      email = user.email || "";
      username = user.username || "";
      phone = user.phone || "";
      houseAddress = user.houseAddress || "";
      profilePic = user.profilePic || null;
    }
    $$renderer2.push(`<a href="/user/dashboard" class="back-btn svelte-n628yj">← Back to Dashboard</a> <div class="profile-card move-up svelte-n628yj"><h1>Account Settings</h1> <div class="profile-forms-row svelte-n628yj"><div class="profile-settings-col svelte-n628yj"><form class="profile-form svelte-n628yj" enctype="multipart/form-data"><div class="profile-pic-section svelte-n628yj"><img${attr(
      "src",
      // Invalidate the page data to refresh the profile information
      // Also invalidate the dashboard layout to update sidebar profile pic
      profilePic || "/default-profile.png"
    )} alt="Profile preview" class="profile-pic-preview svelte-n628yj"/> <label for="profilePicture" class="upload-label svelte-n628yj"><span>Change Photo</span> <input id="profilePicture" name="profilePicture" type="file" accept="image/*" class="svelte-n628yj"/></label></div> <div class="form-grid svelte-n628yj"><div class="form-row svelte-n628yj"><label for="username" class="svelte-n628yj">Username</label> <input id="username" name="username" type="text"${attr("value", username)} required class="svelte-n628yj"/></div> <div class="form-row svelte-n628yj"><label for="name" class="svelte-n628yj">Name</label> <input id="name" name="name" type="text"${attr("value", name)} required class="svelte-n628yj"/></div> <div class="form-row svelte-n628yj"><label for="email" class="svelte-n628yj">Email</label> <input id="email" name="email" type="email"${attr("value", email)} required class="svelte-n628yj"/></div> <div class="form-row svelte-n628yj"><label for="phone" class="svelte-n628yj">Phone</label> <input id="phone" name="phone" type="text"${attr("value", phone)} class="svelte-n628yj"/></div> <div class="form-row svelte-n628yj"><label for="houseAddress" class="svelte-n628yj">House Address</label> <input id="houseAddress" name="houseAddress" type="text"${attr("value", houseAddress)} class="svelte-n628yj"/></div></div> <button class="save-btn svelte-n628yj" type="submit">Save Changes</button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></form></div> <div class="password-col svelte-n628yj"><form class="password-form" autocomplete="off"><h2>Change Password</h2> <div class="form-row svelte-n628yj"><label for="currentPassword" class="svelte-n628yj">Current Password</label> <input id="currentPassword" type="password"${attr("value", currentPassword)} required autocomplete="current-password" class="svelte-n628yj"/></div> <div class="form-row svelte-n628yj"><label for="newPassword" class="svelte-n628yj">New Password</label> <input id="newPassword" type="password"${attr("value", newPassword)} required autocomplete="new-password" class="svelte-n628yj"/></div> <button class="save-btn password-btn svelte-n628yj" type="submit">Update Password</button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></form></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DnALRJ5I.js.map
