import { a as attr } from "../../../../../chunks/attributes.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import "../../../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let name = "";
    let email = "";
    let username = "";
    let currentPassword = "";
    let newPassword = "";
    let phone = "";
    let houseNumber = "";
    let carNumber = "";
    $$renderer2.push(`<a href="/user/dashboard" class="back-btn svelte-n628yj">← Back to Dashboard</a> <div class="profile-card move-up svelte-n628yj"><h1>Account Settings</h1> <div class="profile-forms-row svelte-n628yj"><div class="profile-settings-col svelte-n628yj"><form class="profile-form svelte-n628yj" enctype="multipart/form-data"><div class="profile-pic-section svelte-n628yj"><img${attr("src", "/default-profile.png")} alt="Profile preview" class="profile-pic-preview svelte-n628yj"/> <label for="profilePicture" class="upload-label svelte-n628yj"><span>Change Photo</span> <input id="profilePicture" type="file" accept="image/*" class="svelte-n628yj"/></label></div> <div class="form-grid svelte-n628yj"><div class="form-row svelte-n628yj"><label for="username" class="svelte-n628yj">Username</label> <input id="username" type="text"${attr("value", username)} required class="svelte-n628yj"/></div> <div class="form-row svelte-n628yj"><label for="name" class="svelte-n628yj">Name</label> <input id="name" type="text"${attr("value", name)} required class="svelte-n628yj"/></div> <div class="form-row svelte-n628yj"><label for="email" class="svelte-n628yj">Email</label> <input id="email" type="email"${attr("value", email)} required class="svelte-n628yj"/></div> <div class="form-row svelte-n628yj"><label for="phone" class="svelte-n628yj">Phone</label> <input id="phone" type="text"${attr("value", phone)} class="svelte-n628yj"/></div> <div class="form-row svelte-n628yj"><label for="houseNumber" class="svelte-n628yj">House Number</label> <input id="houseNumber" type="text"${attr("value", houseNumber)} class="svelte-n628yj"/></div> <div class="form-row svelte-n628yj"><label for="carNumber" class="svelte-n628yj">Car Number</label> <input id="carNumber" type="text"${attr("value", carNumber)} class="svelte-n628yj"/></div></div> <button class="save-btn svelte-n628yj" type="submit">Save Changes</button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></form></div> <div class="password-col svelte-n628yj"><form class="password-form" autocomplete="off"><h2>Change Password</h2> <div class="form-row svelte-n628yj"><label for="currentPassword" class="svelte-n628yj">Current Password</label> <input id="currentPassword" type="password"${attr("value", currentPassword)} required autocomplete="current-password" class="svelte-n628yj"/></div> <div class="form-row svelte-n628yj"><label for="newPassword" class="svelte-n628yj">New Password</label> <input id="newPassword" type="password"${attr("value", newPassword)} required autocomplete="new-password" class="svelte-n628yj"/></div> <button class="save-btn password-btn svelte-n628yj" type="submit">Update Password</button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></form></div></div></div>`);
  });
}
export {
  _page as default
};
