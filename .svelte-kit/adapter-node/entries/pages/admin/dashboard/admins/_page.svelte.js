import { W as ensure_array_like, _ as bind_props } from "../../../../../chunks/index2.js";
import { a as attr } from "../../../../../chunks/attributes.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let admins = data?.admins ?? [];
    $$renderer2.push(`<section class="admin-section svelte-1p68bdi"><button type="button" class="back-btn svelte-1p68bdi">← Back</button> <h2>Manage Admins</h2> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="admin-list-card svelte-1p68bdi"><button class="btn btn-create svelte-1p68bdi" style="margin-bottom:1rem">+ Add Admin</button> <table class="admin-table svelte-1p68bdi"><thead><tr><th class="svelte-1p68bdi">Username</th><th class="svelte-1p68bdi">Actions</th></tr></thead><tbody><!--[-->`);
    const each_array = ensure_array_like(admins);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let admin = each_array[$$index];
      $$renderer2.push(`<tr><td class="svelte-1p68bdi"><form method="POST"><input type="hidden" name="id"${attr("value", admin.id)}/> <input type="text" name="username"${attr("value", admin.username)} required/> <button type="submit" class="btn btn-update svelte-1p68bdi">Update</button></form></td><td class="svelte-1p68bdi"><form method="POST" action="?/deleteAdmin"><input type="hidden" name="id"${attr("value", admin.id)}/> <button type="submit" class="btn btn-delete svelte-1p68bdi">Delete</button></form></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></section>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
