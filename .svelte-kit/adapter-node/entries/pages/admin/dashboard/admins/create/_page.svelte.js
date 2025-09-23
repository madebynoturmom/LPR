import { a as attr } from "../../../../../../chunks/attributes.js";
import "@sveltejs/kit/internal";
import "../../../../../../chunks/exports.js";
import "../../../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let username = "";
    let password = "";
    let name = "";
    let email = "";
    let phone = "";
    let creating = false;
    $$renderer2.push(`<section class="admin-section"><button type="button" class="back-btn">← Back</button> <h2 class="admin-title">Add New Admin</h2> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <form class="create-admin-form"><div class="form-grid"><label>Username <input class="text-input" type="text"${attr("value", username)} required/></label> <label>Password <input class="text-input" type="password"${attr("value", password)} required/></label> <label>Name <input class="text-input" type="text"${attr("value", name)}/></label> <label>Email <input class="text-input" type="email"${attr("value", email)}/></label> <label>Phone <input class="text-input" type="text"${attr("value", phone)}/></label></div> <label class="profile-upload">Profile Picture <input type="file" accept="image/*"/></label> <div class="avatar-preview">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<img src="/default-profile.png" alt="Default profile placeholder"/>`);
    }
    $$renderer2.push(`<!--]--></div> <button type="submit" class="btn btn-create primary-cta"${attr("disabled", creating, true)}>Create Admin</button></form></section>`);
  });
}
export {
  _page as default
};
