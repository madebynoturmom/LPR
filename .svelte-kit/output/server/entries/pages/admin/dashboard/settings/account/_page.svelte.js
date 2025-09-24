import { f as bind_props } from "../../../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../../../chunks/exports.js";
import "../../../../../../chunks/utils.js";
import { a as attr } from "../../../../../../chunks/attributes.js";
import "@sveltejs/kit/internal/server";
import "../../../../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let name = data?.user?.name ?? "";
    let email = data?.user?.email ?? "";
    let username = data?.user?.username ?? "";
    let profilePic = data?.user?.profilePic ?? "";
    $$renderer2.push(`<div class="dashboard-container"><header class="dashboard-overview"><div class="overview-left"><div class="overview-text"><h1 class="overview-title">Account</h1> <div class="overview-date">Manage account information</div></div></div></header> <section class="settings-section"><form method="POST" enctype="multipart/form-data"><div class="subpage-card settings-card"><div class="subpage-header"><h1 class="subpage-title">Account Settings</h1></div> <div class="profile-pic-section"><img${attr("src", profilePic || "/default-profile.png")} alt="Profile preview" class="profile-pic-preview"/> <label for="profilePicture" class="upload-label">Change Photo <input id="profilePicture" name="profilePicture" type="file" accept="image/*"/></label></div> <div class="form-row"><label for="username">Username</label> <input id="username" name="username" type="text"${attr("value", username)} required/></div> <div class="form-row"><label for="name">Name</label> <input id="name" name="name" type="text"${attr("value", name)} required/></div> <div class="form-row"><label for="email">Email</label> <input id="email" name="email" type="email"${attr("value", email)} required/></div> <div class="form-row"><label for="password">New Password</label> <input id="password" name="password" type="password" placeholder="Leave blank to keep current password" autocomplete="new-password"/></div> <button class="save-btn" type="submit">Save Changes</button></div></form></section></div>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
